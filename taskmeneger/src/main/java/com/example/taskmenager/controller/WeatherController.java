package com.example.taskmenager.controller;

import com.example.taskmenager.mastruct.dtos.WeatherDTO;
import com.example.taskmenager.mastruct.mappers.MapStructMapper;
import com.example.taskmenager.model.WeatherSnapshot;
import com.example.taskmenager.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;
    @Qualifier("mapStructMapperImpl")
    private final MapStructMapper mapper;

    @GetMapping("/fetch")
    public WeatherDTO fetchWeather(@RequestParam String city) {
        WeatherSnapshot snapshot = weatherService.fetchAndStoreWeather(city);
        return mapper.weatherSnapshotToWeatherDTO(snapshot);
    }

    @GetMapping
    public List<WeatherDTO> getAllSnapshots() {
        return weatherService.getAllSnapshots().stream()
                .map(mapper::weatherSnapshotToWeatherDTO)
                .toList();
    }
}
