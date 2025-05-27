"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

const ToastContext = createContext({
  toasts: [],
  toast: (message: string) => {},
  dismiss: (id: string) => {},
  update: (id: string, options: any) => {},
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message: string, options: any = {}) => {
    const id = options.id || Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, ...options }])
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const update = useCallback((id: string, options: any) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, ...options } : toast)))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dismiss(toasts[0].id)
      }, 5000) // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [toasts, dismiss])

  const value = {
    toasts,
    toast,
    dismiss,
    update,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-800 text-white rounded-md p-3 shadow-lg flex items-center justify-between"
          >
            <span>{toast.message}</span>
            <button onClick={() => dismiss(toast.id)} className="ml-4 text-gray-400 hover:text-gray-300">
              X
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export const toast = (message: string, options: any = {}) => {
  const id = options.id || Math.random().toString(36).substring(2, 9)
  const event = new CustomEvent("toast", { detail: { id, message, ...options } })
  document.dispatchEvent(event)
  return id
}
