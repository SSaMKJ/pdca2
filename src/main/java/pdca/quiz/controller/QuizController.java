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

    @RequestMapping(value = "/data", method = RequestMethod.POST)
    public ModelAndView getList2(ModelAndView model) {
        ModelAndView mav = new ModelAndView();
        List<QuizVo> quizDatas = quizService.getAll();


        mav.addObject("list", quizDatas);
        mav.setViewName("jsonView");

        StringBuilder sb = new StringBuilder("List<QuizVo> quizDatas = new ArrayList<>();\nQuizVo quizVo = null");
        for (QuizVo quizVo : quizDatas) {
sb.append("quizVo = new QuizVo();\n");
            sb.append("            quizVo.setSeq(").append(quizVo.getSeq()).append("l);\n");
            sb.append("            quizVo.setEn_myid(").append(quizVo.getEn_myid()).append("l);\n");
            sb.append("            quizVo.setKo_myid(").append(quizVo.getKo_myid()).append("l);\n");
            sb.append("            quizVo.setEn_word(\"").append(quizVo.getEn_word()).append("\");\n");
            sb.append("            quizVo.setKo_word(\"").append(quizVo.getKo_word()).append("\");\nquizDatas.add(quizVo);\n");
        }

        System.out.println(sb.toString());

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
