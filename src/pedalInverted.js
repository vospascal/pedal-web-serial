const pedalInverted = (cleanString) => {
    const regex = /(INVER:([\d\-\\n]+))/gm
    const matchFoundPedalInverted = cleanString.match(regex);
    if (matchFoundPedalInverted) {
        console.log(cleanString, 'cleanString');
        const splitPedalInverted = cleanString.replaceAll("INVER:", "").split("-");

        const ThrottleInverted = splitPedalInverted[0];
        const BrakeInverted = splitPedalInverted[1];
        const ClutchInverted = splitPedalInverted[2];

        console.log(ThrottleInverted, 'ThrottleInverted');
        console.log(BrakeInverted, 'BrakeInverted');
        console.log(ClutchInverted, 'ClutchInverted');

        // throttleController.setInverted(splitPedalInverted[0]);
        // brakeController.setInverted(splitPedalInverted[1]);
        // clutchController.setInverted(splitPedalInverted[2]);
    }
}

export default pedalInverted;