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
            console.log(JSON.stringify(data));
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
                AndroidBridge && AndroidBridge.showToast('initWindow overflow 13');
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
            <label for="left_1" class="select">belated</label>
            <select name="left_1" id="left_1">
                <option value="3">극단적인 조치</option>
                <option value="17">단골로 삼다</option>
                <option value="14">두드러진</option>
                <option value="1">때늦은</option>
                <option value="20">무례한</option>
                <option value="6">무형의</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="12">엄격한, 혹독한</option>
                <option value="10">제출하다</option>
                <option value="15">초보자</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_2" class="select">disclose</label>
            <select name="left_2" id="left_2">
                <option value="7">~때문에</option>
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="3">극단적인 조치</option>
                <option value="6">무형의</option>
                <option value="18">밀접한 관계, 관련, 암시</option>
                <option value="5">반대되는</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="13">수업료</option>
                <option value="12">엄격한, 혹독한</option>
                <option value="4">이행하다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_3" class="select">extreme measure</label>
            <select name="left_3" id="left_3">
                <option value="7">~때문에</option>
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="3">극단적인 조치</option>
                <option value="1">때늦은</option>
                <option value="20">무례한</option>
                <option value="5">반대되는</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="10">제출하다</option>
                <option value="11">조항, 공급</option>
                <option value="8">화해시키다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_4" class="select">fulfill</label>
            <select name="left_4" id="left_4">
                <option value="7">~때문에</option>
                <option value="3">극단적인 조치</option>
                <option value="19">기증, 기부</option>
                <option value="17">단골로 삼다</option>
                <option value="13">수업료</option>
                <option value="12">엄격한, 혹독한</option>
                <option value="4">이행하다</option>
                <option value="10">제출하다</option>
                <option value="11">조항, 공급</option>
                <option value="9">지루한</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_5" class="select">contrary</label>
            <select name="left_5" id="left_5">
                <option value="7">~때문에</option>
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="1">때늦은</option>
                <option value="6">무형의</option>
                <option value="18">밀접한 관계, 관련, 암시</option>
                <option value="5">반대되는</option>
                <option value="4">이행하다</option>
                <option value="9">지루한</option>
                <option value="15">초보자</option>
                <option value="8">화해시키다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_6" class="select">intangible</label>
            <select name="left_6" id="left_6">
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="19">기증, 기부</option>
                <option value="17">단골로 삼다</option>
                <option value="6">무형의</option>
                <option value="18">밀접한 관계, 관련, 암시</option>
                <option value="5">반대되는</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="13">수업료</option>
                <option value="12">엄격한, 혹독한</option>
                <option value="10">제출하다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_7" class="select">owing to</label>
            <select name="left_7" id="left_7">
                <option value="7">~때문에</option>
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="1">때늦은</option>
                <option value="20">무례한</option>
                <option value="5">반대되는</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="13">수업료</option>
                <option value="11">조항, 공급</option>
                <option value="9">지루한</option>
                <option value="8">화해시키다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_8" class="select">reconcile</label>
            <select name="left_8" id="left_8">
                <option value="7">~때문에</option>
                <option value="3">극단적인 조치</option>
                <option value="19">기증, 기부</option>
                <option value="14">두드러진</option>
                <option value="20">무례한</option>
                <option value="18">밀접한 관계, 관련, 암시</option>
                <option value="13">수업료</option>
                <option value="9">지루한</option>
                <option value="15">초보자</option>
                <option value="8">화해시키다</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_9" class="select">tedious</label>
            <select name="left_9" id="left_9">
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="3">극단적인 조치</option>
                <option value="19">기증, 기부</option>
                <option value="17">단골로 삼다</option>
                <option value="20">무례한</option>
                <option value="6">무형의</option>
                <option value="5">반대되는</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="13">수업료</option>
                <option value="9">지루한</option>
            </select>
        </li>
        <li data-role="fieldcontain">
            <label for="left_10" class="select">submit</label>
            <select name="left_10" id="left_10">
                <option value="7">~때문에</option>
                <option value="16">~하기 쉬운, ~할 것 같은</option>
                <option value="14">두드러진</option>
                <option value="20">무례한</option>
                <option value="6">무형의</option>
                <option value="18">밀접한 관계, 관련, 암시</option>
                <option value="2">밝히다, 드러내다</option>
                <option value="10">제출하다</option>
                <option value="11">조항, 공급</option>
                <option value="8">화해시키다</option>
            </select>
        </li>
    </ul>
</form>

</div>

<button id="btn_start" class="ui-btn bottom" onclick="checkAnswers();">send</button>
<ul id="log"></ul>