import React, { useContext, useState, useEffect } from "react";
import {Flex} from "./components/Flex";
import {Box} from "./components/Box";
import Serial from "./components/Serial";


const App = () => {
    return (<Flex flexWrap="wrap" alignItems="stretch" justifyContent="stretch">
        <Box
            width={["100%", "50%"]}
        >
            <Serial/>
        </Box>
        <Box
            width={["100%", "50%"]}
        >
            b
        </Box>
    </Flex>)
}

export default App;