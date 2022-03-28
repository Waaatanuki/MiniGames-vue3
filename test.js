const generateRandom = function (row, column) {
    const seed = Math.floor(Math.random() * 100000);
    const randomBar = seed => "0." + Math.sin(seed).toString().substring(6);
    const xy = Math.floor(randomBar(seed) * row * column) + 1;
    console.log(xy);
};

generateRandom(10, 10);
