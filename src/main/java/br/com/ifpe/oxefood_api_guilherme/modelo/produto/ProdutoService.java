package br.com.ifpe.oxefood_api_guilherme.modelo.produto;

import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.Cliente;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    ProdutoRepository produtoRepository;

    @Transactional
    public Produto save(Produto produto) {

        produto.setHabilitado(Boolean.TRUE);
        produto.setVersao(1L);
        produto.setDataCriacao(LocalDate.now());
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto obterPorID(Long id) {
        return produtoRepository.findById(id).get();
    }

    @Transactional
    public void update(Long id, Produto produtoAlterado){
       Produto produto =  produtoRepository.findById(id).get();
       produto.setCodigo(produtoAlterado.getCodigo());
       produto.setDescricao(produtoAlterado.getDescricao());
       produto.setTitulo(produtoAlterado.getTitulo());
       produto.setValorUnitario(produtoAlterado.getValorUnitario());
       produto.setTempoEntregaMaximo(produto.getTempoEntregaMaximo());
       produto.setTempoEntregaMinimo(produto.getTempoEntregaMinimo());

       produtoRepository.save(produto);
    }
}
