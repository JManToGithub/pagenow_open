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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/echartTheme")
public class EchartThemeApi extends BaseController {

    @RequestMapping("/saveEchartTheme")
    public ResponseData saveEchartTheme(String data, String type) {
        Record record = CommonUtil.buildRecord(data);

        if (type.equals(OperationType.ADD)) {
            Db.save("pn_echart_theme", record);
        } else if (type.equals(OperationType.UPDATE)) {
            Db.update("pn_echart_theme", record);
        }

        return new ResponseData();
    }

    @RequestMapping("/getAllEchartTheme")
    public List<Map<String, Object>> getAllEchartTheme() {
        List<Record> records = Db.find("select * from pn_echart_theme order by create_date asc");
        return CommonUtil.recordsToList(records);
    }

    @RequestMapping("/getEchartThemeByPage")
    public PageData getEchartThemeByPage() {
        String sqlExceptSelect = "from pn_echart_theme as main order by create_date desc";

        Page<Record> page = Db.paginate(
                getPageNum(),
                getPageSize(),
                "select main.*",
                sqlExceptSelect);
        return new PageData(page.getTotalRow(), CommonUtil.jfinalPageToList(page));
    }

    @RequestMapping("/getEchartThemeById")
    public Map<String, Object> getEchartThemeById(String id) {
        Record record = Db.findFirst("select * from pn_echart_theme where id = ?", id);
        return record.getColumns();
    }

    @RequestMapping("/deleteEchartTheme")
    public ResponseData deleteEchartTheme (@RequestParam(required = true) String id) {
        Db.delete("delete from pn_echart_theme where id = ?", id);
        return new ResponseData();
    }


}
