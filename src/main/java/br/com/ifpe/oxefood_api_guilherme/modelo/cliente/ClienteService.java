package br.com.ifpe.oxefood_api_guilherme.modelo.cliente;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {

        return clienteRepository.findAll();
    }

    public Cliente obterPorID(Long id) {

        return clienteRepository.findById(id).get();
    }


    @Transactional
    public Cliente save(Cliente cliente) {

        cliente.setHabilitado(Boolean.TRUE);
        cliente.setVersao(1L);
        cliente.setDataCriacao(LocalDate.now());
        return clienteRepository.save(cliente);
    }

}
