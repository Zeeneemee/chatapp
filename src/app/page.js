'use client';
import Cookies from 'universal-cookie';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

const Room = dynamic(() => import('../components/room'), {
  ssr: false,
});
const Chat = dynamic(() => import('../components/chat'), {
  ssr: false,
});
const Auth = dynamic(() => import('../components/auth'), {
  ssr: false,
});

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [room, setRoom] = useState(''); 
  const cookies = new Cookies();

  useEffect(() => {
    const authStatus = cookies.get('auth');
    const roomName = cookies.get('room');
    if (authStatus) {
      setIsAuth(true);
      if (roomName) {
        setRoom(roomName);
      }
    }
    const timer = setTimeout(() => {
      console.log('Removing cookie');
      cookies.remove('room', { path: '/' });
    }, 100000);

    const authTime = setTimeout(()=>{
      console.log('Removing cookie');
      cookies.remove('auth', { path: '/' });
    },600000)
    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timer)
      clearTimeout(authTime);
    }
  }, [room]);

  return (
    <div>
      {!isAuth ? 
        <Auth setIsAuth={setIsAuth} />
        :
        ( room.trim() !== 'nameattt' ?
          <Room room={room} setRoom={(roomName) => {
            cookies.set('room', roomName, { path: '/' }); // Set cookie for room
            setRoom(roomName);
          }} />
          :
          <Chat room={room} />
        )
      }
    </div>
  );
}
