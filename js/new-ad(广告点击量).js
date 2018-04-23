	 //广告点击量
	$(document).on('click','.adimg',function(){

	    var ad = $(this).attr('rel');

	    $.post('/adnum',{ad:ad}, function(e) {

	    })
	})	


	//轮播图点击量
	$('.adv_img').click(function(){
        var ad = $(this).attr('rel');

        $.post('/adnum',{'ad':ad,'stat':1}, function(e) {

        })

    })


    //延迟加载
	$(document).ready(function(){
	      $('.imgloadinglater').lazyload({
            threshold : -100, //距离100像素触发
            effect : "fadeIn" //显示特效
        });
    });
    //首页文章列表效果
    $('.h-article-list li').hover(function(){
        $(this).addClass('on').prev('li').addClass('oe');
    },function(){
        $(this).removeClass('on').prev('li').removeClass('oe');
    })
    






