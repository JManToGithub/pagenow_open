package com.pagenow.pagenow_serve.api;

import com.pagenow.pagenow_serve.common.vo.ResponseData;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/file")
public class FileUploadApi {

    @Value("${file.staticAccessPath}")
    private String staticAccessPath;

    @Value("${file.uploadFolder}")
    private String uploadFolder;

    @Value("${spring.servlet.multipart.max-file-size}")
    private long maxFileSize;

    @RequestMapping("/upload")
    public ResponseData upload(MultipartFile files, String pageId, HttpServletRequest request, HttpServletResponse response) {
        if (files.getSize() > maxFileSize) {
            return new ResponseData(false, 200, "文件过大，请上传5M以内的文件");
        }

        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
        Date dt = new Date();
        Long time = dt.getTime();

        if (files != null) {
            String realPath = uploadFolder;  // 获取保存的路径，本地磁盘中的一个文件夹
            if (files.isEmpty()) {
                return new ResponseData(false, 200, "未选择文件");
            } else {
                // 上传文件重命名
                String originalFilename = pageId + "_" + time.toString().substring(time.toString().length() - 8,
                        time.toString().length());
                originalFilename = originalFilename.concat(".");
                originalFilename = originalFilename.concat(files.getOriginalFilename()
                        .toString().substring(files.getOriginalFilename().toString().indexOf(".") + 1));
                try {
                    FileUtils.copyInputStreamToFile(files.getInputStream(), new File(realPath, originalFilename));
                    Map<String, Object> resMap = new HashMap<>();
                    resMap.put("filename", originalFilename);
                    staticAccessPath = staticAccessPath.replace("*", "");
                    resMap.put("path", basePath + staticAccessPath + originalFilename);
                    resMap.put("relativePath", staticAccessPath + originalFilename);
                    return new ResponseData(true, 200, "", resMap);

                } catch (IOException e) {
                    e.printStackTrace();
                    return new ResponseData(false, 200, "文件上传失败");
                }
            }
        }

        return null;
    }

}
