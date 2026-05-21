# Terminal Launcher

多终端管理工具，支持一键启动常用 CLI 工具。基于 Electron 和 React 构建，可帮助用户快速管理和启动多个终端会话。

## 功能特性

- 🚀 **一键启动**：同时启动多个终端窗口
- 📁 **终端组管理**：创建和管理不同的终端配置组
- 💾 **本地存储**：配置自动保存到本地
- 🎨 **简洁界面**：现代化的 UI 设计，易于使用
- 🔧 **跨平台支持**：支持 Windows、macOS 和 Linux

## 技术栈

- **Electron** - 桌面应用框架
- **React 18** - 前端 UI 库
- **Vite** - 构建工具
- **LocalStorage** - 数据持久化

## 项目结构

```
terminal-launcher/
├── electron/           # Electron 主进程代码
│   ├── main.js        # 主进程入口
│   ├── preload.js     # 预加载脚本
│   └── ipc.js         # IPC 通信配置
├── src/               # React 前端源码
│   ├── components/    # React 组件
│   │   ├── AddGroupDialog.jsx
│   │   ├── TerminalGroup.jsx
│   │   ├── TerminalItem.jsx
│   │   └── Toolbar.jsx
│   ├── styles/        # 样式文件
│   ├── utils/         # 工具函数
│   │   └── storage.js
│   ├── App.jsx        # 主应用组件
│   └── main.jsx       # React 入口
├── dist/              # 构建输出目录
├── index.html         # HTML 模板
├── package.json       # 项目配置
└── vite.config.js     # Vite 配置
```

## 安装与使用

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器和 Electron 应用：

```bash
# 仅启动 Vite 开发服务器
npm run dev

# 同时启动 Vite 和 Electron
npm run electron:dev
```

### 构建生产版本

```bash
# 构建前端资源
npm run build

# 构建并打包 Electron 应用
npm run dist
```

### 运行 Electron

```bash
# 运行生产模式的 Electron 应用
npm run electron
```

## 使用方法

1. **创建终端组**：点击工具栏的"+"按钮，添加新的终端组
2. **配置终端**：为每个组添加需要启动的终端命令和工作目录
3. **一键启动**：点击组卡片上的"启动"按钮，同时打开该组所有终端

## 配置说明

每个终端组包含以下配置：
- **组名称**：标识终端组的名称
- **终端列表**：包含多个终端配置
  - **名称**：终端显示名称
  - **工作目录**：终端启动时的初始目录
  - **启动命令**：可选，终端启动后自动执行的命令

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
