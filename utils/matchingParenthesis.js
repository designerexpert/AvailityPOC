exports.matchingParenthesis = str => {
    const openBracketsMem = [];
    const pairsHash = { "{": "}", "[": "]", "(": ")" };
    const closers = { "}": true, "]": true, ")": true };

    for (let i = 0; i < str.length; i++) {
        let currentCharacter = str[i];
        if (pairsHash[currentCharacter]) {
            openBracketsMem.push(currentCharacter);
        } else if (closers[currentCharacter]) {
            if (pairsHash[openBracketsMem.pop()] !== currentCharacter)
                return false;
        }
    }

    return openBracketsMem.length === 0;
};
