import React from 'react'
import { useChatContext, Channel, MessageTeam } from 'stream-chat-react'

import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './'

const ChannelListContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
    const { channel } = useChatContext()

    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
            </div>
        );
    }

    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        );

    }

    const EmptyState = () => {
        return (
            <div className="channel-empty__container">
                <p className='channel-empty__first'>This is the beginning of your chat history</p>
                <p className='channel-empty__second'>Send messages, attachments, links, emojis and more</p>
            </div>
        )
    }

  return <div>
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, index) => (<MessageTeam key={index} {...messageProps} />)}
      >
          <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
}

export default ChannelListContainer
