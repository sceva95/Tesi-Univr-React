package com.tesi.farm.exception;

public class EntityNotFoundException extends RuntimeException{

    public EntityNotFoundException(String entity, Integer id){
        super("Non riesco a trovare "+ entity + " :"  + id);
    }

    public EntityNotFoundException(String entity, String id){
        super("Non riesco a trovare "+ entity + " :"  + id);
    }
}
