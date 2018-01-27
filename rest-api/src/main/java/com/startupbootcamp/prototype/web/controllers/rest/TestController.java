package com.startupbootcamp.prototype.web.controllers.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by miztli on 26/01/18.
 */
@RestController
public class TestController {

    @RequestMapping(value = "/test")
    @ResponseStatus(HttpStatus.OK)
    public String testMessage(){
        return "done";
    }
}
