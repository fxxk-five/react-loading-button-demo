import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('loading button demo', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('sets only the clicked task to loading and restores it after completion', async () => {
    vi.useFakeTimers()

    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /发送通知/ }))

    expect(screen.getByRole('button', { name: /发送中/ })).toBeDisabled()
    expect(screen.getByRole('button', { name: /批量同意/ })).toBeEnabled()

    await act(async () => {
      vi.advanceTimersByTime(900)
    })

    expect(screen.getByRole('button', { name: /发送通知/ })).toBeEnabled()
    expect(screen.getByText('已完成 1 / 3')).toBeInTheDocument()
  })

  it('keeps batch action loading until every task completes', async () => {
    vi.useFakeTimers()

    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /批量操作/ }))

    const list = screen.getByLabelText('批量任务列表')
    const taskButtons = within(list).getAllByRole('button')
    expect(taskButtons).toHaveLength(3)
    taskButtons.forEach((button) => {
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
    expect(screen.getByRole('button', { name: /批量处理中/ })).toBeDisabled()

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByRole('button', { name: /批量处理中/ })).toBeDisabled()
    expect(screen.getByText('已完成 0 / 3')).toBeInTheDocument()
    within(list).getAllByRole('button').forEach((button) => {
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    await act(async () => {
      vi.advanceTimersByTime(1500)
    })

    expect(screen.getByRole('button', { name: /批量操作/ })).toBeEnabled()
    expect(screen.getByText('已完成 3 / 3')).toBeInTheDocument()
  })
})
