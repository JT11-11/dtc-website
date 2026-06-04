import { useClerk, useUser } from '@clerk/clerk-react'
import {
  BrainIcon,
  GlobeIcon,
  ImageIcon,
  PanelLeftIcon,
  PaperclipIcon,
  SendIcon,
  SparklesIcon,
} from 'lucide-react'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { cn } from '#/lib/utils'
import type { Chat, Message } from '#/types/chat'
import { SidebarContent } from '#/components/chat/sidebar-content'
import { ChatBubble } from '#/components/chat/chat-bubble'

const starterChats: Chat[] = [
  {
    id: 'analysis',
    title: 'Monthly report ideas',
    preview: 'Draft a report outline from workbook data.',
    updatedAt: 'Yesterday',
  },
  {
    id: 'automation',
    title: 'Automation brainstorm',
    preview: 'Turn repetitive spreadsheet steps into a workflow.',
    updatedAt: 'Mon',
  },
]

const starterMessages: Message[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content:
      'Hi, I am grid.ai. Ask me to help reason about a workbook, draft formulas, summarize rows, or plan an automation.',
  },
]

export function ChatScreen() {
  const { signOut } = useClerk()
  const { user } = useUser()
  const [chats, setChats] = useState<Chat[]>(starterChats)
  const [activeChatId, setActiveChatId] = useState<string>(
    starterChats[0]?.id ?? 'welcome',
  )
  const [messages, setMessages] = useState(starterMessages)
  const [prompt, setPrompt] = useState('')
  const [activeWorkspace, setActiveWorkspace] = useState('personal')
  const [activeNav, setActiveNav] = useState('chats')
  const [activePill, setActivePill] = useState<
    'reasoning' | 'image' | 'research' | null
  >(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const hasUserMessages = useMemo(
    () => messages.some((m) => m.role === 'user'),
    [messages],
  )

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  function handleNewChat() {
    const nextChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      preview: 'Initiate a query or send a command...',
      updatedAt: 'Now',
    }

    setChats((current) => [nextChat, ...current])
    setActiveChatId(nextChat.id)
    setMessages(starterMessages)
    setPrompt('')
  }

  function handlePromptSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) return

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmedPrompt,
      },
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          activePill === 'reasoning'
            ? 'Reasoning mode active: Analyzing workbook structures and formulas to provide a comprehensive breakdown...'
            : activePill === 'research'
              ? 'Deep Research mode active: Searching historical spreadsheet patterns and best practices to optimize your data flow...'
              : 'Frontend preview only: connect this composer to your AI endpoint when the backend is ready.',
      },
    ])
    setChats((current) =>
      current.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.title === 'New Chat'
                  ? trimmedPrompt.slice(0, 36)
                  : chat.title,
              preview: trimmedPrompt,
              updatedAt: 'Now',
            }
          : chat,
      ),
    )
    setPrompt('')
    setActivePill(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[15rem_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r border-sidebar-border/40 bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
          <SidebarContent
            activeChatId={activeChatId}
            chats={chats}
            onNewChat={handleNewChat}
            onSelectChat={setActiveChatId}
            onSignOut={() => void signOut({ redirectUrl: '/' })}
            userName={user?.firstName ?? user?.primaryEmailAddress?.emailAddress}
            activeWorkspace={activeWorkspace}
            setActiveWorkspace={setActiveWorkspace}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-background/60 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
              <SidebarContent
                activeChatId={activeChatId}
                chats={chats}
                onNewChat={() => {
                  handleNewChat()
                  setIsMobileSidebarOpen(false)
                }}
                onSelectChat={(id) => {
                  setActiveChatId(id)
                  setIsMobileSidebarOpen(false)
                }}
                onSignOut={() => void signOut({ redirectUrl: '/' })}
                userName={user?.firstName ?? user?.primaryEmailAddress?.emailAddress}
                activeWorkspace={activeWorkspace}
                setActiveWorkspace={setActiveWorkspace}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
              />
            </aside>
          </div>
        )}

        {/* Main content */}
        <section className="flex min-w-0 flex-col">
          {/* Mobile topbar */}
          <header className="flex h-14 items-center gap-3 border-b border-border/40 px-4 lg:hidden">
            <Button
              className="size-8 rounded-lg"
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <PanelLeftIcon className="size-4" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="size-4 text-primary" />
              <span className="text-sm font-semibold">grid.ai</span>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6 sm:px-6">
            {hasUserMessages ? (
              <div className="flex-1 overflow-y-auto py-4 mb-6">
                <div className="flex flex-col gap-6">
                  {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  {getGreeting()},{' '}
                  <span className="text-muted-foreground">
                    {user?.firstName ?? 'there'}
                  </span>
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                  How can I help you today?
                </p>
              </div>
            )}

            {/* Composer */}
            <form onSubmit={handlePromptSubmit}>
              <div className="rounded-2xl border border-border bg-background shadow-sm">
                <Textarea
                  className="w-full max-h-44 min-h-[5rem] resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent px-4 pt-4 text-sm placeholder:text-muted-foreground/60"
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="How can I help you today?"
                  value={prompt}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      if (prompt.trim()) {
                        e.currentTarget.form?.requestSubmit()
                      }
                    }
                  }}
                />
                <div className="flex items-center justify-between gap-2 px-3 pb-3">
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <PaperclipIcon className="size-3.5" />
                      <span className="sr-only">Attach</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setActivePill(
                          activePill === 'reasoning' ? null : 'reasoning',
                        )
                      }
                      className={cn(
                        'h-8 rounded-full px-3 text-xs gap-1.5 cursor-pointer',
                        activePill === 'reasoning'
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <BrainIcon className="size-3.5" />
                      Reasoning
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setActivePill(activePill === 'image' ? null : 'image')
                      }
                      className={cn(
                        'h-8 rounded-full px-3 text-xs gap-1.5 cursor-pointer',
                        activePill === 'image'
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <ImageIcon className="size-3.5" />
                      Image
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setActivePill(
                          activePill === 'research' ? null : 'research',
                        )
                      }
                      className={cn(
                        'h-8 rounded-full px-3 text-xs gap-1.5 cursor-pointer hidden sm:inline-flex',
                        activePill === 'research'
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <GlobeIcon className="size-3.5" />
                      Research
                    </Button>
                  </div>
                  <Button
                    disabled={!prompt.trim()}
                    size="icon"
                    type="submit"
                    className="size-8 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-all shrink-0 cursor-pointer disabled:opacity-30"
                  >
                    <SendIcon className="size-3.5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
                grid.ai can make mistakes. Double-check important formulas.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
