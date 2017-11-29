"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
exports.paramCheck = name => {
    if (!name) {
        console.log('team or player name is required');
        return false;
    }
    return true;
};
exports.teamCheck = name => {
    if (!exports.paramCheck(name))
        return false;
    if (name in constant_1.TEAM) {
        return true;
    }
    else {
        console.log('there is no such a team');
    }
};
exports.playerCheck = name => {
    if (!exports.paramCheck(name))
        return false;
    if (name in constant_1.TEAM) {
        return true;
    }
    else {
        console.log('there is no such a player');
    }
};
