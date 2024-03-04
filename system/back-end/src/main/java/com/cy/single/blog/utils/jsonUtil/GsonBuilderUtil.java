package com.cy.single.blog.utils.jsonUtil;


import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import java.util.List;
import java.util.Map;

public class GsonBuilderUtil {

    private static Gson gson = null;

    private GsonBuilderUtil(){}

    static {
        if (gson == null) {
            //当使用GsonBuilder方式时属性为空的时候输出来的json字符串是有键值key的,显示形式是"key":null，而直接new出来的就没有"key":null的
            gson = new GsonBuilder()
                    .excludeFieldsWithoutExposeAnnotation() //不导出实体中没有用@Expose注解的属性
                    .serializeNulls()                       //当需要序列化的值为空时，采用null映射，否则会把该字段省略
                    .setDateFormat("yyyy-MM-dd HH:mm:ss")   //日期格式转换
                    .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE) //将属性的首字母大写
//                    .setPrettyPrinting()   //将结果进行格式化
                    .create();
        }
    }

    /**
     * 验证json字符串是否合法
     * 合法返回true 反之
     * @param json
     * @return
     */
    public static boolean isJson(String json) {
        JsonElement jsonElement;
        try {
            jsonElement = new JsonParser().parse(json);
        } catch (Exception e) {
            return false;
        }
        if (jsonElement == null) {
            return false;
        }
        if (!jsonElement.isJsonObject()) {
            return false;
        }
        return true;
    }

    /**
     * 对象转json
     * @param object
     * @return
     */
    public static String objectTojson(Object object) {
        String gsonString = null;
        if (gson != null) {
            gsonString = gson.toJson(object);
        }
        return gsonString;
    }

    /**
     * json转成特定的calss的对象
     * @param json
     * @param cls
     * @param <T>
     * @return
     */
    public static <T> T jsonToObject(String json, Class<T> cls) {
        T t = null;
        if (gson != null) {
            //传入json对象和对象类型,将json转成对象
            t = gson.fromJson(json, cls);
        }
        return t;
    }

    /**
     * json字符串转成list
     * @param json
     * @param cls
     * @param <T>
     * @return
     */
    public static <T> List<T> jsonToList(String json, Class<T> cls) {
        List<T> list = null;
        if (gson != null) {
            //根据泛型返回解析指定的类型,TypeToken<List<T>>{}.getType()获取返回类型
            list = gson.fromJson(json, new TypeToken<List<T>>() {
            }.getType());
        }
        return list;
    }

    /**
     * json字符串转成list中有map的
     * @param json
     * @param <T>
     * @return
     */
    public static <T> List<Map<String, T>> jsonToListMaps(String json) {
        List<Map<String, T>> list = null;
        if (gson != null) {
            list = gson.fromJson(json,
                    new TypeToken<List<Map<String, T>>>() {
                    }.getType());
        }
        return list;
    }

    /**
     * json字符串转成map的
     * @param json
     * @param <T>
     * @return
     */
    public static <T> Map<String, T> jsonToMaps(String json) {
        Map<String, T> map = null;
        if (gson != null) {
            map = gson.fromJson(json, new TypeToken<Map<String, T>>() {
            }.getType());
        }
        return map;
    }

}
