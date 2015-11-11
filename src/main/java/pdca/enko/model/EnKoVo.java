package pdca.enko.model;

import org.apache.ibatis.type.Alias;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */
@Alias("EnKoVo")
public class EnKoVo {
    private Long myid;
    private String en;
    private String ko;

    public Long getMyid() {
        return myid;
    }

    public void setMyid(Long myid) {
        this.myid = myid;
    }

    public String getEn() {
        return en;
    }

    public void setEn(String en) {
        this.en = en;
    }

    public String getKo() {
        return ko;
    }

    public void setKo(String ko) {
        this.ko = ko;
    }
}
