import { useMemo } from 'react'
import {
  BotIcon,
  CompassIcon,
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  LogOutIcon,
  MessageSquareIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'
import type { Chat } from '#/types/chat'

const workspaces = [
  { id: 'personal', label: 'Personal' },
  { id: 'excel', label: 'Excel Studio' },
  { id: 'beebot', label: 'ExcelBot Pro' },
]

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'explore', label: 'Explore', icon: CompassIcon },
  { id: 'library', label: 'Library', icon: LibraryIcon },
  { id: 'history', label: 'History', icon: HistoryIcon },
]

export function SidebarContent({
  activeChatId,
  chats,
  onNewChat,
  onSelectChat,
  onSignOut,
  userName,
  activeWorkspace,
  setActiveWorkspace,
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
      '7 Days Ago': chats.filter(
        (c) =>
          c.updatedAt === 'Mon' ||
          (c.updatedAt !== 'Now' && c.updatedAt !== 'Yesterday'),
      ),
    }
  }, [chats])

  return (
    <>
      {/* Workspace Switcher */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border/40">
        <button
          onClick={onNewChat}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-background/80 hover:bg-sidebar-accent transition-colors cursor-pointer"
          type="button"
        >
          <PlusIcon className="size-4" />
        </button>
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={cn(
                'px-2.5 py-1 rounded-full text-[10px] font-medium border border-transparent whitespace-nowrap transition-all cursor-pointer',
                activeWorkspace === ws.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-xs'
                  : 'bg-background/40 hover:bg-sidebar-accent border-sidebar-border/40 text-muted-foreground',
              )}
              type="button"
            >
              {ws.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand & Search */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
            <BotIcon className="size-4" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">ExcelBot</p>
            <p className="text-[10px] text-muted-foreground">
              AI spreadsheet companion
            </p>
          </div>
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
          <Input
            className="w-full pl-8 pr-10 bg-background/40 border-sidebar-border/40 rounded-xl text-xs h-8 focus-visible:bg-background/80 transition-all"
            placeholder="Search..."
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-sidebar-border/60 bg-background/60 px-1 font-mono text-[9px] font-medium text-muted-foreground/80">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer',
                activeNav === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
              )}
              type="button"
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Chat History Grouped */}
      <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-4">
        {Object.entries(groupedChats).map(([group, groupChats]) => {
          if (groupChats.length === 0) return null
          return (
            <div key={group} className="flex flex-col gap-1">
              <p className="px-3 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                {group}
              </p>
              {groupChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-all group cursor-pointer',
                    chat.id === activeChatId
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-sidebar-accent/40 hover:text-foreground',
                  )}
                  type="button"
                >
                  <MessageSquareIcon className="size-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))}
            </div>
          )
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-sidebar-border/40 bg-sidebar/40 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-background/40 border border-sidebar-border/30 p-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 text-white font-medium text-xs shadow-sm">
              {userName ? userName.slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                {userName ?? 'User'}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Signed in
              </p>
            </div>
          </div>
          <Button
            onClick={onSignOut}
            variant="ghost"
            size="icon"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
          >
            <LogOutIcon className="size-3.5" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </>
  )
}
