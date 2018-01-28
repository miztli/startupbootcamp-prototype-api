package com.startupbootcamp.prototype.web.controllers.rest;

import banregio.domain.model.UserDto;
import com.startupbootcamp.prototype.service.OperationsService;
import com.startupbootcamp.prototype.service.impl.RestTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by miztli on 26/01/18.
 */
@RestController
public class TestController {

    @Autowired
    private RestTest restTest;

    @Autowired
    private OperationsService operationsService;

    @RequestMapping(value = "/test")
    @ResponseStatus(HttpStatus.OK)
    public String testMessage(){
        return "done";
    }

    @RequestMapping(value = "/rest-test/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto restTest(@PathVariable(value = "id") final Long id){
        return restTest.getUser(id);
    }
}
