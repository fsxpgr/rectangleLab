const express = require('express'),
    router = express.Router();

module.exports = app => {
    app.use('/', router);
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomRGB = () => {
    return `rgb(${getRandomInt(0,255)}, ${getRandomInt(0,255)}, ${getRandomInt(0,255)})`;
};

router.get('/rect', (req, res) => {
    res.json({
        sizeY: getRandomInt(50, 300),
        sizeX: getRandomInt(50, 300),
        color_body: getRandomRGB(),
        color_frame: getRandomRGB(),
        posX: getRandomInt(-150, 150),
        posY: getRandomInt(-150, 150),
        orientation: getRandomInt(0, 360)
    });
});
