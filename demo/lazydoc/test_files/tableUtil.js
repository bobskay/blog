
function TableUtil() {
	this.sidePagination='';//客户端还是服务端分页
	//每次点击查询就保存一下查询条件,分页的时候要用到
	this.queryParam={};
	this.tableId="";
}

TableUtil.prototype.init = function(divId,columns,url,idField) {
	//如果传了url,客户端分页,否则服务端分页
	var sidePagination='clent';
	if(url){
		sidePagination='server';
	}
	this.queryParam={};
	this.tableId=divId;
	tableUtil.sidePagination=sidePagination;
	  $('#'+divId).bootstrapTable({
	  url: url,         //请求后台的URL（*）
	  method: 'get',                      //请求方式（*）
	  toolbar: '#toolbar',                //工具按钮用哪个容器
	  striped: true,                      //是否显示行间隔色
	  cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	  sortable: true,                     //是否启用排序
	  sortOrder: "asc",                   //排序方式
	  queryParams: tableUtil.queryParams,//传递参数（*）
	  pagination: true,                   //是否显示分页（*）
	  sidePagination:sidePagination,           //分页方式：client客户端分页，server服务端分页（*）
	  pageNumber:1,                       //初始化加载第一页，默认第一页
	  pageSize: 10,                       //每页的记录行数（*）
	  pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
	  search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	  strictSearch: true,
	  showColumns: false,                  //是否显示所有的列
	  showRefresh: false,                  //是否显示刷新按钮
	  minimumCountColumns: 2,             //最少允许的列数
	  clickToSelect: true,                //是否启用点击选中行
	//  height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	  uniqueId: idField,                     //每一行的唯一标识，一般为主键列
	  showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
	  cardView: false,                    //是否显示详细视图
	  detailView: false,                   //是否显示父子表
	  columns: columns,
	  responseHandler:tableUtil.responseHandler
  });

}

TableUtil.prototype.responseHandler=function(resp){
	var data={};
	if(this.sidePagination=='server'){
		data["total"]=resp.data.totalCount;
		data["rows"]=resp.data.result;
	}
	return data;
}

TableUtil.prototype.queryParams=function(params){
	var pp=tableUtil.queryParam;
	pp["limit"]=params.limit;
	pp["offset"]=params.offset;
	pp["order"]=params.order;
	return pp;
}



TableUtil.prototype.initQuery = function(queryBtn,queryResult,searchForm) {
	$("#"+queryBtn).click(function(){
		var param=$("#"+searchForm).serializeArray()
		var data={};
		for(var i=0;i<param.length;i++){
			data[param[i].name]=param[i].value;
		}
		var url=$("#"+searchForm).attr("action");
		if(!validate.valiForm($("#"+searchForm)[0])){
			return;
		}
		
		data.limit=10;
		data.offset=0;
		tableUtil.queryParam=data;
		dialog.loading();
		ajaxUtil.json(url,data,function (resp) {
			dialog.loading(false);
			if(resp.success){
				var data=resp.data;
				if(tableUtil.sidePagination=='server'){
					data={"total":data.totalCount,"rows":data.result};
				}
				console.log(data)
				$("#"+queryResult).bootstrapTable('removeAll');
				$('#'+queryResult).bootstrapTable('selectPage',1);
				$('#'+queryResult).bootstrapTable('load',data);
			}else{
				dialog.alert(resp.message);
			}
	       
	    });
		
	});
}

TableUtil.prototype.insertRow=function(data){
	$("#"+this.tableId).bootstrapTable('insertRow', {index: 0, row: data});
}


TableUtil.prototype.remove=function(field,values){
	$("#"+this.tableId).bootstrapTable('remove', {field: field, values: values});
}

TableUtil.prototype.update=function(id,row){
	$("#"+this.tableId).bootstrapTable('updateByUniqueId', {id: id, row: row});
}


TableUtil.prototype.link=function(value, row, index){
	return [
		'<a href="JavaScript:" class="linkHref">'+value+'</a>'
	].join("")	
}




var tableUtil=new TableUtil();