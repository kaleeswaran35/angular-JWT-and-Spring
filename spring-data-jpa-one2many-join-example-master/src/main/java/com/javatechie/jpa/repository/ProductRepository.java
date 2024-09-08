package com.javatechie.jpa.repository;

import com.javatechie.jpa.entity.Product;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;

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
    
    /**
     *
     * @param id
     * @return
     */
    @Override
    public Optional<Product> findById(Integer id);
    
    @Query(value = "INSERT INTO Product (productName,qty,price) VALUES (:productName,:qty,:price);",nativeQuery = true)
    public List<Product> create();
    
    @Query(value = "SELECT * FROM Product  WHERE start_date BETWEEN :start_date AND :end_date",nativeQuery = true)
    Page<Product> findEventsByDateRange(String start_date,String end_date, Pageable pageable);
    
    @Query(value = "select * from Product WHERE end_date =:end_date",nativeQuery = true)
    List<Product> findTop10ByTimestampBeforeOrderByTimestampDesc(String end_date);    
            
}
