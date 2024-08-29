/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.util.RawValue;
import com.javatechie.exception.ResourceNotFoundException;
import com.javatechie.jpa.entity.Product;
import com.javatechie.jpa.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author Kalees Handling Exception needs to be added
 */
@RestController
@Slf4j
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    /**
     *
     * @return @throws java.lang.Exception
     */
    @GetMapping("/findAllProducts")
    public List<Product> findAllProducts() throws Exception, Throwable {

        log.info("Products" + productRepository.findAll());
        return productRepository.findAll();

    }

    @GetMapping("/findAll")
    public List<Product> findAll(@RequestParam(value = "productName", required = false) String productName) throws JsonProcessingException {//Convert JSON array to Object.
        List<Product> product_list = new ArrayList<Product>();
        product_list = productRepository.findAll(productName);
        ObjectMapper mapper = new ObjectMapper();
        RawValue raw = new RawValue(mapper.writeValueAsString(product_list));
        ObjectNode root = mapper.createObjectNode();
        root.putRawValue("list", raw);
        log.info("product_list" + product_list);
        return product_list;

    }

    @PutMapping("/update/{id}")
    public Product update(@PathVariable Integer id, @RequestBody Product Productdetails) throws Exception, Throwable {

        try {
            Optional<Product> existingProduct = productRepository.findById(id);
            if (existingProduct.isPresent()) {
                var products = existingProduct.get();
                log.info("Update Products" + products);
                return productRepository.save(Productdetails);
            } else {
                throw new Exception("Product not found with id " + id);
            }

        } catch (DataAccessException e) {
            // The transaction will be rolled back due to the rollbackFor setting
            throw e.getCause();

        }
    }

    @DeleteMapping("/delete/{id}")
    public List<Product> delete(@PathVariable Integer id) {

        Optional<Product> existingProduct = productRepository.findById(id);
        List<Product> product_list = new ArrayList<Product>();
        if (existingProduct.isPresent()) {
            productRepository.deleteById(id);
            log.info("Deleted Product with id " + id);

        }

        return product_list;
    }

    @PostMapping("/insert")
    public Product insert(@RequestBody Product Productdetails) throws Exception, Throwable {
        try {
            return productRepository.save(Productdetails);
        } catch (DataAccessException e) {
            // The transaction will be rolled back due to the rollbackFor setting
            throw e.getCause();
        }
    }

}
