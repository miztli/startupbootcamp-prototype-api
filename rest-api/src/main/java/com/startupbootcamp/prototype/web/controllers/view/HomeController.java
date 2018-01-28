package com.startupbootcamp.prototype.web.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by miztli on 27/01/18.
 */
@Controller
public class HomeController {
    @RequestMapping(value = "/home")
    public String getHome(){
        System.out.println("----Getting homepage----");
        return "index.html";
    }
}
