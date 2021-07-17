import React, {useContext, useState, useEffect, useRef} from "react";

import {Flex} from "./components/Flex";
import {Box} from "./components/Box";
import {WebSerialContext} from "./Services/WebSerialContext";
import PedalTimeLine from "./components/PedalTimeline/PedalTimeLine";
import Tab from "./components/Tabs/Tab";
import Tabs from "./components/Tabs/Tabs";
import Logger from "./components/Logger/Logger";
import PedalMapClutch from "./components/PedalMapClutch/PedalMapClutch";
import PedalMapBrake from "./components/PedalMapBrake/PedalMapBrake";
import PedalMapThrottle from "./components/PedalMapThrottle/PedalMapThrottle";


const App = () => {
    const {connect, disconnect, write, connected, pedalMap, calibrationMap, invertedMap, smoothMap, bitsMap} = useContext(WebSerialContext)

    return (
        <div>
            <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                <Box width={["100%", "50%"]} pb="10" pt="10">
                    <button disabled={connected} onClick={() => {
                        connect()
                    }}>connect
                    </button>
                    <button disabled={!connected} onClick={() => {
                        disconnect()
                    }}>disconnect
                    </button>


                    <button onClick={() => write('GetMap')}>GetMap</button>
                    <button onClick={() => write('GetCali')}>GetCali</button>
                    <button onClick={() => write('GetInverted')}>GetInverted</button>
                    <button onClick={() => write('GetSmooth')}>GetSmooth</button>
                    <button onClick={() => write('GetBits')}>GetBits</button>
                </Box>
            </Flex>
            <Tabs>
                <Tab title="pedals">
                    <br/>
                    <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                        <Box width={["100%", "33%"]}>
                            <PedalMapClutch/>
                        </Box>
                        <Box width={["100%", "33%"]}>
                            <PedalMapBrake/>
                        </Box>
                        <Box width={["100%", "33%"]}>
                            <PedalMapThrottle/>
                        </Box>
                    </Flex>

                    <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                        <Box width={["100%"]}>
                            <PedalTimeLine/>
                        </Box>
                        <Box width={["100%"]}>
                            {JSON.stringify(invertedMap)}
                            <hr/>
                            {JSON.stringify(smoothMap)}
                            <hr/>
                            {JSON.stringify(bitsMap)}
                            <hr/>
                            {JSON.stringify(calibrationMap)}
                            <hr/>
                            {JSON.stringify(pedalMap)}
                            <hr/>
                            <Logger />
                        </Box>
                    </Flex>
                </Tab>
                <Tab title="calibration"><div>calibration</div></Tab>
                <Tab title="about"><div>about</div></Tab>
            </Tabs>

        </div>
    )
}

export default App;