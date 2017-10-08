package pdca.quiz.util;

import org.apache.commons.lang3.StringUtils;
import pdca.quiz.model.CheckAnswerFromDBVo;
import pdca.quiz.service.QuizService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CheckAnswers
{
    private String[] answerArr;
    private int correct = 0;
    private String wrongWords;
    private QuizService quizService;

    public CheckAnswers(String[] answerArr, QuizService quizService)
    {
        this.answerArr = answerArr;
        this.quizService = quizService;

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
        String answerIds = extractAnswerIds(answerArr);

        Map<Long, Long> answerMap = getAnswerMap(answerArr);

        List<CheckAnswerFromDBVo> checkAnswerFromDBVos = quizService.getAnswerFromDB(answerIds);

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

    private String extractAnswerIds(String[] answerArr)
    {
        List<Long> mapIdList = new ArrayList<Long>();
        for (String ans : answerArr)
        {
            mapIdList.add(Long.parseLong(ans.split("=")[0].replace("left_", "")));
        }
        return StringUtils.join(mapIdList, ",");
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
