package com.purchase.purchase;

import com.purchase.purchase.BufferedRequestWrapper;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthTokenFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic, if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        BufferedRequestWrapper wrappedRequest = new BufferedRequestWrapper((HttpServletRequest) request);
        // Read the request body as before
        String requestBody = wrappedRequest.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        // Continue the filter chain
        chain.doFilter(wrappedRequest, response);
    }

    @Override
    public void destroy() {
        // Cleanup logic, if needed
    }
}
