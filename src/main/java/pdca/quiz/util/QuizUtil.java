package pdca.quiz.util;

import pdca.quiz.model.EnKoDataMap;
import pdca.quiz.model.EnKoQuizVo;
import pdca.quiz.model.QuizWordVo;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Created by SSaMKJ on 2015-11-20.
 */
public class QuizUtil {
    private List<EnKoDataMap> quizDatas;
    private int[] indexArr;
    private int limit = 0;

    public void setQuizDatas(List<EnKoDataMap> quizDatas) {
        this.quizDatas = quizDatas;
        indexArr = new int[quizDatas.size()];
        for (int i = 0; i < quizDatas.size(); i++) {
            indexArr[i] = i;
        }
    }

    public List<EnKoQuizVo> getData(int limit) {
        this.limit = limit;
        List<EnKoQuizVo> retData = new ArrayList<EnKoQuizVo>();

        for (int i = 0; i < limit; i++) {
            EnKoDataMap quizData = quizDatas.get(i);
            EnKoQuizVo enKoQuizVo = new EnKoQuizVo();
            List<QuizWordVo> rightList = getRightDatas(quizData);
            QuizWordVo left = getLeftData(quizData);
            enKoQuizVo.setLeftVo(left);
            enKoQuizVo.setRightVoList(rightList);
            retData.add(enKoQuizVo);

        }

        return retData;
    }

    private List<QuizWordVo> getRightDatas(EnKoDataMap quizData) {
        List<QuizWordVo> rightList;
        rightList = new ArrayList<QuizWordVo>();
        QuizWordVo right = new QuizWordVo();
        right.setWord(quizData.getKo_word());
        right.setMyid(quizData.getKo_myid());
        rightList.add(right);

        shuffleArray(indexArr);

        for (int i = 0; rightList.size() < limit; i++) {
            EnKoDataMap map = quizDatas.get(indexArr[i]);
            if (quizData.getKo_myid() == map.getKo_myid()) {
                continue;
            }

            right = new QuizWordVo();
            right.setWord(map.getKo_word());
            right.setMyid(map.getKo_myid());
            rightList.add(right);
        }

        return rightList;
    }

    private QuizWordVo getLeftData(EnKoDataMap quizData) {
        QuizWordVo left;
        left = new QuizWordVo();
        left.setMyid(quizData.getEn_myid());
        left.setWord(quizData.getEn_word());
        return left;
    }

    private void shuffleArray(int[] ar) {
        // If running on Java 6 or older, use `new Random()` on RHS here
        Random rnd = ThreadLocalRandom.current();
        for (int i = ar.length - 1; i > 0; i--) {
            int index = rnd.nextInt(i + 1);
            // Simple swap
            int a = ar[index];
            ar[index] = ar[i];
            ar[i] = a;
        }
    }
}
