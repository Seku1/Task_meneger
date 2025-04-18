package com.example.taskmenager.controller;

import com.example.taskmenager.mastruct.dtos.UserDTO;
import com.example.taskmenager.mastruct.dtos.UserRegistrationDTO;
import com.example.taskmenager.mastruct.mappers.MapStructMapper;
import com.example.taskmenager.model.User;
import com.example.taskmenager.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @Qualifier("mapStructMapperImpl")
    private final MapStructMapper mapper;

    @PostMapping("/register")
    public UserDTO registerUser(@RequestBody @Valid UserRegistrationDTO dto) {
        User user = userService.register(dto);
        return mapper.userToUserDTO(user);
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(mapper::userToUserDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable @Valid Long id) {
        return mapper.userToUserDTO(userService.getById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable @Valid Long id) {
        userService.delete(id);
    }
}
