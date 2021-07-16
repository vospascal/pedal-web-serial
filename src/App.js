import React, {useContext, useState, useEffect, useRef} from "react";

import {Flex} from "./components/Flex";
import {Box} from "./components/Box";
import {WebSerialContext} from "./WebSerialContext";
import PedalTimeLine from "./components/PedalTimeline/PedalTimeLine";
import PedalMap from "./components/PedalMap/PedalMap";
import Tab from "./components/Tabs/Tab";
import Tabs from "./components/Tabs/Tabs";


const App = () => {
    const {connect, disconnect, write} = useContext(WebSerialContext)

    return (
        <div>
            <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                <Box width={["100%", "50%"]}>
                    <button onClick={() => {
                        connect()
                    }}>connect
                    </button>
                    <button onClick={() => {
                        disconnect()
                    }}>disconnect
                    </button>

                    <button onClick={() => write('GetMap')}>GetMap</button>
                </Box>
            </Flex>
            <Tabs>
                <Tab title="pedals">
                    <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                        <Box width={["100%", "33%"]}>
                            <PedalMap type="clutch"/>
                        </Box>
                        <Box width={["100%", "33%"]}>
                            <PedalMap type="brake"/>
                        </Box>
                        <Box width={["100%", "33%"]}>
                            <PedalMap type="throttle"/>
                        </Box>
                    </Flex>

                    <Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
                        <Box width={["100%"]}>
                            <PedalTimeLine/>
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