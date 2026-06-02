import { BotIcon, SparklesIcon } from 'lucide-react'

import { AuthFlow } from '#/components/auth/auth-flow'

export function AuthScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-background/85 shadow-2xl backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground md:flex">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent px-3 py-1 text-sm font-medium">
              <SparklesIcon data-icon="inline-start" />
              ExcelBot
            </div>
            <h1 className="max-w-md text-4xl font-semibold tracking-tight">
              Your AI workspace for spreadsheets.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Sign in or create an account with your email, verify the PIN from
              Clerk, and start a new chat from the sidebar.
            </p>
          </div>

          <div className="rounded-2xl border border-sidebar-border bg-background/70 p-4 text-sm shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-medium">
              <BotIcon data-icon="inline-start" />
              Frontend preview
            </div>
            <p className="text-muted-foreground">
              Chat creation and messages are local UI state for now. Auth is
              handled by Clerk.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <AuthFlow />
        </div>
      </section>
    </main>
  )
}
