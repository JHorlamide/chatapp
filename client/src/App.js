import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import './App.css'
import 'stream-chat-react/dist/css/index.css';

import { ChannelListContainer, ChannelContainer, Auth } from './components'

const cookies = new Cookies()

const api_key = 'wbxtm8wdzzpz'
const authToken = cookies.get('token')

const client = StreamChat.getInstance(api_key)

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      phoneNumber: cookies.get('phoneNumber'),
      image: cookies.get('avatarUrl'),
      hashPassword: cookies.get('hashPassword'),
    },
    authToken,
  )
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState('')
  const [isEditing, setIsEditing] = useState('')

  if (!authToken) return <Auth />
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">

        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

export default App
