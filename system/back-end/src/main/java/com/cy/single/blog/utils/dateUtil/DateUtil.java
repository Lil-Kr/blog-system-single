package com.cy.single.blog.utils.dateUtil;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtil {

    private static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";

    private static final String YYYY_MM_DD = "yyyy-MM-dd";

    private static final String YYYYMMDDD = "YYYYMMDDD";

    private static DateTimeFormatter formatterForTime = DateTimeFormatter.ofPattern(YYYY_MM_DD_HH_MM_SS);

    private static DateTimeFormatter formatterForDate = DateTimeFormatter.ofPattern(YYYY_MM_DD);

    /**
     * 格式化时间转换为时间戳
     * 格式: Long -> yyyy-MM-dd HH:mm:ss
     * @param date
     * @return 时间戳
     */
    public static String getDateTimeFormat(long date) {
        LocalDateTime localDateTime = new Date(date).toInstant().atOffset(ZoneOffset.of("+8")).toLocalDateTime();
        String format = DateTimeFormatter.ofPattern(YYYY_MM_DD_HH_MM_SS).format(localDateTime);
        return format;
    }

    /**
     * 获取当前时间戳的毫秒数
     * @return
     */
    public static Long getCurrentDateTimeMilli() {
        long l = LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();
        return l;
    }

    /**
     * 获得当前时间
     * 格式: yyyy-MM-dd HH:mm:ss
     * @return 当前时间戳
     */
    public static String getNowDateTime(){
        return formatterForTime.format(LocalDateTime.now());
    }

    /**
     * str -> LocalDate
     * @param date
     * @return
     */
    public static LocalDate strToLocalDate(String date){
        return LocalDate.parse(date,formatterForDate);
    }

    /**
     * str -> LocalDateTime
     * @param date
     * @return
     */
    public static LocalDateTime strToLcoalDateTime(String date){
        return LocalDateTime.parse(date,formatterForTime);
    }

    /**
     * Date 转化成 LocalDateTime
     * @param date
     * @return
     */
    public static LocalDateTime dateToLocalDate(Date date) {
        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        return instant.atZone(zoneId).toLocalDateTime();
    }

    /**
     * LocalDateTime 转化成 Date
     * @param localDateTime
     * @return
     */
    public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zdt = localDateTime.atZone(zoneId);
        return Date.from(zdt.toInstant());
    }

}
