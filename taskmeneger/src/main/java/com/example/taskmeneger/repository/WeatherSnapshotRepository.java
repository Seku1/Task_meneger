package com.example.taskmeneger.repository;


import com.example.taskmeneger.model.WeatherSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherSnapshotRepository extends JpaRepository<WeatherSnapshot, Long> {
}
