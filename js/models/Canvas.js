var Firebase = require("firebase/app");
require("firebase/database");

var RoomState = require("./RoomState");

var Canvas = {
    isDrawing: false,
    context: null,
    width: 1,
    height: 1,
    sX: 0,
    sY: 0,
    construct: () => {
        /**
         * Listen for things being drawn
         * The paint data is stored with sXsYeXeY as keys so if someone draws something
         * that would overwrite that existing spot we need to listen for "child_changed"s too.
         */
        Firebase.database().ref(RoomState.Room_ID + "/canvas").on("child_added", (snapshot) =>{
            let data = snapshot.val();
            if(data == null){ return; }
            Canvas.paint(data.sX, data.sY, data.eX, data.eY);
        });

        Firebase.database().ref(RoomState.Room_ID + "/canvas").on("child_changed", (snapshot) =>{
            let data = snapshot.val();
            if(data == null){ return; }
            Canvas.paint(data.sX, data.sY, data.eX, data.eY);
        });
    },

    /**
     * Pass a reference to the Canvas that was actually generated
     * so we can draw on it.
     */
    registerCanvas: (c) => {
        Canvas.context = c.getContext("2d");
        Canvas.context.strokeStyle = 'black';
        Canvas.context.lineWidth = 4;
        Canvas.width = c.clientHeight;
        Canvas.height = c.clientWidth;
    },

    /**
     * Send the canvas data to Firestore
     * Our local listener will pick up the changes and draw them
     */
    drawLine: (startX, startY, endX, endY, color) => {
        let hash = "" + startX + startY + endX + endY;
        Firebase.database().ref(RoomState.Room_ID + "/canvas/" + hash).set({
            sX: startX,
            sY: startY,
            eX: endX,
            eY: endY,
            c: color
        });

        Canvas.sX = endX;
        Canvas.sY = endY;
    },

    /**
     * Actually put marks on the Canvas
     */
    paint: (sX, sY, eX, eY, color) => {
        Canvas.context.beginPath();
        Canvas.context.moveTo(sX, sY);
        Canvas.context.lineTo(eX, eY);
        Canvas.context.strokeStyle = color;
        Canvas.context.stroke();
        Canvas.context.closePath(); 
    },

    /**
     * Repaint the whole Canvas - for when it Mithril.redraws();
     */
    repaint: () =>{
        Firebase.database().ref(RoomState.Room_ID + "/canvas").once("value").then( (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
                let data = childSnapshot.val();
                if(data == null){ return; }
                Canvas.paint(data.sX, data.sY, data.eX, data.eY, data.c);
            });
        });
    }
}

module.exports = Canvas;