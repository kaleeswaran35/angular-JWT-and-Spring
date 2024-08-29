package com.javatechie.jpa.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.javatechie.jpa.dto.OrderRequest;
import com.javatechie.jpa.dto.OrderResponse;
import com.javatechie.jpa.entity.Customer;
import com.javatechie.jpa.repository.CustomerRepository;
import com.javatechie.jpa.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@Slf4j
public class OrderController {

    @Autowired
    private CustomerRepository customerRepository;   

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    @PostMapping("/placeOrder")
    public Customer placeOrder(@RequestBody OrderRequest request) {

        return customerRepository.save(request.getCustomer());
    }

    @GetMapping("/findAllOrders")
    public List<Customer> findAllOrders() throws JsonProcessingException {

        return customerRepository.findAll();

        // Convert JSON array to Object.
        /*ObjectMapper mapper = new ObjectMapper();
        RawValue raw = new RawValue(mapper.writeValueAsString(customer_list));
        ObjectNode root = mapper.createObjectNode();
        return root.putRawValue("list", raw);*/
        //return customer_list;
    }

    @GetMapping("/getInfo")
    public List<OrderResponse> getJoinInformation() {
        return customerRepository.getJoinInformation();
    }
}
