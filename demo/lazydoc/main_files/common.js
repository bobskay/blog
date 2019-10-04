devModel=false;

//工具类,提供在一些在框架里常用的方法
function Common() {
}

//判断字符串是否是日期
Common.prototype.isDate=function(txt,error){
	if(!txt){
		return true;
	}
	var message=error||"日期格式应为:YYYY-MM-DD";
	var txts=txt.split("-");
	if(txts.length!=3){
		return message;
	}
	try{
		
		var days=[31,29,31,30,31,30,31,31,30,31,30,31];
		if(txts[0].length>4){
			return message;
		}
		if(txts[1].length>2){
			return message;
		}
		if(txts[2].length>2){
			return message;
		}
		var year=eval(txts[0]);
		var month=eval(txts[1])
		var day=eval(txts[2])
		if(year>9999||year<0){
			return "年份不正确";
		}
		if(month>12||month<1){
			return "月份不正确";
		}
		if(day<1){
			return "日期不正确";
		}
		if(day>days[month-1]){
			return month+"月不能超过"+days[month-1]+"天";
		}
		
		if(month==2&&day==29){
			if(year%4==0&&year%100!=0){
				return true;
			}
			if(year%400==0){
				return true;
			}
			return "2月份不能大于28";
		}
		
		return true;
	}catch(e){
		console.log(e);
		return message;
	}
}


//判断字符串是否是日期
Common.prototype.isDatetime=function(txt){
	if(!txt){
		return true;
	}
	var message="时间格式应为:YYYY-MM-DD hh:mm:ss";
	var txts=txt.split(" ");
	if(txts.length!=2){
		return message;
	}
	var mesg=common.isDate(txts[0],message);
	if(mesg!=true){
		return mesg;
	}
	try{
		var times=txts[1].split(":");
		var max=[24,60,60];
		var name=["小时","分钟","秒"];
		for(var i=0;i<times.length;i++){
			if(times[i].length>2){
				return message
			}
			var t=eval(times[i]);
			if(t>max[i]){
				return name[i]+"不能大于"+max[i];
			}
			if(i>1){
				if(times[0]=='24'){
					if(t>0){
						return "时间不能大于24点";
					}
				}
			}
		}
		
		return true;
	}catch(e){
		console.log(e);
		return message;
	}
}


//获取地址栏search里的参数
Common.prototype.getParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}


//获得所有checkBox
Common.prototype.getAllBox=function(){
	var box=new Array();
	var trs=$("#queryResultTable tr");
	var firstTh=$(trs[0]).children("th")[0];
	var input=$(firstTh).children("input");
	if(input.length>0){
		box.push(input[0]);
	}
	for(var i=1;i<trs.length;i++){
		var td=$(trs[i]).children("td")[0];
		var input=$(td).children("input");
		if(input.length>0){
			box.push(input[0]);
		}
	}
	return box;
}


//获得所有选中的box
Common.prototype.getCheckedBox=function(){
	var box=new Array();
	var trs=$("#queryResultTable tr");
	for(var i=1;i<trs.length;i++){
		var td=$(trs[i]).children("td")[0];
		var input=$(td).children("input");
		if(input.length>0){
			if(input[0].checked){
				box.push(input[0]);
			}
		}
	}
	return box;
}

//点击全选checkbox
Common.prototype.checkAll=function(){
	var box=common.getAllBox();
	var checked=box[0].checked;
	for(var i=1;i<box.length;i++){
		box[i].checked=checked;
	}
}

//根据checkbox选择情况设置全选box
Common.prototype.updateAllBox=function(){
	var box=common.getAllBox();
	var checkAll=true;
	for(var i=1;i<box.length;i++){
		if(!box[i].checked){
			checkAll=false;
			break;
		}
	}
	box[0].checked=checkAll;
}

//异步提交表单
Common.prototype.postForm=function(fmId,url,callback){
	var data=$("#"+fmId).serialize();
	dialog.loading();
	ajaxUtil.json(url,data,function(resp){
		dialog.loading(false);
		callback(resp)
	});
}


//异步获得html页面
Common.prototype.getHtml=function(url,callback){
	dialog.loading();
	ajaxUtil.html(url,function(ret){
		dialog.loading(false);
		callback(ret);
	})
}


Common.prototype.jsonToStr=function(json) {
	if (typeof json != 'string') {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	return json
			.replace(
					/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
					function(match) {
						var cls = 'number';
						if (/^"/.test(match)) {
							if (/:$/.test(match)) {
								cls = 'key';
							} else {
								cls = 'string';
							}
						} else if (/true|false/.test(match)) {
							cls = 'boolean';
						} else if (/null/.test(match)) {
							cls = 'null';
						}
						return '<span class="' + cls + '">' + match + '</span>';
					});
}

var common = new Common();
