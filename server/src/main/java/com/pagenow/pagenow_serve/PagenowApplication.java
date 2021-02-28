package com.pagenow.pagenow_serve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class PagenowApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(PagenowApplication.class, args);
    }

}
