package com.cy.single.blog.service.impl;

import com.cy.single.blog.service.MessageLangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Locale;

/**
 * @Author: Lil-K
 * @Date: 2025/3/10
 * @Description:
 */
@Service
public class MessageLangServiceImpl implements MessageLangService {

	@Autowired
	private MessageSource messageSource;

	@Override
	public String getGreetingMessage(String lang, String key) {
		Locale locale = lang != null ? new Locale(lang) : Locale.getDefault();
		return messageSource.getMessage(key, null, locale);
	}
}
