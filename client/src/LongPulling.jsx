import {useState} from "react";
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-messages", {
            messages: value,
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

export default LongPulling;