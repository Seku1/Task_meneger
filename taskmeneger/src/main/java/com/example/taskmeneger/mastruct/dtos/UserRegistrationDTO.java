package com.example.taskmeneger.mastruct.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserRegistrationDTO {
    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
