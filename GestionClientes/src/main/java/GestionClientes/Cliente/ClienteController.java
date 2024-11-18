package GestionClientes.Cliente;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:5173"})
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente){
        clienteService.createCliente(cliente);
        return ResponseEntity.ok(cliente);
    }

    @GetMapping
    public List<Cliente> getAllClients() {
        return clienteService.findAll();
    }

     @GetMapping("/{id}")
    public Cliente getClientById(@PathVariable Integer id) {
        return clienteService.findById(id);
    }

    @PutMapping("/{id}")
    public Cliente updateClient(@PathVariable Integer id, @RequestBody Cliente cliente) {
        cliente.setId(id);
        return clienteService.save(cliente);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Integer id) {
        clienteService.deleteById(id);
    }
}
