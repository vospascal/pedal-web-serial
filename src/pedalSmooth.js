const pedalSmooth = (cleanString) => {
    const regex = /(SMOOTH:([\d\-\\n]+))/gm;
    const matchFoundPedalSmooth = cleanString.match(regex);
    if (matchFoundPedalSmooth) {
        console.log(cleanString,'cleanString');
        const splitPedalSmooth = cleanString.replaceAll("SMOOTH:", "").split("-");

        const ThrottleSmooth = splitPedalSmooth[0];
        const BrakeSmooth = splitPedalSmooth[1];
        const ClutchSmooth = splitPedalSmooth[2];

        console.log(ThrottleSmooth, 'ThrottleSmooth');
        console.log(BrakeSmooth, 'BrakeSmooth');
        console.log(ClutchSmooth, 'ClutchSmooth');

        // throttleController.setSmooth(splitPedalSmooth[0]);
        // brakeController.setSmooth(splitPedalSmooth[1]);
        // clutchController.setSmooth(splitPedalSmooth[2]);
    }
}

export default pedalSmooth;