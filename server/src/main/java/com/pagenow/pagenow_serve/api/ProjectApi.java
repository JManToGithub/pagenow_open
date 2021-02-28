package com.pagenow.pagenow_serve.api;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.pagenow.pagenow_serve.common.BaseController;
import com.pagenow.pagenow_serve.common.vo.*;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/project")
public class ProjectApi extends BaseController {

    @RequestMapping("/saveProject")
    public ResponseData saveProject(String data, String type) {
        Record record = CommonUtil.buildRecord(data);

        if (type.equals(OperationType.ADD)) {
            Db.save("pn_project", record);
        } else if (type.equals(OperationType.UPDATE)) {
            Db.update("pn_project", record);
        }

        return new ResponseData();
    }

    @RequestMapping("/updateProjectEchartThemeId")
    public ResponseData updateProjectEchartThemeId(String projectId, String echartThemeId) {
        Db.update("update pn_project set echartThemeId = ? where id = ?", echartThemeId, projectId);
        return new ResponseData();
    }


    @RequestMapping("/getProjectByPage")
    public PageData getProjectByPage() {

        String sqlExceptSelect = sqlExceptSelect = "from pn_project as main left join pn_echart_theme as echart_theme on main.echartThemeId = echart_theme.id order by create_date desc";


        Page<Record> page = Db.paginate(
                getPageNum(),
                getPageSize(),
                "select main.*, echart_theme.name as echartThemeName",
                sqlExceptSelect);
        return new PageData(page.getTotalRow(), CommonUtil.jfinalPageToList(page));
    }


    @RequestMapping("/deleteProject")
    public ResponseData deleteProject(@RequestParam(required = true) String id) {
        Db.delete("delete from pn_project where id = ?", id);
        Db.delete("delete from pn_page where project_id = ?", id);
        return new ResponseData();
    }

    @RequestMapping("/getProjectById")
    public Map<String, Object> getProjectById(@RequestParam(required = true) String id) {
        Record record = Db.findFirst("select * from pn_project where id = ?", id);
        return record.getColumns();
    }

}
