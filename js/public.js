/**
 * 过滤字符串左右空白
 * @param $input
 */
function inputTrim($input)
{
    var tmp = $input.val().replace(/(^\s*)|(\s*$)/g,'');
    $input.val(tmp);
}

function loginPe()
{
    $.ajax({
        url: PUBLIC+'/site/callback/loginPe',
        type: "post",
		dataType:"json",
        success: function (response)
		{
            var _window = window.open();
            _window.location = response.data.peurl;
        }
    });
}

function isPC()
{
    var uAgent = navigator.userAgent;
    var devices = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;

    for(var i = 0; i < devices.length; i++)
    {
        if(uAgent.indexOf(devices[i]) > 0)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

var publicApi={
			//tab切换
			tabs:function(idname,idlist,idnav){
				var id="."+idname;
				$(id+" ."+idnav+"").hide();
				$(id+" ."+idnav+":eq(0)").show();
				//$(id+" li").removeClass("cur");
				//$(id+" li:eq(0)").addClass("cur");
				$(id).on("click","."+idlist+" li",function(){
					var index=$(this).index();
					$(this).addClass("cur").siblings().removeClass("cur");
					$(id+" ."+idnav+":eq("+index+")").show().siblings("."+idnav+"").hide();
				});
			},
			//单选
			Radio:function(rList,rCategory){
				$("."+rList+" "+rCategory+"").live('click',function(){
					$(this).addClass("cur").siblings(""+rCategory+"").removeClass("cur");
					return false;
				})
			},
			Reply:function(rButton){
				$("."+rButton+"").live('click',function(){
					$(this).toggleClass('cur');
				})
			},
			//下拉
			Select:function(sSon,sId,sList){	
				
				$("."+sSon+"").live('click',function(){
					$(this).parent("."+sId+"").addClass('show');
				})
				$("."+sList+" li").live('click',function(){
					var name =$(this).html();
					$(this).parents("."+sId+"").find("."+sSon+" em").html(name);
					$(this).parents("."+sId+"").removeClass('show');
				})
			},
			hHover:function(hStart,hEnd){
				$("."+hStart+"").hover(function(){
					$(this).addClass(""+hEnd+"");
				},function(){
					$(this).removeClass(""+hEnd+"");
				});
			},
			hHLive:function(lOne,lTwo,lThree){
				$(document).live('click',function(){
					if($("."+lOne+"").hasClass(""+lTwo+"")==false){
						$("."+lOne+"").removeClass(""+lThree+"");
					}
				})
			},
			//弹出框
			popup:function(pStart,pIcon,pEnd){
				$("."+pStart+"").live('click',function(){
					$("."+pEnd+"").fadeIn();
				})
				$("."+pIcon+"").live('click',function(){
					$("."+pEnd+"").fadeOut();
				})
			}
}
$(function(){
	$(".pTButton").live('click',function(){
		$(this).parent('.pTName').addClass('pTNShow');
	})
	$(".pTNList li.quit a").live('click',function(){
	 	$(this).parents('.pTName').removeClass('pTNShow');
	});
	publicApi.hHover("pTName","pTNCur");
	publicApi.hHLive("pTName","pTNCur","pTNShow");
	//返回顶部
	$(window).scroll(function() {		
		if($(window).scrollTop() >= 100){
			$('.bTop').fadeIn(300); 
		}else{    
			$('.bTop').fadeOut(300);    
		}  
	});

	$(".bTop").click(function(event) {
			/* Act on the event */
			$("html,body").animate({
				scrollTop:"0px"},
				666
			)
	});
})