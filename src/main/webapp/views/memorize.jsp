<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    #spell_target{
        background-color : yellowgreen;
        text-align: center;
        vertical-align: middle;
    }

    #inSpell{
        background-color : red;
        font-size:240px;
        text-align: center;
        vertical-align: middle;
        line-height: 360px;
    }
    .center {
        text-align: center;
        vertical-align: middle;
    }
    .preview{
        font-size:40px;
        line-height: 40px;
    }
    .bottom{
        bottom:   0;
    }
</style>
<script>
    var memorize = memorize || {};

    memorize.data = [];
    <c:forEach var="result" items="${list}" varStatus="status">
    memorize.data.push({'myid':'<c:out value="${result.myid}"/>', 'en':'<c:out value="${result.en}"/>', 'ko':'<c:out value="${result.ko}"/>'})
    </c:forEach>

    memorize.initWindow = function(){

        memorize.target.initWindow();
    }

    memorize.bindActions = function(){
        $('#btn_start').on('click', memorize.startMemorize)
    };

    memorize.startMemorize = function(){
        for(var index in memorize.data){
            memorize.target.addData(memorize.data[index]);
        }
        memorize.target.start();
    }

    memorize.hideBtnStart = function(){
        $('#btn_start').hide();
    }

    memorize.showBtnStart = function(){
        $('#btn_start').show();
    }

    memorize.target = (function(){
        var target = $('#spell_target');
        var inSpell = target.find('#inSpell');
        var windowSize = common.getWindowSize();

        var initWindow = function(){

            target.height(windowSize.height - 130);
            target.width(windowSize.width - 35);
            logs("target.height( == "+target.height())
            inSpell.height(windowSize.height - 300);
            var inSpellMarinTop = target.height() - inSpell.height() - 100;
            logs("inSpell.height() = "+inSpell.height());

            inSpell.css('margin-top', inSpellMarinTop/2);

        }

        var stringQueue = [];

        var addData = function(obj){
            if(obj == null || obj == undefined) throw 'no data exception';

            stringQueue.push(obj)
        }

        var start = function(){
            memorize.hideBtnStart();
            var obj = stringQueue.shift();
            if(obj == null || obj.length == 0){
                memorize.showBtnStart();
                inSpell.text('');
                return;
            }
            $('#currentText').text(obj.en+' : '+obj.ko);
            var en = obj.en;
            var outText = [];
            for(var i = 0;i<en.length;i++){
                outText.push({text:en.charAt(i), locale:'US'});
            }
            outText.push({text:en, locale:'US'});
            outText.push({text:obj.ko, locale:'KO'});
            var timer = window.setInterval(function(){
                var out = outText.shift();
                if(out == null){
                    clearInterval(timer);
                    start();
                }
                inSpell.text(out.text);
                try{
                    AndroidBridge && AndroidBridge.convertTextToSpeech(out.text, out.locale);
                }catch(e){}

            }, 2000);
        }
        return {
            initWindow : initWindow,
            addData : addData,
            start : start
        }
    }());


    var logs = function(l){
        $('#log').append('<li>'+l+'</li>');
    }
    $(function(){
        memorize.initWindow();
        memorize.bindActions();
        for(var d in memorize.data){
//            logs(JSON.stringify(memorize.data[d]));
        }
    })

</script>

<div id="spell_target" class="target ui-body-d ui-content" style="">
    <p id="currentText" class="center preview">-</p>
    <p id="inSpell" style="background-color:red;"></p>
</div>

<button id="btn_start" class="ui-btn bottom">시작</button>
<ul id="log"></ul>