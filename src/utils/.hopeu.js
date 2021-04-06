(function (window, undefined) {
    var readyList,
        roothopeU,
        core_strundefined = typeof undefined,
        document = window.document,
        location = window.location,
        _hopeU = window.hopeU,
        class2type = {},
        core_deletedIds = [],
        core_version = "1.0.0",
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim,
        hopeU = function (selector, context) {
            return new hopeU.fn.init(selector, context, roothopeU);
        },
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        core_rnotwhite = /\S+/g,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        },
        completed = function (event) {
            if (
                document.addEventListener ||
                event.type === "load" ||
                document.readyState === "complete"
            ) {
                detach();
                hopeU.ready();
            }
        },
        detach = function () {
            if (document.addEventListener) {
                document.removeEventListener(
                    "DOMContentLoaded",
                    completed,
                    false
                );
                window.removeEventListener("load", completed, false);
            } else {
                document.detachEvent("onreadystatechange", completed);
                window.detachEvent("onload", completed);
            }
        };
    hopeU.fn = hopeU.prototype = {
        hopeu: core_version,
        constructor: hopeU,
        init: function (selector, context, roothopeU) {
            var match, elem;
            if (!selector) {
                return this;
            }
            if (typeof selector === "string") {
                if (
                    selector.charAt(0) === "<" &&
                    selector.charAt(selector.length - 1) === ">" &&
                    selector.length >= 3
                ) {
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context =
                            context instanceof hopeU ? context[0] : context;
                        hopeU.merge(
                            this,
                            hopeU.parseHTML(
                                match[1],
                                context && context.nodeType
                                    ? context.ownerDocument || context
                                    : document,
                                true
                            )
                        );
                        if (
                            rsingleTag.test(match[1]) &&
                            hopeU.isPlainObject(context)
                        ) {
                            for (match in context) {
                                if (hopeU.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return roothopeU.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.hopeu) {
                    return (context || roothopeU).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (hopeU.isFunction(selector)) {
                return roothopeU.ready(selector);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return hopeU.makeArray(selector, this);
        },
        selector: "",
        length: 0,
        size: function () {
            return this.length;
        },
        toArray: function () {
            return core_slice.call(this);
        },
        get: function (num) {
            return num == null
                ? this.toArray()
                : num < 0
                ? this[this.length + num]
                : this[num];
        },
        pushStack: function (elems) {
            var ret = hopeU.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function (callback, args) {
            return hopeU.each(this, callback, args);
        },
        ready: function (fn) {
            hopeU.ready.promise().done(fn);
            return this;
        },
        slice: function () {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        map: function (callback) {
            return this.pushStack(
                hopeU.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                })
            );
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice,
    };
    hopeU.fn.init.prototype = hopeU.fn;
    hopeU.extend = hopeU.fn.extend = function () {
        var src,
            copyIsArray,
            copy,
            name,
            options,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !hopeU.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (
                        deep &&
                        copy &&
                        (hopeU.isPlainObject(copy) ||
                            (copyIsArray = hopeU.isArray(copy)))
                    ) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && hopeU.isArray(src) ? src : [];
                        } else {
                            clone = src && hopeU.isPlainObject(src) ? src : {};
                        }
                        target[name] = hopeU.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    hopeU.extend({
        noConflict: function (deep) {
            if (window.$ === hopeU) {
                window.$ = _$;
            }
            if (deep && window.hopeU === hopeU) {
                window.hopeU = _hopeU;
            }
            return hopeU;
        },
        isReady: false,
        readyWait: 1,
        holdReady: function (hold) {
            if (hold) {
                hopeU.readyWait++;
            } else {
                hopeU.ready(true);
            }
        },
        ready: function (wait) {
            if (wait === true ? --hopeU.readyWait : hopeU.isReady) {
                return;
            }
            if (!document.body) {
                return setTimeout(hopeU.ready);
            }
            hopeU.isReady = true;
            if (wait !== true && --hopeU.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [hopeU]);
            if (hopeU.fn.trigger) {
                hopeU(document).trigger("ready").off("ready");
            }
        },
        isFunction: function (obj) {
            return hopeU.type(obj) === "function";
        },
        isArray:
            Array.isArray ||
            function (obj) {
                return hopeU.type(obj) === "array";
            },
        isWindow: function (obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function (obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function"
                ? class2type[core_toString.call(obj)] || "object"
                : typeof obj;
        },
        isPlainObject: function (obj) {
            if (
                !obj ||
                hopeU.type(obj) !== "object" ||
                obj.nodeType ||
                hopeU.isWindow(obj)
            ) {
                return false;
            }
            try {
                if (
                    obj.constructor &&
                    !core_hasOwn.call(obj, "constructor") &&
                    !core_hasOwn.call(
                        obj.constructor.prototype,
                        "isPrototypeOf"
                    )
                ) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {
            }
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        error: function (msg) {
            throw new Error(msg);
        },
        parseHTML: function (data, context, keepScripts) {
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = hopeU.buildFragment([data], context, scripts);
            if (scripts) {
                hopeU(scripts).remove();
            }
            return hopeU.merge([], parsed.childNodes);
        },
        parseJSON: function (data) {
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }
            if (data === null) {
                return data;
            }
            if (typeof data === "string") {
                data = hopeU.trim(data);
                if (data) {
                    if (
                        rvalidchars.test(
                            data
                                .replace(rvalidescape, "@")
                                .replace(rvalidtokens, "]")
                                .replace(rvalidbraces, "")
                        )
                    ) {
                        return new Function("return " + data)();
                    }
                }
            }
            hopeU.error("Invalid JSON: " + data);
        },
        parseXML: function (data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (
                !xml ||
                !xml.documentElement ||
                xml.getElementsByTagName("parsererror").length
            ) {
                hopeU.error("Invalid XML: " + data);
            }
            return xml;
        },
        noop: function () {},
        globalEval: function (data) {
            if (data && hopeU.trim(data)) {
                (
                    window.execScript ||
                    function (data) {
                        window["eval"].call(window, data);
                    }
                )(data);
            }
        },
        camelCase: function (string) {
            return string
                .replace(rmsPrefix, "ms-")
                .replace(rdashAlpha, fcamelCase);
        },
        nodeName: function (elem, name) {
            return (
                elem.nodeName &&
                elem.nodeName.toLowerCase() === name.toLowerCase()
            );
        },
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        trim:
            core_trim && !core_trim.call("\uFEFF\xA0")
                ? function (text) {
                      return text == null ? "" : core_trim.call(text);
                  }
                : function (text) {
                      return text == null ? "" : (text + "").replace(rtrim, "");
                  },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    hopeU.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    core_push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i);
                }
                len = arr.length;
                i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }
            return -1;
        },
        merge: function (first, second) {
            var l = second.length,
                i = first.length,
                j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function (elems, callback, inv) {
            var retVal,
                ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i]);
                }
            }
            return ret;
        },
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
            }
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function (fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!hopeU.isFunction(fn)) {
                return undefined;
            }
            args = core_slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(
                    context || this,
                    args.concat(core_slice.call(arguments))
                );
            };
            proxy.guid = fn.guid = fn.guid || hopeU.guid++;
            return proxy;
        },
        access: function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                length = elems.length,
                bulk = key == null;
            if (hopeU.type(key) === "object") {
                chainable = true;
                for (i in key) {
                    hopeU.access(elems, fn, i, key[i], true, emptyGet, raw);
                }
            } else if (value !== undefined) {
                chainable = true;
                if (!hopeU.isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                    } else {
                        bulk = fn;
                        fn = function (elem, key, value) {
                            return bulk.call(hopeU(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(
                            elems[i],
                            key,
                            raw
                                ? value
                                : value.call(elems[i], i, fn(elems[i], key))
                        );
                    }
                }
            }
            return chainable
                ? elems
                : bulk
                ? fn.call(elems)
                : length
                ? fn(elems[0], key)
                : emptyGet;
        },
        now: function () {
            return new Date().getTime();
        },
    });
    hopeU.ready.promise = function (obj) {
        if (!readyList) {
            readyList = hopeU.Deferred();
            if (document.readyState === "complete") {
                setTimeout(hopeU.ready);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            } else {
                document.attachEvent("onreadystatechange", completed);
                window.attachEvent("onload", completed);
                var top = false;
                try {
                    top =
                        window.frameElement == null && document.documentElement;
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!hopeU.isReady) {
                            try {
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }
                            detach();
                            hopeU.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };
    hopeU.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
            " "
        ),
        function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        }
    );

    function isArraylike(obj) {
        var length = obj.length,
            type = hopeU.type(obj);
        if (hopeU.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && length) {
            return true;
        }
        return (
            type === "array" ||
            (type !== "function" &&
                (length === 0 ||
                    (typeof length === "number" &&
                        length > 0 &&
                        length - 1 in obj)))
        );
    }
    roothopeU = hopeU(document);
    var optionsCache = {};

    function createOptions(options) {
        var object = (optionsCache[options] = {});
        hopeU.each(options.match(core_rnotwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }
    hopeU.Callbacks = function (options) {
        options =
            typeof options === "string"
                ? optionsCache[options] || createOptions(options)
                : hopeU.extend({}, options);
        var firing,
            memory,
            fired,
            firingLength,
            firingIndex,
            firingStart,
            list = [],
            stack = !options.once && [],
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (
                        list[firingIndex].apply(data[0], data[1]) === false &&
                        options.stopOnFalse
                    ) {
                        memory = false;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            self = {
                add: function () {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            hopeU.each(args, function (_, arg) {
                                var type = hopeU.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (
                                    arg &&
                                    arg.length &&
                                    type !== "string"
                                ) {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                remove: function () {
                    if (list) {
                        hopeU.each(arguments, function (_, arg) {
                            var index;
                            while (
                                (index = hopeU.inArray(arg, list, index)) > -1
                            ) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                has: function (fn) {
                    return fn
                        ? hopeU.inArray(fn, list) > -1
                        : !!(list && list.length);
                },
                empty: function () {
                    list = [];
                    return this;
                },
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function () {
                    return !stack;
                },
                fireWith: function (context, args) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (list && (!fired || stack)) {
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function () {
                    return !!fired;
                },
            };
        return self;
    };
    hopeU.extend({
        Deferred: function (func) {
            var tuples = [
                    [
                        "resolve",
                        "done",
                        hopeU.Callbacks("once memory"),
                        "resolved",
                    ],
                    [
                        "reject",
                        "fail",
                        hopeU.Callbacks("once memory"),
                        "rejected",
                    ],
                    ["notify", "progress", hopeU.Callbacks("memory")],
                ],
                state = "pending",
                promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function () {
                        var fns = arguments;
                        return hopeU
                            .Deferred(function (newDefer) {
                                hopeU.each(tuples, function (i, tuple) {
                                    var action = tuple[0],
                                        fn = hopeU.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function () {
                                        var returned =
                                            fn && fn.apply(this, arguments);
                                        if (
                                            returned &&
                                            hopeU.isFunction(returned.promise)
                                        ) {
                                            returned
                                                .promise()
                                                .done(newDefer.resolve)
                                                .fail(newDefer.reject)
                                                .progress(newDefer.notify);
                                        } else {
                                            newDefer[action + "With"](
                                                this === promise
                                                    ? newDefer.promise()
                                                    : this,
                                                fn ? [returned] : arguments
                                            );
                                        }
                                    });
                                });
                                fns = null;
                            })
                            .promise();
                    },
                    promise: function (obj) {
                        return obj != null
                            ? hopeU.extend(obj, promise)
                            : promise;
                    },
                },
                deferred = {};
            promise.pipe = promise.then;
            hopeU.each(tuples, function (i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(
                        function () {
                            state = stateString;
                        },
                        tuples[i ^ 1][2].disable,
                        tuples[2][2].lock
                    );
                }
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](
                        this === deferred ? promise : this,
                        arguments
                    );
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (subordinate) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining =
                    length !== 1 ||
                    (subordinate && hopeU.isFunction(subordinate.promise))
                        ? length
                        : 0,
                deferred = remaining === 1 ? subordinate : hopeU.Deferred(),
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this;
                        values[i] =
                            arguments.length > 1
                                ? core_slice.call(arguments)
                                : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!--remaining) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },
                progressValues,
                progressContexts,
                resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (
                        resolveValues[i] &&
                        hopeU.isFunction(resolveValues[i].promise)
                    ) {
                        resolveValues[i]
                            .promise()
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject)
                            .progress(
                                updateFunc(i, progressContexts, progressValues)
                            );
                    } else {
                        --remaining;
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }
            return deferred.promise();
        },
    });
    hopeU.support = (function () {
        var support,
            all,
            a,
            input,
            select,
            fragment,
            opt,
            eventName,
            isSupported,
            i,
            div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !a || !all.length) {
            return {};
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        support = {
            getSetAttribute: div.className !== "t",
            leadingWhitespace: div.firstChild.nodeType === 3,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: a.getAttribute("href") === "/a",
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: !!input.value,
            optSelected: opt.selected,
            enctype: !!document.createElement("form").enctype,
            html5Clone:
                document.createElement("nav").cloneNode(true).outerHTML !==
                "<:nav></:nav>",
            boxModel: document.compatMode === "CSS1Compat",
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false,
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "t");
        input.setAttribute("name", "t");
        fragment = document.createDocumentFragment();
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        support.checkClone = fragment
            .cloneNode(true)
            .cloneNode(true).lastChild.checked;
        if (div.attachEvent) {
            div.attachEvent("onclick", function () {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).click();
        }
        for (i in {
            submit: true,
            change: true,
            focusin: true,
        }) {
            div.setAttribute((eventName = "on" + i), "t");
            support[i + "Bubbles"] =
                eventName in window ||
                div.attributes[eventName].expando === false;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        hopeU(function () {
            var container,
                marginDiv,
                tds,
                divReset =
                    "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            container = document.createElement("div");
            container.style.cssText =
                "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            body.appendChild(container).appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = tds[0].offsetHeight === 0;
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets =
                isSupported && tds[0].offsetHeight === 0;
            div.innerHTML = "";
            div.style.cssText =
                "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = div.offsetWidth === 4;
            support.doesNotIncludeMarginInBodyOffset = body.offsetTop !== 1;
            if (window.getComputedStyle) {
                support.pixelPosition =
                    (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable =
                    (
                        window.getComputedStyle(div, null) || {
                            width: "4px",
                        }
                    ).width === "4px";
                marginDiv = div.appendChild(document.createElement("div"));
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                support.reliableMarginRight = !parseFloat(
                    (window.getComputedStyle(marginDiv, null) || {}).marginRight
                );
            }
            if (typeof div.style.zoom !== core_strundefined) {
                div.innerHTML = "";
                div.style.cssText =
                    divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = div.offsetWidth === 3;
                div.style.display = "block";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = div.offsetWidth !== 3;
                if (support.inlineBlockNeedsLayout) {
                    body.style.zoom = 1;
                }
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null;
        });
        all = select = fragment = opt = a = input = null;
        return support;
    })();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;

    function internalData(elem, name, data, pvt) {
        if (!hopeU.acceptData(elem)) {
            return;
        }
        var thisCache,
            ret,
            internalKey = hopeU.expando,
            getByName = typeof name === "string",
            isNode = elem.nodeType,
            cache = isNode ? hopeU.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if (
            (!id || !cache[id] || (!pvt && !cache[id].data)) &&
            getByName &&
            data === undefined
        ) {
            return;
        }
        if (!id) {
            if (isNode) {
                elem[internalKey] = id = core_deletedIds.pop() || hopeU.guid++;
            } else {
                id = internalKey;
            }
        }
        if (!cache[id]) {
            cache[id] = {};
            if (!isNode) {
                cache[id].toJSON = hopeU.noop;
            }
        }
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = hopeU.extend(cache[id], name);
            } else {
                cache[id].data = hopeU.extend(cache[id].data, name);
            }
        }
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }
            thisCache = thisCache.data;
        }
        if (data !== undefined) {
            thisCache[hopeU.camelCase(name)] = data;
        }
        if (getByName) {
            ret = thisCache[name];
            if (ret == null) {
                ret = thisCache[hopeU.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }
        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!hopeU.acceptData(elem)) {
            return;
        }
        var i,
            l,
            thisCache,
            isNode = elem.nodeType,
            cache = isNode ? hopeU.cache : elem,
            id = isNode ? elem[hopeU.expando] : hopeU.expando;
        if (!cache[id]) {
            return;
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!hopeU.isArray(name)) {
                    if (name in thisCache) {
                        name = [name];
                    } else {
                        name = hopeU.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    name = name.concat(hopeU.map(name, hopeU.camelCase));
                }
                for (i = 0, l = name.length; i < l; i++) {
                    delete thisCache[name[i]];
                }
                if (
                    !(pvt ? isEmptyDataObject : hopeU.isEmptyObject)(thisCache)
                ) {
                    return;
                }
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }
        if (isNode) {
            hopeU.cleanData([elem], true);
        } else if (hopeU.support.deleteExpando || cache != cache.window) {
            delete cache[id];
        } else {
            cache[id] = null;
        }
    }
    hopeU.extend({
        cache: {},
        expando: "hopeU" + (core_version + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true,
        },
        hasData: function (elem) {
            elem = elem.nodeType
                ? hopeU.cache[elem[hopeU.expando]]
                : elem[hopeU.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function (elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function (elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function (elem, name, data) {
            return internalData(elem, name, data, true);
        },
        _removeData: function (elem, name) {
            return internalRemoveData(elem, name, true);
        },
        acceptData: function (elem) {
            if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
                return false;
            }
            var noData =
                elem.nodeName && hopeU.noData[elem.nodeName.toLowerCase()];
            return (
                !noData ||
                (noData !== true && elem.getAttribute("classid") === noData)
            );
        },
    });
    hopeU.fn.extend({
        data: function (key, value) {
            var attrs,
                name,
                elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = hopeU.data(elem);
                    if (
                        elem.nodeType === 1 &&
                        !hopeU._data(elem, "parsedAttrs")
                    ) {
                        attrs = elem.attributes;
                        for (; i < attrs.length; i++) {
                            name = attrs[i].name;
                            if (!name.indexOf("data-")) {
                                name = hopeU.camelCase(name.slice(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        hopeU._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function () {
                    hopeU.data(this, key);
                });
            }
            return hopeU.access(
                this,
                function (value) {
                    if (value === undefined) {
                        return elem
                            ? dataAttr(elem, key, hopeU.data(elem, key))
                            : null;
                    }
                    this.each(function () {
                        hopeU.data(this, key, value);
                    });
                },
                null,
                value,
                arguments.length > 1,
                null,
                true
            );
        },
        removeData: function (key) {
            return this.each(function () {
                hopeU.removeData(this, key);
            });
        },
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data =
                        data === "true"
                            ? true
                            : data === "false"
                            ? false
                            : data === "null"
                            ? null
                            : +data + "" === data
                            ? +data
                            : rbrace.test(data)
                            ? hopeU.parseJSON(data)
                            : data;
                } catch (e) {}
                hopeU.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && hopeU.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }
    // hopeU.extend({
    //     queue: function(elem, type, data) {
    //         var queue;
    //         if (elem) {
    //             type = (type || "fx") + "queue";
    //             queue = hopeU._data(elem, type);
    //             if (data) {
    //                 if (!queue || hopeU.isArray(data)) {
    //                     queue = hopeU._data(elem, type, hopeU.makeArray(data));
    //                 } else {
    //                     queue.push(data);
    //                 }
    //             }
    //             return queue || [];
    //         }
    //     },
    //     dequeue: function(elem, type) {
    //         type = type || "fx";
    //         var queue = hopeU.queue(elem, type),
    //             startLength = queue.length,
    //             fn = queue.shift(),
    //             hooks = hopeU._queueHooks(elem, type),
    //             next = function() {
    //                 hopeU.dequeue(elem, type);
    //             };
    //         if (fn === "inprogress") {
    //             fn = queue.shift();
    //             startLength--;
    //         }
    //         hooks.cur = fn;
    //         if (fn) {
    //             if (type === "fx") {
    //                 queue.unshift("inprogress");
    //             }
    //             delete hooks.stop;
    //             fn.call(elem, next, hooks);
    //         }
    //         if (!startLength && hooks) {
    //             hooks.empty.fire();
    //         }
    //     },
    //     _queueHooks: function(elem, type) {
    //         var key = type + "queueHooks";
    //         return (hopeU._data(elem, key) || hopeU._data(elem, key, {
    //             empty: hopeU.Callbacks("once memory").add(function() {
    //                 hopeU._removeData(elem, type + "queue");
    //                 hopeU._removeData(elem, key);
    //             }),
    //         }));
    //     },
    // });
    // hopeU.fn.extend({
    //     queue: function(type, data) {
    //         var setter = 2;
    //         if (typeof type !== "string") {
    //             data = type;
    //             type = "fx";
    //             setter--;
    //         }
    //         if (arguments.length < setter) {
    //             return hopeU.queue(this[0], type);
    //         }
    //         return data === undefined ? this : this.each(function() {
    //             var queue = hopeU.queue(this, type, data);
    //             hopeU._queueHooks(this, type);
    //             if (type === "fx" && queue[0] !== "inprogress") {
    //                 hopeU.dequeue(this, type);
    //             }
    //         });
    //     },
    //     dequeue: function(type) {
    //         return this.each(function() {
    //             hopeU.dequeue(this, type);
    //         });
    //     },
    //     delay: function(time, type) {
    //         time = hopeU.fx ? hopeU.fx.speeds[time] || time : time;
    //         type = type || "fx";
    //         return this.queue(type, function(next, hooks) {
    //             var timeout = setTimeout(next, time);
    //             hooks.stop = function() {
    //                 clearTimeout(timeout);
    //             };
    //         });
    //     },
    //     clearQueue: function(type) {
    //         return this.queue(type || "fx", []);
    //     },
    //     promise: function(type, obj) {
    //         var tmp, count = 1,
    //             defer = hopeU.Deferred(),
    //             elements = this,
    //             i = this.length,
    //             resolve = function() {
    //                 if (!--count) {
    //                     defer.resolveWith(elements, [elements]);
    //                 }
    //             };
    //         if (typeof type !== "string") {
    //             obj = type;
    //             type = undefined;
    //         }
    //         type = type || "fx";
    //         while (i--) {
    //             tmp = hopeU._data(elements[i], type + "queueHooks");
    //             if (tmp && tmp.empty) {
    //                 count++;
    //                 tmp.empty.add(resolve);
    //             }
    //         }
    //         resolve();
    //         return defer.promise(obj);
    //     },
    // });
    var nodeHook,
        boolHook,
        rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i,
        rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = hopeU.support.getSetAttribute,
        getSetInput = hopeU.support.input;
    hopeU.fn.extend({
        attr: function (name, value) {
            return hopeU.access(
                this,
                hopeU.attr,
                name,
                value,
                arguments.length > 1
            );
        },
        removeAttr: function (name) {
            return this.each(function () {
                hopeU.removeAttr(this, name);
            });
        },
        prop: function (name, value) {
            return hopeU.access(
                this,
                hopeU.prop,
                name,
                value,
                arguments.length > 1
            );
        },
        removeProp: function (name) {
            name = hopeU.propFix[name] || name;
            return this.each(function () {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        },
        addClass: function (value) {
            var classes,
                elem,
                cur,
                clazz,
                j,
                i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;
            if (hopeU.isFunction(value)) {
                return this.each(function (j) {
                    hopeU(this).addClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur =
                        elem.nodeType === 1 &&
                        (elem.className
                            ? (" " + elem.className + " ").replace(rclass, " ")
                            : " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        elem.className = hopeU.trim(cur);
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            var classes,
                elem,
                cur,
                clazz,
                j,
                i = 0,
                len = this.length,
                proceed =
                    arguments.length === 0 ||
                    (typeof value === "string" && value);
            if (hopeU.isFunction(value)) {
                return this.each(function (j) {
                    hopeU(this).removeClass(
                        value.call(this, j, this.className)
                    );
                });
            }
            if (proceed) {
                classes = (value || "").match(core_rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur =
                        elem.nodeType === 1 &&
                        (elem.className
                            ? (" " + elem.className + " ").replace(rclass, " ")
                            : "");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        elem.className = value ? hopeU.trim(cur) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (hopeU.isFunction(value)) {
                return this.each(function (i) {
                    hopeU(this).toggleClass(
                        value.call(this, i, this.className, stateVal),
                        stateVal
                    );
                });
            }
            return this.each(function () {
                if (type === "string") {
                    var className,
                        i = 0,
                        self = hopeU(this),
                        state = stateVal,
                        classNames = value.match(core_rnotwhite) || [];
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === core_strundefined || type === "boolean") {
                    if (this.className) {
                        hopeU._data(this, "__className__", this.className);
                    }
                    this.className =
                        this.className || value === false
                            ? ""
                            : hopeU._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function (selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (
                    this[i].nodeType === 1 &&
                    (" " + this[i].className + " ")
                        .replace(rclass, " ")
                        .indexOf(className) >= 0
                ) {
                    return true;
                }
            }
            return false;
        },
        val: function (value) {
            var ret,
                hooks,
                isFunction,
                elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks =
                        hopeU.valHooks[elem.type] ||
                        hopeU.valHooks[elem.nodeName.toLowerCase()];
                    if (
                        hooks &&
                        "get" in hooks &&
                        (ret = hooks.get(elem, "value")) !== undefined
                    ) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string"
                        ? ret.replace(rreturn, "")
                        : ret == null
                        ? ""
                        : ret;
                }
                return;
            }
            isFunction = hopeU.isFunction(value);
            return this.each(function (i) {
                var val,
                    self = hopeU(this);
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (hopeU.isArray(val)) {
                    val = hopeU.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks =
                    hopeU.valHooks[this.type] ||
                    hopeU.valHooks[this.nodeName.toLowerCase()];
                if (
                    !hooks ||
                    !("set" in hooks) ||
                    hooks.set(this, val, "value") === undefined
                ) {
                    this.value = val;
                }
            });
        },
    });
    hopeU.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                },
            },
            select: {
                get: function (elem) {
                    var value,
                        option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if (
                            (option.selected || i === index) &&
                            (hopeU.support.optDisabled
                                ? !option.disabled
                                : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled ||
                                !hopeU.nodeName(option.parentNode, "optgroup"))
                        ) {
                            value = hopeU(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function (elem, value) {
                    var values = hopeU.makeArray(value);
                    hopeU(elem)
                        .find("option")
                        .each(function () {
                            this.selected =
                                hopeU.inArray(hopeU(this).val(), values) >= 0;
                        });
                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                },
            },
        },
        attr: function (elem, name, value) {
            var hooks,
                notxml,
                ret,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === core_strundefined) {
                return hopeU.prop(elem, name, value);
            }
            notxml = nType !== 1 || !hopeU.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks =
                    hopeU.attrHooks[name] ||
                    (rboolean.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    hopeU.removeAttr(elem, name);
                } else if (
                    hooks &&
                    notxml &&
                    "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                    return ret;
                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }
            } else if (
                hooks &&
                notxml &&
                "get" in hooks &&
                (ret = hooks.get(elem, name)) !== null
            ) {
                return ret;
            } else {
                if (typeof elem.getAttribute !== core_strundefined) {
                    ret = elem.getAttribute(name);
                }
                return ret == null ? undefined : ret;
            }
        },
        removeAttr: function (elem, value) {
            var name,
                propName,
                i = 0,
                attrNames = value && value.match(core_rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = hopeU.propFix[name] || name;
                    if (rboolean.test(name)) {
                        if (!getSetAttribute && ruseDefault.test(name)) {
                            elem[hopeU.camelCase("default-" + name)] = elem[
                                propName
                            ] = false;
                        } else {
                            elem[propName] = false;
                        }
                    } else {
                        hopeU.attr(elem, name, "");
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (
                        !hopeU.support.radioValue &&
                        value === "radio" &&
                        hopeU.nodeName(elem, "input")
                    ) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                },
            },
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable",
        },
        prop: function (elem, name, value) {
            var ret,
                hooks,
                notxml,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !hopeU.isXMLDoc(elem);
            if (notxml) {
                name = hopeU.propFix[name] || name;
                hooks = hopeU.propHooks[name];
            }
            if (value !== undefined) {
                if (
                    hooks &&
                    "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                    return ret;
                } else {
                    return (elem[name] = value);
                }
            } else {
                if (
                    hooks &&
                    "get" in hooks &&
                    (ret = hooks.get(elem, name)) !== null
                ) {
                    return ret;
                } else {
                    return elem[name];
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified
                        ? parseInt(attributeNode.value, 10)
                        : rfocusable.test(elem.nodeName) ||
                          (rclickable.test(elem.nodeName) && elem.href)
                        ? 0
                        : undefined;
                },
            },
        },
    });
    boolHook = {
        get: function (elem, name) {
            var prop = hopeU.prop(elem, name),
                attr = typeof prop === "boolean" && elem.getAttribute(name),
                detail =
                    typeof prop === "boolean"
                        ? getSetInput && getSetAttribute
                            ? attr != null
                            : ruseDefault.test(name)
                            ? elem[hopeU.camelCase("default-" + name)]
                            : !!attr
                        : elem.getAttributeNode(name);
            return detail && detail.value !== false
                ? name.toLowerCase()
                : undefined;
        },
        set: function (elem, value, name) {
            if (value === false) {
                hopeU.removeAttr(elem, name);
            } else if (
                (getSetInput && getSetAttribute) ||
                !ruseDefault.test(name)
            ) {
                elem.setAttribute(
                    (!getSetAttribute && hopeU.propFix[name]) || name,
                    name
                );
            } else {
                elem[hopeU.camelCase("default-" + name)] = elem[name] = true;
            }
            return name;
        },
    };
    if (!getSetInput || !getSetAttribute) {
        hopeU.attrHooks.value = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                return hopeU.nodeName(elem, "input")
                    ? elem.defaultValue
                    : ret && ret.specified
                    ? ret.value
                    : undefined;
            },
            set: function (elem, value, name) {
                if (hopeU.nodeName(elem, "input")) {
                    elem.defaultValue = value;
                } else {
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            },
        };
    }
    if (!getSetAttribute) {
        nodeHook = hopeU.valHooks.button = {
            get: function (elem, name) {
                var ret = elem.getAttributeNode(name);
                return ret &&
                    (name === "id" || name === "name" || name === "coords"
                        ? ret.value !== ""
                        : ret.specified)
                    ? ret.value
                    : undefined;
            },
            set: function (elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute(name))
                    );
                }
                ret.value = value += "";
                return name === "value" || value === elem.getAttribute(name)
                    ? value
                    : undefined;
            },
        };
        hopeU.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function (elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            },
        };
        hopeU.each(["width", "height"], function (i, name) {
            hopeU.attrHooks[name] = hopeU.extend(hopeU.attrHooks[name], {
                set: function (elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                },
            });
        });
    }
    if (!hopeU.support.hrefNormalized) {
        hopeU.each(["href", "src", "width", "height"], function (i, name) {
            hopeU.attrHooks[name] = hopeU.extend(hopeU.attrHooks[name], {
                get: function (elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret == null ? undefined : ret;
                },
            });
        });
        hopeU.each(["href", "src"], function (i, name) {
            hopeU.propHooks[name] = {
                get: function (elem) {
                    return elem.getAttribute(name, 4);
                },
            };
        });
    }
    if (!hopeU.support.style) {
        hopeU.attrHooks.style = {
            get: function (elem) {
                return elem.style.cssText || undefined;
            },
            set: function (elem, value) {
                return (elem.style.cssText = value + "");
            },
        };
    }
    if (!hopeU.support.optSelected) {
        hopeU.propHooks.selected = hopeU.extend(hopeU.propHooks.selected, {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            },
        });
    }
    if (!hopeU.support.enctype) {
        hopeU.propFix.enctype = "encoding";
    }
    if (!hopeU.support.checkOn) {
        hopeU.each(["radio", "checkbox"], function () {
            hopeU.valHooks[this] = {
                get: function (elem) {
                    return elem.getAttribute("value") === null
                        ? "on"
                        : elem.value;
                },
            };
        });
    }
    hopeU.each(["radio", "checkbox"], function () {
        hopeU.valHooks[this] = hopeU.extend(hopeU.valHooks[this], {
            set: function (elem, value) {
                if (hopeU.isArray(value)) {
                    return (elem.checked =
                        hopeU.inArray(hopeU(elem).val(), value) >= 0);
                }
            },
        });
    });
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }
    hopeU.event = {
        global: {},
        add: function (elem, types, handler, data, selector) {
            var tmp,
                events,
                t,
                handleObjIn,
                special,
                eventHandle,
                handleObj,
                handlers,
                type,
                namespaces,
                origType,
                elemData = hopeU._data(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = hopeU.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    return typeof hopeU !== core_strundefined &&
                        (!e || hopeU.event.triggered !== e.type)
                        ? hopeU.event.dispatch.apply(
                              eventHandle.elem,
                              arguments
                          )
                        : undefined;
                };
                eventHandle.elem = elem;
            }
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                special = hopeU.event.special[type] || {};
                type =
                    (selector ? special.delegateType : special.bindType) ||
                    type;
                special = hopeU.event.special[type] || {};
                handleObj = hopeU.extend(
                    {
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext:
                            selector &&
                            hopeU.expr.match.needsContext.test(selector),
                        namespace: namespaces.join("."),
                    },
                    handleObjIn
                );
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (
                        !special.setup ||
                        special.setup.call(
                            elem,
                            data,
                            namespaces,
                            eventHandle
                        ) === false
                    ) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                hopeU.event.global[type] = true;
            }
            elem = null;
        },
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j,
                handleObj,
                tmp,
                origCount,
                t,
                events,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = hopeU.hasData(elem) && hopeU._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(core_rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        hopeU.event.remove(
                            elem,
                            type + types[t],
                            handler,
                            selector,
                            true
                        );
                    }
                    continue;
                }
                special = hopeU.event.special[type] || {};
                type =
                    (selector ? special.delegateType : special.bindType) ||
                    type;
                handlers = events[type] || [];
                tmp =
                    tmp[2] &&
                    new RegExp(
                        "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"
                    );
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if (
                        (mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector ||
                            selector === handleObj.selector ||
                            (selector === "**" && handleObj.selector))
                    ) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (
                        !special.teardown ||
                        special.teardown.call(
                            elem,
                            namespaces,
                            elemData.handle
                        ) === false
                    ) {
                        hopeU.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (hopeU.isEmptyObject(events)) {
                delete elemData.handle;
                hopeU._removeData(elem, "events");
            }
        },
        trigger: function (event, data, elem, onlyHandlers) {
            var handle,
                ontype,
                cur,
                bubbleType,
                special,
                tmp,
                i,
                eventPath = [elem || document],
                type = core_hasOwn.call(event, "type") ? event.type : event,
                namespaces = core_hasOwn.call(event, "namespace")
                    ? event.namespace.split(".")
                    : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + hopeU.event.triggered)) {
                return;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[hopeU.expando]
                ? event
                : new hopeU.Event(type, typeof event === "object" && event);
            event.isTrigger = true;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace
                ? new RegExp(
                      "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"
                  )
                : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [event] : hopeU.makeArray(data, [event]);
            special = hopeU.event.special[type] || {};
            if (
                !onlyHandlers &&
                special.trigger &&
                special.trigger.apply(elem, data) === false
            ) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !hopeU.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(
                        tmp.defaultView || tmp.parentWindow || window
                    );
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle =
                    (hopeU._data(cur, "events") || {})[event.type] &&
                    hopeU._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (
                    handle &&
                    hopeU.acceptData(cur) &&
                    handle.apply &&
                    handle.apply(cur, data) === false
                ) {
                    event.preventDefault();
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if (
                    (!special._default ||
                        special._default.apply(elem.ownerDocument, data) ===
                            false) &&
                    !(type === "click" && hopeU.nodeName(elem, "a")) &&
                    hopeU.acceptData(elem)
                ) {
                    if (ontype && elem[type] && !hopeU.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        hopeU.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {}
                        hopeU.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function (event) {
            event = hopeU.event.fix(event);
            var i,
                ret,
                handleObj,
                matched,
                j,
                handlerQueue = [],
                args = core_slice.call(arguments),
                handlers =
                    (hopeU._data(this, "events") || {})[event.type] || [],
                special = hopeU.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (
                special.preDispatch &&
                special.preDispatch.call(this, event) === false
            ) {
                return;
            }
            handlerQueue = hopeU.event.handlers.call(this, event, handlers);
            i = 0;
            while (
                (matched = handlerQueue[i++]) &&
                !event.isPropagationStopped()
            ) {
                event.currentTarget = matched.elem;
                j = 0;
                while (
                    (handleObj = matched.handlers[j++]) &&
                    !event.isImmediatePropagationStopped()
                ) {
                    if (
                        !event.namespace_re ||
                        event.namespace_re.test(handleObj.namespace)
                    ) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = (
                            (hopeU.event.special[handleObj.origType] || {})
                                .handle || handleObj.handler
                        ).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function (event, handlers) {
            var sel,
                handleObj,
                matches,
                i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (
                delegateCount &&
                cur.nodeType &&
                (!event.button || event.type !== "click")
            ) {
                for (; cur != this; cur = cur.parentNode || this) {
                    if (
                        cur.nodeType === 1 &&
                        (cur.disabled !== true || event.type !== "click")
                    ) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext
                                    ? hopeU(sel, this).index(cur) >= 0
                                    : hopeU.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches,
                            });
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount),
                });
            }
            return handlerQueue;
        },
        fix: function (event) {
            if (event[hopeU.expando]) {
                return event;
            }
            var i,
                prop,
                copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type)
                    ? this.mouseHooks
                    : rkeyEvent.test(type)
                    ? this.keyHooks
                    : {};
            }
            copy = fixHook.props
                ? this.props.concat(fixHook.props)
                : this.props;
            event = new hopeU.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter
                ? fixHook.filter(event, originalEvent)
                : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
            " "
        ),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (event, original) {
                if (event.which == null) {
                    event.which =
                        original.charCode != null
                            ? original.charCode
                            : original.keyCode;
                }
                return event;
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
                " "
            ),
            filter: function (event, original) {
                var body,
                    eventDoc,
                    doc,
                    button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX =
                        original.clientX +
                        ((doc && doc.scrollLeft) ||
                            (body && body.scrollLeft) ||
                            0) -
                        ((doc && doc.clientLeft) ||
                            (body && body.clientLeft) ||
                            0);
                    event.pageY =
                        original.clientY +
                        ((doc && doc.scrollTop) ||
                            (body && body.scrollTop) ||
                            0) -
                        ((doc && doc.clientTop) ||
                            (body && body.clientTop) ||
                            0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget =
                        fromElement === event.target
                            ? original.toElement
                            : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which =
                        button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                }
                return event;
            },
        },
        special: {
            load: {
                noBubble: true,
            },
            click: {
                trigger: function () {
                    if (
                        hopeU.nodeName(this, "input") &&
                        this.type === "checkbox" &&
                        this.click
                    ) {
                        this.click();
                        return false;
                    }
                },
            },
            focus: {
                trigger: function () {
                    if (this !== document.activeElement && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {}
                    }
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    if (this === document.activeElement && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout",
            },
            beforeunload: {
                postDispatch: function (event) {
                    if (event.result !== undefined) {
                        event.originalEvent.returnValue = event.result;
                    }
                },
            },
        },
        simulate: function (type, elem, event, bubble) {
            var e = hopeU.extend(new hopeU.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {},
            });
            if (bubble) {
                hopeU.event.trigger(e, null, elem);
            } else {
                hopeU.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        },
    };
    hopeU.removeEvent = document.removeEventListener
        ? function (elem, type, handle) {
              if (elem.removeEventListener) {
                  elem.removeEventListener(type, handle, false);
              }
          }
        : function (elem, type, handle) {
              var name = "on" + type;
              if (elem.detachEvent) {
                  if (typeof elem[name] === core_strundefined) {
                      elem[name] = null;
                  }
                  elem.detachEvent(name, handle);
              }
          };
    hopeU.Event = function (src, props) {
        if (!(this instanceof hopeU.Event)) {
            return new hopeU.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented =
                src.defaultPrevented ||
                src.returnValue === false ||
                (src.getPreventDefault && src.getPreventDefault())
                    ? returnTrue
                    : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            hopeU.extend(this, props);
        }
        this.timeStamp = (src && src.timeStamp) || hopeU.now();
        this[hopeU.expando] = true;
    };
    hopeU.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
    };
    hopeU.each(
        {
            mouseenter: "mouseover",
            mouseleave: "mouseout",
        },
        function (orig, fix) {
            hopeU.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    if (
                        !related ||
                        (related !== target && !hopeU.contains(target, related))
                    ) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                },
            };
        }
    );
    if (!hopeU.support.submitBubbles) {
        hopeU.event.special.submit = {
            setup: function () {
                if (hopeU.nodeName(this, "form")) {
                    return false;
                }
                hopeU.event.add(
                    this,
                    "click._submit keypress._submit",
                    function (e) {
                        var elem = e.target,
                            form =
                                hopeU.nodeName(elem, "input") ||
                                hopeU.nodeName(elem, "button")
                                    ? elem.form
                                    : undefined;
                        if (form && !hopeU._data(form, "submitBubbles")) {
                            hopeU.event.add(form, "submit._submit", function (
                                event
                            ) {
                                event._submit_bubble = true;
                            });
                            hopeU._data(form, "submitBubbles", true);
                        }
                    }
                );
            },
            postDispatch: function (event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        hopeU.event.simulate(
                            "submit",
                            this.parentNode,
                            event,
                            true
                        );
                    }
                }
            },
            teardown: function () {
                if (hopeU.nodeName(this, "form")) {
                    return false;
                }
                hopeU.event.remove(this, "._submit");
            },
        };
    }
    if (!hopeU.support.changeBubbles) {
        hopeU.event.special.change = {
            setup: function () {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        hopeU.event.add(
                            this,
                            "propertychange._change",
                            function (event) {
                                if (
                                    event.originalEvent.propertyName ===
                                    "checked"
                                ) {
                                    this._just_changed = true;
                                }
                            }
                        );
                        hopeU.event.add(this, "click._change", function (
                            event
                        ) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            hopeU.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                hopeU.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;
                    if (
                        rformElems.test(elem.nodeName) &&
                        !hopeU._data(elem, "changeBubbles")
                    ) {
                        hopeU.event.add(elem, "change._change", function (
                            event
                        ) {
                            if (
                                this.parentNode &&
                                !event.isSimulated &&
                                !event.isTrigger
                            ) {
                                hopeU.event.simulate(
                                    "change",
                                    this.parentNode,
                                    event,
                                    true
                                );
                            }
                        });
                        hopeU._data(elem, "changeBubbles", true);
                    }
                });
            },
            handle: function (event) {
                var elem = event.target;
                if (
                    this !== elem ||
                    event.isSimulated ||
                    event.isTrigger ||
                    (elem.type !== "radio" && elem.type !== "checkbox")
                ) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function () {
                hopeU.event.remove(this, "._change");
                return !rformElems.test(this.nodeName);
            },
        };
    }
    if (!hopeU.support.focusinBubbles) {
        hopeU.each(
            {
                focus: "focusin",
                blur: "focusout",
            },
            function (orig, fix) {
                var attaches = 0,
                    handler = function (event) {
                        hopeU.event.simulate(
                            fix,
                            event.target,
                            hopeU.event.fix(event),
                            true
                        );
                    };
                hopeU.event.special[fix] = {
                    setup: function () {
                        if (attaches++ === 0) {
                            document.addEventListener(orig, handler, true);
                        }
                    },
                    teardown: function () {
                        if (--attaches === 0) {
                            document.removeEventListener(orig, handler, true);
                        }
                    },
                };
            }
        );
    }
    hopeU.fn.extend({
        on: function (types, selector, data, fn, one) {
            var type, origFn;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    hopeU().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = hopeU.guid++);
            }
            return this.each(function () {
                hopeU.event.add(this, types, fn, data, selector);
            });
        },
        one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                hopeU(types.delegateTarget).off(
                    handleObj.namespace
                        ? handleObj.origType + "." + handleObj.namespace
                        : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                hopeU.event.remove(this, types, fn, selector);
            });
        },
        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {
            return arguments.length === 1
                ? this.off(selector, "**")
                : this.off(types, selector || "**", fn);
        },
        trigger: function (type, data) {
            return this.each(function () {
                hopeU.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return hopeU.event.trigger(type, data, elem, true);
            }
        },
    });
    (function (window, undefined) {
        var i,
            cachedruns,
            Expr,
            getText,
            isXML,
            compile,
            hasDuplicate,
            outermostContext,
            setDocument,
            document,
            docElem,
            documentIsXML,
            rbuggyQSA,
            rbuggyMatches,
            matches,
            contains,
            sortOrder,
            expando = "sizzle" + -new Date(),
            preferredDoc = window.document,
            support = {},
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,
            arr = [],
            pop = arr.pop,
            push = arr.push,
            slice = arr.slice,
            indexOf =
                arr.indexOf ||
                function (elem) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (this[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            operators = "([*^$|!~]?=)",
            attributes =
                "\\[" +
                whitespace +
                "*(" +
                characterEncoding +
                ")" +
                whitespace +
                "*(?:" +
                operators +
                whitespace +
                "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
                identifier +
                ")|)|)" +
                whitespace +
                "*\\]",
            pseudos =
                ":(" +
                characterEncoding +
                ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
                attributes.replace(3, 8) +
                ")*)|.*)\\)|)",
            rtrim = new RegExp(
                "^" +
                    whitespace +
                    "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                    whitespace +
                    "+$",
                "g"
            ),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp(
                "^" +
                    whitespace +
                    "*([\\x20\\t\\r\\n\\f>+~])" +
                    whitespace +
                    "*"
            ),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                ID: new RegExp("^#(" + characterEncoding + ")"),
                CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                NAME: new RegExp(
                    "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"
                ),
                TAG: new RegExp(
                    "^(" + characterEncoding.replace("w", "w*") + ")"
                ),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" +
                        whitespace +
                        "*(?:([+-]|)" +
                        whitespace +
                        "*(\\d+)|))" +
                        whitespace +
                        "*\\)|)",
                    "i"
                ),
                needsContext: new RegExp(
                    "^" +
                        whitespace +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace +
                        "*((?:-\\d)?\\d*)" +
                        whitespace +
                        "*\\)|)(?=[^-]|$)",
                    "i"
                ),
            },
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rnative = /^[^{]+\{\s*\[native code/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rescape = /'|\\/g,
            rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
            funescape = function (_, escaped) {
                var high = "0x" + escaped - 0x10000;
                return high !== high
                    ? escaped
                    : high < 0
                    ? String.fromCharCode(high + 0x10000)
                    : String.fromCharCode(
                          (high >> 10) | 0xd800,
                          (high & 0x3ff) | 0xdc00
                      );
            };
        try {
            slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function (i) {
                var elem,
                    results = [];
                while ((elem = this[i++])) {
                    results.push(elem);
                }
                return results;
            };
        }

        function isNative(fn) {
            return rnative.test(fn + "");
        }

        function createCache() {
            var cache,
                keys = [];
            return (cache = function (key, value) {
                if (keys.push((key += " ")) > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return (cache[key] = value);
            });
        }

        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }

        function assert(fn) {
            var div = document.createElement("div");
            try {
                return fn(div);
            } catch (e) {
                return false;
            } finally {
                div = null;
            }
        }

        function Sizzle(selector, context, results, seed) {
            var match,
                elem,
                m,
                nodeType,
                i,
                groups,
                old,
                nid,
                newContext,
                newSelector;
            if (
                (context ? context.ownerDocument || context : preferredDoc) !==
                document
            ) {
                setDocument(context);
            }
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") {
                return results;
            }
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return [];
            }
            if (!documentIsXML && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            if (
                                context.ownerDocument &&
                                (elem = context.ownerDocument.getElementById(
                                    m
                                )) &&
                                contains(context, elem) &&
                                elem.id === m
                            ) {
                                results.push(elem);
                                return results;
                            }
                        }
                    } else if (match[2]) {
                        push.apply(
                            results,
                            slice.call(
                                context.getElementsByTagName(selector),
                                0
                            )
                        );
                        return results;
                    } else if (
                        (m = match[3]) &&
                        support.getByClassName &&
                        context.getElementsByClassName
                    ) {
                        push.apply(
                            results,
                            slice.call(context.getElementsByClassName(m), 0)
                        );
                        return results;
                    }
                }
                if (support.qsa && !rbuggyQSA.test(selector)) {
                    old = true;
                    nid = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (
                        nodeType === 1 &&
                        context.nodeName.toLowerCase() !== "object"
                    ) {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&");
                        } else {
                            context.setAttribute("id", nid);
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i]);
                        }
                        newContext =
                            (rsibling.test(selector) && context.parentNode) ||
                            context;
                        newSelector = groups.join(",");
                    }
                    if (newSelector) {
                        try {
                            push.apply(
                                results,
                                slice.call(
                                    newContext.querySelectorAll(newSelector),
                                    0
                                )
                            );
                            return results;
                        } catch (qsaError) {
                        } finally {
                            if (!old) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(
                selector.replace(rtrim, "$1"),
                context,
                results,
                seed
            );
        }
        isXML = Sizzle.isXML = function (elem) {
            var documentElement =
                elem && (elem.ownerDocument || elem).documentElement;
            return documentElement
                ? documentElement.nodeName !== "HTML"
                : false;
        };
        setDocument = Sizzle.setDocument = function (node) {
            var doc = node ? node.ownerDocument || node : preferredDoc;
            if (
                doc === document ||
                doc.nodeType !== 9 ||
                !doc.documentElement
            ) {
                return document;
            }
            document = doc;
            docElem = doc.documentElement;
            documentIsXML = isXML(doc);
            support.tagNameNoComments = assert(function (div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length;
            });
            support.attributes = assert(function (div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return type !== "boolean" && type !== "string";
            });
            support.getByClassName = assert(function (div) {
                div.innerHTML =
                    "<div class='hidden e'></div><div class='hidden'></div>";
                if (
                    !div.getElementsByClassName ||
                    !div.getElementsByClassName("e").length
                ) {
                    return false;
                }
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2;
            });
            support.getByName = assert(function (div) {
                div.id = expando + 0;
                div.innerHTML =
                    "<a name='" +
                    expando +
                    "'></a><div name='" +
                    expando +
                    "'></div>";
                docElem.insertBefore(div, docElem.firstChild);
                var pass =
                    doc.getElementsByName &&
                    doc.getElementsByName(expando).length ===
                        2 + doc.getElementsByName(expando + 0).length;
                support.getIdNotName = !doc.getElementById(expando);
                docElem.removeChild(div);
                return pass;
            });
            Expr.attrHandle = assert(function (div) {
                div.innerHTML = "<a href='#'></a>";
                return (
                    div.firstChild &&
                    typeof div.firstChild.getAttribute !== strundefined &&
                    div.firstChild.getAttribute("href") === "#"
                );
            })
                ? {}
                : {
                      href: function (elem) {
                          return elem.getAttribute("href", 2);
                      },
                      type: function (elem) {
                          return elem.getAttribute("type");
                      },
                  };
            if (support.getIdNotName) {
                Expr.find["ID"] = function (id, context) {
                    if (
                        typeof context.getElementById !== strundefined &&
                        !documentIsXML
                    ) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : [];
                    }
                };
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
            } else {
                Expr.find["ID"] = function (id, context) {
                    if (
                        typeof context.getElementById !== strundefined &&
                        !documentIsXML
                    ) {
                        var m = context.getElementById(id);
                        return m
                            ? m.id === id ||
                              (typeof m.getAttributeNode !== strundefined &&
                                  m.getAttributeNode("id").value === id)
                                ? [m]
                                : undefined
                            : [];
                    }
                };
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        var node =
                            typeof elem.getAttributeNode !== strundefined &&
                            elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
            }
            Expr.find["TAG"] = support.tagNameNoComments
                ? function (tag, context) {
                      if (
                          typeof context.getElementsByTagName !== strundefined
                      ) {
                          return context.getElementsByTagName(tag);
                      }
                  }
                : function (tag, context) {
                      var elem,
                          tmp = [],
                          i = 0,
                          results = context.getElementsByTagName(tag);
                      if (tag === "*") {
                          while ((elem = results[i++])) {
                              if (elem.nodeType === 1) {
                                  tmp.push(elem);
                              }
                          }
                          return tmp;
                      }
                      return results;
                  };
            Expr.find["NAME"] =
                support.getByName &&
                function (tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name);
                    }
                };
            Expr.find["CLASS"] =
                support.getByClassName &&
                function (className, context) {
                    if (
                        typeof context.getElementsByClassName !==
                            strundefined &&
                        !documentIsXML
                    ) {
                        return context.getElementsByClassName(className);
                    }
                };
            rbuggyMatches = [];
            rbuggyQSA = [":focus"];
            if ((support.qsa = isNative(doc.querySelectorAll))) {
                assert(function (div) {
                    div.innerHTML =
                        "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push(
                            "\\[" +
                                whitespace +
                                "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"
                        );
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });
                assert(function (div) {
                    div.innerHTML = "<input type='hidden' i=''/>";
                    if (div.querySelectorAll("[i^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if (
                (support.matchesSelector = isNative(
                    (matches =
                        docElem.matchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.webkitMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector)
                ))
            ) {
                assert(function (div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
            contains =
                isNative(docElem.contains) || docElem.compareDocumentPosition
                    ? function (a, b) {
                          var adown = a.nodeType === 9 ? a.documentElement : a,
                              bup = b && b.parentNode;
                          return (
                              a === bup ||
                              !!(
                                  bup &&
                                  bup.nodeType === 1 &&
                                  (adown.contains
                                      ? adown.contains(bup)
                                      : a.compareDocumentPosition &&
                                        a.compareDocumentPosition(bup) & 16)
                              )
                          );
                      }
                    : function (a, b) {
                          if (b) {
                              while ((b = b.parentNode)) {
                                  if (b === a) {
                                      return true;
                                  }
                              }
                          }
                          return false;
                      };
            sortOrder = docElem.compareDocumentPosition
                ? function (a, b) {
                      var compare;
                      if (a === b) {
                          hasDuplicate = true;
                          return 0;
                      }
                      if (
                          (compare =
                              b.compareDocumentPosition &&
                              a.compareDocumentPosition &&
                              a.compareDocumentPosition(b))
                      ) {
                          if (
                              compare & 1 ||
                              (a.parentNode && a.parentNode.nodeType === 11)
                          ) {
                              if (a === doc || contains(preferredDoc, a)) {
                                  return -1;
                              }
                              if (b === doc || contains(preferredDoc, b)) {
                                  return 1;
                              }
                              return 0;
                          }
                          return compare & 4 ? -1 : 1;
                      }
                      return a.compareDocumentPosition ? -1 : 1;
                  }
                : function (a, b) {
                      var cur,
                          i = 0,
                          aup = a.parentNode,
                          bup = b.parentNode,
                          ap = [a],
                          bp = [b];
                      if (a === b) {
                          hasDuplicate = true;
                          return 0;
                      } else if (!aup || !bup) {
                          return a === doc
                              ? -1
                              : b === doc
                              ? 1
                              : aup
                              ? -1
                              : bup
                              ? 1
                              : 0;
                      } else if (aup === bup) {
                          return siblingCheck(a, b);
                      }
                      cur = a;
                      while ((cur = cur.parentNode)) {
                          ap.unshift(cur);
                      }
                      cur = b;
                      while ((cur = cur.parentNode)) {
                          bp.unshift(cur);
                      }
                      while (ap[i] === bp[i]) {
                          i++;
                      }
                      return i
                          ? siblingCheck(ap[i], bp[i])
                          : ap[i] === preferredDoc
                          ? -1
                          : bp[i] === preferredDoc
                          ? 1
                          : 0;
                  };
            hasDuplicate = false;
            [0, 0].sort(sortOrder);
            support.detectDuplicates = hasDuplicate;
            return document;
        };
        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function (elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (
                support.matchesSelector &&
                !documentIsXML &&
                (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                !rbuggyQSA.test(expr)
            ) {
                try {
                    var ret = matches.call(elem, expr);
                    if (
                        ret ||
                        support.disconnectedMatch ||
                        (elem.document && elem.document.nodeType !== 11)
                    ) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function (context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function (elem, name) {
            var val;
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            if (!documentIsXML) {
                name = name.toLowerCase();
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem);
            }
            if (documentIsXML || support.attributes) {
                return elem.getAttribute(name);
            }
            return ((val = elem.getAttributeNode(name)) ||
                elem.getAttribute(name)) &&
                elem[name] === true
                ? name
                : val && val.specified
                ? val.value
                : null;
        };
        Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function (results) {
            var elem,
                duplicates = [],
                i = 1,
                j = 0;
            hasDuplicate = !support.detectDuplicates;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (; (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            return results;
        };

        function siblingCheck(a, b) {
            var cur = b && a,
                diff =
                    cur &&
                    (~b.sourceIndex || MAX_NEGATIVE) -
                        (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff;
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }

        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (
                    (name === "input" || name === "button") &&
                    elem.type === type
                );
            };
        }

        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j,
                        matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        getText = Sizzle.getText = function (elem) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType) {
                for (; (node = elem[i]); i++) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (
                        elem = elem.firstChild;
                        elem;
                        elem = elem.nextSibling
                    ) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true,
                },
                " ": {
                    dir: "parentNode",
                },
                "+": {
                    dir: "previousSibling",
                    first: true,
                },
                "~": {
                    dir: "previousSibling",
                },
            },
            preFilter: {
                ATTR: function (match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[4] || match[5] || "").replace(
                        runescape,
                        funescape
                    );
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                CHILD: function (match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4]
                            ? match[5] + (match[6] || 1)
                            : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +(match[7] + match[8] || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                PSEUDO: function (match) {
                    var excess,
                        unquoted = !match[5] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[4]) {
                        match[2] = match[4];
                    } else if (
                        unquoted &&
                        rpseudo.test(unquoted) &&
                        (excess = tokenize(unquoted, true)) &&
                        (excess =
                            unquoted.indexOf(")", unquoted.length - excess) -
                            unquoted.length)
                    ) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                },
            },
            filter: {
                TAG: function (nodeName) {
                    if (nodeName === "*") {
                        return function () {
                            return true;
                        };
                    }
                    nodeName = nodeName
                        .replace(runescape, funescape)
                        .toLowerCase();
                    return function (elem) {
                        return (
                            elem.nodeName &&
                            elem.nodeName.toLowerCase() === nodeName
                        );
                    };
                },
                CLASS: function (className) {
                    var pattern = classCache[className + " "];
                    return (
                        pattern ||
                        ((pattern = new RegExp(
                            "(^|" +
                                whitespace +
                                ")" +
                                className +
                                "(" +
                                whitespace +
                                "|$)"
                        )) &&
                            classCache(className, function (elem) {
                                return pattern.test(
                                    elem.className ||
                                        (typeof elem.getAttribute !==
                                            strundefined &&
                                            elem.getAttribute("class")) ||
                                        ""
                                );
                            }))
                    );
                },
                ATTR: function (name, operator, check) {
                    return function (elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "="
                            ? result === check
                            : operator === "!="
                            ? result !== check
                            : operator === "^="
                            ? check && result.indexOf(check) === 0
                            : operator === "*="
                            ? check && result.indexOf(check) > -1
                            : operator === "$="
                            ? check && result.slice(-check.length) === check
                            : operator === "~="
                            ? (" " + result + " ").indexOf(check) > -1
                            : operator === "|="
                            ? result === check ||
                              result.slice(0, check.length + 1) === check + "-"
                            : false;
                    };
                },
                CHILD: function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0
                        ? function (elem) {
                              return !!elem.parentNode;
                          }
                        : function (elem, context, xml) {
                              var cache,
                                  outerCache,
                                  node,
                                  diff,
                                  nodeIndex,
                                  start,
                                  dir =
                                      simple !== forward
                                          ? "nextSibling"
                                          : "previousSibling",
                                  parent = elem.parentNode,
                                  name = ofType && elem.nodeName.toLowerCase(),
                                  useCache = !xml && !ofType;
                              if (parent) {
                                  if (simple) {
                                      while (dir) {
                                          node = elem;
                                          while ((node = node[dir])) {
                                              if (
                                                  ofType
                                                      ? node.nodeName.toLowerCase() ===
                                                        name
                                                      : node.nodeType === 1
                                              ) {
                                                  return false;
                                              }
                                          }
                                          start = dir =
                                              type === "only" &&
                                              !start &&
                                              "nextSibling";
                                      }
                                      return true;
                                  }
                                  start = [
                                      forward
                                          ? parent.firstChild
                                          : parent.lastChild,
                                  ];
                                  if (forward && useCache) {
                                      outerCache =
                                          parent[expando] ||
                                          (parent[expando] = {});
                                      cache = outerCache[type] || [];
                                      nodeIndex =
                                          cache[0] === dirruns && cache[1];
                                      diff = cache[0] === dirruns && cache[2];
                                      node =
                                          nodeIndex &&
                                          parent.childNodes[nodeIndex];
                                      while (
                                          (node =
                                              (++nodeIndex &&
                                                  node &&
                                                  node[dir]) ||
                                              (diff = nodeIndex = 0) ||
                                              start.pop())
                                      ) {
                                          if (
                                              node.nodeType === 1 &&
                                              ++diff &&
                                              node === elem
                                          ) {
                                              outerCache[type] = [
                                                  dirruns,
                                                  nodeIndex,
                                                  diff,
                                              ];
                                              break;
                                          }
                                      }
                                  } else if (
                                      useCache &&
                                      (cache = (elem[expando] ||
                                          (elem[expando] = {}))[type]) &&
                                      cache[0] === dirruns
                                  ) {
                                      diff = cache[1];
                                  } else {
                                      while (
                                          (node =
                                              (++nodeIndex &&
                                                  node &&
                                                  node[dir]) ||
                                              (diff = nodeIndex = 0) ||
                                              start.pop())
                                      ) {
                                          if (
                                              (ofType
                                                  ? node.nodeName.toLowerCase() ===
                                                    name
                                                  : node.nodeType === 1) &&
                                              ++diff
                                          ) {
                                              if (useCache) {
                                                  (node[expando] ||
                                                      (node[expando] = {}))[
                                                      type
                                                  ] = [dirruns, diff];
                                              }
                                              if (node === elem) {
                                                  break;
                                              }
                                          }
                                      }
                                  }
                                  diff -= last;
                                  return (
                                      diff === first ||
                                      (diff % first === 0 && diff / first >= 0)
                                  );
                              }
                          };
                },
                PSEUDO: function (pseudo, argument) {
                    var args,
                        fn =
                            Expr.pseudos[pseudo] ||
                            Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(
                            pseudo.toLowerCase()
                        )
                            ? markFunction(function (seed, matches) {
                                  var idx,
                                      matched = fn(seed, argument),
                                      i = matched.length;
                                  while (i--) {
                                      idx = indexOf.call(seed, matched[i]);
                                      seed[idx] = !(matches[idx] = matched[i]);
                                  }
                              })
                            : function (elem) {
                                  return fn(elem, 0, args);
                              };
                    }
                    return fn;
                },
            },
            pseudos: {
                not: markFunction(function (selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando]
                        ? markFunction(function (seed, matches, context, xml) {
                              var elem,
                                  unmatched = matcher(seed, null, xml, []),
                                  i = seed.length;
                              while (i--) {
                                  if ((elem = unmatched[i])) {
                                      seed[i] = !(matches[i] = elem);
                                  }
                              }
                          })
                        : function (elem, context, xml) {
                              input[0] = elem;
                              matcher(input, null, xml, results);
                              return !results.pop();
                          };
                }),
                has: markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function (text) {
                    return function (elem) {
                        return (
                            (
                                elem.textContent ||
                                elem.innerText ||
                                getText(elem)
                            ).indexOf(text) > -1
                        );
                    };
                }),
                lang: markFunction(function (lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        var elemLang;
                        do {
                            if (
                                (elemLang = documentIsXML
                                    ? elem.getAttribute("xml:lang") ||
                                      elem.getAttribute("lang")
                                    : elem.lang)
                            ) {
                                elemLang = elemLang.toLowerCase();
                                return (
                                    elemLang === lang ||
                                    elemLang.indexOf(lang + "-") === 0
                                );
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                target: function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function (elem) {
                    return elem === docElem;
                },
                focus: function (elem) {
                    return (
                        elem === document.activeElement &&
                        (!document.hasFocus || document.hasFocus()) &&
                        !!(elem.type || elem.href || ~elem.tabIndex)
                    );
                },
                enabled: function (elem) {
                    return elem.disabled === false;
                },
                disabled: function (elem) {
                    return elem.disabled === true;
                },
                checked: function (elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (
                        (nodeName === "input" && !!elem.checked) ||
                        (nodeName === "option" && !!elem.selected)
                    );
                },
                selected: function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                empty: function (elem) {
                    for (
                        elem = elem.firstChild;
                        elem;
                        elem = elem.nextSibling
                    ) {
                        if (
                            elem.nodeName > "@" ||
                            elem.nodeType === 3 ||
                            elem.nodeType === 4
                        ) {
                            return false;
                        }
                    }
                    return true;
                },
                parent: function (elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                header: function (elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function (elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (
                        (name === "input" && elem.type === "button") ||
                        name === "button"
                    );
                },
                text: function (elem) {
                    var attr;
                    return (
                        elem.nodeName.toLowerCase() === "input" &&
                        elem.type === "text" &&
                        ((attr = elem.getAttribute("type")) == null ||
                            attr.toLowerCase() === elem.type)
                    );
                },
                first: createPositionalPseudo(function () {
                    return [0];
                }),
                last: createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                }),
                eq: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                ) {
                    return [argument < 0 ? argument + length : argument];
                }),
                even: createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                ) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                ) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
            },
        };
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true,
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true,
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }

        function tokenize(selector, parseOnly) {
            var matched,
                match,
                tokens,
                type,
                soFar,
                groups,
                preFilters,
                cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " "),
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if (
                        (match = matchExpr[type].exec(soFar)) &&
                        (!preFilters[type] || (match = preFilters[type](match)))
                    ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match,
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly
                ? soFar.length
                : soFar
                ? Sizzle.error(selector)
                : tokenCache(selector, groups).slice(0);
        }

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first
                ? function (elem, context, xml) {
                      while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                              return matcher(elem, context, xml);
                          }
                      }
                  }
                : function (elem, context, xml) {
                      var data,
                          cache,
                          outerCache,
                          dirkey = dirruns + " " + doneName;
                      if (xml) {
                          while ((elem = elem[dir])) {
                              if (elem.nodeType === 1 || checkNonElements) {
                                  if (matcher(elem, context, xml)) {
                                      return true;
                                  }
                              }
                          }
                      } else {
                          while ((elem = elem[dir])) {
                              if (elem.nodeType === 1 || checkNonElements) {
                                  outerCache =
                                      elem[expando] || (elem[expando] = {});
                                  if (
                                      (cache = outerCache[dir]) &&
                                      cache[0] === dirkey
                                  ) {
                                      if (
                                          (data = cache[1]) === true ||
                                          data === cachedruns
                                      ) {
                                          return data === true;
                                      }
                                  } else {
                                      cache = outerCache[dir] = [dirkey];
                                      cache[1] =
                                          matcher(elem, context, xml) ||
                                          cachedruns;
                                      if (cache[1] === true) {
                                          return true;
                                      }
                                  }
                              }
                          }
                      }
                  };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1
                ? function (elem, context, xml) {
                      var i = matchers.length;
                      while (i--) {
                          if (!matchers[i](elem, context, xml)) {
                              return false;
                          }
                      }
                      return true;
                  }
                : matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }

        function setMatcher(
            preFilter,
            selector,
            matcher,
            postFilter,
            postFinder,
            postSelector
        ) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                var temp,
                    i,
                    elem,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems =
                        seed ||
                        multipleContexts(
                            selector || "*",
                            context.nodeType ? [context] : context,
                            []
                        ),
                    matcherIn =
                        preFilter && (seed || !selector)
                            ? condense(elems, preMap, preFilter, context, xml)
                            : elems,
                    matcherOut = matcher
                        ? postFinder ||
                          (seed ? preFilter : preexisting || postFilter)
                            ? []
                            : results
                        : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[
                                postMap[i]
                            ] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if (
                                (elem = matcherOut[i]) &&
                                (temp = postFinder
                                    ? indexOf.call(seed, elem)
                                    : preMap[i]) > -1
                            ) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(
                        matcherOut === results
                            ? matcherOut.splice(preexisting, matcherOut.length)
                            : matcherOut
                    );
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext,
                matcher,
                j,
                len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(
                    function (elem) {
                        return elem === checkContext;
                    },
                    implicitRelative,
                    true
                ),
                matchAnyContext = addCombinator(
                    function (elem) {
                        return indexOf.call(checkContext, elem) > -1;
                    },
                    implicitRelative,
                    true
                ),
                matchers = [
                    function (elem, context, xml) {
                        return (
                            (!leadingRelative &&
                                (xml || context !== outermostContext)) ||
                            ((checkContext = context).nodeType
                                ? matchContext(elem, context, xml)
                                : matchAnyContext(elem, context, xml))
                        );
                    },
                ];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [
                        addCombinator(elementMatcher(matchers), matcher),
                    ];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(
                        null,
                        tokens[i].matches
                    );
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(
                            i > 1 && elementMatcher(matchers),
                            i > 1 &&
                                toSelector(tokens.slice(0, i - 1)).replace(
                                    rtrim,
                                    "$1"
                                ),
                            matcher,
                            i < j && matcherFromTokens(tokens.slice(i, j)),
                            j < len &&
                                matcherFromTokens((tokens = tokens.slice(j))),
                            j < len && toSelector(tokens)
                        );
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0,
                bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function (
                    seed,
                    context,
                    xml,
                    results,
                    expandContext
                ) {
                    var elem,
                        j,
                        matcher,
                        setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                        elems =
                            seed ||
                            (byElement &&
                                Expr.find["TAG"](
                                    "*",
                                    (expandContext && context.parentNode) ||
                                        context
                                )),
                        dirrunsUnique = (dirruns +=
                            contextBackup == null ? 1 : Math.random() || 0.1);
                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = matcherCachedRuns;
                    }
                    for (; (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++matcherCachedRuns;
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (
                            outermost &&
                            !seed &&
                            setMatched.length > 0 &&
                            matchedCount + setMatchers.length > 1
                        ) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function (selector, group) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector);
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(
                    selector,
                    matcherFromGroupMatchers(elementMatchers, setMatchers)
                );
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }

        function select(selector, context, results, seed) {
            var i,
                tokens,
                token,
                type,
                find,
                match = tokenize(selector);
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (
                        tokens.length > 2 &&
                        (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 &&
                        !documentIsXML &&
                        Expr.relative[tokens[1].type]
                    ) {
                        context = Expr.find["ID"](
                            token.matches[0].replace(runescape, funescape),
                            context
                        )[0];
                        if (!context) {
                            return results;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    i = matchExpr["needsContext"].test(selector)
                        ? 0
                        : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            if (
                                (seed = find(
                                    token.matches[0].replace(
                                        runescape,
                                        funescape
                                    ),
                                    (rsibling.test(tokens[0].type) &&
                                        context.parentNode) ||
                                        context
                                ))
                            ) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
            }
            compile(selector, match)(
                seed,
                context,
                documentIsXML,
                results,
                rsibling.test(selector)
            );
            return results;
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        function setFilters() {}
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        setDocument();
        Sizzle.attr = hopeU.attr;
        hopeU.find = Sizzle;
        hopeU.expr = Sizzle.selectors;
        hopeU.expr[":"] = hopeU.expr.pseudos;
        hopeU.unique = Sizzle.uniqueSort;
        hopeU.text = Sizzle.getText;
        hopeU.isXMLDoc = Sizzle.isXML;
        hopeU.contains = Sizzle.contains;
    })(window);
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = hopeU.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true,
        };
    hopeU.fn.extend({
        find: function (selector) {
            var i,
                ret,
                self,
                len = this.length;
            if (typeof selector !== "string") {
                self = this;
                return this.pushStack(
                    hopeU(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (hopeU.contains(self[i], this)) {
                                return true;
                            }
                        }
                    })
                );
            }
            ret = [];
            for (i = 0; i < len; i++) {
                hopeU.find(selector, this[i], ret);
            }
            ret = this.pushStack(len > 1 ? hopeU.unique(ret) : ret);
            ret.selector =
                (this.selector ? this.selector + " " : "") + selector;
            return ret;
        },
        has: function (target) {
            var i,
                targets = hopeU(target, this),
                len = targets.length;
            return this.filter(function () {
                for (i = 0; i < len; i++) {
                    if (hopeU.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector, false));
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector, true));
        },
        is: function (selector) {
            return (
                !!selector &&
                (typeof selector === "string"
                    ? rneedsContext.test(selector)
                        ? hopeU(selector, this.context).index(this[0]) >= 0
                        : hopeU.filter(selector, this).length > 0
                    : this.filter(selector).length > 0)
            );
        },
        closest: function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                ret = [],
                pos =
                    rneedsContext.test(selectors) ||
                    typeof selectors !== "string"
                        ? hopeU(selectors, context || this.context)
                        : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (
                    cur &&
                    cur.ownerDocument &&
                    cur !== context &&
                    cur.nodeType !== 11
                ) {
                    if (
                        pos
                            ? pos.index(cur) > -1
                            : hopeU.find.matchesSelector(cur, selectors)
                    ) {
                        ret.push(cur);
                        break;
                    }
                    cur = cur.parentNode;
                }
            }
            return this.pushStack(ret.length > 1 ? hopeU.unique(ret) : ret);
        },
        index: function (elem) {
            if (!elem) {
                return this[0] && this[0].parentNode
                    ? this.first().prevAll().length
                    : -1;
            }
            if (typeof elem === "string") {
                return hopeU.inArray(this[0], hopeU(elem));
            }
            return hopeU.inArray(elem.hopeu ? elem[0] : elem, this);
        },
        add: function (selector, context) {
            var set =
                    typeof selector === "string"
                        ? hopeU(selector, context)
                        : hopeU.makeArray(
                              selector && selector.nodeType
                                  ? [selector]
                                  : selector
                          ),
                all = hopeU.merge(this.get(), set);
            return this.pushStack(hopeU.unique(all));
        },
        addBack: function (selector) {
            return this.add(
                selector == null
                    ? this.prevObject
                    : this.prevObject.filter(selector)
            );
        },
    });
    hopeU.fn.andSelf = hopeU.fn.addBack;

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);
        return cur;
    }
    hopeU.each(
        {
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return hopeU.dir(elem, "parentNode");
            },
            parentsUntil: function (elem, i, until) {
                return hopeU.dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return hopeU.dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return hopeU.dir(elem, "previousSibling");
            },
            nextUntil: function (elem, i, until) {
                return hopeU.dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, i, until) {
                return hopeU.dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return hopeU.sibling((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return hopeU.sibling(elem.firstChild);
            },
            contents: function (elem) {
                return hopeU.nodeName(elem, "iframe")
                    ? elem.contentDocument || elem.contentWindow.document
                    : hopeU.merge([], elem.childNodes);
            },
        },
        function (name, fn) {
            hopeU.fn[name] = function (until, selector) {
                var ret = hopeU.map(this, fn, until);
                if (!runtil.test(name)) {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    ret = hopeU.filter(selector, ret);
                }
                ret =
                    this.length > 1 && !guaranteedUnique[name]
                        ? hopeU.unique(ret)
                        : ret;
                if (this.length > 1 && rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
                return this.pushStack(ret);
            };
        }
    );
    hopeU.extend({
        filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1
                ? hopeU.find.matchesSelector(elems[0], expr)
                    ? [elems[0]]
                    : []
                : hopeU.find.matches(expr, elems);
        },
        dir: function (elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (
                cur &&
                cur.nodeType !== 9 &&
                (until === undefined ||
                    cur.nodeType !== 1 ||
                    !hopeU(cur).is(until))
            ) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        sibling: function (n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        },
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (hopeU.isFunction(qualifier)) {
            return hopeU.grep(elements, function (elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return hopeU.grep(elements, function (elem) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = hopeU.grep(elements, function (elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return hopeU.filter(qualifier, filtered, !keep);
            } else {
                qualifier = hopeU.filter(qualifier, filtered);
            }
        }
        return hopeU.grep(elements, function (elem) {
            return hopeU.inArray(elem, qualifier) >= 0 === keep;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames =
            "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
            "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinehopeU = / hopeU\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: hopeU.support.htmlSerialize
                ? [0, "", ""]
                : [1, "X<div>", "</div>"],
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
        wrapMap.thead;
    wrapMap.th = wrapMap.td;
    hopeU.fn.extend({
        text: function (value) {
            return hopeU.access(
                this,
                function (value) {
                    return value === undefined
                        ? hopeU.text(this)
                        : this.empty().append(
                              (
                                  (this[0] && this[0].ownerDocument) ||
                                  document
                              ).createTextNode(value)
                          );
                },
                null,
                value,
                arguments.length
            );
        },
        wrapAll: function (html) {
            if (hopeU.isFunction(html)) {
                return this.each(function (i) {
                    hopeU(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = hopeU(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (hopeU.isFunction(html)) {
                return this.each(function (i) {
                    hopeU(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = hopeU(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            var isFunction = hopeU.isFunction(html);
            return this.each(function (i) {
                hopeU(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function () {
            return this.parent()
                .each(function () {
                    if (!hopeU.nodeName(this, "body")) {
                        hopeU(this).replaceWith(this.childNodes);
                    }
                })
                .end();
        },
        append: function () {
            return this.domManip(arguments, true, function (elem) {
                if (
                    this.nodeType === 1 ||
                    this.nodeType === 11 ||
                    this.nodeType === 9
                ) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return this.domManip(arguments, true, function (elem) {
                if (
                    this.nodeType === 1 ||
                    this.nodeType === 11 ||
                    this.nodeType === 9
                ) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function () {
            return this.domManip(arguments, false, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function () {
            return this.domManip(arguments, false, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        remove: function (selector, keepData) {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (!selector || hopeU.filter(selector, [elem]).length > 0) {
                    if (!keepData && elem.nodeType === 1) {
                        hopeU.cleanData(getAll(elem));
                    }
                    if (elem.parentNode) {
                        if (
                            keepData &&
                            hopeU.contains(elem.ownerDocument, elem)
                        ) {
                            setGlobalEval(getAll(elem, "script"));
                        }
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function () {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    hopeU.cleanData(getAll(elem, false));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
                if (elem.options && hopeU.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }
            return this;
        },
        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents =
                deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return hopeU.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function (value) {
            return hopeU.access(
                this,
                function (value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined) {
                        return elem.nodeType === 1
                            ? elem.innerHTML.replace(rinlinehopeU, "")
                            : undefined;
                    }
                    if (
                        typeof value === "string" &&
                        !rnoInnerhtml.test(value) &&
                        (hopeU.support.htmlSerialize ||
                            !rnoshimcache.test(value)) &&
                        (hopeU.support.leadingWhitespace ||
                            !rleadingWhitespace.test(value)) &&
                        !wrapMap[
                            (rtagName.exec(value) || ["", ""])[1].toLowerCase()
                        ]
                    ) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                if (elem.nodeType === 1) {
                                    hopeU.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }
                            elem = 0;
                        } catch (e) {}
                    }
                    if (elem) {
                        this.empty().append(value);
                    }
                },
                null,
                value,
                arguments.length
            );
        },
        replaceWith: function (value) {
            var isFunc = hopeU.isFunction(value);
            if (!isFunc && typeof value !== "string") {
                value = hopeU(value).not(this).detach();
            }
            return this.domManip([value], true, function (elem) {
                var next = this.nextSibling,
                    parent = this.parentNode;
                if (parent) {
                    hopeU(this).remove();
                    parent.insertBefore(elem, next);
                }
            });
        },
        detach: function (selector) {
            return this.remove(selector, true);
        },
        domManip: function (args, table, callback) {
            args = core_concat.apply([], args);
            var first,
                node,
                hasScripts,
                scripts,
                doc,
                fragment,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = hopeU.isFunction(value);
            if (
                isFunction ||
                !(
                    l <= 1 ||
                    typeof value !== "string" ||
                    hopeU.support.checkClone ||
                    !rchecked.test(value)
                )
            ) {
                return this.each(function (index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(
                            this,
                            index,
                            table ? self.html() : undefined
                        );
                    }
                    self.domManip(args, table, callback);
                });
            }
            if (l) {
                fragment = hopeU.buildFragment(
                    args,
                    this[0].ownerDocument,
                    false,
                    this
                );
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    table = table && hopeU.nodeName(first, "tr");
                    scripts = hopeU.map(
                        getAll(fragment, "script"),
                        disableScript
                    );
                    hasScripts = scripts.length;
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = hopeU.clone(node, true, true);
                            if (hasScripts) {
                                hopeU.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(
                            table && hopeU.nodeName(this[i], "table")
                                ? findOrAppend(this[i], "tbody")
                                : this[i],
                            node,
                            i
                        );
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        hopeU.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (
                                rscriptType.test(node.type || "") &&
                                !hopeU._data(node, "globalEval") &&
                                hopeU.contains(doc, node)
                            ) {
                                if (node.src) {
                                    hopeU.ajax({
                                        url: node.src,
                                        type: "GET",
                                        dataType: "script",
                                        async: false,
                                        global: false,
                                        throws: true,
                                    });
                                } else {
                                    hopeU.globalEval(
                                        (
                                            node.text ||
                                            node.textContent ||
                                            node.innerHTML ||
                                            ""
                                        ).replace(rcleanScript, "")
                                    );
                                }
                            }
                        }
                    }
                    fragment = first = null;
                }
            }
            return this;
        },
    });

    function findOrAppend(elem, tag) {
        return (
            elem.getElementsByTagName(tag)[0] ||
            elem.appendChild(elem.ownerDocument.createElement(tag))
        );
    }

    function disableScript(elem) {
        var attr = elem.getAttributeNode("type");
        elem.type = (attr && attr.specified) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

    function setGlobalEval(elems, refElements) {
        var elem,
            i = 0;
        for (; (elem = elems[i]) != null; i++) {
            hopeU._data(
                elem,
                "globalEval",
                !refElements || hopeU._data(refElements[i], "globalEval")
            );
        }
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !hopeU.hasData(src)) {
            return;
        }
        var type,
            i,
            l,
            oldData = hopeU._data(src),
            curData = hopeU._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    hopeU.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = hopeU.extend({}, curData.data);
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) {
            return;
        }
        nodeName = dest.nodeName.toLowerCase();
        if (!hopeU.support.noCloneEvent && dest[hopeU.expando]) {
            data = hopeU._data(dest);
            for (e in data.events) {
                hopeU.removeEvent(dest, e, data.handle);
            }
            dest.removeAttribute(hopeU.expando);
        }
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }
            if (
                hopeU.support.html5Clone &&
                src.innerHTML &&
                !hopeU.trim(dest.innerHTML)
            ) {
                dest.innerHTML = src.innerHTML;
            }
        } else if (
            nodeName === "input" &&
            manipulation_rcheckableType.test(src.type)
        ) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    hopeU.each(
        {
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith",
        },
        function (name, original) {
            hopeU.fn[name] = function (selector) {
                var elems,
                    i = 0,
                    ret = [],
                    insert = hopeU(selector),
                    last = insert.length - 1;
                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    hopeU(insert[i])[original](elems);
                    core_push.apply(ret, elems.get());
                }
                return this.pushStack(ret);
            };
        }
    );

    function getAll(context, tag) {
        var elems,
            elem,
            i = 0,
            found =
                typeof context.getElementsByTagName !== core_strundefined
                    ? context.getElementsByTagName(tag || "*")
                    : typeof context.querySelectorAll !== core_strundefined
                    ? context.querySelectorAll(tag || "*")
                    : undefined;
        if (!found) {
            for (
                found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null;
                i++
            ) {
                if (!tag || hopeU.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    hopeU.merge(found, getAll(elem, tag));
                }
            }
        }
        return tag === undefined || (tag && hopeU.nodeName(context, tag))
            ? hopeU.merge([context], found)
            : found;
    }

    function fixDefaultChecked(elem) {
        if (manipulation_rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }
    hopeU.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var destElements,
                node,
                clone,
                i,
                srcElements,
                inPage = hopeU.contains(elem.ownerDocument, elem);
            if (
                hopeU.support.html5Clone ||
                hopeU.isXMLDoc(elem) ||
                !rnoshimcache.test("<" + elem.nodeName + ">")
            ) {
                clone = elem.cloneNode(true);
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild((clone = fragmentDiv.firstChild));
            }
            if (
                (!hopeU.support.noCloneEvent ||
                    !hopeU.support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) &&
                !hopeU.isXMLDoc(elem)
            ) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0; (node = srcElements[i]) != null; ++i) {
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0; (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            destElements = srcElements = node = null;
            return clone;
        },
        buildFragment: function (elems, context, scripts, selection) {
            var j,
                elem,
                contains,
                tmp,
                tag,
                tbody,
                wrap,
                l = elems.length,
                safe = createSafeFragment(context),
                nodes = [],
                i = 0;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (hopeU.type(elem) === "object") {
                        hopeU.merge(nodes, elem.nodeType ? [elem] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp =
                            tmp ||
                            safe.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || [
                            "",
                            "",
                        ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML =
                            wrap[1] +
                            elem.replace(rxhtmlTag, "<$1></$2>") +
                            wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        if (
                            !hopeU.support.leadingWhitespace &&
                            rleadingWhitespace.test(elem)
                        ) {
                            nodes.push(
                                context.createTextNode(
                                    rleadingWhitespace.exec(elem)[0]
                                )
                            );
                        }
                        if (!hopeU.support.tbody) {
                            elem =
                                tag === "table" && !rtbody.test(elem)
                                    ? tmp.firstChild
                                    : wrap[1] === "<table>" &&
                                      !rtbody.test(elem)
                                    ? tmp
                                    : 0;
                            j = elem && elem.childNodes.length;
                            while (j--) {
                                if (
                                    hopeU.nodeName(
                                        (tbody = elem.childNodes[j]),
                                        "tbody"
                                    ) &&
                                    !tbody.childNodes.length
                                ) {
                                    elem.removeChild(tbody);
                                }
                            }
                        }
                        hopeU.merge(nodes, tmp.childNodes);
                        tmp.textContent = "";
                        while (tmp.firstChild) {
                            tmp.removeChild(tmp.firstChild);
                        }
                        tmp = safe.lastChild;
                    }
                }
            }
            if (tmp) {
                safe.removeChild(tmp);
            }
            if (!hopeU.support.appendChecked) {
                hopeU.grep(getAll(nodes, "input"), fixDefaultChecked);
            }
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && hopeU.inArray(elem, selection) !== -1) {
                    continue;
                }
                contains = hopeU.contains(elem.ownerDocument, elem);
                tmp = getAll(safe.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            tmp = null;
            return safe;
        },
        cleanData: function (elems, acceptData) {
            var elem,
                type,
                id,
                data,
                i = 0,
                internalKey = hopeU.expando,
                cache = hopeU.cache,
                deleteExpando = hopeU.support.deleteExpando,
                special = hopeU.event.special;
            for (; (elem = elems[i]) != null; i++) {
                if (acceptData || hopeU.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    hopeU.event.remove(elem, type);
                                } else {
                                    hopeU.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey];
                            } else if (
                                typeof elem.removeAttribute !==
                                core_strundefined
                            ) {
                                elem.removeAttribute(internalKey);
                            } else {
                                elem[internalKey] = null;
                            }
                            core_deletedIds.push(id);
                        }
                    }
                }
            }
        },
    });
    var iframe,
        getStyles,
        curCSS,
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = {
            BODY: "block",
        },
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block",
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400,
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    function vendorPropName(style, name) {
        if (name in style) {
            return name;
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name;
            }
        }
        return origName;
    }

    function isHidden(elem, el) {
        elem = el || elem;
        return (
            hopeU.css(elem, "display") === "none" ||
            !hopeU.contains(elem.ownerDocument, elem)
        );
    }

    function showHide(elements, show) {
        var display,
            elem,
            hidden,
            values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            values[index] = hopeU._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = hopeU._data(
                        elem,
                        "olddisplay",
                        css_defaultDisplay(elem.nodeName)
                    );
                }
            } else {
                if (!values[index]) {
                    hidden = isHidden(elem);
                    if ((display && display !== "none") || !hidden) {
                        hopeU._data(
                            elem,
                            "olddisplay",
                            hidden ? display : hopeU.css(elem, "display")
                        );
                    }
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (
                !show ||
                elem.style.display === "none" ||
                elem.style.display === ""
            ) {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }
        return elements;
    }
    hopeU.fn.extend({
        css: function (name, value) {
            return hopeU.access(
                this,
                function (elem, name, value) {
                    var len,
                        styles,
                        map = {},
                        i = 0;
                    if (hopeU.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (; i < len; i++) {
                            map[name[i]] = hopeU.css(
                                elem,
                                name[i],
                                false,
                                styles
                            );
                        }
                        return map;
                    }
                    return value !== undefined
                        ? hopeU.style(elem, name, value)
                        : hopeU.css(elem, name);
                },
                name,
                value,
                arguments.length > 1
            );
        },
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            var bool = typeof state === "boolean";
            return this.each(function () {
                if (bool ? state : isHidden(this)) {
                    hopeU(this).show();
                } else {
                    hopeU(this).hide();
                }
            });
        },
    });
    hopeU.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                },
            },
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true,
        },
        cssProps: {
            float: hopeU.support.cssFloat ? "cssFloat" : "styleFloat",
        },
        style: function (elem, name, value, extra) {
            if (
                !elem ||
                elem.nodeType === 3 ||
                elem.nodeType === 8 ||
                !elem.style
            ) {
                return;
            }
            var ret,
                type,
                hooks,
                origName = hopeU.camelCase(name),
                style = elem.style;
            name =
                hopeU.cssProps[origName] ||
                (hopeU.cssProps[origName] = vendorPropName(style, origName));
            hooks = hopeU.cssHooks[name] || hopeU.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value =
                        (ret[1] + 1) * ret[2] +
                        parseFloat(hopeU.css(elem, name));
                    type = "number";
                }
                if (value == null || (type === "number" && isNaN(value))) {
                    return;
                }
                if (type === "number" && !hopeU.cssNumber[origName]) {
                    value += "px";
                }
                if (
                    !hopeU.support.clearCloneStyle &&
                    value === "" &&
                    name.indexOf("background") === 0
                ) {
                    style[name] = "inherit";
                }
                if (
                    !hooks ||
                    !("set" in hooks) ||
                    (value = hooks.set(elem, value, extra)) !== undefined
                ) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (
                    hooks &&
                    "get" in hooks &&
                    (ret = hooks.get(elem, false, extra)) !== undefined
                ) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra, styles) {
            var num,
                val,
                hooks,
                origName = hopeU.camelCase(name);
            name =
                hopeU.cssProps[origName] ||
                (hopeU.cssProps[origName] = vendorPropName(
                    elem.style,
                    origName
                ));
            hooks = hopeU.cssHooks[name] || hopeU.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || hopeU.isNumeric(num) ? num || 0 : val;
            }
            return val;
        },
        swap: function (elem, options, callback, args) {
            var ret,
                name,
                old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        },
    });
    if (window.getComputedStyle) {
        getStyles = function (elem) {
            return window.getComputedStyle(elem, null);
        };
        curCSS = function (elem, name, _computed) {
            var width,
                minWidth,
                maxWidth,
                computed = _computed || getStyles(elem),
                ret = computed
                    ? computed.getPropertyValue(name) || computed[name]
                    : undefined,
                style = elem.style;
            if (computed) {
                if (ret === "" && !hopeU.contains(elem.ownerDocument, elem)) {
                    ret = hopeU.style(elem, name);
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        getStyles = function (elem) {
            return elem.currentStyle;
        };
        curCSS = function (elem, name, _computed) {
            var left,
                rs,
                rsLeft,
                computed = _computed || getStyles(elem),
                ret = computed ? computed[name] : undefined,
                style = elem.style;
            if (ret == null && style && style[name]) {
                ret = style[name];
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches
            ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px")
            : value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i =
                extra === (isBorderBox ? "border" : "content")
                    ? 4
                    : name === "width"
                    ? 1
                    : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += hopeU.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= hopeU.css(
                        elem,
                        "padding" + cssExpand[i],
                        true,
                        styles
                    );
                }
                if (extra !== "margin") {
                    val -= hopeU.css(
                        elem,
                        "border" + cssExpand[i] + "Width",
                        true,
                        styles
                    );
                }
            } else {
                val += hopeU.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += hopeU.css(
                        elem,
                        "border" + cssExpand[i] + "Width",
                        true,
                        styles
                    );
                }
            }
        }
        return val;
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox =
                hopeU.support.boxSizing &&
                hopeU.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }
            if (rnumnonpx.test(val)) {
                return val;
            }
            valueIsBorderBox =
                isBorderBox &&
                (hopeU.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0;
        }
        return (
            val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles
            ) +
            "px"
        );
    }

    function css_defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (
                    iframe ||
                    hopeU("<iframe frameborder='0' width='0' height='0'/>").css(
                        "cssText",
                        "display:block !important"
                    )
                ).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument)
                    .document;
                doc.write("<!doctype html><html><body>");
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }
            elemdisplay[nodeName] = display;
        }
        return display;
    }

    function actualDisplay(name, doc) {
        var elem = hopeU(doc.createElement(name)).appendTo(doc.body),
            display = hopeU.css(elem[0], "display");
        elem.remove();
        return display;
    }
    hopeU.each(["height", "width"], function (i, name) {
        hopeU.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) {
                    return elem.offsetWidth === 0 &&
                        rdisplayswap.test(hopeU.css(elem, "display"))
                        ? hopeU.swap(elem, cssShow, function () {
                              return getWidthOrHeight(elem, name, extra);
                          })
                        : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function (elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(
                    elem,
                    value,
                    extra
                        ? augmentWidthOrHeight(
                              elem,
                              name,
                              extra,
                              hopeU.support.boxSizing &&
                                  hopeU.css(
                                      elem,
                                      "boxSizing",
                                      false,
                                      styles
                                  ) === "border-box",
                              styles
                          )
                        : 0
                );
            },
        };
    });
    if (!hopeU.support.opacity) {
        hopeU.cssHooks.opacity = {
            get: function (elem, computed) {
                return ropacity.test(
                    (computed && elem.currentStyle
                        ? elem.currentStyle.filter
                        : elem.style.filter) || ""
                )
                    ? 0.01 * parseFloat(RegExp.$1) + ""
                    : computed
                    ? "1"
                    : "";
            },
            set: function (elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = hopeU.isNumeric(value)
                        ? "alpha(opacity=" + value * 100 + ")"
                        : "",
                    filter =
                        (currentStyle && currentStyle.filter) ||
                        style.filter ||
                        "";
                style.zoom = 1;
                if (
                    (value >= 1 || value === "") &&
                    hopeU.trim(filter.replace(ralpha, "")) === "" &&
                    style.removeAttribute
                ) {
                    style.removeAttribute("filter");
                    if (
                        value === "" ||
                        (currentStyle && !currentStyle.filter)
                    ) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter)
                    ? filter.replace(ralpha, opacity)
                    : filter + " " + opacity;
            },
        };
    }
    hopeU(function () {
        if (!hopeU.support.reliableMarginRight) {
            hopeU.cssHooks.marginRight = {
                get: function (elem, computed) {
                    if (computed) {
                        return hopeU.swap(
                            elem,
                            {
                                display: "inline-block",
                            },
                            curCSS,
                            [elem, "marginRight"]
                        );
                    }
                },
            };
        }
        if (!hopeU.support.pixelPosition && hopeU.fn.position) {
            hopeU.each(["top", "left"], function (i, prop) {
                hopeU.cssHooks[prop] = {
                    get: function (elem, computed) {
                        if (computed) {
                            computed = curCSS(elem, prop);
                            return rnumnonpx.test(computed)
                                ? hopeU(elem).position()[prop] + "px"
                                : computed;
                        }
                    },
                };
            });
        }
    });
    if (hopeU.expr && hopeU.expr.filters) {
        hopeU.expr.filters.hidden = function (elem) {
            return (
                (elem.offsetWidth <= 0 && elem.offsetHeight <= 0) ||
                (!hopeU.support.reliableHiddenOffsets &&
                    ((elem.style && elem.style.display) ||
                        hopeU.css(elem, "display")) === "none")
            );
        };
        hopeU.expr.filters.visible = function (elem) {
            return !hopeU.expr.filters.hidden(elem);
        };
    }
    hopeU.each(
        {
            margin: "",
            padding: "",
            border: "Width",
        },
        function (prefix, suffix) {
            hopeU.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0,
                        expanded = {},
                        parts =
                            typeof value === "string"
                                ? value.split(" ")
                                : [value];
                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] =
                            parts[i] || parts[i - 2] || parts[0];
                    }
                    return expanded;
                },
            };
            if (!rmargin.test(prefix)) {
                hopeU.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        }
    );
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    hopeU.fn.extend({
        serialize: function () {
            return hopeU.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var elements = hopeU.prop(this, "elements");
                return elements ? hopeU.makeArray(elements) : this;
            })
                .filter(function () {
                    var type = this.type;
                    return (
                        this.name &&
                        !hopeU(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) &&
                        !rsubmitterTypes.test(type) &&
                        (this.checked ||
                            !manipulation_rcheckableType.test(type))
                    );
                })
                .map(function (i, elem) {
                    var val = hopeU(this).val();
                    return val == null
                        ? null
                        : hopeU.isArray(val)
                        ? hopeU.map(val, function (val) {
                              return {
                                  name: elem.name,
                                  value: val.replace(rCRLF, "\r\n"),
                              };
                          })
                        : {
                              name: elem.name,
                              value: val.replace(rCRLF, "\r\n"),
                          };
                })
                .get();
        },
    });
    hopeU.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, value) {
                value = hopeU.isFunction(value)
                    ? value()
                    : value == null
                    ? ""
                    : value;
                s[s.length] =
                    encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
        if (traditional === undefined) {
            traditional = hopeU.ajaxSettings && hopeU.ajaxSettings.traditional;
        }
        if (hopeU.isArray(a) || (a.hopeu && !hopeU.isPlainObject(a))) {
            hopeU.each(a, function () {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (hopeU.isArray(obj)) {
            hopeU.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(
                        prefix + "[" + (typeof v === "object" ? i : "") + "]",
                        v,
                        traditional,
                        add
                    );
                }
            });
        } else if (!traditional && hopeU.type(obj) === "object") {
            for (name in obj) {
                buildParams(
                    prefix + "[" + name + "]",
                    obj[name],
                    traditional,
                    add
                );
            }
        } else {
            add(prefix, obj);
        }
    }
    hopeU.each(
        (
            "blur focus focusin focusout load resize scroll unload click dblclick " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup error contextmenu"
        ).split(" "),
        function (i, name) {
            hopeU.fn[name] = function (data, fn) {
                return arguments.length > 0
                    ? this.on(name, null, data, fn)
                    : this.trigger(name);
            };
        }
    );
    hopeU.fn.hover = function (fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    };
    var ajaxLocParts,
        ajaxLocation,
        ajax_nonce = hopeU.now(),
        ajax_rquery = /\?/,
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = hopeU.fn.load,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType,
                i = 0,
                dataTypes =
                    dataTypeExpression.toLowerCase().match(core_rnotwhite) ||
                    [];
            if (hopeU.isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] =
                            structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(
                            func
                        );
                    }
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(
        structure,
        options,
        originalOptions,
        hopeXHR
    ) {
        var inspected = {},
            seekingTransport = structure === transports;

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            hopeU.each(structure[dataType] || [], function (
                _,
                prefilterOrFactory
            ) {
                var dataTypeOrTransport = prefilterOrFactory(
                    options,
                    originalOptions,
                    hopeXHR
                );
                if (
                    typeof dataTypeOrTransport === "string" &&
                    !seekingTransport &&
                    !inspected[dataTypeOrTransport]
                ) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return (
            inspect(options.dataTypes[0]) || (!inspected["*"] && inspect("*"))
        );
    }

    function ajaxExtend(target, src) {
        var deep,
            key,
            flatOptions = hopeU.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] =
                    src[key];
            }
        }
        if (deep) {
            hopeU.extend(true, target, deep);
        }
        return target;
    }
    hopeU.fn.load = function (url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }
        var selector,
            response,
            type,
            self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }
        if (hopeU.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            hopeU
                .ajax({
                    url: url,
                    type: type,
                    dataType: "html",
                    data: params,
                })
                .done(function (responseText) {
                    response = arguments;
                    self.html(
                        selector
                            ? hopeU("<div>")
                                  .append(hopeU.parseHTML(responseText))
                                  .find(selector)
                            : responseText
                    );
                })
                .complete(
                    callback &&
                        function (hopeXHR, status) {
                            self.each(
                                callback,
                                response || [
                                    hopeXHR.responseText,
                                    status,
                                    hopeXHR,
                                ]
                            );
                        }
                );
        }
        return this;
    };
    hopeU.each(
        [
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend",
        ],
        function (i, type) {
            hopeU.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        }
    );
    hopeU.each(["get", "post"], function (i, method) {
        hopeU[method] = function (url, data, callback, type) {
            if (hopeU.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return hopeU.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback,
            });
        };
    });
    hopeU.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/,
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": hopeU.parseJSON,
                "text xml": hopeU.parseXML,
            },
            flatOptions: {
                url: true,
                context: true,
            },
        },
        ajaxSetup: function (target, settings) {
            return settings
                ? ajaxExtend(ajaxExtend(target, hopeU.ajaxSettings), settings)
                : ajaxExtend(hopeU.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var parts,
                i,
                cacheURL,
                responseHeadersString,
                timeoutTimer,
                fireGlobals,
                transport,
                responseHeaders,
                s = hopeU.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext =
                    s.context &&
                    (callbackContext.nodeType || callbackContext.hopeu)
                        ? hopeU(callbackContext)
                        : hopeU.event,
                deferred = hopeU.Deferred(),
                completeDeferred = hopeU.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                hopeXHR = {
                    readyState: 0,
                    getResponseHeader: function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (
                                    (match = rheaders.exec(
                                        responseHeadersString
                                    ))
                                ) {
                                    responseHeaders[match[1].toLowerCase()] =
                                        match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function () {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function (name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] =
                                requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [
                                        statusCode[code],
                                        map[code],
                                    ];
                                }
                            } else {
                                hopeXHR.always(map[hopeXHR.status]);
                            }
                        }
                        return this;
                    },
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    },
                };
            deferred.promise(hopeXHR).complete = completeDeferred.add;
            hopeXHR.success = hopeXHR.done;
            hopeXHR.error = hopeXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "")
                .replace(rhash, "")
                .replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = hopeU
                .trim(s.dataType || "*")
                .toLowerCase()
                .match(core_rnotwhite) || [""];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(
                    parts &&
                    (parts[1] !== ajaxLocParts[1] ||
                        parts[2] !== ajaxLocParts[2] ||
                        (parts[3] || (parts[1] === "http:" ? 80 : 443)) !=
                            (ajaxLocParts[3] ||
                                (ajaxLocParts[1] === "http:" ? 80 : 443)))
                );
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = hopeU.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, hopeXHR);
            if (state === 2) {
                return hopeXHR;
            }
            fireGlobals = s.global;
            if (fireGlobals && hopeU.active++ === 0) {
                hopeU.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = s.url +=
                        (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL)
                        ? cacheURL.replace(rts, "$1_=" + ajax_nonce++)
                        : cacheURL +
                          (ajax_rquery.test(cacheURL) ? "&" : "?") +
                          "_=" +
                          ajax_nonce++;
                }
            }
            if (s.ifModified) {
                if (hopeU.lastModified[cacheURL]) {
                    hopeXHR.setRequestHeader(
                        "If-Modified-Since",
                        hopeU.lastModified[cacheURL]
                    );
                }
                if (hopeU.etag[cacheURL]) {
                    hopeXHR.setRequestHeader(
                        "If-None-Match",
                        hopeU.etag[cacheURL]
                    );
                }
            }
            if (
                (s.data && s.hasContent && s.contentType !== false) ||
                options.contentType
            ) {
                hopeXHR.setRequestHeader("Content-Type", s.contentType);
            }
            hopeXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]]
                    ? s.accepts[s.dataTypes[0]] +
                          (s.dataTypes[0] !== "*"
                              ? ", " + allTypes + "; q=0.01"
                              : "")
                    : s.accepts["*"]
            );
            for (i in s.headers) {
                hopeXHR.setRequestHeader(i, s.headers[i]);
            }
            if (
                s.beforeSend &&
                (s.beforeSend.call(callbackContext, hopeXHR, s) === false ||
                    state === 2)
            ) {
                return hopeXHR.abort();
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1,
            }) {
                hopeXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(
                transports,
                s,
                options,
                hopeXHR
            );
            if (!transport) {
                done(-1, "No Transport");
            } else {
                hopeXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [hopeXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        hopeXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess,
                    success,
                    error,
                    response,
                    modified,
                    statusText = nativeStatusText;
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                hopeXHR.readyState = status > 0 ? 4 : 0;
                if (responses) {
                    response = ajaxHandleResponses(s, hopeXHR, responses);
                }
                if ((status >= 200 && status < 300) || status === 304) {
                    if (s.ifModified) {
                        modified = hopeXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            hopeU.lastModified[cacheURL] = modified;
                        }
                        modified = hopeXHR.getResponseHeader("etag");
                        if (modified) {
                            hopeU.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204) {
                        isSuccess = true;
                        statusText = "nocontent";
                    } else if (status === 304) {
                        isSuccess = true;
                        statusText = "notmodified";
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                hopeXHR.status = status;
                hopeXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [
                        success,
                        statusText,
                        hopeXHR,
                    ]);
                } else {
                    deferred.rejectWith(callbackContext, [
                        hopeXHR,
                        statusText,
                        error,
                    ]);
                }
                hopeXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(
                        isSuccess ? "ajaxSuccess" : "ajaxError",
                        [hopeXHR, s, isSuccess ? success : error]
                    );
                }
                completeDeferred.fireWith(callbackContext, [
                    hopeXHR,
                    statusText,
                ]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [hopeXHR, s]);
                    if (!--hopeU.active) {
                        hopeU.event.trigger("ajaxStop");
                    }
                }
            }
            return hopeXHR;
        },
        getScript: function (url, callback) {
            return hopeU.get(url, undefined, callback, "script");
        },
        getJSON: function (url, data, callback) {
            return hopeU.get(url, data, callback, "json");
        },
    });

    function ajaxHandleResponses(s, hopeXHR, responses) {
        var firstDataType,
            ct,
            finalDataType,
            type,
            contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                hopeXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || hopeXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        var conv2,
            current,
            conv,
            tmp,
            converters = {},
            i = 0,
            dataTypes = s.dataTypes.slice(),
            prev = dataTypes[0];
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        for (; (current = dataTypes[++i]); ) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv =
                        converters[prev + " " + current] ||
                        converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv =
                                    converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.splice(i--, 0, current);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv
                                        ? e
                                        : "No conversion from " +
                                          prev +
                                          " to " +
                                          current,
                                };
                            }
                        }
                    }
                }
                prev = current;
            }
        }
        return {
            state: "success",
            data: response,
        };
    }
    hopeU.ajaxSetup({
        accepts: {
            script:
                "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: {
            script: /(?:java|ecma)script/,
        },
        converters: {
            "text script": function (text) {
                hopeU.globalEval(text);
                return text;
            },
        },
    });
    hopeU.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    hopeU.ajaxTransport("script", function (s) {
        if (s.crossDomain) {
            var script,
                head =
                    document.head ||
                    hopeU("head")[0] ||
                    document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function (
                        _,
                        isAbort
                    ) {
                        if (
                            isAbort ||
                            !script.readyState ||
                            /loaded|complete/.test(script.readyState)
                        ) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }
                            script = null;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function () {
                    if (script) {
                        script.onload(undefined, true);
                    }
                },
            };
        }
    });

    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    hopeU.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback =
                oldCallbacks.pop() || hopeU.expando + "_" + ajax_nonce++;
            this[callback] = true;
            return callback;
        },
    });
    hopeU.ajaxPrefilter("json jsonp", function (s, originalSettings, hopeXHR) {
        var callbackName,
            overwritten,
            responseContainer,
            jsonProp =
                s.jsonp !== false &&
                (rjsonp.test(s.url)
                    ? "url"
                    : typeof s.data === "string" &&
                      !(s.contentType || "").indexOf(
                          "application/x-www-form-urlencoded"
                      ) &&
                      rjsonp.test(s.data) &&
                      "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = hopeU.isFunction(s.jsonpCallback)
                ? s.jsonpCallback()
                : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url +=
                    (ajax_rquery.test(s.url) ? "&" : "?") +
                    s.jsonp +
                    "=" +
                    callbackName;
            }
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    hopeU.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };
            hopeXHR.always(function () {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && hopeU.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    var xhrCallbacks,
        xhrSupported,
        xhrId = 0,
        xhrOnUnloadAbort =
            window.ActiveXObject &&
            function () {
                var key;
                for (key in xhrCallbacks) {
                    xhrCallbacks[key](undefined, true);
                }
            };

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    hopeU.ajaxSettings.xhr = window.ActiveXObject
        ? function () {
              return (
                  (!this.isLocal && createStandardXHR()) || createActiveXHR()
              );
          }
        : createStandardXHR;
    xhrSupported = hopeU.ajaxSettings.xhr();
    hopeU.support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    xhrSupported = hopeU.support.ajax = !!xhrSupported;
    if (xhrSupported) {
        hopeU.ajaxTransport(function (s) {
            if (!s.crossDomain || hopeU.support.cors) {
                var callback;
                return {
                    send: function (headers, complete) {
                        var handle,
                            i,
                            xhr = s.xhr();
                        if (s.username) {
                            xhr.open(
                                s.type,
                                s.url,
                                s.async,
                                s.username,
                                s.password
                            );
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (err) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function (_, isAbort) {
                            var status, responseHeaders, statusText, responses;
                            try {
                                if (
                                    callback &&
                                    (isAbort || xhr.readyState === 4)
                                ) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = hopeU.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle];
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        responses = {};
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        if (
                                            typeof xhr.responseText === "string"
                                        ) {
                                            responses.text = xhr.responseText;
                                        }
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (
                                            !status &&
                                            s.isLocal &&
                                            !s.crossDomain
                                        ) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(
                                    status,
                                    statusText,
                                    responses,
                                    responseHeaders
                                );
                            }
                        };
                        if (!s.async) {
                            callback();
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback);
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    hopeU(window).unload(xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback(undefined, true);
                        }
                    },
                };
            }
        });
    }
    hopeU.each(
        {
            Height: "height",
            Width: "width",
        },
        function (name, type) {
            hopeU.each(
                {
                    padding: "inner" + name,
                    content: type,
                    "": "outer" + name,
                },
                function (defaultExtra, funcName) {
                    hopeU.fn[funcName] = function (margin, value) {
                        var chainable =
                                arguments.length &&
                                (defaultExtra || typeof margin !== "boolean"),
                            extra =
                                defaultExtra ||
                                (margin === true || value === true
                                    ? "margin"
                                    : "border");
                        return hopeU.access(
                            this,
                            function (elem, type, value) {
                                var doc;
                                if (hopeU.isWindow(elem)) {
                                    return elem.document.documentElement[
                                        "client" + name
                                    ];
                                }
                                if (elem.nodeType === 9) {
                                    doc = elem.documentElement;
                                    return Math.max(
                                        elem.body["scroll" + name],
                                        doc["scroll" + name],
                                        elem.body["offset" + name],
                                        doc["offset" + name],
                                        doc["client" + name]
                                    );
                                }
                                return value === undefined
                                    ? hopeU.css(elem, type, extra)
                                    : hopeU.style(elem, type, value, extra);
                            },
                            type,
                            chainable ? margin : undefined,
                            chainable,
                            null
                        );
                    };
                }
            );
        }
    );

    window.hopeU = hopeU;
    module.exports = hopeU;
})(window);
