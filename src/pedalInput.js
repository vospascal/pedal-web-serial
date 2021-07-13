const splitPedalInputToMap = (items, toReplace)  => {
    const map = {}
    const replaced = items.replaceAll(toReplace, "");
    const splitItems = replaced.split(";");

    map.after = parseInt(splitItems[0]);
    map.before = parseInt(splitItems[1]);
    map.raw = parseInt(splitItems[2]);
    map.hid = parseInt(splitItems[3]);

    return map;
}


const pedalInput = (cleanString) => {
    const regex = "(T:((\\d+\\.\\d+|\\d+)+[;,])+)(B:((\\d+\\.\\d+|\\d+)+[;,])+)(C:((\\d+\\.\\d+|\\d+)+[;,])+)/g";
    const matchFoundPedalInput = cleanString.match(regex);

    if (matchFoundPedalInput) {
        console.log(cleanString,'cleanString');

        const splitPedalInput = cleanString.split(",");
        if (splitPedalInput.length > 2) {
            const ThrottleValues = splitPedalInputToMap(splitPedalInput[0], "T:");
            const BrakeValues = splitPedalInputToMap(splitPedalInput[1], "B:");
            const ClutchValues = splitPedalInputToMap(splitPedalInput[2], "C:");

            // clutchController.setClutchPosition(ClutchValues);
            // brakeController.setBrakePosition(BrakeValues);
            // throttleController.setThrottlePosition(ThrottleValues);
            //
            // calibrateController.setClutchPositionRaw(ClutchValues);
            // calibrateController.setBrakePositionRaw(BrakeValues);
            // calibrateController.setThrottlePositionRaw(ThrottleValues);
            //
            // timeController.setClutchPosition(ClutchValues);
            // timeController.setBrakePosition(BrakeValues);
            // timeController.setThrottlePosition(ThrottleValues);

        }
    }
}

export default pedalInput;