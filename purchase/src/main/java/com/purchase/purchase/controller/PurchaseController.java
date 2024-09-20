package com.purchase.purchase.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.purchase.purchase.exception.PurchaseException;
import com.purchase.purchase.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${product.service.url}") // Assume you have a property defined in application.properties
    private String productServiceUrl;

    private final ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper as a class member

    @PutMapping("/purchase/{productName}")
    public ResponseEntity<Object> purchaseProduct(@PathVariable String productName, HttpServletRequest request) {
        try {
            // Read and parse the request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Product body = parseRequestBody(requestBody);
            String Headers = request.getHeader("Authorization");
            // Decrease product quantity using the product name and parsed product details
            String url = String.format("%spurchase/%s", productServiceUrl, productName); // Construct the URL
            // Create HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", Headers);              

            // Create HttpEntity with the Product object as body and headers
            HttpEntity<Product> entity = new HttpEntity<>(body, headers);            
            try {
                // Send Rest Template PUT request
                ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, entity, Void.class);                
                // Check if the response indicates a successful request
                if (!response.getStatusCode().is2xxSuccessful()) {
                    throw new PurchaseException("Failed to update product: " + response.getStatusCode());
                }
            } catch (RestClientException e) {
                throw new PurchaseException("Error occurred while contacting the Product Service: " + e.getMessage(), e);
            }
            
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Product quantity decreased successfully.");
        

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (PurchaseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Invalid request body: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }
    }

    private Product parseRequestBody(String requestBody) throws IOException {
        return objectMapper.readValue(requestBody, Product.class);
    }
}
