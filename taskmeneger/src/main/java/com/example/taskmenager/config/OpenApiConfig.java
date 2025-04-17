package com.example.taskmenager.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.*;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Task Manager API")
                        .version("1.0")
                        .description("CRUD + Auth + Weather integration"));
    }
}