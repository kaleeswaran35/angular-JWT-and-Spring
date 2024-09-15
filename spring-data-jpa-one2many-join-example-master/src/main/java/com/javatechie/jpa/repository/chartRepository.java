/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.repository;

import com.javatechie.jpa.entity.PieChart;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Kalees
 */
public interface chartRepository extends JpaRepository<PieChart,Integer> {
    
   
    @Query(value = "select id,product_name,qty from product",nativeQuery = true)
    public Page<PieChart> chartdata(Pageable pageable);
    
}
