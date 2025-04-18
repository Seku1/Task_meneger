package com.example.taskmenager.mastruct.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskDTO {
    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("due_date")
    private LocalDate dueDate;

    @JsonProperty("priority")
    private Integer priority;

    @NotNull(message = "userId is required")
    @JsonProperty("user_id")
    private Long userId;
}
