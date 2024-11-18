package GestionClientes.User;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; 

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
       
        User user = User.builder()
        .id(userRequest.id)
        .email(userRequest.getEmail())
        .nombre(userRequest.getNombre())
        .apellido(userRequest.getApellido())
        .ciudad(userRequest.getCiudad())
        .role(Role.USER)
        .build();
        
        userRepository.updateUser(user.id, user.email ,user.nombre, user.apellido, user.ciudad);

        return new UserResponse("El usuario se registró satisfactoriamente");
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public UserDTO getUser(Long id) {
        User user= userRepository.findById(id).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .email(user.email)
            .nombre(user.nombre)
            .apellido(user.apellido)
            .ciudad(user.ciudad)
            .build();
            return userDTO;
        }
        return null;
    }
}
