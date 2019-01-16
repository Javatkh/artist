// function downPortraitUser(){
// 	var user = JSON.parse(localStorage.user)
// 	console.log(user)
// 	// $.getJSON(user,function(response) {
// 	// 	var list = response.data;
// 	// 	console.log(list)
// 		var html =""
// 			html += `<a href="javascript:;">VIP会员</a>
// 						<a href="user.html">${user.nickname}</a>
// 						<a href="user.html">个人中心</a>
// 						<a href="login.html" class="dealLogout">退出</a>`
// 		$(".header-right").html(html)
// 	// })
// 	$(".dealLogout").on("click",function(){
// 		var con;
// 		con = confirm("是否退出!")
// 		if(con == true){
// 			alert("清除登录信息")
// 			localStorage.removeItem("isLogin")
// 			localStorage.removeItem("loginTime")
// 			localStorage.removeItem("user")
// 			localStorage.removeItem("token")
// 		}else{
// 			return;
// 		}
// 	})
// }
// downPortraitUser()
function downPortrait(){
	var user = JSON.parse(localStorage.user)
	console.log(user)
	// $.getJSON(user,function(response) {
	// 	var list = response.data;
	// 	console.log(list)
		var html =""
			html += `<div class="head-portrait" align="center">
						<img src="${imagePrefix}${user.image}" alt="" class="head-img">
						<span class="nickname">${user.nickname}</span>
					</div>
					<div class="information">
						<div class="userinfo">
							<li class="active">个人信息</li>
							<li>修改密码</li>
							<li>修改头像</li>
							<li>修改昵称</li>
						</div>
					</div>`
		$(".content-left").html(html)
	// })
}
downPortrait()

//个人信息选项卡
$('.content').find('.userinfo').children().eq(0).addClass("active");
$('.content').find('.information-item').children().eq(0).addClass("active");
$(".content").on("click",".userinfo li",function(){
	$(this).addClass("active").siblings().removeClass('active');
	$(".content").find(".information-item").children().eq($(this).index()).addClass("active").siblings().removeClass("active");
});

//个人信息列表
function downPortraitList(){
	var user = JSON.parse(localStorage.user)
	console.log(user)
	// $.getJSON(user,function(response) {
	// 	var list = response.data;
		var token = localStorage.token
		console.log(token)
		// console.log(list)
		var html1 =""
		var html2 =""
		var html3 =""
		var html4 =""
			html1 += `<div class="item-username">用户名：${user.username}</div>
						<div class="item-phone">手机号：${user.phone}</div>
						<div class="item-nickname">昵&nbsp;&nbsp;&nbsp;称：${user.nickname}</div>`
		$(".original-information").html(html1)
		html2 += `<div class="old-password">原&nbsp; 密&nbsp; 码：<input type="password" placeholder="******" class="old-pass" id="old"  value="" /></div>
						<div class="new-password">新&nbsp; 密&nbsp; 码：<input type="password" placeholder="请输入新密码" class="new-pass" id="new"   value=""/></div>
						<div class="next-password">确认密码： <input type="password" placeholder="请确认密码" class="nnew-pass"   value=""/></div>
						<button class="confirm-password">确认修改</button>
						<button class="cancel">取消</button>`
		$(".change-password").html(html2)

		//修改密码
		$(".change-password").on("click",".confirm-password",function(){
			var oldPass = $('#old').val()
			console.log(oldPass)
			var newPass = $('#new').val()
			var NNewPassword = $('.nnew-pass').val()

			if(oldPass == ''&& newPass != "" && NNewPassword != ""){
				alert("请输入原密码");
				return;
			}
			if(newPass == ''&& oldPass != "" && NNewPassword != ""){
				alert("请输入新密码");
				return;
			}
			if($('#new').val().length<6){
				alert("密码不少于6位");
				return;
			}
			if(oldPass == newPass){
				alert("不能与原来的密码相同");
				return;
			}
			if(newPass != NNewPassword){
				alert("密码输入错误");
				return;
			}
			var user = JSON.parse(localStorage.user)
			// $.getJSON(user,function(response){
			// 	var list = response.data;
			// 	var token = response.token
			var token = localStorage.token
			var url = changePasswordUrl
				+'&userId='+user.id
				+'&password='+oldPass
				+'&newPassword='+newPass
				+'&token='+token
			$.ajax({
        		url:url,
        		data:{old:oldPass,new:newPass},
        		dataType:"TEXT",
        		type:"POST",
        		success: function(data){
            		alert("修改成功");
            		window.location.reload()
        		}
        	})
			// });
		});

		html3 += `<div class="old-head"><span>原&nbsp; 头&nbsp; 像：</span><img src="${imagePrefix}${user.image}" alt="" /></div><br/>
						<div class="new-head"><span>新&nbsp; 头&nbsp; 像：</span><img src="" alt="" id="img" /><input type="file" name="newHeadImage" id="newHeadImage" class="upload-file" value="" onchange="dealChange()" multiple="multiple"/></div><br/>
						<button class="confirm-head">确认修改</button>
						<button class="cancel">取消</button>`
		$(".change-head").html(html3)

		//修改头像
		
$(".confirm-head").on("click",function(){
				
	//step1: 拿到图片
	var newHeadImageTag = document.getElementById("newHeadImage");
	// input type="file"  这个js标签带有熟悉 files
	if(newHeadImageTag.files.length==0){
		alert("没有选择图片");
		return;
	}
	//alert("有图片");
	//	核心语句
	var uploadFile = newHeadImageTag.files[0];
	
	var user = JSON.parse(localStorage.user)
	//step2: 生成formData
	var formData = new FormData();
	formData.append("m","user");
	formData.append("a","changeHeadImage");
	formData.append("userId",user.id);
	formData.append("newHeadImage",uploadFile);
	formData.append("token",localStorage.token);
	
	
	//step3: 发起请求
	var url = changeHeadImageUrl;
	$.ajax({
		type:"post",
		url:url,
		data:formData,
		async:true,
		processData:false,	//默认true, 会转化为查询字符串, 上传文件,不处理数据,
		contentType:false
	}).done(function (r) {
		//r 是json字符串
		var dict = JSON.parse(r);
		console.log(dict)
		var headImage = imagePrefix + dict.data.url
		this.headImage = this.selectHeadImage
		var newUrl = dict.data.url
		user.image = newUrl
		localStorage.user = JSON.stringify(user)
		window.location.reload()
	});
})
		html4 += `<div class="old-nickname">原&nbsp; 昵&nbsp; 称：${user.nickname}</div>
						<div class="new-nickname">新&nbsp; 昵&nbsp; 称：<input type="text" id="newName"/></div>
						<button class="confirm-name">确认修改</button>
						<button class="cancel">取消</button>`
		$(".change-nickname").html(html4)
	// })
	// 
	// 修改昵称
	$(".confirm-name").on("click",function(){
		var newName = $('#newName').val()
		console.log(newName)
		var user = JSON.parse(localStorage.user)
		if(newName == user.nickname){
			alert("不能与原昵称相同");
			return;
		}
		if($('#newName').val().length<4){
			alert("昵称必须大于四位");
			return;
		}
		var url = changeNicknameUrl
				+'&userId='+user.id
				+'&newNickname='+newName
				+'&token='+token
		console.log(url)
			$.ajax({
        		url:url,
        		data:{new:newName},
        		dataType:"TEXT",
        		type:"POST",
        		success: function(data){
            		alert("修改成功");
            		user.nickname = newName
					localStorage.user = JSON.stringify(user)
            		window.location.reload()
        		}
        	})
	});


	//取消修改
	$(".cancel").on("click",function(){
		window.location.reload()
	});
}
downPortraitList()

function dealChange () {
				
	//step1: 拿到图片
	var newHeadImageTag = document.getElementById("newHeadImage");
	// input type="file"  这个js标签带有熟悉 files
	if(newHeadImageTag.files.length==0){
		alert("没有选择图片");
		return;
	}
	//alert("有图片");
	
	var uploadFile = newHeadImageTag.files[0];
	//alert("name="+uploadFile.name+" size="+uploadFile.size)
	var src = window.URL.createObjectURL(uploadFile);
	//blob:http://127.0.0.1:8020/1c3fccfd-d8d7-451d-8185-ac9220c8129d
	//alert(src);
	
	//显示图片
	$("#img").attr("src",src);				
}