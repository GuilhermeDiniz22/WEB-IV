package br.com.ifpe.oxefood_api_guilherme.modelo.cliente;

import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
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
@Table(name = "endereco_cliente")
public class EnderecoCliente extends EntidadeAuditavel {

    @JsonIgnore
    @ManyToOne
    private Cliente cliente;

    @Column
    private String rua;

    @Column
    private String numero;

    @Column
    private String bairro;

    @Column
    private String cep;

    @Column
    private String cidade;

    @Column
    private String estado;

    @Column
    private String complemento;


}
