package com.pagenow.pagenow_serve.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class Http403Exception extends RuntimeException {

    public Http403Exception() {
        super();
    }

    public Http403Exception(String message) {
        super(message);
    }

    public Http403Exception(Throwable cause) {
        super(cause);
    }

}
