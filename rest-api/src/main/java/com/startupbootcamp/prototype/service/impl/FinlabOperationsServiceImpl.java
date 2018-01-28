package com.startupbootcamp.prototype.service.impl;

import com.startupbootcamp.prototype.service.FinlabAbstractService;
import com.startupbootcamp.prototype.service.OperationsService;
import finlab.damain.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.SocketUtils;
import org.springframework.web.client.RestTemplate;

/**
 * Created by miztli on 27/01/18.
 */
@Service
@PropertySource(value = "classpath:api-uris.properties")
public class FinlabOperationsServiceImpl extends FinlabAbstractService implements OperationsService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private Environment env;

    public FinlabOperationsServiceImpl() {
        super();
    }


    @Override
    protected RestTemplate getRestTemplate(){
        return restTemplate;
    }

    @Override
    protected Environment getEnvironment() {
        return env;
    }

    @Override
    public GenericResponse transfer(String from, String to, String amount, String reference) {
        authenticate();

        System.out.println("----Tranfer from: " + from + " to: " + to + " for: " + amount + "----");

        TransferRequest transferRequest = new TransferRequest();
            transferRequest.setAccount(getEnvironment().getProperty("finlab.transfer.param.account"));
            transferRequest.setTrans_type(getEnvironment().getProperty("finlab.transfer.param.trans_type"));
            transferRequest.setFromaccountnumber(from);
            transferRequest.setToaccountnumber(to);
            transferRequest.setAmount(amount);
            transferRequest.setReference(reference);

        HttpEntity<TransferRequest> transferRequestHttpEntity = new HttpEntity<>(
                transferRequest,
                getAuthenticationHeaders());

        System.out.println(getUri("finlab.method.transfer"));
        TransferResponse transferResponse = getRestTemplate().postForObject(
                getUri("finlab.method.transfer"),
                transferRequestHttpEntity,
                TransferResponse.class);
        printTransferResponse(transferResponse);

        return new GenericResponse(transferResponse);
    }

    @Override
    public GenericResponse balance(final String account) {
        authenticate();

        System.out.println("----Get Balance from: " + account + "----");
        BalanceRequest balanceRequest = new BalanceRequest();
            balanceRequest.setTrans_type(getEnvironment().getProperty("finlab.balance.param.trans_type"));
            balanceRequest.setAccount(getEnvironment().getProperty("finlab.balance.param.account"));
            balanceRequest.setCustaccount(account);

        HttpEntity<BalanceRequest> loginRequestHttpEntity = new HttpEntity<>(
                                                                    balanceRequest,
                                                                    getAuthenticationHeaders());

        System.out.println(getUri("finlab.method.balance"));
        BalanceResponse balanceResponse = getRestTemplate().postForObject(
                                                                getUri("finlab.method.balance"),
                                                                loginRequestHttpEntity,
                                                                BalanceResponse.class);
        printBalanceResponse(balanceResponse);

        return new GenericResponse(balanceResponse);
    }

    @Override
    public GenericResponse statement(final String account) {
        return null;
    }

    private void printBalanceResponse(BalanceResponse balanceResponse) {
        System.out.println("----BALANCE RESPONSE----");
        printResponse(balanceResponse);
        System.out.println("data: " + balanceResponse.getData().toString());
        System.out.println("------------------------");
    }

    private void printTransferResponse(TransferResponse transferResponse) {
        System.out.println("----TRANSFER RESPONSE----");
        printResponse(transferResponse);
        System.out.println("data: " + transferResponse.getData().toString());
        System.out.println("------------------------");
    }

}
