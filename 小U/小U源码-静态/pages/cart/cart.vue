<template>
	<view class="container">
		<view class="top" v-if="cartList.length>0"> 
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0"  v-for="(item,index) in cartList" :key="index">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="singleCheck($event,index)"/>
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common"><image :src="baseUrl+item.img" mode=""></image></view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="changeNum('-',index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="changeNum('+',index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" @click="deleteCart(index)" id="demo2"><label for="" >删除</label></view>
			</scroll-view>
		</view>
		<view class="" v-else>
			暂时还没有加购商品 
		</view>
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @click='doAllCheck'/>
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：{{sum}}
					<label style="color: red;"></label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toconfirm">
				<!-- 被选中的商品的个数 -->
				<label >去结算({{n}}件)</label>
			</view>
		</view>
	</view>
</template>

	
<script>
	// 调用js工具
	import {getInfo,baseUrl,checkuser} from '../../utils/tools.js';
    export default {
		data(){
			return{
				baseUrl:baseUrl,//图片前缀
				cartList:[],//购物车列表
				userinfo:''//用户信息
			}
		},
		// 一进页面 获取购物车
		async onShow(){
			// 判断是否登录
			checkuser();
			// 拿到用户信息
			 this.userinfo=uni.getStorageSync("userInfo");
			var result=await getInfo('/api/cartlist',{uid:this.userinfo.uid},"GET",{authorization:this.userinfo.token});
			var cart=result.data.list;
			if(cart!=null){
				// 遍历添加checked属性
				cart.forEach(item=>{
					item.checked= item.checked==1?true:false;
				})
				this.cartList=cart;
			}
			
		},
		methods:{
			// 点击加减数量
			changeNum(fh,index){
				if(fh=="-"){
					if(this.cartList[index].num==1){
						uni.showToast({
							title:'宝贝不能再少了',
							icon:"none"
						})
						return;
					}
					this.cartList[index].num-=1;
					this.changeCartList(index);
				}else{
					this.cartList[index].num+=1;
					this.changeCartList(index);
				}
			},
			// 点击单选按钮的自定义事件
			singleCheck(e,index){
				// 将拿到的数据 赋值
				this.cartList[index].checked=e.detail.value;
				// 改变是购物车 同步数据
				this.changeCartList(index);
			},
			// 点击全选
			doAllCheck(){
				this.isAllCheck=!this.isAllCheck;
			},
			// 封装一个函数  提交购物车修改
			async changeCartList(index){
				var {id,num,checked} = this.cartList[index];
				checked = checked?1:0;//与数据库要接受的一致
				let {token}=uni.getStorageSync("userInfo")
				var data={
					id,
					num,
					checked
				}
				var resultt=await getInfo('/api/cartedit',data,"GET",{authorization:token});
			},
			// 删除单个购物车信息
			async deleteCart(index){
				var id=this.cartList[index].id
				var resultDel=await getInfo("/api/cartdelete",{id:id},"GET",{authorization:this.userinfo.token});
				var result=await getInfo('/api/cartlist',{uid:this.userinfo.uid},"GET",{authorization:this.userinfo.token});
			    this.cartList=result.data.list;
			},
			// 提交订单
			toconfirm(){
				// 筛选出符合条件的
			   var conList=this.cartList.filter(item=>{
			   	      return item.checked==1;
			   })
			   // 存储到临时存储
			   uni.setStorageSync("cartlist",conList)//存储到临时存储
			   uni.navigateTo({
				   url:"../confirm/confirm"
			   })
		    }
		},			// 计算属性
		computed:{
			// 总数
			n(){
				var n=0;
				this.cartList.forEach(item=>{
					if(item.checked){
						n+=1;
					}
				})
				return n;
			},
			// 总价
			sum(){
				var sum=0;
				this.cartList.forEach(item=>{
					if(item.checked){
						sum+=item.num*item.price
					}
				})
				return sum;
			},
			// 全选的属性
			isAllCheck:{
				// get 通过别的属性控制
				get:function(){
					return this.cartList.every(item=>{
					   return  item.checked==true
					})
				},
				// 他控制别的属性
				set:function(val){
					this.cartList.forEach((item,index)=>{
					    item.checked=val;
					})
					
				}
			}
		}
	};
</script>

<style>
@import url('../../common/css/cart.css');
.cartInfo_image_img {
	width: 120rpx;
	height: 120rpx;
}
</style>
