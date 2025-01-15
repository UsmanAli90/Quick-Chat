import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

const ChatContainer = () => {
  const { messages, isMessageLoading, getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser.id);
  }, [selectedUser._id, getMessages])

  if (isMessageLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <p>Messages...</p>
      <MessageInput />
    </div>
  )
}
export default ChatContainer
