const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onUserPresenceChange = require("./UserPresence");
exports.deleteRoom = require("./DeleteRoom");