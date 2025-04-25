package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogContentImageMapper;
import com.cy.single.blog.dao.BlogContentMapper;
import com.cy.single.blog.dao.BlogContentMongoMapper;
import com.cy.single.blog.pojo.dto.blog.BlogContentDTO;
import com.cy.single.blog.pojo.entity.blog.*;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.req.blog.content.BlogRichEditorImageReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentGroupResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentResp;
import com.cy.single.blog.service.BlogContentService;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.luciad.imageio.webp.WebPWriteParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
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
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.IMAGE_TYPE_SUFFIX;
import static com.cy.single.blog.common.constants.CommonConstants.LANG_ZH;
import static com.cy.single.blog.enums.ReturnCodeEnum.Add_ERROR;
import static com.cy.single.blog.enums.ReturnCodeEnum.INFO_NOT_EXIST;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@Service
@Slf4j
public class BlogContentServiceImpl implements BlogContentService {


  @Value("${upload.rootDir}")
  private String rootDir;

  @Value("${upload.uploadDir}")
  private String uploadDir;

  @Value("${upload.blogContentImagePath}")
  private String blogContentImagePath;

  @Autowired
  private BlogContentMapper blogContentMapper;

  @Autowired
  private BlogContentMongoMapper blogContentMongoMapper;

  @Autowired
  private BlogContentImageMapper blogContentImageMapper;

  @Autowired
  private MessageLangService msgService;

  @Autowired
  private CacheService cacheService;

  @Override
  public ApiResp<String> add(BlogContentReq req) {
    BlogContent blogContent = BlogContentDTO.convertSaveBlogContentReq(req);

    // insert into mysql
    int insert = blogContentMapper.insert(blogContent);
    if (insert < 1) {
      return ApiResp.failure(Add_ERROR);
    }

    if (StringUtils.isBlank(req.getContentText())) {
      return ApiResp.success("添加博客成功, 但文章内容没有任何值");
    }

    BlogContentMongo blogContentMongo = BlogContentMongo.builder()
      .id(String.valueOf(blogContent.getSurrogateId()))
      .contentText(req.getContentText())
      .build();
    // insert into mongodb
    saveBlogContentMongo(blogContentMongo);
    return ApiResp.success();
  }

  /**
   * 保存博客内容
   * @param entity
   * @return
   */
  @Override
  public BlogContentMongo saveBlogContentMongo(BlogContentMongo entity) {
    return blogContentMongoMapper.save(entity);
  }

  /**
   * 获取博客内容
   * @param surrogateId
   * @return
   */
  private BlogContentMongo getBlogContentMongo(Long surrogateId) {
    return blogContentMongoMapper.findById(String.valueOf(surrogateId)).orElse(null);
  }

  /**
   * 分页查询博客列表
   * @param req
   * @return
   */
  @Override
  public PageResult<BlogContentResp> pageContentList(BlogContentPageReq req) {
    List<BlogContentResp> pageList = blogContentMapper.pageContentList(req);
    Integer count = blogContentMapper.pageContentCount(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    pageList.forEach(item -> {
      // 标签信息
      List<BlogLabel> labelList = Arrays.stream(item.getLabelIds().split(","))
        .map(Long::valueOf)
        .map(cacheService::getLabelCache)
        .collect(Collectors.toList());
      item.setBlogLabelList(labelList);

      // 分类信息
      BlogCategoryResp categoryVO = cacheService.getBlogCategoryCache(item.getCategoryId());
      item.setCategoryName(categoryVO.getName());
      item.setCategoryColor(categoryVO.getColor());

      // 所属专题
      if (Objects.nonNull(item.getTopicId())) {
        BlogTopic topic = cacheService.getTopicCache(item.getTopicId());
        item.setTopicName(topic.getName());
        item.setTopicColor(topic.getColor());
      }

      // 是否原创
      item.setOriginalType(cacheService.getDictDetailCache(item.getOriginal()).getType());

      // 是否推荐
      item.setRecommendType(cacheService.getDictDetailCache(item.getRecommend()).getType());
    });
    return new PageResult<>(pageList, count);
  }

  @Override
  public PageResult<BlogContentResp> contentList(BlogContentPageReq req) {
    List<BlogContentResp> list = blogContentMapper.contentList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    list.forEach(item -> {
      // 标签信息
      List<BlogLabel> labelList = Arrays.stream(item.getLabelIds().split(","))
        .map(Long::valueOf)
        .map(cacheService::getLabelCache)
        .collect(Collectors.toList());
      item.setBlogLabelList(labelList);

      // 分类信息
      item.setCategoryName(cacheService.getBlogCategoryCache(item.getCategoryId()).getName());
      item.setCategoryColor(cacheService.getBlogCategoryCache(item.getCategoryId()).getColor());

      // 所属专题
      item.setTopicName(cacheService.getTopicCache(item.getTopicId()).getName());
      item.setTopicColor(cacheService.getTopicCache(item.getTopicId()).getColor());

      // 是否原创
      item.setOriginalType(cacheService.getDictDetailCache(item.getOriginal()).getType());

      // 是否推荐
      item.setRecommendType(cacheService.getDictDetailCache(item.getRecommend()).getType());
    });
    return new PageResult<>(list, list.size());
  }

  /**
   * 获取单条博客信息, 包括博客内容
   * @param surrogateId
   * @return
   */
  @Override
  public ApiResp<BlogContentResp> getBlog(Long surrogateId) {
    QueryWrapper<BlogContent> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    BlogContent blogContent = blogContentMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogContent)) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }

    // get blog info from mongodb
    BlogContentMongo blogContentMongo = getBlogContentMongo(surrogateId);
    if (Objects.isNull(blogContentMongo) || !String.valueOf(blogContent.getSurrogateId()).equals(blogContentMongo.getId())) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }

    BlogContentResp resp = new BlogContentResp();
    BeanUtils.copyProperties(blogContent, resp);
    resp.setContentText(blogContentMongo.getContentText());

    return ApiResp.success(resp);
  }

  @Override
  public ApiResp<String> edit(BlogContentReq req) {
    QueryWrapper<BlogContent> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", req.getSurrogateId());
    BlogContent blogContent = blogContentMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogContent)) {
      return ApiResp.failure();
    }

    BeanUtils.copyProperties(req, blogContent);
    blogContent.setUpdateTime(DateUtil.localDateTimeNow());
    blogContent.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
    blogContent.setLabelIds(req.getLabelIds().stream().map(String::valueOf).collect(Collectors.joining(",")));

    UpdateWrapper<BlogContent> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", req.getSurrogateId());
    int update = blogContentMapper.update(blogContent, updateWrapper);

    if (update < 1) {
      return ApiResp.failure();
    }

    if (StringUtils.isBlank(req.getContentText())) {
      return ApiResp.success("更新博客成功, 但文章内容没有任何值");
    }

    // update mongodb
    BlogContentMongo updateMongo = BlogContentMongo.builder().id(String.valueOf(req.getSurrogateId())).contentText(req.getContentText()).build();
    saveBlogContentMongo(updateMongo);
    return ApiResp.success();
  }

  /**
   * publish blog
   * @param req
   * @return
   */
  @Override
  public ApiResp<String> publishBlog(BlogContentReq req) {
    BlogContent content = new BlogContent();
    BeanUtils.copyProperties(req, content);
    Date nowDate = DateUtil.localDateTimeNow();
    content.setPublishTime(nowDate);
    content.setUpdateTime(nowDate);
    Integer update = blogContentMapper.updateStatusBySurrogateId(content);
    if (update < 1) {
      return ApiResp.failure();
    }
    return ApiResp.success();
  }

  @Override
  public ApiResp<BlogContentResp> getContent(Long blogId) {
    BlogContentMongo blogContentMongo = getBlogContentMongo(blogId);
    BlogContentResp res = new BlogContentResp();
    res.setSurrogateId(blogId);

    if (Objects.isNull(blogContentMongo)) {
      return ApiResp.success(res);
    }

    res.setContentText(blogContentMongo.getContentText());
    return ApiResp.success(res);
  }

  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper<BlogContent> query = new QueryWrapper<>();
    query.eq("surrogate_id", surrogateId);
    BlogContent blogContent = blogContentMapper.selectOne(query);
    if (Objects.isNull(blogContent)) {
      return ApiResp.warning(INFO_NOT_EXIST);
    }

    blogContentMapper.delete(query);
    BlogContentMongo blogContentMongo = BlogContentMongo.builder()
      .id(String.valueOf(blogContent.getSurrogateId()))
      .build();
    blogContentMongoMapper.delete(blogContentMongo);
    return ApiResp.success();
  }

  /**
   * 富文本编辑器中上传的图片
   * @param req
   * @return
   * @throws Exception
   */
  @Override
  public ApiResp<BlogRichEditorResp> uploadBlogContentImage(BlogRichEditorImageReq req) throws Exception {
    MultipartFile imageFile = req.getImage();
    // 检查文件大小，限制为 2MB
    long maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (imageFile == null || imageFile.getSize() > maxSizeInBytes) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "blog.image.upload.error1"));
    }

    String imageOriginalFullName = imageFile.getOriginalFilename();
    String[] imageFileNames = imageOriginalFullName.split("\\.");
    if (imageFileNames.length > 2) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "blog.image.upload.error2"));
    }

    String imageName = imageFileNames[0];

    SysUser currentUser = RequestHolder.getCurrentUser();
    StringBuffer resourcePath = new StringBuffer(rootDir);
    resourcePath.append(uploadDir)
      .append(blogContentImagePath).append("/")
      .append(currentUser.getAccount()).append("/")
      .append(DateUtil.getNowDateTimeForYMD()).append("/");

    /**
     * create Path into disk
     */
    Path rootPath = Paths.get(resourcePath.toString());
    if (!Files.exists(rootPath)) {
      Files.createDirectories(rootPath);
    }

    /**
     * re-name
     */
    StringBuffer imageReName = new StringBuffer(imageName).append("_")
      .append(IdWorker.getSnowFlakeId())
      .append(".")
      .append(IMAGE_TYPE_SUFFIX);

    /**
     * full-path
     */
    resourcePath.append(imageReName);

    try(InputStream inputStream = imageFile.getInputStream()) {
      /**
       * write image to disk
       */
      BufferedImage originalImage = ImageIO.read(inputStream);
      Iterator<ImageWriter> writers = ImageIO.getImageWritersByMIMEType("image/webp");
      if (!writers.hasNext()) {
        return ApiResp.failure("No writers found for format: webp");
      }

      ImageWriter writer = writers.next();
      // writer webp to disk
      try (ImageOutputStream ios = ImageIO.createImageOutputStream(Files.newOutputStream(Paths.get(resourcePath.toString())))) {
        WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
        writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]); // lossy compression
        writeParam.setCompressionQuality(0.75f);
        writer.setOutput(ios);
        writer.write(null, new IIOImage(originalImage, null, null), writeParam);
      } catch (Exception e) {
        log.info("image format webp error: {}", e.getMessage());
        e.printStackTrace();
        return ApiResp.failure(e.getMessage());
      } finally {
        writer.dispose();
      }

      StringBuffer imageUrl = new StringBuffer(uploadDir)
        .append(blogContentImagePath).append("/")
        .append(currentUser.getAccount()).append("/")
        .append(DateUtil.getNowDateTimeForYMD()).append("/")
        .append(imageReName);
      BlogRichEditorResp res = new BlogRichEditorResp();
      res.setUrl(imageUrl.toString());
      return ApiResp.success(res);
    } catch (Exception e) {
      log.info("upload image error: {}", e.getMessage());
      return ApiResp.failure(e.getMessage());
    }
  }

  /**
   *
   * @return
   */
  @Override
  public ApiResp<List<BlogContentResp>> frontContentList() {
    List<BlogContentResp> res = blogContentMapper.frontContentList();
    if (CollectionUtils.isEmpty(res)) {
      return ApiResp.success(new ArrayList<>());
    }
    return ApiResp.success(res);
  }

  @Override
  public List<BlogContentGroupResp> frontContentByGroupCategory() {
    return blogContentMapper.frontContentByGroupCategory();
  }

  @Override
  public PageResult<BlogContentResp> frontContentPageList(BlogContentPageReq req) {
    req.setStatus(1);
    req.setIsOrder(1);
    List<BlogContentResp> pageList = blogContentMapper.pageFrontContentList(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    Integer count = blogContentMapper.pageFrontContentCount(req);

    // 设置缓存--作废
//    pageList.stream().forEach(item -> {
//      item.setBlogLabelList(CacheManager.getBlogLabelNameListCache(item.getLabelIds()));
//      item.setBlogCategoryVO(CacheManager.getBlogCategoryAllMapCache().getOrDefault(item.getCategoryId(), new BlogCategoryVO()));
//      item.setBlogTopicVO(CacheManager.getBlogTopicInfoCacheMap().getOrDefault(item.getTopicId(), new BlogTopicVO()));
//    });

    return new PageResult<>(new ArrayList<>(pageList), count);
  }
}
