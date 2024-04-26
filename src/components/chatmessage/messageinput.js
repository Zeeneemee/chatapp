import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import { db, auth } from '@/firebase-config';
import MessageBox from './messagebox'; // Ensure correct import name

const MessageInput = ({ room }) => {
    const [newMessage, setNewMessage] = useState('');
    const messageRef = collection(db, 'messages');
    const [messages, setMessages] = useState([]);
 

    useEffect( () => {
        
            const simpleQuery = query(messageRef, where("room", "==", room), orderBy("createdAt"));
            const unsubscribe = onSnapshot(simpleQuery, (snapshot)=>{
                let message = [];
                snapshot.forEach((doc)=>{
                    message.push({...doc.data(),id:doc.id} )
                })
                console.log(message)
                setMessages(message)
                
            })
            return ()=> unsubscribe();
        
    }, []);
    

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) {
            alert("Please enter a message."); // User feedback for empty submission
            return;
        }
        await addDoc(messageRef, {
            text: newMessage.trim(),
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        });
        setNewMessage('');
    };

    return (
        <div>
            <div>{messages.map((message,id) => <MessageBox key={id} message={message} isCurrentUser={message.user === auth.currentUser.displayName} />)}</div>
            <div className="flex justify-center bg-blue-100 py-5 w-full  bottom-0">
                <form className='flex gap-5' onSubmit={handleSubmit}>
                    <input
                        className='rounded-lg p-2 flex-grow w-[80vw]'
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        value={newMessage}
                    />
                    <button type="submit" disabled={!newMessage.trim()}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default MessageInput;
