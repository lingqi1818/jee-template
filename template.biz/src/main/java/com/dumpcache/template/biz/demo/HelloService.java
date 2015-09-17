package com.helijia.monitor.biz.demo;

import java.util.List;

import com.helijia.monitor.dal.model.Student;

/**
 * hello服务
 * 
 * @author chenke
 */
public interface HelloService {
    /**
     * say hello方法
     * 
     * @param name hello对方名字
     * @return hello字符串
     */
    public String hello(String name);

    public List<Student> selectPage(int pageNum, int pageSize);
}
