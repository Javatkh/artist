// 进入页面判断是否登录
if(localStorage.isLogin == "1"){
    var user = JSON.parse(localStorage.user)
    $(".login").html(user.username)
    $(".header-right a:first-child").show()
    $(".login").attr("href","./user.html")
    $(".reg").html("退出登录")
    $(".reg").attr("href","javascript:;")
    $(".reg").on("click",function(){
        localStorage.removeItem("isLogin")
        localStorage.removeItem("loginTime")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        location.href = "./index.html"
    })
}

//排行选项卡
$.fn.extend({
	tab:function(className){
		className = className || "active";
		this.each(function(index,ele){
			$(ele).children().eq(0).children().eq(0).addClass(className)
			$(ele).children().eq(1).children().eq(0).addClass(className)
			$(ele).children().eq(0).children().click(function(){
				$(this).addClass(className).siblings().removeClass(className);
				$(ele).children().eq(1).children().eq($(this).index()).addClass(className).siblings().removeClass(className);
			});
		});
	}
});
$(".ranking").tab("on");


//排行数据
function downRankingList() {

	var url = rankingListUrl
	$.getJSON(url,function(response) {

		var list = response.data;
		var html1 = ""
		var html2 = ""
		var html3 = ""

		var pageName =""

		
		for(var index in list[0]) {
			var item = list[0][index];
			// console.log(item)

	        // console.log(Number(index)+1)


			html1+=`<div id="${item.id}" class="ranking-week">
						<span>${Number(index)+1}</span>
						<span>${item.title}</span>
					</div>`

		}
		for(var index in list[1]) {
			var item = list[1][index];
			// console.log(item)

			html2+=`<div id="${item.id}" class="ranking-week">
						<span>${Number(index)+1}</span>
						<span>${item.title}</span>
					</div>`

		}
		for(var index in list[2]) {
			var item = list[2][index];
			// console.log(item)

			html3+=`<div id="${item.id}" class="ranking-week">
						<span>${Number(index)+1}</span>
						<span>${item.title}</span>
					</div>`

		}

		$(".ranking-week-content").html(html1)
		$(".ranking-month-content").html(html2)
		$(".ranking-all-content").html(html3)

		var itemList1 = $(".ranking-week-content").children()
		itemList1.each(function(index,ele){
			$(ele).on("click",function(){
				if (list[0][index].category == '1') {
		            pageName = "readDetail.html"
		        } else if (list[0][index].category == '4') {
		            pageName = "musicDetail.html"
		        } else if (list[0][index].category == '5') {
		            pageName = "movieDetail.html"
	        	}
			})
		})

		var itemList2 = $(".ranking-month-content").children()
		itemList2.each(function(index,ele){
			$(ele).on("click",function(){
				if (list[1][index].category == '1') {
		            pageName = "readDetail.html"
		        } else if (list[1][index].category == '4') {
		            pageName = "musicDetail.html"
		        } else if (list[1][index].category == '5') {
		            pageName = "movieDetail.html"
	        	}
			})
		})

		var itemList3 = $(".ranking-all-content").children()
		itemList3.each(function(index,ele){
			$(ele).on("click",function(){
				if (list[2][index].category == '1') {
		            pageName = "readDetail.html"
		        } else if (list[2][index].category == '4') {
		            pageName = "musicDetail.html"
		        } else if (list[2][index].category == '5') {
		            pageName = "movieDetail.html"
	        	}
			})
		})

		// 绑定点击
		$(".ranking-list-content .ranking-week").on("click", function(event) {
			var id = event.currentTarget.id
			console.log("id = " + id)

			sessionStorage.id = id
			location.href = pageName
		})

		
	})


}
downRankingList()


//随机推荐数据
function downRandomList() {

	var url = recommendRandomListUrl
	$.getJSON(url,function(response) {

		var list = response.data;
		
		var pageName ="" 
		
		var html = ""
		for(var index in list) {
			var item = list[index];

			html += `<div id="${item.id}" class="recommendation">
						<div class="recommendation-title">
							<span>${item.title}</span>
						</div>
						<div class="recommendation-content">
							${item.forward}
						</div>
					</div>`

		}

		$(".random-comtent").html(html)

		var itemList = $(".random-comtent").children()
		itemList.each(function(index,ele){
			$(ele).on("click",function(){
				console.log(list)
				if (list[index].category == '1') {
		            pageName = "readDetail.html"
		            console.log('pageName='+pageName)
		        } else if (list[index].category == '4') {
		            pageName = "musicDetail.html"
		            console.log('pageName='+pageName)
		        } else if (list[index].category == '5') {
		            pageName = "movieDetail.html"
		            console.log('pageName='+pageName)
	        	}
			})
		})

		//绑定点击
		$(".random-comtent .recommendation").on("click", function(event) {
			console.log(event)
			var id = event.currentTarget.id
			console.log("id = " + id)
			sessionStorage.id = id
			location.href = pageName
		})


	})
}
downRandomList()

// 搜索input框
function doChange(){
	var value = $("#search_inp").val()
	localStorage.iptValue = value
}

