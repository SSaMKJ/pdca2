package pdca.services.util;

import pdca.models.EnKoDataMap;
import pdca.models.EnKoQuizVo;
import pdca.models.QuizWordVo;

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

    public List<EnKoQuizVo> getQuizList(int limit) {
        this.limit = limit;
        List<EnKoQuizVo> quizList = new ArrayList<EnKoQuizVo>();

        for (int i = 0; i < limit; i++) {
            EnKoQuizVo enKoQuizVo = makeEnKoQuizVo(quizDatas.get(i));
            quizList.add(enKoQuizVo);
        }

        return quizList;
    }

    private EnKoQuizVo makeEnKoQuizVo(EnKoDataMap quizData)
    {
        EnKoQuizVo enKoQuizVo = new EnKoQuizVo();

        QuizWordVo left = newEnQuizWord(quizData);
        List<QuizWordVo> rightList = getRightDatas(quizData);

        enKoQuizVo.setLeftVo(left);
        enKoQuizVo.setRightVoList(rightList);

        return enKoQuizVo;
    }

    /**
     *
     * @param quizData
     * @return
     */
    private List<QuizWordVo> getRightDatas(EnKoDataMap quizData) {
        shuffleArray(indexArr);

        List<QuizWordVo> rightList = new ArrayList<QuizWordVo>();

        rightList.add(newKoQuizWord(quizData));
        rightList.addAll(addRightDatas(quizData));

        return rightList;
    }

    private List<QuizWordVo> addRightDatas(EnKoDataMap quizData)
    {
        List<QuizWordVo> rightList = new ArrayList<QuizWordVo>();
        for (int i = 0; rightList.size() < limit; i++) {
            EnKoDataMap koDataMap = quizDatas.get(indexArr[i]);
            if (quizData.getKo_myid().longValue() == koDataMap.getKo_myid().longValue()) {
                continue;
            }

            rightList.add(newKoQuizWord(koDataMap));
        }

        return rightList;
    }

    private QuizWordVo newKoQuizWord(EnKoDataMap dataMap)
    {
        QuizWordVo koQuizWord = new QuizWordVo();
        koQuizWord.setWord(dataMap.getKo_word());
        koQuizWord.setMyid(dataMap.getKo_myid());
        return koQuizWord;
    }

    private QuizWordVo newEnQuizWord(EnKoDataMap dataMap) {
        QuizWordVo enQuizWord = new QuizWordVo();
        enQuizWord.setMyid(dataMap.getEn_myid());
        enQuizWord.setWord(dataMap.getEn_word());
        return enQuizWord;
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
