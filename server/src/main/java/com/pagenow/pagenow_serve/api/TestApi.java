package com.pagenow.pagenow_serve.api;

import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.druid.DruidPlugin;
import com.pagenow.pagenow_serve.common.BaseController;
import com.pagenow.pagenow_serve.common.vo.ResultData;
import com.pagenow.pagenow_serve.utils.ResultUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;


import sun.misc.BASE64Encoder;

@RestController
@RequestMapping("/test")
public class TestApi extends BaseController {

    @RequestMapping("/getMsg")
    public ResultData getMsg(String msg) {
        return ResultUtil.success("hello: "+ msg);
    }

    @RequestMapping("/getPageInfo")
    public ResultData getPageInfo() {
        String pageInfoStr = "{\"name\": \"Hello\", \"layoutData\": {\"layoutCompName\": \"AbsoluteLayoutDesigner\"}}";
        return ResultUtil.success(pageInfoStr);
    }

    @RequestMapping("/runSql")
    public ResultData runSql(String configName, String sql) {
        List<Record> list = Db.use(configName).find(sql);

        return ResultUtil.success(list);
    }

    @RequestMapping("/getText")
    public List<Map<String, Object>> getText() throws Exception {
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> map = new HashMap<String, Object>();

        map.put("value", "我是接口返回的数据，当前登录用户ID：");

        list.add(map);
        return list;
    }

    @RequestMapping("/getImages")
    public List<Map<String, Object>> getImages() {
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> map1 = new HashMap<>();
        map1.put("src", "http://img1.imgtn.bdimg.com/it/u=1563980539,1672265910&fm=26&gp=0.jpg");
        map1.put("description", "我是一段描述");

        Map<String, Object> map2 = new HashMap<>();
        map2.put("src", "http://localhost:8090/static/file/42554420.jpg");
        map2.put("description", "我是一段描述2222222");

        list.add(map1);
        list.add(map2);

        return list;
    }

    @RequestMapping("/addDatabase")
    public ResultData addDatabase() {

        DruidPlugin dp2 = new DruidPlugin(
                "jdbc:mysql://localhost:3306/xiangken",
                "root",
                "123456",
                "com.mysql.jdbc.Driver"
        );

        ActiveRecordPlugin arp2 = new ActiveRecordPlugin("xiangken",dp2);
        arp2.setDialect(new MysqlDialect());
        arp2.setShowSql(true);

        dp2.start();
        arp2.start();

        return ResultUtil.success("success");
    }

    @RequestMapping("/imageToBase64")
    public ResultData imageToBase64(String imgURL) {

        ByteArrayOutputStream outPut = new ByteArrayOutputStream();
        byte[] data = new byte[1024];

        try {
            // 创建URL
            URL url = new URL(imgURL);
            // 创建链接
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10 * 1000);

            if(conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                return ResultUtil.error(0,"连接失败");
            }
            InputStream inStream = conn.getInputStream();
            int len = -1;
            while ((len = inStream.read(data)) != -1) {
                outPut.write(data, 0, len);
            }
            inStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();

        return ResultUtil.success(encoder.encode(outPut.toByteArray()));
    }

}
