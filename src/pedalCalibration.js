const pedalCalibration = (cleanString) => {
    const regex = "(TCALI:([\\d\\-\\n]+),BCALI:([\\d\\-\\n]+),CCALI:([\\d\\-\\n]+))/g"
    const matchFoundPedalCalibration = cleanString.match(regex);

    if (matchFoundPedalCalibration) {
        console.log(cleanString,'cleanString');
        const splitPedalCalibration = cleanString.split(",");

        const ThrottleCalibration = splitPedalCalibration[0].replaceAll("TCALI:", "").split("-").map(function(item) { return parseInt(item, 10); });
        const BrakeCalibration = splitPedalCalibration[1].replaceAll("BCALI:", "").split("-").map(function(item) { return parseInt(item, 10); });
        const ClutchCalibration = splitPedalCalibration[2].replaceAll("CCALI:", "").split("-").map(function(item) { return parseInt(item, 10); });

        // calibrateController.setCalibration(ThrottleCalibration, BrakeCalibration, ClutchCalibration);
    }
}

export default pedalCalibration;