"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const constant_1 = require("./constant");
exports.log = {
    default: console.log,
    hint: v => console.log(chalk_1.default.greenBright(v)),
    warn: v => console.log(chalk_1.default.yellowBright(v)),
    error: v => console.log(chalk_1.default.redBright(v))
};
exports.paramCheck = name => {
    if (!name) {
        exports.log.warn('team or player name is required');
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
        exports.log.warn('there is no such a team');
    }
};
exports.playerCheck = name => {
    if (!exports.paramCheck(name))
        return false;
    if (name in constant_1.PLAYER) {
        return true;
    }
    else {
        exports.log.warn('there is no such a player');
    }
};
