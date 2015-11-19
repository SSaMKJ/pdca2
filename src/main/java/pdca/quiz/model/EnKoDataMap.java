package pdca.quiz.model;

import org.apache.ibatis.type.Alias;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */
@Alias("QuizVo")
public class EnKoDataMap {

    private Long seq;
    private Long en_myid;
    private Long ko_myid;
    private String en_word;
    private String ko_word;

    public Long getSeq() {
        return seq;
    }

    public void setSeq(Long seq) {
        this.seq = seq;
    }

    public Long getEn_myid() {
        return en_myid;
    }

    public void setEn_myid(Long en_myid) {
        this.en_myid = en_myid;
    }

    public Long getKo_myid() {
        return ko_myid;
    }

    public void setKo_myid(Long ko_myid) {
        this.ko_myid = ko_myid;
    }

    public String getEn_word() {
        return en_word;
    }

    public void setEn_word(String en_word) {
        this.en_word = en_word;
    }

    public String getKo_word() {
        return ko_word;
    }

    public void setKo_word(String ko_word) {
        this.ko_word = ko_word;
    }
}
