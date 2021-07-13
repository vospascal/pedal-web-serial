const pedalSmooth = (cleanString) => {
    const regex = "(SMOOTH:([\\d\\-\\n]+))/g";
    const matchFoundPedalSmooth = cleanString.match(regex);
    if (matchFoundPedalSmooth) {
        console.log(cleanString,'cleanString');
        const splitPedalSmooth = cleanString.replaceAll("SMOOTH:", "").split("-");
        // throttleController.setSmooth(splitPedalSmooth[0]);
        // brakeController.setSmooth(splitPedalSmooth[1]);
        // clutchController.setSmooth(splitPedalSmooth[2]);
    }
}

export default pedalSmooth;