"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modifyContent = function (payload) { return ({ type: 'content', payload: payload }); };
exports.config = {
    version: '0.1.0',
    command: [
        {
            name: 'team [name]',
            alias: 't',
            description: '查询队伍信息',
            option: ['--content,-c <type>', 'specify query content', modifyContent]
        }
    ]
};
