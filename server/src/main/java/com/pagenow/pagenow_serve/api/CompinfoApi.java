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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/compinfo")
public class CompinfoApi extends BaseController {


    /**********************组件类型**********************/

    @RequestMapping("/saveCompinfoType")
    public ResponseData saveCompinfoType(String data, String type) {
        Record record = CommonUtil.buildRecord(data);

        if (type.equals(OperationType.ADD)) {
            Db.save("pn_compinfo_type", record);
        } else if (type.equals(OperationType.UPDATE)) {
            Db.update("pn_compinfo_type", record);
        }

        return new ResponseData();
    }

    @RequestMapping("/deleteCompinfoType")
    public ResponseData deleteCompinfoType(@RequestParam(required = true) String id) {
        Db.delete("delete from pn_compinfo_type where id = ?", id);
        return new ResponseData();
    }

    @RequestMapping("/getCompinfoTypeByPage")
    public PageData getCompinfoTypeByPage() {
        Page<Record> page = Db.paginate(getPageNum(), getPageSize(), "select *", "from pn_compinfo_type order by create_date asc");
        return new PageData(page.getTotalRow(), CommonUtil.jfinalPageToList(page));
    }

    /**********************组件信息**********************/

    @RequestMapping("/saveCompinfo")
    public ResponseData saveCompinfo(String data, String type) {
        Record record = CommonUtil.buildRecord(data);

        if (type.equals(OperationType.ADD)) {
            Db.save("pn_compinfo", record);
        } else if (type.equals(OperationType.UPDATE)) {
            Db.update("pn_compinfo", record);
        }

        return new ResponseData();
    }

    @RequestMapping("/deleteCompinfo")
    public ResponseData deleteCompinfo(@RequestParam(required = true) String id) {
        Db.delete("delete from pn_compinfo where id = ?", id);
        return new ResponseData();
    }

    @RequestMapping("/getAllCompinfo")
    public List<Map<String, Object>> getAllCompinfo () {
        List<Record> records = Db.find("select * from pn_compinfo");
        return CommonUtil.recordsToList(records);
    }

    @RequestMapping("/getCompinfoByPage")
    public PageData getCompinfoByPage(String typeId) {
        String sqlExceptSelect = "";

        if (CommonUtil.isNullOrEmpty(typeId)) {
            sqlExceptSelect = "from pn_compinfo order by create_date asc";
        } else {
            sqlExceptSelect = "from pn_compinfo where type_id = '" + typeId + "' order by create_date asc";
        }

        Page<Record> page = Db.paginate(
                getPageNum(),
                getPageSize(),
                "select *",
                sqlExceptSelect);
        return new PageData(page.getTotalRow(), CommonUtil.jfinalPageToList(page));
    }

    @RequestMapping("/getCompinfoById")
    public Map<String, Object> getCompinfoById(String id) {
        List<Record> records = Db.find("select * from pn_compinfo where id = ?", id);
        if (records.size() > 0) {
            return records.get(0).getColumns();
        } else {
            return new HashMap<>();
        }
    }

    @RequestMapping("/buildComponentLibrary")
    public List<Map<String, Object>> buildComponentLibrary() {

        List<Map<String, Object>> map = new ArrayList<Map<String, Object>>();

        List<Record> compinfoTypes = Db.find("select * from pn_compinfo_type order by create_date asc");
        for (Record compinfoType : compinfoTypes) {

            List<Record> compinfos = Db.find("select * from pn_compinfo where type_id = ? and enabled = '1'", compinfoType.getStr("id"));
            compinfoType.set("compinfos", CommonUtil.recordsToList(compinfos));

            map.add(compinfoType.getColumns());

        }

        return map;
    }

}
