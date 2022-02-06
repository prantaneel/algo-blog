/* PrismJS 1.26.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+csharp+cpp+css-extras+diff&plugins=line-highlight+line-numbers+show-invisibles+autolinker+custom-class+file-highlight+show-language+jsonp-highlight+highlight-keywords+inline-color+autoloader+keep-markup+command-line+normalize-whitespace+data-uri-highlight+toolbar+copy-to-clipboard+download-button+match-braces+filter-highlight-all */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case "Object":
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e; ) {
              var n = t.exec(e.className);
              if (n) return n[1].toLowerCase();
              e = e.parentElement;
            }
            return "none";
          },
          setLanguage: function (e, n) {
            (e.className = e.className.replace(RegExp(t, "gi"), "")),
              e.classList.add("language-" + n);
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) ||
                [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; (a = r.elements[i++]); )
            M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          M.util.setLanguage(e, r);
          var i = e.parentElement;
          i && "pre" === i.nodeName.toLowerCase() && M.util.setLanguage(i, r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run("before-sanity-check", l),
            (i = l.element.parentElement) &&
              "pre" === i.nodeName.toLowerCase() &&
              !i.hasAttribute("tabindex") &&
              i.setAttribute("tabindex", "0"),
            !l.code)
          )
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          if ((M.hooks.run("before-highlight", l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0,
                  })
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            M.hooks.run("before-tokenize", r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, v + "g");
                    }
                    for (
                      var p = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var k = m.value;
                      if (t.length > n.length) return;
                      if (!(k instanceof W)) {
                        var x,
                          b = 1;
                        if (h) {
                          if (!(x = z(p, y, n, f)) || x.index >= n.length)
                            break;
                          var w = x.index,
                            A = x.index + x[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; )
                            (m = m.next), (P += m.value.length);
                          if (
                            ((P -= m.value.length),
                            (y = P),
                            m.value instanceof W)
                          )
                            continue;
                          for (
                            var E = m;
                            E !== t.tail &&
                            (P < A || "string" == typeof E.value);
                            E = E.next
                          )
                            b++, (P += E.value.length);
                          b--, (k = n.slice(y, P)), (x.index -= y);
                        } else if (!(x = z(p, 0, k, f))) continue;
                        var w = x.index,
                          L = x[0],
                          S = k.slice(0, w),
                          O = k.slice(w + L.length),
                          j = y + k.length;
                        l && j > l.reach && (l.reach = j);
                        var C = m.prev;
                        S && ((C = I(t, C, S)), (y += S.length)), q(t, C, b);
                        var N = new W(o, g ? M.tokenize(L, g) : L, d, L);
                        if (((m = I(t, C, N)), O && I(t, m, O), 1 < b)) {
                          var _ = { cause: o + "," + u, reach: j };
                          e(n, t, r, m.prev, y, _),
                            l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)),
          M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          l +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        M
      );
    var r = M.util.currentScript();
    function a() {
      M.manual || M.highlightAll();
    }
    if (
      (r &&
        ((M.filename = r.src),
        r.hasAttribute("data-manual") && (M.manual = !0)),
      !M.manual)
    ) {
      var l = document.readyState;
      "loading" === l || ("interactive" === l && r && r.defer)
        ? document.addEventListener("DOMContentLoaded", a)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(a)
        : window.setTimeout(a, 16);
    }
    return M;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            a +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, "language-" + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e =
    /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i"
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
      },
    },
    selector: {
      pattern: RegExp(
        "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
          e.source +
          ")*(?=\\s*\\{)"
      ),
      lookbehind: !0,
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern:
        /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0,
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"
    ),
    lookbehind: !0,
  },
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "string-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
    },
  }),
  Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property",
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern:
      /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0,
  },
  string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  "class-name": {
    pattern:
      /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number:
    /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore("c", "string", {
    char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 },
  }),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern:
        /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          Prism.languages.c.string,
        ],
        char: Prism.languages.c.char,
        comment: Prism.languages.c.comment,
        "macro-name": [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: !0,
            alias: "function",
          },
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: "keyword",
        },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
  }),
  Prism.languages.insertBefore("c", "function", {
    constant:
      /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
  }),
  delete Prism.languages.c.boolean;
!(function (s) {
  function a(e, s) {
    return e.replace(/<<(\d+)>>/g, function (e, n) {
      return "(?:" + s[+n] + ")";
    });
  }
  function t(e, n, s) {
    return RegExp(a(e, n), s || "");
  }
  function e(e, n) {
    for (var s = 0; s < n; s++)
      e = e.replace(/<<self>>/g, function () {
        return "(?:" + e + ")";
      });
    return e.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var n =
      "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    r = "class enum interface record struct",
    i =
      "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
    o =
      "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
  function l(e) {
    return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b";
  }
  var d = l(r),
    p = RegExp(l(n + " " + r + " " + i + " " + o)),
    c = l(r + " " + i + " " + o),
    u = l(n + " " + r + " " + o),
    g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
    b = e("\\((?:[^()]|<<self>>)*\\)", 2),
    h = "@?\\b[A-Za-z_]\\w*\\b",
    f = a("<<0>>(?:\\s*<<1>>)?", [h, g]),
    m = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
    k = "\\[\\s*(?:,\\s*)*\\]",
    y = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
    w = a("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [
      a("\\(<<0>>+(?:,<<0>>+)+\\)", [
        a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k]),
      ]),
      m,
      k,
    ]),
    v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
    x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
  (s.languages.csharp = s.languages.extend("clike", {
    string: [
      {
        pattern: t("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
        lookbehind: !0,
        greedy: !0,
      },
      { pattern: t("(^|[^@$\\\\])<<0>>", [$]), lookbehind: !0, greedy: !0 },
    ],
    "class-name": [
      {
        pattern: t("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
        lookbehind: !0,
        inside: v,
      },
      {
        pattern: t("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, w]),
        lookbehind: !0,
        inside: v,
      },
      { pattern: t("(\\busing\\s+)<<0>>(?=\\s*=)", [h]), lookbehind: !0 },
      { pattern: t("(\\b<<0>>\\s+)<<1>>", [d, f]), lookbehind: !0, inside: v },
      {
        pattern: t("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
        lookbehind: !0,
        inside: v,
      },
      { pattern: t("(\\bwhere\\s+)<<0>>", [h]), lookbehind: !0 },
      {
        pattern: t("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
        lookbehind: !0,
        inside: v,
      },
      {
        pattern: t(
          "\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))",
          [w, u, h]
        ),
        inside: v,
      },
    ],
    keyword: p,
    number:
      /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/,
  })),
    s.languages.insertBefore("csharp", "number", {
      range: { pattern: /\.\./, alias: "operator" },
    }),
    s.languages.insertBefore("csharp", "punctuation", {
      "named-parameter": {
        pattern: t("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
        lookbehind: !0,
        alias: "punctuation",
      },
    }),
    s.languages.insertBefore("csharp", "class-name", {
      namespace: {
        pattern: t(
          "(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])",
          [h]
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      "type-expression": {
        pattern: t(
          "(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))",
          [b]
        ),
        lookbehind: !0,
        alias: "class-name",
        inside: v,
      },
      "return-type": {
        pattern: t(
          "<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))",
          [w, m]
        ),
        inside: v,
        alias: "class-name",
      },
      "constructor-invocation": {
        pattern: t("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
        lookbehind: !0,
        inside: v,
        alias: "class-name",
      },
      "generic-method": {
        pattern: t("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
        inside: {
          function: t("^<<0>>", [h]),
          generic: { pattern: RegExp(g), alias: "class-name", inside: v },
        },
      },
      "type-list": {
        pattern: t(
          "\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))",
          [d, f, h, w, p.source, b, "\\bnew\\s*\\(\\s*\\)"]
        ),
        lookbehind: !0,
        inside: {
          "record-arguments": {
            pattern: t("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]),
            lookbehind: !0,
            greedy: !0,
            inside: s.languages.csharp,
          },
          keyword: p,
          "class-name": { pattern: RegExp(w), greedy: !0, inside: v },
          punctuation: /[,()]/,
        },
      },
      preprocessor: {
        pattern: /(^[\t ]*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
          directive: {
            pattern:
              /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: "keyword",
          },
        },
      },
    });
  var _ = $ + "|" + x,
    B = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [_]),
    E = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    R =
      "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
    z = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, E]);
  s.languages.insertBefore("csharp", "class-name", {
    attribute: {
      pattern: t(
        "((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])",
        [R, z]
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: t("^<<0>>(?=\\s*:)", [R]), alias: "keyword" },
        "attribute-arguments": {
          pattern: t("\\(<<0>>*\\)", [E]),
          inside: s.languages.csharp,
        },
        "class-name": { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/,
      },
    },
  });
  var S = ":[^}\r\n]+",
    j = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    A = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [j, S]),
    F = e(
      a("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [
        _,
      ]),
      2
    ),
    P = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, S]);
  function U(e, n) {
    return {
      interpolation: {
        pattern: t("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
        lookbehind: !0,
        inside: {
          "format-string": {
            pattern: t("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [n, S]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: s.languages.csharp,
          },
        },
      },
      string: /[\s\S]+/,
    };
  }
  s.languages.insertBefore("csharp", "string", {
    "interpolation-string": [
      {
        pattern: t(
          '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
          [A]
        ),
        lookbehind: !0,
        greedy: !0,
        inside: U(A, j),
      },
      {
        pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [P]),
        lookbehind: !0,
        greedy: !0,
        inside: U(P, F),
      },
    ],
    char: { pattern: RegExp(x), greedy: !0 },
  }),
    (s.languages.dotnet = s.languages.cs = s.languages.csharp);
})(Prism);
!(function (e) {
  var t =
      /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(
      /<keyword>/g,
      function () {
        return t.source;
      }
    );
  (e.languages.cpp = e.languages.extend("c", {
    "class-name": [
      {
        pattern: RegExp(
          "(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern:
        /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator:
      />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/,
  })),
    e.languages.insertBefore("cpp", "string", {
      module: {
        pattern: RegExp(
          '(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(
              /<mod-name>/g,
              function () {
                return n;
              }
            ) +
            ")"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      "raw-string": {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: "string",
        greedy: !0,
      },
    }),
    e.languages.insertBefore("cpp", "keyword", {
      "generic-function": {
        pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
        inside: {
          function: /^\w+/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: "class-name",
            inside: e.languages.cpp,
          },
        },
      },
    }),
    e.languages.insertBefore("cpp", "operator", {
      "double-colon": { pattern: /::/, alias: "punctuation" },
    }),
    e.languages.insertBefore("cpp", "class-name", {
      "base-clause": {
        pattern:
          /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend("cpp", {}),
      },
    }),
    e.languages.insertBefore(
      "inside",
      "double-colon",
      { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp["base-clause"]
    );
})(Prism);
!(function (e) {
  var a,
    n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (e.languages.css.selector = {
    pattern: e.languages.css.selector.pattern,
    lookbehind: !0,
    inside: (a = {
      "pseudo-element":
        /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      "pseudo-class": /:[-\w]+/,
      class: /\.[-\w]+/,
      id: /#[-\w]+/,
      attribute: {
        pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
        greedy: !0,
        inside: {
          punctuation: /^\[|\]$/,
          "case-sensitivity": {
            pattern: /(\s)[si]$/i,
            lookbehind: !0,
            alias: "keyword",
          },
          namespace: {
            pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
            lookbehind: !0,
            inside: { punctuation: /\|$/ },
          },
          "attr-name": {
            pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
            lookbehind: !0,
          },
          "attr-value": [
            n,
            {
              pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
              lookbehind: !0,
            },
          ],
          operator: /[|~*^$]?=/,
        },
      },
      "n-th": [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: !0,
          inside: { number: /[\dn]+/, operator: /[+-]/ },
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
      ],
      combinator: />|\+|~|\|\|/,
      punctuation: /[(),]/,
    }),
  }),
    (e.languages.css.atrule.inside["selector-function-argument"].inside = a),
    e.languages.insertBefore("css", "property", {
      variable: {
        pattern:
          /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
        lookbehind: !0,
      },
    });
  var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
    i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
  e.languages.insertBefore("css", "function", {
    operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
    hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" },
    color: [
      {
        pattern:
          /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
        lookbehind: !0,
      },
      {
        pattern:
          /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          unit: r,
          number: i,
          function: /[\w-]+(?=\()/,
          punctuation: /[(),]/,
        },
      },
    ],
    entity: /\\[\da-f]{1,8}/i,
    unit: r,
    number: i,
  });
})(Prism);
!(function (i) {
  i.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m],
  };
  var r = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!",
  };
  Object.keys(r).forEach(function (e) {
    var n = r[e],
      a = [];
    /^\w+$/.test(e) || a.push(/\w+/.exec(e)[0]),
      "diff" === e && a.push("bold"),
      (i.languages.diff[e] = {
        pattern: RegExp("^(?:[" + n + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
        alias: a,
        inside: {
          line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
          prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(e)[0] },
        },
      });
  }),
    Object.defineProperty(i.languages.diff, "PREFIXES", { value: r });
})(Prism);
!(function () {
  if (
    "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    document.querySelector
  ) {
    var t,
      o = "line-numbers",
      s = "linkable-line-numbers",
      l = function () {
        if (void 0 === t) {
          var e = document.createElement("div");
          (e.style.fontSize = "13px"),
            (e.style.lineHeight = "1.5"),
            (e.style.padding = "0"),
            (e.style.border = "0"),
            (e.innerHTML = "&nbsp;<br />&nbsp;"),
            document.body.appendChild(e),
            (t = 38 === e.offsetHeight),
            document.body.removeChild(e);
        }
        return t;
      },
      a = !0;
    Prism.plugins.lineHighlight = {
      highlightLines: function (u, e, c) {
        var t = (e =
            "string" == typeof e ? e : u.getAttribute("data-line") || "")
            .replace(/\s+/g, "")
            .split(",")
            .filter(Boolean),
          d = +u.getAttribute("data-line-offset") || 0,
          h = (l() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
          f = Prism.util.isActive(u, o),
          i = u.querySelector("code"),
          p = f ? u : i || u,
          g = [],
          m =
            i && p != i
              ? (function (e, t) {
                  var i = getComputedStyle(e),
                    n = getComputedStyle(t);
                  function r(e) {
                    return +e.substr(0, e.length - 2);
                  }
                  return (
                    t.offsetTop +
                    r(n.borderTopWidth) +
                    r(n.paddingTop) -
                    r(i.paddingTop)
                  );
                })(u, i)
              : 0;
        t.forEach(function (e) {
          var t = e.split("-"),
            i = +t[0],
            n = +t[1] || i,
            r =
              u.querySelector('.line-highlight[data-range="' + e + '"]') ||
              document.createElement("div");
          if (
            (g.push(function () {
              r.setAttribute("aria-hidden", "true"),
                r.setAttribute("data-range", e),
                (r.className = (c || "") + " line-highlight");
            }),
            f && Prism.plugins.lineNumbers)
          ) {
            var o = Prism.plugins.lineNumbers.getLine(u, i),
              s = Prism.plugins.lineNumbers.getLine(u, n);
            if (o) {
              var l = o.offsetTop + m + "px";
              g.push(function () {
                r.style.top = l;
              });
            }
            if (s) {
              var a = s.offsetTop - o.offsetTop + s.offsetHeight + "px";
              g.push(function () {
                r.style.height = a;
              });
            }
          } else
            g.push(function () {
              r.setAttribute("data-start", String(i)),
                i < n && r.setAttribute("data-end", String(n)),
                (r.style.top = (i - d - 1) * h + m + "px"),
                (r.textContent = new Array(n - i + 2).join(" \n"));
            });
          g.push(function () {
            r.style.width = u.scrollWidth + "px";
          }),
            g.push(function () {
              p.appendChild(r);
            });
        });
        var n = u.id;
        if (f && Prism.util.isActive(u, s) && n) {
          y(u, s) ||
            g.push(function () {
              u.classList.add(s);
            });
          var r = parseInt(u.getAttribute("data-start") || "1");
          v(".line-numbers-rows > span", u).forEach(function (e, t) {
            var i = t + r;
            e.onclick = function () {
              var e = n + "." + i;
              (a = !1),
                (location.hash = e),
                setTimeout(function () {
                  a = !0;
                }, 1);
            };
          });
        }
        return function () {
          g.forEach(b);
        };
      },
    };
    var u = 0;
    Prism.hooks.add("before-sanity-check", function (e) {
      var t = e.element.parentElement;
      if (c(t)) {
        var i = 0;
        v(".line-highlight", t).forEach(function (e) {
          (i += e.textContent.length), e.parentNode.removeChild(e);
        }),
          i &&
            /^(?: \n)+$/.test(e.code.slice(-i)) &&
            (e.code = e.code.slice(0, -i));
      }
    }),
      Prism.hooks.add("complete", function e(t) {
        var i = t.element.parentElement;
        if (c(i)) {
          clearTimeout(u);
          var n = Prism.plugins.lineNumbers,
            r = t.plugins && t.plugins.lineNumbers;
          if (y(i, o) && n && !r) Prism.hooks.add("line-numbers", e);
          else
            Prism.plugins.lineHighlight.highlightLines(i)(),
              (u = setTimeout(d, 1));
        }
      }),
      window.addEventListener("hashchange", d),
      window.addEventListener("resize", function () {
        v("pre")
          .filter(c)
          .map(function (e) {
            return Prism.plugins.lineHighlight.highlightLines(e);
          })
          .forEach(b);
      });
  }
  function v(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function y(e, t) {
    return e.classList.contains(t);
  }
  function b(e) {
    e();
  }
  function c(e) {
    return (
      !(!e || !/pre/i.test(e.nodeName)) &&
      (!!e.hasAttribute("data-line") || !(!e.id || !Prism.util.isActive(e, s)))
    );
  }
  function d() {
    var e = location.hash.slice(1);
    v(".temporary.line-highlight").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (t && !document.getElementById(e)) {
      var i = e.slice(0, e.lastIndexOf(".")),
        n = document.getElementById(i);
      if (n)
        n.hasAttribute("data-line") || n.setAttribute("data-line", ""),
          Prism.plugins.lineHighlight.highlightLines(n, t, "temporary ")(),
          a &&
            document
              .querySelector(".temporary.line-highlight")
              .scrollIntoView();
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var o = "line-numbers",
      a = /\n(?!$)/g,
      e = (Prism.plugins.lineNumbers = {
        getLine: function (e, n) {
          if ("PRE" === e.tagName && e.classList.contains(o)) {
            var t = e.querySelector(".line-numbers-rows");
            if (t) {
              var i = parseInt(e.getAttribute("data-start"), 10) || 1,
                r = i + (t.children.length - 1);
              n < i && (n = i), r < n && (n = r);
              var s = n - i;
              return t.children[s];
            }
          }
        },
        resize: function (e) {
          u([e]);
        },
        assumeViewportIndependence: !0,
      }),
      n = void 0;
    window.addEventListener("resize", function () {
      (e.assumeViewportIndependence && n === window.innerWidth) ||
        ((n = window.innerWidth),
        u(Array.prototype.slice.call(document.querySelectorAll("pre." + o))));
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var n = e.element,
            t = n.parentNode;
          if (
            t &&
            /pre/i.test(t.nodeName) &&
            !n.querySelector(".line-numbers-rows") &&
            Prism.util.isActive(n, o)
          ) {
            n.classList.remove(o), t.classList.add(o);
            var i,
              r = e.code.match(a),
              s = r ? r.length + 1 : 1,
              l = new Array(s + 1).join("<span></span>");
            (i = document.createElement("span")).setAttribute(
              "aria-hidden",
              "true"
            ),
              (i.className = "line-numbers-rows"),
              (i.innerHTML = l),
              t.hasAttribute("data-start") &&
                (t.style.counterReset =
                  "linenumber " +
                  (parseInt(t.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(i),
              u([t]),
              Prism.hooks.run("line-numbers", e);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      });
  }
  function u(e) {
    if (
      0 !=
      (e = e.filter(function (e) {
        var n = (function (e) {
          return e
            ? window.getComputedStyle
              ? getComputedStyle(e)
              : e.currentStyle || null
            : null;
        })(e)["white-space"];
        return "pre-wrap" === n || "pre-line" === n;
      })).length
    ) {
      var n = e
        .map(function (e) {
          var n = e.querySelector("code"),
            t = e.querySelector(".line-numbers-rows");
          if (n && t) {
            var i = e.querySelector(".line-numbers-sizer"),
              r = n.textContent.split(a);
            i ||
              (((i = document.createElement("span")).className =
                "line-numbers-sizer"),
              n.appendChild(i)),
              (i.innerHTML = "0"),
              (i.style.display = "block");
            var s = i.getBoundingClientRect().height;
            return (
              (i.innerHTML = ""),
              {
                element: e,
                lines: r,
                lineHeights: [],
                oneLinerHeight: s,
                sizer: i,
              }
            );
          }
        })
        .filter(Boolean);
      n.forEach(function (e) {
        var i = e.sizer,
          n = e.lines,
          r = e.lineHeights,
          s = e.oneLinerHeight;
        (r[n.length - 1] = void 0),
          n.forEach(function (e, n) {
            if (e && 1 < e.length) {
              var t = i.appendChild(document.createElement("span"));
              (t.style.display = "block"), (t.textContent = e);
            } else r[n] = s;
          });
      }),
        n.forEach(function (e) {
          for (
            var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
            r < t.length;
            r++
          )
            void 0 === t[r] &&
              (t[r] = n.children[i++].getBoundingClientRect().height);
        }),
        n.forEach(function (e) {
          var n = e.sizer,
            t = e.element.querySelector(".line-numbers-rows");
          (n.style.display = "none"),
            (n.innerHTML = ""),
            e.lineHeights.forEach(function (e, n) {
              t.children[n].style.height = e + "px";
            });
        });
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var i = { tab: /\t/, crlf: /\r\n/, lf: /\n/, cr: /\r/, space: / / };
    Prism.hooks.add("before-highlight", function (r) {
      s(r.grammar);
    });
  }
  function f(r, e) {
    var i = r[e];
    switch (Prism.util.type(i)) {
      case "RegExp":
        var a = {};
        (r[e] = { pattern: i, inside: a }), s(a);
        break;
      case "Array":
        for (var n = 0, t = i.length; n < t; n++) f(i, n);
        break;
      default:
        s((a = i.inside || (i.inside = {})));
    }
  }
  function s(r) {
    if (r && !r.tab) {
      for (var e in i) i.hasOwnProperty(e) && (r[e] = i[e]);
      for (var e in r)
        r.hasOwnProperty(e) && !i[e] && ("rest" === e ? s(r.rest) : f(r, e));
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var e =
        /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
      r = /\b\S+@[\w.]+[a-z]{2}/,
      a = /\[([^\]]+)\]\(([^)]+)\)/,
      l = ["comment", "url", "attr-value", "string"];
    (Prism.plugins.autolinker = {
      processGrammar: function (i) {
        i &&
          !i["url-link"] &&
          (Prism.languages.DFS(i, function (i, n, t) {
            -1 < l.indexOf(t) &&
              !Array.isArray(n) &&
              (n.pattern || (n = this[i] = { pattern: n }),
              (n.inside = n.inside || {}),
              "comment" == t && (n.inside["md-link"] = a),
              "attr-value" == t
                ? Prism.languages.insertBefore(
                    "inside",
                    "punctuation",
                    { "url-link": e },
                    n
                  )
                : (n.inside["url-link"] = e),
              (n.inside["email-link"] = r));
          }),
          (i["url-link"] = e),
          (i["email-link"] = r));
      },
    }),
      Prism.hooks.add("before-highlight", function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar);
      }),
      Prism.hooks.add("wrap", function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a";
          var n = i.content;
          if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
            n = "mailto:" + n;
          else if ("md-link" == i.type) {
            var t = i.content.match(a);
            (n = t[2]), (i.content = t[1]);
          }
          i.attributes.href = n;
          try {
            i.content = decodeURIComponent(i.content);
          } catch (i) {}
        }
      });
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var a,
      t,
      e = "";
    (Prism.plugins.customClass = {
      add: function (n) {
        a = n;
      },
      map: function (s) {
        t =
          "function" == typeof s
            ? s
            : function (n) {
                return s[n] || n;
              };
      },
      prefix: function (n) {
        e = n || "";
      },
      apply: u,
    }),
      Prism.hooks.add("wrap", function (s) {
        if (a) {
          var n = a({ content: s.content, type: s.type, language: s.language });
          Array.isArray(n)
            ? s.classes.push.apply(s.classes, n)
            : n && s.classes.push(n);
        }
        (t || e) &&
          (s.classes = s.classes.map(function (n) {
            return u(n, s.language);
          }));
      });
  }
  function u(n, s) {
    return e + (t ? t(n, s) : n);
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
    var l = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex",
      },
      o = "data-src-status",
      h = "loading",
      g = "loaded",
      u =
        "pre[data-src]:not([" +
        o +
        '="' +
        g +
        '"]):not([' +
        o +
        '="' +
        h +
        '"])';
    Prism.hooks.add("before-highlightall", function (t) {
      t.selector += ", " + u;
    }),
      Prism.hooks.add("before-sanity-check", function (t) {
        var r = t.element;
        if (r.matches(u)) {
          (t.code = ""), r.setAttribute(o, h);
          var s = r.appendChild(document.createElement("CODE"));
          s.textContent = "Loading…";
          var e = r.getAttribute("data-src"),
            i = t.language;
          if ("none" === i) {
            var n = (/\.(\w+)$/.exec(e) || [, "none"])[1];
            i = l[n] || n;
          }
          Prism.util.setLanguage(s, i), Prism.util.setLanguage(r, i);
          var a = Prism.plugins.autoloader;
          a && a.loadLanguages(i),
            (function (t, e, i) {
              var n = new XMLHttpRequest();
              n.open("GET", t, !0),
                (n.onreadystatechange = function () {
                  4 == n.readyState &&
                    (n.status < 400 && n.responseText
                      ? e(n.responseText)
                      : 400 <= n.status
                      ? i(
                          (function (t, e) {
                            return (
                              "✖ Error " + t + " while fetching file: " + e
                            );
                          })(n.status, n.statusText)
                        )
                      : i("✖ Error: File does not exist or is empty"));
                }),
                n.send(null);
            })(
              e,
              function (t) {
                r.setAttribute(o, g);
                var e = (function (t) {
                  var e = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(t || "");
                  if (e) {
                    var i = Number(e[1]),
                      n = e[2],
                      a = e[3];
                    return n ? (a ? [i, Number(a)] : [i, void 0]) : [i, i];
                  }
                })(r.getAttribute("data-range"));
                if (e) {
                  var i = t.split(/\r\n?|\n/g),
                    n = e[0],
                    a = null == e[1] ? i.length : e[1];
                  n < 0 && (n += i.length),
                    (n = Math.max(0, Math.min(n - 1, i.length))),
                    a < 0 && (a += i.length),
                    (a = Math.max(0, Math.min(a, i.length))),
                    (t = i.slice(n, a).join("\n")),
                    r.hasAttribute("data-start") ||
                      r.setAttribute("data-start", String(n + 1));
                }
                (s.textContent = t), Prism.highlightElement(s);
              },
              function (t) {
                r.setAttribute(o, "failed"), (s.textContent = t);
              }
            );
        }
      });
    var t = !(Prism.plugins.fileHighlight = {
      highlight: function (t) {
        for (
          var e, i = (t || document).querySelectorAll(u), n = 0;
          (e = i[n++]);

        )
          Prism.highlightElement(e);
      },
    });
    Prism.fileHighlight = function () {
      t ||
        (console.warn(
          "Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."
        ),
        (t = !0)),
        Prism.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var i = [],
      l = {},
      d = function () {};
    Prism.plugins.toolbar = {};
    var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
        var t;
        (t =
          "function" == typeof n
            ? n
            : function (e) {
                var t;
                return (
                  "function" == typeof n.onClick
                    ? (((t = document.createElement("button")).type = "button"),
                      t.addEventListener("click", function () {
                        n.onClick.call(this, e);
                      }))
                    : "string" == typeof n.url
                    ? ((t = document.createElement("a")).href = n.url)
                    : (t = document.createElement("span")),
                  n.className && t.classList.add(n.className),
                  (t.textContent = n.text),
                  t
                );
              }),
          e in l
            ? console.warn(
                'There is a button with the key "' + e + '" registered already.'
              )
            : i.push((l[e] = t));
      }),
      t = (Prism.plugins.toolbar.hook = function (a) {
        var e = a.element.parentNode;
        if (
          e &&
          /pre/i.test(e.nodeName) &&
          !e.parentNode.classList.contains("code-toolbar")
        ) {
          var t = document.createElement("div");
          t.classList.add("code-toolbar"),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e);
          var r = document.createElement("div");
          r.classList.add("toolbar");
          var n = i,
            o = (function (e) {
              for (; e; ) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t)
                  return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement;
              }
            })(a.element);
          o &&
            (n = o.map(function (e) {
              return l[e] || d;
            })),
            n.forEach(function (e) {
              var t = e(a);
              if (t) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(t),
                  r.appendChild(n);
              }
            }),
            t.appendChild(r);
        }
      });
    e("label", function (e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n,
          a,
          r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r);
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute("data-url")
                ? ((n = document.createElement("a")).href =
                    t.getAttribute("data-url"))
                : (n = document.createElement("span")),
              (n.textContent = r)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", t);
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document)
    if (Prism.plugins.toolbar) {
      var i = {
        none: "Plain text",
        plain: "Plain text",
        plaintext: "Plain text",
        text: "Plain text",
        txt: "Plain text",
        html: "HTML",
        xml: "XML",
        svg: "SVG",
        mathml: "MathML",
        ssml: "SSML",
        rss: "RSS",
        css: "CSS",
        clike: "C-like",
        js: "JavaScript",
        abap: "ABAP",
        abnf: "ABNF",
        al: "AL",
        antlr4: "ANTLR4",
        g4: "ANTLR4",
        apacheconf: "Apache Configuration",
        apl: "APL",
        aql: "AQL",
        ino: "Arduino",
        arff: "ARFF",
        asciidoc: "AsciiDoc",
        adoc: "AsciiDoc",
        aspnet: "ASP.NET (C#)",
        asm6502: "6502 Assembly",
        asmatmel: "Atmel AVR Assembly",
        autohotkey: "AutoHotkey",
        autoit: "AutoIt",
        avisynth: "AviSynth",
        avs: "AviSynth",
        "avro-idl": "Avro IDL",
        avdl: "Avro IDL",
        basic: "BASIC",
        bbcode: "BBcode",
        bnf: "BNF",
        rbnf: "RBNF",
        bsl: "BSL (1C:Enterprise)",
        oscript: "OneScript",
        csharp: "C#",
        cs: "C#",
        dotnet: "C#",
        cpp: "C++",
        cfscript: "CFScript",
        cfc: "CFScript",
        cil: "CIL",
        cmake: "CMake",
        cobol: "COBOL",
        coffee: "CoffeeScript",
        conc: "Concurnas",
        csp: "Content-Security-Policy",
        "css-extras": "CSS Extras",
        csv: "CSV",
        dataweave: "DataWeave",
        dax: "DAX",
        django: "Django/Jinja2",
        jinja2: "Django/Jinja2",
        "dns-zone-file": "DNS zone file",
        "dns-zone": "DNS zone file",
        dockerfile: "Docker",
        dot: "DOT (Graphviz)",
        gv: "DOT (Graphviz)",
        ebnf: "EBNF",
        editorconfig: "EditorConfig",
        ejs: "EJS",
        etlua: "Embedded Lua templating",
        erb: "ERB",
        "excel-formula": "Excel Formula",
        xlsx: "Excel Formula",
        xls: "Excel Formula",
        fsharp: "F#",
        "firestore-security-rules": "Firestore security rules",
        ftl: "FreeMarker Template Language",
        gml: "GameMaker Language",
        gamemakerlanguage: "GameMaker Language",
        gap: "GAP (CAS)",
        gcode: "G-code",
        gdscript: "GDScript",
        gedcom: "GEDCOM",
        glsl: "GLSL",
        gn: "GN",
        gni: "GN",
        "go-module": "Go module",
        "go-mod": "Go module",
        graphql: "GraphQL",
        hbs: "Handlebars",
        hs: "Haskell",
        hcl: "HCL",
        hlsl: "HLSL",
        http: "HTTP",
        hpkp: "HTTP Public-Key-Pins",
        hsts: "HTTP Strict-Transport-Security",
        ichigojam: "IchigoJam",
        "icu-message-format": "ICU Message Format",
        idr: "Idris",
        ignore: ".ignore",
        gitignore: ".gitignore",
        hgignore: ".hgignore",
        npmignore: ".npmignore",
        inform7: "Inform 7",
        javadoc: "JavaDoc",
        javadoclike: "JavaDoc-like",
        javastacktrace: "Java stack trace",
        jq: "JQ",
        jsdoc: "JSDoc",
        "js-extras": "JS Extras",
        json: "JSON",
        webmanifest: "Web App Manifest",
        json5: "JSON5",
        jsonp: "JSONP",
        jsstacktrace: "JS stack trace",
        "js-templates": "JS Templates",
        keepalived: "Keepalived Configure",
        kts: "Kotlin Script",
        kt: "Kotlin",
        kumir: "KuMir (КуМир)",
        kum: "KuMir (КуМир)",
        latex: "LaTeX",
        tex: "TeX",
        context: "ConTeXt",
        lilypond: "LilyPond",
        ly: "LilyPond",
        emacs: "Lisp",
        elisp: "Lisp",
        "emacs-lisp": "Lisp",
        llvm: "LLVM IR",
        log: "Log file",
        lolcode: "LOLCODE",
        magma: "Magma (CAS)",
        md: "Markdown",
        "markup-templating": "Markup templating",
        matlab: "MATLAB",
        maxscript: "MAXScript",
        mel: "MEL",
        mongodb: "MongoDB",
        moon: "MoonScript",
        n1ql: "N1QL",
        n4js: "N4JS",
        n4jsd: "N4JS",
        "nand2tetris-hdl": "Nand To Tetris HDL",
        naniscript: "Naninovel Script",
        nani: "Naninovel Script",
        nasm: "NASM",
        neon: "NEON",
        nginx: "nginx",
        nsis: "NSIS",
        objectivec: "Objective-C",
        objc: "Objective-C",
        ocaml: "OCaml",
        opencl: "OpenCL",
        openqasm: "OpenQasm",
        qasm: "OpenQasm",
        parigp: "PARI/GP",
        objectpascal: "Object Pascal",
        psl: "PATROL Scripting Language",
        pcaxis: "PC-Axis",
        px: "PC-Axis",
        peoplecode: "PeopleCode",
        pcode: "PeopleCode",
        php: "PHP",
        phpdoc: "PHPDoc",
        "php-extras": "PHP Extras",
        plsql: "PL/SQL",
        powerquery: "PowerQuery",
        pq: "PowerQuery",
        mscript: "PowerQuery",
        powershell: "PowerShell",
        promql: "PromQL",
        properties: ".properties",
        protobuf: "Protocol Buffers",
        purebasic: "PureBasic",
        pbfasm: "PureBasic",
        purs: "PureScript",
        py: "Python",
        qsharp: "Q#",
        qs: "Q#",
        q: "Q (kdb+ database)",
        qml: "QML",
        rkt: "Racket",
        cshtml: "Razor C#",
        razor: "Razor C#",
        jsx: "React JSX",
        tsx: "React TSX",
        renpy: "Ren'py",
        rpy: "Ren'py",
        rest: "reST (reStructuredText)",
        robotframework: "Robot Framework",
        robot: "Robot Framework",
        rb: "Ruby",
        sas: "SAS",
        sass: "Sass (Sass)",
        scss: "Sass (Scss)",
        "shell-session": "Shell session",
        "sh-session": "Shell session",
        shellsession: "Shell session",
        sml: "SML",
        smlnj: "SML/NJ",
        solidity: "Solidity (Ethereum)",
        sol: "Solidity (Ethereum)",
        "solution-file": "Solution file",
        sln: "Solution file",
        soy: "Soy (Closure Template)",
        sparql: "SPARQL",
        rq: "SPARQL",
        "splunk-spl": "Splunk SPL",
        sqf: "SQF: Status Quo Function (Arma 3)",
        sql: "SQL",
        iecst: "Structured Text (IEC 61131-3)",
        systemd: "Systemd configuration file",
        "t4-templating": "T4 templating",
        "t4-cs": "T4 Text Templates (C#)",
        t4: "T4 Text Templates (C#)",
        "t4-vb": "T4 Text Templates (VB)",
        tap: "TAP",
        tt2: "Template Toolkit 2",
        toml: "TOML",
        trickle: "trickle",
        troy: "troy",
        trig: "TriG",
        ts: "TypeScript",
        tsconfig: "TSConfig",
        uscript: "UnrealScript",
        uc: "UnrealScript",
        uri: "URI",
        url: "URL",
        vbnet: "VB.Net",
        vhdl: "VHDL",
        vim: "vim",
        "visual-basic": "Visual Basic",
        vba: "VBA",
        vb: "Visual Basic",
        wasm: "WebAssembly",
        "web-idl": "Web IDL",
        webidl: "Web IDL",
        wiki: "Wiki markup",
        wolfram: "Wolfram language",
        nb: "Mathematica Notebook",
        wl: "Wolfram language",
        xeoracube: "XeoraCube",
        "xml-doc": "XML doc (.net)",
        xojo: "Xojo (REALbasic)",
        xquery: "XQuery",
        yaml: "YAML",
        yml: "YAML",
        yang: "YANG",
      };
      Prism.plugins.toolbar.registerButton("show-language", function (e) {
        var a = e.element.parentNode;
        if (a && /pre/i.test(a.nodeName)) {
          var t,
            o =
              a.getAttribute("data-language") ||
              i[e.language] ||
              ((t = e.language)
                ? (t.substring(0, 1).toUpperCase() + t.substring(1)).replace(
                    /s(?=cript)/,
                    "S"
                  )
                : t);
          if (o) {
            var s = document.createElement("span");
            return (s.textContent = o), s;
          }
        }
      });
    } else console.warn("Show Languages plugin loaded before Toolbar plugin.");
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var s = [];
    t(function (t) {
      if (t && t.meta && t.data) {
        if (t.meta.status && 400 <= t.meta.status)
          return "Error: " + (t.data.message || t.meta.status);
        if ("string" == typeof t.data.content)
          return "function" == typeof atob
            ? atob(t.data.content.replace(/\s/g, ""))
            : "Your browser cannot decode base64";
      }
      return null;
    }, "github"),
      t(function (t, e) {
        if (t && t.meta && t.data && t.data.files) {
          if (t.meta.status && 400 <= t.meta.status)
            return "Error: " + (t.data.message || t.meta.status);
          var n = t.data.files,
            a = e.getAttribute("data-filename");
          if (null == a)
            for (var r in n)
              if (n.hasOwnProperty(r)) {
                a = r;
                break;
              }
          return void 0 !== n[a]
            ? n[a].content
            : "Error: unknown or missing gist file " + a;
        }
        return null;
      }, "gist"),
      t(function (t) {
        return t && t.node && "string" == typeof t.data ? t.data : null;
      }, "bitbucket");
    var f = 0,
      d = "data-jsonp-status",
      l = "loading",
      c = "loaded",
      m = "failed",
      p =
        "pre[data-jsonp]:not([" +
        d +
        '="' +
        c +
        '"]):not([' +
        d +
        '="' +
        l +
        '"])';
    Prism.hooks.add("before-highlightall", function (t) {
      t.selector += ", " + p;
    }),
      Prism.hooks.add("before-sanity-check", function (t) {
        var r = t.element;
        if (r.matches(p)) {
          (t.code = ""), r.setAttribute(d, l);
          var i = r.appendChild(document.createElement("CODE"));
          i.textContent = "Loading…";
          var e = t.language;
          i.className = "language-" + e;
          var n = Prism.plugins.autoloader;
          n && n.loadLanguages(e);
          var a = r.getAttribute("data-adapter"),
            o = null;
          if (a) {
            if ("function" != typeof window[a])
              return (
                r.setAttribute(d, m),
                void (i.textContent = (function (t) {
                  return (
                    '✖ Error: JSONP adapter function "' + t + "\" doesn't exist"
                  );
                })(a))
              );
            o = window[a];
          }
          var u = r.getAttribute("data-jsonp");
          !(function (t, e, n, a) {
            var r = "prismjsonp" + f++,
              i = document.createElement("a");
            (i.href = t),
              (i.href += (i.search ? "&" : "?") + (e || "callback") + "=" + r);
            var o = document.createElement("script");
            (o.src = i.href),
              (o.onerror = function () {
                s(), a("network");
              });
            var u = setTimeout(function () {
              s(), a("timeout");
            }, Prism.plugins.jsonphighlight.timeout);
            function s() {
              clearTimeout(u), document.head.removeChild(o), delete window[r];
            }
            (window[r] = function (t) {
              s(), n(t);
            }),
              document.head.appendChild(o);
          })(
            u,
            r.getAttribute("data-callback"),
            function (t) {
              var e = null;
              if (o) e = o(t, r);
              else
                for (
                  var n = 0, a = s.length;
                  n < a && null === (e = s[n].adapter(t, r));
                  n++
                );
              null === e
                ? (r.setAttribute(d, m),
                  (i.textContent =
                    "✖ Error: Cannot parse response (perhaps you need an adapter function?)"))
                : (r.setAttribute(d, c),
                  (i.textContent = e),
                  Prism.highlightElement(i));
            },
            function () {
              r.setAttribute(d, m),
                (i.textContent = (function (t) {
                  return "✖ Error: Timeout loading " + t;
                })(u));
            }
          );
        }
      }),
      (Prism.plugins.jsonphighlight = {
        timeout: 5e3,
        registerAdapter: t,
        removeAdapter: function (e) {
          if (("string" == typeof e && (e = n(e)), "function" == typeof e)) {
            var t = s.findIndex(function (t) {
              return t.adapter === e;
            });
            0 <= t && s.splice(t, 1);
          }
        },
        highlight: function (t) {
          for (
            var e, n = (t || document).querySelectorAll(p), a = 0;
            (e = n[a++]);

          )
            Prism.highlightElement(e);
        },
      });
  }
  function t(t, e) {
    (e = e || t.name),
      "function" != typeof t || n(t) || n(e) || s.push({ adapter: t, name: e });
  }
  function n(t) {
    if ("function" == typeof t) {
      for (var e = 0; (n = s[e++]); )
        if (n.adapter.valueOf() === t.valueOf()) return n.adapter;
    } else if ("string" == typeof t) {
      var n;
      for (e = 0; (n = s[e++]); ) if (n.name === t) return n.adapter;
    }
    return null;
  }
})();
"undefined" != typeof Prism &&
  Prism.hooks.add("wrap", function (e) {
    "keyword" === e.type && e.classes.push("keyword-" + e.content);
  });
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var a =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
      l = [
        function (n) {
          var r = c.exec(n);
          if (r) {
            for (
              var o = 6 <= (n = r[1]).length ? 2 : 1,
                s = n.length / o,
                e = 1 == o ? 1 / 15 : 1 / 255,
                t = [],
                i = 0;
              i < s;
              i++
            ) {
              var a = parseInt(n.substr(i * o, o), 16);
              t.push(a * e);
            }
            return (
              3 == s && t.push(1),
              "rgba(" +
                t
                  .slice(0, 3)
                  .map(function (n) {
                    return String(Math.round(255 * n));
                  })
                  .join(",") +
                "," +
                String(Number(t[3].toFixed(3))) +
                ")"
            );
          }
        },
        function (n) {
          var r = new Option().style;
          return (r.color = n), r.color ? n : void 0;
        },
      ];
    Prism.hooks.add("wrap", function (n) {
      if ("color" === n.type || 0 <= n.classes.indexOf("color")) {
        for (
          var r, o = n.content, s = o.split(a).join(""), e = 0, t = l.length;
          e < t && !r;
          e++
        )
          r = l[e](s);
        if (!r) return;
        var i =
          '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
          r +
          ';"></span></span>';
        n.content = i + o;
      }
    });
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var l = {
        javascript: "clike",
        actionscript: "javascript",
        apex: ["clike", "sql"],
        arduino: "cpp",
        aspnet: ["markup", "csharp"],
        birb: "clike",
        bison: "c",
        c: "clike",
        csharp: "clike",
        cpp: "c",
        cfscript: "clike",
        chaiscript: ["clike", "cpp"],
        coffeescript: "javascript",
        crystal: "ruby",
        "css-extras": "css",
        d: "clike",
        dart: "clike",
        django: "markup-templating",
        ejs: ["javascript", "markup-templating"],
        etlua: ["lua", "markup-templating"],
        erb: ["ruby", "markup-templating"],
        fsharp: "clike",
        "firestore-security-rules": "clike",
        flow: "javascript",
        ftl: "markup-templating",
        gml: "clike",
        glsl: "c",
        go: "clike",
        groovy: "clike",
        haml: "ruby",
        handlebars: "markup-templating",
        haxe: "clike",
        hlsl: "c",
        idris: "haskell",
        java: "clike",
        javadoc: ["markup", "java", "javadoclike"],
        jolie: "clike",
        jsdoc: ["javascript", "javadoclike", "typescript"],
        "js-extras": "javascript",
        json5: "json",
        jsonp: "json",
        "js-templates": "javascript",
        kotlin: "clike",
        latte: ["clike", "markup-templating", "php"],
        less: "css",
        lilypond: "scheme",
        liquid: "markup-templating",
        markdown: "markup",
        "markup-templating": "markup",
        mongodb: "javascript",
        n4js: "javascript",
        objectivec: "c",
        opencl: "c",
        parser: "markup",
        php: "markup-templating",
        phpdoc: ["php", "javadoclike"],
        "php-extras": "php",
        plsql: "sql",
        processing: "clike",
        protobuf: "clike",
        pug: ["markup", "javascript"],
        purebasic: "clike",
        purescript: "haskell",
        qsharp: "clike",
        qml: "javascript",
        qore: "clike",
        racket: "scheme",
        cshtml: ["markup", "csharp"],
        jsx: ["markup", "javascript"],
        tsx: ["jsx", "typescript"],
        reason: "clike",
        ruby: "clike",
        sass: "css",
        scss: "css",
        scala: "java",
        "shell-session": "bash",
        smarty: "markup-templating",
        solidity: "clike",
        soy: "markup-templating",
        sparql: "turtle",
        sqf: "clike",
        squirrel: "clike",
        "t4-cs": ["t4-templating", "csharp"],
        "t4-vb": ["t4-templating", "vbnet"],
        tap: "yaml",
        tt2: ["clike", "markup-templating"],
        textile: "markup",
        twig: "markup-templating",
        typescript: "javascript",
        v: "clike",
        vala: "clike",
        vbnet: "basic",
        velocity: "markup",
        wiki: "markup",
        xeora: "markup",
        "xml-doc": "markup",
        xquery: "markup",
      },
      n = {
        html: "markup",
        xml: "markup",
        svg: "markup",
        mathml: "markup",
        ssml: "markup",
        atom: "markup",
        rss: "markup",
        js: "javascript",
        g4: "antlr4",
        ino: "arduino",
        adoc: "asciidoc",
        avs: "avisynth",
        avdl: "avro-idl",
        shell: "bash",
        shortcode: "bbcode",
        rbnf: "bnf",
        oscript: "bsl",
        cs: "csharp",
        dotnet: "csharp",
        cfc: "cfscript",
        coffee: "coffeescript",
        conc: "concurnas",
        jinja2: "django",
        "dns-zone": "dns-zone-file",
        dockerfile: "docker",
        gv: "dot",
        eta: "ejs",
        xlsx: "excel-formula",
        xls: "excel-formula",
        gamemakerlanguage: "gml",
        gni: "gn",
        "go-mod": "go-module",
        hbs: "handlebars",
        hs: "haskell",
        idr: "idris",
        gitignore: "ignore",
        hgignore: "ignore",
        npmignore: "ignore",
        webmanifest: "json",
        kt: "kotlin",
        kts: "kotlin",
        kum: "kumir",
        tex: "latex",
        context: "latex",
        ly: "lilypond",
        emacs: "lisp",
        elisp: "lisp",
        "emacs-lisp": "lisp",
        md: "markdown",
        moon: "moonscript",
        n4jsd: "n4js",
        nani: "naniscript",
        objc: "objectivec",
        qasm: "openqasm",
        objectpascal: "pascal",
        px: "pcaxis",
        pcode: "peoplecode",
        pq: "powerquery",
        mscript: "powerquery",
        pbfasm: "purebasic",
        purs: "purescript",
        py: "python",
        qs: "qsharp",
        rkt: "racket",
        razor: "cshtml",
        rpy: "renpy",
        robot: "robotframework",
        rb: "ruby",
        "sh-session": "shell-session",
        shellsession: "shell-session",
        smlnj: "sml",
        sol: "solidity",
        sln: "solution-file",
        rq: "sparql",
        t4: "t4-cs",
        trickle: "tremor",
        troy: "tremor",
        trig: "turtle",
        ts: "typescript",
        tsconfig: "typoscript",
        uscript: "unrealscript",
        uc: "unrealscript",
        url: "uri",
        vb: "visual-basic",
        vba: "visual-basic",
        webidl: "web-idl",
        mathematica: "wolfram",
        nb: "wolfram",
        wl: "wolfram",
        xeoracube: "xeora",
        yml: "yaml",
      },
      p = {},
      e = "components/",
      a = Prism.util.currentScript();
    if (a) {
      var r =
          /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
        s = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i,
        i = a.getAttribute("data-autoloader-path");
      if (null != i) e = i.trim().replace(/\/?$/, "/");
      else {
        var t = a.src;
        r.test(t)
          ? (e = t.replace(r, "components/"))
          : s.test(t) && (e = t.replace(s, "$1components/"));
      }
    }
    var o = (Prism.plugins.autoloader = {
      languages_path: e,
      use_minified: !0,
      loadLanguages: u,
    });
    Prism.hooks.add("complete", function (e) {
      var a = e.element,
        r = e.language;
      if (a && r && "none" !== r) {
        var s = (function (e) {
          var a = (e.getAttribute("data-dependencies") || "").trim();
          if (!a) {
            var r = e.parentElement;
            r &&
              "pre" === r.tagName.toLowerCase() &&
              (a = (r.getAttribute("data-dependencies") || "").trim());
          }
          return a ? a.split(/\s*,\s*/g) : [];
        })(a);
        /^diff-./i.test(r)
          ? (s.push("diff"), s.push(r.substr("diff-".length)))
          : s.push(r),
          s.every(m) ||
            u(s, function () {
              Prism.highlightElement(a);
            });
      }
    });
  }
  function m(e) {
    if (0 <= e.indexOf("!")) return !1;
    if ((e = n[e] || e) in Prism.languages) return !0;
    var a = p[e];
    return a && !a.error && !1 === a.loading;
  }
  function u(e, a, r) {
    "string" == typeof e && (e = [e]);
    var s = e.length,
      i = 0,
      t = !1;
    function c() {
      t || (++i === s && a && a(e));
    }
    0 !== s
      ? e.forEach(function (e) {
          !(function (a, r, s) {
            var i = 0 <= a.indexOf("!");
            function e() {
              var e = p[a];
              e || (e = p[a] = { callbacks: [] }),
                e.callbacks.push({ success: r, error: s }),
                !i && m(a)
                  ? k(a, "success")
                  : !i && e.error
                  ? k(a, "error")
                  : (!i && e.loading) ||
                    ((e.loading = !0),
                    (e.error = !1),
                    (function (e, a, r) {
                      var s = document.createElement("script");
                      (s.src = e),
                        (s.async = !0),
                        (s.onload = function () {
                          document.body.removeChild(s), a && a();
                        }),
                        (s.onerror = function () {
                          document.body.removeChild(s), r && r();
                        }),
                        document.body.appendChild(s);
                    })(
                      (function (e) {
                        return (
                          o.languages_path +
                          "prism-" +
                          e +
                          (o.use_minified ? ".min" : "") +
                          ".js"
                        );
                      })(a),
                      function () {
                        (e.loading = !1), k(a, "success");
                      },
                      function () {
                        (e.loading = !1), (e.error = !0), k(a, "error");
                      }
                    ));
            }
            (a = a.replace("!", "")), (a = n[a] || a);
            var t = l[a];
            t && t.length ? u(t, e, s) : e();
          })(e, c, function () {
            t || ((t = !0), r && r(e));
          });
        })
      : a && setTimeout(a, 0);
  }
  function k(e, a) {
    if (p[e]) {
      for (var r = p[e].callbacks, s = 0, i = r.length; s < i; s++) {
        var t = r[s][a];
        t && setTimeout(t, 0);
      }
      r.length = 0;
    }
  }
})();
"undefined" != typeof Prism &&
  "undefined" != typeof document &&
  document.createRange &&
  ((Prism.plugins.KeepMarkup = !0),
  Prism.hooks.add("before-highlight", function (e) {
    if (
      e.element.children.length &&
      Prism.util.isActive(e.element, "keep-markup", !0)
    ) {
      var o = Prism.util.isActive(e.element, "drop-tokens", !1),
        d = 0,
        t = [];
      s(e.element), t.length && (e.keepMarkup = t);
    }
    function r(e) {
      if (
        (function (e) {
          return (
            !o ||
            "span" !== e.nodeName.toLowerCase() ||
            !e.classList.contains("token")
          );
        })(e)
      ) {
        var n = { clone: e.cloneNode(!1), posOpen: d };
        t.push(n), s(e), (n.posClose = d);
      } else s(e);
    }
    function s(e) {
      for (var n = 0, o = e.childNodes.length; n < o; n++) {
        var t = e.childNodes[n];
        1 === t.nodeType ? r(t) : 3 === t.nodeType && (d += t.data.length);
      }
    }
  }),
  Prism.hooks.add("after-highlight", function (n) {
    if (n.keepMarkup && n.keepMarkup.length) {
      var s = function (e, n) {
        for (var o = 0, t = e.childNodes.length; o < t; o++) {
          var d = e.childNodes[o];
          if (1 === d.nodeType) {
            if (!s(d, n)) return !1;
          } else
            3 === d.nodeType &&
              (!n.nodeStart &&
                n.pos + d.data.length > n.node.posOpen &&
                ((n.nodeStart = d), (n.nodeStartPos = n.node.posOpen - n.pos)),
              n.nodeStart &&
                n.pos + d.data.length >= n.node.posClose &&
                ((n.nodeEnd = d), (n.nodeEndPos = n.node.posClose - n.pos)),
              (n.pos += d.data.length));
          if (n.nodeStart && n.nodeEnd) {
            var r = document.createRange();
            return (
              r.setStart(n.nodeStart, n.nodeStartPos),
              r.setEnd(n.nodeEnd, n.nodeEndPos),
              n.node.clone.appendChild(r.extractContents()),
              r.insertNode(n.node.clone),
              r.detach(),
              !1
            );
          }
        }
        return !0;
      };
      n.keepMarkup.forEach(function (e) {
        s(n.element, { node: e, pos: 0 });
      }),
        (n.highlightedCode = n.element.innerHTML);
    }
  }));
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var d = /(?:^|\s)command-line(?:\s|$)/,
      f = "command-line-prompt",
      m = "".startsWith
        ? function (e, t) {
            return e.startsWith(t);
          }
        : function (e, t) {
            return 0 === e.indexOf(t);
          };
    Prism.hooks.add("before-highlight", function (e) {
      var t = h(e);
      if (!t.complete && e.code) {
        var n = e.element.parentElement;
        if (
          n &&
          /pre/i.test(n.nodeName) &&
          (d.test(n.className) || d.test(e.element.className))
        ) {
          var a = e.element.querySelector("." + f);
          a && a.remove();
          var s = e.code.split("\n");
          t.numberOfLines = s.length;
          var o = (t.outputLines = []),
            r = n.getAttribute("data-output"),
            i = n.getAttribute("data-filter-output");
          if (null !== r)
            r.split(",").forEach(function (e) {
              var t = e.split("-"),
                n = parseInt(t[0], 10),
                a = 2 === t.length ? parseInt(t[1], 10) : n;
              if (!isNaN(n) && !isNaN(a)) {
                n < 1 && (n = 1), a > s.length && (a = s.length), a--;
                for (var r = --n; r <= a; r++) (o[r] = s[r]), (s[r] = "");
              }
            });
          else if (i)
            for (var l = 0; l < s.length; l++)
              m(s[l], i) && ((o[l] = s[l].slice(i.length)), (s[l] = ""));
          e.code = s.join("\n");
        } else t.complete = !0;
      } else t.complete = !0;
    }),
      Prism.hooks.add("before-insert", function (e) {
        var t = h(e);
        if (!t.complete) {
          for (
            var n = e.highlightedCode.split("\n"),
              a = t.outputLines || [],
              r = 0,
              s = a.length;
            r < s;
            r++
          )
            a.hasOwnProperty(r) && (n[r] = a[r]);
          e.highlightedCode = n.join("\n");
        }
      }),
      Prism.hooks.add("complete", function (e) {
        if (
          (function (e) {
            return "command-line" in (e.vars = e.vars || {});
          })(e)
        ) {
          var t = h(e);
          if (!t.complete) {
            var n,
              a = e.element.parentElement;
            d.test(e.element.className) &&
              (e.element.className = e.element.className.replace(d, " ")),
              d.test(a.className) || (a.className += " command-line");
            var r = t.numberOfLines || 0,
              s = c("data-prompt", "");
            if ("" !== s) n = p('<span data-prompt="' + s + '"></span>', r);
            else
              n = p(
                '<span data-user="' +
                  c("data-user", "user") +
                  '" data-host="' +
                  c("data-host", "localhost") +
                  '"></span>',
                r
              );
            var o = document.createElement("span");
            (o.className = f), (o.innerHTML = n);
            for (var i = t.outputLines || [], l = 0, m = i.length; l < m; l++)
              if (i.hasOwnProperty(l)) {
                var u = o.children[l];
                u.removeAttribute("data-user"),
                  u.removeAttribute("data-host"),
                  u.removeAttribute("data-prompt");
              }
            e.element.insertBefore(o, e.element.firstChild), (t.complete = !0);
          }
        }
        function c(e, t) {
          return (a.getAttribute(e) || t).replace(/"/g, "&quot");
        }
      });
  }
  function p(e, t) {
    for (var n = "", a = 0; a < t; a++) n += e;
    return n;
  }
  function h(e) {
    var t = (e.vars = e.vars || {});
    return (t["command-line"] = t["command-line"] || {});
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var i =
      Object.assign ||
      function (e, n) {
        for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
        return e;
      };
    (e.prototype = {
      setDefaults: function (e) {
        this.defaults = i(this.defaults, e);
      },
      normalize: function (e, n) {
        for (var t in (n = i(this.defaults, n))) {
          var r = t.replace(/-(\w)/g, function (e, n) {
            return n.toUpperCase();
          });
          "normalize" !== t &&
            "setDefaults" !== r &&
            n[t] &&
            this[r] &&
            (e = this[r].call(this, e, n[t]));
        }
        return e;
      },
      leftTrim: function (e) {
        return e.replace(/^\s+/, "");
      },
      rightTrim: function (e) {
        return e.replace(/\s+$/, "");
      },
      tabsToSpaces: function (e, n) {
        return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(" "));
      },
      spacesToTabs: function (e, n) {
        return (n = 0 | n || 4), e.replace(RegExp(" {" + n + "}", "g"), "\t");
      },
      removeTrailing: function (e) {
        return e.replace(/\s*?$/gm, "");
      },
      removeInitialLineFeed: function (e) {
        return e.replace(/^(?:\r?\n|\r)/, "");
      },
      removeIndent: function (e) {
        var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
        return n && n[0].length
          ? (n.sort(function (e, n) {
              return e.length - n.length;
            }),
            n[0].length ? e.replace(RegExp("^" + n[0], "gm"), "") : e)
          : e;
      },
      indent: function (e, n) {
        return e.replace(
          /^[^\S\n\r]*(?=\S)/gm,
          new Array(++n).join("\t") + "$&"
        );
      },
      breakLines: function (e, n) {
        n = !0 === n ? 80 : 0 | n || 80;
        for (var t = e.split("\n"), r = 0; r < t.length; ++r)
          if (!(s(t[r]) <= n)) {
            for (
              var i = t[r].split(/(\s+)/g), o = 0, a = 0;
              a < i.length;
              ++a
            ) {
              var l = s(i[a]);
              n < (o += l) && ((i[a] = "\n" + i[a]), (o = l));
            }
            t[r] = i.join("");
          }
        return t.join("\n");
      },
    }),
      "undefined" != typeof module && module.exports && (module.exports = e),
      (Prism.plugins.NormalizeWhitespace = new e({
        "remove-trailing": !0,
        "remove-indent": !0,
        "left-trim": !0,
        "right-trim": !0,
      })),
      Prism.hooks.add("before-sanity-check", function (e) {
        var n = Prism.plugins.NormalizeWhitespace;
        if (
          (!e.settings || !1 !== e.settings["whitespace-normalization"]) &&
          Prism.util.isActive(e.element, "whitespace-normalization", !0)
        )
          if ((e.element && e.element.parentNode) || !e.code) {
            var t = e.element.parentNode;
            if (e.code && t && "pre" === t.nodeName.toLowerCase()) {
              for (
                var r = t.childNodes, i = "", o = "", a = !1, l = 0;
                l < r.length;
                ++l
              ) {
                var s = r[l];
                s == e.element
                  ? (a = !0)
                  : "#text" === s.nodeName &&
                    (a ? (o += s.nodeValue) : (i += s.nodeValue),
                    t.removeChild(s),
                    --l);
              }
              if (e.element.children.length && Prism.plugins.KeepMarkup) {
                var c = i + e.element.innerHTML + o;
                (e.element.innerHTML = n.normalize(c, e.settings)),
                  (e.code = e.element.textContent);
              } else
                (e.code = i + e.code + o),
                  (e.code = n.normalize(e.code, e.settings));
            }
          } else e.code = n.normalize(e.code, e.settings);
      });
  }
  function e(e) {
    this.defaults = i({}, e);
  }
  function s(e) {
    for (var n = 0, t = 0; t < e.length; ++t)
      e.charCodeAt(t) == "\t".charCodeAt(0) && (n += 3);
    return e.length + n;
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var e = {
        pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
        lookbehind: !0,
        inside: {
          "language-css": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-javascript": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-json": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-markup": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
            lookbehind: !0,
          },
        },
      },
      r = ["url", "attr-value", "string"];
    (Prism.plugins.dataURIHighlight = {
      processGrammar: function (i) {
        i &&
          !i["data-uri"] &&
          (Prism.languages.DFS(i, function (i, a, n) {
            -1 < r.indexOf(n) &&
              !Array.isArray(a) &&
              (a.pattern || (a = this[i] = { pattern: a }),
              (a.inside = a.inside || {}),
              "attr-value" == n
                ? Prism.languages.insertBefore(
                    "inside",
                    a.inside["url-link"] ? "url-link" : "punctuation",
                    { "data-uri": e },
                    a
                  )
                : a.inside["url-link"]
                ? Prism.languages.insertBefore(
                    "inside",
                    "url-link",
                    { "data-uri": e },
                    a
                  )
                : (a.inside["data-uri"] = e));
          }),
          (i["data-uri"] = e));
      },
    }),
      Prism.hooks.add("before-highlight", function (i) {
        if (e.pattern.test(i.code))
          for (var a in e.inside)
            if (
              e.inside.hasOwnProperty(a) &&
              !e.inside[a].inside &&
              e.inside[a].pattern.test(i.code)
            ) {
              var n = a.match(/^language-(.+)/)[1];
              Prism.languages[n] &&
                (e.inside[a].inside = {
                  rest:
                    ((r = Prism.languages[n]),
                    Prism.plugins.autolinker &&
                      Prism.plugins.autolinker.processGrammar(r),
                    r),
                });
            }
        var r;
        Prism.plugins.dataURIHighlight.processGrammar(i.grammar);
      });
  }
})();
!(function () {
  function u(t, e) {
    t.addEventListener("click", function () {
      !(function (t) {
        navigator.clipboard
          ? navigator.clipboard
              .writeText(t.getText())
              .then(t.success, function () {
                o(t);
              })
          : o(t);
      })(e);
    });
  }
  function o(e) {
    var t = document.createElement("textarea");
    (t.value = e.getText()),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.position = "fixed"),
      document.body.appendChild(t),
      t.focus(),
      t.select();
    try {
      var o = document.execCommand("copy");
      setTimeout(function () {
        o ? e.success() : e.error();
      }, 1);
    } catch (t) {
      setTimeout(function () {
        e.error(t);
      }, 1);
    }
    document.body.removeChild(t);
  }
  "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    (Prism.plugins.toolbar
      ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
          var e = t.element,
            o = (function (t) {
              var e = {
                copy: "Copy",
                "copy-error": "Press Ctrl+C to copy",
                "copy-success": "Copied!",
                "copy-timeout": 5e3,
              };
              for (var o in e) {
                for (
                  var n = "data-prismjs-" + o, c = t;
                  c && !c.hasAttribute(n);

                )
                  c = c.parentElement;
                c && (e[o] = c.getAttribute(n));
              }
              return e;
            })(e),
            n = document.createElement("button");
          (n.className = "copy-to-clipboard-button"),
            n.setAttribute("type", "button");
          var c = document.createElement("span");
          return (
            n.appendChild(c),
            i("copy"),
            u(n, {
              getText: function () {
                return e.textContent;
              },
              success: function () {
                i("copy-success"), r();
              },
              error: function () {
                i("copy-error"),
                  setTimeout(function () {
                    !(function (t) {
                      window.getSelection().selectAllChildren(t);
                    })(e);
                  }, 1),
                  r();
              },
            }),
            n
          );
          function r() {
            setTimeout(function () {
              i("copy");
            }, o["copy-timeout"]);
          }
          function i(t) {
            (c.textContent = o[t]), n.setAttribute("data-copy-state", t);
          }
        })
      : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."));
})();
"undefined" != typeof Prism &&
  "undefined" != typeof document &&
  document.querySelector &&
  Prism.plugins.toolbar.registerButton("download-file", function (t) {
    var e = t.element.parentNode;
    if (
      e &&
      /pre/i.test(e.nodeName) &&
      e.hasAttribute("data-src") &&
      e.hasAttribute("data-download-link")
    ) {
      var n = e.getAttribute("data-src"),
        a = document.createElement("a");
      return (
        (a.textContent =
          e.getAttribute("data-download-link-label") || "Download"),
        a.setAttribute("download", ""),
        (a.href = n),
        a
      );
    }
  });
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var d = { "(": ")", "[": "]", "{": "}" },
      u = { "(": "brace-round", "[": "brace-square", "{": "brace-curly" },
      f = { "${": "{" },
      h = 0,
      n = /^(pair-\d+-)(close|open)$/;
    Prism.hooks.add("complete", function (e) {
      var t = e.element,
        n = t.parentElement;
      if (n && "PRE" == n.tagName) {
        var r = [];
        if (
          (Prism.util.isActive(t, "match-braces") && r.push("(", "[", "{"),
          0 != r.length)
        ) {
          n.__listenerAdded ||
            (n.addEventListener("mousedown", function () {
              var e = n.querySelector("code"),
                t = p("brace-selected");
              Array.prototype.slice
                .call(e.querySelectorAll("." + t))
                .forEach(function (e) {
                  e.classList.remove(t);
                });
            }),
            Object.defineProperty(n, "__listenerAdded", { value: !0 }));
          var o = Array.prototype.slice.call(
              t.querySelectorAll("span." + p("token") + "." + p("punctuation"))
            ),
            l = [];
          r.forEach(function (e) {
            for (
              var t = d[e], n = p(u[e]), r = [], c = [], s = 0;
              s < o.length;
              s++
            ) {
              var i = o[s];
              if (0 == i.childElementCount) {
                var a = i.textContent;
                (a = f[a] || a) === e
                  ? (l.push({ index: s, open: !0, element: i }),
                    i.classList.add(n),
                    i.classList.add(p("brace-open")),
                    c.push(s))
                  : a === t &&
                    (l.push({ index: s, open: !1, element: i }),
                    i.classList.add(n),
                    i.classList.add(p("brace-close")),
                    c.length && r.push([s, c.pop()]));
              }
            }
            r.forEach(function (e) {
              var t = "pair-" + h++ + "-",
                n = o[e[0]],
                r = o[e[1]];
              (n.id = t + "open"),
                (r.id = t + "close"),
                [n, r].forEach(function (e) {
                  e.addEventListener("mouseenter", v),
                    e.addEventListener("mouseleave", m),
                    e.addEventListener("click", b);
                });
            });
          });
          var c = 0;
          l.sort(function (e, t) {
            return e.index - t.index;
          }),
            l.forEach(function (e) {
              e.open
                ? (e.element.classList.add(p("brace-level-" + ((c % 12) + 1))),
                  c++)
                : ((c = Math.max(0, c - 1)),
                  e.element.classList.add(p("brace-level-" + ((c % 12) + 1))));
            });
        }
      }
    });
  }
  function p(e) {
    var t = Prism.plugins.customClass;
    return t ? t.apply(e, "none") : e;
  }
  function e(e) {
    var t = n.exec(e.id);
    return document.querySelector(
      "#" + t[1] + ("open" == t[2] ? "close" : "open")
    );
  }
  function v() {
    Prism.util.isActive(this, "brace-hover", !0) &&
      [this, e(this)].forEach(function (e) {
        e.classList.add(p("brace-hover"));
      });
  }
  function m() {
    [this, e(this)].forEach(function (e) {
      e.classList.remove(p("brace-hover"));
    });
  }
  function b() {
    Prism.util.isActive(this, "brace-select", !0) &&
      [this, e(this)].forEach(function (e) {
        e.classList.add(p("brace-selected"));
      });
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
    var e,
      t = Prism.util.currentScript(),
      r = [],
      n = (Prism.plugins.filterHighlightAll = {
        add: function (t) {
          r.push(function (e) {
            return t({ element: e, language: Prism.util.getLanguage(e) });
          });
        },
        addSelector: function (t) {
          r.push(function (e) {
            return e.matches(t);
          });
        },
        reject: {
          add: function (t) {
            r.push(function (e) {
              return !t({ element: e, language: Prism.util.getLanguage(e) });
            });
          },
          addSelector: function (t) {
            r.push(function (e) {
              return !e.matches(t);
            });
          },
        },
        filterKnown: !!t && t.hasAttribute("data-filter-known"),
      });
    if (
      (n.add(function (e) {
        return !n.filterKnown || "object" == typeof Prism.languages[e.language];
      }),
      t)
    )
      (e = t.getAttribute("data-filter-selector")) && n.addSelector(e),
        (e = t.getAttribute("data-reject-selector")) && n.reject.addSelector(e);
    Prism.hooks.add("before-all-elements-highlight", function (e) {
      e.elements = e.elements.filter(i);
    });
  }
  function i(e) {
    for (var t = 0, n = r.length; t < n; t++) if (!r[t](e)) return !1;
    return !0;
  }
})();
