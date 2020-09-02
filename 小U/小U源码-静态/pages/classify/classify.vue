<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view  v-for="(item,index) in cateList"  :class="[index==n? 'left_list activeList ':'left_list' ]" @click="changeRight(index)" :key="index">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom" v-if="rightList.length>0">
					<view class="bottom_list" @click="todetail(item.id)" v-for="(item ,index) in rightList" :key='index'>
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="baseUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				<view class="bottom" v-else>
					 暂无数据！！！
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	// 引入js'文件
	import {getInfo,baseUrl} from '../../utils/tools.js'
	export default {
		data(){
			return {
				baseUrl:baseUrl,//照片前缀
				n:0,//切换样式 
				cateList:[],//分类列表
				rightList:[]//右边列表数据
			}
		},
		// 一进页面 拿分类相关数据
		async onLoad(){
			var result =await getInfo("/api/getcates")
            this.cateList=result.data.list //渲染左边分类
			this.rightList=this.cateList[0].children; //渲染右边数组列表(默认第一个)
		},
		methods:{
			// 点击左边按钮 切换右边列表 切换样式
			changeRight(index){
				this.n=index;
				this.rightList=this.cateList[index].children; //渲染右边数组列表
				if(this.rightList==undefined){
					this.rightList=[]
				}
			},
			// 跳转到详情
			todetail(id){
				// uni.navigateTo({
				// 	url:'../details/details?id='+id
				// })
			}
		}
	}
	
</script>
<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
