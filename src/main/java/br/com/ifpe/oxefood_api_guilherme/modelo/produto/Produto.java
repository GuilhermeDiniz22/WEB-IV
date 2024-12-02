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

    @Column
    private String codigo;

    @Column
    private String titulo;

    @Column
    private String descricao;

    @Column
    private Double valorUnitario;

    @Column
    private Integer tempoEntregaMinimo;

    @Column
    private Integer tempoEntregaMaximo;


}
