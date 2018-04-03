"use strict";
/**
 * File: /Users/qihongye/Workspace/WebInspector/src/cert.ts
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-19
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const EasyCert = require("node-easy-cert");
const fs_1 = require("fs");
const utils_1 = require("./utils");
const easyCert = new EasyCert({
    rootDirPath: getProxyPath('certificates'),
    defaultCertAttrs: [
        { name: 'countryName', value: 'CN' },
        { name: 'organizationName', value: 'WebInspector' },
        { shortName: 'ST', value: 'SH' },
        { shortName: 'OU', value: 'WebInspector SSL Proxy' }
    ]
});
function getProxyPath(name) {
    const dirName = path_1.join(__dirname, '.cert');
    if (!fs_1.existsSync(dirName)) {
        fs_1.mkdirSync(dirName);
    }
    return dirName;
}
function genRootCA(callback) {
    const rootOpts = {
        commonName: 'WebInspector',
        overwrite: false
    };
    easyCert;
}
let certModule = utils_1.merge({}, easyCert);
certModule.genRootCA = genRootCA;
certModule.ifRootCAFileExists = easyCert.isRootCAFileExists;
exports.default = certModule;
//# sourceMappingURL=cert.js.map