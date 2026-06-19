import { useMemo, useState } from 'react'
import './App.css'
import { LoadingButton } from './components/LoadingButton'

type TaskStatus = 'idle' | 'loading' | 'done'

type DemoTask = {
  id: string
  label: string
  loadingText: string
  duration: number
  status: TaskStatus
}

const BATCH_COOLDOWN_MS = 3000

const initialTasks: DemoTask[] = [
  { id: 'notice', label: '发送通知', loadingText: '发送中', duration: 900, status: 'idle' },
  { id: 'approve', label: '批量同意', loadingText: '处理中', duration: 1600, status: 'idle' },
  { id: 'export', label: '导出记录', loadingText: '处理中', duration: 2400, status: 'idle' },
]

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

function App() {
  const [tasks, setTasks] = useState<DemoTask[]>(initialTasks)
  const [batchLoading, setBatchLoading] = useState(false)
  const [lastBatchStartedAt, setLastBatchStartedAt] = useState<number | null>(null)
  const [rateLimitMessage, setRateLimitMessage] = useState('')

  const doneCount = useMemo(
    () => tasks.filter((task) => task.status === 'done').length,
    [tasks],
  )

  async function runTask(taskId: string) {
    const task = tasks.find((item) => item.id === taskId)
    if (!task || task.status === 'loading') return

    setTasks((current) =>
      current.map((item) =>
        item.id === taskId ? { ...item, status: 'loading' } : item,
      ),
    )
    await wait(task.duration)
    setTasks((current) =>
      current.map((item) => (item.id === taskId ? { ...item, status: 'done' } : item)),
    )
  }

  async function runBatch() {
    const now = Date.now()
    if (batchLoading) return

    if (lastBatchStartedAt !== null && now - lastBatchStartedAt < BATCH_COOLDOWN_MS) {
      setRateLimitMessage('已过滤重复触发，请稍后再试。')
      return
    }

    setLastBatchStartedAt(now)
    setRateLimitMessage('')
    setBatchLoading(true)
    setTasks((current) => current.map((task) => ({ ...task, status: 'loading' })))

    await Promise.all(tasks.map((task) => wait(task.duration)))

    setTasks((current) => current.map((task) => ({ ...task, status: 'done' })))
    setBatchLoading(false)
  }

  function resetTasks() {
    setBatchLoading(false)
    setLastBatchStartedAt(null)
    setRateLimitMessage('')
    setTasks(initialTasks)
  }

  return (
    <main className="demo-page">
      <section className="demo-hero">
        <p className="eyebrow">React 按钮组件</p>
        <h1>Loading 状态、批量操作与限频过滤</h1>
        <p>
          单个按钮点击后进入 loading，异步完成后恢复；批量操作会让所有按钮同时进入
          loading，并在全部任务完成后统一恢复。批量触发支持 3 秒限频过滤，避免短时间重复提交。
        </p>
      </section>

      <section className="demo-panel" aria-labelledby="single-title">
        <div>
          <p className="eyebrow">单条操作</p>
          <h2 id="single-title">单条记录按钮</h2>
          <p>点击任意按钮，只会影响当前记录，其他按钮仍可操作。</p>
        </div>

        <div className="task-grid" aria-label="批量任务列表">
          {tasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div>
                <h3>{task.label}</h3>
                <p>{task.status === 'done' ? '已完成' : '等待处理'}</p>
              </div>
              <LoadingButton
                loading={task.status === 'loading'}
                loadingText={task.loadingText}
                onClick={() => void runTask(task.id)}
              >
                {task.label}
              </LoadingButton>
            </article>
          ))}
        </div>
      </section>

      <section className="demo-panel demo-panel--split" aria-labelledby="batch-title">
        <div>
          <p className="eyebrow">批量操作</p>
          <h2 id="batch-title">批量按钮事件</h2>
          <p>
            批量操作用 <code>Promise.all</code> 等待全部异步任务结束，再把整体状态恢复。
            3 秒内重复点击会被限频过滤，不会重新发起任务。
          </p>
          {rateLimitMessage ? <p className="rate-limit-message">{rateLimitMessage}</p> : null}
        </div>

        <div className="batch-actions">
          <LoadingButton
            variant="primary"
            loading={batchLoading}
            loadingText="批量处理中"
            onClick={() => void runBatch()}
          >
            批量操作
          </LoadingButton>
          <LoadingButton disabled={batchLoading} onClick={resetTasks}>
            重置
          </LoadingButton>
          <p className="progress-text">已完成 {doneCount} / {tasks.length}</p>
        </div>
      </section>
    </main>
  )
}

export default App
