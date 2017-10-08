package pdca.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class HomeController {


	@RequestMapping(value="/home")
	public String home(HttpServletRequest request) {
		return "views/home";
	}
	
}
