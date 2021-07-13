const pedalBits = () => {
    const regex = "(BITS:([\\d\\-\\n]+))/g"
    const matchFoundPedalBits = cleanString.match(regex);
    if (matchFoundPedalBits) {
        console.log(cleanString,'cleanString');
        const splitPedalBits = cleanString.replaceAll("BITS:", "").split("-");
        // calibrateController.setBits(
        //     Long.parseLong(splitPedalBits[0]),
        //     Long.parseLong(splitPedalBits[1]),
        //     Long.parseLong(splitPedalBits[2]),
        //     Long.parseLong(splitPedalBits[3]),
        //     Long.parseLong(splitPedalBits[4]),
        //     Long.parseLong(splitPedalBits[5])
        // );
    }
}

export default pedalBits;