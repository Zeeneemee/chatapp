'use client'
import {useRef,useState} from 'react'
import Cookies from 'universal-cookie'

const Room = ({room, setRoom})=>{
    const cookies = new Cookies()
    const roomInput = useRef(null)

    const handleEnterRoom = ()=>{
        const newRoom = roomInput.current.value
        setRoom(newRoom)
        cookies.set('room',newRoom ,{path:"/"})
    }


    return(
    <div className="flex flex-col justify-center h-[100vh] items-center">
        <h1>Enter a room Name:</h1>
        <input ref={roomInput} className="border-2 solid" type="text" placeholder="Enter a room"/>
        <button onClick={handleEnterRoom}>Enter</button>
    </div>
    )
}

export default Room