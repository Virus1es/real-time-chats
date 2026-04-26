import {useEffect, useState} from "react";
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        void subscribe();
    }, [])

    async function subscribe() {
        try{
            const {data} = await axios.get("http://localhost:5000/get-message");
            setMessages(prevState => [data, ...prevState]);
            await subscribe();
        } catch (e) {
            console.log(e);
            setTimeout(() => {
                subscribe();
            }, 500);
        }
    }

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-message", {
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