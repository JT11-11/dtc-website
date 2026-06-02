import { BotIcon } from 'lucide-react'

import type { Message } from '#/types/chat'
import { cn } from '#/lib/utils'

export function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3.5', isUser && 'justify-end')}>
      {!isUser ? (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-xs">
          <BotIcon />
        </div>
      ) : null}
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-xs border',
          isUser
            ? 'bg-primary text-primary-foreground border-transparent'
            : 'bg-muted/50 text-muted-foreground border-border/40',
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
