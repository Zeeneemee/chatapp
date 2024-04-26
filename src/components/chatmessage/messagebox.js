// MessageBox.js
import { format } from 'date-fns'; // Import format

const MessageBox = ({ message, isCurrentUser }) => {
    // Format Firestore timestamp using date-fns
    const createdAt = message.createdAt ? format(new Date(message.createdAt.seconds * 1000), 'PPPppp') : 'Unknown date';

    const containerClass = isCurrentUser ? "flex justify-end" : "flex justify-start";
    const messageClass = isCurrentUser ? "bg-blue-500" : "bg-sky-500";
    const textAlignmentClass = isCurrentUser ? "text-right" : "text-left";

    return (
        <div className={`${containerClass} w-full px-20 py-2`}>
            <div>
                <h1>{message.user}</h1>
                <div className={`max-w-[270px] w-full rounded-xl p-2.5 text-white ${messageClass} ${textAlignmentClass}`}>
                    <p className="font-sans break-words">{message.text}</p>
                    <p className="text-sm">{createdAt}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
