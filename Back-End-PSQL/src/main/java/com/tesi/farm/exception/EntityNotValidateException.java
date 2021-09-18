package com.tesi.farm.exception;

public class EntityNotValidateException extends RuntimeException {
    public EntityNotValidateException(String entity) {
        super(entity + " non è valida.");
    }
}
