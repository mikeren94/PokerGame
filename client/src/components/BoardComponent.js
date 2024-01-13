
import {useEffect} from "react";

const Board = (props) => {
    //const [count, setCount] = useState(0);

    useEffect(() => {
        props.socket.on(`sendBoard`, (data) => {
            console.log(data);
        });

        return () => props.socket.off('sendBoard');
    });

    return (
        <div>
            <p>Here is the board</p>
        </div>);
};


export default Board;
