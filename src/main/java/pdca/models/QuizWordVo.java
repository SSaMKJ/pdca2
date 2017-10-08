package pdca.models;

/**
 * Created by SSaMKJ on 2015-11-20.
 */
public class QuizWordVo implements  Comparable<QuizWordVo>{
    private Long seq;
    private Long myid;
    private String word;

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

    @Override
    public String toString()
    {
        final StringBuffer sb = new StringBuffer("QuizWordVo{");
        sb.append("seq=").append(seq);
        sb.append(", myid=").append(myid);
        sb.append(", word='").append(word).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
