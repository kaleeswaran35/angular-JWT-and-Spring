/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.purchase.purchase.exception;

import lombok.NoArgsConstructor;
import org.springframework.web.client.RestClientException;

/**
 *
 * @author Kalees
 */
@NoArgsConstructor
public class PurchaseException extends RuntimeException {
    
    
    public PurchaseException(String message) {
        super(message);
    }

    public PurchaseException(String string, RestClientException e) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
