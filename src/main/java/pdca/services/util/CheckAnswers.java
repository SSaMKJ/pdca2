package pdca.services.util;

import org.apache.commons.lang3.StringUtils;
import pdca.models.CheckAnswerFromDBVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CheckAnswers
{
    private String[] answerArr;
    private int correct = 0;
    private String wrongWords;
    private List<CheckAnswerFromDBVo> checkAnswerFromDBVos;

    public CheckAnswers(String[] answerArr, List<CheckAnswerFromDBVo> checkAnswerFromDBVos)
    {
        this.answerArr = answerArr;
        this.checkAnswerFromDBVos = checkAnswerFromDBVos;

        checkAnswers();
    }


    public int getCorrectNumber()
    {
        return correct;
    }

    public String getWrongWords()
    {
        return wrongWords;
    }

    private void checkAnswers()
    {
        Map<Long, Long> answerMap = getAnswerMap(answerArr);

        compareUserAnswersAndDBValues(answerMap, checkAnswerFromDBVos);
    }

    private void compareUserAnswersAndDBValues(Map<Long, Long> answerMap, List<CheckAnswerFromDBVo> checkAnswerFromDBVos)
    {
        List<String> wrongAnswerList = new ArrayList<String>();

        for (CheckAnswerFromDBVo dbAndswer : checkAnswerFromDBVos)
        {
            if (answerMap.get(dbAndswer.getMapMyid()).longValue() == dbAndswer.getKoMyid().longValue())
            {
                correct++;
            }
            else
            {
                wrongAnswerList.add(dbAndswer.getEnWord());
            }
        }

        wrongWords = StringUtils.join(wrongAnswerList, "\n");
    }


    private Map<Long, Long> getAnswerMap(String[] answerArr)
    {
        Map<Long, Long> answerMap = new HashMap<Long, Long>();
        for (String ans : answerArr)
        {
            answerMap.put(Long.parseLong(ans.split("=")[0].replace("left_", "")), Long.parseLong(ans.split("=")[1]));
        }
        return answerMap;
    }
}
