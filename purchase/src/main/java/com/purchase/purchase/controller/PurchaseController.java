package com.purchase.purchase.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.purchase.purchase.exception.PaymentException;
import com.purchase.purchase.exception.PurchaseException;
import com.purchase.purchase.model.Payment;
import com.purchase.purchase.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PurchaseController {

    @Autowired
    private RestTemplate restTemplate;

   
    @Value("${product.service.url}") // Assume you have a property defined in application.properties
    private String productServiceUrl;
    
    @Value("${payment.service.url}") // Assume you have a property defined in application.properties
    private String paymentServiceUrl;


    private final ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper as a class member

    @PutMapping("purchase/{productName}")
    public ResponseEntity<Object> purchaseProduct(@PathVariable String productName, HttpServletRequest request) {
        try {
            // Read and parse the request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Product productDetails = parseRequestBody(requestBody);
            String authorizationHeader = request.getHeader("Authorization");
            System.out.println("authorizationHeader"+authorizationHeader);    
            // Step 1: Process Payment
            if (!processPayment(productDetails, authorizationHeader)) {
                throw new PaymentException("Payment processing failed.");
            }

            // Step 2: Update Product Quantity
            String productServicefomatUrl = String.format("%spurchase/%s", productServiceUrl, productName); // Construct the URL
            HttpHeaders headers = createHeaders(authorizationHeader);
            HttpEntity<Product> entity = new HttpEntity<>(productDetails, headers);

            ResponseEntity<Void> response = restTemplate.exchange(productServicefomatUrl, HttpMethod.PUT, entity, Void.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new PurchaseException("Failed to update product: " + response.getStatusCode());
            }

            // Prepare success response
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Product quantity decreased successfully.");
            return ResponseEntity.ok(responseBody);

        } catch (PaymentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Invalid request body: " + e.getMessage());
        } catch (PurchaseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    private boolean processPayment(Product productDetails, String authorizationHeader) {
        String paymentServiceformatUrl = String.format("%spayment", paymentServiceUrl);
        // Replace with actual payment service URL
        HttpHeaders headers = createHeaders(authorizationHeader);
        HttpEntity<Product> paymentEntity = new HttpEntity<>(productDetails, headers);

        try {
            ResponseEntity<Void> paymentResponse = restTemplate.exchange(paymentServiceformatUrl,HttpMethod.PUT,paymentEntity, Void.class);           
            return paymentResponse.getStatusCode().is2xxSuccessful();
        } catch (RestClientException e) {
            throw new PaymentException("Error occurred while contacting the Payment Service: ");
        }
    }

    private HttpHeaders createHeaders(String authorizationHeader) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);
        return headers;
    }

    private Product parseRequestBody(String requestBody) throws IOException {
        return objectMapper.readValue(requestBody, Product.class);
    }

}
