// 兼容ie8
// Look
function getElementsByCName(cName, par){
	par = par ? par : document;
	
	var childs = par.getElementsByTagName("*");
	var i, item, eles = [];
	for( i = 0; i < childs.length; i++){
		item = childs[i];
		
		if(indexOfStr(item.className, cName) >= 0){
			eles.push(item);
		}
	}
	
	return eles;
}



function hasClass(ele, cName){
	return indexOfStr(ele.className, cName) >= 0 ? true : false;
}

function addClass(ele, cName){
	if(!hasClass(ele, cName)){
		ele.className = ele.className + " " + cName;
	}
}

function removeClass(ele, cName){
	ele.className = ele.className.replace(cReg(cName), " ");
}


function indexOfStr(str, val){
	return str.search(cReg(val));
}

function cReg(val){
	return new RegExp("^"+val+"$|[ ]" +val + "[ ]|^"+val+"[ ]|[ ]"+val+"$", "g");
}


// Element
function lookNext(ele){
	var nextNode = ele.nextSibling;
	
	while(nextNode){
		if(nextNode.nodeType == 1){
			return nextNode;
		}else{
			nextNode = nextNode.nextSibling;
		}
	}
}

function lookBefore(ele){
	var beforeNode = ele.previouseSibling;
	
	while(beforeNode){
		if(beforeNode.nodeType == 1){
			return beforeNode;
		}else{
			beforeNode = beforeNode.previouseSibling;
		}
	}
}
