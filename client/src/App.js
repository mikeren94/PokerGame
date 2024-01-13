import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import HoleCards from "./components/HoleCardComponent";
import BoardComponent from "./components/BoardComponent";

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
        <BoardComponent socket={socket}/>
        <HoleCards socket={socket} />
    </div>
  );
}

export default App;
