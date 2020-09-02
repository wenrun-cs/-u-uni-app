<template>
	<view class="container">
		<view class="">
			<!-- 详情图片 -->
			<view class="detailImage">
				<image :src="baseUrl+detail.img">
			</view>
			<!-- 详情基本信息 -->
			<view class="detailInfo">
				<view class="detailInfoName">
					<label>{{detail.goodsname}}</label>
				</view>
				<view class="detailInfoPrice">
					<label style="color: red;">￥{{detail.price}}</label>
					<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
				</view>			
			</view>
			
			<!-- 基本信息改变 -->
			<view class="changeInfo">
				<view class="youhui">
					<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
				</view>
				<!-- 数量加减 -->
				<view class="changeNum">
					<view class="num">购买数量</view>
					<view class="action">
					  <label class="jian" @click="changeNum('-')">-</label>
					  <label class="zhi">{{num}}</label>
					  <label  class="jia" @click="changeNum('+')">+</label>
					</view>
					
				</view>
				<!-- 商品属性 -->
				<view class="changeState">
					<view class="productStat">
						<label for="">商品属性</label>
					</view>
					<view class="productGuige">
						<label>{{detail.specsname}}</label>
						<view class="threed3i1" v-for="(item,index) in attr" :key='index'>
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<!-- 商品详情 -->
			 <view class="productDetail">
				<view class="productDetailTitle">商品详情</view>
				<!-- 需要处理图片自适应问题 -->
				<view class="" v-html="detail.description"></view>
			</view>
			
			<view class="productEval">
				<view class="eval">商品评价</view>
				<view>
					<label class="evalUsername">小李白</label>
					<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>					
					<view class="evalImage">
						<image src="../../static/detail/pingjia1.jpg"/>
						<image src="../../static/detail/pingjia2.jpg"/>
						<image src="../../static/detail/pingjia3.jpg"/>
					</view>
					<label class="evalTime">2020-01-13</label>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="foot">
				<button class="footbtn1" @click="join(detail.id)">加入购物车</button>
				<button class="footbtn2" @click="join(detail.id)">立即购买</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {getInfo,baseUrl,checkuser} from '../../utils/tools.js'
	// 引入弹框插件
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	//
	export default{
		components: {
		        uniPopup,
		        uniPopupMessage,
		        uniPopupDialog
		},
		data(){
			return{
				baseUrl:baseUrl,//图片前缀
				detail:{},//商品详情
				num:1,//数量
				attr:[],//规格的数组列表
			}
		},
		// 一进页面 加载拿到id
		async onLoad(options){
            var result=await getInfo("/api/getgoodsinfo",{id:options.id});
			if(result.data.list==null){//没有数据
				return;//直接返回
			}
			this.detail=result.data.list[0]
			var str=this.detail.specsattr;
			if(str.indexOf(',')==-1){
				this.attr.push(str)
			}else{
				this.attr=str.split(',');
			}
		},
		methods:{
			// 改变数字
			changeNum(fh){
                if(fh=="+"){
					this.num+=1;
				}else{
                    if(this.num==1){
						uni.showToast({
							title:"最少为1，不能再少了",
							icon:"none"
						})
						return;
					}
					this.num-=1;
				}				
		    },
			// 加入购物车
			async join(id){
				// 看是否登录
				checkuser();
				// 拿到购物车需要的数据  uid goodsid  num authorization
				// 从本地拿用户信息
				var userInfo=uni.getStorageSync("userInfo");
				var data={
					uid:userInfo.uid,
					goodsid:id,
					num:this.num
				}
				var results = await getInfo('/api/cartadd',data,"GET",{authorization:userInfo.token});
				if(results.data.code==200){
					uni.showToast({
						title:"加入购物车成功",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
	
</style>
	
