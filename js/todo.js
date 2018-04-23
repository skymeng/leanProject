//测试跳转
function goTest(btn)
{
    var testId = btn.attr('testid');
    var testFlag = btn.attr('testflag');
    if(testFlag==2)
        window.location.href = PUBLIC+'/test/wex?test_id='+testId+'&back_url='+PAGE_URL;
}

function goClass(dom)
{
    var projectId = dom.attr('projectid');
    var classId = dom.attr('classid');
    if(projectId==101)
        window.location.href = PUBLIC+'/t1/task?class_id='+classId;
    if(projectId==104)
        window.location.href = PUBLIC+'/t4/task?class_id='+classId;
    if(projectId==301)  //阿里打标项目
        window.location.href = PUBLIC+'/ali1/task?class_id='+classId;
}

$('.manuscript_task_dg').click(function(){
    window.location.href = $(this).attr('href');
});


$("#closeTestSuccesslMsg,#closeTestFailMsg").click(function(){

    var testRecordId = $(this).attr('testrecordid');
    $.ajax({
        type: "POST",
        url: PUBLIC + "/site/callback/readTestNotice",
        data: {"test_record_id":testRecordId},
        dataType: "json",
        success: function(reponse)
        {
        }
    });
    $(this).parents('.test-notice').hide();
});

//弹窗关闭
$('.close').click(function(){
    $(this).parent().parent().parent().hide();
});

//跳转到有奖邀请页面
function showShare()
{
    $("#lx_ewm").show();
    $("#lx").hide();
}

//新用户提示拉新获得奖励弹窗点击确定后回调
function doCallback(){
    $.ajax({
        type: "POST",
        url: PUBLIC + "/site/callback/closeRegisterUserPop",
        dataType: "json",
        success: function(reponse)
        {
            if(reponse.status==2)
            {
                //会话超时失效
                systemMessage('会话超时失效','请重新登录','确定',"warn", function(){
                    window.location.href =  PUBLIC+"/account/index";
                });
                return;
            }
            if(reponse.status!=10)
            {
                //会话超时失效
                systemMessage('系统异常','请联系客服人员','确定',"warn");
                return;
            }
        }
    });
}

(function($){
	var monkey = $('.monkey');
	$(window).on('scroll',function(e){
		monkey.css({
			'top' :$(window).scrollTop() + 100 + 'px',
		})
	})
}(jQuery))
