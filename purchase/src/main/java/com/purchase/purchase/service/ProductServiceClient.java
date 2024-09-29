package com.purchase.purchase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

// enhance this class for upgrades

@Service
public class ProductServiceClient {

    
    
    @Value("${product.service.url}") // Assume you have a property defined in application.properties
    private String productServiceUrl;

    public void decreaseProductQuantity() {

    }}
