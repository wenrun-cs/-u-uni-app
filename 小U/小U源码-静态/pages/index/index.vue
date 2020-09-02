<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
		  <view class="logoView">
			<!-- logo -->
			<img class="logo" src="/static/index/logo.jpg" alt="" />
		  </view>
		  <view class="inputView">
			<input class="textinput" v-model="keyword"  style="center" type="text"   placeholder="寻找商品"/>
		  </view>
		  <view class="sear" @click="searchf">
		  	<text>搜索</text>
		  </view>
		</view>
		
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
		    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
		        <view class="uni-tab-item"  data-current="0"  v-for="(item,index) in navList"  :key='index' @click="select(index,item.id)">
		            <text :class="  [index==n?'uni-tab-item-title uni-tab-item-title-active':'uni-tab-item-title'] "> 
						 {{item.catename}}
					</text>
		        </view>
		    </scroll-view> 
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="baseUrl+item.img" :title='item.title'  mode=""></image>
					</view>
				</swiper-item>			
			</swiper>
		</view>
		
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
		  <view class="FunctNavLi">
			<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
			<p>限时抢购</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
		  			<p>积分商城</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
		  			<p>联系我们</p>
		  </view>
		  <view class="FunctNavLi" @click="toCate">
		  			<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
		  			<p>商品分类</p>
		  </view>
		</view>
		
		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
				  <image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
				  <label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
				  <label class="LimitTime">{{hour}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{minutes}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{second}}</label>
				  <label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>
			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>		
					<!-- <div> -->
					<view class="Cloth">
						<image  src="../../static/index/goods1.jpg" alt="">
					</view>
					
					<!-- </div> -->				
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		  <!-- 轮播图2 -->
		<div class="Swiper2">
		  <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="[index==b? 'tag_list active_tag_list' :'tag_list']" v-for="(item,index) in arr" :key="index" >
					<label for="" @click="changeBottom(index)">{{item}}</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(item,index) in bottomList[b].content " :key="index" @click="todetail(item.id)"> 
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="baseUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getInfo,baseUrl} from '../../utils/tools.js'
	export default{
	   data(){
		  return {
			 keyword:"",//搜索框内容
			 baseUrl:baseUrl,//前缀 
			 navList:[],//定义导航栏列表
			 n:0 ,//定义导航栏初始n值
			 bannerList:[],//轮播图列表页
			 hour:'00',//秒杀-时
			 minutes:'00',//秒杀-分
			 second:'00',//秒杀-秒
			 arr:["热门推荐","发现好货","只看商品"],//底部导航标题
			 bottomList:[],//底部导航列表
			 b:0,//底部默认下标
		  }  
	   },
	   // 一进页面 获取需要加载的全部数据
	    async onLoad(){
		   // 调用导航栏接口 拿到导航栏数据
		   var result =await getInfo("/api/getcate")
		   this.navList=result.data.list
	       //获取轮播图数据
			var resultb=await getInfo("/api/getbanner")
		    this.bannerList=resultb.data.list
		   //获取秒杀活动数据
		      var results = await getInfo("/api/getseckill")
		  //调用函数 将秒杀剩余时间计算出来
			if(results.data.list!=null){
				this.comput(results.data.list[0].endtime)
			}
			// 获取底部导航数据
			var resultd=await getInfo('/api/getindexgoods')
			 // 赋值数据
			 this.bottomList=resultd.data.list;
		},
	   methods:{
		   // 点击导航栏  切换  跳转到相应页面
		   select(index,fid){
			   this.n=index
			   // 跳转到product产品页
			   uni.navigateTo({
			   	  url:'../product/product?id='+fid
			   })
		   },
		   //利用时间戳 将秒杀剩余时间计算
		   comput(endtime){
              var timer=null
			  var endtime=endtime;//结束时间
			 // 定义一个定时器
			 timer = setInterval(()=>{
				var nowtime=new Date().getTime();//现在的时间戳
				var distance=( endtime- nowtime)/1000 //时间差
				var hour = Math.floor(distance / 3600)//小时
				var minutes=Math.floor(distance % 3600/60)//分钟
				var second=Math.floor(distance%3600%60)  //秒数
				
				hour=hour<10?"0"+hour:hour;
				minutes=minutes<10?"0"+minutes:minutes;
				second=second<10?"0"+second:second;
				if(hour=='00'&&minutes=='00'&&second=='00'){
				    clearInterval(timer)//倒计时时间到了 清除定时器
				}
				// 赋值
				this.hour=hour;this.minutes=minutes;this.second=second;
			 },1000)
		   },
		   // 点击跳转商品分类
	       toCate(){
			   uni.navigateTo({
			   	   url:"../classify/classify"
			   })
		   },
		   // 点击切换底部内容
		   changeBottom(index){
			   this.b=index;
		   },
		   // 跳转到详情
		   todetail(id){
			   uni.navigateTo({
			   	url:"../details/details?id="+id
			   })
		   },
		   // 点击搜索\
		   searchf(){
			   var key=this.keyword;
			   this.keyword="";
			   uni.navigateTo({
			   	url:'../product/product?key='+key
			   })
		   }
		   
	},
}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css")
</style>
