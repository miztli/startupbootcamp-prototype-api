package com.startupbootcamp.prototype.web.controllers.view;

import com.startupbootcamp.prototype.service.OperationsService;
import finlab.damain.model.GenericResponse;
import finlab.damain.model.TransferResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by miztli on 27/01/18.
 */
@Controller
public class HomeController {

    @Autowired
    private OperationsService operationsService;

    @RequestMapping(value = "/home")
    public String getHome(){
        System.out.println("----Getting homepage----");
        return "index.html";
    }

    //test: http://localhost:8080/transfer?from=00113183315&to=00113183316&amount=1&reference=pruebachrome
    @RequestMapping(value = "/transfer")
    @ResponseStatus(HttpStatus.OK)
    public String transfer(@RequestParam(name = "from") final String from,
                           @RequestParam(name = "to") final String to,
                           @RequestParam(name = "amount") final String amount,
                           @RequestParam(name = "reference") final String reference){
        System.out.println("----Getting account balance----");
        GenericResponse response = operationsService.transfer(from,to,amount,reference);

        TransferResponse transferResponse = (TransferResponse) response.getObject();

        return transferResponse.getData().getMessage().equals("Success") ? "success.html" : "transaction-error.html";
    }
}
