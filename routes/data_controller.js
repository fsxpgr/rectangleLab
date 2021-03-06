const express = require('express'),
    router = express.Router();

module.exports = app => {
    app.use('/', router);
};

// random random int generator 
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// random RGB color generator
const getRandomRGB = () => {
    return `rgb(${getRandomInt(0,255)}, ${getRandomInt(0,255)}, ${getRandomInt(0,255)})`;
};

// processing get request
router.get('/rect', (req, res) => {
    res.json({
        sizeY: getRandomInt(50, 300),
        sizeX: getRandomInt(50, 300),
        color_body: getRandomRGB(),
        color_frame: getRandomRGB(),
        posX: getRandomInt(-200, 200),
        posY: getRandomInt(-150, 150),
        orientation: getRandomInt(0, 360),
        zIndex:1
    });
});
