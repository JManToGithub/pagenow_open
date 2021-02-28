package com.pagenow.pagenow_serve.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * 基础控制器，用于给API接口继承使用
 * @author HuangJian
 */
@Component
public class BaseController {

    @Autowired
    protected HttpServletRequest request;

    /**
     * 获取Request中的pageNum参数
     * @return
     */
    protected int getPageNum() {
        String pageNumStr = request.getParameter("pageNum");
        if (CommonUtil.isNullOrEmpty(pageNumStr)) {
            return 1;
        }else {
            return Integer.parseInt(pageNumStr);
        }
    }

    /**
     * 获取Request中的pageSize参数
     * @return
     */
    protected int getPageSize() {
        String pageSizeStr = request.getParameter("pageSize");
        if (CommonUtil.isNullOrEmpty(pageSizeStr)) {
            return 100000;
        }else {
            return Integer.parseInt(pageSizeStr);
        }
    }

}
