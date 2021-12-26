import React from 'react'
import Cookies from 'universal-cookie'
import { useChatContext, ChannelList } from 'stream-chat-react'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies()

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="hospitalImage" width="30" />
      </div>
    </div>

    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img
          onClick={() => logout()}
          src={LogoutIcon}
          alt="LogoutIcon"
          width="30"
        />
      </div>
    </div>
  </div>
)

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header-text">Medical Pager</p>
  </div>
)

const ChannelListContainer = () => {
  const logout = () => {
    cookies.remove('token')
    cookies.remove('userId')
    cookies.remove('username')
    cookies.remove('fullName')
    cookies.remove('phoneNumber')
    cookies.remove('avatarUrl')
    cookies.remove('hashPassword')

    window.location.reload()
  }

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => ({})}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="team" />
          )}
        />

        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => ({})}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type="messaging" />
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
