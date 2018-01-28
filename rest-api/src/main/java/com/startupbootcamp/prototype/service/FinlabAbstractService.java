package com.startupbootcamp.prototype.service;

import finlab.damain.model.*;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

/**
 * Created by miztli on 27/01/18.
 */
public abstract class FinlabAbstractService implements AuthenticationService {

    private SessionResponse sessionResponse;
    private HttpHeaders headers = new HttpHeaders();

    public FinlabAbstractService() {
        super();
    }

    @Override
    public void authenticate() {
        createSession();
        login();
    }

    private void createSession() {
        SessionRequest session = new SessionRequest();
        session.setOrganizationID(getEnvironment().getProperty("finlab.session.param.organizationID"));
        session.setChannel(getEnvironment().getProperty("finlab.session.param.channel"));
        session.setApplication(getEnvironment().getProperty("finlab.session.param.application"));
        session.setUsername(getEnvironment().getProperty("finlab.session.param.username"));

        sessionResponse = getRestTemplate().postForObject(
                                                getUri("finlab.method.session"),
                                                session, SessionResponse.class);

        headers = new HttpHeaders();
        headers.add(CustomHeaders.X_ACCESS_TOKEN.getHeader(), getAccessToken());

        printSessionResponse(sessionResponse);
    }

    private void login() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(getEnvironment().getProperty("finlab.login.param.username"));
        loginRequest.setPassword(getEnvironment().getProperty("finlab.login.param.password"));
        loginRequest.setAction(getEnvironment().getProperty("finlab.login.param.action"));

        HttpEntity<LoginRequest> loginRequestHttpEntity = new HttpEntity<>(loginRequest, headers);

        LoginResponse loginResponse = getRestTemplate().postForObject(
                                                            getUri("finlab.method.login"),
                                                            loginRequestHttpEntity,
                                                            LoginResponse.class);

        printLoginResponse(loginResponse);
    }

    private void printLoginResponse(LoginResponse loginResponse) {
        System.out.println("-----LOGIN RESPONSE----");
        printResponse(loginResponse);
        System.out.println("data: " + loginResponse.getData().toString());
        System.out.println("--------------------------");
    }

    private void printSessionResponse(final SessionResponse sessionResponse) {
        System.out.println("-----SESSION RESPONSE----");
        printResponse(sessionResponse);
        System.out.println("token: " + sessionResponse.getToken());
        System.out.println("status: " + sessionResponse.getStatus());
        System.out.println("languages: " + sessionResponse.getLanguages().toString());
        System.out.println("--------------------------");
    }

    protected void printResponse(final Response response){
        System.out.println("code: " + response.getCode());
        System.out.println("message: " + response.getMessage());
    }

    protected String getUri(final String method) {
        return String.format("%s/%s",
                getEnvironment().getProperty("finlab.base.uri"),
                getEnvironment().getProperty(method));
    }

    protected HttpHeaders getAuthenticationHeaders(){
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
    protected abstract RestTemplate getRestTemplate();
    protected abstract Environment getEnvironment();

    protected String getAccessToken(){
        return sessionResponse.getToken();
    }
}