package pdca.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import pdca.quiz.model.CheckAnswerFromDBVo;
import pdca.quiz.model.EnKoDataMap;
import pdca.quiz.service.QuizService;
import pdca.quiz.util.QuizUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by SSaMKJ on 2015-11-18.
 */

@Controller
@RequestMapping("/quiz")
public class QuizController {


    private QuizService quizService;


    @Autowired
    public void setQuizService(QuizService quizService) {
        this.quizService = quizService;
    }


    @RequestMapping(value="/quiz")
    public ModelAndView getList(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("views/quiz");

        return mav;
    }


    @RequestMapping(value = "/data", method = RequestMethod.POST)
    public ModelAndView getList(ModelAndView model) {
        ModelAndView mav = new ModelAndView();
        int limit = 10;
        List<EnKoDataMap> quizDatas = quizService.getAll();

        QuizUtil util = new QuizUtil();
        util.setQuizDatas(quizDatas);

        mav.addObject("list", util.getData(limit));
        mav.setViewName("jsonView");

        return mav;
    }


    @RequestMapping(value = "/answers", method = RequestMethod.POST)
    public ModelAndView checkAnswers(ModelAndView model, @RequestParam("userId") String userId,  @RequestParam("answers") String answers) {

        String[] answer = answers.split("&");

        Map<Long, Long> answerMap = new HashMap<Long, Long>();

        StringBuffer mapIds = new StringBuffer();
        for (String ans : answer) {
            if(mapIds.length()>0) mapIds.append(",");
            mapIds.append(Long.parseLong(ans.split("=")[0].replace("left_", "")));
            answerMap.put(Long.parseLong(ans.split("=")[0].replace("left_", "")), Long.parseLong(ans.split("=")[1]));

        }
        System.out.println(mapIds.toString());
        List<CheckAnswerFromDBVo> checkAnswerFromDBVos = quizService.getAnswerFromDB(mapIds.toString());

        ModelAndView mav = new ModelAndView();


        StringBuffer wrongAnswers = new StringBuffer();
        int correct = 0;
        for (CheckAnswerFromDBVo dbAndswer : checkAnswerFromDBVos) {
            if(answerMap.get(dbAndswer.getMapMyid()) == dbAndswer.getKoMyid()){
                correct++;
            }else{
                if(wrongAnswers.length()>0) wrongAnswers.append("\n");
                wrongAnswers.append(dbAndswer.getEnWord());
            }
        }

        mav.addObject("correct", correct);
        mav.addObject("wrongWords", wrongAnswers.toString());
        mav.setViewName("jsonView");


        return mav;
    }

    @RequestMapping(value = "/test")
//    @RequestMapping(value="/test", method = RequestMethod.GET)
    public ModelAndView test(ModelAndView model) {
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("==================");
        System.out.println("==================");

        return null;
    }
}
