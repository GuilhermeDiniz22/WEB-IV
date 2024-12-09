package br.com.ifpe.oxefood_api_guilherme.modelo.produto;

import br.com.ifpe.oxefood_api_guilherme.modelo.categoriaProduto.CategoriaProduto;
import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLRestriction("habilitado = true")
@Table(name = "produto")
public class Produto extends EntidadeAuditavel {

    @ManyToOne
    private CategoriaProduto categoria;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 200)
    private String descricao;

    @Column(nullable = false)
    private Double valorUnitario;

    @Column(nullable = false)
    private Integer tempoEntregaMinimo;

    @Column(nullable = false)
    private Integer tempoEntregaMaximo;


}
