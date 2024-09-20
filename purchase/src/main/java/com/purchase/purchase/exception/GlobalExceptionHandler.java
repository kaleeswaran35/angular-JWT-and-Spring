/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.purchase.purchase.exception;

/**
 *
 * @author Kalees
 */
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PurchaseException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResponse handleResourceNotFoundException(PurchaseException e) {
        ErrorResponse error = new ErrorResponse();
        error.getMessage();
        error.getTimestamp();
        error.getDetails();
        return error;
    }

    // Other exception handlers...
    public static class ErrorResponse {

        private String message;
        private Long timestamp;
        private HttpStatus details;

        public ErrorResponse(String message) {
            this.message = message;
        }

        private ErrorResponse() {

        }

        

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(Long timestamp) {
            this.timestamp = timestamp;
        }

        public HttpStatus getDetails() {
            return details;
        }

        public void setDetails(HttpStatus details) {
            this.details = details;
        }

    }
}
