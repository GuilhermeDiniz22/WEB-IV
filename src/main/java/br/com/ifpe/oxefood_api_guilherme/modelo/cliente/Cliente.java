package br.com.ifpe.oxefood_api_guilherme.modelo.cliente;

import java.time.LocalDate;
import java.util.List;
import org.hibernate.annotations.FetchMode;
import br.com.ifpe.oxefood_api_guilherme.modelo.acesso.Usuario;
import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.SQLRestriction;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLRestriction("habilitado = true")
@Table(name = "cliente")
public class Cliente extends EntidadeAuditavel  {

    @OneToOne
    @JoinColumn(nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "cliente", orphanRemoval = true, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<EnderecoCliente> enderecos;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column
    private LocalDate dataNascimento;

    @Column
    private String cpf;

    @Column
    private String foneCelular;

    @Column
    private String foneFixo;

}

