package quiz;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import pdca.controllers.QuizController;
import pdca.services.QuizService;

import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Created by kimjinsam on 2015. 11. 21..
 */

@RunWith(SpringJUnit4ClassRunner.class) // = extends SpringJUnit4ClassRunner
@ContextConfiguration(locations = {"classpath:spring.xml","classpath:spring-mvc.xml", "classpath:spring-mybatis.xml"})
public class QuizControlTest {

    private static final Logger logger = Logger.getLogger(QuizControlTest.class);
    private MockMvc mockMvc;

    @Autowired
    private QuizService quizService;



    @Test
    public void checkAnswersTest() {

        String answers = "left_1=19&left_2=16&left_3=16&left_4=3&left_5=7&left_6=17&left_7=7&left_8=7&left_9=7&left_10=7";
        try {
            mockMvc.perform(post("/quiz/answers")
                            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                            .param("answers", answers)
                            .param("userId", "me")
            )
                    .andExpect(status().isOk())
                    .andExpect(view().name("jsonView"))
                    .andExpect(model().attribute("answers", answers))
                    .andExpect(model().attribute("userId", "me")
                    );
        } catch (Exception e) {
            e.printStackTrace();
            fail("");
        }

    }

    @Before
    public void setup()throws Exception {
        MockitoAnnotations.initMocks(this);

        InternalResourceViewResolver viewRes = new InternalResourceViewResolver();
        viewRes.setPrefix("/WEB-INF/pages/");
        viewRes.setSuffix(".jsp");

        this.mockMvc = MockMvcBuilders.standaloneSetup(new QuizController()).build();
    }
}
