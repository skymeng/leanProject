function getJsonByAjax(formID,url,onLoadSuccess,isShowLoding){
	if(isShowLoding)showLoading("加载中。。。");
	$.ajax({
		type : "post",
		async : true,
		dataType : 'json',
		url : url,
		data: $('#'+formID).serialize(),
		timeout:60000,//0是没有时间显示
		success : function(data){
			if(isShowLoding)hideLoading();
			onLoadSuccess(data);
		},
		error:function(response,opts){
			if(isShowLoding)hideLoading();
			showAlert("请求超时，请稍后再试!");
			return false;
		}
	});
}

function getHtmlByAjax(formID,url,onLoadSuccess,isShowLoding){
	if(isShowLoding)showLoading("加载中。。。");
	$.ajax({
		type : "post",
		async : true,
		dataType : 'html',
		url : url,
		data: $('#'+formID).serialize(),
		timeout:60000,//0是没有时间显示
		success : function(data){
			if(isShowLoding)hideLoading();
			onLoadSuccess(data);
		},
		error:function(response,opts){
			if(isShowLoding)hideLoading();
			showAlert("请求超时，请稍后再试!");
			return false;
		}
	});
}

function getJsonByajaxForm(formID,url,onLoadSuccess,isShowLoding){
	if(isShowLoding)showLoading("加载中。。。");
	$('#'+formID).ajaxSubmit({
		type : "post",
		async : true,
		dataType : 'json',
		url : url,
		timeout:60000,//0是没有时间显示  
		success : function(data){
			if(isShowLoding)hideLoading();
			onLoadSuccess(data);
		},
		failure:function(response,opts){
			if(isShowLoding)hideLoading();
			showAlert("请求超时，请稍后再试!");
	     	return false;
	    }
	}); 
}

function getHTMLByajaxForm(formID,url,onLoadSuccess,isShowLoding){
	if(isShowLoding)showLoading("加载中。。。");
	$('#'+formID).ajaxSubmit({
		type : "post",
		async : true,
		dataType : 'html',
		url : url,
		timeout:60000,//0是没有时间显示  
		success : function(data){
			if(isShowLoding)hideLoading();
			onLoadSuccess(data);
		},
		failure:function(response,opts){  
			if(isShowLoding)hideLoading();
			showAlert("请求超时，请稍后再试!");
	     	return false;
	    }
	}); 
}

/**
 * Ajax发送post请求，返回数据类型为html
 * @param url           请求地址
 * @param parameters    post参数
 * @param onLoadSuccess Ajax请求成功后回调函数
 */
function getHtmlDataByPost(url, parameters, onLoadSuccess,isShowLoding) {
	if(isShowLoding)showLoading("加载中。。。");
	var type = "POST";
	var async = true;
	var dataType = "html";
	var timeout = 60000;
	var data = parameters;
	
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			if(isShowLoding)hideLoading();
			onLoadSuccess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			hideLoading();
		}
	});
}

/**
 * Ajax发送get请求，返回数据类型为html
 * @param url           请求地址
 * @param onLoadSuccess Ajax请求成功后回调函数
 */
function getHtmlDataByGet(url, onLoadSuccess) {
	var type = "GET";
	var async = true;
	var dataType = "html";
	var timeout = 60000;
	var data="";
	
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			onLoadSuccess(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function getJsonDataByGet(url, onLoadSuccess) {
	if(isShowLoding)showLoading("加载中。。。");
	var type = "GET";
	var async = true;
	var dataType = "Json";
	var timeout = 60000;
	var data="";
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			if(isShowLoding)hideLoading();
			onLoadSuccess(data); 
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(isShowLoding)hideLoading();
		}
	});
}

function getJsonDataByPost(url,para,onLoadSuccess,isShowLoding) {
	if(isShowLoding)showLoading("加载中。。。");
	var type = "post";
	var async = true;
	var dataType = "Json";
	var timeout = 60000;
	var data=para;
	
	$.ajax({
		type : type,
		url : url,
		async : async,
		dataType : dataType,
		timeout : timeout,
		data : data,
		success : function(data, statu) {
			if(isShowLoding)hideLoading();
			onLoadSuccess(data); 
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			if(isShowLoding)hideLoading();
		}
	});
}

//unicode解码
function reconvert(str){ 
	str = str.replace(/(\\u)(\w{4})/gi,function($0){ 
	return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{4})/g,"$2")),16))); 
	});
	
	str = str.replace(/(&#x)(\w{4});/gi,function($0){ 
	return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{4})(%3B)/g,"$2"),16)); 
	});
	return str;
}

function openAwidow(url){
	var iWidth = 1200 ;
	var iHeight = 700 ;
	var iTop = ( window . screen . availHeight - 30 - iHeight ) / 2 ;
	var iLeft = ( window . screen . availWidth - 10 - iWidth ) / 2 ;
	window.open (url, "newwindow", "height="+iHeight+", width="+iWidth+", top="+iTop+",left="+iLeft+",toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no");
}

/**
 * 自动填充表单
 * @param obj:json数据
 */
function fillForm(obj){
	var key,value,tagName,type,arr;
	for(x in obj){
	    key = x;
	    value = obj[x];
	    $("[name='"+key+"'],[name='"+key+"[]']").each(function(){
	      tagName = $(this)[0].tagName;
	      type = $(this).attr('type');
	      if(tagName=='INPUT'){
	        if(type=='radio'){
	          $(this).attr('checked',$(this).val()==value);
	        }else if(type=='checkbox'){
	          arr = value.split(',');
	          for(var i =0;i<arr.length;i++){
	            if($(this).val()==arr[i]){
	              $(this).attr('checked',true);
	              break;
	            }
	          }
	        }else{
	          $(this).val(value);
	        }
	      }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
	        $(this).val(value);
	      }else if(tagName=='DIV'){
	        $(this).html(value);
	      }
	    });
	}
}

function getsuffix(file_name){
	var result = file_name.substr(file_name.lastIndexOf("."));
	return result;
}
function removeLastChar(str){
	return str.substring(0,str.length-1);
}

/**
 * 显示等待框
 * @param title
 * @returns
 */
function showLoading(title) {
	if(typeof(title)=="undefined"){
		title = "加载中...";
	}
	var rootUrl = $("#loadingPath").val();
	
	if(rootUrl){
		rootUrl = rootUrl+"/images/loading_03.gif";
	}else{
		rootUrl = "images/loading_03.gif";
	}
	var str = '<div id="orLoading"><div class="orDialogBg" style="z-index:199999;"></div><div class="orDialogBox orDgLoading" style="z-index:199999;"><img src="'+rootUrl+'"/><p>'+title+'</p></div></div>';
	$(str).appendTo("body");
}

/**
 * 关闭等待框
 * @param title
 * @returns
 */
function hideLoading(){
	$("#orLoading").remove();
}
/**
 * 显示提示
 * @param title
 * @returns
 */
function showAlert(title,id){
	if(typeof(id)!="undefined"){
		id = "id='" + id +  "'";
	}else{
		id="";
	}
	var content = '<div '+id+' class="evaluationConPW popWin promptPW"  name="currency_popup_name" style="display: block;"><div><div class="header"><div class="fl">提示</div><div class="fr"><span class="close closeIco" onclick="hideAlert('+id+')"></span></div>'+
	'</div><div class="con"><p class="conP conP3">'+title+' </p></div>'+
	'<div class="footer"><a href="javascript:hideAlert('+id+')"class="btn sure">确定</a>';
	$(content).appendTo("body");
}

function showMAlertNew(title,fct,buttonTitle,id){
	if(typeof(id)!="undefined"){
		id = "id='" + id +  "'";
	}else{
		id="";
	}
	var content = '<div '+id+' class="evaluationConPW popWin promptPW"  name="currency_popup_name" style="display: block;"><div><div class="header"><div class="fl">提示</div><div class="fr"><span class="close closeIco" onclick="hideAlert('+id+');"></span></div>'+
	'</div><div class="con"><p class="conP">'+title+' </p></div>'+
	'<div class="footer"><a href="javascript:hideAlert('+id+');'+ fct + '"class="btn sure">'+buttonTitle+'</a>';
	$(content).appendTo("body");
}

/**
 * 显示提示 带返回函数
 * @param title
 * @returns
 */
function showMAlert(title,fct,id){
	if(typeof(id)!="undefined"){
		id = "id='" + id +  "'";
	}else{
		id="";
	}
	var content = '<div '+id+' class="evaluationConPW popWin promptPW"  name="currency_popup_name" style="display: block;"><div><div class="header"><div class="fl">提示</div><div class="fr"><span class="close closeIco" onclick="hideAlert('+id+');'+ fct + '"></span></div>'+
	'</div><div class="con"><p class="conP">'+title+' </p></div>'+
	'<div class="footer"><a href="javascript:hideAlert('+id+');'+ fct + '"class="btn sure">确定</a>';
	$(content).appendTo("body");
}

/**
 * 显示提示 关闭窗口
 * @param title
 * @returns 
 */
function showMAlertAndCloseWindow(title){
	$('<div class="currency_popup" name="currency_popup_name">' +
		'<div class="currency_popup_content">' +
			'<div class="currency_popup_title">' +
				'<em>提示</em>' +
				'<img src="sharkRes/image/order_price_popup_title.png" onclick="javascript:windowClose()" width="10" height="10">' +
			'</div>' +
			'<p>'+title+'</p>' +
			'<a class="currency_confirm_payment" style="margin-left: 33%" href="javascript:windowClose()">确定</a>' +
		'</div>' +
	'</div>').appendTo("body");
}

function hideAlert(id){
	if(typeof(id)!="undefined" && id!=''){
		$('#' + id).remove();
	}else{
		$('div[name="currency_popup_name"]').remove();
	}
}

/**
 * 关闭窗口
 */
function windowClose(){
	window.close();
}

/**
 * 显示确认框
 * @param id 编号
 * @param title 标题内容
 * @param fct	传入JS函数名称 如 需要点“确认”调用函数function test()，则填入字符串'test()'
 */
function showConfirm(title,fct,id){
	if(typeof(id)!="undefined"){
		id = "id='" + id +  "'";
	}else{
		id="";
	}
  //  $('<div '+id+' class="currency_popup"><div class="currency_popup_content"><div class="currency_popup_title"><em>提示</em><img src="sharkRes/image/order_price_popup_title.png" onclick=javascript:$(".currency_popup").hide(); width="10" height="10"></div><p>'+title+'</p><a class="currency_confirm_payment" href="javascript:'+ fct + '";>确定</a><a  href="#"  onclick=javascript:$(".currency_popup").hide();>取消</a></div></div>').appendTo("body");
	$('<div '+id+' class="submitNotModifyPW popWin promptPW" name="currency_popup_name" style="display: block;"><div><div class="header">'+
	'<div class="fl">提示</div><div class="fr"><span class="close closeIco" onclick="hideAlert('+id+')";></span></div>'+
	'</div><div class="con"><p class="conP"> '+title+' </p></div>'+
	'<div class="footer"><a  href="javascript:'+ fct + '"; class="btn sure">确定</a><a href="javascript:hideAlert('+id+')" class="btn giveup";>取消</a></div></div></div>').appendTo("body");

}

function showConfirmNew(title,fct,id){
	if(typeof(id)!="undefined"){
		id = "id='" + id +  "'";
	}else{
		id="";
	}
    $('<div '+id+' class="sureSubmitCpPW popWin promptPW"><div><div class="header"><div class="fl">提示</div><div class="fr"><span class="close closeIco"></span></div></div><div class="con"><p class="conP">'+title+'</p></div><div class="footer"> <a class="btn sure" href="javascript:;" onclick="javascript:'+ fct + '";>确定</a><a href="javascript:;" class="btn giveup" onclick=javascript:$(".sureSubmitCpPW").remove();>取消</a></div></div></div>').appendTo("body");
}

/**
 * 
 * @param title  提示信息
 * @param sureTitle   确定按钮名称
 * @param cancelTitle  取消按钮名称
 * @param sureFunction    确定回调函数
 */
function showConfiem_1(title,sureTitle,cancelTitle,sureFunction){
$('<div class="submitNotModifyPW popWin promptPW" name="currency_popup_name" style="display: block;"><div><div class="header">'+
		'<div class="fl">温馨提示</div><div class="fr"><span class="close closeIco" onclick="javascript:hideAlert();"></span></div>'+
		'</div><div class="con"><p class="conP"> '+title+' </p></div>'+
		'<div class="footer"><a href="javascript:'+ sureFunction + '"; class="btn sure">'+sureTitle+'</a><a href="javascript:hideAlert();" class="btn giveup";>'+cancelTitle+'</a></div></div></div>').appendTo("body");
}

function getQueryString(name,url) {
	var str= new Array(); 
	str = url.split('?');
	if(str != null){
		  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		    var r = str[1].match(reg);
		    if (r != null) {
		    	return unescape(r[2]); 
		    }
	}
    return "";
}

function hideConfirm(){
	$(".submitNotModifyPW").remove();
}

function hideConfirmNew(){
	$(".sureSubmitCpPW").remove();
}

/**
 * 快捷ajax提交
 * @param url
 * @param data
 * @param callback
 * @param error
 * @returns
 */
function json(url, data, callback, error){
    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'json',
        success: callback,
        error: error
    });
}

//升降排序插件
jQuery.fn.sortElements = (function(){
    var sort = [].sort;
    return function(comparator, getSortable) {
        getSortable = getSortable || function(){return this;};
        var placements = this.map(function(){
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            return function() {
                if (parentNode === this) {
                    throw new Error(
                    );
                }
                parentNode.insertBefore(this, nextSibling);
                parentNode.removeChild(nextSibling);
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
})();

function copyValue(strValue){
	var Url2=document.getElementById("orNewPayCopyText");
	Url2.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	showAlert("复制成功!");  
}

//创建form跳转url
function getInfo(url){
	showLoading("加载中。。。");
	var form = $("<form method='post'></form>");
	var action = url;
	if(url.indexOf("?")>0){
		url = url.split("?");
		action = url[0];
		var params = url[1].split("&");//参数
		for(var i=0;i<params.length;i++){
			var param = params[i].split("=");
			var html = "<input name='"+param[0]+"' value='"+param[1]+"' type='hidden' />";
			form.append(html);
		}
	}
	form.hide().appendTo("body");
	form.attr("action",action);
	form.submit();
}
