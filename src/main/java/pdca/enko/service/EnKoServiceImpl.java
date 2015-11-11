package pdca.enko.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pdca.enko.mapper.EnKoMapper;
import pdca.enko.model.EnKoVo;

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
