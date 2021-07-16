import React, {useContext, useState, useEffect, useRef} from "react";
import Chart from 'chart.js/auto';
import {interval, map, sample} from "rxjs";

import {WebSerialContext} from "../../Services/WebSerialContext";
import pedalMapBrakePositionFilter from "./pedalMapBrakePositionFilter";
import VerticalProgress from "../VerticalProgress/VerticalProgress";
import {Flex} from "../Flex";
import {Box} from "../Box";
const chartOption = {
    showLines: true,
    animation: false,
    responsive: false,
    aspectRatio: 1,
    scales: {
        x: {
            type: 'linear',
            display: true,
            ticks: {
                stepSize: 20,
                fixedStepSize: 1,
                suggestedMin: 0,
                suggestedMax: 100,
            }
        },
        y: {
            type: 'linear',
            display: true,
            min: 0,
            max: 100 ,
            ticks: {
                stepSize: 20,
                fixedStepSize: 1,
                suggestedMin: 0,
                suggestedMax: 100,
            }
        },
    }
};

const chartData = {
    labels: ["0","20","40", "60", "80", "100"],
    datasets: [
        {
            type: 'bubble',
            label: "current",
            fill: true,
            data: [{
                x: 0,
                y: 0,
                r: 3
            }],
            borderWidth: 1,
            borderColor: "green",
            backgroundColor: "green",
        },
        {
            type: 'line',
            label: "pedal",
            fill: false,
            data: [0,31,46,54,69,100],
            borderWidth: 1,
            borderColor: "blue"
        },
        {
            type: 'line',
            label: "baseline",
            fill: false,
            data: [0,20,40,60,80,100],
            borderWidth: 1,
            borderColor: "red"
        },
    ]
};

const PedalMapBrake = () => {
    const {pedalMap}  = useContext(WebSerialContext)
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const {stream, connected} = useContext(WebSerialContext);
    const [progress, setProgress] = useState([])
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
                .pipe(sample(interval(50)))
                .pipe(map(message => pedalMapBrakePositionFilter(message)))
                .subscribe({
                    next: (message) => {
                        adddata({brake: message.brake})
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

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, {
                type: 'line',
                data:chartData,
                options:chartOption
            });
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    useEffect(() => {
        if(connected && visible && JSON.stringify(pedalMap) !== '{}') {
            updateMap(pedalMap);
        }
    }, [pedalMap, connected, visible]);

    function updateMap({brakeMap}){
        chartInstance.data.datasets[1].data = brakeMap
        chartInstance.update();
    }

    function adddata({brake}){
        chartInstance.data.datasets[0].data[0] = brake
        setProgress(brake.x);
        chartInstance.update();
    }

    return (<Flex alignItems="stretch" justifyContent="stretch">
        <Box>
            <canvas height="300" width="300" ref={chartContainer} />
        </Box>
        <Box>
            <VerticalProgress progress={progress} height="300"/>
        </Box>
    </Flex>)
}

export default PedalMapBrake;