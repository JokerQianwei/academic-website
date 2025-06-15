---
title: "Efficient Neural Architecture Search for Edge Computing"
date: 2024-06-10
draft: false
type: "publication"

# 论文基本信息
authors: ["李明", "张伟", "陈强"]
publication: "Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
year: 2024
pages: "12345-12354"
doi: "10.1109/CVPR.2024.1234567"

# 分类标签
categories: ["神经架构搜索", "边缘计算"]
tags: ["神经架构搜索", "边缘计算", "模型压缩", "移动设备"]
keywords: ["neural architecture search", "edge computing", "model compression", "mobile devices"]

# 论文状态
featured: true
open_access: false

# 影响因子和引用
impact_factor: 45.17
citations: 89

# 摘要
abstract: "本文提出了一种面向边缘计算的高效神经架构搜索方法。通过引入硬件感知的搜索策略和多目标优化技术，我们的方法能够在保持模型精度的同时，显著降低计算复杂度和内存占用。在多个移动设备上的实验表明，我们的方法相比现有技术在推理速度上提升了3.2倍，同时保持了相当的准确率。"

# 链接
links:
  - name: "PDF"
    url: "/papers/nas-edge-2024.pdf"
    icon: "file-pdf"
  - name: "代码"
    url: "https://github.com/ai-lab/efficient-nas"
    icon: "code"
  - name: "补充材料"
    url: "/papers/nas-edge-2024-supp.pdf"
    icon: "file-alt"

# 资助信息
funding:
  - "国家重点研发计划 (2021YFB1715200)"
  - "华为创新研究计划"
---

## 研究动机

随着移动设备和物联网的普及，在资源受限的边缘设备上部署深度学习模型成为重要需求。传统的神经架构搜索方法主要关注模型精度，忽略了硬件约束，导致搜索到的模型难以在边缘设备上高效运行。

## 方法概述

### 1. 硬件感知搜索空间
我们设计了一个专门针对边缘设备的搜索空间，包含：
- 轻量级卷积操作（深度可分离卷积、组卷积）
- 高效的激活函数（ReLU6、Swish）
- 自适应池化层

### 2. 多目标优化策略
采用帕累托最优的方法同时优化：
- 模型精度
- 推理延迟
- 内存占用
- 能耗

### 3. 渐进式搜索算法
通过渐进式的搜索策略，从简单到复杂逐步优化网络结构，提高搜索效率。

## 实验结果

### 性能对比

| 模型 | 精度 (%) | 延迟 (ms) | 内存 (MB) | FLOPs (M) |
|------|----------|-----------|-----------|-----------|
| MobileNetV3 | 75.2 | 23.1 | 5.4 | 219 |
| EfficientNet-B0 | 77.1 | 31.7 | 5.3 | 390 |
| **Ours** | **76.8** | **7.2** | **3.1** | **156** |

### 设备测试结果

在不同移动设备上的测试结果：

- **iPhone 12**: 推理速度提升 3.2倍
- **Samsung Galaxy S21**: 推理速度提升 2.8倍  
- **Raspberry Pi 4**: 推理速度提升 4.1倍

## 主要贡献

1. **硬件感知的搜索空间设计**: 专门针对边缘设备特点设计的搜索空间
2. **多目标优化框架**: 同时考虑精度、延迟、内存等多个指标
3. **高效的搜索算法**: 相比传统方法搜索时间减少80%
4. **广泛的实验验证**: 在多种设备和数据集上验证了方法的有效性

## 结论

本文提出的边缘计算导向的神经架构搜索方法能够有效平衡模型性能和硬件约束，为在资源受限设备上部署深度学习模型提供了新的解决方案。未来工作将进一步探索动态神经网络和自适应推理策略。
