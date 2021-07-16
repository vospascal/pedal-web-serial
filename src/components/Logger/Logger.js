import React, {useContext, useState, useEffect, useRef} from "react";
import {interval, map, sample} from "rxjs";
import {WebSerialContext} from "../../Services/WebSerialContext";


const Logger = () => {
    const {stream, connected} = useContext(WebSerialContext);
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(async ()=>{
        setVisible(true);
        return () => {
            setVisible(false);
        }
    });
    useEffect(async ()=>{
        let getStream
        if(connected && visible){
            getStream = await stream();
            getStream
                .pipe(sample(interval(0)))
                .subscribe({
                    next: (message) => {
                        setList((data) => {
                            if (data.length >= 100) {
                                return [message, ...data].slice(0, -1)
                            }
                            return [message, ...data]
                        })

                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })
        }
        if(!visible && getStream){
            getStream.unsubscribe();
        }
    }, [connected, visible])

    return (<div>
        <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>)
}

export default Logger;