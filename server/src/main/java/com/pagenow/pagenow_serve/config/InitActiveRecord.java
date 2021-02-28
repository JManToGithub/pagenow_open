/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pagenow.pagenow_serve.config;

import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.dialect.PostgreSqlDialect;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.source.ClassPathSourceFactory;

import javax.annotation.PreDestroy;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.annotation.Order;

import java.util.List;

/**
 * 初始化数据源，程序启动时优先运行
 *
 * @author caibenxiang
 */
@Order(0)
@Configuration
@PropertySource("classpath:db.properties")
public class InitActiveRecord implements CommandLineRunner {

    private final Log log = LogFactory.getLog(this.getClass());

    private DruidPlugin dp;
    private ActiveRecordPlugin arp;

    @Value("${db.driverClassName}")
    private String driverClassName;

    @Value("${db.url}")
    private String url;

    @Value("${db.dbUser}")
    private String dbUser;

    @Value("${db.dbPsw}")
    private String dbPsw;

    @Value("${db.showSql}")
    private boolean isShowSql;

    @Override
    public void run(String... args) throws Exception {

        dp = new DruidPlugin(url, dbUser, dbPsw, driverClassName);

        arp = new ActiveRecordPlugin(dp);
        arp.setDialect(new MysqlDialect());
        arp.setShowSql(isShowSql);

        arp.getEngine()
                .setSourceFactory(new ClassPathSourceFactory())
                //.addDirective("paraLike", ParaLikeDirective.class)
                //.addDirective("paraIn", ParaInDirective.class)
                .addSharedObject("strKit", new com.jfinal.kit.StrKit());

        //arp.addSqlTemplate("sql/all.sql");

        dp.start();
        arp.start();

    }

    @PreDestroy
    public void destory() {
//        log.info("正在销毁数据源配置。。。。。。");
//        arp.stop();
//        dp.stop();
    }

}

