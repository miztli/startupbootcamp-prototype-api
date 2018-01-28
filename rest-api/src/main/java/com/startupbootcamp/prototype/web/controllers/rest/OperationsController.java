package com.startupbootcamp.prototype.web.controllers.rest;

import com.startupbootcamp.prototype.service.OperationsService;
import finlab.damain.model.BalanceResponse;
import finlab.damain.model.GenericResponse;
import finlab.damain.model.TransferResponse;
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


}
