package GestionClientes.Weather;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WeatherApiService {

    private final RestTemplate restTemplate;

    @Value("${API_KEY}")
    private String apiKey;
  


    public ResponseEntity<String> fetchWeatherDataByCoordinates(String city) {
        String apiUrl = String.format(
            "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s",
            city, apiKey
        );
        try {
            String response = restTemplate.getForObject(apiUrl, String.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return handleApiError(e);
        }
    }

    private ResponseEntity<String> handleApiError(Exception e) {
        // Aquí se pueden capturar más tipos específicos de error según el caso
        if (e instanceof org.springframework.web.client.HttpClientErrorException) {
            org.springframework.web.client.HttpClientErrorException httpException = (org.springframework.web.client.HttpClientErrorException) e;
            // Retorna un error HTTP 400 si es un error de cliente (400-499)
            return new ResponseEntity<>("Error al conectar con la API: " + httpException.getMessage(), HttpStatus.BAD_REQUEST);
        }

        if (e instanceof org.springframework.web.client.HttpServerErrorException) {
            org.springframework.web.client.HttpServerErrorException httpException = (org.springframework.web.client.HttpServerErrorException) e;
            // Retorna un error HTTP 500 si es un error de servidor (500-599)
            return new ResponseEntity<>("Error en el servidor al conectar con la API: " + httpException.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Para otros errores, retorna un error genérico con código 500
        return new ResponseEntity<>("Error al conectar con la API: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
