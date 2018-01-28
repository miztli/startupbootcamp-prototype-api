package com.startupbootcamp.prototype.web.controllers.rest;

import com.startupbootcamp.prototype.service.OperationsService;
import finlab.damain.model.BalanceResponse;
import finlab.damain.model.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * Created by miztli on 27/01/18.
 */
@RestController
public class OperationsController {

    @Autowired
    private OperationsService operationsService;

    @RequestMapping(value = "/balance/{account}")
    @ResponseStatus(HttpStatus.OK)
    public GenericResponse getAccountBalance(@PathVariable(value = "account") final String account){
        System.out.println("----Getting account balance----");
        return operationsService.balance(account);
    }

    //test: http://localhost:8080/transfer?from=00113183315&to=00113183316&amount=1&reference=pruebachrome
    @RequestMapping(value = "/transfer")
    @ResponseStatus(HttpStatus.OK)
    public GenericResponse transfer(@RequestParam(name = "from") final String from,
                                    @RequestParam(name = "to") final String to,
                                    @RequestParam(name = "amount") final String amount,
                                    @RequestParam(name = "reference") final String reference){
        System.out.println("----Getting account balance----");
        return operationsService.transfer(from,to,amount,reference);
    }
}
