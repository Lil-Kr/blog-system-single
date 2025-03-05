package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysDictMapper;
import com.cy.single.blog.pojo.SysDictService;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVo;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.base.Preconditions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

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

	/**
	 * 新增数据字典分类
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> add(DictSaveReq param) {
		if (checkExist(param.getSurrogateId(),param.getType(),param.getName())) {
			ApiResp.failure("待新增的字典类型或类型名已存在");
		}

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间

		SysDict dict = SysDict.builder()
			.surrogateId(surrogateId)
			.name(param.getName())
			.remark(param.getRemark())
			.deleted(0)
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		dictMapper.insert(dict);
		return ApiResp.success("添加数据字典信息成功");
	}

	/**
	 * 检查是否有相同类型的数据字典类别
	 * @param surrogateId
	 * @param type
	 * @param name
	 */
	protected boolean checkExist(Long surrogateId,Integer type,String name) {
		QueryWrapper<SysDict> query = new QueryWrapper<>();
		if (Objects.nonNull(surrogateId)) {
			query.eq("surrogate_id",surrogateId);
		}
		query.eq("name",name);
		Long count = dictMapper.selectCount(query);
		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	@Override
	public ApiResp<String> edit(DictSaveReq param) {
		if (checkExist(param.getSurrogateId(),param.getType(),param.getName())) {
			ApiResp.failure("待新增的字典类型或类型名已存在");
		}

		QueryWrapper<SysDict> query = new QueryWrapper<>();
		query.eq("surrogate_id",param.getSurrogateId());
		SysDict before = dictMapper.selectOne(query);
		Preconditions.checkNotNull(before, "待更新的数据字典信息不存在");

		SysDict after = SysDict.builder()
			.surrogateId(before.getSurrogateId())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.name(param.getName())
			.remark(param.getRemark())
			.deleted(0)
			.operateIp("127.0.0.1")
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.updateTime(DateUtil.localDateTimeNow())
			.build();

		int update = dictMapper.update(after, query);
		if (update >= 1) {
			return ApiResp.success("修改数据字典信息成功");
		}else {
			return ApiResp.failure("修改数据字典信息失败");
		}
	}

	/**
	 * 数据字典类型列表列表
	 * @return
	 * @throws Exception
	 */
	@Override
	public PageResult<SysDictVo> listAll() {
//		QueryWrapper<SysDict> query = new QueryWrapper<>();
//		query.orderByAsc("create_time");
//		List<SysDict> sysDicts = sysDictMapper1.selectList(query);
//		return ApiResp.success(sysDicts);
		return null;
	}
}
