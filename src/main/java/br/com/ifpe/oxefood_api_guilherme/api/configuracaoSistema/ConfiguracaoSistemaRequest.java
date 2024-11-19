package br.com.ifpe.oxefood_api_guilherme.api.configuracaoSistema;

import br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema.ConfiguracaoSistema;
import br.com.ifpe.oxefood_api_guilherme.modelo.entregador.Entregador;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguracaoSistemaRequest {


    private String nomeEmpresa;


    private String cnpj;


    private String site;


    private String emailContato;


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
