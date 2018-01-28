package com.startupbootcamp.prototype.spring.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by miztli on 26/01/18.
 */
@Configuration
@ComponentScan(basePackages = "com.startupbootcamp.prototype.web.controllers")
public class WebConfig {

    public WebConfig(){
        super();
    }

}
