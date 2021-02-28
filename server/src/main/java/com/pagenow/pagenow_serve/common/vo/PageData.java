package com.pagenow.pagenow_serve.common.vo;

import java.util.List;

public class PageData {

    private Integer total;
    private List<?> list;

    public PageData(Integer total, List<?> list){
        this.total = total;
        this.list = list;
    }

    public Integer getTotal() {
        return total;
    }
    public void setTotal(Integer total) {
        this.total = total;
    }

    public List<?> getList() {
        return list;
    }
    public void setList(List<?> list) {
        this.list = list;
    }

}
