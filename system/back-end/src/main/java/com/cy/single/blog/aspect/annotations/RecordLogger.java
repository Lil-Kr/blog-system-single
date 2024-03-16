package com.cy.single.blog.aspect.annotations;

/**
 * record log info
 */
public @interface RecordLogger {
    String value() default "";
}
