package GestionClientes.Cliente;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public void createCliente(Cliente cliente) {
        clienteRepository.save(cliente);
    }

    public Cliente save(Cliente client) {
        return clienteRepository.save(client);
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public void deleteById(Integer id) {
        clienteRepository.deleteById(id);
    }

    public Cliente findById(Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }
}
