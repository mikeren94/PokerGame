import {useEffect, useState} from 'react';

const HoleCards = (props) => {

    const [count, setCount] = useState(0);

    function handleClick() {
        console.log(props.socket.id);
        props.socket.emit("dealCards");
        setCount(count + 1);
    }

    useEffect(() => {
        props.socket.on(`sendCard#${props.socket.id}`, (data) => {
            console.log(data);
        });
    })

    return (
    <div>
    <h1>
        Count: {count}
    </h1>
    <button onClick={handleClick}>Deal cards</button>
    </div>);
};


export default HoleCards;
