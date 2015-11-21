package pdca.quiz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pdca.quiz.mapper.QuizMapper;
import pdca.quiz.model.CheckAnswerFromDBVo;
import pdca.quiz.model.EnKoDataMap;

import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */

@Service("quizService")
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizMapper quizMapper;

    @Override
    public List<EnKoDataMap> getAll() {
        return quizMapper.getAll();
    }

    @Override
    public List<CheckAnswerFromDBVo> getAnswerFromDB(String ids) {
        return quizMapper.getAnswerFromDB(ids);
    }
}
