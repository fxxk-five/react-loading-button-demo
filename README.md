# React Loading Button 演示项目

这是一个用于远程机试题的 React + TypeScript 示例项目。

题目要求：使用 React 实现一个按钮组件。单条记录点击后出现 Loading，完成后恢复；批量操作按钮点击时，批量触发按钮事件，所有按钮都开始 loading，等待所有事件完成后，批量操作按钮才恢复原状。加分项是批量触发时支持限频过滤。

## 在线链接

- GitHub 仓库：https://github.com/fxxk-five/react-loading-button-demo
- 在线访问：https://fxxk-five.github.io/react-loading-button-demo/

## 实现内容

- `LoadingButton`：无状态、可复用的按钮组件。
- 单条操作：点击某个任务按钮后，只让当前按钮进入 loading。
- 批量操作：点击 `批量操作` 后，所有任务按钮同时进入 loading。
- 统一恢复：批量模式使用 `Promise.all` 等待全部异步任务完成，再统一恢复按钮状态。
- 防重复点击：loading 中的按钮会禁用，并设置 `aria-busy`。
- 限频过滤：批量操作 3 秒内重复触发会被过滤，并显示“已过滤重复触发，请稍后再试。”。

## 项目结构

```text
src/
  App.tsx                         页面状态、单条操作、批量操作和限频过滤
  App.test.tsx                    行为测试
  components/
    LoadingButton.tsx             可复用按钮组件
    LoadingButton.css             按钮样式
```

## 本地运行

```bash
npm install
npm run dev
```

## 验证命令

```bash
npm run test
npm run lint
npm run build
```

## 部署命令

```bash
npm run deploy
```

`deploy` 会先构建项目，再把 `dist` 发布到 `gh-pages` 分支。
