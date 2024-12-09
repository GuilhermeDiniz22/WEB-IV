package br.com.ifpe.oxefood_api_guilherme.modelo.entregador;

import br.com.ifpe.oxefood_api_guilherme.util.entity.EntidadeAuditavel;
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
@Table(name = "entregador")
public class Entregador extends EntidadeAuditavel {

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String rg;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false)
    private String foneCelular;

    @Column(nullable = false)
    private String foneFixo;

    @Column(nullable = false)
    private Integer qtdEntregasRealizadas;

    @Column(nullable = false)
    private Double valorFrete;

    @Column(nullable = false)
    private String enderecoNumero;

    @Column(nullable = false)
    private String enderecoBairro;

    @Column(nullable = false)
    private String enderecoCidade;

    @Column(nullable = false)
    private String enderecoCep;

    @Column(nullable = false)
    private String enderecoUf;
            ;
    @Column(nullable = false)
    private Boolean ativo;






}
