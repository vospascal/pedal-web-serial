import React, {createContext, useEffect, useState} from 'react';
import WebSerialRxjs from "./WebSerialRxjs";
import {map, delay, sample} from "rxjs";
import pedalCalibrationFilter from "./Filters/pedalCalibrationFilter";
import pedalInvertedFilter from "./Filters/pedalInvertedFilter";
import pedalBitsFilter from "./Filters/pedalBitsFilter";
import pedalSmoothFilter from "./Filters/pedalSmoothFilter";
import cleanString from "./Filters/cleanString";
import pedalMapFilter from "./Filters/pedalMapFilter";

const serialrxjs = new WebSerialRxjs();
export const WebSerialContext = createContext();

const init = () => {
    // get pedal map
    serialrxjs.writeHandler("GetMap");
    // get calibration map
    serialrxjs.writeHandler("GetCali");
    // get inverted map
    serialrxjs.writeHandler("GetInverted");
    // get smooth map
    serialrxjs.writeHandler("GetSmooth");
    // get bits map
    serialrxjs.writeHandler("GetBits");
}

const WebSerialContextProvider = ({children}) => {
    const [connected, setConnected] = useState(false);
    const [pedalMap, setPedalMap] = useState({});
    const [calibrationMap, setCalibrationMap] = useState({});
    const [invertedMap, setInvertedMap] = useState({});
    const [smoothMap, setSmoothMap] = useState({});
    const [bitsMap, setBitsMap] = useState({});

    useEffect(async () => {
        let getStream;
        let once = [2,1,0];
        if (connected) {
            getStream = await serialrxjs.stream()
            getStream
                // .pipe(once.length > 0 ? delay(300) : delay(0))
                .pipe(map(value => cleanString(value)))
                .subscribe({
                    next: (message) => {
                        if(once.length > 0){
                            once.shift(0,-1)
                            init();
                        }
                        // console.log(message, 'WebSerialContextProvider')
                        const pedal_map = pedalMapFilter(message)
                        if(pedal_map) {setPedalMap(pedal_map);}

                        const cali_map = pedalCalibrationFilter(message);
                        if(cali_map) {setCalibrationMap(cali_map);}

                        const inver_map = pedalInvertedFilter(message);
                        if(inver_map) {setInvertedMap(inver_map);}

                        const smooth_map = pedalSmoothFilter(message);
                        if(smooth_map) {setSmoothMap(smooth_map);}

                        const bits_map = pedalBitsFilter(message);
                        if(bits_map) {setBitsMap(bits_map);}

                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })

        }
        if (!connected && getStream) {
            getStream.unsubscribe();
            once = [2,1,0];
        }

    }, [connected])

    const value = {
        connect: async () => {
            await init();
            await serialrxjs.connectHandler();
            await setConnected(true);
        },
        disconnect: async () => {
            await serialrxjs.disconnectHandler();
            setConnected(false)
        },
        stream: async () => await serialrxjs.stream(),
        write: async (msg) => await serialrxjs.writeHandler(msg),
        connected: connected,
        pedalMap: pedalMap,
        calibrationMap: calibrationMap,
        invertedMap: invertedMap,
        smoothMap: smoothMap,
        bitsMap: bitsMap,
    }
    return (
        <WebSerialContext.Provider value={value}>
            {children}
        </WebSerialContext.Provider>
    );
};

export default WebSerialContextProvider