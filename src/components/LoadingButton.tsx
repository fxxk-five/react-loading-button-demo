import type { ReactNode } from 'react'
import './LoadingButton.css'

type LoadingButtonProps = {
  children: ReactNode
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function LoadingButton({
  children,
  loading = false,
  loadingText = '处理中',
  disabled = false,
  variant = 'secondary',
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      type="button"
      className={`loading-button loading-button--${variant}`}
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="loading-button__spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
