package br.com.ifpe.oxefood_api_guilherme.modelo.categoriaProduto;

import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.Cliente;
import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CategoriaProdutoService {

    @Autowired
    private CategoriaProdutoRepository categoriaProdutoRepository;

    public List<CategoriaProduto> listarTodos() {

        return categoriaProdutoRepository.findAll();
    }

    public CategoriaProduto obterPorID(Long id) {

        return categoriaProdutoRepository.findById(id).get();
    }


    @Transactional
    public CategoriaProduto save(CategoriaProduto categoriaProduto) {

        categoriaProduto.setHabilitado(Boolean.TRUE);
        categoriaProduto.setVersao(1L);
        categoriaProduto.setDataCriacao(LocalDate.now());
        return categoriaProdutoRepository.save(categoriaProduto);
    }

    @Transactional
    public void update(Long id, CategoriaProduto categoriaProdutoAlterado) {

        CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(id).get();
        categoriaProduto.setDescricao(categoriaProdutoAlterado.getDescricao());


        categoriaProdutoRepository.save(categoriaProduto);
    }

    @Transactional
    public void delete(Long id) {

        CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(id).get();
        categoriaProduto.setHabilitado(Boolean.FALSE);
        categoriaProduto.setVersao(categoriaProduto.getVersao() + 1);

        categoriaProdutoRepository.save(categoriaProduto);
    }
}
