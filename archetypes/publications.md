---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false

# 论文基本信息
authors: 
  - "第一作者"
  - "**本组成员**"  # 本组成员用粗体标记
  - "其他作者"

publication: "期刊/会议名称"
publication_short: "简称"  # 期刊/会议简称
year: {{ now.Format "2006" }}

# 论文摘要
abstract: "请在这里添加论文摘要..."

# 关键词
keywords:
  - "关键词1"
  - "关键词2"
  - "关键词3"

# 相关链接
links:
  pdf: ""  # PDF 链接
  code: ""  # 代码链接（可选）
  demo: ""  # 演示链接（可选）
  slides: ""  # 幻灯片链接（可选）
  video: ""  # 视频链接（可选）
  dataset: ""  # 数据集链接（可选）

# 论文状态
featured: false  # 是否为重点论文

# 排序权重（数字越小越靠前）
weight: 10

# 分类标签
categories: ["科研成果"]
tags: ["论文"]
years: ["{{ now.Format "2006" }}"]
authors: ["本组成员"]
---

## 论文概述

请在这里添加论文的详细描述，包括：

- 研究背景和动机
- 主要贡献和创新点
- 实验结果和分析
- 结论和未来工作

## 主要贡献

1. **贡献点1**: 详细描述第一个主要贡献
2. **贡献点2**: 详细描述第二个主要贡献
3. **贡献点3**: 详细描述第三个主要贡献

## 实验结果

描述主要的实验结果，可以包含：

- 性能指标对比
- 消融实验分析
- 可视化结果展示

## 引用格式

```bibtex
@article{author{{ now.Format "2006" }},
  title={{{ .Name | title }}},
  author={作者列表},
  journal={期刊名称},
  year={{ now.Format "2006" }},
  publisher={出版社}
}
```
