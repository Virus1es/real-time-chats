import {useEffect, useState} from "react";
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    async function subscribe() {
        const eventSource = new EventSource('http://localhost:5000/connect');
        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    useEffect(() => {
        void subscribe();
    }, []);

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-message", {
            message: value,
            id: Date.now(),
        })
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value}
                           type="text"
                           onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map((mess) => (
                        <div key={mess.id} className="message">
                            {mess.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventSourcing;