package com.startupbootcamp.prototype.service;

import finlab.damain.model.GenericResponse;

/**
 * Created by miztli on 27/01/18.
 */
public interface OperationsService {
    public GenericResponse transfer(final String from, final String to, final String amount, final String reference);
    public GenericResponse balance(final String account);
    public GenericResponse statement(final String account);
}
