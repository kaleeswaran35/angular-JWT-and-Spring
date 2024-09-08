/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.controller;

import com.javatechie.jpa.dto.SearchService;
import com.javatechie.jpa.entity.SearchTerm;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalees
 */
@RestController
public class SearchController {
    
    @Autowired
    private SearchService searchService;

    @PostMapping("/search")
    public SearchTerm addSearchTerm(@RequestBody String term) {
        return searchService.saveSearchTerm(term);
    }

    @GetMapping("/recent-searches")
    public List<SearchTerm> getRecentSearches() {
        return searchService.getRecentSearches();
    }
    
}
