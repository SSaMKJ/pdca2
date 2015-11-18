package pdca.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import pdca.quiz.model.QuizVo;
import pdca.quiz.service.QuizService;

import java.util.List;

/**
 * Created by SSaMKJ on 2015-11-18.
 */

@Controller
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @RequestMapping(value="/data", method = RequestMethod.POST)
    public ModelAndView getList2(ModelAndView model) {
        ModelAndView mav = new ModelAndView();
        List<QuizVo> enKoVoList = quizService.getAll();


        mav.addObject("list", enKoVoList);
        mav.setViewName("jsonView");
        return mav;
    }


    @RequestMapping(value="/test")
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
