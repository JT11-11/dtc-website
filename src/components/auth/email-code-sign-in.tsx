import { useSignIn } from '@clerk/clerk-react'
import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { AuthError } from '#/components/auth/auth-error'
import { getClerkErrorMessage } from '#/lib/clerk-utils'
import { OtpInput } from '#/components/auth/otp-input'

export function EmailCodeSignIn({ onSwitchMode }: { onSwitchMode: () => void }) {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded) return

    setIsSubmitting(true)
    setError(null)

    try {
      const signInAttempt = await signIn.create({ identifier: email })
      const emailCodeFactor = signInAttempt.supportedFirstFactors?.find(
        (factor) =>
          factor.strategy === 'email_code' && 'emailAddressId' in factor,
      )

      if (!emailCodeFactor) {
        throw new Error('Email PIN sign-in is not enabled for this account.')
      }

      await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: String(emailCodeFactor.emailAddressId),
      })
      setStep('code')
    } catch (cause) {
      setError(getClerkErrorMessage(cause))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function submitCode(codeToSubmit: string) {
    if (!isLoaded || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: codeToSubmit,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        return
      }

      setError('Clerk needs another verification step before signing you in.')
    } catch (cause) {
      setError(getClerkErrorMessage(cause))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (code.length === 6) {
      submitCode(code)
    }
  }, [code])

  async function handleCodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitCode(code)
  }

  return (
    <>
      {step === 'email' ? (
        <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
          <Input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            type="email"
            value={email}
            className="h-11 rounded-xl border-gray-200 bg-white px-4 text-sm focus-visible:border-black focus-visible:ring-0"
          />
          {error ? <AuthError message={error} /> : null}
          <Button
            disabled={isSubmitting || !email}
            type="submit"
            className="h-11 w-full rounded-xl bg-black font-medium text-white hover:bg-black/90 transition-all cursor-pointer"
          >
            {isSubmitting ? 'Sending PIN...' : 'Continue with email'}
          </Button>
        </form>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleCodeSubmit}>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Verify your email</h2>
            <p className="mt-1.5 text-xs text-gray-500 max-w-[320px] mx-auto leading-relaxed">
              We have shared a 6-digit PIN to your registered email address{' '}
              <span className="font-medium text-gray-800 break-all">{email}</span>
            </p>
          </div>

          <OtpInput
            value={code}
            onChange={setCode}
            disabled={isSubmitting}
            error={!!error}
          />

          {/* Status indicators */}
          <div className="flex flex-col items-center justify-center min-h-[24px]">
            {isSubmitting ? (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="animate-spin h-3.5 w-3.5 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying PIN...</span>
              </div>
            ) : error ? (
              <AuthError message={error} />
            ) : code.length === 6 ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                <svg viewBox="0 0 24 24" className="size-4 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>Passcode matched</span>
              </div>
            ) : null}
          </div>

          <div className="flex justify-center pt-1">
            <button
              disabled={isSubmitting}
              onClick={() => {
                setStep('email')
                setCode('')
                setError(null)
              }}
              type="button"
              className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2 cursor-pointer"
            >
              Use a different email
            </button>
          </div>
        </form>
      )}
    </>
  )
}
