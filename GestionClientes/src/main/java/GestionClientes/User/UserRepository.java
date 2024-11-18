package GestionClientes.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);

    @Modifying()
    @Query("update User u set u.email=:email, u.nombre=:nombre, u.apellido=:apellido, u.ciudad=:ciudad where u.id = :id")
    void updateUser(@Param(value = "id") Long id,@Param(value = "email") String email,   @Param(value = "nombre") String nombre, @Param(value = "apellido") String apellido , @Param(value = "ciudad") String ciudad);
}
