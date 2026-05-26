"use client"

import { useEffect, useState } from "react"
import { Fustat, Inter, Noto_Sans, Schibsted_Grotesk } from "next/font/google"
import { ModelSelector } from "@/components/ui/model-selector"
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation"

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const fustat = Fustat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UpArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 14V4M9 4L4.75 8.25M9 4L13.25 8.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1L7.35 4.18L10.8 4.47L8.18 6.73L8.96 10.1L6 8.32L3.04 10.1L3.82 6.73L1.2 4.47L4.65 4.18L6 1Z" fill="currentColor" />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 7.25L8.42 3.83C9.35 2.9 10.86 2.9 11.79 3.83C12.72 4.76 12.72 6.27 11.79 7.2L7.64 11.35C6.28 12.71 4.07 12.71 2.71 11.35C1.35 9.99 1.35 7.78 2.71 6.42L6.86 2.27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MicrophoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 8.4A2.1 2.1 0 0 0 9.1 6.3V3.5A2.1 2.1 0 1 0 4.9 3.5V6.3A2.1 2.1 0 0 0 7 8.4Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11.2 6.3A4.2 4.2 0 0 1 2.8 6.3M7 10.5V12.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IndigenLogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 28.4356C16.5306 28.4357 13.3035 30.2166 11.4521 33.1512L9.1543 36.7934L10.0371 37.3511C10.3132 37.5101 10.5937 37.6622 10.8779 37.8082L13.1436 34.2188C14.6285 31.8648 17.2171 30.437 20 30.4369C22.783 30.4369 25.3714 31.8647 26.8564 34.2188L29.1211 37.8082C29.4053 37.6623 29.6858 37.5101 29.9619 37.3511L30.8457 36.7934L28.5479 33.1512C26.6964 30.2165 23.4695 28.4356 20 28.4356ZM20.123 36.4428L20 36.4379C19.3855 36.4381 18.8239 36.774 18.5312 37.3072L18.4766 37.4166L17.3691 39.834C18.0662 39.9256 18.7744 39.9821 19.4922 40L20 38.8914L20.5068 40C21.2249 39.9821 21.9335 39.9256 22.6309 39.834L21.5244 37.4166L21.4697 37.3072C21.1966 36.8096 20.689 36.4842 20.123 36.4428ZM21 12.4063V0H19V12.4063L15.7891 0.422921L13.8574 0.940585L17.0674 12.923L10.8662 2.18005L9.13379 3.18021L15.335 13.9222L6.56543 5.15124L5.15039 6.56651L13.9199 15.3375L3.17969 9.13529L2.17969 10.868L12.9209 17.0702L0.94043 13.8597L0.422852 15.7917L12.4053 19.0031H0V21.0035H12.4053L0.422852 24.2149L0.94043 26.1469L12.9209 22.9354L2.17969 29.1386L3.17969 30.8713L13.9199 24.6681L5.15039 33.4401L6.56543 34.8554L13.1216 28.2964C13.684 27.7337 14 26.9706 14 26.175V20.435C14 17.1209 16.6865 14.4342 20 14.434C23.3137 14.434 26 17.1208 26 20.435V26.1759C26 26.9716 26.316 27.7347 26.8785 28.2974L33.4346 34.8554L34.8496 33.4401L26.0801 24.6691L36.8203 30.8713L37.8203 29.1386L27.0791 22.9354L39.0596 26.1469L39.5771 24.2149L27.5957 21.0035H40V19.0031H27.5947L39.5771 15.7917L39.0596 13.8597L27.0791 17.0692L37.8203 10.868L36.8203 9.13529L26.0781 15.3375L34.8496 6.56554L33.4355 5.15124L24.6641 13.9232L30.8662 3.18021L29.1338 2.18005L22.9316 12.923L26.1426 0.940585L24.2109 0.422921L21 12.4063ZM20 32.4372C18.0122 32.4374 16.1792 33.5112 15.207 35.2453L13.2021 38.8201C13.8407 39.051 14.4942 39.2501 15.1611 39.4159L16.9512 36.224C17.5694 35.1209 18.7357 34.4377 20 34.4376C21.2645 34.4376 22.4305 35.1208 23.0488 36.224L24.8379 39.4159C25.5048 39.2502 26.1583 39.0509 26.7969 38.8201L24.793 35.2453C23.8208 33.5111 21.9879 32.4372 20 32.4372Z"
        fill="#ffffff"
      />
    </svg>
  )
}

function HeroBadge() {
  return (
    <div
      className={`${inter.className} flex items-center gap-2 rounded-full bg-white text-sm text-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]`}
      style={{ padding: "2px 5px 2px 2px" }}
    >
      <span
        className="flex items-center gap-1 rounded-full bg-[#7c3f2c] text-xs font-medium text-white"
        style={{ padding: "4px 8px" }}
      >
        <StarIcon />
        New
      </span>
      <span style={{ paddingRight: "4px" }}>PowerPoint Presentations</span>
    </div>
  )
}

function ChatInputBox() {
  const actionClass = "flex h-8 items-center gap-1.5 text-xs font-medium text-black/60"
  const typingPrompts = [
    "What does San cosmology say about the Milky Way?",
    "Tell me about traditional Zulu medicinal plants for healing.",
    "How did Khoi-San communities use stars for navigation?",
  ]
  const quickPrompts = [
    "Myths and legend",
    "Pastoralism & Ecology",
    "Traditional medicine",
    "Rock art astronomy",
    "Regenerative agriculture",
  ]
  const [promptIndex, setPromptIndex] = useState(0)
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const currentTypingPrompt = typingPrompts[promptIndex]
  const animatedPlaceholder = currentTypingPrompt.slice(0, visibleCharacters)

  useEffect(() => {
    const isComplete = visibleCharacters === currentTypingPrompt.length
    const isCleared = visibleCharacters === 0
    const delay = isComplete && !isDeleting ? 1400 : isDeleting ? 24 : 42

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && isCleared) {
        setIsDeleting(false)
        setPromptIndex((index) => (index + 1) % typingPrompts.length)
        return
      }

      setVisibleCharacters((count) => count + (isDeleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [currentTypingPrompt, isDeleting, typingPrompts.length, visibleCharacters])

  return (
    <div className="flex w-full max-w-[728px] flex-col items-center" style={{ gap: "12px" }}>
      <div
        className={`${schibsted.className} relative flex w-full flex-col rounded-[18px] bg-black/25 text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-md`}
        style={{ height: "178px", padding: "8px" }}
      >
        <div className="relative z-20 flex items-center justify-between text-xs font-medium" style={{ padding: "0 4px" }}>
          <div className="flex items-center gap-2">
            <span>60/450 credits</span>
            <button
              className="rounded-full bg-[#2f7d46] py-1 text-[11px] font-semibold text-white"
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              Upgrade
            </button>
          </div>
          <span className="text-xs font-medium text-white/70">0/3,000</span>
        </div>

        <div
          className="absolute z-10 flex items-start rounded-xl bg-white shadow-[0_12px_34px_rgba(0,0,0,0.16)]"
          style={{ left: "8px", right: "8px", top: "36px", bottom: "8px", padding: "18px 18px 46px" }}
        >
          <input
            className={`${notoSans.className} min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-black/60`}
            placeholder={animatedPlaceholder || " "}
            aria-label="Research question"
          />
        </div>

        <div className="absolute z-20 flex items-center justify-between" style={{ left: "22px", right: "22px", bottom: "18px" }}>
          <div className="flex items-center">
            <button className={actionClass} style={{ padding: "0 10px" }}>
              <PaperclipIcon />
              Attach
            </button>
            <span aria-hidden="true" className="h-4 w-px bg-black/15" />
            <button className={actionClass} style={{ padding: "0 10px" }}>
              <MicrophoneIcon />
              Voice
            </button>
            <span aria-hidden="true" className="h-4 w-px bg-black/15" />
            <ModelSelector />
          </div>
          <button className="grid size-9 place-items-center rounded-full bg-[#7c3f2c] text-white" aria-label="Submit question">
            <UpArrowIcon />
          </button>
        </div>
      </div>

      <div className={`${inter.className} flex flex-nowrap items-center justify-center gap-1.5`}>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/12 font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-colors hover:bg-white/18"
            style={{ padding: "4px 10px", fontSize: "11px" }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function IndigenHero() {
  const navItems = ["Platform", "Features", "Pricing"]

  return (
    <div className={`${schibsted.className} relative size-full min-h-[520px] overflow-hidden bg-[#0b0f0c] text-white`}>
      <div className="absolute inset-0 z-0">
        <SmokeBackground smokeColor="#2f7d46" secondaryColor="#7c3f2c" />
      </div>

      <div className="relative z-10 flex min-h-[520px] flex-col" style={{ paddingLeft: "120px", paddingRight: "120px" }}>
        <nav className="flex items-center justify-between" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          <a href="#" className="flex items-center gap-2 text-2xl font-semibold tracking-[-1.44px] text-white">
            <IndigenLogoIcon />
            Indigen
          </a>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item} href="#" className="flex items-center gap-1 text-base font-medium tracking-[-0.2px] text-white">
                {item}
                {item === "Features" ? <ChevronDownIcon /> : null}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="h-11 w-[82px] rounded-full bg-transparent text-base font-medium tracking-[-0.2px] text-white">
              Sign Up
            </button>
            <button className="h-11 w-[101px] rounded-full bg-[#7c3f2c] text-base font-medium tracking-[-0.2px] text-white">
              Log In
            </button>
          </div>
        </nav>

        <main className="flex flex-1 flex-col items-center justify-center gap-[44px]" style={{ transform: "translateY(68px)" }}>
          <div className="flex flex-col items-center gap-[17px] text-center">
            <HeroBadge />
            <div
              role="heading"
              aria-level={1}
              className={`${fustat.className} text-[80px] font-bold leading-none tracking-[-4.8px] text-white`}
            >
              Indigenous Knowledge
              <br />
              At Your Fingertips
            </div>
            <p className={`${fustat.className} w-[610px] max-w-[736px] text-lg font-medium leading-snug tracking-[-0.2px] text-[#d9a441]`}>
              Indigen is an infinite library dedicated to the study and preservation of Southern African Indigenous Knowledge Systems.
            </p>
          </div>

          <ChatInputBox />
        </main>
      </div>
    </div>
  )
}
