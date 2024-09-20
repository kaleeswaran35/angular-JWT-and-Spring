package com.purchase.purchase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// enhance this class for upgrades

@Service
public class ProductServiceClient {

    @Autowired
    private RestTemplate restTemplate;
    
    
    @Value("${product.service.url}") // Assume you have a property defined in application.properties
    private String productServiceUrl;

    public void decreaseProductQuantity() {

    }}
