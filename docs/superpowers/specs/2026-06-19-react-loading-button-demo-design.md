# React Loading Button 演示项目设计说明

## 目标

构建一个公开的 React 示例项目，用来回答远程机试题。页面需要展示一个可复用按钮组件：点击后进入 loading，异步完成后恢复；批量操作时所有按钮同时 loading，并在全部任务完成后统一恢复。加分项要求批量触发支持限频过滤。

## 范围

- 使用 Vite、React 和 TypeScript。
- 创建一个可复用的 `LoadingButton` 组件。
- 创建一个演示页面，包含单条操作、批量操作和限频过滤提示。
- README 使用中文说明题目映射、运行方式、验证方式和在线链接。
- 使用 GitHub Pages 部署公开页面。

## 组件设计

`LoadingButton` 接收 `children`、`loading`、`loadingText`、`disabled`、`variant` 和 `onClick`。组件本身不管理业务状态，只负责展示按钮、loading spinner、禁用态和 `aria-busy`。

页面负责维护任务列表。每个任务包含 id、按钮文案、loading 文案、模拟耗时和状态。单条操作只修改当前任务状态。批量操作会把所有任务设为 loading，使用 `Promise.all` 等待全部任务完成，然后统一改为完成状态。

## 限频过滤设计

批量操作记录最近一次触发时间。若用户在 3 秒冷却期内再次点击批量操作，页面只显示“已过滤重复触发，请稍后再试。”，不会重新启动任务，也不会再次让任务按钮进入 loading。

这个设计更贴近真实业务系统中的批量提交保护：按钮 loading 处理进行中的重复点击，限频过滤处理短时间内重复触发的批量请求。

## 错误处理

当前演示使用确定性的模拟异步任务，不引入失败分支。真实项目中可以把任务状态扩展为 `failed`，但按钮组件 API 不需要改变。

## 测试

Vitest 和 React Testing Library 覆盖以下行为：

- 单个按钮点击后进入 loading，并在异步完成后恢复。
- 批量操作让所有按钮进入 loading，并在全部任务完成后统一恢复。
- 批量操作 3 秒内重复触发会被过滤，不会重新启动任务。
- loading 中的按钮禁用，并设置 `aria-busy`。

## 部署

项目使用 `gh-pages` 把 `dist` 发布到 `gh-pages` 分支。在线地址：

`https://fxxk-five.github.io/react-loading-button-demo/`
