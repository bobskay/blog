function AjaxUtil() {
}


// 获取html
AjaxUtil.prototype.html = function(url, callback) {
	$.ajax({
		type : "get",
		url : url,
		error : function(request, textStatus) {
			var text=request.responseText;
			console.log(text);
			if(devModel){
				window.prompt("ajaxError:"+request.status+","+request.readyState+","+textStatus,url);
			}else{
				throw url+":"+textStatus;
			}
		},
		async: true,
		success : function(response){
			callback(response);
		}
	});
}

/**获取后台返回的json*/
AjaxUtil.prototype.json = function(url, data, fun,dataType) {
	var type = "get";
	if (data) {
		type = "post";
	}
	
	if (url.search('\\?') == -1) {
		url += "?";
	} else {
		url += "&";
	}
	url += "temp=" + new Date().getTime();
	jQuery.ajax({
		url : url, // 提交的页面
		data : data, // 从表单中获取数据
		type : type,
		beforeSend : function() {
		},
		error : function(request, textStatus) {
			var text=request.responseText;
			console.log(text)
			if(text){
				var js=eval("("+text+")");
				fun(js)
				return;
			}
			if(devModel){
				window.prompt("ajaxError:"+request.status+","+request.readyState+","+textStatus,url);
			}else{
				throw url+":"+textStatus;
			}
		},
		success : function(result) {
			fun(result);
		}
	});
}



/**获取后台返回的json*/
AjaxUtil.prototype.postJson = function(url, data, fun) {
	jQuery.ajax({
		url : url, 
		data : data, 
		type: "POST",
		contentType: 'application/json',
		datatype:"JSON",
		beforeSend : function() {
		},
		error : function(request, textStatus) {
			var text=request.responseText;
			console.log(text)
			if(text){
				var js=eval("("+text+")");
				fun(js)
				return;
			}
			if(devModel){
				window.prompt("ajaxError:"+request.status+","+request.readyState+","+textStatus,url);
			}else{
				throw url+":"+textStatus;
			}
		},
		success : function(result) {
			fun(result);
		}
	});
}



var ajaxUtil = new AjaxUtil();