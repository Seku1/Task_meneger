package com.example.taskmeneger.mastruct.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskDTO {
    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("due_date")
    private LocalDate dueDate;

    @JsonProperty("is_completed")
    private Boolean isCompleted;

    @JsonProperty("priority")
    private Integer priority;
}