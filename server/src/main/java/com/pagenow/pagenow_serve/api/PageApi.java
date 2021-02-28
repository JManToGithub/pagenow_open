package com.pagenow.pagenow_serve.api;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.pagenow.pagenow_serve.common.vo.ResponseData;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/page")
public class PageApi {

    @RequestMapping("/savePage")
    public ResponseData savePage(String data) {
        Record record = CommonUtil.buildRecord(data);

        long count = Db.queryLong("select count(*) from pn_page where path = ?", record.getStr("path"));
        if(count > 0) {
            return new ResponseData(false, 200, "此路径已存在，请重新配置！（建议选择自动生成）");
        }

        Db.save("pn_page", record);
        return new ResponseData();
    }

    @RequestMapping("/getPagesByProjectId")
    public List<Map<String, Object>> getPagesByProjectId(@RequestParam(required = true) String projectId) {
        List<Record> records = Db.find("select id, project_id, name, path, component, developCanvas, remark, ownEchartTheme, echartThemeId, publish, encrypt, create_date" +
                " from pn_page where project_id = ? order by create_date asc", projectId);
        return CommonUtil.recordsToList(records);
    }

    @RequestMapping("/updatePage")
    public ResponseData updatePage(String data) {
        Record record = CommonUtil.buildRecord(data);
        Db.update("pn_page", record);
        return new ResponseData();
    }

    @RequestMapping("/updatePageLayout")
    public ResponseData updatePageLayout(@RequestParam(required = true) String pageId, String layout) {
        Db.update("update pn_page set layoutData = ? where id = ?", layout, pageId);
        return new ResponseData();
    }

    @RequestMapping("/deletePage")
    public ResponseData deletePage(@RequestParam(required = true) String id) {
        Db.delete("delete from pn_page where id = ?", id);
        return new ResponseData();
    }

    @RequestMapping("/getPageById")
    public Map<String, Object> getPageById(@RequestParam(required = true) String id) {
        Record record = Db.findFirst("select * from pn_page where id = ?", id);
        return record.getColumns();
    }

    @RequestMapping("/getAllPage")
    public List<Map<String, Object>> getAllPage() {
        List<Record> records = Db.find("select *" +
                " from pn_page order by create_date asc");
        return CommonUtil.recordsToList(records);
    }

    @RequestMapping("/getAllPageBaseInfo")
    public List<Map<String, Object>> getAllPageBaseInfo() {
        List<Record> records = Db.find("select id, project_id, name, path, component, developCanvas, remark, ownEchartTheme, echartThemeId, publish, encrypt, create_date" +
                " from pn_page order by create_date asc");
        return CommonUtil.recordsToList(records);
    }

    @RequestMapping("/getAllPageByProjectId")
    public List<Map<String, Object>> getAllPageByProjectId(String projectId) {
        List<Record> records = Db.find("select id, project_id, name, path, component, developCanvas, remark, ownEchartTheme, echartThemeId, publish, encrypt, create_date" +
                " from pn_page where project_id = ? order by create_date asc", projectId);
        return CommonUtil.recordsToList(records);
    }

    /**
     * 发布页面
     * @return
     */
    @RequestMapping("/releasePage")
    public ResponseData releasePage(String pageId, String publish, String encrypt, String password) {

        if (!CommonUtil.isNullOrEmpty(pageId)) {
            Db.update("update pn_page set publish = ?, encrypt = ? where id = ?",
                    publish, encrypt, pageId);
            if (encrypt.equals("1")) {

                Record dbPage = Db.findFirst("select password from pn_page where id = ?", pageId);
                // 如果传入的密码与数据库保存的密码不一样，那么就更新
                if (!password.equals(dbPage.getStr("password"))) {
                    String pwd = "";
                    if (CommonUtil.isNullOrEmpty(password)) {
                        pwd = CommonUtil.encodeStrToMD5("123");
                    }else {
                        pwd = CommonUtil.encodeStrToMD5(password);
                    }
                    Db.update("update pn_page set encrypt = ?, password = ? where id = ?",
                            encrypt, pwd, pageId);
                }else {
                    Db.update("update pn_page set encrypt = ? where id = ?",
                            encrypt, pageId);
                }

            }else if (encrypt.equals("0")) {
                Db.update("update pn_page set encrypt = ?, password = ? where id = ?",
                        encrypt, "", pageId);
            }
        }

        return new ResponseData();
    }

}
