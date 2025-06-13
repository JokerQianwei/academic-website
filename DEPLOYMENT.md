# 部署指南

本文档详细说明如何将学术课题组网站部署到 GitHub Pages。

## 📋 部署前准备

### 1. 安装必要软件

#### Hugo 安装

**macOS:**
```bash
# 使用 Homebrew
brew install hugo

# 或下载二进制文件
curl -L https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_extended_0.121.1_darwin-universal.tar.gz -o hugo.tar.gz
tar -xzf hugo.tar.gz
sudo mv hugo /usr/local/bin/
```

**Windows:**
```bash
# 使用 Chocolatey
choco install hugo-extended

# 或使用 Scoop
scoop install hugo-extended
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install hugo

# 或下载二进制文件
wget https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_extended_0.121.1_linux-amd64.tar.gz
tar -xzf hugo_extended_0.121.1_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/
```

#### 验证安装

```bash
hugo version
# 应该显示版本信息，如：hugo v0.121.1+extended
```

### 2. 本地测试

```bash
# 进入项目目录
cd academic-website

# 启动开发服务器
hugo server

# 在浏览器中访问 http://localhost:1313
```

## 🚀 GitHub Pages 部署

### 方法一：自动部署（推荐）

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 创建新仓库，命名为 `academic-website`
   - 不要初始化 README、.gitignore 或 LICENSE

2. **推送代码到 GitHub**
   ```bash
   # 初始化 Git 仓库（如果还没有）
   git init
   
   # 添加远程仓库
   git remote add origin https://github.com/YOUR_USERNAME/academic-website.git
   
   # 添加所有文件
   git add .
   
   # 提交
   git commit -m "Initial commit: Academic website"
   
   # 推送到 GitHub
   git branch -M main
   git push -u origin main
   ```

3. **配置 GitHub Pages**
   - 进入仓库的 Settings 页面
   - 找到 "Pages" 设置
   - 在 "Source" 中选择 "GitHub Actions"
   - GitHub Actions 会自动检测到 `.github/workflows/hugo-deploy.yml` 文件

4. **等待部署完成**
   - 查看 Actions 页面的部署状态
   - 部署成功后，网站将在 `https://YOUR_USERNAME.github.io/academic-website` 可用

### 方法二：手动部署

1. **本地构建**
   ```bash
   # 构建网站
   hugo --minify
   
   # 构建结果在 public/ 目录
   ```

2. **部署到 gh-pages 分支**
   ```bash
   # 安装 gh-pages 工具
   npm install -g gh-pages
   
   # 部署
   gh-pages -d public
   ```

3. **配置 GitHub Pages**
   - 在仓库设置中选择 `gh-pages` 分支作为源

## 🔧 自定义域名（可选）

### 1. 购买域名

从域名注册商购买域名，如 `your-lab.com`。

### 2. 配置 DNS

在域名注册商的 DNS 设置中添加以下记录：

```
类型    名称    值
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR_USERNAME.github.io
```

### 3. 配置 GitHub Pages

1. 在仓库设置的 Pages 部分
2. 在 "Custom domain" 中输入您的域名
3. 勾选 "Enforce HTTPS"

### 4. 更新配置文件

修改 `config.yaml` 中的 `baseURL`：

```yaml
baseURL: 'https://your-lab.com'
```

## 📊 监控和维护

### 1. 监控部署状态

- 查看 GitHub Actions 的运行状态
- 设置邮件通知以获取部署失败警报

### 2. 定期更新

```bash
# 更新内容后
git add .
git commit -m "Update content"
git push origin main

# 自动触发重新部署
```

### 3. 备份

定期备份重要内容：

```bash
# 备份到其他 Git 仓库
git remote add backup https://github.com/YOUR_USERNAME/academic-website-backup.git
git push backup main
```

## 🔍 故障排除

### 常见问题

1. **部署失败**
   ```bash
   # 检查 Hugo 版本
   hugo version
   
   # 本地测试构建
   hugo --minify
   
   # 查看详细错误
   hugo --verbose
   ```

2. **样式不显示**
   - 检查 `baseURL` 配置
   - 确保 CSS 文件路径正确
   - 清除浏览器缓存

3. **图片不显示**
   - 检查图片路径
   - 确保图片文件存在
   - 检查文件名大小写

4. **404 错误**
   - 检查文件路径
   - 确保 `draft: false`
   - 重新构建网站

### 调试步骤

1. **本地调试**
   ```bash
   hugo server --verbose --debug
   ```

2. **检查构建日志**
   - 查看 GitHub Actions 的详细日志
   - 查找错误信息

3. **验证配置**
   ```bash
   # 检查配置文件语法
   hugo config
   ```

## 📈 性能优化

### 1. 图片优化

```bash
# 使用 ImageMagick 压缩图片
convert input.jpg -quality 85 -resize 800x600 output.jpg

# 批量处理
for img in *.jpg; do
    convert "$img" -quality 85 -resize 800x600 "optimized_$img"
done
```

### 2. 启用压缩

在 `config.yaml` 中：

```yaml
minify:
  disableCSS: false
  disableHTML: false
  disableJS: false
  disableJSON: false
  disableSVG: false
  disableXML: false
```

### 3. CDN 配置

考虑使用 Cloudflare 等 CDN 服务来加速网站访问。

## 🔒 安全考虑

### 1. 敏感信息

- 不要在代码中包含敏感信息
- 使用环境变量存储 API 密钥
- 定期检查提交历史

### 2. 依赖更新

```bash
# 定期更新 Hugo
brew upgrade hugo  # macOS

# 检查安全漏洞
hugo security
```

### 3. HTTPS

- 始终使用 HTTPS
- 配置安全头部
- 定期检查 SSL 证书

## 📞 获取支持

如果遇到问题：

1. **查看文档**
   - [Hugo 官方文档](https://gohugo.io/documentation/)
   - [GitHub Pages 文档](https://docs.github.com/en/pages)

2. **社区支持**
   - [Hugo 论坛](https://discourse.gohugo.io/)
   - [GitHub Issues](https://github.com/gohugoio/hugo/issues)

3. **联系维护者**
   - 项目 Issues 页面
   - 邮件联系


