package com.helijia.monitor.biz.demo.impl;

import java.util.List;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.helijia.monitor.biz.demo.HelloService;
import com.helijia.monitor.common.demo.utils.DemoUtils;
import com.helijia.monitor.dal.mapper.StudentMapper;
import com.helijia.monitor.dal.model.Student;
import com.github.pagehelper.PageHelper;

public class HelloServiceImpl implements HelloService {

    private String             testProp;
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;
    @Autowired
    private StudentMapper      studentMapper;

    private JdbcTemplate jdbcTemplate;

    public void setTestProp(String testProp) {
        this.testProp = testProp;
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Student> selectPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        //Spring4支持泛型注入
        return studentMapper.select(null);
    }

    public String hello(String name) {
        System.out.println("************" + studentMapper);
        StudentMapper mapper = sqlSessionTemplate.getMapper(StudentMapper.class);
        mapper.deleteByPrimaryKey1(1);
        mapper.deleteByPrimaryKey(2);
        studentMapper.deleteByPrimaryKey(3);
        //sqlSessionTemplate.delete("deleteByPrimaryKey", 1);
        DemoUtils.doLogic(name);
        StringBuilder sb = new StringBuilder("hello");
        sb.append(" ").append(name).append(testProp);
        return sb.toString();
    }

}
