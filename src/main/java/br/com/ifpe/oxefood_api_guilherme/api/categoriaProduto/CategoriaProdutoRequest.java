package br.com.ifpe.oxefood_api_guilherme.api.categoriaProduto;

import br.com.ifpe.oxefood_api_guilherme.modelo.categoriaProduto.CategoriaProduto;
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
public class CategoriaProdutoRequest {


    @NotNull(message = "O campo descrição é de preenchimento obrigatório")
    @NotEmpty(message = "O campo descrição é de preenchimento obrigatório")
    @Length(max = 200, message = "O campo descrição deverá ter no máximo {max} caracteres")
    private String descricao;

    public CategoriaProduto build(){
        return CategoriaProduto.builder()
                .descricao(descricao)
                .build();
    }
}
