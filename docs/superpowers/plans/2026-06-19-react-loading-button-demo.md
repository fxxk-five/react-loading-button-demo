# React Loading Button 演示项目实施计划

> **给执行代理的要求：** 使用 TDD，小步修改。每一步完成后运行对应验证命令。

**目标：** 构建并部署一个公开的 React 按钮组件示例，覆盖单条 loading、批量 loading、统一恢复和限频过滤。

**架构：** `LoadingButton` 保持无状态，只负责按钮展示。`App` 维护任务列表、批量执行状态、最近批量触发时间和限频提示。

**技术栈：** Vite、React、TypeScript、Vitest、React Testing Library、GitHub Pages。

---

### 任务 1：测试环境

**文件：**
- 修改：`package.json`
- 修改：`vite.config.ts`
- 创建：`src/test/setup.ts`

- [x] 安装 Vitest、jsdom、React Testing Library 和 jest-dom。
- [x] 增加 `npm run test` 脚本。
- [x] 配置 jsdom 和测试 setup 文件。
- [x] 确认测试命令可以运行。

### 任务 2：基础按钮行为

**文件：**
- 创建：`src/components/LoadingButton.tsx`
- 创建：`src/components/LoadingButton.css`
- 创建：`src/App.test.tsx`
- 修改：`src/App.tsx`
- 修改：`src/App.css`

- [x] 先写单条 loading 和批量 loading 的失败测试。
- [x] 运行测试，确认缺少实现时失败。
- [x] 实现 `LoadingButton` 和页面状态流转。
- [x] 运行测试，确认通过。

### 任务 3：限频过滤加分项

**文件：**
- 修改：`src/App.test.tsx`
- 修改：`src/App.tsx`
- 修改：`src/App.css`

- [x] 先写“批量操作 3 秒内重复触发会被过滤”的失败测试。
- [x] 运行测试，确认现有实现没有过滤提示。
- [x] 增加 `BATCH_COOLDOWN_MS = 3000`。
- [x] 记录最近一次批量触发时间。
- [x] 冷却期内重复点击时显示过滤提示，不重新启动任务。
- [x] 运行测试，确认通过。

### 任务 4：中文文档与部署

**文件：**
- 修改：`README.md`
- 修改：`docs/superpowers/specs/2026-06-19-react-loading-button-demo-design.md`
- 修改：`docs/superpowers/plans/2026-06-19-react-loading-button-demo.md`
- 修改：`package.json`
- 修改：`vite.config.ts`

- [x] 将 README 改为中文。
- [x] 将设计说明改为中文。
- [x] 将实施计划改为中文。
- [x] 配置 GitHub Pages base path 和部署脚本。
- [x] 创建公开 GitHub 仓库。
- [x] 推送 main 分支。
- [x] 部署 GitHub Pages。

### 验证

- [x] `npm run test`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `rg -n "\?{3,}|\x{FF1F}{2,}|\x{FFFD}" . -g '!node_modules/**' -g '!dist/**'`
- [ ] 打开线上地址，确认页面能渲染并包含限频过滤文案。
