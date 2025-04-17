package com.example.taskmenager.service;

import com.example.taskmenager.mastruct.dtos.CreateTaskDTO;
import com.example.taskmenager.mastruct.dtos.UpdateTaskDTO;
import com.example.taskmenager.model.Task;
import com.example.taskmenager.model.User;
import com.example.taskmenager.repository.TaskRepository;
import com.example.taskmenager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Page<Task> getAllTasks(String search, Pageable pageable) {
        if (!pageable.getSort().isSorted()) {
            pageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by("dueDate").ascending()
            );
        }

        if (search != null && !search.isBlank()) {
            return taskRepository.findByTitleContainingIgnoreCase(search, pageable);
        }
        return taskRepository.findAll(pageable);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(CreateTaskDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setPriority(dto.getPriority());
        task.setUser(user);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDTO dto) {
        Task task = getTaskById(id);
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setIsCompleted(dto.getIsCompleted());
        task.setPriority(dto.getPriority());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}