package com.javatechie.jpa.repository;

import com.javatechie.jpa.entity.Product;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.hibernate.criterion.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;

public interface ProductRepository extends JpaRepository<Product,Integer> {

    
    @Retryable(value = {IOException.class}, maxAttempts = 3, backoff = @Backoff(delay = 1000))
    public Product save(Integer pid) throws Exception;
      
    
    @Query(value = "select * from product where product_name =:product_name",nativeQuery = true)
    public List<Product> findAll(String product_name);
    
     //@Query(value = "select * from product where product_name =:product_name",nativeQuery = true)

    /**
     *
     * @param id
     */
    @Query(value = "Delete id from product where id =:id",nativeQuery = true)
    public List<Product> delete(Integer id);
    
    public Optional<Product> findById(Integer id);
    
    @Query(value = "INSERT INTO Product (productName,qty,price) VALUES (:productName,:qty,:price);",nativeQuery = true)
    public List<Product> create();
            
}
