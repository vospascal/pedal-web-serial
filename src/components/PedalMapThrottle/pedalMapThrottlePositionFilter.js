const splitPedalInputToMap = (items, toReplace) => {
    const map = {}
    const replaced = items.replaceAll(toReplace, "");
    const splitItems = replaced.split(";");

    map.after = parseInt(splitItems[0]);
    map.before = parseInt(splitItems[1]);
    map.raw = parseInt(splitItems[2]);
    map.hid = parseInt(splitItems[3]);
    return map;
}

const pedalMapThrottlePositionFilter = (cleanString) => {
    const regex = /(T:((\d+\.\\d+|\d+)+[;,])+)(B:((\d+\.\d+|\d+)+[;,])+)(C:((\d+\.\d+|\d+)+[;,])+)/gm;
    const matchFoundPedalInput = cleanString.match(regex);

    if (matchFoundPedalInput) {
        const splitPedalInput = cleanString.split(",");
        if (splitPedalInput.length > 2) {
            const ThrottleValues = splitPedalInputToMap(splitPedalInput[0], "T:");
            return {
                throttle: {
                    x: ThrottleValues.after || 0,
                    y: ThrottleValues.before || 0,
                    r: 3 //ticks size
                },
            }
        }
    }

    return {
        throttle: {
            x: 0,
            y:0
        },
    }
}

export default pedalMapThrottlePositionFilter;