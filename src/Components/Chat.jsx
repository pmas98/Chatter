import React, { useContext } from 'react'
import { ChatContext } from './context/ChatContext'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = () => {
  const {data} = useContext(ChatContext);
  console.log(data)
  return (
    <div className='Chat'>
        <div className="chatInfo">
            <span style={{color:"white",fontSize:'20px'}}>
                {data.user?.displayName}
            </span>
            <div className="chatIcons">
                <img src={"img/cam.png"} alt="" />
                <img src={"img/add.png"} alt="" />
                <img src={"img/more.png"} alt="" />
            </div>
        </div>
        <Messages />
        <Input />
    </div>
  )
}
