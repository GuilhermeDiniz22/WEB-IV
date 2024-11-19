package br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema;

import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.Cliente;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ConfiguracaoSistemaService {

    @Autowired
    ConfiguracaoSistemaRepository configuracaoSistemaRepository;

    public List<ConfiguracaoSistema> listarTodos() {

        return configuracaoSistemaRepository.findAll();
    }

    public ConfiguracaoSistema obterPorID(Long id) {

        return configuracaoSistemaRepository.findById(id).get();
    }

    @Transactional
    public ConfiguracaoSistema save(ConfiguracaoSistema configuracaoSistema) {

        configuracaoSistema.setHabilitado(Boolean.TRUE);
        configuracaoSistema.setVersao(1L);
        configuracaoSistema.setDataCriacao(LocalDate.now());
        return configuracaoSistemaRepository.save(configuracaoSistema);
    }

    @Transactional
    public void update(Long id, ConfiguracaoSistema configuracaoSistemaAlterado) {

        ConfiguracaoSistema configuracaoSistema = configuracaoSistemaRepository.findById(id).get();
        configuracaoSistema.setCnpj(configuracaoSistemaAlterado.getCnpj());
        configuracaoSistema.setNomeEmpresa(configuracaoSistemaAlterado.getNomeEmpresa());
        configuracaoSistema.setSite(configuracaoSistemaAlterado.getSite());
        configuracaoSistema.setEmailContato(configuracaoSistemaAlterado.getEmailContato());
        configuracaoSistema.setTempoMinimoAgendamentoPedidos(configuracaoSistemaAlterado.getTempoMinimoAgendamentoPedidos());
        configuracaoSistema.setDataEntradaSistema(configuracaoSistemaAlterado.getDataEntradaSistema());

        configuracaoSistemaRepository.save(configuracaoSistema);
    }

    @Transactional
    public void delete(Long id) {

        ConfiguracaoSistema configuracaoSistema = configuracaoSistemaRepository.findById(id).get();
        configuracaoSistema.setHabilitado(Boolean.FALSE);
        configuracaoSistema.setVersao(configuracaoSistema.getVersao() + 1);

        configuracaoSistemaRepository.save(configuracaoSistema);
    }
}
