package casebycase;

import org.junit.BeforeClass;
import org.junit.Test;
import pdca.models.EnKoDataMap;
import pdca.models.EnKoQuizVo;
import pdca.models.QuizWordVo;
import pdca.services.util.MakeQuizData;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertTrue;

/**
 * Created by SSaMKJ on 2015-11-19.
 */
public class QuizDataTest {

    private static List<EnKoDataMap> quizDatas = new ArrayList<EnKoDataMap>();

    @Test
    public void quizTest(){
        MakeQuizData makeQuizData = new MakeQuizData(quizDatas);
        List<EnKoQuizVo> retData= makeQuizData.getQuizList(10);
        Boolean found = false;
        for (EnKoQuizVo enKoQuizVo : retData) {
            found = false;

            QuizWordVo left = enKoQuizVo.getLeftVo();
            Long leftId = left.getMyid();
            List<QuizWordVo> right = enKoQuizVo.getRightVoList();
            for (QuizWordVo r : right) {
                if(leftId.longValue() == r.getMyid().longValue()){
                    found = true;
                    break;
                }
            }
            assertTrue(found);
        }
    }
    
    @BeforeClass
    public static void set(){

        EnKoDataMap EnKoDataMap = null;
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(1l);
        EnKoDataMap.setEn_myid(1l);
        EnKoDataMap.setKo_myid(1l);
        EnKoDataMap.setEn_word("belated");
        EnKoDataMap.setKo_word("때늦은");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(2l);
        EnKoDataMap.setEn_myid(2l);
        EnKoDataMap.setKo_myid(2l);
        EnKoDataMap.setEn_word("disclose");
        EnKoDataMap.setKo_word("밝히다, 드러내다");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(3l);
        EnKoDataMap.setEn_myid(3l);
        EnKoDataMap.setKo_myid(3l);
        EnKoDataMap.setEn_word("extreme measure");
        EnKoDataMap.setKo_word("극단적인 조치");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(4l);
        EnKoDataMap.setEn_myid(4l);
        EnKoDataMap.setKo_myid(4l);
        EnKoDataMap.setEn_word("fulfill");
        EnKoDataMap.setKo_word("이행하다");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(5l);
        EnKoDataMap.setEn_myid(5l);
        EnKoDataMap.setKo_myid(5l);
        EnKoDataMap.setEn_word("contrary");
        EnKoDataMap.setKo_word("반대되는");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(6l);
        EnKoDataMap.setEn_myid(6l);
        EnKoDataMap.setKo_myid(6l);
        EnKoDataMap.setEn_word("intangible");
        EnKoDataMap.setKo_word("무형의");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(7l);
        EnKoDataMap.setEn_myid(7l);
        EnKoDataMap.setKo_myid(7l);
        EnKoDataMap.setEn_word("owing to");
        EnKoDataMap.setKo_word("~때문에");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(8l);
        EnKoDataMap.setEn_myid(8l);
        EnKoDataMap.setKo_myid(8l);
        EnKoDataMap.setEn_word("reconcile");
        EnKoDataMap.setKo_word("화해시키다");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(9l);
        EnKoDataMap.setEn_myid(9l);
        EnKoDataMap.setKo_myid(9l);
        EnKoDataMap.setEn_word("tedious");
        EnKoDataMap.setKo_word("지루한");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(10l);
        EnKoDataMap.setEn_myid(10l);
        EnKoDataMap.setKo_myid(10l);
        EnKoDataMap.setEn_word("submit");
        EnKoDataMap.setKo_word("제출하다");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(11l);
        EnKoDataMap.setEn_myid(11l);
        EnKoDataMap.setKo_myid(11l);
        EnKoDataMap.setEn_word("provision");
        EnKoDataMap.setKo_word("조항, 공급");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(12l);
        EnKoDataMap.setEn_myid(12l);
        EnKoDataMap.setKo_myid(12l);
        EnKoDataMap.setEn_word("rigorous");
        EnKoDataMap.setKo_word("엄격한, 혹독한");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(13l);
        EnKoDataMap.setEn_myid(13l);
        EnKoDataMap.setKo_myid(13l);
        EnKoDataMap.setEn_word("tuition");
        EnKoDataMap.setKo_word("수업료");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(14l);
        EnKoDataMap.setEn_myid(14l);
        EnKoDataMap.setKo_myid(14l);
        EnKoDataMap.setEn_word("prominet");
        EnKoDataMap.setKo_word("두드러진");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(15l);
        EnKoDataMap.setEn_myid(15l);
        EnKoDataMap.setKo_myid(15l);
        EnKoDataMap.setEn_word("novice");
        EnKoDataMap.setKo_word("초보자");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(16l);
        EnKoDataMap.setEn_myid(16l);
        EnKoDataMap.setKo_myid(16l);
        EnKoDataMap.setEn_word("liable");
        EnKoDataMap.setKo_word("~하기 쉬운, ~할 것 같은");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(17l);
        EnKoDataMap.setEn_myid(17l);
        EnKoDataMap.setKo_myid(17l);
        EnKoDataMap.setEn_word("patronize");
        EnKoDataMap.setKo_word("단골로 삼다");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(18l);
        EnKoDataMap.setEn_myid(18l);
        EnKoDataMap.setKo_myid(18l);
        EnKoDataMap.setEn_word("implication");
        EnKoDataMap.setKo_word("밀접한 관계, 관련, 암시");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(19l);
        EnKoDataMap.setEn_myid(19l);
        EnKoDataMap.setKo_myid(19l);
        EnKoDataMap.setEn_word("endowment");
        EnKoDataMap.setKo_word("기증, 기부");
        quizDatas.add(EnKoDataMap);
        EnKoDataMap = new EnKoDataMap();
        EnKoDataMap.setSeq(20l);
        EnKoDataMap.setEn_myid(20l);
        EnKoDataMap.setKo_myid(20l);
        EnKoDataMap.setEn_word("discourteous");
        EnKoDataMap.setKo_word("무례한");
        quizDatas.add(EnKoDataMap);

    }
}
