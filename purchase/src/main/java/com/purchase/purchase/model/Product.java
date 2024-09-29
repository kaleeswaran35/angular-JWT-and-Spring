package com.purchase.purchase.model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldNameConstants;
import org.hibernate.annotations.Check;
import org.springframework.scheduling.annotation.Async;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity

public class Product {
    @Id
    @GeneratedValue
    private Integer id;
    private String productName;
    @Check(constraints = "qty >= 0")
    private Integer qty;
    private Integer price;  
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate todayDate;
    private Integer card_number;  
    private Integer cvv;
    
}
