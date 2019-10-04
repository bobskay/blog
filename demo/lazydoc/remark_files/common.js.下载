devModel=false;
var validates=[
    {name:"common",regx:/[^0-9a-zA-Z\u4e00-\u9fa5_|]/g,msg:"格式不正确"},//没写的时候默认值
	{name:"text",regx:/[^0-9a-zA-Z\u4e00-\u9fa5]/g,msg:"只能是数字字母或汉字"},
	{name:"number",regx:/[^0-9]/g,msg:"只能是数字"},
	{name:"ip",regx:/[^0-9.]/g,msg:"不是有效的ip"},
	{name:"letter",regx:/[^a-zA-Z]/g,msg:"只能是字母"},
	{name:"remark",regx:/[^0-9a-zA-Z\u4e00-\u9fa5_，。！（）]/g,msg:"格式不正确"},//备注字段允许填的
	{name:"code",regx:/[^a-zA-Z0-9_]/g,msg:"只能是数字字母或下划线"},
	{name:"url",regx:/[^a-zA-Z0-9_:/.&\\?=]/g,msg:"不是有效的地址"},
	{name:"email",regx:/[^a-zA-Z0-9_@/.]/g,msg:"不是有效的邮箱"}
]

//工具类,提供在一些在框架里常用的方法
function Common() {
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