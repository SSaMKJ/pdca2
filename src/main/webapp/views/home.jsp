<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<html>
<head>

    <title>PDCA</title>

    <link rel="stylesheet" href="../resources/jquery/jquery.mobile-1.4.5.min.css">
    <link rel="stylesheet" href="../resources/themes/defaultTheme.min.css">
    <link rel="stylesheet" href="../resources/themes/jquery.mobile.icons.min.css">
    <script src="../resources/jquery/jquery.js"></script>
    <script src="../resources/jquery/jquery.mobile-1.4.5.min.js"></script>

    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->

    <style id="inset-tablist">
        .tablist-left {
            width: 25%;
            display: inline-block;
        }

        .tablist-content {
            width: 60%;
            display: inline-block;
            vertical-align: top;
            margin-left: 5%;
        }
    </style>

    <script>

        var common = common || {};

        common.getWindowSize = function(){
            var myWidth = 0, myHeight = 0;
            if (typeof (window.innerWidth) == 'number') { //Chrome
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) { //IE9
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            return {
                width:myWidth,
                height :myHeight
            }
        }

        var home = home || {};

        home.initLayout = function(){
//            var height = $("#div_page1").attr('min-height');
//            height = parseInt(height);
//            $("#div_page1").css('height', height+'px');

            $('#one').load('enko/memorize.do', function(){
//                alert('loadComplete');
            })
        }
        home.bindActions = function () {
            $("div[data-role='navbar'] > ul > li").on('click', home.clickeNavi);
        }


        home.clickeNavi = function (evt) {
//            alert('hello world2');
            try {
                alert(evt.target.id);
                debugger;
                memorize.target.clear();
                AndroidBridge && AndroidBridge.showToast('test');
            } catch (e) {
            }

        }

        $(function () {

            home.bindActions();
            home.initLayout();

        });
    </script>


</head>

<body>

<div data-role="main" class="ui-content">
    <div id="div_page1" data-role="page">
        <div data-role="tabs" id="tabs">
            <div data-role="navbar">
                <ul>
                    <li><a href="enko/memorize.do" data-ajax="false" class="ui-btn-active" >외우기</a></li>
                    <li><a href="#two" data-ajax="false"  >테스트</a></li>
                </ul>
            </div>
            <div id="two" class="ui-body-d ui-content">
                <h1>First tab contents</h1>
            </div>
        </div>
    </div>
</div>
</body>
</html>
