package br.com.ifpe.oxefood_api_guilherme.api.produto;

import br.com.ifpe.oxefood_api_guilherme.modelo.produto.Produto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoRequest {

    private Long idCategoria;

    @NotNull(message = "O Código é de preenchimento obrigatório")
    @NotEmpty(message = "O Código é de preenchimento obrigatório")
    private String codigo;

    @NotNull(message = "O Título é de preenchimento obrigatório")
    @NotEmpty(message = "O Título é de preenchimento obrigatório")
    @Length(max = 100, message = "O Título deverá ter no máximo {max} caracteres")
    private String titulo;

    @NotNull(message = "A Descrição é de preenchimento obrigatório")
    @NotEmpty(message = "A Descrição é de preenchimento obrigatório")
    @Length(max = 200, message = "A Descrição deverá ter no máximo {max} caracteres")
    private String descricao;

    @NotNull(message = "O Valor Unitário é de preenchimento obrigatório")
    @NotEmpty(message = "O Valor Unitário é de preenchimento obrigatório")
    private Double valorUnitario;

    @NotNull(message = "O Tempo de Entrega Mínimo  é de preenchimento obrigatório")
    @NotEmpty(message = "O Tempo de Entrega Mínimo é de preenchimento obrigatório")
    private Integer tempoEntregaMinimo;

    @NotNull(message = "O Tempo de Entrega Máximo é de preenchimento obrigatório")
    @NotEmpty(message = "O Tempo de Entrega Máximo  é de preenchimento obrigatório")
    private Integer tempoEntregaMaximo;

    public Produto build() {

        return Produto.builder()
                .codigo(codigo)
                .titulo(titulo)
                .descricao(descricao)
                .valorUnitario(valorUnitario)
                .tempoEntregaMinimo(tempoEntregaMinimo)
                .tempoEntregaMaximo(tempoEntregaMaximo)
                .build();
    }

}
