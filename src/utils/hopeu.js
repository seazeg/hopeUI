let Hopeu = (function () {
  let undefined,
    key,
    hh,
    classList,
    emptyArray = [],
    slice = emptyArray.slice,
    filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {},
    classCache = {},
    cssNumber = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1,
    },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,
    // special attributes that should be get/set via method calls
    methodAttributes = [
      "val",
      "css",
      "html",
      "text",
      "data",
      "width",
      "height",
      "offset",
    ],
    adjacencyOperators = ["after", "prepend", "before", "append"],
    table = document.createElement("table"),
    tableRow = document.createElement("tr"),
    containers = {
      tr: document.createElement("tbody"),
      tbody: table,
      thead: table,
      tfoot: table,
      td: tableRow,
      th: tableRow,
      "*": document.createElement("div"),
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    hopeu = {},
    camelize,
    uniq,
    tempParent = document.createElement("div"),
    propMap = {
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
    isArray =
    Array.isArray ||
    function (object) {
      return object instanceof Array;
    };

  hopeu.matches = function (element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    let matchesSelector =
      element.webkitMatchesSelector ||
      element.mozMatchesSelector ||
      element.oMatchesSelector ||
      element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    let match,
      parent = element.parentNode,
      temp = !parent;
    if (temp)(parent = tempParent).appendChild(element);
    match = ~hopeu.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  };

  function type(obj) {
    return obj == null ?
      String(obj) :
      class2type[toString.call(obj)] || "object";
  }

  function isFunction(value) {
    return type(value) == "function";
  }

  function isWindow(obj) {
    return obj != null && obj == obj.window;
  }

  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  }

  function isObject(obj) {
    return type(obj) == "object";
  }

  function isPlainObject(obj) {
    return (
      isObject(obj) &&
      !isWindow(obj) &&
      Object.getPrototypeOf(obj) == Object.prototype
    );
  }

  function likeArray(obj) {
    return typeof obj.length == "number";
  }

  function compact(array) {
    return filter.call(array, function (item) {
      return item != null;
    });
  }

  function flatten(array) {
    return array.length > 0 ? hh.fn.concat.apply([], array) : array;
  }
  camelize = function (str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
      return chr ? chr.toUpperCase() : "";
    });
  };

  function dasherize(str) {
    return str
      .replace(/::/g, "/")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/_/g, "-")
      .toLowerCase();
  }
  uniq = function (array) {
    return filter.call(array, function (item, idx) {
      return array.indexOf(item) == idx;
    });
  };

  function classRE(name) {
    return name in classCache ?
      classCache[name] :
      (classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)"));
  }

  function maybeAddPx(name, value) {
    return typeof value == "number" && !cssNumber[dasherize(name)] ?
      value + "px" :
      value;
  }

  function defaultDisplay(nodeName) {
    let element, display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, "").getPropertyValue("display");
      element.parentNode.removeChild(element);
      display == "none" && (display = "block");
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
  }

  function children(element) {
    return "children" in element ?
      slice.call(element.children) :
      hh.map(element.childNodes, function (node) {
        if (node.nodeType == 1) return node;
      });
  }

  // `hh.hopeu.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  hopeu.fragment = function (html, name, properties) {
    let dom, nodes, container;

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = hh(document.createElement(RegExp.$1));

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
      if (!(name in containers)) name = "*";

      container = containers[name];
      container.innerHTML = "" + html;
      dom = hh.each(slice.call(container.childNodes), function () {
        container.removeChild(this);
      });
    }

    if (isPlainObject(properties)) {
      nodes = hh(dom);
      hh.each(properties, function (key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);
        else nodes.attr(key, value);
      });
    }

    return dom;
  };

  // `hh.hopeu.Z` swaps out the prototype of the given `dom` array
  // of nodes with `hh.fn` and thus supplying all the Hopeu functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  hopeu.Z = function (dom, selector) {
    dom = dom || [];
    dom.__proto__ = hh.fn;
    dom.selector = selector || "";
    return dom;
  };

  // `hh.hopeu.isZ` should return `true` if the given object is a Hopeu
  // collection. This method can be overriden in plugins.
  hopeu.isZ = function (object) {
    return object instanceof hopeu.Z;
  };

  // `hh.hopeu.init` is Hopeu's counterpart to jQuery's `hh.fn.init` and
  // takes a CSS selector and an optional context (and handles letious
  // special cases).
  // This method can be overriden in plugins.
  hopeu.init = function (selector, context) {
    let dom;
    // If nothing given, return an empty Hopeu collection
    if (!selector) return hopeu.Z();
    // Optimize for string selectors
    else if (typeof selector == "string") {
      selector = selector.trim();
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == "<" && fragmentRE.test(selector))
        (dom = hopeu.fragment(selector, RegExp.$1, context)),
        (selector = null);
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return hh(context).find(selector);
      // If it's a CSS selector, use it to select nodes.
      else dom = hopeu.qsa(document, selector);
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return hh(document).ready(selector);
    // If a Hopeu collection is given, just return it
    else if (hopeu.isZ(selector)) return selector;
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector);
      // Wrap DOM nodes.
      else if (isObject(selector))(dom = [selector]), (selector = null);
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        (dom = hopeu.fragment(selector.trim(), RegExp.$1, context)),
        (selector = null);
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return hh(context).find(selector);
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = hopeu.qsa(document, selector);
    }
    // create a new Hopeu collection from the nodes found
    return hopeu.Z(dom, selector);
  };

  // `$` will be the base `Hopeu` object. When calling this
  // function just call `hh.hopeu.init, which makes the implementation
  // details of selecting nodes and creating Hopeu collections
  // patchable in plugins.
  hh = function (selector, context) {
    return hopeu.init(selector, context);
  };

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {};
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = [];
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) target[key] = source[key];
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  hh.extend = function (target) {
    let deep,
      args = slice.call(arguments, 1);
    if (typeof target == "boolean") {
      deep = target;
      target = args.shift();
    }
    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };

  // `hh.hopeu.qsa` is Hopeu's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  hopeu.qsa = function (element, selector) {
    let found,
      maybeID = selector[0] == "#",
      maybeClass = !maybeID && selector[0] == ".",
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
      isSimple = simpleSelectorRE.test(nameOnly);
    return isDocument(element) && isSimple && maybeID ?
      (found = element.getElementById(nameOnly)) ?
      [found] :
      [] :
      element.nodeType !== 1 && element.nodeType !== 9 ?
      [] :
      slice.call(
        isSimple && !maybeID ?
        maybeClass ?
        element.getElementsByClassName(nameOnly) // If it's simple, it could be a class
        :
        element.getElementsByTagName(selector) // Or a tag
        :
        element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      );
  };

  function filtered(nodes, selector) {
    return selector == null ? hh(nodes) : hh(nodes).filter(selector);
  }

  hh.contains = document.documentElement.contains ?
    function (parent, node) {
      return parent !== node && parent.contains(node);
    } :
    function (parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true;
      return false;
    };

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  }

  function setAttribute(node, name, value) {
    value == null ?
      node.removeAttribute(name) :
      node.setAttribute(name, value);
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value) {
    let klass = node.className || "",
      svg = klass && klass.baseVal !== undefined;

    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? (klass.baseVal = value) : (node.className = value);
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        (value == "false" ?
          false :
          value == "null" ?
          null :
          +value + "" == value ?
          +value :
          /^[\[\{]/.test(value) ?
          hh.parseJSON(value) :
          value) :
        value;
    } catch (e) {
      return value;
    }
  }

  hh.type = type;
  hh.isFunction = isFunction;
  hh.isWindow = isWindow;
  hh.isArray = isArray;
  hh.isPlainObject = isPlainObject;

  hh.isEmptyObject = function (obj) {
    let name;
    for (name in obj) return false;
    return true;
  };

  hh.inArray = function (elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
  };

  hh.camelCase = camelize;
  hh.trim = function (str) {
    return str == null ? "" : String.prototype.trim.call(str);
  };

  // plugin compatibility
  hh.uuid = 0;
  hh.support = {};
  hh.expr = {};

  hh.map = function (elements, callback) {
    let value,
      values = [],
      i,
      key;
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) values.push(value);
      }
    else
      for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) values.push(value);
      }
    return flatten(values);
  };

  hh.each = function (elements, callback) {
    let i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false)
          return elements;
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false)
          return elements;
    }

    return elements;
  };

  hh.grep = function (elements, callback) {
    return filter.call(elements, callback);
  };

  if (window.JSON) hh.parseJSON = JSON.parse;

  // Populate the class2type map
  hh.each(
    "Boolean Number String Function Array Date RegExp Object Error".split(
      " "
    ),
    function (i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );

  // Define methods that will be available on all
  // Hopeu collections
  hh.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function (fn) {
      return hh(
        hh.map(this, function (el, i) {
          return fn.call(el, i, el);
        })
      );
    },
    slice: function () {
      return hh(slice.apply(this, arguments));
    },

    ready: function (callback) {
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body)
        callback(hh);
      else
        document.addEventListener(
          "DOMContentLoaded",
          function () {
            callback(hh);
          },
          false
        );
      return this;
    },
    get: function (idx) {
      return idx === undefined ?
        slice.call(this) :
        this[idx >= 0 ? idx : idx + this.length];
    },
    toArray: function () {
      return this.get();
    },
    size: function () {
      return this.length;
    },
    remove: function () {
      return this.each(function () {
        if (this.parentNode != null) this.parentNode.removeChild(this);
      });
    },
    each: function (callback) {
      emptyArray.every.call(this, function (el, idx) {
        return callback.call(el, idx, el) !== false;
      });
      return this;
    },
    filter: function (selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return hh(
        filter.call(this, function (element) {
          return hopeu.matches(element, selector);
        })
      );
    },
    add: function (selector, context) {
      return hh(uniq(this.concat(hh(selector, context))));
    },
    is: function (selector) {
      return this.length > 0 && hopeu.matches(this[0], selector);
    },
    not: function (selector) {
      let nodes = [];
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function (idx) {
          if (!selector.call(this, idx)) nodes.push(this);
        });
      else {
        let excludes =
          typeof selector == "string" ?
          this.filter(selector) :
          likeArray(selector) && isFunction(selector.item) ?
          slice.call(selector) :
          hh(selector);
        this.forEach(function (el) {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      }
      return hh(nodes);
    },
    has: function (selector) {
      return this.filter(function () {
        return isObject(selector) ?
          hh.contains(this, selector) :
          hh(this).find(selector).size();
      });
    },
    eq: function (idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
    },
    first: function () {
      let el = this[0];
      return el && !isObject(el) ? el : hh(el);
    },
    last: function () {
      let el = this[this.length - 1];
      return el && !isObject(el) ? el : hh(el);
    },
    find: function (selector) {
      let result,
        $this = this;
      if (!selector) result = hh();
      else if (typeof selector == "object")
        result = hh(selector).filter(function () {
          let node = this;
          return emptyArray.some.call($this, function (parent) {
            return hh.contains(parent, node);
          });
        });
      else if (this.length == 1)
        result = hh(hopeu.qsa(this[0], selector));
      else
        result = this.map(function () {
          return hopeu.qsa(this, selector);
        });
      return result;
    },
    closest: function (selector, context) {
      let node = this[0],
        collection = false;
      if (typeof selector == "object") collection = hh(selector);
      while (
        node &&
        !(collection ?
          collection.indexOf(node) >= 0 :
          hopeu.matches(node, selector))
      )
        node = node !== context && !isDocument(node) && node.parentNode;
      return hh(node);
    },
    parents: function (selector) {
      let ancestors = [],
        nodes = this;
      while (nodes.length > 0)
        nodes = hh.map(nodes, function (node) {
          if (
            (node = node.parentNode) &&
            !isDocument(node) &&
            ancestors.indexOf(node) < 0
          ) {
            ancestors.push(node);
            return node;
          }
        });
      return filtered(ancestors, selector);
    },
    parent: function (selector) {
      return filtered(uniq(this.pluck("parentNode")), selector);
    },
    children: function (selector) {
      return filtered(
        this.map(function () {
          return children(this);
        }),
        selector
      );
    },
    contents: function () {
      return this.map(function () {
        return slice.call(this.childNodes);
      });
    },
    siblings: function (selector) {
      return filtered(
        this.map(function (i, el) {
          return filter.call(children(el.parentNode), function (
            child
          ) {
            return child !== el;
          });
        }),
        selector
      );
    },
    empty: function () {
      return this.each(function () {
        this.innerHTML = "";
      });
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function (property) {
      return hh.map(this, function (el) {
        return el[property];
      });
    },
    show: function () {
      return this.each(function () {
        this.style.display == "none" && (this.style.display = "");
        if (
          getComputedStyle(this, "").getPropertyValue("display") ==
          "none"
        )
          this.style.display = defaultDisplay(this.nodeName);
      });
    },
    replaceWith: function (newContent) {
      return this.before(newContent).remove();
    },
    wrap: function (structure) {
      let func = isFunction(structure),
        dom = null,
        clone = null;
      if (this[0] && !func) {
        dom = hh(structure).get(0);
        clone = dom.parentNode || this.length > 1;
      }

      return this.each(function (index) {
        hh(this).wrapAll(
          func ?
          structure.call(this, index) :
          clone ?
          dom.cloneNode(true) :
          dom
        );
      });
    },
    wrapAll: function (structure) {
      if (this[0]) {
        hh(this[0]).before((structure = hh(structure)));
        let children;
        // drill down to the inmost element
        while ((children = structure.children()).length)
          structure = children.first();
        hh(structure).append(this);
      }
      return this;
    },
    wrapInner: function (structure) {
      let func = isFunction(structure);
      return this.each(function (index) {
        let self = hh(this),
          contents = self.contents(),
          dom = func ? structure.call(this, index) : structure;
        contents.length ? contents.wrapAll(dom) : self.append(dom);
      });
    },
    unwrap: function () {
      this.parent().each(function () {
        hh(this).replaceWith(hh(this).children());
      });
      return this;
    },
    clone: function () {
      return this.map(function () {
        return this.cloneNode(true);
      });
    },
    hide: function () {
      return this.css("display", "none");
    },
    toggle: function (setting) {
      return this.each(function () {
        let el = hh(this);
        (setting === undefined ? el.css("display") == "none" : setting) ?
        el.show(): el.hide();
      });
    },
    prev: function (selector) {
      return hh(this.pluck("previousElementSibling")).filter(
        selector || "*"
      );
    },
    next: function (selector) {
      return hh(this.pluck("nextElementSibling")).filter(selector || "*");
    },
    html: function (html) {
      return 0 in arguments ?
        this.each(function (idx) {
          let originHtml = this.innerHTML;
          hh(this)
            .empty()
            .append(funcArg(this, html, idx, originHtml));
        }) :
        0 in this ?
        this[0].innerHTML :
        null;
    },
    text: function (text) {
      return 0 in arguments ?
        this.each(function (idx) {
          let newText = funcArg(this, text, idx, this.textContent);
          this.textContent = newText == null ? "" : "" + newText;
        }) :
        0 in this ?
        this[0].textContent :
        null;
    },
    attr: function (name, value) {
      let result;
      return typeof name == "string" && !(1 in arguments) ?
        !this.length || this[0].nodeType !== 1 ?
        undefined :
        !(result = this[0].getAttribute(name)) && name in this[0] ?
        this[0][name] :
        result :
        this.each(function (idx) {
          if (this.nodeType !== 1) return;
          if (isObject(name))
            for (key in name) setAttribute(this, key, name[key]);
          else
            setAttribute(
              this,
              name,
              funcArg(this, value, idx, this.getAttribute(name))
            );
        });
    },
    removeAttr: function (name) {
      return this.each(function () {
        this.nodeType === 1 &&
          name.split(" ").forEach(function (attribute) {
            setAttribute(this, attribute);
          }, this);
      });
    },
    prop: function (name, value) {
      name = propMap[name] || name;
      return 1 in arguments ?
        this.each(function (idx) {
          this[name] = funcArg(this, value, idx, this[name]);
        }) :
        this[0] && this[0][name];
    },
    data: function (name, value) {
      let attrName =
        "data-" + name.replace(capitalRE, "-$1").toLowerCase();

      let data =
        1 in arguments ?
        this.attr(attrName, value) :
        this.attr(attrName);

      return data !== null ? deserializeValue(data) : undefined;
    },
    val: function (value) {
      return 0 in arguments ?
        this.each(function (idx) {
          this.value = funcArg(this, value, idx, this.value);
        }) :
        this[0] &&
        (this[0].multiple ?
          hh(this[0])
          .find("option")
          .filter(function () {
            return this.selected;
          })
          .pluck("value") :
          this[0].value);
    },
    offset: function (coordinates) {
      if (coordinates)
        return this.each(function (index) {
          let $this = hh(this),
            coords = funcArg(
              this,
              coordinates,
              index,
              $this.offset()
            ),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top: coords.top - parentOffset.top,
              left: coords.left - parentOffset.left,
            };

          if ($this.css("position") == "static")
            props["position"] = "relative";
          $this.css(props);
        });
      if (!this.length) return null;
      let obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height),
      };
    },
    css: function (property, value) {
      if (arguments.length < 2) {
        let computedStyle,
          element = this[0];
        if (!element) return;
        computedStyle = getComputedStyle(element, "");
        if (typeof property == "string")
          return (
            element.style[camelize(property)] ||
            computedStyle.getPropertyValue(property)
          );
        else if (isArray(property)) {
          let props = {};
          hh.each(property, function (_, prop) {
            props[prop] =
              element.style[camelize(prop)] ||
              computedStyle.getPropertyValue(prop);
          });
          return props;
        }
      }

      let css = "";
      if (type(property) == "string") {
        if (!value && value !== 0)
          this.each(function () {
            this.style.removeProperty(dasherize(property));
          });
        else
          css =
          dasherize(property) + ":" + maybeAddPx(property, value);
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function () {
              this.style.removeProperty(dasherize(key));
            });
          else
            css +=
            dasherize(key) +
            ":" +
            maybeAddPx(key, property[key]) +
            ";";
      }

      return this.each(function () {
        this.style.cssText += ";" + css;
      });
    },
    index: function (element) {
      return element ?
        this.indexOf(hh(element)[0]) :
        this.parent().children().indexOf(this[0]);
    },
    hasClass: function (name) {
      if (!name) return false;
      return emptyArray.some.call(
        this,
        function (el) {
          return this.test(className(el));
        },
        classRE(name)
      );
    },
    addClass: function (name) {
      if (!name) return this;
      return this.each(function (idx) {
        if (!("className" in this)) return;
        classList = [];
        let cls = className(this),
          newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function (klass) {
          if (!hh(this).hasClass(klass)) classList.push(klass);
        }, this);
        classList.length &&
          className(
            this,
            cls + (cls ? " " : "") + classList.join(" ")
          );
      });
    },
    removeClass: function (name) {
      return this.each(function (idx) {
        if (!("className" in this)) return;
        if (name === undefined) return className(this, "");
        classList = className(this);
        funcArg(this, name, idx, classList)
          .split(/\s+/g)
          .forEach(function (klass) {
            classList = classList.replace(classRE(klass), " ");
          });
        className(this, classList.trim());
      });
    },
    toggleClass: function (name, when) {
      if (!name) return this;
      return this.each(function (idx) {
        let $this = hh(this),
          names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach(function (klass) {
          (when === undefined ? !$this.hasClass(klass) : when) ?
          $this.addClass(klass): $this.removeClass(klass);
        });
      });
    },
    scrollTop: function (value) {
      if (!this.length) return;
      let hasScrollTop = "scrollTop" in this[0];
      if (value === undefined)
        return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(
        hasScrollTop ?
        function () {
          this.scrollTop = value;
        } :
        function () {
          this.scrollTo(this.scrollX, value);
        }
      );
    },
    scrollLeft: function (value) {
      if (!this.length) return;
      let hasScrollLeft = "scrollLeft" in this[0];
      if (value === undefined)
        return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
      return this.each(
        hasScrollLeft ?
        function () {
          this.scrollLeft = value;
        } :
        function () {
          this.scrollTo(value, this.scrollY);
        }
      );
    },
    position: function () {
      if (!this.length) return;

      let elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ?
        {
          top: 0,
          left: 0,
        } :
        offsetParent.offset();

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top -= parseFloat(hh(elem).css("margin-top")) || 0;
      offset.left -= parseFloat(hh(elem).css("margin-left")) || 0;

      // Add offsetParent borders
      parentOffset.top +=
        parseFloat(hh(offsetParent[0]).css("border-top-width")) || 0;
      parentOffset.left +=
        parseFloat(hh(offsetParent[0]).css("border-left-width")) || 0;

      // Subtract the two offsets
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
      };
    },
    offsetParent: function () {
      return this.map(function () {
        let parent = this.offsetParent || document.body;
        while (
          parent &&
          !rootNodeRE.test(parent.nodeName) &&
          hh(parent).css("position") == "static"
        )
          parent = parent.offsetParent;
        return parent;
      });
    },
  };

  // for now
  hh.fn.detach = hh.fn.remove;

  // Generate the `width` and `height` functions
  ["width", "height"].forEach(function (dimension) {
    let dimensionProperty = dimension.replace(/./, function (m) {
      return m[0].toUpperCase();
    });

    hh.fn[dimension] = function (value) {
      let offset,
        el = this[0];
      if (value === undefined)
        return isWindow(el) ?
          el["inner" + dimensionProperty] :
          isDocument(el) ?
          el.documentElement["scroll" + dimensionProperty] :
          (offset = this.offset()) && offset[dimension];
      else
        return this.each(function (idx) {
          el = hh(this);
          el.css(
            dimension,
            funcArg(this, value, idx, el[dimension]())
          );
        });
    };
  });

  function traverseNode(node, fun) {
    fun(node);
    for (let i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun);
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function (operator, operatorIndex) {
    let inside = operatorIndex % 2; //=> prepend, append

    hh.fn[operator] = function () {
      // arguments can be nodes, arrays of nodes, Hopeu objects and HTML strings
      let argType,
        nodes = hh.map(arguments, function (arg) {
          argType = type(arg);
          return argType == "object" ||
            argType == "array" ||
            arg == null ?
            arg :
            hopeu.fragment(arg);
        }),
        parent,
        copyByClone = this.length > 1;
      if (nodes.length < 1) return this;

      return this.each(function (_, target) {
        parent = inside ? target : target.parentNode;

        // convert all methods to a "before" operation
        target =
          operatorIndex == 0 ?
          target.nextSibling :
          operatorIndex == 1 ?
          target.firstChild :
          operatorIndex == 2 ?
          target :
          null;

        let parentInDocument = hh.contains(
          document.documentElement,
          parent
        );

        nodes.forEach(function (node) {
          if (copyByClone) node = node.cloneNode(true);
          else if (!parent) return hh(node).remove();

          parent.insertBefore(node, target);
          if (parentInDocument)
            traverseNode(node, function (el) {
              if (
                el.nodeName != null &&
                el.nodeName.toUpperCase() === "SCRIPT" &&
                (!el.type || el.type === "text/javascript") &&
                !el.src
              )
                window["eval"].call(window, el.innerHTML);
            });
        });
      });
    };

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    hh.fn[
      inside ?
      operator + "To" :
      "insert" + (operatorIndex ? "Before" : "After")
    ] = function (html) {
      hh(html)[operator](this);
      return this;
    };
  });

  hopeu.Z.prototype = hh.fn;

  // Export internal API functions in the `hh.hopeu` namespace
  hopeu.uniq = uniq;
  hopeu.deserializeValue = deserializeValue;
  hh.hopeu = hopeu;

  return hh;
})();

(function (hh) {
  let _zid = 1,
    undefined,
    slice = Array.prototype.slice,
    isFunction = hh.isFunction,
    isString = function (obj) {
      return typeof obj == "string";
    },
    handlers = {},
    specialEvents = {},
    focusinSupported = "onfocusin" in window,
    focus = {
      focus: "focusin",
      blur: "focusout",
    },
    hover = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
    };

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove =
    "MouseEvents";

  function zid(element) {
    return element._zid || (element._zid = _zid++);
  }

  function findHandlers(element, event, fn, selector) {
    let matcher;
    event = parse(event);
    if (event.ns) {
      matcher = matcherFor(event.ns);
    }
    return (handlers[zid(element)] || []).filter(function (handler) {
      return (
        handler &&
        (!event.e || handler.e == event.e) &&
        (!event.ns || matcher.test(handler.ns)) &&
        (!fn || zid(handler.fn) === zid(fn)) &&
        (!selector || handler.sel == selector)
      );
    });
  }

  function parse(event) {
    let parts = ("" + event).split(".");
    return {
      e: parts[0],
      ns: parts.slice(1).sort().join(" "),
    };
  }

  function matcherFor(ns) {
    return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)");
  }

  function eventCapture(handler, captureSetting) {
    return (
      (handler.del && !focusinSupported && handler.e in focus) ||
      !!captureSetting
    );
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type;
  }

  function add(element, events, fn, data, selector, delegator, capture) {
    let id = zid(element),
      set = handlers[id] || (handlers[id] = []);
    events.split(/\s/).forEach(function (event) {
      if (event == "ready") return hh(document).ready(fn);
      let handler = parse(event);
      handler.fn = fn;
      handler.sel = selector;
      // emulate mouseenter, mouseleave
      if (handler.e in hover)
        fn = function (e) {
          let related = e.relatedTarget;
          if (
            !related ||
            (related !== this && !hh.contains(this, related))
          )
            return handler.fn.apply(this, arguments);
        };
      handler.del = delegator;
      let callback = delegator || fn;
      handler.proxy = function (e) {
        e = compatible(e);
        if (e.isImmediatePropagationStopped()) return;
        e.data = data;
        let result = callback.apply(
          element,
          e._args == undefined ? [e] : [e].concat(e._args)
        );
        if (result === false) e.preventDefault(), e.stopPropagation();
        return result;
      };
      handler.i = set.length;
      set.push(handler);
      if ("addEventListener" in element)
        element.addEventListener(
          realEvent(handler.e),
          handler.proxy,
          eventCapture(handler, capture)
        );
    });
  }

  function remove(element, events, fn, selector, capture) {
    let id = zid(element);
    (events || "").split(/\s/).forEach(function (event) {
      findHandlers(element, event, fn, selector).forEach(function (
        handler
      ) {
        delete handlers[id][handler.i];
        if ("removeEventListener" in element)
          element.removeEventListener(
            realEvent(handler.e),
            handler.proxy,
            eventCapture(handler, capture)
          );
      });
    });
  }

  hh.event = {
    add: add,
    remove: remove,
  };

  hh.proxy = function (fn, context) {
    let args = 2 in arguments && slice.call(arguments, 2);
    if (isFunction(fn)) {
      let proxyFn = function () {
        return fn.apply(
          context,
          args ? args.concat(slice.call(arguments)) : arguments
        );
      };
      proxyFn._zid = zid(fn);
      return proxyFn;
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn);
        return hh.proxy.apply(null, args);
      } else {
        return hh.proxy(fn[context], fn);
      }
    } else {
      throw new TypeError("expected function");
    }
  };

  hh.fn.bind = function (event, data, callback) {
    return this.on(event, data, callback);
  };
  hh.fn.unbind = function (event, callback) {
    return this.off(event, callback);
  };
  hh.fn.one = function (event, selector, data, callback) {
    return this.on(event, selector, data, callback, 1);
  };

  let returnTrue = function () {
      return true;
    },
    returnFalse = function () {
      return false;
    },
    ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
    eventMethods = {
      preventDefault: "isDefaultPrevented",
      stopImmediatePropagation: "isImmediatePropagationStopped",
      stopPropagation: "isPropagationStopped",
    };

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event);

      hh.each(eventMethods, function (name, predicate) {
        let sourceMethod = source[name];
        event[name] = function () {
          this[predicate] = returnTrue;
          return (
            sourceMethod && sourceMethod.apply(source, arguments)
          );
        };
        event[predicate] = returnFalse;
      });

      if (
        source.defaultPrevented !== undefined ?
        source.defaultPrevented :
        "returnValue" in source ?
        source.returnValue === false :
        source.getPreventDefault && source.getPreventDefault()
      )
        event.isDefaultPrevented = returnTrue;
    }
    return event;
  }

  function createProxy(event) {
    let key,
      proxy = {
        originalEvent: event,
      };
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined)
        proxy[key] = event[key];

    return compatible(proxy, event);
  }

  hh.fn.delegate = function (selector, event, callback) {
    return this.on(event, selector, callback);
  };
  hh.fn.undelegate = function (selector, event, callback) {
    return this.off(event, selector, callback);
  };

  hh.fn.live = function (event, callback) {
    hh(document.body).delegate(this.selector, event, callback);
    return this;
  };
  hh.fn.die = function (event, callback) {
    hh(document.body).undelegate(this.selector, event, callback);
    return this;
  };

  hh.fn.on = function (event, selector, data, callback, one) {
    let autoRemove,
      delegator,
      $this = this;
    if (event && !isString(event)) {
      hh.each(event, function (type, fn) {
        $this.on(type, selector, data, fn, one);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      (callback = data), (data = selector), (selector = undefined);
    if (isFunction(data) || data === false)
      (callback = data), (data = undefined);

    if (callback === false) callback = returnFalse;

    return $this.each(function (_, element) {
      if (one)
        autoRemove = function (e) {
          remove(element, e.type, callback);
          return callback.apply(this, arguments);
        };

      if (selector)
        delegator = function (e) {
          let evt,
            match = hh(e.target).closest(selector, element).get(0);
          if (match && match !== element) {
            evt = hh.extend(createProxy(e), {
              currentTarget: match,
              liveFired: element,
            });
            return (autoRemove || callback).apply(
              match,
              [evt].concat(slice.call(arguments, 1))
            );
          }
        };

      add(
        element,
        event,
        callback,
        data,
        selector,
        delegator || autoRemove
      );
    });
  };
  hh.fn.off = function (event, selector, callback) {
    let $this = this;
    if (event && !isString(event)) {
      hh.each(event, function (type, fn) {
        $this.off(type, selector, fn);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      (callback = selector), (selector = undefined);

    if (callback === false) callback = returnFalse;

    return $this.each(function () {
      remove(this, event, callback, selector);
    });
  };

  hh.fn.trigger = function (event, args) {
    event =
      isString(event) || hh.isPlainObject(event) ?
      hh.Event(event) :
      compatible(event);
    event._args = args;
    return this.each(function () {
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function")
        this[event.type]();
      // items in the collection might not be DOM elements
      else if ("dispatchEvent" in this) this.dispatchEvent(event);
      else hh(this).triggerHandler(event, args);
    });
  };

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  hh.fn.triggerHandler = function (event, args) {
    let e, result;
    this.each(function (i, element) {
      e = createProxy(isString(event) ? hh.Event(event) : event);
      e._args = args;
      e.target = element;
      hh.each(findHandlers(element, event.type || event), function (
        i,
        handler
      ) {
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) return false;
      });
    });
    return result;
  };

  // shortcut methods for `.bind(event, fn)` for each event type
  (
    "focusin focusout focus blur load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select keydown keypress keyup error"
  )
  .split(" ")
    .forEach(function (event) {
      hh.fn[event] = function (callback) {
        return 0 in arguments ?
          this.bind(event, callback) :
          this.trigger(event);
      };
    });

  hh.Event = function (type, props) {
    if (!isString(type))(props = type), (type = props.type);
    let event = document.createEvent(specialEvents[type] || "Events"),
      bubbles = true;
    if (props)
      for (let name in props)
        name == "bubbles" ?
        (bubbles = !!props[name]) :
        (event[name] = props[name]);
    event.initEvent(type, bubbles, true);
    return compatible(event);
  };
})(Hopeu);
(function (hh) {
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!("__proto__" in {})) {
    hh.extend(hh.hopeu, {
      Z: function (dom, selector) {
        dom = dom || [];
        hh.extend(dom, hh.fn);
        dom.selector = selector || "";
        dom.__Z = true;
        return dom;
      },
      // this is a kludge but works
      isZ: function (object) {
        return hh.type(object) === "array" && "__Z" in object;
      },
    });
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined);
  } catch (e) {
    let nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function (element) {
      try {
        return nativeGetComputedStyle(element);
      } catch (e) {
        return null;
      }
    };
  }
})(Hopeu);

export const hopeu = Hopeu;