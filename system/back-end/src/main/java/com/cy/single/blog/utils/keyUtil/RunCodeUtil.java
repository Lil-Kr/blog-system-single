package com.cy.single.blog.utils.keyUtil;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 流水号生成
 */
public class RunCodeUtil {

    private static final int count = 0 ; //总数量：一般在实际业务中是需要在数据库中获取到当前的数据总数量
    private static final String STR_FORMAT = "000"; //需要格式化的流水号规则

    /**
     * @return 获取三位流水号
     */
    public String getThreePipelineNumbers() {
        // 这里code可以自定义前缀，例如可以设为 String code = "ZD";
        String code = "";
        int num =  count + 1;
        // 准备数字所需格式化的形式
        DecimalFormat def = new DecimalFormat(STR_FORMAT);
        code += def.format(num);
        return code;
    }

    /**
     * @return 获取年月日+三位流水号（根据当天生成的单据数量，生成流水号如：20190522001,20190601001）
     */
    public String getFourPipelineNumbers() {
        // 所要获取的流水编码code
        StringBuffer code = new StringBuffer();
        // 设定所需的时间格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        // 获取当前时间并转化成所要的格式
        String dateStr = sdf.format(new Date()).toString();
        // 将格式化好的时间拼接到code上
        code.append(dateStr);
        // 根据格式化好的String类型的时间，查询数据库中当天所产生的单据数量生成流水号
        // 这里的count是需要在数据库中根据当天的日期,查询“单据”的创建时间符合条件的数量
        int num = count + 1;
        DecimalFormat dft = new DecimalFormat(STR_FORMAT);
        // 将获取到的数量按照所需的格式进行格式化
        String strNum = dft.format(num);
        // 因为code的类型是StingBuffer，所以要将其转换成String类型
        String autoCode = code.append(strNum).toString();
        return autoCode;
    }

    public static String getFourPipelineNumbers(String prefix) {
        return prefix + IdWorker.getSnowFlakeId();
    }

}
