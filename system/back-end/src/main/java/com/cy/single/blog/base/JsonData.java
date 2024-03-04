package com.cy.single.blog.base;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Data
@ToString
@NoArgsConstructor
public class JsonData extends HashMap implements Map {

    public static JsonData success(){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "0");
        return jsonData1;
    }

    public static JsonData success(String msg){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "0");
        jsonData1.put("msg",msg);
        return jsonData1;
    }

    public static JsonData success(String msg,Object object){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "0");
        jsonData1.put("msg",msg);
        jsonData1.put("data",object);
        return jsonData1;
    }

    public static JsonData success(Object object){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "0");
        jsonData1.put("msg","请求成功");
        jsonData1.put("data",object);
        return jsonData1;
    }

    public static JsonData error(String msg){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "1");
        jsonData1.put("msg", msg);
        return jsonData1;
    }

    public static JsonData error(String msg,Object obj){
        JsonData jsonData1 = new JsonData();
        jsonData1.put("status", "1");
        jsonData1.put("msg", msg);
        jsonData1.put("data", obj);
        return jsonData1;
    }

}
