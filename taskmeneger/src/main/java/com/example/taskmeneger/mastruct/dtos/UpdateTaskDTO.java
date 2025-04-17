package com.example.taskmeneger.mastruct.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private Boolean isCompleted;
    private Integer priority;
}