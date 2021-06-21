function alphabetic (gameOne, gameTwo) {
    let nameOne = gameOne.name.toUpperCase();
    let nameTwo = gameTwo.name.toUpperCase();
    if (nameOne < nameTwo) {
        return -1;
    }
    if (nameOne > nameTwo) {
        return 1;
    }
    return 0;
};