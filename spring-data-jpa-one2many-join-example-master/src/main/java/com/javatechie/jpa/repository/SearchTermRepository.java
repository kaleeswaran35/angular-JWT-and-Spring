/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.repository;

/**
 *
 * @author Kalees
 */
import com.javatechie.jpa.entity.SearchTerm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchTermRepository extends JpaRepository<SearchTerm, Long> {
}
