export type Chat = {
  id: string
  title: string
  preview: string
  updatedAt: string
}

export type Message = {
  id: string
  role: 'assistant' | 'user'
  content: string
}
