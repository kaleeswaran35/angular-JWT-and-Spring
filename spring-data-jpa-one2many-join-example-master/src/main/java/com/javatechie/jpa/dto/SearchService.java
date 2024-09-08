/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.javatechie.jpa.dto;

import com.javatechie.jpa.entity.SearchTerm;
import com.javatechie.jpa.repository.SearchTermRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kalees
 */
@Service
public class SearchService {

    @Autowired
    private SearchTermRepository searchTermRepository;

    public SearchTerm saveSearchTerm(String term) {
        SearchTerm searchTerm = new SearchTerm();
        searchTerm.setTerm(term);
        return searchTermRepository.save(searchTerm);
    }

    public List<SearchTerm> getRecentSearches() {
        return searchTermRepository.findAll();
    }
}
