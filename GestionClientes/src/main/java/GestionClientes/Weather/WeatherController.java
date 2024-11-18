package GestionClientes.Weather;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/weather")
@CrossOrigin(origins = {"http://localhost:5173"})
public class WeatherController {

    private final WeatherApiService weatherApiService;

    @GetMapping
    public ResponseEntity<String> getWeatherByCoordinates(@RequestParam String city) {
        return weatherApiService.fetchWeatherDataByCoordinates(city);
    }
}
