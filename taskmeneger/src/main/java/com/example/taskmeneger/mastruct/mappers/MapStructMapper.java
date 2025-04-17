package com.example.taskmeneger.mastruct.mappers;


import com.example.taskmeneger.mastruct.dtos.*;
import com.example.taskmeneger.model.Task;
import com.example.taskmeneger.model.User;
import com.example.taskmeneger.model.WeatherSnapshot;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    UserDTO userToUserDTO(User user);

    User userRegistrationDTOToUser(UserRegistrationDTO userRegistrationDTO);

    TaskDTO taskToTaskDTO(Task task);

    Task createTaskDTOToTask(CreateTaskDTO createTaskDTO);

    void updateTaskFromDTO(UpdateTaskDTO updateTaskDTO, @MappingTarget Task task);

    List<TaskDTO> tasksToTaskDTOs(List<Task> tasks);

    WeatherDTO weatherSnapshotToWeatherDTO(WeatherSnapshot weatherSnapshot);

    List<WeatherDTO> weatherSnapshotsToWeatherDTOs(List<WeatherSnapshot> snapshots);
}