package pdca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import pdca.models.EnKoQuizVo;
import pdca.services.QuizService;
import pdca.services.util.CheckAnswers;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by SSaMKJ on 2015-11-18.
 */

@Controller
@RequestMapping("/quiz")
public class QuizController {

    private final static int DATA_LIMIT = 10;

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
        final List<EnKoQuizVo> quizList = quizService.getQuizList(DATA_LIMIT);
        mav.addObject("list", quizList);
        mav.setViewName("jsonView");

        return mav;
    }


    @RequestMapping(value = "/answers", method = RequestMethod.POST)
    public ModelAndView checkAnswers(ModelAndView model, @RequestParam("userId") String userId,  @RequestParam("answers") String answers) {

        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");

        String[] answerArr = answers.split("&");

        CheckAnswers checkAnswers = quizService.getCheckAnswers(answerArr);

        mav.addObject("correct", checkAnswers.getCorrectNumber());
        mav.addObject("wrongWords", checkAnswers.getWrongWords());


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
