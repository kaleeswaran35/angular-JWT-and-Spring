/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.purchase.purchase.exception;

import lombok.NoArgsConstructor;


/**
 *
 * @author Kalees
 */
@NoArgsConstructor
public class PaymentException extends RuntimeException {
    
    
    public PaymentException(String message) {
        super(message);
    }

    
}
