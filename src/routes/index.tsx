import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

import { LoadingScreen } from '#/components/ui/loading-screen'
import { AuthScreen } from '#/components/auth/auth-screen'
import { ChatScreen } from '#/components/chat/chat-screen'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <ClerkLoading>
        <LoadingScreen />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <AuthScreen />
        </SignedOut>
        <SignedIn>
          <ChatScreen />
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}
