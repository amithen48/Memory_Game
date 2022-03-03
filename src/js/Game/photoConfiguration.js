function photoConfiguration (numOfCards, numOfLevel, picturesArray, mathHardArray, mathEasyArray, sentencesArray, wordsArray) {
    if(numOfLevel === '1' || numOfLevel === '2' || numOfLevel === '3'){
        const half = picturesArray.splice(0,numOfCards/2);
        return half;
    } 
    else if (numOfLevel === '4' || numOfLevel === '5' || numOfLevel === '6') {
        const pictures = picturesArray.splice(0,numOfCards/4);
        const words = wordsArray.splice(0,numOfCards/4);
        const half = [...pictures, ...words]
        return half;
    }
    else if (numOfLevel === '7' || numOfLevel === '8') {
        const pictures = picturesArray.splice(0,numOfCards/4);
        const mathEasy = mathEasyArray.splice(0,numOfCards/4);
        const half = [...pictures, ...mathEasy]
        return half;
    }
    else if (numOfLevel === '9' || numOfLevel === '10' ) {
        const pictures = picturesArray.splice(0,numOfCards/4);
        const sentences = sentencesArray.splice(0,numOfCards/8);
        const mathEasy = mathEasyArray.splice(0,numOfCards/8);
        const half = [...sentences, ...pictures,...mathEasy]
        return half;
    }
    else if (numOfLevel === '11' || numOfLevel === '12') {
        const mathHard = mathHardArray.splice(0,numOfCards/4);
        const pictures = picturesArray.splice(0,numOfCards/8);
        const sentences = sentencesArray.splice(0,numOfCards/8);
        const half = [...sentences, ...pictures,...mathHard]
        return half;
    }
    else if (numOfLevel === '13' || numOfLevel === '14' || numOfLevel === '15' || numOfLevel === '16') {
        const mathHard = mathHardArray.splice(0,numOfCards/4);
        const sentences = sentencesArray.splice(0,numOfCards/4);
        const half = [...sentences,...mathHard]
        return half;
    }
}

export default photoConfiguration;