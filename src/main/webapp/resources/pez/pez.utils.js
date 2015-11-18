$(document).ready(function() {
		new sValidation();
	});
﻿
var g_table = new Map();
var syncOptionEnum = {
        none: 1,
        clearValues: 2
};
var stringValidateEnum={
	KOREAN:1,
	ENGLISH:2,
	NUMBER:3,
	NUMBER_DOT:4,
	NUMBER_DASH:5,
	NUMBER_TIME:6
	
	
};



/**
 * 
 * @Auth : ssam_kj
 * @Date : 2012. 8. 13.
 * @What : 밀리 세크 단위로 슬립 시킨다. 
 * @param ms
 * @Example : sleep(1000 * 5);
 */
function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}


/**
 * @version 1.0 2012.05.02
 * 문자 제한을 한다.<br/>
 * @Example
 * 사용법 1<br/>
 * <font color="blue">stringValidate(text);</font><br/>
 * 숫자, 한글, 영어 외에 문자가 있는 경우에는 <br/><font color="red">true</font>를 리턴한다.<br/>
 * <br/>
 * @Example
 * 사용법 2<br/>
 * <font color="blue">stringValidate(text, <b>param</b>);</font><br/>
 * <br/>
 * 숫자인지 체크<br/>
 * var <b>param</b>=<br/>
 * [stringValidateEnum.NUMBER
 * ];<br/>
 * <br/>
 * 한글인지 체크
 * <br/>
 * var <b>param</b>=<br/>
 * [
 * stringValidateEnum.KOREAN
 * ];<br/><br/>
 * 영어인지 체크
 * <br/>
 * var <b>param</b>=<br/>
 * [
 * stringValidateEnum.ENGLISH
 * ];<br/><br/>
 * 아래와 같은 식으로 조합도 가능하다.<br/>
 * var <b>param</b>=<br/>
 * [stringValidateEnum.NUMBER, <br/>
 * stringValidateEnum.KOREAN, <br/>stringValidateEnum.ENGLISH
 * ];<br/><br/>
 * @Example
 * 사용법 3<br/>
 * 이메일인지 체크<br/>
 *  * <font color="blue">stringValidate(text, <b>email</b>);</font><br/>
 * 이메일이 아니면 <font color="red">false</font>를 리턴한다.<br/>
 * <br/>
 * @param string
 * @param opt
 * @returns {Boolean}
 */
function stringValidate(string, opt){
//	utils_logs(typeof string+" === stringValidate = "+string);
	if(typeof string != "string") return false;
	string = string.trim();
	var key="";
	if(typeof opt == "undefined"){
		key=/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힝|0-9a-zA-Z]/;
		
	}else if(typeof opt=="string"){
		if(opt=="email"){
			key=new RegExp("[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+$");
			return string.search(key)>=0;
		}
	}
	else{
		var head = "[^";
		var tail = "]";
		key="[^ㄱ-ㅎ|ㅏ-ㅣ|가-힝|0-9a-zA-Z]";
		key = new RegExp(key);
		try{
			var combine;
			$(opt).each(function(){
				var result;
				if(typeof combine=="undefined"){
					result = getRegExp(this);
					if(result==false){
						combine = key;
						return false;
					}
					combine = result;	
				}else{
					result = getRegExp(this);
					if(result==false){
						combine = key;
						return false;
					}
					combine += "|"+result;
				}
			});	
//			utils_logs(combine);
			key = new RegExp(head+combine+tail);
		}catch(e){
			utils_logs(e);
		}
	}
//	utils_logs("key = "+key);
	return (string.search(key)>=0);
}

function getRegExp(opt){
	if(opt == stringValidateEnum.KOREAN){
		return "ㄱ-ㅎ|ㅏ-ㅣ|가-힝";
	}else
	if(opt == stringValidateEnum.ENGLISH){
		return "a-zA-Z";
	}else
	if(opt == stringValidateEnum.NUMBER){
		return "0-9";
	}else
	if(opt == stringValidateEnum.NUMBER_DOT){
		return "0-9|.";
	}else
		if(opt == stringValidateEnum.NUMBER_DASH){
			return "0-9|-";
	}else
		if(opt == stringValidateEnum.NUMBER_TIME){
			return "0-9|:";
	}
	else{
		return false;
	}
	
	
}



jQuery.fn.setter2 = function() {
	try{
		var ret = [];
		$('[id]', this).each(function() {
			var id = this.id;
			this.id = id.replace(/[.]/g, '---');
			var idName = this.id;
//			utils_logs("setter2 id = "+idName);
			if(idName.length>1)
				ret.push(idName);
		});
	}catch(e){
		utils_logs("setter - "); utils_logs(e);
		return [];
	}finally { 
		/** 메모리 해제 start **/
		ret = null;
		id = null;
		idName = null;
		/** 메모리 해제 the end **/
    } 
	
	return ret;
};


/**
 * AutoSync dat로 JSON 데이타가 들어오면<br/>
 * HTML에서 JSON 데이타와 동일한 아이디를 찾아<br/>
 * 값으로 넣어 준다.<br/>
 * !!!!!! 주의 사항 !!!!!!!!!!!<br/>
 * 해당 id 하위 html의 id를 모두 초기화 시킨다.
 * @returns {Number}  -1 error<br/>
 * */
function autoSync(id, dat, option) {
	if(!($.type(dat).toString()=='object')){
		utils_logs("dat type is "+$.type(dat));
		return;
	}
	var ret = $('#'+id).setter();
	try{
		for(var i=0;i<ret.length;i++){
//			utils_logs("autoSync ret="+ret[i]);
			var text = dat[ret[i]];
//			utils_logs('typeof text = '+$.type(text).toString());
			if($.type(text).toString()=='null'){
				
//				utils_logs('text makes 빈칸');
				text='';
			}
			switch(Number(option)){
			case syncOptionEnum.clearValues:{
				if(text==undefined){
					if($('#'+ret[i]).children().length==0){
						text="";
					}else{
						continue;	
					}
				}
				break;
			}
			
			default:
				if(text==undefined) {
					continue;
				}
				break;
			}
//			utils_logs($('#'+id).find("#"+ret[i])[0].tagName);
			
			if(isVal($('#'+id).find("#"+ret[i])[0].tagName)){
//				utils_logs('val('+text+")");
				$('#'+id).find("#"+ret[i]).val(text);
			}else if(isImg($('#'+id).find("#"+ret[i])[0].tagName)){
//				utils_logs('src('+text+")");
				$('#'+id).find("#"+ret[i]).attr("src",text);
			}
			else{
//				utils_logs('text('+text+")");
				$('#'+id).find("#"+ret[i]).text(text);
			}				
		}	
	}catch(e){
		utils_logs("autoSync - "); utils_logs(e);
		return;
	}finally { 
		/** 메모리 해제 start **/
		ret = null;
		text = null;
		
		/** 메모리 해제 the end **/
    } 
	
	return 1;
};


/**
 * AutoSync dat로 JSON 데이타가 들어오면<br/>
 * HTML에서 JSON 데이타와 동일한 아이디를 찾아<br/>
 * 값으로 넣어 준다.<br/>
 * !!!!!! 주의 사항 !!!!!!!!!!!<br/>
 * 해당 id 하위 html의 id를 모두 초기화 시킨다.
 * @returns {Number}  -1 error<br/>
 * autoSync 와 다른 점은 id 와 객체의 차이이다.
 * */
function autoSync2(tag, dat, option) {
	if(!($.type(dat).toString()=='object')){
		utils_logs("dat type is "+$.type(dat));
		return;
	}
	var ret = $(tag).setter();
	try{
		for(var i=0;i<ret.length;i++){
//			utils_logs("autoSync ret="+ret[i]);
			var text = dat[ret[i]];
//			utils_logs(text);
			if($.type(text).toString()=='null'){
				
//				utils_logs('text makes 빈칸');
				text='';
			}
			switch(Number(option)){
			case syncOptionEnum.clearValues:{
				if(text==undefined){
					if($('#'+ret[i]).children().length==0){
						text="";
					}else{
						continue;	
					}
				}
				break;
			}
			
			default:
				if(text==undefined) continue;
				break;
			}
//			utils_logs($('#'+id).find("#"+ret[i])[0].tagName);
			
			if(isVal($(tag).find("#"+ret[i])[0].tagName)){
//				utils_logs('val('+text+")");
				$(tag).find("#"+ret[i]).val(text);
			}else if(isImg($(tag).find("#"+ret[i])[0].tagName)){
//				utils_logs('src('+text+")");
				$(tag).find("#"+ret[i]).attr("src",text);
			}
			else{
//				utils_logs('text('+text+")");
				$(tag).find("#"+ret[i]).text(text);
			}				
		}	
	}catch(e){
		utils_logs("autoSync - "); utils_logs(e);
		return;
	}finally { 
		/** 메모리 해제 start **/
		ret = null;
		text = null;
		
		/** 메모리 해제 the end **/
    } 
	
	return 1;
};


function isImg(name){
//	utils_logs("isImg name = "+name);
	if(name=='IMG')
		return true;
	return false;
}
function isVal(name){
//	utils_logs("isVal name = "+name);
	if(name=='INPUT')
		return true;
	if(name=='SELECT')
		return true;
	if(name=='TEXTAREA'||name=='textarea')
		return true;
	return false;
}
jQuery.fn.setter = function(opt) {
	try{
		var ret = [];
//		utils_logs("setter opt = "+opt);
		if($.type(opt).toString()!='string'){
			$('[id]', this).each(function() {
				
				var idName = this.id;
//				utils_logs("setter id = "+idName);
				if(idName.length>=1)
					ret.push(idName);
			});	
		}else if(opt == 'id'){
			$('[id]', this).each(function() {
				
				var idName = this.id;
//				utils_logs("setter id = "+idName);
				if(idName.length>=1)
					ret.push(idName);
			});
		}else if(opt == 'name'){
			$('[name]', this).each(function() {
				
				var idName = this.name;
//				utils_logs("setter name = "+idName);
				if(idName.length>=1)
					ret.push(idName);
			});
		}
		
	}catch(e){
		utils_logs("setter - "); utils_logs(e);
		return [];
	}finally { 
		/** 메모리 해제 start **/
//		ret = null;
		idName = null;
		
		/** 메모리 해제 the end **/
    } 
	
	return ret;
};

/**
 * json 데이타에 다른 json 데이타를 더한다.
 * @param json
 * @param dat
 */
function jsonAppend(json, dat) {
//	utils_logs("jsonAppend");
	try{
		for(var key in dat){
			json[key]=dat[key];
		}
	}catch(e){
		utils_logs("setter - "); utils_logs(e);
		return ;
	}
	
//	return ret;
};



/**
 * table id를 넣는다.<br/>
 * <br/>
 * jQuery.fn.tableAutoSync 참조할 것<br/>
 * ex ) <br/>
 * var _this = this;<br/>
 *		$(document).ready(function () {&nbsp;<br/>
 *			_this.table1 = tableSync('tbl1');&nbsp;<br/>
 *		});<br/>
 * @param table id
 * @returns
 */
function tableSync(tbl){
	var table = $('#'+tbl);
	
	if(table.html()==null){
		utils_logs("tableSync Null");
//		return null;	// 잘못된 코딩일 때 에러가 나므로 인자를 넘기기로 한다.
	}
	try{
		var formatMap = new Map();
		g_table.put(tbl, formatMap);	
	}catch(e){
		utils_logs("tableSync - "); utils_logs(e);
//		return null;	// 잘못된 코딩일 때 에러가 나므로 인자를 넘기기로 한다.
	}
	
	$(table).find('tbody').hide();
	
	return table;
}

/**
 * 
 * @param item 아이템 스트링이 온다.<br/>
 * @param fomatter 포멧터 함수가 넘어온다.<br/>
 * @returns {Number}  -1 error<br/>
 * ex) _this.table1.addFormatter('productprice', formatter.moneyWon);<br/>
 */
jQuery.fn.addFormatter = function(item, fomatter) {
	if(this.html()==null){
		utils_logs("addFormatter "+this.html());
		return -1;
	}
	if(!($.type(fomatter).toString()=='function')){
		utils_logs("fomatter type is "+$.type(fomatter));
		return;
//		return -1;
	}
	try{
		var formatMap = g_table.get($(this).attr('id'));
		formatMap.put(item, fomatter);
		g_table.put($(this).attr('id'), formatMap);	
		formatMap=null;	//"Make Null for memory controls"
		
	}catch(e){
		utils_logs("addFormatter - "); utils_logs(e);
		return ;
	}
};


$.fn.no_result_append = function(){
	var text = "<div class='no_result' style='color:white;padding-top: 58px;text-align: center;font-size: 15px;line-height: 15px;font-weight: bold;'>결과가 없습니다. </div>";
	$(this).after(text);
};

$.fn.remove_no_result = function(){
//	utils_logs($(this).next());
	 if($(this).next().hasClass('no_result')){
		 $(this).next().remove();
		 utils_logs('remove!!!');
	 }
//	 utils_logs($(this).next());
};
	
	
var global={};

/**
 * 넘어온 list로 table 을 만든다.<br/>
 * @param list
 * @returns {Number} -1 error
 * ex) _this.table1.tableAutoSync(datlist);
 */
jQuery.fn.tableAutoSync = function(list, option) {
//	utils_logs("tableAutoSync called!");
	if(!$.type([],list) ) return -1;	// 배열이 아니면 그냥 리턴 시킨다.
	if(this.html()==null){
		utils_logs("tableAutoSync "+this.html());
		return -1;
	}
	 $(this).remove_no_result();
	
	var isEmpty = false;
	if(list.length==0) isEmpty=true;
	if($.type(list[0]).toString() == 'null')  isEmpty=true;
	
	if(isIe){
		utils_logs('isEmpty?'+isEmpty);
		utils_logs($(this).find('tbody').is(':visible'));
	}
	
	if(isEmpty){
//		$(this).no_result_append();
		if(isIe){
			try{
				var tbody2 = $(this).find('tbody>tr').get(-1);
				utils_logs('tbody2='+$(tbody2));
				var trTag = $(tbody2).prop('outerHTML');
				utils_logs('trTag='+trTag);
				this.find('tbody>tr').remove();
				utils_logs('remove');
				utils_logs('this.find(tbody)'+$(this).find('tbody').html());
				this.find('tbody').append(trTag);
				utils_logs('append');
				utils_logs('this.find(tbody)'+$(this).find('tbody').html());
				$(this).find('tbody').hide();	
			}catch(e){
				utils_logs('513');
				utils_logs(e);	
			}
			
		}else{
			$(this).find('tbody').hide();	
		}
		
		utils_logs($(this).find('tbody').is(':visible'));
		return;
	}else{
		$(this).find('tbody').show();
	}
	
	$(this).clearTbody();
	
	
	try{
		var ret = this.setter();
		var container = $('<k></k>');
		var tbody = $('<k></k>');
		var tbody2 = this.find('tbody>tr').get(-1);
		utils_logs('tbody2='+$(tbody2));
		var _this = this;
//		초기화 시작 ------------------------------------------------------------------
		
		try{
			if(typeof _pez_lotteAS!='undefined'){
				utils_logs('tableAutoSync only lotte');
				utils_logs('tableAutoSync only lotte');
				utils_logs('tableAutoSync only lotte');
				utils_logs('tableAutoSync only lotte');
				utils_logs('tableAutoSync only lotte');
				utils_logs('tableAutoSync only lotte');
				try{
					$(tbody2).find('input').attr('checked', false);
					$(tbody2).removeClass('yellow_g1');
					$(tbody2).find('input:checkbox').next().removeClass('checkbox_on').addClass('checkbox_off');
//						utils_logs('only lotte 222');
				}catch(e){
					utils_logs('tableAutoSync only lotte');
					utils_logs(e);
				}	
			}
			
			var textHtml = "";
			var trTag = $(tbody2).prop('outerHTML');
			
			
//			utils_logs('trTag'+trTag);
			
			container.html(trTag);
			
			textHtml=container.html();
			this.find('tbody').append(container.html());
			
			container.html('');
			tbody.html(textHtml);
			
		}catch(e){
			utils_logs(e);
		}	
		
//		초기화 끝 ------------------------------------------------------------------
		if(!$(tbody).find('tr').is(':visible')){
			$(tbody).find('tr').show();
		}
		$(list).each(function(ind){
			container.append( sync(_this, tbody, ret, this, option));
		});
		
		if(list.length==0){
			$(this).find('tbody').find('tr:gt(0)').remove();
			$(this).find('tbody').hide();
			return 1;
		}
		if(isIe){
//			utils_logs(container.html());
			this.find('tbody').find('tr').remove();	
		}else{
			this.find('tbody>tr').remove();	
		}
		
//		this.find('tbody').html('');
		this.find('tbody').append(container.html());
		
		
		
		
		$(this).find('tbody').show();
		
		
//		form tag에서 list로 dto가 넘어 갈 때 시작  ------------------------------------------------------------------
		if($(this).find('tbody tr').find('#pezIndex').length>0){
//			utils_logs($(this));
			$(this).find('tbody tr').each(function (index){
//				utils_logs("index = "+index);
				$(this).find('input').each(function(){
					var name = $(this).attr('name');
//					utils_logs("name = "+name);
					if(typeof name != 'undefined'){
						if(name.indexOf('[')>0){
							var temp = name.substring(0,name.indexOf('[')+1)+index+']';
//							utils_logs('temp = '+temp);
							temp = temp+name.substring(name.indexOf(']')+1);
							name = temp;
//							utils_logs('2 '+name+' - '+index);
							$(this).attr('name', name);	
						}
					}
					
				});
			});
		}
//		form tag에서 list로 dto가 넘어 갈 때 끝  ------------------------------------------------------------------
		
		if(typeof _pez_lotteAS!='undefined'){
			$('input[class=input_opacity]').css({
				
				'background-image':"url('/resources/img/bg/bg.png')"
			});	
			$('span.checkbox_on, span.checkbox_off').toggleClickEvent(); // pez.common.js 파일에 check_image 함수가 있음
		}
		
		
		$(this).find('tbody').show();
		try{
			$('table.radio > tbody > tr').unbind('click', tableRadioToggle);	// tableRadioToggle pez.common.js 에 있음
			$('table.radio > tbody > tr').bind('click', tableRadioToggle);	// tableRadioToggle pez.common.js 에 있음
		}catch(e){ }
		
		
		return 1;	
	}catch(e){
		$(this).find('tbody').show();
		utils_logs("tableAutoSync - "); utils_logs(e);
		return;
	}finally { 
		/** 메모리 해제 start **/
		ret = null;
		tbody2 = null;
		tbody = null;
		container = null;
		textHtml = null;
		/** 메모리 해제 the end **/
    } 
};

/**
 * obj에서 각 id를 찾아서 해당 값을
 * json 데이타로 변경해서 return 한다
 */
function getToJSON(obj, opt){
	if(typeof obj != 'object') return;
	var ids;
	if($.type(opt).toString()=='string'){
		ids = $(obj).setter(opt);
	}else{
		ids = $(obj).setter();
	}
	var ret={};
//	utils_logs('getToJSON '+ids);
	try{
		$(ids).each(function(){
			var tagName = $(obj).find('#'+this)[0].tagName;
//			utils_logs('getToJSON '+tagName);
//			utils_logs('getToJSON '+this);
			if(isVal(tagName )){
				ret[this]=$(obj).find('#'+this).val();
			}else{
				ret[this]=$(obj).find('#'+this).text();
			}
		});	
	}catch(e){
		utils_logs("getToJSON - "); utils_logs(e);
	}
	
	/** 메모리 해제 start **/
	ids = null;
	/** 메모리 해제 the end **/
	return ret;
}

/**
 * obj에서 각 id를 찾아서 해당 값을
 * json 데이타로 변경해서 return 한다
 */
function getToJSON2(obj, opt){
	if(typeof obj != 'object') return;
	var ids;
	if($.type(opt).toString()=='string'){
		ids = $(obj).setter2(opt);
	}else{
		ids = $(obj).setter();
	}
	var ret={};
//	utils_logs('getToJSON '+ids);
	try{
		$(ids).each(function(){
			var tagName = $(obj).find('#'+this)[0].tagName;
//			utils_logs('getToJSON '+tagName);
//			utils_logs('getToJSON '+this);
			if(isVal(tagName )){
				ret[this]=$(obj).find('#'+this).val();
			}else{
				ret[this]=$(obj).find('#'+this).text();
			}
		});	
	}catch(e){
		utils_logs("getToJSON - "); utils_logs(e);
	}
	
	/** 메모리 해제 start **/
	ids = null;
	/** 메모리 해제 the end **/
	return ret;
}

function getToJSON3(obj){
	utils_logs('getToJSON3 - -!! - - ');
	if(typeof obj != 'object') return;
	var ret = {};
	
	$(obj).each(function(){
		var id = $(this).attr('id');
		utils_logs('id = '+id);
		if(typeof id== 'string'){
			var tagName = $(this)[0].tagName;
			utils_logs('tagName = '+tagName);
			if(id.length>0){
				if(isVal(tagName )){
					ret[id]=$(this).val();
				}else{
					ret[id]=$(this).text();
				}
			}
		}
	});
	return ret;
}

function countProperties(obj) {
	  var prop;
	  var propCount = 0;

	  for (prop in obj) {
	    propCount++;
	  }
	  return propCount;
}



/**
 * 넘어온 list를 기존 table 에 더한다.<br/>
 * @param list
 * @returns {Number} -1 error
 * ex) _this.table1.tableAddAutoSync(datlist);
 */
jQuery.fn.tableAddAutoSync = function(list, option) {
//	utils_logs('jQuery.fn.tableAddAutoSync');
	if(!$.type([],list) ) return ;	// 배열이 아니면 그냥 리턴 시킨다.
	if(this.html()==null) return ;
	try{
		var ret = this.setter();
		var container = $('<k></k>');
		var trTag = this.find('tbody>tr').get(-1);
		var tbody2 = $(trTag).prop('outerHTML');
		
		var textHtml = "";
		container.html(tbody2);
//		textHtml=container.html();
//		this.append(container.html());
		var tbody = $('<k></k>');
		container.html('');
		tbody.html(tbody2);
		
//		utils_logs($(tbody).is(':visible'));
		if(!$(tbody).find('tr').is(':visible')){
			$(tbody).find('tr').show();
		}
		
		if((typeof list =="string")|| (list.length == undefined)){
			var arr=[];
			arr.push(list);
			container.append( sync(this, tbody, ret, arr[0], option));
		}else{
			
			for(var i=0;i<list.length;i++){
				container.append( sync(this, tbody, ret, list[i], option));
			}
		}
		
		this.append(container.html());
		
//		utils_logs("$(this).find('tbody tr').find('#pezIndex').length = "+$(this).find('tbody tr').find('#pezIndex').length);
		if($(this).find('tbody tr').find('#pezIndex').length>0){
//			utils_logs($(this));
			$(this).find('tbody tr').each(function (index){
//				utils_logs("index = "+index);
				$(this).find('input').each(function(){
					var name = $(this).attr('name');
					if(typeof name != 'undefined'){
						if(name.indexOf('[')>0){
//							utils_logs('1 '+name+' - '+index);
							var temp = name.substring(0,name.indexOf('[')+1)+index+']';
//							utils_logs('temp = '+temp);
							temp = temp+name.substring(name.indexOf(']')+1);
							name = temp;
//							utils_logs('2 '+name+' - '+index);
							$(this).attr('name', name);	
						}
					}
					
				});
			});
		}
		$(this).show();
		$(this).find('tbody').show();
		
		try{
			$('table.radio > tbody > tr').unbind('click', tableRadioToggle);	// tableRadioToggle pez.common.js 에 있음
			$('table.radio > tbody > tr').bind('click', tableRadioToggle);	// tableRadioToggle pez.common.js 에 있음	
		}catch(e){ }
		
		
		return 1;	
	}catch(e){
		utils_logs("tableAddAutoSync - "); utils_logs(e);
		return;
	}finally { 
		/** 메모리 해제 start **/
		ret = null;
		tbody2 = null;
		container = null;
		textHtml = null;
		tbody = null;
		/** 메모리 해제 the end **/
    } 
};


function sync(_this, tag, ids, dat, option) {
	if(_this.html()==null)return -1;
	if(tag.html()==null)return -1;
	if(!$.type(ids,[]))return -1;
	
//	utils_logs("pez.util.js function sync started");
//	utils_logs('type of dat = '+typeof dat);
	try{
		var formatMap = g_table.get($(_this).attr('id'));
		for(var i=0;i<ids.length;i++){
			var id = ids[i];
			var item = dat[id];
//			utils_logs("pez.util.js function sync item = "+item);
//			utils_logs("pez.util.js function sync item = "+ typeof item);

			if(typeof item == 'object'){
			    item = '';
			}
			if($.type(item).toString()=='null'){
				
//				utils_logs('text makes 빈칸');
				text='';
			}
			switch(Number(option)){
			case syncOptionEnum.clearValues:{
				if(item==undefined){
					if($('#'+ids[i]).children().length==0){
						item="";
					}else{
						continue;	
					}
				}
				break;
			}
			
			default:
				if(item==undefined) continue;
				break;
			}
			
			
		
			var formatter=null;
			try{
				formatter  = formatMap.get(id);
			}catch(e){
				utils_logs('no formatter');
			}
			if(formatter!= null){
				item = formatter(item);
			}
			
//			utils_logs($('#'+(_this).attr('id')).find('#'+id)[0].tagName);
//			utils_logs("11 item="+item);
//			utils_logs("id = "+id);
			
			if(isVal($('#'+(_this).attr('id')).find('#'+id)[0].tagName)){
				if($('#'+(_this).attr('id')).find('#'+id)[0].tagName=='INPUT'){
					tag.find('#'+id).attr('value',item );
				}
				else if($('#'+(_this).attr('id')).find('#'+id)[0].tagName=='SELECT'){
					(tag.find('#'+id+' > option')).each(function(){
						if($(this).val()==item){
							$(this).attr('selected', true);
						}else{
							$(this).attr('selected', false);
						}
					});
				}else{
					tag.find('#'+id).val(item );	
				}
//				utils_logs(tag);
//				utils_logs("value = "+tag.find('#'+id).val());
			}else{
				tag.find('#'+id).text(item);
			}
//			utils_logs(555);
			
		}
	}catch(e){
		utils_logs("sync 12232- "); utils_logs(e);
		return ;
	}finally { 
		/** 메모리 해제 start **/
		formatMap = null;
		id = null;
		item = null;
		formatter = null;
		
		/** 메모리 해제 the end **/
    } 
//	utils_logs(tag);
	return tag.html();
};


var formatter = {
	/**
	 * ex) 123456 ==> 123,456<br/>
	 * @param data
	 * @returns
	 */
	numberComma : function (data) // 숫자형 데이터에 3자리마다 콤마를 붙이는 함수
	{
		if(isNaN(data)) return data;
		
		var digit = data.split('.');
		if(digit.length>2) return data;
		
		var nocomma = digit[0].replace(/,/gi,''); // 불러온 값중에서 컴마를 제거 
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
	       } 
		}
		if(!isNaN(digit[1])){
			b += '.'+digit[1];	
		}
		
	   return b; 
	},
	
	
	/**
	 * ex) 123456 ==> 123,456 원<br/>
	 * @param data
	 * @returns
	 */
	moneyWon : function (won) 
	{
		var ret = '';
		for(var i=0;i<won.length;i++){
			utils_logs('moneyWon _this = '+won[i]+'\n isNaN(won[i])?'+isNaN(won[i]));
			
			if(!isNaN(won[i])){
				ret += won[i];
			}
		}
		utils_logs('moneyWon _this = '+ret);
		if(ret.length==0) return '';
		
//	    return numberComma(ret)+" 원"; 
		return numberComma(ret);
	},
	
	
	/**
	 * 숫자를 2자리로 만듬.<br/>
	 * ex) 99 ==> 99, 1 ==> 01
	 * @param data
	 * @returns
	 */
	twoDigits : function (data) //  
	{
		if(isNaN(data)) return data;
		if(data>99) return data;
		if(data>9) return data;
		data='0'+data;
	   return data; 
	},
	
	/**
	 * 숫자를 3자리로 만듬.<br/>
	 * ex) 99 ==> 099, 1 ==> 001
	 * @param data
	 * @returns
	 */
	threeDigits : function (data) //  
	{
		if(isNaN(data)) return data;
		if(data>99) return data;
		if(data>9) return '0'+data;
	   return '00'+data; 
	},
	
	/**
	 * 숫자를 4자리로 만듬.<br/>
	 * ex) 99 ==> 0099, 1 ==> 0001
	 * @param data
	 * @returns
	 */
	fourDigits : function (data) //  
	{
		if(isNaN(data)) return data;
		if(data>999) return data;
		if(data>99) return '0'+data;
		if(data>9) return '00'+data;
	   return '000'+data; 
	},
	
	dateFormatYYYYMMDD : function (data) //  
	{
//		utils_logs("dateFormatYYYYMMDD - "+data);
//		try{
//			utils_logs("dateFormatYYYYMMDD - "+new Date(data));	
//		}catch(e){
			
//		}
		if(!$.type(data,new Date))return data;
		var ret = "";
		try{
			ret = $.format.date(data, 'yyyy-MM-dd');
		}catch(e){
//			utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			try{
//				utils_logs('Date picker formatter');
				ret = $.datepicker.formatDate('yy-mm-dd',  new Date(data));
				return ret;
			}catch(e){
//				utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			}
			return data;
		}
		return ret; 
	},
	dateFormatYYMMDD : function (data) //  
	{
		if(!$.type(data,new Date))return data;
		
		var ret = "";
		try{
			ret = $.format.date(data, 'yy/MM/dd');
				
		}catch(e){
			utils_logs("dateFormatYYMMDD - "); utils_logs(e);
			return data;
		}
		
		return ret; 
	},
	dateFormatYYMMDDHHMM : function (data) //  
	{
		if(!$.type(data,new Date))return data;
		var ret = "";
		try{
			ret = $.format.date(data, 'yy.MM.ddahh:mm');
		}catch(e){
//			utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			try{
//				utils_logs('Date picker formatter');
				ret = $.datepicker.formatDate('yy-mm-dd',  new Date(data));
				return ret;
			}catch(e){
//				utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			}
			return data;
		}
		return ret; 
	},
	dateFormatYYMMDDHHMM2 : function (data) //  
	{
		if(!$.type(data,new Date))return data;
		var ret = "";
		try{
			ret = $.format.date(data, 'yy.MM.dd HH:mm');
		}catch(e){
//			utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			try{
//				utils_logs('Date picker formatter');
				ret = $.datepicker.formatDate('yy-mm-dd',  new Date(data));
				return ret;
			}catch(e){
//				utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			}
			return data;
		}
		return ret; 
	},
	dateFormatYYYYMMDDHHMMSS : function (data) //  
	{
		if(!$.type(data,new Date))return data;
		var ret = "";
		try{
			ret = $.format.date(data, 'yyyy-MM-dd a hh:mm:ss');
		}catch(e){
//			utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			try{
//				utils_logs('Date picker formatter');
				ret = $.datepicker.formatDate('yy-mm-dd',  new Date(data));
				return ret;
			}catch(e){
//				utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			}
			return data;
		}
		return ret; 
	},
	
	dateFormatYYYYMMDDHHMMSS2 : function (data) //  
	{
		if(!$.type(data,new Date))return data;
		var ret = "";
		try{
			ret = $.format.date(data, 'yyyy-MM-dd HH:mm:ss');
		}catch(e){
//			utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			try{
//				utils_logs('Date picker formatter');
				ret = $.datepicker.formatDate('yy-mm-dd',  new Date(data));
				return ret;
			}catch(e){
//				utils_logs("dateFormatYYYYMMDD - "); utils_logs(e);
			}
			return data;
		}
		return ret; 
	},
	
	/**
	 * 시간 형식을 맞춰 준다.
	 * @param data
	 */
	timeFormatHHMMSS : function(time){
		if(!$.type(time,new Date))return time;
//		logs('timeFormatHHMMSS');ssssssssssssssssssssssss
//		logs(time);
		var data = new Date(time);
		var hour = data.getHours();
		var min = data.getMinutes();
		var sec = data.getSeconds();
		if(hour < 10){
			hour = '0'+hour;
		}
		if(min<10){
			min = '0'+min;
		}
		if(sec<10){
			sec = '0'+sec;
		}
		
		return hour+':'+min+':'+sec;
	},
	/**
	 * 시간 형식을 맞춰 준다.
	 * @param data
	 */
	timeFormatHHMMSS2nd : function(data){
		if(!$.type(data,new Date)){
			data = new Date(data);
			
		};
		var ret = "";
		try{
			ret = $.format.date(data, 'HH:mm:ss');
		}catch(e){
			try{
				ret = $.datepicker.formatDate('HH:mm:ss',  new Date(data));
				return ret;
			}catch(e){
			}
			return data;
		}
		return ret; 
	},
	
	/**
	 * 시간 형식을 맞춰 준다.
	 * @param data
	 */
	timeFormatMMSS : function(str){
		
		if($.type(str) != "string") return str;
		if(str.length != 4){
			return str;
		}
		
		if(!isNumber(str)){
			return str;
		}
		var ret = "";
		try{
			ret = str.substring(0,2) + ":" + str.substring(2,4);
		}catch(e){
			utils_logs("timeFormatMMSS - "); utils_logs(e);
			return data;
		}
		return ret;
	},
	
	/**
	 * 시간 형식을 맞춰 준다.
	 * @param data
	 */
	timeFormatMMSS_Check : function(str){
		
		if($.type(str) != "string") return str;
		if(str.indexOf(':')<0){
			if(!isNumber(str)){
				return 'error';
			}
			if(str.length==4){
				str = str.substring(0,2) + ":" + str.substring(2,4);
			}else{
				return 'error';
			}
		} 
			
		var ret = str.split(':');
		
		var hour = ret[0];
		var min = ret[1];
		
		if(!isNumber(hour)){
			return 'error';
		}
		if(hour<0 || hour>24){
			return 'error';
		}
		
		if(!isNumber(min)){
			return 'error';
		}
		
		if(min<0 || min>60){
			return 'error';
		}

		return str;
	},
	/**
	 * Datepicker의 데이터를 Java의 Date 타입으로 변환
	 * ex) 1984-02-08 -> Sun Sep 22 20:59:14 UTC+0900 2013
	 * @param data
	 * @returns
	 */
	getJavaFormatDate : function (data) 
	{
		data += '';
		var year = data.split("-")[0];
		var month = data.split("-")[1]-1;
		var day = data.split("-")[2];
		
		var hour = "00";
		var minute = "00";
		var second = "00";
		return new Date(year, month, day, hour, minute, second);
	},
	/**
	 * 문자열 데이터를 날짜 형식으로(yyyy.MM.dd)
	 * ex) 20020821 => 2002.08.21
	 * @param str
	 * @returns
	 */
	strCommaDate : function (str) 
	{
		if($.type(str) != "string") return str;
		
		var ret = "";
		try{
			ret = str.substring(0,4) + "." + str.substring(4,6)+ "." + str.substring(6,8);
		}catch(e){
			utils_logs("dateFormatCommaYYMMDD - "); utils_logs(e);
			return data;
		}
		
		return ret; 
	},
	/**
	 * 문자열 데이터를 날짜 형식으로(yyyy-MM-dd)
	 * ex) 20020821 => 2002-08-21
	 * @param str
	 * @returns
	 */
	strDashDateFormat : function (str) 
	{
		if($.type(str) != "string") return str;
		var ret = str.split('-');
		if(ret.length!=3){
			return 'error';
		}
		var year = ret[0];
		var month = ret[1];
		var day = ret[2];
		if(!isNumber(year)){
			return 'error';
		}
		if(year<=1970 || year>2100){
			return 'error';
		}
		
		if(!isNumber(month)){
			return 'error';
		}
		
		if(month<=0 || month>12){
			return 'error';
		}
		if(!isNumber(day)){
			return 'error';
		}
		
		if(day<=0 || day>31){
			return 'error';
		}
		
		if(month.length<2) month = '0'+month;
		if(day.length<2) day = '0'+day;
		return year+'-'+month+'-'+day; 
	},
	
	/**
	 * 아이폰용
	 * 문자열 데이터를 날짜 형식으로(yyyy.MM.dd)
	 * ex) 20020821 => 2002.08.21
	 * @param str
	 * @returns
	 */
	strDotDateFormat : function (str) 
	{
		if($.type(str) != "string") return str;
		var ret = str.split('.');
		if(ret.length!=3){
			return 'error';
		}
		var year = ret[0];
		var month = ret[1];
		var day = ret[2];
		if(!isNumber(year)){
			return 'error';
		}
		if(year<=1970 || year>2100){
			return 'error';
		}
		
		if(!isNumber(month)){
			return 'error';
		}
		
		if(month<=0 || month>12){
			return 'error';
		}
		if(!isNumber(day)){
			return 'error';
		}
		
		if(day<=0 || day>31){
			return 'error';
		}
		
		if(month.length<2) month = '0'+month;
		if(day.length<2) day = '0'+day;
		return year+'.'+month+'.'+day; 
	},
	
	/**
	 * 문자열 데이터를 날짜 형식으로(yyyy-MM-dd)
	 * ex) 20020821 => 2002-08-21
	 * @param str
	 * @returns
	 */
	strDashDate : function (str) 
	{
//		utils_logs('strDashDate = '+$.type(str));
//		utils_logs('strDashDate = '+$.type(str).toString());
		
		if($.type(str) != "string") return str;
//		utils_logs('strDashDate str.length = '+str.length);
		var ret = "";
		try{
			ret = str.substring(0,4) + "-" + str.substring(4,6)+ "-" + str.substring(6,8);
		}catch(e){
//			utils_logs("dateFormatDashYYMMDD - "); utils_logs(e);
			return data;
		}
		
		return ret; 
	},
	/**
	 * 문자열 데이터를 전화번호 형식으로
	 * ex) 021234567 => 02-123-4566
	 * ex) 01012345678 => 010-1234-5678
	 * @param str
	 * @returns
	 */
	strTelNum : function (str)
	{
		if($.type(str) != "string") return str;
		
		return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	},
	
	/**
	 * 문자열 데이터를 전화번호 형식으로
	 * ex) 021234567 => 02-123-4566
	 * ex) 01012345678 => 010-1234-5678
	 * @param str
	 * @returns
	 */
	strTelNum_Check : function (str)
	{
		if($.type(str) != "string"){
			return 'error';
		}
		
		var ret = str.split('-');
		var error = false;
		$(ret).each(function(ind){
			var num = this;
			if(!isNumber(num)){
				error = true;
				return true;
			};
		});
		
		if(error){
			return 'error';
		}
		
		return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	},
	
	strZipCode : function(str){
		if($.type(str) != "string") return str;
		if(str.length<6) return str;
		if(str.indexOf('-')<0){
			return str.substring(0,3)+'-'+str.substring(3);
		}
		return str;
	},
	
	/**
	 * 문자열 데이터에서 -, : 두 char를 제거
	 * @param ch
	 * @returns
	 */
	removeChar : function(ch){
		if($.type(ch) != "string") return ch;
		ch = ch.replace(/:/gi,'').replace(/-/gi,'').replace(/,/gi,'');
		return ch; 
	},
	
	/**
	 * 숫자만 받기
	 */
	getOnlyNumber : function(str){
		if($.type(str) != "string") return str;
		var ret = '';
		for(var i=0;i<str.length;i++){
			if(isNumber(str[i])){
				ret+=str[i];
			}
		}
		return ret;
	}
	
	/**
	 * 차량번호 formatter
	 * ex)서울가1234 ==> 서울 가 1234
	 */
	,carRegiNumber : function(str){
		if($.type(str) != "string") return str;
		var ret = str.substring(0, 2)+' '+str.substring(2,3)+' '+str.substring(3, str.length);
		logs(ret);
		return ret;
	}
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * form 아이디를 받아서 input에 있는 value를 json<br/>
 * 데이타로 리턴한다.
 * @param formId ex)document.form
 * @returns JSON 데이타
 */
function getJsonFromForm(formId){
	var ret={};
	
	try{
		$(':input', formId).each(function() {
			var name = this.name;
			if(name.length>1){
				ret[name]=this.value;
//				utils_logs("k key = "+name+", value = "+this.value);
			}
		});
	}catch(e){
		utils_logs("getJsonFromForm - "); 
		utils_logs(e);
		return {};
	}
	
	return ret;
}
/**
 * @version 1.0 2012.04.17
@example
@1. 일반 얼랏 메시지 - show() 필요 없음.<br/>
	pezAlert("pAlert message");<br/>
	<br/>
@example
@2.콜백 함수 포함 얼랏 메시지<br/>
	pezAlert("pAlert message", function(){<br/>
//		callback function<br/>
//		do somethingg<br/>
	}).show();	// 반드시 show()를 호출해야 나타난다.<br/>
	<br/>
@example
@3.	pAlertType을 warning으로 한다.<br/>
	pezAlert("pAlert message", function(){<br/>
//		callback function<br/>
//		do somethingg<br/>
	}).type(pAlertType.WARNING)	<br/>
	.show();// 반드시 show()를 호출해야 나타난다.<br/>
	<br/>
	type 종류<br/>
	pAlertType.ERROR<br/>
	pAlertType.INFO<br/>
	pAlertType.SUCCESS<br/>
	pAlertType.WARNING<br/>
	pAlertType.CONFIRM<br/>
<br/>
@example
@4. pAlert을 객체로 생성한다.<br/>
	var popup0 = pezAlert("Are you sure?", function(){<br/>
//		ok 버튼을 눌렀을 때<br/>
//		do something<br/>
	}, function(){<br/>
//		cancel  버튼을 눌렀을 때<br/>
//		do something<br/>
	});<br/>
	popup0.type(pAlertType.CONFIRM)<br/>
		.lButton("오케이")<br/>
		.rButton("노");<br/>
	popup0.show();	// show()를 호출해야 나타난다.<br/>
	<br/>
//	사용 가능 함수 및 설명<br/>
	  lButton(text)			// 확인(기본) 버튼 텍스트<br/>
	  rButton(text)			// 취소 버튼 텍스트<br/>
	  title(text)			// 제목 텍스트	<br/>
	  draggable(boolean)	// 창을 드래그 할 수 있는지. default : true<br/>
	  modal(boolean)		// 배경을 클릭 할 수 없게. default : true / false 면 클릭 가능<br/>
	  resizable(boolean)	// 창 크기를 마우스로 조정 가능하게. // default true<br/>
	  noTitle(boolean)		// 타이틀을 숨긴다. default : false<br/>
	  height(number)		// 높이 지정	 default : auto<br/>
	  width(number)			// 넓 지정 default : 300<br/>
	  maxHeight(number)		// 최대 높이 지정<br/>
	  maxWidth(number)		// 최대 넓이 지정<br/>
	  minHeight(number)		// 최소 높이 지정<br/>
	  minWidth(number)		// 최소 넓이 지정<br/>
	<br/>
*/

function pezAlert(string, success, cancel){
	
	if(typeof success == 'function'){
		return new pezAlertClass(string, success, cancel);
	}else{
		return new pezAlertClass(string, null, null).type(pAlertType.INFO).noTitle(true).show();	
	}
}


/**
 *   ERROR<br/>
        INFO<br/>
        SUCCESS<br/>
        WARNING<br/>
        CONFIRM<br/>
     ex) new pezAlertClass("위험").type(pAlertType.WARNING).show();
 */
var pAlertType = {
        ERROR:'error',
        INFO:'info',
        SUCCESS:'success',
        WARNING:'warning',
        CONFIRM:'confirm'
};

function makeStringTag(string){
	if(typeof string !="string") return string;
	var ret=[];
	var tag=$("<p></p>");
	if(string.indexOf('\n')>=0){
		ret=string.split('\n');
//		utils_logs(ret);
		var ss="";
		$(ret).each(function(){
			ss+=this+"<br/>";
		});
		tag.html(ss);
	}else{
		tag.html(string);
	}
	return tag;
}

/**
 * var popup = new pezAlertClass(메시지, ok 함수, 취소 함수).type(pAlertType.CONFIRM).show();<br/>
 * 또는<br/>
 * var popup = new pezAlertClass(메시지, ok 함수, 취소 함수);<br/>
 * popup.type(pAlertType.ERROR);<br/>
 * popup.title("제목 변경).lButton("괜찮아);<br/>
 * popup.show();<br/>
 * @param string 메시지
 * @param success 확인 메소드
 * @param cancel 취소 메소드
 */
function pezAlertClass (string, success, cancel){
//	utils_logs("pezAlertClass - "+string);	
	var _pez = this;
	_pez.pAlertType = pAlertType;
	
//	_pez.loading = $("<div id='pezPopup' ><div id='pezPopup_message' style='padding-left: 48px;'></div></div>");
	_pez.loading = $("<div id='pezPopup' ><p id='pezPopup_message' style='padding-left: 48px;'></p></div>");
//	pAlert(string);
//	makeStringTag(string);
//	$(_pez.loading).find('#pezPopup_message').text(string);
	$(_pez.loading).find('#pezPopup_message').html(makeStringTag(string));
//	var lang = getLanguageResource();
	
	
	var text_pAlert;
	var text_ok;
	var text_cancle;
	
	if(typeof lang=='object'){
		try{
			text_pAlert = lang['pAlert.pAlert'];
			text_ok = lang['pAlert.ok'];
			text_cancle = lang['pAlert.cancle'];	
		}catch(e){
			utils_logs('pezAlertClass - 1 ');
			utils_logs(e);
		}
	}
		
	/**
	 * default values - start
	 */
	
	if(text_pAlert!=undefined)
		_pez._title = text_pAlert;
	else
		_pez._title = "알림";
	
	if(text_ok!=undefined)
		_pez._lBtn = text_ok;
	else
		_pez._lBtn = "확인";
	
	if(text_cancle!=undefined)
		_pez._rBtn = text_cancle;
	else
		_pez._rBtn = "취소";
	
	_pez._modal = true;
	_pez._draggable = true;
	_pez._height = 'auto';
	_pez._width = 300;
	_pez._maxHeight = false;
	_pez._maxWidth = false;
	_pez._minHeight = 150;
	_pez._minWidth  = 150;
	_pez._resizable = true;
	_pez._noTitle = false;
	/**
	 * default values - the end
	 */
	

	
	
	
//	/**
//	 * default values - start
//	 */
//	_pez._modal = true;
//	_pez._title = "알림";
//	_pez._lBtn = "확인";
//	_pez._rBtn = "취소";
//	_pez._draggable = true;
//	_pez._height = 'auto';
//	_pez._width = 300;
//	_pez._maxHeight = false;
//	_pez._maxWidth = false;
//	_pez._minHeight = 150;
//	_pez._minWidth  = 150;
//	_pez._resizable = true;
//	_pez._noTitle = false;
//	/**
//	 * default values - the end
//	 */
	
	var text_error = "에러";
	var text_information = "정보";
	var text_succeed = "성공";
	var text_warning = "경고!!";
	var text_areUsure = "확실합니까?";
	var text_yes = "네!";
	
	try{
		text_error = lang['pAlert.error'];
		text_information = lang['pAlert.information'];
		text_succeed = lang['pAlert.succeed'];
		text_warning = lang['pAlert.warning'];
		text_areUsure = lang['pAlert.areUsure'];
		text_yes = lang['pAlert.yes'];	
	}catch(e){
		utils_logs('pezAlertClass - 2');
		utils_logs(e);
		
	}
	
	
	
	_pez.type=function(type){
		
		switch(type){
		case _pez.pAlertType.ERROR:{
			$(_pez.loading).addClass(_pez.pAlertType.ERROR);
			if(text_error!=undefined){
				_pez.title(text_error);
			}else{
				_pez.title("에러");	
			}
			
			break;
		}
		case _pez.pAlertType.INFO:{
			$(_pez.loading).addClass(_pez.pAlertType.INFO);
			if(text_information!=undefined){
				_pez.title(text_information);
			}else{
				_pez.title("정보");	
			}
			
			break;
		}
		case _pez.pAlertType.SUCCESS:{
			$(_pez.loading).addClass(_pez.pAlertType.SUCCESS);
			if(text_succeed!=undefined){
				_pez.title(text_succeed);
			}else{
				_pez.title("성공");	
			}
			
			break;
		}
		case _pez.pAlertType.WARNING:{
			$(_pez.loading).addClass(_pez.pAlertType.WARNING);
			if(text_warning!=undefined){
				_pez.title(text_warning);
			}else{
				_pez.title("경고!!");	
			}
			
			break;
		}
		case _pez.pAlertType.CONFIRM:{
			$(_pez.loading).addClass(_pez.pAlertType.CONFIRM);
			if(text_areUsure!=undefined && text_yes!=undefined){
				_pez.title(text_areUsure);
				_pez.lButton(text_yes);	
			}else{
				_pez.title("확실합니까?");
				_pez.lButton("네!");	
			}
			
			_pez.show = _pez.confirm;
			break;
		}
		}
		
		return _pez;
	};

	_pez.lButton = function (name){
		if(typeof name == "string"){
			_pez._lBtn = name;
		}
			
		return _pez;
	};
	
	_pez.rButton = function (name){
		if(typeof name == "string"){
			_pez._rBtn = name;
		}
		return _pez;
	};
	
	_pez.title = function (name){
		if(typeof name == "string"){
			_pez._title = name;
		}
		return _pez;
	};
	_pez.draggable = function (flag){
		if(typeof flag == "boolean"){
			_pez._draggable = flag;
		}
		return _pez;
	};
	_pez.modal = function (flag){
		if(typeof flag == "boolean"){
			_pez._modal = flag;
		}
		return _pez;
	};
	_pez.resizable = function (flag){
		if(typeof flag == "boolean"){
			_pez._resizable = flag;
		}
		return _pez;
	};
	
	_pez.noTitle = function (flag){
		if(typeof flag == "boolean"){
			_pez._noTitle = flag;
		}
		return _pez;
	};
	
	
	_pez.height = function(size){
		if(typeof size == "number"){
			_pez._height = size;
		}
		return _pez;
	};
	
	_pez.width = function(size){
		if(typeof size == "number"){
			_pez._width = size;
		}
		return _pez;
	};
	
	_pez.maxHeight = function(size){
		if(typeof size == "number"){
			_pez._maxHeight = size;
		}
		return _pez;
	};
	
	_pez.maxWidth = function(size){
		if(typeof size == "number"){
			_pez._maxWidth = size;
		}
		return _pez;
	};
	_pez.minHeight = function(size){
		if(typeof size == "number"){
			_pez._minHeight = size;
		}
		return _pez;
	};
	
	_pez.minWidth = function(size){
		if(typeof size == "number"){
			_pez._minWidth = size;
		}
		return _pez;
	};
	
	
		
	_pez.confirm = function (){
		try{
			$(_pez.loading).dialog({
				modal:_pez._modal,
				title:_pez._title,
				draggable:_pez._draggable,
				height:_pez._height,
				width:_pez._width,
				resizable:_pez._resizable,
				maxHeight:_pez._maxHeight,
				maxWidth:_pez._maxWidth,
				minHeight:_pez._minHeight,
				minWidth:_pez._minWidth,
				
				buttons: [{
					text : _pez._lBtn,
					click: function() {
						if(typeof success == 'function'){
							$( _pez.loading ).dialog( "close" );
							return success.call();
					      }
						$( _pez.loading ).dialog( "close" );
					}
				},
				{
					text:_pez._rBtn,
					click: function() {
						if(typeof cancel == 'function'){
							$( _pez.loading ).dialog( "close" );
							return cancel.call();
					      }
						$( _pez.loading ).dialog( "close" );
					}
				}]
			});
			if(!_pez._noTitle){
				$(_pez.loading).prev().removeClass('ui-dialog-titlebar');
				$(_pez.loading).prev().addClass('ui-dialog-titlebar-show');	
			}
			
		}catch(e){
			utils_logs("autoSync - "); utils_logs(e);
			return;
		}
		
	};
	
	_pez._pAlert = function (){
		try{
			$(_pez.loading).dialog({
				modal:_pez._modal,
				title:_pez._title,
				draggable:_pez._draggable,
				height:_pez._height,
				width:_pez._width,
				resizable:_pez._resizable,
				maxHeight:_pez._maxHeight,
				maxWidth:_pez._maxWidth,
				minHeight:_pez._minHeight,
				minWidth:_pez._minWidth,
				
				buttons: [{
					text : _pez._lBtn,
					click: function() {
						if(typeof success == 'function'){
							$( _pez.loading ).dialog( "close" );
							return success.call();
					      }
						$( _pez.loading ).dialog( "close" );
					}
				}]
			});
			if(!_pez._noTitle){
				$(_pez.loading).prev().removeClass('ui-dialog-titlebar');
				$(_pez.loading).prev().addClass('ui-dialog-titlebar-show');	
			}
		}catch(e){
			utils_logs("autoSync - "); utils_logs(e);
			return;
		}
	};
	
	_pez.show = _pez._pAlert;
};



/**
 * @What form 데이타를 json 데이타로 바꾼다.<br/>
 * @example
 * var myForm =  $(document.searchForm);
 * var form = myForm.serializeObject();
 *
 * console.log(JSON.stringify(form));
 */
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};



/**
 * @What tbody를 마지막꺼 한개만 남기고 지워준다.
 * @example
 * ex) $('#tbl8').clearTbody();
 * ex) $('#tblEquipRepair').clearTbody("<tr onclick='javascript:goRepairDetail(this);''>");
 */
$.fn.clearTbody = function(opt){
	
	try{
		var trLength = $(this).find('tbody> tr').length;
		var tbody = $(this).find('tbody> tr').get(-1);
		var $temp = $(tbody).prop('outerHTML');
		$(this).find('tbody >tr').remove();
//		
//		utils_logs("typeof opt = "+typeof opt);
//		
		if(typeof opt == 'string'){
			$(this).find('tbody').append(opt+html+'</tr>');
		}else{
			$(this).find('tbody').append($temp);	
		}
	
		$(this).find('tbody').hide();
	}catch(e){
		utils_logs("clearTbody -222244 "); utils_logs(e);
	}
	
};

/**
 * @What 현재 tr의 인덱스 숫자를 가지고 온다.
 * @Example $('#trId').getTrIndex();
 * @Example $(this).getTrIndex();
 */
$.fn.getTrIndex = function(){
	
	var tr = $(this);
	var count = 0;
	while($(tr)[0].tagName!='TR'){
		tr= $(tr).parent();
		logs('$(tr)[0].tagName = '+$(tr)[0].tagName);
		if(count>5) return null;
		count++;
	}
	return $(tr).parent().children().index($(tr));
};

function trimJSONData(param){
	var param2 = {};
	$(param).each(function(key, value){
		$.each(value, function(key, value){
			var val = value+' ';
	        param2[key] = val.trim();
	    });
	});
	param = param2;
	return param;
}

/**
 * button 말고 다른 input box의 내용은 지워준다.
 */
$.fn.clearInput = function(){
	$(this).find('input[type=text]').val('');
	$(this).find('input[type=hidden]').val('');
	$(this).find('input[type=number]').val('');
	$(this).find('input[type=date]').val('');
	$(this).find('input[type=time]').val('');
	$(this).find('input[type=color]').val('');
	$(this).find('input[type=datetime]').val('');
	$(this).find('input[type=datetime-local]').val('');
	$(this).find('input[type=email]').val('');
	$(this).find('input[type=month]').val('');
	$(this).find('input[type=range]').val('');
	$(this).find('input[type=search]').val('');
	$(this).find('input[type=tel]').val('');
	$(this).find('input[type=url]').val('');
	$(this).find('input[type=week]').val('');
	$(this).find('input[type=file]').val('');
	
};


/**
 * json 데이타를 url로 넘길 수 있는 param로 변경한다.
 * @param json
 * @returns
 */
function jsonToUrlParam(json){
	return Object.keys(json).map(function(k) {
	    return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
	}).join('&');
}

/*
' ------------------------------------------------------------------
' Function    : fc_chk_byte(aro_name)
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      : 
' ------------------------------------------------------------------
*/
function fc_chk_byte(obj)
{

   var ls_str     = obj.val(); // 이벤트가 일어난 컨트롤의 value 값
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var ls_one_char = ""; // 한글자씩 검사한다

   for(i=0; i< li_str_len; i++)
   {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4)
      {
         li_byte += 2;
      }
      // 그밗의 경우는 1을 더한다.
      else
      {
         li_byte++;
      }

         li_len = i + 1;
   }
	return li_byte;	   
}


function utils_logs(log){
	if(typeof console=='object'){
//		console.log(log);	
	}
}



var sValidation = function(){
	$('input[data-valid], textarea[data-valid]').each(function(){
		$(this).attr('data-valid').trim().length>0&&new sValueValidation($(this));
	});
	
	$('input[data-max], input[data-min]').each(function(){
		new sRangeValidation($(this));
	});
};


/**
* 각 객체에 이벤트를 바인딩 한다.
* change 이벤트에 관해서 호출한다.
* 정해진 max 보다 큰 값의 숫자를 가지면 alert한다.
* 단, 문자가 들어온 경우에는 에러 알림을 발생시킨다.
*
*/
var sRangeValidation = function(ele){
	this.ele = ele;
	this.maxNum = Number.MIN_VALUE;	// max 값에 가장 작은 숫자를 넣어 놓는다.
	this.minNum = Number.MAX_VALUE;	// min 값에 가장 큰 숫자를 넣어 놓는다.
	this.hasMax = false;	// max가 있을 경우
	this.hasMin = false;	// min 이 있을 경우
	this.setProperty(ele);
	this.bindElement(this);
};

/**
*
* max값, min 값을 세팅한다. 물론 있다면 말이다.
*/
sRangeValidation.prototype.setProperty = function(ele){
	var prop = ele.attr('data-max')&&ele.attr('data-max').trim().replace(/\;/g,"") || '';
	if(prop.length>0){
		if(isNaN(prop)){
			alert('개발자 경고!! 숫자가 아닌 값이 max 값으로 세팅되었습니다.\n'+ele.prop('id')+'를 확인하세요.');
			throw "error";
		}
		this.maxNum = parseFloat(prop);
		logs('maxNum = '+this.maxNum);
		this.hasMax = true;
	}
	prop = ele.attr('data-min')&&ele.attr('data-min').trim().replace(/\;/g,"") || '';
	if(prop.length>0){
		if(isNaN(prop)){
			alert('개발자 경고!! 숫자가 아닌 값이 min 값으로 세팅되었습니다.\n'+ele.prop('id')+'를 확인하세요.');
			throw "error";
		}
		this.minNum = parseFloat(prop);
		logs('minNum  = '+this.minNum );
		this.hasMin = true;
	}
			
};

/**
* 각 객체에 이벤트를 바인딩 한다.
* change 이벤트에 관해서 호출한다.
*
*/
sRangeValidation.prototype.bindElement = function(klass){	
	$(this.ele).bind('change', function(){
		klass.checkRange($(this), klass);
	});
	$(this.ele).bind('blur', function(){
		klass.checkRange($(this), klass);
	});
};

sRangeValidation.prototype.checkRange = function(ele, klass){
	var value = ele.val();
	if(isNaN(value)){
		alert('숫자 외에는 입력 할 수 없습니다.');
		ele.val(0);
		ele.focus();
	}
	logs('checkRange value = '+value);
	if(klass.hasMax && klass.hasMin){
		if(value>klass.maxNum || value<klass.minNum){
			alert('입력 값은 '+klass.minNum+' ~ '+klass.maxNum+' 사이에 있어야 합니다.');
			ele.focus();
		}
	}else if(klass.hasMax){
		if(value>klass.maxNum){
			alert('입력 값은 '+klass.maxNum+'보다 클 수 없습니다.');
			ele.focus();
		}	
	}else if(klass.hasMin){
		if(value<klass.minNum){
			alert('입력 값은 '+klass.minNum+'보다 작을 수 없습니다.');
			ele.focus();
		}
	}
};


/**
* sValueValidation
*
* input, textarea 태그 내에 data-valid="허용 항목" 형태로 넣으면 두 가지 분류에 대해서 검사한다. 
* 1 번째는 입력되는 값에 대한 체크이며
* 2 번째는 입력이 완료된 후 체크한다.
*
* === 1 번째 입력되는 값에 대한 체크 항목 === 
* long : 소수점을 포함한 숫자 허용
* int : 숫자 허용
* num : 숫자 허용
* kor : 한글 허용
* eng : 영어 허용
* dash : - 허용
* comma : , 허용
* period : . 허용
* under : _ 허용
* 숫자 1 ~  :  입력되는 문자의 길이 제한. 만약 여러개가 들어올 경우 가장 작은 숫자로 입력을 제한한다.
*
* === 2 번째 입력되는 값에 대한 체크 항목 ===
* email : 이메일 표현식 체크
* phone : 전화번호 표현식 체크
*
* ============= 사용법 및 주의 사항 ===========
* === 사용법	1 번재는 combination이 가능하다.
* data-valid="10;kor"	==> 10 byte의 한글만 허용(실제 5글자);	ex) 가나다라마
* data-valid="10;num"	==> 10 자리의 숫자만 허용. ex) 1234567890
* data-valid="10;long;"	==> 10 자리의 숫자만 허용. 소수점 허용.  ex)12345678.9
* data-valid="10;kor;eng;"	==> 10 자리의 한글,영어만 허용. ex) a가b나c다d
* data-valid="10;num"	==> 10 자리의 숫자만 허용. ex) 1234567890
* === 사용법	2 번재는 combination이 불가능하다.
* data-valid="phone;"	==> 전화번호만 허용. ex) 010-1234-5678, 01012345678
* data-valid="email;"	==> 전화번호만 허용. ex) abc@def.com
* data-valid="email;phone"	==> 사용불가!!
* === 주의사항
* 사용법 1과 2를 동시에 사용하면 안된다.
*
**/

var sValueValidation = function(ele){
	this.ele = ele;
	this.value = ele.val();
	this.list = [];
	this.hasBoth = {
			white1:false,	// validation1 이 세팅되었는가?
			white2:false	// validation2 이 세팅되었는가?
	};
	/**
	* only 숫자, 영어, 한글 등 입력되는 문자 확인
	*/
	this.whiteList={
			long:/[0-9]+\.{0,1}[0-9]{0,}/,
			int:/\d/g,
			num:/\d/g,
			kor:new RegExp("[ㄱ-힝]+","g"),
			eng:new RegExp("[a-z]+","gi"),
			dash:/\-/g,
			comma:/\,/g,
			period:/\./g,
			under:/\_/g,
			size:Number.MAX_VALUE
	};
	/**
	* email, 전화번호 등 완성후 확인 할 것
	*/
	this.whiteList2={
			email:new RegExp("[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]+$"),
			phone:/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/
	};

	
	this.setProperties();	// this.list 값을 채운다.
	this.bindElement(this);// 가장 마지막에 바인딩 시켜야 한다.
	
};

/**
* 각 객체에 이벤트를 바인딩 한다.
* keyUp 과 change 이벤트에 관해서 호출한다.
*/

sValueValidation.prototype.bindElement = function(klass){	
	var validation = this.validation;
	var validation2 = this.validation2;
	$(this.ele).bind('blur', function(){
		validation2($(this), klass);
	});
	$(this.ele).bind('change', function(){
		validation2($(this), klass);
	});
	
	$(this.ele).bind('keyup', function(){
		validation($(this), klass);
	});
};
/**
* data-valid가 가지고 있는 ; 로 구분된 value들을 가지고 온다.
*/
sValueValidation.prototype.setProperties = function(){
	var prop = this.ele.attr('data-valid')&&this.ele.attr('data-valid').trim().toLowerCase().replace(/ /g,'') || '';
	
	var limitLength = Number.MAX_VALUE;
	var list = prop.split(';');
	for(var index in list){
		if(list[index].length>0){
			
			if(!isNaN(list[index])){
				limitLength = limitLength<list[index]*1?limitLength:list[index]*1;
				continue;	// 가장 작은 숫자가 들어가야 하기 때문에 continue 시킨다.
			};
			if(this.list.indexOf(list[index])>-1) continue;	// 같은 항목은 넣지 않는다.
			this.list.push(list[index]);
			
			if(this.whiteList[list[index]]){
				this.hasBoth.white1 = true;
			}
			if(this.whiteList2[list[index]]){
				if(this.hasBoth.white2){
					alert('개발자 경고!! email과 phone은 동시에 사용할 수 없습니다.');
				}
				this.hasBoth.white2 = true;
			}
		}
	}
	try{
		this.whiteList['size']=limitLength;	// 길이 제한을 넣는다. 길이 제한이 없으면 사실상 무제한이다.
	}catch(e){}
	
	if(this.hasBoth.white1&&this.hasBoth.white2){
		alert('개발자 경고!! 개별 정책과, 특수 정책은 동시에 사용할 수 없습니다.\n'+this.ele.prop('id')+'를 확인하세요.');
	}
};


/**
* 조합의 validation 체크를 한다.
* ex) <input type="text" data-valid="kor;eng;num;dash;comma;"/> ==> OK
* ex) <input type="text" data-valid="email;kor;eng;num;dash;comma;"/> ==> No : email, phone 과 함께 쓰일 수 없다. 
*
*/
sValueValidation.prototype.validation = function(ele, klass){
	var value = ele.val();
	var whiteList = klass.whiteList;
	var list = klass.list;
	
	// 정해진 길이수 보다 큰 자리수의 글씨가 들어오는지 체크
	if(whiteList['size']>0){
		var overLengthFlag = false;
		// fc_chk_byte(object) pez.util.js 참조. 한글을 포함한 글자의 길이 체크
		while(fc_chk_byte(ele)>whiteList['size']){	// 정해진 길이보다 더 큰 문자열이 들어오면
			ele.val(ele.val().substring(0, ele.val().length-1));	// 마지막에 입력된거를 잘라버린다.
			overLengthFlag = true;
		}
		if(overLengthFlag){
			alert(whiteList['size']+'를 초과하여 입력하실 수 없습니다.');
			ele.focus();
		} 
	}

	
	if(!klass.hasBoth.white1){
		return;	//설정 값이 없으면 검사하지 않는다.
	}
	
	$(list).each(function(){
		if(!isNaN(this)) return true;
		value = value.replace(whiteList[this], '');
	});
	if(value.length>0){
		alert(value+'는 들어갈 수 없습니다.');
		ele.val(ele.val().replace(value,''));
		ele.focus();
		return;
	}
};

/**
* 조합의 validation 체크를 한다.
* ex) <input type="text" data-valid="kor;eng;num;dash;comma;"/> ==> OK
* ex) <input type="text" data-valid="email;kor;eng;num;dash;comma;"/> ==> No : email, phone 과 함께 쓰일 수 없다. 
*
*/
sValueValidation.prototype.validation2 = function(ele, klass){
	
	if(!klass.hasBoth.white2){
		return;	//설정 값이 없으면 검사하지 않는다.
	}
	
	var value = ele.val();
	var whiteList2 = klass.whiteList2, list = klass.list;
	$(list).each(function(){
		value = value.replace(whiteList2[this], '');
	});
	if(value.length>0){
		alert(value+'는 들어갈 수 없습니다.');
		ele.val(ele.val().replace(value,''));
		ele.focus();
		return;
	}
};

