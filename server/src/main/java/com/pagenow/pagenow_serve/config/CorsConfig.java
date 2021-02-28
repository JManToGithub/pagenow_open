package com.pagenow.pagenow_serve.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 跨域过滤器配置
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.setAllowCredentials(true);
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);

        return new CorsFilter(configSource);
    }

    /*@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 允许跨域访问的路径
                //.allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE") // 允许请求方法
                .allowedMethods("*") // 允许请求方法
                .allowedOrigins("*") // 允许跨域访问的源
                .allowedHeaders("*") // 允许所有的请求header访问，可以自定义设置任意请求头信息
                .allowCredentials(true)
                .maxAge(3600l);


        super.addCorsMappings(registry);
    }*/

}

