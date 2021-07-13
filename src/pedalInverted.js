const pedalInverted = (cleanString) => {
    const regex = "(INVER:([\\d\\-\\n]+))/g"
    const matchFoundPedalInverted = cleanString.match(regex);
    if (matchFoundPedalInverted) {
        console.log(cleanString,'cleanString');
        const splitPedalInverted = cleanString.replaceAll("INVER:", "").split("-");
        // throttleController.setInverted(splitPedalInverted[0]);
        // brakeController.setInverted(splitPedalInverted[1]);
        // clutchController.setInverted(splitPedalInverted[2]);
    }
}

export default pedalInverted;