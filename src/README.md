# Agentimate - 从想法到设计的智能助手

Agentimate是一个AI驱动的设计工具，帮助用户将想法转化为精美的设计作品。无论是网页设计、移动应用UI、logo还是插画，只需描述您的想法，Agentimate就能为您创建令人惊叹的设计。

## 项目结构

```
src/
├── index.html      # 主HTML文件
├── styles.css      # CSS样式表
├── script.js       # JavaScript文件
└── assets/         # 静态资源文件夹
    └── logo.svg    # Agentimate logo
```

## 功能特点

- **即时生成**：在几秒钟内将您的想法转化为精美设计
- **智能理解**：AI能够理解您的需求，创建定制设计
- **多样化风格**：支持多种设计风格，从极简主义到创意插画
- **可导出代码**：直接导出HTML/CSS代码，让您的设计立即可用

## 技术栈

- HTML5
- CSS3 (动画、弹性布局、网格布局)
- JavaScript (原生JS，无依赖)

## 运行指南

这是一个纯前端项目，可以通过以下步骤在本地运行：

1. 克隆此仓库：
   ```
   git clone https://github.com/yourusername/agentimate.git
   ```

2. 进入项目目录：
   ```
   cd agentimate
   ```

3. 使用任意HTTP服务器启动项目，例如：
   ```
   python -m http.server
   ```
   或使用Visual Studio Code的Live Server插件。

4. 在浏览器中访问：`http://localhost:8000`

## 响应式设计

Agentimate的登陆页面采用完全响应式设计，在不同设备上都能提供出色的用户体验：

- 桌面电脑 (1200px+)
- 平板电脑 (768px - 1199px)
- 移动设备 (小于768px)

## 动画效果

页面包含多种精心设计的动画效果：

- 滚动触发的元素动画
- 悬停效果
- 3D变换
- 打字动画
- 渐变文本
- 加载动画

## 自定义

您可以通过修改CSS变量轻松自定义网站主题：

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #10b981;
    /* 其他变量... */
}
```

## 联系方式

- 网站：[agentimate.com](https://agentimate.com)
- 邮箱：contact@agentimate.com
- Twitter：[@agentimate](https://twitter.com/agentimate)

## 许可证

MIT License 