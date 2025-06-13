# 学术课题组网站

这是一个基于 Hugo 静态网站生成器构建的学术课题组网站，专为研究团队设计，具有现代化的界面和完整的功能。

## 🌟 特性

- **响应式设计**: 完美适配桌面、平板和手机设备
- **成员管理**: 展示团队成员信息和详细介绍
- **论文展示**: 按年份筛选的科研成果展示
- **自动部署**: 通过 GitHub Actions 自动部署到 GitHub Pages
- **SEO 优化**: 完整的 SEO 元标签和结构化数据
- **高性能**: 静态网站，加载速度快
- **易于维护**: 通过 Markdown 文件管理内容

## 📁 项目结构

```
academic-website/
├── .github/workflows/
│   └── hugo-deploy.yml          # GitHub Actions 部署配置
├── archetypes/
│   ├── default.md              # 默认内容模板
│   ├── members.md              # 成员内容模板
│   └── publications.md         # 论文内容模板
├── content/
│   ├── _index.md              # 首页内容
│   ├── members/               # 团队成员
│   │   ├── _index.md          # 成员列表页
│   │   ├── zhang-wei.md       # 示例成员1
│   │   ├── li-ming.md         # 示例成员2
│   │   └── wang-li.md         # 示例成员3
│   └── publications/          # 科研成果
│       ├── _index.md          # 论文列表页
│       ├── multimodal-attention-cvpr2024.md
│       ├── federated-learning-icml2023.md
│       └── medical-image-segmentation-miccai2022.md
├── static/
│   └── images/
│       ├── members/           # 成员头像
│       └── publications/      # 论文相关图片
├── themes/
│   └── academic/              # 自定义学术主题
│       ├── layouts/           # 页面布局模板
│       ├── static/            # 静态资源
│       └── theme.toml         # 主题配置
├── config.yaml               # 网站主配置文件
├── .gitignore               # Git 忽略文件
└── README.md                # 项目说明文档
```

## 🚀 快速开始

### 1. 环境准备

首先确保您的系统已安装以下软件：

- **Git**: 用于版本控制
- **Hugo**: 静态网站生成器（推荐版本 0.121.0+）

#### 安装 Hugo

**macOS (使用 Homebrew):**
```bash
brew install hugo
```

**Windows (使用 Chocolatey):**
```bash
choco install hugo-extended
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install hugo
```

### 2. 克隆项目

```bash
git clone https://github.com/your-username/academic-website.git
cd academic-website
```

### 3. 本地运行

```bash
# 启动开发服务器
hugo server -D

# 或者使用详细模式
hugo server --verbose --debug
```

访问 `http://localhost:1313` 查看网站。

### 4. 构建网站

```bash
# 构建生产版本
hugo --minify

# 构建后的文件在 public/ 目录中
```

## 📝 内容管理

### 添加新成员

1. 在 `content/members/` 目录下创建新的 Markdown 文件：

```bash
hugo new members/new-member-name.md
```

2. 编辑文件，填写成员信息：

```yaml
---
title: "成员姓名"
role: "职位/职称"
avatar: "/images/members/member-name.jpg"
email: "email@university.edu"
website: "https://personal-website.com"
interests: 
  - "研究方向1"
  - "研究方向2"
education:
  - "学位, 学校, 年份"
weight: 10
---

成员的详细介绍内容...
```

3. 将成员头像放置在 `static/images/members/` 目录中。

### 添加新论文

1. 创建新的论文文件：

```bash
hugo new publications/paper-title.md
```

2. 编辑论文信息：

```yaml
---
title: "论文标题"
authors: 
  - "**本组成员**"  # 本组成员用粗体
  - "其他作者"
publication: "期刊/会议名称"
year: 2024
abstract: "论文摘要..."
keywords: ["关键词1", "关键词2"]
links:
  pdf: "PDF链接"
  code: "代码链接"
featured: true  # 是否为重点论文
---

论文详细内容...
```

### 修改网站配置

编辑 `config.yaml` 文件来修改网站的基本信息：

```yaml
baseURL: 'https://your-username.github.io/academic-website'
title: '您的课题组名称'
params:
  author: '课题组名称'
  description: '课题组描述'
  email: 'contact@university.edu'
  # ... 其他配置
```

## 🚀 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建新仓库
2. 将本地代码推送到仓库：

```bash
git remote add origin https://github.com/your-username/academic-website.git
git branch -M main
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库的 Settings 页面
2. 找到 "Pages" 设置
3. 在 "Source" 中选择 "GitHub Actions"

### 3. 自动部署

项目已包含 GitHub Actions 配置文件 (`.github/workflows/hugo-deploy.yml`)，推送到 `main` 分支时会自动部署。

### 4. 访问网站

部署完成后，您的网站将在以下地址可用：
```
https://your-username.github.io/academic-website
```

## 🎨 自定义主题

### 修改样式

编辑 `themes/academic/static/css/style.css` 文件来自定义样式：

```css
:root {
    --primary-color: #2563eb;    /* 主色调 */
    --secondary-color: #64748b;  /* 次要颜色 */
    --accent-color: #f59e0b;     /* 强调色 */
    /* ... 其他颜色变量 */
}
```

### 修改布局

主题的布局文件位于 `themes/academic/layouts/` 目录：

- `_default/baseof.html`: 基础模板
- `index.html`: 首页模板
- `_default/list.html`: 列表页模板
- `_default/single.html`: 单页模板

### 添加新功能

在 `themes/academic/static/js/main.js` 中添加自定义 JavaScript 功能。

## 📱 响应式设计

网站已针对不同设备进行优化：

- **桌面**: 1200px+ 宽度
- **平板**: 768px - 1199px 宽度
- **手机**: 767px 以下宽度

## 🔧 故障排除

### 常见问题

1. **Hugo 版本问题**
   ```bash
   hugo version
   # 确保版本 >= 0.121.0
   ```

2. **主题未找到**
   ```bash
   # 确保主题目录存在
   ls themes/academic/
   ```

3. **图片不显示**
   - 检查图片路径是否正确
   - 确保图片文件存在于 `static/images/` 目录

4. **部署失败**
   - 检查 GitHub Actions 日志
   - 确保仓库设置正确

### 获取帮助

如果遇到问题，请：

1. 查看 [Hugo 官方文档](https://gohugo.io/documentation/)
2. 检查项目的 Issues 页面
3. 联系项目维护者

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！


