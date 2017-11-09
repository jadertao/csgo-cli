"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store = {
    state: {
        team: '',
        player: '',
        content: ''
    },
    dispatch: function (action) {
        this.state[action.type] = action.payload;
    },
    getState: function (type) {
        return this.state[type];
    }
};
exports.default = store;
