import {useRef, useState} from 'react';

const WebSockets = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef(null);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: "message",
        };

        socket.current.send(JSON.stringify(message));
        setValue('');
    }

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: 'connection',
                username,
                id: Date.now(),
            }
            socket.current.send(JSON.stringify(message));
            console.log("Connected");
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevState => [message, ...prevState]);
        }
        socket.current.onclose = () => {
            setConnected(false);
            console.log('Socket closed');
        }
        socket.current.onerror = () => {
            console.log('Something went wrong');
        }
    }

    if(!connected){
        return (
            <div className="center">
                <div className="form">
                    <input type="text"
                           placeholder="Введите ваше имя"
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                    />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
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
                        <div key={mess.id}>
                            {mess.event === 'connection' ?
                                <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div> :
                                <div className="message">
                                    {mess.username}: {mess.message}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebSockets;