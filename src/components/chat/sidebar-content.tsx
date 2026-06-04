import { useMemo } from 'react'
import {
  FolderIcon,
  HistoryIcon,
  LogOutIcon,
  MessageSquareIcon,
  PencilIcon,
  SearchIcon,
  SparklesIcon,
} from 'lucide-react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { Chat } from '#/types/chat'

const navItems = [
  { id: 'chats', label: 'Chats', icon: MessageSquareIcon },
  { id: 'projects', label: 'Projects', icon: FolderIcon },
  { id: 'history', label: 'History', icon: HistoryIcon },
]

export function SidebarContent({
  activeChatId,
  chats,
  onNewChat,
  onSelectChat,
  onSignOut,
  userName,
  activeNav,
  setActiveNav,
}: {
  activeChatId: string
  chats: Chat[]
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onSignOut: () => void
  userName?: string | null
  activeWorkspace: string
  setActiveWorkspace: (id: string) => void
  activeNav: string
  setActiveNav: (id: string) => void
}) {
  const groupedChats = useMemo(() => {
    return {
      Today: chats.filter((c) => c.updatedAt === 'Now'),
      Yesterday: chats.filter((c) => c.updatedAt === 'Yesterday'),
      'Previous 7 Days': chats.filter(
        (c) =>
          c.updatedAt === 'Mon' ||
          (c.updatedAt !== 'Now' && c.updatedAt !== 'Yesterday'),
      ),
    }
  }, [chats])

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
            <SparklesIcon className="size-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight">grid.ai</span>
        </div>
        <button
          onClick={onNewChat}
          className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground cursor-pointer"
          type="button"
          title="New chat"
        >
          <PencilIcon className="size-3.5" />
          <span className="sr-only">New chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <button
          className="flex w-full items-center gap-2 rounded-xl bg-sidebar-accent/60 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent cursor-pointer"
          type="button"
        >
          <SearchIcon className="size-3.5 shrink-0" />
          <span className="flex-1 text-left">Search</span>
          <kbd className="pointer-events-none hidden select-none items-center gap-0.5 rounded border border-sidebar-border/60 bg-background/60 px-1 font-mono text-[9px] font-medium text-muted-foreground/60 sm:inline-flex">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all text-left cursor-pointer',
                activeNav === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
              )}
              type="button"
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-sidebar-border/30" />

      {/* Recents label */}
      <p className="px-5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
        Recents
      </p>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto px-2 py-1 flex flex-col gap-3">
        {Object.entries(groupedChats).map(([group, groupChats]) => {
          if (groupChats.length === 0) return null
          return (
            <div key={group} className="flex flex-col gap-0.5">
              {group !== 'Today' && (
                <p className="px-3 pt-1 pb-0.5 text-[10px] font-medium text-muted-foreground/50">
                  {group}
                </p>
              )}
              {groupChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    'flex items-start gap-2 px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer',
                    chat.id === activeChatId
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/40 hover:text-foreground',
                  )}
                  type="button"
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      {/* User footer */}
      <div className="flex items-center justify-between gap-2 border-t border-sidebar-border/30 px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-semibold">
            {userName ? userName.slice(0, 2).toUpperCase() : 'U'}
          </div>
          <p className="truncate text-xs font-medium text-foreground">
            {userName ?? 'User'}
          </p>
        </div>
        <Button
          onClick={onSignOut}
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
        >
          <LogOutIcon className="size-3.5" />
          <span className="sr-only">Sign out</span>
        </Button>
      </div>
    </div>
  )
}
