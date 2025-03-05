package com.cy.single.blog.api.sys;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.SysDictService;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.req.dict.DictSaveDetailReq;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVo;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVo;
import com.cy.single.blog.service.SysDictDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Objects;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: dict api
 */
@RestController
@RequestMapping("/sys/dict")
@Slf4j
public class DictController {

	@Autowired
	private SysDictService dictService;

	@Autowired
	private SysDictDetailService dictDetailService;

	/**
	 * 保存数据字典类型信息
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@PostMapping("save")
	public ApiResp<String> save (@RequestBody @Valid DictSaveReq req) {
		if (Objects.isNull(req.getSurrogateId())) {
			return dictService.add(req);
		}else {
			return dictService.edit(req);
		}
	}

	@PostMapping("add")
	public ApiResp add (@RequestBody @Valid DictSaveReq req) {
		return dictService.add(req);
	}

	@PostMapping("edit")
	public ApiResp edit (@RequestBody @Valid DictSaveReq req) {
		return dictService.edit(req);
	}

	/**
	 * 数据字典列表
	 * @return
	 * @throws Exception
	 */
	@PostMapping("listAll")
	public ApiResp<PageResult<SysDictVo>> listAll () {
		PageResult<SysDictVo> res = dictService.listAll();
		return ApiResp.success(res);
	}

	/**
	 * 字典明细分页查询
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@PostMapping("pageDictList")
	public ApiResp<PageResult<SysDictDetailVo>> pageDictList (@RequestBody @Valid DictListPageReq req) {
		PageResult<SysDictDetailVo> res = dictDetailService.pageDictList(req);
		return ApiResp.success(res);
	}

	/**
	 * 新增字典明细
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@PostMapping("addDetail")
	public ApiResp addDetail (@RequestBody @Valid DictSaveDetailReq req) {
		return dictDetailService.addDetail(req);
	}

	/**
	 * 新增字典明细
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@PostMapping("editDetail")
	public ApiResp editDetail (@RequestBody @Valid DictSaveDetailReq req) {
		return dictDetailService.editDetail(req);
	}

	/**
	 * 删除字典明细明细
	 * @param surrogateId
	 * @return
	 * @throws Exception
	 */
	@PostMapping("deleteDetail")
	public ApiResp deleteDetail (@Valid @NotNull(message = "surrogateId不能为空") Long surrogateId) {
		return dictDetailService.deleteDetail(surrogateId);
	}
}
