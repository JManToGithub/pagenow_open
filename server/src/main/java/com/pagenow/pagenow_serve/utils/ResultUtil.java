package com.pagenow.pagenow_serve.utils;

import com.pagenow.pagenow_serve.common.vo.ResultData;

public class ResultUtil {

    public static ResultData success(Object data) {
        ResultData result = new ResultData();
        result.setCode(1);
        result.setMsg("success");
        result.setData(data);
        return result;
    }

    public static ResultData success() {
        return success(null);
    }

    public static ResultData error(Integer code, String msg) {
        ResultData result = new ResultData();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

}
