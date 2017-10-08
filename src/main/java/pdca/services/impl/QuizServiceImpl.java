package pdca.services.impl;

import pdca.mappers.QuizMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pdca.models.CheckAnswerFromDBVo;
import pdca.models.EnKoDataMap;
import pdca.models.EnKoQuizVo;
import pdca.services.QuizService;
import pdca.services.util.CheckAnswers;
import pdca.services.util.MakeQuizData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */

@Service("quizService")
public class QuizServiceImpl implements QuizService
{

    @Autowired
    private QuizMapper quizMapper;

    @Override
    public CheckAnswers getCheckAnswers(String[] answerArr)
    {
        final String answerIds = extractAnswerIds(answerArr);
        final List<CheckAnswerFromDBVo> answerFromDB = quizMapper.getAnswerFromDB(answerIds);

        return new CheckAnswers(answerArr, answerFromDB);
    }

    @Override
    public List<EnKoQuizVo> getQuizList(int limit)
    {
        List<EnKoDataMap> quizDatas = quizMapper.getAll();

        MakeQuizData util = new MakeQuizData(quizDatas);

        return util.getQuizList(limit);
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

}
