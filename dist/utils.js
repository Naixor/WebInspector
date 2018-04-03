/**
 * File: src/utils.ts
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-20
 */
function merge(baseObj, extendObj) {
    for (const key in extendObj) {
        baseObj[key] = extendObj[key];
    }
    return baseObj;
}
//# sourceMappingURL=utils.js.map