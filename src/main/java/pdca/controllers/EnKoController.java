package pdca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import pdca.models.EnKoVo;
import pdca.services.EnKoService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */

@Controller
@RequestMapping("/enko")
public class EnKoController {

    @Autowired
    EnKoService enKoService;

    @RequestMapping(value="/memorize")
    public ModelAndView getList(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView();

        List<EnKoVo> enKoVoList = enKoService.getAll();
        mav.setViewName("views/memorize");

        mav.addObject("list", enKoVoList);

        return mav;
    }


    @RequestMapping(value="/list2")
    public void getList2(ModelAndView model) {
        ModelAndView mav = new ModelAndView();

        List<EnKoVo> enKoVoList = enKoService.getAll();
//        mav.setViewName("views/home");

        model.addObject("list", enKoVoList);

    }
}
