/*
 * @name:   common events
 * @auth:   wuji
 * @time:   2017-11
 * */
$(function(){
	function isHidden(elem){
		// 判断元素是否隐藏
		if(window.getComputedStyle(elem, null).display == "none"){
			return true;
		}else{
			return false;
		}
	}

    // 1 公共的事件对象: 保存一些特殊的对象
    // ** 下面所涉及的对象一般都是jquery对象，除非单独声明
	var wjEvent = {
        activeElem: null,	    // 活动元素
        animOpts: null, 	    // 活动元素的动画参数
        ifHasActive: false, 	// 是否存在活动元素
        setActiveElem: function(_tar, opts){
            // 设置活动元素
            this.activeElem = _tar;
            this.animOpts = opts;
        },
        closeActiveElem: function(){
            // 关闭活动元素
            if(this.ifHasActive){
            	this.ifHasActive = false;  		// 为下一次点击时, 可以触发回收机制准备
            }else if(this.activeElem && this.activeElem.length > 0){
            	this._closeElem(this.activeElem, this.animOpts.animType, this.animOpts.cname);
                
                // 初始化
                this.activeElem = {};
                this.animOpts   = null;
            }
        },
        closeElem: function(_tar){
        	// 关闭目标元素
        	var elemAnimOpts = this.getAnimOptsFromElem(_tar);
        	this._closeElem(_tar, elemAnimOpts.animType, elemAnimOpts.cName);
        },
        showElem: function(_tar){
        	// 显示目标元素
        	var elemAnimOpts = this.getAnimOptsFromElem(_tar);
        	this._showElem(_tar, elemAnimOpts.animType, elemAnimOpts.cName);
        },
        getAnimOptsFromElem: function(_elem){
        	// 从元素 _elem 上获取动画类型
        	return {
        		animType: _elem.attr("data-anim"),
    			cName:  _elem.attr("data-cname")
        	};
        },
        _closeElem: function(_elem, animType, cName){
        	// 根据 动画类型: animType，关闭元素_elem
        	if(isHidden(_elem[0])){ return false; } 	// 如果元素已经是隐藏的, 返回

        	switch(animType){
        		case "class":
        			_elem.toggleClass(cName ? cName : "collapse");
        			break;
        		case "slide":
        			_elem.slideDown();
        			break;
        		case "fade":
        			_elem.fadeOut();
        			break;
        		default:
        			_elem.hide();
        	}
        },
        _showElem: function(_elem, animType, cName){
        	// 根据 动画类型: animType，显示元素_elem

        	// 是否自动关闭
        	this.setIfAutoClose(_elem);

        	switch(animType){
        		case "class":
        			_elem.toggleClass(cName ? cName : "collapse");
        			break;
        		case "slide":
        			_elem.slideUp();
        			break;
        		case "fade":
        			_elem.fadeIn();
        			break;
        		default:
        			_elem.show();
        	}
        },
        setIfAutoClose: function(_elem, pos){
        	/** 设置元素_elem是否自动关闭
        	 *  _elem: 要关闭的元素
        	 *  pos:   (由于是在事件冒泡到body时, 触发回收机制; 故在body前后,设置活动元素会产生不一样的效果)
        	 *          在body前设置, 回立即关闭此活动元素; 在body后设置, 会在下一次点击时才关闭
        	 * 			默认: false
        	 */
        	if(pos){ this.ifHasActive = true; }
        	if(_elem.hasClass("autoclose")){
        		this.setActiveElem(_elem, this.getAnimOptsFromElem(_elem));
        	}
        },

        checked:    "checked",              // 表单状态的 class
        radio:      "js-radio",             // 类 radio 的 class
        checkbox:   "js-checkbox",          // 类 checkbox 的 class
        form: 		"js-form", 				

        select:     "js-select-wrap",       // 类 select 的 class
        selectUl:   "js-select-ul",         // 类 select下拉列表 的 class
        selectInput: "js-select-input",     // 类 select值 的 class
        selectLi:   "js-select-li",         // 类 selectli
        selectDrop: "drop",                 // 类 select 下拉状态

        tabWrap:    "js-tab-wrap",          // tab 容器
        tab:        "js-tab",               // tab 触发
        tabTar:     "js-tab-tar",           // tab 内容
        tabActive:  "active",               // tab 激活状态
	};


	/**寻找 目标元素的方式: 
     * 触发元素的data-target属性保存设目标元素的css选择器
	 * 1 先找子元素
	 * 2 如果没找到, 再在父元素下查找
	 * 3 如果没找到，再找父元素
	 * 4 如果没找到，在整个网页中查找
	 */
	function lookTar(_trigger){
        var css = _trigger.attr("data-target");
		if(css){
			var parentCss = _trigger.attr("data-ctn"),
				_tar = null;
			
			if(parentCss){
				_tar = _trigger.parents(parentCss).find(css);
			}else{
				_tar = _trigger.find(css);  
				if(_tar.length <= 0){ _tar = _trigger.parent().find(css); }
				if(_tar.length <= 0){ _tar = _trigger.parents(css); }
				if(_tar.length <= 0){ _tar = $(css); }
			}
			
			return (_tar && _tar.length > 0) ? _tar : null;
		}else{
			return null;
		}
	}

	// 3 
	$(document.body).on("click",  function(e){
        // 先关闭活动元素
        wjEvent.closeActiveElem();

        // 确定目标元素
		var _eTar = $(e.target),
            _tar  = lookTar(_eTar);
        if(_tar == null){ return; }

        // js-close / js-show
		if(_eTar.hasClass("js-close")){
            wjEvent.closeElem(_tar);
            return;
		}else if(_eTar.hasClass("js-show")){
			wjEvent.showElem(_tar);
            return;
		}
        
        // 3种toggle
        var toggleFlag = false;     // 是否toggle动作
        if(_eTar.hasClass("js-toggle")){
            toggleFlag = true;
	    	_tar.toggle();
	    }else if(_eTar.hasClass("js-slide")){
            toggleFlag = true;
	    	_tar.slideToggle();
	    }else if(_eTar.hasClass("js-fade")){
            toggleFlag = true;
	    	_tar.fadeToggle();
	    }
        if(toggleFlag){
	    	wjEvent.setIfAutoClose(_tar);
	    	// 收起 -> 显示
			if(_eTar.attr("data-con")){
				var value = _eTar.html(),
					data_con =_eTar.attr("data-con");
				_eTar.html(data_con);
				_eTar.attr("data-con", value);
			}
        }
	});

	// 6. tab
	$(document).on("click", "." + wjEvent.tab, function(e){
		var _this = $(this),
			_wrap = _this.parents("." + wjEvent.tabWrap),
			_tars,
            actClass = wjEvent.tabActive,
            tabClass = wjEvent.tab,
            tabTar   = wjEvent.tabTar;
		
		if(_wrap.length > 0){
			_tars = _wrap.find("." + tabTar);
		}
		
		if(_tars && _tars.length > 0){
			var _tar = _tars.eq(_wrap.find("." + tabClass).index(_this));
			
			if(_tar.length > 0){
				_tars.filter("." + actClass).removeClass(actClass);
				_tar.addClass(actClass);
				
				// class 切换
				_wrap.find("."+ tabClass + "." + actClass).removeClass(actClass);
				_this.addClass(actClass);
			}
		}
	});

	// 7. select
	$(document).on("click", ".js-select-wrap", function(e){
		var _eTar = $(e.target),
			_wrap = $(this),
			_ul   = _wrap.find(".js-select-ul"),
			_input = _wrap.find(".js-select-input");
			
		if(_eTar.parents(".js-select-ul").length <= 0 && !_input.hasClass("disabled") ){
			showSelectUl(_wrap, _ul);
			
			_wrap.addClass("drop");
			wjEvent.setActiveElem(_wrap, {animType: 'class', cname: 'drop'});
		}else if(_eTar.hasClass("js-select-li") && _eTar.parents(".js-select-ul").length > 0){
			// li: li元素, 其 data-value 保存值			: 相等于 select.value
			// jsLi: 某个元素, 也可能是li，保存表现值 	: 相等于 select.label
			var li = _eTar.is("li") ? _eTar : _eTar.parents("li"),
				jsLi = _eTar;
			
			// 1 从获取 value 和 label
			var label = jsLi.html(),
				value = li.attr("data-value");
			if(value == undefined){
				value = label;
			}
			
			// 2 赋值
			// 2.1 表现
			if(_input.is("input")){
	            _input.val(label);
	        }else{
	            _input.html(label);
	        }
	        // 2.2 给隐藏的Input赋值
	        var hiddenInput = _wrap.find(".js-hidden-input")[0];
	        if(hiddenInput){
	        	hiddenInput.value = value;
	        }

	        _wrap.removeClass("drop");
		}else{
			_wrap.addClass("drop");
			wjEvent.setActiveElem(_wrap, {animType: 'class', cname: 'drop'});
		}
	});

	/**
	 * 显示 伪select的下拉框 
	 * _select: 伪表单元素(jquery对象)
	 * _ul:		为表单元素的下拉列表
	 * 因为隐藏的元素的高度无法计算, 故下拉列表第一次显示之后, 取得值填入 为 _ul的 data-h 属性, 然后在修正下拉框高度
	 * 以后都是从 data-h 取
	 * data-h: 默认值30px
	 */
	function showSelectUl(_select, _ul){
		// 在 _ul含有 notcal class时, 不计算高度
		if(_ul.hasClass("notcal")){ return; }

		var maxShowNum	= 8, 		// 最大显示数量
			minShowNum	= 4,		// 最小显示数量
			liNum		= _ul.children().length,				// 实际的项数目
			minShowNum  = minShowNum > liNum ? liNum : minShowNum,

			liHeight 	= _ul.attr("data-h"), 					// 单项的高度
			winHeight	= $(window).height(),					// 浏览器高度
			selectTp	= _select.offset().top,					// 当前伪表单元素离浏览器上端的距离
			selectBt 	= winHeight - _select[0].getBoundingClientRect().bottom;	// 伪表单元素离浏览器下端的距离
		
		if(!liHeight || parseInt(liHeight) == 0 ){
			// 第一次
			_select.addClass("drop");
			// 再计算单项高度
			liHeight = _ul.children().eq(0).outerHeight();
			_ul.attr("data-h", liHeight);
		}else{
			liHeight = parseInt(liHeight);
		}
		
		// 1 默认向下显示
		// 2 如果 表单元素距离浏览器底部太近, 连最小显示数量都无法显示, 则向上显示
		// 3 如果向上也无法正常全部显示(暂不考虑这种极端情况)
		if(selectBt < liHeight*minShowNum){
			// 向上显示
			_select.addClass("up");
		}else{
			// 向下显示
			_select.removeClass("up");
			
			var tmpNum = 0;
			if(selectBt < liHeight*maxShowNum){
				// 离浏览器下部还有一段距离, 计算高度, 显示整数个项
				tmpNum = parseInt(selectBt/liHeight);
			}else{
				tmpNum = maxShowNum;
			}
			tmpNum = tmpNum > liNum ? liNum : tmpNum;
			_ul.height(tmpNum*liHeight);
		} 
		
		_select.addClass("drop");
	}

	// 8 js-radio , js-checkbox
	$(document).on("click", ".js-radio, .js-checkbox, .js-checkbox-total", function(e){
		var eTar = e.target,
			_eTar = $(eTar),
			_this = $(this);

		// disabled
		if(_this.hasClass("disabled")){ return false; }

		// 表现
		if(_this.hasClass("js-radio")){
			// radio
			_this.parents(".js-form").find(".js-radio.checked").removeClass("checked");
			_this.addClass("checked");
		}else{
			// checkbox
			_this.toggleClass("checked");

			// 是否有全选 按钮
			var _form = _this.parents(".js-form"),
				_form = _form.length > 0 ? _form : _this.parent(),
				_checkboxs = _form.find(".js-checkbox");
			if(_this.hasClass("js-checkbox-total")){
				// 是全选按钮
				if(_this.hasClass("checked")){
					_checkboxs.addClass("checked");
				}else{
					_checkboxs.removeClass("checked");
				}
			}else{
				// 非全选按钮
				var _checkboxTotal = _form.find(".js-checkbox-total");

				if(_checkboxTotal.length > 0){
					var i, len = _checkboxs.length, checkAllFlag = true;
					for(i = 0; i < len; i++){
						if(!_checkboxs.eq(i).hasClass("checked")){
							checkAllFlag = false;
							break;
						}
					}
					
					if(checkAllFlag){
						_checkboxTotal.addClass("checked");
					}else{
						_checkboxTotal.removeClass("checked");
					}
				}
			}
		}
	});

    // js-mouse
    $(document).on("mouseenter", ".js-hover",function(e){
    	var _this = $(this),
    		_tar = lookTar(_this);
    		
    	if(_tar){
    		_tar.show();
    	}
    });
    $(document).on("mouseleave", ".js-hover",function(e){
    	var _this = $(this),
    		_tar = lookTar(_this);
    		
    	if(_tar){
    		_tar.hide();
    	}
    });
    
    
    // js-only
    $(document).on("click", ".js-only", function(e){
    	var _this   = $(this),
    		_parent = _this.parents(".js-onlys");
    	
    	if(_parent.length < 1){
    		_parent = _this.parent();
    	}
    	
    	_parent.find(".js-only.active").removeClass("active");
    	_this.addClass("active");
    });
});
