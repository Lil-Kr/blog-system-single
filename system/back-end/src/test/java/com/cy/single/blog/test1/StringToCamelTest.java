package com.cy.single.blog.test1;

import com.cy.single.blog.utils.strUtil.CamelUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * @Author: Lil-K
 * @Date: 2025/3/20
 * @Description:
 */
public class StringToCamelTest {

	@Test
	public void test1() {
		String input = "hello_world_example";
		String camelCase = CamelUtil.toCamelCase(input);
		System.out.println(camelCase);
		Assertions.assertEquals("helloWorldExample", camelCase);
	}

	@Test
	public void test2() {
		String input = "hello";
		String camelCase = CamelUtil.toCamelCase(input);
		System.out.println(camelCase);
		Assertions.assertEquals("hello", camelCase);
	}

	@Test
	public void test3() {
		String input = "Hello";
		String camelCase = CamelUtil.toCamelCase(input);
		System.out.println(camelCase);
		Assertions.assertEquals("Hello", camelCase);
	}

	@Test
	public void test4() {
		String input = "hello_World_example";
		String camelCase = CamelUtil.toCamelCase(input);
		System.out.println(camelCase);
		Assertions.assertEquals("helloWorldExample", camelCase);
	}

}
