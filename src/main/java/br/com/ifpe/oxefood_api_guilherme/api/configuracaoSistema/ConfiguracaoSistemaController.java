package br.com.ifpe.oxefood_api_guilherme.api.configuracaoSistema;

import br.com.ifpe.oxefood_api_guilherme.api.entregador.EntregadorRequest;
import br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema.ConfiguracaoSistema;
import br.com.ifpe.oxefood_api_guilherme.modelo.configuracaoSistema.ConfiguracaoSistemaService;
import br.com.ifpe.oxefood_api_guilherme.modelo.entregador.Entregador;
import br.com.ifpe.oxefood_api_guilherme.modelo.entregador.EntregadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configuracaosistema")
@CrossOrigin
public class ConfiguracaoSistemaController {

    @Autowired
    private ConfiguracaoSistemaService configuracaoSistemaService;

    @GetMapping
    public List<ConfiguracaoSistema> listarTodos() {
        return configuracaoSistemaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ConfiguracaoSistema obterPorID(@PathVariable Long id) {
        return configuracaoSistemaService.obterPorID(id);
    }


    @PostMapping
    public ResponseEntity<ConfiguracaoSistema> save(@RequestBody ConfiguracaoSistemaRequest request) {

        ConfiguracaoSistema configuracaoSistema = configuracaoSistemaService.save(request.build());
        return new ResponseEntity<ConfiguracaoSistema>(configuracaoSistema, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConfiguracaoSistema> update(@PathVariable("id") Long id, @RequestBody ConfiguracaoSistemaRequest request) {

        configuracaoSistemaService.update(id, request.build());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        configuracaoSistemaService.delete(id);
        return ResponseEntity.ok().build();
    }
}
