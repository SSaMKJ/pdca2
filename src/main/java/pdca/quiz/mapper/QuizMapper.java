package pdca.quiz.mapper;

import pdca.quiz.model.CheckAnswerFromDBVo;
import pdca.quiz.model.EnKoDataMap;

import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */
public interface QuizMapper {
    public List<EnKoDataMap> getAll();

    public List<CheckAnswerFromDBVo> getAnswerFromDB(String ids);
}
