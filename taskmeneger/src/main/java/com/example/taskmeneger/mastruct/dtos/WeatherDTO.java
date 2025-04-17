package com.example.taskmeneger.mastruct.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WeatherDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("city")
    private String city;

    @JsonProperty("temperature")
    private Double temperature;

    @JsonProperty("weather")
    private String weather;

    @JsonProperty("retrieved_at")
    private LocalDateTime retrievedAt;
}
