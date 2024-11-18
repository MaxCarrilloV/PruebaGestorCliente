package GestionClientes.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    Long id;
    String username;
    String email;
    String nombre;
    String apellido;
    String ciudad;
}
