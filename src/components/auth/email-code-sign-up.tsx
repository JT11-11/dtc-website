import { useSignUp } from '@clerk/clerk-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { AuthError } from '#/components/auth/auth-error'
import { getClerkErrorMessage } from '#/lib/clerk-utils'

export function EmailCodeSignUp({ onSwitchMode }: { onSwitchMode: () => void }) {
  const { isLoaded, signUp, setActive } = useSignUp()
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
      await signUp.create({ emailAddress: email })
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      setStep('code')
    } catch (cause) {
      setError(getClerkErrorMessage(cause))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded) return

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signUp.attemptEmailAddressVerification({ code })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        return
      }

      setError('Clerk needs another verification step before creating your account.')
    } catch (cause) {
      setError(getClerkErrorMessage(cause))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {step === 'email' ? (
        <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <Input
              autoComplete="email"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>
          {error ? <AuthError message={error} /> : null}
          <Button disabled={isSubmitting || !email} type="submit">
            {isSubmitting ? 'Sending PIN...' : 'Create account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              className="font-medium text-foreground underline-offset-4 hover:underline cursor-pointer"
              onClick={onSwitchMode}
              type="button"
            >
              Sign in
            </button>
          </p>
        </form>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleCodeSubmit}>
          <p className="text-sm leading-6 text-muted-foreground">
            Enter the PIN sent to {email} to finish creating your account.
          </p>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Verification PIN
            <Input
              autoComplete="one-time-code"
              inputMode="numeric"
              onChange={(event) => setCode(event.target.value)}
              placeholder="123456"
              required
              value={code}
            />
          </label>
          {error ? <AuthError message={error} /> : null}
          <Button disabled={isSubmitting || !code} type="submit">
            {isSubmitting ? 'Verifying...' : 'Verify and continue'}
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() => {
              setStep('email')
              setCode('')
              setError(null)
            }}
            type="button"
            variant="ghost"
          >
            Use a different email
          </Button>
        </form>
      )}
    </>
  )
}
