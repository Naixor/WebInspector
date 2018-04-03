"use strict";
/**
 * File: src/getLocalIp.ts
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
function default_1() {
    let ifaces = os.networkInterfaces();
    let lookupIpAddress = null;
    for (let dev in ifaces) {
        ifaces[dev].forEach((details) => {
            console.log(details);
            if (details.family == 'IPv4') {
                lookupIpAddress = details.address;
            }
        });
    }
    return lookupIpAddress;
}
exports.default = default_1;
;
//# sourceMappingURL=getLocalIp.js.map