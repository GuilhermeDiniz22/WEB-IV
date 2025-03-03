package br.com.ifpe.oxefood_api_guilherme.modelo.produto;

import br.com.ifpe.oxefood_api_guilherme.exception.ProdutoException;
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

        if(produto.getValorUnitario() < 100){
            throw new ProdutoException(ProdutoException.MSG_VALOR_MINIMO_PRODUTO);
        }

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

        if(produtoAlterado.getValorUnitario() < 100){
            throw new ProdutoException(ProdutoException.MSG_VALOR_MINIMO_PRODUTO);
        }
        
       Produto produto =  produtoRepository.findById(id).get();
       produto.setCategoria(produtoAlterado.getCategoria());
       produto.setCodigo(produtoAlterado.getCodigo());
       produto.setDescricao(produtoAlterado.getDescricao());
       produto.setTitulo(produtoAlterado.getTitulo());
       produto.setValorUnitario(produtoAlterado.getValorUnitario());
       produto.setTempoEntregaMaximo(produto.getTempoEntregaMaximo());
       produto.setTempoEntregaMinimo(produto.getTempoEntregaMinimo());

       produtoRepository.save(produto);
    }

    @Transactional
    public void delete(Long id) {

        Produto produto = produtoRepository.findById(id).get();
        produto.setHabilitado(Boolean.FALSE);
        produto.setVersao(produto.getVersao() + 1);

        produtoRepository.save(produto);
    }
}
