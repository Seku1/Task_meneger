package com.example.taskmenager.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_snapshots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private Double temperature;

    private String weather;

    private LocalDateTime retrievedAt = LocalDateTime.now();
}
