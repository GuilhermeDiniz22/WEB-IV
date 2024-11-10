package br.com.ifpe.oxefood_api_guilherme.modelo.entregador;

import br.com.ifpe.oxefood_api_guilherme.modelo.produto.Produto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EntregadorService {

    @Autowired
    EntregadorRepository entregadorRepository;

    @Transactional
    public Entregador save(Entregador entregador) {

        entregador.setHabilitado(Boolean.TRUE);
        entregador.setVersao(1L);
        entregador.setDataCriacao(LocalDate.now());
        return entregadorRepository.save(entregador);
    }

    @Transactional
    public void update(Long id, Entregador entregadorAlterado){
        Entregador entregador =  entregadorRepository.findById(id).get();
        entregador.setNome(entregadorAlterado.getNome());
        entregador.setCpf(entregadorAlterado.getCpf());
        entregador.setRg(entregadorAlterado.getRg());
        entregador.setDataNascimento(entregadorAlterado.getDataNascimento());
        entregador.setFoneCelular(entregador.getFoneCelular());
        entregador.setFoneFixo(entregador.getFoneFixo());
        entregador.setQtdEntregasRealizadas(entregadorAlterado.getQtdEntregasRealizadas());
        entregador.setValorFrete(entregadorAlterado.getValorFrete());
        entregador.setEnderecoNumero(entregador.getEnderecoNumero());
        entregador.setEnderecoBairro(entregador.getEnderecoBairro());
        entregador.setEnderecoBairro(entregadorAlterado.getEnderecoBairro());
        entregador.setEnderecoCidade(entregador.getEnderecoCidade());
        entregador.setEnderecoCep(entregadorAlterado.getEnderecoCep());
        entregador.setEnderecoUf(entregador.getEnderecoUf());

        entregadorRepository.save(entregador);
    }

    public List<Entregador> listarTodos() {
        return entregadorRepository.findAll();
    }

    public Entregador obterPorID(Long id) {
        return entregadorRepository.findById(id).get();
    }
}
