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
			if(value!=value.replace(validates[i].regx,'')){
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



