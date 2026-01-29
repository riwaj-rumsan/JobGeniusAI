
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.14";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o].call(i.exports, i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], u = true, f = 0; f < o.length; f++) (false & i || a >= i) && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < a && (a = i));
            if (u) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, u] = o2, f = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < l.length; f++) i = l[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 477: () => {
    }, 51: (e, t) => {
      "use strict";
      t.qg = function(e2, t2) {
        let s = new r(), o = e2.length;
        if (o < 2) return s;
        let l = t2?.decode || a, u = 0;
        do {
          let t3 = e2.indexOf("=", u);
          if (-1 === t3) break;
          let r2 = e2.indexOf(";", u), a2 = -1 === r2 ? o : r2;
          if (t3 > a2) {
            u = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let c = n(e2, u, t3), d = i(e2, t3, c), h = e2.slice(c, d);
          if (void 0 === s[h]) {
            let r3 = n(e2, t3 + 1, a2), o2 = i(e2, a2, r3), u2 = l(e2.slice(r3, o2));
            s[h] = u2;
          }
          u = a2 + 1;
        } while (u < o);
        return s;
      }, Object.prototype.toString;
      let r = (() => {
        let e2 = function() {
        };
        return e2.prototype = /* @__PURE__ */ Object.create(null), e2;
      })();
      function n(e2, t2, r2) {
        do {
          let r3 = e2.charCodeAt(t2);
          if (32 !== r3 && 9 !== r3) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function i(e2, t2, r2) {
        for (; t2 > r2; ) {
          let r3 = e2.charCodeAt(--t2);
          if (32 !== r3 && 9 !== r3) return t2 + 1;
        }
        return r2;
      }
      function a(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 454: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s, o, l, u, c, d, h, p, f;
        return t2 = e2.lib.BlockCipher, r2 = e2.algo, n2 = [], i = [], a = [], s = [], o = [], l = [], u = [], c = [], d = [], h = [], function() {
          for (var e3 = [], t3 = 0; t3 < 256; t3++) t3 < 128 ? e3[t3] = t3 << 1 : e3[t3] = t3 << 1 ^ 283;
          for (var r3 = 0, p2 = 0, t3 = 0; t3 < 256; t3++) {
            var f2 = p2 ^ p2 << 1 ^ p2 << 2 ^ p2 << 3 ^ p2 << 4;
            f2 = f2 >>> 8 ^ 255 & f2 ^ 99, n2[r3] = f2, i[f2] = r3;
            var g = e3[r3], m = e3[g], v = e3[m], y = 257 * e3[f2] ^ 16843008 * f2;
            a[r3] = y << 24 | y >>> 8, s[r3] = y << 16 | y >>> 16, o[r3] = y << 8 | y >>> 24, l[r3] = y;
            var y = 16843009 * v ^ 65537 * m ^ 257 * g ^ 16843008 * r3;
            u[f2] = y << 24 | y >>> 8, c[f2] = y << 16 | y >>> 16, d[f2] = y << 8 | y >>> 24, h[f2] = y, r3 ? (r3 = g ^ e3[e3[e3[v ^ g]]], p2 ^= e3[e3[p2]]) : r3 = p2 = 1;
          }
        }(), p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], f = r2.AES = t2.extend({ _doReset: function() {
          if (!this._nRounds || this._keyPriorReset !== this._key) {
            for (var e3, t3 = this._keyPriorReset = this._key, r3 = t3.words, i2 = t3.sigBytes / 4, a2 = ((this._nRounds = i2 + 6) + 1) * 4, s2 = this._keySchedule = [], o2 = 0; o2 < a2; o2++) o2 < i2 ? s2[o2] = r3[o2] : (e3 = s2[o2 - 1], o2 % i2 ? i2 > 6 && o2 % i2 == 4 && (e3 = n2[e3 >>> 24] << 24 | n2[e3 >>> 16 & 255] << 16 | n2[e3 >>> 8 & 255] << 8 | n2[255 & e3]) : e3 = (n2[(e3 = e3 << 8 | e3 >>> 24) >>> 24] << 24 | n2[e3 >>> 16 & 255] << 16 | n2[e3 >>> 8 & 255] << 8 | n2[255 & e3]) ^ p[o2 / i2 | 0] << 24, s2[o2] = s2[o2 - i2] ^ e3);
            for (var l2 = this._invKeySchedule = [], f2 = 0; f2 < a2; f2++) {
              var o2 = a2 - f2;
              if (f2 % 4) var e3 = s2[o2];
              else var e3 = s2[o2 - 4];
              f2 < 4 || o2 <= 4 ? l2[f2] = e3 : l2[f2] = u[n2[e3 >>> 24]] ^ c[n2[e3 >>> 16 & 255]] ^ d[n2[e3 >>> 8 & 255]] ^ h[n2[255 & e3]];
            }
          }
        }, encryptBlock: function(e3, t3) {
          this._doCryptBlock(e3, t3, this._keySchedule, a, s, o, l, n2);
        }, decryptBlock: function(e3, t3) {
          var r3 = e3[t3 + 1];
          e3[t3 + 1] = e3[t3 + 3], e3[t3 + 3] = r3, this._doCryptBlock(e3, t3, this._invKeySchedule, u, c, d, h, i);
          var r3 = e3[t3 + 1];
          e3[t3 + 1] = e3[t3 + 3], e3[t3 + 3] = r3;
        }, _doCryptBlock: function(e3, t3, r3, n3, i2, a2, s2, o2) {
          for (var l2 = this._nRounds, u2 = e3[t3] ^ r3[0], c2 = e3[t3 + 1] ^ r3[1], d2 = e3[t3 + 2] ^ r3[2], h2 = e3[t3 + 3] ^ r3[3], p2 = 4, f2 = 1; f2 < l2; f2++) {
            var g = n3[u2 >>> 24] ^ i2[c2 >>> 16 & 255] ^ a2[d2 >>> 8 & 255] ^ s2[255 & h2] ^ r3[p2++], m = n3[c2 >>> 24] ^ i2[d2 >>> 16 & 255] ^ a2[h2 >>> 8 & 255] ^ s2[255 & u2] ^ r3[p2++], v = n3[d2 >>> 24] ^ i2[h2 >>> 16 & 255] ^ a2[u2 >>> 8 & 255] ^ s2[255 & c2] ^ r3[p2++], y = n3[h2 >>> 24] ^ i2[u2 >>> 16 & 255] ^ a2[c2 >>> 8 & 255] ^ s2[255 & d2] ^ r3[p2++];
            u2 = g, c2 = m, d2 = v, h2 = y;
          }
          var g = (o2[u2 >>> 24] << 24 | o2[c2 >>> 16 & 255] << 16 | o2[d2 >>> 8 & 255] << 8 | o2[255 & h2]) ^ r3[p2++], m = (o2[c2 >>> 24] << 24 | o2[d2 >>> 16 & 255] << 16 | o2[h2 >>> 8 & 255] << 8 | o2[255 & u2]) ^ r3[p2++], v = (o2[d2 >>> 24] << 24 | o2[h2 >>> 16 & 255] << 16 | o2[u2 >>> 8 & 255] << 8 | o2[255 & c2]) ^ r3[p2++], y = (o2[h2 >>> 24] << 24 | o2[u2 >>> 16 & 255] << 16 | o2[c2 >>> 8 & 255] << 8 | o2[255 & d2]) ^ r3[p2++];
          e3[t3] = g, e3[t3 + 1] = m, e3[t3 + 2] = v, e3[t3 + 3] = y;
        }, keySize: 8 }), e2.AES = t2._createHelper(f), e2.AES;
      }, e.exports = n(r(878), r(615), r(379), r(543), r(340));
    }, 340: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s, o, l, u, c, d, h, p, f, g, m, v;
        e2.lib.Cipher || (r2 = (t2 = e2.lib).Base, n2 = t2.WordArray, i = t2.BufferedBlockAlgorithm, (a = e2.enc).Utf8, s = a.Base64, o = e2.algo.EvpKDF, l = t2.Cipher = i.extend({ cfg: r2.extend(), createEncryptor: function(e3, t3) {
          return this.create(this._ENC_XFORM_MODE, e3, t3);
        }, createDecryptor: function(e3, t3) {
          return this.create(this._DEC_XFORM_MODE, e3, t3);
        }, init: function(e3, t3, r3) {
          this.cfg = this.cfg.extend(r3), this._xformMode = e3, this._key = t3, this.reset();
        }, reset: function() {
          i.reset.call(this), this._doReset();
        }, process: function(e3) {
          return this._append(e3), this._process();
        }, finalize: function(e3) {
          return e3 && this._append(e3), this._doFinalize();
        }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: /* @__PURE__ */ function() {
          function e3(e4) {
            return "string" == typeof e4 ? v : g;
          }
          return function(t3) {
            return { encrypt: function(r3, n3, i2) {
              return e3(n3).encrypt(t3, r3, n3, i2);
            }, decrypt: function(r3, n3, i2) {
              return e3(n3).decrypt(t3, r3, n3, i2);
            } };
          };
        }() }), t2.StreamCipher = l.extend({ _doFinalize: function() {
          return this._process(true);
        }, blockSize: 1 }), u = e2.mode = {}, c = t2.BlockCipherMode = r2.extend({ createEncryptor: function(e3, t3) {
          return this.Encryptor.create(e3, t3);
        }, createDecryptor: function(e3, t3) {
          return this.Decryptor.create(e3, t3);
        }, init: function(e3, t3) {
          this._cipher = e3, this._iv = t3;
        } }), d = u.CBC = function() {
          var e3 = c.extend();
          function t3(e4, t4, r3) {
            var n3, i2 = this._iv;
            i2 ? (n3 = i2, this._iv = void 0) : n3 = this._prevBlock;
            for (var a2 = 0; a2 < r3; a2++) e4[t4 + a2] ^= n3[a2];
          }
          return e3.Encryptor = e3.extend({ processBlock: function(e4, r3) {
            var n3 = this._cipher, i2 = n3.blockSize;
            t3.call(this, e4, r3, i2), n3.encryptBlock(e4, r3), this._prevBlock = e4.slice(r3, r3 + i2);
          } }), e3.Decryptor = e3.extend({ processBlock: function(e4, r3) {
            var n3 = this._cipher, i2 = n3.blockSize, a2 = e4.slice(r3, r3 + i2);
            n3.decryptBlock(e4, r3), t3.call(this, e4, r3, i2), this._prevBlock = a2;
          } }), e3;
        }(), h = (e2.pad = {}).Pkcs7 = { pad: function(e3, t3) {
          for (var r3 = 4 * t3, i2 = r3 - e3.sigBytes % r3, a2 = i2 << 24 | i2 << 16 | i2 << 8 | i2, s2 = [], o2 = 0; o2 < i2; o2 += 4) s2.push(a2);
          var l2 = n2.create(s2, i2);
          e3.concat(l2);
        }, unpad: function(e3) {
          var t3 = 255 & e3.words[e3.sigBytes - 1 >>> 2];
          e3.sigBytes -= t3;
        } }, t2.BlockCipher = l.extend({ cfg: l.cfg.extend({ mode: d, padding: h }), reset: function() {
          l.reset.call(this);
          var e3, t3 = this.cfg, r3 = t3.iv, n3 = t3.mode;
          this._xformMode == this._ENC_XFORM_MODE ? e3 = n3.createEncryptor : (e3 = n3.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e3 ? this._mode.init(this, r3 && r3.words) : (this._mode = e3.call(n3, this, r3 && r3.words), this._mode.__creator = e3);
        }, _doProcessBlock: function(e3, t3) {
          this._mode.processBlock(e3, t3);
        }, _doFinalize: function() {
          var e3, t3 = this.cfg.padding;
          return this._xformMode == this._ENC_XFORM_MODE ? (t3.pad(this._data, this.blockSize), e3 = this._process(true)) : (e3 = this._process(true), t3.unpad(e3)), e3;
        }, blockSize: 4 }), p = t2.CipherParams = r2.extend({ init: function(e3) {
          this.mixIn(e3);
        }, toString: function(e3) {
          return (e3 || this.formatter).stringify(this);
        } }), f = (e2.format = {}).OpenSSL = { stringify: function(e3) {
          var t3 = e3.ciphertext, r3 = e3.salt;
          return (r3 ? n2.create([1398893684, 1701076831]).concat(r3).concat(t3) : t3).toString(s);
        }, parse: function(e3) {
          var t3, r3 = s.parse(e3), i2 = r3.words;
          return 1398893684 == i2[0] && 1701076831 == i2[1] && (t3 = n2.create(i2.slice(2, 4)), i2.splice(0, 4), r3.sigBytes -= 16), p.create({ ciphertext: r3, salt: t3 });
        } }, g = t2.SerializableCipher = r2.extend({ cfg: r2.extend({ format: f }), encrypt: function(e3, t3, r3, n3) {
          n3 = this.cfg.extend(n3);
          var i2 = e3.createEncryptor(r3, n3), a2 = i2.finalize(t3), s2 = i2.cfg;
          return p.create({ ciphertext: a2, key: r3, iv: s2.iv, algorithm: e3, mode: s2.mode, padding: s2.padding, blockSize: e3.blockSize, formatter: n3.format });
        }, decrypt: function(e3, t3, r3, n3) {
          return n3 = this.cfg.extend(n3), t3 = this._parse(t3, n3.format), e3.createDecryptor(r3, n3).finalize(t3.ciphertext);
        }, _parse: function(e3, t3) {
          return "string" == typeof e3 ? t3.parse(e3, this) : e3;
        } }), m = (e2.kdf = {}).OpenSSL = { execute: function(e3, t3, r3, i2, a2) {
          if (i2 || (i2 = n2.random(8)), a2) var s2 = o.create({ keySize: t3 + r3, hasher: a2 }).compute(e3, i2);
          else var s2 = o.create({ keySize: t3 + r3 }).compute(e3, i2);
          var l2 = n2.create(s2.words.slice(t3), 4 * r3);
          return s2.sigBytes = 4 * t3, p.create({ key: s2, iv: l2, salt: i2 });
        } }, v = t2.PasswordBasedCipher = g.extend({ cfg: g.cfg.extend({ kdf: m }), encrypt: function(e3, t3, r3, n3) {
          var i2 = (n3 = this.cfg.extend(n3)).kdf.execute(r3, e3.keySize, e3.ivSize, n3.salt, n3.hasher);
          n3.iv = i2.iv;
          var a2 = g.encrypt.call(this, e3, t3, i2.key, n3);
          return a2.mixIn(i2), a2;
        }, decrypt: function(e3, t3, r3, n3) {
          n3 = this.cfg.extend(n3), t3 = this._parse(t3, n3.format);
          var i2 = n3.kdf.execute(r3, e3.keySize, e3.ivSize, t3.salt, n3.hasher);
          return n3.iv = i2.iv, g.decrypt.call(this, e3, t3, i2.key, n3);
        } }));
      }, e.exports = n(r(878), r(543));
    }, 878: function(e, t, r) {
      var n;
      n = function() {
        var e2 = e2 || function(e3, t2) {
          if ("undefined" != typeof window && window.crypto && (n2 = window.crypto), "undefined" != typeof self && self.crypto && (n2 = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (n2 = globalThis.crypto), !n2 && "undefined" != typeof window && window.msCrypto && (n2 = window.msCrypto), !n2 && void 0 !== r.g && r.g.crypto && (n2 = r.g.crypto), !n2) try {
            n2 = r(477);
          } catch (e4) {
          }
          var n2, i = function() {
            if (n2) {
              if ("function" == typeof n2.getRandomValues) try {
                return n2.getRandomValues(new Uint32Array(1))[0];
              } catch (e4) {
              }
              if ("function" == typeof n2.randomBytes) try {
                return n2.randomBytes(4).readInt32LE();
              } catch (e4) {
              }
            }
            throw Error("Native crypto module could not be used to get secure random number.");
          }, a = Object.create || /* @__PURE__ */ function() {
            function e4() {
            }
            return function(t3) {
              var r2;
              return e4.prototype = t3, r2 = new e4(), e4.prototype = null, r2;
            };
          }(), s = {}, o = s.lib = {}, l = o.Base = { extend: function(e4) {
            var t3 = a(this);
            return e4 && t3.mixIn(e4), t3.hasOwnProperty("init") && this.init !== t3.init || (t3.init = function() {
              t3.$super.init.apply(this, arguments);
            }), t3.init.prototype = t3, t3.$super = this, t3;
          }, create: function() {
            var e4 = this.extend();
            return e4.init.apply(e4, arguments), e4;
          }, init: function() {
          }, mixIn: function(e4) {
            for (var t3 in e4) e4.hasOwnProperty(t3) && (this[t3] = e4[t3]);
            e4.hasOwnProperty("toString") && (this.toString = e4.toString);
          }, clone: function() {
            return this.init.prototype.extend(this);
          } }, u = o.WordArray = l.extend({ init: function(e4, r2) {
            e4 = this.words = e4 || [], t2 != r2 ? this.sigBytes = r2 : this.sigBytes = 4 * e4.length;
          }, toString: function(e4) {
            return (e4 || d).stringify(this);
          }, concat: function(e4) {
            var t3 = this.words, r2 = e4.words, n3 = this.sigBytes, i2 = e4.sigBytes;
            if (this.clamp(), n3 % 4) for (var a2 = 0; a2 < i2; a2++) {
              var s2 = r2[a2 >>> 2] >>> 24 - a2 % 4 * 8 & 255;
              t3[n3 + a2 >>> 2] |= s2 << 24 - (n3 + a2) % 4 * 8;
            }
            else for (var o2 = 0; o2 < i2; o2 += 4) t3[n3 + o2 >>> 2] = r2[o2 >>> 2];
            return this.sigBytes += i2, this;
          }, clamp: function() {
            var t3 = this.words, r2 = this.sigBytes;
            t3[r2 >>> 2] &= 4294967295 << 32 - r2 % 4 * 8, t3.length = e3.ceil(r2 / 4);
          }, clone: function() {
            var e4 = l.clone.call(this);
            return e4.words = this.words.slice(0), e4;
          }, random: function(e4) {
            for (var t3 = [], r2 = 0; r2 < e4; r2 += 4) t3.push(i());
            return new u.init(t3, e4);
          } }), c = s.enc = {}, d = c.Hex = { stringify: function(e4) {
            for (var t3 = e4.words, r2 = e4.sigBytes, n3 = [], i2 = 0; i2 < r2; i2++) {
              var a2 = t3[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              n3.push((a2 >>> 4).toString(16)), n3.push((15 & a2).toString(16));
            }
            return n3.join("");
          }, parse: function(e4) {
            for (var t3 = e4.length, r2 = [], n3 = 0; n3 < t3; n3 += 2) r2[n3 >>> 3] |= parseInt(e4.substr(n3, 2), 16) << 24 - n3 % 8 * 4;
            return new u.init(r2, t3 / 2);
          } }, h = c.Latin1 = { stringify: function(e4) {
            for (var t3 = e4.words, r2 = e4.sigBytes, n3 = [], i2 = 0; i2 < r2; i2++) {
              var a2 = t3[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              n3.push(String.fromCharCode(a2));
            }
            return n3.join("");
          }, parse: function(e4) {
            for (var t3 = e4.length, r2 = [], n3 = 0; n3 < t3; n3++) r2[n3 >>> 2] |= (255 & e4.charCodeAt(n3)) << 24 - n3 % 4 * 8;
            return new u.init(r2, t3);
          } }, p = c.Utf8 = { stringify: function(e4) {
            try {
              return decodeURIComponent(escape(h.stringify(e4)));
            } catch (e5) {
              throw Error("Malformed UTF-8 data");
            }
          }, parse: function(e4) {
            return h.parse(unescape(encodeURIComponent(e4)));
          } }, f = o.BufferedBlockAlgorithm = l.extend({ reset: function() {
            this._data = new u.init(), this._nDataBytes = 0;
          }, _append: function(e4) {
            "string" == typeof e4 && (e4 = p.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
          }, _process: function(t3) {
            var r2, n3 = this._data, i2 = n3.words, a2 = n3.sigBytes, s2 = this.blockSize, o2 = a2 / (4 * s2), l2 = (o2 = t3 ? e3.ceil(o2) : e3.max((0 | o2) - this._minBufferSize, 0)) * s2, c2 = e3.min(4 * l2, a2);
            if (l2) {
              for (var d2 = 0; d2 < l2; d2 += s2) this._doProcessBlock(i2, d2);
              r2 = i2.splice(0, l2), n3.sigBytes -= c2;
            }
            return new u.init(r2, c2);
          }, clone: function() {
            var e4 = l.clone.call(this);
            return e4._data = this._data.clone(), e4;
          }, _minBufferSize: 0 });
          o.Hasher = f.extend({ cfg: l.extend(), init: function(e4) {
            this.cfg = this.cfg.extend(e4), this.reset();
          }, reset: function() {
            f.reset.call(this), this._doReset();
          }, update: function(e4) {
            return this._append(e4), this._process(), this;
          }, finalize: function(e4) {
            return e4 && this._append(e4), this._doFinalize();
          }, blockSize: 16, _createHelper: function(e4) {
            return function(t3, r2) {
              return new e4.init(r2).finalize(t3);
            };
          }, _createHmacHelper: function(e4) {
            return function(t3, r2) {
              return new g.HMAC.init(e4, r2).finalize(t3);
            };
          } });
          var g = s.algo = {};
          return s;
        }(Math);
        return e2;
      }, e.exports = n();
    }, 615: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2;
        return t2 = e2.lib.WordArray, e2.enc.Base64 = { stringify: function(e3) {
          var t3 = e3.words, r2 = e3.sigBytes, n2 = this._map;
          e3.clamp();
          for (var i = [], a = 0; a < r2; a += 3) for (var s = (t3[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (t3[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | t3[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, o = 0; o < 4 && a + 0.75 * o < r2; o++) i.push(n2.charAt(s >>> 6 * (3 - o) & 63));
          var l = n2.charAt(64);
          if (l) for (; i.length % 4; ) i.push(l);
          return i.join("");
        }, parse: function(e3) {
          var r2 = e3.length, n2 = this._map, i = this._reverseMap;
          if (!i) {
            i = this._reverseMap = [];
            for (var a = 0; a < n2.length; a++) i[n2.charCodeAt(a)] = a;
          }
          var s = n2.charAt(64);
          if (s) {
            var o = e3.indexOf(s);
            -1 !== o && (r2 = o);
          }
          return function(e4, r3, n3) {
            for (var i2 = [], a2 = 0, s2 = 0; s2 < r3; s2++) if (s2 % 4) {
              var o2 = n3[e4.charCodeAt(s2 - 1)] << s2 % 4 * 2 | n3[e4.charCodeAt(s2)] >>> 6 - s2 % 4 * 2;
              i2[a2 >>> 2] |= o2 << 24 - a2 % 4 * 8, a2++;
            }
            return t2.create(i2, a2);
          }(e3, r2, i);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, e2.enc.Base64;
      }, e.exports = n(r(878));
    }, 367: function(e, t, r) {
      var n;
      n = function(e2) {
        return e2.enc.Hex;
      }, e.exports = n(r(878));
    }, 727: function(e, t, r) {
      var n;
      n = function(e2) {
        return e2.enc.Utf8;
      }, e.exports = n(r(878));
    }, 543: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s;
        return r2 = (t2 = e2.lib).Base, n2 = t2.WordArray, a = (i = e2.algo).MD5, s = i.EvpKDF = r2.extend({ cfg: r2.extend({ keySize: 4, hasher: a, iterations: 1 }), init: function(e3) {
          this.cfg = this.cfg.extend(e3);
        }, compute: function(e3, t3) {
          for (var r3, i2 = this.cfg, a2 = i2.hasher.create(), s2 = n2.create(), o = s2.words, l = i2.keySize, u = i2.iterations; o.length < l; ) {
            r3 && a2.update(r3), r3 = a2.update(e3).finalize(t3), a2.reset();
            for (var c = 1; c < u; c++) r3 = a2.finalize(r3), a2.reset();
            s2.concat(r3);
          }
          return s2.sigBytes = 4 * l, s2;
        } }), e2.EvpKDF = function(e3, t3, r3) {
          return s.create(r3).compute(e3, t3);
        }, e2.EvpKDF;
      }, e.exports = n(r(878), r(964), r(970));
    }, 562: function(e, t, r) {
      var n;
      n = function(e2) {
        return e2.HmacSHA1;
      }, e.exports = n(r(878), r(964), r(970));
    }, 970: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2;
        t2 = e2.lib.Base, r2 = e2.enc.Utf8, e2.algo.HMAC = t2.extend({ init: function(e3, t3) {
          e3 = this._hasher = new e3.init(), "string" == typeof t3 && (t3 = r2.parse(t3));
          var n2 = e3.blockSize, i = 4 * n2;
          t3.sigBytes > i && (t3 = e3.finalize(t3)), t3.clamp();
          for (var a = this._oKey = t3.clone(), s = this._iKey = t3.clone(), o = a.words, l = s.words, u = 0; u < n2; u++) o[u] ^= 1549556828, l[u] ^= 909522486;
          a.sigBytes = s.sigBytes = i, this.reset();
        }, reset: function() {
          var e3 = this._hasher;
          e3.reset(), e3.update(this._iKey);
        }, update: function(e3) {
          return this._hasher.update(e3), this;
        }, finalize: function(e3) {
          var t3 = this._hasher, r3 = t3.finalize(e3);
          return t3.reset(), t3.finalize(this._oKey.clone().concat(r3));
        } });
      }, e.exports = n(r(878));
    }, 379: function(e, t, r) {
      var n;
      n = function(e2) {
        return function(t2) {
          var r2 = e2.lib, n2 = r2.WordArray, i = r2.Hasher, a = e2.algo, s = [];
          !function() {
            for (var e3 = 0; e3 < 64; e3++) s[e3] = 4294967296 * t2.abs(t2.sin(e3 + 1)) | 0;
          }();
          var o = a.MD5 = i.extend({ _doReset: function() {
            this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(e3, t3) {
            for (var r3 = 0; r3 < 16; r3++) {
              var n3 = t3 + r3, i2 = e3[n3];
              e3[n3] = (i2 << 8 | i2 >>> 24) & 16711935 | (i2 << 24 | i2 >>> 8) & 4278255360;
            }
            var a2 = this._hash.words, o2 = e3[t3 + 0], h = e3[t3 + 1], p = e3[t3 + 2], f = e3[t3 + 3], g = e3[t3 + 4], m = e3[t3 + 5], v = e3[t3 + 6], y = e3[t3 + 7], b = e3[t3 + 8], w = e3[t3 + 9], _ = e3[t3 + 10], S = e3[t3 + 11], k = e3[t3 + 12], x = e3[t3 + 13], T = e3[t3 + 14], E = e3[t3 + 15], C = a2[0], O = a2[1], P = a2[2], I = a2[3];
            C = l(C, O, P, I, o2, 7, s[0]), I = l(I, C, O, P, h, 12, s[1]), P = l(P, I, C, O, p, 17, s[2]), O = l(O, P, I, C, f, 22, s[3]), C = l(C, O, P, I, g, 7, s[4]), I = l(I, C, O, P, m, 12, s[5]), P = l(P, I, C, O, v, 17, s[6]), O = l(O, P, I, C, y, 22, s[7]), C = l(C, O, P, I, b, 7, s[8]), I = l(I, C, O, P, w, 12, s[9]), P = l(P, I, C, O, _, 17, s[10]), O = l(O, P, I, C, S, 22, s[11]), C = l(C, O, P, I, k, 7, s[12]), I = l(I, C, O, P, x, 12, s[13]), P = l(P, I, C, O, T, 17, s[14]), O = l(O, P, I, C, E, 22, s[15]), C = u(C, O, P, I, h, 5, s[16]), I = u(I, C, O, P, v, 9, s[17]), P = u(P, I, C, O, S, 14, s[18]), O = u(O, P, I, C, o2, 20, s[19]), C = u(C, O, P, I, m, 5, s[20]), I = u(I, C, O, P, _, 9, s[21]), P = u(P, I, C, O, E, 14, s[22]), O = u(O, P, I, C, g, 20, s[23]), C = u(C, O, P, I, w, 5, s[24]), I = u(I, C, O, P, T, 9, s[25]), P = u(P, I, C, O, f, 14, s[26]), O = u(O, P, I, C, b, 20, s[27]), C = u(C, O, P, I, x, 5, s[28]), I = u(I, C, O, P, p, 9, s[29]), P = u(P, I, C, O, y, 14, s[30]), O = u(O, P, I, C, k, 20, s[31]), C = c(C, O, P, I, m, 4, s[32]), I = c(I, C, O, P, b, 11, s[33]), P = c(P, I, C, O, S, 16, s[34]), O = c(O, P, I, C, T, 23, s[35]), C = c(C, O, P, I, h, 4, s[36]), I = c(I, C, O, P, g, 11, s[37]), P = c(P, I, C, O, y, 16, s[38]), O = c(O, P, I, C, _, 23, s[39]), C = c(C, O, P, I, x, 4, s[40]), I = c(I, C, O, P, o2, 11, s[41]), P = c(P, I, C, O, f, 16, s[42]), O = c(O, P, I, C, v, 23, s[43]), C = c(C, O, P, I, w, 4, s[44]), I = c(I, C, O, P, k, 11, s[45]), P = c(P, I, C, O, E, 16, s[46]), O = c(O, P, I, C, p, 23, s[47]), C = d(C, O, P, I, o2, 6, s[48]), I = d(I, C, O, P, y, 10, s[49]), P = d(P, I, C, O, T, 15, s[50]), O = d(O, P, I, C, m, 21, s[51]), C = d(C, O, P, I, k, 6, s[52]), I = d(I, C, O, P, f, 10, s[53]), P = d(P, I, C, O, _, 15, s[54]), O = d(O, P, I, C, h, 21, s[55]), C = d(C, O, P, I, b, 6, s[56]), I = d(I, C, O, P, E, 10, s[57]), P = d(P, I, C, O, v, 15, s[58]), O = d(O, P, I, C, x, 21, s[59]), C = d(C, O, P, I, g, 6, s[60]), I = d(I, C, O, P, S, 10, s[61]), P = d(P, I, C, O, p, 15, s[62]), O = d(O, P, I, C, w, 21, s[63]), a2[0] = a2[0] + C | 0, a2[1] = a2[1] + O | 0, a2[2] = a2[2] + P | 0, a2[3] = a2[3] + I | 0;
          }, _doFinalize: function() {
            var e3 = this._data, r3 = e3.words, n3 = 8 * this._nDataBytes, i2 = 8 * e3.sigBytes;
            r3[i2 >>> 5] |= 128 << 24 - i2 % 32;
            var a2 = t2.floor(n3 / 4294967296);
            r3[(i2 + 64 >>> 9 << 4) + 15] = (a2 << 8 | a2 >>> 24) & 16711935 | (a2 << 24 | a2 >>> 8) & 4278255360, r3[(i2 + 64 >>> 9 << 4) + 14] = (n3 << 8 | n3 >>> 24) & 16711935 | (n3 << 24 | n3 >>> 8) & 4278255360, e3.sigBytes = (r3.length + 1) * 4, this._process();
            for (var s2 = this._hash, o2 = s2.words, l2 = 0; l2 < 4; l2++) {
              var u2 = o2[l2];
              o2[l2] = (u2 << 8 | u2 >>> 24) & 16711935 | (u2 << 24 | u2 >>> 8) & 4278255360;
            }
            return s2;
          }, clone: function() {
            var e3 = i.clone.call(this);
            return e3._hash = this._hash.clone(), e3;
          } });
          function l(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 & r3 | ~t3 & n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function u(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 & n3 | r3 & ~n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function c(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (t3 ^ r3 ^ n3) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          function d(e3, t3, r3, n3, i2, a2, s2) {
            var o2 = e3 + (r3 ^ (t3 | ~n3)) + i2 + s2;
            return (o2 << a2 | o2 >>> 32 - a2) + t3;
          }
          e2.MD5 = i._createHelper(o), e2.HmacMD5 = i._createHmacHelper(o);
        }(Math), e2.MD5;
      }, e.exports = n(r(878));
    }, 964: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s;
        return r2 = (t2 = e2.lib).WordArray, n2 = t2.Hasher, i = e2.algo, a = [], s = i.SHA1 = n2.extend({ _doReset: function() {
          this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(e3, t3) {
          for (var r3 = this._hash.words, n3 = r3[0], i2 = r3[1], s2 = r3[2], o = r3[3], l = r3[4], u = 0; u < 80; u++) {
            if (u < 16) a[u] = 0 | e3[t3 + u];
            else {
              var c = a[u - 3] ^ a[u - 8] ^ a[u - 14] ^ a[u - 16];
              a[u] = c << 1 | c >>> 31;
            }
            var d = (n3 << 5 | n3 >>> 27) + l + a[u];
            u < 20 ? d += (i2 & s2 | ~i2 & o) + 1518500249 : u < 40 ? d += (i2 ^ s2 ^ o) + 1859775393 : u < 60 ? d += (i2 & s2 | i2 & o | s2 & o) - 1894007588 : d += (i2 ^ s2 ^ o) - 899497514, l = o, o = s2, s2 = i2 << 30 | i2 >>> 2, i2 = n3, n3 = d;
          }
          r3[0] = r3[0] + n3 | 0, r3[1] = r3[1] + i2 | 0, r3[2] = r3[2] + s2 | 0, r3[3] = r3[3] + o | 0, r3[4] = r3[4] + l | 0;
        }, _doFinalize: function() {
          var e3 = this._data, t3 = e3.words, r3 = 8 * this._nDataBytes, n3 = 8 * e3.sigBytes;
          return t3[n3 >>> 5] |= 128 << 24 - n3 % 32, t3[(n3 + 64 >>> 9 << 4) + 14] = Math.floor(r3 / 4294967296), t3[(n3 + 64 >>> 9 << 4) + 15] = r3, e3.sigBytes = 4 * t3.length, this._process(), this._hash;
        }, clone: function() {
          var e3 = n2.clone.call(this);
          return e3._hash = this._hash.clone(), e3;
        } }), e2.SHA1 = n2._createHelper(s), e2.HmacSHA1 = n2._createHmacHelper(s), e2.SHA1;
      }, e.exports = n(r(878));
    }, 182: function(e, t, r) {
      var n;
      n = function(e2) {
        var t2, r2, n2, i, a, s, o, l, u;
        return t2 = Math, n2 = (r2 = e2.lib).WordArray, i = r2.Hasher, a = e2.algo, s = [], o = [], function() {
          function e3(e4) {
            return (e4 - (0 | e4)) * 4294967296 | 0;
          }
          for (var r3 = 2, n3 = 0; n3 < 64; ) (function(e4) {
            for (var r4 = t2.sqrt(e4), n4 = 2; n4 <= r4; n4++) if (!(e4 % n4)) return false;
            return true;
          })(r3) && (n3 < 8 && (s[n3] = e3(t2.pow(r3, 0.5))), o[n3] = e3(t2.pow(r3, 1 / 3)), n3++), r3++;
        }(), l = [], u = a.SHA256 = i.extend({ _doReset: function() {
          this._hash = new n2.init(s.slice(0));
        }, _doProcessBlock: function(e3, t3) {
          for (var r3 = this._hash.words, n3 = r3[0], i2 = r3[1], a2 = r3[2], s2 = r3[3], u2 = r3[4], c = r3[5], d = r3[6], h = r3[7], p = 0; p < 64; p++) {
            if (p < 16) l[p] = 0 | e3[t3 + p];
            else {
              var f = l[p - 15], g = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3, m = l[p - 2], v = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
              l[p] = g + l[p - 7] + v + l[p - 16];
            }
            var y = u2 & c ^ ~u2 & d, b = n3 & i2 ^ n3 & a2 ^ i2 & a2, w = (n3 << 30 | n3 >>> 2) ^ (n3 << 19 | n3 >>> 13) ^ (n3 << 10 | n3 >>> 22), _ = h + ((u2 << 26 | u2 >>> 6) ^ (u2 << 21 | u2 >>> 11) ^ (u2 << 7 | u2 >>> 25)) + y + o[p] + l[p], S = w + b;
            h = d, d = c, c = u2, u2 = s2 + _ | 0, s2 = a2, a2 = i2, i2 = n3, n3 = _ + S | 0;
          }
          r3[0] = r3[0] + n3 | 0, r3[1] = r3[1] + i2 | 0, r3[2] = r3[2] + a2 | 0, r3[3] = r3[3] + s2 | 0, r3[4] = r3[4] + u2 | 0, r3[5] = r3[5] + c | 0, r3[6] = r3[6] + d | 0, r3[7] = r3[7] + h | 0;
        }, _doFinalize: function() {
          var e3 = this._data, r3 = e3.words, n3 = 8 * this._nDataBytes, i2 = 8 * e3.sigBytes;
          return r3[i2 >>> 5] |= 128 << 24 - i2 % 32, r3[(i2 + 64 >>> 9 << 4) + 14] = t2.floor(n3 / 4294967296), r3[(i2 + 64 >>> 9 << 4) + 15] = n3, e3.sigBytes = 4 * r3.length, this._process(), this._hash;
        }, clone: function() {
          var e3 = i.clone.call(this);
          return e3._hash = this._hash.clone(), e3;
        } }), e2.SHA256 = i._createHelper(u), e2.HmacSHA256 = i._createHmacHelper(u), e2.SHA256;
      }, e.exports = n(r(878));
    }, 3: (e) => {
      "use strict";
      let t = (e2) => "object" == typeof e2 && null !== e2, r = Symbol("skip"), n = (e2) => t(e2) && !(e2 instanceof RegExp) && !(e2 instanceof Error) && !(e2 instanceof Date), i = (e2, t2, a, s = /* @__PURE__ */ new WeakMap()) => {
        if (a = { deep: false, target: {}, ...a }, s.has(e2)) return s.get(e2);
        s.set(e2, a.target);
        let { target: o } = a;
        delete a.target;
        let l = (e3) => e3.map((e4) => n(e4) ? i(e4, t2, a, s) : e4);
        if (Array.isArray(e2)) return l(e2);
        for (let [u, c] of Object.entries(e2)) {
          let d = t2(u, c, e2);
          if (d === r) continue;
          let [h, p, { shouldRecurse: f = true } = {}] = d;
          "__proto__" !== h && (a.deep && f && n(p) && (p = Array.isArray(p) ? l(p) : i(p, t2, a, s)), o[h] = p);
        }
        return o;
      };
      e.exports = (e2, r2, n2) => {
        if (!t(e2)) throw TypeError(`Expected an object, got \`${e2}\` (${typeof e2})`);
        return i(e2, r2, n2);
      }, e.exports.mapObjectSkip = r;
    }, 555: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, a = {};
      function s(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[n2, i2], ...a2] = o(e2), { domain: s2, expires: l2, httponly: d2, maxage: h2, path: p, samesite: f, secure: g, partitioned: m, priority: v } = Object.fromEntries(a2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(i2), domain: s2, ...l2 && { expires: new Date(l2) }, ...d2 && { httpOnly: true }, ..."string" == typeof h2 && { maxAge: Number(h2) }, path: p, ...f && { sameSite: u.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...v && { priority: c.includes(r2 = (r2 = v).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2) t(e2, n2, { get: r2[n2], enumerable: true });
      })(a, { RequestCookies: () => d, ResponseCookies: () => h, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => s }), e.exports = ((e2, a2, s2, o2) => {
        if (a2 && "object" == typeof a2 || "function" == typeof a2) for (let l2 of n(a2)) i.call(e2, l2) || l2 === s2 || t(e2, l2, { get: () => a2[l2], enumerable: !(o2 = r(a2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), a);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => s(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => s(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, s2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (n3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (a2 = true, o2 = i3, s2.push(e4.substring(t3, n3)), t3 = o2) : o2 = n3 + 1;
              } else o2 += 1;
              (!a2 || o2 >= e4.length) && s2.push(e4.substring(t3, e4.length));
            }
            return s2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = s(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(s).join("; ");
        }
      };
    }, 777: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), a2 = r2(930), s = "context", o = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(s, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(s) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(s, a2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), a2 = r2(957), s = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, s.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, s.getGlobal)("diag"), c = (0, i2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : a2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, s.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, s.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), a2 = r2(930), s = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(s, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(s) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(s, a2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), a2 = r2(194), s = r2(277), o = r2(369), l = r2(930), u = "propagation", c = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = s.getBaggage, this.getActiveBaggage = s.getActiveBaggage, this.setBaggage = s.setBaggage, this.deleteBaggage = s.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), a2 = r2(139), s = r2(607), o = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = s.deleteSpan, this.getSpan = s.getSpan, this.getActiveSpan = s.getActiveSpan, this.getSpanContext = s.getSpanContext, this.setSpan = s.setSpan, this.setSpanContext = s.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = a2, t3.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), a2 = r2(830), s = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (s.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          }
          function a2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), a2 = r2(130), s = i2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${s}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var a3;
            let s2 = l[o] = null !== (a3 = l[o]) && void 0 !== a3 ? a3 : { version: i2.VERSION };
            if (!n3 && s2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (s2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${s2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return s2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function s(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return s(e4);
              let o = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != o.prerelease || a3.major !== o.major ? s(e4) : 0 === a3.major ? a3.minor === o.minor && a3.patch <= o.patch ? (t4.add(e4), true) : s(e4) : a3.minor <= o.minor ? (t4.add(e4), true) : s(e4);
            };
          }
          t3._makeCompatibilityCheck = a2, t3.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = a2;
          class s extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = s;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends o {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends o {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new s(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), a2 = r2(403), s = r2(139), o = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new a2.NonRecordingSpan();
              let n3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, s.isSpanContextValid)(n3) ? new a2.NonRecordingSpan(n3) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3, s2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (a3 = t4, l2 = r3) : (a3 = t4, s2 = r3, l2 = n3);
              let u = null != s2 ? s2 : o.active(), c = this.startSpan(e3, a3, u), d = (0, i2.setSpan)(u, c);
              return o.with(d, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class a2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = a2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), a2 = r2(491), s = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(s) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(s, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(a2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(s);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r3.slice(0, i3), s = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(s) && e4.set(a2, s);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), s = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return a2.test(e3);
          }, t3.validateValue = function(e3) {
            return s.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), a2 = /^([0-9a-f]{32})$/i, s = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return s.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2) return r2.exports;
          var a2 = n[e2] = { exports: {} }, s = true;
          try {
            t2[e2].call(a2.exports, a2, a2.exports, i), s = false;
          } finally {
            s && delete n[e2];
          }
          return a2.exports;
        }
        i.ab = "//";
        var a = {};
        (() => {
          Object.defineProperty(a, "__esModule", { value: true }), a.trace = a.propagation = a.metrics = a.diag = a.context = a.INVALID_SPAN_CONTEXT = a.INVALID_TRACEID = a.INVALID_SPANID = a.isValidSpanId = a.isValidTraceId = a.isSpanContextValid = a.createTraceState = a.TraceFlags = a.SpanStatusCode = a.SpanKind = a.SamplingDecision = a.ProxyTracerProvider = a.ProxyTracer = a.defaultTextMapSetter = a.defaultTextMapGetter = a.ValueType = a.createNoopMeter = a.DiagLogLevel = a.DiagConsoleLogger = a.ROOT_CONTEXT = a.createContextKey = a.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(a, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(a, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(a, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(a, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(a, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var s = i(102);
          Object.defineProperty(a, "createNoopMeter", { enumerable: true, get: function() {
            return s.createNoopMeter;
          } });
          var o = i(901);
          Object.defineProperty(a, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(a, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(a, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = i(125);
          Object.defineProperty(a, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = i(846);
          Object.defineProperty(a, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(a, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var h = i(357);
          Object.defineProperty(a, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var p = i(847);
          Object.defineProperty(a, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(a, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(a, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(a, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(a, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(a, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var v = i(476);
          Object.defineProperty(a, "INVALID_SPANID", { enumerable: true, get: function() {
            return v.INVALID_SPANID;
          } }), Object.defineProperty(a, "INVALID_TRACEID", { enumerable: true, get: function() {
            return v.INVALID_TRACEID;
          } }), Object.defineProperty(a, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return v.INVALID_SPAN_CONTEXT;
          } });
          let y = i(67);
          Object.defineProperty(a, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let b = i(506);
          Object.defineProperty(a, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let w = i(886);
          Object.defineProperty(a, "metrics", { enumerable: true, get: function() {
            return w.metrics;
          } });
          let _ = i(939);
          Object.defineProperty(a, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = i(845);
          Object.defineProperty(a, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), a.default = { context: y.context, diag: b.diag, metrics: w.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = a;
      })();
    }, 503: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, a = t2.split(n), s = (r2 || {}).decode || e2, o = 0; o < a.length; o++) {
              var l = a[o], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), d = l.substr(++u, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, s));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var a = n2 || {}, s = a.encode || r;
            if ("function" != typeof s) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = s(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != a.maxAge) {
              var u = a.maxAge - 0;
              if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (a.domain) {
              if (!i.test(a.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + a.domain;
            }
            if (a.path) {
              if (!i.test(a.path)) throw TypeError("option path is invalid");
              l += "; Path=" + a.path;
            }
            if (a.expires) {
              if ("function" != typeof a.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly && (l += "; HttpOnly"), a.secure && (l += "; Secure"), a.sameSite) switch ("string" == typeof a.sameSite ? a.sameSite.toLowerCase() : a.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 541: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function a(e3, t3, n3, a2, s2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var o2 = new i2(n3, a2 || e3, s2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], o2] : e3._events[l].push(o2) : (e3._events[l] = o2, e3._eventsCount++), e3;
          }
          function s(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function o() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e3 = this._events) t2.call(e3, n3) && i3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a2 = n3.length, s2 = Array(a2); i3 < a2; i3++) s2[i3] = n3[i3].fn;
            return s2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, o.prototype.emit = function(e3, t3, n3, i3, a2, s2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2]) return false;
            var l, u, c = this._events[o2], d = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e3, c.fn, void 0, true), d) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, n3), true;
                case 4:
                  return c.fn.call(c.context, t3, n3, i3), true;
                case 5:
                  return c.fn.call(c.context, t3, n3, i3, a2), true;
                case 6:
                  return c.fn.call(c.context, t3, n3, i3, a2, s2), true;
              }
              for (u = 1, l = Array(d - 1); u < d; u++) l[u - 1] = arguments[u];
              c.fn.apply(c.context, l);
            } else {
              var h, p = c.length;
              for (u = 0; u < p; u++) switch (c[u].once && this.removeListener(e3, c[u].fn, void 0, true), d) {
                case 1:
                  c[u].fn.call(c[u].context);
                  break;
                case 2:
                  c[u].fn.call(c[u].context, t3);
                  break;
                case 3:
                  c[u].fn.call(c[u].context, t3, n3);
                  break;
                case 4:
                  c[u].fn.call(c[u].context, t3, n3, i3);
                  break;
                default:
                  if (!l) for (h = 1, l = Array(d - 1); h < d; h++) l[h - 1] = arguments[h];
                  c[u].fn.apply(c[u].context, l);
              }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return a(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return a(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, n3, i3) {
            var a2 = r2 ? r2 + e3 : e3;
            if (!this._events[a2]) return this;
            if (!t3) return s(this, a2), this;
            var o2 = this._events[a2];
            if (o2.fn) o2.fn !== t3 || i3 && !o2.once || n3 && o2.context !== n3 || s(this, a2);
            else {
              for (var l = 0, u = [], c = o2.length; l < c; l++) (o2[l].fn !== t3 || i3 && !o2[l].once || n3 && o2[l].context !== n3) && u.push(o2[l]);
              u.length ? this._events[a2] = 1 === u.length ? u[0] : u : s(this, a2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && s(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let a = i2 / 2 | 0, s = n2 + a;
              0 >= r2(e3[s], t3) ? (n2 = ++s, i2 -= a + 1) : i2 = a;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                this._queue.push(r3);
                return;
              }
              let i3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let a = (e3, t3, r3) => new Promise((a2, s) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) {
              a2(e3);
              return;
            }
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  a2(r3());
                } catch (e4) {
                  s(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new i2(n3);
              "function" == typeof e3.cancel && e3.cancel(), s(o2);
            }, t3);
            n2(e3.then(a2, s), () => {
              clearTimeout(o);
            });
          });
          e2.exports = a, e2.exports.default = a, e2.exports.TimeoutError = i2;
        } }, r = {};
        function n(e2) {
          var i2 = r[e2];
          if (void 0 !== i2) return i2.exports;
          var a = r[e2] = { exports: {} }, s = true;
          try {
            t[e2](a, a.exports, n), s = false;
          } finally {
            s && delete r[e2];
          }
          return a.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), a = () => {
          }, s = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, n2, i2, s2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null !== (n2 = null === (t3 = e3.intervalCap) || void 0 === t3 ? void 0 : t3.toString()) && void 0 !== n2 ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null !== (s2 = null === (i2 = e3.interval) || void 0 === i2 ? void 0 : i2.toString()) && void 0 !== s2 ? s2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, i2) => {
                let a2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let a3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(s);
                    });
                    n2(await a3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(a2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = o;
        })(), e.exports = i;
      })();
    }, 544: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray, a = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.iterator, g = Object.prototype.hasOwnProperty, m = Object.assign;
      function v(e2, t2, r2, n2, i2, s2) {
        return { $$typeof: a, type: e2, key: t2, ref: void 0 !== (r2 = s2.ref) ? r2 : null, props: s2 };
      }
      function y(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === a;
      }
      var b = /\/+/g;
      function w(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function _() {
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var o2 = [], l2 = 0;
        return !function e3(t3, r3, o3, l3, u2) {
          var c2, d2, h2, g2 = typeof t3;
          ("undefined" === g2 || "boolean" === g2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (g2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case a:
                case s:
                  m2 = true;
                  break;
                case p:
                  return e3((m2 = t3._init)(t3._payload), r3, o3, l3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === l3 ? "." + w(t3, 0) : l3, i(u2) ? (o3 = "", null != m2 && (o3 = m2.replace(b, "$&/") + "/"), e3(u2, r3, o3, "", function(e4) {
            return e4;
          })) : null != u2 && (y(u2) && (c2 = u2, d2 = o3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(b, "$&/") + "/") + m2, u2 = v(c2.type, d2, void 0, void 0, void 0, c2.props)), r3.push(u2)), 1;
          m2 = 0;
          var S2 = "" === l3 ? "." : l3 + ":";
          if (i(t3)) for (var k2 = 0; k2 < t3.length; k2++) g2 = S2 + w(l3 = t3[k2], k2), m2 += e3(l3, r3, o3, g2, u2);
          else if ("function" == typeof (k2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = f && h2[f] || h2["@@iterator"]) ? h2 : null)) for (t3 = k2.call(t3), k2 = 0; !(l3 = t3.next()).done; ) g2 = S2 + w(l3 = l3.value, k2++), m2 += e3(l3, r3, o3, g2, u2);
          else if ("object" === g2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(_, _) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, o3, l3, u2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, o2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), o2;
      }
      function k(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function x() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!y(e2)) throw Error(n(143));
        return e2;
      } }, t.Fragment = o, t.Profiler = u, t.StrictMode = l, t.Suspense = d, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2) return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(x);
          void 0 === (t2 = n2.get(e2)) && (t2 = T(), n2.set(e2, t2)), n2 = 0;
          for (var i2 = arguments.length; n2 < i2; n2++) {
            var a2 = arguments[n2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var s2 = t2.o;
              null === s2 && (t2.o = s2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = s2.get(a2)) && (t2 = T(), s2.set(a2, t2));
            } else null === (s2 = t2.p) && (t2.p = s2 = /* @__PURE__ */ new Map()), void 0 === (t2 = s2.get(a2)) && (t2 = T(), s2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var i2 = m({}, e2.props), a2 = e2.key, s2 = void 0;
        if (null != t2) for (o2 in void 0 !== t2.ref && (s2 = void 0), void 0 !== t2.key && (a2 = "" + t2.key), t2) g.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (i2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var l2 = Array(o2), u2 = 0; u2 < o2; u2++) l2[u2] = arguments[u2 + 2];
          i2.children = l2;
        }
        return v(e2.type, a2, void 0, void 0, s2, i2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) g.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var s2 = arguments.length - 2;
        if (1 === s2) i2.children = r2;
        else if (1 < s2) {
          for (var o2 = Array(s2), l2 = 0; l2 < s2; l2++) o2[l2] = arguments[l2 + 2];
          i2.children = o2;
        }
        if (e2 && e2.defaultProps) for (n2 in s2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = s2[n2]);
        return v(e2, a2, void 0, void 0, null, i2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: c, render: e2 };
      }, t.isValidElement = y, t.lazy = function(e2) {
        return { $$typeof: p, _payload: { _status: -1, _result: e2 }, _init: k };
      }, t.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.0.0-rc-65e06cb7-20241218";
    }, 886: (e, t, r) => {
      "use strict";
      e.exports = r(544);
    }, 113: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, a2) {
          !function(s2, o2) {
            "use strict";
            var l = "function", u = "undefined", c = "object", d = "string", h = "major", p = "model", f = "name", g = "type", m = "vendor", v = "version", y = "architecture", b = "console", w = "mobile", _ = "tablet", S = "smarttv", k = "wearable", x = "embedded", T = "Amazon", E = "Apple", C = "ASUS", O = "BlackBerry", P = "Browser", I = "Chrome", R = "Firefox", N = "Google", A = "Huawei", M = "Microsoft", U = "Motorola", L = "Opera", D = "Samsung", j = "Sharp", q = "Sony", B = "Xiaomi", H = "Zebra", $ = "Facebook", z = "Chromium OS", K = "Mac OS", F = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2) t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, W = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, J = function(e2, t2) {
              return typeof e2 === d && -1 !== V(t2).indexOf(V(e2));
            }, V = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === d) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, n2, i3, a3, s3, u2, d2 = 0; d2 < t2.length && !s3; ) {
                var h2 = t2[d2], p2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < h2.length && !s3 && h2[r2]; ) if (s3 = h2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) u2 = s3[++n2], typeof (a3 = p2[i3]) === c && a3.length > 0 ? 2 === a3.length ? typeof a3[1] == l ? this[a3[0]] = a3[1].call(this, u2) : this[a3[0]] = a3[1] : 3 === a3.length ? typeof a3[1] !== l || a3[1].exec && a3[1].test ? this[a3[0]] = u2 ? u2.replace(a3[1], a3[2]) : void 0 : this[a3[0]] = u2 ? a3[1].call(this, u2, a3[2]) : void 0 : 4 === a3.length && (this[a3[0]] = u2 ? a3[3].call(this, u2.replace(a3[1], a3[2])) : void 0) : this[a3] = u2 || o2;
                d2 += 2;
              }
            }, Q = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === c && t2[r2].length > 0) {
                for (var n2 = 0; n2 < t2[r2].length; n2++) if (J(t2[r2][n2], e2)) return "?" === r2 ? o2 : r2;
              } else if (J(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [v, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [v, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, v], [/opios[\/ ]+([\w\.]+)/i], [v, [f, L + " Mini"]], [/\bopr\/([\w\.]+)/i], [v, [f, L]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, v], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [v, [f, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [v, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [v, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [v, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [v, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [v, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + P], v], [/\bfocus\/([\w\.]+)/i], [v, [f, R + " Focus"]], [/\bopt\/([\w\.]+)/i], [v, [f, L + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [v, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [v, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [v, [f, L + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [v, [f, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [v, [f, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + P], v], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], v], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, v], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, $], v], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, v], [/\bgsa\/([\w\.]+) .*safari\//i], [v, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [v, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [v, [f, I + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, I + " WebView"], v], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [v, [f, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, v], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [v, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [v, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [v, Q, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, v], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], v], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [v, [f, R + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, v], [/(cobalt)\/([\w\.]+)/i], [f, [v, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, V]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", V]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, V]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [m, D], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [m, D], [g, w]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [m, E], [g, w]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [m, E], [g, _]], [/(macintosh);/i], [p, [m, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [m, j], [g, w]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [m, A], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [m, A], [g, w]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, w]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [m, "OPPO"], [g, w]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [m, "Vivo"], [g, w]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [m, "Realme"], [g, w]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [m, U], [g, w]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [m, U], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [m, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [m, "LG"], [g, w]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [m, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [m, "Nokia"], [g, w]], [/(pixel c)\b/i], [p, [m, N], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [m, N], [g, w]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [m, q], [g, w]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [m, q], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [m, "OnePlus"], [g, w]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [m, T], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [m, T], [g, w]], [/(playbook);[-\w\),; ]+(rim)/i], [p, m, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [m, O], [g, w]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [m, C], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [m, C], [g, w]], [/(nexus 9)/i], [p, [m, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [p, /_/g, " "], [g, w]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [m, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [m, "Meizu"], [g, w]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, p, [g, w]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, p, [g, _]], [/(surface duo)/i], [p, [m, M], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [m, "Fairphone"], [g, w]], [/(u304aa)/i], [p, [m, "AT&T"], [g, w]], [/\bsie-(\w*)/i], [p, [m, "Siemens"], [g, w]], [/\b(rct\w+) b/i], [p, [m, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [m, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [m, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [m, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [m, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [m, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [m, "ZTE"], [g, w]], [/\b(gen\d{3}) b.+49h/i], [p, [m, "Swiss"], [g, w]], [/\b(zur\d{3}) b/i], [p, [m, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [m, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [m, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [m, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], p, [g, w]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], p, [g, w]], [/\b(ph-1) /i], [p, [m, "Essential"], [g, w]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [m, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [m, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [m, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [m, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [m, p, [g, w]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [m, M], [g, w]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [m, H], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [m, H], [g, w]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [m, D], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [p, E + " TV"], [g, S]], [/crkey/i], [[p, I + "cast"], [m, N], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [m, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [m, j], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [m, q], [g, S]], [/(mitv-\w{5}) bui/i], [p, [m, B], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, G], [p, G], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, p, [g, b]], [/droid.+; (shield) bui/i], [p, [m, "Nvidia"], [g, b]], [/(playstation [345portablevi]+)/i], [p, [m, q], [g, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [m, M], [g, b]], [/((pebble))app/i], [m, p, [g, k]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [m, E], [g, k]], [/droid.+; (glass) \d/i], [p, [m, N], [g, k]], [/droid.+; (wt63?0{2,3})\)/i], [p, [m, H], [g, k]], [/(quest( 2| pro)?)/i], [p, [m, $], [g, k]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, x]], [/(aeobc)\b/i], [p, [m, T], [g, x]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, w]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [v, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [v, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, v], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [v, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, v], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [v, Q, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [v, Q, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[v, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, K], [v, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [v, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, v], [/\(bb(10);/i], [v, [f, O]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [v, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [v, [f, R + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [v, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [v, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [v, [f, I + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, z], v], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, v], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], v], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, v]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof s2 !== u && s2.navigator ? s2.navigator : o2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o2, a3 = t2 ? F(Z, t2) : Z, b2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[v] = o2, X.call(t3, n2, a3.browser), t3[h] = typeof (e3 = t3[v]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, b2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = o2, X.call(e3, n2, a3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = o2, e3[p] = o2, e3[g] = o2, X.call(e3, n2, a3.device), b2 && !e3[g] && i3 && i3.mobile && (e3[g] = w), b2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[v] = o2, X.call(e3, n2, a3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[v] = o2, X.call(e3, n2, a3.os), b2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, z).replace(/macos/i, K)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = W([f, v, h]), ee.CPU = W([y]), ee.DEVICE = W([p, m, g, b, w, S, _, k, x]), ee.ENGINE = ee.OS = W([f, v]), typeof a2 !== u ? (i2.exports && (a2 = i2.exports = ee), a2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof s2 !== u && (s2.UAParser = ee);
            var et = typeof s2 !== u && (s2.jQuery || s2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, a = {};
        function s(e2) {
          var t2 = a[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = a[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, s), n2 = false;
          } finally {
            n2 && delete a[e2];
          }
          return r2.exports;
        }
        s.ab = "//";
        var o = s(226);
        e.exports = o;
      })();
    }, 819: (e, t, r) => {
      "use strict";
      r.d(t, { headers: () => g }), r(965), r(308);
      var n = r(590), i = r(553), a = r(108), s = r(923), o = r(886);
      let l = { current: null }, u = "function" == typeof o.cache ? o.cache : (e2) => e2, c = console.warn;
      function d(e2) {
        return function(...t2) {
          c(e2(...t2));
        };
      }
      u((e2) => {
        try {
          c(l.current);
        } finally {
          l.current = null;
        }
      });
      var h = r(135);
      /* @__PURE__ */ new WeakMap(), d(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      });
      var p = r(938);
      function f() {
      }
      function g() {
        let e2 = n.J.getStore(), t2 = i.FP.getStore();
        if (e2) {
          if (t2 && "after" === t2.phase && !(0, h.iC)()) throw Error(`Route ${e2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`);
          if (e2.forceStatic) return v(p.o.seal(new Headers({})));
          if (t2) {
            if ("cache" === t2.type) throw Error(`Route ${e2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === t2.type) throw Error(`Route ${e2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          if (e2.dynamicShouldError) throw new s.f(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (t2) {
            if ("prerender" === t2.type) return function(e3, t3) {
              let r2 = m.get(t3);
              if (r2) return r2;
              let n2 = function(e4, t4) {
                let r3 = new Promise((r4, n3) => {
                  e4.addEventListener("abort", () => {
                    n3(Error(`During prerendering, ${t4} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t4} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`));
                  }, { once: true });
                });
                return r3.catch(f), r3;
              }(t3.renderSignal, "`headers()`");
              return m.set(t3, n2), Object.defineProperties(n2, { append: { value: function() {
                let r3 = `\`headers().append(${y(arguments[0])}, ...)\``, n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, delete: { value: function() {
                let r3 = `\`headers().delete(${y(arguments[0])})\``, n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, get: { value: function() {
                let r3 = `\`headers().get(${y(arguments[0])})\``, n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, has: { value: function() {
                let r3 = `\`headers().has(${y(arguments[0])})\``, n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, set: { value: function() {
                let r3 = `\`headers().set(${y(arguments[0])}, ...)\``, n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, getSetCookie: { value: function() {
                let r3 = "`headers().getSetCookie()`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, forEach: { value: function() {
                let r3 = "`headers().forEach(...)`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, keys: { value: function() {
                let r3 = "`headers().keys()`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, values: { value: function() {
                let r3 = "`headers().values()`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, entries: { value: function() {
                let r3 = "`headers().entries()`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } }, [Symbol.iterator]: { value: function() {
                let r3 = "`headers()[Symbol.iterator]()`", n3 = b(e3, r3);
                (0, a.t3)(e3, r3, n3, t3);
              } } }), n2;
            }(e2.route, t2);
            "prerender-ppr" === t2.type ? (0, a.Ui)(e2.route, "headers", t2.dynamicTracking) : "prerender-legacy" === t2.type && (0, a.xI)("headers", e2, t2);
          }
          (0, a.Pk)(e2, t2);
        }
        return v((0, i.XN)("headers").headers);
      }
      let m = /* @__PURE__ */ new WeakMap();
      function v(e2) {
        let t2 = m.get(e2);
        if (t2) return t2;
        let r2 = Promise.resolve(e2);
        return m.set(e2, r2), Object.defineProperties(r2, { append: { value: e2.append.bind(e2) }, delete: { value: e2.delete.bind(e2) }, get: { value: e2.get.bind(e2) }, has: { value: e2.has.bind(e2) }, set: { value: e2.set.bind(e2) }, getSetCookie: { value: e2.getSetCookie.bind(e2) }, forEach: { value: e2.forEach.bind(e2) }, keys: { value: e2.keys.bind(e2) }, values: { value: e2.values.bind(e2) }, entries: { value: e2.entries.bind(e2) }, [Symbol.iterator]: { value: e2[Symbol.iterator].bind(e2) } }), r2;
      }
      function y(e2) {
        return "string" == typeof e2 ? `'${e2}'` : "...";
      }
      function b(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }
      d(b), r(23), /* @__PURE__ */ new WeakMap();
      function w(e2) {
        let t2 = workAsyncStorage.getStore(), r2 = workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2) {
            if ("cache" === r2.type) throw Error(`Route ${t2.route} used "${e2}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === r2.type) throw Error(`Route ${t2.route} used "${e2}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            if ("after" === r2.phase) throw Error(`Route ${t2.route} used "${e2}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`);
          }
          if (t2.dynamicShouldError) throw new StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (r2) {
            if ("prerender" === r2.type) {
              let n2 = Error(`Route ${t2.route} used ${e2} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`);
              abortAndThrowOnSynchronousRequestDataAccess(t2.route, e2, n2, r2);
            } else if ("prerender-ppr" === r2.type) postponeWithTracking(t2.route, e2, r2.dynamicTracking);
            else if ("prerender-legacy" === r2.type) {
              r2.revalidate = 0;
              let n2 = new DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
              throw t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
            }
          }
        }
      }
      d(function(e2, t2) {
        let r2 = e2 ? `Route "${e2}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      });
    }, 23: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => n });
      class n extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
    }, 923: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 317: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      let n = (0, r(349).xl)();
    }, 349: (e, t, r) => {
      "use strict";
      r.d(t, { cg: () => o, xl: () => s });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function s() {
        return a ? new a() : new i();
      }
      function o(e2) {
        return a ? a.bind(e2) : i.bind(e2);
      }
    }, 108: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => l, Ui: () => u, xI: () => s, Pk: () => o });
      var n = r(886), i = r(23);
      r(923), r(553), r(590);
      let a = "function" == typeof n.unstable_postpone;
      function s(e2, t2, r2) {
        let n2 = new i.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function o(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function l(e2, t2, r2, n2) {
        let i2 = n2.dynamicTracking;
        throw i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicExpression = t2, i2.syncDynamicErrorWithStack = r2, true === n2.validating && (i2.syncDynamicLogged = true)), function(e3, t3, r3) {
          let n3 = d(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
          r3.controller.abort(n3);
          let i3 = r3.dynamicTracking;
          i3 && i3.dynamicAccesses.push({ stack: i3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
        }(e2, t2, n2), d(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function u(e2, t2, r2) {
        (function() {
          if (!a) throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(c(e2, t2));
      }
      function c(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      if (false === function(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }(c("%%%", "^^^"))) throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");
      function d(e2) {
        let t2 = Error(e2);
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 135: (e, t, r) => {
      "use strict";
      r.d(t, { iC: () => i }), r(923);
      var n = r(317);
      function i() {
        let e2 = n.Z.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
    }, 938: (e, t, r) => {
      "use strict";
      r.d(t, { o: () => a });
      var n = r(323);
      class i extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new i();
        }
      }
      class a extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, i2) {
            if ("symbol" == typeof r2) return n.l.get(t2, r2, i2);
            let a2 = r2.toLowerCase(), s = Object.keys(e2).find((e3) => e3.toLowerCase() === a2);
            if (void 0 !== s) return n.l.get(t2, s, i2);
          }, set(t2, r2, i2, a2) {
            if ("symbol" == typeof r2) return n.l.set(t2, r2, i2, a2);
            let s = r2.toLowerCase(), o = Object.keys(e2).find((e3) => e3.toLowerCase() === s);
            return n.l.set(t2, o ?? r2, i2, a2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return n.l.has(t2, r2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 !== a2 && n.l.has(t2, a2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return n.l.deleteProperty(t2, r2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 === a2 || n.l.deleteProperty(t2, a2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return i.callable;
              default:
                return n.l.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new a(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, n2] of this.entries()) e2.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
    }, 323: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 965: (e, t, r) => {
      "use strict";
      r.d(t, { Ck: () => l, K8: () => c, hm: () => d });
      var n = r(308), i = r(323), a = r(590), s = r(553);
      class o extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new o();
        }
      }
      class l {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return o.callable;
              default:
                return i.l.get(e3, t2, r2);
            }
          } });
        }
      }
      let u = Symbol.for("next.mutated.cookies");
      class c {
        static wrap(e2, t2) {
          let r2 = new n.VO(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let s2 = [], o2 = /* @__PURE__ */ new Set(), l2 = () => {
            let e3 = a.J.getStore();
            if (e3 && (e3.pathWasRevalidated = true), s2 = r2.getAll().filter((e4) => o2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of s2) {
                let r3 = new n.VO(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          }, c2 = new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case u:
                return s2;
              case "delete":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.delete(...t4), c2;
                  } finally {
                    l2();
                  }
                };
              case "set":
                return function(...t4) {
                  o2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4), c2;
                  } finally {
                    l2();
                  }
                };
              default:
                return i.l.get(e3, t3, r3);
            }
          } });
          return c2;
        }
      }
      function d(e2) {
        let t2 = new Proxy(e2, { get(e3, r2, n2) {
          switch (r2) {
            case "delete":
              return function(...r3) {
                return h("cookies().delete"), e3.delete(...r3), t2;
              };
            case "set":
              return function(...r3) {
                return h("cookies().set"), e3.set(...r3), t2;
              };
            default:
              return i.l.get(e3, r2, n2);
          }
        } });
        return t2;
      }
      function h(e2) {
        if ("action" !== (0, s.XN)(e2).phase) throw new o();
      }
    }, 308: (e, t, r) => {
      "use strict";
      r.d(t, { Ud: () => n.stringifyCookie, VO: () => n.ResponseCookies, tm: () => n.RequestCookies });
      var n = r(555);
    }, 152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return s;
      }, withRequest: function() {
        return a;
      } });
      let n = new (r(521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function a(e2, t2, r2) {
        let a2 = i(e2, t2);
        return a2 ? n.run(a2, r2) : r2();
      }
      function s(e2, t2) {
        return n.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 53: (e, t, r) => {
      "use strict";
      var n = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return a;
      } });
      let i = r(152), a = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function s(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: s2, cache: o2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: s2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: h, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, a);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, u = await s(o2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok) throw Error(`Proxy request failed: ${c.status}`);
        let d = await c.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? n.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(d);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 384: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return a;
      }, wrapRequestHandler: function() {
        return s;
      } });
      let n = r(152), i = r(53);
      function a() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function s(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 288: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { snakeCase: () => l });
      var n = function() {
        return (n = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var i2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
          return e2;
        }).apply(this, arguments);
      };
      function i(e2) {
        return e2.toLowerCase();
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      var a = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], s = /[^A-Z0-9]+/gi;
      function o(e2, t2, r2) {
        return t2 instanceof RegExp ? e2.replace(t2, r2) : t2.reduce(function(e3, t3) {
          return e3.replace(t3, r2);
        }, e2);
      }
      function l(e2, t2) {
        var r2;
        return void 0 === t2 && (t2 = {}), void 0 === (r2 = n({ delimiter: "_" }, t2)) && (r2 = {}), function(e3, t3) {
          void 0 === t3 && (t3 = {});
          for (var r3 = t3.splitRegexp, n2 = t3.stripRegexp, l2 = t3.transform, u = t3.delimiter, c = o(o(e3, void 0 === r3 ? a : r3, "$1\0$2"), void 0 === n2 ? s : n2, "\0"), d = 0, h = c.length; "\0" === c.charAt(d); ) d++;
          for (; "\0" === c.charAt(h - 1); ) h--;
          return c.slice(d, h).split("\0").map(void 0 === l2 ? i : l2).join(void 0 === u ? " " : u);
        }(e2, n({ delimiter: "." }, r2));
      }
    }, 59: (e, t, r) => {
      "use strict";
      let n = r(3), { snakeCase: i } = r(288), a = {}.constructor;
      e.exports = function(e2, t2) {
        if (Array.isArray(e2)) {
          if (e2.some((e3) => e3.constructor !== a)) throw Error("obj must be array of plain objects");
        } else if (e2.constructor !== a) throw Error("obj must be an plain object");
        return n(e2, function(e3, r2) {
          var n2;
          return [t2.exclude.some(function(t3) {
            return "string" == typeof t3 ? t3 === e3 : t3.test(e3);
          }) ? e3 : i(e3, t2.parsingOptions), r2, (n2 = t2).shouldRecurse ? { shouldRecurse: n2.shouldRecurse(e3, r2) } : void 0];
        }, t2 = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, t2));
      };
    }, 590: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(58).xl)();
    }, 553: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => i, FP: () => n });
      let n = (0, r(58).xl)();
      function i(e2) {
        let t2 = n.getStore();
        if (t2) {
          if ("request" === t2.type) return t2;
          if ("prerender" === t2.type || "prerender-ppr" === t2.type || "prerender-legacy" === t2.type) throw Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`);
          if ("cache" === t2.type) throw Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);
          if ("unstable-cache" === t2.type) throw Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        }
        throw Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
      }
    }, 643: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => af });
      var i, a, s, o, l, u, c, d, h, p, f, g, m, v, y, b, w, _, S, k = {};
      async function x() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(k), r.d(k, { config: () => ac, default: () => au });
      let T = null;
      async function E() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        T || (T = x());
        let e10 = await T;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function C(...e10) {
        let t10 = await x();
        try {
          var r10;
          await (null == t10 ? void 0 : null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let O = null;
      function P() {
        return O || (O = E()), O;
      }
      function I(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Error(I(e10));
        }, construct() {
          throw Error(I(e10));
        }, apply(r10, n10, i10) {
          if ("function" == typeof i10[0]) return i10[0](t10);
          throw Error(I(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), P();
      class R extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class N extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class A extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let M = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser" };
      function U(e10) {
        var t10, r10, n10, i10, a2, s2 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, a2 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (n10 = o2, o2 += 1, l2(), i10 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (a2 = true, o2 = i10, s2.push(e10.substring(t10, n10)), t10 = o2) : o2 = n10 + 1;
          } else o2 += 1;
          (!a2 || o2 >= e10.length) && s2.push(e10.substring(t10, e10.length));
        }
        return s2;
      }
      function L(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n10, i10] of e10.entries()) "set-cookie" === n10.toLowerCase() ? (r10.push(...U(i10)), t10[n10] = 1 === r10.length ? r10[0] : r10) : t10[n10] = i10;
        return t10;
      }
      function D(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...M, GROUP: { builtinReact: [M.reactServerComponents, M.actionBrowser], serverOnly: [M.reactServerComponents, M.actionBrowser, M.instrument, M.middleware], neutralTarget: [M.api], clientOnly: [M.serverSideRendering, M.appPagesBrowser], bundled: [M.reactServerComponents, M.actionBrowser, M.serverSideRendering, M.appPagesBrowser, M.shared, M.instrument], appPages: [M.reactServerComponents, M.serverSideRendering, M.appPagesBrowser, M.actionBrowser] } });
      let j = Symbol("response"), q = Symbol("passThrough"), B = Symbol("waitUntil");
      class H {
        constructor(e10, t10) {
          this[q] = false, this[B] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[j] || (this[j] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[q] = true;
        }
        waitUntil(e10) {
          if ("external" === this[B].kind) return (0, this[B].function)(e10);
          this[B].promises.push(e10);
        }
      }
      class $ extends H {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new R({ page: this.sourcePage });
        }
        respondWith() {
          throw new R({ page: this.sourcePage });
        }
      }
      function z(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function K(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n10 || t10 > -1 ? { pathname: e10.substring(0, n10 ? r10 : t10), query: n10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function F(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = K(e10);
        return "" + t10 + r10 + n10 + i10;
      }
      function W(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n10, hash: i10 } = K(e10);
        return "" + r10 + t10 + n10 + i10;
      }
      function J(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = K(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function V(e10, t10) {
        let r10;
        let n10 = e10.split("/");
        return (t10 || []).some((t11) => !!n10[1] && n10[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, n10.splice(1, 1), e10 = n10.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let G = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function X(e10, t10) {
        return new URL(String(e10).replace(G, "localhost"), t10 && String(t10).replace(G, "localhost"));
      }
      let Q = Symbol("NextURLInternal");
      class Y {
        constructor(e10, t10, r10) {
          let n10, i10;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n10 = t10, i10 = r10 || {}) : i10 = r10 || t10 || {}, this[Q] = { url: X(e10, n10 ?? i10.base), options: i10, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n10, i10;
          let a2 = function(e11, t11) {
            var r11, n11;
            let { basePath: i11, i18n: a3, trailingSlash: s3 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : s3 };
            i11 && J(o3.pathname, i11) && (o3.pathname = function(e12, t12) {
              if (!J(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, i11), o3.basePath = i11);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              o3.buildId = r12, l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (a3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : V(o3.pathname, a3.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (n11 = e12.pathname) ? n11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : V(l2, a3.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[Q].url.pathname, { nextConfig: this[Q].options.nextConfig, parseData: true, i18nProvider: this[Q].options.i18nProvider }), s2 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[Q].url, this[Q].options.headers);
          this[Q].domainLocale = this[Q].options.i18nProvider ? this[Q].options.i18nProvider.detectDomainLocale(s2) : function(e11, t11, r11) {
            if (e11) for (let a3 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var n11, i11;
              if (t11 === (null == (n11 = a3.domain) ? void 0 : n11.split(":", 1)[0].toLowerCase()) || r11 === a3.defaultLocale.toLowerCase() || (null == (i11 = a3.locales) ? void 0 : i11.some((e12) => e12.toLowerCase() === r11))) return a3;
            }
          }(null == (t10 = this[Q].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, s2);
          let o2 = (null == (r10 = this[Q].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i10 = this[Q].options.nextConfig) ? void 0 : null == (n10 = i10.i18n) ? void 0 : n10.defaultLocale);
          this[Q].url.pathname = a2.pathname, this[Q].defaultLocale = o2, this[Q].basePath = a2.basePath ?? "", this[Q].buildId = a2.buildId, this[Q].locale = a2.locale ?? o2, this[Q].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n10) {
            if (!t11 || t11 === r10) return e11;
            let i10 = e11.toLowerCase();
            return !n10 && (J(i10, "/api") || J(i10, "/" + t11.toLowerCase())) ? e11 : F(e11, "/" + t11);
          }((e10 = { basePath: this[Q].basePath, buildId: this[Q].buildId, defaultLocale: this[Q].options.forceLocale ? void 0 : this[Q].defaultLocale, locale: this[Q].locale, pathname: this[Q].url.pathname, trailingSlash: this[Q].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = z(t10)), e10.buildId && (t10 = W(F(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = F(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : W(t10, "/") : z(t10);
        }
        formatSearch() {
          return this[Q].url.search;
        }
        get buildId() {
          return this[Q].buildId;
        }
        set buildId(e10) {
          this[Q].buildId = e10;
        }
        get locale() {
          return this[Q].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[Q].locale || !(null == (r10 = this[Q].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[Q].locale = e10;
        }
        get defaultLocale() {
          return this[Q].defaultLocale;
        }
        get domainLocale() {
          return this[Q].domainLocale;
        }
        get searchParams() {
          return this[Q].url.searchParams;
        }
        get host() {
          return this[Q].url.host;
        }
        set host(e10) {
          this[Q].url.host = e10;
        }
        get hostname() {
          return this[Q].url.hostname;
        }
        set hostname(e10) {
          this[Q].url.hostname = e10;
        }
        get port() {
          return this[Q].url.port;
        }
        set port(e10) {
          this[Q].url.port = e10;
        }
        get protocol() {
          return this[Q].url.protocol;
        }
        set protocol(e10) {
          this[Q].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[Q].url = X(e10), this.analyze();
        }
        get origin() {
          return this[Q].url.origin;
        }
        get pathname() {
          return this[Q].url.pathname;
        }
        set pathname(e10) {
          this[Q].url.pathname = e10;
        }
        get hash() {
          return this[Q].url.hash;
        }
        set hash(e10) {
          this[Q].url.hash = e10;
        }
        get search() {
          return this[Q].url.search;
        }
        set search(e10) {
          this[Q].url.search = e10;
        }
        get password() {
          return this[Q].url.password;
        }
        set password(e10) {
          this[Q].url.password = e10;
        }
        get username() {
          return this[Q].url.username;
        }
        set username(e10) {
          this[Q].url.username = e10;
        }
        get basePath() {
          return this[Q].basePath;
        }
        set basePath(e10) {
          this[Q].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new Y(String(this), this[Q].options);
        }
      }
      var Z = r(308);
      let ee = Symbol("internal request");
      class et extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          D(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n10 = new Y(r10, { headers: L(this.headers), nextConfig: t10.nextConfig });
          this[ee] = { cookies: new Z.tm(this.headers), nextUrl: n10, url: n10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ee].cookies;
        }
        get nextUrl() {
          return this[ee].nextUrl;
        }
        get page() {
          throw new N();
        }
        get ua() {
          throw new A();
        }
        get url() {
          return this[ee].url;
        }
      }
      var er = r(323);
      let en = Symbol("internal response"), ei = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ea(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n10, i10] of e10.request.headers) t10.set("x-middleware-request-" + n10, i10), r11.push(n10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class es extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n10 = new Proxy(new Z.VO(r10), { get(e11, n11, i10) {
            switch (n11) {
              case "delete":
              case "set":
                return (...i11) => {
                  let a2 = Reflect.apply(e11[n11], e11, i11), s2 = new Headers(r10);
                  return a2 instanceof Z.VO && r10.set("x-middleware-set-cookie", a2.getAll().map((e12) => (0, Z.Ud)(e12)).join(",")), ea(t10, s2), a2;
                };
              default:
                return er.l.get(e11, n11, i10);
            }
          } });
          this[en] = { cookies: n10, url: t10.url ? new Y(t10.url, { headers: L(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[en].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new es(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!ei.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n10 = "object" == typeof t10 ? t10 : {}, i10 = new Headers(null == n10 ? void 0 : n10.headers);
          return i10.set("Location", D(e10)), new es(null, { ...n10, headers: i10, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", D(e10)), ea(t10, r10), new es(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ea(e10, t10), new es(null, { ...e10, headers: t10 });
        }
      }
      function eo(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n10 = new URL(e10, t10), i10 = r10.protocol + "//" + r10.host;
        return n10.protocol + "//" + n10.host === i10 ? n10.toString().replace(i10, "") : n10.toString();
      }
      let el = "Next-Router-Prefetch", eu = ["RSC", "Next-Router-State-Tree", el, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], ec = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], ed = ["__nextDataReq"];
      var eh = r(938), ep = r(965), ef = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(ef || {}), eg = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(eg || {}), em = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(em || {}), ev = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(ev || {}), ey = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(ey || {}), eb = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(eb || {}), ew = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(ew || {}), e_ = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(e_ || {}), eS = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(eS || {}), ek = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(ek || {}), ex = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(ex || {}), eT = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eT || {});
      let eE = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], eC = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eO(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: eP, propagation: eI, trace: eR, SpanStatusCode: eN, SpanKind: eA, ROOT_CONTEXT: eM } = n = r(777);
      class eU extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eL = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eU;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eN.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eD = /* @__PURE__ */ new Map(), ej = n.createContextKey("next.rootSpanId"), eq = 0, eB = () => eq++, eH = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class e$ {
        getTracerInstance() {
          return eR.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eP;
        }
        getTracePropagationData() {
          let e10 = eP.active(), t10 = [];
          return eI.inject(e10, t10, eH), t10;
        }
        getActiveScopeSpan() {
          return eR.getSpan(null == eP ? void 0 : eP.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let n10 = eP.active();
          if (eR.getSpanContext(n10)) return t10();
          let i10 = eI.extract(n10, e10, r10);
          return eP.with(i10, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, n10, i10] = e10, { fn: a2, options: s2 } = "function" == typeof n10 ? { fn: n10, options: {} } : { fn: i10, options: { ...n10 } }, o2 = s2.spanName ?? r10;
          if (!eE.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || s2.hideSpan) return a2();
          let l2 = this.getSpanContext((null == s2 ? void 0 : s2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t10 = eR.getSpanContext(l2)) ? void 0 : t10.isRemote) && (u2 = true) : (l2 = (null == eP ? void 0 : eP.active()) ?? eM, u2 = true);
          let c2 = eB();
          return s2.attributes = { "next.span_name": o2, "next.span_type": r10, ...s2.attributes }, eP.with(l2.setValue(ej, c2), () => this.getTracerInstance().startActiveSpan(o2, s2, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n11 = () => {
              eD.delete(c2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && eC.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            u2 && eD.set(c2, new Map(Object.entries(s2.attributes ?? {})));
            try {
              if (a2.length > 1) return a2(e11, (t13) => eL(e11, t13));
              let t12 = a2(e11);
              if (eO(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw eL(e11, t13), t13;
              }).finally(n11);
              return e11.end(), n11(), t12;
            } catch (t12) {
              throw eL(e11, t12), n11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n10, i10] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eE.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n10;
            "function" == typeof e11 && "function" == typeof i10 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, s2 = arguments[a2];
            if ("function" != typeof s2) return t10.trace(r10, e11, () => i10.apply(this, arguments));
            {
              let n11 = t10.getContext().bind(eP.active(), s2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n11.apply(this, arguments);
              }, i10.apply(this, arguments)));
            }
          } : i10;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n10);
        }
        getSpanContext(e10) {
          return e10 ? eR.setSpan(eP.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eP.active().getValue(ej);
          return eD.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eP.active().getValue(ej), n10 = eD.get(r10);
          n10 && n10.set(e10, t10);
        }
      }
      let ez = (() => {
        let e10 = new e$();
        return () => e10;
      })(), eK = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eK);
      class eF {
        constructor(e10, t10, r10, n10) {
          var i10;
          let a2 = e10 && function(e11, t11) {
            let r11 = eh.o.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, s2 = null == (i10 = r10.get(eK)) ? void 0 : i10.value;
          this.isEnabled = !!(!a2 && s2 && e10 && s2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n10;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eK, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eK, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eW(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n10 = new Headers();
          for (let e11 of U(r10)) n10.append("set-cookie", e11);
          for (let e11 of new Z.VO(n10).getAll()) t10.set(e11);
        }
      }
      var eJ = r(553), eV = r(541), eG = r.n(eV);
      class eX extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      var eQ = r(590);
      async function eY(e10, t10) {
        if (!e10) return t10();
        let r10 = eZ(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.revalidatedTags), n10 = new Set(e11.pendingRevalidateWrites);
            return { revalidatedTags: t12.revalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !n10.has(e12)) };
          }(r10, eZ(e10));
          await e0(e10, t11);
        }
      }
      function eZ(e10) {
        return { revalidatedTags: e10.revalidatedTags ? [...e10.revalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e0(e10, { revalidatedTags: t10, pendingRevalidates: r10, pendingRevalidateWrites: n10 }) {
        var i10;
        return Promise.all([null == (i10 = e10.incrementalCache) ? void 0 : i10.revalidateTag(t10), ...Object.values(r10), ...n10]);
      }
      var e1 = r(349), e2 = r(317);
      class e4 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (eG())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eO(e10)) this.waitUntil || e5(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addCallback(e10) {
          this.waitUntil || e5();
          let t10 = eJ.FP.getStore();
          t10 && this.workUnitStores.add(t10);
          let r10 = e2.Z.getStore(), n10 = r10 ? r10.rootTaskSpawnPhase : null == t10 ? void 0 : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i10 = (0, e1.cg)(async () => {
            try {
              await e2.Z.run({ rootTaskSpawnPhase: n10 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i10);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eQ.J.getStore();
          if (!e10) throw new eX("Missing workStore in AfterContext.runCallbacks");
          return eY(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new eX("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function e5() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      class e3 {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e6() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e8 = Symbol.for("@next/request-context");
      class e9 extends et {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new R({ page: this.sourcePage });
        }
        respondWith() {
          throw new R({ page: this.sourcePage });
        }
        waitUntil() {
          throw new R({ page: this.sourcePage });
        }
      }
      let e7 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, te = (e10, t10) => ez().withPropagatedContext(e10.headers, t10, e7), tt = false;
      async function tr(e10) {
        var t10;
        let n10, i10;
        !function() {
          if (!tt && (tt = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(384);
            e11(), te = t11(te);
          }
        }(), await P();
        let a2 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let s2 = new Y(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...s2.searchParams.keys()]) {
          let t11 = s2.searchParams.getAll(e11);
          !function(e12, t12) {
            for (let r10 of ["nxtP", "nxtI"]) e12 !== r10 && e12.startsWith(r10) && t12(e12.substring(r10.length));
          }(e11, (r10) => {
            for (let e12 of (s2.searchParams.delete(r10), t11)) s2.searchParams.append(r10, e12);
            s2.searchParams.delete(e11);
          });
        }
        let o2 = s2.buildId;
        s2.buildId = "";
        let l2 = e10.request.headers["x-nextjs-data"];
        l2 && "/index" === s2.pathname && (s2.pathname = "/");
        let u2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, n11] of Object.entries(e11)) for (let e12 of Array.isArray(n11) ? n11 : [n11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), c2 = /* @__PURE__ */ new Map();
        if (!a2) for (let e11 of eu) {
          let t11 = e11.toLowerCase(), r10 = u2.get(t11);
          r10 && (c2.set(t11, r10), u2.delete(t11));
        }
        let d2 = new e9({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, n11 = r10 ? new URL(e11) : e11;
          for (let e12 of ec) n11.searchParams.delete(e12);
          if (t11) for (let e12 of ed) n11.searchParams.delete(e12);
          return r10 ? n11.toString() : n11;
        }(s2, true).toString(), init: { body: e10.request.body, headers: u2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        l2 && Object.defineProperty(d2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e6() }) }));
        let h2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[e8];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), p2 = new $({ request: d2, page: e10.page, context: h2 ? { waitUntil: h2 } : void 0 });
        if ((n10 = await te(d2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = p2.waitUntil.bind(p2), r10 = new e3();
            return ez().trace(eT.execute, { spanName: `middleware ${d2.method} ${d2.nextUrl.pathname}`, attributes: { "http.target": d2.nextUrl.pathname, "http.method": d2.method } }, async () => {
              try {
                var n11, a3, s3, l3, u3, c3, h3;
                let f3 = e6(), g3 = (u3 = d2.nextUrl, c3 = void 0, h3 = (e11) => {
                  i10 = e11;
                }, function(e11, t12, r11, n12, i11, a4, s4, o3, l4, u4) {
                  function c4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let d3 = {};
                  return { type: "request", phase: e11, implicitTags: i11 ?? [], url: { pathname: n12.pathname, search: n12.search ?? "" }, get headers() {
                    return d3.headers || (d3.headers = function(e12) {
                      let t13 = eh.o.from(e12);
                      for (let e13 of eu) t13.delete(e13.toLowerCase());
                      return eh.o.seal(t13);
                    }(t12.headers)), d3.headers;
                  }, get cookies() {
                    if (!d3.cookies) {
                      let e12 = new Z.tm(eh.o.from(t12.headers));
                      eW(t12, e12), d3.cookies = ep.Ck.seal(e12);
                    }
                    return d3.cookies;
                  }, set cookies(value) {
                    d3.cookies = value;
                  }, get mutableCookies() {
                    if (!d3.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new Z.tm(eh.o.from(e13));
                        return ep.K8.wrap(r12, t13);
                      }(t12.headers, a4 || (r11 ? c4 : void 0));
                      eW(t12, e12), d3.mutableCookies = e12;
                    }
                    return d3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d3.userspaceMutableCookies) {
                      let e12 = (0, ep.hm)(this.mutableCookies);
                      d3.userspaceMutableCookies = e12;
                    }
                    return d3.userspaceMutableCookies;
                  }, get draftMode() {
                    return d3.draftMode || (d3.draftMode = new eF(o3, t12, this.cookies, this.mutableCookies)), d3.draftMode;
                  }, renderResumeDataCache: s4 ?? null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache };
                }("action", d2, void 0, u3, c3, h3, void 0, f3, false, void 0)), m3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: n12, isPrefetchRequest: i11 }) {
                  var a4;
                  let s4 = { isStaticGeneration: !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isServerAction, page: e11, fallbackRouteParams: t12, route: (a4 = e11.split("/").reduce((e12, t13, r12, n13) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === n13.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? a4 : "/" + a4, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: n12, isPrefetchRequest: i11, buildId: r11.buildId, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: n13 } = e12;
                    return new e4({ waitUntil: t13, onClose: r12, onTaskError: n13 });
                  }(r11) };
                  return r11.store = s4, s4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (a3 = e10.request.nextConfig) ? void 0 : null == (n11 = a3.experimental) ? void 0 : n11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) ? void 0 : null == (s3 = l3.experimental) ? void 0 : s3.authInterrupts) }, buildId: o2 ?? "", supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: d2.headers.has(el) });
                return await eQ.J.run(m3, () => eJ.FP.run(g3, e10.handler, d2, p2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(d2, p2);
        })) && !(n10 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        n10 && i10 && n10.headers.set("set-cookie", i10);
        let f2 = null == n10 ? void 0 : n10.headers.get("x-middleware-rewrite");
        if (n10 && f2 && !a2) {
          let t11 = new Y(f2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t11.host === d2.nextUrl.host && (t11.buildId = o2 || t11.buildId, n10.headers.set("x-middleware-rewrite", String(t11)));
          let r10 = eo(String(t11), String(s2));
          l2 && n10.headers.set("x-nextjs-rewrite", r10);
        }
        let g2 = null == n10 ? void 0 : n10.headers.get("Location");
        if (n10 && g2 && !a2) {
          let t11 = new Y(g2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n10 = new Response(n10.body, n10), t11.host === d2.nextUrl.host && (t11.buildId = o2 || t11.buildId, n10.headers.set("Location", String(t11))), l2 && (n10.headers.delete("Location"), n10.headers.set("x-nextjs-redirect", eo(String(t11), String(s2))));
        }
        let m2 = n10 || es.next(), v2 = m2.headers.get("x-middleware-override-headers"), y2 = [];
        if (v2) {
          for (let [e11, t11] of c2) m2.headers.set(`x-middleware-request-${e11}`, t11), y2.push(e11);
          y2.length > 0 && m2.headers.set("x-middleware-override-headers", v2 + "," + y2.join(","));
        }
        return { response: m2, waitUntil: ("internal" === p2[B].kind ? Promise.all(p2[B].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: d2.fetchMetrics };
      }
      Object.getOwnPropertyDescriptor, Object.getOwnPropertyNames, Object.prototype.hasOwnProperty;
      var tn = (e10) => {
        throw TypeError(e10);
      }, ti = (e10, t10, r10) => t10.has(e10) || tn("Cannot " + r10), ta = (e10, t10, r10) => (ti(e10, t10, "read from private field"), r10 ? r10.call(e10) : t10.get(e10)), ts = (e10, t10, r10) => t10.has(e10) ? tn("Cannot add the same private member more than once") : t10 instanceof WeakSet ? t10.add(e10) : t10.set(e10, r10), to = (e10, t10, r10, n10) => (ti(e10, t10, "write to private field"), n10 ? n10.call(e10, r10) : t10.set(e10, r10), r10), tl = (e10, t10, r10) => (ti(e10, t10, "access private method"), r10);
      function tu(e10) {
        return e10.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function tc(e10) {
        return e10 && e10.sensitive ? "" : "i";
      }
      function td(e10, t10, r10) {
        var n10;
        return e10 instanceof RegExp ? function(e11, t11) {
          if (!t11) return e11;
          for (var r11 = /\((?:\?<(.*?)>)?(?!\?)/g, n11 = 0, i10 = r11.exec(e11.source); i10; ) t11.push({ name: i10[1] || n11++, prefix: "", suffix: "", modifier: "", pattern: "" }), i10 = r11.exec(e11.source);
          return e11;
        }(e10, t10) : Array.isArray(e10) ? (n10 = e10.map(function(e11) {
          return td(e11, t10, r10).source;
        }), new RegExp("(?:".concat(n10.join("|"), ")"), tc(r10))) : function(e11, t11, r11) {
          void 0 === r11 && (r11 = {});
          for (var n11 = r11.strict, i10 = void 0 !== n11 && n11, a2 = r11.start, s2 = r11.end, o2 = r11.encode, l2 = void 0 === o2 ? function(e12) {
            return e12;
          } : o2, u2 = r11.delimiter, c2 = r11.endsWith, d2 = "[".concat(tu(void 0 === c2 ? "" : c2), "]|$"), h2 = "[".concat(tu(void 0 === u2 ? "/#?" : u2), "]"), p2 = void 0 === a2 || a2 ? "^" : "", f2 = 0; f2 < e11.length; f2++) {
            var g2 = e11[f2];
            if ("string" == typeof g2) p2 += tu(l2(g2));
            else {
              var m2 = tu(l2(g2.prefix)), v2 = tu(l2(g2.suffix));
              if (g2.pattern) {
                if (t11 && t11.push(g2), m2 || v2) {
                  if ("+" === g2.modifier || "*" === g2.modifier) {
                    var y2 = "*" === g2.modifier ? "?" : "";
                    p2 += "(?:".concat(m2, "((?:").concat(g2.pattern, ")(?:").concat(v2).concat(m2, "(?:").concat(g2.pattern, "))*)").concat(v2, ")").concat(y2);
                  } else p2 += "(?:".concat(m2, "(").concat(g2.pattern, ")").concat(v2, ")").concat(g2.modifier);
                } else {
                  if ("+" === g2.modifier || "*" === g2.modifier) throw TypeError('Can not repeat "'.concat(g2.name, '" without a prefix and suffix'));
                  p2 += "(".concat(g2.pattern, ")").concat(g2.modifier);
                }
              } else p2 += "(?:".concat(m2).concat(v2, ")").concat(g2.modifier);
            }
          }
          if (void 0 === s2 || s2) i10 || (p2 += "".concat(h2, "?")), p2 += r11.endsWith ? "(?=".concat(d2, ")") : "$";
          else {
            var b2 = e11[e11.length - 1], w2 = "string" == typeof b2 ? h2.indexOf(b2[b2.length - 1]) > -1 : void 0 === b2;
            i10 || (p2 += "(?:".concat(h2, "(?=").concat(d2, "))?")), w2 || (p2 += "(?=".concat(h2, "|").concat(d2, ")"));
          }
          return new RegExp(p2, tc(r11));
        }(function(e11, t11) {
          void 0 === t11 && (t11 = {});
          for (var r11 = function(e12) {
            for (var t12 = [], r12 = 0; r12 < e12.length; ) {
              var n12 = e12[r12];
              if ("*" === n12 || "+" === n12 || "?" === n12) {
                t12.push({ type: "MODIFIER", index: r12, value: e12[r12++] });
                continue;
              }
              if ("\\" === n12) {
                t12.push({ type: "ESCAPED_CHAR", index: r12++, value: e12[r12++] });
                continue;
              }
              if ("{" === n12) {
                t12.push({ type: "OPEN", index: r12, value: e12[r12++] });
                continue;
              }
              if ("}" === n12) {
                t12.push({ type: "CLOSE", index: r12, value: e12[r12++] });
                continue;
              }
              if (":" === n12) {
                for (var i11 = "", a3 = r12 + 1; a3 < e12.length; ) {
                  var s3 = e12.charCodeAt(a3);
                  if (s3 >= 48 && s3 <= 57 || s3 >= 65 && s3 <= 90 || s3 >= 97 && s3 <= 122 || 95 === s3) {
                    i11 += e12[a3++];
                    continue;
                  }
                  break;
                }
                if (!i11) throw TypeError("Missing parameter name at ".concat(r12));
                t12.push({ type: "NAME", index: r12, value: i11 }), r12 = a3;
                continue;
              }
              if ("(" === n12) {
                var o3 = 1, l3 = "", a3 = r12 + 1;
                if ("?" === e12[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                for (; a3 < e12.length; ) {
                  if ("\\" === e12[a3]) {
                    l3 += e12[a3++] + e12[a3++];
                    continue;
                  }
                  if (")" === e12[a3]) {
                    if (0 == --o3) {
                      a3++;
                      break;
                    }
                  } else if ("(" === e12[a3] && (o3++, "?" !== e12[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                  l3 += e12[a3++];
                }
                if (o3) throw TypeError("Unbalanced pattern at ".concat(r12));
                if (!l3) throw TypeError("Missing pattern at ".concat(r12));
                t12.push({ type: "PATTERN", index: r12, value: l3 }), r12 = a3;
                continue;
              }
              t12.push({ type: "CHAR", index: r12, value: e12[r12++] });
            }
            return t12.push({ type: "END", index: r12, value: "" }), t12;
          }(e11), n11 = t11.prefixes, i10 = void 0 === n11 ? "./" : n11, a2 = t11.delimiter, s2 = void 0 === a2 ? "/#?" : a2, o2 = [], l2 = 0, u2 = 0, c2 = "", d2 = function(e12) {
            if (u2 < r11.length && r11[u2].type === e12) return r11[u2++].value;
          }, h2 = function(e12) {
            var t12 = d2(e12);
            if (void 0 !== t12) return t12;
            var n12 = r11[u2], i11 = n12.type, a3 = n12.index;
            throw TypeError("Unexpected ".concat(i11, " at ").concat(a3, ", expected ").concat(e12));
          }, p2 = function() {
            for (var e12, t12 = ""; e12 = d2("CHAR") || d2("ESCAPED_CHAR"); ) t12 += e12;
            return t12;
          }, f2 = function(e12) {
            for (var t12 = 0; t12 < s2.length; t12++) {
              var r12 = s2[t12];
              if (e12.indexOf(r12) > -1) return true;
            }
            return false;
          }, g2 = function(e12) {
            var t12 = o2[o2.length - 1], r12 = e12 || (t12 && "string" == typeof t12 ? t12 : "");
            if (t12 && !r12) throw TypeError('Must have text between two parameters, missing text after "'.concat(t12.name, '"'));
            return !r12 || f2(r12) ? "[^".concat(tu(s2), "]+?") : "(?:(?!".concat(tu(r12), ")[^").concat(tu(s2), "])+?");
          }; u2 < r11.length; ) {
            var m2 = d2("CHAR"), v2 = d2("NAME"), y2 = d2("PATTERN");
            if (v2 || y2) {
              var b2 = m2 || "";
              -1 === i10.indexOf(b2) && (c2 += b2, b2 = ""), c2 && (o2.push(c2), c2 = ""), o2.push({ name: v2 || l2++, prefix: b2, suffix: "", pattern: y2 || g2(b2), modifier: d2("MODIFIER") || "" });
              continue;
            }
            var w2 = m2 || d2("ESCAPED_CHAR");
            if (w2) {
              c2 += w2;
              continue;
            }
            if (c2 && (o2.push(c2), c2 = ""), d2("OPEN")) {
              var b2 = p2(), _2 = d2("NAME") || "", S2 = d2("PATTERN") || "", k2 = p2();
              h2("CLOSE"), o2.push({ name: _2 || (S2 ? l2++ : ""), pattern: _2 && !S2 ? g2(b2) : S2, prefix: b2, suffix: k2, modifier: d2("MODIFIER") || "" });
              continue;
            }
            h2("END");
          }
          return o2;
        }(e10, r10), t10, r10);
      }
      var th = (e10) => {
        try {
          return td(e10);
        } catch (t10) {
          throw Error(`Invalid path: ${e10}.
Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${t10.message}`);
        }
      };
      function tp(e10, t10) {
        try {
          var r10, n10, i10, a2, s2;
          return r10 = [], n10 = td(e10, r10, t10), i10 = t10, void 0 === i10 && (i10 = {}), a2 = i10.decode, s2 = void 0 === a2 ? function(e11) {
            return e11;
          } : a2, function(e11) {
            var t11 = n10.exec(e11);
            if (!t11) return false;
            for (var i11 = t11[0], a3 = t11.index, o2 = /* @__PURE__ */ Object.create(null), l2 = 1; l2 < t11.length; l2++) !function(e12) {
              if (void 0 !== t11[e12]) {
                var n11 = r10[e12 - 1];
                "*" === n11.modifier || "+" === n11.modifier ? o2[n11.name] = t11[e12].split(n11.prefix + n11.suffix).map(function(e13) {
                  return s2(e13, n11);
                }) : o2[n11.name] = s2(t11[e12], n11);
              }
            }(l2);
            return { path: i11, index: a3, params: o2 };
          };
        } catch (e11) {
          throw Error(`Invalid path and options: Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp/tree/6.x
${e11.message}`);
        }
      }
      let tf = (e10) => e10.map((e11) => e11 instanceof RegExp ? e11 : th(e11));
      var tg = { InvalidSecretKey: "clerk_key_invalid" }, tm = { TokenExpired: "token-expired", TokenInvalid: "token-invalid", TokenInvalidAlgorithm: "token-invalid-algorithm", TokenInvalidAuthorizedParties: "token-invalid-authorized-parties", TokenInvalidSignature: "token-invalid-signature", TokenNotActiveYet: "token-not-active-yet", TokenIatInTheFuture: "token-iat-in-the-future", TokenVerificationFailed: "token-verification-failed", InvalidSecretKey: "secret-key-invalid", LocalJWKMissing: "jwk-local-missing", RemoteJWKFailedToLoad: "jwk-remote-failed-to-load", JWKFailedToResolve: "jwk-failed-to-resolve", JWKKidMismatch: "jwk-kid-mismatch" }, tv = { ContactSupport: "Contact support@clerk.com", EnsureClerkJWT: "Make sure that this is a valid Clerk generate JWT.", SetClerkJWTKey: "Set the CLERK_JWT_KEY environment variable.", SetClerkSecretKey: "Set the CLERK_SECRET_KEY environment variable." }, ty = class e10 extends Error {
        constructor({ action: t10, message: r10, reason: n10 }) {
          super(r10), Object.setPrototypeOf(this, e10.prototype), this.reason = n10, this.message = r10, this.action = t10;
        }
        getFullMessage() {
          return `${[this.message, this.action].filter((e11) => e11).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
        }
      };
      let tb = crypto;
      var tw = (e10) => "undefined" != typeof atob && "function" == typeof atob ? atob(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10, "base64").toString() : e10, t_ = fetch.bind(globalThis), tS = { crypto: tb, get fetch() {
        return t_;
      }, AbortController: globalThis.AbortController, Blob: globalThis.Blob, FormData: globalThis.FormData, Headers: globalThis.Headers, Request: globalThis.Request, Response: globalThis.Response }, tk = { parse: (e10, t10) => function(e11, t11, r10 = {}) {
        if (!t11.codes) {
          t11.codes = {};
          for (let e12 = 0; e12 < t11.chars.length; ++e12) t11.codes[t11.chars[e12]] = e12;
        }
        if (!r10.loose && e11.length * t11.bits & 7) throw SyntaxError("Invalid padding");
        let n10 = e11.length;
        for (; "=" === e11[n10 - 1]; ) if (--n10, !r10.loose && !((e11.length - n10) * t11.bits & 7)) throw SyntaxError("Invalid padding");
        let i10 = new (r10.out ?? Uint8Array)(n10 * t11.bits / 8 | 0), a2 = 0, s2 = 0, o2 = 0;
        for (let r11 = 0; r11 < n10; ++r11) {
          let n11 = t11.codes[e11[r11]];
          if (void 0 === n11) throw SyntaxError("Invalid character " + e11[r11]);
          s2 = s2 << t11.bits | n11, (a2 += t11.bits) >= 8 && (a2 -= 8, i10[o2++] = 255 & s2 >> a2);
        }
        if (a2 >= t11.bits || 255 & s2 << 8 - a2) throw SyntaxError("Unexpected end of data");
        return i10;
      }(e10, tx, t10) }, tx = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bits: 6 }, tT = { RS256: "SHA-256", RS384: "SHA-384", RS512: "SHA-512" }, tE = "RSASSA-PKCS1-v1_5", tC = { RS256: tE, RS384: tE, RS512: tE }, tO = Object.keys(tT), tP = (e10) => Array.isArray(e10) && e10.length > 0 && e10.every((e11) => "string" == typeof e11), tI = (e10, t10) => {
        let r10 = [t10].flat().filter((e11) => !!e11), n10 = [e10].flat().filter((e11) => !!e11);
        if (r10.length > 0 && n10.length > 0) {
          if ("string" == typeof e10) {
            if (!r10.includes(e10)) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Invalid JWT audience claim (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
          } else if (tP(e10) && !e10.some((e11) => r10.includes(e11))) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Invalid JWT audience claim array (aud) ${JSON.stringify(e10)}. Is not included in "${JSON.stringify(r10)}".` });
        }
      }, tR = (e10) => {
        if (void 0 !== e10 && "JWT" !== e10) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenInvalid, message: `Invalid JWT type ${JSON.stringify(e10)}. Expected "JWT".` });
      }, tN = (e10) => {
        if (!tO.includes(e10)) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenInvalidAlgorithm, message: `Invalid JWT algorithm ${JSON.stringify(e10)}. Supported: ${tO}.` });
      }, tA = (e10) => {
        if ("string" != typeof e10) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(e10)}.` });
      }, tM = (e10, t10) => {
        if (e10 && t10 && 0 !== t10.length && !t10.includes(e10)) throw new ty({ reason: tm.TokenInvalidAuthorizedParties, message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(e10)}. Expected "${t10}".` });
      }, tU = (e10, t10) => {
        if ("number" != typeof e10) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() <= r10.getTime() - t10) throw new ty({ reason: tm.TokenExpired, message: `JWT is expired. Expiry date: ${n10.toUTCString()}, Current date: ${r10.toUTCString()}.` });
      }, tL = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new ty({ reason: tm.TokenNotActiveYet, message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      }, tD = (e10, t10) => {
        if (void 0 === e10) return;
        if ("number" != typeof e10) throw new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(e10)}. Expected number.` });
        let r10 = new Date(Date.now()), n10 = /* @__PURE__ */ new Date(0);
        if (n10.setUTCSeconds(e10), n10.getTime() > r10.getTime() + t10) throw new ty({ reason: tm.TokenIatInTheFuture, message: `JWT issued at date claim (iat) is in the future. Issued at date: ${n10.toUTCString()}; Current date: ${r10.toUTCString()};` });
      };
      async function tj(e10, t10) {
        let { header: r10, signature: n10, raw: i10 } = e10, a2 = new TextEncoder().encode([i10.header, i10.payload].join(".")), s2 = function(e11) {
          let t11 = tT[e11], r11 = tC[e11];
          if (!t11 || !r11) throw Error(`Unsupported algorithm ${e11}, expected one of ${tO.join(",")}.`);
          return { hash: { name: tT[e11] }, name: tC[e11] };
        }(r10.alg);
        try {
          let e11 = await function(e12, t11, r11) {
            if ("object" == typeof e12) return tS.crypto.subtle.importKey("jwk", e12, t11, false, [r11]);
            let n11 = function(e13) {
              let t12 = tw(e13.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")), r12 = new Uint8Array(new ArrayBuffer(t12.length));
              for (let e14 = 0, n12 = t12.length; e14 < n12; e14++) r12[e14] = t12.charCodeAt(e14);
              return r12;
            }(e12), i11 = "sign" === r11 ? "pkcs8" : "spki";
            return tS.crypto.subtle.importKey(i11, n11, t11, false, [r11]);
          }(t10, s2, "verify");
          return { data: await tS.crypto.subtle.verify(s2.name, e11, n10, a2) };
        } catch (e11) {
          return { errors: [new ty({ reason: tm.TokenInvalidSignature, message: e11?.message })] };
        }
      }
      function tq(e10) {
        let t10 = (e10 || "").toString().split(".");
        if (3 !== t10.length) return { errors: [new ty({ reason: tm.TokenInvalid, message: "Invalid JWT form. A JWT consists of three parts separated by dots." })] };
        let [r10, n10, i10] = t10, a2 = new TextDecoder(), s2 = JSON.parse(a2.decode(tk.parse(r10, { loose: true })));
        return { data: { header: s2, payload: JSON.parse(a2.decode(tk.parse(n10, { loose: true }))), signature: tk.parse(i10, { loose: true }), raw: { header: r10, payload: n10, signature: i10, text: e10 } } };
      }
      async function tB(e10, t10) {
        let { audience: r10, authorizedParties: n10, clockSkewInMs: i10, key: a2 } = t10, s2 = i10 || 5e3, { data: o2, errors: l2 } = tq(e10);
        if (l2) return { errors: l2 };
        let { header: u2, payload: c2 } = o2;
        try {
          let { typ: e11, alg: t11 } = u2;
          tR(e11), tN(t11);
          let { azp: i11, sub: a3, aud: o3, iat: l3, exp: d3, nbf: h3 } = c2;
          tA(a3), tI([o3], [r10]), tM(i11, n10), tU(d3, s2), tL(h3, s2), tD(l3, s2);
        } catch (e11) {
          return { errors: [e11] };
        }
        let { data: d2, errors: h2 } = await tj(o2, a2);
        return h2 ? { errors: [new ty({ action: tv.EnsureClerkJWT, reason: tm.TokenVerificationFailed, message: `Error verifying JWT signature. ${h2[0]}` })] } : d2 ? { data: c2 } : { errors: [new ty({ reason: tm.TokenInvalidSignature, message: "JWT signature is invalid." })] };
      }
      function tH(e10) {
        var t10, r10, n10, i10, a2;
        return { code: e10.code, message: e10.message, longMessage: e10.long_message, meta: { paramName: null == (t10 = null == e10 ? void 0 : e10.meta) ? void 0 : t10.param_name, sessionId: null == (r10 = null == e10 ? void 0 : e10.meta) ? void 0 : r10.session_id, emailAddresses: null == (n10 = null == e10 ? void 0 : e10.meta) ? void 0 : n10.email_addresses, identifiers: null == (i10 = null == e10 ? void 0 : e10.meta) ? void 0 : i10.identifiers, zxcvbn: null == (a2 = null == e10 ? void 0 : e10.meta) ? void 0 : a2.zxcvbn } };
      }
      var t$ = class e10 extends Error {
        constructor(t10, { data: r10, status: n10, clerkTraceId: i10 }) {
          super(t10), this.toString = () => {
            let e11 = `[${this.name}]
Message:${this.message}
Status:${this.status}
Serialized errors: ${this.errors.map((e12) => JSON.stringify(e12))}`;
            return this.clerkTraceId && (e11 += `
Clerk Trace ID: ${this.clerkTraceId}`), e11;
          }, Object.setPrototypeOf(this, e10.prototype), this.status = n10, this.message = t10, this.clerkTraceId = i10, this.clerkError = true, this.errors = function(e11 = []) {
            return e11.length > 0 ? e11.map(tH) : [];
          }(r10);
        }
      }, tz = Object.freeze({ InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})", InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})", MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.", MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider" });
      function tK({ packageName: e10, customMessages: t10 }) {
        let r10 = e10, n10 = { ...tz, ...t10 };
        function i10(e11, t11) {
          if (!t11) return `${r10}: ${e11}`;
          let n11 = e11;
          for (let r11 of e11.matchAll(/{{([a-zA-Z0-9-_]+)}}/g)) {
            let e12 = (t11[r11[1]] || "").toString();
            n11 = n11.replace(`{{${r11[1]}}}`, e12);
          }
          return `${r10}: ${n11}`;
        }
        return { setPackageName({ packageName: e11 }) {
          return "string" == typeof e11 && (r10 = e11), this;
        }, setMessages({ customMessages: e11 }) {
          return Object.assign(n10, e11 || {}), this;
        }, throwInvalidPublishableKeyError(e11) {
          throw Error(i10(n10.InvalidPublishableKeyErrorMessage, e11));
        }, throwInvalidProxyUrl(e11) {
          throw Error(i10(n10.InvalidProxyUrlErrorMessage, e11));
        }, throwMissingPublishableKeyError() {
          throw Error(i10(n10.MissingPublishableKeyErrorMessage));
        }, throwMissingSecretKeyError() {
          throw Error(i10(n10.MissingSecretKeyErrorMessage));
        }, throwMissingClerkProviderError(e11) {
          throw Error(i10(n10.MissingClerkProvider, e11));
        }, throw(e11) {
          throw Error(i10(e11));
        } };
      }
      var tF = r(59);
      async function tW(e10, t10 = 1, r10 = 5) {
        try {
          return await e10();
        } catch (i10) {
          var n10;
          if (t10 >= r10) throw i10;
          return await (n10 = 2 ** t10 * 100, new Promise((e11) => setTimeout(e11, n10))), tW(e10, t10 + 1, r10);
        }
      }
      var tJ = (e10) => "undefined" != typeof btoa && "function" == typeof btoa ? btoa(e10) : "undefined" != typeof global && global.Buffer ? new global.Buffer(e10).toString("base64") : e10, tV = [".lcl.dev", ".lclstage.dev", ".lclclerk.com"], tG = [".lcl.dev", ".stg.dev", ".lclstage.dev", ".stgstage.dev", ".dev.lclclerk.com", ".stg.lclclerk.com", ".accounts.lclclerk.com", "accountsstage.dev", "accounts.dev"], tX = [".lcl.dev", "lclstage.dev", ".lclclerk.com", ".accounts.lclclerk.com"], tQ = [".accountsstage.dev"], tY = "https://api.clerk.com", tZ = "pk_live_";
      function t0(e10, t10 = {}) {
        if (!(e10 = e10 || "") || !t1(e10)) {
          if (t10.fatal && !e10) throw Error("Publishable key is missing. Ensure that your publishable key is correctly configured. Double-check your environment configuration for your keys, or access them here: https://dashboard.clerk.com/last-active?path=api-keys");
          if (t10.fatal && !t1(e10)) throw Error("Publishable key not valid.");
          return null;
        }
        let r10 = e10.startsWith(tZ) ? "production" : "development", n10 = tw(e10.split("_")[2]);
        return n10 = n10.slice(0, -1), t10.proxyUrl ? n10 = t10.proxyUrl : "development" !== r10 && t10.domain && (n10 = `clerk.${t10.domain}`), { instanceType: r10, frontendApi: n10 };
      }
      function t1(e10) {
        let t10 = (e10 = e10 || "").startsWith(tZ) || e10.startsWith("pk_test_"), r10 = tw(e10.split("_")[2] || "").endsWith("$");
        return t10 && r10;
      }
      function t2(e10) {
        return e10.startsWith("test_") || e10.startsWith("sk_test_");
      }
      async function t4(e10, t10 = globalThis.crypto.subtle) {
        let r10 = new TextEncoder().encode(e10);
        return tJ(String.fromCharCode(...new Uint8Array(await t10.digest("sha-1", r10)))).replace(/\+/gi, "-").replace(/\//gi, "_").substring(0, 8);
      }
      var t5 = (e10, t10) => `${e10}_${t10}`, t3 = { strict_mfa: { afterMinutes: 10, level: "multi_factor" }, strict: { afterMinutes: 10, level: "second_factor" }, moderate: { afterMinutes: 60, level: "second_factor" }, lax: { afterMinutes: 1440, level: "second_factor" } }, t6 = /* @__PURE__ */ new Set(["first_factor", "second_factor", "multi_factor"]), t8 = /* @__PURE__ */ new Set(["strict_mfa", "strict", "moderate", "lax"]), t9 = (e10) => "number" == typeof e10 && e10 > 0, t7 = (e10) => t6.has(e10), re = (e10) => t8.has(e10), rt = (e10, t10) => {
        let { orgId: r10, orgRole: n10, orgPermissions: i10 } = t10;
        return (e10.role || e10.permission) && r10 && n10 && i10 ? e10.permission ? i10.includes(e10.permission) : e10.role ? n10 === e10.role : null : null;
      }, rr = (e10) => {
        if (!e10) return false;
        let t10 = "string" == typeof e10 && re(e10), r10 = "object" == typeof e10 && t7(e10.level) && t9(e10.afterMinutes);
        return (!!t10 || !!r10) && ((e11) => "string" == typeof e11 ? t3[e11] : e11).bind(null, e10);
      }, rn = (e10, { factorVerificationAge: t10 }) => {
        if (!e10.reverification || !t10) return null;
        let r10 = rr(e10.reverification);
        if (!r10) return null;
        let { level: n10, afterMinutes: i10 } = r10(), [a2, s2] = t10, o2 = -1 !== a2 ? i10 > a2 : null, l2 = -1 !== s2 ? i10 > s2 : null;
        switch (n10) {
          case "first_factor":
            return o2;
          case "second_factor":
            return -1 !== s2 ? l2 : o2;
          case "multi_factor":
            return -1 === s2 ? o2 : o2 && l2;
        }
      }, ri = (e10) => (t10) => {
        if (!e10.userId) return false;
        let r10 = rt(t10, e10), n10 = rn(t10, e10);
        return [r10, n10].some((e11) => null === e11) ? [r10, n10].some((e11) => true === e11) : [r10, n10].every((e11) => true === e11);
      }, ra = r(51), rs = "https://api.clerk.com", ro = "@clerk/backend@1.23.8", rl = "2024-10-01", ru = { Session: "__session", Refresh: "__refresh", ClientUat: "__client_uat", Handshake: "__clerk_handshake", DevBrowser: "__clerk_db_jwt", RedirectCount: "__clerk_redirect_count" }, rc = { ClerkSynced: "__clerk_synced", SuffixedCookies: "suffixed_cookies", ClerkRedirectUrl: "__clerk_redirect_url", DevBrowser: ru.DevBrowser, Handshake: ru.Handshake, HandshakeHelp: "__clerk_help", LegacyDevBrowser: "__dev_session", HandshakeReason: "__clerk_hs_reason" }, rd = { Cookies: ru, Headers: { AuthToken: "x-clerk-auth-token", AuthSignature: "x-clerk-auth-signature", AuthStatus: "x-clerk-auth-status", AuthReason: "x-clerk-auth-reason", AuthMessage: "x-clerk-auth-message", ClerkUrl: "x-clerk-clerk-url", EnableDebug: "x-clerk-debug", ClerkRequestData: "x-clerk-request-data", ClerkRedirectTo: "x-clerk-redirect-to", CloudFrontForwardedProto: "cloudfront-forwarded-proto", Authorization: "authorization", ForwardedPort: "x-forwarded-port", ForwardedProto: "x-forwarded-proto", ForwardedHost: "x-forwarded-host", Accept: "accept", Referrer: "referer", UserAgent: "user-agent", Origin: "origin", Host: "host", ContentType: "content-type", SecFetchDest: "sec-fetch-dest", Location: "location", CacheControl: "cache-control" }, ContentTypes: { Json: "application/json" }, QueryParameters: rc }, rh = class {
        constructor(e10) {
          this.request = e10;
        }
        requireId(e10) {
          if (!e10) throw Error("A valid resource ID is required.");
        }
      }, rp = class extends rh {
        async createAccountlessApplication() {
          return this.request({ method: "POST", path: "/accountless_applications" });
        }
      }, rf = RegExp("(?<!:)/{1,}", "g");
      function rg(...e10) {
        return e10.filter((e11) => e11).join("/").replace(rf, "/");
      }
      var rm = "/allowlist_identifiers", rv = class extends rh {
        async getAllowlistIdentifierList() {
          return this.request({ method: "GET", path: rm, queryParams: { paginated: true } });
        }
        async createAllowlistIdentifier(e10) {
          return this.request({ method: "POST", path: rm, bodyParams: e10 });
        }
        async deleteAllowlistIdentifier(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rm, e10) });
        }
      }, ry = "/clients", rb = class extends rh {
        async getClientList(e10 = {}) {
          return this.request({ method: "GET", path: ry, queryParams: { ...e10, paginated: true } });
        }
        async getClient(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(ry, e10) });
        }
        verifyClient(e10) {
          return this.request({ method: "POST", path: rg(ry, "verify"), bodyParams: { token: e10 } });
        }
      }, rw = class extends rh {
        async deleteDomain(e10) {
          return this.request({ method: "DELETE", path: rg("/domains", e10) });
        }
      }, r_ = "/email_addresses", rS = class extends rh {
        async getEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(r_, e10) });
        }
        async createEmailAddress(e10) {
          return this.request({ method: "POST", path: r_, bodyParams: e10 });
        }
        async updateEmailAddress(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(r_, e10), bodyParams: t10 });
        }
        async deleteEmailAddress(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(r_, e10) });
        }
      }, rk = "/invitations", rx = class extends rh {
        async getInvitationList(e10 = {}) {
          return this.request({ method: "GET", path: rk, queryParams: { ...e10, paginated: true } });
        }
        async createInvitation(e10) {
          return this.request({ method: "POST", path: rk, bodyParams: e10 });
        }
        async revokeInvitation(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rk, e10, "revoke") });
        }
      }, rT = "/organizations", rE = class extends rh {
        async getOrganizationList(e10) {
          return this.request({ method: "GET", path: rT, queryParams: e10 });
        }
        async createOrganization(e10) {
          return this.request({ method: "POST", path: rT, bodyParams: e10 });
        }
        async getOrganization(e10) {
          let { includeMembersCount: t10 } = e10, r10 = "organizationId" in e10 ? e10.organizationId : e10.slug;
          return this.requireId(r10), this.request({ method: "GET", path: rg(rT, r10), queryParams: { includeMembersCount: t10 } });
        }
        async updateOrganization(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rT, e10), bodyParams: t10 });
        }
        async updateOrganizationLogo(e10, t10) {
          this.requireId(e10);
          let r10 = new tS.FormData();
          return r10.append("file", t10?.file), t10?.uploaderUserId && r10.append("uploader_user_id", t10?.uploaderUserId), this.request({ method: "PUT", path: rg(rT, e10, "logo"), formData: r10 });
        }
        async deleteOrganizationLogo(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rT, e10, "logo") });
        }
        async updateOrganizationMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rT, e10, "metadata"), bodyParams: t10 });
        }
        async deleteOrganization(e10) {
          return this.request({ method: "DELETE", path: rg(rT, e10) });
        }
        async getOrganizationMembershipList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rg(rT, t10, "memberships"), queryParams: r10 });
        }
        async createOrganizationMembership(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rT, t10, "memberships"), bodyParams: r10 });
        }
        async updateOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "PATCH", path: rg(rT, t10, "memberships", r10), bodyParams: n10 });
        }
        async updateOrganizationMembershipMetadata(e10) {
          let { organizationId: t10, userId: r10, ...n10 } = e10;
          return this.request({ method: "PATCH", path: rg(rT, t10, "memberships", r10, "metadata"), bodyParams: n10 });
        }
        async deleteOrganizationMembership(e10) {
          let { organizationId: t10, userId: r10 } = e10;
          return this.requireId(t10), this.request({ method: "DELETE", path: rg(rT, t10, "memberships", r10) });
        }
        async getOrganizationInvitationList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rg(rT, t10, "invitations"), queryParams: r10 });
        }
        async createOrganizationInvitation(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rT, t10, "invitations"), bodyParams: r10 });
        }
        async getOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "GET", path: rg(rT, t10, "invitations", r10) });
        }
        async revokeOrganizationInvitation(e10) {
          let { organizationId: t10, invitationId: r10, ...n10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rT, t10, "invitations", r10, "revoke"), bodyParams: n10 });
        }
        async getOrganizationDomainList(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rg(rT, t10, "domains"), queryParams: r10 });
        }
        async createOrganizationDomain(e10) {
          let { organizationId: t10, ...r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rT, t10, "domains"), bodyParams: { ...r10, verified: r10.verified ?? true } });
        }
        async updateOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10, ...n10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "PATCH", path: rg(rT, t10, "domains", r10), bodyParams: n10 });
        }
        async deleteOrganizationDomain(e10) {
          let { organizationId: t10, domainId: r10 } = e10;
          return this.requireId(t10), this.requireId(r10), this.request({ method: "DELETE", path: rg(rT, t10, "domains", r10) });
        }
      }, rC = "/phone_numbers", rO = class extends rh {
        async getPhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rC, e10) });
        }
        async createPhoneNumber(e10) {
          return this.request({ method: "POST", path: rC, bodyParams: e10 });
        }
        async updatePhoneNumber(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rC, e10), bodyParams: t10 });
        }
        async deletePhoneNumber(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rC, e10) });
        }
      }, rP = "/redirect_urls", rI = class extends rh {
        async getRedirectUrlList() {
          return this.request({ method: "GET", path: rP, queryParams: { paginated: true } });
        }
        async getRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rP, e10) });
        }
        async createRedirectUrl(e10) {
          return this.request({ method: "POST", path: rP, bodyParams: e10 });
        }
        async deleteRedirectUrl(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rP, e10) });
        }
      }, rR = "/sessions", rN = class extends rh {
        async getSessionList(e10 = {}) {
          return this.request({ method: "GET", path: rR, queryParams: { ...e10, paginated: true } });
        }
        async getSession(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rR, e10) });
        }
        async revokeSession(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rR, e10, "revoke") });
        }
        async verifySession(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rR, e10, "verify"), bodyParams: { token: t10 } });
        }
        async getToken(e10, t10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rR, e10, "tokens", t10 || "") });
        }
        async refreshSession(e10, t10) {
          this.requireId(e10);
          let { suffixed_cookies: r10, ...n10 } = t10;
          return this.request({ method: "POST", path: rg(rR, e10, "refresh"), bodyParams: n10, queryParams: { suffixed_cookies: r10 } });
        }
      }, rA = "/sign_in_tokens", rM = class extends rh {
        async createSignInToken(e10) {
          return this.request({ method: "POST", path: rA, bodyParams: e10 });
        }
        async revokeSignInToken(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rA, e10, "revoke") });
        }
      }, rU = "/users", rL = class extends rh {
        async getUserList(e10 = {}) {
          let { limit: t10, offset: r10, orderBy: n10, ...i10 } = e10, [a2, s2] = await Promise.all([this.request({ method: "GET", path: rU, queryParams: e10 }), this.getCount(i10)]);
          return { data: a2, totalCount: s2 };
        }
        async getUser(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rU, e10) });
        }
        async createUser(e10) {
          return this.request({ method: "POST", path: rU, bodyParams: e10 });
        }
        async updateUser(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rU, e10), bodyParams: t10 });
        }
        async updateUserProfileImage(e10, t10) {
          this.requireId(e10);
          let r10 = new tS.FormData();
          return r10.append("file", t10?.file), this.request({ method: "POST", path: rg(rU, e10, "profile_image"), formData: r10 });
        }
        async updateUserMetadata(e10, t10) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rU, e10, "metadata"), bodyParams: t10 });
        }
        async deleteUser(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rU, e10) });
        }
        async getCount(e10 = {}) {
          return this.request({ method: "GET", path: rg(rU, "count"), queryParams: e10 });
        }
        async getUserOauthAccessToken(e10, t10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rU, e10, "oauth_access_tokens", t10), queryParams: { paginated: true } });
        }
        async disableUserMFA(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rU, e10, "mfa") });
        }
        async getOrganizationMembershipList(e10) {
          let { userId: t10, limit: r10, offset: n10 } = e10;
          return this.requireId(t10), this.request({ method: "GET", path: rg(rU, t10, "organization_memberships"), queryParams: { limit: r10, offset: n10 } });
        }
        async verifyPassword(e10) {
          let { userId: t10, password: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rU, t10, "verify_password"), bodyParams: { password: r10 } });
        }
        async verifyTOTP(e10) {
          let { userId: t10, code: r10 } = e10;
          return this.requireId(t10), this.request({ method: "POST", path: rg(rU, t10, "verify_totp"), bodyParams: { code: r10 } });
        }
        async banUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rU, e10, "ban") });
        }
        async unbanUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rU, e10, "unban") });
        }
        async lockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rU, e10, "lock") });
        }
        async unlockUser(e10) {
          return this.requireId(e10), this.request({ method: "POST", path: rg(rU, e10, "unlock") });
        }
        async deleteUserProfileImage(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rU, e10, "profile_image") });
        }
      }, rD = "/saml_connections", rj = class extends rh {
        async getSamlConnectionList(e10 = {}) {
          return this.request({ method: "GET", path: rD, queryParams: e10 });
        }
        async createSamlConnection(e10) {
          return this.request({ method: "POST", path: rD, bodyParams: e10 });
        }
        async getSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "GET", path: rg(rD, e10) });
        }
        async updateSamlConnection(e10, t10 = {}) {
          return this.requireId(e10), this.request({ method: "PATCH", path: rg(rD, e10), bodyParams: t10 });
        }
        async deleteSamlConnection(e10) {
          return this.requireId(e10), this.request({ method: "DELETE", path: rg(rD, e10) });
        }
      }, rq = class extends rh {
        async createTestingToken() {
          return this.request({ method: "POST", path: "/testing_tokens" });
        }
      }, rB = tK({ packageName: "@clerk/backend" }), { isDevOrStagingUrl: rH } = /* @__PURE__ */ function() {
        let e10 = /* @__PURE__ */ new Map();
        return { isDevOrStagingUrl: (t10) => {
          if (!t10) return false;
          let r10 = "string" == typeof t10 ? t10 : t10.hostname, n10 = e10.get(r10);
          return void 0 === n10 && (n10 = tG.some((e11) => r10.endsWith(e11)), e10.set(r10, n10)), n10;
        } };
      }();
      function r$(e10) {
        if (!e10 || "string" != typeof e10) throw Error("Missing Clerk Secret Key. Go to https://dashboard.clerk.com and get your key for your instance.");
      }
      var rz = class e10 {
        constructor(e11, t10, r10, n10) {
          this.publishableKey = e11, this.secretKey = t10, this.claimUrl = r10, this.apiKeysUrl = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.publishable_key, t10.secret_key, t10.claim_url, t10.api_keys_url);
        }
      }, rK = class e10 {
        constructor(e11, t10, r10, n10, i10) {
          this.id = e11, this.identifier = t10, this.createdAt = r10, this.updatedAt = n10, this.invitationId = i10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.identifier, t10.created_at, t10.updated_at, t10.invitation_id);
        }
      }, rF = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2) {
          this.id = e11, this.isMobile = t10, this.ipAddress = r10, this.city = n10, this.country = i10, this.browserVersion = a2, this.browserName = s2, this.deviceType = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.is_mobile, t10.ip_address, t10.city, t10.country, t10.browser_version, t10.browser_name, t10.device_type);
        }
      }, rW = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2, u2, c2, d2 = null) {
          this.id = e11, this.clientId = t10, this.userId = r10, this.status = n10, this.lastActiveAt = i10, this.expireAt = a2, this.abandonAt = s2, this.createdAt = o2, this.updatedAt = l2, this.lastActiveOrganizationId = u2, this.latestActivity = c2, this.actor = d2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.client_id, t10.user_id, t10.status, t10.last_active_at, t10.expire_at, t10.abandon_at, t10.created_at, t10.updated_at, t10.last_active_organization_id, t10.latest_activity && rF.fromJSON(t10.latest_activity), t10.actor);
        }
      }, rJ = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2) {
          this.id = e11, this.sessionIds = t10, this.sessions = r10, this.signInId = n10, this.signUpId = i10, this.lastActiveSessionId = a2, this.createdAt = s2, this.updatedAt = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.session_ids, t10.sessions.map((e11) => rW.fromJSON(e11)), t10.sign_in_id, t10.sign_up_id, t10.last_active_session_id, t10.created_at, t10.updated_at);
        }
      }, rV = class e10 {
        constructor(e11) {
          this.cookies = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.cookies);
        }
      }, rG = class e10 {
        constructor(e11, t10, r10, n10) {
          this.object = e11, this.id = t10, this.slug = r10, this.deleted = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.object, t10.id || null, t10.slug || null, t10.deleted);
        }
      }, rX = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2, u2, c2) {
          this.id = e11, this.fromEmailName = t10, this.emailAddressId = r10, this.toEmailAddress = n10, this.subject = i10, this.body = a2, this.bodyPlain = s2, this.status = o2, this.slug = l2, this.data = u2, this.deliveredByClerk = c2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_email_name, t10.email_address_id, t10.to_email_address, t10.subject, t10.body, t10.body_plain, t10.status, t10.slug, t10.data, t10.delivered_by_clerk);
        }
      }, rQ = class e10 {
        constructor(e11, t10) {
          this.id = e11, this.type = t10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.type);
        }
      }, rY = class e10 {
        constructor(e11, t10, r10 = null, n10 = null, i10 = null, a2 = null, s2 = null) {
          this.status = e11, this.strategy = t10, this.externalVerificationRedirectURL = r10, this.attempts = n10, this.expireAt = i10, this.nonce = a2, this.message = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.status, t10.strategy, t10.external_verification_redirect_url ? new URL(t10.external_verification_redirect_url) : null, t10.attempts, t10.expire_at, t10.nonce);
        }
      }, rZ = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.emailAddress = t10, this.verification = r10, this.linkedTo = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.verification && rY.fromJSON(t10.verification), t10.linked_to.map((e11) => rQ.fromJSON(e11)));
        }
      }, r0 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2, u2, c2 = {}, d2, h2) {
          this.id = e11, this.provider = t10, this.identificationId = r10, this.externalId = n10, this.approvedScopes = i10, this.emailAddress = a2, this.firstName = s2, this.lastName = o2, this.imageUrl = l2, this.username = u2, this.publicMetadata = c2, this.label = d2, this.verification = h2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.identification_id, t10.provider_user_id, t10.approved_scopes, t10.email_address, t10.first_name, t10.last_name, t10.image_url || "", t10.username, t10.public_metadata, t10.label, t10.verification && rY.fromJSON(t10.verification));
        }
      }, r1 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2) {
          this.id = e11, this.emailAddress = t10, this.publicMetadata = r10, this.createdAt = n10, this.updatedAt = i10, this.status = a2, this.url = s2, this.revoked = o2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.public_metadata, t10.created_at, t10.updated_at, t10.status, t10.url, t10.revoked);
        }
      }, r2 = { AccountlessApplication: "accountless_application", AllowlistIdentifier: "allowlist_identifier", Client: "client", Cookies: "cookies", Email: "email", EmailAddress: "email_address", Invitation: "invitation", OauthAccessToken: "oauth_access_token", Organization: "organization", OrganizationInvitation: "organization_invitation", OrganizationMembership: "organization_membership", PhoneNumber: "phone_number", RedirectUrl: "redirect_url", Session: "session", SignInToken: "sign_in_token", SmsMessage: "sms_message", User: "user", Token: "token", TotalCount: "total_count" }, r4 = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10, a2, s2) {
          this.externalAccountId = e11, this.provider = t10, this.token = r10, this.publicMetadata = n10, this.label = i10, this.scopes = a2, this.tokenSecret = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.external_account_id, t10.provider, t10.token, t10.public_metadata, t10.label || "", t10.scopes, t10.token_secret);
        }
      }, r5 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2 = {}, l2 = {}, u2, c2, d2, h2) {
          this.id = e11, this.name = t10, this.slug = r10, this.imageUrl = n10, this.hasImage = i10, this.createdAt = a2, this.updatedAt = s2, this.publicMetadata = o2, this.privateMetadata = l2, this.maxAllowedMemberships = u2, this.adminDeleteEnabled = c2, this.membersCount = d2, this.createdBy = h2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.slug, t10.image_url || "", t10.has_image, t10.created_at, t10.updated_at, t10.public_metadata, t10.private_metadata, t10.max_allowed_memberships, t10.admin_delete_enabled, t10.members_count, t10.created_by);
        }
      }, r3 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2 = {}, l2 = {}) {
          this.id = e11, this.emailAddress = t10, this.role = r10, this.organizationId = n10, this.createdAt = i10, this.updatedAt = a2, this.status = s2, this.publicMetadata = o2, this.privateMetadata = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.email_address, t10.role, t10.organization_id, t10.created_at, t10.updated_at, t10.status, t10.public_metadata, t10.private_metadata);
        }
      }, r6 = class e10 {
        constructor(e11, t10, r10, n10 = {}, i10 = {}, a2, s2, o2, l2) {
          this.id = e11, this.role = t10, this.permissions = r10, this.publicMetadata = n10, this.privateMetadata = i10, this.createdAt = a2, this.updatedAt = s2, this.organization = o2, this.publicUserData = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.role, t10.permissions, t10.public_metadata, t10.private_metadata, t10.created_at, t10.updated_at, r5.fromJSON(t10.organization), r8.fromJSON(t10.public_user_data));
        }
      }, r8 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2) {
          this.identifier = e11, this.firstName = t10, this.lastName = r10, this.imageUrl = n10, this.hasImage = i10, this.userId = a2;
        }
        static fromJSON(t10) {
          return new e10(t10.identifier, t10.first_name, t10.last_name, t10.image_url, t10.has_image, t10.user_id);
        }
      }, r9 = class e10 {
        constructor(e11, t10, r10, n10, i10, a2) {
          this.id = e11, this.phoneNumber = t10, this.reservedForSecondFactor = r10, this.defaultSecondFactor = n10, this.verification = i10, this.linkedTo = a2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.phone_number, t10.reserved_for_second_factor, t10.default_second_factor, t10.verification && rY.fromJSON(t10.verification), t10.linked_to.map((e11) => rQ.fromJSON(e11)));
        }
      }, r7 = class e10 {
        constructor(e11, t10, r10, n10) {
          this.id = e11, this.url = t10, this.createdAt = r10, this.updatedAt = n10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.url, t10.created_at, t10.updated_at);
        }
      }, ne = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2) {
          this.id = e11, this.userId = t10, this.token = r10, this.status = n10, this.url = i10, this.createdAt = a2, this.updatedAt = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.user_id, t10.token, t10.status, t10.url, t10.created_at, t10.updated_at);
        }
      }, nt = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2) {
          this.id = e11, this.fromPhoneNumber = t10, this.toPhoneNumber = r10, this.message = n10, this.status = i10, this.phoneNumberId = a2, this.data = s2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.from_phone_number, t10.to_phone_number, t10.message, t10.status, t10.phone_number_id, t10.data);
        }
      }, nr = class e10 {
        constructor(e11) {
          this.jwt = e11;
        }
        static fromJSON(t10) {
          return new e10(t10.jwt);
        }
      }, nn = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2, u2) {
          this.id = e11, this.name = t10, this.domain = r10, this.active = n10, this.provider = i10, this.syncUserAttributes = a2, this.allowSubdomains = s2, this.allowIdpInitiated = o2, this.createdAt = l2, this.updatedAt = u2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.name, t10.domain, t10.active, t10.provider, t10.sync_user_attributes, t10.allow_subdomains, t10.allow_idp_initiated, t10.created_at, t10.updated_at);
        }
      }, ni = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2) {
          this.id = e11, this.provider = t10, this.providerUserId = r10, this.active = n10, this.emailAddress = i10, this.firstName = a2, this.lastName = s2, this.verification = o2, this.samlConnection = l2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.provider, t10.provider_user_id, t10.active, t10.email_address, t10.first_name, t10.last_name, t10.verification && rY.fromJSON(t10.verification), t10.saml_connection && nn.fromJSON(t10.saml_connection));
        }
      }, na = class e10 {
        constructor(e11, t10, r10) {
          this.id = e11, this.web3Wallet = t10, this.verification = r10;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.web3_wallet, t10.verification && rY.fromJSON(t10.verification));
        }
      }, ns = class e10 {
        constructor(e11, t10, r10, n10, i10, a2, s2, o2, l2, u2, c2, d2, h2, p2, f2, g2, m2, v2, y2, b2 = {}, w2 = {}, _2 = {}, S2 = [], k2 = [], x2 = [], T2 = [], E2 = [], C2, O2, P2 = null, I2, R2) {
          this.id = e11, this.passwordEnabled = t10, this.totpEnabled = r10, this.backupCodeEnabled = n10, this.twoFactorEnabled = i10, this.banned = a2, this.locked = s2, this.createdAt = o2, this.updatedAt = l2, this.imageUrl = u2, this.hasImage = c2, this.primaryEmailAddressId = d2, this.primaryPhoneNumberId = h2, this.primaryWeb3WalletId = p2, this.lastSignInAt = f2, this.externalId = g2, this.username = m2, this.firstName = v2, this.lastName = y2, this.publicMetadata = b2, this.privateMetadata = w2, this.unsafeMetadata = _2, this.emailAddresses = S2, this.phoneNumbers = k2, this.web3Wallets = x2, this.externalAccounts = T2, this.samlAccounts = E2, this.lastActiveAt = C2, this.createOrganizationEnabled = O2, this.createOrganizationsLimit = P2, this.deleteSelfEnabled = I2, this.legalAcceptedAt = R2;
        }
        static fromJSON(t10) {
          return new e10(t10.id, t10.password_enabled, t10.totp_enabled, t10.backup_code_enabled, t10.two_factor_enabled, t10.banned, t10.locked, t10.created_at, t10.updated_at, t10.image_url, t10.has_image, t10.primary_email_address_id, t10.primary_phone_number_id, t10.primary_web3_wallet_id, t10.last_sign_in_at, t10.external_id, t10.username, t10.first_name, t10.last_name, t10.public_metadata, t10.private_metadata, t10.unsafe_metadata, (t10.email_addresses || []).map((e11) => rZ.fromJSON(e11)), (t10.phone_numbers || []).map((e11) => r9.fromJSON(e11)), (t10.web3_wallets || []).map((e11) => na.fromJSON(e11)), (t10.external_accounts || []).map((e11) => r0.fromJSON(e11)), (t10.saml_accounts || []).map((e11) => ni.fromJSON(e11)), t10.last_active_at, t10.create_organization_enabled, t10.create_organizations_limit, t10.delete_self_enabled, t10.legal_accepted_at);
        }
        get primaryEmailAddress() {
          return this.emailAddresses.find(({ id: e11 }) => e11 === this.primaryEmailAddressId) ?? null;
        }
        get primaryPhoneNumber() {
          return this.phoneNumbers.find(({ id: e11 }) => e11 === this.primaryPhoneNumberId) ?? null;
        }
        get primaryWeb3Wallet() {
          return this.web3Wallets.find(({ id: e11 }) => e11 === this.primaryWeb3WalletId) ?? null;
        }
        get fullName() {
          return [this.firstName, this.lastName].join(" ").trim() || null;
        }
      };
      function no(e10) {
        if ("string" != typeof e10 && "object" in e10 && "deleted" in e10) return rG.fromJSON(e10);
        switch (e10.object) {
          case r2.AccountlessApplication:
            return rz.fromJSON(e10);
          case r2.AllowlistIdentifier:
            return rK.fromJSON(e10);
          case r2.Client:
            return rJ.fromJSON(e10);
          case r2.Cookies:
            return rV.fromJSON(e10);
          case r2.EmailAddress:
            return rZ.fromJSON(e10);
          case r2.Email:
            return rX.fromJSON(e10);
          case r2.Invitation:
            return r1.fromJSON(e10);
          case r2.OauthAccessToken:
            return r4.fromJSON(e10);
          case r2.Organization:
            return r5.fromJSON(e10);
          case r2.OrganizationInvitation:
            return r3.fromJSON(e10);
          case r2.OrganizationMembership:
            return r6.fromJSON(e10);
          case r2.PhoneNumber:
            return r9.fromJSON(e10);
          case r2.RedirectUrl:
            return r7.fromJSON(e10);
          case r2.SignInToken:
            return ne.fromJSON(e10);
          case r2.Session:
            return rW.fromJSON(e10);
          case r2.SmsMessage:
            return nt.fromJSON(e10);
          case r2.Token:
            return nr.fromJSON(e10);
          case r2.TotalCount:
            return e10.total_count;
          case r2.User:
            return ns.fromJSON(e10);
          default:
            return e10;
        }
      }
      function nl(e10) {
        var t10;
        return t10 = async (t11) => {
          let r10;
          let { secretKey: n10, requireSecretKey: i10 = true, apiUrl: a2 = rs, apiVersion: s2 = "v1", userAgent: o2 = ro } = e10, { path: l2, method: u2, queryParams: c2, headerParams: d2, bodyParams: h2, formData: p2 } = t11;
          i10 && r$(n10);
          let f2 = new URL(rg(a2, s2, l2));
          if (c2) for (let [e11, t12] of Object.entries(tF({ ...c2 }))) t12 && [t12].flat().forEach((t13) => f2.searchParams.append(e11, t13));
          let g2 = { Authorization: `Bearer ${n10}`, "Clerk-API-Version": rl, "User-Agent": o2, ...d2 };
          try {
            if (p2) r10 = await tS.fetch(f2.href, { method: u2, headers: g2, body: p2 });
            else {
              g2["Content-Type"] = "application/json";
              let e12 = "GET" !== u2 && h2 && Object.keys(h2).length > 0 ? { body: JSON.stringify(tF(h2, { deep: false })) } : null;
              r10 = await tS.fetch(f2.href, { method: u2, headers: g2, ...e12 });
            }
            let e11 = r10?.headers && r10.headers?.get(rd.Headers.ContentType) === rd.ContentTypes.Json, t12 = await (e11 ? r10.json() : r10.text());
            if (!r10.ok) return { data: null, errors: nc(t12), status: r10?.status, statusText: r10?.statusText, clerkTraceId: nu(t12, r10?.headers) };
            return { ...Array.isArray(t12) ? { data: t12.map((e12) => no(e12)) } : t12 && "object" == typeof t12 && "data" in t12 && Array.isArray(t12.data) && void 0 !== t12.data ? { data: t12.data.map((e12) => no(e12)), totalCount: t12.total_count } : { data: no(t12) }, errors: null };
          } catch (e11) {
            if (e11 instanceof Error) return { data: null, errors: [{ code: "unexpected_error", message: e11.message || "Unexpected error" }], clerkTraceId: nu(e11, r10?.headers) };
            return { data: null, errors: nc(e11), status: r10?.status, statusText: r10?.statusText, clerkTraceId: nu(e11, r10?.headers) };
          }
        }, async (...e11) => {
          let { data: r10, errors: n10, totalCount: i10, status: a2, statusText: s2, clerkTraceId: o2 } = await t10(...e11);
          if (n10) {
            let e12 = new t$(s2 || "", { data: [], status: a2, clerkTraceId: o2 });
            throw e12.errors = n10, e12;
          }
          return void 0 !== i10 ? { data: r10, totalCount: i10 } : r10;
        };
      }
      function nu(e10, t10) {
        return e10 && "object" == typeof e10 && "clerk_trace_id" in e10 && "string" == typeof e10.clerk_trace_id ? e10.clerk_trace_id : t10?.get("cf-ray") || "";
      }
      function nc(e10) {
        if (e10 && "object" == typeof e10 && "errors" in e10) {
          let t10 = e10.errors;
          return t10.length > 0 ? t10.map(tH) : [];
        }
        return [];
      }
      function nd(e10) {
        let t10 = nl(e10);
        return { __experimental_accountlessApplications: new rp(nl({ ...e10, requireSecretKey: false })), allowlistIdentifiers: new rv(t10), clients: new rb(t10), emailAddresses: new rS(t10), invitations: new rx(t10), organizations: new rE(t10), phoneNumbers: new rO(t10), redirectUrls: new rI(t10), sessions: new rN(t10), signInTokens: new rM(t10), users: new rL(t10), domains: new rw(t10), samlConnections: new rj(t10), testingTokens: new rq(t10) };
      }
      var nh = (e10) => () => {
        let t10 = { ...e10 };
        return t10.secretKey = (t10.secretKey || "").substring(0, 7), t10.jwtKey = (t10.jwtKey || "").substring(0, 7), { ...t10 };
      }, np = (e10) => {
        let { fetcher: t10, sessionToken: r10, sessionId: n10 } = e10 || {};
        return async (e11 = {}) => n10 ? e11.template ? t10(n10, e11.template) : r10 : null;
      }, nf = { SignedIn: "signed-in", SignedOut: "signed-out", Handshake: "handshake" }, ng = { ClientUATWithoutSessionToken: "client-uat-but-no-session-token", DevBrowserMissing: "dev-browser-missing", DevBrowserSync: "dev-browser-sync", PrimaryRespondsToSyncing: "primary-responds-to-syncing", SatelliteCookieNeedsSyncing: "satellite-needs-syncing", SessionTokenAndUATMissing: "session-token-and-uat-missing", SessionTokenMissing: "session-token-missing", SessionTokenExpired: "session-token-expired", SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat", SessionTokenNBF: "session-token-nbf", SessionTokenIatInTheFuture: "session-token-iat-in-the-future", SessionTokenWithoutClientUAT: "session-token-but-no-client-uat", ActiveOrganizationMismatch: "active-organization-mismatch", UnexpectedError: "unexpected-error" };
      function nm(e10, t10, r10 = new Headers(), n10) {
        let i10 = function(e11, t11, r11) {
          let { act: n11, sid: i11, org_id: a2, org_role: s2, org_slug: o2, org_permissions: l2, sub: u2, fva: c2 } = r11, d2 = nd(e11), h2 = np({ sessionId: i11, sessionToken: t11, fetcher: async (...e12) => (await d2.sessions.getToken(...e12)).jwt }), p2 = c2 ?? null;
          return { actor: n11, sessionClaims: r11, sessionId: i11, userId: u2, orgId: a2, orgRole: s2, orgSlug: o2, orgPermissions: l2, factorVerificationAge: p2, getToken: h2, has: ri({ orgId: a2, orgRole: s2, orgPermissions: l2, userId: u2, factorVerificationAge: p2 }), debug: nh({ ...e11, sessionToken: t11 }) };
        }(e10, n10, t10);
        return { status: nf.SignedIn, reason: null, message: null, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: true, toAuth: () => i10, headers: r10, token: n10 };
      }
      function nv(e10, t10, r10 = "", n10 = new Headers()) {
        return ny({ status: nf.SignedOut, reason: t10, message: r10, proxyUrl: e10.proxyUrl || "", publishableKey: e10.publishableKey || "", isSatellite: e10.isSatellite || false, domain: e10.domain || "", signInUrl: e10.signInUrl || "", signUpUrl: e10.signUpUrl || "", afterSignInUrl: e10.afterSignInUrl || "", afterSignUpUrl: e10.afterSignUpUrl || "", isSignedIn: false, headers: n10, toAuth: () => ({ sessionClaims: null, sessionId: null, userId: null, actor: null, orgId: null, orgRole: null, orgSlug: null, orgPermissions: null, factorVerificationAge: null, getToken: () => Promise.resolve(null), has: () => false, debug: nh({ ...e10, status: nf.SignedOut, reason: t10, message: r10 }) }), token: null });
      }
      var ny = (e10) => {
        let t10 = new Headers(e10.headers || {});
        if (e10.message) try {
          t10.set(rd.Headers.AuthMessage, e10.message);
        } catch {
        }
        if (e10.reason) try {
          t10.set(rd.Headers.AuthReason, e10.reason);
        } catch {
        }
        if (e10.status) try {
          t10.set(rd.Headers.AuthStatus, e10.status);
        } catch {
        }
        return e10.headers = t10, e10;
      }, nb = class extends URL {
        isCrossOrigin(e10) {
          return this.origin !== new URL(e10.toString()).origin;
        }
      }, nw = (...e10) => new nb(...e10), n_ = class extends Request {
        constructor(e10, t10) {
          super("string" != typeof e10 && "url" in e10 ? e10.url : String(e10), t10 || "string" == typeof e10 ? void 0 : e10), this.clerkUrl = this.deriveUrlFromHeaders(this), this.cookies = this.parseCookies(this);
        }
        toJSON() {
          return { url: this.clerkUrl.href, method: this.method, headers: JSON.stringify(Object.fromEntries(this.headers)), clerkUrl: this.clerkUrl.toString(), cookies: JSON.stringify(Object.fromEntries(this.cookies)) };
        }
        deriveUrlFromHeaders(e10) {
          let t10 = new URL(e10.url), r10 = e10.headers.get(rd.Headers.ForwardedProto), n10 = e10.headers.get(rd.Headers.ForwardedHost), i10 = e10.headers.get(rd.Headers.Host), a2 = t10.protocol, s2 = this.getFirstValueFromHeader(n10) ?? i10, o2 = this.getFirstValueFromHeader(r10) ?? a2?.replace(/[:/]/, ""), l2 = s2 && o2 ? `${o2}://${s2}` : t10.origin;
          return l2 === t10.origin ? nw(t10) : nw(t10.pathname + t10.search, l2);
        }
        getFirstValueFromHeader(e10) {
          return e10?.split(",")[0];
        }
        parseCookies(e10) {
          return new Map(Object.entries((0, ra.qg)(this.decodeCookieValue(e10.headers.get("cookie") || ""))));
        }
        decodeCookieValue(e10) {
          return e10 ? e10.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent) : e10;
        }
      }, nS = (...e10) => e10[0] instanceof n_ ? e10[0] : new n_(...e10), nk = {}, nx = 0;
      function nT(e10, t10 = true) {
        nk[e10.kid] = e10, nx = t10 ? Date.now() : -1;
      }
      var nE = "local";
      function nC(e10) {
        if (!nk[nE]) {
          if (!e10) throw new ty({ action: tv.SetClerkJWTKey, message: "Missing local JWK.", reason: tm.LocalJWKMissing });
          nT({ kid: "local", kty: "RSA", alg: "RS256", n: e10.replace(/\r\n|\n|\r/g, "").replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA", "").replace("IDAQAB", "").replace(/\+/g, "-").replace(/\//g, "_"), e: "AQAB" }, false);
        }
        return nk[nE];
      }
      async function nO({ secretKey: e10, apiUrl: t10 = rs, apiVersion: r10 = "v1", kid: n10, skipJwksCache: i10 }) {
        if (i10 || function() {
          if (-1 === nx) return false;
          let e11 = Date.now() - nx >= 3e5;
          return e11 && (nk = {}), e11;
        }() || !nk[n10]) {
          if (!e10) throw new ty({ action: tv.ContactSupport, message: "Failed to load JWKS from Clerk Backend or Frontend API.", reason: tm.RemoteJWKFailedToLoad });
          let { keys: n11 } = await tW(() => nP(t10, e10, r10));
          if (!n11 || !n11.length) throw new ty({ action: tv.ContactSupport, message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.", reason: tm.RemoteJWKFailedToLoad });
          n11.forEach((e11) => nT(e11));
        }
        let a2 = nk[n10];
        if (!a2) {
          let e11 = Object.values(nk).map((e12) => e12.kid).sort().join(", ");
          throw new ty({ action: `Go to your Dashboard and validate your secret and public keys are correct. ${tv.ContactSupport} if the issue persists.`, message: `Unable to find a signing key in JWKS that matches the kid='${n10}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT. The following kid is available: ${e11}`, reason: tm.JWKKidMismatch });
        }
        return a2;
      }
      async function nP(e10, t10, r10) {
        if (!t10) throw new ty({ action: tv.SetClerkSecretKey, message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.", reason: tm.RemoteJWKFailedToLoad });
        let n10 = new URL(e10);
        n10.pathname = rg(n10.pathname, r10, "/jwks");
        let i10 = await tS.fetch(n10.href, { headers: { Authorization: `Bearer ${t10}`, "Clerk-API-Version": rl, "Content-Type": "application/json", "User-Agent": ro } });
        if (!i10.ok) {
          let e11 = await i10.json(), t11 = nI(e11?.errors, tg.InvalidSecretKey);
          if (t11) {
            let e12 = tm.InvalidSecretKey;
            throw new ty({ action: tv.ContactSupport, message: t11.message, reason: e12 });
          }
          throw new ty({ action: tv.ContactSupport, message: `Error loading Clerk JWKS from ${n10.href} with code=${i10.status}`, reason: tm.RemoteJWKFailedToLoad });
        }
        return i10.json();
      }
      var nI = (e10, t10) => e10 ? e10.find((e11) => e11.code === t10) : null;
      async function nR(e10, t10) {
        let { data: r10, errors: n10 } = tq(e10);
        if (n10) return { errors: n10 };
        let { header: i10 } = r10, { kid: a2 } = i10;
        try {
          let r11;
          if (t10.jwtKey) r11 = nC(t10.jwtKey);
          else {
            if (!t10.secretKey) return { errors: [new ty({ action: tv.SetClerkJWTKey, message: "Failed to resolve JWK during verification.", reason: tm.JWKFailedToResolve })] };
            r11 = await nO({ ...t10, kid: a2 });
          }
          return await tB(e10, { ...t10, key: r11 });
        } catch (e11) {
          return { errors: [e11] };
        }
      }
      var nN = class {
        constructor(e10, t10, r10) {
          this.cookieSuffix = e10, this.clerkRequest = t10, this.initPublishableKeyValues(r10), this.initHeaderValues(), this.initCookieValues(), this.initHandshakeValues(), Object.assign(this, r10), this.clerkUrl = this.clerkRequest.clerkUrl;
        }
        get sessionToken() {
          return this.sessionTokenInCookie || this.sessionTokenInHeader;
        }
        usesSuffixedCookies() {
          let e10 = this.getSuffixedCookie(rd.Cookies.ClientUat), t10 = this.getCookie(rd.Cookies.ClientUat), r10 = this.getSuffixedCookie(rd.Cookies.Session) || "", n10 = this.getCookie(rd.Cookies.Session) || "";
          if (n10 && !this.tokenHasIssuer(n10)) return false;
          if (n10 && !this.tokenBelongsToInstance(n10)) return true;
          if (!e10 && !r10) return false;
          let { data: i10 } = tq(n10), a2 = i10?.payload.iat || 0, { data: s2 } = tq(r10), o2 = s2?.payload.iat || 0;
          if ("0" !== e10 && "0" !== t10 && a2 > o2 || "0" === e10 && "0" !== t10) return false;
          if ("production" !== this.instanceType) {
            let r11 = this.sessionExpired(s2);
            if ("0" !== e10 && "0" === t10 && r11) return false;
          }
          return !!e10 || !r10;
        }
        initPublishableKeyValues(e10) {
          t0(e10.publishableKey, { fatal: true }), this.publishableKey = e10.publishableKey;
          let t10 = t0(this.publishableKey, { fatal: true, proxyUrl: e10.proxyUrl, domain: e10.domain });
          this.instanceType = t10.instanceType, this.frontendApi = t10.frontendApi;
        }
        initHeaderValues() {
          this.sessionTokenInHeader = this.stripAuthorizationHeader(this.getHeader(rd.Headers.Authorization)), this.origin = this.getHeader(rd.Headers.Origin), this.host = this.getHeader(rd.Headers.Host), this.forwardedHost = this.getHeader(rd.Headers.ForwardedHost), this.forwardedProto = this.getHeader(rd.Headers.CloudFrontForwardedProto) || this.getHeader(rd.Headers.ForwardedProto), this.referrer = this.getHeader(rd.Headers.Referrer), this.userAgent = this.getHeader(rd.Headers.UserAgent), this.secFetchDest = this.getHeader(rd.Headers.SecFetchDest), this.accept = this.getHeader(rd.Headers.Accept);
        }
        initCookieValues() {
          this.sessionTokenInCookie = this.getSuffixedOrUnSuffixedCookie(rd.Cookies.Session), this.refreshTokenInCookie = this.getSuffixedCookie(rd.Cookies.Refresh), this.clientUat = Number.parseInt(this.getSuffixedOrUnSuffixedCookie(rd.Cookies.ClientUat) || "") || 0;
        }
        initHandshakeValues() {
          this.devBrowserToken = this.getQueryParam(rd.QueryParameters.DevBrowser) || this.getSuffixedOrUnSuffixedCookie(rd.Cookies.DevBrowser), this.handshakeToken = this.getQueryParam(rd.QueryParameters.Handshake) || this.getCookie(rd.Cookies.Handshake), this.handshakeRedirectLoopCounter = Number(this.getCookie(rd.Cookies.RedirectCount)) || 0;
        }
        stripAuthorizationHeader(e10) {
          return e10?.replace("Bearer ", "");
        }
        getQueryParam(e10) {
          return this.clerkRequest.clerkUrl.searchParams.get(e10);
        }
        getHeader(e10) {
          return this.clerkRequest.headers.get(e10) || void 0;
        }
        getCookie(e10) {
          return this.clerkRequest.cookies.get(e10) || void 0;
        }
        getSuffixedCookie(e10) {
          return this.getCookie(t5(e10, this.cookieSuffix)) || void 0;
        }
        getSuffixedOrUnSuffixedCookie(e10) {
          return this.usesSuffixedCookies() ? this.getSuffixedCookie(e10) : this.getCookie(e10);
        }
        tokenHasIssuer(e10) {
          let { data: t10, errors: r10 } = tq(e10);
          return !r10 && !!t10.payload.iss;
        }
        tokenBelongsToInstance(e10) {
          if (!e10) return false;
          let { data: t10, errors: r10 } = tq(e10);
          if (r10) return false;
          let n10 = t10.payload.iss.replace(/https?:\/\//gi, "");
          return this.frontendApi === n10;
        }
        sessionExpired(e10) {
          return !!e10 && e10?.payload.exp <= Date.now() / 1e3 >> 0;
        }
      }, nA = async (e10, t10) => new nN(t10.publishableKey ? await t4(t10.publishableKey, tS.crypto.subtle) : "", e10, t10), nM = (e10) => e10.split(";")[0]?.split("=")[0], nU = (e10) => e10.split(";")[0]?.split("=")[1];
      async function nL(e10, { key: t10 }) {
        let { data: r10, errors: n10 } = tq(e10);
        if (n10) throw n10[0];
        let { header: i10, payload: a2 } = r10, { typ: s2, alg: o2 } = i10;
        tR(s2), tN(o2);
        let { data: l2, errors: u2 } = await tj(r10, t10);
        if (u2) throw new ty({ reason: tm.TokenVerificationFailed, message: `Error verifying handshake token. ${u2[0]}` });
        if (!l2) throw new ty({ reason: tm.TokenInvalidSignature, message: "Handshake signature is invalid." });
        return a2;
      }
      async function nD(e10, t10) {
        let r10;
        let { secretKey: n10, apiUrl: i10, apiVersion: a2, jwksCacheTtlInMs: s2, jwtKey: o2, skipJwksCache: l2 } = t10, { data: u2, errors: c2 } = tq(e10);
        if (c2) throw c2[0];
        let { kid: d2 } = u2.header;
        if (o2) r10 = nC(o2);
        else if (n10) r10 = await nO({ secretKey: n10, apiUrl: i10, apiVersion: a2, kid: d2, jwksCacheTtlInMs: s2, skipJwksCache: l2 });
        else throw new ty({ action: tv.SetClerkJWTKey, message: "Failed to resolve JWK during handshake verification.", reason: tm.JWKFailedToResolve });
        return await nL(e10, { key: r10 });
      }
      var nj = { NonEligibleNoCookie: "non-eligible-no-refresh-cookie", NonEligibleNonGet: "non-eligible-non-get", InvalidSessionToken: "invalid-session-token", MissingApiClient: "missing-api-client", MissingSessionToken: "missing-session-token", MissingRefreshToken: "missing-refresh-token", ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed", ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim", FetchError: "fetch-error", UnexpectedSDKError: "unexpected-sdk-error", UnexpectedBAPIError: "unexpected-bapi-error" };
      async function nq(e10, t10) {
        let r10 = await nA(nS(e10), t10);
        r$(r10.secretKey), r10.isSatellite && (function(e11, t11) {
          if (!e11 && t2(t11)) throw Error("Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite");
        }(r10.signInUrl, r10.secretKey), r10.signInUrl && r10.origin && function(e11, t11) {
          let r11;
          try {
            r11 = new URL(e11);
          } catch {
            throw Error("The signInUrl needs to have a absolute url format.");
          }
          if (r11.origin === t11) throw Error("The signInUrl needs to be on a different origin than your satellite application.");
        }(r10.signInUrl, r10.origin), function(e11) {
          if (!e11) throw Error("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");
        }(r10.proxyUrl || r10.domain));
        let n10 = function(e11) {
          let t11 = null;
          if (e11?.personalAccountPatterns) try {
            t11 = tp(e11.personalAccountPatterns);
          } catch (t12) {
            throw Error(`Invalid personal account pattern "${e11.personalAccountPatterns}": "${t12}"`);
          }
          let r11 = null;
          if (e11?.organizationPatterns) try {
            r11 = tp(e11.organizationPatterns);
          } catch (t12) {
            throw Error(`Clerk: Invalid organization pattern "${e11.organizationPatterns}": "${t12}"`);
          }
          return { OrganizationMatcher: r11, PersonalAccountMatcher: t11 };
        }(t10.organizationSyncOptions);
        async function i10() {
          let e11 = new Headers({ "Access-Control-Allow-Origin": "null", "Access-Control-Allow-Credentials": "true" }), t11 = (await nD(r10.handshakeToken, r10)).handshake, n11 = "";
          if (t11.forEach((t12) => {
            e11.append("Set-Cookie", t12), nM(t12).startsWith(rd.Cookies.Session) && (n11 = nU(t12));
          }), "development" === r10.instanceType) {
            let t12 = new URL(r10.clerkUrl);
            t12.searchParams.delete(rd.QueryParameters.Handshake), t12.searchParams.delete(rd.QueryParameters.HandshakeHelp), e11.append(rd.Headers.Location, t12.toString()), e11.set(rd.Headers.CacheControl, "no-store");
          }
          if ("" === n11) return nv(r10, ng.SessionTokenMissing, "", e11);
          let { data: i11, errors: [a3] = [] } = await nR(n11, r10);
          if (i11) return nm(r10, i11, e11, n11);
          if ("development" === r10.instanceType && (a3?.reason === tm.TokenExpired || a3?.reason === tm.TokenNotActiveYet || a3?.reason === tm.TokenIatInTheFuture)) {
            a3.tokenCarrier = "cookie", console.error(`Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

${a3.getFullMessage()}`);
            let { data: t12, errors: [i12] = [] } = await nR(n11, { ...r10, clockSkewInMs: 864e5 });
            if (t12) return nm(r10, t12, e11, n11);
            throw Error(i12?.message || "Clerk: Handshake retry failed.");
          }
          throw Error(a3?.message || "Clerk: Handshake failed.");
        }
        async function a2(r11) {
          if (!t10.apiClient) return { data: null, error: { message: "An apiClient is needed to perform token refresh.", cause: { reason: nj.MissingApiClient } } };
          let { sessionToken: n11, refreshTokenInCookie: i11 } = r11;
          if (!n11) return { data: null, error: { message: "Session token must be provided.", cause: { reason: nj.MissingSessionToken } } };
          if (!i11) return { data: null, error: { message: "Refresh token must be provided.", cause: { reason: nj.MissingRefreshToken } } };
          let { data: a3, errors: s3 } = tq(n11);
          if (!a3 || s3) return { data: null, error: { message: "Unable to decode the expired session token.", cause: { reason: nj.ExpiredSessionTokenDecodeFailed, errors: s3 } } };
          if (!a3?.payload?.sid) return { data: null, error: { message: "Expired session token is missing the `sid` claim.", cause: { reason: nj.ExpiredSessionTokenMissingSidClaim } } };
          try {
            return { data: (await t10.apiClient.sessions.refreshSession(a3.payload.sid, { format: "cookie", suffixed_cookies: r11.usesSuffixedCookies(), expired_token: n11 || "", refresh_token: i11 || "", request_origin: r11.clerkUrl.origin, request_headers: Object.fromEntries(Array.from(e10.headers.entries()).map(([e11, t11]) => [e11, [t11]])) })).cookies, error: null };
          } catch (e11) {
            if (!e11?.errors?.length) return { data: null, error: { message: "Unexpected Server/BAPI error", cause: { reason: nj.UnexpectedBAPIError, errors: [e11] } } };
            if ("unexpected_error" === e11.errors[0].code) return { data: null, error: { message: "Fetch unexpected error", cause: { reason: nj.FetchError, errors: e11.errors } } };
            return { data: null, error: { message: e11.errors[0].code, cause: { reason: e11.errors[0].code, errors: e11.errors } } };
          }
        }
        async function s2(e11) {
          let { data: t11, error: r11 } = await a2(e11);
          if (!t11 || 0 === t11.length) return { data: null, error: r11 };
          let n11 = new Headers(), i11 = "";
          t11.forEach((e12) => {
            n11.append("Set-Cookie", e12), nM(e12).startsWith(rd.Cookies.Session) && (i11 = nU(e12));
          });
          let { data: s3, errors: o3 } = await nR(i11, e11);
          return o3 ? { data: null, error: { message: "Clerk: unable to verify refreshed session token.", cause: { reason: nj.InvalidSessionToken, errors: o3 } } } : { data: { jwtPayload: s3, sessionToken: i11, headers: n11 }, error: null };
        }
        function o2(e11, i11, a3, s3) {
          if (function(e12) {
            let { accept: t11, secFetchDest: r11 } = e12;
            return !!("document" === r11 || "iframe" === r11 || !r11 && t11?.startsWith("text/html"));
          }(e11)) {
            let o3 = s3 ?? function({ handshakeReason: e12 }) {
              let i12 = function(e13) {
                let t11 = new URL(e13);
                return t11.searchParams.delete(rd.QueryParameters.DevBrowser), t11.searchParams.delete(rd.QueryParameters.LegacyDevBrowser), t11;
              }(r10.clerkUrl), a4 = r10.frontendApi.replace(/http(s)?:\/\//, ""), s4 = new URL(`https://${a4}/v1/client/handshake`);
              s4.searchParams.append("redirect_url", i12?.href || ""), s4.searchParams.append(rd.QueryParameters.SuffixedCookies, r10.usesSuffixedCookies().toString()), s4.searchParams.append(rd.QueryParameters.HandshakeReason, e12), "development" === r10.instanceType && r10.devBrowserToken && s4.searchParams.append(rd.QueryParameters.DevBrowser, r10.devBrowserToken);
              let o4 = nH(r10.clerkUrl, t10.organizationSyncOptions, n10);
              return o4 && function(e13) {
                let t11 = /* @__PURE__ */ new Map();
                return "personalAccount" === e13.type && t11.set("organization_id", ""), "organization" === e13.type && (e13.organizationId && t11.set("organization_id", e13.organizationId), e13.organizationSlug && t11.set("organization_id", e13.organizationSlug)), t11;
              }(o4).forEach((e13, t11) => {
                s4.searchParams.append(t11, e13);
              }), new Headers({ [rd.Headers.Location]: s4.href });
            }({ handshakeReason: i11 });
            return (o3.get(rd.Headers.Location) && o3.set(rd.Headers.CacheControl, "no-store"), function(e12) {
              if (3 === r10.handshakeRedirectLoopCounter) return true;
              let t11 = r10.handshakeRedirectLoopCounter + 1, n11 = rd.Cookies.RedirectCount;
              return e12.append("Set-Cookie", `${n11}=${t11}; SameSite=Lax; HttpOnly; Max-Age=3`), false;
            }(o3)) ? (console.log("Clerk: Refreshing the session token resulted in an infinite redirect loop. This usually means that your Clerk instance keys do not match - make sure to copy the correct publishable and secret keys from the Clerk dashboard."), nv(e11, i11, a3)) : function(e12, t11, r11 = "", n11) {
              return ny({ status: nf.Handshake, reason: t11, message: r11, publishableKey: e12.publishableKey || "", isSatellite: e12.isSatellite || false, domain: e12.domain || "", proxyUrl: e12.proxyUrl || "", signInUrl: e12.signInUrl || "", signUpUrl: e12.signUpUrl || "", afterSignInUrl: e12.afterSignInUrl || "", afterSignUpUrl: e12.afterSignUpUrl || "", isSignedIn: false, headers: n11, toAuth: () => null, token: null });
            }(e11, i11, a3, o3);
          }
          return nv(e11, i11, a3);
        }
        async function l2() {
          let { sessionTokenInHeader: e11 } = r10;
          try {
            let { data: t11, errors: n11 } = await nR(e11, r10);
            if (n11) throw n11[0];
            return nm(r10, t11, void 0, e11);
          } catch (e12) {
            return c2(e12, "header");
          }
        }
        async function u2() {
          let e11 = r10.clientUat, a3 = !!r10.sessionTokenInCookie, s3 = !!r10.devBrowserToken;
          if (r10.handshakeToken) try {
            return await i10();
          } catch (e12) {
            e12 instanceof ty && "development" === r10.instanceType ? function(e13) {
              if (e13.reason === tm.TokenInvalidSignature) throw Error("Clerk: Handshake token verification failed due to an invalid signature. If you have switched Clerk keys locally, clear your cookies and try again.");
              throw Error(`Clerk: Handshake token verification failed: ${e13.getFullMessage()}.`);
            }(e12) : console.error("Clerk: unable to resolve handshake:", e12);
          }
          if ("development" === r10.instanceType && r10.clerkUrl.searchParams.has(rd.QueryParameters.DevBrowser)) return o2(r10, ng.DevBrowserSync, "");
          let l3 = r10.isSatellite && "document" === r10.secFetchDest;
          if ("production" === r10.instanceType && l3) return o2(r10, ng.SatelliteCookieNeedsSyncing, "");
          if ("development" === r10.instanceType && l3 && !r10.clerkUrl.searchParams.has(rd.QueryParameters.ClerkSynced)) {
            let e12 = new URL(r10.signInUrl);
            e12.searchParams.append(rd.QueryParameters.ClerkRedirectUrl, r10.clerkUrl.toString());
            let t11 = new Headers({ [rd.Headers.Location]: e12.toString() });
            return o2(r10, ng.SatelliteCookieNeedsSyncing, "", t11);
          }
          let u3 = new URL(r10.clerkUrl).searchParams.get(rd.QueryParameters.ClerkRedirectUrl);
          if ("development" === r10.instanceType && !r10.isSatellite && u3) {
            let e12 = new URL(u3);
            r10.devBrowserToken && e12.searchParams.append(rd.QueryParameters.DevBrowser, r10.devBrowserToken), e12.searchParams.append(rd.QueryParameters.ClerkSynced, "true");
            let t11 = new Headers({ [rd.Headers.Location]: e12.toString() });
            return o2(r10, ng.PrimaryRespondsToSyncing, "", t11);
          }
          if ("development" === r10.instanceType && !s3) return o2(r10, ng.DevBrowserMissing, "");
          if (!e11 && !a3) return nv(r10, ng.SessionTokenAndUATMissing, "");
          if (!e11 && a3) return o2(r10, ng.SessionTokenWithoutClientUAT, "");
          if (e11 && !a3) return o2(r10, ng.ClientUATWithoutSessionToken, "");
          let { data: d2, errors: h2 } = tq(r10.sessionTokenInCookie);
          if (h2) return c2(h2[0], "cookie");
          if (d2.payload.iat < r10.clientUat) return o2(r10, ng.SessionTokenIATBeforeClientUAT, "");
          try {
            let { data: e12, errors: i11 } = await nR(r10.sessionTokenInCookie, r10);
            if (i11) throw i11[0];
            let a4 = nm(r10, e12, void 0, r10.sessionTokenInCookie), s4 = function(e13, r11) {
              let i12 = nH(e13.clerkUrl, t10.organizationSyncOptions, n10);
              if (!i12) return null;
              let a5 = false;
              if ("organization" === i12.type && (i12.organizationSlug && i12.organizationSlug !== r11.orgSlug && (a5 = true), i12.organizationId && i12.organizationId !== r11.orgId && (a5 = true)), "personalAccount" === i12.type && r11.orgId && (a5 = true), !a5) return null;
              if (e13.handshakeRedirectLoopCounter > 0) return console.warn("Clerk: Organization activation handshake loop detected. This is likely due to an invalid organization ID or slug. Skipping organization activation."), null;
              let s5 = o2(e13, ng.ActiveOrganizationMismatch, "");
              return "handshake" !== s5.status ? null : s5;
            }(r10, a4.toAuth());
            if (s4) return s4;
            return a4;
          } catch (e12) {
            return c2(e12, "cookie");
          }
          return nv(r10, ng.UnexpectedError);
        }
        async function c2(t11, n11) {
          let i11;
          if (!(t11 instanceof ty)) return nv(r10, ng.UnexpectedError);
          if (t11.reason === tm.TokenExpired && r10.refreshTokenInCookie && "GET" === e10.method) {
            let { data: e11, error: t12 } = await s2(r10);
            if (e11) return nm(r10, e11.jwtPayload, e11.headers, e11.sessionToken);
            i11 = t12?.cause?.reason ? t12.cause.reason : nj.UnexpectedSDKError;
          } else i11 = "GET" !== e10.method ? nj.NonEligibleNonGet : r10.refreshTokenInCookie ? null : nj.NonEligibleNoCookie;
          return (t11.tokenCarrier = n11, [tm.TokenExpired, tm.TokenNotActiveYet, tm.TokenIatInTheFuture].includes(t11.reason)) ? o2(r10, n$({ tokenError: t11.reason, refreshError: i11 }), t11.getFullMessage()) : nv(r10, t11.reason, t11.getFullMessage());
        }
        return r10.sessionTokenInHeader ? l2() : u2();
      }
      var nB = (e10) => {
        let { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i10, publishableKey: a2, isSatellite: s2, domain: o2 } = e10;
        return { isSignedIn: t10, proxyUrl: r10, reason: n10, message: i10, publishableKey: a2, isSatellite: s2, domain: o2 };
      };
      function nH(e10, t10, r10) {
        if (!t10) return null;
        if (r10.OrganizationMatcher) {
          let n10;
          try {
            n10 = r10.OrganizationMatcher(e10.pathname);
          } catch (e11) {
            return console.error(`Clerk: Failed to apply organization pattern "${t10.organizationPatterns}" to a path`, e11), null;
          }
          if (n10 && "params" in n10) {
            let e11 = n10.params;
            if ("id" in e11 && "string" == typeof e11.id) return { type: "organization", organizationId: e11.id };
            if ("slug" in e11 && "string" == typeof e11.slug) return { type: "organization", organizationSlug: e11.slug };
            console.warn("Clerk: Detected an organization pattern match, but no organization ID or slug was found in the URL. Does the pattern include `:id` or `:slug`?");
          }
        }
        if (r10.PersonalAccountMatcher) {
          let n10;
          try {
            n10 = r10.PersonalAccountMatcher(e10.pathname);
          } catch (e11) {
            return console.error(`Failed to apply personal account pattern "${t10.personalAccountPatterns}" to a path`, e11), null;
          }
          if (n10) return { type: "personalAccount" };
        }
        return null;
      }
      var n$ = ({ tokenError: e10, refreshError: t10 }) => {
        switch (e10) {
          case tm.TokenExpired:
            return `${ng.SessionTokenExpired}-refresh-${t10}`;
          case tm.TokenNotActiveYet:
            return ng.SessionTokenNBF;
          case tm.TokenIatInTheFuture:
            return ng.SessionTokenIatInTheFuture;
          default:
            return ng.UnexpectedError;
        }
      };
      function nz(e10, t10) {
        return Object.keys(e10).reduce((e11, r10) => ({ ...e11, [r10]: t10[r10] || e11[r10] }), { ...e10 });
      }
      var nK = { secretKey: "", jwtKey: "", apiUrl: void 0, apiVersion: void 0, proxyUrl: "", publishableKey: "", isSatellite: false, domain: "", audience: "" }, nF = (e10, t10, r10, n10) => {
        if ("" === e10) return nW(t10.toString(), r10?.toString());
        let i10 = new URL(e10), a2 = r10 ? new URL(r10, i10) : void 0, s2 = new URL(t10, i10);
        return a2 && s2.searchParams.set("redirect_url", a2.toString()), n10 && i10.hostname !== s2.hostname && s2.searchParams.set(rd.QueryParameters.DevBrowser, n10), s2.toString();
      }, nW = (e10, t10) => {
        let r10;
        if (e10.startsWith("http")) r10 = new URL(e10);
        else {
          if (!t10 || !t10.startsWith("http")) throw Error("destination url or return back url should be an absolute path url!");
          let n10 = new URL(t10);
          r10 = new URL(e10, n10.origin);
        }
        return t10 && r10.searchParams.set("redirect_url", t10), r10.toString();
      }, nJ = (e10) => {
        if (!e10) return "";
        let t10 = e10.replace(/clerk\.accountsstage\./, "accountsstage.").replace(/clerk\.accounts\.|clerk\./, "accounts.");
        return `https://${t10}`;
      }, nV = (e10) => {
        let { publishableKey: t10, redirectAdapter: r10, signInUrl: n10, signUpUrl: i10, baseUrl: a2 } = e10, s2 = t0(t10), o2 = s2?.frontendApi, l2 = s2?.instanceType === "development", u2 = nJ(o2);
        return { redirectToSignUp: ({ returnBackUrl: t11 } = {}) => {
          i10 || u2 || rB.throwMissingPublishableKeyError();
          let n11 = `${u2}/sign-up`;
          return r10(nF(a2, i10 || n11, t11, l2 ? e10.devBrowserToken : null));
        }, redirectToSignIn: ({ returnBackUrl: t11 } = {}) => {
          n10 || u2 || rB.throwMissingPublishableKeyError();
          let i11 = `${u2}/sign-in`;
          return r10(nF(a2, n10 || i11, t11, l2 ? e10.devBrowserToken : null));
        } };
      }, nG = (e10) => {
        let t10 = (r10) => {
          if (!r10) return r10;
          if (Array.isArray(r10)) return r10.map((e11) => "object" == typeof e11 || Array.isArray(e11) ? t10(e11) : e11);
          let n10 = { ...r10 };
          for (let r11 of Object.keys(n10)) {
            let i10 = e10(r11.toString());
            i10 !== r11 && (n10[i10] = n10[r11], delete n10[r11]), "object" == typeof n10[i10] && (n10[i10] = t10(n10[i10]));
          }
          return n10;
        };
        return t10;
      };
      function nX(e10) {
        if ("boolean" == typeof e10) return e10;
        if (null == e10) return false;
        if ("string" == typeof e10) {
          if ("true" === e10.toLowerCase()) return true;
          if ("false" === e10.toLowerCase()) return false;
        }
        let t10 = parseInt(e10, 10);
        return !isNaN(t10) && t10 > 0;
      }
      nG(function(e10) {
        return e10 ? e10.replace(/[A-Z]/g, (e11) => `_${e11.toLowerCase()}`) : "";
      }), nG(function(e10) {
        return e10 ? e10.replace(/([-_][a-z])/g, (e11) => e11.toUpperCase().replace(/-|_/, "")) : "";
      });
      var nQ = class {
        constructor() {
          ts(this, s), ts(this, i, "clerk_telemetry_throttler"), ts(this, a, 864e5);
        }
        isEventThrottled(e10) {
          var t10;
          if (!ta(this, s, u)) return false;
          let r10 = Date.now(), n10 = tl(this, s, o).call(this, e10), c2 = null == (t10 = ta(this, s, l)) ? void 0 : t10[n10];
          if (!c2) {
            let e11 = { ...ta(this, s, l), [n10]: r10 };
            localStorage.setItem(ta(this, i), JSON.stringify(e11));
          }
          if (c2 && r10 - c2 > ta(this, a)) {
            let e11 = ta(this, s, l);
            delete e11[n10], localStorage.setItem(ta(this, i), JSON.stringify(e11));
          }
          return !!c2;
        }
      };
      i = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakSet(), o = function(e10) {
        let { sk: t10, pk: r10, payload: n10, ...i10 } = e10, a2 = { ...n10, ...i10 };
        return JSON.stringify(Object.keys({ ...n10, ...i10 }).sort().map((e11) => a2[e11]));
      }, l = function() {
        let e10 = localStorage.getItem(ta(this, i));
        return e10 ? JSON.parse(e10) : {};
      }, u = function() {
        if ("undefined" == typeof window) return false;
        let e10 = window.localStorage;
        if (!e10) return false;
        try {
          let t10 = "test";
          return e10.setItem(t10, t10), e10.removeItem(t10), true;
        } catch (t10) {
          return t10 instanceof DOMException && ("QuotaExceededError" === t10.name || "NS_ERROR_DOM_QUOTA_REACHED" === t10.name) && e10.length > 0 && e10.removeItem(ta(this, i)), false;
        }
      };
      var nY = { samplingRate: 1, maxBufferSize: 5, endpoint: "https://clerk-telemetry.com" }, nZ = class {
        constructor(e10) {
          var t10, r10, n10, i10, a2, s2;
          ts(this, g), ts(this, c), ts(this, d), ts(this, h, {}), ts(this, p, []), ts(this, f), to(this, c, { maxBufferSize: null != (t10 = e10.maxBufferSize) ? t10 : nY.maxBufferSize, samplingRate: null != (r10 = e10.samplingRate) ? r10 : nY.samplingRate, disabled: null != (n10 = e10.disabled) && n10, debug: null != (i10 = e10.debug) && i10, endpoint: nY.endpoint }), e10.clerkVersion || "undefined" != typeof window ? ta(this, h).clerkVersion = null != (a2 = e10.clerkVersion) ? a2 : "" : ta(this, h).clerkVersion = "", ta(this, h).sdk = e10.sdk, ta(this, h).sdkVersion = e10.sdkVersion, ta(this, h).publishableKey = null != (s2 = e10.publishableKey) ? s2 : "";
          let o2 = t0(e10.publishableKey);
          o2 && (ta(this, h).instanceType = o2.instanceType), e10.secretKey && (ta(this, h).secretKey = e10.secretKey.substring(0, 16)), to(this, d, new nQ());
        }
        get isEnabled() {
          var e10;
          return !("development" !== ta(this, h).instanceType || ta(this, c).disabled || "undefined" != typeof process && nX(process.env.CLERK_TELEMETRY_DISABLED)) && ("undefined" == typeof window || null == (e10 = null == window ? void 0 : window.navigator) || !e10.webdriver);
        }
        get isDebug() {
          return ta(this, c).debug || "undefined" != typeof process && nX(process.env.CLERK_TELEMETRY_DEBUG);
        }
        record(e10) {
          let t10 = tl(this, g, S).call(this, e10.event, e10.payload);
          tl(this, g, w).call(this, t10.event, t10), tl(this, g, m).call(this, t10, e10.eventSamplingRate) && (ta(this, p).push(t10), tl(this, g, y).call(this));
        }
      };
      c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakSet(), m = function(e10, t10) {
        return this.isEnabled && !this.isDebug && tl(this, g, v).call(this, e10, t10);
      }, v = function(e10, t10) {
        let r10 = Math.random();
        return !ta(this, d).isEventThrottled(e10) && r10 <= ta(this, c).samplingRate && (void 0 === t10 || r10 <= t10);
      }, y = function() {
        if ("undefined" == typeof window) {
          tl(this, g, b).call(this);
          return;
        }
        if (ta(this, p).length >= ta(this, c).maxBufferSize) {
          ta(this, f) && ("undefined" != typeof cancelIdleCallback ? cancelIdleCallback : clearTimeout)(ta(this, f)), tl(this, g, b).call(this);
          return;
        }
        ta(this, f) || ("requestIdleCallback" in window ? to(this, f, requestIdleCallback(() => {
          tl(this, g, b).call(this);
        })) : to(this, f, setTimeout(() => {
          tl(this, g, b).call(this);
        }, 0)));
      }, b = function() {
        fetch(new URL("/v1/event", ta(this, c).endpoint), { method: "POST", body: JSON.stringify({ events: ta(this, p) }), headers: { "Content-Type": "application/json" } }).catch(() => void 0).then(() => {
          to(this, p, []);
        }).catch(() => void 0);
      }, w = function(e10, t10) {
        this.isDebug && (void 0 !== console.groupCollapsed ? (console.groupCollapsed("[clerk/telemetry]", e10), console.log(t10), console.groupEnd()) : console.log("[clerk/telemetry]", e10, t10));
      }, _ = function() {
        let e10 = { name: ta(this, h).sdk, version: ta(this, h).sdkVersion };
        return "undefined" != typeof window && window.Clerk && (e10 = { ...e10, ...window.Clerk.constructor.sdkMetadata }), e10;
      }, S = function(e10, t10) {
        var r10, n10;
        let i10 = tl(this, g, _).call(this);
        return { event: e10, cv: null != (r10 = ta(this, h).clerkVersion) ? r10 : "", it: null != (n10 = ta(this, h).instanceType) ? n10 : "", sdk: i10.name, sdkv: i10.version, ...ta(this, h).publishableKey ? { pk: ta(this, h).publishableKey } : {}, ...ta(this, h).secretKey ? { sk: ta(this, h).secretKey } : {}, payload: t10 };
      }, (0, r(58).xl)(), Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let n0 = "NEXT_HTTP_ERROR_FALLBACK;404";
      r(23), r(108), Symbol.for("react.postpone"), r(113), "undefined" == typeof URLPattern || URLPattern, r(923), r(135);
      let n1 = { Headers: { NextRewrite: "x-middleware-rewrite", NextResume: "x-middleware-next", NextRedirect: "Location", NextUrl: "next-url", NextAction: "next-action", NextjsData: "x-nextjs-data" } }, n2 = (e10) => e10.headers.get(n1.Headers.NextRedirect), n4 = (e10, t10, r10) => (e10.headers.set(t10, r10), e10);
      var n5 = "__clerk_db_jwt";
      let n3 = (e10, t10, r10) => {
        let n10 = t10.headers.get("location");
        if ("true" === t10.headers.get(rd.Headers.ClerkRedirectTo) && n10 && t2(r10.secretKey) && e10.clerkUrl.isCrossOrigin(n10)) {
          let r11 = e10.cookies.get(n5) || "", i10 = function(e11, t11) {
            let r12 = new URL(e11), n11 = r12.searchParams.get(n5);
            r12.searchParams.delete(n5);
            let i11 = n11 || t11;
            return i11 && r12.searchParams.set(n5, i11), r12;
          }(new URL(n10), r11);
          return es.redirect(i10.href, t10);
        }
        return t10;
      }, n6 = { rE: "15.1.12" }, n8 = (e10) => {
        if (!e10 || "string" != typeof e10) return e10;
        try {
          return (e10 || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
        } catch {
          return "";
        }
      }, n9 = (e10) => (Array.isArray(e10) ? e10 : [e10]).map((e11) => "string" == typeof e11 ? n8(e11) : JSON.stringify(Object.fromEntries(Object.entries(e11).map(([e12, t10]) => [e12, n8(t10)])), null, 2)).join(", "), n7 = (e10, t10) => () => {
        let r10 = [], n10 = false;
        return { enable: () => {
          n10 = true;
        }, debug: (...e11) => {
          n10 && r10.push(e11.map((e12) => "function" == typeof e12 ? e12() : e12));
        }, commit: () => {
          if (n10) {
            for (let n11 of (console.log(`[clerk debug start: ${e10}]`), r10)) {
              let e11 = t10(n11);
              e11 = e11.split("\n").map((e12) => `  ${e12}`).join("\n"), process.env.VERCEL && (e11 = function(e12, t11) {
                let r11 = new TextEncoder(), n12 = new TextDecoder("utf-8"), i10 = r11.encode(e12).slice(0, 4096);
                return n12.decode(i10).replace(/\uFFFD/g, "");
              }(e11, 0)), console.log(e11);
            }
            console.log(`[clerk debug end: ${e10}] (@clerk/nextjs=6.10.3,next=${n6.rE},timestamp=${Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)})`);
          }
        } };
      }, ie = (e10, t10) => (...r10) => {
        let n10 = ("string" == typeof e10 ? n7(e10, n9) : e10)(), i10 = t10(n10);
        try {
          let e11 = i10(...r10);
          if ("object" == typeof e11 && "then" in e11 && "function" == typeof e11.then) return e11.then((e12) => (n10.commit(), e12)).catch((e12) => {
            throw n10.commit(), e12;
          });
          return n10.commit(), e11;
        } catch (e11) {
          throw n10.commit(), e11;
        }
      };
      var it = () => {
        try {
          return true;
        } catch {
        }
        return false;
      };
      function ir(e10, t10, r10) {
        return "function" == typeof e10 ? e10(t10) : void 0 !== e10 ? e10 : void 0 !== r10 ? r10 : void 0;
      }
      process.env.NEXT_PUBLIC_CLERK_JS_VERSION, process.env.NEXT_PUBLIC_CLERK_JS_URL;
      let ii = process.env.CLERK_API_VERSION || "v1", ia = process.env.CLERK_SECRET_KEY || "", is = "pk_test_Z2xvd2luZy1zYWxtb24tNzcuY2xlcmsuYWNjb3VudHMuZGV2JA", io = process.env.CLERK_ENCRYPTION_KEY || "", il = process.env.CLERK_API_URL || ((e10) => {
        var t10;
        let r10 = null == (t10 = t0(e10)) ? void 0 : t10.frontendApi;
        return (null == r10 ? void 0 : r10.startsWith("clerk.")) && tV.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? tY : tX.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? "https://api.lclclerk.com" : tQ.some((e11) => null == r10 ? void 0 : r10.endsWith(e11)) ? "https://api.clerkstage.dev" : tY;
      })(is), iu = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "", ic = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "", id = nX(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false, ih = "/sign-in", ip = nX(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED), ig = nX(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG), im = (nX(process.env.NEXT_PUBLIC_CLERK_ENABLE_KEYLESS), !(n6.rE.startsWith("13.") || n6.rE.startsWith("14.0")) && false), iv = (e10) => {
        if (!(e10 instanceof Error) || !("message" in e10)) return false;
        let { message: t10 } = e10, r10 = t10.toLowerCase(), n10 = r10.includes("dynamic server usage"), i10 = r10.includes("this page needs to bail out of prerendering");
        return /Route .*? needs to bail out of prerendering at this point because it used .*?./.test(t10) || n10 || i10;
      };
      async function iy() {
        try {
          let { headers: e10 } = await Promise.resolve().then(r.bind(r, 819)), t10 = await e10();
          return new et("https://placeholder.com", { headers: t10 });
        } catch (e10) {
          if (e10 && iv(e10)) throw e10;
          throw Error(`Clerk: auth(), currentUser() and clerkClient(), are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e10}`);
        }
      }
      let ib = { secretKey: ia, publishableKey: is, apiUrl: il, apiVersion: ii, userAgent: "@clerk/nextjs@6.10.3", proxyUrl: ic, domain: iu, isSatellite: id, sdkMetadata: { name: "@clerk/nextjs", version: "6.10.3", environment: "production" }, telemetry: { disabled: ip, debug: ig } }, iw = (e10) => function(e11) {
        let t10 = { ...e11 }, r10 = nd(t10), n10 = function(e12) {
          let t11 = nz(nK, e12.options), r11 = e12.apiClient;
          return { authenticateRequest: (e13, n11 = {}) => {
            let { apiUrl: i11, apiVersion: a2 } = t11, s2 = nz(t11, n11);
            return nq(e13, { ...n11, ...s2, apiUrl: i11, apiVersion: a2, apiClient: r11 });
          }, debugRequestState: nB };
        }({ options: t10, apiClient: r10 }), i10 = new nZ({ ...e11.telemetry, publishableKey: t10.publishableKey, secretKey: t10.secretKey, ...t10.sdkMetadata ? { sdk: t10.sdkMetadata.name, sdkVersion: t10.sdkMetadata.version } : {} });
        return { ...r10, ...n10, telemetry: i10 };
      }({ ...ib, ...e10 });
      var i_ = r(521);
      let iS = /* @__PURE__ */ new Map(), ik = new i_.AsyncLocalStorage();
      var ix = /* @__PURE__ */ new Set(), iT = { warnOnce: (e10) => {
        ix.has(e10) || (ix.add(e10), console.warn(e10));
      } };
      function iE(e10) {
        return /^http(s)?:\/\//.test(e10 || "");
      }
      var iC = r(454), iO = r.n(iC), iP = r(727), iI = r.n(iP), iR = r(562), iN = r.n(iR);
      let iA = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'
   `, iM = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   NEXT_PUBLIC_CLERK_IS_SATELLITE='true'`, iU = `Clerk: Unable to decrypt request data.

Refresh the page if your .env file was just updated. If the issue persists, ensure the encryption key is valid and properly set.

For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)`, iL = tK({ packageName: "@clerk/nextjs" }), iD = "x-middleware-override-headers", ij = "x-middleware-request", iq = (e10, t10, r10) => {
        e10.headers.get(iD) || (e10.headers.set(iD, [...t10.headers.keys()]), t10.headers.forEach((t11, r11) => {
          e10.headers.set(`${ij}-${r11}`, t11);
        })), Object.entries(r10).forEach(([t11, r11]) => {
          e10.headers.set(iD, `${e10.headers.get(iD)},${t11}`), e10.headers.set(`${ij}-${t11}`, r11);
        });
      }, iB = (e10, t10) => {
        let r10;
        let n10 = ir(null == t10 ? void 0 : t10.proxyUrl, e10.clerkUrl, ic);
        r10 = n10 && !iE(n10) ? new URL(n10, e10.clerkUrl).toString() : n10;
        let i10 = ir(t10.isSatellite, new URL(e10.url), id), a2 = ir(t10.domain, new URL(e10.url), iu), s2 = (null == t10 ? void 0 : t10.signInUrl) || ih;
        if (i10 && !r10 && !a2) throw Error(iA);
        if (i10 && !iE(s2) && t2(t10.secretKey || ia)) throw Error(iM);
        return { proxyUrl: r10, isSatellite: i10, domain: a2, signInUrl: s2 };
      }, iH = (e10) => es.redirect(e10, { headers: { [rd.Headers.ClerkRedirectTo]: "true" } }), i$ = "clerk_keyless_dummy_key";
      function iz() {
        if (it()) throw Error("Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)");
        throw Error(iU);
      }
      function iK(e10, t10) {
        return JSON.parse(iO().decrypt(e10, t10).toString(iI()));
      }
      let iF = async () => {
        var e10, t10;
        let r10;
        try {
          let e11 = await iy(), t11 = function(e12, t12) {
            var r11, n11;
            return function(e13) {
              try {
                let { headers: t13, nextUrl: r12, cookies: n12 } = e13 || {};
                return "function" == typeof (null == t13 ? void 0 : t13.get) && "function" == typeof (null == r12 ? void 0 : r12.searchParams.get) && "function" == typeof (null == n12 ? void 0 : n12.get);
              } catch {
                return false;
              }
            }(e12) || function(e13) {
              try {
                let { headers: t13 } = e13 || {};
                return "function" == typeof (null == t13 ? void 0 : t13.get);
              } catch {
                return false;
              }
            }(e12) ? e12.headers.get(t12) : e12.headers[t12] || e12.headers[t12.toLowerCase()] || (null == (n11 = null == (r11 = e12.socket) ? void 0 : r11._httpMessage) ? void 0 : n11.getHeader(t12));
          }(e11, rd.Headers.ClerkRequestData);
          r10 = function(e12) {
            if (!e12) return {};
            let t12 = it() ? io || ia : io || ia || i$;
            try {
              return iK(e12, t12);
            } catch {
              if (im) try {
                return iK(e12, i$);
              } catch {
                iz();
              }
              iz();
            }
          }(t11);
        } catch (e11) {
          if (e11 && iv(e11)) throw e11;
        }
        let n10 = null != (t10 = null == (e10 = ik.getStore()) ? void 0 : e10.get("requestData")) ? t10 : r10;
        return (null == n10 ? void 0 : n10.secretKey) || (null == n10 ? void 0 : n10.publishableKey) ? iw(n10) : iw({});
      };
      var iW = r(367), iJ = r.n(iW), iV = r(182), iG = r.n(iV);
      let iX = "__clerk_keys_", iQ = () => {
        var e10;
        let t10 = process.env.PWD;
        if (!t10) return `${iX}0`;
        let r10 = (e10 = t10.split("/").filter(Boolean).slice(-3).reverse().join("/"), iG()(e10).toString(iJ()).slice(0, 16));
        return `${iX}${r10}`;
      };
      function iY(e10) {
        let t10;
        if (!im) return;
        let r10 = iQ();
        try {
          r10 && (t10 = JSON.parse(e10(r10) || "{}"));
        } catch {
          t10 = void 0;
        }
        return t10;
      }
      let iZ = { REDIRECT_TO_URL: "CLERK_PROTECT_REDIRECT_TO_URL", REDIRECT_TO_SIGN_IN: "CLERK_PROTECT_REDIRECT_TO_SIGN_IN" }, i0 = { NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 }, i1 = new Set(Object.values(i0)), i2 = "NEXT_REDIRECT";
      function i4(e10, t10, r10 = "replace", n10 = 307) {
        let i10 = Error(i2);
        throw i10.digest = `${i2};${r10};${e10};${n10};`, i10.clerk_digest = iZ.REDIRECT_TO_URL, Object.assign(i10, t10), i10;
      }
      function i5(e10) {
        if ("object" != typeof e10 || null === e10 || !("digest" in e10) || "string" != typeof e10.digest) return false;
        let t10 = e10.digest.split(";"), [r10, n10] = t10, i10 = t10.slice(2, -2).join(";"), a2 = Number(t10.at(-2));
        return r10 === i2 && ("replace" === n10 || "push" === n10) && "string" == typeof i10 && !isNaN(a2) && 307 === a2;
      }
      let i3 = (e10) => {
        var t10, r10;
        return !!e10.headers.get(n1.Headers.NextUrl) && ((null == (t10 = e10.headers.get(rd.Headers.Accept)) ? void 0 : t10.includes("text/x-component")) || (null == (r10 = e10.headers.get(rd.Headers.ContentType)) ? void 0 : r10.includes("multipart/form-data")) || !!e10.headers.get(n1.Headers.NextAction));
      }, i6 = (e10) => {
        var t10;
        return "document" === e10.headers.get(rd.Headers.SecFetchDest) || "iframe" === e10.headers.get(rd.Headers.SecFetchDest) || (null == (t10 = e10.headers.get(rd.Headers.Accept)) ? void 0 : t10.includes("text/html")) || i8(e10) || i7(e10);
      }, i8 = (e10) => !!e10.headers.get(n1.Headers.NextUrl) && !i3(e10) || i9(), i9 = () => {
        let e10 = globalThis.fetch;
        if (!function(e11) {
          return "__nextPatched" in e11 && true === e11.__nextPatched;
        }(e10)) return false;
        let { page: t10, pagePath: r10 } = e10.__nextGetStaticStore().getStore() || {};
        return !!(r10 || t10);
      }, i7 = (e10) => !!e10.headers.get(n1.Headers.NextjsData), ae = (e10) => [e10[0] instanceof Request ? e10[0] : void 0, e10[0] instanceof Request ? e10[1] : void 0], at = (e10) => ["function" == typeof e10[0] ? e10[0] : void 0, (2 === e10.length ? e10[1] : "function" == typeof e10[0] ? {} : e10[0]) || {}], ar = (e10) => "/clerk-sync-keyless" === e10.nextUrl.pathname, an = (e10) => {
        let t10 = e10.nextUrl.searchParams.get("returnUrl"), r10 = new URL(e10.url);
        return r10.pathname = "", es.redirect(t10 || r10.toString());
      }, ai = (e10, t10) => ({ ...t10, ...iB(e10, t10) }), aa = (e10) => (t10 = {}) => {
        !function(e11, t11) {
          i4(e11, { clerk_digest: iZ.REDIRECT_TO_SIGN_IN, returnBackUrl: null === t11 ? "" : t11 || e11 });
        }(e10.clerkUrl.toString(), t10.returnBackUrl);
      }, as = (e10, t10, r10) => async (n10, i10) => function(e11) {
        let { redirectToSignIn: t11, authObject: r11, redirect: n11, notFound: i11, request: a2 } = e11;
        return async (...e12) => {
          var s2, o2, l2, u2, c2, d2;
          let h2 = (null == (s2 = e12[0]) ? void 0 : s2.unauthenticatedUrl) || (null == (o2 = e12[0]) ? void 0 : o2.unauthorizedUrl) ? void 0 : e12[0], p2 = (null == (l2 = e12[0]) ? void 0 : l2.unauthenticatedUrl) || (null == (u2 = e12[1]) ? void 0 : u2.unauthenticatedUrl), f2 = (null == (c2 = e12[0]) ? void 0 : c2.unauthorizedUrl) || (null == (d2 = e12[1]) ? void 0 : d2.unauthorizedUrl), g2 = () => f2 ? n11(f2) : i11();
          return r11.userId ? h2 ? "function" == typeof h2 ? h2(r11.has) ? r11 : g2() : r11.has(h2) ? r11 : g2() : r11 : p2 ? n11(p2) : i6(a2) ? t11() : i11();
        };
      }({ request: e10, redirect: (e11) => i4(e11, { redirectUrl: e11 }), notFound: () => function() {
        let e11 = Error(n0);
        throw e11.digest = n0, e11;
      }(), authObject: t10, redirectToSignIn: r10 })(n10, i10), ao = (e10, t10, r10, n10) => {
        if (function(e11) {
          return "object" == typeof e11 && null !== e11 && "digest" in e11 && "NEXT_NOT_FOUND" === e11.digest || function(e12) {
            if (!function(e13) {
              if ("object" != typeof e13 || null === e13 || !("digest" in e13) || "string" != typeof e13.digest) return false;
              let [t12, r11] = e13.digest.split(";");
              return "NEXT_HTTP_ERROR_FALLBACK" === t12 && i1.has(Number(r11));
            }(e12)) return;
            let [, t11] = e12.digest.split(";");
            return Number(t11);
          }(e11) === i0.NOT_FOUND;
        }(e10)) return n4(es.rewrite(new URL(`/clerk_${Date.now()}`, r10.url)), rd.Headers.AuthReason, "protect-rewrite");
        if (function(e11) {
          return !!i5(e11) && "clerk_digest" in e11 && e11.clerk_digest === iZ.REDIRECT_TO_SIGN_IN;
        }(e10)) return nV({ redirectAdapter: iH, baseUrl: t10.clerkUrl, signInUrl: n10.signInUrl, signUpUrl: n10.signUpUrl, publishableKey: n10.publishableKey }).redirectToSignIn({ returnBackUrl: e10.returnBackUrl });
        if (i5(e10)) return iH(e10.redirectUrl);
        throw e10;
      }, al = ((e10) => {
        if ("function" == typeof e10) return (t11) => e10(t11);
        let t10 = tf([e10 || ""].flat().filter(Boolean));
        return (e11) => t10.some((t11) => t11.test(e11.nextUrl.pathname));
      })(["/dashboard(.*)", "/resume(.*)", "/interview(.*)", "/ai-cover-letter(.*)", "/onboarding(.*)"]), au = ((...e10) => {
        let [t10, r10] = ae(e10), [n10, i10] = at(e10);
        return ik.run(iS, () => {
          let e11 = ie("clerkMiddleware", (e12) => async (t11, r11) => {
            let a3 = "function" == typeof i10 ? i10(t11) : i10, s3 = iY((e13) => {
              var r12;
              return null == (r12 = t11.cookies.get(e13)) ? void 0 : r12.value;
            }), o2 = function(e13, t12) {
              return e13 || t12(), e13;
            }(a3.publishableKey || is || (null == s3 ? void 0 : s3.publishableKey), () => iL.throwMissingPublishableKeyError()), l2 = { publishableKey: o2, secretKey: function(e13, t12) {
              return e13 || t12(), e13;
            }(a3.secretKey || ia || (null == s3 ? void 0 : s3.secretKey), () => iL.throwMissingSecretKeyError()), signInUrl: a3.signInUrl || ih, signUpUrl: a3.signUpUrl || "/sign-up", ...a3 };
            iS.set("requestData", l2);
            let u2 = await iF();
            u2.telemetry.record({ event: "METHOD_CALLED", payload: { method: "clerkMiddleware", handler: !!n10, satellite: !!l2.isSatellite, proxy: !!l2.proxyUrl } }), l2.debug && e12.enable();
            let c2 = nS(t11);
            e12.debug("options", l2), e12.debug("url", () => c2.toJSON());
            let d2 = await u2.authenticateRequest(c2, ai(c2, l2));
            if (e12.debug("requestState", () => ({ status: d2.status, headers: JSON.stringify(Object.fromEntries(d2.headers)), reason: d2.reason })), d2.headers.get(rd.Headers.Location)) return new Response(null, { status: 307, headers: d2.headers });
            if (d2.status === nf.Handshake) throw Error("Clerk: handshake status without redirect");
            let h2 = d2.toAuth();
            e12.debug("auth", () => ({ auth: h2, debug: h2.debug() }));
            let p2 = aa(c2), f2 = await as(c2, h2, p2), g2 = Object.assign(h2, { redirectToSignIn: p2 }), m2 = () => Promise.resolve(g2);
            m2.protect = f2;
            let v2 = es.next();
            try {
              v2 = await ik.run(iS, async () => null == n10 ? void 0 : n10(m2, t11, r11)) || v2;
            } catch (e13) {
              v2 = ao(e13, c2, t11, d2);
            }
            return (d2.headers && d2.headers.forEach((e13, t12) => {
              v2.headers.append(t12, e13);
            }), n2(v2)) ? (e12.debug("handlerResult is redirect"), n3(c2, v2, l2)) : (l2.debug && iq(v2, c2, { [rd.Headers.EnableDebug]: "true" }), !function(e13, t12, r12, n11, i11) {
              let a4;
              let { reason: s4, message: o3, status: l3, token: u3 } = r12;
              if (t12 || (t12 = es.next()), t12.headers.get(n1.Headers.NextRedirect)) return;
              "1" === t12.headers.get(n1.Headers.NextResume) && (t12.headers.delete(n1.Headers.NextResume), a4 = new URL(e13.url));
              let c3 = t12.headers.get(n1.Headers.NextRewrite);
              if (c3) {
                let t13 = new URL(e13.url);
                if ((a4 = new URL(c3)).origin !== t13.origin) return;
              }
              if (a4) {
                var d3;
                let r13 = function(e14, t13) {
                  var r14;
                  let n12 = (e15) => !e15 || !Object.values(e15).some((e16) => void 0 !== e16);
                  if (n12(e14) && n12(t13)) return;
                  if (e14.secretKey && !io) {
                    iT.warnOnce("Clerk: Missing `CLERK_ENCRYPTION_KEY`. Required for propagating `secretKey` middleware option. See docs: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys");
                    return;
                  }
                  let i12 = it() ? io || (r14 = () => iL.throwMissingSecretKeyError(), ia || r14(), ia) : io || ia || i$;
                  return iO().encrypt(JSON.stringify({ ...t13, ...e14 }), i12).toString();
                }(n11, i11);
                iq(t12, e13, { [rd.Headers.AuthStatus]: l3, [rd.Headers.AuthToken]: u3 || "", [rd.Headers.AuthSignature]: u3 ? (d3 = (null == n11 ? void 0 : n11.secretKey) || ia || i11.secretKey || "", iN()(u3, d3).toString()) : "", [rd.Headers.AuthMessage]: o3 || "", [rd.Headers.AuthReason]: s4 || "", [rd.Headers.ClerkUrl]: e13.clerkUrl.toString(), ...r13 ? { [rd.Headers.ClerkRequestData]: r13 } : {} }), t12.headers.set(n1.Headers.NextRewrite, a4.href);
              }
            }(c2, v2, d2, a3, { publishableKey: null == s3 ? void 0 : s3.publishableKey, secretKey: null == s3 ? void 0 : s3.secretKey }), v2);
          }), a2 = async (t11, r11) => {
            if (ar(t11)) return an(t11);
            let n11 = "function" == typeof i10 ? i10(t11) : i10, a3 = iY((e12) => {
              var r12;
              return null == (r12 = t11.cookies.get(e12)) ? void 0 : r12.value;
            });
            if (!(n11.publishableKey || is || (null == a3 ? void 0 : a3.publishableKey))) {
              let e12 = es.next();
              return iq(e12, t11, { [rd.Headers.AuthStatus]: "signed-out" }), e12;
            }
            return e11(t11, r11);
          }, s2 = async (t11, r11) => im ? a2(t11, r11) : e11(t11, r11);
          return t10 && r10 ? s2(t10, r10) : s2;
        });
      })(async (e10, t10) => {
        let { userId: r10 } = await e10();
        if (!r10 && al(t10)) {
          let { redirectToSignIn: t11 } = await e10();
          return t11();
        }
        return es.next();
      }), ac = { matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"] }, ad = { ...k }, ah = ad.middleware || ad.default, ap = "/middleware";
      if ("function" != typeof ah) throw Error(`The Middleware "${ap}" must export a \`middleware\` or a \`default\` function`);
      function af(e10) {
        return tr({ ...e10, page: ap, handler: async (...e11) => {
          try {
            return await ah(...e11);
          } catch (i10) {
            let t10 = e11[0], r10 = new URL(t10.url), n10 = r10.pathname + r10.search;
            throw await C(i10, { path: n10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i10;
          }
        } });
      }
    }, 58: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => s });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function s() {
        return a ? new a() : new i();
      }
    } }, (e) => {
      var t = e(e.s = 643);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\.json)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "randomuser.me" }], "unoptimized": false }, "devIndicators": { "appIsrStatus": true, "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/rumsan/Documents/Rumsan/JobGeniusAI", "experimental": { "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 11, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "turbo": { "root": "/home/rumsan/Documents/Rumsan/JobGeniusAI" }, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "reactOwnerStack": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "bundlePagesRouterDependencies": false, "configFileName": "next.config.mjs" };
var BuildId = "iQQaC55IhPhHa5lQUljcL";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/ai-cover-letter", "regex": "^/ai\\-cover\\-letter(?:/)?$", "routeKeys": {}, "namedRegex": "^/ai\\-cover\\-letter(?:/)?$" }, { "page": "/ai-cover-letter/new", "regex": "^/ai\\-cover\\-letter/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/ai\\-cover\\-letter/new(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/icon.png", "regex": "^/icon\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon\\.png(?:/)?$" }, { "page": "/interview", "regex": "^/interview(?:/)?$", "routeKeys": {}, "namedRegex": "^/interview(?:/)?$" }, { "page": "/interview/mock", "regex": "^/interview/mock(?:/)?$", "routeKeys": {}, "namedRegex": "^/interview/mock(?:/)?$" }, { "page": "/onboarding", "regex": "^/onboarding(?:/)?$", "routeKeys": {}, "namedRegex": "^/onboarding(?:/)?$" }, { "page": "/resume", "regex": "^/resume(?:/)?$", "routeKeys": {}, "namedRegex": "^/resume(?:/)?$" }], "dynamic": [{ "page": "/ai-cover-letter/[id]", "regex": "^/ai\\-cover\\-letter/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/ai\\-cover\\-letter/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/sign-in/[[...sign-in]]", "regex": "^/sign\\-in(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignin": "nxtPsign-in" }, "namedRegex": "^/sign\\-in(?:/(?<nxtPsignin>.+?))?(?:/)?$" }, { "page": "/sign-up/[[...sign-up]]", "regex": "^/sign\\-up(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPsignup": "nxtPsign-up" }, "namedRegex": "^/sign\\-up(?:/(?<nxtPsignup>.+?))?(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/icon.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/icon.png/layout,_N_T_/icon.png/route,_N_T_/icon.png" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/icon.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "33e7a2dc14a7d040dc689aed2fa23e1a", "previewModeSigningKey": "ad633b029838d63eb2bd2323c84f808b0f370c8ef5a07969b8be4289bd3b7c00", "previewModeEncryptionKey": "04997ff9f808b4c3df74dcc579a0dc72230184cd6e0a8d16c32bafc548382c66" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(api|trpc))(.*)(\\.json)?[\\/#\\?]?$", "originalSource": "/(api|trpc)(.*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "iQQaC55IhPhHa5lQUljcL", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "FUYAaajBSHLBp8QlJGGmtRwn1FnO0bdXVDDNkKHneZE=", "__NEXT_PREVIEW_MODE_ID": "33e7a2dc14a7d040dc689aed2fa23e1a", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "04997ff9f808b4c3df74dcc579a0dc72230184cd6e0a8d16c32bafc548382c66", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "ad633b029838d63eb2bd2323c84f808b0f370c8ef5a07969b8be4289bd3b7c00" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/favicon.ico/route": "/favicon.ico", "/icon.png/route": "/icon.png", "/api/inngest/route": "/api/inngest", "/api/test/route": "/api/test", "/_not-found/page": "/_not-found", "/page": "/", "/(auth)/sign-up/[[...sign-up]]/page": "/sign-up/[[...sign-up]]", "/(main)/ai-cover-letter/new/page": "/ai-cover-letter/new", "/(main)/ai-cover-letter/page": "/ai-cover-letter", "/(main)/onboarding/page": "/onboarding", "/(auth)/sign-in/[[...sign-in]]/page": "/sign-in/[[...sign-in]]", "/(main)/ai-cover-letter/[id]/page": "/ai-cover-letter/[id]", "/(main)/resume/page": "/resume", "/(main)/interview/page": "/interview", "/(main)/dashboard/page": "/dashboard", "/(main)/interview/mock/page": "/interview/mock" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/inngest": {}, "/api/test": {} } };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
