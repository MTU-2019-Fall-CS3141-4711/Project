var Canvas = {
    isDrawing: false,
    context: null,
    width: 1,
    height: 1,
    sX: 0,
    sY: 0,
    construct: () => {

    },

    registerCanvas: (c) => {
        Canvas.context = c.getContext("2d");
        Canvas.context.strokeStyle = 'black';
        Canvas.context.lineWidth = 4;
        Canvas.width = c.clientHeight;
        Canvas.height = c.clientWidth;
    },

    paint: (sX, sY, eX, eY) => {
        Canvas.context.beginPath();
        Canvas.context.moveTo(sX, sY);
        Canvas.context.lineTo(eX, eY);
        Canvas.context.stroke();
        Canvas.context.closePath();

        Canvas.sX = eX;
        Canvas.sY = eY;
    }

}

module.exports = Canvas;