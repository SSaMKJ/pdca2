package pdca.services;

import pdca.models.EnKoQuizVo;
import pdca.services.util.CheckAnswers;

import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */
public interface QuizService {

    CheckAnswers getCheckAnswers(String[] answerArr);

    List<EnKoQuizVo> getQuizList(int limit);
}
