package GestionClientes.Weather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class EnvComponent {
    @Autowired
    private Environment env;

    public void printVariable() {
        String variableValue = env.getProperty("API_KEY");
        System.out.println("Variable de entorno: " + variableValue);
    }
}
