package com.startupbootcamp.prototype.run;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;

/**
 * Created by miztli on 26/01/18.
 */

@EnableAutoConfiguration
@SpringBootApplication(scanBasePackages = "com.startupbootcamp.prototype.spring.config")
public class PrototypeApi {
    public static void main(String[] args) {
        SpringApplication.run(PrototypeApi.class, args);
    }
}
