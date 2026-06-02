import { useState } from 'react'
import { BotIcon } from 'lucide-react'

import { EmailCodeSignIn } from '#/components/auth/email-code-sign-in'
import { EmailCodeSignUp } from '#/components/auth/email-code-sign-up'

export function AuthFlow() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')

  return (
    <div className="mx-auto flex min-h-[540px] max-w-md flex-col justify-center">
      <div className="mb-8">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <BotIcon />
        </div>
        {mode === 'sign-in' ? (
          <>
            <h2 className="text-3xl font-semibold tracking-tight">
              Sign in to ExcelBot
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your email and Clerk will send a verification PIN.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use your email to sign up, then verify the PIN from Clerk.
            </p>
          </>
        )}
      </div>

      {mode === 'sign-in' ? (
        <EmailCodeSignIn onSwitchMode={() => setMode('sign-up')} />
      ) : (
        <EmailCodeSignUp onSwitchMode={() => setMode('sign-in')} />
      )}
    </div>
  )
}
