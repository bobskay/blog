//input字段设置validate属性,validate.valiFrom的时候就会split这个validate,然后调用regx验证,如果regx离是正则就用正则匹配,否则用方法

var validates=[
    {name:"common",regx:/[^0-9a-zA-Z\u4e00-\u9fa5_|]/g,msg:"格式不正确"},//没写的时候默认值
	{name:"text",regx:/[^0-9a-zA-Z\u4e00-\u9fa5]/g,msg:"只能是数字字母或汉字"},
	{name:"number",regx:/[^0-9]/g,msg:"只能是数字"},
	{name:"ip",regx:/[^0-9.]/g,msg:"不是有效的ip"},
	{name:"letter",regx:/[^a-zA-Z]/g,msg:"只能是字母"},
	{name:"remark",regx:/[^0-9a-zA-Z\u4e00-\u9fa5_，。！（）]/g,msg:"格式不正确"},//备注字段允许填的
	{name:"code",regx:/[^a-zA-Z0-9_]/g,msg:"只能是数字字母或下划线"},
	{name:"url",regx:/[^a-zA-Z0-9_:/.&\\?=]/g,msg:"不是有效的地址"},
	{name:"email",regx:/[^a-zA-Z0-9_@/.]/g,msg:"不是有效的邮箱"},
	{name:"date",regx:common.isDate,msg:"不是有效的日期"},
	{name:"datetime",regx:common.isDatetime,msg:"不是有效的时间"}
]

function Validate() {
}

Validate.prototype.valiForm=function(form) {
	var els=form.elements;
	for(var i=0;i<els.length;i++){
		var vali=$(els[i]).attr("validate");
		if(!vali){
			continue;
		}
		if(!this.valiElement(els[i],vali)){
			return false;
		}
	}
	return true;
}

Validate.prototype.valiElement=function(el,vali) {
	var value=el.value;
	if(!value){
		if(vali=="notNull"){
			dialog.alert(this.getName(el)+"不能为空");
			return false;
		}
		if(vali.indexOf("notNull,")==0){
			dialog.alert(this.getName(el)+"不能为空");
			return false;
		}
	}
	//将notNull前缀去掉
	if(vali.indexOf("notNull,")==0){
		vali=vali.substring("notNull,".length);
	}
	
	//去掉notNull前缀
	if(vali=="notNull"){
		vali="";
	}
	if(!vali||vali=="none"){
		return true;
	}
	for(var i=0;i<validates.length;i++){
		if(vali==validates[i].name){
			if(typeof(validates[i].regx)=='function'){
				var msg=validates[i].regx(value);
				if(msg!=true){
					dialog.alert(this.getName(el)+msg);
					return false;
				}
				return true;
			}
			var success=(value==value.replace(validates[i].regx,''));			
			if(!success){
				dialog.alert(this.getName(el)+validates[i].msg);
				return false;
			}
			return true;
		}
	}
	if(value!=value.replace(eval("/[^"+vali+"]/g"),'')){
		dialog.alert(this.getName(el)+"格式不正确");
		return false;
	}
	
	return true;
	
	
}

Validate.prototype.getName=function(el) {
	var text=$(el).parent().prev().text();
	return text;
}

var validate = new Validate();



