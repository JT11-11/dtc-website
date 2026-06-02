import { useClerk, useUser } from '@clerk/clerk-react'
import {
  BotIcon,
  BrainIcon,
  ChevronDownIcon,
  GlobeIcon,
  ImageIcon,
  LogOutIcon,
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
      'Hi, I am ExcelBot. Ask me to help reason about a workbook, draft formulas, summarize rows, or plan an automation.',
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
  const [activeNav, setActiveNav] = useState('home')
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
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
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
    <main className="min-h-screen bg-background/30 text-foreground backdrop-blur-xs">
      <div className="grid min-h-screen lg:grid-cols-[18rem_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r border-sidebar-border/40 bg-sidebar/50 text-sidebar-foreground lg:flex lg:flex-col backdrop-blur-md">
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
              className="fixed inset-0 bg-background/40 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
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

        <section className="flex min-w-0 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border/40 px-4 sm:px-6 bg-background/20 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <Button
                className="lg:hidden size-8 rounded-lg"
                size="icon"
                variant="ghost"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <PanelLeftIcon className="size-4" />
                <span className="sr-only">Open sidebar</span>
              </Button>
              <div className="relative">
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-md hover:bg-accent transition-colors cursor-pointer"
                  type="button"
                >
                  <BotIcon className="size-3.5 text-indigo-500" />
                  <span>ExcelBot 4.5 Pro</span>
                  <ChevronDownIcon className="size-3 text-muted-foreground" />
                </button>
              </div>
            </div>
            <Button
              onClick={() => void signOut({ redirectUrl: '/' })}
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg text-xs gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <LogOutIcon data-icon="inline-start" />
              Sign out
            </Button>
          </header>

          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-6 justify-between">
            {hasUserMessages ? (
              <div className="flex-1 overflow-y-auto rounded-3xl border border-border/40 bg-card/60 backdrop-blur-md p-4 shadow-xs sm:p-6 mb-6">
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                {/* Glowing sphere/orb */}
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute size-40 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-400 opacity-30 blur-3xl animate-pulse" />
                  <div className="relative size-28 rounded-full bg-gradient-to-tr from-blue-300/40 via-white/60 to-purple-300/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.8),0_12px_24px_rgba(0,0,0,0.08)] border border-white/50 backdrop-blur-md flex items-center justify-center">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/40 to-transparent" />
                    <div className="absolute top-2 left-4 size-8 rounded-full bg-white/20 blur-[1px]" />
                    <SparklesIcon className="size-10 text-indigo-600/80 animate-bounce" />
                  </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-center">
                  {getGreeting()}, {user?.firstName ?? 'User'}
                </h1>
                <p className="mt-2 text-xl font-medium text-center text-muted-foreground">
                  How Can I{' '}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Assist You Today?
                  </span>
                </p>
              </div>
            )}

            <form className="mt-4" onSubmit={handlePromptSubmit}>
              <div className="rounded-3xl border border-border/60 bg-background/80 shadow-xl backdrop-blur-md p-3">
                <Textarea
                  className="w-full max-h-44 min-h-20 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent text-sm placeholder:text-muted-foreground/70"
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Initiate a query or send a command to the AI..."
                  value={prompt}
                />
                <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-border/40">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full text-xs text-muted-foreground hover:text-foreground"
                    >
                      <PaperclipIcon className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant={
                        activePill === 'reasoning' ? 'secondary' : 'ghost'
                      }
                      size="sm"
                      onClick={() =>
                        setActivePill(
                          activePill === 'reasoning' ? null : 'reasoning',
                        )
                      }
                      className={cn(
                        'h-8 rounded-full text-xs gap-1.5 px-3 cursor-pointer',
                        activePill === 'reasoning' &&
                          'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 hover:bg-indigo-500/15',
                      )}
                    >
                      <BrainIcon className="size-3.5" />
                      Reasoning
                    </Button>
                    <Button
                      type="button"
                      variant={activePill === 'image' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() =>
                        setActivePill(activePill === 'image' ? null : 'image')
                      }
                      className={cn(
                        'h-8 rounded-full text-xs gap-1.5 px-3 cursor-pointer',
                        activePill === 'image' &&
                          'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/15',
                      )}
                    >
                      <ImageIcon className="size-3.5" />
                      Create Image
                    </Button>
                    <Button
                      type="button"
                      variant={
                        activePill === 'research' ? 'secondary' : 'ghost'
                      }
                      size="sm"
                      onClick={() =>
                        setActivePill(
                          activePill === 'research' ? null : 'research',
                        )
                      }
                      className={cn(
                        'h-8 rounded-full text-xs gap-1.5 px-3 cursor-pointer',
                        activePill === 'research' &&
                          'bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/15',
                      )}
                    >
                      <GlobeIcon className="size-3.5" />
                      Deep Research
                    </Button>
                  </div>
                  <Button
                    disabled={!prompt.trim()}
                    size="icon"
                    type="submit"
                    className="size-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shrink-0 cursor-pointer"
                  >
                    <SendIcon className="size-3.5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
