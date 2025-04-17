package com.example.taskmeneger.mastruct.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Boolean isCompleted;
    private Integer priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;
}
