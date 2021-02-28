package com.pagenow.pagenow_serve.common.vo;

public class ResponseData<T> {

    private boolean success;
    private int code;
    private String message;
    private T payload;

    public ResponseData() {
        this.success = true;
        this.code = 200;
        this.message = "success";
        this.payload = null;
    }

    public ResponseData(boolean success, int code, String message) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.payload = null;
    }

    public ResponseData(boolean success, int code, String message, T payload) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.payload = payload;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
