package pdca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pdca.mappers.EnKoMapper;
import pdca.models.EnKoVo;

import java.util.List;

/**
 * Created by kimjinsam on 2015. 11. 7..
 */

@Service("enkoService")
public class EnKoServiceImpl implements EnKoService {

    @Autowired
    private EnKoMapper enKoMapper;

    @Override
    public List<EnKoVo> getAll() {
        return enKoMapper.getAll();
    }
}
