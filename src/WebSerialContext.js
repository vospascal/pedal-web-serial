import React, {createContext, useState} from 'react';
import WebSerialRxjs from "./WebSerialRxjs";

const serialrxjs = new WebSerialRxjs();

export const WebSerialContext = createContext();

const WebSerialContextProvider = ({ children }) => {
    const [connected, setConnected] = useState(false)
    const value = {
        connect: async () => {
            await serialrxjs.connectHandler();
            setConnected(true)
        },
        disconnect:async() => {
            await serialrxjs.disconnectHandler();
            setConnected(false)
        },
        stream: async() => await serialrxjs.stream(),
        write: async(msg) => await serialrxjs.writeHandler(msg),
        connected: connected
    }
    return (
        <WebSerialContext.Provider value={value}>
            {children}
        </WebSerialContext.Provider>
    );
};

export default WebSerialContextProvider