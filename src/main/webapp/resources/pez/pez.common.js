$(document).ready(function() {


	overLayImg = new progressBar();	
	
});
var overLayImg = null;

$(window).resize(function(){
	overLayImg && overLayImg.imgReSize();	
});


var isIe=navigator.userAgent.match(/msie/i);
var isFirefox=navigator.userAgent.match(/firefox/i);
var isOpera=navigator.userAgent.match(/opera/i);
var isWebkit=navigator.userAgent.match(/applewebkit/i);

var _common = {};

//콤마 붙이기
function numberComma(data) // 숫자형 데이터에 3자리마다 콤마를 붙이는 함수
{
   var nocomma = data.replace(/,/gi,''); // 불러온 값중에서 컴마를 제거 
   var b = ''; // 값을 넣기위해서 미리 선언 
   var i = 0; // 뒤에서 부터 몇번째인지를 체크하기 위한 변수 선언 
    
   // 숫자를 뒤에서 부터 루프를 이용하여 불러오기 
   for (var k=(nocomma.length-1); k>=0; k--) { 
       var a = nocomma.charAt(k); 
 
       if (k == 0 && a == 0) {  // 첫자리의 숫자가 0인경우 입력값을 취소 시킴 
    	   data = ''; 
           return data; 
       }else { 
           // 뒤에서 3으로 나누었을때 나머지가 0인경우에 컴마 찍기 
           //i가 0인 경우는 제일 뒤에 있다는 것이므로 컴마를 찍으면 안됨 
           if (i != 0 && i % 3 == 0) { 
               b = a + "," + b ; 
           }else { // 나머지가 0인 아닌경우 컴마없이 숫자 붙이기 
               b = a + b; 
           } 
 
           i++; 
       };
   } 
 
   return b; 
}	


function Trim(strings){
	var retString = "";
	var c;
	var i;
	for(i=0; i<strings.length;i++){
		c = strings.charAt(i);
		if(c != ' '){
			retString += c;
		};
	}
	return(retString);
}








/**
 * Map
 * @Example var map1 = new Map();
 */

Map = function(){
	 this.map = new Object();
	};   
Map.prototype = {   
    put : function(key, value){   
        this.map[key] = value;
    },   
    get : function(key){   
        return this.map[key];
    },
    containsKey : function(key){    
     return key in this.map;
    },
    containsValue : function(value){    
     for(var prop in this.map){
      if(this.map[prop] == value) return true;
     }
     return false;
    },
    isEmpty : function(key){    
     return (this.size() == 0);
    },
    clear : function(){   
     for(var prop in this.map){
      delete this.map[prop];
     }
    },
    remove : function(key){    
     delete this.map[key];
    },
    keys : function(){   
        var keys = new Array();   
        for(var prop in this.map){   
            keys.push(prop);
        }   
        return keys;
    },
    values : function(){   
     var values = new Array();   
        for(var prop in this.map){   
         values.push(this.map[prop]);
        }   
        return values;
    },
    size : function(){
      var count = 0;
      for (var prop in this.map) {
        count++;
      }
      return count;
    }
};


/**
$.each(data.CODE_14, function(){
	// select option 에 추가 함.
	appendOpt('ProcessType', this.codeDetailID, this.codeDetailName);
});
*/
function appendOpt(id, val, text, option){
	if($.type(option).toString()=='string'){
		$('select#'+id).append('<option value="'+val+'" class="'+option+'"><div style="word-break:break-all;">'+text+'</div></option>');
	}else{
		$('select#'+id).append('<option value="'+val+'"><div style="word-break:break-all;">'+text+'</div></option>');	
	}
	
	
}

function appendOpt2(id, val, text){
	$(id).append('<option value="'+val+'"><div style="word-break:break-all;">'+text+'</div></option>');
}





function Ajax(url, param, callback, settings){
	if(typeof param == 'function'){
		com_logs('Ajax - change param, function ');
		callback = param;
		param={};
	}
	
	setting = jQuery.extend({
    	/*timeout: 10000,*/
    	contentType: 'application/x-www-form-urlencoded',
    	async: true
    }, settings);			
		
//	progressOn();
	$.ajax({
		url: url,
		data: param,
		type: 'POST',
		async: setting.async,
		contentType: setting.contentType,
		/*timeout: setting.timeout,*/
		beforeSend: function(){
			progressOn();
		},
		success: function(data, textStatus, jqXHR){
			com_logs('success');
			var responseText = jqXHR.responseText;
	    	com_logs('complete : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    				
	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');
	    			}else if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				window.location='/';
	    			}
	    		}
	    	});		
	    	
	    	checkData(data);
	    	progressOff();
	    	_common.data = data;
		},
		complete: function(jqXHR, textStatus){
			progressOff();
		    	
	    	var responseText = jqXHR.responseText;
	    	com_logs('complete : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    				
/*	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');*/
	    			if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				window.location='/';
	    			}
	    		}
	    	});
	    	
	    	callback(_common.data);
		},
		error: function(jqXHR, textStatus, errorThrown){
	    	if(jqXHR.status==0){
	    		alert('서버와의 연결이 끊겼습니다.2');
	    	}else if(jqXHR.status==404){
	    		alert('Requested URL not found.');
	    	}else if(jqXHR.status==500){
	    		alert('Internel Server Error.');
	    	}else if(textStatus=='parsererror'){
	    		alert('Error.\nParsing JSON Request failed.');
	    	}else if(textStatus=='timeout'){
	    		alert('Request Time out.');
	    	}else {
	    		alert('Unknow Error.\n'+jqXHR.responseText);
	    	};
	    	progressOff();
	    	
	    	var responseText = jqXHR.responseText;
	    	com_logs('error : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    			com_logs(this);	
	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');
	    			}else if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				window.location='/';
	    			}
	    		}
	    	});		
	    	window.location = '/';		    	
		}
	});
}

function checkData(data){
	if($.type(data).toString()=='object') {
		if(typeof JSON == 'object'){
			com_logs('pez.common.js checkData \n'+JSON.stringify(data));	
		}
		
		return;
	}
	$(errorPage).each(function(){
		
		if(data.indexOf(this)>0){
				
			if(this == '400 Not Found'){
				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
			}else if(this == '404 Not Found'){
				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');
			}else if(this == '500 Internal Server Error'){
				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
			}else if(this == 'j_spring_security_check'){
				goHome();
				window.location='/';
			}
		}
	});	
}
var goHomeFlag = false;

function goHome(){
	if(!goHomeFlag){
		alert('연결이 끊겼습니다. 다시 로그인 해 주세요.');
		goHomeFlag = true;
	}
}

//function AjaxPost(url, param, callBack, settings){
function AjaxPost(url, param, callback, settings){
	if(typeof param == 'function'){
		com_logs('AjaxPost - change param, function ');
		callback = param;
		param={};
	}
	
	setting = jQuery.extend({
    	/*timeout: 10000,*/
    	contentType: 'application/x-www-form-urlencoded'
    }, settings);			
	
	$.ajax({
		url: url,
		data: param,
		type: 'POST',
		contentType: setting.contentType,
		/*timeout: setting.timeout,*/
		beforeSend: function(){
			progressOn();
		},
		success: function(data, textStatus, jqXHR){
			
			com_logs('success');
			var responseText = jqXHR.responseText;
	    	com_logs('complete : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    				
	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');
	    			}else if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				
	    				window.location='/';
	    			}
	    		}
	    	});
	    	
	    	checkData(data);
	    	progressOff();
	    	_common.data = data;
			
		},
		complete: function(jqXHR, textStatus){
			progressOff();
		    	
	    	var responseText = jqXHR.responseText;
	    	com_logs('complete : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    				
/*	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');*/
	    			if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				window.location='/';
	    			}
	    		}
	    	});
	    	
	    	
	    	callback(_common.data);
		},
		error: function(jqXHR, textStatus, errorThrown){
	    	if(jqXHR.status==0){
	    		goHome();
	    	}else if(jqXHR.status==404){
	    		alert('Requested URL not found.');
	    	}else if(jqXHR.status==500){
	    		alert('Internel Server Error.');
	    	}else if(textStatus=='parsererror'){
	    		alert('Error.\nParsing JSON Request failed.');
	    	}else if(textStatus=='timeout'){
	    		alert('Request Time out.');
	    	}else {
	    		alert('Unknow Error.\n'+jqXHR.responseText);
	    	};
	    	progressOff();
	    	
	    	var responseText = jqXHR.responseText;
	    	com_logs('error : responseText\n'+responseText);
	    	$(errorPage).each(function(){
	    		
	    		if(responseText.indexOf(this)>0){
	    			com_logs(this);	
	    			if(this == '400 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n400 error 잘못된 요청');
	    			}else if(this == '404 Not Found'){
	    				alert('개발자용. 삭제 요망. pez.common.js 파일. \n404 error 페이지 못 찾음.');
	    			}else if(this == '500 Internal Server Error'){
	    				alert('서버가 비 정상적입니다. 관리자에게 문의하세요!');
	    			}else if(this == 'j_spring_security_check'){
	    				goHome();
	    				window.location='/';
	    			}
	    		}
	    	});		
	    	window.location = '/';		    	
		}
	});
}

var errorPage=[
       		'404 Not Found', 
               '400 Not Found',
               '500 Internal Server Error',
               'j_spring_security_check',		
];
               

$.fn.onlyNumber = function(){
	var param=[stringValidateEnum.NUMBER ];
	validation(this, param);
};

$.fn.onlyNumber_Dot = function(){
	
	
	var param=[stringValidateEnum.NUMBER_DOT ];
	validation(this, param);
};

$.fn.onlyNumber_Dash = function(){
	
	var param=[stringValidateEnum.NUMBER_DASH ];
	validation(this, param);
};

$.fn.onlyNumber_Colon = function(){
	
	var param=[stringValidateEnum.NUMBER_TIME ];
	validation(this, param);
};


$.fn.setCursorPosition = function(pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};

function validation(_this, param, type){
	var tagName = $(_this)[0].tagName;
//	com_logs('param = '+param);
//	com_logs('id = '+$(_this).attr('id'));
	$(_this).unbind('blur change keydown keyup',doMyJob);
	$(_this).bind('blur change keydown keyup',doMyJob);
	function doMyJob(){
		var text;
		if(tagName == "INPUT"){
			text = new String($(_this).val());
		}else{
			text = new String($(_this).text());
		}
		if(text.length==0){
			return;
		}
		try{
			com_logs('before text = '+text);
			var temp='';
			for(var i=0;i<text.length;i++){
				if(!stringValidate(text[i].toString(), param)){
					temp = temp+text[i];
				};
			}
			
			var textArr = temp.split('.'); 
			com_logs('after text = '+temp);
			if(textArr.length>2){
				temp = '';
				$(textArr).each(function(index){
					temp = temp + this;
					if(index==0){
						temp = temp + '.';
					}
					com_logs('index = '+index +', String = '+temp);
				});
//				doMyJob();
			}
			
			if(temp == text) {
				com_logs('the same return!! 22');
				return;
			}
			
			if(tagName == "INPUT"){
				$(_this).val(temp);
				$(_this).setCursorPosition(temp.length);
				com_logs('after input = '+$(_this).val());
			}else{
				$(_this).text(temp);
				$(_this).setCursorPosition(temp.length);
			};
			
		}catch(e){
			com_logs('validation - ');
			com_logs(e);
		};
	};
}

var progressBar = function(){
	
	this.overLay = $('<div style="position:absolute;left:0;top:0;z-index:99;"></div>');
	this.ajaxImg = $('<img style="z-index:100;" src="/resources/images/ajax_loader.gif"/>');
	
	this.overLay.css({ opacity: 0.5 });
	this.wWidth = $(window).width();
	this.wHeight = $(window).height();
	this.overLay.width(this.wWidth);
	this.overLay.height(this.wHeight);
	$(this.overLay).append(this.ajaxImg);
	$(this.overLay).hide();
	$('body').append(this.overLay);
};
progressBar.prototype.imgReSize= function(){
	this.wWidth = $(window).width();
	this.wHeight = $(window).height();
	this.overLay.width(this.wWidth);
	this.overLay.height(this.wHeight);
	var iWidth = $(this.ajaxImg).width();
	var iHeight = $(this.ajaxImg).height();
	$(this.ajaxImg).css('padding-left', (this.wWidth-iWidth)/2);
	$(this.ajaxImg).css('padding-top', (this.wHeight-iHeight)/2);
	this.overLayTime=null;
};


progressBar.prototype.on= function(){
	this.overLay.show();
	this.imgReSize();
	this.overLayTime=setTimeout(function(){
		overLayImg.off();
	},3*1000);
};
progressBar.prototype.off= function(){
	this.overLay.hide();
};

function progressOn(){
	try{
		overLayImg.on();	
	}catch(e){
		com_logs('on err');
		com_logs(e);
	}
	
}

function progressOff(){
	try{
		overLayImg.off();
		clearTimetout(overLayImg.overLayTime);
	}catch(e){
		com_logs('off err');
		com_logs(e);
	}
}


/**
 * 보고서 등록등 그냥 나가면 안되는 곳에 컨펌창을 띄워 주기 위한 등록 작업
 * @Example writingConfirm('지금 나가면 다 지워진데이~');
 * @Example <b>backFn 버튼 소스</b><br><pre>
 * 
function backFn(){
&nbsp;&nbsp;&nbsp;&nbsp;if(isWriting()){
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(!showWritingConfirm()) return;
&nbsp;&nbsp;&nbsp;&nbsp;}
		
&nbsp;&nbsp;&nbsp;&nbsp;if(getStepHistorySize()>1){
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stepBack();	
&nbsp;&nbsp;&nbsp;&nbsp;}else{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.history.back();
&nbsp;&nbsp;&nbsp;&nbsp;}
}
</pre>
 * @param text
 * @returns void
 * 
 * writingConfirm('걍 나가??');<br>
function backFn(){
	if(isWriting()){
		if(getStepInHistory('step5')){	// 보고서 작성중인 스텝
			// nothing...	
		}else{
			if(!showWritingConfirm()) return;	
		}
	}
		
	if(getStepHistorySize()>1){
		stepBack();	
	}else{
		window.history.back();
	}
}
 */

function com_logs(dat){
	if(typeof console=='object'){
//		console.log(dat);
	}
}

function errLog(e){
	com_logs('errLog '+e);
}