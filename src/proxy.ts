/**
 * File: src/proxy.ts
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-17
 */

import * as Proxy from 'http-mitm-proxy';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer } from 'http';
import { address } from 'ip';

const proxy = Proxy();
const { gunzip } = Proxy;

proxy.onError((ctx, err) => {
    console.error('error: ', err)
})

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
            console.log(body.toString())
        }
        ctx.proxyToClientResponse.write(body);
        return callback(null);
    });
    callback(null);
});

proxy.listen({
    port: 8888
});

console.log(address(), 8888)

const server = createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/x-x509-ca-cert',
        'Content-Disposition': 'attachment; filename="rootCA.crt"'
    });
    res.end(readFileSync(resolve(__dirname, '../.http-mitm-proxy/certs/ca.pem')));
});

server.listen(8080)
