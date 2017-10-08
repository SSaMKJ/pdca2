package pdca.models;

/**
 * Created by kimjinsam on 2015. 11. 21..
 */
public class CheckAnswerFromDBVo {
    private Long mapMyid;
    private Long koMyid;
    private String enWord;

    public Long getMapMyid() {
        return mapMyid;
    }

    public void setMapMyid(Long mapMyid) {
        this.mapMyid = mapMyid;
    }

    public Long getKoMyid() {
        return koMyid;
    }

    public void setKoMyid(Long koMyid) {
        this.koMyid = koMyid;
    }

    public String getEnWord() {
        return enWord;
    }

    public void setEnWord(String enWord) {
        this.enWord = enWord;
    }
}
