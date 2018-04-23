//关注推荐设计师
$(document).on('click','.h-follow-btn a',function(){

    var did="";  
    $("[name='follow'][checked]").each(function(){  
        did +=$(this).val()+',';  
    })  
    $.ajax({
        type : "post",
        url  : "/followDesign",
        dataType :'json',  
        data : {'designer':did},  
        success:function(msg) { 

            if(msg.code == 1){
                location.reload();
            }else{

                globalTip(msg);
            }
        }
    })

    return false;
})