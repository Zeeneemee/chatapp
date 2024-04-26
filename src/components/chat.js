'use client';
import Header  from "./chatmessage/header";
import MessageBox from "./chatmessage/messagebox";
import { Data } from '../app/data/data.js'
import MessageInput from './chatmessage/messageinput'

const Chat =(props)=>{
    return(
        <div className="flex flex-col gap-5">
             <h1>You are in: {props.room}</h1>
            <Header/>
            <MessageInput room={props.room}/>
        </div>
    )
};

export default Chat;