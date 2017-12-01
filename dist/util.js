"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const Progress = require("progress");
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
class waitingHint {
    constructor(hint) {
        this.forward = () => {
            this.bar.tick(1, { title: this.hint });
            if (this.bar.curr > 4) {
                this.backward();
            }
            else {
                this.timer = setTimeout(this.forward, 500);
            }
        };
        this.backward = () => {
            this.bar.tick(-1, { title: this.hint });
            if (this.bar.curr === 0) {
                this.forward();
            }
            else {
                this.timer = setTimeout(this.backward, 500);
            }
        };
        this.hint = hint;
        this.bar = new Progress(':title :bar', {
            complete: '.',
            incomplete: ' ',
            total: 6
        });
        this.terminate = () => {
            clearTimeout(this.timer);
            this.bar.terminate();
        };
    }
}
exports.waitingHint = waitingHint;
exports.printTimeWrap = fn => (args) => __awaiter(this, void 0, void 0, function* () {
    const startTime = (new Date()).getTime();
    const argvs = args ? Array.from(args) : null;
    yield fn.apply(null, argvs);
    const endTime = (new Date()).getTime();
    const duringSecond = (endTime - startTime) / 1000;
    exports.log.hint(`takes ${duringSecond} second`);
});
