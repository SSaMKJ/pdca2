package pdca.quiz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pdca.quiz.mapper.QuizMapper;
import pdca.quiz.model.QuizVo;

import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */

@Service("quizService")
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizMapper quizMapper;

    @Override
    public List<QuizVo> getAll() {
        return quizMapper.getAll();
    }
}
