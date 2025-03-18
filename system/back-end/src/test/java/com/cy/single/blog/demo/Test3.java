package com.cy.single.blog.demo;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description:
 */
public class Test3 {

	public int factorial(int n) {
		if (n <= 1) {
			return 1;
		}
		return n * factorial(n - 1); // 这里应该显示递归标记
	}
}
