package com.example.taskmenager.service;

import com.example.taskmenager.model.WeatherSnapshot;
import com.example.taskmenager.repository.WeatherSnapshotRepository;
import com.example.taskmenager.webclient.WeatherApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherSnapshotRepository weatherRepository;
    private final WebClient webClient;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    public WeatherSnapshot fetchAndStoreWeather(String city) {
        WeatherApiResponse resp = webClient.get()
                .uri(uri -> uri
                        .path(apiUrl)
                        .queryParam("q", city)
                        .queryParam("appid", apiKey)
                        .queryParam("units", "metric")
                        .build())
                .retrieve()
                .bodyToMono(WeatherApiResponse.class)
                .block();

        WeatherSnapshot snapshot = WeatherSnapshot.builder()
                .city(resp.getName())
                .temperature(resp.getMain().getTemp())
                .weather(resp.getWeather().get(0).getDescription())
                .retrievedAt(LocalDateTime.now())
                .build();

        return weatherRepository.save(snapshot);
    }
}