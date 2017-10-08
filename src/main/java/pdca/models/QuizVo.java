package pdca.models;

/**
 * Created by kimjinsam on 2015. 11. 21..
 */
public class QuizVo {
    private long seq;
    private long en_myid;
    private long ko_myid;
    private String en_word;
    private String ko_word;

    public void setSeq(long seq) {
        this.seq = seq;
    }

    public void setEn_myid(long en_myid) {
        this.en_myid = en_myid;
    }

    public void setKo_myid(long ko_myid) {
        this.ko_myid = ko_myid;
    }

    public void setEn_word(String en_word) {
        this.en_word = en_word;
    }

    public void setKo_word(String ko_word) {
        this.ko_word = ko_word;
    }
}
