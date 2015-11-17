<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
    #self_test_target{
        background-color : yellowgreen;
        text-align: center;
        vertical-align: middle;
    }

    #inSpell{
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

</script>



<div id="self_test_target" class="target ui-body-d ui-content" style="position:relative;">



</div>

<button id="btn_start" class="ui-btn bottom">send</button>
<ul id="log"></ul>