<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    #self_test_target {
        background-color: yellowgreen;
        text-align: center;
        vertical-align: middle;
    }

    #inSpell {
        font-size: 240px;
        text-align: center;
        vertical-align: middle;
        line-height: 360px;
    }

    .center {
        text-align: center;
        vertical-align: middle;
    }

    .preview {
        font-size: 40px;
        line-height: 40px;
    }

    .bottom {
        bottom: 0;
    }
</style>
<script>

    var initBind = function(){
    }

    var checkAnswers = function(){
        var $quizAnswers = $('#quizAnswers');
        var answers = $quizAnswers.serialize();

        Ajax('quiz/answers.json',{'userId':'me', 'answers':answers}, function(data){

            if(data.wrongWords == undefined || data.wrongWords.length == 0){
                alert('짝짝짝 모두 맞췄습니다');
            }else{
                alert('틀린단어\n['+data.wrongWords+']');
            }


        });
    }
    var quiz = quiz || {};

    quiz = (function () {
        var target = $('#self_quiz_target');
        var windowSize = common.getWindowSize();
        var list;
        var listView = $('#listView');

        var initWindow = function(){
            try{
            }catch(e){}
            target.height(windowSize.height - 130);
            target.width(windowSize.width - 35);

        }
        var setList = function (l) {
            list = l;
            listView.empty();

            $(list).each(function(index, data){
                listView.append(makeLi(data.leftVo, data.rightVoList));
            })

        }

        var makeLi = function(left, right){
            if(left === undefined) throw 'left is null';
            if(right === undefined) throw 'right is null';
            var $li = $('<li data-role="fieldcontain"></li>');
            var $label = $('<label></label>');
            $label.text(left.word);
            $label.attr('for', 'left_'+left.myid);
            $label.addClass('select');

            $li.append($label);
            var $select = $('<select></select>');
            $select.attr('name', 'left_'+left.myid)
            $select.attr('id', 'left_'+left.myid)

            $(right).each(function(index, obj){
                $select.append(getOption(obj));
            });
            $li.append($select);
            return $li;
        }

        var getOption = function(obj){
            var $option = $('<option value="standard">Standard: 7 day</option>');
            $option.val(obj.myid);
            $option.text(obj.word);
            return $option;
        }

        var getData = function(){

            Ajax('quiz/data.json',{'userId':'me'}, function(data){
                setList(data.list);
            });
        }

        return {
            setList: setList,
            getData : getData,
            initWindow : initWindow
        }
    }())

    $( document ).ready(function(){
        initBind();
        quiz.initWindow();
        quiz.getData();
    })

</script>


<div id="self_quiz_target" class="target ui-body-d ui-content" style="position:relative;overflow:auto;">
<form id="quizAnswers">
    <ul id="listView" data-role="listview" data-inset="true">
        <li data-role="fieldcontain">
           onLoading...
        </li>
    </ul>
</form>

</div>

<button id="btn_start" class="ui-btn bottom" onclick="checkAnswers();">send</button>
<ul id="log"></ul>