package com.pagenow.pagenow_serve.utils;

import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.io.FileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;

public class CommonUtil {

    public static Record buildRecord(String jsonStr) {
        Record record = new Record();
        JSONObject jsonObj = JSONObject.parseObject(jsonStr);
        for (String key : jsonObj.keySet()) {
            record.set(key, jsonObj.get(key));
        }

        // 如果record的ID为空，则为新增数据
        if (CommonUtil.isNullOrEmpty(record.get("id"))) {
            record.set("id", CommonUtil.createUuid());
            record.set("create_date", CommonUtil.getCurrentDatetime());
        }

        return record;
    }

    /**
     * JFinal的List<Record>转List<Map>
     * @param records
     * @return
     */
    public static List<Map<String, Object>> recordsToList(List<Record> records) {
        List list = new ArrayList();
        if (records.size() > 0) {
            for (Record record : records) {
                list.add(record.getColumns());
            }
        }
        return list;
    }

    /**
     * JFinal的分页数据中的List(Recorc)转List(Map)
     * @param jfinalPage
     * @return
     */
    public static List<Map<String, Object>> jfinalPageToList(Page<Record> jfinalPage){
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        for (Record r : jfinalPage.getList()) {
            list.add(r.getColumns());
        }
        return list;
    }

    public static String createUuid() {
        String uuid = UUID.randomUUID().toString().replace("-", "").toLowerCase();
        return uuid;
    }

    /**
     * 判断一个对象是否为空或空字符
     *
     * @param obj
     * @return
     */
    public static boolean isNullOrEmpty(Object obj) {
        return obj == null || "".equals(obj.toString());
    }

    /**
     * 获取当前日期时间，返回的格式为：yyyy-MM-dd HH:mm:ss
     *
     * @return
     * @throws Exception
     */
    public static String getCurrentDatetime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }


    public static Object uploadApk(MultipartFile files,
                                   HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resMap = new HashMap<String, Object>();
        if (files.getSize() > 1024 * 1024 * 5) {
            System.out.println("文件过大，请上传5M以内的图片");
            resMap.put("code", 500);
            resMap.put("msg", "文件过大，请上传5M以内的图片");
            return resMap;
        }

        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
        Date dt = new Date();
        Long time = dt.getTime();

        if (files != null) {
            String realPath = "/Users/jman/Downloads/";  // 获取保存的路径，本地磁盘中的一个文件夹
            if (files.isEmpty()) {
                resMap.put("code", 400);
                resMap.put("msg", "未选择文件");
            } else {
                // 文件原名称
                String originFileName = "";
                // 上传文件重命名
                String originalFilename = time.toString().substring(time.toString().length() - 8,
                        time.toString().length());
                originalFilename = originalFilename.concat(".");
                originalFilename = originalFilename.concat(files.getOriginalFilename()
                        .toString().substring(files.getOriginalFilename().toString().indexOf(".") + 1));
                try {
                    FileUtils.copyInputStreamToFile(files.getInputStream(), new File(realPath, originalFilename));
                    resMap.put("code", 200);
                    resMap.put("msg", "上传成功");
                    resMap.put("filename", originalFilename);
                    resMap.put("path", basePath + "/static/image/" + originalFilename);
                } catch (IOException e) {
                    resMap.put("code", 500);
                    resMap.put("msg", "文件上传失败");
                    e.printStackTrace();
                }
            }
        }

        return resMap;
    }

    /**
     * 使用MD5加密字符串
     * @param str
     * @return
     */
    public static String encodeStrToMD5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
            return buf.toString();

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "";
    }

    public static void main(String[] args) {
        //System.out.println(System.currentTimeMillis());
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> entity = restTemplate.getForEntity("http://service.datav.aliyun.com/datav-mock-data/api/ncov.json?name=total"
                , String.class);
        System.out.println(entity.getBody());
    }

}
