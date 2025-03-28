package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysDictDetailMapper;
import com.cy.single.blog.dao.SysDictMapper;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.SysDictService;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.dict.DictDetailReq;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVO;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVO;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.BUS_CREATE;
import static com.cy.single.blog.common.constants.CommonConstants.BUS_EDIT;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: dict service
 */
@Service
@Slf4j
public class SysDictServiceImpl extends ServiceImpl<SysDictMapper, SysDict> implements SysDictService {

	@Autowired
	private SysDictMapper dictMapper;

	@Autowired
	private SysDictDetailMapper dictDetailMapper;

	@Autowired
	private CacheService cacheService;

	/**
	 * 新增数据字典分类
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> add(DictSaveReq req) {
		if (checkExist(req.getSurrogateId(), req.getName())) {
			return ApiResp.failure(INFO_EXIST);
		}

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间

		SysDict dict = SysDict.builder()
			.surrogateId(surrogateId)
			.name(req.getName())
			.remark(req.getRemark())
			.deleted(0) // default 0
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		int insert = dictMapper.insert(dict);
		if (insert >= 1) {
			cacheService.updateDictCache(dict.getSurrogateId(), dict, BUS_CREATE);
			return ApiResp.success();
		} else {
			return ApiResp.failure(SAVE_ERROR);
		}
	}

	/**
	 * 检查是否有相同类型的数据字典类别
	 * @param surrogateId
	 * @param name
	 */
	protected boolean checkExist(Long surrogateId, String name) {
		QueryWrapper<SysDict> query = new QueryWrapper<>();
		if (Objects.nonNull(surrogateId)) {
			query.eq("surrogate_id", surrogateId);
		}
		if (Objects.nonNull(name)) {
			query.eq("name", name);
		}
		Long count = dictMapper.selectCount(query);
		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	@Override
	public ApiResp<String> edit(DictSaveReq req) {
		QueryWrapper<SysDict> query = new QueryWrapper<>();
		query.eq("surrogate_id", req.getSurrogateId());
		SysDict before = dictMapper.selectOne(query);
		if (Objects.isNull(before)) {
			return ApiResp.failure("待更新的数据字典信息不存在");
		}

		SysDict after = SysDict.builder()
			.surrogateId(before.getSurrogateId())
			.name(req.getName())
			.remark(req.getRemark())
			.deleted(0)
			.operateIp("127.0.0.1")
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.updateTime(DateUtil.localDateTimeNow())
			.build();

		try {
			int update = dictMapper.update(after, query);
			if (update >= 1) {
				cacheService.updateDictCache(after.getSurrogateId(), after, BUS_EDIT);
				return ApiResp.success("修改数据字典信息成功");
			}else {
				return ApiResp.failure("修改数据字典信息失败");
			}
		} catch (Exception e) {
			throw new BusinessException(INFO_EXIST);
		}
	}

	/**
	 * 数据字典类型列表列表
	 * @return
	 * @throws Exception
	 */
	@Override
	public PageResult<SysDictVO> listAll() {
		return null;
	}

	/**
	 *
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<SysDictVO> dictDetail(DictDetailReq req) {
		SysDictVO dict = this.getDict(req.getDictSurrogateId());
		if (Objects.isNull(dict)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		List<SysDictDetailVO> dictDetailList = dictDetailMapper.getDictDetailListByParentId(req.getDictSurrogateId());
		if (CollectionUtils.isEmpty(dictDetailList)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		dict.setDictDetailVOList(dictDetailList);
		return ApiResp.success(dict);
	}

	@Override
	public SysDictVO getDict(Long surrogateId) {
		SysDictVO dictVO = dictMapper.getDict(surrogateId);
		return dictVO;
	}

	/**
	 * 分页查询字典主信息
	 * @param req
	 * @return
	 */
	@Override
	public PageResult<SysDictVO> pageDictList(DictListPageReq req) {
		List<SysDictVO> pageList = dictMapper.pageDictList(req);
		Integer count = dictMapper.countPageDict(req);
		if (CollectionUtils.isNotEmpty(pageList)) {
			return new PageResult<>(pageList, count);
		}else {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
	}

	@Override
	public ApiResp<String> delete(Long surrogateId) {
		QueryWrapper<SysDictDetail> wrapper = new QueryWrapper<>();
		wrapper.eq("parent_id", surrogateId);
		Long count = dictDetailMapper.selectCount(wrapper);
		if (count >= 1) {
			return ApiResp.failure("该字典下存在明细, 删除失败");
		}

		QueryWrapper<SysDict> deleteWrapper = new QueryWrapper<>();
		deleteWrapper.eq("surrogate_id", surrogateId);
		int delete = dictMapper.delete(deleteWrapper);
		if (delete >= 1) {
			// 移除缓存
			cacheService.removeDicCache(surrogateId);
			return ApiResp.success();
		}
		return ApiResp.failure(DEL_ERROR);
	}

	/**
	 * 查询字典明细 -> map
	 * @return
	 */
	@Override
	public ApiResp<Map<String, List<SysDictDetailVO>>> dictDetailTree() {
		List<SysDictDetailVO> dictDetailTree = dictDetailMapper.dictDetailTree();
		Map<String, List<SysDictDetailVO>> collect = dictDetailTree.stream().collect(Collectors.groupingBy(SysDictDetailVO::getParentName));
		return ApiResp.success(MapUtils.isEmpty(collect) ? Maps.newHashMap() : collect);
	}
}
