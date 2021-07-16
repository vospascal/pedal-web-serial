import React from "react";
// import { Spring } from "react-spring";

const progressVertical = {
    backgroundColor: '#f5f5f5',
    borderRadius: '3px',
    boxShadow: 'none',
    position: 'relative',
    width: '30px',
    display: 'inline-block',
    marginRight: '10px',
}

const bar = {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    backgroundColor: '#2196f3',
    boxShadow: 'none',
}

const VerticalProgress = ({ progress, height }) => {
    return (
        <div style={{...progressVertical, height:`${height -30}px`}}>
            <div style={{...bar, height: `${progress}%` }} className="progress-bar">
                {/* <span className="sr-only">{`${20}%`}</span> */}
            </div>
        </div>
    );
};

export default VerticalProgress;