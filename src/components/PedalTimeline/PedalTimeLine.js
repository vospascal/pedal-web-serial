import React, {useContext, useState, useEffect, useRef} from "react";
import Chart from 'chart.js/auto';
import {interval, map, sample} from "rxjs";

import {WebSerialContext} from "../../Services/WebSerialContext";
import pedalTimelineFilter from "./pedalTimelineFilter";

const chartOption = {
    showLines: true,
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        point:{
            radius: 0
        }
    },
    scales: {
        x: {
            display: false,
            ticks: {
                stepSize: 1,
                fixedStepSize: 1,
            }
        },
        y: {
            display: true,
            min: 0,
            max: 100 ,
            ticks: {
                stepSize: 10,
                fixedStepSize: 1,
                suggestedMin: 0,
                suggestedMax: 100,
            }
        }
    }
};

const chartData = {
    labels: [""],
    datasets: [
        {
            label: "throttle",
            fill: false,
            data: [0],
            borderWidth: 1,
            borderColor: "red"
        },
        {
            label: "brake",
            fill: false,
            data: [0],
            borderWidth: 1,
            borderColor: "blue"
        },
        {
            label: "clutch",
            fill: false,
            data: [0],
            borderWidth: 1,
            borderColor: "green"
        }
    ]
};

const PedalTimeLine = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
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
                .pipe(sample(interval(50)))
                .pipe(map(message => pedalTimelineFilter(message)))
                .subscribe({
                    next: (message) => {
                        // setList((data) => {
                        //     if (data.length >= 1) {
                        //         return [message, ...data].slice(0, -1)
                        //     }
                        //     return [message, ...data]
                        // })
                        adddata({
                            throttle: message.throttle,
                            brake: message.brake,
                            clutch : message.clutch
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

    function adddata({throttle, brake, clutch}){
        if (chartInstance.data.labels.length > 50){
            chartInstance.data.labels.splice(0, 1);
        }
        chartInstance.data.labels.push("");

        if (chartInstance.data.datasets[0].data.length > 50){
            chartInstance.data.datasets[0].data.splice(0, 1);
        }
        chartInstance.data.datasets[0].data.push(throttle);

        if (chartInstance.data.datasets[1].data.length > 50){
            chartInstance.data.datasets[1].data.splice(0, 1);
        }
        chartInstance.data.datasets[1].data.push(brake);

        if (chartInstance.data.datasets[2].data.length > 50){
            chartInstance.data.datasets[2].data.splice(0, 1);
        }
        chartInstance.data.datasets[2].data.push(clutch);
        chartInstance.update();
    }

    return (<div>
        <canvas height="200" ref={chartContainer} />
    </div>)
}

export default PedalTimeLine;