package com.cy.single.blog.aspect.annotations;

/**
 * check api auth permission
 */
public @interface NoCheckAuth {
    String value() default "";
}