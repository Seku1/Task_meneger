package com.example.taskmenager.service;

import com.example.taskmenager.model.WeatherSnapshot;
import com.example.taskmenager.repository.WeatherSnapshotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherSnapshotRepository weatherRepository;

    // Mock external fetch — replace with real API call in production
    public WeatherSnapshot fetchAndStoreWeather(String city) {
        double mockTemp = 20 + Math.random() * 10;
        String mockCondition = "Sunny";

        WeatherSnapshot snapshot = new WeatherSnapshot();
        snapshot.setCity(city);
        snapshot.setTemperature(mockTemp);
        snapshot.setWeather(mockCondition);
        snapshot.setRetrievedAt(LocalDateTime.now());

        return weatherRepository.save(snapshot);
    }

    public List<WeatherSnapshot> getAllSnapshots() {
        return weatherRepository.findAll();
    }
}
