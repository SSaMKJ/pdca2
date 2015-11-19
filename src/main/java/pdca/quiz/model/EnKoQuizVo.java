package pdca.quiz.model;

import java.util.Collections;
import java.util.List;

/**
 * Created by SSaMKJ on 2015-11-20.
 */
public class EnKoQuizVo {
    private QuizWordVo leftVo;
    private List<QuizWordVo> rightVoList;

    public QuizWordVo getLeftVo() {
        return leftVo;
    }

    public void setLeftVo(QuizWordVo leftVo) {
        this.leftVo = leftVo;
    }

    public List<QuizWordVo> getRightVoList() {
        Collections.sort(rightVoList);
        return rightVoList;
    }

    public void setRightVoList(List<QuizWordVo> rightVoList) {
        this.rightVoList = rightVoList;
    }
}
