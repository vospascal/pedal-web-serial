const pedalMapFilter = (cleanString) => {
    const regex = /(TMAP:([\d\-\n]+),BMAP:([\d\-\n]+),CMAP:([\d\-\n]+))/gm;
    const matchFoundPedalMap = cleanString.match(regex);

    if (matchFoundPedalMap) {
        console.log(cleanString, 'cleanString');
        const splitPedalMap = cleanString.split(",");

        const ThrottleMap = splitPedalMap[0].replaceAll("TMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const BrakeMap = splitPedalMap[1].replaceAll("BMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });
        const ClutchMap = splitPedalMap[2].replaceAll("CMAP:", "").split("-").map(function (item) {
            return parseInt(item, 10);
        });

        console.log(ThrottleMap, 'ThrottleMap')
        console.log(BrakeMap, 'BrakeMap')
        console.log(ClutchMap, 'ClutchMap')

        // throttleController.setThrottleMap(ThrottleMap);
        // brakeController.setBrakeMap(BrakeMap);
        // clutchController.setClutchMap(ClutchMap);
    }
}

export default pedalMapFilter;