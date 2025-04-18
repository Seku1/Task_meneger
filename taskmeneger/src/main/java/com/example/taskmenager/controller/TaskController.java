package com.example.taskmenager.controller;

import com.example.taskmenager.mastruct.dtos.CreateTaskDTO;
import com.example.taskmenager.mastruct.dtos.TaskDTO;
import com.example.taskmenager.mastruct.dtos.UpdateTaskDTO;
import com.example.taskmenager.mastruct.mappers.MapStructMapper;
import com.example.taskmenager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    @Qualifier("mapStructMapperImpl")
    private final MapStructMapper mapper;

    @GetMapping
    public Page<TaskDTO> getAllTasks(
            @RequestParam(required = false) String search,
            @PageableDefault(sort = "dueDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return taskService.getAllTasks(search, pageable)
                .map(mapper::taskToTaskDTO);
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Long id) {
        return mapper.taskToTaskDTO(taskService.getTaskById(id));
    }

    @PostMapping
    public TaskDTO createTask(@Valid @RequestBody CreateTaskDTO createTaskDTO) {
        return mapper.taskToTaskDTO(
                taskService.createTask(createTaskDTO)
        );
    }

    @PutMapping("/{id}")
    public TaskDTO updateTask(@PathVariable Long id, @RequestBody UpdateTaskDTO updateTaskDTO) {
        return mapper.taskToTaskDTO(taskService.updateTask(id, updateTaskDTO));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}