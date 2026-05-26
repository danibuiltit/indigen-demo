"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Bot, Check, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const openAiIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 256 260"
    aria-hidden="true"
    style={{ flex: "0 0 auto" }}
  >
    <path
      fill="currentColor"
      d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
    />
  </svg>
)

const geminiIcon = (
  <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="indigen-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
        <stop offset="0%" stopColor="#1C7DFF" />
        <stop offset="52.021%" stopColor="#1C69FF" />
        <stop offset="100%" stopColor="#F0DCD6" />
      </linearGradient>
    </defs>
    <path
      d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"
      fill="url(#indigen-gemini-fill)"
    />
  </svg>
)

const claudeIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
)

const aiModels = ["o3-mini", "Gemini 2.5 Flash", "Claude 3.5 Sonnet", "GPT-4-1 Mini", "GPT-4-1"]

const modelIcons: Record<string, ReactNode> = {
  "o3-mini": openAiIcon,
  "Gemini 2.5 Flash": geminiIcon,
  "Claude 3.5 Sonnet": claudeIcon,
  "GPT-4-1 Mini": openAiIcon,
  "GPT-4-1": openAiIcon,
}

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState("GPT-4-1 Mini")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-8 items-center text-xs font-medium text-black/60 transition-colors hover:text-black/80"
        style={{ gap: "6px", padding: "0 10px" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={selectedModel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center"
            style={{ gap: "6px" }}
          >
            {modelIcons[selectedModel] ?? <Bot size={14} strokeWidth={1.8} aria-hidden="true" />}
            {selectedModel}
            <ChevronDown size={12} strokeWidth={1.8} aria-hidden="true" style={{ opacity: 0.5 }} />
          </motion.span>
        </AnimatePresence>
      </button>

      {isOpen ? (
        <div
          role="listbox"
          onMouseLeave={() => setIsOpen(false)}
          className="absolute bottom-full left-0 z-30 rounded-xl border border-black/10 bg-white text-black shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
          style={{ marginBottom: "8px", minWidth: "172px", padding: "6px" }}
        >
          {aiModels.map((model) => (
            <button
              key={model}
              type="button"
              role="option"
              aria-selected={selectedModel === model}
              onClick={() => {
                setSelectedModel(model)
                setIsOpen(false)
              }}
              className="flex w-full items-center justify-between rounded-lg text-left text-xs transition-colors hover:bg-black/5"
              style={{ gap: "12px", padding: "8px 9px" }}
            >
              <span className="flex items-center" style={{ gap: "8px" }}>
                {modelIcons[model] ?? <Bot size={14} strokeWidth={1.8} aria-hidden="true" />}
                {model}
              </span>
              {selectedModel === model ? <Check size={14} strokeWidth={2} aria-hidden="true" style={{ color: "#2f7d46" }} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
