package br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema;

import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeNegocio;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLRestriction("habilitado = true")
@Table(name = "configuracaoSistema")
public class ConfiguracaoSistema extends EntidadeAuditavel {

    @Column
    private String nomeEmpresa;

    @Column
    private String cnpj;

    @Column
    private String site;

    @Column
    private String emailContato;

    @Column
    private Long tempoMinimoAgendamentoPedidos;

    @Column
    private Boolean ligarAceitePedidos;

    @Column
    private LocalDate dataEntradaSistema;

}
