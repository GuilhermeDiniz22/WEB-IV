package br.com.ifpe.oxefood_api_guilherme.api.entregador;

import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.Cliente;
import br.com.ifpe.oxefood_api_guilherme.modelo.entregador.Entregador;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntregadorRequest {


    @NotNull(message = "O Nome é de preenchimento obrigatório")
    @NotEmpty(message = "O Nome é de preenchimento obrigatório")
    @Length(max = 100, message = "O Nome deverá ter no máximo {max} caracteres")
    private String nome;

    @NotBlank(message = "O CPF é de preenchimento obrigatório")
    @CPF
    private String cpf;

    @NotBlank(message = "O RG é de preenchimento obrigatório")
    @NotNull(message = "O RG é de preenchimento obrigatório")
    private String rg;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @Pattern(regexp = "81\\d{8,9}", message = "O número deve começar com o DDD 81 e conter 8 ou 9 dígitos.")
    private String foneCelular;

    @Pattern(regexp = "81\\d{8}", message = "O número de telefone fixo deve começar com o DDD 81 e conter 8 dígitos.")
    private String foneFixo;

    @NotNull(message = "A quantidade de entregas é de preenchimento obrigatório")
    @NotNull(message = "A quantidade de entregas é de preenchimento obrigatório")
    private Integer qtdEntregasRealizadas;

    @NotNull(message = "O valor de frete é de preenchimento obrigatório")
    @NotBlank(message = "O valor de frete é de preenchimento obrigatório")
    private Double valorFrete;

    @NotNull(message = "O valor de frete é de preenchimento obrigatório")
    @NotBlank(message = "O valor de frete é de preenchimento obrigatório")
    private String enderecoNumero;

    @NotNull(message = "O valor de frete é de preenchimento obrigatório")
    @NotBlank(message = "O valor de frete é de preenchimento obrigatório")
    private String enderecoBairro;

    @NotNull(message = "O valor de frete é de preenchimento obrigatório")
    @NotBlank(message = "O valor de frete é de preenchimento obrigatório")
    private String enderecoCidade;

    @NotNull(message = "O valor de frete é de preenchimento obrigatório")
    @NotBlank(message = "O valor de frete é de preenchimento obrigatório")
    private String enderecoCep;

    @NotNull(message = "O endereço de UF é de preenchimento obrigatório")
    @NotBlank(message = "O endereço de UF  é de preenchimento obrigatório")
    private String enderecoUf;

    private Boolean ativo;

    public Entregador build() {

        return Entregador.builder()
                .nome(nome)
                .cpf(cpf)
                .cpf(cpf)
                .dataNascimento(dataNascimento)
                .foneCelular(foneCelular)
                .foneFixo(foneFixo)
                .qtdEntregasRealizadas(qtdEntregasRealizadas)
                .valorFrete(valorFrete)
                .enderecoNumero(enderecoNumero)
                .enderecoBairro(enderecoBairro)
                .enderecoCidade(enderecoCidade)
                .enderecoCep(enderecoCep)
                .enderecoUf(enderecoUf)
                .ativo(ativo)
                .build();
    }

}