/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.controller;

/**
 *
 * @author Kalees
 */
import com.javatechie.exception.GlobalExceptionHandler.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/error")
public class CustomErrorController implements ErrorController {
    
    @GetMapping
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound() {
     
        ErrorResponse error = new ErrorResponse("");        
        error.setMessage("The requested resource was not found.");
        error.setTimestamp(System.currentTimeMillis());
        error.setDetails(HttpStatus.NOT_FOUND);
        return error;
        
    }
}
