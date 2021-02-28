package com.pagenow.pagenow_serve.api;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.pagenow.pagenow_serve.common.vo.ResponseData;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/release")
public class ReleaseApi {

    @RequestMapping("/getReleaseData")
    public ResponseData getReleaseData (String pageId) {

        Map<String, Object> map = new HashMap<String, Object>();

        Record page = Db.findFirst("select * from pn_page where id = ?", pageId);
        if(page.getStr("ownEchartTheme").equals("1") && !CommonUtil.isNullOrEmpty(page.getStr("echartThemeId"))) {
            Record echartTheme = Db.findFirst("select * from pn_echart_theme where id = ?", page.getStr("echartThemeId"));
            page.set("echartThemeJsonText", echartTheme.getStr("jsonText"));
        }
        map.put("pageMetadata", page.getColumns());

        if (page.getStr("publish").equals("0")) {
            return new ResponseData(false, 200, "页面未发布，无法访问！");
        }

        Record project = Db.findFirst("select * from pn_project where id = ?", page.getStr("project_id"));
        if(!CommonUtil.isNullOrEmpty(project.getStr("echartThemeId"))) {
            Record echartTheme = Db.findFirst("select * from pn_echart_theme where id = ?", project.getStr("echartThemeId"));
            project.set("echartThemeJsonText", echartTheme.getStr("jsonText"));
        }

        map.put("projectInfo", project.getColumns());

        return new ResponseData(true, 200, "", map);
    }

}
