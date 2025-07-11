(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/_dfea4c57._.js", {

"[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "edgeInstrumentationOnRequestError": (()=>edgeInstrumentationOnRequestError),
    "ensureInstrumentationRegistered": (()=>ensureInstrumentationRegistered),
    "getEdgeInstrumentationModule": (()=>getEdgeInstrumentationModule)
});
async function getEdgeInstrumentationModule() {
    const instrumentation = '_ENTRIES' in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
    return instrumentation;
}
let instrumentationModulePromise = null;
async function registerInstrumentation() {
    // Ensure registerInstrumentation is not called in production build
    if (process.env.NEXT_PHASE === 'phase-production-build') return;
    if (!instrumentationModulePromise) {
        instrumentationModulePromise = getEdgeInstrumentationModule();
    }
    const instrumentation = await instrumentationModulePromise;
    if (instrumentation == null ? void 0 : instrumentation.register) {
        try {
            await instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
async function edgeInstrumentationOnRequestError(...args) {
    const instrumentation = await getEdgeInstrumentationModule();
    try {
        var _instrumentation_onRequestError;
        await (instrumentation == null ? void 0 : (_instrumentation_onRequestError = instrumentation.onRequestError) == null ? void 0 : _instrumentation_onRequestError.call(instrumentation, ...args));
    } catch (err) {
        // Log the soft error and continue, since the original error has already been thrown
        console.error('Error in instrumentation.onRequestError:', err);
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === 'then') {
                return {};
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        construct () {
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        },
        apply (_target, _this, args) {
            if (typeof args[0] === 'function') {
                return args[0](proxy);
            }
            throw Object.defineProperty(new Error(getUnsupportedModuleErrorMessage(moduleName)), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    // The condition is true when the "process" module is provided
    if (process !== global.process) {
        // prefer local process but global.process has correct "env"
        process.env = global.process.env;
        global.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, '__import_unsupported', {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PageSignatureError": (()=>PageSignatureError),
    "RemovedPageError": (()=>RemovedPageError),
    "RemovedUAError": (()=>RemovedUAError)
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map
}}),
"[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ACTION_SUFFIX": (()=>ACTION_SUFFIX),
    "APP_DIR_ALIAS": (()=>APP_DIR_ALIAS),
    "CACHE_ONE_YEAR": (()=>CACHE_ONE_YEAR),
    "DOT_NEXT_ALIAS": (()=>DOT_NEXT_ALIAS),
    "ESLINT_DEFAULT_DIRS": (()=>ESLINT_DEFAULT_DIRS),
    "GSP_NO_RETURNED_VALUE": (()=>GSP_NO_RETURNED_VALUE),
    "GSSP_COMPONENT_MEMBER_ERROR": (()=>GSSP_COMPONENT_MEMBER_ERROR),
    "GSSP_NO_RETURNED_VALUE": (()=>GSSP_NO_RETURNED_VALUE),
    "INFINITE_CACHE": (()=>INFINITE_CACHE),
    "INSTRUMENTATION_HOOK_FILENAME": (()=>INSTRUMENTATION_HOOK_FILENAME),
    "MATCHED_PATH_HEADER": (()=>MATCHED_PATH_HEADER),
    "MIDDLEWARE_FILENAME": (()=>MIDDLEWARE_FILENAME),
    "MIDDLEWARE_LOCATION_REGEXP": (()=>MIDDLEWARE_LOCATION_REGEXP),
    "NEXT_BODY_SUFFIX": (()=>NEXT_BODY_SUFFIX),
    "NEXT_CACHE_IMPLICIT_TAG_ID": (()=>NEXT_CACHE_IMPLICIT_TAG_ID),
    "NEXT_CACHE_REVALIDATED_TAGS_HEADER": (()=>NEXT_CACHE_REVALIDATED_TAGS_HEADER),
    "NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER": (()=>NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER),
    "NEXT_CACHE_SOFT_TAG_MAX_LENGTH": (()=>NEXT_CACHE_SOFT_TAG_MAX_LENGTH),
    "NEXT_CACHE_TAGS_HEADER": (()=>NEXT_CACHE_TAGS_HEADER),
    "NEXT_CACHE_TAG_MAX_ITEMS": (()=>NEXT_CACHE_TAG_MAX_ITEMS),
    "NEXT_CACHE_TAG_MAX_LENGTH": (()=>NEXT_CACHE_TAG_MAX_LENGTH),
    "NEXT_DATA_SUFFIX": (()=>NEXT_DATA_SUFFIX),
    "NEXT_INTERCEPTION_MARKER_PREFIX": (()=>NEXT_INTERCEPTION_MARKER_PREFIX),
    "NEXT_META_SUFFIX": (()=>NEXT_META_SUFFIX),
    "NEXT_QUERY_PARAM_PREFIX": (()=>NEXT_QUERY_PARAM_PREFIX),
    "NEXT_RESUME_HEADER": (()=>NEXT_RESUME_HEADER),
    "NON_STANDARD_NODE_ENV": (()=>NON_STANDARD_NODE_ENV),
    "PAGES_DIR_ALIAS": (()=>PAGES_DIR_ALIAS),
    "PRERENDER_REVALIDATE_HEADER": (()=>PRERENDER_REVALIDATE_HEADER),
    "PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER": (()=>PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER),
    "PUBLIC_DIR_MIDDLEWARE_CONFLICT": (()=>PUBLIC_DIR_MIDDLEWARE_CONFLICT),
    "ROOT_DIR_ALIAS": (()=>ROOT_DIR_ALIAS),
    "RSC_ACTION_CLIENT_WRAPPER_ALIAS": (()=>RSC_ACTION_CLIENT_WRAPPER_ALIAS),
    "RSC_ACTION_ENCRYPTION_ALIAS": (()=>RSC_ACTION_ENCRYPTION_ALIAS),
    "RSC_ACTION_PROXY_ALIAS": (()=>RSC_ACTION_PROXY_ALIAS),
    "RSC_ACTION_VALIDATE_ALIAS": (()=>RSC_ACTION_VALIDATE_ALIAS),
    "RSC_CACHE_WRAPPER_ALIAS": (()=>RSC_CACHE_WRAPPER_ALIAS),
    "RSC_MOD_REF_PROXY_ALIAS": (()=>RSC_MOD_REF_PROXY_ALIAS),
    "RSC_PREFETCH_SUFFIX": (()=>RSC_PREFETCH_SUFFIX),
    "RSC_SEGMENTS_DIR_SUFFIX": (()=>RSC_SEGMENTS_DIR_SUFFIX),
    "RSC_SEGMENT_SUFFIX": (()=>RSC_SEGMENT_SUFFIX),
    "RSC_SUFFIX": (()=>RSC_SUFFIX),
    "SERVER_PROPS_EXPORT_ERROR": (()=>SERVER_PROPS_EXPORT_ERROR),
    "SERVER_PROPS_GET_INIT_PROPS_CONFLICT": (()=>SERVER_PROPS_GET_INIT_PROPS_CONFLICT),
    "SERVER_PROPS_SSG_CONFLICT": (()=>SERVER_PROPS_SSG_CONFLICT),
    "SERVER_RUNTIME": (()=>SERVER_RUNTIME),
    "SSG_FALLBACK_EXPORT_ERROR": (()=>SSG_FALLBACK_EXPORT_ERROR),
    "SSG_GET_INITIAL_PROPS_CONFLICT": (()=>SSG_GET_INITIAL_PROPS_CONFLICT),
    "STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR": (()=>STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR),
    "UNSTABLE_REVALIDATE_RENAME_ERROR": (()=>UNSTABLE_REVALIDATE_RENAME_ERROR),
    "WEBPACK_LAYERS": (()=>WEBPACK_LAYERS),
    "WEBPACK_RESOURCE_QUERIES": (()=>WEBPACK_RESOURCE_QUERIES)
});
const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
const MATCHED_PATH_HEADER = 'x-matched-path';
const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
const RSC_PREFETCH_SUFFIX = '.prefetch.rsc';
const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
const RSC_SEGMENT_SUFFIX = '.segment.rsc';
const RSC_SUFFIX = '.rsc';
const ACTION_SUFFIX = '.action';
const NEXT_DATA_SUFFIX = '.json';
const NEXT_META_SUFFIX = '.meta';
const NEXT_BODY_SUFFIX = '.body';
const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
const NEXT_RESUME_HEADER = 'next-resume';
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
const CACHE_ONE_YEAR = 31536000;
const INFINITE_CACHE = 0xfffffffe;
const MIDDLEWARE_FILENAME = 'middleware';
const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
const PAGES_DIR_ALIAS = 'private-next-pages';
const DOT_NEXT_ALIAS = 'private-dot-next';
const ROOT_DIR_ALIAS = 'private-next-root-dir';
const APP_DIR_ALIAS = 'private-next-app-dir';
const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
const ESLINT_DEFAULT_DIRS = [
    'app',
    'pages',
    'components',
    'lib',
    'src'
];
const SERVER_RUNTIME = {
    edge: 'edge',
    experimentalEdge: 'experimental-edge',
    nodejs: 'nodejs'
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: 'shared',
    /**
   * The layer for server-only runtime and picking up `react-server` export conditions.
   * Including app router RSC pages and app router custom routes and metadata routes.
   */ reactServerComponents: 'rsc',
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: 'ssr',
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: 'action-browser',
    /**
   * The Node.js bundle layer for the API routes.
   */ apiNode: 'api-node',
    /**
   * The Edge Lite bundle layer for the API routes.
   */ apiEdge: 'api-edge',
    /**
   * The layer for the middleware code.
   */ middleware: 'middleware',
    /**
   * The layer for the instrumentation hooks.
   */ instrument: 'instrument',
    /**
   * The layer for assets on the edge.
   */ edgeAsset: 'edge-asset',
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: 'app-pages-browser',
    /**
   * The browser client bundle layer for Pages directory.
   */ pagesDirBrowser: 'pages-dir-browser',
    /**
   * The Edge Lite bundle layer for Pages directory.
   */ pagesDirEdge: 'pages-dir-edge',
    /**
   * The Node.js bundle layer for Pages directory.
   */ pagesDirNode: 'pages-dir-node'
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        builtinReact: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ],
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        neutralTarget: [
            // pages api
            WEBPACK_LAYERS_NAMES.apiNode,
            WEBPACK_LAYERS_NAMES.apiEdge
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        bundled: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument,
            WEBPACK_LAYERS_NAMES.middleware
        ],
        appPages: [
            // app router pages and layouts
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.actionBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: '__next_edge_ssr_entry__',
    metadata: '__next_metadata__',
    metadataRoute: '__next_metadata_route__',
    metadataImageMeta: '__next_metadata_image_meta__'
};
;
 //# sourceMappingURL=constants.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fromNodeOutgoingHttpHeaders": (()=>fromNodeOutgoingHttpHeaders),
    "normalizeNextQueryParam": (()=>normalizeNextQueryParam),
    "splitCookiesString": (()=>splitCookiesString),
    "toNodeOutgoingHttpHeaders": (()=>toNodeOutgoingHttpHeaders),
    "validateURL": (()=>validateURL)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
;
function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === 'undefined') continue;
            if (typeof v === 'number') {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== '=' && ch !== ';' && ch !== ',';
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ',') {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === '=') {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === 'set-cookie') {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        }), "__NEXT_ERROR_CODE", {
            value: "E61",
            enumerable: false,
            configurable: true
        });
    }
}
function normalizeNextQueryParam(key) {
    const prefixes = [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_QUERY_PARAM_PREFIX"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_INTERCEPTION_MARKER_PREFIX"]
    ];
    for (const prefix of prefixes){
        if (key !== prefix && key.startsWith(prefix)) {
            return key.substring(prefix.length);
        }
    }
    return null;
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NextFetchEvent": (()=>NextFetchEvent),
    "getWaitUntilPromiseFromEvent": (()=>getWaitUntilPromiseFromEvent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
;
const responseSymbol = Symbol('response');
const passThroughSymbol = Symbol('passThrough');
const waitUntilSymbol = Symbol('waitUntil');
class FetchEvent {
    constructor(_request, waitUntil){
        this[passThroughSymbol] = false;
        this[waitUntilSymbol] = waitUntil ? {
            kind: 'external',
            function: waitUntil
        } : {
            kind: 'internal',
            promises: []
        };
    }
    // TODO: is this dead code? NextFetchEvent never lets this get called
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    // TODO: is this dead code? passThroughSymbol is unused
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        if (this[waitUntilSymbol].kind === 'external') {
            // if we received an external waitUntil, we delegate to it
            // TODO(after): this will make us not go through `getServerError(error, 'edge-server')` in `sandbox`
            const waitUntil = this[waitUntilSymbol].function;
            return waitUntil(promise);
        } else {
            // if we didn't receive an external waitUntil, we make it work on our own
            // (and expect the caller to do something with the promises)
            this[waitUntilSymbol].promises.push(promise);
        }
    }
}
function getWaitUntilPromiseFromEvent(event) {
    return event[waitUntilSymbol].kind === 'internal' ? Promise.all(event[waitUntilSymbol].promises).then(()=>{}) : undefined;
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        var _params_context;
        super(params.request, (_params_context = params.context) == null ? void 0 : _params_context.waitUntil);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
} //# sourceMappingURL=fetch-event.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "detectDomainLocale": (()=>detectDomainLocale)
});
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ __turbopack_context__.s({
    "removeTrailingSlash": (()=>removeTrailingSlash)
});
function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
} //# sourceMappingURL=remove-trailing-slash.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ __turbopack_context__.s({
    "parsePath": (()=>parsePath)
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addPathPrefix": (()=>addPathPrefix)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
;
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addPathSuffix": (()=>addPathSuffix)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
;
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "pathHasPrefix": (()=>pathHasPrefix)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js [middleware-edge] (ecmascript)");
;
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$parse$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parsePath"])(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addLocale": (()=>addLocale)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
;
;
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, '/api')) return path;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatNextPathnameInfo": (()=>formatNextPathnameInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js [middleware-edge] (ecmascript)");
;
;
;
;
function formatNextPathnameInfo(info) {
    let pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addLocale"])(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
    }
    if (info.buildId) {
        pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathSuffix"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, "/_next/data/" + info.buildId), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathPrefix"])(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$add$2d$path$2d$suffix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addPathSuffix"])(pathname, '/') : pathname : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$trailing$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ __turbopack_context__.s({
    "getHostname": (()=>getHostname)
});
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * A cache of lowercased locales for each list of locales. This is stored as a
 * WeakMap so if the locales are garbage collected, the cache entry will be
 * removed as well.
 */ __turbopack_context__.s({
    "normalizeLocalePath": (()=>normalizeLocalePath)
});
const cache = new WeakMap();
function normalizeLocalePath(pathname, locales) {
    // If locales is undefined, return the pathname as is.
    if (!locales) return {
        pathname
    };
    // Get the cached lowercased locales or create a new cache entry.
    let lowercasedLocales = cache.get(locales);
    if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
    }
    let detectedLocale;
    // The first segment will be empty, because it has a leading `/`. If
    // there is no further segment, there is no locale (or it's the default).
    const segments = pathname.split('/', 2);
    // If there's no second segment (ie, the pathname is just `/`), there's no
    // locale.
    if (!segments[1]) return {
        pathname
    };
    // The second segment will contain the locale part if any.
    const segment = segments[1].toLowerCase();
    // See if the segment matches one of the locales. If it doesn't, there is
    // no locale (or it's the default).
    const index = lowercasedLocales.indexOf(segment);
    if (index < 0) return {
        pathname
    };
    // Return the case-sensitive locale.
    detectedLocale = locales[index];
    // Remove the `/${locale}` part of the pathname.
    pathname = pathname.slice(detectedLocale.length + 1) || '/';
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "removePathPrefix": (()=>removePathPrefix)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
;
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getNextPathnameInfo": (()=>getNextPathnameInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js [middleware-edge] (ecmascript)");
;
;
;
function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$path$2d$has$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["pathHasPrefix"])(info.pathname, basePath)) {
        info.pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$remove$2d$path$2d$prefix$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["removePathPrefix"])(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? "/" + paths.slice(1).join('/') : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$normalize$2d$locale$2d$path$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeLocalePath"])(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NextURL": (()=>NextURL)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/get-hostname.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js [middleware-edge] (ecmascript)");
;
;
;
;
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$get$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getNextPathnameInfo"])(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$get$2d$hostname$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getHostname"])(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$i18n$2f$detect$2d$domain$2d$locale$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["detectDomainLocale"])((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$format$2d$next$2d$pathname$2d$info$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["formatNextPathnameInfo"])({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map
}}),
"[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "partitioned" in c && c.partitioned && "Partitioned",
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
    return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, partitioned, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase().replace(/-/g, ""),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        },
        ...partitioned && {
            partitioned: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, options] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0]
        ];
        return this.set({
            ...options,
            name,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    RequestCookies,
    ResponseCookies,
    parseCookie,
    parseSetCookie,
    stringifyCookie
});
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)"); //# sourceMappingURL=cookies.js.map
;
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "INTERNALS": (()=>INTERNALS),
    "NextRequest": (()=>NextRequest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
;
;
;
;
const INTERNALS = Symbol('internal request');
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](url, {
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](this.headers),
            nextUrl,
            url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RemovedPageError"]();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RemovedUAError"]();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ReflectAdapter": (()=>ReflectAdapter)
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NextResponse": (()=>NextResponse)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
;
;
;
;
;
const INTERNALS = Symbol('internal response');
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw Object.defineProperty(new Error('request.headers must be an instance of Headers'), "__NEXT_ERROR_CODE", {
                value: "E119",
                enumerable: false,
                configurable: true
            });
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set('x-middleware-request-' + key, value);
            keys.push(key);
        }
        headers.set('x-middleware-override-headers', keys.join(','));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        const headers = this.headers;
        const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
        const cookiesProxy = new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'delete':
                    case 'set':
                        {
                            return (...args)=>{
                                const result = Reflect.apply(target[prop], target, args);
                                const newHeaders = new Headers(headers);
                                if (result instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"]) {
                                    headers.set('x-middleware-set-cookie', result.getAll().map((cookie)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringifyCookie"])(cookie)).join(','));
                                }
                                handleMiddlewareField(init, newHeaders);
                                return result;
                            };
                        }
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
        this[INTERNALS] = {
            cookies: cookiesProxy,
            url: init.url ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](init.url, {
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["toNodeOutgoingHttpHeaders"])(headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === 'number' ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw Object.defineProperty(new RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", {
                value: "E529",
                enumerable: false,
                configurable: true
            });
        }
        const initObj = typeof init === 'object' ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set('Location', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-rewrite', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateURL"])(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set('x-middleware-next', '1');
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * The result of parsing a URL relative to a base URL.
 */ __turbopack_context__.s({
    "getRelativeURL": (()=>getRelativeURL),
    "parseRelativeURL": (()=>parseRelativeURL)
});
function parseRelativeURL(url, base) {
    const baseURL = typeof base === 'string' ? new URL(base) : base;
    const relative = new URL(url, base);
    // The URL is relative if the origin is the same as the base URL.
    const isRelative = relative.origin === baseURL.origin;
    return {
        url: isRelative ? relative.toString().slice(baseURL.origin.length) : relative.toString(),
        isRelative
    };
}
function getRelativeURL(url, base) {
    const relative = parseRelativeURL(url, base);
    return relative.url;
} //# sourceMappingURL=relativize-url.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ACTION_HEADER": (()=>ACTION_HEADER),
    "FLIGHT_HEADERS": (()=>FLIGHT_HEADERS),
    "NEXT_DID_POSTPONE_HEADER": (()=>NEXT_DID_POSTPONE_HEADER),
    "NEXT_HMR_REFRESH_HASH_COOKIE": (()=>NEXT_HMR_REFRESH_HASH_COOKIE),
    "NEXT_HMR_REFRESH_HEADER": (()=>NEXT_HMR_REFRESH_HEADER),
    "NEXT_IS_PRERENDER_HEADER": (()=>NEXT_IS_PRERENDER_HEADER),
    "NEXT_REWRITTEN_PATH_HEADER": (()=>NEXT_REWRITTEN_PATH_HEADER),
    "NEXT_REWRITTEN_QUERY_HEADER": (()=>NEXT_REWRITTEN_QUERY_HEADER),
    "NEXT_ROUTER_PREFETCH_HEADER": (()=>NEXT_ROUTER_PREFETCH_HEADER),
    "NEXT_ROUTER_SEGMENT_PREFETCH_HEADER": (()=>NEXT_ROUTER_SEGMENT_PREFETCH_HEADER),
    "NEXT_ROUTER_STALE_TIME_HEADER": (()=>NEXT_ROUTER_STALE_TIME_HEADER),
    "NEXT_ROUTER_STATE_TREE_HEADER": (()=>NEXT_ROUTER_STATE_TREE_HEADER),
    "NEXT_RSC_UNION_QUERY": (()=>NEXT_RSC_UNION_QUERY),
    "NEXT_URL": (()=>NEXT_URL),
    "RSC_CONTENT_TYPE_HEADER": (()=>RSC_CONTENT_TYPE_HEADER),
    "RSC_HEADER": (()=>RSC_HEADER)
});
const RSC_HEADER = 'RSC';
const ACTION_HEADER = 'Next-Action';
const NEXT_ROUTER_STATE_TREE_HEADER = 'Next-Router-State-Tree';
const NEXT_ROUTER_PREFETCH_HEADER = 'Next-Router-Prefetch';
const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = 'Next-Router-Segment-Prefetch';
const NEXT_HMR_REFRESH_HEADER = 'Next-HMR-Refresh';
const NEXT_HMR_REFRESH_HASH_COOKIE = '__next_hmr_refresh_hash__';
const NEXT_URL = 'Next-Url';
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
const FLIGHT_HEADERS = [
    RSC_HEADER,
    NEXT_ROUTER_STATE_TREE_HEADER,
    NEXT_ROUTER_PREFETCH_HEADER,
    NEXT_HMR_REFRESH_HEADER,
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
];
const NEXT_RSC_UNION_QUERY = '_rsc';
const NEXT_ROUTER_STALE_TIME_HEADER = 'x-nextjs-stale-time';
const NEXT_DID_POSTPONE_HEADER = 'x-nextjs-postponed';
const NEXT_REWRITTEN_PATH_HEADER = 'x-nextjs-rewritten-path';
const NEXT_REWRITTEN_QUERY_HEADER = 'x-nextjs-rewritten-query';
const NEXT_IS_PRERENDER_HEADER = 'x-nextjs-prerender'; //# sourceMappingURL=app-router-headers.js.map
}}),
"[project]/node_modules/next/dist/esm/server/internal-utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "stripInternalQueries": (()=>stripInternalQueries),
    "stripInternalSearchParams": (()=>stripInternalSearchParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
;
const INTERNAL_QUERY_NAMES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url) {
    const isStringUrl = typeof url === 'string';
    const instance = isStringUrl ? new URL(url) : url;
    instance.searchParams.delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_RSC_UNION_QUERY"]);
    return isStringUrl ? instance.toString() : instance;
} //# sourceMappingURL=internal-utils.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */ __turbopack_context__.s({
    "ensureLeadingSlash": (()=>ensureLeadingSlash)
});
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : "/" + path;
} //# sourceMappingURL=ensure-leading-slash.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/segment.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_SEGMENT_KEY": (()=>DEFAULT_SEGMENT_KEY),
    "PAGE_SEGMENT_KEY": (()=>PAGE_SEGMENT_KEY),
    "addSearchParamsIfPageSegment": (()=>addSearchParamsIfPageSegment),
    "isGroupSegment": (()=>isGroupSegment),
    "isParallelRouteSegment": (()=>isParallelRouteSegment)
});
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "normalizeAppPath": (()=>normalizeAppPath),
    "normalizeRscURL": (()=>normalizeRscURL)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/page-path/ensure-leading-slash.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/segment.js [middleware-edge] (ecmascript)");
;
;
function normalizeAppPath(route) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$page$2d$path$2f$ensure$2d$leading$2d$slash$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ensureLeadingSlash"])(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$segment$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isGroupSegment"])(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === '@') {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ''));
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} //# sourceMappingURL=app-paths.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeadersAdapter": (()=>HeadersAdapter),
    "ReadonlyHeadersError": (()=>ReadonlyHeadersError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
;
class ReadonlyHeadersError extends Error {
    constructor(){
        super('Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers');
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === 'undefined') return;
                // If the original casing exists, return the value.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === 'symbol') {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === 'undefined') return false;
                // If the original casing exists, return true.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === 'symbol') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === 'undefined') return true;
                // If the original casing exists, delete the property.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'append':
                    case 'delete':
                    case 'set':
                        return ReadonlyHeadersError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(', ');
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === 'string') {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== 'undefined') return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== 'undefined';
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "bindSnapshot": (()=>bindSnapshot),
    "createAsyncLocalStorage": (()=>createAsyncLocalStorage),
    "createSnapshot": (()=>createSnapshot)
});
const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available'), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
        return fn;
    }
}
const maybeGlobalAsyncLocalStorage = typeof globalThis !== 'undefined' && globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}
function bindSnapshot(fn) {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
}
function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
        return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
        return fn(...args);
    };
} //# sourceMappingURL=async-local-storage.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "workAsyncStorageInstance": (()=>workAsyncStorageInstance)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
;
const workAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=work-async-storage-instance.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Share the instance module in the next-shared layer
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
;
;
 //# sourceMappingURL=work-async-storage.external.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "workAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workAsyncStorageInstance"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript)");
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "workUnitAsyncStorageInstance": (()=>workUnitAsyncStorageInstance)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
;
const workUnitAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=work-unit-async-storage-instance.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Share the instance module in the next-shared layer
__turbopack_context__.s({
    "getDraftModeProviderForCacheScope": (()=>getDraftModeProviderForCacheScope),
    "getExpectedRequestStore": (()=>getExpectedRequestStore),
    "getHmrRefreshHash": (()=>getHmrRefreshHash),
    "getPrerenderResumeDataCache": (()=>getPrerenderResumeDataCache),
    "getRenderResumeDataCache": (()=>getRenderResumeDataCache),
    "throwForMissingRequestStore": (()=>throwForMissingRequestStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
;
;
;
function getExpectedRequestStore(callingExpression) {
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workUnitAsyncStorageInstance"].getStore();
    if (!workUnitStore) {
        throwForMissingRequestStore(callingExpression);
    }
    switch(workUnitStore.type){
        case 'request':
            return workUnitStore;
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            // This should not happen because we should have checked it already.
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
                value: "E401",
                enumerable: false,
                configurable: true
            });
        case 'cache':
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                value: "E37",
                enumerable: false,
                configurable: true
            });
        case 'unstable-cache':
            throw Object.defineProperty(new Error(`\`${callingExpression}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                value: "E69",
                enumerable: false,
                configurable: true
            });
        default:
            const _exhaustiveCheck = workUnitStore;
            return _exhaustiveCheck;
    }
}
function throwForMissingRequestStore(callingExpression) {
    throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: false,
        configurable: true
    });
}
function getPrerenderResumeDataCache(workUnitStore) {
    if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-ppr') {
        return workUnitStore.prerenderResumeDataCache;
    }
    return null;
}
function getRenderResumeDataCache(workUnitStore) {
    if (workUnitStore.type !== 'prerender-legacy' && workUnitStore.type !== 'cache' && workUnitStore.type !== 'unstable-cache') {
        if (workUnitStore.type === 'request') {
            return workUnitStore.renderResumeDataCache;
        }
        // We return the mutable resume data cache here as an immutable version of
        // the cache as it can also be used for reading.
        return workUnitStore.prerenderResumeDataCache;
    }
    return null;
}
function getHmrRefreshHash(workStore, workUnitStore) {
    var _workUnitStore_cookies_get;
    if (!workStore.dev) {
        return undefined;
    }
    return workUnitStore.type === 'cache' || workUnitStore.type === 'prerender' ? workUnitStore.hmrRefreshHash : workUnitStore.type === 'request' ? (_workUnitStore_cookies_get = workUnitStore.cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_HMR_REFRESH_HASH_COOKIE"])) == null ? void 0 : _workUnitStore_cookies_get.value : undefined;
}
function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
    if (workStore.isDraftMode) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
            case 'request':
                return workUnitStore.draftMode;
            default:
                return undefined;
        }
    }
    return undefined;
} //# sourceMappingURL=work-unit-async-storage.external.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MutableRequestCookiesAdapter": (()=>MutableRequestCookiesAdapter),
    "ReadonlyRequestCookiesError": (()=>ReadonlyRequestCookiesError),
    "RequestCookiesAdapter": (()=>RequestCookiesAdapter),
    "appendMutableCookies": (()=>appendMutableCookies),
    "areCookiesMutableInCurrentPhase": (()=>areCookiesMutableInCurrentPhase),
    "getModifiedCookieValues": (()=>getModifiedCookieValues),
    "responseCookiesToRequestCookies": (()=>responseCookiesToRequestCookies),
    "wrapWithMutableAccessCheck": (()=>wrapWithMutableAccessCheck)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
;
;
;
;
;
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super('Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options');
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case 'clear':
                    case 'delete':
                    case 'set':
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for('next.mutated.cookies');
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            // TODO-APP: change method of getting workStore
            const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
            if (workStore) {
                workStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        const wrappedCookies = new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case 'delete':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case 'set':
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === 'string' ? args[0] : args[0].name);
                            try {
                                target.set(...args);
                                return wrappedCookies;
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
                }
            }
        });
        return wrappedCookies;
    }
}
function wrapWithMutableAccessCheck(responseCookies) {
    const wrappedCookies = new Proxy(responseCookies, {
        get (target, prop, receiver) {
            switch(prop){
                case 'delete':
                    return function(...args) {
                        ensureCookiesAreStillMutable('cookies().delete');
                        target.delete(...args);
                        return wrappedCookies;
                    };
                case 'set':
                    return function(...args) {
                        ensureCookiesAreStillMutable('cookies().set');
                        target.set(...args);
                        return wrappedCookies;
                    };
                default:
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$reflect$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ReflectAdapter"].get(target, prop, receiver);
            }
        }
    });
    return wrappedCookies;
}
function areCookiesMutableInCurrentPhase(requestStore) {
    return requestStore.phase === 'action';
}
/** Ensure that cookies() starts throwing on mutation
 * if we changed phases and can no longer mutate.
 *
 * This can happen when going:
 *   'render' -> 'after'
 *   'action' -> 'render'
 * */ function ensureCookiesAreStillMutable(callingExpression) {
    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getExpectedRequestStore"])(callingExpression);
    if (!areCookiesMutableInCurrentPhase(requestStore)) {
        // TODO: maybe we can give a more precise error message based on callingExpression?
        throw new ReadonlyRequestCookiesError();
    }
}
function responseCookiesToRequestCookies(responseCookies) {
    const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](new Headers());
    for (const cookie of responseCookies.getAll()){
        requestCookies.set(cookie);
    }
    return requestCookies;
} //# sourceMappingURL=request-cookies.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ __turbopack_context__.s({
    "AppRenderSpan": (()=>AppRenderSpan),
    "AppRouteRouteHandlersSpan": (()=>AppRouteRouteHandlersSpan),
    "BaseServerSpan": (()=>BaseServerSpan),
    "LoadComponentsSpan": (()=>LoadComponentsSpan),
    "LogSpanAllowList": (()=>LogSpanAllowList),
    "MiddlewareSpan": (()=>MiddlewareSpan),
    "NextNodeServerSpan": (()=>NextNodeServerSpan),
    "NextServerSpan": (()=>NextServerSpan),
    "NextVanillaSpanAllowlist": (()=>NextVanillaSpanAllowlist),
    "NodeSpan": (()=>NodeSpan),
    "RenderSpan": (()=>RenderSpan),
    "ResolveMetadataSpan": (()=>ResolveMetadataSpan),
    "RouterSpan": (()=>RouterSpan),
    "StartServerSpan": (()=>StartServerSpan)
});
var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
const NextVanillaSpanAllowlist = [
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
];
const LogSpanAllowList = [
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
];
;
 //# sourceMappingURL=constants.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ __turbopack_context__.s({
    "isThenable": (()=>isThenable)
});
function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map
}}),
"[project]/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : global;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();
}}),
"[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BubbledError": (()=>BubbledError),
    "SpanKind": (()=>SpanKind),
    "SpanStatusCode": (()=>SpanStatusCode),
    "getTracer": (()=>getTracer),
    "isBubbledError": (()=>isBubbledError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)");
;
;
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if ("TURBOPACK compile-time truthy", 1) {
    api = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/@opentelemetry/api/index.js [middleware-edge] (ecmascript)");
} else {
    "TURBOPACK unreachable";
}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        var _trace_getSpanContext;
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
            isRootSpan = true;
        } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LogSpanAllowList"].includes(type || '')) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isThenable"])(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextVanillaSpanAllowlist"].includes(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes) {
            attributes.set(key, value);
        }
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();
;
 //# sourceMappingURL=tracer.js.map
}}),
"[project]/node_modules/next/dist/compiled/cookie/index.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();
}}),
"[project]/node_modules/next/dist/esm/server/api-utils/index.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApiError": (()=>ApiError),
    "COOKIE_NAME_PRERENDER_BYPASS": (()=>COOKIE_NAME_PRERENDER_BYPASS),
    "COOKIE_NAME_PRERENDER_DATA": (()=>COOKIE_NAME_PRERENDER_DATA),
    "RESPONSE_LIMIT_DEFAULT": (()=>RESPONSE_LIMIT_DEFAULT),
    "SYMBOL_CLEARED_COOKIES": (()=>SYMBOL_CLEARED_COOKIES),
    "SYMBOL_PREVIEW_DATA": (()=>SYMBOL_PREVIEW_DATA),
    "checkIsOnDemandRevalidate": (()=>checkIsOnDemandRevalidate),
    "clearPreviewData": (()=>clearPreviewData),
    "redirect": (()=>redirect),
    "sendError": (()=>sendError),
    "sendStatusCode": (()=>sendStatusCode),
    "setLazyProp": (()=>setLazyProp),
    "wrapApiHandler": (()=>wrapApiHandler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
;
;
;
;
function wrapApiHandler(page, handler) {
    return (...args)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().setRootSpanAttribute('next.route', page);
        // Call API route method
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NodeSpan"].runHandler, {
            spanName: `executing api route (pages) ${page}`
        }, ()=>handler(...args));
    };
}
function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === 'string') {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
        throw Object.defineProperty(new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`), "__NEXT_ERROR_CODE", {
            value: "E389",
            enumerable: false,
            configurable: true
        });
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers);
    const previewModeId = headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_HEADER"]);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER"]);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = 4 * 1024 * 1024;
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/cookie/index.js [middleware-edge] (ecmascript)");
    const previous = res.getHeader('Set-Cookie');
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === 'string' ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, '', {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
class ApiError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DraftModeProvider": (()=>DraftModeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/api-utils/index.js [middleware-edge] (ecmascript)");
;
class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkIsOnDemandRevalidate"])(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"])) == null ? void 0 : _cookies_get.value;
        this._isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && (cookieValue === previewProps.previewModeId || // In dev mode, the cookie can be actual hash value preview id but the preview props can still be `development-id`.
        ("TURBOPACK compile-time value", "development") !== 'production' && previewProps.previewModeId === 'development-id'));
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    enable() {
        if (!this._previewModeId) {
            throw Object.defineProperty(new Error('Invariant: previewProps missing previewModeId this should never happen'), "__NEXT_ERROR_CODE", {
                value: "E93",
                enumerable: false,
                configurable: true
            });
        }
        this._mutableCookies.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
            value: this._previewModeId,
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/'
        });
        this._isEnabled = true;
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$api$2d$utils$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["COOKIE_NAME_PRERENDER_BYPASS"],
            value: '',
            httpOnly: true,
            sameSite: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'lax',
            secure: ("TURBOPACK compile-time value", "development") !== 'development',
            path: '/',
            expires: new Date(0)
        });
        this._isEnabled = false;
    }
} //# sourceMappingURL=draft-mode-provider.js.map
}}),
"[project]/node_modules/next/dist/esm/server/async-storage/request-store.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createRequestStoreForAPI": (()=>createRequestStoreForAPI),
    "createRequestStoreForRender": (()=>createRequestStoreForRender),
    "synchronizeMutableCookies": (()=>synchronizeMutableCookies)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/cookies.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
function getHeaders(headers) {
    const cleaned = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers);
    for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]){
        cleaned.delete(header.toLowerCase());
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].seal(cleaned);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(headers));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MutableRequestCookiesAdapter"].wrap(cookies, onUpdateCookies);
}
/**
 * If middleware set cookies in this request (indicated by `x-middleware-set-cookie`),
 * then merge those into the existing cookie object, so that when `cookies()` is accessed
 * it's able to read the newly set cookies.
 */ function mergeMiddlewareCookies(req, existingCookies) {
    if ('x-middleware-set-cookie' in req.headers && typeof req.headers['x-middleware-set-cookie'] === 'string') {
        const setCookieValue = req.headers['x-middleware-set-cookie'];
        const responseHeaders = new Headers();
        for (const cookie of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["splitCookiesString"])(setCookieValue)){
            responseHeaders.append('set-cookie', cookie);
        }
        const responseCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseCookies"](responseHeaders);
        // Transfer cookies from ResponseCookies to RequestCookies
        for (const cookie of responseCookies.getAll()){
            existingCookies.set(cookie);
        }
    }
}
function createRequestStoreForRender(req, res, url, rootParams, implicitTags, onUpdateCookies, previewProps, isHmrRefresh, serverComponentsHmrCache, renderResumeDataCache) {
    return createRequestStoreImpl('render', req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache);
}
function createRequestStoreForAPI(req, url, implicitTags, onUpdateCookies, previewProps) {
    return createRequestStoreImpl('action', req, undefined, url, {}, implicitTags, onUpdateCookies, undefined, previewProps, false, undefined);
}
function createRequestStoreImpl(phase, req, res, url, rootParams, implicitTags, onUpdateCookies, renderResumeDataCache, previewProps, isHmrRefresh, serverComponentsHmrCache) {
    function defaultOnUpdateCookies(cookies) {
        if (res) {
            res.setHeader('Set-Cookie', cookies);
        }
    }
    const cache = {};
    return {
        type: 'request',
        phase,
        implicitTags,
        // Rather than just using the whole `url` here, we pull the parts we want
        // to ensure we don't use parts of the URL that we shouldn't. This also
        // lets us avoid requiring an empty string for `search` in the type.
        url: {
            pathname: url.pathname,
            search: url.search ?? ''
        },
        rootParams,
        get headers () {
            if (!cache.headers) {
                // Seal the headers object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.headers = getHeaders(req.headers);
            }
            return cache.headers;
        },
        get cookies () {
            if (!cache.cookies) {
                // if middleware is setting cookie(s), then include those in
                // the initial cached cookies so they can be read in render
                const requestCookies = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f40$edge$2d$runtime$2f$cookies$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookies"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HeadersAdapter"].from(req.headers));
                mergeMiddlewareCookies(req, requestCookies);
                // Seal the cookies object that'll freeze out any methods that could
                // mutate the underlying data.
                cache.cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal(requestCookies);
            }
            return cache.cookies;
        },
        set cookies (value){
            cache.cookies = value;
        },
        get mutableCookies () {
            if (!cache.mutableCookies) {
                const mutableCookies = getMutableCookies(req.headers, onUpdateCookies || (res ? defaultOnUpdateCookies : undefined));
                mergeMiddlewareCookies(req, mutableCookies);
                cache.mutableCookies = mutableCookies;
            }
            return cache.mutableCookies;
        },
        get userspaceMutableCookies () {
            if (!cache.userspaceMutableCookies) {
                const userspaceMutableCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["wrapWithMutableAccessCheck"])(this.mutableCookies);
                cache.userspaceMutableCookies = userspaceMutableCookies;
            }
            return cache.userspaceMutableCookies;
        },
        get draftMode () {
            if (!cache.draftMode) {
                cache.draftMode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$draft$2d$mode$2d$provider$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DraftModeProvider"](previewProps, req, this.cookies, this.mutableCookies);
            }
            return cache.draftMode;
        },
        renderResumeDataCache: renderResumeDataCache ?? null,
        isHmrRefresh,
        serverComponentsHmrCache: serverComponentsHmrCache || globalThis.__serverComponentsHmrCache
    };
}
function synchronizeMutableCookies(store) {
    // TODO: does this need to update headers as well?
    store.cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RequestCookiesAdapter"].seal((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$adapters$2f$request$2d$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["responseCookiesToRequestCookies"])(store.mutableCookies));
} //# sourceMappingURL=request-store.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "workUnitAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["workUnitAsyncStorageInstance"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript)");
}}),
"[project]/node_modules/next/dist/compiled/p-queue/index.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
(()=>{
    "use strict";
    var e = {
        993: (e)=>{
            var t = Object.prototype.hasOwnProperty, n = "~";
            function Events() {}
            if (Object.create) {
                Events.prototype = Object.create(null);
                if (!(new Events).__proto__) n = false;
            }
            function EE(e, t, n) {
                this.fn = e;
                this.context = t;
                this.once = n || false;
            }
            function addListener(e, t, r, i, s) {
                if (typeof r !== "function") {
                    throw new TypeError("The listener must be a function");
                }
                var o = new EE(r, i || e, s), u = n ? n + t : t;
                if (!e._events[u]) e._events[u] = o, e._eventsCount++;
                else if (!e._events[u].fn) e._events[u].push(o);
                else e._events[u] = [
                    e._events[u],
                    o
                ];
                return e;
            }
            function clearEvent(e, t) {
                if (--e._eventsCount === 0) e._events = new Events;
                else delete e._events[t];
            }
            function EventEmitter() {
                this._events = new Events;
                this._eventsCount = 0;
            }
            EventEmitter.prototype.eventNames = function eventNames() {
                var e = [], r, i;
                if (this._eventsCount === 0) return e;
                for(i in r = this._events){
                    if (t.call(r, i)) e.push(n ? i.slice(1) : i);
                }
                if (Object.getOwnPropertySymbols) {
                    return e.concat(Object.getOwnPropertySymbols(r));
                }
                return e;
            };
            EventEmitter.prototype.listeners = function listeners(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return [];
                if (r.fn) return [
                    r.fn
                ];
                for(var i = 0, s = r.length, o = new Array(s); i < s; i++){
                    o[i] = r[i].fn;
                }
                return o;
            };
            EventEmitter.prototype.listenerCount = function listenerCount(e) {
                var t = n ? n + e : e, r = this._events[t];
                if (!r) return 0;
                if (r.fn) return 1;
                return r.length;
            };
            EventEmitter.prototype.emit = function emit(e, t, r, i, s, o) {
                var u = n ? n + e : e;
                if (!this._events[u]) return false;
                var a = this._events[u], l = arguments.length, c, h;
                if (a.fn) {
                    if (a.once) this.removeListener(e, a.fn, undefined, true);
                    switch(l){
                        case 1:
                            return a.fn.call(a.context), true;
                        case 2:
                            return a.fn.call(a.context, t), true;
                        case 3:
                            return a.fn.call(a.context, t, r), true;
                        case 4:
                            return a.fn.call(a.context, t, r, i), true;
                        case 5:
                            return a.fn.call(a.context, t, r, i, s), true;
                        case 6:
                            return a.fn.call(a.context, t, r, i, s, o), true;
                    }
                    for(h = 1, c = new Array(l - 1); h < l; h++){
                        c[h - 1] = arguments[h];
                    }
                    a.fn.apply(a.context, c);
                } else {
                    var _ = a.length, f;
                    for(h = 0; h < _; h++){
                        if (a[h].once) this.removeListener(e, a[h].fn, undefined, true);
                        switch(l){
                            case 1:
                                a[h].fn.call(a[h].context);
                                break;
                            case 2:
                                a[h].fn.call(a[h].context, t);
                                break;
                            case 3:
                                a[h].fn.call(a[h].context, t, r);
                                break;
                            case 4:
                                a[h].fn.call(a[h].context, t, r, i);
                                break;
                            default:
                                if (!c) for(f = 1, c = new Array(l - 1); f < l; f++){
                                    c[f - 1] = arguments[f];
                                }
                                a[h].fn.apply(a[h].context, c);
                        }
                    }
                }
                return true;
            };
            EventEmitter.prototype.on = function on(e, t, n) {
                return addListener(this, e, t, n, false);
            };
            EventEmitter.prototype.once = function once(e, t, n) {
                return addListener(this, e, t, n, true);
            };
            EventEmitter.prototype.removeListener = function removeListener(e, t, r, i) {
                var s = n ? n + e : e;
                if (!this._events[s]) return this;
                if (!t) {
                    clearEvent(this, s);
                    return this;
                }
                var o = this._events[s];
                if (o.fn) {
                    if (o.fn === t && (!i || o.once) && (!r || o.context === r)) {
                        clearEvent(this, s);
                    }
                } else {
                    for(var u = 0, a = [], l = o.length; u < l; u++){
                        if (o[u].fn !== t || i && !o[u].once || r && o[u].context !== r) {
                            a.push(o[u]);
                        }
                    }
                    if (a.length) this._events[s] = a.length === 1 ? a[0] : a;
                    else clearEvent(this, s);
                }
                return this;
            };
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(e) {
                var t;
                if (e) {
                    t = n ? n + e : e;
                    if (this._events[t]) clearEvent(this, t);
                } else {
                    this._events = new Events;
                    this._eventsCount = 0;
                }
                return this;
            };
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;
            EventEmitter.prefixed = n;
            EventEmitter.EventEmitter = EventEmitter;
            if ("TURBOPACK compile-time truthy", 1) {
                e.exports = EventEmitter;
            }
        },
        213: (e)=>{
            e.exports = (e, t)=>{
                t = t || (()=>{});
                return e.then((e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>e), (e)=>new Promise((e)=>{
                        e(t());
                    }).then(()=>{
                        throw e;
                    }));
            };
        },
        574: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            function lowerBound(e, t, n) {
                let r = 0;
                let i = e.length;
                while(i > 0){
                    const s = i / 2 | 0;
                    let o = r + s;
                    if (n(e[o], t) <= 0) {
                        r = ++o;
                        i -= s + 1;
                    } else {
                        i = s;
                    }
                }
                return r;
            }
            t["default"] = lowerBound;
        },
        821: (e, t, n)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            const r = n(574);
            class PriorityQueue {
                constructor(){
                    this._queue = [];
                }
                enqueue(e, t) {
                    t = Object.assign({
                        priority: 0
                    }, t);
                    const n = {
                        priority: t.priority,
                        run: e
                    };
                    if (this.size && this._queue[this.size - 1].priority >= t.priority) {
                        this._queue.push(n);
                        return;
                    }
                    const i = r.default(this._queue, n, (e, t)=>t.priority - e.priority);
                    this._queue.splice(i, 0, n);
                }
                dequeue() {
                    const e = this._queue.shift();
                    return e === null || e === void 0 ? void 0 : e.run;
                }
                filter(e) {
                    return this._queue.filter((t)=>t.priority === e.priority).map((e)=>e.run);
                }
                get size() {
                    return this._queue.length;
                }
            }
            t["default"] = PriorityQueue;
        },
        816: (e, t, n)=>{
            const r = n(213);
            class TimeoutError extends Error {
                constructor(e){
                    super(e);
                    this.name = "TimeoutError";
                }
            }
            const pTimeout = (e, t, n)=>new Promise((i, s)=>{
                    if (typeof t !== "number" || t < 0) {
                        throw new TypeError("Expected `milliseconds` to be a positive number");
                    }
                    if (t === Infinity) {
                        i(e);
                        return;
                    }
                    const o = setTimeout(()=>{
                        if (typeof n === "function") {
                            try {
                                i(n());
                            } catch (e) {
                                s(e);
                            }
                            return;
                        }
                        const r = typeof n === "string" ? n : `Promise timed out after ${t} milliseconds`;
                        const o = n instanceof Error ? n : new TimeoutError(r);
                        if (typeof e.cancel === "function") {
                            e.cancel();
                        }
                        s(o);
                    }, t);
                    r(e.then(i, s), ()=>{
                        clearTimeout(o);
                    });
                });
            e.exports = pTimeout;
            e.exports["default"] = pTimeout;
            e.exports.TimeoutError = TimeoutError;
        }
    };
    var t = {};
    function __nccwpck_require__(n) {
        var r = t[n];
        if (r !== undefined) {
            return r.exports;
        }
        var i = t[n] = {
            exports: {}
        };
        var s = true;
        try {
            e[n](i, i.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete t[n];
        }
        return i.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var n = {};
    (()=>{
        var e = n;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        const t = __nccwpck_require__(993);
        const r = __nccwpck_require__(816);
        const i = __nccwpck_require__(821);
        const empty = ()=>{};
        const s = new r.TimeoutError;
        class PQueue extends t {
            constructor(e){
                var t, n, r, s;
                super();
                this._intervalCount = 0;
                this._intervalEnd = 0;
                this._pendingCount = 0;
                this._resolveEmpty = empty;
                this._resolveIdle = empty;
                e = Object.assign({
                    carryoverConcurrencyCount: false,
                    intervalCap: Infinity,
                    interval: 0,
                    concurrency: Infinity,
                    autoStart: true,
                    queueClass: i.default
                }, e);
                if (!(typeof e.intervalCap === "number" && e.intervalCap >= 1)) {
                    throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(n = (t = e.intervalCap) === null || t === void 0 ? void 0 : t.toString()) !== null && n !== void 0 ? n : ""}\` (${typeof e.intervalCap})`);
                }
                if (e.interval === undefined || !(Number.isFinite(e.interval) && e.interval >= 0)) {
                    throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(s = (r = e.interval) === null || r === void 0 ? void 0 : r.toString()) !== null && s !== void 0 ? s : ""}\` (${typeof e.interval})`);
                }
                this._carryoverConcurrencyCount = e.carryoverConcurrencyCount;
                this._isIntervalIgnored = e.intervalCap === Infinity || e.interval === 0;
                this._intervalCap = e.intervalCap;
                this._interval = e.interval;
                this._queue = new e.queueClass;
                this._queueClass = e.queueClass;
                this.concurrency = e.concurrency;
                this._timeout = e.timeout;
                this._throwOnTimeout = e.throwOnTimeout === true;
                this._isPaused = e.autoStart === false;
            }
            get _doesIntervalAllowAnother() {
                return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
                return this._pendingCount < this._concurrency;
            }
            _next() {
                this._pendingCount--;
                this._tryToStartAnother();
                this.emit("next");
            }
            _resolvePromises() {
                this._resolveEmpty();
                this._resolveEmpty = empty;
                if (this._pendingCount === 0) {
                    this._resolveIdle();
                    this._resolveIdle = empty;
                    this.emit("idle");
                }
            }
            _onResumeInterval() {
                this._onInterval();
                this._initializeIntervalIfNeeded();
                this._timeoutId = undefined;
            }
            _isIntervalPaused() {
                const e = Date.now();
                if (this._intervalId === undefined) {
                    const t = this._intervalEnd - e;
                    if (t < 0) {
                        this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                    } else {
                        if (this._timeoutId === undefined) {
                            this._timeoutId = setTimeout(()=>{
                                this._onResumeInterval();
                            }, t);
                        }
                        return true;
                    }
                }
                return false;
            }
            _tryToStartAnother() {
                if (this._queue.size === 0) {
                    if (this._intervalId) {
                        clearInterval(this._intervalId);
                    }
                    this._intervalId = undefined;
                    this._resolvePromises();
                    return false;
                }
                if (!this._isPaused) {
                    const e = !this._isIntervalPaused();
                    if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                        const t = this._queue.dequeue();
                        if (!t) {
                            return false;
                        }
                        this.emit("active");
                        t();
                        if (e) {
                            this._initializeIntervalIfNeeded();
                        }
                        return true;
                    }
                }
                return false;
            }
            _initializeIntervalIfNeeded() {
                if (this._isIntervalIgnored || this._intervalId !== undefined) {
                    return;
                }
                this._intervalId = setInterval(()=>{
                    this._onInterval();
                }, this._interval);
                this._intervalEnd = Date.now() + this._interval;
            }
            _onInterval() {
                if (this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId) {
                    clearInterval(this._intervalId);
                    this._intervalId = undefined;
                }
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
                this._processQueue();
            }
            _processQueue() {
                while(this._tryToStartAnother()){}
            }
            get concurrency() {
                return this._concurrency;
            }
            set concurrency(e) {
                if (!(typeof e === "number" && e >= 1)) {
                    throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`);
                }
                this._concurrency = e;
                this._processQueue();
            }
            async add(e, t = {}) {
                return new Promise((n, i)=>{
                    const run = async ()=>{
                        this._pendingCount++;
                        this._intervalCount++;
                        try {
                            const o = this._timeout === undefined && t.timeout === undefined ? e() : r.default(Promise.resolve(e()), t.timeout === undefined ? this._timeout : t.timeout, ()=>{
                                if (t.throwOnTimeout === undefined ? this._throwOnTimeout : t.throwOnTimeout) {
                                    i(s);
                                }
                                return undefined;
                            });
                            n(await o);
                        } catch (e) {
                            i(e);
                        }
                        this._next();
                    };
                    this._queue.enqueue(run, t);
                    this._tryToStartAnother();
                    this.emit("add");
                });
            }
            async addAll(e, t) {
                return Promise.all(e.map(async (e)=>this.add(e, t)));
            }
            start() {
                if (!this._isPaused) {
                    return this;
                }
                this._isPaused = false;
                this._processQueue();
                return this;
            }
            pause() {
                this._isPaused = true;
            }
            clear() {
                this._queue = new this._queueClass;
            }
            async onEmpty() {
                if (this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveEmpty;
                    this._resolveEmpty = ()=>{
                        t();
                        e();
                    };
                });
            }
            async onIdle() {
                if (this._pendingCount === 0 && this._queue.size === 0) {
                    return;
                }
                return new Promise((e)=>{
                    const t = this._resolveIdle;
                    this._resolveIdle = ()=>{
                        t();
                        e();
                    };
                });
            }
            get size() {
                return this._queue.size;
            }
            sizeBy(e) {
                return this._queue.filter(e).length;
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
            set timeout(e) {
                this._timeout = e;
            }
        }
        e["default"] = PQueue;
    })();
    module.exports = n;
})();
}}),
"[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "InvariantError": (()=>InvariantError)
});
class InvariantError extends Error {
    constructor(message, options){
        super("Invariant: " + (message.endsWith('.') ? message : message + '.') + " This is a bug in Next.js.", options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/lru-cache.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LRUCache": (()=>LRUCache)
});
class LRUCache {
    constructor(maxSize, calculateSize){
        this.cache = new Map();
        this.sizes = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize || (()=>1);
    }
    set(key, value) {
        if (!key || !value) return;
        const size = this.calculateSize(value);
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return;
        }
        if (this.cache.has(key)) {
            this.totalSize -= this.sizes.get(key) || 0;
        }
        this.cache.set(key, value);
        this.sizes.set(key, size);
        this.totalSize += size;
        this.touch(key);
    }
    has(key) {
        if (!key) return false;
        this.touch(key);
        return Boolean(this.cache.get(key));
    }
    get(key) {
        if (!key) return;
        const value = this.cache.get(key);
        if (value === undefined) {
            return undefined;
        }
        this.touch(key);
        return value;
    }
    touch(key) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            this.cache.delete(key);
            this.cache.set(key, value);
            this.evictIfNecessary();
        }
    }
    evictIfNecessary() {
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            this.evictLeastRecentlyUsed();
        }
    }
    evictLeastRecentlyUsed() {
        const lruKey = this.cache.keys().next().value;
        if (lruKey !== undefined) {
            const lruSize = this.sizes.get(lruKey) || 0;
            this.totalSize -= lruSize;
            this.cache.delete(lruKey);
            this.sizes.delete(lruKey);
        }
    }
    reset() {
        this.cache.clear();
        this.sizes.clear();
        this.totalSize = 0;
    }
    keys() {
        return [
            ...this.cache.keys()
        ];
    }
    remove(key) {
        if (this.cache.has(key)) {
            this.totalSize -= this.sizes.get(key) || 0;
            this.cache.delete(key);
            this.sizes.delete(key);
        }
    }
    clear() {
        this.cache.clear();
        this.sizes.clear();
        this.totalSize = 0;
    }
    get size() {
        return this.cache.size;
    }
    get currentSize() {
        return this.totalSize;
    }
} //# sourceMappingURL=lru-cache.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/incremental-cache/tags-manifest.external.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// We share the tags manifest between the "use cache" handlers and the previous
// file-system cache.
__turbopack_context__.s({
    "isStale": (()=>isStale),
    "tagsManifest": (()=>tagsManifest)
});
const tagsManifest = new Map();
const isStale = (tags, timestamp)=>{
    for (const tag of tags){
        const revalidatedAt = tagsManifest.get(tag);
        if (typeof revalidatedAt === 'number' && revalidatedAt >= timestamp) {
            return true;
        }
    }
    return false;
}; //# sourceMappingURL=tags-manifest.external.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/cache-handlers/default.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * This is the default "use cache" handler it defaults to an in-memory store.
 * In-memory caches are fragile and should not use stale-while-revalidate
 * semantics on the caches because it's not worth warming up an entry that's
 * likely going to get evicted before we get to use it anyway. However, we also
 * don't want to reuse a stale entry for too long so stale entries should be
 * considered expired/missing in such cache handlers.
 */ __turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lru$2d$cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lru-cache.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/incremental-cache/tags-manifest.external.js [middleware-edge] (ecmascript)");
;
;
// LRU cache default to max 50 MB but in future track
const memoryCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lru$2d$cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LRUCache"](50 * 1024 * 1024, (entry)=>entry.size);
const pendingSets = new Map();
const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, 'DefaultCacheHandler:') : undefined;
const DefaultCacheHandler = {
    async get (cacheKey) {
        const pendingPromise = pendingSets.get(cacheKey);
        if (pendingPromise) {
            debug == null ? void 0 : debug('get', cacheKey, 'pending');
            await pendingPromise;
        }
        const privateEntry = memoryCache.get(cacheKey);
        if (!privateEntry) {
            debug == null ? void 0 : debug('get', cacheKey, 'not found');
            return undefined;
        }
        const entry = privateEntry.entry;
        if (performance.timeOrigin + performance.now() > entry.timestamp + entry.revalidate * 1000) {
            // In-memory caches should expire after revalidate time because it is
            // unlikely that a new entry will be able to be used before it is dropped
            // from the cache.
            debug == null ? void 0 : debug('get', cacheKey, 'expired');
            return undefined;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isStale"])(entry.tags, entry.timestamp)) {
            debug == null ? void 0 : debug('get', cacheKey, 'had stale tag');
            return undefined;
        }
        const [returnStream, newSaved] = entry.value.tee();
        entry.value = newSaved;
        debug == null ? void 0 : debug('get', cacheKey, 'found', {
            tags: entry.tags,
            timestamp: entry.timestamp,
            revalidate: entry.revalidate,
            expire: entry.expire
        });
        return {
            ...entry,
            value: returnStream
        };
    },
    async set (cacheKey, pendingEntry) {
        debug == null ? void 0 : debug('set', cacheKey, 'start');
        let resolvePending = ()=>{};
        const pendingPromise = new Promise((resolve)=>{
            resolvePending = resolve;
        });
        pendingSets.set(cacheKey, pendingPromise);
        const entry = await pendingEntry;
        let size = 0;
        try {
            const [value, clonedValue] = entry.value.tee();
            entry.value = value;
            const reader = clonedValue.getReader();
            for(let chunk; !(chunk = await reader.read()).done;){
                size += __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(chunk.value).byteLength;
            }
            memoryCache.set(cacheKey, {
                entry,
                isErrored: false,
                errorRetryCount: 0,
                size
            });
            debug == null ? void 0 : debug('set', cacheKey, 'done');
        } catch (err) {
            // TODO: store partial buffer with error after we retry 3 times
            debug == null ? void 0 : debug('set', cacheKey, 'failed', err);
        } finally{
            resolvePending();
            pendingSets.delete(cacheKey);
        }
    },
    async refreshTags () {
    // Nothing to do for an in-memory cache handler.
    },
    async getExpiration (...tags) {
        const expiration = Math.max(...tags.map((tag)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["tagsManifest"].get(tag) ?? 0));
        debug == null ? void 0 : debug('getExpiration', {
            tags,
            expiration
        });
        return expiration;
    },
    async expireTags (...tags) {
        const timestamp = Math.round(performance.timeOrigin + performance.now());
        debug == null ? void 0 : debug('expireTags', {
            tags,
            timestamp
        });
        for (const tag of tags){
            // TODO: update file-system-cache?
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$incremental$2d$cache$2f$tags$2d$manifest$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["tagsManifest"].set(tag, timestamp);
        }
    }
};
const __TURBOPACK__default__export__ = DefaultCacheHandler;
 //# sourceMappingURL=default.js.map
}}),
"[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCacheHandler": (()=>getCacheHandler),
    "getCacheHandlerEntries": (()=>getCacheHandlerEntries),
    "getCacheHandlers": (()=>getCacheHandlers),
    "initializeCacheHandlers": (()=>initializeCacheHandlers),
    "setCacheHandler": (()=>setCacheHandler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/cache-handlers/default.js [middleware-edge] (ecmascript)");
;
const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? (message, ...args)=>{
    console.log(`use-cache: ${message}`, ...args);
} : undefined;
const handlersSymbol = Symbol.for('@next/cache-handlers');
const handlersMapSymbol = Symbol.for('@next/cache-handlers-map');
const handlersSetSymbol = Symbol.for('@next/cache-handlers-set');
/**
 * The reference to the cache handlers. We store the cache handlers on the
 * global object so that we can access the same instance across different
 * boundaries (such as different copies of the same module).
 */ const reference = globalThis;
function initializeCacheHandlers() {
    // If the cache handlers have already been initialized, don't do it again.
    if (reference[handlersMapSymbol]) {
        debug == null ? void 0 : debug('cache handlers already initialized');
        return false;
    }
    debug == null ? void 0 : debug('initializing cache handlers');
    reference[handlersMapSymbol] = new Map();
    // Initialize the cache from the symbol contents first.
    if (reference[handlersSymbol]) {
        let fallback;
        if (reference[handlersSymbol].DefaultCache) {
            debug == null ? void 0 : debug('setting "default" cache handler from symbol');
            fallback = reference[handlersSymbol].DefaultCache;
        } else {
            debug == null ? void 0 : debug('setting "default" cache handler from default');
            fallback = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"];
        }
        reference[handlersMapSymbol].set('default', fallback);
        if (reference[handlersSymbol].RemoteCache) {
            debug == null ? void 0 : debug('setting "remote" cache handler from symbol');
            reference[handlersMapSymbol].set('remote', reference[handlersSymbol].RemoteCache);
        } else {
            debug == null ? void 0 : debug('setting "remote" cache handler from default');
            reference[handlersMapSymbol].set('remote', fallback);
        }
    } else {
        debug == null ? void 0 : debug('setting "default" cache handler from default');
        reference[handlersMapSymbol].set('default', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
        debug == null ? void 0 : debug('setting "remote" cache handler from default');
        reference[handlersMapSymbol].set('remote', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$cache$2d$handlers$2f$default$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]);
    }
    // Create a set of the cache handlers.
    reference[handlersSetSymbol] = new Set(reference[handlersMapSymbol].values());
    return true;
}
function getCacheHandler(kind) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    return reference[handlersMapSymbol].get(kind);
}
function getCacheHandlers() {
    if (!reference[handlersSetSymbol]) {
        return undefined;
    }
    return reference[handlersSetSymbol].values();
}
function getCacheHandlerEntries() {
    if (!reference[handlersMapSymbol]) {
        return undefined;
    }
    return reference[handlersMapSymbol].entries();
}
function setCacheHandler(kind, cacheHandler) {
    // This should never be called before initializeCacheHandlers.
    if (!reference[handlersMapSymbol] || !reference[handlersSetSymbol]) {
        throw Object.defineProperty(new Error('Cache handlers not initialized'), "__NEXT_ERROR_CODE", {
            value: "E649",
            enumerable: false,
            configurable: true
        });
    }
    debug == null ? void 0 : debug('setting cache handler for "%s"', kind);
    reference[handlersMapSymbol].set(kind, cacheHandler);
    reference[handlersSetSymbol].add(cacheHandler);
} //# sourceMappingURL=handlers.js.map
}}),
"[project]/node_modules/next/dist/esm/server/revalidation-utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "executeRevalidates": (()=>executeRevalidates),
    "withExecuteRevalidates": (()=>withExecuteRevalidates)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
;
async function withExecuteRevalidates(store, callback) {
    if (!store) {
        return callback();
    }
    // If we executed any revalidates during the request, then we don't want to execute them again.
    // save the state so we can check if anything changed after we're done running callbacks.
    const savedRevalidationState = cloneRevalidationState(store);
    try {
        return await callback();
    } finally{
        // Check if we have any new revalidates, and if so, wait until they are all resolved.
        const newRevalidates = diffRevalidationState(savedRevalidationState, cloneRevalidationState(store));
        await executeRevalidates(store, newRevalidates);
    }
}
function cloneRevalidationState(store) {
    return {
        pendingRevalidatedTags: store.pendingRevalidatedTags ? [
            ...store.pendingRevalidatedTags
        ] : [],
        pendingRevalidates: {
            ...store.pendingRevalidates
        },
        pendingRevalidateWrites: store.pendingRevalidateWrites ? [
            ...store.pendingRevalidateWrites
        ] : []
    };
}
function diffRevalidationState(prev, curr) {
    const prevTags = new Set(prev.pendingRevalidatedTags);
    const prevRevalidateWrites = new Set(prev.pendingRevalidateWrites);
    return {
        pendingRevalidatedTags: curr.pendingRevalidatedTags.filter((tag)=>!prevTags.has(tag)),
        pendingRevalidates: Object.fromEntries(Object.entries(curr.pendingRevalidates).filter(([key])=>!(key in prev.pendingRevalidates))),
        pendingRevalidateWrites: curr.pendingRevalidateWrites.filter((promise)=>!prevRevalidateWrites.has(promise))
    };
}
async function revalidateTags(tags, incrementalCache) {
    if (tags.length === 0) {
        return;
    }
    const promises = [];
    if (incrementalCache) {
        promises.push(incrementalCache.revalidateTag(tags));
    }
    const handlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlers"])();
    if (handlers) {
        for (const handler of handlers){
            promises.push(handler.expireTags(...tags));
        }
    }
    await Promise.all(promises);
}
async function executeRevalidates(workStore, state) {
    const pendingRevalidatedTags = (state == null ? void 0 : state.pendingRevalidatedTags) ?? workStore.pendingRevalidatedTags ?? [];
    const pendingRevalidates = (state == null ? void 0 : state.pendingRevalidates) ?? workStore.pendingRevalidates ?? {};
    const pendingRevalidateWrites = (state == null ? void 0 : state.pendingRevalidateWrites) ?? workStore.pendingRevalidateWrites ?? [];
    return Promise.all([
        revalidateTags(pendingRevalidatedTags, workStore.incrementalCache),
        ...Object.values(pendingRevalidates),
        ...pendingRevalidateWrites
    ]);
} //# sourceMappingURL=revalidation-utils.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "afterTaskAsyncStorageInstance": (()=>afterTaskAsyncStorageInstance)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
;
const afterTaskAsyncStorageInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])(); //# sourceMappingURL=after-task-async-storage-instance.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Share the instance module in the next-shared layer
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
;
;
 //# sourceMappingURL=after-task-async-storage.external.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "afterTaskAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["afterTaskAsyncStorageInstance"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript)");
}}),
"[project]/node_modules/next/dist/esm/server/after/after-context.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AfterContext": (()=>AfterContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/p-queue/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/is-thenable.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$revalidation$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/revalidation-utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>");
;
;
;
;
;
;
;
;
class AfterContext {
    constructor({ waitUntil, onClose, onTaskError }){
        this.workUnitStores = new Set();
        this.waitUntil = waitUntil;
        this.onClose = onClose;
        this.onTaskError = onTaskError;
        this.callbackQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$p$2d$queue$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]();
        this.callbackQueue.pause();
    }
    after(task) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$is$2d$thenable$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isThenable"])(task)) {
            if (!this.waitUntil) {
                errorWaitUntilNotAvailable();
            }
            this.waitUntil(task.catch((error)=>this.reportTaskError('promise', error)));
        } else if (typeof task === 'function') {
            // TODO(after): implement tracing
            this.addCallback(task);
        } else {
            throw Object.defineProperty(new Error('`after()`: Argument must be a promise or a function'), "__NEXT_ERROR_CODE", {
                value: "E50",
                enumerable: false,
                configurable: true
            });
        }
    }
    addCallback(callback) {
        // if something is wrong, throw synchronously, bubbling up to the `after` callsite.
        if (!this.waitUntil) {
            errorWaitUntilNotAvailable();
        }
        const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
        if (workUnitStore) {
            this.workUnitStores.add(workUnitStore);
        }
        const afterTaskStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].getStore();
        // This is used for checking if request APIs can be called inside `after`.
        // Note that we need to check the phase in which the *topmost* `after` was called (which should be "action"),
        // not the current phase (which might be "after" if we're in a nested after).
        // Otherwise, we might allow `after(() => headers())`, but not `after(() => after(() => headers()))`.
        const rootTaskSpawnPhase = afterTaskStore ? afterTaskStore.rootTaskSpawnPhase // nested after
         : workUnitStore == null ? void 0 : workUnitStore.phase // topmost after
        ;
        // this should only happen once.
        if (!this.runCallbacksOnClosePromise) {
            this.runCallbacksOnClosePromise = this.runCallbacksOnClose();
            this.waitUntil(this.runCallbacksOnClosePromise);
        }
        // Bind the callback to the current execution context (i.e. preserve all currently available ALS-es).
        // We do this because we want all of these to be equivalent in every regard except timing:
        //   after(() => x())
        //   after(x())
        //   await x()
        const wrappedCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["bindSnapshot"])(async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].run({
                    rootTaskSpawnPhase
                }, ()=>callback());
            } catch (error) {
                this.reportTaskError('function', error);
            }
        });
        this.callbackQueue.add(wrappedCallback);
    }
    async runCallbacksOnClose() {
        await new Promise((resolve)=>this.onClose(resolve));
        return this.runCallbacks();
    }
    async runCallbacks() {
        if (this.callbackQueue.size === 0) return;
        for (const workUnitStore of this.workUnitStores){
            workUnitStore.phase = 'after';
        }
        const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
        if (!workStore) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]('Missing workStore in AfterContext.runCallbacks'), "__NEXT_ERROR_CODE", {
                value: "E547",
                enumerable: false,
                configurable: true
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$revalidation$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["withExecuteRevalidates"])(workStore, ()=>{
            this.callbackQueue.start();
            return this.callbackQueue.onIdle();
        });
    }
    reportTaskError(taskKind, error) {
        // TODO(after): this is fine for now, but will need better intergration with our error reporting.
        // TODO(after): should we log this if we have a onTaskError callback?
        console.error(taskKind === 'promise' ? `A promise passed to \`after()\` rejected:` : `An error occurred in a function passed to \`after()\`:`, error);
        if (this.onTaskError) {
            // this is very defensive, but we really don't want anything to blow up in an error handler
            try {
                this.onTaskError == null ? void 0 : this.onTaskError.call(this, error);
            } catch (handlerError) {
                console.error(Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]('`onTaskError` threw while handling an error thrown from an `after` task', {
                    cause: handlerError
                }), "__NEXT_ERROR_CODE", {
                    value: "E569",
                    enumerable: false,
                    configurable: true
                }));
            }
        }
    }
}
function errorWaitUntilNotAvailable() {
    throw Object.defineProperty(new Error('`after()` will not work correctly, because `waitUntil` is not available in the current environment.'), "__NEXT_ERROR_CODE", {
        value: "E91",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=after-context.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Calls the given async function only when the returned promise-like object is
 * awaited. Afterwards, it provides the resolved value synchronously as `value`
 * property.
 */ __turbopack_context__.s({
    "createLazyResult": (()=>createLazyResult),
    "isResolvedLazyResult": (()=>isResolvedLazyResult)
});
function createLazyResult(fn) {
    let pendingResult;
    const result = {
        then (onfulfilled, onrejected) {
            if (!pendingResult) {
                pendingResult = fn();
            }
            pendingResult.then((value)=>{
                result.value = value;
            }).catch(()=>{
            // The externally awaited result will be rejected via `onrejected`. We
            // don't need to handle it here. But we do want to avoid an unhandled
            // rejection.
            });
            return pendingResult.then(onfulfilled, onrejected);
        }
    };
    return result;
}
function isResolvedLazyResult(result) {
    return result.hasOwnProperty('value');
} //# sourceMappingURL=lazy-result.js.map
}}),
"[project]/node_modules/next/dist/esm/server/async-storage/work-store.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createWorkStore": (()=>createWorkStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after-context.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
;
;
;
;
function createWorkStore({ page, fallbackRouteParams, renderOpts, requestEndedState, isPrefetchRequest, buildId, previouslyRevalidatedTags }) {
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
   *
   *    3.) If the request is in draft mode, we must generate dynamic HTML.
   *
   *    4.) If the request is a server action, we must generate dynamic HTML.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const isStaticGeneration = !renderOpts.shouldWaitOnAllReady && !renderOpts.supportsDynamicResponse && !renderOpts.isDraftMode && !renderOpts.isPossibleServerAction;
    const store = {
        isStaticGeneration,
        page,
        fallbackRouteParams,
        route: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeAppPath"])(page),
        incrementalCache: // so that it can access the fs cache without mocks
        renderOpts.incrementalCache || globalThis.__incrementalCache,
        cacheLifeProfiles: renderOpts.cacheLifeProfiles,
        isRevalidate: renderOpts.isRevalidate,
        isPrerendering: renderOpts.nextExport,
        fetchCache: renderOpts.fetchCache,
        isOnDemandRevalidate: renderOpts.isOnDemandRevalidate,
        isDraftMode: renderOpts.isDraftMode,
        requestEndedState,
        isPrefetchRequest,
        buildId,
        reactLoadableManifest: (renderOpts == null ? void 0 : renderOpts.reactLoadableManifest) || {},
        assetPrefix: (renderOpts == null ? void 0 : renderOpts.assetPrefix) || '',
        afterContext: createAfterContext(renderOpts),
        dynamicIOEnabled: renderOpts.experimental.dynamicIO,
        dev: renderOpts.dev ?? false,
        previouslyRevalidatedTags,
        refreshTagsByCacheKind: createRefreshTagsByCacheKind()
    };
    // TODO: remove this when we resolve accessing the store outside the execution context
    renderOpts.store = store;
    return store;
}
function createAfterContext(renderOpts) {
    const { waitUntil, onClose, onAfterTaskError } = renderOpts;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["AfterContext"]({
        waitUntil,
        onClose,
        onTaskError: onAfterTaskError
    });
}
/**
 * Creates a map with lazy results that refresh tags for the respective cache
 * kind when they're awaited for the first time.
 */ function createRefreshTagsByCacheKind() {
    const refreshTagsByCacheKind = new Map();
    const cacheHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlerEntries"])();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('refreshTags' in cacheHandler) {
                refreshTagsByCacheKind.set(kind, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLazyResult"])(async ()=>cacheHandler.refreshTags()));
            }
        }
    }
    return refreshTagsByCacheKind;
} //# sourceMappingURL=work-store.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/web-on-close.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** Monitor when the consumer finishes reading the response body.
that's as close as we can get to `res.on('close')` using web APIs.
*/ __turbopack_context__.s({
    "CloseController": (()=>CloseController),
    "trackBodyConsumed": (()=>trackBodyConsumed),
    "trackStreamConsumed": (()=>trackStreamConsumed)
});
function trackBodyConsumed(body, onEnd) {
    if (typeof body === 'string') {
        const generator = async function* generate() {
            const encoder = new TextEncoder();
            yield encoder.encode(body);
            onEnd();
        };
        // @ts-expect-error BodyInit typings doesn't seem to include AsyncIterables even though it's supported in practice
        return generator();
    } else {
        return trackStreamConsumed(body, onEnd);
    }
}
function trackStreamConsumed(stream, onEnd) {
    // NOTE: This function must handle `stream` being aborted or cancelled,
    // so it can't just be this:
    //
    //   return stream.pipeThrough(new TransformStream({ flush() { onEnd() } }))
    //
    // because that doesn't handle cancellations.
    // (and cancellation handling via `Transformer.cancel` is only available in node >20)
    const dest = new TransformStream();
    const runOnEnd = ()=>onEnd();
    stream.pipeTo(dest.writable).then(runOnEnd, runOnEnd);
    return dest.readable;
}
class CloseController {
    onClose(callback) {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot subscribe to a closed CloseController'), "__NEXT_ERROR_CODE", {
                value: "E365",
                enumerable: false,
                configurable: true
            });
        }
        this.target.addEventListener('close', callback);
        this.listeners++;
    }
    dispatchClose() {
        if (this.isClosed) {
            throw Object.defineProperty(new Error('Cannot close a CloseController multiple times'), "__NEXT_ERROR_CODE", {
                value: "E229",
                enumerable: false,
                configurable: true
            });
        }
        if (this.listeners > 0) {
            this.target.dispatchEvent(new Event('close'));
        }
        this.isClosed = true;
    }
    constructor(){
        this.target = new EventTarget();
        this.listeners = 0;
        this.isClosed = false;
    }
} //# sourceMappingURL=web-on-close.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/get-edge-preview-props.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * In edge runtime, these props directly accessed from environment variables.
 *   - local: env vars will be injected through edge-runtime as runtime env vars
 *   - deployment: env vars will be replaced by edge build pipeline
 */ __turbopack_context__.s({
    "getEdgePreviewProps": (()=>getEdgePreviewProps)
});
function getEdgePreviewProps() {
    return {
        previewModeId: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'development-id',
        previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || '',
        previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || ''
    };
} //# sourceMappingURL=get-edge-preview-props.js.map
}}),
"[project]/node_modules/next/dist/esm/server/after/builtin-request-context.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createLocalRequestContext": (()=>createLocalRequestContext),
    "getBuiltinRequestContext": (()=>getBuiltinRequestContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/async-local-storage.js [middleware-edge] (ecmascript)");
;
function getBuiltinRequestContext() {
    const _globalThis = globalThis;
    const ctx = _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
    return ctx == null ? void 0 : ctx.get();
}
const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for('@next/request-context');
function createLocalRequestContext() {
    const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$async$2d$local$2d$storage$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createAsyncLocalStorage"])();
    return {
        get: ()=>storage.getStore(),
        run: (value, callback)=>storage.run(value, callback)
    };
} //# sourceMappingURL=builtin-request-context.js.map
}}),
"[project]/node_modules/next/dist/esm/server/lib/implicit-tags.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getImplicitTags": (()=>getImplicitTags)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/use-cache/handlers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/lazy-result.js [middleware-edge] (ecmascript)");
;
;
;
const getDerivedTags = (pathname)=>{
    const derivedTags = [
        `/layout`
    ];
    // we automatically add the current path segments as tags
    // for revalidatePath handling
    if (pathname.startsWith('/')) {
        const pathnameParts = pathname.split('/');
        for(let i = 1; i < pathnameParts.length + 1; i++){
            let curPathname = pathnameParts.slice(0, i).join('/');
            if (curPathname) {
                // all derived tags other than the page are layout tags
                if (!curPathname.endsWith('/page') && !curPathname.endsWith('/route')) {
                    curPathname = `${curPathname}${!curPathname.endsWith('/') ? '/' : ''}layout`;
                }
                derivedTags.push(curPathname);
            }
        }
    }
    return derivedTags;
};
/**
 * Creates a map with lazy results that fetch the expiration value for the given
 * tags and respective cache kind when they're awaited for the first time.
 */ function createTagsExpirationsByCacheKind(tags) {
    const expirationsByCacheKind = new Map();
    const cacheHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$use$2d$cache$2f$handlers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getCacheHandlerEntries"])();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('getExpiration' in cacheHandler) {
                expirationsByCacheKind.set(kind, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$lazy$2d$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLazyResult"])(async ()=>cacheHandler.getExpiration(...tags)));
            }
        }
    }
    return expirationsByCacheKind;
}
async function getImplicitTags(page, url, fallbackRouteParams) {
    const tags = [];
    const hasFallbackRouteParams = fallbackRouteParams && fallbackRouteParams.size > 0;
    // Add the derived tags from the page.
    const derivedTags = getDerivedTags(page);
    for (let tag of derivedTags){
        tag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_CACHE_IMPLICIT_TAG_ID"]}${tag}`;
        tags.push(tag);
    }
    // Add the tags from the pathname. If the route has unknown params, we don't
    // want to add the pathname as a tag, as it will be invalid.
    if (url.pathname && !hasFallbackRouteParams) {
        const tag = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_CACHE_IMPLICIT_TAG_ID"]}${url.pathname}`;
        tags.push(tag);
    }
    return {
        tags,
        expirationsByCacheKind: createTagsExpirationsByCacheKind(tags)
    };
} //# sourceMappingURL=implicit-tags.js.map
}}),
"[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getTestReqInfo: null,
    withRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTestReqInfo: function() {
        return getTestReqInfo;
    },
    withRequest: function() {
        return withRequest;
    }
});
const _nodeasync_hooks = __turbopack_context__.r("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, 'next-test-proxy-port');
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, 'next-test-data') || '';
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
} //# sourceMappingURL=context.js.map
}}),
"[project]/node_modules/next/dist/experimental/testmode/fetch.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleFetch: null,
    interceptFetch: null,
    reader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    },
    reader: function() {
        return reader;
    }
});
const _context = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)");
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? '').split('\n');
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes('/next/dist/'));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace('webpack-internal:///(rsc)/', '').trim());
    return stack.join('    ');
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: 'fetch',
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    'next-test-stack',
                    getTestStack()
                ]
            ],
            body: body ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(await request.arrayBuffer()).toString('base64') : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(body, 'base64') : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        // Passthrough non-test requests.
        return originalFetch(request);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: 'POST',
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw Object.defineProperty(new Error(`Proxy request failed: ${resp.status}`), "__NEXT_ERROR_CODE", {
            value: "E146",
            enumerable: false,
            configurable: true
        });
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case 'continue':
            return originalFetch(request);
        case 'abort':
        case 'unhandled':
            throw Object.defineProperty(new Error(`Proxy request aborted [${request.method} ${request.url}]`), "__NEXT_ERROR_CODE", {
                value: "E145",
                enumerable: false,
                configurable: true
            });
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch(originalFetch) {
    global.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        global.fetch = originalFetch;
    };
} //# sourceMappingURL=fetch.js.map
}}),
"[project]/node_modules/next/dist/experimental/testmode/server-edge.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    interceptTestApis: null,
    wrapRequestHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/context.js [middleware-edge] (ecmascript)");
const _fetch = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/fetch.js [middleware-edge] (ecmascript)");
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(global.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
} //# sourceMappingURL=server-edge.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/adapter.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NextRequestHint": (()=>NextRequestHint),
    "adapter": (()=>adapter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/next-url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/internal-utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/app-router-headers.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$request$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/request-store.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$work$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/async-storage/work-store.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/tracer.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/trace/constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/web-on-close.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/get-edge-preview-props.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$builtin$2d$request$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/builtin-request-context.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$implicit$2d$tags$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/lib/implicit-tags.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class NextRequestHint extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextRequest"] {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    respondWith() {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    waitUntil() {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PageSignatureError"]({
            page: this.sourcePage
        }), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === 'true') {
            const { interceptTestApis, wrapRequestHandler } = __turbopack_context__.r("[project]/node_modules/next/dist/experimental/testmode/server-edge.js [middleware-edge] (ecmascript)");
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    var _getBuiltinRequestContext;
    ensureTestApisIntercepted();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ensureInstrumentationRegistered"])();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof globalThis.__BUILD_MANIFEST !== 'undefined';
    params.request.url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$app$2d$paths$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeRscURL"])(params.request.url);
    const requestURL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestURL.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestURL.searchParams.getAll(key);
        const normalizedKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["normalizeNextQueryParam"])(key);
        if (normalizedKey) {
            requestURL.searchParams.delete(normalizedKey);
            for (const val of value){
                requestURL.searchParams.append(normalizedKey, val);
            }
            requestURL.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestURL.buildId;
    requestURL.buildId = '';
    const requestHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["fromNodeOutgoingHttpHeaders"])(params.request.headers);
    const isNextDataRequest = requestHeaders.has('x-nextjs-data');
    const isRSCRequest = requestHeaders.get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RSC_HEADER"]) === '1';
    if (isNextDataRequest && requestURL.pathname === '/index') {
        requestURL.pathname = '/';
    }
    const flightHeaders = new Map();
    // Headers should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const header of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FLIGHT_HEADERS"]){
            const key = header.toLowerCase();
            const value = requestHeaders.get(key);
            if (value !== null) {
                flightHeaders.set(key, value);
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeURL = process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? new URL(params.request.url) : requestURL;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$internal$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stripInternalSearchParams"])(normalizeURL).toString(),
        init: {
            body: params.request.body,
            headers: requestHeaders,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isNextDataRequest) {
        Object.defineProperty(request, '__isData', {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        ;
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: ("TURBOPACK compile-time value", "development") !== 'development',
            fetchCacheKeyPrefix: ("TURBOPACK compile-time value", ""),
            dev: ("TURBOPACK compile-time value", "development") === 'development',
            requestHeaders: params.request.headers,
            requestProtocol: 'https',
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgePreviewProps"])()
                };
            }
        });
    }
    // if we're in an edge runtime sandbox, we should use the waitUntil
    // that we receive from the enclosing NextServer
    const outerWaitUntil = params.request.waitUntil ?? ((_getBuiltinRequestContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$builtin$2d$request$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getBuiltinRequestContext"])()) == null ? void 0 : _getBuiltinRequestContext.waitUntil);
    const event = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextFetchEvent"]({
        request,
        page: params.page,
        context: outerWaitUntil ? {
            waitUntil: outerWaitUntil
        } : undefined
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === '/middleware' || params.page === '/src/middleware';
        if (isMiddleware) {
            // if we're in an edge function, we only get a subset of `nextConfig` (no `experimental`),
            // so we have to inject it via DefinePlugin.
            // in `next start` this will be passed normally (see `NextNodeServer.runMiddleware`).
            const waitUntil = event.waitUntil.bind(event);
            const closeController = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$web$2d$on$2d$close$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CloseController"]();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$tracer$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getTracer"])().trace(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$trace$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MiddlewareSpan"].execute, {
                spanName: `middleware ${request.method} ${request.nextUrl.pathname}`,
                attributes: {
                    'http.target': request.nextUrl.pathname,
                    'http.method': request.method
                }
            }, async ()=>{
                try {
                    var _params_request_nextConfig_experimental, _params_request_nextConfig, _params_request_nextConfig_experimental1, _params_request_nextConfig1;
                    const onUpdateCookies = (cookies)=>{
                        cookiesFromResponse = cookies;
                    };
                    const previewProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$get$2d$edge$2d$preview$2d$props$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgePreviewProps"])();
                    const page = '/' // Fake Work
                    ;
                    const fallbackRouteParams = null;
                    const implicitTags = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$lib$2f$implicit$2d$tags$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getImplicitTags"])(page, request.nextUrl, fallbackRouteParams);
                    const requestStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$request$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRequestStoreForAPI"])(request, request.nextUrl, implicitTags, onUpdateCookies, previewProps);
                    const workStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$async$2d$storage$2f$work$2d$store$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createWorkStore"])({
                        page,
                        fallbackRouteParams,
                        renderOpts: {
                            cacheLifeProfiles: (_params_request_nextConfig = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental = _params_request_nextConfig.experimental) == null ? void 0 : _params_request_nextConfig_experimental.cacheLife,
                            experimental: {
                                isRoutePPREnabled: false,
                                dynamicIO: false,
                                authInterrupts: !!((_params_request_nextConfig1 = params.request.nextConfig) == null ? void 0 : (_params_request_nextConfig_experimental1 = _params_request_nextConfig1.experimental) == null ? void 0 : _params_request_nextConfig_experimental1.authInterrupts)
                            },
                            supportsDynamicResponse: true,
                            waitUntil,
                            onClose: closeController.onClose.bind(closeController),
                            onAfterTaskError: undefined
                        },
                        requestEndedState: {
                            ended: false
                        },
                        isPrefetchRequest: request.headers.has(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_ROUTER_PREFETCH_HEADER"]),
                        buildId: buildId ?? '',
                        previouslyRevalidatedTags: []
                    });
                    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].run(workStore, ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].run(requestStore, params.handler, request, event));
                } finally{
                    // middleware cannot stream, so we can consider the response closed
                    // as soon as the handler returns.
                    // we can delay running it until a bit later --
                    // if it's needed, we'll have a `waitUntil` lock anyway.
                    setTimeout(()=>{
                        closeController.dispatchClose();
                    }, 0);
                }
            });
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw Object.defineProperty(new TypeError('Expected an instance of Response to be returned'), "__NEXT_ERROR_CODE", {
            value: "E567",
            enumerable: false,
            configurable: true
        });
    }
    if (response && cookiesFromResponse) {
        response.headers.set('set-cookie', cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get('x-middleware-rewrite');
    if (response && rewrite && (isRSCRequest || !isEdgeRendering)) {
        const destination = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE && !isEdgeRendering) {
            if (destination.host === request.nextUrl.host) {
                destination.buildId = buildId || destination.buildId;
                response.headers.set('x-middleware-rewrite', String(destination));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const { url: relativeDestination, isRelative } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseRelativeURL"])(destination.toString(), requestURL.toString());
        if (!isEdgeRendering && isNextDataRequest && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(("TURBOPACK compile-time value", false) && relativeDestination.match(/http(s)?:\/\//))) {
            response.headers.set('x-nextjs-rewrite', relativeDestination);
        }
        // If this is an RSC request, and the pathname or search has changed, and
        // this isn't an external rewrite, we need to set the rewritten pathname and
        // query headers.
        if (isRSCRequest && isRelative) {
            if (requestURL.pathname !== destination.pathname) {
                response.headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_REWRITTEN_PATH_HEADER"], destination.pathname);
            }
            if (requestURL.search !== destination.search) {
                response.headers.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NEXT_REWRITTEN_QUERY_HEADER"], destination.search.slice(1));
            }
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get('Location');
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$next$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextURL"](redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (!process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE) {
            if (redirectURL.host === requestURL.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set('Location', redirectURL.toString());
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isNextDataRequest) {
            response.headers.delete('Location');
            response.headers.set('x-nextjs-redirect', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$router$2f$utils$2f$relativize$2d$url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRelativeURL"])(redirectURL.toString(), requestURL.toString()));
        }
    }
    const finalResponse = response ? response : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get('x-middleware-override-headers');
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set('x-middleware-override-headers', middlewareOverrideHeaders + ',' + overwrittenHeaders.join(','));
        }
    }
    return {
        response: finalResponse,
        waitUntil: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$fetch$2d$event$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getWaitUntilPromiseFromEvent"])(event) ?? Promise.resolve(),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @deprecated ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead.
 * Migration with codemods: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#next-og-import
 */ __turbopack_context__.s({
    "ImageResponse": (()=>ImageResponse)
});
function ImageResponse() {
    throw Object.defineProperty(new Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead'), "__NEXT_ERROR_CODE", {
        value: "E183",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=image-response.js.map
}}),
"[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
(()=>{
    var i = {
        226: function(i, e) {
            (function(o, a) {
                "use strict";
                var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350;
                var T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", W = "Viera", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
                var extend = function(i, e) {
                    var o = {};
                    for(var a in i){
                        if (e[a] && e[a].length % 2 === 0) {
                            o[a] = e[a].concat(i[a]);
                        } else {
                            o[a] = i[a];
                        }
                    }
                    return o;
                }, enumerize = function(i) {
                    var e = {};
                    for(var o = 0; o < i.length; o++){
                        e[i[o].toUpperCase()] = i[o];
                    }
                    return e;
                }, has = function(i, e) {
                    return typeof i === l ? lowerize(e).indexOf(lowerize(i)) !== -1 : false;
                }, lowerize = function(i) {
                    return i.toLowerCase();
                }, majorize = function(i) {
                    return typeof i === l ? i.replace(/[^\d\.]/g, t).split(".")[0] : a;
                }, trim = function(i, e) {
                    if (typeof i === l) {
                        i = i.replace(/^\s\s*/, t);
                        return typeof e === b ? i : i.substring(0, q);
                    }
                };
                var rgxMapper = function(i, e) {
                    var o = 0, r, t, n, b, l, d;
                    while(o < e.length && !l){
                        var c = e[o], u = e[o + 1];
                        r = t = 0;
                        while(r < c.length && !l){
                            if (!c[r]) {
                                break;
                            }
                            l = c[r++].exec(i);
                            if (!!l) {
                                for(n = 0; n < u.length; n++){
                                    d = l[++t];
                                    b = u[n];
                                    if (typeof b === w && b.length > 0) {
                                        if (b.length === 2) {
                                            if (typeof b[1] == s) {
                                                this[b[0]] = b[1].call(this, d);
                                            } else {
                                                this[b[0]] = b[1];
                                            }
                                        } else if (b.length === 3) {
                                            if (typeof b[1] === s && !(b[1].exec && b[1].test)) {
                                                this[b[0]] = d ? b[1].call(this, d, b[2]) : a;
                                            } else {
                                                this[b[0]] = d ? d.replace(b[1], b[2]) : a;
                                            }
                                        } else if (b.length === 4) {
                                            this[b[0]] = d ? b[3].call(this, d.replace(b[1], b[2])) : a;
                                        }
                                    } else {
                                        this[b] = d ? d : a;
                                    }
                                }
                            }
                        }
                        o += 2;
                    }
                }, strMapper = function(i, e) {
                    for(var o in e){
                        if (typeof e[o] === w && e[o].length > 0) {
                            for(var r = 0; r < e[o].length; r++){
                                if (has(e[o][r], i)) {
                                    return o === n ? a : o;
                                }
                            }
                        } else if (has(e[o], i)) {
                            return o === n ? a : o;
                        }
                    }
                    return i;
                };
                var $ = {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }, X = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: [
                        "NT 5.1",
                        "NT 5.2"
                    ],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: [
                        "NT 6.4",
                        "NT 10.0"
                    ],
                    RT: "ARM"
                };
                var K = {
                    browser: [
                        [
                            /\b(?:crmo|crios)\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Chrome"
                            ]
                        ],
                        [
                            /edg(?:e|ios|a)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Edge"
                            ]
                        ],
                        [
                            /(opera mini)\/([-\w\.]+)/i,
                            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /opios[\/ ]+([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Mini"
                            ]
                        ],
                        [
                            /\bopr\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B
                            ]
                        ],
                        [
                            /(kindle)\/([\w\.]+)/i,
                            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                            /(?:ms|\()(ie) ([\w\.]+)/i,
                            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                            /(heytap|ovi)browser\/([\d\.]+)/i,
                            /(weibo)__([\d\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "UC" + A
                            ]
                        ],
                        [
                            /microm.+\bqbcore\/([\w\.]+)/i,
                            /\bqbcore\/([\w\.]+).+microm/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat(Win) Desktop"
                            ]
                        ],
                        [
                            /micromessenger\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "WeChat"
                            ]
                        ],
                        [
                            /konqueror\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Konqueror"
                            ]
                        ],
                        [
                            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
                        ],
                        [
                            f,
                            [
                                u,
                                "IE"
                            ]
                        ],
                        [
                            /ya(?:search)?browser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Yandex"
                            ]
                        ],
                        [
                            /(avast|avg)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 Secure " + A
                            ],
                            f
                        ],
                        [
                            /\bfocus\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Focus"
                            ]
                        ],
                        [
                            /\bopt\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Touch"
                            ]
                        ],
                        [
                            /coc_coc\w+\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Coc Coc"
                            ]
                        ],
                        [
                            /dolfin\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Dolphin"
                            ]
                        ],
                        [
                            /coast\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                B + " Coast"
                            ]
                        ],
                        [
                            /miuibrowser\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "MIUI " + A
                            ]
                        ],
                        [
                            /fxios\/([-\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O
                            ]
                        ],
                        [
                            /\bqihu|(qi?ho?o?|360)browser/i
                        ],
                        [
                            [
                                u,
                                "360 " + A
                            ]
                        ],
                        [
                            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /(.+)/,
                                "$1 " + A
                            ],
                            f
                        ],
                        [
                            /(comodo_dragon)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                /_/g,
                                " "
                            ],
                            f
                        ],
                        [
                            /(electron)\/([\w\.]+) safari/i,
                            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(metasr)[\/ ]?([\w\.]+)/i,
                            /(lbbrowser)/i,
                            /\[(linkedin)app\]/i
                        ],
                        [
                            u
                        ],
                        [
                            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
                        ],
                        [
                            [
                                u,
                                H
                            ],
                            f
                        ],
                        [
                            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                            /safari (line)\/([\w\.]+)/i,
                            /\b(line)\/([\w\.]+)\/iab/i,
                            /(chromium|instagram)[\/ ]([-\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\bgsa\/([\w\.]+) .*safari\//i
                        ],
                        [
                            f,
                            [
                                u,
                                "GSA"
                            ]
                        ],
                        [
                            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "TikTok"
                            ]
                        ],
                        [
                            /headlesschrome(?:\/([\w\.]+)| )/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + " Headless"
                            ]
                        ],
                        [
                            / wv\).+(chrome)\/([\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                C + " WebView"
                            ],
                            f
                        ],
                        [
                            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Android " + A
                            ]
                        ],
                        [
                            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Mobile Safari"
                            ]
                        ],
                        [
                            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                $
                            ]
                        ],
                        [
                            /(webkit|khtml)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(navigator|netscape\d?)\/([-\w\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Netscape"
                            ],
                            f
                        ],
                        [
                            /mobile vr; rv:([\w\.]+)\).+firefox/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " Reality"
                            ]
                        ],
                        [
                            /ekiohf.+(flow)\/([\w\.]+)/i,
                            /(swiftfox)/i,
                            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                            /(firefox)\/([\w\.]+)/i,
                            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                            /(links) \(([\w\.]+)/i,
                            /panasonic;(viera)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(cobalt)\/([\w\.]+)/i
                        ],
                        [
                            u,
                            [
                                f,
                                /master.|lts./,
                                ""
                            ]
                        ]
                    ],
                    cpu: [
                        [
                            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "amd64"
                            ]
                        ],
                        [
                            /(ia32(?=;))/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ],
                        [
                            /((?:i[346]|x)86)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "ia32"
                            ]
                        ],
                        [
                            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
                        ],
                        [
                            [
                                h,
                                "arm64"
                            ]
                        ],
                        [
                            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
                        ],
                        [
                            [
                                h,
                                "armhf"
                            ]
                        ],
                        [
                            /windows (ce|mobile); ppc;/i
                        ],
                        [
                            [
                                h,
                                "arm"
                            ]
                        ],
                        [
                            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
                        ],
                        [
                            [
                                h,
                                /ower/,
                                t,
                                lowerize
                            ]
                        ],
                        [
                            /(sun4\w)[;\)]/i
                        ],
                        [
                            [
                                h,
                                "sparc"
                            ]
                        ],
                        [
                            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                        ],
                        [
                            [
                                h,
                                lowerize
                            ]
                        ]
                    ],
                    device: [
                        [
                            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                            /samsung[- ]([-\w]+)/i,
                            /sec-(sgh\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\((ipad);[-\w\),; ]+apple/i,
                            /applecoremedia\/[\w\.]+ \((ipad)/i,
                            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(macintosh);/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ]
                        ],
                        [
                            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:huawei|honor)([-\w ]+)[;\)]/i,
                            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
                        ],
                        [
                            c,
                            [
                                m,
                                j
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(poco[\w ]+)(?: bui|\))/i,
                            /\b; (\w+) build\/hm\1/i,
                            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /; (\w+) bui.+ oppo/i,
                            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OPPO"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /vivo (\w+)(?: bui|\))/i,
                            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Vivo"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rmx[12]\d{3})(?: bui|;|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Realme"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                            /\bmot(?:orola)?[- ](\w*)/i,
                            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
                        ],
                        [
                            c,
                            [
                                m,
                                M
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                            /\blg-?([\d\w]+) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(ideatab[-\w ]+)/i,
                            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Lenovo"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(?:maemo|nokia).*(n900|lumia \d+)/i,
                            /nokia[-_ ]?([-\w\.]*)/i
                        ],
                        [
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                m,
                                "Nokia"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(pixel c)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /sony tablet [ps]/i,
                            /\b(?:sony)?sgp\w+(?: bui|\))/i
                        ],
                        [
                            [
                                c,
                                "Xperia Tablet"
                            ],
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (kb2005|in20[12]5|be20[12][59])\b/i,
                            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "OnePlus"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(alexa)webm/i,
                            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                            /(kf[a-z]+)( bui|\)).+silk\//i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
                        ],
                        [
                            [
                                c,
                                /(.+)/g,
                                "Fire Phone $1"
                            ],
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(playbook);[-\w\),; ]+(rim)/i
                        ],
                        [
                            c,
                            m,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((?:bb[a-f]|st[hv])100-\d)/i,
                            /\(bb10; (\w+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                N
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                z
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(nexus 9)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "HTC"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
                        ],
                        [
                            m,
                            [
                                c,
                                /_/g,
                                " "
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Acer"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (m[1-5] note) bui/i,
                            /\bmz-([-\w]{2,})/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Meizu"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                            /(hp) ([\w ]+\w)/i,
                            /(asus)-?(\w+)/i,
                            /(microsoft); (lumia[\w ]+)/i,
                            /(lenovo)[-_ ]?([-\w]+)/i,
                            /(jolla)/i,
                            /(oppo) ?([\w ]+) bui/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kobo)\s(ereader|touch)/i,
                            /(archos) (gamepad2?)/i,
                            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                            /(kindle)\/([\w\.]+)/i,
                            /(nook)[\w ]+build\/(\w+)/i,
                            /(dell) (strea[kpr\d ]*[\dko])/i,
                            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                            /(trinity)[- ]*(t\d{3}) bui/i,
                            /(gigaset)[- ]+(q\w{1,9}) bui/i,
                            /(vodafone) ([\w ]+)(?:\)| bui)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(surface duo)/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid [\d\.]+; (fp\du?)(?: b|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Fairphone"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(u304aa)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "AT&T"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\bsie-(\w*)/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Siemens"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(rct\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "RCA"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(venue[\d ]{2,7}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Dell"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(q(?:mv|ta)\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Verizon"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Barnes & Noble"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(tm\d{3}\w+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NuVision"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(k88) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(nx\d{3}j) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "ZTE"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(gen\d{3}) b.+49h/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(zur\d{3}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Swiss"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((zeki)?tb.*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Zeki"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b([yr]\d{2}) b/i,
                            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
                        ],
                        [
                            [
                                m,
                                "Dragon Touch"
                            ],
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(ns-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Insignia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((nxa|next)-?\w{0,9}) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "NextBook"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
                        ],
                        [
                            [
                                m,
                                "Voice"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(lvtel\-)?(v1[12]) b/i
                        ],
                        [
                            [
                                m,
                                "LvTel"
                            ],
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(ph-1) /i
                        ],
                        [
                            c,
                            [
                                m,
                                "Essential"
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /\b(v(100md|700na|7011|917g).*\b) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Envizen"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b(trio[-\w\. ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "MachSpeed"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\btu_(1491) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Rotor"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(shield[\w ]+) b/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(sprint) (\w+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(kin\.[onetw]{3})/i
                        ],
                        [
                            [
                                c,
                                /\./g,
                                " "
                            ],
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /smart-tv.+(samsung)/i
                        ],
                        [
                            m,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /hbbtv.+maple;(\d+)/i
                        ],
                        [
                            [
                                c,
                                /^/,
                                "SmartTV"
                            ],
                            [
                                m,
                                V
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
                        ],
                        [
                            [
                                m,
                                P
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(apple) ?tv/i
                        ],
                        [
                            m,
                            [
                                c,
                                S + " TV"
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /crkey/i
                        ],
                        [
                            [
                                c,
                                C + "cast"
                            ],
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /droid.+aft(\w)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\(dtv[\);].+(aquos)/i,
                            /(aquos-tv[\w ]+)\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                D
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(bravia[\w ]+)( bui|\))/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(mitv-\w{5}) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                F
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /Hbbtv.*(technisat) (.*);/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
                        ],
                        [
                            [
                                m,
                                trim
                            ],
                            [
                                c,
                                trim
                            ],
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
                        ],
                        [
                            [
                                p,
                                x
                            ]
                        ],
                        [
                            /(ouya)/i,
                            /(nintendo) ([wids3utch]+)/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /droid.+; (shield) bui/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Nvidia"
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /(playstation [345portablevi]+)/i
                        ],
                        [
                            c,
                            [
                                m,
                                I
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
                        ],
                        [
                            c,
                            [
                                m,
                                R
                            ],
                            [
                                p,
                                v
                            ]
                        ],
                        [
                            /((pebble))app/i
                        ],
                        [
                            m,
                            c,
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
                        ],
                        [
                            c,
                            [
                                m,
                                S
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (glass) \d/i
                        ],
                        [
                            c,
                            [
                                m,
                                U
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /droid.+; (wt63?0{2,3})\)/i
                        ],
                        [
                            c,
                            [
                                m,
                                G
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(quest( 2| pro)?)/i
                        ],
                        [
                            c,
                            [
                                m,
                                H
                            ],
                            [
                                p,
                                _
                            ]
                        ],
                        [
                            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
                        ],
                        [
                            m,
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /(aeobc)\b/i
                        ],
                        [
                            c,
                            [
                                m,
                                T
                            ],
                            [
                                p,
                                y
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
                        ],
                        [
                            c,
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
                        ],
                        [
                            [
                                p,
                                k
                            ]
                        ],
                        [
                            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
                        ],
                        [
                            [
                                p,
                                g
                            ]
                        ],
                        [
                            /(android[-\w\. ]{0,9});.+buil/i
                        ],
                        [
                            c,
                            [
                                m,
                                "Generic"
                            ]
                        ]
                    ],
                    engine: [
                        [
                            /windows.+ edge\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                E + "HTML"
                            ]
                        ],
                        [
                            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Blink"
                            ]
                        ],
                        [
                            /(presto)\/([\w\.]+)/i,
                            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                            /ekioh(flow)\/([\w\.]+)/i,
                            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                            /(icab)[\/ ]([23]\.[\d\.]+)/i,
                            /\b(libweb)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /rv\:([\w\.]{1,9})\b.+(gecko)/i
                        ],
                        [
                            f,
                            u
                        ]
                    ],
                    os: [
                        [
                            /microsoft (windows) (vista|xp)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(windows) nt 6\.2; (arm)/i,
                            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
                        ],
                        [
                            u,
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
                        ],
                        [
                            [
                                u,
                                "Windows"
                            ],
                            [
                                f,
                                strMapper,
                                X
                            ]
                        ],
                        [
                            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                            /ios;fbsv\/([\d\.]+)/i,
                            /cfnetwork\/.+darwin/i
                        ],
                        [
                            [
                                f,
                                /_/g,
                                "."
                            ],
                            [
                                u,
                                "iOS"
                            ]
                        ],
                        [
                            /(mac os x) ?([\w\. ]*)/i,
                            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
                        ],
                        [
                            [
                                u,
                                Z
                            ],
                            [
                                f,
                                /_/g,
                                "."
                            ]
                        ],
                        [
                            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
                        ],
                        [
                            f,
                            u
                        ],
                        [
                            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                            /(blackberry)\w*\/([\w\.]*)/i,
                            /(tizen|kaios)[\/ ]([\w\.]+)/i,
                            /\((series40);/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /\(bb(10);/i
                        ],
                        [
                            f,
                            [
                                u,
                                N
                            ]
                        ],
                        [
                            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "Symbian"
                            ]
                        ],
                        [
                            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                O + " OS"
                            ]
                        ],
                        [
                            /web0s;.+rt(tv)/i,
                            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "webOS"
                            ]
                        ],
                        [
                            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                "watchOS"
                            ]
                        ],
                        [
                            /crkey\/([\d\.]+)/i
                        ],
                        [
                            f,
                            [
                                u,
                                C + "cast"
                            ]
                        ],
                        [
                            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
                        ],
                        [
                            [
                                u,
                                L
                            ],
                            f
                        ],
                        [
                            /panasonic;(viera)/i,
                            /(netrange)mmh/i,
                            /(nettv)\/(\d+\.[\w\.]+)/i,
                            /(nintendo|playstation) ([wids345portablevuch]+)/i,
                            /(xbox); +xbox ([^\);]+)/i,
                            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                            /(mint)[\/\(\) ]?(\w*)/i,
                            /(mageia|vectorlinux)[; ]/i,
                            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                            /(hurd|linux) ?([\w\.]*)/i,
                            /(gnu) ?([\w\.]*)/i,
                            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                            /(haiku) (\w+)/i
                        ],
                        [
                            u,
                            f
                        ],
                        [
                            /(sunos) ?([\w\.\d]*)/i
                        ],
                        [
                            [
                                u,
                                "Solaris"
                            ],
                            f
                        ],
                        [
                            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                            /(unix) ?([\w\.]*)/i
                        ],
                        [
                            u,
                            f
                        ]
                    ]
                };
                var UAParser = function(i, e) {
                    if (typeof i === w) {
                        e = i;
                        i = a;
                    }
                    if (!(this instanceof UAParser)) {
                        return new UAParser(i, e).getResult();
                    }
                    var r = typeof o !== b && o.navigator ? o.navigator : a;
                    var n = i || (r && r.userAgent ? r.userAgent : t);
                    var v = r && r.userAgentData ? r.userAgentData : a;
                    var x = e ? extend(K, e) : K;
                    var _ = r && r.userAgent == n;
                    this.getBrowser = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.browser);
                        i[d] = majorize(i[f]);
                        if (_ && r && r.brave && typeof r.brave.isBrave == s) {
                            i[u] = "Brave";
                        }
                        return i;
                    };
                    this.getCPU = function() {
                        var i = {};
                        i[h] = a;
                        rgxMapper.call(i, n, x.cpu);
                        return i;
                    };
                    this.getDevice = function() {
                        var i = {};
                        i[m] = a;
                        i[c] = a;
                        i[p] = a;
                        rgxMapper.call(i, n, x.device);
                        if (_ && !i[p] && v && v.mobile) {
                            i[p] = g;
                        }
                        if (_ && i[c] == "Macintosh" && r && typeof r.standalone !== b && r.maxTouchPoints && r.maxTouchPoints > 2) {
                            i[c] = "iPad";
                            i[p] = k;
                        }
                        return i;
                    };
                    this.getEngine = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.engine);
                        return i;
                    };
                    this.getOS = function() {
                        var i = {};
                        i[u] = a;
                        i[f] = a;
                        rgxMapper.call(i, n, x.os);
                        if (_ && !i[u] && v && v.platform != "Unknown") {
                            i[u] = v.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
                        }
                        return i;
                    };
                    this.getResult = function() {
                        return {
                            ua: this.getUA(),
                            browser: this.getBrowser(),
                            engine: this.getEngine(),
                            os: this.getOS(),
                            device: this.getDevice(),
                            cpu: this.getCPU()
                        };
                    };
                    this.getUA = function() {
                        return n;
                    };
                    this.setUA = function(i) {
                        n = typeof i === l && i.length > q ? trim(i, q) : i;
                        return this;
                    };
                    this.setUA(n);
                    return this;
                };
                UAParser.VERSION = r;
                UAParser.BROWSER = enumerize([
                    u,
                    f,
                    d
                ]);
                UAParser.CPU = enumerize([
                    h
                ]);
                UAParser.DEVICE = enumerize([
                    c,
                    m,
                    p,
                    v,
                    g,
                    x,
                    k,
                    _,
                    y
                ]);
                UAParser.ENGINE = UAParser.OS = enumerize([
                    u,
                    f
                ]);
                if (typeof e !== b) {
                    if ("object" !== b && i.exports) {
                        e = i.exports = UAParser;
                    }
                    e.UAParser = UAParser;
                } else {
                    if (typeof define === s && define.amd) {
                        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
                            return UAParser;
                        }(__turbopack_context__.r, exports, module));
                    } else if (typeof o !== b) {
                        o.UAParser = UAParser;
                    }
                }
                var Q = typeof o !== b && (o.jQuery || o.Zepto);
                if (Q && !Q.ua) {
                    var Y = new UAParser;
                    Q.ua = Y.getResult();
                    Q.ua.get = function() {
                        return Y.getUA();
                    };
                    Q.ua.set = function(i) {
                        Y.setUA(i);
                        var e = Y.getResult();
                        for(var o in e){
                            Q.ua[o] = e[o];
                        }
                    };
                }
            })(("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : this);
        }
    };
    var e = {};
    function __nccwpck_require__(o) {
        var a = e[o];
        if (a !== undefined) {
            return a.exports;
        }
        var r = e[o] = {
            exports: {}
        };
        var t = true;
        try {
            i[o].call(r.exports, r, r.exports, __nccwpck_require__);
            t = false;
        } finally{
            if (t) delete e[o];
        }
        return r.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var o = __nccwpck_require__(226);
    module.exports = o;
})();
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "isBot": (()=>isBot),
    "userAgent": (()=>userAgent),
    "userAgentFromString": (()=>userAgentFromString)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js [middleware-edge] (ecmascript)");
;
function isBot(input) {
    return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
}
function userAgentFromString(input) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$ua$2d$parser$2d$js$2f$ua$2d$parser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(input),
        isBot: input === undefined ? false : isBot(input)
    };
}
function userAgent({ headers }) {
    return userAgentFromString(headers.get('user-agent') || undefined);
} //# sourceMappingURL=user-agent.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "URLPattern": (()=>GlobalURLPattern)
});
const GlobalURLPattern = typeof URLPattern === 'undefined' ? undefined : URLPattern;
;
 //# sourceMappingURL=url-pattern.js.map
}}),
"[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "after": (()=>after)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
;
function after(task) {
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
    if (!workStore) {
        // TODO(after): the linked docs page talks about *dynamic* APIs, which after soon won't be anymore
        throw Object.defineProperty(new Error('`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context'), "__NEXT_ERROR_CODE", {
            value: "E468",
            enumerable: false,
            configurable: true
        });
    }
    const { afterContext } = workStore;
    return afterContext.after(task);
} //# sourceMappingURL=after.js.map
}}),
"[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}}),
"[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$after$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/after.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(oldElement.type, newKey, void 0, void 0, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
        var escaperLookup = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
        });
    }
    function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function noop() {}
    function resolveThenable(thenable) {
        switch(thenable.status){
            case "fulfilled":
                return thenable.value;
            case "rejected":
                throw thenable.reason;
            default:
                switch("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                }, function(error) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                })), thenable.status){
                    case "fulfilled":
                        return thenable.value;
                    case "rejected":
                        throw thenable.reason;
                }
        }
        throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = !1;
        if (null === children) invokeCallback = !0;
        else switch(type){
            case "bigint":
            case "string":
            case "number":
                invokeCallback = !0;
                break;
            case "object":
                switch(children.$$typeof){
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = !0;
                        break;
                    case REACT_LAZY_TYPE:
                        return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                }
        }
        if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children)) for(var i = 0; i < children.length; i++)nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if (i = getIteratorFn(children), "function" === typeof i) for(i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;)nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if ("object" === type) {
            if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            array = String(children);
            throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
        }
        return invokeCallback;
    }
    function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
        });
        return result;
    }
    function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher;
    }
    function lazyInitializer(payload) {
        if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
            }, function(error) {
                if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
            });
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
        }
        if (1 === payload._status) return ctor = payload._result, void 0 === ctor && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ctor), "default" in ctor || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ctor), ctor.default;
        throw payload._result;
    }
    function createCacheRoot() {
        return new WeakMap();
    }
    function createCacheNode() {
        return {
            s: 0,
            v: void 0,
            o: null,
            p: null
        };
    }
    var ReactSharedInternals = {
        H: null,
        A: null,
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
    }, isArrayImpl = Array.isArray, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, createTask = console.createTask ? console.createTask : function() {
        return null;
    }, createFakeCallStack = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    }, specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = createFakeCallStack["react-stack-bottom-frame"].bind(createFakeCallStack, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
    exports.Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
                forEachFunc.apply(this, arguments);
            }, forEachContext);
        },
        count: function(children) {
            var n = 0;
            mapChildren(children, function() {
                n++;
            });
            return n;
        },
        toArray: function(children) {
            return mapChildren(children, function(child) {
                return child;
            }) || [];
        },
        only: function(children) {
            if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
            return children;
        }
    };
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.cache = function(fn) {
        return function() {
            var dispatcher = ReactSharedInternals.A;
            if (!dispatcher) return fn.apply(null, arguments);
            var fnMap = dispatcher.getCacheForType(createCacheRoot);
            dispatcher = fnMap.get(fn);
            void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
            fnMap = 0;
            for(var l = arguments.length; fnMap < l; fnMap++){
                var arg = arguments[fnMap];
                if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
                    var objectCache = dispatcher.o;
                    null === objectCache && (dispatcher.o = objectCache = new WeakMap());
                    dispatcher = objectCache.get(arg);
                    void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
                } else objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
            }
            if (1 === dispatcher.s) return dispatcher.v;
            if (2 === dispatcher.s) throw dispatcher.v;
            try {
                var result = fn.apply(null, arguments);
                fnMap = dispatcher;
                fnMap.s = 1;
                return fnMap.v = result;
            } catch (error) {
                throw result = dispatcher, result.s = 2, result.v = error, error;
            }
        };
    };
    exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
            var JSCompiler_inline_result;
            a: {
                if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
                    JSCompiler_inline_result = !1;
                    break a;
                }
                JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for(propName in config)!hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for(var i = 0; i < propName; i++)JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
        }
        props = ReactElement(element.type, key, void 0, void 0, owner, props, element._debugStack, element._debugTask);
        for(key = 2; key < arguments.length; key++)owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
        return props;
    };
    exports.createElement = function(type, config, children) {
        for(var i = 2; i < arguments.length; i++){
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
        }
        i = {};
        node = null;
        if (null != config) for(propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
            for(var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
        }
        if (type && type.defaultProps) for(propName in childrenLength = type.defaultProps, childrenLength)void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        node && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(type, node, void 0, void 0, getOwner(), i, propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
        var refObject = {
            current: null
        };
        Object.seal(refObject);
        return refObject;
    };
    exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
        var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render
        }, ownName;
        Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                render.name || render.displayName || (Object.defineProperty(render, "name", {
                    value: name
                }), render.displayName = name);
            }
        });
        return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
        return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: {
                _status: -1,
                _result: ctor
            },
            _init: lazyInitializer
        };
    };
    exports.memo = function(type, compare) {
        null == type && console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
        compare = {
            $$typeof: REACT_MEMO_TYPE,
            type: type,
            compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                type.name || type.displayName || (Object.defineProperty(type, "name", {
                    value: name
                }), type.displayName = name);
            }
        });
        return compare;
    };
    exports.use = function(usable) {
        return resolveDispatcher().use(usable);
    };
    exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useId = function() {
        return resolveDispatcher().useId();
    };
    exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
    };
    exports.version = "19.2.0-canary-3fbfb9ba-20250409";
}();
}}),
"[project]/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react.react-server.development.js [middleware-edge] (ecmascript)");
}
}}),
"[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DynamicServerError": (()=>DynamicServerError),
    "isDynamicServerError": (()=>isDynamicServerError)
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
} //# sourceMappingURL=hooks-server-context.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "StaticGenBailoutError": (()=>StaticGenBailoutError),
    "isStaticGenBailoutError": (()=>isStaticGenBailoutError)
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
} //# sourceMappingURL=static-generation-bailout.js.map
}}),
"[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "isHangingPromiseRejectionError": (()=>isHangingPromiseRejectionError),
    "makeHangingPromise": (()=>makeHangingPromise)
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {} //# sourceMappingURL=dynamic-rendering-utils.js.map
}}),
"[project]/node_modules/next/dist/esm/lib/metadata/metadata-constants.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "METADATA_BOUNDARY_NAME": (()=>METADATA_BOUNDARY_NAME),
    "OUTLET_BOUNDARY_NAME": (()=>OUTLET_BOUNDARY_NAME),
    "VIEWPORT_BOUNDARY_NAME": (()=>VIEWPORT_BOUNDARY_NAME)
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__'; //# sourceMappingURL=metadata-constants.js.map
}}),
"[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Schedules a function to be called on the next tick after the other promises
 * have been resolved.
 *
 * @param cb the function to schedule
 */ __turbopack_context__.s({
    "atLeastOneTask": (()=>atLeastOneTask),
    "scheduleImmediate": (()=>scheduleImmediate),
    "scheduleOnNextTick": (()=>scheduleOnNextTick),
    "waitAtLeastOneReactRenderTask": (()=>waitAtLeastOneReactRenderTask)
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setTimeout(cb, 0);
        } else {
            "TURBOPACK unreachable";
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        setTimeout(cb, 0);
    } else {
        "TURBOPACK unreachable";
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time truthy", 1) {
        return new Promise((r)=>setTimeout(r, 0));
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=scheduler.js.map
}}),
"[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ // Once postpone is in stable we should switch to importing the postpone export directly
__turbopack_context__.s({
    "Postpone": (()=>Postpone),
    "abortAndThrowOnSynchronousRequestDataAccess": (()=>abortAndThrowOnSynchronousRequestDataAccess),
    "abortOnSynchronousPlatformIOAccess": (()=>abortOnSynchronousPlatformIOAccess),
    "accessedDynamicData": (()=>accessedDynamicData),
    "annotateDynamicAccess": (()=>annotateDynamicAccess),
    "consumeDynamicAccess": (()=>consumeDynamicAccess),
    "createDynamicTrackingState": (()=>createDynamicTrackingState),
    "createDynamicValidationState": (()=>createDynamicValidationState),
    "createHangingInputAbortSignal": (()=>createHangingInputAbortSignal),
    "createPostponedAbortSignal": (()=>createPostponedAbortSignal),
    "formatDynamicAPIAccesses": (()=>formatDynamicAPIAccesses),
    "getFirstDynamicReason": (()=>getFirstDynamicReason),
    "isDynamicPostpone": (()=>isDynamicPostpone),
    "isPrerenderInterruptedError": (()=>isPrerenderInterruptedError),
    "markCurrentScopeAsDynamic": (()=>markCurrentScopeAsDynamic),
    "postponeWithTracking": (()=>postponeWithTracking),
    "throwIfDisallowedDynamic": (()=>throwIfDisallowedDynamic),
    "throwToInterruptStaticGeneration": (()=>throwToInterruptStaticGeneration),
    "trackAllowedDynamicAccess": (()=>trackAllowedDynamicAccess),
    "trackDynamicDataInDynamicRender": (()=>trackDynamicDataInDynamicRender),
    "trackFallbackParamAccessed": (()=>trackFallbackParamAccessed),
    "trackSynchronousPlatformIOAccessInDev": (()=>trackSynchronousPlatformIOAccessInDev),
    "trackSynchronousRequestDataAccessInDev": (()=>trackSynchronousRequestDataAccessInDev),
    "useDynamicRouteParams": (()=>useDynamicRouteParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/react.react-server.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/hooks-server-context.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/metadata/metadata-constants.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/lib/scheduler.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
const hasPostpone = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicExpression: undefined,
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspendedDynamic: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasSyncDynamicErrors: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        if (workUnitStore.type === 'prerender-ppr') {
            postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
        } else if (workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
            const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                value: "E550",
                enumerable: false,
                configurable: true
            });
            store.dynamicUsageDescription = expression;
            store.dynamicUsageStack = err.stack;
            throw err;
        } else if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore && workUnitStore.type === 'request') {
            workUnitStore.usedDynamic = true;
        }
    }
}
function trackFallbackParamAccessed(store, expression) {
    const prerenderStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
    if (!prerenderStore || prerenderStore.type !== 'prerender-ppr') return;
    postponeWithTracking(store.route, expression, prerenderStore.dynamicTracking);
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$hooks$2d$server$2d$context$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DynamicServerError"](`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(_store, workUnitStore) {
    if (workUnitStore) {
        if (workUnitStore.type === 'cache' || workUnitStore.type === 'unstable-cache') {
            // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
            // creates a cache boundary. This is subtly different from reading a dynamic data source which is
            // forbidden inside a cache scope.
            return;
        }
        if (workUnitStore.type === 'prerender' || workUnitStore.type === 'prerender-legacy') {
            workUnitStore.revalidate = 0;
        }
        if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.type === 'request') {
            workUnitStore.usedDynamic = true;
        }
    }
}
// Despite it's name we don't actually abort unless we have a controller to call abort on
// There are times when we let a prerender run long to discover caches where we want the semantics
// of tracking dynamic access without terminating the prerender early
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicExpression = expression;
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of prerender mode
    requestStore.prerenderPhase = false;
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicExpression = expression;
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
                if (prerenderStore.validating === true) {
                    // We always log Request Access in dev at the point of calling the function
                    // So we mark the dynamic validation as not requiring it to be printed
                    dynamicTracking.syncDynamicLogged = true;
                }
            }
        }
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
function Postpone({ reason, route }) {
    const prerenderStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createPostponedAbortSignal(reason) {
    assertPostpone();
    const controller = new AbortController();
    // We get our hands on a postpone instance by calling postpone and catching the throw
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].unstable_postpone(reason);
    } catch (x) {
        controller.abort(x);
    }
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    const controller = new AbortController();
    if (workUnitStore.cacheSignal) {
        // If we have a cacheSignal it means we're in a prospective render. If the input
        // we're waiting on is coming from another cache, we do want to wait for it so that
        // we can resolve this cache entry too.
        workUnitStore.cacheSignal.inputReady().then(()=>{
            controller.abort();
        });
    } else {
        // Otherwise we're in the final render and we should already have all our caches
        // filled. We might still be waiting on some microtasks so we wait one tick before
        // giving up. When we give up, we still want to render the content of this cache
        // as deeply as we can so that we can suspend as deeply as possible in the tree
        // or not at all if we don't end up waiting for the input.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$scheduler$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["scheduleOnNextTick"])(()=>controller.abort());
    }
    return controller.signal;
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
    if (workStore && workStore.isStaticGeneration && workStore.fallbackRouteParams && workStore.fallbackRouteParams.size > 0) {
        // There are fallback route params, we should track these as dynamic
        // accesses.
        const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
        if (workUnitStore) {
            // We're prerendering with dynamicIO or PPR or both
            if (workUnitStore.type === 'prerender') {
                // We are in a prerender with dynamicIO semantics
                // We are going to hang here and never resolve. This will cause the currently
                // rendering component to effectively be a dynamic hole
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$react$2e$react$2d$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(workUnitStore.renderSignal, expression));
            } else if (workUnitStore.type === 'prerender-ppr') {
                // We're prerendering with PPR
                postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                throwToInterruptStaticGeneration(expression, workStore, workUnitStore);
            }
        }
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
const hasMetadataRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["METADATA_BOUNDARY_NAME"]}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VIEWPORT_BOUNDARY_NAME"]}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$lib$2f$metadata$2f$metadata$2d$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["OUTLET_BOUNDARY_NAME"]}[\\n\\s]`);
function trackAllowedDynamicAccess(route, componentStack, dynamicValidation, serverDynamic, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        dynamicValidation.hasSuspendedDynamic = true;
        return;
    } else if (serverDynamic.syncDynamicErrorWithStack || clientDynamic.syncDynamicErrorWithStack) {
        dynamicValidation.hasSyncDynamicErrors = true;
        return;
    } else {
        const message = `Route "${route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`;
        const error = createErrorWithComponentStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
function createErrorWithComponentStack(message, componentStack) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = 'Error: ' + message + componentStack;
    return error;
}
function throwIfDisallowedDynamic(route, dynamicValidation, serverDynamic, clientDynamic) {
    let syncError;
    let syncExpression;
    let syncLogged;
    if (serverDynamic.syncDynamicErrorWithStack) {
        syncError = serverDynamic.syncDynamicErrorWithStack;
        syncExpression = serverDynamic.syncDynamicExpression;
        syncLogged = serverDynamic.syncDynamicLogged === true;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        syncError = clientDynamic.syncDynamicErrorWithStack;
        syncExpression = clientDynamic.syncDynamicExpression;
        syncLogged = clientDynamic.syncDynamicLogged === true;
    } else {
        syncError = null;
        syncExpression = undefined;
        syncLogged = false;
    }
    if (dynamicValidation.hasSyncDynamicErrors && syncError) {
        if (!syncLogged) {
            // In dev we already log errors about sync dynamic access. But during builds we need to ensure
            // the offending sync error is logged before we exit the build
            console.error(syncError);
        }
        // The actual error should have been logged when the sync access ocurred
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
    }
    const dynamicErrors = dynamicValidation.dynamicErrors;
    if (dynamicErrors.length) {
        for(let i = 0; i < dynamicErrors.length; i++){
            console.error(dynamicErrors[i]);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"]();
    }
    if (!dynamicValidation.hasSuspendedDynamic) {
        if (dynamicValidation.hasDynamicMetadata) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateMetadata\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E608",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E534",
                enumerable: false,
                configurable: true
            });
        } else if (dynamicValidation.hasDynamicViewport) {
            if (syncError) {
                console.error(syncError);
                throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateViewport\` that could not finish rendering before ${syncExpression} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
                    value: "E573",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route "${route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
                value: "E590",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=dynamic-rendering.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "isRequestAPICallableInsideAfter": (()=>isRequestAPICallableInsideAfter),
    "throwForSearchParamsAccessInUseCache": (()=>throwForSearchParamsAccessInUseCache),
    "throwWithStaticGenerationBailoutError": (()=>throwWithStaticGenerationBailoutError),
    "throwWithStaticGenerationBailoutErrorWithDynamicError": (()=>throwWithStaticGenerationBailoutErrorWithDynamicError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/after-task-async-storage-instance.js [middleware-edge] (ecmascript) <export afterTaskAsyncStorageInstance as afterTaskAsyncStorage>");
;
;
function throwWithStaticGenerationBailoutError(route, expression) {
    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E576",
        enumerable: false,
        configurable: true
    });
}
function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
    throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E543",
        enumerable: false,
        configurable: true
    });
}
function throwForSearchParamsAccessInUseCache(workStore) {
    const error = Object.defineProperty(new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
        value: "E634",
        enumerable: false,
        configurable: true
    });
    workStore.invalidUsageError ??= error;
    throw error;
}
function isRequestAPICallableInsideAfter() {
    const afterTaskStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$after$2d$task$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__afterTaskAsyncStorageInstance__as__afterTaskAsyncStorage$3e$__["afterTaskAsyncStorage"].getStore();
    return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === 'action';
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "connection": (()=>connection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/static-generation-bailout.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/utils.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
function connection() {
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isRequestAPICallableInsideAfter"])()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E186",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic we override all other logic and always just return an empty
            // headers object without tracking
            return Promise.resolve(undefined);
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                    value: "E111",
                    enumerable: false,
                    configurable: true
                });
            } else if (workUnitStore.type === 'unstable-cache') {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                    value: "E1",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$static$2d$generation$2d$bailout$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StaticGenBailoutError"](`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E562",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            if (workUnitStore.type === 'prerender') {
                // dynamicIO Prerender
                // We return a promise that never resolves to allow the prender to stall at this point
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(workUnitStore.renderSignal, '`connection()`');
            } else if (workUnitStore.type === 'prerender-ppr') {
                // PPR Prerender (no dynamicIO)
                // We use React's postpone API to interrupt rendering here to create a dynamic hole
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, 'connection', workUnitStore.dynamicTracking);
            } else if (workUnitStore.type === 'prerender-legacy') {
                // Legacy Prerender
                // We throw an error here to interrupt prerendering to mark the route as dynamic
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])('connection', workStore, workUnitStore);
            }
        }
        // We fall through to the dynamic context below but we still track dynamic access
        // because in dev we can still error for things like using headers inside a cache context
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["trackDynamicDataInDynamicRender"])(workStore, workUnitStore);
    }
    return Promise.resolve(undefined);
} //# sourceMappingURL=connection.js.map
}}),
"[project]/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
__turbopack_context__.s({
    "describeHasCheckingStringProperty": (()=>describeHasCheckingStringProperty),
    "describeStringPropertyAccess": (()=>describeStringPropertyAccess),
    "wellKnownProperties": (()=>wellKnownProperties)
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return "`" + target + "." + prop + "`";
    }
    return "`" + target + "[" + JSON.stringify(prop) + "]`";
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    // fallthrough
    'then',
    'catch',
    'finally',
    // React Promise extension
    // fallthrough
    'status',
    // React introspection
    'displayName',
    // Common tested properties
    // fallthrough
    'toJSON',
    '$$typeof',
    '__esModule'
]); //# sourceMappingURL=reflect-utils.js.map
}}),
"[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "unstable_rootParams": (()=>unstable_rootParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/invariant-error.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/dynamic-rendering.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-async-storage-instance.js [middleware-edge] (ecmascript) <export workAsyncStorageInstance as workAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2e$external$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage.external.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/app-render/work-unit-async-storage-instance.js [middleware-edge] (ecmascript) <export workUnitAsyncStorageInstance as workUnitAsyncStorage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/dynamic-rendering-utils.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/shared/lib/utils/reflect-utils.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
const CachedParams = new WeakMap();
async function unstable_rootParams() {
    const workStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workAsyncStorageInstance__as__workAsyncStorage$3e$__["workAsyncStorage"].getStore();
    if (!workStore) {
        throw Object.defineProperty(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$invariant$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InvariantError"]('Missing workStore in unstable_rootParams'), "__NEXT_ERROR_CODE", {
            value: "E615",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$work$2d$unit$2d$async$2d$storage$2d$instance$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__workUnitAsyncStorageInstance__as__workUnitAsyncStorage$3e$__["workUnitAsyncStorage"].getStore();
    if (!workUnitStore) {
        throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
            value: "E641",
            enumerable: false,
            configurable: true
        });
    }
    switch(workUnitStore.type){
        case 'unstable-cache':
        case 'cache':
            {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                    value: "E642",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
        default:
            return Promise.resolve(workUnitStore.rootParams);
    }
}
function createPrerenderRootParams(underlyingParams, workStore, prerenderStore) {
    const fallbackParams = workStore.fallbackRouteParams;
    if (fallbackParams) {
        let hasSomeFallbackParams = false;
        for(const key in underlyingParams){
            if (fallbackParams.has(key)) {
                hasSomeFallbackParams = true;
                break;
            }
        }
        if (hasSomeFallbackParams) {
            // params need to be treated as dynamic because we have at least one fallback param
            if (prerenderStore.type === 'prerender') {
                // We are in a dynamicIO (PPR or otherwise) prerender
                const cachedParams = CachedParams.get(underlyingParams);
                if (cachedParams) {
                    return cachedParams;
                }
                const promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$dynamic$2d$rendering$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["makeHangingPromise"])(prerenderStore.renderSignal, '`unstable_rootParams`');
                CachedParams.set(underlyingParams, promise);
                return promise;
            }
            // remaining cases are prerender-ppr and prerender-legacy
            // We aren't in a dynamicIO prerender but we do have fallback params at this
            // level so we need to make an erroring params object which will postpone
            // if you access the fallback params
            return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
        }
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return Promise.resolve(underlyingParams);
}
function makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["wellKnownProperties"].has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$shared$2f$lib$2f$utils$2f$reflect$2d$utils$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["describeStringPropertyAccess"])('unstable_rootParams', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when dynamicIO is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no dynamicIO)
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["postponeWithTracking"])(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$dynamic$2d$rendering$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["throwToInterruptStaticGeneration"])(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
            } else {
                ;
                promise[prop] = underlyingParams[prop];
            }
        }
    });
    return promise;
} //# sourceMappingURL=root-params.js.map
}}),
"[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Alias index file of next/server for edge runtime for tree-shaking purpose
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$connection$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$root$2d$params$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
;
}}),
"[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$image$2d$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/image-response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$request$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/request.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$user$2d$agent$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/user-agent.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$url$2d$pattern$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/url-pattern.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$after$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/after/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$connection$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/connection.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$root$2d$params$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/root-params.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>"); //# sourceMappingURL=server.js.map
;
}}),
"[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** Error thrown by the client. */ __turbopack_context__.s({
    "LibsqlError": (()=>LibsqlError)
});
class LibsqlError extends Error {
    /** Machine-readable error code. */ code;
    /** Raw numeric error code */ rawCode;
    constructor(message, code, rawCode, cause){
        if (code !== undefined) {
            message = `${code}: ${message}`;
        }
        super(message, {
            cause
        });
        this.code = code;
        this.rawCode = rawCode;
        this.name = "LibsqlError";
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// URI parser based on RFC 3986
// We can't use the standard `URL` object, because we want to support relative `file:` URLs like
// `file:relative/path/database.db`, which are not correct according to RFC 8089, which standardizes the
// `file` scheme.
__turbopack_context__.s({
    "encodeBaseUrl": (()=>encodeBaseUrl),
    "parseUri": (()=>parseUri)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
;
function parseUri(text) {
    const match = URI_RE.exec(text);
    if (match === null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("The URL is not in a valid format", "URL_INVALID");
    }
    const groups = match.groups;
    const scheme = groups["scheme"];
    const authority = groups["authority"] !== undefined ? parseAuthority(groups["authority"]) : undefined;
    const path = percentDecode(groups["path"]);
    const query = groups["query"] !== undefined ? parseQuery(groups["query"]) : undefined;
    const fragment = groups["fragment"] !== undefined ? percentDecode(groups["fragment"]) : undefined;
    return {
        scheme,
        authority,
        path,
        query,
        fragment
    };
}
const URI_RE = (()=>{
    const SCHEME = '(?<scheme>[A-Za-z][A-Za-z.+-]*)';
    const AUTHORITY = '(?<authority>[^/?#]*)';
    const PATH = '(?<path>[^?#]*)';
    const QUERY = '(?<query>[^#]*)';
    const FRAGMENT = '(?<fragment>.*)';
    return new RegExp(`^${SCHEME}:(//${AUTHORITY})?${PATH}(\\?${QUERY})?(#${FRAGMENT})?$`, "su");
})();
function parseAuthority(text) {
    const match = AUTHORITY_RE.exec(text);
    if (match === null) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("The authority part of the URL is not in a valid format", "URL_INVALID");
    }
    const groups = match.groups;
    const host = percentDecode(groups["host_br"] ?? groups["host"]);
    const port = groups["port"] ? parseInt(groups["port"], 10) : undefined;
    const userinfo = groups["username"] !== undefined ? {
        username: percentDecode(groups["username"]),
        password: groups["password"] !== undefined ? percentDecode(groups["password"]) : undefined
    } : undefined;
    return {
        host,
        port,
        userinfo
    };
}
const AUTHORITY_RE = (()=>{
    const USERINFO = '(?<username>[^:]*)(:(?<password>.*))?';
    const HOST = '((?<host>[^:\\[\\]]*)|(\\[(?<host_br>[^\\[\\]]*)\\]))';
    const PORT = '(?<port>[0-9]*)';
    return new RegExp(`^(${USERINFO}@)?${HOST}(:${PORT})?$`, "su");
})();
// Query string is parsed as application/x-www-form-urlencoded according to the Web URL standard:
// https://url.spec.whatwg.org/#urlencoded-parsing
function parseQuery(text) {
    const sequences = text.split("&");
    const pairs = [];
    for (const sequence of sequences){
        if (sequence === "") {
            continue;
        }
        let key;
        let value;
        const splitIdx = sequence.indexOf("=");
        if (splitIdx < 0) {
            key = sequence;
            value = "";
        } else {
            key = sequence.substring(0, splitIdx);
            value = sequence.substring(splitIdx + 1);
        }
        pairs.push({
            key: percentDecode(key.replaceAll("+", " ")),
            value: percentDecode(value.replaceAll("+", " "))
        });
    }
    return {
        pairs
    };
}
function percentDecode(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        if (e instanceof URIError) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`URL component has invalid percent encoding: ${e}`, "URL_INVALID", undefined, e);
        }
        throw e;
    }
}
function encodeBaseUrl(scheme, authority, path) {
    if (authority === undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`URL with scheme ${JSON.stringify(scheme + ":")} requires authority (the "//" part)`, "URL_INVALID");
    }
    const schemeText = `${scheme}:`;
    const hostText = encodeHost(authority.host);
    const portText = encodePort(authority.port);
    const userinfoText = encodeUserinfo(authority.userinfo);
    const authorityText = `//${userinfoText}${hostText}${portText}`;
    let pathText = path.split("/").map(encodeURIComponent).join("/");
    if (pathText !== "" && !pathText.startsWith("/")) {
        pathText = "/" + pathText;
    }
    return new URL(`${schemeText}${authorityText}${pathText}`);
}
function encodeHost(host) {
    return host.includes(":") ? `[${encodeURI(host)}]` : encodeURI(host);
}
function encodePort(port) {
    return port !== undefined ? `:${port}` : "";
}
function encodeUserinfo(userinfo) {
    if (userinfo === undefined) {
        return "";
    }
    const usernameText = encodeURIComponent(userinfo.username);
    const passwordText = userinfo.password !== undefined ? `:${encodeURIComponent(userinfo.password)}` : "";
    return `${usernameText}${passwordText}@`;
}
}}),
"[project]/node_modules/js-base64/base64.mjs [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */ __turbopack_context__.s({
    "Base64": (()=>gBase64),
    "VERSION": (()=>VERSION),
    "atob": (()=>_atob),
    "atobPolyfill": (()=>atobPolyfill),
    "btoa": (()=>_btoa),
    "btoaPolyfill": (()=>btoaPolyfill),
    "btou": (()=>btou),
    "decode": (()=>decode),
    "encode": (()=>encode),
    "encodeURI": (()=>encodeURI),
    "encodeURL": (()=>encodeURI),
    "extendBuiltins": (()=>extendBuiltins),
    "extendString": (()=>extendString),
    "extendUint8Array": (()=>extendUint8Array),
    "fromBase64": (()=>decode),
    "fromUint8Array": (()=>fromUint8Array),
    "isValid": (()=>isValid),
    "toBase64": (()=>encode),
    "toUint8Array": (()=>toUint8Array),
    "utob": (()=>utob),
    "version": (()=>version)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
const version = '3.7.7';
/**
 * @deprecated use lowercase `version`.
 */ const VERSION = version;
const _hasBuffer = typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"] === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = Array.prototype.slice.call(b64ch);
const b64tab = ((a)=>{
    let tab = {};
    a.forEach((c, i)=>tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function' ? Uint8Array.from.bind(Uint8Array) : (it)=>new Uint8Array(Array.prototype.slice.call(it, 0));
const _mkUriSafe = (src)=>src.replace(/=/g, '').replace(/[+\/]/g, (m0)=>m0 == '+' ? '-' : '_');
const _tidyB64 = (s)=>s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */ const btoaPolyfill = (bin)=>{
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for(let i = 0; i < bin.length;){
        if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError('invalid character found');
        u32 = c0 << 16 | c1 << 8 | c2;
        asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */ const _btoa = typeof btoa === 'function' ? (bin)=>btoa(bin) : _hasBuffer ? (bin)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(bin, 'binary').toString('base64') : btoaPolyfill;
const _fromUint8Array = _hasBuffer ? (u8a)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(u8a).toString('base64') : (u8a)=>{
    // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
    const maxargs = 0x1000;
    let strs = [];
    for(let i = 0, l = u8a.length; i < l; i += maxargs){
        strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }
    return _btoa(strs.join(''));
};
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */ const fromUint8Array = (u8a, urlsafe = false)=>urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c)=>{
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c : cc < 0x800 ? _fromCC(0xc0 | cc >>> 6) + _fromCC(0x80 | cc & 0x3f) : _fromCC(0xe0 | cc >>> 12 & 0x0f) + _fromCC(0x80 | cc >>> 6 & 0x3f) + _fromCC(0x80 | cc & 0x3f);
    } else {
        var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
        return _fromCC(0xf0 | cc >>> 18 & 0x07) + _fromCC(0x80 | cc >>> 12 & 0x3f) + _fromCC(0x80 | cc >>> 6 & 0x3f) + _fromCC(0x80 | cc & 0x3f);
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */ const utob = (u)=>u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer ? (s)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(s, 'utf8').toString('base64') : _TE ? (s)=>_fromUint8Array(_TE.encode(s)) : (s)=>_btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */ const encode = (src, urlsafe = false)=>urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */ const encodeURI = (src)=>encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc)=>{
    switch(cccc.length){
        case 4:
            var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3), offset = cp - 0x10000;
            return _fromCC((offset >>> 10) + 0xD800) + _fromCC((offset & 0x3FF) + 0xDC00);
        case 3:
            return _fromCC((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));
        default:
            return _fromCC((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */ const btou = (b)=>b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */ const atobPolyfill = (asc)=>{
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc)) throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for(let i = 0; i < asc.length;){
        u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */ const _atob = typeof atob === 'function' ? (asc)=>atob(_tidyB64(asc)) : _hasBuffer ? (asc)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(asc, 'base64').toString('binary') : atobPolyfill;
//
const _toUint8Array = _hasBuffer ? (a)=>_U8Afrom(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(a, 'base64')) : (a)=>_U8Afrom(_atob(a).split('').map((c)=>c.charCodeAt(0)));
/**
 * converts a Base64 string to a Uint8Array.
 */ const toUint8Array = (a)=>_toUint8Array(_unURI(a));
//
const _decode = _hasBuffer ? (a)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(a, 'base64').toString('utf8') : _TD ? (a)=>_TD.decode(_toUint8Array(a)) : (a)=>btou(_atob(a));
const _unURI = (a)=>_tidyB64(a.replace(/[-_]/g, (m0)=>m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */ const decode = (src)=>_decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */ const isValid = (src)=>{
    if (typeof src !== 'string') return false;
    const s = src.replace(/\s+/g, '').replace(/={0,2}$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v)=>{
    return {
        value: v,
        enumerable: false,
        writable: true,
        configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */ const extendString = function() {
    const _add = (name, body)=>Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function() {
        return decode(this);
    });
    _add('toBase64', function(urlsafe) {
        return encode(this, urlsafe);
    });
    _add('toBase64URI', function() {
        return encode(this, true);
    });
    _add('toBase64URL', function() {
        return encode(this, true);
    });
    _add('toUint8Array', function() {
        return toUint8Array(this);
    });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */ const extendUint8Array = function() {
    const _add = (name, body)=>Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function(urlsafe) {
        return fromUint8Array(this, urlsafe);
    });
    _add('toBase64URI', function() {
        return fromUint8Array(this, true);
    });
    _add('toBase64URL', function() {
        return fromUint8Array(this, true);
    });
};
/**
 * extend Builtin prototypes with relevant methods
 */ const extendBuiltins = ()=>{
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins
};
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ResultSetImpl": (()=>ResultSetImpl),
    "supportedUrlLink": (()=>supportedUrlLink),
    "transactionModeToBegin": (()=>transactionModeToBegin)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-base64/base64.mjs [middleware-edge] (ecmascript)");
;
const supportedUrlLink = "https://github.com/libsql/libsql-client-ts#supported-urls";
function transactionModeToBegin(mode) {
    if (mode === "write") {
        return "BEGIN IMMEDIATE";
    } else if (mode === "read") {
        return "BEGIN TRANSACTION READONLY";
    } else if (mode === "deferred") {
        return "BEGIN DEFERRED";
    } else {
        throw RangeError('Unknown transaction mode, supported values are "write", "read" and "deferred"');
    }
}
class ResultSetImpl {
    columns;
    columnTypes;
    rows;
    rowsAffected;
    lastInsertRowid;
    constructor(columns, columnTypes, rows, rowsAffected, lastInsertRowid){
        this.columns = columns;
        this.columnTypes = columnTypes;
        this.rows = rows;
        this.rowsAffected = rowsAffected;
        this.lastInsertRowid = lastInsertRowid;
    }
    toJSON() {
        return {
            "columns": this.columns,
            "columnTypes": this.columnTypes,
            "rows": this.rows.map(rowToJson),
            "rowsAffected": this.rowsAffected,
            "lastInsertRowid": this.lastInsertRowid !== undefined ? "" + this.lastInsertRowid : null
        };
    }
}
function rowToJson(row) {
    return Array.prototype.map.call(row, valueToJson);
}
function valueToJson(value) {
    if (typeof value === "bigint") {
        return "" + value;
    } else if (value instanceof ArrayBuffer) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Base64"].fromUint8Array(new Uint8Array(value));
    } else {
        return value;
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "expandConfig": (()=>expandConfig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
;
function expandConfig(config, preferHttp) {
    if (typeof config !== "object") {
        // produce a reasonable error message in the common case where users type
        // `createClient("libsql://...")` instead of `createClient({url: "libsql://..."})`
        throw new TypeError(`Expected client configuration as object, got ${typeof config}`);
    }
    const uri = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["parseUri"])(config.url);
    let tls = config.tls;
    let authToken = config.authToken;
    for (const { key, value } of uri.query?.pairs ?? []){
        if (key === "authToken") {
            authToken = value ? value : undefined;
        } else if (key === "tls") {
            if (value === "0") {
                tls = false;
            } else if (value === "1") {
                tls = true;
            } else {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`Unknown value for the "tls" query argument: ${JSON.stringify(value)}. ` + 'Supported values are "0" and "1"', "URL_INVALID");
            }
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`Unknown URL query parameter ${JSON.stringify(key)}`, "URL_PARAM_NOT_SUPPORTED");
        }
    }
    let syncUrl = config.syncUrl;
    const uriScheme = uri.scheme.toLowerCase();
    let scheme;
    if (uriScheme === "libsql") {
        if (tls === false) {
            if (uri.authority?.port === undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]('A "libsql:" URL with ?tls=0 must specify an explicit port', "URL_INVALID");
            }
            scheme = preferHttp ? "http" : "ws";
        } else {
            scheme = preferHttp ? "https" : "wss";
        }
    } else if (uriScheme === "http" || uriScheme === "ws") {
        scheme = uriScheme;
        tls ??= false;
    } else if (uriScheme === "https" || uriScheme === "wss" || uriScheme === "file") {
        scheme = uriScheme;
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]('The client supports only "libsql:", "wss:", "ws:", "https:", "http:" and "file:" URLs, ' + `got ${JSON.stringify(uri.scheme + ":")}. ` + `For more information, please read ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["supportedUrlLink"]}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (uri.fragment !== undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`URL fragments are not supported: ${JSON.stringify("#" + uri.fragment)}`, "URL_INVALID");
    }
    const intMode = "" + (config.intMode ?? "number");
    if (intMode !== "number" && intMode !== "bigint" && intMode !== "string") {
        throw new TypeError(`Invalid value for intMode, expected "number", "bigint" or "string", \
            got ${JSON.stringify(intMode)}`);
    }
    return {
        scheme,
        tls: tls ?? true,
        authority: uri.authority,
        path: uri.path,
        authToken,
        syncUrl,
        intMode,
        fetch: config.fetch
    };
}
}}),
"[project]/node_modules/@libsql/isomorphic-ws/web.mjs [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WebSocket": (()=>_WebSocket)
});
let _WebSocket;
if (typeof WebSocket !== "undefined") {
    _WebSocket = WebSocket;
} else if (typeof global !== "undefined") {
    _WebSocket = global.WebSocket;
} else if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else if (typeof self !== "undefined") {
    _WebSocket = self.WebSocket;
}
;
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/client.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** A client for the Hrana protocol (a "database connection pool"). */ __turbopack_context__.s({
    "Client": (()=>Client)
});
class Client {
    /** @private */ constructor(){
        this.intMode = "number";
    }
    /** Representation of integers returned from the database. See {@link IntMode}.
     *
     * This value is inherited by {@link Stream} objects created with {@link openStream}, but you can
     * override the integer mode for every stream by setting {@link Stream.intMode} on the stream.
     */ intMode;
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** Generic error produced by the Hrana client. */ __turbopack_context__.s({
    "ClientError": (()=>ClientError),
    "ClosedError": (()=>ClosedError),
    "HttpServerError": (()=>HttpServerError),
    "InternalError": (()=>InternalError),
    "LibsqlUrlParseError": (()=>LibsqlUrlParseError),
    "MisuseError": (()=>MisuseError),
    "ProtoError": (()=>ProtoError),
    "ProtocolVersionError": (()=>ProtocolVersionError),
    "ResponseError": (()=>ResponseError),
    "WebSocketError": (()=>WebSocketError),
    "WebSocketUnsupportedError": (()=>WebSocketUnsupportedError)
});
class ClientError extends Error {
    /** @private */ constructor(message){
        super(message);
        this.name = "ClientError";
    }
}
class ProtoError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "ProtoError";
    }
}
class ResponseError extends ClientError {
    code;
    /** @internal */ proto;
    /** @private */ constructor(message, protoError){
        super(message);
        this.name = "ResponseError";
        this.code = protoError.code;
        this.proto = protoError;
        this.stack = undefined;
    }
}
class ClosedError extends ClientError {
    /** @private */ constructor(message, cause){
        if (cause !== undefined) {
            super(`${message}: ${cause}`);
            this.cause = cause;
        } else {
            super(message);
        }
        this.name = "ClosedError";
    }
}
class WebSocketUnsupportedError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "WebSocketUnsupportedError";
    }
}
class WebSocketError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "WebSocketError";
    }
}
class HttpServerError extends ClientError {
    status;
    /** @private */ constructor(message, status){
        super(message);
        this.status = status;
        this.name = "HttpServerError";
    }
}
class LibsqlUrlParseError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "LibsqlUrlParseError";
    }
}
class ProtocolVersionError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "ProtocolVersionError";
    }
}
class InternalError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "InternalError";
    }
}
class MisuseError extends ClientError {
    /** @private */ constructor(message){
        super(message);
        this.name = "MisuseError";
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "array": (()=>array),
    "arrayObjectsMap": (()=>arrayObjectsMap),
    "boolean": (()=>boolean),
    "number": (()=>number),
    "object": (()=>object),
    "readJsonObject": (()=>readJsonObject),
    "string": (()=>string),
    "stringOpt": (()=>stringOpt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
;
function string(value) {
    if (typeof value === "string") {
        return value;
    }
    throw typeError(value, "string");
}
function stringOpt(value) {
    if (value === null || value === undefined) {
        return undefined;
    } else if (typeof value === "string") {
        return value;
    }
    throw typeError(value, "string or null");
}
function number(value) {
    if (typeof value === "number") {
        return value;
    }
    throw typeError(value, "number");
}
function boolean(value) {
    if (typeof value === "boolean") {
        return value;
    }
    throw typeError(value, "boolean");
}
function array(value) {
    if (Array.isArray(value)) {
        return value;
    }
    throw typeError(value, "array");
}
function object(value) {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    throw typeError(value, "object");
}
function arrayObjectsMap(value, fun) {
    return array(value).map((elemValue)=>fun(object(elemValue)));
}
function typeError(value, expected) {
    if (value === undefined) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"](`Expected ${expected}, but the property was missing`);
    }
    let received = typeof value;
    if (value === null) {
        received = "null";
    } else if (Array.isArray(value)) {
        received = "array";
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"](`Expected ${expected}, received ${received}`);
}
function readJsonObject(value, fun) {
    return fun(object(value));
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ObjectWriter": (()=>ObjectWriter),
    "writeJsonObject": (()=>writeJsonObject)
});
class ObjectWriter {
    #output;
    #isFirst;
    constructor(output){
        this.#output = output;
        this.#isFirst = false;
    }
    begin() {
        this.#output.push('{');
        this.#isFirst = true;
    }
    end() {
        this.#output.push('}');
        this.#isFirst = false;
    }
    #key(name) {
        if (this.#isFirst) {
            this.#output.push('"');
            this.#isFirst = false;
        } else {
            this.#output.push(',"');
        }
        this.#output.push(name);
        this.#output.push('":');
    }
    string(name, value) {
        this.#key(name);
        this.#output.push(JSON.stringify(value));
    }
    stringRaw(name, value) {
        this.#key(name);
        this.#output.push('"');
        this.#output.push(value);
        this.#output.push('"');
    }
    number(name, value) {
        this.#key(name);
        this.#output.push("" + value);
    }
    boolean(name, value) {
        this.#key(name);
        this.#output.push(value ? "true" : "false");
    }
    object(name, value, valueFun) {
        this.#key(name);
        this.begin();
        valueFun(this, value);
        this.end();
    }
    arrayObjects(name, values, valueFun) {
        this.#key(name);
        this.#output.push('[');
        for(let i = 0; i < values.length; ++i){
            if (i !== 0) {
                this.#output.push(',');
            }
            this.begin();
            valueFun(this, values[i]);
            this.end();
        }
        this.#output.push(']');
    }
}
function writeJsonObject(value, fun) {
    const output = [];
    const writer = new ObjectWriter(output);
    writer.begin();
    fun(writer, value);
    writer.end();
    return output.join("");
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FIXED_32": (()=>FIXED_32),
    "FIXED_64": (()=>FIXED_64),
    "GROUP_END": (()=>GROUP_END),
    "GROUP_START": (()=>GROUP_START),
    "LENGTH_DELIMITED": (()=>LENGTH_DELIMITED),
    "VARINT": (()=>VARINT)
});
const VARINT = 0;
const FIXED_64 = 1;
const LENGTH_DELIMITED = 2;
const GROUP_START = 3;
const GROUP_END = 4;
const FIXED_32 = 5;
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FieldReader": (()=>FieldReader),
    "readProtobufMessage": (()=>readProtobufMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js [middleware-edge] (ecmascript)");
;
;
class MessageReader {
    #array;
    #view;
    #pos;
    constructor(array){
        this.#array = array;
        this.#view = new DataView(array.buffer, array.byteOffset, array.byteLength);
        this.#pos = 0;
    }
    varint() {
        let value = 0;
        for(let shift = 0;; shift += 7){
            const byte = this.#array[this.#pos++];
            value |= (byte & 0x7f) << shift;
            if (!(byte & 0x80)) {
                break;
            }
        }
        return value;
    }
    varintBig() {
        let value = 0n;
        for(let shift = 0n;; shift += 7n){
            const byte = this.#array[this.#pos++];
            value |= BigInt(byte & 0x7f) << shift;
            if (!(byte & 0x80)) {
                break;
            }
        }
        return value;
    }
    bytes(length) {
        const array = new Uint8Array(this.#array.buffer, this.#array.byteOffset + this.#pos, length);
        this.#pos += length;
        return array;
    }
    double() {
        const value = this.#view.getFloat64(this.#pos, true);
        this.#pos += 8;
        return value;
    }
    skipVarint() {
        for(;;){
            const byte = this.#array[this.#pos++];
            if (!(byte & 0x80)) {
                break;
            }
        }
    }
    skip(count) {
        this.#pos += count;
    }
    eof() {
        return this.#pos >= this.#array.byteLength;
    }
}
class FieldReader {
    #reader;
    #wireType;
    constructor(reader){
        this.#reader = reader;
        this.#wireType = -1;
    }
    setup(wireType) {
        this.#wireType = wireType;
    }
    #expect(expectedWireType) {
        if (this.#wireType !== expectedWireType) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"](`Expected wire type ${expectedWireType}, got ${this.#wireType}`);
        }
        this.#wireType = -1;
    }
    bytes() {
        this.#expect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LENGTH_DELIMITED"]);
        const length = this.#reader.varint();
        return this.#reader.bytes(length);
    }
    string() {
        return new TextDecoder().decode(this.bytes());
    }
    message(def) {
        return readProtobufMessage(this.bytes(), def);
    }
    int32() {
        this.#expect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VARINT"]);
        return this.#reader.varint();
    }
    uint32() {
        return this.int32();
    }
    bool() {
        return this.int32() !== 0;
    }
    uint64() {
        this.#expect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VARINT"]);
        return this.#reader.varintBig();
    }
    sint64() {
        const value = this.uint64();
        return value >> 1n ^ -(value & 1n);
    }
    double() {
        this.#expect(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FIXED_64"]);
        return this.#reader.double();
    }
    maybeSkip() {
        if (this.#wireType < 0) {
            return;
        } else if (this.#wireType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VARINT"]) {
            this.#reader.skipVarint();
        } else if (this.#wireType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FIXED_64"]) {
            this.#reader.skip(8);
        } else if (this.#wireType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LENGTH_DELIMITED"]) {
            const length = this.#reader.varint();
            this.#reader.skip(length);
        } else if (this.#wireType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FIXED_32"]) {
            this.#reader.skip(4);
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"](`Unexpected wire type ${this.#wireType}`);
        }
        this.#wireType = -1;
    }
}
function readProtobufMessage(data, def) {
    const msgReader = new MessageReader(data);
    const fieldReader = new FieldReader(msgReader);
    let value = def.default();
    while(!msgReader.eof()){
        const key = msgReader.varint();
        const tag = key >> 3;
        const wireType = key & 0x7;
        fieldReader.setup(wireType);
        const tagFun = def[tag];
        if (tagFun !== undefined) {
            const returnedValue = tagFun(fieldReader, value);
            if (returnedValue !== undefined) {
                value = returnedValue;
            }
        }
        fieldReader.maybeSkip();
    }
    return value;
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MessageWriter": (()=>MessageWriter),
    "writeProtobufMessage": (()=>writeProtobufMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js [middleware-edge] (ecmascript)");
;
class MessageWriter {
    #buf;
    #array;
    #view;
    #pos;
    constructor(){
        this.#buf = new ArrayBuffer(256);
        this.#array = new Uint8Array(this.#buf);
        this.#view = new DataView(this.#buf);
        this.#pos = 0;
    }
    #ensure(extra) {
        if (this.#pos + extra <= this.#buf.byteLength) {
            return;
        }
        let newCap = this.#buf.byteLength;
        while(newCap < this.#pos + extra){
            newCap *= 2;
        }
        const newBuf = new ArrayBuffer(newCap);
        const newArray = new Uint8Array(newBuf);
        const newView = new DataView(newBuf);
        newArray.set(new Uint8Array(this.#buf, 0, this.#pos));
        this.#buf = newBuf;
        this.#array = newArray;
        this.#view = newView;
    }
    #varint(value) {
        this.#ensure(5);
        value = 0 | value;
        do {
            let byte = value & 0x7f;
            value >>>= 7;
            byte |= value ? 0x80 : 0;
            this.#array[this.#pos++] = byte;
        }while (value)
    }
    #varintBig(value) {
        this.#ensure(10);
        value = value & 0xffffffffffffffffn;
        do {
            let byte = Number(value & 0x7fn);
            value >>= 7n;
            byte |= value ? 0x80 : 0;
            this.#array[this.#pos++] = byte;
        }while (value)
    }
    #tag(tag, wireType) {
        this.#varint(tag << 3 | wireType);
    }
    bytes(tag, value) {
        this.#tag(tag, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LENGTH_DELIMITED"]);
        this.#varint(value.byteLength);
        this.#ensure(value.byteLength);
        this.#array.set(value, this.#pos);
        this.#pos += value.byteLength;
    }
    string(tag, value) {
        this.bytes(tag, new TextEncoder().encode(value));
    }
    message(tag, value, fun) {
        const writer = new MessageWriter();
        fun(writer, value);
        this.bytes(tag, writer.data());
    }
    int32(tag, value) {
        this.#tag(tag, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VARINT"]);
        this.#varint(value);
    }
    uint32(tag, value) {
        this.int32(tag, value);
    }
    bool(tag, value) {
        this.int32(tag, value ? 1 : 0);
    }
    sint64(tag, value) {
        this.#tag(tag, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["VARINT"]);
        this.#varintBig(value << 1n ^ value >> 63n);
    }
    double(tag, value) {
        this.#tag(tag, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["FIXED_64"]);
        this.#ensure(8);
        this.#view.setFloat64(this.#pos, value, true);
        this.#pos += 8;
    }
    data() {
        return new Uint8Array(this.#buf, 0, this.#pos);
    }
}
function writeProtobufMessage(value, fun) {
    const w = new MessageWriter();
    fun(w, value);
    return w.data();
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/index.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js [middleware-edge] (ecmascript)");
;
;
;
;
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/index.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/index.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/id_alloc.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "IdAlloc": (()=>IdAlloc)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
;
class IdAlloc {
    // Set of all allocated ids
    #usedIds;
    // Set of all free ids lower than `#usedIds.size`
    #freeIds;
    constructor(){
        this.#usedIds = new Set();
        this.#freeIds = new Set();
    }
    // Returns an id that was free, and marks it as used.
    alloc() {
        // this "loop" is just a way to pick an arbitrary element from the `#freeIds` set
        for (const freeId of this.#freeIds){
            this.#freeIds.delete(freeId);
            this.#usedIds.add(freeId);
            // maintain the invariant of `#freeIds`
            if (!this.#usedIds.has(this.#usedIds.size - 1)) {
                this.#freeIds.add(this.#usedIds.size - 1);
            }
            return freeId;
        }
        // the `#freeIds` set is empty, so there are no free ids lower than `#usedIds.size`
        // this means that `#usedIds` is a set that contains all numbers from 0 to `#usedIds.size - 1`,
        // so `#usedIds.size` is free
        const freeId = this.#usedIds.size;
        this.#usedIds.add(freeId);
        return freeId;
    }
    free(id) {
        if (!this.#usedIds.delete(id)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Freeing an id that is not allocated");
        }
        // maintain the invariant of `#freeIds`
        this.#freeIds.delete(this.#usedIds.size);
        if (id < this.#usedIds.size) {
            this.#freeIds.add(id);
        }
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "impossible": (()=>impossible)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
;
function impossible(value, message) {
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"](message);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/value.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "valueFromProto": (()=>valueFromProto),
    "valueToProto": (()=>valueToProto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function valueToProto(value) {
    if (value === null) {
        return null;
    } else if (typeof value === "string") {
        return value;
    } else if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
        }
        return value;
    } else if (typeof value === "bigint") {
        if (value < minInteger || value > maxInteger) {
            throw new RangeError("This bigint value is too large to be represented as a 64-bit integer and passed as argument");
        }
        return value;
    } else if (typeof value === "boolean") {
        return value ? 1n : 0n;
    } else if (value instanceof ArrayBuffer) {
        return new Uint8Array(value);
    } else if (value instanceof Uint8Array) {
        return value;
    } else if (value instanceof Date) {
        return +value.valueOf();
    } else if (typeof value === "object") {
        return "" + value.toString();
    } else {
        throw new TypeError("Unsupported type of value");
    }
}
const minInteger = -9223372036854775808n;
const maxInteger = 9223372036854775807n;
function valueFromProto(value, intMode) {
    if (value === null) {
        return null;
    } else if (typeof value === "number") {
        return value;
    } else if (typeof value === "string") {
        return value;
    } else if (typeof value === "bigint") {
        if (intMode === "number") {
            const num = Number(value);
            if (!Number.isSafeInteger(num)) {
                throw new RangeError("Received integer which is too large to be safely represented as a JavaScript number");
            }
            return num;
        } else if (intMode === "bigint") {
            return value;
        } else if (intMode === "string") {
            return "" + value;
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("Invalid value for IntMode");
        }
    } else if (value instanceof Uint8Array) {
        // TODO: we need to copy data from `Uint8Array` to return an `ArrayBuffer`. Perhaps we should add a
        // `blobMode` parameter, similar to `intMode`, which would allow the user to choose between receiving
        // `ArrayBuffer` (default, convenient) and `Uint8Array` (zero copy)?
        return value.slice().buffer;
    } else if (value === undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unrecognized type of Value");
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(value, "Impossible type of Value");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/result.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "errorFromProto": (()=>errorFromProto),
    "rowResultFromProto": (()=>rowResultFromProto),
    "rowsResultFromProto": (()=>rowsResultFromProto),
    "stmtResultFromProto": (()=>stmtResultFromProto),
    "valueResultFromProto": (()=>valueResultFromProto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/value.js [middleware-edge] (ecmascript)");
;
;
function stmtResultFromProto(result) {
    return {
        affectedRowCount: result.affectedRowCount,
        lastInsertRowid: result.lastInsertRowid,
        columnNames: result.cols.map((col)=>col.name),
        columnDecltypes: result.cols.map((col)=>col.decltype)
    };
}
function rowsResultFromProto(result, intMode) {
    const stmtResult = stmtResultFromProto(result);
    const rows = result.rows.map((row)=>rowFromProto(stmtResult.columnNames, row, intMode));
    return {
        ...stmtResult,
        rows
    };
}
function rowResultFromProto(result, intMode) {
    const stmtResult = stmtResultFromProto(result);
    let row;
    if (result.rows.length > 0) {
        row = rowFromProto(stmtResult.columnNames, result.rows[0], intMode);
    }
    return {
        ...stmtResult,
        row
    };
}
function valueResultFromProto(result, intMode) {
    const stmtResult = stmtResultFromProto(result);
    let value;
    if (result.rows.length > 0 && stmtResult.columnNames.length > 0) {
        value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueFromProto"])(result.rows[0][0], intMode);
    }
    return {
        ...stmtResult,
        value
    };
}
function rowFromProto(colNames, values, intMode) {
    const row = {};
    // make sure that the "length" property is not enumerable
    Object.defineProperty(row, "length", {
        value: values.length
    });
    for(let i = 0; i < values.length; ++i){
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueFromProto"])(values[i], intMode);
        Object.defineProperty(row, i, {
            value
        });
        const colName = colNames[i];
        if (colName !== undefined && !Object.hasOwn(row, colName)) {
            Object.defineProperty(row, colName, {
                value,
                enumerable: true
            });
        }
    }
    return row;
}
function errorFromProto(error) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseError"](error.message, error);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sql": (()=>Sql),
    "sqlToProto": (()=>sqlToProto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
;
class Sql {
    #owner;
    #sqlId;
    #closed;
    /** @private */ constructor(owner, sqlId){
        this.#owner = owner;
        this.#sqlId = sqlId;
        this.#closed = undefined;
    }
    /** @private */ _getSqlId(owner) {
        if (this.#owner !== owner) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("Attempted to use SQL text opened with other object");
        } else if (this.#closed !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("SQL text is closed", this.#closed);
        }
        return this.#sqlId;
    }
    /** Remove the SQL text from the server, releasing resouces. */ close() {
        this._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("SQL text was manually closed"));
    }
    /** @private */ _setClosed(error) {
        if (this.#closed === undefined) {
            this.#closed = error;
            this.#owner._closeSql(this.#sqlId);
        }
    }
    /** True if the SQL text is closed (removed from the server). */ get closed() {
        return this.#closed !== undefined;
    }
}
function sqlToProto(owner, sql) {
    if (sql instanceof Sql) {
        return {
            sqlId: sql._getSqlId(owner)
        };
    } else {
        return {
            sql: "" + sql
        };
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/queue.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Queue": (()=>Queue)
});
class Queue {
    #pushStack;
    #shiftStack;
    constructor(){
        this.#pushStack = [];
        this.#shiftStack = [];
    }
    get length() {
        return this.#pushStack.length + this.#shiftStack.length;
    }
    push(elem) {
        this.#pushStack.push(elem);
    }
    shift() {
        if (this.#shiftStack.length === 0 && this.#pushStack.length > 0) {
            this.#shiftStack = this.#pushStack.reverse();
            this.#pushStack = [];
        }
        return this.#shiftStack.pop();
    }
    first() {
        return this.#shiftStack.length !== 0 ? this.#shiftStack[this.#shiftStack.length - 1] : this.#pushStack[0];
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Stmt": (()=>Stmt),
    "stmtToProto": (()=>stmtToProto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/value.js [middleware-edge] (ecmascript)");
;
;
class Stmt {
    /** The SQL statement text. */ sql;
    /** @private */ _args;
    /** @private */ _namedArgs;
    /** Initialize the statement with given SQL text. */ constructor(sql){
        this.sql = sql;
        this._args = [];
        this._namedArgs = new Map();
    }
    /** Binds positional parameters from the given `values`. All previous positional bindings are cleared. */ bindIndexes(values) {
        this._args.length = 0;
        for (const value of values){
            this._args.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueToProto"])(value));
        }
        return this;
    }
    /** Binds a parameter by a 1-based index. */ bindIndex(index, value) {
        if (index !== (index | 0) || index <= 0) {
            throw new RangeError("Index of a positional argument must be positive integer");
        }
        while(this._args.length < index){
            this._args.push(null);
        }
        this._args[index - 1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueToProto"])(value);
        return this;
    }
    /** Binds a parameter by name. */ bindName(name, value) {
        this._namedArgs.set(name, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueToProto"])(value));
        return this;
    }
    /** Clears all bindings. */ unbindAll() {
        this._args.length = 0;
        this._namedArgs.clear();
        return this;
    }
}
function stmtToProto(sqlOwner, stmt, wantRows) {
    let inSql;
    let args = [];
    let namedArgs = [];
    if (stmt instanceof Stmt) {
        inSql = stmt.sql;
        args = stmt._args;
        for (const [name, value] of stmt._namedArgs.entries()){
            namedArgs.push({
                name,
                value
            });
        }
    } else if (Array.isArray(stmt)) {
        inSql = stmt[0];
        if (Array.isArray(stmt[1])) {
            args = stmt[1].map((arg)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueToProto"])(arg));
        } else {
            namedArgs = Object.entries(stmt[1]).map(([name, value])=>{
                return {
                    name,
                    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$value$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueToProto"])(value)
                };
            });
        }
    } else {
        inSql = stmt;
    }
    const { sql, sqlId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sqlToProto"])(sqlOwner, inSql);
    return {
        sql,
        sqlId,
        args,
        namedArgs,
        wantRows
    };
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/batch.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Batch": (()=>Batch),
    "BatchCond": (()=>BatchCond),
    "BatchStep": (()=>BatchStep)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/result.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
;
;
class Batch {
    /** @private */ _stream;
    #useCursor;
    /** @private */ _steps;
    #executed;
    /** @private */ constructor(stream, useCursor){
        this._stream = stream;
        this.#useCursor = useCursor;
        this._steps = [];
        this.#executed = false;
    }
    /** Return a builder for adding a step to the batch. */ step() {
        return new BatchStep(this);
    }
    /** Execute the batch. */ execute() {
        if (this.#executed) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("This batch has already been executed");
        }
        this.#executed = true;
        const batch = {
            steps: this._steps.map((step)=>step.proto)
        };
        if (this.#useCursor) {
            return executeCursor(this._stream, this._steps, batch);
        } else {
            return executeRegular(this._stream, this._steps, batch);
        }
    }
}
function executeRegular(stream, steps, batch) {
    return stream._batch(batch).then((result)=>{
        for(let step = 0; step < steps.length; ++step){
            const stepResult = result.stepResults.get(step);
            const stepError = result.stepErrors.get(step);
            steps[step].callback(stepResult, stepError);
        }
    });
}
async function executeCursor(stream, steps, batch) {
    const cursor = await stream._openCursor(batch);
    try {
        let nextStep = 0;
        let beginEntry = undefined;
        let rows = [];
        for(;;){
            const entry = await cursor.next();
            if (entry === undefined) {
                break;
            }
            if (entry.type === "step_begin") {
                if (entry.step < nextStep || entry.step >= steps.length) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced StepBeginEntry for unexpected step");
                } else if (beginEntry !== undefined) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced StepBeginEntry before terminating previous step");
                }
                for(let step = nextStep; step < entry.step; ++step){
                    steps[step].callback(undefined, undefined);
                }
                nextStep = entry.step + 1;
                beginEntry = entry;
                rows = [];
            } else if (entry.type === "step_end") {
                if (beginEntry === undefined) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced StepEndEntry but no step is active");
                }
                const stmtResult = {
                    cols: beginEntry.cols,
                    rows,
                    affectedRowCount: entry.affectedRowCount,
                    lastInsertRowid: entry.lastInsertRowid
                };
                steps[beginEntry.step].callback(stmtResult, undefined);
                beginEntry = undefined;
                rows = [];
            } else if (entry.type === "step_error") {
                if (beginEntry === undefined) {
                    if (entry.step >= steps.length) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced StepErrorEntry for unexpected step");
                    }
                    for(let step = nextStep; step < entry.step; ++step){
                        steps[step].callback(undefined, undefined);
                    }
                } else {
                    if (entry.step !== beginEntry.step) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced StepErrorEntry for unexpected step");
                    }
                    beginEntry = undefined;
                    rows = [];
                }
                steps[entry.step].callback(undefined, entry.error);
                nextStep = entry.step + 1;
            } else if (entry.type === "row") {
                if (beginEntry === undefined) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced RowEntry but no step is active");
                }
                rows.push(entry.row);
            } else if (entry.type === "error") {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(entry.error);
            } else if (entry.type === "none") {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server produced unrecognized CursorEntry");
            } else {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(entry, "Impossible CursorEntry");
            }
        }
        if (beginEntry !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server closed Cursor before terminating active step");
        }
        for(let step = nextStep; step < steps.length; ++step){
            steps[step].callback(undefined, undefined);
        }
    } finally{
        cursor.close();
    }
}
class BatchStep {
    /** @private */ _batch;
    #conds;
    /** @private */ _index;
    /** @private */ constructor(batch){
        this._batch = batch;
        this.#conds = [];
        this._index = undefined;
    }
    /** Add the condition that needs to be satisfied to execute the statement. If you use this method multiple
     * times, we join the conditions with a logical AND. */ condition(cond) {
        this.#conds.push(cond._proto);
        return this;
    }
    /** Add a statement that returns rows. */ query(stmt) {
        return this.#add(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rowsResultFromProto"]);
    }
    /** Add a statement that returns at most a single row. */ queryRow(stmt) {
        return this.#add(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rowResultFromProto"]);
    }
    /** Add a statement that returns at most a single value. */ queryValue(stmt) {
        return this.#add(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueResultFromProto"]);
    }
    /** Add a statement without returning rows. */ run(stmt) {
        return this.#add(stmt, false, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtResultFromProto"]);
    }
    #add(inStmt, wantRows, fromProto) {
        if (this._index !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("This BatchStep has already been added to the batch");
        }
        const stmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToProto"])(this._batch._stream._sqlOwner(), inStmt, wantRows);
        let condition;
        if (this.#conds.length === 0) {
            condition = undefined;
        } else if (this.#conds.length === 1) {
            condition = this.#conds[0];
        } else {
            condition = {
                type: "and",
                conds: this.#conds.slice()
            };
        }
        const proto = {
            stmt,
            condition
        };
        return new Promise((outputCallback, errorCallback)=>{
            const callback = (stepResult, stepError)=>{
                if (stepResult !== undefined && stepError !== undefined) {
                    errorCallback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server returned both result and error"));
                } else if (stepError !== undefined) {
                    errorCallback((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(stepError));
                } else if (stepResult !== undefined) {
                    outputCallback(fromProto(stepResult, this._batch._stream.intMode));
                } else {
                    outputCallback(undefined);
                }
            };
            this._index = this._batch._steps.length;
            this._batch._steps.push({
                proto,
                callback
            });
        });
    }
}
class BatchCond {
    /** @private */ _batch;
    /** @private */ _proto;
    /** @private */ constructor(batch, proto){
        this._batch = batch;
        this._proto = proto;
    }
    /** Create a condition that evaluates to true when the given step executes successfully.
     *
     * If the given step fails error or is skipped because its condition evaluated to false, this
     * condition evaluates to false.
     */ static ok(step) {
        return new BatchCond(step._batch, {
            type: "ok",
            step: stepIndex(step)
        });
    }
    /** Create a condition that evaluates to true when the given step fails.
     *
     * If the given step succeeds or is skipped because its condition evaluated to false, this condition
     * evaluates to false.
     */ static error(step) {
        return new BatchCond(step._batch, {
            type: "error",
            step: stepIndex(step)
        });
    }
    /** Create a condition that is a logical negation of another condition.
     */ static not(cond) {
        return new BatchCond(cond._batch, {
            type: "not",
            cond: cond._proto
        });
    }
    /** Create a condition that is a logical AND of other conditions.
     */ static and(batch, conds) {
        for (const cond of conds){
            checkCondBatch(batch, cond);
        }
        return new BatchCond(batch, {
            type: "and",
            conds: conds.map((e)=>e._proto)
        });
    }
    /** Create a condition that is a logical OR of other conditions.
     */ static or(batch, conds) {
        for (const cond of conds){
            checkCondBatch(batch, cond);
        }
        return new BatchCond(batch, {
            type: "or",
            conds: conds.map((e)=>e._proto)
        });
    }
    /** Create a condition that evaluates to true when the SQL connection is in autocommit mode (not inside an
     * explicit transaction). This requires protocol version 3 or higher.
     */ static isAutocommit(batch) {
        batch._stream.client()._ensureVersion(3, "BatchCond.isAutocommit()");
        return new BatchCond(batch, {
            type: "is_autocommit"
        });
    }
}
function stepIndex(step) {
    if (step._index === undefined) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("Cannot add a condition referencing a step that has not been added to the batch");
    }
    return step._index;
}
function checkCondBatch(expectedBatch, cond) {
    if (cond._batch !== expectedBatch) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["MisuseError"]("Cannot mix BatchCond objects for different Batch objects");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/describe.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "describeResultFromProto": (()=>describeResultFromProto)
});
function describeResultFromProto(result) {
    return {
        paramNames: result.params.map((p)=>p.name),
        columns: result.cols,
        isExplain: result.isExplain,
        isReadonly: result.isReadonly
    };
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/stream.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Stream": (()=>Stream)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/batch.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$describe$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/describe.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/result.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)");
;
;
;
;
;
class Stream {
    /** @private */ constructor(intMode){
        this.intMode = intMode;
    }
    /** Execute a statement and return rows. */ query(stmt) {
        return this.#execute(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rowsResultFromProto"]);
    }
    /** Execute a statement and return at most a single row. */ queryRow(stmt) {
        return this.#execute(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["rowResultFromProto"]);
    }
    /** Execute a statement and return at most a single value. */ queryValue(stmt) {
        return this.#execute(stmt, true, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["valueResultFromProto"]);
    }
    /** Execute a statement without returning rows. */ run(stmt) {
        return this.#execute(stmt, false, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtResultFromProto"]);
    }
    #execute(inStmt, wantRows, fromProto) {
        const stmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToProto"])(this._sqlOwner(), inStmt, wantRows);
        return this._execute(stmt).then((r)=>fromProto(r, this.intMode));
    }
    /** Return a builder for creating and executing a batch.
     *
     * If `useCursor` is true, the batch will be executed using a Hrana cursor, which will stream results from
     * the server to the client, which consumes less memory on the server. This requires protocol version 3 or
     * higher.
     */ batch(useCursor = false) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"](this, useCursor);
    }
    /** Parse and analyze a statement. This requires protocol version 2 or higher. */ describe(inSql) {
        const protoSql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sqlToProto"])(this._sqlOwner(), inSql);
        return this._describe(protoSql).then(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$describe$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["describeResultFromProto"]);
    }
    /** Execute a sequence of statements separated by semicolons. This requires protocol version 2 or higher.
     * */ sequence(inSql) {
        const protoSql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sqlToProto"])(this._sqlOwner(), inSql);
        return this._sequence(protoSql);
    }
    /** Representation of integers returned from the database. See {@link IntMode}.
     *
     * This value affects the results of all operations on this stream.
     */ intMode;
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/cursor.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Cursor": (()=>Cursor)
});
class Cursor {
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WsCursor": (()=>WsCursor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/cursor.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/queue.js [middleware-edge] (ecmascript)");
;
;
;
const fetchChunkSize = 1000;
const fetchQueueSize = 10;
class WsCursor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Cursor"] {
    #client;
    #stream;
    #cursorId;
    #entryQueue;
    #fetchQueue;
    #closed;
    #done;
    /** @private */ constructor(client, stream, cursorId){
        super();
        this.#client = client;
        this.#stream = stream;
        this.#cursorId = cursorId;
        this.#entryQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Queue"]();
        this.#fetchQueue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Queue"]();
        this.#closed = undefined;
        this.#done = false;
    }
    /** Fetch the next entry from the cursor. */ async next() {
        for(;;){
            if (this.#closed !== undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Cursor is closed", this.#closed);
            }
            while(!this.#done && this.#fetchQueue.length < fetchQueueSize){
                this.#fetchQueue.push(this.#fetch());
            }
            const entry = this.#entryQueue.shift();
            if (this.#done || entry !== undefined) {
                return entry;
            }
            // we assume that `Cursor.next()` is never called concurrently
            await this.#fetchQueue.shift().then((response)=>{
                if (response === undefined) {
                    return;
                }
                for (const entry of response.entries){
                    this.#entryQueue.push(entry);
                }
                this.#done ||= response.done;
            });
        }
    }
    #fetch() {
        return this.#stream._sendCursorRequest(this, {
            type: "fetch_cursor",
            cursorId: this.#cursorId,
            maxCount: fetchChunkSize
        }).then((resp)=>resp, (error)=>{
            this._setClosed(error);
            return undefined;
        });
    }
    /** @private */ _setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        this.#stream._sendCursorRequest(this, {
            type: "close_cursor",
            cursorId: this.#cursorId
        }).catch(()=>undefined);
        this.#stream._cursorClosed(this);
    }
    /** Close the cursor. */ close() {
        this._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Cursor was manually closed"));
    }
    /** True if the cursor is closed. */ get closed() {
        return this.#closed !== undefined;
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/stream.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WsStream": (()=>WsStream)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/queue.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js [middleware-edge] (ecmascript)");
;
;
;
;
class WsStream extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stream"] {
    #client;
    #streamId;
    #queue;
    #cursor;
    #closing;
    #closed;
    /** @private */ static open(client) {
        const streamId = client._streamIdAlloc.alloc();
        const stream = new WsStream(client, streamId);
        const responseCallback = ()=>undefined;
        const errorCallback = (e)=>stream.#setClosed(e);
        const request = {
            type: "open_stream",
            streamId
        };
        client._sendRequest(request, {
            responseCallback,
            errorCallback
        });
        return stream;
    }
    /** @private */ constructor(client, streamId){
        super(client.intMode);
        this.#client = client;
        this.#streamId = streamId;
        this.#queue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Queue"]();
        this.#cursor = undefined;
        this.#closing = false;
        this.#closed = undefined;
    }
    /** Get the {@link WsClient} object that this stream belongs to. */ client() {
        return this.#client;
    }
    /** @private */ _sqlOwner() {
        return this.#client;
    }
    /** @private */ _execute(stmt) {
        return this.#sendStreamRequest({
            type: "execute",
            streamId: this.#streamId,
            stmt
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _batch(batch) {
        return this.#sendStreamRequest({
            type: "batch",
            streamId: this.#streamId,
            batch
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _describe(protoSql) {
        this.#client._ensureVersion(2, "describe()");
        return this.#sendStreamRequest({
            type: "describe",
            streamId: this.#streamId,
            sql: protoSql.sql,
            sqlId: protoSql.sqlId
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _sequence(protoSql) {
        this.#client._ensureVersion(2, "sequence()");
        return this.#sendStreamRequest({
            type: "sequence",
            streamId: this.#streamId,
            sql: protoSql.sql,
            sqlId: protoSql.sqlId
        }).then((_response)=>{
            return undefined;
        });
    }
    /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
     * explicit transaction). This requires protocol version 3 or higher.
     */ getAutocommit() {
        this.#client._ensureVersion(3, "getAutocommit()");
        return this.#sendStreamRequest({
            type: "get_autocommit",
            streamId: this.#streamId
        }).then((response)=>{
            return response.isAutocommit;
        });
    }
    #sendStreamRequest(request) {
        return new Promise((responseCallback, errorCallback)=>{
            this.#pushToQueue({
                type: "request",
                request,
                responseCallback,
                errorCallback
            });
        });
    }
    /** @private */ _openCursor(batch) {
        this.#client._ensureVersion(3, "cursor");
        return new Promise((cursorCallback, errorCallback)=>{
            this.#pushToQueue({
                type: "cursor",
                batch,
                cursorCallback,
                errorCallback
            });
        });
    }
    /** @private */ _sendCursorRequest(cursor, request) {
        if (cursor !== this.#cursor) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Cursor not associated with the stream attempted to execute a request");
        }
        return new Promise((responseCallback, errorCallback)=>{
            if (this.#closed !== undefined) {
                errorCallback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Stream is closed", this.#closed));
            } else {
                this.#client._sendRequest(request, {
                    responseCallback,
                    errorCallback
                });
            }
        });
    }
    /** @private */ _cursorClosed(cursor) {
        if (cursor !== this.#cursor) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Cursor was closed, but it was not associated with the stream");
        }
        this.#cursor = undefined;
        this.#flushQueue();
    }
    #pushToQueue(entry) {
        if (this.#closed !== undefined) {
            entry.errorCallback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Stream is closed", this.#closed));
        } else if (this.#closing) {
            entry.errorCallback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Stream is closing", undefined));
        } else {
            this.#queue.push(entry);
            this.#flushQueue();
        }
    }
    #flushQueue() {
        for(;;){
            const entry = this.#queue.first();
            if (entry === undefined && this.#cursor === undefined && this.#closing) {
                this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Stream was gracefully closed"));
                break;
            } else if (entry?.type === "request" && this.#cursor === undefined) {
                const { request, responseCallback, errorCallback } = entry;
                this.#queue.shift();
                this.#client._sendRequest(request, {
                    responseCallback,
                    errorCallback
                });
            } else if (entry?.type === "cursor" && this.#cursor === undefined) {
                const { batch, cursorCallback } = entry;
                this.#queue.shift();
                const cursorId = this.#client._cursorIdAlloc.alloc();
                const cursor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WsCursor"](this.#client, this, cursorId);
                const request = {
                    type: "open_cursor",
                    streamId: this.#streamId,
                    cursorId,
                    batch
                };
                const responseCallback = ()=>undefined;
                const errorCallback = (e)=>cursor._setClosed(e);
                this.#client._sendRequest(request, {
                    responseCallback,
                    errorCallback
                });
                this.#cursor = cursor;
                cursorCallback(cursor);
            } else {
                break;
            }
        }
    }
    #setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        if (this.#cursor !== undefined) {
            this.#cursor._setClosed(error);
        }
        for(;;){
            const entry = this.#queue.shift();
            if (entry !== undefined) {
                entry.errorCallback(error);
            } else {
                break;
            }
        }
        const request = {
            type: "close_stream",
            streamId: this.#streamId
        };
        const responseCallback = ()=>this.#client._streamIdAlloc.free(this.#streamId);
        const errorCallback = ()=>undefined;
        this.#client._sendRequest(request, {
            responseCallback,
            errorCallback
        });
    }
    /** Immediately close the stream. */ close() {
        this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Stream was manually closed"));
    }
    /** Gracefully close the stream. */ closeGracefully() {
        this.#closing = true;
        this.#flushQueue();
    }
    /** True if the stream is closed or closing. */ get closed() {
        return this.#closed !== undefined || this.#closing;
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Batch": (()=>Batch),
    "Stmt": (()=>Stmt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-base64/base64.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function Stmt(w, msg) {
    if (msg.sql !== undefined) {
        w.string("sql", msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.number("sql_id", msg.sqlId);
    }
    w.arrayObjects("args", msg.args, Value);
    w.arrayObjects("named_args", msg.namedArgs, NamedArg);
    w.boolean("want_rows", msg.wantRows);
}
function NamedArg(w, msg) {
    w.string("name", msg.name);
    w.object("value", msg.value, Value);
}
function Batch(w, msg) {
    w.arrayObjects("steps", msg.steps, BatchStep);
}
function BatchStep(w, msg) {
    if (msg.condition !== undefined) {
        w.object("condition", msg.condition, BatchCond);
    }
    w.object("stmt", msg.stmt, Stmt);
}
function BatchCond(w, msg) {
    w.stringRaw("type", msg.type);
    if (msg.type === "ok" || msg.type === "error") {
        w.number("step", msg.step);
    } else if (msg.type === "not") {
        w.object("cond", msg.cond, BatchCond);
    } else if (msg.type === "and" || msg.type === "or") {
        w.arrayObjects("conds", msg.conds, BatchCond);
    } else if (msg.type === "is_autocommit") {
    // do nothing
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of BatchCond");
    }
}
function Value(w, msg) {
    if (msg === null) {
        w.stringRaw("type", "null");
    } else if (typeof msg === "bigint") {
        w.stringRaw("type", "integer");
        w.stringRaw("value", "" + msg);
    } else if (typeof msg === "number") {
        w.stringRaw("type", "float");
        w.number("value", msg);
    } else if (typeof msg === "string") {
        w.stringRaw("type", "text");
        w.string("value", msg);
    } else if (msg instanceof Uint8Array) {
        w.stringRaw("type", "blob");
        w.stringRaw("base64", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Base64"].fromUint8Array(msg));
    } else if (msg === undefined) {
    // do nothing
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of Value");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientMsg": (()=>ClientMsg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function ClientMsg(w, msg) {
    w.stringRaw("type", msg.type);
    if (msg.type === "hello") {
        if (msg.jwt !== undefined) {
            w.string("jwt", msg.jwt);
        }
    } else if (msg.type === "request") {
        w.number("request_id", msg.requestId);
        w.object("request", msg.request, Request);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of ClientMsg");
    }
}
function Request(w, msg) {
    w.stringRaw("type", msg.type);
    if (msg.type === "open_stream") {
        w.number("stream_id", msg.streamId);
    } else if (msg.type === "close_stream") {
        w.number("stream_id", msg.streamId);
    } else if (msg.type === "execute") {
        w.number("stream_id", msg.streamId);
        w.object("stmt", msg.stmt, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"]);
    } else if (msg.type === "batch") {
        w.number("stream_id", msg.streamId);
        w.object("batch", msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
    } else if (msg.type === "open_cursor") {
        w.number("stream_id", msg.streamId);
        w.number("cursor_id", msg.cursorId);
        w.object("batch", msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
    } else if (msg.type === "close_cursor") {
        w.number("cursor_id", msg.cursorId);
    } else if (msg.type === "fetch_cursor") {
        w.number("cursor_id", msg.cursorId);
        w.number("max_count", msg.maxCount);
    } else if (msg.type === "sequence") {
        w.number("stream_id", msg.streamId);
        if (msg.sql !== undefined) {
            w.string("sql", msg.sql);
        }
        if (msg.sqlId !== undefined) {
            w.number("sql_id", msg.sqlId);
        }
    } else if (msg.type === "describe") {
        w.number("stream_id", msg.streamId);
        if (msg.sql !== undefined) {
            w.string("sql", msg.sql);
        }
        if (msg.sqlId !== undefined) {
            w.number("sql_id", msg.sqlId);
        }
    } else if (msg.type === "store_sql") {
        w.number("sql_id", msg.sqlId);
        w.string("sql", msg.sql);
    } else if (msg.type === "close_sql") {
        w.number("sql_id", msg.sqlId);
    } else if (msg.type === "get_autocommit") {
        w.number("stream_id", msg.streamId);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of Request");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Batch": (()=>Batch),
    "Stmt": (()=>Stmt)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
function Stmt(w, msg) {
    if (msg.sql !== undefined) {
        w.string(1, msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.int32(2, msg.sqlId);
    }
    for (const arg of msg.args){
        w.message(3, arg, Value);
    }
    for (const arg of msg.namedArgs){
        w.message(4, arg, NamedArg);
    }
    w.bool(5, msg.wantRows);
}
function NamedArg(w, msg) {
    w.string(1, msg.name);
    w.message(2, msg.value, Value);
}
function Batch(w, msg) {
    for (const step of msg.steps){
        w.message(1, step, BatchStep);
    }
}
function BatchStep(w, msg) {
    if (msg.condition !== undefined) {
        w.message(1, msg.condition, BatchCond);
    }
    w.message(2, msg.stmt, Stmt);
}
function BatchCond(w, msg) {
    if (msg.type === "ok") {
        w.uint32(1, msg.step);
    } else if (msg.type === "error") {
        w.uint32(2, msg.step);
    } else if (msg.type === "not") {
        w.message(3, msg.cond, BatchCond);
    } else if (msg.type === "and") {
        w.message(4, msg.conds, BatchCondList);
    } else if (msg.type === "or") {
        w.message(5, msg.conds, BatchCondList);
    } else if (msg.type === "is_autocommit") {
        w.message(6, undefined, Empty);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of BatchCond");
    }
}
function BatchCondList(w, msg) {
    for (const cond of msg){
        w.message(1, cond, BatchCond);
    }
}
function Value(w, msg) {
    if (msg === null) {
        w.message(1, undefined, Empty);
    } else if (typeof msg === "bigint") {
        w.sint64(2, msg);
    } else if (typeof msg === "number") {
        w.double(3, msg);
    } else if (typeof msg === "string") {
        w.string(4, msg);
    } else if (msg instanceof Uint8Array) {
        w.bytes(5, msg);
    } else if (msg === undefined) {
    // do nothing
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of Value");
    }
}
function Empty(_w, _msg) {
// do nothing
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientMsg": (()=>ClientMsg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function ClientMsg(w, msg) {
    if (msg.type === "hello") {
        w.message(1, msg, HelloMsg);
    } else if (msg.type === "request") {
        w.message(2, msg, RequestMsg);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of ClientMsg");
    }
}
function HelloMsg(w, msg) {
    if (msg.jwt !== undefined) {
        w.string(1, msg.jwt);
    }
}
function RequestMsg(w, msg) {
    w.int32(1, msg.requestId);
    const request = msg.request;
    if (request.type === "open_stream") {
        w.message(2, request, OpenStreamReq);
    } else if (request.type === "close_stream") {
        w.message(3, request, CloseStreamReq);
    } else if (request.type === "execute") {
        w.message(4, request, ExecuteReq);
    } else if (request.type === "batch") {
        w.message(5, request, BatchReq);
    } else if (request.type === "open_cursor") {
        w.message(6, request, OpenCursorReq);
    } else if (request.type === "close_cursor") {
        w.message(7, request, CloseCursorReq);
    } else if (request.type === "fetch_cursor") {
        w.message(8, request, FetchCursorReq);
    } else if (request.type === "sequence") {
        w.message(9, request, SequenceReq);
    } else if (request.type === "describe") {
        w.message(10, request, DescribeReq);
    } else if (request.type === "store_sql") {
        w.message(11, request, StoreSqlReq);
    } else if (request.type === "close_sql") {
        w.message(12, request, CloseSqlReq);
    } else if (request.type === "get_autocommit") {
        w.message(13, request, GetAutocommitReq);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(request, "Impossible type of Request");
    }
}
function OpenStreamReq(w, msg) {
    w.int32(1, msg.streamId);
}
function CloseStreamReq(w, msg) {
    w.int32(1, msg.streamId);
}
function ExecuteReq(w, msg) {
    w.int32(1, msg.streamId);
    w.message(2, msg.stmt, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"]);
}
function BatchReq(w, msg) {
    w.int32(1, msg.streamId);
    w.message(2, msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
}
function OpenCursorReq(w, msg) {
    w.int32(1, msg.streamId);
    w.int32(2, msg.cursorId);
    w.message(3, msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
}
function CloseCursorReq(w, msg) {
    w.int32(1, msg.cursorId);
}
function FetchCursorReq(w, msg) {
    w.int32(1, msg.cursorId);
    w.uint32(2, msg.maxCount);
}
function SequenceReq(w, msg) {
    w.int32(1, msg.streamId);
    if (msg.sql !== undefined) {
        w.string(2, msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.int32(3, msg.sqlId);
    }
}
function DescribeReq(w, msg) {
    w.int32(1, msg.streamId);
    if (msg.sql !== undefined) {
        w.string(2, msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.int32(3, msg.sqlId);
    }
}
function StoreSqlReq(w, msg) {
    w.int32(1, msg.sqlId);
    w.string(2, msg.sql);
}
function CloseSqlReq(w, msg) {
    w.int32(1, msg.sqlId);
}
function GetAutocommitReq(w, msg) {
    w.int32(1, msg.streamId);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BatchResult": (()=>BatchResult),
    "CursorEntry": (()=>CursorEntry),
    "DescribeResult": (()=>DescribeResult),
    "Error": (()=>Error),
    "StmtResult": (()=>StmtResult),
    "Value": (()=>Value)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-base64/base64.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
;
;
;
function Error(obj) {
    const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["message"]);
    const code = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["code"]);
    return {
        message,
        code
    };
}
function StmtResult(obj) {
    const cols = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["cols"], Col);
    const rows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["array"])(obj["rows"]).map((rowObj)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(rowObj, Value));
    const affectedRowCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["affected_row_count"]);
    const lastInsertRowidStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["last_insert_rowid"]);
    const lastInsertRowid = lastInsertRowidStr !== undefined ? BigInt(lastInsertRowidStr) : undefined;
    return {
        cols,
        rows,
        affectedRowCount,
        lastInsertRowid
    };
}
function Col(obj) {
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["name"]);
    const decltype = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["decltype"]);
    return {
        name,
        decltype
    };
}
function BatchResult(obj) {
    const stepResults = new Map();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["array"])(obj["step_results"]).forEach((value, i)=>{
        if (value !== null) {
            stepResults.set(i, StmtResult((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(value)));
        }
    });
    const stepErrors = new Map();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["array"])(obj["step_errors"]).forEach((value, i)=>{
        if (value !== null) {
            stepErrors.set(i, Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(value)));
        }
    });
    return {
        stepResults,
        stepErrors
    };
}
function CursorEntry(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "step_begin") {
        const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["step"]);
        const cols = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["cols"], Col);
        return {
            type: "step_begin",
            step,
            cols
        };
    } else if (type === "step_end") {
        const affectedRowCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["affected_row_count"]);
        const lastInsertRowidStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["last_insert_rowid"]);
        const lastInsertRowid = lastInsertRowidStr !== undefined ? BigInt(lastInsertRowidStr) : undefined;
        return {
            type: "step_end",
            affectedRowCount,
            lastInsertRowid
        };
    } else if (type === "step_error") {
        const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["step"]);
        const error = Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["error"]));
        return {
            type: "step_error",
            step,
            error
        };
    } else if (type === "row") {
        const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["row"], Value);
        return {
            type: "row",
            row
        };
    } else if (type === "error") {
        const error = Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["error"]));
        return {
            type: "error",
            error
        };
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of CursorEntry");
    }
}
function DescribeResult(obj) {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["params"], DescribeParam);
    const cols = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["cols"], DescribeCol);
    const isExplain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])(obj["is_explain"]);
    const isReadonly = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])(obj["is_readonly"]);
    return {
        params,
        cols,
        isExplain,
        isReadonly
    };
}
function DescribeParam(obj) {
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["name"]);
    return {
        name
    };
}
function DescribeCol(obj) {
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["name"]);
    const decltype = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["decltype"]);
    return {
        name,
        decltype
    };
}
function Value(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "null") {
        return null;
    } else if (type === "integer") {
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["value"]);
        return BigInt(value);
    } else if (type === "float") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["value"]);
    } else if (type === "text") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["value"]);
    } else if (type === "blob") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Base64"].toUint8Array((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["base64"]));
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of Value");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ServerMsg": (()=>ServerMsg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js [middleware-edge] (ecmascript)");
;
;
;
function ServerMsg(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "hello_ok") {
        return {
            type: "hello_ok"
        };
    } else if (type === "hello_error") {
        const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["error"]));
        return {
            type: "hello_error",
            error
        };
    } else if (type === "response_ok") {
        const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["request_id"]);
        const response = Response((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["response"]));
        return {
            type: "response_ok",
            requestId,
            response
        };
    } else if (type === "response_error") {
        const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["number"])(obj["request_id"]);
        const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["error"]));
        return {
            type: "response_error",
            requestId,
            error
        };
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of ServerMsg");
    }
}
function Response(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "open_stream") {
        return {
            type: "open_stream"
        };
    } else if (type === "close_stream") {
        return {
            type: "close_stream"
        };
    } else if (type === "execute") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "execute",
            result
        };
    } else if (type === "batch") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "batch",
            result
        };
    } else if (type === "open_cursor") {
        return {
            type: "open_cursor"
        };
    } else if (type === "close_cursor") {
        return {
            type: "close_cursor"
        };
    } else if (type === "fetch_cursor") {
        const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["entries"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorEntry"]);
        const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])(obj["done"]);
        return {
            type: "fetch_cursor",
            entries,
            done
        };
    } else if (type === "sequence") {
        return {
            type: "sequence"
        };
    } else if (type === "describe") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "describe",
            result
        };
    } else if (type === "store_sql") {
        return {
            type: "store_sql"
        };
    } else if (type === "close_sql") {
        return {
            type: "close_sql"
        };
    } else if (type === "get_autocommit") {
        const isAutocommit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])(obj["is_autocommit"]);
        return {
            type: "get_autocommit",
            isAutocommit
        };
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of Response");
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BatchResult": (()=>BatchResult),
    "CursorEntry": (()=>CursorEntry),
    "DescribeResult": (()=>DescribeResult),
    "Error": (()=>Error),
    "StmtResult": (()=>StmtResult)
});
const Error = {
    default () {
        return {
            message: "",
            code: undefined
        };
    },
    1 (r, msg) {
        msg.message = r.string();
    },
    2 (r, msg) {
        msg.code = r.string();
    }
};
const StmtResult = {
    default () {
        return {
            cols: [],
            rows: [],
            affectedRowCount: 0,
            lastInsertRowid: undefined
        };
    },
    1 (r, msg) {
        msg.cols.push(r.message(Col));
    },
    2 (r, msg) {
        msg.rows.push(r.message(Row));
    },
    3 (r, msg) {
        msg.affectedRowCount = Number(r.uint64());
    },
    4 (r, msg) {
        msg.lastInsertRowid = r.sint64();
    }
};
const Col = {
    default () {
        return {
            name: undefined,
            decltype: undefined
        };
    },
    1 (r, msg) {
        msg.name = r.string();
    },
    2 (r, msg) {
        msg.decltype = r.string();
    }
};
const Row = {
    default () {
        return [];
    },
    1 (r, msg) {
        msg.push(r.message(Value));
    }
};
const BatchResult = {
    default () {
        return {
            stepResults: new Map(),
            stepErrors: new Map()
        };
    },
    1 (r, msg) {
        const [key, value] = r.message(BatchResultStepResult);
        msg.stepResults.set(key, value);
    },
    2 (r, msg) {
        const [key, value] = r.message(BatchResultStepError);
        msg.stepErrors.set(key, value);
    }
};
const BatchResultStepResult = {
    default () {
        return [
            0,
            StmtResult.default()
        ];
    },
    1 (r, msg) {
        msg[0] = r.uint32();
    },
    2 (r, msg) {
        msg[1] = r.message(StmtResult);
    }
};
const BatchResultStepError = {
    default () {
        return [
            0,
            Error.default()
        ];
    },
    1 (r, msg) {
        msg[0] = r.uint32();
    },
    2 (r, msg) {
        msg[1] = r.message(Error);
    }
};
const CursorEntry = {
    default () {
        return {
            type: "none"
        };
    },
    1 (r) {
        return r.message(StepBeginEntry);
    },
    2 (r) {
        return r.message(StepEndEntry);
    },
    3 (r) {
        return r.message(StepErrorEntry);
    },
    4 (r) {
        return {
            type: "row",
            row: r.message(Row)
        };
    },
    5 (r) {
        return {
            type: "error",
            error: r.message(Error)
        };
    }
};
const StepBeginEntry = {
    default () {
        return {
            type: "step_begin",
            step: 0,
            cols: []
        };
    },
    1 (r, msg) {
        msg.step = r.uint32();
    },
    2 (r, msg) {
        msg.cols.push(r.message(Col));
    }
};
const StepEndEntry = {
    default () {
        return {
            type: "step_end",
            affectedRowCount: 0,
            lastInsertRowid: undefined
        };
    },
    1 (r, msg) {
        msg.affectedRowCount = r.uint32();
    },
    2 (r, msg) {
        msg.lastInsertRowid = r.uint64();
    }
};
const StepErrorEntry = {
    default () {
        return {
            type: "step_error",
            step: 0,
            error: Error.default()
        };
    },
    1 (r, msg) {
        msg.step = r.uint32();
    },
    2 (r, msg) {
        msg.error = r.message(Error);
    }
};
const DescribeResult = {
    default () {
        return {
            params: [],
            cols: [],
            isExplain: false,
            isReadonly: false
        };
    },
    1 (r, msg) {
        msg.params.push(r.message(DescribeParam));
    },
    2 (r, msg) {
        msg.cols.push(r.message(DescribeCol));
    },
    3 (r, msg) {
        msg.isExplain = r.bool();
    },
    4 (r, msg) {
        msg.isReadonly = r.bool();
    }
};
const DescribeParam = {
    default () {
        return {
            name: undefined
        };
    },
    1 (r, msg) {
        msg.name = r.string();
    }
};
const DescribeCol = {
    default () {
        return {
            name: "",
            decltype: undefined
        };
    },
    1 (r, msg) {
        msg.name = r.string();
    },
    2 (r, msg) {
        msg.decltype = r.string();
    }
};
const Value = {
    default () {
        return undefined;
    },
    1 (r) {
        return null;
    },
    2 (r) {
        return r.sint64();
    },
    3 (r) {
        return r.double();
    },
    4 (r) {
        return r.string();
    },
    5 (r) {
        return r.bytes();
    }
};
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ServerMsg": (()=>ServerMsg)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js [middleware-edge] (ecmascript)");
;
const ServerMsg = {
    default () {
        return {
            type: "none"
        };
    },
    1 (r) {
        return {
            type: "hello_ok"
        };
    },
    2 (r) {
        return r.message(HelloErrorMsg);
    },
    3 (r) {
        return r.message(ResponseOkMsg);
    },
    4 (r) {
        return r.message(ResponseErrorMsg);
    }
};
const HelloErrorMsg = {
    default () {
        return {
            type: "hello_error",
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"].default()
        };
    },
    1 (r, msg) {
        msg.error = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"]);
    }
};
const ResponseErrorMsg = {
    default () {
        return {
            type: "response_error",
            requestId: 0,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"].default()
        };
    },
    1 (r, msg) {
        msg.requestId = r.int32();
    },
    2 (r, msg) {
        msg.error = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"]);
    }
};
const ResponseOkMsg = {
    default () {
        return {
            type: "response_ok",
            requestId: 0,
            response: {
                type: "none"
            }
        };
    },
    1 (r, msg) {
        msg.requestId = r.int32();
    },
    2 (r, msg) {
        msg.response = {
            type: "open_stream"
        };
    },
    3 (r, msg) {
        msg.response = {
            type: "close_stream"
        };
    },
    4 (r, msg) {
        msg.response = r.message(ExecuteResp);
    },
    5 (r, msg) {
        msg.response = r.message(BatchResp);
    },
    6 (r, msg) {
        msg.response = {
            type: "open_cursor"
        };
    },
    7 (r, msg) {
        msg.response = {
            type: "close_cursor"
        };
    },
    8 (r, msg) {
        msg.response = r.message(FetchCursorResp);
    },
    9 (r, msg) {
        msg.response = {
            type: "sequence"
        };
    },
    10 (r, msg) {
        msg.response = r.message(DescribeResp);
    },
    11 (r, msg) {
        msg.response = {
            type: "store_sql"
        };
    },
    12 (r, msg) {
        msg.response = {
            type: "close_sql"
        };
    },
    13 (r, msg) {
        msg.response = r.message(GetAutocommitResp);
    }
};
const ExecuteResp = {
    default () {
        return {
            type: "execute",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"]);
    }
};
const BatchResp = {
    default () {
        return {
            type: "batch",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"]);
    }
};
const FetchCursorResp = {
    default () {
        return {
            type: "fetch_cursor",
            entries: [],
            done: false
        };
    },
    1 (r, msg) {
        msg.entries.push(r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorEntry"]));
    },
    2 (r, msg) {
        msg.done = r.bool();
    }
};
const DescribeResp = {
    default () {
        return {
            type: "describe",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"]);
    }
};
const GetAutocommitResp = {
    default () {
        return {
            type: "get_autocommit",
            isAutocommit: false
        };
    },
    1 (r, msg) {
        msg.isAutocommit = r.bool();
    }
};
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/ws/client.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WsClient": (()=>WsClient),
    "subprotocolsV2": (()=>subprotocolsV2),
    "subprotocolsV3": (()=>subprotocolsV3)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/id_alloc.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/result.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const subprotocolsV2 = new Map([
    [
        "hrana2",
        {
            version: 2,
            encoding: "json"
        }
    ],
    [
        "hrana1",
        {
            version: 1,
            encoding: "json"
        }
    ]
]);
const subprotocolsV3 = new Map([
    [
        "hrana3-protobuf",
        {
            version: 3,
            encoding: "protobuf"
        }
    ],
    [
        "hrana3",
        {
            version: 3,
            encoding: "json"
        }
    ],
    [
        "hrana2",
        {
            version: 2,
            encoding: "json"
        }
    ],
    [
        "hrana1",
        {
            version: 1,
            encoding: "json"
        }
    ]
]);
class WsClient extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Client"] {
    #socket;
    // List of callbacks that we queue until the socket transitions from the CONNECTING to the OPEN state.
    #openCallbacks;
    // Have we already transitioned from CONNECTING to OPEN and fired the callbacks in #openCallbacks?
    #opened;
    // Stores the error that caused us to close the client (and the socket). If we are not closed, this is
    // `undefined`.
    #closed;
    // Have we received a response to our "hello" from the server?
    #recvdHello;
    // Subprotocol negotiated with the server. It is only available after the socket transitions to the OPEN
    // state.
    #subprotocol;
    // Has the `getVersion()` function been called? This is only used to validate that the API is used
    // correctly.
    #getVersionCalled;
    // A map from request id to the responses that we expect to receive from the server.
    #responseMap;
    // An allocator of request ids.
    #requestIdAlloc;
    // An allocator of stream ids.
    /** @private */ _streamIdAlloc;
    // An allocator of cursor ids.
    /** @private */ _cursorIdAlloc;
    // An allocator of SQL text ids.
    #sqlIdAlloc;
    /** @private */ constructor(socket, jwt){
        super();
        this.#socket = socket;
        this.#openCallbacks = [];
        this.#opened = false;
        this.#closed = undefined;
        this.#recvdHello = false;
        this.#subprotocol = undefined;
        this.#getVersionCalled = false;
        this.#responseMap = new Map();
        this.#requestIdAlloc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IdAlloc"]();
        this._streamIdAlloc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IdAlloc"]();
        this._cursorIdAlloc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IdAlloc"]();
        this.#sqlIdAlloc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IdAlloc"]();
        this.#socket.binaryType = "arraybuffer";
        this.#socket.addEventListener("open", ()=>this.#onSocketOpen());
        this.#socket.addEventListener("close", (event)=>this.#onSocketClose(event));
        this.#socket.addEventListener("error", (event)=>this.#onSocketError(event));
        this.#socket.addEventListener("message", (event)=>this.#onSocketMessage(event));
        this.#send({
            type: "hello",
            jwt
        });
    }
    // Send (or enqueue to send) a message to the server.
    #send(msg) {
        if (this.#closed !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Trying to send a message on a closed client");
        }
        if (this.#opened) {
            this.#sendToSocket(msg);
        } else {
            const openCallback = ()=>this.#sendToSocket(msg);
            const errorCallback = ()=>undefined;
            this.#openCallbacks.push({
                openCallback,
                errorCallback
            });
        }
    }
    // The socket transitioned from CONNECTING to OPEN
    #onSocketOpen() {
        const protocol = this.#socket.protocol;
        if (protocol === undefined) {
            this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("The `WebSocket.protocol` property is undefined. This most likely means that the WebSocket " + "implementation provided by the environment is broken. If you are using Miniflare 2, " + "please update to Miniflare 3, which fixes this problem."));
            return;
        } else if (protocol === "") {
            this.#subprotocol = {
                version: 1,
                encoding: "json"
            };
        } else {
            this.#subprotocol = subprotocolsV3.get(protocol);
            if (this.#subprotocol === undefined) {
                this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"](`Unrecognized WebSocket subprotocol: ${JSON.stringify(protocol)}`));
                return;
            }
        }
        for (const callbacks of this.#openCallbacks){
            callbacks.openCallback();
        }
        this.#openCallbacks.length = 0;
        this.#opened = true;
    }
    #sendToSocket(msg) {
        const encoding = this.#subprotocol.encoding;
        if (encoding === "json") {
            const jsonMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["writeJsonObject"])(msg, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientMsg"]);
            this.#socket.send(jsonMsg);
        } else if (encoding === "protobuf") {
            const protobufMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["writeProtobufMessage"])(msg, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientMsg"]);
            this.#socket.send(protobufMsg);
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(encoding, "Impossible encoding");
        }
    }
    /** Get the protocol version negotiated with the server, possibly waiting until the socket is open. */ getVersion() {
        return new Promise((versionCallback, errorCallback)=>{
            this.#getVersionCalled = true;
            if (this.#closed !== undefined) {
                errorCallback(this.#closed);
            } else if (!this.#opened) {
                const openCallback = ()=>versionCallback(this.#subprotocol.version);
                this.#openCallbacks.push({
                    openCallback,
                    errorCallback
                });
            } else {
                versionCallback(this.#subprotocol.version);
            }
        });
    }
    // Make sure that the negotiated version is at least `minVersion`.
    /** @private */ _ensureVersion(minVersion, feature) {
        if (this.#subprotocol === undefined || !this.#getVersionCalled) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"](`${feature} is supported only on protocol version ${minVersion} and higher, ` + "but the version supported by the WebSocket server is not yet known. " + "Use Client.getVersion() to wait until the version is available.");
        } else if (this.#subprotocol.version < minVersion) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"](`${feature} is supported on protocol version ${minVersion} and higher, ` + `but the WebSocket server only supports version ${this.#subprotocol.version}`);
        }
    }
    // Send a request to the server and invoke a callback when we get the response.
    /** @private */ _sendRequest(request, callbacks) {
        if (this.#closed !== undefined) {
            callbacks.errorCallback(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Client is closed", this.#closed));
            return;
        }
        const requestId = this.#requestIdAlloc.alloc();
        this.#responseMap.set(requestId, {
            ...callbacks,
            type: request.type
        });
        this.#send({
            type: "request",
            requestId,
            request
        });
    }
    // The socket encountered an error.
    #onSocketError(event) {
        const eventMessage = event.message;
        const message = eventMessage ?? "WebSocket was closed due to an error";
        this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocketError"](message));
    }
    // The socket was closed.
    #onSocketClose(event) {
        let message = `WebSocket was closed with code ${event.code}`;
        if (event.reason) {
            message += `: ${event.reason}`;
        }
        this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocketError"](message));
    }
    // Close the client with the given error.
    #setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        for (const callbacks of this.#openCallbacks){
            callbacks.errorCallback(error);
        }
        this.#openCallbacks.length = 0;
        for (const [requestId, responseState] of this.#responseMap.entries()){
            responseState.errorCallback(error);
            this.#requestIdAlloc.free(requestId);
        }
        this.#responseMap.clear();
        this.#socket.close();
    }
    // We received a message from the socket.
    #onSocketMessage(event) {
        if (this.#closed !== undefined) {
            return;
        }
        try {
            let msg;
            const encoding = this.#subprotocol.encoding;
            if (encoding === "json") {
                if (typeof event.data !== "string") {
                    this.#socket.close(3003, "Only text messages are accepted with JSON encoding");
                    this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received non-text message from server with JSON encoding"));
                    return;
                }
                msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readJsonObject"])(JSON.parse(event.data), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ServerMsg"]);
            } else if (encoding === "protobuf") {
                if (!(event.data instanceof ArrayBuffer)) {
                    this.#socket.close(3003, "Only binary messages are accepted with Protobuf encoding");
                    this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received non-binary message from server with Protobuf encoding"));
                    return;
                }
                msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readProtobufMessage"])(new Uint8Array(event.data), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ServerMsg"]);
            } else {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(encoding, "Impossible encoding");
            }
            this.#handleMsg(msg);
        } catch (e) {
            this.#socket.close(3007, "Could not handle message");
            this.#setClosed(e);
        }
    }
    // Handle a message from the server.
    #handleMsg(msg) {
        if (msg.type === "none") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received an unrecognized ServerMsg");
        } else if (msg.type === "hello_ok" || msg.type === "hello_error") {
            if (this.#recvdHello) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received a duplicated hello response");
            }
            this.#recvdHello = true;
            if (msg.type === "hello_error") {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(msg.error);
            }
            return;
        } else if (!this.#recvdHello) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received a non-hello message before a hello response");
        }
        if (msg.type === "response_ok") {
            const requestId = msg.requestId;
            const responseState = this.#responseMap.get(requestId);
            this.#responseMap.delete(requestId);
            if (responseState === undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unexpected OK response");
            }
            this.#requestIdAlloc.free(requestId);
            try {
                if (responseState.type !== msg.response.type) {
                    console.dir({
                        responseState,
                        msg
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unexpected type of response");
                }
                responseState.responseCallback(msg.response);
            } catch (e) {
                responseState.errorCallback(e);
                throw e;
            }
        } else if (msg.type === "response_error") {
            const requestId = msg.requestId;
            const responseState = this.#responseMap.get(requestId);
            this.#responseMap.delete(requestId);
            if (responseState === undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unexpected error response");
            }
            this.#requestIdAlloc.free(requestId);
            responseState.errorCallback((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(msg.error));
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible ServerMsg type");
        }
    }
    /** Open a {@link WsStream}, a stream for executing SQL statements. */ openStream() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WsStream"].open(this);
    }
    /** Cache a SQL text on the server. This requires protocol version 2 or higher. */ storeSql(sql) {
        this._ensureVersion(2, "storeSql()");
        const sqlId = this.#sqlIdAlloc.alloc();
        const sqlObj = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Sql"](this, sqlId);
        const responseCallback = ()=>undefined;
        const errorCallback = (e)=>sqlObj._setClosed(e);
        const request = {
            type: "store_sql",
            sqlId,
            sql
        };
        this._sendRequest(request, {
            responseCallback,
            errorCallback
        });
        return sqlObj;
    }
    /** @private */ _closeSql(sqlId) {
        if (this.#closed !== undefined) {
            return;
        }
        const responseCallback = ()=>this.#sqlIdAlloc.free(sqlId);
        const errorCallback = (e)=>this.#setClosed(e);
        const request = {
            type: "close_sql",
            sqlId
        };
        this._sendRequest(request, {
            responseCallback,
            errorCallback
        });
    }
    /** Close the client and the WebSocket. */ close() {
        this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Client was manually closed"));
    }
    /** True if the client is closed. */ get closed() {
        return this.#closed !== undefined;
    }
}
}}),
"[project]/node_modules/@libsql/isomorphic-fetch/web.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Headers": (()=>_Headers),
    "Request": (()=>_Request),
    "fetch": (()=>_fetch)
});
const _fetch = fetch;
const _Request = Request;
const _Headers = Headers;
;
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// queueMicrotask() ponyfill
// https://github.com/libsql/libsql-client-ts/issues/47
__turbopack_context__.s({
    "queueMicrotask": (()=>_queueMicrotask)
});
let _queueMicrotask;
if (typeof queueMicrotask !== "undefined") {
    _queueMicrotask = queueMicrotask;
} else {
    const resolved = Promise.resolve();
    _queueMicrotask = (callback)=>{
        resolved.then(callback);
    };
}
;
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/byte_queue.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ByteQueue": (()=>ByteQueue)
});
class ByteQueue {
    #array;
    #shiftPos;
    #pushPos;
    constructor(initialCap){
        this.#array = new Uint8Array(new ArrayBuffer(initialCap));
        this.#shiftPos = 0;
        this.#pushPos = 0;
    }
    get length() {
        return this.#pushPos - this.#shiftPos;
    }
    data() {
        return this.#array.slice(this.#shiftPos, this.#pushPos);
    }
    push(chunk) {
        this.#ensurePush(chunk.byteLength);
        this.#array.set(chunk, this.#pushPos);
        this.#pushPos += chunk.byteLength;
    }
    #ensurePush(pushLength) {
        if (this.#pushPos + pushLength <= this.#array.byteLength) {
            return;
        }
        const filledLength = this.#pushPos - this.#shiftPos;
        if (filledLength + pushLength <= this.#array.byteLength && 2 * this.#pushPos >= this.#array.byteLength) {
            this.#array.copyWithin(0, this.#shiftPos, this.#pushPos);
        } else {
            let newCap = this.#array.byteLength;
            do {
                newCap *= 2;
            }while (filledLength + pushLength > newCap)
            const newArray = new Uint8Array(new ArrayBuffer(newCap));
            newArray.set(this.#array.slice(this.#shiftPos, this.#pushPos), 0);
            this.#array = newArray;
        }
        this.#pushPos = filledLength;
        this.#shiftPos = 0;
    }
    shift(length) {
        this.#shiftPos += length;
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CursorRespBody": (()=>CursorRespBody),
    "PipelineRespBody": (()=>PipelineRespBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js [middleware-edge] (ecmascript)");
;
;
;
function PipelineRespBody(obj) {
    const baton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["baton"]);
    const baseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["base_url"]);
    const results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["arrayObjectsMap"])(obj["results"], StreamResult);
    return {
        baton,
        baseUrl,
        results
    };
}
function StreamResult(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "ok") {
        const response = StreamResponse((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["response"]));
        return {
            type: "ok",
            response
        };
    } else if (type === "error") {
        const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["error"]));
        return {
            type: "error",
            error
        };
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of StreamResult");
    }
}
function StreamResponse(obj) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["string"])(obj["type"]);
    if (type === "close") {
        return {
            type: "close"
        };
    } else if (type === "execute") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "execute",
            result
        };
    } else if (type === "batch") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "batch",
            result
        };
    } else if (type === "sequence") {
        return {
            type: "sequence"
        };
    } else if (type === "describe") {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["object"])(obj["result"]));
        return {
            type: "describe",
            result
        };
    } else if (type === "store_sql") {
        return {
            type: "store_sql"
        };
    } else if (type === "close_sql") {
        return {
            type: "close_sql"
        };
    } else if (type === "get_autocommit") {
        const isAutocommit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["boolean"])(obj["is_autocommit"]);
        return {
            type: "get_autocommit",
            isAutocommit
        };
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected type of StreamResponse");
    }
}
function CursorRespBody(obj) {
    const baton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["baton"]);
    const baseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stringOpt"])(obj["base_url"]);
    return {
        baton,
        baseUrl
    };
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CursorRespBody": (()=>CursorRespBody),
    "PipelineRespBody": (()=>PipelineRespBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js [middleware-edge] (ecmascript)");
;
const PipelineRespBody = {
    default () {
        return {
            baton: undefined,
            baseUrl: undefined,
            results: []
        };
    },
    1 (r, msg) {
        msg.baton = r.string();
    },
    2 (r, msg) {
        msg.baseUrl = r.string();
    },
    3 (r, msg) {
        msg.results.push(r.message(StreamResult));
    }
};
const StreamResult = {
    default () {
        return {
            type: "none"
        };
    },
    1 (r) {
        return {
            type: "ok",
            response: r.message(StreamResponse)
        };
    },
    2 (r) {
        return {
            type: "error",
            error: r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Error"])
        };
    }
};
const StreamResponse = {
    default () {
        return {
            type: "none"
        };
    },
    1 (r) {
        return {
            type: "close"
        };
    },
    2 (r) {
        return r.message(ExecuteStreamResp);
    },
    3 (r) {
        return r.message(BatchStreamResp);
    },
    4 (r) {
        return {
            type: "sequence"
        };
    },
    5 (r) {
        return r.message(DescribeStreamResp);
    },
    6 (r) {
        return {
            type: "store_sql"
        };
    },
    7 (r) {
        return {
            type: "close_sql"
        };
    },
    8 (r) {
        return r.message(GetAutocommitStreamResp);
    }
};
const ExecuteStreamResp = {
    default () {
        return {
            type: "execute",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["StmtResult"]);
    }
};
const BatchStreamResp = {
    default () {
        return {
            type: "batch",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchResult"]);
    }
};
const DescribeStreamResp = {
    default () {
        return {
            type: "describe",
            result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"].default()
        };
    },
    1 (r, msg) {
        msg.result = r.message(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["DescribeResult"]);
    }
};
const GetAutocommitStreamResp = {
    default () {
        return {
            type: "get_autocommit",
            isAutocommit: false
        };
    },
    1 (r, msg) {
        msg.isAutocommit = r.bool();
    }
};
const CursorRespBody = {
    default () {
        return {
            baton: undefined,
            baseUrl: undefined
        };
    },
    1 (r, msg) {
        msg.baton = r.string();
    },
    2 (r, msg) {
        msg.baseUrl = r.string();
    }
};
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/cursor.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HttpCursor": (()=>HttpCursor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$byte_queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/byte_queue.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/cursor.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
class HttpCursor extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Cursor"] {
    #stream;
    #encoding;
    #reader;
    #queue;
    #closed;
    #done;
    /** @private */ constructor(stream, encoding){
        super();
        this.#stream = stream;
        this.#encoding = encoding;
        this.#reader = undefined;
        this.#queue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$byte_queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ByteQueue"](16 * 1024);
        this.#closed = undefined;
        this.#done = false;
    }
    async open(response) {
        if (response.body === null) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("No response body for cursor request");
        }
        this.#reader = response.body.getReader();
        const respBody = await this.#nextItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorRespBody"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorRespBody"]);
        if (respBody === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Empty response to cursor request");
        }
        return respBody;
    }
    /** Fetch the next entry from the cursor. */ next() {
        return this.#nextItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorEntry"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorEntry"]);
    }
    /** Close the cursor. */ close() {
        this._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Cursor was manually closed"));
    }
    /** @private */ _setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        this.#stream._cursorClosed(this);
        if (this.#reader !== undefined) {
            this.#reader.cancel();
        }
    }
    /** True if the cursor is closed. */ get closed() {
        return this.#closed !== undefined;
    }
    async #nextItem(jsonFun, protobufDef) {
        for(;;){
            if (this.#done) {
                return undefined;
            } else if (this.#closed !== undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Cursor is closed", this.#closed);
            }
            if (this.#encoding === "json") {
                const jsonData = this.#parseItemJson();
                if (jsonData !== undefined) {
                    const jsonText = new TextDecoder().decode(jsonData);
                    const jsonValue = JSON.parse(jsonText);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readJsonObject"])(jsonValue, jsonFun);
                }
            } else if (this.#encoding === "protobuf") {
                const protobufData = this.#parseItemProtobuf();
                if (protobufData !== undefined) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readProtobufMessage"])(protobufData, protobufDef);
                }
            } else {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(this.#encoding, "Impossible encoding");
            }
            if (this.#reader === undefined) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Attempted to read from HTTP cursor before it was opened");
            }
            const { value, done } = await this.#reader.read();
            if (done && this.#queue.length === 0) {
                this.#done = true;
            } else if (done) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Unexpected end of cursor stream");
            } else {
                this.#queue.push(value);
            }
        }
    }
    #parseItemJson() {
        const data = this.#queue.data();
        const newlineByte = 10;
        const newlinePos = data.indexOf(newlineByte);
        if (newlinePos < 0) {
            return undefined;
        }
        const jsonData = data.slice(0, newlinePos);
        this.#queue.shift(newlinePos + 1);
        return jsonData;
    }
    #parseItemProtobuf() {
        const data = this.#queue.data();
        let varintValue = 0;
        let varintLength = 0;
        for(;;){
            if (varintLength >= data.byteLength) {
                return undefined;
            }
            const byte = data[varintLength];
            varintValue |= (byte & 0x7f) << 7 * varintLength;
            varintLength += 1;
            if (!(byte & 0x80)) {
                break;
            }
        }
        if (data.byteLength < varintLength + varintValue) {
            return undefined;
        }
        const protobufData = data.slice(varintLength, varintLength + varintValue);
        this.#queue.shift(varintLength + varintValue);
        return protobufData;
    }
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CursorReqBody": (()=>CursorReqBody),
    "PipelineReqBody": (()=>PipelineReqBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function PipelineReqBody(w, msg) {
    if (msg.baton !== undefined) {
        w.string("baton", msg.baton);
    }
    w.arrayObjects("requests", msg.requests, StreamRequest);
}
function StreamRequest(w, msg) {
    w.stringRaw("type", msg.type);
    if (msg.type === "close") {
    // do nothing
    } else if (msg.type === "execute") {
        w.object("stmt", msg.stmt, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"]);
    } else if (msg.type === "batch") {
        w.object("batch", msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
    } else if (msg.type === "sequence") {
        if (msg.sql !== undefined) {
            w.string("sql", msg.sql);
        }
        if (msg.sqlId !== undefined) {
            w.number("sql_id", msg.sqlId);
        }
    } else if (msg.type === "describe") {
        if (msg.sql !== undefined) {
            w.string("sql", msg.sql);
        }
        if (msg.sqlId !== undefined) {
            w.number("sql_id", msg.sqlId);
        }
    } else if (msg.type === "store_sql") {
        w.number("sql_id", msg.sqlId);
        w.string("sql", msg.sql);
    } else if (msg.type === "close_sql") {
        w.number("sql_id", msg.sqlId);
    } else if (msg.type === "get_autocommit") {
    // do nothing
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of StreamRequest");
    }
}
function CursorReqBody(w, msg) {
    if (msg.baton !== undefined) {
        w.string("baton", msg.baton);
    }
    w.object("batch", msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CursorReqBody": (()=>CursorReqBody),
    "PipelineReqBody": (()=>PipelineReqBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
function PipelineReqBody(w, msg) {
    if (msg.baton !== undefined) {
        w.string(1, msg.baton);
    }
    for (const req of msg.requests){
        w.message(2, req, StreamRequest);
    }
}
function StreamRequest(w, msg) {
    if (msg.type === "close") {
        w.message(1, msg, CloseStreamReq);
    } else if (msg.type === "execute") {
        w.message(2, msg, ExecuteStreamReq);
    } else if (msg.type === "batch") {
        w.message(3, msg, BatchStreamReq);
    } else if (msg.type === "sequence") {
        w.message(4, msg, SequenceStreamReq);
    } else if (msg.type === "describe") {
        w.message(5, msg, DescribeStreamReq);
    } else if (msg.type === "store_sql") {
        w.message(6, msg, StoreSqlStreamReq);
    } else if (msg.type === "close_sql") {
        w.message(7, msg, CloseSqlStreamReq);
    } else if (msg.type === "get_autocommit") {
        w.message(8, msg, GetAutocommitStreamReq);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(msg, "Impossible type of StreamRequest");
    }
}
function CloseStreamReq(_w, _msg) {}
function ExecuteStreamReq(w, msg) {
    w.message(1, msg.stmt, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"]);
}
function BatchStreamReq(w, msg) {
    w.message(1, msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
}
function SequenceStreamReq(w, msg) {
    if (msg.sql !== undefined) {
        w.string(1, msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.int32(2, msg.sqlId);
    }
}
function DescribeStreamReq(w, msg) {
    if (msg.sql !== undefined) {
        w.string(1, msg.sql);
    }
    if (msg.sqlId !== undefined) {
        w.int32(2, msg.sqlId);
    }
}
function StoreSqlStreamReq(w, msg) {
    w.int32(1, msg.sqlId);
    w.string(2, msg.sql);
}
function CloseSqlStreamReq(w, msg) {
    w.int32(1, msg.sqlId);
}
function GetAutocommitStreamReq(_w, _msg) {}
function CursorReqBody(w, msg) {
    if (msg.baton !== undefined) {
        w.string(1, msg.baton);
    }
    w.message(2, msg.batch, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$shared$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Batch"]);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/stream.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HttpStream": (()=>HttpStream)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-fetch/web.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/id_alloc.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/queue.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue_microtask$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/result.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/cursor.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class HttpStream extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stream"] {
    #client;
    #baseUrl;
    #jwt;
    #fetch;
    #baton;
    #queue;
    #flushing;
    #cursor;
    #closing;
    #closeQueued;
    #closed;
    #sqlIdAlloc;
    /** @private */ constructor(client, baseUrl, jwt, customFetch){
        super(client.intMode);
        this.#client = client;
        this.#baseUrl = baseUrl.toString();
        this.#jwt = jwt;
        this.#fetch = customFetch;
        this.#baton = undefined;
        this.#queue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Queue"]();
        this.#flushing = false;
        this.#closing = false;
        this.#closeQueued = false;
        this.#closed = undefined;
        this.#sqlIdAlloc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$id_alloc$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IdAlloc"]();
    }
    /** Get the {@link HttpClient} object that this stream belongs to. */ client() {
        return this.#client;
    }
    /** @private */ _sqlOwner() {
        return this;
    }
    /** Cache a SQL text on the server. */ storeSql(sql) {
        const sqlId = this.#sqlIdAlloc.alloc();
        this.#sendStreamRequest({
            type: "store_sql",
            sqlId,
            sql
        }).then(()=>undefined, (error)=>this._setClosed(error));
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Sql"](this, sqlId);
    }
    /** @private */ _closeSql(sqlId) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#sendStreamRequest({
            type: "close_sql",
            sqlId
        }).then(()=>this.#sqlIdAlloc.free(sqlId), (error)=>this._setClosed(error));
    }
    /** @private */ _execute(stmt) {
        return this.#sendStreamRequest({
            type: "execute",
            stmt
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _batch(batch) {
        return this.#sendStreamRequest({
            type: "batch",
            batch
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _describe(protoSql) {
        return this.#sendStreamRequest({
            type: "describe",
            sql: protoSql.sql,
            sqlId: protoSql.sqlId
        }).then((response)=>{
            return response.result;
        });
    }
    /** @private */ _sequence(protoSql) {
        return this.#sendStreamRequest({
            type: "sequence",
            sql: protoSql.sql,
            sqlId: protoSql.sqlId
        }).then((_response)=>{
            return undefined;
        });
    }
    /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
     * explicit transaction). This requires protocol version 3 or higher.
     */ getAutocommit() {
        this.#client._ensureVersion(3, "getAutocommit()");
        return this.#sendStreamRequest({
            type: "get_autocommit"
        }).then((response)=>{
            return response.isAutocommit;
        });
    }
    #sendStreamRequest(request) {
        return new Promise((responseCallback, errorCallback)=>{
            this.#pushToQueue({
                type: "pipeline",
                request,
                responseCallback,
                errorCallback
            });
        });
    }
    /** @private */ _openCursor(batch) {
        return new Promise((cursorCallback, errorCallback)=>{
            this.#pushToQueue({
                type: "cursor",
                batch,
                cursorCallback,
                errorCallback
            });
        });
    }
    /** @private */ _cursorClosed(cursor) {
        if (cursor !== this.#cursor) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]("Cursor was closed, but it was not associated with the stream");
        }
        this.#cursor = undefined;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue_microtask$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["queueMicrotask"])(()=>this.#flushQueue());
    }
    /** Immediately close the stream. */ close() {
        this._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Stream was manually closed"));
    }
    /** Gracefully close the stream. */ closeGracefully() {
        this.#closing = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue_microtask$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["queueMicrotask"])(()=>this.#flushQueue());
    }
    /** True if the stream is closed. */ get closed() {
        return this.#closed !== undefined || this.#closing;
    }
    /** @private */ _setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        if (this.#cursor !== undefined) {
            this.#cursor._setClosed(error);
        }
        this.#client._streamClosed(this);
        for(;;){
            const entry = this.#queue.shift();
            if (entry !== undefined) {
                entry.errorCallback(error);
            } else {
                break;
            }
        }
        if ((this.#baton !== undefined || this.#flushing) && !this.#closeQueued) {
            this.#queue.push({
                type: "pipeline",
                request: {
                    type: "close"
                },
                responseCallback: ()=>undefined,
                errorCallback: ()=>undefined
            });
            this.#closeQueued = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue_microtask$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["queueMicrotask"])(()=>this.#flushQueue());
        }
    }
    #pushToQueue(entry) {
        if (this.#closed !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Stream is closed", this.#closed);
        } else if (this.#closing) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Stream is closing", undefined);
        } else {
            this.#queue.push(entry);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$queue_microtask$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["queueMicrotask"])(()=>this.#flushQueue());
        }
    }
    #flushQueue() {
        if (this.#flushing || this.#cursor !== undefined) {
            return;
        }
        if (this.#closing && this.#queue.length === 0) {
            this._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Stream was gracefully closed"));
            return;
        }
        const endpoint = this.#client._endpoint;
        if (endpoint === undefined) {
            this.#client._endpointPromise.then(()=>this.#flushQueue(), (error)=>this._setClosed(error));
            return;
        }
        const firstEntry = this.#queue.shift();
        if (firstEntry === undefined) {
            return;
        } else if (firstEntry.type === "pipeline") {
            const pipeline = [
                firstEntry
            ];
            for(;;){
                const entry = this.#queue.first();
                if (entry !== undefined && entry.type === "pipeline") {
                    pipeline.push(entry);
                    this.#queue.shift();
                } else if (entry === undefined && this.#closing && !this.#closeQueued) {
                    pipeline.push({
                        type: "pipeline",
                        request: {
                            type: "close"
                        },
                        responseCallback: ()=>undefined,
                        errorCallback: ()=>undefined
                    });
                    this.#closeQueued = true;
                    break;
                } else {
                    break;
                }
            }
            this.#flushPipeline(endpoint, pipeline);
        } else if (firstEntry.type === "cursor") {
            this.#flushCursor(endpoint, firstEntry);
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(firstEntry, "Impossible type of QueueEntry");
        }
    }
    #flushPipeline(endpoint, pipeline) {
        this.#flush(()=>this.#createPipelineRequest(pipeline, endpoint), (resp)=>decodePipelineResponse(resp, endpoint.encoding), (respBody)=>respBody.baton, (respBody)=>respBody.baseUrl, (respBody)=>handlePipelineResponse(pipeline, respBody), (error)=>pipeline.forEach((entry)=>entry.errorCallback(error)));
    }
    #flushCursor(endpoint, entry) {
        const cursor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$cursor$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HttpCursor"](this, endpoint.encoding);
        this.#cursor = cursor;
        this.#flush(()=>this.#createCursorRequest(entry, endpoint), (resp)=>cursor.open(resp), (respBody)=>respBody.baton, (respBody)=>respBody.baseUrl, (_respBody)=>entry.cursorCallback(cursor), (error)=>entry.errorCallback(error));
    }
    #flush(createRequest, decodeResponse, getBaton, getBaseUrl, handleResponse, handleError) {
        let promise;
        try {
            const request = createRequest();
            const fetch = this.#fetch;
            promise = fetch(request);
        } catch (error) {
            promise = Promise.reject(error);
        }
        this.#flushing = true;
        promise.then((resp)=>{
            if (!resp.ok) {
                return errorFromResponse(resp).then((error)=>{
                    throw error;
                });
            }
            return decodeResponse(resp);
        }).then((r)=>{
            this.#baton = getBaton(r);
            this.#baseUrl = getBaseUrl(r) ?? this.#baseUrl;
            handleResponse(r);
        }).catch((error)=>{
            this._setClosed(error);
            handleError(error);
        }).finally(()=>{
            this.#flushing = false;
            this.#flushQueue();
        });
    }
    #createPipelineRequest(pipeline, endpoint) {
        return this.#createRequest(new URL(endpoint.pipelinePath, this.#baseUrl), {
            baton: this.#baton,
            requests: pipeline.map((entry)=>entry.request)
        }, endpoint.encoding, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PipelineReqBody"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PipelineReqBody"]);
    }
    #createCursorRequest(entry, endpoint) {
        if (endpoint.cursorPath === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"]("Cursors are supported only on protocol version 3 and higher, " + `but the HTTP server only supports version ${endpoint.version}.`);
        }
        return this.#createRequest(new URL(endpoint.cursorPath, this.#baseUrl), {
            baton: this.#baton,
            batch: entry.batch
        }, endpoint.encoding, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorReqBody"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["CursorReqBody"]);
    }
    #createRequest(url, reqBody, encoding, jsonFun, protobufFun) {
        let bodyData;
        let contentType;
        if (encoding === "json") {
            bodyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["writeJsonObject"])(reqBody, jsonFun);
            contentType = "application/json";
        } else if (encoding === "protobuf") {
            bodyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$encode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["writeProtobufMessage"])(reqBody, protobufFun);
            contentType = "application/x-protobuf";
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(encoding, "Impossible encoding");
        }
        const headers = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Headers"]();
        headers.set("content-type", contentType);
        if (this.#jwt !== undefined) {
            headers.set("authorization", `Bearer ${this.#jwt}`);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Request"](url.toString(), {
            method: "POST",
            headers,
            body: bodyData
        });
    }
}
function handlePipelineResponse(pipeline, respBody) {
    if (respBody.results.length !== pipeline.length) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Server returned unexpected number of pipeline results");
    }
    for(let i = 0; i < pipeline.length; ++i){
        const result = respBody.results[i];
        const entry = pipeline[i];
        if (result.type === "ok") {
            if (result.response.type !== entry.request.type) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unexpected type of response");
            }
            entry.responseCallback(result.response);
        } else if (result.type === "error") {
            entry.errorCallback((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(result.error));
        } else if (result.type === "none") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]("Received unrecognized type of StreamResult");
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(result, "Received impossible type of StreamResult");
        }
    }
}
async function decodePipelineResponse(resp, encoding) {
    if (encoding === "json") {
        const respJson = await resp.json();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$json$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readJsonObject"])(respJson, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$json_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PipelineRespBody"]);
    } else if (encoding === "protobuf") {
        const respData = await resp.arrayBuffer();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$encoding$2f$protobuf$2f$decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["readProtobufMessage"])(new Uint8Array(respData), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$protobuf_decode$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PipelineRespBody"]);
    } else {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["impossible"])(encoding, "Impossible encoding");
    }
}
async function errorFromResponse(resp) {
    const respType = resp.headers.get("content-type") ?? "text/plain";
    if (respType === "application/json") {
        const respBody = await resp.json();
        if ("message" in respBody) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$result$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["errorFromProto"])(respBody);
        }
    }
    let message = `Server returned HTTP status ${resp.status}`;
    if (respType === "text/plain") {
        const respBody = (await resp.text()).trim();
        if (respBody !== "") {
            message += `: ${respBody}`;
        }
    }
    if (resp.status === 404) {
        message += ". It seems that the libsql server is outdated, please try updating the database.";
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HttpServerError"](message, resp.status);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/http/client.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HttpClient": (()=>HttpClient),
    "checkEndpoints": (()=>checkEndpoints)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-fetch/web.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/stream.js [middleware-edge] (ecmascript)");
;
;
;
;
const checkEndpoints = [
    {
        versionPath: "v3-protobuf",
        pipelinePath: "v3-protobuf/pipeline",
        cursorPath: "v3-protobuf/cursor",
        version: 3,
        encoding: "protobuf"
    }
];
const fallbackEndpoint = {
    versionPath: "v2",
    pipelinePath: "v2/pipeline",
    cursorPath: undefined,
    version: 2,
    encoding: "json"
};
class HttpClient extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Client"] {
    #url;
    #jwt;
    #fetch;
    #closed;
    #streams;
    /** @private */ _endpointPromise;
    /** @private */ _endpoint;
    /** @private */ constructor(url, jwt, customFetch, protocolVersion = 2){
        super();
        this.#url = url;
        this.#jwt = jwt;
        this.#fetch = customFetch ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["fetch"];
        this.#closed = undefined;
        this.#streams = new Set();
        if (protocolVersion == 3) {
            this._endpointPromise = findEndpoint(this.#fetch, this.#url);
            this._endpointPromise.then((endpoint)=>this._endpoint = endpoint, (error)=>this.#setClosed(error));
        } else {
            this._endpointPromise = Promise.resolve(fallbackEndpoint);
            this._endpointPromise.then((endpoint)=>this._endpoint = endpoint, (error)=>this.#setClosed(error));
        }
    }
    /** Get the protocol version supported by the server. */ async getVersion() {
        if (this._endpoint !== undefined) {
            return this._endpoint.version;
        }
        return (await this._endpointPromise).version;
    }
    // Make sure that the negotiated version is at least `minVersion`.
    /** @private */ _ensureVersion(minVersion, feature) {
        if (minVersion <= fallbackEndpoint.version) {
            return;
        } else if (this._endpoint === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"](`${feature} is supported only on protocol version ${minVersion} and higher, ` + "but the version supported by the HTTP server is not yet known. " + "Use Client.getVersion() to wait until the version is available.");
        } else if (this._endpoint.version < minVersion) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"](`${feature} is supported only on protocol version ${minVersion} and higher, ` + `but the HTTP server only supports version ${this._endpoint.version}.`);
        }
    }
    /** Open a {@link HttpStream}, a stream for executing SQL statements. */ openStream() {
        if (this.#closed !== undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Client is closed", this.#closed);
        }
        const stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HttpStream"](this, this.#url, this.#jwt, this.#fetch);
        this.#streams.add(stream);
        return stream;
    }
    /** @private */ _streamClosed(stream) {
        this.#streams.delete(stream);
    }
    /** Close the client and all its streams. */ close() {
        this.#setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]("Client was manually closed"));
    }
    /** True if the client is closed. */ get closed() {
        return this.#closed !== undefined;
    }
    #setClosed(error) {
        if (this.#closed !== undefined) {
            return;
        }
        this.#closed = error;
        for (const stream of Array.from(this.#streams)){
            stream._setClosed(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]("Client was closed", error));
        }
    }
}
async function findEndpoint(customFetch, clientUrl) {
    const fetch = customFetch;
    for (const endpoint of checkEndpoints){
        const url = new URL(endpoint.versionPath, clientUrl);
        const request = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Request"](url.toString(), {
            method: "GET"
        });
        const response = await fetch(request);
        await response.arrayBuffer();
        if (response.ok) {
            return endpoint;
        }
    }
    return fallbackEndpoint;
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/libsql_url.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "parseLibsqlUrl": (()=>parseLibsqlUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
;
;
function parseLibsqlUrl(urlStr) {
    const url = new URL(urlStr);
    let authToken = undefined;
    let tls = undefined;
    for (const [key, value] of url.searchParams.entries()){
        if (key === "authToken") {
            authToken = value;
        } else if (key === "tls") {
            if (value === "0") {
                tls = false;
            } else if (value === "1") {
                tls = true;
            } else {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`Unknown value for the "tls" query argument: ${JSON.stringify(value)}`);
            }
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`Unknown URL query argument ${JSON.stringify(key)}`);
        }
    }
    let hranaWsScheme;
    let hranaHttpScheme;
    if ((url.protocol === "http:" || url.protocol === "ws:") && tls === true) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`A ${JSON.stringify(url.protocol)} URL cannot opt into TLS using ?tls=1`);
    } else if ((url.protocol === "https:" || url.protocol === "wss:") && tls === false) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`A ${JSON.stringify(url.protocol)} URL cannot opt out of TLS using ?tls=0`);
    }
    if (url.protocol === "http:" || url.protocol === "https:") {
        hranaHttpScheme = url.protocol;
    } else if (url.protocol === "ws:" || url.protocol === "wss:") {
        hranaWsScheme = url.protocol;
    } else if (url.protocol === "libsql:") {
        if (tls === false) {
            if (!url.port) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`A "libsql:" URL with ?tls=0 must specify an explicit port`);
            }
            hranaHttpScheme = "http:";
            hranaWsScheme = "ws:";
        } else {
            hranaHttpScheme = "https:";
            hranaWsScheme = "wss:";
        }
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"](`This client does not support ${JSON.stringify(url.protocol)} URLs. ` + 'Please use a "libsql:", "ws:", "wss:", "http:" or "https:" URL instead.');
    }
    if (url.username || url.password) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"]("This client does not support HTTP Basic authentication with a username and password. " + 'You can authenticate using a token passed in the "authToken" URL query parameter.');
    }
    if (url.hash) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlUrlParseError"]("URL fragments are not supported");
    }
    let hranaPath = url.pathname;
    if (hranaPath === "/") {
        hranaPath = "";
    }
    const hranaWsUrl = hranaWsScheme !== undefined ? `${hranaWsScheme}//${url.host}${hranaPath}` : undefined;
    const hranaHttpUrl = hranaHttpScheme !== undefined ? `${hranaHttpScheme}//${url.host}${hranaPath}` : undefined;
    return {
        hranaWsUrl,
        hranaHttpUrl,
        authToken
    };
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "openHttp": (()=>openHttp),
    "openWs": (()=>openWs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$ws$2f$web$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-ws/web.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-fetch/web.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/batch.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$libsql_url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/libsql_url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/stream.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function openWs(url, jwt, protocolVersion = 2) {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$ws$2f$web$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocket"] === "undefined") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocketUnsupportedError"]("WebSockets are not supported in this environment");
    }
    var subprotocols = undefined;
    if (protocolVersion == 3) {
        subprotocols = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["subprotocolsV3"].keys());
    } else {
        subprotocols = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["subprotocolsV2"].keys());
    }
    const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$ws$2f$web$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocket"](url, subprotocols);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WsClient"](socket, jwt);
}
function openHttp(url, jwt, customFetch, protocolVersion = 2) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HttpClient"](url instanceof URL ? url : new URL(url), jwt, customFetch, protocolVersion);
}
}}),
"[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$ws$2f$web$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-ws/web.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$isomorphic$2d$fetch$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/isomorphic-fetch/web.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/client.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/batch.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$libsql_url$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/libsql_url.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$sql$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/sql.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$http$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/http/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$ws$2f$stream$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/ws/stream.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/@libsql/client/lib-esm/hrana.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HranaTransaction": (()=>HranaTransaction),
    "executeHranaBatch": (()=>executeHranaBatch),
    "mapHranaError": (()=>mapHranaError),
    "resultSetFromHrana": (()=>resultSetFromHrana),
    "stmtToHrana": (()=>stmtToHrana)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/batch.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/stmt.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
;
class HranaTransaction {
    #mode;
    #version;
    // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
    // BEGIN statement yet.
    #started;
    /** @private */ constructor(mode, version){
        this.#mode = mode;
        this.#version = version;
        this.#started = undefined;
    }
    execute(stmt) {
        return this.batch([
            stmt
        ]).then((results)=>results[0]);
    }
    async batch(stmts) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            const hranaStmts = stmts.map(stmtToHrana);
            let rowsPromises;
            if (this.#started === undefined) {
                // The transaction hasn't started yet, so we need to send the BEGIN statement in a batch with
                // `hranaStmts`.
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                const beginStep = batch.step();
                const beginPromise = beginStep.run((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["transactionModeToBegin"])(this.#mode));
                // Execute the `hranaStmts` only if the BEGIN succeeded, to make sure that we don't execute it
                // outside of a transaction.
                let lastStep = beginStep;
                rowsPromises = hranaStmts.map((hranaStmt)=>{
                    const stmtStep = batch.step().condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].ok(lastStep));
                    if (this.#version >= 3) {
                        // If the Hrana version supports it, make sure that we are still in a transaction
                        stmtStep.condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].not(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(()=>undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                // `this.#started` is resolved successfully only if the batch and the BEGIN statement inside
                // of the batch are both successful.
                this.#started = batch.execute().then(()=>beginPromise).then(()=>undefined);
                try {
                    await this.#started;
                } catch (e) {
                    // If the BEGIN failed, the transaction is unusable and we must close it. However, if the
                    // BEGIN suceeds and `hranaStmts` fail, the transaction is _not_ closed.
                    this.close();
                    throw e;
                }
            } else {
                if (this.#version < 3) {
                    // The transaction has started, so we must wait until the BEGIN statement completed to make
                    // sure that we don't execute `hranaStmts` outside of a transaction.
                    await this.#started;
                } else {
                // The transaction has started, but we will use `hrana.BatchCond.isAutocommit()` to make
                // sure that we don't execute `hranaStmts` outside of a transaction, so we don't have to
                // wait for `this.#started`
                }
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                let lastStep = undefined;
                rowsPromises = hranaStmts.map((hranaStmt)=>{
                    const stmtStep = batch.step();
                    if (lastStep !== undefined) {
                        stmtStep.condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].ok(lastStep));
                    }
                    if (this.#version >= 3) {
                        stmtStep.condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].not(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(()=>undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                await batch.execute();
            }
            const resultSets = [];
            for (const rowsPromise of rowsPromises){
                const rows = await rowsPromise;
                if (rows === undefined) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("Statement in a transaction was not executed, " + "probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
                }
                resultSets.push(resultSetFromHrana(rows));
            }
            return resultSets;
        } catch (e) {
            throw mapHranaError(e);
        }
    }
    async executeMultiple(sql) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            if (this.#started === undefined) {
                // If the transaction hasn't started yet, start it now
                this.#started = stream.run((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["transactionModeToBegin"])(this.#mode)).then(()=>undefined);
                try {
                    await this.#started;
                } catch (e) {
                    this.close();
                    throw e;
                }
            } else {
                // Wait until the transaction has started
                await this.#started;
            }
            await stream.sequence(sql);
        } catch (e) {
            throw mapHranaError(e);
        }
    }
    async rollback() {
        try {
            const stream = this._getStream();
            if (stream.closed) {
                return;
            }
            if (this.#started !== undefined) {
            // We don't have to wait for the BEGIN statement to complete. If the BEGIN fails, we will
            // execute a ROLLBACK outside of an active transaction, which should be harmless.
            } else {
                // We did nothing in the transaction, so there is nothing to rollback.
                return;
            }
            // Pipeline the ROLLBACK statement and the stream close.
            const promise = stream.run("ROLLBACK").catch((e)=>{
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        } catch (e) {
            throw mapHranaError(e);
        } finally{
            // `this.close()` may close the `hrana.Client`, which aborts all pending stream requests, so we
            // must call it _after_ we receive the ROLLBACK response.
            // Also note that the current stream should already be closed, but we need to call `this.close()`
            // anyway, because it may need to do more cleanup.
            this.close();
        }
    }
    async commit() {
        // (this method is analogous to `rollback()`)
        try {
            const stream = this._getStream();
            if (stream.closed) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
            }
            if (this.#started !== undefined) {
                // Make sure to execute the COMMIT only if the BEGIN was successful.
                await this.#started;
            } else {
                return;
            }
            const promise = stream.run("COMMIT").catch((e)=>{
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        } catch (e) {
            throw mapHranaError(e);
        } finally{
            this.close();
        }
    }
}
async function executeHranaBatch(mode, version, batch, hranaStmts) {
    const beginStep = batch.step();
    const beginPromise = beginStep.run((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["transactionModeToBegin"])(mode));
    let lastStep = beginStep;
    const stmtPromises = hranaStmts.map((hranaStmt)=>{
        const stmtStep = batch.step().condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].ok(lastStep));
        if (version >= 3) {
            stmtStep.condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].not(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].isAutocommit(batch)));
        }
        const stmtPromise = stmtStep.query(hranaStmt);
        lastStep = stmtStep;
        return stmtPromise;
    });
    const commitStep = batch.step().condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].ok(lastStep));
    if (version >= 3) {
        commitStep.condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].not(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].isAutocommit(batch)));
    }
    const commitPromise = commitStep.run("COMMIT");
    const rollbackStep = batch.step().condition(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].not(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$batch$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["BatchCond"].ok(commitStep)));
    rollbackStep.run("ROLLBACK").catch((_)=>undefined);
    await batch.execute();
    const resultSets = [];
    await beginPromise;
    for (const stmtPromise of stmtPromises){
        const hranaRows = await stmtPromise;
        if (hranaRows === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(hranaRows));
    }
    await commitPromise;
    return resultSets;
}
function stmtToHrana(stmt) {
    if (typeof stmt === "string") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"](stmt);
    }
    const hranaStmt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$stmt$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Stmt"](stmt.sql);
    if (Array.isArray(stmt.args)) {
        hranaStmt.bindIndexes(stmt.args);
    } else {
        for (const [key, value] of Object.entries(stmt.args)){
            hranaStmt.bindName(key, value);
        }
    }
    return hranaStmt;
}
function resultSetFromHrana(hranaRows) {
    const columns = hranaRows.columnNames.map((c)=>c ?? "");
    const columnTypes = hranaRows.columnDecltypes.map((c)=>c ?? "");
    const rows = hranaRows.rows;
    const rowsAffected = hranaRows.affectedRowCount;
    const lastInsertRowid = hranaRows.lastInsertRowid !== undefined ? hranaRows.lastInsertRowid : undefined;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResultSetImpl"](columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
function mapHranaError(e) {
    if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"]) {
        const code = mapHranaErrorCode(e);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](e.message, code, undefined, e);
    }
    return e;
}
function mapHranaErrorCode(e) {
    if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ResponseError"] && e.code !== undefined) {
        return e.code;
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtoError"]) {
        return "HRANA_PROTO_ERROR";
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClosedError"]) {
        return e.cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ClientError"] ? mapHranaErrorCode(e.cause) : "HRANA_CLOSED_ERROR";
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocketError"]) {
        return "HRANA_WEBSOCKET_ERROR";
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HttpServerError"]) {
        return "SERVER_ERROR";
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ProtocolVersionError"]) {
        return "PROTOCOL_VERSION_ERROR";
    } else if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["InternalError"]) {
        return "INTERNAL_ERROR";
    } else {
        return "UNKNOWN";
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/sql_cache.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SqlCache": (()=>SqlCache)
});
class SqlCache {
    #owner;
    #sqls;
    capacity;
    constructor(owner, capacity){
        this.#owner = owner;
        this.#sqls = new Lru();
        this.capacity = capacity;
    }
    // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
    // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
    // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
    // server).
    //
    // In practice, this means that after calling this function, you can use the statements only up to the
    // first `await`, because concurrent code may also use the cache and invalidate those statements.
    apply(hranaStmts) {
        if (this.capacity <= 0) {
            return;
        }
        const usedSqlObjs = new Set();
        for (const hranaStmt of hranaStmts){
            if (typeof hranaStmt.sql !== "string") {
                continue;
            }
            const sqlText = hranaStmt.sql;
            let sqlObj = this.#sqls.get(sqlText);
            if (sqlObj === undefined) {
                while(this.#sqls.size + 1 > this.capacity){
                    const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
                    if (usedSqlObjs.has(evictSqlObj)) {
                        break;
                    }
                    evictSqlObj.close();
                    this.#sqls.delete(evictSqlText);
                }
                if (this.#sqls.size + 1 <= this.capacity) {
                    sqlObj = this.#owner.storeSql(sqlText);
                    this.#sqls.set(sqlText, sqlObj);
                }
            }
            if (sqlObj !== undefined) {
                hranaStmt.sql = sqlObj;
                usedSqlObjs.add(sqlObj);
            }
        }
    }
}
class Lru {
    // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
    // most recently are at the end).
    #cache;
    constructor(){
        this.#cache = new Map();
    }
    get(key) {
        const value = this.#cache.get(key);
        if (value !== undefined) {
            // move the entry to the back of the Map
            this.#cache.delete(key);
            this.#cache.set(key, value);
        }
        return value;
    }
    set(key, value) {
        this.#cache.set(key, value);
    }
    peekLru() {
        for (const entry of this.#cache.entries()){
            return entry;
        }
        return undefined;
    }
    delete(key) {
        this.#cache.delete(key);
    }
    get size() {
        return this.#cache.size;
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WsClient": (()=>WsClient),
    "WsTransaction": (()=>WsTransaction),
    "_createClient": (()=>_createClient),
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/errors.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/hrana.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/sql_cache.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
function createClient(config) {
    return _createClient((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["expandConfig"])(config, false));
}
function _createClient(config) {
    if (config.scheme !== "wss" && config.scheme !== "ws") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]('The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, ' + `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["supportedUrlLink"]}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.scheme === "ws" && config.tls) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    } else if (config.scheme === "wss" && !config.tls) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["encodeBaseUrl"])(config.scheme, config.authority, config.path);
    let client;
    try {
        client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openWs"])(url, config.authToken);
    } catch (e) {
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$errors$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["WebSocketUnsupportedError"]) {
            const suggestedScheme = config.scheme === "wss" ? "https" : "http";
            const suggestedUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["encodeBaseUrl"])(suggestedScheme, config.authority, config.path);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("This environment does not support WebSockets, please switch to the HTTP client by using " + `a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). ` + `For more information, please read ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["supportedUrlLink"]}`, "WEBSOCKETS_NOT_SUPPORTED");
        }
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
    }
    return new WsClient(client, url, config.authToken, config.intMode);
}
const maxConnAgeMillis = 60 * 1000;
const sqlCacheCapacity = 100;
class WsClient {
    #url;
    #authToken;
    #intMode;
    // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
    // asynchronous error.
    #connState;
    // If defined, this is a connection that will be used in the future, once it is ready.
    #futureConnState;
    closed;
    protocol;
    /** @private */ constructor(client, url, authToken, intMode){
        this.#url = url;
        this.#authToken = authToken;
        this.#intMode = intMode;
        this.#connState = this.#openConn(client);
        this.#futureConnState = undefined;
        this.closed = false;
        this.protocol = "ws";
    }
    async execute(stmt) {
        const streamState = await this.#openStream();
        try {
            const hranaStmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToHrana"])(stmt);
            // Schedule all operations synchronously, so they will be pipelined and executed in a single
            // network roundtrip.
            streamState.conn.sqlCache.apply([
                hranaStmt
            ]);
            const hranaRowsPromise = streamState.stream.query(hranaStmt);
            streamState.stream.closeGracefully();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["resultSetFromHrana"])(await hranaRowsPromise);
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        } finally{
            this._closeStream(streamState);
        }
    }
    async batch(stmts, mode = "deferred") {
        const streamState = await this.#openStream();
        try {
            const hranaStmts = stmts.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToHrana"]);
            const version = await streamState.conn.client.getVersion();
            // Schedule all operations synchronously, so they will be pipelined and executed in a single
            // network roundtrip.
            streamState.conn.sqlCache.apply(hranaStmts);
            const batch = streamState.stream.batch(version >= 3);
            const resultsPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["executeHranaBatch"])(mode, version, batch, hranaStmts);
            return await resultsPromise;
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        } finally{
            this._closeStream(streamState);
        }
    }
    async transaction(mode = "write") {
        const streamState = await this.#openStream();
        try {
            const version = await streamState.conn.client.getVersion();
            // the BEGIN statement will be batched with the first statement on the transaction to save a
            // network roundtrip
            return new WsTransaction(this, streamState, mode, version);
        } catch (e) {
            this._closeStream(streamState);
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    async executeMultiple(sql) {
        const streamState = await this.#openStream();
        try {
            // Schedule all operations synchronously, so they will be pipelined and executed in a single
            // network roundtrip.
            const promise = streamState.stream.sequence(sql);
            streamState.stream.closeGracefully();
            await promise;
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        } finally{
            this._closeStream(streamState);
        }
    }
    sync() {
        return Promise.resolve();
    }
    async #openStream() {
        if (this.closed) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]("The client is closed", "CLIENT_CLOSED");
        }
        const now = new Date();
        const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
        if (ageMillis > maxConnAgeMillis && this.#futureConnState === undefined) {
            // The existing connection is too old, let's open a new one.
            const futureConnState = this.#openConn();
            this.#futureConnState = futureConnState;
            // However, if we used `futureConnState` immediately, we would introduce additional latency,
            // because we would have to wait for the WebSocket handshake to complete, even though we may a
            // have perfectly good existing connection in `this.#connState`!
            //
            // So we wait until the `hrana.Client.getVersion()` operation completes (which happens when the
            // WebSocket hanshake completes), and only then we replace `this.#connState` with
            // `futureConnState`, which is stored in `this.#futureConnState` in the meantime.
            futureConnState.client.getVersion().then((_version)=>{
                if (this.#connState !== futureConnState) {
                    // We need to close `this.#connState` before we replace it. However, it is possible
                    // that `this.#connState` has already been replaced: see the code below.
                    if (this.#connState.streamStates.size === 0) {
                        this.#connState.client.close();
                    } else {
                    // If there are existing streams on the connection, we must not close it, because
                    // these streams would be broken. The last stream to be closed will also close the
                    // connection in `_closeStream()`.
                    }
                }
                this.#connState = futureConnState;
                this.#futureConnState = undefined;
            }, (_e)=>{
                // If the new connection could not be established, let's just ignore the error and keep
                // using the existing connection.
                this.#futureConnState = undefined;
            });
        }
        if (this.#connState.client.closed) {
            // An error happened on this connection and it has been closed. Let's try to seamlessly reconnect.
            try {
                if (this.#futureConnState !== undefined) {
                    // We are already in the process of opening a new connection, so let's just use it
                    // immediately.
                    this.#connState = this.#futureConnState;
                } else {
                    this.#connState = this.#openConn();
                }
            } catch (e) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
            }
        }
        const connState = this.#connState;
        try {
            // Now we wait for the WebSocket handshake to complete (if it hasn't completed yet). Note that
            // this does not increase latency, because any messages that we would send on the WebSocket before
            // the handshake would be queued until the handshake is completed anyway.
            if (connState.useSqlCache === undefined) {
                connState.useSqlCache = await connState.client.getVersion() >= 2;
                if (connState.useSqlCache) {
                    connState.sqlCache.capacity = sqlCacheCapacity;
                }
            }
            const stream = connState.client.openStream();
            stream.intMode = this.#intMode;
            const streamState = {
                conn: connState,
                stream
            };
            connState.streamStates.add(streamState);
            return streamState;
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    #openConn(client) {
        try {
            client ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openWs"])(this.#url, this.#authToken);
            return {
                client,
                useSqlCache: undefined,
                sqlCache: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SqlCache"](client, 0),
                openTime: new Date(),
                streamStates: new Set()
            };
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    _closeStream(streamState) {
        streamState.stream.close();
        const connState = streamState.conn;
        connState.streamStates.delete(streamState);
        if (connState.streamStates.size === 0 && connState !== this.#connState) {
            // We are not using this connection anymore and this is the last stream that was using it, so we
            // must close it now.
            connState.client.close();
        }
    }
    close() {
        this.#connState.client.close();
        this.closed = true;
    }
}
class WsTransaction extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HranaTransaction"] {
    #client;
    #streamState;
    /** @private */ constructor(client, state, mode, version){
        super(mode, version);
        this.#client = client;
        this.#streamState = state;
    }
    /** @private */ _getStream() {
        return this.#streamState.stream;
    }
    /** @private */ _getSqlCache() {
        return this.#streamState.conn.sqlCache;
    }
    close() {
        this.#client._closeStream(this.#streamState);
    }
    get closed() {
        return this.#streamState.stream.closed;
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/hrana.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/sql_cache.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$ws$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HttpClient": (()=>HttpClient),
    "HttpTransaction": (()=>HttpTransaction),
    "_createClient": (()=>_createClient),
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/hrana.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/sql_cache.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
;
function createClient(config) {
    return _createClient((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["expandConfig"])(config, true));
}
function _createClient(config) {
    if (config.scheme !== "https" && config.scheme !== "http") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]('The HTTP client supports only "libsql:", "https:" and "http:" URLs, ' + `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["supportedUrlLink"]}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.scheme === "http" && config.tls) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    } else if (config.scheme === "https" && !config.tls) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"](`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["encodeBaseUrl"])(config.scheme, config.authority, config.path);
    return new HttpClient(url, config.authToken, config.intMode, config.fetch);
}
const sqlCacheCapacity = 30;
class HttpClient {
    #client;
    protocol;
    /** @private */ constructor(url, authToken, intMode, customFetch){
        this.#client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["openHttp"])(url, authToken, customFetch);
        this.#client.intMode = intMode;
        this.protocol = "http";
    }
    async execute(stmt) {
        try {
            const hranaStmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToHrana"])(stmt);
            // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the statement and
            // close the stream in a single HTTP request.
            let rowsPromise;
            const stream = this.#client.openStream();
            try {
                rowsPromise = stream.query(hranaStmt);
            } finally{
                stream.closeGracefully();
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["resultSetFromHrana"])(await rowsPromise);
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    async batch(stmts, mode = "deferred") {
        try {
            const hranaStmts = stmts.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["stmtToHrana"]);
            const version = await this.#client.getVersion();
            // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the batch and
            // close the stream in a single HTTP request.
            let resultsPromise;
            const stream = this.#client.openStream();
            try {
                // It makes sense to use a SQL cache even for a single batch, because it may contain the same
                // statement repeated multiple times.
                const sqlCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SqlCache"](stream, sqlCacheCapacity);
                sqlCache.apply(hranaStmts);
                // TODO: we do not use a cursor here, because it would cause three roundtrips:
                // 1. pipeline request to store SQL texts
                // 2. cursor request
                // 3. pipeline request to close the stream
                const batch = stream.batch(false);
                resultsPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["executeHranaBatch"])(mode, version, batch, hranaStmts);
            } finally{
                stream.closeGracefully();
            }
            return await resultsPromise;
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    async transaction(mode = "write") {
        try {
            const version = await this.#client.getVersion();
            return new HttpTransaction(this.#client.openStream(), mode, version);
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    async executeMultiple(sql) {
        try {
            // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the sequence and
            // close the stream in a single HTTP request.
            let promise;
            const stream = this.#client.openStream();
            try {
                promise = stream.sequence(sql);
            } finally{
                stream.closeGracefully();
            }
            await promise;
        } catch (e) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["mapHranaError"])(e);
        }
    }
    sync() {
        return Promise.resolve();
    }
    close() {
        this.#client.close();
    }
    get closed() {
        return this.#client.closed;
    }
}
class HttpTransaction extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["HranaTransaction"] {
    #stream;
    #sqlCache;
    /** @private */ constructor(stream, mode, version){
        super(mode, version);
        this.#stream = stream;
        this.#sqlCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SqlCache"](stream, sqlCacheCapacity);
    }
    /** @private */ _getStream() {
        return this.#stream;
    }
    /** @private */ _getSqlCache() {
        return this.#sqlCache;
    }
    close() {
        this.#stream.close();
    }
    get closed() {
        return this.#stream.closed;
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$hrana$2d$client$2f$lib$2d$esm$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/hrana-client/lib-esm/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$hrana$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/hrana.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$sql_cache$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/sql_cache.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$uri$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/uri.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$http$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/@libsql/client/lib-esm/web.js [middleware-edge] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "_createClient": (()=>_createClient),
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$ws$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$ws$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$http$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$http$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <locals>");
;
;
;
;
;
;
function createClient(config) {
    return _createClient((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["expandConfig"])(config, true));
}
function _createClient(config) {
    if (config.scheme === "ws" || config.scheme === "wss") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$ws$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["_createClient"])(config);
    } else if (config.scheme === "http" || config.scheme === "https") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$http$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["_createClient"])(config);
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["LibsqlError"]('The client that uses Web standard APIs supports only "libsql:", "wss:", "ws:", "https:" and "http:" URLs, ' + `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["supportedUrlLink"]}`, "URL_SCHEME_NOT_SUPPORTED");
    }
}
}}),
"[project]/node_modules/@libsql/client/lib-esm/web.js [middleware-edge] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$api$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/api.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$config$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/config.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$util$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/util.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$ws$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/ws.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$http$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/http.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$libsql$2f$client$2f$lib$2d$esm$2f$web$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@libsql/client/lib-esm/web.js [middleware-edge] (ecmascript) <locals>");
}}),
"[project]/node_modules/bcryptjs/umd [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__import_unsupported(`crypto`));
}}),
"[project]/node_modules/bcryptjs/umd [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__import_unsupported(`crypto`));
}}),
"[project]/node_modules/bcryptjs/umd/index.js [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
// GENERATED FILE. DO NOT EDIT.
(function(global, factory) {
    function preferDefault(exports1) {
        return exports1.default || exports1;
    }
    if (typeof define === "function" && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(function(_crypto) {
            var exports1 = {};
            factory(exports1, _crypto);
            return preferDefault(exports1);
        }(__turbopack_context__.r("[project]/node_modules/bcryptjs/umd [middleware-edge] (ecmascript)")));
    } else if ("TURBOPACK compile-time truthy", 1) {
        factory(exports, __turbopack_context__.r("[project]/node_modules/bcryptjs/umd [middleware-edge] (ecmascript)"));
        if ("TURBOPACK compile-time truthy", 1) module.exports = preferDefault(exports);
    } else {
        "TURBOPACK unreachable";
    }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function(_exports, _crypto) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.compare = compare;
    _exports.compareSync = compareSync;
    _exports.decodeBase64 = decodeBase64;
    _exports.default = void 0;
    _exports.encodeBase64 = encodeBase64;
    _exports.genSalt = genSalt;
    _exports.genSaltSync = genSaltSync;
    _exports.getRounds = getRounds;
    _exports.getSalt = getSalt;
    _exports.hash = hash;
    _exports.hashSync = hashSync;
    _exports.setRandomFallback = setRandomFallback;
    _exports.truncates = truncates;
    _crypto = _interopRequireDefault(_crypto);
    function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    /*
   Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
   Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
   Copyright (c) 2025 Daniel Wirtz <dcode@dcode.io>
  
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
   1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
   2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
   3. The name of the author may not be used to endorse or promote products
   derived from this software without specific prior written permission.
  
   THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
   IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
   OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
   IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
   NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
   THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
   THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */ // The Node.js crypto module is used as a fallback for the Web Crypto API. When
    // building for the browser, inclusion of the crypto module should be disabled,
    // which the package hints at in its package.json for bundlers that support it.
    /**
     * The random implementation to use as a fallback.
     * @type {?function(number):!Array.<number>}
     * @inner
     */ var randomFallback = null;
    /**
     * Generates cryptographically secure random bytes.
     * @function
     * @param {number} len Bytes length
     * @returns {!Array.<number>} Random bytes
     * @throws {Error} If no random implementation is available
     * @inner
     */ function randomBytes(len) {
        // Web Crypto API. Globally available in the browser and in Node.js >=23.
        try {
            return crypto.getRandomValues(new Uint8Array(len));
        } catch  {}
        // Node.js crypto module for non-browser environments.
        try {
            return _crypto.default.randomBytes(len);
        } catch  {}
        // Custom fallback specified with `setRandomFallback`.
        if (!randomFallback) {
            throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        }
        return randomFallback(len);
    }
    /**
     * Sets the pseudo random number generator to use as a fallback if neither node's `crypto` module nor the Web Crypto
     *  API is available. Please note: It is highly important that the PRNG used is cryptographically secure and that it
     *  is seeded properly!
     * @param {?function(number):!Array.<number>} random Function taking the number of bytes to generate as its
     *  sole argument, returning the corresponding array of cryptographically secure random byte values.
     * @see http://nodejs.org/api/crypto.html
     * @see http://www.w3.org/TR/WebCryptoAPI/
     */ function setRandomFallback(random) {
        randomFallback = random;
    }
    /**
     * Synchronously generates a salt.
     * @param {number=} rounds Number of rounds to use, defaults to 10 if omitted
     * @param {number=} seed_length Not supported.
     * @returns {string} Resulting salt
     * @throws {Error} If a random fallback is required but not set
     */ function genSaltSync(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== "number") throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
        if (rounds < 4) rounds = 4;
        else if (rounds > 31) rounds = 31;
        var salt = [];
        salt.push("$2b$");
        if (rounds < 10) salt.push("0");
        salt.push(rounds.toString());
        salt.push("$");
        salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
        return salt.join("");
    }
    /**
     * Asynchronously generates a salt.
     * @param {(number|function(Error, string=))=} rounds Number of rounds to use, defaults to 10 if omitted
     * @param {(number|function(Error, string=))=} seed_length Not supported.
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting salt
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     */ function genSalt(rounds, seed_length, callback) {
        if (typeof seed_length === "function") callback = seed_length, seed_length = undefined; // Not supported.
        if (typeof rounds === "function") callback = rounds, rounds = undefined;
        if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== "number") throw Error("illegal arguments: " + typeof rounds);
        function _async(callback) {
            nextTick(function() {
                // Pretty thin, but salting is fast enough
                try {
                    callback(null, genSaltSync(rounds));
                } catch (err) {
                    callback(err);
                }
            });
        }
        if (callback) {
            if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
            _async(callback);
        } else return new Promise(function(resolve, reject) {
            _async(function(err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
    /**
     * Synchronously generates a hash for the given password.
     * @param {string} password Password to hash
     * @param {(number|string)=} salt Salt length to generate or salt to use, default to 10
     * @returns {string} Resulting hash
     */ function hashSync(password, salt) {
        if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === "number") salt = genSaltSync(salt);
        if (typeof password !== "string" || typeof salt !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
        return _hash(password, salt);
    }
    /**
     * Asynchronously generates a hash for the given password.
     * @param {string} password Password to hash
     * @param {number|string} salt Salt length to generate or salt to use
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash
     * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
     *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     */ function hash(password, salt, callback, progressCallback) {
        function _async(callback) {
            if (typeof password === "string" && typeof salt === "number") genSalt(salt, function(err, salt) {
                _hash(password, salt, callback, progressCallback);
            });
            else if (typeof password === "string" && typeof salt === "string") _hash(password, salt, callback, progressCallback);
            else nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof salt)));
        }
        if (callback) {
            if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
            _async(callback);
        } else return new Promise(function(resolve, reject) {
            _async(function(err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
    /**
     * Compares two strings of the same length in constant time.
     * @param {string} known Must be of the correct length
     * @param {string} unknown Must be the same length as `known`
     * @returns {boolean}
     * @inner
     */ function safeStringCompare(known, unknown) {
        var diff = known.length ^ unknown.length;
        for(var i = 0; i < known.length; ++i){
            diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
        }
        return diff === 0;
    }
    /**
     * Synchronously tests a password against a hash.
     * @param {string} password Password to compare
     * @param {string} hash Hash to test against
     * @returns {boolean} true if matching, otherwise false
     * @throws {Error} If an argument is illegal
     */ function compareSync(password, hash) {
        if (typeof password !== "string" || typeof hash !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
        if (hash.length !== 60) return false;
        return safeStringCompare(hashSync(password, hash.substring(0, hash.length - 31)), hash);
    }
    /**
     * Asynchronously tests a password against a hash.
     * @param {string} password Password to compare
     * @param {string} hashValue Hash to test against
     * @param {function(Error, boolean)=} callback Callback receiving the error, if any, otherwise the result
     * @param {function(number)=} progressCallback Callback successively called with the percentage of rounds completed
     *  (0.0 - 1.0), maximally once per `MAX_EXECUTION_TIME = 100` ms.
     * @returns {!Promise} If `callback` has been omitted
     * @throws {Error} If `callback` is present but not a function
     */ function compare(password, hashValue, callback, progressCallback) {
        function _async(callback) {
            if (typeof password !== "string" || typeof hashValue !== "string") {
                nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof hashValue)));
                return;
            }
            if (hashValue.length !== 60) {
                nextTick(callback.bind(this, null, false));
                return;
            }
            hash(password, hashValue.substring(0, 29), function(err, comp) {
                if (err) callback(err);
                else callback(null, safeStringCompare(comp, hashValue));
            }, progressCallback);
        }
        if (callback) {
            if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
            _async(callback);
        } else return new Promise(function(resolve, reject) {
            _async(function(err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
    /**
     * Gets the number of rounds used to encrypt the specified hash.
     * @param {string} hash Hash to extract the used number of rounds from
     * @returns {number} Number of rounds used
     * @throws {Error} If `hash` is not a string
     */ function getRounds(hash) {
        if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
        return parseInt(hash.split("$")[2], 10);
    }
    /**
     * Gets the salt portion from a hash. Does not validate the hash.
     * @param {string} hash Hash to extract the salt from
     * @returns {string} Extracted salt part
     * @throws {Error} If `hash` is not a string or otherwise invalid
     */ function getSalt(hash) {
        if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
        if (hash.length !== 60) throw Error("Illegal hash length: " + hash.length + " != 60");
        return hash.substring(0, 29);
    }
    /**
     * Tests if a password will be truncated when hashed, that is its length is
     * greater than 72 bytes when converted to UTF-8.
     * @param {string} password The password to test
     * @returns {boolean} `true` if truncated, otherwise `false`
     */ function truncates(password) {
        if (typeof password !== "string") throw Error("Illegal arguments: " + typeof password);
        return utf8Length(password) > 72;
    }
    /**
     * Continues with the callback on the next tick.
     * @function
     * @param {function(...[*])} callback Callback to execute
     * @inner
     */ var nextTick = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
    /** Calculates the byte length of a string encoded as UTF8. */ function utf8Length(string) {
        var len = 0, c = 0;
        for(var i = 0; i < string.length; ++i){
            c = string.charCodeAt(i);
            if (c < 128) len += 1;
            else if (c < 2048) len += 2;
            else if ((c & 0xfc00) === 0xd800 && (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
                ++i;
                len += 4;
            } else len += 3;
        }
        return len;
    }
    /** Converts a string to an array of UTF8 bytes. */ function utf8Array(string) {
        var offset = 0, c1, c2;
        var buffer = new Array(utf8Length(string));
        for(var i = 0, k = string.length; i < k; ++i){
            c1 = string.charCodeAt(i);
            if (c1 < 128) {
                buffer[offset++] = c1;
            } else if (c1 < 2048) {
                buffer[offset++] = c1 >> 6 | 192;
                buffer[offset++] = c1 & 63 | 128;
            } else if ((c1 & 0xfc00) === 0xd800 && ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00) {
                c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
                ++i;
                buffer[offset++] = c1 >> 18 | 240;
                buffer[offset++] = c1 >> 12 & 63 | 128;
                buffer[offset++] = c1 >> 6 & 63 | 128;
                buffer[offset++] = c1 & 63 | 128;
            } else {
                buffer[offset++] = c1 >> 12 | 224;
                buffer[offset++] = c1 >> 6 & 63 | 128;
                buffer[offset++] = c1 & 63 | 128;
            }
        }
        return buffer;
    }
    // A base64 implementation for the bcrypt algorithm. This is partly non-standard.
    /**
     * bcrypt's own non-standard base64 dictionary.
     * @type {!Array.<string>}
     * @const
     * @inner
     **/ var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
    /**
     * @type {!Array.<number>}
     * @const
     * @inner
     **/ var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
    ];
    /**
     * Encodes a byte array to base64 with up to len bytes of input.
     * @param {!Array.<number>} b Byte array
     * @param {number} len Maximum input length
     * @returns {string}
     * @inner
     */ function base64_encode(b, len) {
        var off = 0, rs = [], c1, c2;
        if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
        while(off < len){
            c1 = b[off++] & 0xff;
            rs.push(BASE64_CODE[c1 >> 2 & 0x3f]);
            c1 = (c1 & 0x03) << 4;
            if (off >= len) {
                rs.push(BASE64_CODE[c1 & 0x3f]);
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= c2 >> 4 & 0x0f;
            rs.push(BASE64_CODE[c1 & 0x3f]);
            c1 = (c2 & 0x0f) << 2;
            if (off >= len) {
                rs.push(BASE64_CODE[c1 & 0x3f]);
                break;
            }
            c2 = b[off++] & 0xff;
            c1 |= c2 >> 6 & 0x03;
            rs.push(BASE64_CODE[c1 & 0x3f]);
            rs.push(BASE64_CODE[c2 & 0x3f]);
        }
        return rs.join("");
    }
    /**
     * Decodes a base64 encoded string to up to len bytes of output.
     * @param {string} s String to decode
     * @param {number} len Maximum output length
     * @returns {!Array.<number>}
     * @inner
     */ function base64_decode(s, len) {
        var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        if (len <= 0) throw Error("Illegal len: " + len);
        while(off < slen - 1 && olen < len){
            code = s.charCodeAt(off++);
            c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            code = s.charCodeAt(off++);
            c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c1 == -1 || c2 == -1) break;
            o = c1 << 2 >>> 0;
            o |= (c2 & 0x30) >> 4;
            rs.push(String.fromCharCode(o));
            if (++olen >= len || off >= slen) break;
            code = s.charCodeAt(off++);
            c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c3 == -1) break;
            o = (c2 & 0x0f) << 4 >>> 0;
            o |= (c3 & 0x3c) >> 2;
            rs.push(String.fromCharCode(o));
            if (++olen >= len || off >= slen) break;
            code = s.charCodeAt(off++);
            c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            o = (c3 & 0x03) << 6 >>> 0;
            o |= c4;
            rs.push(String.fromCharCode(o));
            ++olen;
        }
        var res = [];
        for(off = 0; off < olen; off++)res.push(rs[off].charCodeAt(0));
        return res;
    }
    /**
     * @type {number}
     * @const
     * @inner
     */ var BCRYPT_SALT_LEN = 16;
    /**
     * @type {number}
     * @const
     * @inner
     */ var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
    /**
     * @type {number}
     * @const
     * @inner
     */ var BLOWFISH_NUM_ROUNDS = 16;
    /**
     * @type {number}
     * @const
     * @inner
     */ var MAX_EXECUTION_TIME = 100;
    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */ var P_ORIG = [
        0x243f6a88,
        0x85a308d3,
        0x13198a2e,
        0x03707344,
        0xa4093822,
        0x299f31d0,
        0x082efa98,
        0xec4e6c89,
        0x452821e6,
        0x38d01377,
        0xbe5466cf,
        0x34e90c6c,
        0xc0ac29b7,
        0xc97c50dd,
        0x3f84d5b5,
        0xb5470917,
        0x9216d5d9,
        0x8979fb1b
    ];
    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */ var S_ORIG = [
        0xd1310ba6,
        0x98dfb5ac,
        0x2ffd72db,
        0xd01adfb7,
        0xb8e1afed,
        0x6a267e96,
        0xba7c9045,
        0xf12c7f99,
        0x24a19947,
        0xb3916cf7,
        0x0801f2e2,
        0x858efc16,
        0x636920d8,
        0x71574e69,
        0xa458fea3,
        0xf4933d7e,
        0x0d95748f,
        0x728eb658,
        0x718bcd58,
        0x82154aee,
        0x7b54a41d,
        0xc25a59b5,
        0x9c30d539,
        0x2af26013,
        0xc5d1b023,
        0x286085f0,
        0xca417918,
        0xb8db38ef,
        0x8e79dcb0,
        0x603a180e,
        0x6c9e0e8b,
        0xb01e8a3e,
        0xd71577c1,
        0xbd314b27,
        0x78af2fda,
        0x55605c60,
        0xe65525f3,
        0xaa55ab94,
        0x57489862,
        0x63e81440,
        0x55ca396a,
        0x2aab10b6,
        0xb4cc5c34,
        0x1141e8ce,
        0xa15486af,
        0x7c72e993,
        0xb3ee1411,
        0x636fbc2a,
        0x2ba9c55d,
        0x741831f6,
        0xce5c3e16,
        0x9b87931e,
        0xafd6ba33,
        0x6c24cf5c,
        0x7a325381,
        0x28958677,
        0x3b8f4898,
        0x6b4bb9af,
        0xc4bfe81b,
        0x66282193,
        0x61d809cc,
        0xfb21a991,
        0x487cac60,
        0x5dec8032,
        0xef845d5d,
        0xe98575b1,
        0xdc262302,
        0xeb651b88,
        0x23893e81,
        0xd396acc5,
        0x0f6d6ff3,
        0x83f44239,
        0x2e0b4482,
        0xa4842004,
        0x69c8f04a,
        0x9e1f9b5e,
        0x21c66842,
        0xf6e96c9a,
        0x670c9c61,
        0xabd388f0,
        0x6a51a0d2,
        0xd8542f68,
        0x960fa728,
        0xab5133a3,
        0x6eef0b6c,
        0x137a3be4,
        0xba3bf050,
        0x7efb2a98,
        0xa1f1651d,
        0x39af0176,
        0x66ca593e,
        0x82430e88,
        0x8cee8619,
        0x456f9fb4,
        0x7d84a5c3,
        0x3b8b5ebe,
        0xe06f75d8,
        0x85c12073,
        0x401a449f,
        0x56c16aa6,
        0x4ed3aa62,
        0x363f7706,
        0x1bfedf72,
        0x429b023d,
        0x37d0d724,
        0xd00a1248,
        0xdb0fead3,
        0x49f1c09b,
        0x075372c9,
        0x80991b7b,
        0x25d479d8,
        0xf6e8def7,
        0xe3fe501a,
        0xb6794c3b,
        0x976ce0bd,
        0x04c006ba,
        0xc1a94fb6,
        0x409f60c4,
        0x5e5c9ec2,
        0x196a2463,
        0x68fb6faf,
        0x3e6c53b5,
        0x1339b2eb,
        0x3b52ec6f,
        0x6dfc511f,
        0x9b30952c,
        0xcc814544,
        0xaf5ebd09,
        0xbee3d004,
        0xde334afd,
        0x660f2807,
        0x192e4bb3,
        0xc0cba857,
        0x45c8740f,
        0xd20b5f39,
        0xb9d3fbdb,
        0x5579c0bd,
        0x1a60320a,
        0xd6a100c6,
        0x402c7279,
        0x679f25fe,
        0xfb1fa3cc,
        0x8ea5e9f8,
        0xdb3222f8,
        0x3c7516df,
        0xfd616b15,
        0x2f501ec8,
        0xad0552ab,
        0x323db5fa,
        0xfd238760,
        0x53317b48,
        0x3e00df82,
        0x9e5c57bb,
        0xca6f8ca0,
        0x1a87562e,
        0xdf1769db,
        0xd542a8f6,
        0x287effc3,
        0xac6732c6,
        0x8c4f5573,
        0x695b27b0,
        0xbbca58c8,
        0xe1ffa35d,
        0xb8f011a0,
        0x10fa3d98,
        0xfd2183b8,
        0x4afcb56c,
        0x2dd1d35b,
        0x9a53e479,
        0xb6f84565,
        0xd28e49bc,
        0x4bfb9790,
        0xe1ddf2da,
        0xa4cb7e33,
        0x62fb1341,
        0xcee4c6e8,
        0xef20cada,
        0x36774c01,
        0xd07e9efe,
        0x2bf11fb4,
        0x95dbda4d,
        0xae909198,
        0xeaad8e71,
        0x6b93d5a0,
        0xd08ed1d0,
        0xafc725e0,
        0x8e3c5b2f,
        0x8e7594b7,
        0x8ff6e2fb,
        0xf2122b64,
        0x8888b812,
        0x900df01c,
        0x4fad5ea0,
        0x688fc31c,
        0xd1cff191,
        0xb3a8c1ad,
        0x2f2f2218,
        0xbe0e1777,
        0xea752dfe,
        0x8b021fa1,
        0xe5a0cc0f,
        0xb56f74e8,
        0x18acf3d6,
        0xce89e299,
        0xb4a84fe0,
        0xfd13e0b7,
        0x7cc43b81,
        0xd2ada8d9,
        0x165fa266,
        0x80957705,
        0x93cc7314,
        0x211a1477,
        0xe6ad2065,
        0x77b5fa86,
        0xc75442f5,
        0xfb9d35cf,
        0xebcdaf0c,
        0x7b3e89a0,
        0xd6411bd3,
        0xae1e7e49,
        0x00250e2d,
        0x2071b35e,
        0x226800bb,
        0x57b8e0af,
        0x2464369b,
        0xf009b91e,
        0x5563911d,
        0x59dfa6aa,
        0x78c14389,
        0xd95a537f,
        0x207d5ba2,
        0x02e5b9c5,
        0x83260376,
        0x6295cfa9,
        0x11c81968,
        0x4e734a41,
        0xb3472dca,
        0x7b14a94a,
        0x1b510052,
        0x9a532915,
        0xd60f573f,
        0xbc9bc6e4,
        0x2b60a476,
        0x81e67400,
        0x08ba6fb5,
        0x571be91f,
        0xf296ec6b,
        0x2a0dd915,
        0xb6636521,
        0xe7b9f9b6,
        0xff34052e,
        0xc5855664,
        0x53b02d5d,
        0xa99f8fa1,
        0x08ba4799,
        0x6e85076a,
        0x4b7a70e9,
        0xb5b32944,
        0xdb75092e,
        0xc4192623,
        0xad6ea6b0,
        0x49a7df7d,
        0x9cee60b8,
        0x8fedb266,
        0xecaa8c71,
        0x699a17ff,
        0x5664526c,
        0xc2b19ee1,
        0x193602a5,
        0x75094c29,
        0xa0591340,
        0xe4183a3e,
        0x3f54989a,
        0x5b429d65,
        0x6b8fe4d6,
        0x99f73fd6,
        0xa1d29c07,
        0xefe830f5,
        0x4d2d38e6,
        0xf0255dc1,
        0x4cdd2086,
        0x8470eb26,
        0x6382e9c6,
        0x021ecc5e,
        0x09686b3f,
        0x3ebaefc9,
        0x3c971814,
        0x6b6a70a1,
        0x687f3584,
        0x52a0e286,
        0xb79c5305,
        0xaa500737,
        0x3e07841c,
        0x7fdeae5c,
        0x8e7d44ec,
        0x5716f2b8,
        0xb03ada37,
        0xf0500c0d,
        0xf01c1f04,
        0x0200b3ff,
        0xae0cf51a,
        0x3cb574b2,
        0x25837a58,
        0xdc0921bd,
        0xd19113f9,
        0x7ca92ff6,
        0x94324773,
        0x22f54701,
        0x3ae5e581,
        0x37c2dadc,
        0xc8b57634,
        0x9af3dda7,
        0xa9446146,
        0x0fd0030e,
        0xecc8c73e,
        0xa4751e41,
        0xe238cd99,
        0x3bea0e2f,
        0x3280bba1,
        0x183eb331,
        0x4e548b38,
        0x4f6db908,
        0x6f420d03,
        0xf60a04bf,
        0x2cb81290,
        0x24977c79,
        0x5679b072,
        0xbcaf89af,
        0xde9a771f,
        0xd9930810,
        0xb38bae12,
        0xdccf3f2e,
        0x5512721f,
        0x2e6b7124,
        0x501adde6,
        0x9f84cd87,
        0x7a584718,
        0x7408da17,
        0xbc9f9abc,
        0xe94b7d8c,
        0xec7aec3a,
        0xdb851dfa,
        0x63094366,
        0xc464c3d2,
        0xef1c1847,
        0x3215d908,
        0xdd433b37,
        0x24c2ba16,
        0x12a14d43,
        0x2a65c451,
        0x50940002,
        0x133ae4dd,
        0x71dff89e,
        0x10314e55,
        0x81ac77d6,
        0x5f11199b,
        0x043556f1,
        0xd7a3c76b,
        0x3c11183b,
        0x5924a509,
        0xf28fe6ed,
        0x97f1fbfa,
        0x9ebabf2c,
        0x1e153c6e,
        0x86e34570,
        0xeae96fb1,
        0x860e5e0a,
        0x5a3e2ab3,
        0x771fe71c,
        0x4e3d06fa,
        0x2965dcb9,
        0x99e71d0f,
        0x803e89d6,
        0x5266c825,
        0x2e4cc978,
        0x9c10b36a,
        0xc6150eba,
        0x94e2ea78,
        0xa5fc3c53,
        0x1e0a2df4,
        0xf2f74ea7,
        0x361d2b3d,
        0x1939260f,
        0x19c27960,
        0x5223a708,
        0xf71312b6,
        0xebadfe6e,
        0xeac31f66,
        0xe3bc4595,
        0xa67bc883,
        0xb17f37d1,
        0x018cff28,
        0xc332ddef,
        0xbe6c5aa5,
        0x65582185,
        0x68ab9802,
        0xeecea50f,
        0xdb2f953b,
        0x2aef7dad,
        0x5b6e2f84,
        0x1521b628,
        0x29076170,
        0xecdd4775,
        0x619f1510,
        0x13cca830,
        0xeb61bd96,
        0x0334fe1e,
        0xaa0363cf,
        0xb5735c90,
        0x4c70a239,
        0xd59e9e0b,
        0xcbaade14,
        0xeecc86bc,
        0x60622ca7,
        0x9cab5cab,
        0xb2f3846e,
        0x648b1eaf,
        0x19bdf0ca,
        0xa02369b9,
        0x655abb50,
        0x40685a32,
        0x3c2ab4b3,
        0x319ee9d5,
        0xc021b8f7,
        0x9b540b19,
        0x875fa099,
        0x95f7997e,
        0x623d7da8,
        0xf837889a,
        0x97e32d77,
        0x11ed935f,
        0x16681281,
        0x0e358829,
        0xc7e61fd6,
        0x96dedfa1,
        0x7858ba99,
        0x57f584a5,
        0x1b227263,
        0x9b83c3ff,
        0x1ac24696,
        0xcdb30aeb,
        0x532e3054,
        0x8fd948e4,
        0x6dbc3128,
        0x58ebf2ef,
        0x34c6ffea,
        0xfe28ed61,
        0xee7c3c73,
        0x5d4a14d9,
        0xe864b7e3,
        0x42105d14,
        0x203e13e0,
        0x45eee2b6,
        0xa3aaabea,
        0xdb6c4f15,
        0xfacb4fd0,
        0xc742f442,
        0xef6abbb5,
        0x654f3b1d,
        0x41cd2105,
        0xd81e799e,
        0x86854dc7,
        0xe44b476a,
        0x3d816250,
        0xcf62a1f2,
        0x5b8d2646,
        0xfc8883a0,
        0xc1c7b6a3,
        0x7f1524c3,
        0x69cb7492,
        0x47848a0b,
        0x5692b285,
        0x095bbf00,
        0xad19489d,
        0x1462b174,
        0x23820e00,
        0x58428d2a,
        0x0c55f5ea,
        0x1dadf43e,
        0x233f7061,
        0x3372f092,
        0x8d937e41,
        0xd65fecf1,
        0x6c223bdb,
        0x7cde3759,
        0xcbee7460,
        0x4085f2a7,
        0xce77326e,
        0xa6078084,
        0x19f8509e,
        0xe8efd855,
        0x61d99735,
        0xa969a7aa,
        0xc50c06c2,
        0x5a04abfc,
        0x800bcadc,
        0x9e447a2e,
        0xc3453484,
        0xfdd56705,
        0x0e1e9ec9,
        0xdb73dbd3,
        0x105588cd,
        0x675fda79,
        0xe3674340,
        0xc5c43465,
        0x713e38d8,
        0x3d28f89e,
        0xf16dff20,
        0x153e21e7,
        0x8fb03d4a,
        0xe6e39f2b,
        0xdb83adf7,
        0xe93d5a68,
        0x948140f7,
        0xf64c261c,
        0x94692934,
        0x411520f7,
        0x7602d4f7,
        0xbcf46b2e,
        0xd4a20068,
        0xd4082471,
        0x3320f46a,
        0x43b7d4b7,
        0x500061af,
        0x1e39f62e,
        0x97244546,
        0x14214f74,
        0xbf8b8840,
        0x4d95fc1d,
        0x96b591af,
        0x70f4ddd3,
        0x66a02f45,
        0xbfbc09ec,
        0x03bd9785,
        0x7fac6dd0,
        0x31cb8504,
        0x96eb27b3,
        0x55fd3941,
        0xda2547e6,
        0xabca0a9a,
        0x28507825,
        0x530429f4,
        0x0a2c86da,
        0xe9b66dfb,
        0x68dc1462,
        0xd7486900,
        0x680ec0a4,
        0x27a18dee,
        0x4f3ffea2,
        0xe887ad8c,
        0xb58ce006,
        0x7af4d6b6,
        0xaace1e7c,
        0xd3375fec,
        0xce78a399,
        0x406b2a42,
        0x20fe9e35,
        0xd9f385b9,
        0xee39d7ab,
        0x3b124e8b,
        0x1dc9faf7,
        0x4b6d1856,
        0x26a36631,
        0xeae397b2,
        0x3a6efa74,
        0xdd5b4332,
        0x6841e7f7,
        0xca7820fb,
        0xfb0af54e,
        0xd8feb397,
        0x454056ac,
        0xba489527,
        0x55533a3a,
        0x20838d87,
        0xfe6ba9b7,
        0xd096954b,
        0x55a867bc,
        0xa1159a58,
        0xcca92963,
        0x99e1db33,
        0xa62a4a56,
        0x3f3125f9,
        0x5ef47e1c,
        0x9029317c,
        0xfdf8e802,
        0x04272f70,
        0x80bb155c,
        0x05282ce3,
        0x95c11548,
        0xe4c66d22,
        0x48c1133f,
        0xc70f86dc,
        0x07f9c9ee,
        0x41041f0f,
        0x404779a4,
        0x5d886e17,
        0x325f51eb,
        0xd59bc0d1,
        0xf2bcc18f,
        0x41113564,
        0x257b7834,
        0x602a9c60,
        0xdff8e8a3,
        0x1f636c1b,
        0x0e12b4c2,
        0x02e1329e,
        0xaf664fd1,
        0xcad18115,
        0x6b2395e0,
        0x333e92e1,
        0x3b240b62,
        0xeebeb922,
        0x85b2a20e,
        0xe6ba0d99,
        0xde720c8c,
        0x2da2f728,
        0xd0127845,
        0x95b794fd,
        0x647d0862,
        0xe7ccf5f0,
        0x5449a36f,
        0x877d48fa,
        0xc39dfd27,
        0xf33e8d1e,
        0x0a476341,
        0x992eff74,
        0x3a6f6eab,
        0xf4f8fd37,
        0xa812dc60,
        0xa1ebddf8,
        0x991be14c,
        0xdb6e6b0d,
        0xc67b5510,
        0x6d672c37,
        0x2765d43b,
        0xdcd0e804,
        0xf1290dc7,
        0xcc00ffa3,
        0xb5390f92,
        0x690fed0b,
        0x667b9ffb,
        0xcedb7d9c,
        0xa091cf0b,
        0xd9155ea3,
        0xbb132f88,
        0x515bad24,
        0x7b9479bf,
        0x763bd6eb,
        0x37392eb3,
        0xcc115979,
        0x8026e297,
        0xf42e312d,
        0x6842ada7,
        0xc66a2b3b,
        0x12754ccc,
        0x782ef11c,
        0x6a124237,
        0xb79251e7,
        0x06a1bbe6,
        0x4bfb6350,
        0x1a6b1018,
        0x11caedfa,
        0x3d25bdd8,
        0xe2e1c3c9,
        0x44421659,
        0x0a121386,
        0xd90cec6e,
        0xd5abea2a,
        0x64af674e,
        0xda86a85f,
        0xbebfe988,
        0x64e4c3fe,
        0x9dbc8057,
        0xf0f7c086,
        0x60787bf8,
        0x6003604d,
        0xd1fd8346,
        0xf6381fb0,
        0x7745ae04,
        0xd736fccc,
        0x83426b33,
        0xf01eab71,
        0xb0804187,
        0x3c005e5f,
        0x77a057be,
        0xbde8ae24,
        0x55464299,
        0xbf582e61,
        0x4e58f48f,
        0xf2ddfda2,
        0xf474ef38,
        0x8789bdc2,
        0x5366f9c3,
        0xc8b38e74,
        0xb475f255,
        0x46fcd9b9,
        0x7aeb2661,
        0x8b1ddf84,
        0x846a0e79,
        0x915f95e2,
        0x466e598e,
        0x20b45770,
        0x8cd55591,
        0xc902de4c,
        0xb90bace1,
        0xbb8205d0,
        0x11a86248,
        0x7574a99e,
        0xb77f19b6,
        0xe0a9dc09,
        0x662d09a1,
        0xc4324633,
        0xe85a1f02,
        0x09f0be8c,
        0x4a99a025,
        0x1d6efe10,
        0x1ab93d1d,
        0x0ba5a4df,
        0xa186f20f,
        0x2868f169,
        0xdcb7da83,
        0x573906fe,
        0xa1e2ce9b,
        0x4fcd7f52,
        0x50115e01,
        0xa70683fa,
        0xa002b5c4,
        0x0de6d027,
        0x9af88c27,
        0x773f8641,
        0xc3604c06,
        0x61a806b5,
        0xf0177a28,
        0xc0f586e0,
        0x006058aa,
        0x30dc7d62,
        0x11e69ed7,
        0x2338ea63,
        0x53c2dd94,
        0xc2c21634,
        0xbbcbee56,
        0x90bcb6de,
        0xebfc7da1,
        0xce591d76,
        0x6f05e409,
        0x4b7c0188,
        0x39720a3d,
        0x7c927c24,
        0x86e3725f,
        0x724d9db9,
        0x1ac15bb4,
        0xd39eb8fc,
        0xed545578,
        0x08fca5b5,
        0xd83d7cd3,
        0x4dad0fc4,
        0x1e50ef5e,
        0xb161e6f8,
        0xa28514d9,
        0x6c51133c,
        0x6fd5c7e7,
        0x56e14ec4,
        0x362abfce,
        0xddc6c837,
        0xd79a3234,
        0x92638212,
        0x670efa8e,
        0x406000e0,
        0x3a39ce37,
        0xd3faf5cf,
        0xabc27737,
        0x5ac52d1b,
        0x5cb0679e,
        0x4fa33742,
        0xd3822740,
        0x99bc9bbe,
        0xd5118e9d,
        0xbf0f7315,
        0xd62d1c7e,
        0xc700c47b,
        0xb78c1b6b,
        0x21a19045,
        0xb26eb1be,
        0x6a366eb4,
        0x5748ab2f,
        0xbc946e79,
        0xc6a376d2,
        0x6549c2c8,
        0x530ff8ee,
        0x468dde7d,
        0xd5730a1d,
        0x4cd04dc6,
        0x2939bbdb,
        0xa9ba4650,
        0xac9526e8,
        0xbe5ee304,
        0xa1fad5f0,
        0x6a2d519a,
        0x63ef8ce2,
        0x9a86ee22,
        0xc089c2b8,
        0x43242ef6,
        0xa51e03aa,
        0x9cf2d0a4,
        0x83c061ba,
        0x9be96a4d,
        0x8fe51550,
        0xba645bd6,
        0x2826a2f9,
        0xa73a3ae1,
        0x4ba99586,
        0xef5562e9,
        0xc72fefd3,
        0xf752f7da,
        0x3f046f69,
        0x77fa0a59,
        0x80e4a915,
        0x87b08601,
        0x9b09e6ad,
        0x3b3ee593,
        0xe990fd5a,
        0x9e34d797,
        0x2cf0b7d9,
        0x022b8b51,
        0x96d5ac3a,
        0x017da67d,
        0xd1cf3ed6,
        0x7c7d2d28,
        0x1f9f25cf,
        0xadf2b89b,
        0x5ad6b472,
        0x5a88f54c,
        0xe029ac71,
        0xe019a5e6,
        0x47b0acfd,
        0xed93fa9b,
        0xe8d3c48d,
        0x283b57cc,
        0xf8d56629,
        0x79132e28,
        0x785f0191,
        0xed756055,
        0xf7960e44,
        0xe3d35e8c,
        0x15056dd4,
        0x88f46dba,
        0x03a16125,
        0x0564f0bd,
        0xc3eb9e15,
        0x3c9057a2,
        0x97271aec,
        0xa93a072a,
        0x1b3f6d9b,
        0x1e6321f5,
        0xf59c66fb,
        0x26dcf319,
        0x7533d928,
        0xb155fdf5,
        0x03563482,
        0x8aba3cbb,
        0x28517711,
        0xc20ad9f8,
        0xabcc5167,
        0xccad925f,
        0x4de81751,
        0x3830dc8e,
        0x379d5862,
        0x9320f991,
        0xea7a90c2,
        0xfb3e7bce,
        0x5121ce64,
        0x774fbe32,
        0xa8b6e37e,
        0xc3293d46,
        0x48de5369,
        0x6413e680,
        0xa2ae0810,
        0xdd6db224,
        0x69852dfd,
        0x09072166,
        0xb39a460a,
        0x6445c0dd,
        0x586cdecf,
        0x1c20c8ae,
        0x5bbef7dd,
        0x1b588d40,
        0xccd2017f,
        0x6bb4e3bb,
        0xdda26a7e,
        0x3a59ff45,
        0x3e350a44,
        0xbcb4cdd5,
        0x72eacea8,
        0xfa6484bb,
        0x8d6612ae,
        0xbf3c6f47,
        0xd29be463,
        0x542f5d9e,
        0xaec2771b,
        0xf64e6370,
        0x740e0d8d,
        0xe75b1357,
        0xf8721671,
        0xaf537d5d,
        0x4040cb08,
        0x4eb4e2cc,
        0x34d2466a,
        0x0115af84,
        0xe1b00428,
        0x95983a1d,
        0x06b89fb4,
        0xce6ea048,
        0x6f3f3b82,
        0x3520ab82,
        0x011a1d4b,
        0x277227f8,
        0x611560b1,
        0xe7933fdc,
        0xbb3a792b,
        0x344525bd,
        0xa08839e1,
        0x51ce794b,
        0x2f32c9b7,
        0xa01fbac9,
        0xe01cc87e,
        0xbcc7d1f6,
        0xcf0111c3,
        0xa1e8aac7,
        0x1a908749,
        0xd44fbd9a,
        0xd0dadecb,
        0xd50ada38,
        0x0339c32a,
        0xc6913667,
        0x8df9317c,
        0xe0b12b4f,
        0xf79e59b7,
        0x43f5bb3a,
        0xf2d519ff,
        0x27d9459c,
        0xbf97222c,
        0x15e6fc2a,
        0x0f91fc71,
        0x9b941525,
        0xfae59361,
        0xceb69ceb,
        0xc2a86459,
        0x12baa8d1,
        0xb6c1075e,
        0xe3056a0c,
        0x10d25065,
        0xcb03a442,
        0xe0ec6e0e,
        0x1698db3b,
        0x4c98a0be,
        0x3278e964,
        0x9f1f9532,
        0xe0d392df,
        0xd3a0342b,
        0x8971f21e,
        0x1b0a7441,
        0x4ba3348c,
        0xc5be7120,
        0xc37632d8,
        0xdf359f8d,
        0x9b992f2e,
        0xe60b6f47,
        0x0fe3f11d,
        0xe54cda54,
        0x1edad891,
        0xce6279cf,
        0xcd3e7e6f,
        0x1618b166,
        0xfd2c1d05,
        0x848fd2c5,
        0xf6fb2299,
        0xf523f357,
        0xa6327623,
        0x93a83531,
        0x56cccd02,
        0xacf08162,
        0x5a75ebb5,
        0x6e163697,
        0x88d273cc,
        0xde966292,
        0x81b949d0,
        0x4c50901b,
        0x71c65614,
        0xe6c6c7bd,
        0x327a140a,
        0x45e1d006,
        0xc3f27b9a,
        0xc9aa53fd,
        0x62a80f00,
        0xbb25bfe2,
        0x35bdd2f6,
        0x71126905,
        0xb2040222,
        0xb6cbcf7c,
        0xcd769c2b,
        0x53113ec0,
        0x1640e3d3,
        0x38abbd60,
        0x2547adf0,
        0xba38209c,
        0xf746ce76,
        0x77afa1c5,
        0x20756060,
        0x85cbfe4e,
        0x8ae88dd8,
        0x7aaaf9b0,
        0x4cf9aa7e,
        0x1948c25c,
        0x02fb8a8c,
        0x01c36ae4,
        0xd6ebe1f9,
        0x90d4f869,
        0xa65cdea0,
        0x3f09252d,
        0xc208e69f,
        0xb74e6132,
        0xce77e25b,
        0x578fdfe3,
        0x3ac372e6
    ];
    /**
     * @type {Array.<number>}
     * @const
     * @inner
     */ var C_ORIG = [
        0x4f727068,
        0x65616e42,
        0x65686f6c,
        0x64657253,
        0x63727944,
        0x6f756274
    ];
    /**
     * @param {Array.<number>} lr
     * @param {number} off
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @returns {Array.<number>}
     * @inner
     */ function _encipher(lr, off, P, S) {
        // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
        var n, l = lr[off], r = lr[off + 1];
        l ^= P[0];
        /*
      for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
          // Feistel substitution on left word
          n  = S[l >>> 24],
          n += S[0x100 | ((l >> 16) & 0xff)],
          n ^= S[0x200 | ((l >> 8) & 0xff)],
          n += S[0x300 | (l & 0xff)],
          r ^= n ^ P[++i],
          // Feistel substitution on right word
          n  = S[r >>> 24],
          n += S[0x100 | ((r >> 16) & 0xff)],
          n ^= S[0x200 | ((r >> 8) & 0xff)],
          n += S[0x300 | (r & 0xff)],
          l ^= n ^ P[++i];
      */ //The following is an unrolled version of the above loop.
        //Iteration 0
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[2];
        //Iteration 1
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[4];
        //Iteration 2
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[6];
        //Iteration 3
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[8];
        //Iteration 4
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[10];
        //Iteration 5
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[12];
        //Iteration 6
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[14];
        //Iteration 7
        n = S[l >>> 24];
        n += S[0x100 | l >> 16 & 0xff];
        n ^= S[0x200 | l >> 8 & 0xff];
        n += S[0x300 | l & 0xff];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[0x100 | r >> 16 & 0xff];
        n ^= S[0x200 | r >> 8 & 0xff];
        n += S[0x300 | r & 0xff];
        l ^= n ^ P[16];
        lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off + 1] = l;
        return lr;
    }
    /**
     * @param {Array.<number>} data
     * @param {number} offp
     * @returns {{key: number, offp: number}}
     * @inner
     */ function _streamtoword(data, offp) {
        for(var i = 0, word = 0; i < 4; ++i)word = word << 8 | data[offp] & 0xff, offp = (offp + 1) % data.length;
        return {
            key: word,
            offp: offp
        };
    }
    /**
     * @param {Array.<number>} key
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @inner
     */ function _key(key, P, S) {
        var offset = 0, lr = [
            0,
            0
        ], plen = P.length, slen = S.length, sw;
        for(var i = 0; i < plen; i++)sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
        for(i = 0; i < plen; i += 2)lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for(i = 0; i < slen; i += 2)lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
    }
    /**
     * Expensive key schedule Blowfish.
     * @param {Array.<number>} data
     * @param {Array.<number>} key
     * @param {Array.<number>} P
     * @param {Array.<number>} S
     * @inner
     */ function _ekskey(data, key, P, S) {
        var offp = 0, lr = [
            0,
            0
        ], plen = P.length, slen = S.length, sw;
        for(var i = 0; i < plen; i++)sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
        offp = 0;
        for(i = 0; i < plen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for(i = 0; i < slen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
    }
    /**
     * Internaly crypts a string.
     * @param {Array.<number>} b Bytes to crypt
     * @param {Array.<number>} salt Salt bytes to use
     * @param {number} rounds Number of rounds
     * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
     *  omitted, the operation will be performed synchronously.
     *  @param {function(number)=} progressCallback Callback called with the current progress
     * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
     * @inner
     */ function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(), clen = cdata.length, err;
        // Validate
        if (rounds < 4 || rounds > 31) {
            err = Error("Illegal number of rounds (4-31): " + rounds);
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
            err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        rounds = 1 << rounds >>> 0;
        var P, S, i = 0, j;
        //Use typed arrays when available - huge speedup!
        if (typeof Int32Array === "function") {
            P = new Int32Array(P_ORIG);
            S = new Int32Array(S_ORIG);
        } else {
            P = P_ORIG.slice();
            S = S_ORIG.slice();
        }
        _ekskey(salt, b, P, S);
        /**
       * Calcualtes the next round.
       * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
       * @inner
       */ function next() {
            if (progressCallback) progressCallback(i / rounds);
            if (i < rounds) {
                var start = Date.now();
                for(; i < rounds;){
                    i = i + 1;
                    _key(b, P, S);
                    _key(salt, P, S);
                    if (Date.now() - start > MAX_EXECUTION_TIME) break;
                }
            } else {
                for(i = 0; i < 64; i++)for(j = 0; j < clen >> 1; j++)_encipher(cdata, j << 1, P, S);
                var ret = [];
                for(i = 0; i < clen; i++)ret.push((cdata[i] >> 24 & 0xff) >>> 0), ret.push((cdata[i] >> 16 & 0xff) >>> 0), ret.push((cdata[i] >> 8 & 0xff) >>> 0), ret.push((cdata[i] & 0xff) >>> 0);
                if (callback) {
                    callback(null, ret);
                    return;
                } else return ret;
            }
            if (callback) nextTick(next);
        }
        // Async
        if (typeof callback !== "undefined") {
            next();
        // Sync
        } else {
            var res;
            while(true)if (typeof (res = next()) !== "undefined") return res || [];
        }
    }
    /**
     * Internally hashes a password.
     * @param {string} password Password to hash
     * @param {?string} salt Salt to use, actually never null
     * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
     *  hashing is performed synchronously.
     *  @param {function(number)=} progressCallback Callback called with the current progress
     * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
     * @inner
     */ function _hash(password, salt, callback, progressCallback) {
        var err;
        if (typeof password !== "string" || typeof salt !== "string") {
            err = Error("Invalid string / salt: Not a string");
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        // Validate the salt
        var minor, offset;
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
            err = Error("Invalid salt version: " + salt.substring(0, 2));
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
        else {
            minor = salt.charAt(2);
            if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
                err = Error("Invalid salt revision: " + salt.substring(2, 4));
                if (callback) {
                    nextTick(callback.bind(this, err));
                    return;
                } else throw err;
            }
            offset = 4;
        }
        // Extract number of rounds
        if (salt.charAt(offset + 2) > "$") {
            err = Error("Missing salt rounds");
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
        password += minor >= "a" ? "\x00" : "";
        var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        /**
       * Finishes hashing.
       * @param {Array.<number>} bytes Byte array
       * @returns {string}
       * @inner
       */ function finish(bytes) {
            var res = [];
            res.push("$2");
            if (minor >= "a") res.push(minor);
            res.push("$");
            if (rounds < 10) res.push("0");
            res.push(rounds.toString());
            res.push("$");
            res.push(base64_encode(saltb, saltb.length));
            res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
            return res.join("");
        }
        // Sync
        if (typeof callback == "undefined") return finish(_crypt(passwordb, saltb, rounds));
        else {
            _crypt(passwordb, saltb, rounds, function(err, bytes) {
                if (err) callback(err, null);
                else callback(null, finish(bytes));
            }, progressCallback);
        }
    }
    /**
     * Encodes a byte array to base64 with up to len bytes of input, using the custom bcrypt alphabet.
     * @function
     * @param {!Array.<number>} bytes Byte array
     * @param {number} length Maximum input length
     * @returns {string}
     */ function encodeBase64(bytes, length) {
        return base64_encode(bytes, length);
    }
    /**
     * Decodes a base64 encoded string to up to len bytes of output, using the custom bcrypt alphabet.
     * @function
     * @param {string} string String to decode
     * @param {number} length Maximum output length
     * @returns {!Array.<number>}
     */ function decodeBase64(string, length) {
        return base64_decode(string, length);
    }
    var _default = _exports.default = {
        setRandomFallback,
        genSaltSync,
        genSalt,
        hashSync,
        hash,
        compareSync,
        compare,
        getRounds,
        getSalt,
        truncates,
        encodeBase64,
        decodeBase64
    };
});
}}),
"[project]/node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "HTTPAccessErrorStatus": (()=>HTTPAccessErrorStatus),
    "HTTP_ERROR_FALLBACK_ERROR_CODE": (()=>HTTP_ERROR_FALLBACK_ERROR_CODE),
    "getAccessFallbackErrorTypeByStatus": (()=>getAccessFallbackErrorTypeByStatus),
    "getAccessFallbackHTTPStatus": (()=>getAccessFallbackHTTPStatus),
    "isHTTPAccessFallbackError": (()=>isHTTPAccessFallbackError)
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
} //# sourceMappingURL=http-access-fallback.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RedirectStatusCode": (()=>RedirectStatusCode)
});
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({}); //# sourceMappingURL=redirect-status-code.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/redirect-error.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "REDIRECT_ERROR_CODE": (()=>REDIRECT_ERROR_CODE),
    "RedirectType": (()=>RedirectType),
    "isRedirectError": (()=>isRedirectError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/redirect-status-code.js [middleware-edge] (ecmascript)");
;
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$status$2d$code$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RedirectStatusCode"];
} //# sourceMappingURL=redirect-error.js.map
}}),
"[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "isNextRouterError": (()=>isNextRouterError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/http-access-fallback/http-access-fallback.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/redirect-error.js [middleware-edge] (ecmascript)");
;
;
function isNextRouterError(error) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$redirect$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isRedirectError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$http$2d$access$2d$fallback$2f$http$2d$access$2d$fallback$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isHTTPAccessFallbackError"])(error);
} //# sourceMappingURL=is-next-router-error.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \"[project]/middleware.ts [middleware-edge] (ecmascript)\" } [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>nHandler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/globals.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/adapter.js [middleware-edge] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/middleware.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/is-next-router-error.js [middleware-edge] (ecmascript)");
;
;
;
;
;
const mod = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__
};
const handler = mod.middleware || mod.default;
const page = "/middleware";
if (typeof handler !== 'function') {
    throw Object.defineProperty(new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", {
        value: "E120",
        enumerable: false,
        configurable: true
    });
}
// Middleware will only sent out the FetchEvent to next server,
// so load instrumentation module here and track the error inside middleware module.
function errorHandledHandler(fn) {
    return async (...args)=>{
        try {
            return await fn(...args);
        } catch (err) {
            // In development, error the navigation API usage in runtime,
            // since it's not allowed to be used in middleware as it's outside of react component tree.
            if ("TURBOPACK compile-time truthy", 1) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$is$2d$next$2d$router$2d$error$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isNextRouterError"])(err)) {
                    err.message = `Next.js navigation API is not allowed to be used in Middleware.`;
                    throw err;
                }
            }
            const req = args[0];
            const url = new URL(req.url);
            const resource = url.pathname + url.search;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$globals$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["edgeInstrumentationOnRequestError"])(err, {
                path: resource,
                method: req.method,
                headers: Object.fromEntries(req.headers.entries())
            }, {
                routerKind: 'Pages Router',
                routePath: '/middleware',
                routeType: 'middleware',
                revalidateReason: undefined
            });
            throw err;
        }
    };
}
function nHandler(opts) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$adapter$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["adapter"])({
        ...opts,
        page,
        handler: errorHandledHandler(handler)
    });
} //# sourceMappingURL=middleware.js.map
}}),
"[project]/edge-wrapper.js { MODULE => \"[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\\"[project]/middleware.ts [middleware-edge] (ecmascript)\\\" } [middleware-edge] (ecmascript)\" } [middleware-edge] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
self._ENTRIES ||= {};
const modProm = Promise.resolve().then(()=>__turbopack_context__.i('[project]/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => "[project]/middleware.ts [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)'));
modProm.catch(()=>{});
self._ENTRIES["middleware_middleware"] = new Proxy(modProm, {
    get (modProm, name) {
        if (name === "then") {
            return (res, rej)=>modProm.then(res, rej);
        }
        let result = (...args)=>modProm.then((mod)=>(0, mod[name])(...args));
        result.then = (res, rej)=>modProm.then((mod)=>mod[name]).then(res, rej);
        return result;
    }
});
}}),
}]);

//# sourceMappingURL=_dfea4c57._.js.map