package com.purchase.purchase.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.purchase.purchase.model.Payment;
import com.purchase.purchase.model.PaymentResponse;
import com.purchase.purchase.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Kalees
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
    
    
    @PutMapping("payment")
    public ResponseEntity<PaymentResponse> processPayment() {
        // Simulate payment processing logic
        
        return ResponseEntity.ok(new PaymentResponse("SUCCESS"));
    }
}
