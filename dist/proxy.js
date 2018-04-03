"use strict";
/**
 * File: src/proxy.ts
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-17
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Proxy = require("http-mitm-proxy");
const fs_1 = require("fs");
const path_1 = require("path");
const http_1 = require("http");
const ip_1 = require("ip");
const proxy = Proxy();
const { gunzip } = Proxy;
proxy.onError((ctx, err) => {
    console.error('error: ', err);
});
proxy.use(gunzip);
proxy.onRequest(function (ctx, callback) {
    ctx.proxyToServerRequestOptions.rejectUnauthorized = false;
    var chunks = [];
    ctx.onResponseData(function (ctx, chunk, callback) {
        chunks.push(chunk);
        return callback(null, null); // don't write chunks to client response
    });
    ctx.onResponseEnd(function (ctx, callback) {
        const body = Buffer.concat(chunks);
        if (ctx.serverToProxyResponse.headers['content-type'] && ctx.serverToProxyResponse.headers['content-type'].indexOf('text/html') === 0) {
            console.log(body.toString());
        }
        ctx.proxyToClientResponse.write(body);
        return callback(null);
    });
    callback(null);
});
proxy.listen({
    port: 8888
});
console.log(ip_1.address(), 8888);
const server = http_1.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/x-x509-ca-cert',
        'Content-Disposition': 'attachment; filename="rootCA.crt"'
    });
    res.end(fs_1.readFileSync(path_1.resolve(__dirname, '../.http-mitm-proxy/certs/ca.pem')));
});
server.listen(8080);
//# sourceMappingURL=proxy.js.map