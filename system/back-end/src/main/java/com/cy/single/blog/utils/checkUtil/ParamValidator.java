package com.cy.single.blog.utils.checkUtil;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class ParamValidator {

    public static Boolean checkSurrogateIds(List<Long> surrogateIds) {
        List<Long> collect = surrogateIds.stream().filter(v -> Objects.isNull(v) || StringUtils.isBlank(String.valueOf(v))).collect(Collectors.toList());
        return CollectionUtils.isEmpty(collect);
    }

}
