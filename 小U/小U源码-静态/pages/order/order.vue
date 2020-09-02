]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list" v-if="orderList.length>0">
			<view class="row" v-for="(item,index) in orderList" :key="index">
				<view class="products">
					<view class="imagebox" v-for="(it,id) in item.child" :key="id">
						<image :src="baseUrl+it.img" mode="widthFix"></image>
						<text>{{it.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {getInfo,baseUrl} from '../../utils/tools.js'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default{
		    data(){
			    return {
					baseUrl:baseUrl,//照片前缀
					userinfo:"",//用户信息
					orderList:[],//订单信息
				}
			 },
			async onLoad(){
				this.userinfo=uni.getStorageSync("userInfo");
				var uid =this.userinfo.uid;
				var authorization =this.userinfo.token;
				var result = await getInfo('/api/orders',{uid},"GET",{authorization});
                if(result.data.list!=null){
					this.orderList=result.data.list
				}
			},
		    components: {uniSearchBar}
	}
</script>
<style>

	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		float: left;
		margin:10rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
