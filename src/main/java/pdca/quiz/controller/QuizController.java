package pdca.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import pdca.quiz.model.EnKoDataMap;
import pdca.quiz.service.QuizService;
import pdca.quiz.util.CheckAnswers;
import pdca.quiz.util.QuizUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

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

        mav.addObject("list", util.getQuizList(limit));
        mav.setViewName("jsonView");

        return mav;
    }


    @RequestMapping(value = "/answers", method = RequestMethod.POST)
    public ModelAndView checkAnswers(ModelAndView model, @RequestParam("userId") String userId,  @RequestParam("answers") String answers) {

        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");

        String[] answerArr = answers.split("&");

        CheckAnswers checkAnswers = new CheckAnswers(answerArr, quizService);

        int correct = checkAnswers.getCorrectNumber();
        String wrongWords = checkAnswers.getWrongWords();

        mav.addObject("correct", correct);
        mav.addObject("wrongWords", wrongWords);


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
