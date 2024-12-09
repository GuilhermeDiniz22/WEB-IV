package br.com.ifpe.oxefood_api_guilherme.api.configuracaoSistema;

import br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema.ConfiguracaoSistema;
import br.com.ifpe.oxefood_api_guilherme.modelo.entregador.Entregador;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguracaoSistemaRequest {


    @NotNull(message = "O nome da empresa é de preenchimento obrigatório")
    @NotBlank(message = "O nome da empresa é de preenchimento obrigatório")
    private String nomeEmpresa;


    @NotNull(message = "O CNPJ da empresa é de preenchimento obrigatório")
    @NotBlank(message = "O CNPJ da empresa é de preenchimento obrigatório")
    private String cnpj;


    @NotNull(message = "O site é de preenchimento obrigatório")
    @NotBlank(message = "O site é de preenchimento obrigatório")
    private String site;


    @NotNull(message = "O email é de preenchimento obrigatório")
    @NotBlank(message = "O email é de preenchimento obrigatório")
    @Email
    private String emailContato;


    @NotNull(message = "O tempo mínimo de pedidos é de preenchimento obrigatório")
    @NotBlank(message = "O tempo mínimo de pedidos é de preenchimento obrigatório")
    private Long tempoMinimoAgendamentoPedidos;

    private Boolean ligarAceitePedidos;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEntradaSistema;

    public ConfiguracaoSistema build() {

        return ConfiguracaoSistema.builder()
                .nomeEmpresa(nomeEmpresa)
                .cnpj(cnpj)
                .site(site)
                .emailContato(emailContato)
                .tempoMinimoAgendamentoPedidos(tempoMinimoAgendamentoPedidos)
                .ligarAceitePedidos(ligarAceitePedidos)
                .dataEntradaSistema(dataEntradaSistema)
                .build();
    }
}
