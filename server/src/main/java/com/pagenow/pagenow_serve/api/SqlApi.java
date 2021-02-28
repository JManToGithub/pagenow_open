package com.pagenow.pagenow_serve.api;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.pagenow.pagenow_serve.utils.CommonUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sql")
public class SqlApi {

    @RequestMapping("/runSql")
    public List<Map<String, Object>> runSql(
            @RequestParam(required = true) String configName,
            @RequestParam String sql) {
        List<Record> list = Db.use(configName).find(sql);

        return CommonUtil.recordsToList(list);
    }

}
