package com.example.taskmeneger.mastruct.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private Integer priority;
    private Long userId;
}
