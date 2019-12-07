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
            Canvas.paint(data.sX, data.sY, data.eX, data.eY, data.c);
        });

        Firebase.database().ref(RoomState.Room_ID + "/canvas").on("child_changed", (snapshot) =>{
            let data = snapshot.val();
            if(data == null){ return; }
            Canvas.paint(data.sX, data.sY, data.eX, data.eY, data.c);
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
     * Send the paint action to Firestore
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
     * Send the erase action to Firestore
     * Our local listener will pick up the changes and draw them
     */
    eraseLine: (startX, startY, endX, endY) => {
        let hash = "" + startX + startY + endX + endY;
        let dataRef = Firebase.database().ref(RoomState.Room_ID + "/canvas/" + hash);

        dataRef.once("value", (snapshot) => {
            if(snapshot.exists()){
                dataRef.remove();
            }else{
                dataRef.set({
                    sX: startX,
                    sY: startY,
                    eX: endX,
                    eY: endY,
                    c: "#ZZZ"
                });
            }
        });
    },

    /**
     * Actually put marks on the Canvas
     */
    paint: (sX, sY, eX, eY, color) => {
        // #ZZZ is our custom code for erase
        if(color == "#ZZZ"){
            Canvas.context.beginPath();
            // Basically says to "extract" color from the canvas rather than inject color into (erase)
            Canvas.context.globalCompositeOperation = "destination-out";
            Canvas.context.arc(eX,eY,8,0,Math.PI*2,false);
            Canvas.context.fill();
            Canvas.context.closePath();
        }else{
            Canvas.context.beginPath();
            // Inject color into or "overwrite" whatever is already there (normal drawing)
            Canvas.context.globalCompositeOperation = "source-over";
            Canvas.context.strokeStyle = color;
            Canvas.context.moveTo(sX, sY);
            Canvas.context.lineTo(eX, eY);
            Canvas.context.stroke();
            Canvas.context.closePath();
        }
    }
}

module.exports = Canvas;