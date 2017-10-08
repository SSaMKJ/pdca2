package pdca.models;

/**
 * Created by SSaMKJ on 2015-11-20.
 */
public class QuizWordVo implements  Comparable<QuizWordVo>{
    public Long seq;
    public Long myid;
    public String word;

    public Long getSeq() {
        return seq;
    }

    public void setSeq(Long seq) {
        this.seq = seq;
    }

    public Long getMyid() {
        return myid;
    }

    public void setMyid(Long myid) {
        this.myid = myid;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    @Override
    public int compareTo(QuizWordVo o) {
        if(this.word == null) return 0;
        if(o == null || o.getWord() == null) return 0;
        return this.getWord().compareTo(o.getWord());
    }
}
