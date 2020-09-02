<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="getyzm" >{{yzm}}</text>
			</view>
			<view class="hh">
				<input type="text"  v-model="code"  placeholder="- - - -" maxlength="4" />
			</view>
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;">语音验证</text></text>
			<!--   -->
			<button type="primary" @click="submit" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {getInfo,baseUrl}  from '@/utils/tools.js'
	export default{
		data(){
			return{
				baseUrl:baseUrl,
				phone:'',//手机号
				yzm:'获取验证码',//发送 验证码秒杀
				code:'',//验证码
			}
		},
		methods:{
			// 点击获取验证码
			async getyzm(){
				// 判断 如果正在读秒 则点击无效
				if(typeof (this.yzm)=='number'){
					 return;
				}
				this.yzm=30;
				var timer=null;
				timer=setInterval(()=>{
					this.yzm-=1
					if(this.yzm==0){
						this.yzm="重新获取验证码";
						clearInterval(timer);
					}
				},1000)
				var result=await getInfo('/api/sms',{phone:this.phone})
				uni.setStorageSync("code",result.data.list.code);
			},
			// 登录 登录 点击登录
			async submit(){
				//判断验证码是否正确
				var reg=/^1[3456789]\d{9}$/;
				if(this.phone=="" || this.code==""){
					 uni.showToast({
					 	title:"手机号或验证码不能为空",
						icon:"none"
					 })
					 return;
				}else if(!reg.test(this.phone)){
					uni.showToast({
						title:"请填写11位正确格式的手机号",
						icon:"none"
					})
					return;
				}
				var codeS=uni.getStorageSync("code")
				if(codeS==Number(this.code)){
					// 验证码输入正确 提交登录
					var resultd= await getInfo('/api/wxlogin',{phone:this.phone})
					console.log(resultd,"mmm")
					var userInfo=resultd.data.list;
					// 将用户信息保存
					uni.setStorageSync("userInfo",userInfo);
					// 跳转到主页
					uni.switchTab({
						url:'/pages/mine/mine'
					})
				}else{//填写不正确
					uni.showToast({
					   title:'验证码输入有误',
					   icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}
	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
