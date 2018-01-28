package com.startupbootcamp.prototype.service.impl;

import banregio.domain.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Created by miztli on 27/01/18.
 */
@Service
public class RestTest {

    @Autowired
    private RestTemplate restTemplate;

    public RestTest() {
        super();
    }

    public UserDto getUser(final Long id){
        return restTemplate.getForObject("https://jsonplaceholder.typicode.com/users/" + id, UserDto.class);
    }


}
