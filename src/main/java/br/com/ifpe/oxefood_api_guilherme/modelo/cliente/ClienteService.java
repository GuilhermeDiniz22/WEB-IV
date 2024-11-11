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

    @Transactional
    public void update(Long id, Cliente clienteAlterado) {

        Cliente cliente = clienteRepository.findById(id).get();
        cliente.setNome(clienteAlterado.getNome());
        cliente.setDataNascimento(clienteAlterado.getDataNascimento());
        cliente.setCpf(clienteAlterado.getCpf());
        cliente.setFoneCelular(clienteAlterado.getFoneCelular());
        cliente.setFoneFixo(clienteAlterado.getFoneFixo());

        clienteRepository.save(cliente);
    }

    @Transactional
    public void delete(Long id) {

        Cliente cliente = clienteRepository.findById(id).get();
        cliente.setHabilitado(Boolean.FALSE);
        cliente.setVersao(cliente.getVersao() + 1);

        clienteRepository.save(cliente);
    }


}
