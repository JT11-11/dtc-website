import { useState } from 'react'

import { EmailCodeSignIn } from '#/components/auth/email-code-sign-in'
import { EmailCodeSignUp } from '#/components/auth/email-code-sign-up'

export function AuthScreen() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fbf9f4] text-[#191919] antialiased selection:bg-[#e3e1d9]">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 sm:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="size-5 text-[#cc5a37] fill-current">
            <path d="M12 2a1 1 0 0 1 1 1v7.59l6.06-3.5a1 1 0 1 1 1 1.73L14 12.33l6.06 3.5a1 1 0 1 1-1 1.73L13 14.06V21a1 1 0 1 1-2 0v-6.94l-6.06 3.5a1 1 0 1 1-1-1.73L10 12.33 3.94 8.83a1 1 0 1 1 1-1.73L11 10.59V3a1 1 0 0 1 1-1z" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-[#191919]">
            grid.ai
          </span>
        </div>

        {/* Top-right Link */}
        <a
          href="#"
          className="text-xs font-medium text-[#6e6d6a] hover:text-[#191919] transition-colors"
        >
          Meet grid.ai
        </a>
      </header>

      {/* Centered Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px] text-center">
          {/* Headline */}
          <h1 className="text-[38px] font-semibold leading-[1.15] tracking-tight text-[#191919] font-serif">
            Think fast,
            <br />
            work smarter.
          </h1>
          <p className="mt-3 text-sm text-[#6e6d6a]">
            Brainstorm in chat, analyze in grid.ai.
          </p>

          {/* Card */}
          <div className="mt-8 rounded-[24px] border border-[#e3e1d9] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-left">
            {/* Tab Switcher / Mode Indicator */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#f5f4ef] p-1 mb-6">
              <button
                onClick={() => setMode('sign-in')}
                className={`rounded-lg py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  mode === 'sign-in'
                    ? 'bg-white text-[#191919] shadow-xs'
                    : 'text-[#6e6d6a] hover:text-[#191919]'
                }`}
                type="button"
              >
                Sign in
              </button>
              <button
                onClick={() => setMode('sign-up')}
                className={`rounded-lg py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  mode === 'sign-up'
                    ? 'bg-white text-[#191919] shadow-xs'
                    : 'text-[#6e6d6a] hover:text-[#191919]'
                }`}
                type="button"
              >
                Sign up
              </button>
            </div>

            {/* Active Form */}
            {mode === 'sign-in' ? (
              <EmailCodeSignIn onSwitchMode={() => setMode('sign-up')} />
            ) : (
              <EmailCodeSignUp onSwitchMode={() => setMode('sign-in')} />
            )}

            {/* Terms Footer inside Card */}
            <p className="mt-5 text-center text-[11px] leading-relaxed text-[#9b9990]">
              By continuing, you agree to our{' '}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-[#191919] transition-colors"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-[#191919] transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
