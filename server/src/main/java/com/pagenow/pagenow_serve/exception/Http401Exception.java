package com.pagenow.pagenow_serve.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class Http401Exception extends RuntimeException {

    public Http401Exception() {
        super();
    }

    public Http401Exception(String message) {
        super(message);
    }

}
