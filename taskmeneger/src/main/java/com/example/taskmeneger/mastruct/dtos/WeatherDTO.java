package com.example.taskmeneger.mastruct.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WeatherDTO {
    private Long id;
    private String city;
    private Double temperature;
    private String weather;
    private LocalDateTime retrievedAt;
}
