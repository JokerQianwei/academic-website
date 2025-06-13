# 图片资源目录

这个目录用于存放网站的图片资源。

## 目录结构

```
images/
├── members/          # 成员头像
│   ├── zhang-wei.jpg
│   ├── li-ming.jpg
│   └── wang-li.jpg
├── publications/     # 论文相关图片
│   ├── paper1-cover.jpg
│   └── paper2-diagram.png
├── logo.png         # 网站 Logo
├── favicon.ico      # 网站图标
└── og-image.jpg     # 社交媒体分享图片
```

## 图片规格建议

### 成员头像
- **尺寸**: 400x400 像素
- **格式**: JPG 或 PNG
- **文件大小**: < 200KB
- **命名**: 使用成员文件名，如 `zhang-wei.jpg`

### 论文图片
- **尺寸**: 根据需要，建议不超过 1200px 宽度
- **格式**: JPG 或 PNG
- **文件大小**: < 500KB

### 网站图标
- **Logo**: 建议 200x200 像素，PNG 格式
- **Favicon**: 32x32 像素，ICO 格式
- **OG Image**: 1200x630 像素，用于社交媒体分享

## 使用说明

1. 将图片文件放置在相应的子目录中
2. 在 Markdown 文件中使用相对路径引用：
   ```markdown
   ![描述](/images/members/zhang-wei.jpg)
   ```
3. 确保图片文件名与内容文件中的引用一致

## 优化建议

- 使用图片压缩工具减小文件大小
- 为不同设备提供不同尺寸的图片
- 使用 WebP 格式以获得更好的压缩效果（如果浏览器支持）
