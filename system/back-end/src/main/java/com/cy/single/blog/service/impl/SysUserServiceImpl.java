package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.dto.sys.user.UserDTO;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.*;
import com.cy.single.blog.pojo.resp.sys.user.SysUserResp;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysUserService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.luciad.imageio.webp.WebPWriteParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import static com.cy.single.blog.common.constants.CommonConstants.LANG_ZH;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;
import static com.cy.single.blog.pojo.dto.sys.user.UserDTO.convertAddUserReq;
import static com.cy.single.blog.pojo.dto.sys.user.UserDTO.convertEditUserReq;

/**
 * @Author: Lil-K
 * @Date: 2025/3/6
 * @Description:
 */
@Service
@Slf4j
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

	@Value("${upload.rootDir}")
	private String rootDir;

	@Value("${upload.uploadDir}")
	private String uploadDir;

	@Value("${upload.adminUserPath}")
	private String adminUserPath;

	@Autowired
	private MessageLangService msgService;

	@Autowired
	private SysUserMapper userMapper;

	@Autowired
	private CacheService cacheService;

	/**
	 * register admin
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<Integer> registerAdmin(UserRegisterReq req) {
		SysUser admin = userMapper.getUserByAccount(req.getAccount());
		if (Objects.nonNull(admin)) {
			return ApiResp.failure(ReturnCodeEnum.INFO_NOT_EXIST);
		}

		SysUser user = UserDTO.convertSaveAdminReq(req);

		int count = userMapper.insert(user);
		if (count < 1) {
			return ApiResp.failure(Add_ERROR);
		}

		return ApiResp.success(ReturnCodeEnum.SUCCESS);
	}

	@Override
	public ApiResp<String> add(UserSaveReq req) {
		List<SysUserResp> checkRes = userMapper.selectUserInfoExist(req);
		if (CollectionUtils.isNotEmpty(checkRes)) {
			return ApiResp.failure(DATA_INFO_REPEAT);
		}

		SysUser user = convertAddUserReq(req);
		int insert = userMapper.insert(user);
		if (insert < 1) {
			return ApiResp.failure(Add_ERROR);
		}
		// 更新缓存
		cacheService.setUserCache(user.getToken(), user);
		return ApiResp.success();
	}

	/**
	 * 编辑用户
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> edit(UserSaveReq req) {
		SysUser user = convertEditUserReq(req);
		int update = userMapper.updateUserBySurrogateId(user);
		if (update >= 1) {
			// 更新缓存
			cacheService.setUserCache(user.getToken(), user);
			return ApiResp.success();
		} else {
			return ApiResp.failure(EDITE_ERROR);
		}
	}

	@Override
	public ApiResp<String> delete(Long surrogateId) {
		QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
		wrapper.eq("surrogate_id", surrogateId);
		SysUser user = userMapper.selectOne(wrapper);
		if (Objects.isNull(user)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}
		int delete = userMapper.delete(wrapper);
		if (delete >= 1) {
			// 移除缓存
			cacheService.removeCache(StringUtils.isNotBlank(user.getToken()) ? user.getToken() : "");
			return ApiResp.success();
		} else {
			return ApiResp.failure(DEL_ERROR);
		}
	}

  @Override
  public SysUser getUserById(Long id) {
	  return userMapper.getUserById(id);
  }

	@Override
	public SysUserResp getUserBySurrogateId(Long surrogateId) {
		return userMapper.getUserBySurrogateId(surrogateId);
	}

	@Override
	public ApiResp<SysUser> adminLogin(UserLoginAdminReq req) {
		SysUser user = userMapper.loginAdmin(req);
		if (Objects.isNull(user)) {
			return ApiResp.failure(USER_INFO_ERROR);
		}

		user.setUpdateTime(DateUtil.localDateTimeNow());
		Integer update = userMapper.updateUserBySurrogateId(user);
		if (update >= 1)
			return ApiResp.success(msgService.getMessage(LANG_ZH, "admin.login.success"), user);
		else
			return ApiResp.failure();
	}

	@Override
	public PageResult<SysUserResp> pageList(UserListPageReq req) {
		List<SysUserResp> list =  userMapper.pageUserList(req);
		Integer count = userMapper.countUserList(req);
		if (CollectionUtils.isNotEmpty(list)) {
			return new PageResult<>(list, count);
		} else {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
	}

	/**
	 * upload avatar
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> uploadAvatar(AvatarUploadReq req) throws Exception {
		MultipartFile avatar = req.getAvatarFile();
		long maxSizeInBytes = 1 * 1024 * 1024; // 1MB
		if (avatar == null || avatar.getSize() > maxSizeInBytes) {
			return ApiResp.failure(msgService.getMessage(LANG_ZH, "admin.upload.avatar.size.error1"));
		}
		String imageOriginalFullName = Optional.ofNullable(avatar.getOriginalFilename()).orElse("");
		String[] imageFileNames = imageOriginalFullName.split("\\.");
		if (imageFileNames.length > 2) {
			return ApiResp.failure(msgService.getMessage(LANG_ZH, "admin.upload.avatar.size.error2"));
		}

		String imageName = imageFileNames[0];
		String imageTypeSuffix = "webp";

		StringBuffer resourcePath = new StringBuffer(rootDir);
		resourcePath.append(uploadDir);

		/**
		 * create Path object
		 */
		Path rootPath = Paths.get(resourcePath.toString());
		if (!Files.exists(rootPath)) {
			Files.createDirectories(rootPath);
		}

		String imageReName = imageName + "_" + IdWorker.getSnowFlakeId() + "." + imageTypeSuffix;
		SysUser currentUser = RequestHolder.getCurrentUser();
		resourcePath.append(adminUserPath).append("/")
			.append(currentUser.getAccount()).append("/")
			.append(imageReName);

		try(InputStream inputStream = avatar.getInputStream()) {
			/**
			 * write image to disk
			 */
			BufferedImage originalImage = ImageIO.read(inputStream);
			Iterator<ImageWriter> writers = ImageIO.getImageWritersByMIMEType("image/webp");
			if (!writers.hasNext()) {
				return ApiResp.failure("No writers found for format: webp");
			}

			ImageWriter writer = writers.next();
			try (ImageOutputStream ios = ImageIO.createImageOutputStream(Files.newOutputStream(Paths.get(resourcePath.toString())))) {
				WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
				writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
				writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]); // lossy compression
				writeParam.setCompressionQuality(0.75f);
				writer.setOutput(ios);
				writer.write(null, new IIOImage(originalImage, null, null), writeParam);
			} catch (Exception e) {
				log.info("avatar format webp error: {}", e.getMessage());
				return ApiResp.failure();
			} finally {
				writer.dispose();
			}

			/**
			 * update from DB
			 */
			StringBuffer imageUrl = new StringBuffer(uploadDir)
				.append(adminUserPath)
				.append("/").append(currentUser.getAccount())
				.append("/").append(imageReName);
			req.setUserId(currentUser.getSurrogateId());
			req.setAvatar(imageUrl.toString());
			// update from DB
			int update = userMapper.updateAvatar(req);
			if (update < 1) {
				return ApiResp.failure(msgService.getMessage(LANG_ZH, "admin.upload.avatar.error"));
			}
			return ApiResp.success(msgService.getMessage(LANG_ZH, "admin.upload.avatar.success"));
		} catch (Exception e) {
			log.info("upload image error: {}", e.getMessage());
			return ApiResp.failure(msgService.getMessage(LANG_ZH, "admin.upload.avatar.error"));
		}
	}

}