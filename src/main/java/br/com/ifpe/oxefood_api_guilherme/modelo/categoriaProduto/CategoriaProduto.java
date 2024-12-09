package br.com.ifpe.oxefood_api_guilherme.modelo.categoriaProduto;

import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLRestriction("habilitado = true")
@Table(name = "CategoriaProduto")
public class CategoriaProduto extends EntidadeAuditavel {

    @Column(nullable = false)
    private String descricao;
}
