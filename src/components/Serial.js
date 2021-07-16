import React, {useEffect, useState} from "react";
import pedalMapFilter from "../pedalMap";
import cleanString from "../cleanString";
import pedalInput from "../pedalInput";
import pedalCalibration from "../pedalCalibration";
import pedalInverted from "../pedalInverted";
import pedalSmooth from "../pedalSmooth";
import pedalBits from "../pedalBits";
import pedalTimeline from "../pedalTimeline";

class LineBreakTransformer {
    constructor() {
        // A container for holding stream data g stream data until a new line.
        this.chunks = "";
    }

    transform(chunk, controller) {
        // Append new chunks to existing chunks.
        this.chunks += chunk;
        // For each line breaks in chunks, send the parsed lines out.
        const lines = this.chunks.split("\r\n");
        this.chunks = lines.pop();
        lines.forEach(line => controller.enqueue(line));
        // console.debug(
        //     `[LineBreakTransformer/transform] this.chunks: ${this.chunks}`
        // );
    }

    flush(controller) {
        console.log("flush", this.chunks);
        // When the stream is closed, flush any remaining chunks out.
        controller.enqueue(this.chunks);
    }
}

const Serial = () => {
    const [timelineThrottle, setTimelineThrottle] = useState([{x: 0, y:0}]);
    const [timelineBrake, setTimelineBrake] = useState([{x: 0, y:0}]);
    const [timelineClutch, setTimelineClutch] = useState([{x: 0, y:0}]);
    const [lines, setLines] = useState([]);

    const [port, setPort] = useState();
    const [reader, setReader] = useState();
    const [readableStreamClosed, setReadableStreamClosed] = useState();
    const [writer, setWriter] = useState();
    const [writableStreamClosed, setWritableStreamClosed] = useState();

    useEffect(async () => {
        console.log(`("serial" in navigator): ${"serial" in navigator}`);
        navigator.serial.addEventListener("disconnect", event => {
            console.log(event);
        });
        navigator.serial.addEventListener("connect", async event => {
            console.log(event);
            setPort(event.port);
            let tempPort = event.port
            await tempPort.open({baudrate: 115200});
            console.log(tempPort);
        });
        navigator.serial.getPorts().then(async ports => {
            if (ports.length == 0) {
                console.log("no serial ports");
                return;
            }
            let tempPort = ports[0];
            setPort(tempPort)
            console.log(tempPort);
        });

    }, []);


    const connect = async (event) => {
        await port.open({baudRate: 115200});
        await createWriter();
        await createReader();
        console.log(port);
    }

    const disconnect = async (event) => {
        // // With no transform streams but still with a loop
        // await reader.cancel();
        // console.log("await reader.cancel()");
        try {
            // With transform streams.
            reader.cancel().catch(error => console.log(error));
            await readableStreamClosed.catch(() => {
            });
            console.log("await readableStreamClosed");
            writer.close();
            await writableStreamClosed;
            console.log("await writableStreamClosed");
        } catch (error) {
            console.log(error);
        } finally {
            await port.close();
            console.log("await port.close()");
        }
    }

    const selectPort = async (event) => {
        let tempPort = await navigator.serial.requestPort({
            // filters: [{ usbVendorId: 0x0d28, usbProductId: 0x0204 }]
        });
        setPort(tempPort)
        console.log(tempPort);
    }

    const createWriter = async () => {
        if (!writer) {
            const textEncoder = new TextEncoderStream();
            let tempWritableStreamClosed = textEncoder.readable.pipeTo(port.writable);
            setWritableStreamClosed(tempWritableStreamClosed);

            let tempWriter = textEncoder.writable.getWriter();
            setWriter(tempWriter);
        }
    }

    const createReader = async () => {
        if (!reader) {
            const textDecoder = new TextDecoderStream();
            let tempReadableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            setReadableStreamClosed(tempReadableStreamClosed);
            // textReader = textDecoder.readable.getReader();
            let tempReader = textDecoder.readable
                .pipeThrough(new TransformStream(new LineBreakTransformer()))
                .getReader();
            setReader(tempReader)
        }
    }

    const writeSerial = async (msg) => {
        // writer = port.writable.getWriter();
        // const data = new Uint8Array([116, 114, 117, 101, 10]); // "true\n"
        // await writer.write(data);
        // writer.releaseLock();

        // if (!writer) {
        //     const textEncoder = new TextEncoderStream();
        //     let tempWritableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        //     setWritableStreamClosed(tempWritableStreamClosed);
        //
        //     let tempWriter = textEncoder.writable.getWriter();
        //     setWriter(tempWriter);
        // }
        // console.log(writer, 'writer')

        await writer.write(msg + "\n");
    }

    const read = async (event) => {
        // reader = port.readable.getReader();
        // const textDecoder = new TextDecoderStream();
        // let tempReadableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        // setReadableStreamClosed(tempReadableStreamClosed);
        // // textReader = textDecoder.readable.getReader();
        // let tempReader = textDecoder.readable
        //     .pipeThrough(new TransformStream(new LineBreakTransformer()))
        //     .getReader();
        //
        // setReader(tempReader)

        // get pedal map
        writeSerial("GetMap");
        // get calibration map
        writeSerial("GetCali");
        // get inverted map
        writeSerial("GetInverted");
        // get smooth map
        writeSerial("GetSmooth");
        // get bits map
        writeSerial("GetBits");

        while (true) {
            const {value, done} = await reader.read();
            if (done) {
                reader.releaseLock();
                break;
            }
            if (value) {
                const cleanStr = cleanString(value)
                // pedalInput(cleanStr);
                pedalMapFilter(cleanStr);
                pedalCalibration(cleanStr);
                pedalInverted(cleanStr);
                pedalSmooth(cleanStr);
                pedalBits(cleanStr);
                setLines(lines => {
                    if (lines.length > 100) {
                        return [cleanStr, ...lines].slice(0, -1)
                    } else {
                        return [cleanStr, ...lines]
                    }
                });


                const {throttle, brake, clutch} = pedalTimeline(cleanStr)

                if (throttle) {
                    setTimelineThrottle(data => {
                        if (data.length > 1) {
                            return [throttle, ...data].slice(0, -1)
                        }
                        return [throttle, ...data]
                    })
                }

                if (brake) {
                    setTimelineBrake(data => {
                        if (data.length > 1) {
                            return [brake, ...data].slice(0, -1)
                        }
                        return [brake, ...data]
                    })
                }

                if (clutch) {
                    setTimelineClutch(data => {
                        if (data.length > 1) {
                            return [clutch, ...data].slice(0, -1)
                        }
                        return [clutch, ...data]
                    })
                }

            }
        }
    }

    const info = async (event) => {
        console.log(port.getInfo());
    }

    return (<div>
        <button onClick={selectPort}>select port</button>
        <button onClick={info}>info</button>
        <button onClick={read}>read</button>
        <button onClick={connect}>connect</button>
        <button onClick={disconnect}>disconnect</button>
        <button onClick={() => writeSerial("GetMap")}>write GetMap</button>
        <button onClick={() => writeSerial("GetCali")}>write GetCali</button>
        <button onClick={() => writeSerial("GetInverted")}>write GetInverted</button>
        <button onClick={() => writeSerial("GetSmooth")}>write GetSmooth</button>
        <button onClick={() => writeSerial("GetBits")}>write GetBits</button>
        <hr/>
        {/*<PedalCharts throttle={timelineThrottle} brake={timelineBrake} clutch={timelineClutch}/>*/}
        <pre>
            {JSON.stringify(timelineThrottle, null, 2)}
            {JSON.stringify(timelineBrake, null, 2)}
            {JSON.stringify(timelineClutch, null, 2)}
        </pre>
        {/*{lines.map((line) => <pre>{JSON.stringify(line, null, 2)}</pre>)}*/}

    </div>);

};

export default Serial;