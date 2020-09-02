<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:孙幕陈</label>	
				<label for="">18333153880</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">河北省石家庄市藁城区</label>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for='(item,index) in confirmList' :key="index">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="baseUrl+item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="changenum('-',index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="changenum('+',index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>		
			<!-- 横线 -->
			<view class="xian"></view>
		</view>	
		<!-- 快递 -->	
		<view>		
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use" >
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分"/>
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>
		
		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="orderadd">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {getInfo,baseUrl} from '../../utils/tools.js';
	export default{
		data(){
			return{
				baseUrl:baseUrl,//图片前缀
				confirmList:[],//购物车列表
				userinfo:"",//用户信息
			}
		},
		// 加载页面
		async onLoad(){
			this.userinfo=uni.getStorageSync("userInfo")
			// 获取购物车列表页的信息
			var result =uni.getStorageSync("cartlist");
			this.confirmList=result;//渲染
		},
		methods:{
			// 改变数量
			changenum(fh,index){
				if(fh=="-"){
					if(this.confirmList[index].num==1){
						uni.showToast({
							title:"宝贝不能再少了",
							icon:"none"
						})
						return;
					}
					this.confirmList[index].num-=1;
				}else{
					this.confirmList[index].num+=1;
				}
				uni.setStorageSync("cartlist",this.confirmList)
			},
			// 确认订单
			async orderadd(){
				// 定义需要的变量
				var uid=this.userinfo.uid;//拿到uid
				var username="孙幕陈";
				var userphone="18333153880";
				var address="河北省石家庄市藁城区";
				var countmoney=this.allPrice;
				var countnumber=this.confirmList.reduce((total,item)=>{
					 return total+=item.num;
				},0)
				var addtime=new Date().getTime();
				var idstrr = this.confirmList.map(item=>{
					return item.id
				})
				var idstr=idstrr.join(",")
				var authorization =this.userinfo.token;
				var params={
					uid,username,userphone,address,countmoney,
					countnumber,addtime
				}
				// 将对象转换为字符串类型
				 params=JSON.stringify(params)
				 // 拿到结果
				var resultZ =await getInfo("/api/orderadd",{params,idstr},"GET",{authorization});
				if(resultZ.data.code==200){
					uni.showToast({
						title:resultZ.data.msg,
						success:res=>{
							uni.navigateTo({
								url:"../order/order"
							})
						}
					})
				}
			}
		},
		computed:{
			allPrice(){
			    var sum=this.confirmList.reduce((total,item)=>{
			         return total+=item.num*item.price;                      
			    },0)
				return sum;
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
