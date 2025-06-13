# 内容更新指南

本指南将帮助您轻松管理和更新学术课题组网站的内容。

## 📝 基础知识

### Markdown 语法

网站内容使用 Markdown 格式编写。以下是常用语法：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

[链接文本](https://example.com)
![图片描述](/images/example.jpg)

> 引用文本

`代码`

```代码块```
```

### YAML Front Matter

每个内容文件的开头都有 YAML 配置区域，用三个短横线包围：

```yaml
---
title: "页面标题"
date: 2024-01-01
draft: false
# 其他配置...
---
```

## 👥 管理团队成员

### 添加新成员

1. **创建成员文件**
   ```bash
   hugo new members/member-name.md
   ```

2. **编辑成员信息**
   ```yaml
   ---
   title: "成员姓名"
   date: 2024-01-01
   draft: false
   
   # 基本信息
   role: "职位/职称"
   avatar: "/images/members/member-name.jpg"
   email: "email@university.edu"
   website: "https://personal-website.com"  # 可选
   
   # 研究方向
   interests: 
     - "研究方向1"
     - "研究方向2"
     - "研究方向3"
   
   # 教育背景
   education:
     - "博士学位, 某某大学, 2020年"
     - "硕士学位, 某某大学, 2017年"
     - "学士学位, 某某大学, 2015年"
   
   # 排序权重（数字越小越靠前）
   weight: 10
   
   # 分类标签
   categories: ["团队成员"]
   tags: ["研究员"]
   ---
   
   ## 个人简介
   
   在这里添加成员的详细介绍...
   
   ## 教育背景
   
   详细的教育经历...
   
   ## 研究兴趣
   
   具体的研究方向描述...
   ```

3. **添加成员头像**
   - 将头像图片放在 `static/images/members/` 目录
   - 建议尺寸：400x400 像素
   - 支持格式：JPG, PNG
   - 文件命名：与成员文件名一致

### 修改成员信息

直接编辑 `content/members/` 目录下对应的 `.md` 文件。

### 删除成员

删除 `content/members/` 目录下对应的 `.md` 文件和头像图片。

## 📚 管理科研成果

### 添加新论文

1. **创建论文文件**
   ```bash
   hugo new publications/paper-title.md
   ```

2. **编辑论文信息**
   ```yaml
   ---
   title: "论文完整标题"
   date: 2024-03-15
   draft: false
   
   # 论文基本信息
   authors: 
     - "第一作者"
     - "**本组成员**"  # 本组成员用粗体标记
     - "其他作者"
   
   publication: "期刊/会议名称"
   publication_short: "简称"
   year: 2024
   
   # 论文摘要
   abstract: "论文摘要内容..."
   
   # 关键词
   keywords:
     - "关键词1"
     - "关键词2"
     - "关键词3"
   
   # 相关链接
   links:
     pdf: "https://link-to-pdf.com"
     code: "https://github.com/repo"  # 可选
     demo: "https://demo-link.com"    # 可选
     slides: "https://slides-link.com"  # 可选
     video: "https://video-link.com"    # 可选
   
   # 论文状态
   featured: true  # 是否为重点论文
   published: true  # 是否已发表
   
   # 排序权重
   weight: 10
   
   # 分类标签
   categories: ["科研成果"]
   tags: ["论文", "会议名称"]
   years: ["2024"]
   authors: ["本组成员"]
   ---
   
   ## 论文概述
   
   详细描述论文的背景、方法、结果等...
   
   ## 主要贡献
   
   1. **贡献点1**: 描述
   2. **贡献点2**: 描述
   
   ## 实验结果
   
   展示实验数据和分析...
   ```

### 论文筛选功能

网站会自动根据 `year` 字段生成年份筛选按钮。确保每篇论文都设置了正确的年份。

### 重点论文标记

设置 `featured: true` 的论文会在首页的"重点论文"部分显示。

## 🏠 修改首页内容

编辑 `content/_index.md` 文件来修改首页内容：

```yaml
---
title: "欢迎来到我们的学术课题组"
date: 2024-01-01
draft: false
type: "homepage"
layout: "home"
---

# 课题组名称

## 研究使命

我们的研究目标和使命...

## 主要研究方向

### 研究方向1
描述...

### 研究方向2
描述...
```

## ⚙️ 网站配置

### 基本信息配置

编辑 `config.yaml` 文件：

```yaml
baseURL: 'https://your-username.github.io/academic-website'
title: '学术课题组'
params:
  author: '课题组名称'
  description: '课题组描述'
  email: 'contact@university.edu'
  phone: '+86-xxx-xxxx-xxxx'
  address: '某某大学某某学院'
```

### 菜单配置

```yaml
menu:
  main:
    - name: '首页'
      url: '/'
      weight: 10
    - name: '团队成员'
      url: '/members/'
      weight: 20
    - name: '科研成果'
      url: '/publications/'
      weight: 30
```

### 社交媒体链接

```yaml
params:
  social:
    github: 'https://github.com/your-org'
    twitter: 'https://twitter.com/your-handle'
    linkedin: 'https://linkedin.com/company/your-org'
```

## 🖼️ 图片管理

### 图片存放位置

- **成员头像**: `static/images/members/`
- **论文图片**: `static/images/publications/`
- **其他图片**: `static/images/`

### 图片引用方式

在 Markdown 中使用绝对路径：

```markdown
![描述](/images/members/zhang-wei.jpg)
```

### 图片优化建议

1. **压缩图片**: 使用工具减小文件大小
2. **合适尺寸**: 
   - 成员头像：400x400px
   - 论文图片：不超过1200px宽度
3. **文件格式**: 优先使用 JPG，透明背景使用 PNG

## 📱 预览和测试

### 本地预览

```bash
# 启动开发服务器
hugo server

# 包含草稿内容
hugo server -D

# 访问 http://localhost:1313
```

### 构建网站

```bash
# 构建生产版本
hugo --minify

# 检查构建结果
ls public/
```

## 🚀 发布更新

### 推送到 GitHub

```bash
git add .
git commit -m "更新内容描述"
git push origin main
```

### 自动部署

推送到 `main` 分支后，GitHub Actions 会自动构建和部署网站。

## 🔧 常见问题

### 1. 图片不显示

- 检查图片路径是否正确
- 确保图片文件存在
- 检查文件名大小写

### 2. 内容不更新

- 检查 `draft: false`
- 清除浏览器缓存
- 重新构建网站

### 3. 格式错误

- 检查 YAML 语法
- 确保缩进正确
- 使用 YAML 验证工具

### 4. 中文显示问题

- 确保文件编码为 UTF-8
- 检查配置文件中的语言设置

## 📞 获取帮助

如果遇到问题：

1. 查看错误日志：`hugo server --verbose`
2. 检查 Hugo 文档：https://gohugo.io/documentation/
3. 联系技术支持

## 📋 内容检查清单

发布前请检查：

- [ ] 所有图片都已添加且显示正常
- [ ] 成员信息完整准确
- [ ] 论文信息格式正确
- [ ] 链接都可以正常访问
- [ ] 在不同设备上测试显示效果
- [ ] 检查拼写和语法错误

---

*最后更新: 2024年3月*
