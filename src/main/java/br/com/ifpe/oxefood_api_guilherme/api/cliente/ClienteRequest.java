package br.com.ifpe.oxefood_api_guilherme.api.cliente;

import br.com.ifpe.oxefood_api_guilherme.modelo.acesso.Usuario;
import br.com.ifpe.oxefood_api_guilherme.modelo.cliente.Cliente;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.util.Arrays;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteRequest {

    @NotBlank(message = "O e-mail é de preenchimento obrigatório")
    @Email
    private String email;

    @NotBlank(message = "A senha é de preenchimento obrigatório")
    private String password;

    @NotNull(message = "O Nome é de preenchimento obrigatório")
    @NotEmpty(message = "O Nome é de preenchimento obrigatório")
    @Length(max = 100, message = "O Nome deverá ter no máximo {max} caracteres")
    private String nome;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @NotBlank(message = "O CPF é de preenchimento obrigatório")
    @CPF
    private String cpf;

    @Pattern(regexp = "81\\d{8,9}", message = "O número deve começar com o DDD 81 e conter 8 ou 9 dígitos.")
    private String foneCelular;

    @Pattern(regexp = "81\\d{8}", message = "O número de telefone fixo deve começar com o DDD 81 e conter 8 dígitos.")
    private String foneFixo;

    public Usuario buildUsuario() {
        return Usuario.builder()
                .username(email)
                .password(password)
                .roles(Arrays.asList(Usuario.ROLE_CLIENTE))
                .build();
    }

    public Cliente build() {

        return Cliente.builder()
                .usuario(buildUsuario())
                .nome(nome)
                .dataNascimento(dataNascimento)
                .cpf(cpf)
                .foneCelular(foneCelular)
                .foneFixo(foneFixo)
                .build();
    }

}
