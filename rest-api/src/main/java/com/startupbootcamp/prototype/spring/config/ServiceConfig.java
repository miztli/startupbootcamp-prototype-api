package com.startupbootcamp.prototype.spring.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Created by miztli on 27/01/18.
 */
@Configuration
@ComponentScan(basePackages = "com.startupbootcamp.prototype.service.impl")
public class ServiceConfig {

    public ServiceConfig() {
        super();
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder){
        return restTemplateBuilder.build();
    }
}
