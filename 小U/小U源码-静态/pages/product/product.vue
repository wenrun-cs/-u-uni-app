<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" v-model="cont" placeholder="搜索商品" placeholder-class="placeholder"  />
			<text class="sea" @click="findList">搜索</text>
		</view>
		<view class="list">
			<view class="row" @click="todetail(item.id)" v-for="(item,index) in productList" :key="index">
				<image :src="baseUrl+item.img"  mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>3565条评论</text>	
				</view>
			</view>
		</view>
		<view class="tishi" >
			没有数据亲！
		</view>
	</view>
</template>

<script>
	//引入工具文件 
	import {getInfo,baseUrl} from '../../utils/tools.js'
	export default{
		data(){
			return {
				baseUrl:baseUrl,//图片前缀
				productList:[],//产品列表
				cont:'',//文本框
			}
		},
		async onLoad(options){
            if(options.id != undefined){// 拿到分类对应的产品信息
				var result = await getInfo("/api/getcategoodPage",{fid:options.id,page:1,size:10})
			    // 赋值给当前数组
			   this.productList=result.data.list[1];
			}else{
				var result = await getInfo('/api/search',{keywords:options.key})
				// 赋值给当前数组
				this.productList=result.data.list;
			}
		},
		methods:{
			// 点击搜索
		 	async findList(){
			    var resultL =await getInfo('/api/search',{keywords:this.cont})
				this.cont="";//清空
				this.productList=resultL.data.list//渲染
			},
			// 跳转到详情
			todetail(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			}
		}
	}
	
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.sea{
		width: 100rpx;
		
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
