package com.javatechie.jpa;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
@EnableAsync
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
//@EnableJpaRepositories // enable transactional in the Spring at app level
// Enabled JWT sucessfully by securing the API's 
public class SpringDataJpaMappingApplication extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    private static final Logger log = LoggerFactory.getLogger(SpringDataJpaMappingApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(SpringDataJpaMappingApplication.class, args);
    }

    // Integrated with external services
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD").allowedOrigins("*")
                        .allowedHeaders("*");
            }
        };
    }

    // Injecting the Bean for Rest Service calls
    @Bean(name = "restTemplate")
    public RestTemplate getRestClient() {

        RestTemplate restTemplate = new RestTemplate(
                new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
        restTemplate.setInterceptors(Collections.singletonList((request, body, execution) -> {      // Setting Template interceptor for loggin error between services
            log.debug("Intercepting...");
            return execution.execute(request, body);
        }));
        return restTemplate;
    }

   /* @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        final List<GlobalAuthenticationConfigurerAdapter> configurers = new ArrayList<>();
        configurers.add(new GlobalAuthenticationConfigurerAdapter() {
                    @Override
                    public void configure(AuthenticationManagerBuilder auth) throws Exception {
                           auth.apply(filterChain(HttpSecurity  http));
                    }
                }
        );
        return authConfig.getAuthenticationManager();
//    } */
    // Authorization is working from the filter
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.csrf().disable()
                // dont authenticate this particular request
                .authorizeRequests().antMatchers("/authenticate").permitAll().antMatchers(HttpMethod.OPTIONS, "/**")
                .permitAll().
                // all other requests need to be authenticated
                anyRequest().authenticated().and().
                // make sure we use stateless session; session won't be used to
                // store user's state.
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
    
    
    @Bean
 public ThreadPoolTaskExecutor taskExecutor() {
  ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
  executor.setCorePoolSize(2);
  executor.setMaxPoolSize(2);
  executor.setQueueCapacity(200);
  executor.setThreadNamePrefix("MyAsyncThread-");
  executor.setRejectedExecutionHandler((r, executor1) -> log.warn("Task rejected, thread pool is full and queue is also full"));
  executor.initialize();
  log.info("MyAsyncThread"+ Thread.currentThread());
  return executor;
 }
     

}
