const baseUrl="http://localhost:3000";
 function getInfo(url="",data={},method="GET",header={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			 url:baseUrl+url,
			 method:method,
			 header:header,
			 data:data,
			 success:res=>{
				 resolve(res)
			 },
			 fail:err=>{
				 reject(arr)
			 }
		})
	})  
}
 async function checkuser(){
	var userinfo=uni.getStorageSync("userInfo")
	if(!userinfo){
		uni.showToast({
			title:"请先进行登录",
			icon:"none",
			success:res=>{
				uni.navigateTo({
					url:"../send/send"
				})
			}
		})
	}else{
	   var resultM = await getInfo("/api/checktoken",{},"GET",{authorization:userinfo.token});
	   if(resultM.data.msg){
		   uni.showToast({
		   	title:resultM.data.msg,
			icon:"none",
			success:res=>{
				uni.navigateTo({
					url:'/pages/send/send.vue'
				})
			}
		   })
	   }
	}
}
export {getInfo,baseUrl,checkuser}