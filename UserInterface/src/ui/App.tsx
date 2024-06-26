import { h } from "preact";
import { useState } from "preact/hooks";

import { useEventfulState } from "onejs";

import Button from "@components/Button";
import Text, { Size } from "@components/Text";

import { ScriptManager } from "game";
import { GameState } from "@types/enums";

const game = require("game") as ScriptManager;

function App() {
    const [address, setAddress] = useState("127.0.0.1");
    const [port, setPort] = useState(7777);

    const [gameState, setGameState] = useEventfulState(game.GameManager, "State");

    return gameState == GameState.Menu ? (
        <div
            style={{ width: "50%" }}
            class={"p-5 text-white"}
        >
            <Text size={Size.Normal} class={"mb-4"}>Hello World!</Text>

            <Button
                class={"mb-4 bg-blue-500 "}
                onClick={() => {
                    game.GameManager.StartDebugServer();
                    game.GameManager.StartGame();
                }}
            >
                Start Game (host + server)
            </Button>

            <div class={"flex-row w-full mb-4"}>
                <textfield
                    text={"127.0.0.1"}
                    class={"text-black w-1/2 text-2xl"}
                    onInput={(e) => setAddress(e.newData)}
                />

                <textfield
                    text={"7777"}
                    class={"text-black w-1/2 text-2xl"}
                    onInput={(e) => setPort(parseInt(e.newData))}
                />
            </div>

            <Button
                class={"mb-4 bg-blue-500"}
                onClick={() => {
                    game.GameManager.JoinDebugServer(address, port);
                    game.GameManager.StartGame();
                }}
            >
                Join Game (client)
            </Button>
        </div>
    ) : <div></div>;
}

export default App;
