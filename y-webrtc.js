!function e(t, n, o) {
    function r(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var c = "function" == typeof require && require;
                if (!a && c)return c(s, !0);
                if (i)return i(s, !0);
                throw new Error("Cannot find module '" + s + "'")
            }
            var u = n[s] = {exports: {}};
            t[s][0].call(u.exports, function (e) {
                var n = t[s][1][e];
                return r(n ? n : e)
            }, u, u.exports, e, t, n, o)
        }
        return n[s].exports
    }

    for (var i = "function" == typeof require && require, s = 0; s < o.length; s++)r(o[s]);
    return r
}({
    1: [function (e, t) {
        (function () {
            function n(e, t) {
                void 0 === t && (t = {}), void 0 === t.url && (t.url = "https://yatta.ninja:8888");
                var n = new o(t);
                this.swr = n;
                var r = this;
                n.once("connectionReady", function (t) {
                    n.joinRoom(e), n.once("joinedRoom", function () {
                        var e = function () {
                            r.init({role: "slave", syncMethod: "syncAll", user_id: t});
                            var e;
                            for (e in r.swr.webrtc.peers)r.userJoined(r.swr.webrtc.peers[e].id, "slave")
                        };
                        r.is_bound_to_y ? e() : r.on_bound_to_y = e, n.on("channelMessage", function (e, t, n) {
                            r.is_initialized && "yjs" === n.type && r.receiveMessage(e.id, n.payload)
                        })
                    }), n.on("createdPeer", function (e) {
                        r.is_initialized && r.userJoined(e.id, "slave")
                    }), n.on("peerStreamRemoved", function (e) {
                        r.is_initialized && r.userLeft(e.id)
                    })
                })
            }

            var o = e("simplewebrtc");
            n.prototype.send = function (e, t) {
                var n = this, o = function () {
                    var r, i = n.swr.webrtc.getPeers(e)[0];
                    i && (r = i.sendDirectly("simplewebrtc", "yjs", t)), r || window.setTimeout(o, 500)
                };
                o()
            }, n.prototype.broadcast = function (e) {
                this.swr.sendDirectlyToAll("simplewebrtc", "yjs", e)
            }, void 0 !== window && (void 0 !== window.Y ? window.Y.WebRTC = n : console.err("You must first include Y, and then the WebRTC Connector!")), void 0 !== t && (t.exports = n)
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_cd01c512.js", "/")
    }, {"1YiZ5S": 6, buffer: 2, simplewebrtc: 30}],
    2: [function (e, t, n) {
        (function (t, o, r) {
            function r(e, t, n) {
                if (!(this instanceof r))return new r(e, t, n);
                var o = typeof e;
                if ("base64" === t && "string" === o)for (e = A(e); e.length % 4 !== 0;)e += "=";
                var i;
                if ("number" === o)i = I(e); else if ("string" === o)i = r.byteLength(e, t); else {
                    if ("object" !== o)throw new Error("First argument needs to be a number, array or string.");
                    i = I(e.length)
                }
                var s;
                r._useTypedArrays ? s = r._augment(new Uint8Array(i)) : (s = this, s.length = i, s._isBuffer = !0);
                var a;
                if (r._useTypedArrays && "number" == typeof e.byteLength)s._set(e); else if (N(e))for (a = 0; i > a; a++)s[a] = r.isBuffer(e) ? e.readUInt8(a) : e[a]; else if ("string" === o)s.write(e, 0, t); else if ("number" === o && !r._useTypedArrays && !n)for (a = 0; i > a; a++)s[a] = 0;
                return s
            }

            function i(e, t, n, o) {
                n = Number(n) || 0;
                var i = e.length - n;
                o ? (o = Number(o), o > i && (o = i)) : o = i;
                var s = t.length;
                V(s % 2 === 0, "Invalid hex string"), o > s / 2 && (o = s / 2);
                for (var a = 0; o > a; a++) {
                    var c = parseInt(t.substr(2 * a, 2), 16);
                    V(!isNaN(c), "Invalid hex string"), e[n + a] = c
                }
                return r._charsWritten = 2 * a, a
            }

            function s(e, t, n, o) {
                var i = r._charsWritten = W(L(t), e, n, o);
                return i
            }

            function a(e, t, n, o) {
                var i = r._charsWritten = W(R(t), e, n, o);
                return i
            }

            function c(e, t, n, o) {
                return a(e, t, n, o)
            }

            function u(e, t, n, o) {
                var i = r._charsWritten = W(P(t), e, n, o);
                return i
            }

            function l(e, t, n, o) {
                var i = r._charsWritten = W(B(t), e, n, o);
                return i
            }

            function d(e, t, n) {
                return Z.fromByteArray(0 === t && n === e.length ? e : e.slice(t, n))
            }

            function f(e, t, n) {
                var o = "", r = "";
                n = Math.min(e.length, n);
                for (var i = t; n > i; i++)e[i] <= 127 ? (o += F(r) + String.fromCharCode(e[i]), r = "") : r += "%" + e[i].toString(16);
                return o + F(r)
            }

            function p(e, t, n) {
                var o = "";
                n = Math.min(e.length, n);
                for (var r = t; n > r; r++)o += String.fromCharCode(e[r]);
                return o
            }

            function h(e, t, n) {
                return p(e, t, n)
            }

            function m(e, t, n) {
                var o = e.length;
                (!t || 0 > t) && (t = 0), (!n || 0 > n || n > o) && (n = o);
                for (var r = "", i = t; n > i; i++)r += M(e[i]);
                return r
            }

            function g(e, t, n) {
                for (var o = e.slice(t, n), r = "", i = 0; i < o.length; i += 2)r += String.fromCharCode(o[i] + 256 * o[i + 1]);
                return r
            }

            function y(e, t, n, o) {
                o || (V("boolean" == typeof n, "missing or invalid endian"), V(void 0 !== t && null !== t, "missing offset"), V(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var i;
                    return n ? (i = e[t], r > t + 1 && (i |= e[t + 1] << 8)) : (i = e[t] << 8, r > t + 1 && (i |= e[t + 1])), i
                }
            }

            function v(e, t, n, o) {
                o || (V("boolean" == typeof n, "missing or invalid endian"), V(void 0 !== t && null !== t, "missing offset"), V(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var i;
                    return n ? (r > t + 2 && (i = e[t + 2] << 16), r > t + 1 && (i |= e[t + 1] << 8), i |= e[t], r > t + 3 && (i += e[t + 3] << 24 >>> 0)) : (r > t + 1 && (i = e[t + 1] << 16), r > t + 2 && (i |= e[t + 2] << 8), r > t + 3 && (i |= e[t + 3]), i += e[t] << 24 >>> 0), i
                }
            }

            function b(e, t, n, o) {
                o || (V("boolean" == typeof n, "missing or invalid endian"), V(void 0 !== t && null !== t, "missing offset"), V(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var i = y(e, t, n, !0), s = 32768 & i;
                    return s ? -1 * (65535 - i + 1) : i
                }
            }

            function w(e, t, n, o) {
                o || (V("boolean" == typeof n, "missing or invalid endian"), V(void 0 !== t && null !== t, "missing offset"), V(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var i = v(e, t, n, !0), s = 2147483648 & i;
                    return s ? -1 * (4294967295 - i + 1) : i
                }
            }

            function S(e, t, n, o) {
                return o || (V("boolean" == typeof n, "missing or invalid endian"), V(t + 3 < e.length, "Trying to read beyond buffer length")), q.read(e, t, n, 23, 4)
            }

            function _(e, t, n, o) {
                return o || (V("boolean" == typeof n, "missing or invalid endian"), V(t + 7 < e.length, "Trying to read beyond buffer length")), q.read(e, t, n, 52, 8)
            }

            function k(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 1 < e.length, "trying to write beyond buffer length"), U(t, 65535));
                var i = e.length;
                if (!(n >= i))for (var s = 0, a = Math.min(i - n, 2); a > s; s++)e[n + s] = (t & 255 << 8 * (o ? s : 1 - s)) >>> 8 * (o ? s : 1 - s)
            }

            function E(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 3 < e.length, "trying to write beyond buffer length"), U(t, 4294967295));
                var i = e.length;
                if (!(n >= i))for (var s = 0, a = Math.min(i - n, 4); a > s; s++)e[n + s] = t >>> 8 * (o ? s : 3 - s) & 255
            }

            function C(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 1 < e.length, "Trying to write beyond buffer length"), J(t, 32767, -32768));
                var i = e.length;
                n >= i || (t >= 0 ? k(e, t, n, o, r) : k(e, 65535 + t + 1, n, o, r))
            }

            function T(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 3 < e.length, "Trying to write beyond buffer length"), J(t, 2147483647, -2147483648));
                var i = e.length;
                n >= i || (t >= 0 ? E(e, t, n, o, r) : E(e, 4294967295 + t + 1, n, o, r))
            }

            function O(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 3 < e.length, "Trying to write beyond buffer length"), Y(t, 3.4028234663852886e38, -3.4028234663852886e38));
                var i = e.length;
                n >= i || q.write(e, t, n, o, 23, 4)
            }

            function x(e, t, n, o, r) {
                r || (V(void 0 !== t && null !== t, "missing value"), V("boolean" == typeof o, "missing or invalid endian"), V(void 0 !== n && null !== n, "missing offset"), V(n + 7 < e.length, "Trying to write beyond buffer length"), Y(t, 1.7976931348623157e308, -1.7976931348623157e308));
                var i = e.length;
                n >= i || q.write(e, t, n, o, 52, 8)
            }

            function A(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function j(e, t, n) {
                return "number" != typeof e ? n : (e = ~~e, e >= t ? t : e >= 0 ? e : (e += t, e >= 0 ? e : 0))
            }

            function I(e) {
                return e = ~~Math.ceil(+e), 0 > e ? 0 : e
            }

            function D(e) {
                return (Array.isArray || function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                })(e)
            }

            function N(e) {
                return D(e) || r.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
            }

            function M(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function L(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var o = e.charCodeAt(n);
                    if (127 >= o)t.push(e.charCodeAt(n)); else {
                        var r = n;
                        o >= 55296 && 57343 >= o && n++;
                        for (var i = encodeURIComponent(e.slice(r, n + 1)).substr(1).split("%"), s = 0; s < i.length; s++)t.push(parseInt(i[s], 16))
                    }
                }
                return t
            }

            function R(e) {
                for (var t = [], n = 0; n < e.length; n++)t.push(255 & e.charCodeAt(n));
                return t
            }

            function B(e) {
                for (var t, n, o, r = [], i = 0; i < e.length; i++)t = e.charCodeAt(i), n = t >> 8, o = t % 256, r.push(o), r.push(n);
                return r
            }

            function P(e) {
                return Z.toByteArray(e)
            }

            function W(e, t, n, o) {
                for (var r = 0; o > r && !(r + n >= t.length || r >= e.length); r++)t[r + n] = e[r];
                return r
            }

            function F(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return String.fromCharCode(65533)
                }
            }

            function U(e, t) {
                V("number" == typeof e, "cannot write a non-number as a number"), V(e >= 0, "specified a negative value for writing an unsigned value"), V(t >= e, "value is larger than maximum value for type"), V(Math.floor(e) === e, "value has a fractional component")
            }

            function J(e, t, n) {
                V("number" == typeof e, "cannot write a non-number as a number"), V(t >= e, "value larger than maximum allowed value"), V(e >= n, "value smaller than minimum allowed value"), V(Math.floor(e) === e, "value has a fractional component")
            }

            function Y(e, t, n) {
                V("number" == typeof e, "cannot write a non-number as a number"), V(t >= e, "value larger than maximum allowed value"), V(e >= n, "value smaller than minimum allowed value")
            }

            function V(e, t) {
                if (!e)throw new Error(t || "Failed assertion")
            }

            var Z = e("base64-js"), q = e("ieee754");
            n.Buffer = r, n.SlowBuffer = r, n.INSPECT_MAX_BYTES = 50, r.poolSize = 8192, r._useTypedArrays = function () {
                try {
                    var e = new ArrayBuffer(0), t = new Uint8Array(e);
                    return t.foo = function () {
                        return 42
                    }, 42 === t.foo() && "function" == typeof t.subarray
                } catch (n) {
                    return !1
                }
            }(), r.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"binary":
                    case"base64":
                    case"raw":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, r.isBuffer = function (e) {
                return !(null === e || void 0 === e || !e._isBuffer)
            }, r.byteLength = function (e, t) {
                var n;
                switch (e += "", t || "utf8") {
                    case"hex":
                        n = e.length / 2;
                        break;
                    case"utf8":
                    case"utf-8":
                        n = L(e).length;
                        break;
                    case"ascii":
                    case"binary":
                    case"raw":
                        n = e.length;
                        break;
                    case"base64":
                        n = P(e).length;
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        n = 2 * e.length;
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return n
            }, r.concat = function (e, t) {
                if (V(D(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length)return new r(0);
                if (1 === e.length)return e[0];
                var n;
                if ("number" != typeof t)for (t = 0, n = 0; n < e.length; n++)t += e[n].length;
                var o = new r(t), i = 0;
                for (n = 0; n < e.length; n++) {
                    var s = e[n];
                    s.copy(o, i), i += s.length
                }
                return o
            }, r.prototype.write = function (e, t, n, o) {
                if (isFinite(t))isFinite(n) || (o = n, n = void 0); else {
                    var r = o;
                    o = t, t = n, n = r
                }
                t = Number(t) || 0;
                var d = this.length - t;
                n ? (n = Number(n), n > d && (n = d)) : n = d, o = String(o || "utf8").toLowerCase();
                var f;
                switch (o) {
                    case"hex":
                        f = i(this, e, t, n);
                        break;
                    case"utf8":
                    case"utf-8":
                        f = s(this, e, t, n);
                        break;
                    case"ascii":
                        f = a(this, e, t, n);
                        break;
                    case"binary":
                        f = c(this, e, t, n);
                        break;
                    case"base64":
                        f = u(this, e, t, n);
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        f = l(this, e, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return f
            }, r.prototype.toString = function (e, t, n) {
                var o = this;
                if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, n = void 0 !== n ? Number(n) : n = o.length, n === t)return "";
                var r;
                switch (e) {
                    case"hex":
                        r = m(o, t, n);
                        break;
                    case"utf8":
                    case"utf-8":
                        r = f(o, t, n);
                        break;
                    case"ascii":
                        r = p(o, t, n);
                        break;
                    case"binary":
                        r = h(o, t, n);
                        break;
                    case"base64":
                        r = d(o, t, n);
                        break;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        r = g(o, t, n);
                        break;
                    default:
                        throw new Error("Unknown encoding")
                }
                return r
            }, r.prototype.toJSON = function () {
                return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
            }, r.prototype.copy = function (e, t, n, o) {
                var i = this;
                if (n || (n = 0), o || 0 === o || (o = this.length), t || (t = 0), o !== n && 0 !== e.length && 0 !== i.length) {
                    V(o >= n, "sourceEnd < sourceStart"), V(t >= 0 && t < e.length, "targetStart out of bounds"), V(n >= 0 && n < i.length, "sourceStart out of bounds"), V(o >= 0 && o <= i.length, "sourceEnd out of bounds"), o > this.length && (o = this.length), e.length - t < o - n && (o = e.length - t + n);
                    var s = o - n;
                    if (100 > s || !r._useTypedArrays)for (var a = 0; s > a; a++)e[a + t] = this[a + n]; else e._set(this.subarray(n, n + s), t)
                }
            }, r.prototype.slice = function (e, t) {
                var n = this.length;
                if (e = j(e, n, 0), t = j(t, n, n), r._useTypedArrays)return r._augment(this.subarray(e, t));
                for (var o = t - e, i = new r(o, void 0, !0), s = 0; o > s; s++)i[s] = this[s + e];
                return i
            }, r.prototype.get = function (e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, r.prototype.set = function (e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, r.prototype.readUInt8 = function (e, t) {
                return t || (V(void 0 !== e && null !== e, "missing offset"), V(e < this.length, "Trying to read beyond buffer length")), e >= this.length ? void 0 : this[e]
            }, r.prototype.readUInt16LE = function (e, t) {
                return y(this, e, !0, t)
            }, r.prototype.readUInt16BE = function (e, t) {
                return y(this, e, !1, t)
            }, r.prototype.readUInt32LE = function (e, t) {
                return v(this, e, !0, t)
            }, r.prototype.readUInt32BE = function (e, t) {
                return v(this, e, !1, t)
            }, r.prototype.readInt8 = function (e, t) {
                if (t || (V(void 0 !== e && null !== e, "missing offset"), V(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) {
                    var n = 128 & this[e];
                    return n ? -1 * (255 - this[e] + 1) : this[e]
                }
            }, r.prototype.readInt16LE = function (e, t) {
                return b(this, e, !0, t)
            }, r.prototype.readInt16BE = function (e, t) {
                return b(this, e, !1, t)
            }, r.prototype.readInt32LE = function (e, t) {
                return w(this, e, !0, t)
            }, r.prototype.readInt32BE = function (e, t) {
                return w(this, e, !1, t)
            }, r.prototype.readFloatLE = function (e, t) {
                return S(this, e, !0, t)
            }, r.prototype.readFloatBE = function (e, t) {
                return S(this, e, !1, t)
            }, r.prototype.readDoubleLE = function (e, t) {
                return _(this, e, !0, t)
            }, r.prototype.readDoubleBE = function (e, t) {
                return _(this, e, !1, t)
            }, r.prototype.writeUInt8 = function (e, t, n) {
                n || (V(void 0 !== e && null !== e, "missing value"), V(void 0 !== t && null !== t, "missing offset"), V(t < this.length, "trying to write beyond buffer length"), U(e, 255)), t >= this.length || (this[t] = e)
            }, r.prototype.writeUInt16LE = function (e, t, n) {
                k(this, e, t, !0, n)
            }, r.prototype.writeUInt16BE = function (e, t, n) {
                k(this, e, t, !1, n)
            }, r.prototype.writeUInt32LE = function (e, t, n) {
                E(this, e, t, !0, n)
            }, r.prototype.writeUInt32BE = function (e, t, n) {
                E(this, e, t, !1, n)
            }, r.prototype.writeInt8 = function (e, t, n) {
                n || (V(void 0 !== e && null !== e, "missing value"), V(void 0 !== t && null !== t, "missing offset"), V(t < this.length, "Trying to write beyond buffer length"), J(e, 127, -128)), t >= this.length || (e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n))
            }, r.prototype.writeInt16LE = function (e, t, n) {
                C(this, e, t, !0, n)
            }, r.prototype.writeInt16BE = function (e, t, n) {
                C(this, e, t, !1, n)
            }, r.prototype.writeInt32LE = function (e, t, n) {
                T(this, e, t, !0, n)
            }, r.prototype.writeInt32BE = function (e, t, n) {
                T(this, e, t, !1, n)
            }, r.prototype.writeFloatLE = function (e, t, n) {
                O(this, e, t, !0, n)
            }, r.prototype.writeFloatBE = function (e, t, n) {
                O(this, e, t, !1, n)
            }, r.prototype.writeDoubleLE = function (e, t, n) {
                x(this, e, t, !0, n)
            }, r.prototype.writeDoubleBE = function (e, t, n) {
                x(this, e, t, !1, n)
            }, r.prototype.fill = function (e, t, n) {
                if (e || (e = 0), t || (t = 0), n || (n = this.length), "string" == typeof e && (e = e.charCodeAt(0)), V("number" == typeof e && !isNaN(e), "value is not a number"), V(n >= t, "end < start"), n !== t && 0 !== this.length) {
                    V(t >= 0 && t < this.length, "start out of bounds"), V(n >= 0 && n <= this.length, "end out of bounds");
                    for (var o = t; n > o; o++)this[o] = e
                }
            }, r.prototype.inspect = function () {
                for (var e = [], t = this.length, o = 0; t > o; o++)if (e[o] = M(this[o]), o === n.INSPECT_MAX_BYTES) {
                    e[o + 1] = "...";
                    break
                }
                return "<Buffer " + e.join(" ") + ">"
            }, r.prototype.toArrayBuffer = function () {
                if ("undefined" != typeof Uint8Array) {
                    if (r._useTypedArrays)return new r(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, n = e.length; n > t; t += 1)e[t] = this[t];
                    return e.buffer
                }
                throw new Error("Buffer.toArrayBuffer not supported in this browser")
            };
            var z = r.prototype;
            r._augment = function (e) {
                return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = z.get, e.set = z.set, e.write = z.write, e.toString = z.toString, e.toLocaleString = z.toString, e.toJSON = z.toJSON, e.copy = z.copy, e.slice = z.slice, e.readUInt8 = z.readUInt8, e.readUInt16LE = z.readUInt16LE, e.readUInt16BE = z.readUInt16BE, e.readUInt32LE = z.readUInt32LE, e.readUInt32BE = z.readUInt32BE, e.readInt8 = z.readInt8, e.readInt16LE = z.readInt16LE, e.readInt16BE = z.readInt16BE, e.readInt32LE = z.readInt32LE, e.readInt32BE = z.readInt32BE, e.readFloatLE = z.readFloatLE, e.readFloatBE = z.readFloatBE, e.readDoubleLE = z.readDoubleLE, e.readDoubleBE = z.readDoubleBE, e.writeUInt8 = z.writeUInt8, e.writeUInt16LE = z.writeUInt16LE, e.writeUInt16BE = z.writeUInt16BE, e.writeUInt32LE = z.writeUInt32LE, e.writeUInt32BE = z.writeUInt32BE, e.writeInt8 = z.writeInt8, e.writeInt16LE = z.writeInt16LE, e.writeInt16BE = z.writeInt16BE, e.writeInt32LE = z.writeInt32LE, e.writeInt32BE = z.writeInt32BE, e.writeFloatLE = z.writeFloatLE, e.writeFloatBE = z.writeFloatBE, e.writeDoubleLE = z.writeDoubleLE, e.writeDoubleBE = z.writeDoubleBE, e.fill = z.fill, e.inspect = z.inspect, e.toArrayBuffer = z.toArrayBuffer, e
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
    }, {"1YiZ5S": 6, "base64-js": 3, buffer: 2, ieee754: 4}],
    3: [function (e, t, n) {
        (function () {
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            !function (t) {
                "use strict";
                function n(e) {
                    var t = e.charCodeAt(0);
                    return t === s || t === d ? 62 : t === a || t === f ? 63 : c > t ? -1 : c + 10 > t ? t - c + 26 + 26 : l + 26 > t ? t - l : u + 26 > t ? t - u + 26 : void 0
                }

                function o(e) {
                    function t(e) {
                        u[d++] = e
                    }

                    var o, r, s, a, c, u;
                    if (e.length % 4 > 0)throw new Error("Invalid string. Length must be a multiple of 4");
                    var l = e.length;
                    c = "=" === e.charAt(l - 2) ? 2 : "=" === e.charAt(l - 1) ? 1 : 0, u = new i(3 * e.length / 4 - c), s = c > 0 ? e.length - 4 : e.length;
                    var d = 0;
                    for (o = 0, r = 0; s > o; o += 4, r += 3)a = n(e.charAt(o)) << 18 | n(e.charAt(o + 1)) << 12 | n(e.charAt(o + 2)) << 6 | n(e.charAt(o + 3)), t((16711680 & a) >> 16), t((65280 & a) >> 8), t(255 & a);
                    return 2 === c ? (a = n(e.charAt(o)) << 2 | n(e.charAt(o + 1)) >> 4, t(255 & a)) : 1 === c && (a = n(e.charAt(o)) << 10 | n(e.charAt(o + 1)) << 4 | n(e.charAt(o + 2)) >> 2, t(a >> 8 & 255), t(255 & a)), u
                }

                function r(t) {
                    function n(t) {
                        return e.charAt(t)
                    }

                    function o(e) {
                        return n(e >> 18 & 63) + n(e >> 12 & 63) + n(e >> 6 & 63) + n(63 & e)
                    }

                    var r, i, s, a = t.length % 3, c = "";
                    for (r = 0, s = t.length - a; s > r; r += 3)i = (t[r] << 16) + (t[r + 1] << 8) + t[r + 2], c += o(i);
                    switch (a) {
                        case 1:
                            i = t[t.length - 1], c += n(i >> 2), c += n(i << 4 & 63), c += "==";
                            break;
                        case 2:
                            i = (t[t.length - 2] << 8) + t[t.length - 1], c += n(i >> 10), c += n(i >> 4 & 63), c += n(i << 2 & 63), c += "="
                    }
                    return c
                }

                var i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "+".charCodeAt(0), a = "/".charCodeAt(0), c = "0".charCodeAt(0), u = "a".charCodeAt(0), l = "A".charCodeAt(0), d = "-".charCodeAt(0), f = "_".charCodeAt(0);
                t.toByteArray = o, t.fromByteArray = r
            }("undefined" == typeof n ? this.base64js = {} : n)
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
    }, {"1YiZ5S": 6, buffer: 2}],
    4: [function (e, t, n) {
        (function () {
            n.read = function (e, t, n, o, r) {
                var i, s, a = 8 * r - o - 1, c = (1 << a) - 1, u = c >> 1, l = -7, d = n ? r - 1 : 0, f = n ? -1 : 1, p = e[t + d];
                for (d += f, i = p & (1 << -l) - 1, p >>= -l, l += a; l > 0; i = 256 * i + e[t + d], d += f, l -= 8);
                for (s = i & (1 << -l) - 1, i >>= -l, l += o; l > 0; s = 256 * s + e[t + d], d += f, l -= 8);
                if (0 === i)i = 1 - u; else {
                    if (i === c)return s ? 0 / 0 : 1 / 0 * (p ? -1 : 1);
                    s += Math.pow(2, o), i -= u
                }
                return (p ? -1 : 1) * s * Math.pow(2, i - o)
            }, n.write = function (e, t, n, o, r, i) {
                var s, a, c, u = 8 * i - r - 1, l = (1 << u) - 1, d = l >> 1, f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = o ? 0 : i - 1, h = o ? 1 : -1, m = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), t += s + d >= 1 ? f / c : f * Math.pow(2, 1 - d), t * c >= 2 && (s++, c /= 2), s + d >= l ? (a = 0, s = l) : s + d >= 1 ? (a = (t * c - 1) * Math.pow(2, r), s += d) : (a = t * Math.pow(2, d - 1) * Math.pow(2, r), s = 0)); r >= 8; e[n + p] = 255 & a, p += h, a /= 256, r -= 8);
                for (s = s << r | a, u += r; u > 0; e[n + p] = 255 & s, p += h, s /= 256, u -= 8);
                e[n + p - h] |= 128 * m
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
    }, {"1YiZ5S": 6, buffer: 2}],
    5: [function (e, t) {
        (function () {
            t.exports = "function" == typeof Object.create ? function (e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : function (e, t) {
                e.super_ = t;
                var n = function () {
                };
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/inherits/inherits_browser.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/inherits")
    }, {"1YiZ5S": 6, buffer: 2}],
    6: [function (e, t) {
        (function (e) {
            function n() {
            }

            var e = t.exports = {};
            e.nextTick = function () {
                var e = "undefined" != typeof window && window.setImmediate, t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e)return function (e) {
                    return window.setImmediate(e)
                };
                if (t) {
                    var n = [];
                    return window.addEventListener("message", function (e) {
                        var t = e.source;
                        if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(), n.length > 0)) {
                            var o = n.shift();
                            o()
                        }
                    }, !0), function (e) {
                        n.push(e), window.postMessage("process-tick", "*")
                    }
                }
                return function (e) {
                    setTimeout(e, 0)
                }
            }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = n, e.addListener = n, e.once = n, e.off = n, e.removeListener = n, e.removeAllListeners = n, e.emit = n, e.binding = function () {
                throw new Error("process.binding is not supported")
            }, e.cwd = function () {
                return "/"
            }, e.chdir = function () {
                throw new Error("process.chdir is not supported")
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
    }, {"1YiZ5S": 6, buffer: 2}],
    7: [function (e, t) {
        (function () {
            t.exports = function (e) {
                return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/util/support/isBufferBrowser.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/util/support")
    }, {"1YiZ5S": 6, buffer: 2}],
    8: [function (e, t, n) {
        (function (t, o) {
            function r(e, t) {
                var o = {seen: [], stylize: s};
                return arguments.length >= 3 && (o.depth = arguments[2]), arguments.length >= 4 && (o.colors = arguments[3]), m(t) ? o.showHidden = t : t && n._extend(o, t), S(o.showHidden) && (o.showHidden = !1), S(o.depth) && (o.depth = 2), S(o.colors) && (o.colors = !1), S(o.customInspect) && (o.customInspect = !0), o.colors && (o.stylize = i), c(o, e, o.depth)
            }

            function i(e, t) {
                var n = r.styles[t];
                return n ? "[" + r.colors[n][0] + "m" + e + "[" + r.colors[n][1] + "m" : e
            }

            function s(e) {
                return e
            }

            function a(e) {
                var t = {};
                return e.forEach(function (e) {
                    t[e] = !0
                }), t
            }

            function c(e, t, o) {
                if (e.customInspect && t && T(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var r = t.inspect(o, e);
                    return b(r) || (r = c(e, r, o)), r
                }
                var i = u(e, t);
                if (i)return i;
                var s = Object.keys(t), m = a(s);
                if (e.showHidden && (s = Object.getOwnPropertyNames(t)), C(t) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0))return l(t);
                if (0 === s.length) {
                    if (T(t)) {
                        var g = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + g + "]", "special")
                    }
                    if (_(t))return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (E(t))return e.stylize(Date.prototype.toString.call(t), "date");
                    if (C(t))return l(t)
                }
                var y = "", v = !1, w = ["{", "}"];
                if (h(t) && (v = !0, w = ["[", "]"]), T(t)) {
                    var S = t.name ? ": " + t.name : "";
                    y = " [Function" + S + "]"
                }
                if (_(t) && (y = " " + RegExp.prototype.toString.call(t)), E(t) && (y = " " + Date.prototype.toUTCString.call(t)), C(t) && (y = " " + l(t)), 0 === s.length && (!v || 0 == t.length))return w[0] + y + w[1];
                if (0 > o)return _(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
                e.seen.push(t);
                var k;
                return k = v ? d(e, t, o, m, s) : s.map(function (n) {
                    return f(e, t, o, m, n, v)
                }), e.seen.pop(), p(k, y, w)
            }

            function u(e, t) {
                if (S(t))return e.stylize("undefined", "undefined");
                if (b(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                return v(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0
            }

            function l(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }

            function d(e, t, n, o, r) {
                for (var i = [], s = 0, a = t.length; a > s; ++s)i.push(I(t, String(s)) ? f(e, t, n, o, String(s), !0) : "");
                return r.forEach(function (r) {
                    r.match(/^\d+$/) || i.push(f(e, t, n, o, r, !0))
                }), i
            }

            function f(e, t, n, o, r, i) {
                var s, a, u;
                if (u = Object.getOwnPropertyDescriptor(t, r) || {value: t[r]}, u.get ? a = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (a = e.stylize("[Setter]", "special")), I(o, r) || (s = "[" + r + "]"), a || (e.seen.indexOf(u.value) < 0 ? (a = g(n) ? c(e, u.value, null) : c(e, u.value, n - 1), a.indexOf("\n") > -1 && (a = i ? a.split("\n").map(function (e) {
                        return "  " + e
                    }).join("\n").substr(2) : "\n" + a.split("\n").map(function (e) {
                        return "   " + e
                    }).join("\n"))) : a = e.stylize("[Circular]", "special")), S(s)) {
                    if (i && r.match(/^\d+$/))return a;
                    s = JSON.stringify("" + r), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
                }
                return s + ": " + a
            }

            function p(e, t, n) {
                var o = 0, r = e.reduce(function (e, t) {
                    return o++, t.indexOf("\n") >= 0 && o++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0);
                return r > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
            }

            function h(e) {
                return Array.isArray(e)
            }

            function m(e) {
                return "boolean" == typeof e
            }

            function g(e) {
                return null === e
            }

            function y(e) {
                return null == e
            }

            function v(e) {
                return "number" == typeof e
            }

            function b(e) {
                return "string" == typeof e
            }

            function w(e) {
                return "symbol" == typeof e
            }

            function S(e) {
                return void 0 === e
            }

            function _(e) {
                return k(e) && "[object RegExp]" === x(e)
            }

            function k(e) {
                return "object" == typeof e && null !== e
            }

            function E(e) {
                return k(e) && "[object Date]" === x(e)
            }

            function C(e) {
                return k(e) && ("[object Error]" === x(e) || e instanceof Error)
            }

            function T(e) {
                return "function" == typeof e
            }

            function O(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
            }

            function x(e) {
                return Object.prototype.toString.call(e)
            }

            function A(e) {
                return 10 > e ? "0" + e.toString(10) : e.toString(10)
            }

            function j() {
                var e = new Date, t = [A(e.getHours()), A(e.getMinutes()), A(e.getSeconds())].join(":");
                return [e.getDate(), L[e.getMonth()], t].join(" ")
            }

            function I(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }

            var D = /%[sdj%]/g;
            n.format = function (e) {
                if (!b(e)) {
                    for (var t = [], n = 0; n < arguments.length; n++)t.push(r(arguments[n]));
                    return t.join(" ")
                }
                for (var n = 1, o = arguments, i = o.length, s = String(e).replace(D, function (e) {
                    if ("%%" === e)return "%";
                    if (n >= i)return e;
                    switch (e) {
                        case"%s":
                            return String(o[n++]);
                        case"%d":
                            return Number(o[n++]);
                        case"%j":
                            try {
                                return JSON.stringify(o[n++])
                            } catch (t) {
                                return "[Circular]"
                            }
                        default:
                            return e
                    }
                }), a = o[n]; i > n; a = o[++n])s += g(a) || !k(a) ? " " + a : " " + r(a);
                return s
            }, n.deprecate = function (e, r) {
                function i() {
                    if (!s) {
                        if (t.throwDeprecation)throw new Error(r);
                        t.traceDeprecation ? console.trace(r) : console.error(r), s = !0
                    }
                    return e.apply(this, arguments)
                }

                if (S(o.process))return function () {
                    return n.deprecate(e, r).apply(this, arguments)
                };
                if (t.noDeprecation === !0)return e;
                var s = !1;
                return i
            };
            var N, M = {};
            n.debuglog = function (e) {
                if (S(N) && (N = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !M[e])if (new RegExp("\\b" + e + "\\b", "i").test(N)) {
                    var o = t.pid;
                    M[e] = function () {
                        var t = n.format.apply(n, arguments);
                        console.error("%s %d: %s", e, o, t)
                    }
                } else M[e] = function () {
                };
                return M[e]
            }, n.inspect = r, r.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, r.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, n.isArray = h, n.isBoolean = m, n.isNull = g, n.isNullOrUndefined = y, n.isNumber = v, n.isString = b, n.isSymbol = w, n.isUndefined = S, n.isRegExp = _, n.isObject = k, n.isDate = E, n.isError = C, n.isFunction = T, n.isPrimitive = O, n.isBuffer = e("./support/isBuffer");
            var L = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            n.log = function () {
                console.log("%s - %s", j(), n.format.apply(n, arguments))
            }, n.inherits = e("inherits"), n._extend = function (e, t) {
                if (!t || !k(t))return e;
                for (var n = Object.keys(t), o = n.length; o--;)e[n[o]] = t[n[o]];
                return e
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/util/util.js", "/../node_modules/gulp-browserify/node_modules/browserify/node_modules/util")
    }, {"./support/isBuffer": 7, "1YiZ5S": 6, buffer: 2, inherits: 5}],
    9: [function (e, t) {
        (function () {
            t.exports = function (e, t, n) {
                var o, r = window.URL, i = {
                    autoplay: !0,
                    mirror: !1,
                    muted: !1
                }, s = t || document.createElement("video");
                if (n)for (o in n)i[o] = n[o];
                if (i.autoplay && (s.autoplay = "autoplay"), i.muted && (s.muted = !0), i.mirror && ["", "moz", "webkit", "o", "ms"].forEach(function (e) {
                        var t = e ? e + "Transform" : "transform";
                        s.style[t] = "scaleX(-1)"
                    }), r && r.createObjectURL)s.src = r.createObjectURL(e); else if (s.srcObject)s.srcObject = e; else {
                    if (!s.mozSrcObject)return !1;
                    s.mozSrcObject = e
                }
                return s
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/attachmediastream/attachmediastream.js", "/../node_modules/simplewebrtc/node_modules/attachmediastream")
    }, {"1YiZ5S": 6, buffer: 2}],
    10: [function (e, t) {
        (function () {
            for (var e = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), n = e.length, o = function () {
            }, r = {}; n--;)r[e[n]] = o;
            t.exports = r
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/mockconsole/mockconsole.js", "/../node_modules/simplewebrtc/node_modules/mockconsole")
    }, {"1YiZ5S": 6, buffer: 2}],
    11: [function (require, module, exports) {
        (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
            var io = "undefined" == typeof module ? {} : module.exports;
            !function () {
                if (function (e, t) {
                        var n = e;
                        n.version = "0.9.16", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function (e, o) {
                            var r, i, s = n.util.parseUri(e);
                            t && t.location && (s.protocol = s.protocol || t.location.protocol.slice(0, -1), s.host = s.host || (t.document ? t.document.domain : t.location.hostname), s.port = s.port || t.location.port), r = n.util.uniqueUri(s);
                            var a = {
                                host: s.host,
                                secure: "https" == s.protocol,
                                port: s.port || ("https" == s.protocol ? 443 : 80),
                                query: s.query || ""
                            };
                            return n.util.merge(a, o), (a["force new connection"] || !n.sockets[r]) && (i = new n.Socket(a)), !a["force new connection"] && i && (n.sockets[r] = i), i = i || n.sockets[r], i.of(s.path.length > 1 ? s.path : "")
                        }
                    }("object" == typeof module ? module.exports : this.io = {}, this), function (e, t) {
                        var n = e.util = {}, o = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                        n.parseUri = function (e) {
                            for (var t = o.exec(e || ""), n = {}, i = 14; i--;)n[r[i]] = t[i] || "";
                            return n
                        }, n.uniqueUri = function (e) {
                            var n = e.protocol, o = e.host, r = e.port;
                            return "document"in t ? (o = o || document.domain, r = r || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (o = o || "localhost", r || "https" != n || (r = 443)), (n || "http") + "://" + o + ":" + (r || 80)
                        }, n.query = function (e, t) {
                            var o = n.chunkQuery(e || ""), r = [];
                            n.merge(o, n.chunkQuery(t || ""));
                            for (var i in o)o.hasOwnProperty(i) && r.push(i + "=" + o[i]);
                            return r.length ? "?" + r.join("&") : ""
                        }, n.chunkQuery = function (e) {
                            for (var t, n = {}, o = e.split("&"), r = 0, i = o.length; i > r; ++r)t = o[r].split("="), t[0] && (n[t[0]] = t[1]);
                            return n
                        };
                        var i = !1;
                        n.load = function (e) {
                            return "document"in t && "complete" === document.readyState || i ? e() : void n.on(t, "load", e, !1)
                        }, n.on = function (e, t, n, o) {
                            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, o)
                        }, n.request = function (e) {
                            if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS)return new XDomainRequest;
                            if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS))return new XMLHttpRequest;
                            if (!e)try {
                                return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                            } catch (t) {
                            }
                            return null
                        }, "undefined" != typeof window && n.load(function () {
                            i = !0
                        }), n.defer = function (e) {
                            return n.ua.webkit && "undefined" == typeof importScripts ? void n.load(function () {
                                setTimeout(e, 100)
                            }) : e()
                        }, n.merge = function (e, t, o, r) {
                            var i, s = r || [], a = "undefined" == typeof o ? 2 : o;
                            for (i in t)t.hasOwnProperty(i) && n.indexOf(s, i) < 0 && ("object" == typeof e[i] && a ? n.merge(e[i], t[i], a - 1, s) : (e[i] = t[i], s.push(t[i])));
                            return e
                        }, n.mixin = function (e, t) {
                            n.merge(e.prototype, t.prototype)
                        }, n.inherit = function (e, t) {
                            function n() {
                            }

                            n.prototype = t.prototype, e.prototype = new n
                        }, n.isArray = Array.isArray || function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }, n.intersect = function (e, t) {
                            for (var o = [], r = e.length > t.length ? e : t, i = e.length > t.length ? t : e, s = 0, a = i.length; a > s; s++)~n.indexOf(r, i[s]) && o.push(i[s]);
                            return o
                        }, n.indexOf = function (e, t, n) {
                            for (var o = e.length, n = 0 > n ? 0 > n + o ? 0 : n + o : n || 0; o > n && e[n] !== t; n++);
                            return n >= o ? -1 : n
                        }, n.toArray = function (e) {
                            for (var t = [], n = 0, o = e.length; o > n; n++)t.push(e[n]);
                            return t
                        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function () {
                            try {
                                var e = new XMLHttpRequest
                            } catch (t) {
                                return !1
                            }
                            return void 0 != e.withCredentials
                        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
                    }("undefined" != typeof io ? io : module.exports, this), function (e, t) {
                        function n() {
                        }

                        e.EventEmitter = n, n.prototype.on = function (e, n) {
                            return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this
                        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function (e, t) {
                            function n() {
                                o.removeListener(e, n), t.apply(this, arguments)
                            }

                            var o = this;
                            return n.listener = t, this.on(e, n), this
                        }, n.prototype.removeListener = function (e, n) {
                            if (this.$events && this.$events[e]) {
                                var o = this.$events[e];
                                if (t.util.isArray(o)) {
                                    for (var r = -1, i = 0, s = o.length; s > i; i++)if (o[i] === n || o[i].listener && o[i].listener === n) {
                                        r = i;
                                        break
                                    }
                                    if (0 > r)return this;
                                    o.splice(r, 1), o.length || delete this.$events[e]
                                } else(o === n || o.listener && o.listener === n) && delete this.$events[e]
                            }
                            return this
                        }, n.prototype.removeAllListeners = function (e) {
                            return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this)
                        }, n.prototype.listeners = function (e) {
                            return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
                        }, n.prototype.emit = function (e) {
                            if (!this.$events)return !1;
                            var n = this.$events[e];
                            if (!n)return !1;
                            var o = Array.prototype.slice.call(arguments, 1);
                            if ("function" == typeof n)n.apply(this, o); else {
                                if (!t.util.isArray(n))return !1;
                                for (var r = n.slice(), i = 0, s = r.length; s > i; i++)r[i].apply(this, o)
                            }
                            return !0
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (exports, nativeJSON) {
                        "use strict";
                        function f(e) {
                            return 10 > e ? "0" + e : e
                        }

                        function date(e) {
                            return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null
                        }

                        function quote(e) {
                            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                                var t = meta[e];
                                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                            }) + '"' : '"' + e + '"'
                        }

                        function str(e, t) {
                            var n, o, r, i, s, a = gap, c = t[e];
                            switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
                                case"string":
                                    return quote(c);
                                case"number":
                                    return isFinite(c) ? String(c) : "null";
                                case"boolean":
                                case"null":
                                    return String(c);
                                case"object":
                                    if (!c)return "null";
                                    if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                                        for (i = c.length, n = 0; i > n; n += 1)s[n] = str(n, c) || "null";
                                        return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, r
                                    }
                                    if (rep && "object" == typeof rep)for (i = rep.length, n = 0; i > n; n += 1)"string" == typeof rep[n] && (o = rep[n], r = str(o, c), r && s.push(quote(o) + (gap ? ": " : ":") + r)); else for (o in c)Object.prototype.hasOwnProperty.call(c, o) && (r = str(o, c), r && s.push(quote(o) + (gap ? ": " : ":") + r));
                                    return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, r
                            }
                        }

                        if (nativeJSON && nativeJSON.parse)return exports.JSON = {
                            parse: nativeJSON.parse,
                            stringify: nativeJSON.stringify
                        };
                        var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
                            "\b": "\\b",
                            "	": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        }, rep;
                        JSON.stringify = function (e, t, n) {
                            var o;
                            if (gap = "", indent = "", "number" == typeof n)for (o = 0; n > o; o += 1)indent += " "; else"string" == typeof n && (indent = n);
                            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw new Error("JSON.stringify");
                            return str("", {"": e})
                        }, JSON.parse = function (text, reviver) {
                            function walk(e, t) {
                                var n, o, r = e[t];
                                if (r && "object" == typeof r)for (n in r)Object.prototype.hasOwnProperty.call(r, n) && (o = walk(r, n), void 0 !== o ? r[n] = o : delete r[n]);
                                return reviver.call(e, t, r)
                            }

                            var j;
                            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
                            throw new SyntaxError("JSON.parse")
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function (e, t) {
                        var n = e.parser = {}, o = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"], r = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"], i = n.advice = ["reconnect"], s = t.JSON, a = t.util.indexOf;
                        n.encodePacket = function (e) {
                            var t = a(o, e.type), n = e.id || "", c = e.endpoint || "", u = e.ack, l = null;
                            switch (e.type) {
                                case"error":
                                    var d = e.reason ? a(r, e.reason) : "", f = e.advice ? a(i, e.advice) : "";
                                    ("" !== d || "" !== f) && (l = d + ("" !== f ? "+" + f : ""));
                                    break;
                                case"message":
                                    "" !== e.data && (l = e.data);
                                    break;
                                case"event":
                                    var p = {name: e.name};
                                    e.args && e.args.length && (p.args = e.args), l = s.stringify(p);
                                    break;
                                case"json":
                                    l = s.stringify(e.data);
                                    break;
                                case"connect":
                                    e.qs && (l = e.qs);
                                    break;
                                case"ack":
                                    l = e.ackId + (e.args && e.args.length ? "+" + s.stringify(e.args) : "")
                            }
                            var h = [t, n + ("data" == u ? "+" : ""), c];
                            return null !== l && void 0 !== l && h.push(l), h.join(":")
                        }, n.encodePayload = function (e) {
                            var t = "";
                            if (1 == e.length)return e[0];
                            for (var n = 0, o = e.length; o > n; n++) {
                                var r = e[n];
                                t += "�" + r.length + "�" + e[n]
                            }
                            return t
                        };
                        var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
                        n.decodePacket = function (e) {
                            var t = e.match(c);
                            if (!t)return {};
                            var n = t[2] || "", e = t[5] || "", a = {type: o[t[1]], endpoint: t[4] || ""};
                            switch (n && (a.id = n, a.ack = t[3] ? "data" : !0), a.type) {
                                case"error":
                                    var t = e.split("+");
                                    a.reason = r[t[0]] || "", a.advice = i[t[1]] || "";
                                    break;
                                case"message":
                                    a.data = e || "";
                                    break;
                                case"event":
                                    try {
                                        var u = s.parse(e);
                                        a.name = u.name, a.args = u.args
                                    } catch (l) {
                                    }
                                    a.args = a.args || [];
                                    break;
                                case"json":
                                    try {
                                        a.data = s.parse(e)
                                    } catch (l) {
                                    }
                                    break;
                                case"connect":
                                    a.qs = e || "";
                                    break;
                                case"ack":
                                    var t = e.match(/^([0-9]+)(\+)?(.*)/);
                                    if (t && (a.ackId = t[1], a.args = [], t[3]))try {
                                        a.args = t[3] ? s.parse(t[3]) : []
                                    } catch (l) {
                                    }
                                    break;
                                case"disconnect":
                                case"heartbeat":
                            }
                            return a
                        }, n.decodePayload = function (e) {
                            if ("�" == e.charAt(0)) {
                                for (var t = [], o = 1, r = ""; o < e.length; o++)"�" == e.charAt(o) ? (t.push(n.decodePacket(e.substr(o + 1).substr(0, r))), o += Number(r) + 1, r = "") : r += e.charAt(o);
                                return t
                            }
                            return [n.decodePacket(e)]
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.sessid = t
                        }

                        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function () {
                            return !0
                        }, n.prototype.onData = function (e) {
                            if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e) {
                                var n = t.parser.decodePayload(e);
                                if (n && n.length)for (var o = 0, r = n.length; r > o; o++)this.onPacket(n[o])
                            }
                            return this
                        }, n.prototype.onPacket = function (e) {
                            return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
                        }, n.prototype.setCloseTimeout = function () {
                            if (!this.closeTimeout) {
                                var e = this;
                                this.closeTimeout = setTimeout(function () {
                                    e.onDisconnect()
                                }, this.socket.closeTimeout)
                            }
                        }, n.prototype.onDisconnect = function () {
                            return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
                        }, n.prototype.onConnect = function () {
                            return this.socket.onConnect(), this
                        }, n.prototype.clearCloseTimeout = function () {
                            this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
                        }, n.prototype.clearTimeouts = function () {
                            this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
                        }, n.prototype.packet = function (e) {
                            this.send(t.parser.encodePacket(e))
                        }, n.prototype.onHeartbeat = function () {
                            this.packet({type: "heartbeat"})
                        }, n.prototype.onOpen = function () {
                            this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
                        }, n.prototype.onClose = function () {
                            this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
                        }, n.prototype.prepareUrl = function () {
                            var e = this.socket.options;
                            return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid
                        }, n.prototype.ready = function (e, t) {
                            t.call(this)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function o(e) {
                            if (this.options = {
                                    port: 80,
                                    secure: !1,
                                    document: "document"in n ? document : !1,
                                    resource: "socket.io",
                                    transports: t.transports,
                                    "connect timeout": 1e4,
                                    "try multiple transports": !0,
                                    reconnect: !0,
                                    "reconnection delay": 500,
                                    "reconnection limit": 1 / 0,
                                    "reopen delay": 3e3,
                                    "max reconnection attempts": 10,
                                    "sync disconnect on unload": !1,
                                    "auto connect": !0,
                                    "flash policy port": 10843,
                                    manualFlush: !1
                                }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                                var o = this;
                                t.util.on(n, "beforeunload", function () {
                                    o.disconnectSync()
                                }, !1)
                            }
                            this.options["auto connect"] && this.connect()
                        }

                        function r() {
                        }

                        e.Socket = o, t.util.mixin(o, t.EventEmitter), o.prototype.of = function (e) {
                            return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({type: "connect"})), this.namespaces[e]
                        }, o.prototype.publish = function () {
                            this.emit.apply(this, arguments);
                            var e;
                            for (var t in this.namespaces)this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments))
                        }, o.prototype.handshake = function (e) {
                            function n(t) {
                                t instanceof Error ? (o.connecting = !1, o.onError(t.message)) : e.apply(null, t.split(":"))
                            }

                            var o = this, i = this.options, s = ["http" + (i.secure ? "s" : "") + ":/", i.host + ":" + i.port, i.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date)].join("/");
                            if (this.isXDomain() && !t.util.ua.hasCORS) {
                                var a = document.getElementsByTagName("script")[0], c = document.createElement("script");
                                c.src = s + "&jsonp=" + t.j.length, a.parentNode.insertBefore(c, a), t.j.push(function (e) {
                                    n(e), c.parentNode.removeChild(c)
                                })
                            } else {
                                var u = t.util.request();
                                u.open("GET", s, !0), this.isXDomain() && (u.withCredentials = !0), u.onreadystatechange = function () {
                                    4 == u.readyState && (u.onreadystatechange = r, 200 == u.status ? n(u.responseText) : 403 == u.status ? o.onError(u.responseText) : (o.connecting = !1, !o.reconnecting && o.onError(u.responseText)))
                                }, u.send(null)
                            }
                        }, o.prototype.getTransport = function (e) {
                            for (var n, o = e || this.transports, r = 0; n = o[r]; r++)if (t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck(this)))return new t.Transport[n](this, this.sessionid);
                            return null
                        }, o.prototype.connect = function (e) {
                            if (this.connecting)return this;
                            var n = this;
                            return n.connecting = !0, this.handshake(function (o, r, i, s) {
                                function a(e) {
                                    return n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e), n.transport ? void n.transport.ready(n, function () {
                                        n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function () {
                                            if (!n.connected && (n.connecting = !1, n.options["try multiple transports"])) {
                                                for (var e = n.transports; e.length > 0 && e.splice(0, 1)[0] != n.transport.name;);
                                                e.length ? a(e) : n.publish("connect_failed")
                                            }
                                        }, n.options["connect timeout"]))
                                    }) : n.publish("connect_failed")
                                }

                                n.sessionid = o, n.closeTimeout = 1e3 * i, n.heartbeatTimeout = 1e3 * r, n.transports || (n.transports = n.origTransports = s ? t.util.intersect(s.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), a(n.transports), n.once("connect", function () {
                                    clearTimeout(n.connectTimeoutTimer), e && "function" == typeof e && e()
                                })
                            }), this
                        }, o.prototype.setHeartbeatTimeout = function () {
                            if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                                var e = this;
                                this.heartbeatTimeoutTimer = setTimeout(function () {
                                    e.transport.onClose()
                                }, this.heartbeatTimeout)
                            }
                        }, o.prototype.packet = function (e) {
                            return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this
                        }, o.prototype.setBuffer = function (e) {
                            this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
                        }, o.prototype.flushBuffer = function () {
                            this.transport.payload(this.buffer), this.buffer = []
                        }, o.prototype.disconnect = function () {
                            return (this.connected || this.connecting) && (this.open && this.of("").packet({type: "disconnect"}), this.onDisconnect("booted")), this
                        }, o.prototype.disconnectSync = function () {
                            var e = t.util.request(), n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
                            e.open("GET", n, !1), e.send(null), this.onDisconnect("booted")
                        }, o.prototype.isXDomain = function () {
                            var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
                            return this.options.host !== n.location.hostname || this.options.port != e
                        }, o.prototype.onConnect = function () {
                            this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
                        }, o.prototype.onOpen = function () {
                            this.open = !0
                        }, o.prototype.onClose = function () {
                            this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
                        }, o.prototype.onPacket = function (e) {
                            this.of(e.endpoint).onPacket(e)
                        }, o.prototype.onError = function (e) {
                            e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e)
                        }, o.prototype.onDisconnect = function (e) {
                            var t = this.connected, n = this.connecting;
                            this.connected = !1, this.connecting = !1, this.open = !1, (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()))
                        }, o.prototype.reconnect = function () {
                            function e() {
                                if (n.connected) {
                                    for (var e in n.namespaces)n.namespaces.hasOwnProperty(e) && "" !== e && n.namespaces[e].packet({type: "connect"});
                                    n.publish("reconnect", n.transport.name, n.reconnectionAttempts)
                                }
                                clearTimeout(n.reconnectionTimer), n.removeListener("connect_failed", t), n.removeListener("connect", t), n.reconnecting = !1, delete n.reconnectionAttempts, delete n.reconnectionDelay, delete n.reconnectionTimer, delete n.redoTransports, n.options["try multiple transports"] = r
                            }

                            function t() {
                                return n.reconnecting ? n.connected ? e() : n.connecting && n.reconnecting ? n.reconnectionTimer = setTimeout(t, 1e3) : void(n.reconnectionAttempts++ >= o ? n.redoTransports ? (n.publish("reconnect_failed"), e()) : (n.on("connect_failed", t), n.options["try multiple transports"] = !0, n.transports = n.origTransports, n.transport = n.getTransport(), n.redoTransports = !0, n.connect()) : (n.reconnectionDelay < i && (n.reconnectionDelay *= 2), n.connect(), n.publish("reconnecting", n.reconnectionDelay, n.reconnectionAttempts), n.reconnectionTimer = setTimeout(t, n.reconnectionDelay))) : void 0
                            }

                            this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
                            var n = this, o = this.options["max reconnection attempts"], r = this.options["try multiple transports"], i = this.options["reconnection limit"];
                            this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(t, this.reconnectionDelay), this.on("connect", t)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                        function n(e, t) {
                            this.socket = e, this.name = t || "", this.flags = {}, this.json = new o(this, "json"), this.ackPackets = 0, this.acks = {}
                        }

                        function o(e, t) {
                            this.namespace = e, this.name = t
                        }

                        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function () {
                            return this.socket.of.apply(this.socket, arguments)
                        }, n.prototype.packet = function (e) {
                            return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
                        }, n.prototype.send = function (e, t) {
                            var n = {type: this.flags.json ? "json" : "message", data: e};
                            return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n)
                        }, n.prototype.emit = function (e) {
                            var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], o = {
                                type: "event",
                                name: e
                            };
                            return "function" == typeof n && (o.id = ++this.ackPackets, o.ack = "data", this.acks[o.id] = n, t = t.slice(0, t.length - 1)), o.args = t, this.packet(o)
                        }, n.prototype.disconnect = function () {
                            return "" === this.name ? this.socket.disconnect() : (this.packet({type: "disconnect"}), this.$emit("disconnect")), this
                        }, n.prototype.onPacket = function (e) {
                            function n() {
                                o.packet({type: "ack", args: t.util.toArray(arguments), ackId: e.id})
                            }

                            var o = this;
                            switch (e.type) {
                                case"connect":
                                    this.$emit("connect");
                                    break;
                                case"disconnect":
                                    "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
                                    break;
                                case"message":
                                case"json":
                                    var r = ["message", e.data];
                                    "data" == e.ack ? r.push(n) : e.ack && this.packet({
                                        type: "ack",
                                        ackId: e.id
                                    }), this.$emit.apply(this, r);
                                    break;
                                case"event":
                                    var r = [e.name].concat(e.args);
                                    "data" == e.ack && r.push(n), this.$emit.apply(this, r);
                                    break;
                                case"ack":
                                    this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                                    break;
                                case"error":
                                    e.advice ? this.socket.onError(e) : "unauthorized" == e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason)
                            }
                        }, o.prototype.send = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
                        }, o.prototype.emit = function () {
                            this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
                        }
                    }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                        function o() {
                            t.Transport.apply(this, arguments)
                        }

                        e.websocket = o, t.util.inherit(o, t.Transport), o.prototype.name = "websocket", o.prototype.open = function () {
                            var e, o = t.util.query(this.socket.options.query), r = this;
                            return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + o), this.websocket.onopen = function () {
                                r.onOpen(), r.socket.setBuffer(!1)
                            }, this.websocket.onmessage = function (e) {
                                r.onData(e.data)
                            }, this.websocket.onclose = function () {
                                r.onClose(), r.socket.setBuffer(!0)
                            }, this.websocket.onerror = function (e) {
                                r.onError(e)
                            }, this
                        }, o.prototype.send = t.util.ua.iDevice ? function (e) {
                            var t = this;
                            return setTimeout(function () {
                                t.websocket.send(e)
                            }, 0), this
                        } : function (e) {
                            return this.websocket.send(e), this
                        }, o.prototype.payload = function (e) {
                            for (var t = 0, n = e.length; n > t; t++)this.packet(e[t]);
                            return this
                        }, o.prototype.close = function () {
                            return this.websocket.close(), this
                        }, o.prototype.onError = function (e) {
                            this.socket.onError(e)
                        }, o.prototype.scheme = function () {
                            return this.socket.options.secure ? "wss" : "ws"
                        }, o.check = function () {
                            return "WebSocket"in n && !("__addTask"in WebSocket) || "MozWebSocket"in n
                        }, o.xdomainCheck = function () {
                            return !0
                        }, t.transports.push("websocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                        function n() {
                            t.Transport.websocket.apply(this, arguments)
                        }

                        e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.open.apply(e, n)
                            }), this
                        }, n.prototype.send = function () {
                            var e = this, n = arguments;
                            return WebSocket.__addTask(function () {
                                t.Transport.websocket.prototype.send.apply(e, n)
                            }), this
                        }, n.prototype.close = function () {
                            return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this
                        }, n.prototype.ready = function (e, o) {
                            function r() {
                                var t = e.options, r = t["flash policy port"], s = ["http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf"];
                                n.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = s.join("/")), 843 !== r && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + r), WebSocket.__initialize(), n.loaded = !0), o.call(i)
                            }

                            var i = this;
                            return document.body ? r() : void t.util.load(r)
                        }, n.check = function () {
                            return "undefined" != typeof WebSocket && "__initialize"in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
                        }, n.xdomainCheck = function () {
                            return !0
                        }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket")
                    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window)var swfobject = function () {
                    function e() {
                        if (!Y) {
                            try {
                                var e = R.getElementsByTagName("body")[0].appendChild(g("span"));
                                e.parentNode.removeChild(e)
                            } catch (t) {
                                return
                            }
                            Y = !0;
                            for (var n = W.length, o = 0; n > o; o++)W[o]()
                        }
                    }

                    function t(e) {
                        Y ? e() : W[W.length] = e
                    }

                    function n(e) {
                        if (typeof L.addEventListener != x)L.addEventListener("load", e, !1); else if (typeof R.addEventListener != x)R.addEventListener("load", e, !1); else if (typeof L.attachEvent != x)y(L, "onload", e); else if ("function" == typeof L.onload) {
                            var t = L.onload;
                            L.onload = function () {
                                t(), e()
                            }
                        } else L.onload = e
                    }

                    function o() {
                        P ? r() : i()
                    }

                    function r() {
                        var e = R.getElementsByTagName("body")[0], t = g(A);
                        t.setAttribute("type", D);
                        var n = e.appendChild(t);
                        if (n) {
                            var o = 0;
                            !function () {
                                if (typeof n.GetVariable != x) {
                                    var r = n.GetVariable("$version");
                                    r && (r = r.split(" ")[1].split(","), q.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)])
                                } else if (10 > o)return o++, void setTimeout(arguments.callee, 10);
                                e.removeChild(t), n = null, i()
                            }()
                        } else i()
                    }

                    function i() {
                        var e = F.length;
                        if (e > 0)for (var t = 0; e > t; t++) {
                            var n = F[t].id, o = F[t].callbackFn, r = {success: !1, id: n};
                            if (q.pv[0] > 0) {
                                var i = m(n);
                                if (i)if (!v(F[t].swfVersion) || q.wk && q.wk < 312)if (F[t].expressInstall && a()) {
                                    var l = {};
                                    l.data = F[t].expressInstall, l.width = i.getAttribute("width") || "0", l.height = i.getAttribute("height") || "0", i.getAttribute("class") && (l.styleclass = i.getAttribute("class")), i.getAttribute("align") && (l.align = i.getAttribute("align"));
                                    for (var d = {}, f = i.getElementsByTagName("param"), p = f.length, h = 0; p > h; h++)"movie" != f[h].getAttribute("name").toLowerCase() && (d[f[h].getAttribute("name")] = f[h].getAttribute("value"));
                                    c(l, d, n, o)
                                } else u(i), o && o(r); else w(n, !0), o && (r.success = !0, r.ref = s(n), o(r))
                            } else if (w(n, !0), o) {
                                var g = s(n);
                                g && typeof g.SetVariable != x && (r.success = !0, r.ref = g), o(r)
                            }
                        }
                    }

                    function s(e) {
                        var t = null, n = m(e);
                        if (n && "OBJECT" == n.nodeName)if (typeof n.SetVariable != x)t = n; else {
                            var o = n.getElementsByTagName(A)[0];
                            o && (t = o)
                        }
                        return t
                    }

                    function a() {
                        return !V && v("6.0.65") && (q.win || q.mac) && !(q.wk && q.wk < 312)
                    }

                    function c(e, t, n, o) {
                        V = !0, E = o || null, C = {success: !1, id: n};
                        var r = m(n);
                        if (r) {
                            "OBJECT" == r.nodeName ? (_ = l(r), k = null) : (_ = r, k = n), e.id = N, (typeof e.width == x || !/%$/.test(e.width) && parseInt(e.width, 10) < 310) && (e.width = "310"), (typeof e.height == x || !/%$/.test(e.height) && parseInt(e.height, 10) < 137) && (e.height = "137"), R.title = R.title.slice(0, 47) + " - Flash Player Installation";
                            var i = q.ie && q.win ? ["Active"].concat("").join("X") : "PlugIn", s = "MMredirectURL=" + L.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + i + "&MMdoctitle=" + R.title;
                            if (typeof t.flashvars != x ? t.flashvars += "&" + s : t.flashvars = s, q.ie && q.win && 4 != r.readyState) {
                                var a = g("div");
                                n += "SWFObjectNew", a.setAttribute("id", n), r.parentNode.insertBefore(a, r), r.style.display = "none", function () {
                                    4 == r.readyState ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
                                }()
                            }
                            d(e, t, n)
                        }
                    }

                    function u(e) {
                        if (q.ie && q.win && 4 != e.readyState) {
                            var t = g("div");
                            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(l(e), t), e.style.display = "none", function () {
                                4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                            }()
                        } else e.parentNode.replaceChild(l(e), e)
                    }

                    function l(e) {
                        var t = g("div");
                        if (q.win && q.ie)t.innerHTML = e.innerHTML; else {
                            var n = e.getElementsByTagName(A)[0];
                            if (n) {
                                var o = n.childNodes;
                                if (o)for (var r = o.length, i = 0; r > i; i++)1 == o[i].nodeType && "PARAM" == o[i].nodeName || 8 == o[i].nodeType || t.appendChild(o[i].cloneNode(!0))
                            }
                        }
                        return t
                    }

                    function d(e, t, n) {
                        var o, r = m(n);
                        if (q.wk && q.wk < 312)return o;
                        if (r)if (typeof e.id == x && (e.id = n), q.ie && q.win) {
                            var i = "";
                            for (var s in e)e[s] != Object.prototype[s] && ("data" == s.toLowerCase() ? t.movie = e[s] : "styleclass" == s.toLowerCase() ? i += ' class="' + e[s] + '"' : "classid" != s.toLowerCase() && (i += " " + s + '="' + e[s] + '"'));
                            var a = "";
                            for (var c in t)t[c] != Object.prototype[c] && (a += '<param name="' + c + '" value="' + t[c] + '" />');
                            r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + a + "</object>", U[U.length] = e.id, o = m(e.id)
                        } else {
                            var u = g(A);
                            u.setAttribute("type", D);
                            for (var l in e)e[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? u.setAttribute("class", e[l]) : "classid" != l.toLowerCase() && u.setAttribute(l, e[l]));
                            for (var d in t)t[d] != Object.prototype[d] && "movie" != d.toLowerCase() && f(u, d, t[d]);
                            r.parentNode.replaceChild(u, r), o = u
                        }
                        return o
                    }

                    function f(e, t, n) {
                        var o = g("param");
                        o.setAttribute("name", t), o.setAttribute("value", n), e.appendChild(o)
                    }

                    function p(e) {
                        var t = m(e);
                        t && "OBJECT" == t.nodeName && (q.ie && q.win ? (t.style.display = "none", function () {
                            4 == t.readyState ? h(e) : setTimeout(arguments.callee, 10)
                        }()) : t.parentNode.removeChild(t))
                    }

                    function h(e) {
                        var t = m(e);
                        if (t) {
                            for (var n in t)"function" == typeof t[n] && (t[n] = null);
                            t.parentNode.removeChild(t)
                        }
                    }

                    function m(e) {
                        var t = null;
                        try {
                            t = R.getElementById(e)
                        } catch (n) {
                        }
                        return t
                    }

                    function g(e) {
                        return R.createElement(e)
                    }

                    function y(e, t, n) {
                        e.attachEvent(t, n), J[J.length] = [e, t, n]
                    }

                    function v(e) {
                        var t = q.pv, n = e.split(".");
                        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1
                    }

                    function b(e, t, n, o) {
                        if (!q.ie || !q.mac) {
                            var r = R.getElementsByTagName("head")[0];
                            if (r) {
                                var i = n && "string" == typeof n ? n : "screen";
                                if (o && (T = null, O = null), !T || O != i) {
                                    var s = g("style");
                                    s.setAttribute("type", "text/css"), s.setAttribute("media", i), T = r.appendChild(s), q.ie && q.win && typeof R.styleSheets != x && R.styleSheets.length > 0 && (T = R.styleSheets[R.styleSheets.length - 1]), O = i
                                }
                                q.ie && q.win ? T && typeof T.addRule == A && T.addRule(e, t) : T && typeof R.createTextNode != x && T.appendChild(R.createTextNode(e + " {" + t + "}"))
                            }
                        }
                    }

                    function w(e, t) {
                        if (Z) {
                            var n = t ? "visible" : "hidden";
                            Y && m(e) ? m(e).style.visibility = n : b("#" + e, "visibility:" + n)
                        }
                    }

                    function S(e) {
                        var t = /[\\\"<>\.;]/, n = null != t.exec(e);
                        return n && typeof encodeURIComponent != x ? encodeURIComponent(e) : e
                    }

                    {
                        var _, k, E, C, T, O, x = "undefined", A = "object", j = "Shockwave Flash", I = "ShockwaveFlash.ShockwaveFlash", D = "application/x-shockwave-flash", N = "SWFObjectExprInst", M = "onreadystatechange", L = window, R = document, B = navigator, P = !1, W = [o], F = [], U = [], J = [], Y = !1, V = !1, Z = !0, q = function () {
                            var e = typeof R.getElementById != x && typeof R.getElementsByTagName != x && typeof R.createElement != x, t = B.userAgent.toLowerCase(), n = B.platform.toLowerCase(), o = /win/.test(n ? n : t), r = /mac/.test(n ? n : t), i = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, s = !1, a = [0, 0, 0], c = null;
                            if (typeof B.plugins != x && typeof B.plugins[j] == A)c = B.plugins[j].description, !c || typeof B.mimeTypes != x && B.mimeTypes[D] && !B.mimeTypes[D].enabledPlugin || (P = !0, s = !1, c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof L[["Active"].concat("Object").join("X")] != x)try {
                                var u = new (window[["Active"].concat("Object").join("X")])(I);
                                u && (c = u.GetVariable("$version"), c && (s = !0, c = c.split(" ")[1].split(","), a = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)]))
                            } catch (l) {
                            }
                            return {w3: e, pv: a, wk: i, ie: s, win: o, mac: r}
                        }();
                        !function () {
                            q.w3 && ((typeof R.readyState != x && "complete" == R.readyState || typeof R.readyState == x && (R.getElementsByTagName("body")[0] || R.body)) && e(), Y || (typeof R.addEventListener != x && R.addEventListener("DOMContentLoaded", e, !1), q.ie && q.win && (R.attachEvent(M, function () {
                                "complete" == R.readyState && (R.detachEvent(M, arguments.callee), e())
                            }), L == top && !function () {
                                if (!Y) {
                                    try {
                                        R.documentElement.doScroll("left")
                                    } catch (t) {
                                        return void setTimeout(arguments.callee, 0)
                                    }
                                    e()
                                }
                            }()), q.wk && !function () {
                                return Y ? void 0 : /loaded|complete/.test(R.readyState) ? void e() : void setTimeout(arguments.callee, 0)
                            }(), n(e)))
                        }(), function () {
                            q.ie && q.win && window.attachEvent("onunload", function () {
                                for (var e = J.length, t = 0; e > t; t++)J[t][0].detachEvent(J[t][1], J[t][2]);
                                for (var n = U.length, o = 0; n > o; o++)p(U[o]);
                                for (var r in q)q[r] = null;
                                q = null;
                                for (var i in swfobject)swfobject[i] = null;
                                swfobject = null
                            })
                        }()
                    }
                    return {
                        registerObject: function (e, t, n, o) {
                            if (q.w3 && e && t) {
                                var r = {};
                                r.id = e, r.swfVersion = t, r.expressInstall = n, r.callbackFn = o, F[F.length] = r, w(e, !1)
                            } else o && o({success: !1, id: e})
                        }, getObjectById: function (e) {
                            return q.w3 ? s(e) : void 0
                        }, embedSWF: function (e, n, o, r, i, s, u, l, f, p) {
                            var h = {success: !1, id: n};
                            q.w3 && !(q.wk && q.wk < 312) && e && n && o && r && i ? (w(n, !1), t(function () {
                                o += "", r += "";
                                var t = {};
                                if (f && typeof f === A)for (var m in f)t[m] = f[m];
                                t.data = e, t.width = o, t.height = r;
                                var g = {};
                                if (l && typeof l === A)for (var y in l)g[y] = l[y];
                                if (u && typeof u === A)for (var b in u)typeof g.flashvars != x ? g.flashvars += "&" + b + "=" + u[b] : g.flashvars = b + "=" + u[b];
                                if (v(i)) {
                                    var S = d(t, g, n);
                                    t.id == n && w(n, !0), h.success = !0, h.ref = S
                                } else {
                                    if (s && a())return t.data = s, void c(t, g, n, p);
                                    w(n, !0)
                                }
                                p && p(h)
                            })) : p && p(h)
                        }, switchOffAutoHideShow: function () {
                            Z = !1
                        }, ua: q, getFlashPlayerVersion: function () {
                            return {major: q.pv[0], minor: q.pv[1], release: q.pv[2]}
                        }, hasFlashPlayerVersion: v, createSWF: function (e, t, n) {
                            return q.w3 ? d(e, t, n) : void 0
                        }, showExpressInstall: function (e, t, n, o) {
                            q.w3 && a() && c(e, t, n, o)
                        }, removeSWF: function (e) {
                            q.w3 && p(e)
                        }, createCSS: function (e, t, n, o) {
                            q.w3 && b(e, t, n, o)
                        }, addDomLoadEvent: t, addLoadEvent: n, getQueryParamValue: function (e) {
                            var t = R.location.search || R.location.hash;
                            if (t) {
                                if (/\?/.test(t) && (t = t.split("?")[1]), null == e)return S(t);
                                for (var n = t.split("&"), o = 0; o < n.length; o++)if (n[o].substring(0, n[o].indexOf("=")) == e)return S(n[o].substring(n[o].indexOf("=") + 1))
                            }
                            return ""
                        }, expressInstallCallback: function () {
                            if (V) {
                                var e = m(N);
                                e && _ && (e.parentNode.replaceChild(_, e), k && (w(k, !0), q.ie && q.win && (_.style.display = "block")), E && E(C)), V = !1
                            }
                        }
                    }
                }();
                !function () {
                    if ("undefined" != typeof window && !window.WebSocket) {
                        var e = window.console;
                        if (e && e.log && e.error || (e = {
                                log: function () {
                                }, error: function () {
                                }
                            }), !swfobject.hasFlashPlayerVersion("10.0.0"))return void e.error("Flash Player >= 10.0.0 is required.");
                        "file:" == location.protocol && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function (e, t, n, o, r) {
                            var i = this;
                            i.__id = WebSocket.__nextId++, WebSocket.__instances[i.__id] = i, i.readyState = WebSocket.CONNECTING, i.bufferedAmount = 0, i.__events = {}, t ? "string" == typeof t && (t = [t]) : t = [], setTimeout(function () {
                                WebSocket.__addTask(function () {
                                    WebSocket.__flash.create(i.__id, e, t, n || null, o || 0, r || null)
                                })
                            }, 0)
                        }, WebSocket.prototype.send = function (e) {
                            if (this.readyState == WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";
                            var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
                            return 0 > t ? !0 : (this.bufferedAmount += t, !1)
                        }, WebSocket.prototype.close = function () {
                            this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
                        }, WebSocket.prototype.addEventListener = function (e, t) {
                            e in this.__events || (this.__events[e] = []), this.__events[e].push(t)
                        }, WebSocket.prototype.removeEventListener = function (e, t) {
                            if (e in this.__events)for (var n = this.__events[e], o = n.length - 1; o >= 0; --o)if (n[o] === t) {
                                n.splice(o, 1);
                                break
                            }
                        }, WebSocket.prototype.dispatchEvent = function (e) {
                            for (var t = this.__events[e.type] || [], n = 0; n < t.length; ++n)t[n](e);
                            var o = this["on" + e.type];
                            o && o(e)
                        }, WebSocket.prototype.__handleEvent = function (e) {
                            "readyState"in e && (this.readyState = e.readyState), "protocol"in e && (this.protocol = e.protocol);
                            var t;
                            if ("open" == e.type || "error" == e.type)t = this.__createSimpleEvent(e.type); else if ("close" == e.type)t = this.__createSimpleEvent("close"); else {
                                if ("message" != e.type)throw"unknown event type: " + e.type;
                                var n = decodeURIComponent(e.message);
                                t = this.__createMessageEvent("message", n)
                            }
                            this.dispatchEvent(t)
                        }, WebSocket.prototype.__createSimpleEvent = function (e) {
                            if (document.createEvent && window.Event) {
                                var t = document.createEvent("Event");
                                return t.initEvent(e, !1, !1), t
                            }
                            return {type: e, bubbles: !1, cancelable: !1}
                        }, WebSocket.prototype.__createMessageEvent = function (e, t) {
                            if (document.createEvent && window.MessageEvent && !window.opera) {
                                var n = document.createEvent("MessageEvent");
                                return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n
                            }
                            return {type: e, data: t, bubbles: !1, cancelable: !1}
                        }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (e) {
                            WebSocket.__addTask(function () {
                                WebSocket.__flash.loadManualPolicyFile(e)
                            })
                        }, WebSocket.__initialize = function () {
                            if (!WebSocket.__flash) {
                                if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION)return void e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                                var t = document.createElement("div");
                                t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
                                var n = document.createElement("div");
                                n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                                    hasPriority: !0,
                                    swliveconnect: !0,
                                    allowScriptAccess: "always"
                                }, null, function (t) {
                                    t.success || e.error("[WebSocket] swfobject.embedSWF failed")
                                })
                            }
                        }, WebSocket.__onFlashInitialized = function () {
                            setTimeout(function () {
                                WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                                for (var e = 0; e < WebSocket.__tasks.length; ++e)WebSocket.__tasks[e]();
                                WebSocket.__tasks = []
                            }, 0)
                        }, WebSocket.__onFlashEvent = function () {
                            return setTimeout(function () {
                                try {
                                    for (var t = WebSocket.__flash.receiveEvents(), n = 0; n < t.length; ++n)WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n])
                                } catch (o) {
                                    e.error(o)
                                }
                            }, 0), !0
                        }, WebSocket.__log = function (t) {
                            e.log(decodeURIComponent(t))
                        }, WebSocket.__error = function (t) {
                            e.error(decodeURIComponent(t))
                        }, WebSocket.__addTask = function (e) {
                            WebSocket.__flash ? e() : WebSocket.__tasks.push(e)
                        }, WebSocket.__isFlashLite = function () {
                            if (!window.navigator || !window.navigator.mimeTypes)return !1;
                            var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
                            return e && e.enabledPlugin && e.enabledPlugin.filename && e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
                        }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
                            WebSocket.__initialize()
                        }, !1) : window.attachEvent("onload", function () {
                            WebSocket.__initialize()
                        }))
                    }
                }(), function (e, t, n) {
                    function o(e) {
                        e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
                    }

                    function r() {
                    }

                    e.XHR = o, t.util.inherit(o, t.Transport), o.prototype.open = function () {
                        return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
                    }, o.prototype.payload = function (e) {
                        for (var n = [], o = 0, r = e.length; r > o; o++)n.push(t.parser.encodePacket(e[o]));
                        this.send(t.parser.encodePayload(n))
                    }, o.prototype.send = function (e) {
                        return this.post(e), this
                    }, o.prototype.post = function (e) {
                        function t() {
                            4 == this.readyState && (this.onreadystatechange = r, i.posting = !1, 200 == this.status ? i.socket.setBuffer(!1) : i.onClose())
                        }

                        function o() {
                            this.onload = r, i.socket.setBuffer(!1)
                        }

                        var i = this;
                        this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = o : this.sendXHR.onreadystatechange = t, this.sendXHR.send(e)
                    }, o.prototype.close = function () {
                        return this.onClose(), this
                    }, o.prototype.request = function (e) {
                        var n = t.util.request(this.socket.isXDomain()), o = t.util.query(this.socket.options.query, "t=" + +new Date);
                        if (n.open(e || "GET", this.prepareUrl() + o, !0), "POST" == e)try {
                            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain"
                        } catch (r) {
                        }
                        return n
                    }, o.prototype.scheme = function () {
                        return this.socket.options.secure ? "https" : "http"
                    }, o.check = function (e, o) {
                        try {
                            var r = t.util.request(o), i = n.XDomainRequest && r instanceof XDomainRequest, s = e && e.options && e.options.secure ? "https:" : "http:", a = n.location && s != n.location.protocol;
                            if (r && (!i || !a))return !0
                        } catch (c) {
                        }
                        return !1
                    }, o.xdomainCheck = function (e) {
                        return o.check(e, !0)
                    }
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t) {
                    function n() {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function () {
                        this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
                        var e = this.doc.createElement("div");
                        e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
                        var n = this, o = t.util.query(this.socket.options.query, "t=" + +new Date);
                        this.iframe.src = this.prepareUrl() + o, t.util.on(window, "unload", function () {
                            n.destroy()
                        })
                    }, n.prototype._ = function (e, t) {
                        e = e.replace(/\\\//g, "/"), this.onData(e);
                        try {
                            var n = t.getElementsByTagName("script")[0];
                            n.parentNode.removeChild(n)
                        } catch (o) {
                        }
                    }, n.prototype.destroy = function () {
                        if (this.iframe) {
                            try {
                                this.iframe.src = "about:blank"
                            } catch (e) {
                            }
                            this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
                        }
                    }, n.prototype.close = function () {
                        return this.destroy(), t.Transport.XHR.prototype.close.call(this)
                    }, n.check = function (e) {
                        if ("undefined" != typeof window && ["Active"].concat("Object").join("X")in window)try {
                            var n = new (window[["Active"].concat("Object").join("X")])("htmlfile");
                            return n && t.Transport.XHR.check(e)
                        } catch (o) {
                        }
                        return !1
                    }, n.xdomainCheck = function () {
                        return !1
                    }, t.transports.push("htmlfile")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function (e, t, n) {
                    function o() {
                        t.Transport.XHR.apply(this, arguments)
                    }

                    function r() {
                    }

                    e["xhr-polling"] = o, t.util.inherit(o, t.Transport.XHR), t.util.merge(o, t.Transport.XHR), o.prototype.name = "xhr-polling", o.prototype.heartbeats = function () {
                        return !1
                    }, o.prototype.open = function () {
                        var e = this;
                        return t.Transport.XHR.prototype.open.call(e), !1
                    }, o.prototype.get = function () {
                        function e() {
                            4 == this.readyState && (this.onreadystatechange = r, 200 == this.status ? (i.onData(this.responseText), i.get()) : i.onClose())
                        }

                        function t() {
                            this.onload = r, this.onerror = r, i.retryCounter = 1, i.onData(this.responseText), i.get()
                        }

                        function o() {
                            i.retryCounter++, !i.retryCounter || i.retryCounter > 3 ? i.onClose() : i.get()
                        }

                        if (this.isOpen) {
                            var i = this;
                            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = t, this.xhr.onerror = o) : this.xhr.onreadystatechange = e, this.xhr.send(null)
                        }
                    }, o.prototype.onClose = function () {
                        if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = r;
                            try {
                                this.xhr.abort()
                            } catch (e) {
                            }
                            this.xhr = null
                        }
                    }, o.prototype.ready = function (e, n) {
                        var o = this;
                        t.util.defer(function () {
                            n.call(o)
                        })
                    }, t.transports.push("xhr-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function (e, t, n) {
                    function o() {
                        t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
                        var e = this;
                        t.j.push(function (t) {
                            e._(t)
                        })
                    }

                    var r = n.document && "MozAppearance"in n.document.documentElement.style;
                    e["jsonp-polling"] = o, t.util.inherit(o, t.Transport["xhr-polling"]), o.prototype.name = "jsonp-polling", o.prototype.post = function (e) {
                        function n() {
                            o(), r.socket.setBuffer(!1)
                        }

                        function o() {
                            r.iframe && r.form.removeChild(r.iframe);
                            try {
                                s = document.createElement('<iframe name="' + r.iframeId + '">')
                            } catch (e) {
                                s = document.createElement("iframe"), s.name = r.iframeId
                            }
                            s.id = r.iframeId, r.form.appendChild(s), r.iframe = s
                        }

                        var r = this, i = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        if (!this.form) {
                            var s, a = document.createElement("form"), c = document.createElement("textarea"), u = this.iframeId = "socketio_iframe_" + this.index;
                            a.className = "socketio", a.style.position = "absolute", a.style.top = "0px", a.style.left = "0px", a.style.display = "none", a.target = u, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), c.name = "d", a.appendChild(c), document.body.appendChild(a), this.form = a, this.area = c
                        }
                        this.form.action = this.prepareUrl() + i, o(), this.area.value = t.JSON.stringify(e);
                        try {
                            this.form.submit()
                        } catch (l) {
                        }
                        this.iframe.attachEvent ? s.onreadystatechange = function () {
                            "complete" == r.iframe.readyState && n()
                        } : this.iframe.onload = n, this.socket.setBuffer(!0)
                    }, o.prototype.get = function () {
                        var e = this, n = document.createElement("script"), o = t.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + o, n.onerror = function () {
                            e.onClose()
                        };
                        var i = document.getElementsByTagName("script")[0];
                        i.parentNode.insertBefore(n, i), this.script = n, r && setTimeout(function () {
                            var e = document.createElement("iframe");
                            document.body.appendChild(e), document.body.removeChild(e)
                        }, 100)
                    }, o.prototype._ = function (e) {
                        return this.onData(e), this.isOpen && this.get(), this
                    }, o.prototype.ready = function (e, n) {
                        var o = this;
                        return r ? void t.util.load(function () {
                            n.call(o)
                        }) : n.call(this)
                    }, o.check = function () {
                        return "document"in n
                    }, o.xdomainCheck = function () {
                        return !0
                    }, t.transports.push("jsonp-polling")
                }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), "function" == typeof define && define.amd && define([], function () {
                    return io
                })
            }()
        }).call(this, require("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/socket.io-client/dist/socket.io.js", "/../node_modules/simplewebrtc/node_modules/socket.io-client/dist")
    }, {"1YiZ5S": 6, buffer: 2}],
    12: [function (e, t) {
        (function () {
            function n(e) {
                c.call(this);
                var t, n = this.config = {
                    autoAdjustMic: !1,
                    detectSpeakingEvents: !0,
                    media: {audio: !0, video: !0},
                    logger: l
                };
                for (t in e)this.config[t] = e[t];
                this.logger = n.logger, this._log = this.logger.log.bind(this.logger, "LocalMedia:"), this._logerror = this.logger.error.bind(this.logger, "LocalMedia:"), this.screenSharingSupport = i.screenSharing, this.localStreams = [], this.localScreens = [], i.support || this._logerror("Your browser does not support local media capture.")
            }

            var o = e("util"), r = e("hark"), i = e("webrtcsupport"), s = e("getusermedia"), a = e("getscreenmedia"), c = e("wildemitter"), u = e("mediastream-gain"), l = e("mockconsole");
            o.inherits(n, c), n.prototype.start = function (e, t) {
                var n = this, o = e || this.config.media;
                s(o, function (e, r) {
                    return e || (o.audio && n.config.detectSpeakingEvents && n.setupAudioMonitor(r, n.config.harkOptions), n.localStreams.push(r), n.config.autoAdjustMic && (n.gainController = new u(r), n.setMicIfEnabled(.5)), r.onended = function () {
                    }, n.emit("localStream", r)), t ? t(e, r) : void 0
                })
            }, n.prototype.stop = function (e) {
                var t = this;
                if (e) {
                    e.stop(), t.emit("localStreamStopped", e);
                    var n = t.localStreams.indexOf(e);
                    n > -1 && (t.localStreams = t.localStreams.splice(n, 1))
                } else this.audioMonitor && (this.audioMonitor.stop(), delete this.audioMonitor), this.localStreams.forEach(function (e) {
                    e.stop(), t.emit("localStreamStopped", e)
                }), this.localStreams = []
            }, n.prototype.startScreenShare = function (e) {
                var t = this;
                a(function (n, o) {
                    return n || (t.localScreens.push(o), o.onended = function () {
                        var e = t.localScreens.indexOf(o);
                        e > -1 && t.localScreens.splice(e, 1), t.emit("localScreenStopped", o)
                    }, t.emit("localScreen", o)), e ? e(n, o) : void 0
                })
            }, n.prototype.stopScreenShare = function (e) {
                e ? e.stop() : (this.localScreens.forEach(function (e) {
                    e.stop()
                }), this.localScreens = [])
            }, n.prototype.mute = function () {
                this._audioEnabled(!1), this.hardMuted = !0, this.emit("audioOff")
            }, n.prototype.unmute = function () {
                this._audioEnabled(!0), this.hardMuted = !1, this.emit("audioOn")
            }, n.prototype.setupAudioMonitor = function (e, t) {
                this._log("Setup audio");
                var n, o = this.audioMonitor = r(e, t), i = this;
                o.on("speaking", function () {
                    i.emit("speaking"), i.hardMuted || i.setMicIfEnabled(1)
                }), o.on("stopped_speaking", function () {
                    n && clearTimeout(n), n = setTimeout(function () {
                        i.emit("stoppedSpeaking"), i.hardMuted || i.setMicIfEnabled(.5)
                    }, 1e3)
                }), o.on("volume_change", function (e, t) {
                    i.emit("volumeChange", e, t)
                })
            }, n.prototype.setMicIfEnabled = function (e) {
                this.config.autoAdjustMic && this.gainController.setGain(e)
            }, n.prototype.pauseVideo = function () {
                this._videoEnabled(!1), this.emit("videoOff")
            }, n.prototype.resumeVideo = function () {
                this._videoEnabled(!0), this.emit("videoOn")
            }, n.prototype.pause = function () {
                this.mute(), this.pauseVideo()
            }, n.prototype.resume = function () {
                this.unmute(), this.resumeVideo()
            }, n.prototype._audioEnabled = function (e) {
                this.setMicIfEnabled(e ? 1 : 0), this.localStreams.forEach(function (t) {
                    t.getAudioTracks().forEach(function (t) {
                        t.enabled = !!e
                    })
                })
            }, n.prototype._videoEnabled = function (e) {
                this.localStreams.forEach(function (t) {
                    t.getVideoTracks().forEach(function (t) {
                        t.enabled = !!e
                    })
                })
            }, n.prototype.isAudioEnabled = function () {
                var e = !0;
                return this.localStreams.forEach(function (t) {
                    t.getAudioTracks().forEach(function (t) {
                        e = e && t.enabled
                    })
                }), e
            }, n.prototype.isVideoEnabled = function () {
                var e = !0;
                return this.localStreams.forEach(function (t) {
                    t.getVideoTracks().forEach(function (t) {
                        e = e && t.enabled
                    })
                }), e
            }, n.prototype.startLocalMedia = n.prototype.start, n.prototype.stopLocalMedia = n.prototype.stop, Object.defineProperty(n.prototype, "localStream", {
                get: function () {
                    return this.localStreams.length > 0 ? this.localStreams[0] : null
                }
            }), Object.defineProperty(n.prototype, "localScreen", {
                get: function () {
                    return this.localScreens.length > 0 ? this.localScreens[0] : null
                }
            }), t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/index.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia")
    }, {
        "1YiZ5S": 6,
        buffer: 2,
        getscreenmedia: 13,
        getusermedia: 14,
        hark: 15,
        "mediastream-gain": 16,
        mockconsole: 10,
        util: 8,
        webrtcsupport: 28,
        wildemitter: 29
    }],
    13: [function (e, t) {
        (function () {
            var n = e("getusermedia"), o = {};
            t.exports = function (e, t) {
                var r, i = 2 === arguments.length, s = i ? t : e;
                if ("undefined" == typeof window || "http:" === window.location.protocol)return r = new Error("NavigatorUserMediaError"), r.name = "HTTPS_REQUIRED", s(r);
                if (window.navigator.userAgent.match("Chrome")) {
                    var a = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10), c = 33;
                    if (window.navigator.userAgent.match("Linux") && (c = 35), a >= 26 && c >= a)e = i && e || {
                        video: {
                            mandatory: {
                                googLeakyBucket: !0,
                                maxWidth: window.screen.width,
                                maxHeight: window.screen.height,
                                maxFrameRate: 3,
                                chromeMediaSource: "screen"
                            }
                        }
                    }, n(e, s); else {
                        var u = window.setTimeout(function () {
                            return r = new Error("NavigatorUserMediaError"), r.name = "EXTENSION_UNAVAILABLE", s(r)
                        }, 1e3);
                        o[u] = [s, i ? constraint : null], window.postMessage({type: "getScreen", id: u}, "*")
                    }
                } else if (window.navigator.userAgent.match("Firefox")) {
                    var l = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                    l >= 33 ? (e = i && e || {
                        video: {
                            mozMediaSource: "window",
                            mediaSource: "window"
                        }
                    }, n(e, function (e, t) {
                        if (s(e, t), !e)var n = t.currentTime, o = window.setInterval(function () {
                            t || window.clearInterval(o), t.currentTime == n && (window.clearInterval(o), t.onended && t.onended()), n = t.currentTime
                        }, 500)
                    })) : (r = new Error("NavigatorUserMediaError"), r.name = "EXTENSION_UNAVAILABLE")
                }
            }, window.addEventListener("message", function (e) {
                if (e.origin == window.location.origin)if ("gotScreen" == e.data.type && o[e.data.id]) {
                    var t = o[e.data.id], r = t[1], i = t[0];
                    if (delete o[e.data.id], "" === e.data.sourceId) {
                        var s = new Error("NavigatorUserMediaError");
                        s.name = "PERMISSION_DENIED", i(s)
                    } else r = r || {
                        audio: !1,
                        video: {
                            mandatory: {
                                chromeMediaSource: "desktop",
                                maxWidth: window.screen.width,
                                maxHeight: window.screen.height,
                                maxFrameRate: 3
                            }, optional: [{googLeakyBucket: !0}, {googTemporalLayeredScreencast: !0}]
                        }
                    }, r.video.mandatory.chromeMediaSourceId = e.data.sourceId, n(r, i)
                } else"getScreenPending" == e.data.type && window.clearTimeout(e.data.id)
            })
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getscreenmedia/getscreenmedia.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getscreenmedia")
    }, {"1YiZ5S": 6, buffer: 2, getusermedia: 14}],
    14: [function (e, t) {
        (function () {
            var e = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia;
            t.exports = function (t, n) {
                var o, r = 2 === arguments.length, i = {
                    video: !0,
                    audio: !0
                }, s = "PermissionDeniedError", a = "ConstraintNotSatisfiedError";
                if (r || (n = t, t = i), !e)return o = new Error("MediaStreamError"), o.name = "NotSupportedError", window.setTimeout(function () {
                    n(o)
                }, 0);
                var c = window.location.protocol;
                return "http:" !== c && "https:" !== c ? (o = new Error("MediaStreamError"), o.name = "NotSupportedError", window.setTimeout(function () {
                    n(o)
                }, 0)) : t.audio || t.video ? (localStorage && "true" === localStorage.useFirefoxFakeDevice && (t.fake = !0), void e.call(window.navigator, t, function (e) {
                    n(null, e)
                }, function (e) {
                    var t;
                    "string" == typeof e ? (t = new Error("MediaStreamError"), t.name = e === s ? s : a) : (t = e, t.name || (e.name = t[s] ? s : a)), n(t)
                })) : (o = new Error("MediaStreamError"), o.name = "NoMediaRequestedError", window.setTimeout(function () {
                    n(o)
                }, 0))
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getusermedia/index-browser.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getusermedia")
    }, {"1YiZ5S": 6, buffer: 2}],
    15: [function (e, t) {
        (function () {
            function n(e, t) {
                var n = -1 / 0;
                e.getFloatFrequencyData(t);
                for (var o = 4, r = t.length; r > o; o++)t[o] > n && t[o] < 0 && (n = t[o]);
                return n
            }

            var o = e("wildemitter"), r = window.webkitAudioContext || window.AudioContext, i = null;
            t.exports = function (e, t) {
                var s = new o;
                if (!r)return s;
                var t = t || {}, a = t.smoothing || .1, c = t.interval || 50, u = t.threshold, l = t.play, d = t.history || 10, f = !0;
                i || (i = new r);
                var p, h, m;
                m = i.createAnalyser(), m.fftSize = 512, m.smoothingTimeConstant = a, h = new Float32Array(m.fftSize), e.jquery && (e = e[0]), e instanceof HTMLAudioElement || e instanceof HTMLVideoElement ? (p = i.createMediaElementSource(e), "undefined" == typeof l && (l = !0), u = u || -50) : (p = i.createMediaStreamSource(e), u = u || -50), p.connect(m), l && m.connect(i.destination), s.speaking = !1, s.setThreshold = function (e) {
                    u = e
                }, s.setInterval = function (e) {
                    c = e
                }, s.stop = function () {
                    f = !1, s.emit("volume_change", -100, u), s.speaking && (s.speaking = !1, s.emit("stopped_speaking"))
                }, s.speakingHistory = [];
                for (var g = 0; d > g; g++)s.speakingHistory.push(0);
                var y = function () {
                    setTimeout(function () {
                        if (f) {
                            var e = n(m, h);
                            s.emit("volume_change", e, u);
                            var t = 0;
                            if (e > u && !s.speaking) {
                                for (var o = s.speakingHistory.length - 3; o < s.speakingHistory.length; o++)t += s.speakingHistory[o];
                                t >= 2 && (s.speaking = !0, s.emit("speaking"))
                            } else if (u > e && s.speaking) {
                                for (var o = 0; o < s.speakingHistory.length; o++)t += s.speakingHistory[o];
                                0 == t && (s.speaking = !1, s.emit("stopped_speaking"))
                            }
                            s.speakingHistory.shift(), s.speakingHistory.push(0 + (e > u)), y()
                        }
                    }, c)
                };
                return y(), s
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/hark/hark.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/hark")
    }, {"1YiZ5S": 6, buffer: 2, wildemitter: 29}],
    16: [function (e, t) {
        (function () {
            function n(e) {
                if (this.support = o.webAudio && o.mediaStream, this.gain = 1, this.support) {
                    var t = this.context = new o.AudioContext;
                    this.microphone = t.createMediaStreamSource(e), this.gainFilter = t.createGain(), this.destination = t.createMediaStreamDestination(), this.outputStream = this.destination.stream, this.microphone.connect(this.gainFilter), this.gainFilter.connect(this.destination), e.addTrack(this.outputStream.getAudioTracks()[0]), e.removeTrack(e.getAudioTracks()[0])
                }
                this.stream = e
            }

            var o = e("webrtcsupport");
            n.prototype.setGain = function (e) {
                this.support && (this.gainFilter.gain.value = e, this.gain = e)
            }, n.prototype.getGain = function () {
                return this.gain
            }, n.prototype.off = function () {
                return this.setGain(0)
            }, n.prototype.on = function () {
                this.setGain(1)
            }, t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain/mediastream-gain.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain")
    }, {"1YiZ5S": 6, buffer: 2, webrtcsupport: 17}],
    17: [function (e, t) {
        (function () {
            var e, n = !1, o = !1, r = window.navigator.userAgent.toLowerCase();
            -1 !== r.indexOf("firefox") ? (e = "moz", o = !0) : -1 !== r.indexOf("chrome") && (e = "webkit", n = !0);
            var i = window.mozRTCPeerConnection || window.webkitRTCPeerConnection, s = window.mozRTCIceCandidate || window.RTCIceCandidate, a = window.mozRTCSessionDescription || window.RTCSessionDescription, c = window.webkitMediaStream || window.MediaStream, u = "https:" === window.location.protocol && window.navigator.userAgent.match("Chrome") && parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10) >= 26, l = window.webkitAudioContext || window.AudioContext;
            t.exports = {
                support: !!i,
                dataChannel: n || o || i && i.prototype && i.prototype.createDataChannel,
                prefix: e,
                webAudio: !(!l || !l.prototype.createMediaStreamSource),
                mediaStream: !(!c || !c.prototype.removeTrack),
                screenSharing: !!u,
                AudioContext: l,
                PeerConnection: i,
                SessionDescription: a,
                IceCandidate: s
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain/node_modules/webrtcsupport/index-browser.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain/node_modules/webrtcsupport")
    }, {"1YiZ5S": 6, buffer: 2}],
    18: [function (e, t, n) {
        (function () {
            var t = e("./lib/tosdp"), o = e("./lib/tojson");
            n.toIncomingSDPOffer = function (e) {
                return t.toSessionSDP(e, {role: "responder", direction: "incoming"})
            }, n.toOutgoingSDPOffer = function (e) {
                return t.toSessionSDP(e, {role: "initiator", direction: "outgoing"})
            }, n.toIncomingSDPAnswer = function (e) {
                return t.toSessionSDP(e, {role: "initiator", direction: "incoming"})
            }, n.toOutgoingSDPAnswer = function (e) {
                return t.toSessionSDP(e, {role: "responder", direction: "outgoing"})
            }, n.toIncomingMediaSDPOffer = function (e) {
                return t.toMediaSDP(e, {role: "responder", direction: "incoming"})
            }, n.toOutgoingMediaSDPOffer = function (e) {
                return t.toMediaSDP(e, {role: "initiator", direction: "outgoing"})
            }, n.toIncomingMediaSDPAnswer = function (e) {
                return t.toMediaSDP(e, {role: "initiator", direction: "incoming"})
            }, n.toOutgoingMediaSDPAnswer = function (e) {
                return t.toMediaSDP(e, {role: "responder", direction: "outgoing"})
            }, n.toCandidateSDP = t.toCandidateSDP, n.toMediaSDP = t.toMediaSDP, n.toSessionSDP = t.toSessionSDP, n.toIncomingJSONOffer = function (e, t) {
                return o.toSessionJSON(e, {role: "responder", direction: "incoming", creators: t})
            }, n.toOutgoingJSONOffer = function (e, t) {
                return o.toSessionJSON(e, {role: "initiator", direction: "outgoing", creators: t})
            }, n.toIncomingJSONAnswer = function (e, t) {
                return o.toSessionJSON(e, {role: "initiator", direction: "incoming", creators: t})
            }, n.toOutgoingJSONAnswer = function (e, t) {
                return o.toSessionJSON(e, {role: "responder", direction: "outgoing", creators: t})
            }, n.toIncomingMediaJSONOffer = function (e, t) {
                return o.toMediaJSON(e, {role: "responder", direction: "incoming", creator: t})
            }, n.toOutgoingMediaJSONOffer = function (e, t) {
                return o.toMediaJSON(e, {role: "initiator", direction: "outgoing", creator: t})
            }, n.toIncomingMediaJSONAnswer = function (e, t) {
                return o.toMediaJSON(e, {role: "initiator", direction: "incoming", creator: t})
            }, n.toOutgoingMediaJSONAnswer = function (e, t) {
                return o.toMediaJSON(e, {role: "responder", direction: "outgoing", creator: t})
            }, n.toCandidateJSON = o.toCandidateJSON, n.toMediaJSON = o.toMediaJSON, n.toSessionJSON = o.toSessionJSON
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/index.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json")
    }, {"./lib/tojson": 21, "./lib/tosdp": 22, "1YiZ5S": 6, buffer: 2}],
    19: [function (e, t, n) {
        (function () {
            n.lines = function (e) {
                return e.split("\r\n").filter(function (e) {
                    return e.length > 0
                })
            }, n.findLine = function (e, t, n) {
                for (var o = e.length, r = 0; r < t.length; r++)if (t[r].substr(0, o) === e)return t[r];
                if (!n)return !1;
                for (var i = 0; i < n.length; i++)if (n[i].substr(0, o) === e)return n[i];
                return !1
            }, n.findLines = function (e, t, n) {
                for (var o = [], r = e.length, i = 0; i < t.length; i++)t[i].substr(0, r) === e && o.push(t[i]);
                if (o.length || !n)return o;
                for (var s = 0; s < n.length; s++)n[s].substr(0, r) === e && o.push(n[s]);
                return o
            }, n.mline = function (e) {
                for (var t = e.substr(2).split(" "), n = {
                    media: t[0],
                    port: t[1],
                    proto: t[2],
                    formats: []
                }, o = 3; o < t.length; o++)t[o] && n.formats.push(t[o]);
                return n
            }, n.rtpmap = function (e) {
                var t = e.substr(9).split(" "), n = {id: t.shift()};
                return t = t[0].split("/"), n.name = t[0], n.clockrate = t[1], n.channels = 3 == t.length ? t[2] : "1", n
            }, n.sctpmap = function (e) {
                var t = e.substr(10).split(" "), n = {number: t.shift(), protocol: t.shift(), streams: t.shift()};
                return n
            }, n.fmtp = function (e) {
                for (var t, n, o, r = e.substr(e.indexOf(" ") + 1).split(";"), i = [], s = 0; s < r.length; s++)t = r[s].split("="), n = t[0].trim(), o = t[1], n && o ? i.push({
                    key: n,
                    value: o
                }) : n && i.push({key: "", value: n});
                return i
            }, n.crypto = function (e) {
                var t = e.substr(9).split(" "), n = {
                    tag: t[0],
                    cipherSuite: t[1],
                    keyParams: t[2],
                    sessionParams: t.slice(3).join(" ")
                };
                return n
            }, n.fingerprint = function (e) {
                var t = e.substr(14).split(" ");
                return {hash: t[0], value: t[1]}
            }, n.extmap = function (e) {
                var t = e.substr(9).split(" "), n = {}, o = t.shift(), r = o.indexOf("/");
                return r >= 0 ? (n.id = o.substr(0, r), n.senders = o.substr(r + 1)) : (n.id = o, n.senders = "sendrecv"), n.uri = t.shift() || "", n
            }, n.rtcpfb = function (e) {
                var t = e.substr(10).split(" "), n = {};
                return n.id = t.shift(), n.type = t.shift(), "trr-int" === n.type ? n.value = t.shift() : n.subtype = t.shift() || "", n.parameters = t, n
            }, n.candidate = function (e) {
                var t;
                t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
                for (var n = {
                    foundation: t[0],
                    component: t[1],
                    protocol: t[2].toLowerCase(),
                    priority: t[3],
                    ip: t[4],
                    port: t[5],
                    type: t[7],
                    generation: "0"
                }, o = 8; o < t.length; o += 2)"raddr" === t[o] ? n.relAddr = t[o + 1] : "rport" === t[o] ? n.relPort = t[o + 1] : "generation" === t[o] ? n.generation = t[o + 1] : "tcptype" === t[o] && (n.tcpType = t[o + 1]);
                return n.network = "1", n
            }, n.sourceGroups = function (e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var o = e[n].substr(13).split(" ");
                    t.push({semantics: o.shift(), sources: o})
                }
                return t
            }, n.sources = function (e) {
                for (var t = [], n = {}, o = 0; o < e.length; o++) {
                    var r = e[o].substr(7).split(" "), i = r.shift();
                    if (!n[i]) {
                        var s = {ssrc: i, parameters: []};
                        t.push(s), n[i] = s
                    }
                    r = r.join(" ").split(":");
                    var a = r.shift(), c = r.join(":") || null;
                    n[i].parameters.push({key: a, value: c})
                }
                return t
            }, n.groups = function (e) {
                for (var t, n = [], o = 0; o < e.length; o++)t = e[o].substr(8).split(" "), n.push({
                    semantics: t.shift(),
                    contents: t
                });
                return n
            }, n.bandwidth = function (e) {
                var t = e.substr(2).split(":"), n = {};
                return n.type = t.shift(), n.bandwidth = t.shift(), n
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/parsers.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib")
    }, {"1YiZ5S": 6, buffer: 2}],
    20: [function (e, t) {
        (function () {
            t.exports = {
                initiator: {
                    incoming: {
                        initiator: "recvonly",
                        responder: "sendonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "initiator",
                        sendonly: "responder",
                        sendrecv: "both",
                        inactive: "none"
                    },
                    outgoing: {
                        initiator: "sendonly",
                        responder: "recvonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "responder",
                        sendonly: "initiator",
                        sendrecv: "both",
                        inactive: "none"
                    }
                },
                responder: {
                    incoming: {
                        initiator: "sendonly",
                        responder: "recvonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "responder",
                        sendonly: "initiator",
                        sendrecv: "both",
                        inactive: "none"
                    },
                    outgoing: {
                        initiator: "recvonly",
                        responder: "sendonly",
                        both: "sendrecv",
                        none: "inactive",
                        recvonly: "initiator",
                        sendonly: "responder",
                        sendrecv: "both",
                        inactive: "none"
                    }
                }
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/senders.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib")
    }, {"1YiZ5S": 6, buffer: 2}],
    21: [function (e, t, n) {
        (function () {
            var t = e("./senders"), o = e("./parsers"), r = Math.random();
            n._setIdCounter = function (e) {
                r = e
            }, n.toSessionJSON = function (e, t) {
                var r, i = t.creators || [], s = t.role || "initiator", a = t.direction || "outgoing", c = e.split("\r\nm=");
                for (r = 1; r < c.length; r++)c[r] = "m=" + c[r], r !== c.length - 1 && (c[r] += "\r\n");
                var u = c.shift() + "\r\n", l = o.lines(u), d = {}, f = [];
                for (r = 0; r < c.length; r++)f.push(n.toMediaJSON(c[r], u, {
                    role: s,
                    direction: a,
                    creator: i[r] || "initiator"
                }));
                d.contents = f;
                var p = o.findLines("a=group:", l);
                return p.length && (d.groups = o.groups(p)), d
            }, n.toMediaJSON = function (e, r, i) {
                var s = i.creator || "initiator", a = i.role || "initiator", c = i.direction || "outgoing", u = o.lines(e), l = o.lines(r), d = o.mline(u[0]), f = {
                    creator: s,
                    name: d.media,
                    description: {
                        descType: "rtp",
                        media: d.media,
                        payloads: [],
                        encryption: [],
                        feedback: [],
                        headerExtensions: []
                    },
                    transport: {transType: "iceUdp", candidates: [], fingerprints: []}
                };
                "application" == d.media && (f.description = {descType: "datachannel"}, f.transport.sctp = []);
                var p = f.description, h = f.transport, m = o.findLine("a=mid:", u);
                if (m && (f.name = m.substr(6)), o.findLine("a=sendrecv", u, l) ? f.senders = "both" : o.findLine("a=sendonly", u, l) ? f.senders = t[a][c].sendonly : o.findLine("a=recvonly", u, l) ? f.senders = t[a][c].recvonly : o.findLine("a=inactive", u, l) && (f.senders = "none"), "rtp" == p.descType) {
                    var g = o.findLine("b=", u);
                    g && (p.bandwidth = o.bandwidth(g));
                    var y = o.findLine("a=ssrc:", u);
                    y && (p.ssrc = y.substr(7).split(" ")[0]);
                    var v = o.findLines("a=rtpmap:", u);
                    v.forEach(function (e) {
                        var t = o.rtpmap(e);
                        t.parameters = [], t.feedback = [];
                        var n = o.findLines("a=fmtp:" + t.id, u);
                        n.forEach(function (e) {
                            t.parameters = o.fmtp(e)
                        });
                        var r = o.findLines("a=rtcp-fb:" + t.id, u);
                        r.forEach(function (e) {
                            t.feedback.push(o.rtcpfb(e))
                        }), p.payloads.push(t)
                    });
                    var b = o.findLines("a=crypto:", u, l);
                    b.forEach(function (e) {
                        p.encryption.push(o.crypto(e))
                    }), o.findLine("a=rtcp-mux", u) && (p.mux = !0);
                    var w = o.findLines("a=rtcp-fb:*", u);
                    w.forEach(function (e) {
                        p.feedback.push(o.rtcpfb(e))
                    });
                    var S = o.findLines("a=extmap:", u);
                    S.forEach(function (e) {
                        var n = o.extmap(e);
                        n.senders = t[a][c][n.senders], p.headerExtensions.push(n)
                    });
                    var _ = o.findLines("a=ssrc-group:", u);
                    p.sourceGroups = o.sourceGroups(_ || []);
                    var k = o.findLines("a=ssrc:", u);
                    p.sources = o.sources(k || []), o.findLine("a=x-google-flag:conference", u, l) && (p.googConferenceFlag = !0)
                }
                var E = o.findLines("a=fingerprint:", u, l), C = o.findLine("a=setup:", u, l);
                E.forEach(function (e) {
                    var t = o.fingerprint(e);
                    C && (t.setup = C.substr(8)), h.fingerprints.push(t)
                });
                var T = o.findLine("a=ice-ufrag:", u, l), O = o.findLine("a=ice-pwd:", u, l);
                if (T && O) {
                    h.ufrag = T.substr(12), h.pwd = O.substr(10), h.candidates = [];
                    var x = o.findLines("a=candidate:", u, l);
                    x.forEach(function (e) {
                        h.candidates.push(n.toCandidateJSON(e))
                    })
                }
                if ("datachannel" == p.descType) {
                    var A = o.findLines("a=sctpmap:", u);
                    A.forEach(function (e) {
                        var t = o.sctpmap(e);
                        h.sctp.push(t)
                    })
                }
                return f
            }, n.toCandidateJSON = function (e) {
                var t = o.candidate(e.split("\r\n")[0]);
                return t.id = (r++).toString(36).substr(0, 12), t
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tojson.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib")
    }, {"./parsers": 19, "./senders": 20, "1YiZ5S": 6, buffer: 2}],
    22: [function (e, t, n) {
        (function () {
            var t = e("./senders");
            n.toSessionSDP = function (e, t) {
                var o = (t.role || "initiator", t.direction || "outgoing", t.sid || e.sid || Date.now()), r = t.time || Date.now(), i = ["v=0", "o=- " + o + " " + r + " IN IP4 0.0.0.0", "s=-", "t=0 0"], s = e.groups || [];
                s.forEach(function (e) {
                    i.push("a=group:" + e.semantics + " " + e.contents.join(" "))
                });
                var a = e.contents || [];
                return a.forEach(function (e) {
                    i.push(n.toMediaSDP(e, t))
                }), i.join("\r\n") + "\r\n"
            }, n.toMediaSDP = function (e, o) {
                var r = [], i = o.role || "initiator", s = o.direction || "outgoing", a = e.description, c = e.transport, u = a.payloads || [], l = c && c.fingerprints || [], d = [];
                if ("datachannel" == a.descType ? (d.push("application"), d.push("1"), d.push("DTLS/SCTP"), c.sctp && c.sctp.forEach(function (e) {
                        d.push(e.number)
                    })) : (d.push(a.media), d.push("1"), d.push(a.encryption && a.encryption.length > 0 || l.length > 0 ? "RTP/SAVPF" : "RTP/AVPF"), u.forEach(function (e) {
                        d.push(e.id)
                    })), r.push("m=" + d.join(" ")), r.push("c=IN IP4 0.0.0.0"), a.bandwidth && a.bandwidth.type && a.bandwidth.bandwidth && r.push("b=" + a.bandwidth.type + ":" + a.bandwidth.bandwidth), "rtp" == a.descType && r.push("a=rtcp:1 IN IP4 0.0.0.0"), c) {
                    c.ufrag && r.push("a=ice-ufrag:" + c.ufrag), c.pwd && r.push("a=ice-pwd:" + c.pwd);
                    var f = !1;
                    l.forEach(function (e) {
                        r.push("a=fingerprint:" + e.hash + " " + e.value), e.setup && !f && r.push("a=setup:" + e.setup)
                    }), c.sctp && c.sctp.forEach(function (e) {
                        r.push("a=sctpmap:" + e.number + " " + e.protocol + " " + e.streams)
                    })
                }
                "rtp" == a.descType && r.push("a=" + (t[i][s][e.senders] || "sendrecv")), r.push("a=mid:" + e.name), a.mux && r.push("a=rtcp-mux");
                var p = a.encryption || [];
                p.forEach(function (e) {
                    r.push("a=crypto:" + e.tag + " " + e.cipherSuite + " " + e.keyParams + (e.sessionParams ? " " + e.sessionParams : ""))
                }), a.googConferenceFlag && r.push("a=x-google-flag:conference"), u.forEach(function (e) {
                    var t = "a=rtpmap:" + e.id + " " + e.name + "/" + e.clockrate;
                    if (e.channels && "1" != e.channels && (t += "/" + e.channels), r.push(t), e.parameters && e.parameters.length) {
                        var n = ["a=fmtp:" + e.id], o = [];
                        e.parameters.forEach(function (e) {
                            o.push((e.key ? e.key + "=" : "") + e.value)
                        }), n.push(o.join(";")), r.push(n.join(" "))
                    }
                    e.feedback && e.feedback.forEach(function (t) {
                        r.push("trr-int" === t.type ? "a=rtcp-fb:" + e.id + " trr-int " + t.value ? t.value : "0" : "a=rtcp-fb:" + e.id + " " + t.type + (t.subtype ? " " + t.subtype : ""))
                    })
                }), a.feedback && a.feedback.forEach(function (e) {
                    r.push("trr-int" === e.type ? e.value : "a=rtcp-fb:* " + e.type + (e.subtype ? " " + e.subtype : ""))
                });
                var h = a.headerExtensions || [];
                h.forEach(function (e) {
                    r.push("a=extmap:" + e.id + (e.senders ? "/" + t[i][s][e.senders] : "") + " " + e.uri)
                });
                var m = a.sourceGroups || [];
                m.forEach(function (e) {
                    r.push("a=ssrc-group:" + e.semantics + " " + e.sources.join(" "))
                });
                var g = a.sources || [];
                g.forEach(function (e) {
                    for (var t = 0; t < e.parameters.length; t++) {
                        var n = e.parameters[t];
                        r.push("a=ssrc:" + (e.ssrc || a.ssrc) + " " + n.key + (n.value ? ":" + n.value : ""))
                    }
                });
                var y = c.candidates || [];
                return y.forEach(function (e) {
                    r.push(n.toCandidateSDP(e))
                }), r.join("\r\n")
            }, n.toCandidateSDP = function (e) {
                var t = [];
                t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
                var n = e.type;
                return t.push("typ"), t.push(n), ("srflx" === n || "prflx" === n || "relay" === n) && e.relAddr && e.relPort && (t.push("raddr"), t.push(e.relAddr), t.push("rport"), t.push(e.relPort)), e.tcpType && "TCP" == e.protocol.toUpperCase() && (t.push("tcptype"), t.push(e.tcpType)), t.push("generation"), t.push(e.generation || "0"), "a=candidate:" + t.join(" ")
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tosdp.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib")
    }, {"./senders": 20, "1YiZ5S": 6, buffer: 2}],
    23: [function (e, t) {
        (function () {
            function n(e) {
                return {type: e.type, sdp: e.sdp}
            }

            function o(e) {
                var t = {label: e.id};
                return e.getAudioTracks().length && (t.audio = e.getAudioTracks().map(function (e) {
                    return e.id
                })), e.getVideoTracks().length && (t.video = e.getVideoTracks().map(function (e) {
                    return e.id
                })), t
            }

            function r(e, t) {
                var n = this;
                a.call(this), this.peerconnection = new s.PeerConnection(e, t), this.trace = function (e, t) {
                    n.emit("PeerConnectionTrace", {time: new Date, type: e, value: t || ""})
                }, this.onicecandidate = null, this.peerconnection.onicecandidate = function (e) {
                    n.trace("onicecandidate", e.candidate), null !== n.onicecandidate && n.onicecandidate(e)
                }, this.onaddstream = null, this.peerconnection.onaddstream = function (e) {
                    n.trace("onaddstream", o(e.stream)), null !== n.onaddstream && n.onaddstream(e)
                }, this.onremovestream = null, this.peerconnection.onremovestream = function (e) {
                    n.trace("onremovestream", o(e.stream)), null !== n.onremovestream && n.onremovestream(e)
                }, this.onsignalingstatechange = null, this.peerconnection.onsignalingstatechange = function (e) {
                    n.trace("onsignalingstatechange", n.signalingState), null !== n.onsignalingstatechange && n.onsignalingstatechange(e)
                }, this.oniceconnectionstatechange = null, this.peerconnection.oniceconnectionstatechange = function (e) {
                    n.trace("oniceconnectionstatechange", n.iceConnectionState), null !== n.oniceconnectionstatechange && n.oniceconnectionstatechange(e)
                }, this.onnegotiationneeded = null, this.peerconnection.onnegotiationneeded = function (e) {
                    n.trace("onnegotiationneeded"), null !== n.onnegotiationneeded && n.onnegotiationneeded(e)
                }, n.ondatachannel = null, this.peerconnection.ondatachannel = function (e) {
                    n.trace("ondatachannel", e), null !== n.ondatachannel && n.ondatachannel(e)
                }, this.getLocalStreams = this.peerconnection.getLocalStreams.bind(this.peerconnection), this.getRemoteStreams = this.peerconnection.getRemoteStreams.bind(this.peerconnection)
            }

            var i = e("util"), s = e("webrtcsupport"), a = e("wildemitter");
            i.inherits(r, a), Object.defineProperty(r.prototype, "signalingState", {
                get: function () {
                    return this.peerconnection.signalingState
                }
            }), Object.defineProperty(r.prototype, "iceConnectionState", {
                get: function () {
                    return this.peerconnection.iceConnectionState
                }
            }), Object.defineProperty(r.prototype, "localDescription", {
                get: function () {
                    return this.peerconnection.localDescription
                }
            }), Object.defineProperty(r.prototype, "remoteDescription", {
                get: function () {
                    return this.peerconnection.remoteDescription
                }
            }), r.prototype.addStream = function (e) {
                this.trace("addStream", o(e)), this.peerconnection.addStream(e)
            }, r.prototype.removeStream = function (e) {
                this.trace("removeStream", o(e)), this.peerconnection.removeStream(e)
            }, r.prototype.createDataChannel = function (e, t) {
                return this.trace("createDataChannel", e, t), this.peerconnection.createDataChannel(e, t)
            }, r.prototype.setLocalDescription = function (e, t, o) {
                var r = this;
                this.trace("setLocalDescription", n(e)), this.peerconnection.setLocalDescription(e, function () {
                    r.trace("setLocalDescriptionOnSuccess"), t()
                }, function (e) {
                    r.trace("setLocalDescriptionOnFailure", e), o(e)
                })
            }, r.prototype.setRemoteDescription = function (e, t, o) {
                var r = this;
                this.trace("setRemoteDescription", n(e)), this.peerconnection.setRemoteDescription(e, function () {
                    r.trace("setRemoteDescriptionOnSuccess"), t()
                }, function (e) {
                    r.trace("setRemoteDescriptionOnFailure", e), o(e)
                })
            }, r.prototype.close = function () {
                this.trace("stop"), null !== this.statsinterval && (window.clearInterval(this.statsinterval), this.statsinterval = null), "closed" != this.peerconnection.signalingState && this.peerconnection.close()
            }, r.prototype.createOffer = function (e, t, o) {
                var r = this;
                this.trace("createOffer", o), this.peerconnection.createOffer(function (t) {
                    r.trace("createOfferOnSuccess", n(t)), e(t)
                }, function (e) {
                    r.trace("createOfferOnFailure", e), t(e)
                }, o)
            }, r.prototype.createAnswer = function (e, t, o) {
                var r = this;
                this.trace("createAnswer", o), this.peerconnection.createAnswer(function (t) {
                    r.trace("createAnswerOnSuccess", n(t)), e(t)
                }, function (e) {
                    r.trace("createAnswerOnFailure", e), t(e)
                }, o)
            }, r.prototype.addIceCandidate = function (e, t, n) {
                var o = this;
                this.trace("addIceCandidate", e), this.peerconnection.addIceCandidate(e, function () {
                    t && t()
                }, function (e) {
                    o.trace("addIceCandidateOnFailure", e), n && n(e)
                })
            }, r.prototype.getStats = function (e, t) {
                navigator.mozGetUserMedia ? this.peerconnection.getStats(null, e, t) : this.peerconnection.getStats(e)
            }, t.exports = r
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/traceablepeerconnection/index.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/traceablepeerconnection")
    }, {"1YiZ5S": 6, buffer: 2, util: 8, webrtcsupport: 28, wildemitter: 29}],
    24: [function (e, t, n) {
        (function () {
            (function () {
                var e = this, o = e._, r = Array.prototype, i = Object.prototype, s = Function.prototype, a = r.push, c = r.slice, u = r.concat, l = i.toString, d = i.hasOwnProperty, f = Array.isArray, p = Object.keys, h = s.bind, m = function (e) {
                    return e instanceof m ? e : this instanceof m ? void(this._wrapped = e) : new m(e)
                };
                "undefined" != typeof n ? ("undefined" != typeof t && t.exports && (n = t.exports = m), n._ = m) : e._ = m, m.VERSION = "1.7.0";
                var g = function (e, t, n) {
                    if (void 0 === t)return e;
                    switch (null == n ? 3 : n) {
                        case 1:
                            return function (n) {
                                return e.call(t, n)
                            };
                        case 2:
                            return function (n, o) {
                                return e.call(t, n, o)
                            };
                        case 3:
                            return function (n, o, r) {
                                return e.call(t, n, o, r)
                            };
                        case 4:
                            return function (n, o, r, i) {
                                return e.call(t, n, o, r, i)
                            }
                    }
                    return function () {
                        return e.apply(t, arguments)
                    }
                };
                m.iteratee = function (e, t, n) {
                    return null == e ? m.identity : m.isFunction(e) ? g(e, t, n) : m.isObject(e) ? m.matches(e) : m.property(e)
                }, m.each = m.forEach = function (e, t, n) {
                    if (null == e)return e;
                    t = g(t, n);
                    var o, r = e.length;
                    if (r === +r)for (o = 0; r > o; o++)t(e[o], o, e); else {
                        var i = m.keys(e);
                        for (o = 0, r = i.length; r > o; o++)t(e[i[o]], i[o], e)
                    }
                    return e
                }, m.map = m.collect = function (e, t, n) {
                    if (null == e)return [];
                    t = m.iteratee(t, n);
                    for (var o, r = e.length !== +e.length && m.keys(e), i = (r || e).length, s = Array(i), a = 0; i > a; a++)o = r ? r[a] : a, s[a] = t(e[o], o, e);
                    return s
                };
                var y = "Reduce of empty array with no initial value";
                m.reduce = m.foldl = m.inject = function (e, t, n, o) {
                    null == e && (e = []), t = g(t, o, 4);
                    var r, i = e.length !== +e.length && m.keys(e), s = (i || e).length, a = 0;
                    if (arguments.length < 3) {
                        if (!s)throw new TypeError(y);
                        n = e[i ? i[a++] : a++]
                    }
                    for (; s > a; a++)r = i ? i[a] : a, n = t(n, e[r], r, e);
                    return n
                }, m.reduceRight = m.foldr = function (e, t, n, o) {
                    null == e && (e = []), t = g(t, o, 4);
                    var r, i = e.length !== +e.length && m.keys(e), s = (i || e).length;
                    if (arguments.length < 3) {
                        if (!s)throw new TypeError(y);
                        n = e[i ? i[--s] : --s]
                    }
                    for (; s--;)r = i ? i[s] : s, n = t(n, e[r], r, e);
                    return n
                }, m.find = m.detect = function (e, t, n) {
                    var o;
                    return t = m.iteratee(t, n), m.some(e, function (e, n, r) {
                        return t(e, n, r) ? (o = e, !0) : void 0
                    }), o
                }, m.filter = m.select = function (e, t, n) {
                    var o = [];
                    return null == e ? o : (t = m.iteratee(t, n), m.each(e, function (e, n, r) {
                        t(e, n, r) && o.push(e)
                    }), o)
                }, m.reject = function (e, t, n) {
                    return m.filter(e, m.negate(m.iteratee(t)), n)
                }, m.every = m.all = function (e, t, n) {
                    if (null == e)return !0;
                    t = m.iteratee(t, n);
                    var o, r, i = e.length !== +e.length && m.keys(e), s = (i || e).length;
                    for (o = 0; s > o; o++)if (r = i ? i[o] : o, !t(e[r], r, e))return !1;
                    return !0
                }, m.some = m.any = function (e, t, n) {
                    if (null == e)return !1;
                    t = m.iteratee(t, n);
                    var o, r, i = e.length !== +e.length && m.keys(e), s = (i || e).length;
                    for (o = 0; s > o; o++)if (r = i ? i[o] : o, t(e[r], r, e))return !0;
                    return !1
                }, m.contains = m.include = function (e, t) {
                    return null == e ? !1 : (e.length !== +e.length && (e = m.values(e)), m.indexOf(e, t) >= 0)
                }, m.invoke = function (e, t) {
                    var n = c.call(arguments, 2), o = m.isFunction(t);
                    return m.map(e, function (e) {
                        return (o ? t : e[t]).apply(e, n)
                    })
                }, m.pluck = function (e, t) {
                    return m.map(e, m.property(t))
                }, m.where = function (e, t) {
                    return m.filter(e, m.matches(t))
                }, m.findWhere = function (e, t) {
                    return m.find(e, m.matches(t))
                }, m.max = function (e, t, n) {
                    var o, r, i = -1 / 0, s = -1 / 0;
                    if (null == t && null != e) {
                        e = e.length === +e.length ? e : m.values(e);
                        for (var a = 0, c = e.length; c > a; a++)o = e[a], o > i && (i = o)
                    } else t = m.iteratee(t, n), m.each(e, function (e, n, o) {
                        r = t(e, n, o), (r > s || r === -1 / 0 && i === -1 / 0) && (i = e, s = r)
                    });
                    return i
                }, m.min = function (e, t, n) {
                    var o, r, i = 1 / 0, s = 1 / 0;
                    if (null == t && null != e) {
                        e = e.length === +e.length ? e : m.values(e);
                        for (var a = 0, c = e.length; c > a; a++)o = e[a], i > o && (i = o)
                    } else t = m.iteratee(t, n), m.each(e, function (e, n, o) {
                        r = t(e, n, o), (s > r || 1 / 0 === r && 1 / 0 === i) && (i = e, s = r)
                    });
                    return i
                }, m.shuffle = function (e) {
                    for (var t, n = e && e.length === +e.length ? e : m.values(e), o = n.length, r = Array(o), i = 0; o > i; i++)t = m.random(0, i), t !== i && (r[i] = r[t]), r[t] = n[i];
                    return r
                }, m.sample = function (e, t, n) {
                    return null == t || n ? (e.length !== +e.length && (e = m.values(e)), e[m.random(e.length - 1)]) : m.shuffle(e).slice(0, Math.max(0, t))
                }, m.sortBy = function (e, t, n) {
                    return t = m.iteratee(t, n), m.pluck(m.map(e, function (e, n, o) {
                        return {value: e, index: n, criteria: t(e, n, o)}
                    }).sort(function (e, t) {
                        var n = e.criteria, o = t.criteria;
                        if (n !== o) {
                            if (n > o || void 0 === n)return 1;
                            if (o > n || void 0 === o)return -1
                        }
                        return e.index - t.index
                    }), "value")
                };
                var v = function (e) {
                    return function (t, n, o) {
                        var r = {};
                        return n = m.iteratee(n, o), m.each(t, function (o, i) {
                            var s = n(o, i, t);
                            e(r, o, s)
                        }), r
                    }
                };
                m.groupBy = v(function (e, t, n) {
                    m.has(e, n) ? e[n].push(t) : e[n] = [t]
                }), m.indexBy = v(function (e, t, n) {
                    e[n] = t
                }), m.countBy = v(function (e, t, n) {
                    m.has(e, n) ? e[n]++ : e[n] = 1
                }), m.sortedIndex = function (e, t, n, o) {
                    n = m.iteratee(n, o, 1);
                    for (var r = n(t), i = 0, s = e.length; s > i;) {
                        var a = i + s >>> 1;
                        n(e[a]) < r ? i = a + 1 : s = a
                    }
                    return i
                }, m.toArray = function (e) {
                    return e ? m.isArray(e) ? c.call(e) : e.length === +e.length ? m.map(e, m.identity) : m.values(e) : []
                }, m.size = function (e) {
                    return null == e ? 0 : e.length === +e.length ? e.length : m.keys(e).length
                }, m.partition = function (e, t, n) {
                    t = m.iteratee(t, n);
                    var o = [], r = [];
                    return m.each(e, function (e, n, i) {
                        (t(e, n, i) ? o : r).push(e)
                    }), [o, r]
                }, m.first = m.head = m.take = function (e, t, n) {
                    return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : c.call(e, 0, t)
                }, m.initial = function (e, t, n) {
                    return c.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
                }, m.last = function (e, t, n) {
                    return null == e ? void 0 : null == t || n ? e[e.length - 1] : c.call(e, Math.max(e.length - t, 0))
                }, m.rest = m.tail = m.drop = function (e, t, n) {
                    return c.call(e, null == t || n ? 1 : t)
                }, m.compact = function (e) {
                    return m.filter(e, m.identity)
                };
                var b = function (e, t, n, o) {
                    if (t && m.every(e, m.isArray))return u.apply(o, e);
                    for (var r = 0, i = e.length; i > r; r++) {
                        var s = e[r];
                        m.isArray(s) || m.isArguments(s) ? t ? a.apply(o, s) : b(s, t, n, o) : n || o.push(s)
                    }
                    return o
                };
                m.flatten = function (e, t) {
                    return b(e, t, !1, [])
                }, m.without = function (e) {
                    return m.difference(e, c.call(arguments, 1))
                }, m.uniq = m.unique = function (e, t, n, o) {
                    if (null == e)return [];
                    m.isBoolean(t) || (o = n, n = t, t = !1), null != n && (n = m.iteratee(n, o));
                    for (var r = [], i = [], s = 0, a = e.length; a > s; s++) {
                        var c = e[s];
                        if (t)s && i === c || r.push(c), i = c; else if (n) {
                            var u = n(c, s, e);
                            m.indexOf(i, u) < 0 && (i.push(u), r.push(c))
                        } else m.indexOf(r, c) < 0 && r.push(c)
                    }
                    return r
                }, m.union = function () {
                    return m.uniq(b(arguments, !0, !0, []))
                }, m.intersection = function (e) {
                    if (null == e)return [];
                    for (var t = [], n = arguments.length, o = 0, r = e.length; r > o; o++) {
                        var i = e[o];
                        if (!m.contains(t, i)) {
                            for (var s = 1; n > s && m.contains(arguments[s], i); s++);
                            s === n && t.push(i)
                        }
                    }
                    return t
                }, m.difference = function (e) {
                    var t = b(c.call(arguments, 1), !0, !0, []);
                    return m.filter(e, function (e) {
                        return !m.contains(t, e)
                    })
                }, m.zip = function (e) {
                    if (null == e)return [];
                    for (var t = m.max(arguments, "length").length, n = Array(t), o = 0; t > o; o++)n[o] = m.pluck(arguments, o);
                    return n
                }, m.object = function (e, t) {
                    if (null == e)return {};
                    for (var n = {}, o = 0, r = e.length; r > o; o++)t ? n[e[o]] = t[o] : n[e[o][0]] = e[o][1];
                    return n
                }, m.indexOf = function (e, t, n) {
                    if (null == e)return -1;
                    var o = 0, r = e.length;
                    if (n) {
                        if ("number" != typeof n)return o = m.sortedIndex(e, t), e[o] === t ? o : -1;
                        o = 0 > n ? Math.max(0, r + n) : n
                    }
                    for (; r > o; o++)if (e[o] === t)return o;
                    return -1
                }, m.lastIndexOf = function (e, t, n) {
                    if (null == e)return -1;
                    var o = e.length;
                    for ("number" == typeof n && (o = 0 > n ? o + n + 1 : Math.min(o, n + 1)); --o >= 0;)if (e[o] === t)return o;
                    return -1
                }, m.range = function (e, t, n) {
                    arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
                    for (var o = Math.max(Math.ceil((t - e) / n), 0), r = Array(o), i = 0; o > i; i++, e += n)r[i] = e;
                    return r
                };
                var w = function () {
                };
                m.bind = function (e, t) {
                    var n, o;
                    if (h && e.bind === h)return h.apply(e, c.call(arguments, 1));
                    if (!m.isFunction(e))throw new TypeError("Bind must be called on a function");
                    return n = c.call(arguments, 2), o = function () {
                        if (!(this instanceof o))return e.apply(t, n.concat(c.call(arguments)));
                        w.prototype = e.prototype;
                        var r = new w;
                        w.prototype = null;
                        var i = e.apply(r, n.concat(c.call(arguments)));
                        return m.isObject(i) ? i : r
                    }
                }, m.partial = function (e) {
                    var t = c.call(arguments, 1);
                    return function () {
                        for (var n = 0, o = t.slice(), r = 0, i = o.length; i > r; r++)o[r] === m && (o[r] = arguments[n++]);
                        for (; n < arguments.length;)o.push(arguments[n++]);
                        return e.apply(this, o)
                    }
                }, m.bindAll = function (e) {
                    var t, n, o = arguments.length;
                    if (1 >= o)throw new Error("bindAll must be passed function names");
                    for (t = 1; o > t; t++)n = arguments[t], e[n] = m.bind(e[n], e);
                    return e
                }, m.memoize = function (e, t) {
                    var n = function (o) {
                        var r = n.cache, i = t ? t.apply(this, arguments) : o;
                        return m.has(r, i) || (r[i] = e.apply(this, arguments)), r[i]
                    };
                    return n.cache = {}, n
                }, m.delay = function (e, t) {
                    var n = c.call(arguments, 2);
                    return setTimeout(function () {
                        return e.apply(null, n)
                    }, t)
                }, m.defer = function (e) {
                    return m.delay.apply(m, [e, 1].concat(c.call(arguments, 1)))
                }, m.throttle = function (e, t, n) {
                    var o, r, i, s = null, a = 0;
                    n || (n = {});
                    var c = function () {
                        a = n.leading === !1 ? 0 : m.now(), s = null, i = e.apply(o, r), s || (o = r = null)
                    };
                    return function () {
                        var u = m.now();
                        a || n.leading !== !1 || (a = u);
                        var l = t - (u - a);
                        return o = this, r = arguments, 0 >= l || l > t ? (clearTimeout(s), s = null, a = u, i = e.apply(o, r), s || (o = r = null)) : s || n.trailing === !1 || (s = setTimeout(c, l)), i
                    }
                }, m.debounce = function (e, t, n) {
                    var o, r, i, s, a, c = function () {
                        var u = m.now() - s;
                        t > u && u > 0 ? o = setTimeout(c, t - u) : (o = null, n || (a = e.apply(i, r), o || (i = r = null)))
                    };
                    return function () {
                        i = this, r = arguments, s = m.now();
                        var u = n && !o;
                        return o || (o = setTimeout(c, t)), u && (a = e.apply(i, r), i = r = null), a
                    }
                }, m.wrap = function (e, t) {
                    return m.partial(t, e)
                }, m.negate = function (e) {
                    return function () {
                        return !e.apply(this, arguments)
                    }
                }, m.compose = function () {
                    var e = arguments, t = e.length - 1;
                    return function () {
                        for (var n = t, o = e[t].apply(this, arguments); n--;)o = e[n].call(this, o);
                        return o
                    }
                }, m.after = function (e, t) {
                    return function () {
                        return --e < 1 ? t.apply(this, arguments) : void 0
                    }
                }, m.before = function (e, t) {
                    var n;
                    return function () {
                        return --e > 0 ? n = t.apply(this, arguments) : t = null, n
                    }
                }, m.once = m.partial(m.before, 2), m.keys = function (e) {
                    if (!m.isObject(e))return [];
                    if (p)return p(e);
                    var t = [];
                    for (var n in e)m.has(e, n) && t.push(n);
                    return t
                }, m.values = function (e) {
                    for (var t = m.keys(e), n = t.length, o = Array(n), r = 0; n > r; r++)o[r] = e[t[r]];
                    return o
                }, m.pairs = function (e) {
                    for (var t = m.keys(e), n = t.length, o = Array(n), r = 0; n > r; r++)o[r] = [t[r], e[t[r]]];
                    return o
                }, m.invert = function (e) {
                    for (var t = {}, n = m.keys(e), o = 0, r = n.length; r > o; o++)t[e[n[o]]] = n[o];
                    return t
                }, m.functions = m.methods = function (e) {
                    var t = [];
                    for (var n in e)m.isFunction(e[n]) && t.push(n);
                    return t.sort()
                }, m.extend = function (e) {
                    if (!m.isObject(e))return e;
                    for (var t, n, o = 1, r = arguments.length; r > o; o++) {
                        t = arguments[o];
                        for (n in t)d.call(t, n) && (e[n] = t[n])
                    }
                    return e
                }, m.pick = function (e, t, n) {
                    var o, r = {};
                    if (null == e)return r;
                    if (m.isFunction(t)) {
                        t = g(t, n);
                        for (o in e) {
                            var i = e[o];
                            t(i, o, e) && (r[o] = i)
                        }
                    } else {
                        var s = u.apply([], c.call(arguments, 1));
                        e = new Object(e);
                        for (var a = 0, l = s.length; l > a; a++)o = s[a], o in e && (r[o] = e[o])
                    }
                    return r
                }, m.omit = function (e, t, n) {
                    if (m.isFunction(t))t = m.negate(t); else {
                        var o = m.map(u.apply([], c.call(arguments, 1)), String);
                        t = function (e, t) {
                            return !m.contains(o, t)
                        }
                    }
                    return m.pick(e, t, n)
                }, m.defaults = function (e) {
                    if (!m.isObject(e))return e;
                    for (var t = 1, n = arguments.length; n > t; t++) {
                        var o = arguments[t];
                        for (var r in o)void 0 === e[r] && (e[r] = o[r])
                    }
                    return e
                }, m.clone = function (e) {
                    return m.isObject(e) ? m.isArray(e) ? e.slice() : m.extend({}, e) : e
                }, m.tap = function (e, t) {
                    return t(e), e
                };
                var S = function (e, t, n, o) {
                    if (e === t)return 0 !== e || 1 / e === 1 / t;
                    if (null == e || null == t)return e === t;
                    e instanceof m && (e = e._wrapped), t instanceof m && (t = t._wrapped);
                    var r = l.call(e);
                    if (r !== l.call(t))return !1;
                    switch (r) {
                        case"[object RegExp]":
                        case"[object String]":
                            return "" + e == "" + t;
                        case"[object Number]":
                            return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                        case"[object Date]":
                        case"[object Boolean]":
                            return +e === +t
                    }
                    if ("object" != typeof e || "object" != typeof t)return !1;
                    for (var i = n.length; i--;)if (n[i] === e)return o[i] === t;
                    var s = e.constructor, a = t.constructor;
                    if (s !== a && "constructor"in e && "constructor"in t && !(m.isFunction(s) && s instanceof s && m.isFunction(a) && a instanceof a))return !1;
                    n.push(e), o.push(t);
                    var c, u;
                    if ("[object Array]" === r) {
                        if (c = e.length, u = c === t.length)for (; c-- && (u = S(e[c], t[c], n, o)););
                    } else {
                        var d, f = m.keys(e);
                        if (c = f.length, u = m.keys(t).length === c)for (; c-- && (d = f[c], u = m.has(t, d) && S(e[d], t[d], n, o)););
                    }
                    return n.pop(), o.pop(), u
                };
                m.isEqual = function (e, t) {
                    return S(e, t, [], [])
                }, m.isEmpty = function (e) {
                    if (null == e)return !0;
                    if (m.isArray(e) || m.isString(e) || m.isArguments(e))return 0 === e.length;
                    for (var t in e)if (m.has(e, t))return !1;
                    return !0
                }, m.isElement = function (e) {
                    return !(!e || 1 !== e.nodeType)
                }, m.isArray = f || function (e) {
                    return "[object Array]" === l.call(e)
                }, m.isObject = function (e) {
                    var t = typeof e;
                    return "function" === t || "object" === t && !!e
                }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
                    m["is" + e] = function (t) {
                        return l.call(t) === "[object " + e + "]"
                    }
                }), m.isArguments(arguments) || (m.isArguments = function (e) {
                    return m.has(e, "callee")
                }), "function" != typeof/./ && (m.isFunction = function (e) {
                    return "function" == typeof e || !1
                }), m.isFinite = function (e) {
                    return isFinite(e) && !isNaN(parseFloat(e))
                }, m.isNaN = function (e) {
                    return m.isNumber(e) && e !== +e
                }, m.isBoolean = function (e) {
                    return e === !0 || e === !1 || "[object Boolean]" === l.call(e)
                }, m.isNull = function (e) {
                    return null === e
                }, m.isUndefined = function (e) {
                    return void 0 === e
                }, m.has = function (e, t) {
                    return null != e && d.call(e, t)
                }, m.noConflict = function () {
                    return e._ = o, this
                }, m.identity = function (e) {
                    return e
                }, m.constant = function (e) {
                    return function () {
                        return e
                    }
                }, m.noop = function () {
                }, m.property = function (e) {
                    return function (t) {
                        return t[e]
                    }
                }, m.matches = function (e) {
                    var t = m.pairs(e), n = t.length;
                    return function (e) {
                        if (null == e)return !n;
                        e = new Object(e);
                        for (var o = 0; n > o; o++) {
                            var r = t[o], i = r[0];
                            if (r[1] !== e[i] || !(i in e))return !1
                        }
                        return !0
                    }
                }, m.times = function (e, t, n) {
                    var o = Array(Math.max(0, e));
                    t = g(t, n, 1);
                    for (var r = 0; e > r; r++)o[r] = t(r);
                    return o
                }, m.random = function (e, t) {
                    return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
                }, m.now = Date.now || function () {
                    return (new Date).getTime()
                };
                var _ = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                }, k = m.invert(_), E = function (e) {
                    var t = function (t) {
                        return e[t]
                    }, n = "(?:" + m.keys(e).join("|") + ")", o = RegExp(n), r = RegExp(n, "g");
                    return function (e) {
                        return e = null == e ? "" : "" + e, o.test(e) ? e.replace(r, t) : e
                    }
                };
                m.escape = E(_), m.unescape = E(k), m.result = function (e, t) {
                    if (null == e)return void 0;
                    var n = e[t];
                    return m.isFunction(n) ? e[t]() : n
                };
                var C = 0;
                m.uniqueId = function (e) {
                    var t = ++C + "";
                    return e ? e + t : t
                }, m.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var T = /(.)^/, O = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, x = /\\|'|\r|\n|\u2028|\u2029/g, A = function (e) {
                    return "\\" + O[e]
                };
                m.template = function (e, t, n) {
                    !t && n && (t = n), t = m.defaults({}, t, m.templateSettings);
                    var o = RegExp([(t.escape || T).source, (t.interpolate || T).source, (t.evaluate || T).source].join("|") + "|$", "g"), r = 0, i = "__p+='";
                    e.replace(o, function (t, n, o, s, a) {
                        return i += e.slice(r, a).replace(x, A), r = a + t.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : o ? i += "'+\n((__t=(" + o + "))==null?'':__t)+\n'" : s && (i += "';\n" + s + "\n__p+='"), t
                    }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
                    try {
                        var s = new Function(t.variable || "obj", "_", i)
                    } catch (a) {
                        throw a.source = i, a
                    }
                    var c = function (e) {
                        return s.call(this, e, m)
                    }, u = t.variable || "obj";
                    return c.source = "function(" + u + "){\n" + i + "}", c
                }, m.chain = function (e) {
                    var t = m(e);
                    return t._chain = !0, t
                };
                var j = function (e) {
                    return this._chain ? m(e).chain() : e
                };
                m.mixin = function (e) {
                    m.each(m.functions(e), function (t) {
                        var n = m[t] = e[t];
                        m.prototype[t] = function () {
                            var e = [this._wrapped];
                            return a.apply(e, arguments), j.call(this, n.apply(m, e))
                        }
                    })
                }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                    var t = r[e];
                    m.prototype[e] = function () {
                        var n = this._wrapped;
                        return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], j.call(this, n)
                    }
                }), m.each(["concat", "join", "slice"], function (e) {
                    var t = r[e];
                    m.prototype[e] = function () {
                        return j.call(this, t.apply(this._wrapped, arguments))
                    }
                }), m.prototype.value = function () {
                    return this._wrapped
                }, "function" == typeof define && define.amd && define("underscore", [], function () {
                    return m
                })
            }).call(this)
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/underscore/underscore.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/underscore")
    }, {"1YiZ5S": 6, buffer: 2}],
    25: [function (e, t) {
        (function () {
            function n(e, t) {
                var n, o = this;
                a.call(this), e = e || {}, e.iceServers = e.iceServers || [], this.enableChromeNativeSimulcast = !1, t && t.optional && "webkit" === i.prefix && null === navigator.appVersion.match(/Chromium\//) && t.optional.forEach(function (e) {
                    e.enableChromeNativeSimulcast && (o.enableChromeNativeSimulcast = !0)
                }), this.enableMultiStreamHacks = !1, t && t.optional && t.optional.forEach(function (e) {
                    e.enableMultiStreamHacks && (o.enableMultiStreamHacks = !0)
                }), this.pc = new c(e, t), this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc), this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc), this.addStream = this.pc.addStream.bind(this.pc), this.removeStream = this.pc.removeStream.bind(this.pc), this.pc.on("*", function () {
                    o.emit.apply(o, arguments)
                }), this.pc.onremovestream = this.emit.bind(this, "removeStream"), this.pc.onnegotiationneeded = this.emit.bind(this, "negotiationNeeded"), this.pc.oniceconnectionstatechange = this.emit.bind(this, "iceConnectionStateChange"), this.pc.onsignalingstatechange = this.emit.bind(this, "signalingStateChange"), this.pc.onaddstream = this._onAddStream.bind(this), this.pc.onicecandidate = this._onIce.bind(this), this.pc.ondatachannel = this._onDataChannel.bind(this), this.localDescription = {contents: []}, this.remoteDescription = {contents: []}, this.localStream = null, this.remoteStreams = [], this.config = {
                    debug: !1,
                    ice: {},
                    sid: "",
                    isInitiator: !0,
                    sdpSessionID: Date.now(),
                    useJingle: !1
                };
                for (n in e)this.config[n] = e[n];
                this._role = this.isInitiator ? "initiator" : "responder", this.config.debug && this.on("*", function () {
                    var t = e.logger || console;
                    t.log("PeerConnection event:", arguments)
                }), this.hadLocalStunCandidate = !1, this.hadRemoteStunCandidate = !1, this.hadLocalRelayCandidate = !1, this.hadRemoteRelayCandidate = !1, this.hadLocalIPv6Candidate = !1, this.hadRemoteIPv6Candidate = !1, this._remoteDataChannels = [], this._localDataChannels = []
            }

            var o = e("underscore"), r = e("util"), i = e("webrtcsupport"), s = e("sdp-jingle-json"), a = e("wildemitter"), c = e("traceablepeerconnection");
            r.inherits(n, a), Object.defineProperty(n.prototype, "signalingState", {
                get: function () {
                    return this.pc.signalingState
                }
            }), Object.defineProperty(n.prototype, "iceConnectionState", {
                get: function () {
                    return this.pc.iceConnectionState
                }
            }), n.prototype.addStream = function (e) {
                this.localStream = e, this.pc.addStream(e)
            }, n.prototype._checkLocalCandidate = function (e) {
                var t = s.toCandidateJSON(e);
                "srflx" == t.type ? this.hadLocalStunCandidate = !0 : "relay" == t.type && (this.hadLocalRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadLocalIPv6Candidate = !0)
            }, n.prototype._checkRemoteCandidate = function (e) {
                var t = s.toCandidateJSON(e);
                "srflx" == t.type ? this.hadRemoteStunCandidate = !0 : "relay" == t.type && (this.hadRemoteRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadRemoteIPv6Candidate = !0)
            }, n.prototype.processIce = function (e, t) {
                t = t || function () {
                };
                var n = this;
                if (e.contents) {
                    var r = o.pluck(this.remoteDescription.contents, "name"), a = e.contents;
                    a.forEach(function (e) {
                        var t = e.transport || {}, o = t.candidates || [], a = r.indexOf(e.name), c = e.name;
                        o.forEach(function (e) {
                            var t = s.toCandidateSDP(e) + "\r\n";
                            n.pc.addIceCandidate(new i.IceCandidate({
                                candidate: t,
                                sdpMLineIndex: a,
                                sdpMid: c
                            }), function () {
                            }, function (e) {
                                n.emit("error", e)
                            }), n._checkRemoteCandidate(t)
                        })
                    })
                } else 0 !== e.candidate.candidate.indexOf("a=") && (e.candidate.candidate = "a=" + e.candidate.candidate), n.pc.addIceCandidate(new i.IceCandidate(e.candidate), function () {
                }, function (e) {
                    n.emit("error", e)
                }), n._checkRemoteCandidate(e.candidate.candidate);
                t()
            }, n.prototype.offer = function (e, t) {
                var n = this, r = 2 === arguments.length, i = r ? e : {
                    mandatory: {
                        OfferToReceiveAudio: !0,
                        OfferToReceiveVideo: !0
                    }
                };
                t = r ? t : e, t = t || function () {
                }, this.pc.createOffer(function (e) {
                    n.pc.setLocalDescription(e, function () {
                        var r, i = {type: "offer", sdp: e.sdp};
                        n.config.useJingle && (r = s.toSessionJSON(e.sdp, {
                            role: n._role,
                            direction: "outgoing"
                        }), r.sid = n.config.sid, n.localDescription = r, o.each(r.contents, function (e) {
                            var t = e.transport || {};
                            t.ufrag && (n.config.ice[e.name] = {ufrag: t.ufrag, pwd: t.pwd})
                        }), i.jingle = r), i.sdp.split("\r\n").forEach(function (e) {
                            0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
                        }), n.emit("offer", i), t(null, i)
                    }, function (e) {
                        n.emit("error", e), t(e)
                    })
                }, function (e) {
                    n.emit("error", e), t(e)
                }, i)
            }, n.prototype.handleOffer = function (e, t) {
                t = t || function () {
                };
                var n = this;
                e.type = "offer", e.jingle && (this.enableChromeNativeSimulcast && e.jingle.contents.forEach(function (e) {
                    "video" === e.name && (e.description.googConferenceFlag = !0)
                }), e.sdp = s.toSessionSDP(e.jingle, {
                    sid: n.config.sdpSessionID,
                    role: n._role,
                    direction: "incoming"
                }), n.remoteDescription = e.jingle), e.sdp.split("\r\n").forEach(function (e) {
                    0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
                }), n.pc.setRemoteDescription(new i.SessionDescription(e), function () {
                    t()
                }, t)
            }, n.prototype.answerAudioOnly = function (e) {
                var t = {mandatory: {OfferToReceiveAudio: !0, OfferToReceiveVideo: !1}};
                this._answer(t, e)
            }, n.prototype.answerBroadcastOnly = function (e) {
                var t = {mandatory: {OfferToReceiveAudio: !1, OfferToReceiveVideo: !1}};
                this._answer(t, e)
            }, n.prototype.answer = function (e, t) {
                var n = 2 === arguments.length, o = n ? t : e, r = n ? e : {
                    mandatory: {
                        OfferToReceiveAudio: !0,
                        OfferToReceiveVideo: !0
                    }
                };
                this._answer(r, o)
            }, n.prototype.handleAnswer = function (e, t) {
                t = t || function () {
                };
                var n = this;
                e.jingle && (e.sdp = s.toSessionSDP(e.jingle, {
                    sid: n.config.sdpSessionID,
                    role: n._role,
                    direction: "incoming"
                }), n.remoteDescription = e.jingle), e.sdp.split("\r\n").forEach(function (e) {
                    0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
                }), n.pc.setRemoteDescription(new i.SessionDescription(e), function () {
                    t(null)
                }, t)
            }, n.prototype.close = function () {
                this.pc.close(), this._localDataChannels = [], this._remoteDataChannels = [], this.emit("close")
            }, n.prototype._answer = function (e, t) {
                t = t || function () {
                };
                var n = this;
                if (!this.pc.remoteDescription)throw new Error("remoteDescription not set");
                n.pc.createAnswer(function (e) {
                    var o = [];
                    if (n.enableChromeNativeSimulcast && (e.jingle = s.toSessionJSON(e.sdp, {
                            role: n._role,
                            direction: "outoing"
                        }), e.jingle.contents.length >= 2 && "video" === e.jingle.contents[1].name)) {
                        var r = e.jingle.contents[1].description.sourceGroups || [], i = !1;
                        if (r.forEach(function (e) {
                                "SIM" == e.semantics && (i = !0)
                            }), !i && e.jingle.contents[1].description.sources.length) {
                            var a = JSON.parse(JSON.stringify(e.jingle.contents[1].description.sources[0]));
                            a.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].description.sources.push(a), o.push(e.jingle.contents[1].description.sources[0].ssrc), o.push(a.ssrc), r.push({
                                semantics: "SIM",
                                sources: o
                            });
                            var c = JSON.parse(JSON.stringify(a));
                            c.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].description.sources.push(c), r.push({
                                semantics: "FID",
                                sources: [a.ssrc, c.ssrc]
                            }), e.jingle.contents[1].description.sourceGroups = r, e.sdp = s.toSessionSDP(e.jingle, {
                                sid: n.config.sdpSessionID,
                                role: n._role,
                                direction: "outgoing"
                            })
                        }
                    }
                    n.pc.setLocalDescription(e, function () {
                        var o = {type: "answer", sdp: e.sdp};
                        if (n.config.useJingle) {
                            var r = s.toSessionJSON(e.sdp, {role: n._role, direction: "outgoing"});
                            r.sid = n.config.sid, n.localDescription = r, o.jingle = r
                        }
                        if (n.enableChromeNativeSimulcast) {
                            o.jingle || (o.jingle = s.toSessionJSON(e.sdp, {role: n._role, direction: "outgoing"}));
                            {
                                o.jingle.contents[1].description.sourceGroups || []
                            }
                            o.jingle.contents[1].description.sources.forEach(function (e, t) {
                                e.parameters = e.parameters.map(function (e) {
                                    return "msid" === e.key && (e.value += "-" + Math.floor(t / 2)), e
                                })
                            }), o.sdp = s.toSessionSDP(o.jingle, {
                                sid: n.sdpSessionID,
                                role: n._role,
                                direction: "outgoing"
                            })
                        }
                        o.sdp.split("\r\n").forEach(function (e) {
                            0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
                        }), n.emit("answer", o), t(null, o)
                    }, function (e) {
                        n.emit("error", e), t(e)
                    })
                }, function (e) {
                    n.emit("error", e), t(e)
                }, e)
            }, n.prototype._onIce = function (e) {
                var t = this;
                if (e.candidate) {
                    var n = e.candidate, r = {candidate: e.candidate}, i = s.toCandidateJSON(n.candidate);
                    if (t.config.useJingle) {
                        if (n.sdpMid || (n.sdpMid = t.localDescription.contents[n.sdpMLineIndex].name), !t.config.ice[n.sdpMid]) {
                            var a = s.toSessionJSON(t.pc.localDescription.sdp, {role: t._role, direction: "incoming"});
                            o.each(a.contents, function (e) {
                                var n = e.transport || {};
                                n.ufrag && (t.config.ice[e.name] = {ufrag: n.ufrag, pwd: n.pwd})
                            })
                        }
                        r.jingle = {
                            contents: [{
                                name: n.sdpMid,
                                creator: t._role,
                                transport: {
                                    transType: "iceUdp",
                                    ufrag: t.config.ice[n.sdpMid].ufrag,
                                    pwd: t.config.ice[n.sdpMid].pwd,
                                    candidates: [i]
                                }
                            }]
                        }
                    }
                    this._checkLocalCandidate(n.candidate), this.emit("ice", r)
                } else this.emit("endOfCandidates")
            }, n.prototype._onDataChannel = function (e) {
                var t = e.channel;
                this._remoteDataChannels.push(t), this.emit("addChannel", t)
            }, n.prototype._onAddStream = function (e) {
                this.remoteStreams.push(e.stream), this.emit("addStream", e)
            }, n.prototype.createDataChannel = function (e, t) {
                var n = this.pc.createDataChannel(e, t);
                return this._localDataChannels.push(n), n
            }, n.prototype.getStats = function (e) {
                "moz" === i.prefix ? this.pc.getStats(function (t) {
                    var n = [];
                    for (var o in t)"object" == typeof t[o] && n.push(t[o]);
                    e(null, n)
                }, e) : this.pc.getStats(function (t) {
                    var n = [];
                    t.result().forEach(function (e) {
                        var t = {};
                        e.names().forEach(function (n) {
                            t[n] = e.stat(n)
                        }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, n.push(t)
                    }), e(null, n)
                })
            }, t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/rtcpeerconnection.js", "/../node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection")
    }, {
        "1YiZ5S": 6,
        buffer: 2,
        "sdp-jingle-json": 18,
        traceablepeerconnection: 23,
        underscore: 24,
        util: 8,
        webrtcsupport: 28,
        wildemitter: 29
    }],
    26: [function (e, t) {
        (function () {
            function n(e) {
                var t = this;
                this.id = e.id, this.parent = e.parent, this.type = e.type || "video", this.oneway = e.oneway || !1, this.sharemyscreen = e.sharemyscreen || !1, this.browserPrefix = e.prefix, this.stream = e.stream, this.enableDataChannels = void 0 === e.enableDataChannels ? this.parent.config.enableDataChannels : e.enableDataChannels, this.receiveMedia = e.receiveMedia || this.parent.config.receiveMedia, this.channels = {}, this.sid = e.sid || Date.now().toString(), this.pc = new i(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionConstraints), this.pc.on("ice", this.onIceCandidate.bind(this)), this.pc.on("offer", function (e) {
                    t.send("offer", e)
                }), this.pc.on("answer", function (e) {
                    t.send("answer", e)
                }), this.pc.on("addStream", this.handleRemoteStreamAdded.bind(this)), this.pc.on("addChannel", this.handleDataChannelAdded.bind(this)), this.pc.on("removeStream", this.handleStreamRemoved.bind(this)), this.pc.on("negotiationNeeded", this.emit.bind(this, "negotiationNeeded")), this.pc.on("iceConnectionStateChange", this.emit.bind(this, "iceConnectionStateChange")), this.pc.on("iceConnectionStateChange", function () {
                    switch (t.pc.iceConnectionState) {
                        case"failed":
                            "offer" === t.pc.pc.peerconnection.localDescription.type && (t.parent.emit("iceFailed", t), t.send("connectivityError"))
                    }
                }), this.pc.on("signalingStateChange", this.emit.bind(this, "signalingStateChange")), this.logger = this.parent.logger, "screen" === e.type ? this.parent.localScreen && this.sharemyscreen && (this.logger.log("adding local screen stream to peer connection"), this.pc.addStream(this.parent.localScreen), this.broadcaster = e.broadcaster) : this.parent.localStreams.forEach(function (e) {
                    t.pc.addStream(e)
                }), s.call(this), this.on("*", function () {
                    t.parent.emit.apply(t.parent, arguments)
                })
            }

            var o = e("util"), r = e("webrtcsupport"), i = e("rtcpeerconnection"), s = e("wildemitter");
            o.inherits(n, s), n.prototype.handleMessage = function (e) {
                var t = this;
                this.logger.log("getting", e.type, e), e.prefix && (this.browserPrefix = e.prefix), "offer" === e.type ? (e.payload.sdp = e.payload.sdp.replace("a=fmtp:0 profile-level-id=0x42e00c;packetization-mode=1\r\n", ""), this.pc.handleOffer(e.payload, function (e) {
                    e || t.pc.answer(t.receiveMedia, function () {
                    })
                })) : "answer" === e.type ? this.pc.handleAnswer(e.payload) : "candidate" === e.type ? this.pc.processIce(e.payload) : "connectivityError" === e.type ? this.parent.emit("connectivityError", t) : "mute" === e.type ? this.parent.emit("mute", {
                    id: e.from,
                    name: e.payload.name
                }) : "unmute" === e.type && this.parent.emit("unmute", {id: e.from, name: e.payload.name})
            }, n.prototype.send = function (e, t) {
                var n = {
                    to: this.id,
                    sid: this.sid,
                    broadcaster: this.broadcaster,
                    roomType: this.type,
                    type: e,
                    payload: t,
                    prefix: r.prefix
                };
                this.logger.log("sending", e, n), this.parent.emit("message", n)
            }, n.prototype.sendDirectly = function (e, t, n) {
                var o = {type: t, payload: n};
                this.logger.log("sending via datachannel", e, t, o);
                var r = this.getDataChannel(e);
                return "open" != r.readyState ? !1 : (r.send(JSON.stringify(o)), !0)
            }, n.prototype._observeDataChannel = function (e) {
                var t = this;
                e.onclose = this.emit.bind(this, "channelClose", e), e.onerror = this.emit.bind(this, "channelError", e), e.onmessage = function (n) {
                    t.emit("channelMessage", t, e.label, JSON.parse(n.data), e, n)
                }, e.onopen = this.emit.bind(this, "channelOpen", e)
            }, n.prototype.getDataChannel = function (e, t) {
                if (!r.supportDataChannel)return this.emit("error", new Error("createDataChannel not supported"));
                var n = this.channels[e];
                return t || (t = {}), n ? n : (n = this.channels[e] = this.pc.createDataChannel(e, t), this._observeDataChannel(n), n)
            }, n.prototype.onIceCandidate = function (e) {
                this.closed || (e ? this.send("candidate", e) : this.logger.log("End of candidates."))
            }, n.prototype.start = function () {
                this.enableDataChannels && this.getDataChannel("simplewebrtc"), this.pc.offer(this.receiveMedia, function () {
                })
            }, n.prototype.icerestart = function () {
                var e = this.receiveMedia;
                e.mandatory.IceRestart = !0, this.pc.offer(e, function () {
                })
            }, n.prototype.end = function () {
                this.closed || (this.pc.close(), this.handleStreamRemoved())
            }, n.prototype.handleRemoteStreamAdded = function (e) {
                var t = this;
                this.stream ? this.logger.warn("Already have a remote stream") : (this.stream = e.stream, this.stream.onended = function () {
                    t.end()
                }, this.parent.emit("peerStreamAdded", this))
            }, n.prototype.handleStreamRemoved = function () {
                this.parent.peers.splice(this.parent.peers.indexOf(this), 1), this.closed = !0, this.parent.emit("peerStreamRemoved", this)
            }, n.prototype.handleDataChannelAdded = function (e) {
                this.channels[e.label] = e, this._observeDataChannel(e)
            }, t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/peer.js", "/../node_modules/simplewebrtc/node_modules/webrtc")
    }, {"1YiZ5S": 6, buffer: 2, rtcpeerconnection: 25, util: 8, webrtcsupport: 28, wildemitter: 29}],
    27: [function (e, t) {
        (function () {
            function n(e) {
                {
                    var t, n = this, o = e || {};
                    this.config = {
                        debug: !1,
                        peerConnectionConfig: {iceServers: [{url: "stun:stun.l.google.com:19302"}]},
                        peerConnectionConstraints: {optional: [{DtlsSrtpKeyAgreement: !0}]},
                        receiveMedia: {mandatory: {OfferToReceiveAudio: !0, OfferToReceiveVideo: !0}},
                        enableDataChannels: !0
                    }
                }
                this.screenSharingSupport = r.screenSharing, this.logger = function () {
                    return e.debug ? e.logger || console : e.logger || i
                }();
                for (t in o)this.config[t] = o[t];
                r.support || this.logger.error("Your browser doesn't seem to support WebRTC"), this.peers = [], s.call(this, this.config), this.on("speaking", function () {
                    n.hardMuted || n.peers.forEach(function (e) {
                        if (e.enableDataChannels) {
                            var t = e.getDataChannel("hark");
                            if ("open" != t.readyState)return;
                            t.send(JSON.stringify({type: "speaking"}))
                        }
                    })
                }), this.on("stoppedSpeaking", function () {
                    n.hardMuted || n.peers.forEach(function (e) {
                        if (e.enableDataChannels) {
                            var t = e.getDataChannel("hark");
                            if ("open" != t.readyState)return;
                            t.send(JSON.stringify({type: "stoppedSpeaking"}))
                        }
                    })
                }), this.on("volumeChange", function (e) {
                    n.hardMuted || n.peers.forEach(function (t) {
                        if (t.enableDataChannels) {
                            var n = t.getDataChannel("hark");
                            if ("open" != n.readyState)return;
                            n.send(JSON.stringify({type: "volume", volume: e}))
                        }
                    })
                }), this.config.debug && this.on("*", function (e, t, o) {
                    var r;
                    r = n.config.logger === i ? console : n.logger, r.log("event:", e, t, o)
                })
            }

            var o = e("util"), r = e("webrtcsupport"), i = (e("wildemitter"), e("mockconsole")), s = e("localmedia"), a = e("./peer");
            o.inherits(n, s), n.prototype.createPeer = function (e) {
                var t;
                return e.parent = this, t = new a(e), this.peers.push(t), t
            }, n.prototype.removePeers = function (e, t) {
                this.getPeers(e, t).forEach(function (e) {
                    e.end()
                })
            }, n.prototype.getPeers = function (e, t) {
                return this.peers.filter(function (n) {
                    return !(e && n.id !== e || t && n.type !== t)
                })
            }, n.prototype.sendToAll = function (e, t) {
                this.peers.forEach(function (n) {
                    n.send(e, t)
                })
            }, n.prototype.sendDirectlyToAll = function (e, t, n) {
                this.peers.forEach(function (o) {
                    o.enableDataChannels && o.sendDirectly(e, t, n)
                })
            }, t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtc/webrtc.js", "/../node_modules/simplewebrtc/node_modules/webrtc")
    }, {
        "./peer": 26,
        "1YiZ5S": 6,
        buffer: 2,
        localmedia: 12,
        mockconsole: 10,
        util: 8,
        webrtcsupport: 28,
        wildemitter: 29
    }],
    28: [function (e, t) {
        (function () {
            var e;
            window.mozRTCPeerConnection || navigator.mozGetUserMedia ? e = "moz" : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (e = "webkit");
            var n = window.mozRTCPeerConnection || window.webkitRTCPeerConnection, o = window.mozRTCIceCandidate || window.RTCIceCandidate, r = window.mozRTCSessionDescription || window.RTCSessionDescription, i = window.webkitMediaStream || window.MediaStream, s = "https:" === window.location.protocol && (window.navigator.userAgent.match("Chrome") && parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10) >= 26 || window.navigator.userAgent.match("Firefox") && parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10) >= 33), a = window.AudioContext || window.webkitAudioContext, c = "probably" === document.createElement("video").canPlayType('video/webm; codecs="vp8", vorbis'), u = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
            t.exports = {
                support: !!n && c && !!u,
                supportRTCPeerConnection: !!n,
                supportVp8: c,
                supportGetUserMedia: !!u,
                supportDataChannel: !!(n && n.prototype && n.prototype.createDataChannel),
                supportWebAudio: !(!a || !a.prototype.createMediaStreamSource),
                supportMediaStream: !(!i || !i.prototype.removeTrack),
                supportScreenSharing: !!s,
                prefix: e,
                AudioContext: a,
                PeerConnection: n,
                SessionDescription: r,
                IceCandidate: o,
                MediaStream: i,
                getUserMedia: u
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js", "/../node_modules/simplewebrtc/node_modules/webrtcsupport")
    }, {"1YiZ5S": 6, buffer: 2}],
    29: [function (e, t) {
        (function () {
            function e() {
                this.callbacks = {}
            }

            t.exports = e, e.prototype.on = function (e) {
                var t = 3 === arguments.length, n = t ? arguments[1] : void 0, o = t ? arguments[2] : arguments[1];
                return o._groupName = n, (this.callbacks[e] = this.callbacks[e] || []).push(o), this
            }, e.prototype.once = function (e) {
                function t() {
                    n.off(e, t), i.apply(this, arguments)
                }

                var n = this, o = 3 === arguments.length, r = o ? arguments[1] : void 0, i = o ? arguments[2] : arguments[1];
                return this.on(e, r, t), this
            }, e.prototype.releaseGroup = function (e) {
                var t, n, o, r;
                for (t in this.callbacks)for (r = this.callbacks[t], n = 0, o = r.length; o > n; n++)r[n]._groupName === e && (r.splice(n, 1), n--, o--);
                return this
            }, e.prototype.off = function (e, t) {
                var n, o = this.callbacks[e];
                return o ? 1 === arguments.length ? (delete this.callbacks[e], this) : (n = o.indexOf(t), o.splice(n, 1), this) : this
            }, e.prototype.emit = function (e) {
                var t, n, o, r = [].slice.call(arguments, 1), i = this.callbacks[e], s = this.getWildcardCallbacks(e);
                if (i)for (o = i.slice(), t = 0, n = o.length; n > t && o[t]; ++t)o[t].apply(this, r);
                if (s)for (n = s.length, o = s.slice(), t = 0, n = o.length; n > t && o[t]; ++t)o[t].apply(this, [e].concat(r));
                return this
            }, e.prototype.getWildcardCallbacks = function (e) {
                var t, n, o = [];
                for (t in this.callbacks)n = t.split("*"), ("*" === t || 2 === n.length && e.slice(0, n[0].length) === n[0]) && (o = o.concat(this.callbacks[t]));
                return o
            }
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js", "/../node_modules/simplewebrtc/node_modules/wildemitter")
    }, {"1YiZ5S": 6, buffer: 2}],
    30: [function (e, t) {
        (function () {
            function n(e) {
                var t, n, u = this, l = e || {}, d = this.config = {
                    url: "https://signaling.simplewebrtc.com",
                    socketio: {},
                    debug: !1,
                    localVideoEl: "",
                    remoteVideosEl: "",
                    enableDataChannels: !0,
                    autoRequestMedia: !1,
                    autoRemoveVideos: !0,
                    adjustPeerVolume: !0,
                    peerVolumeWhenSpeaking: .25,
                    media: {video: !0, audio: !0},
                    localVideo: {autoplay: !0, mirror: !0, muted: !0}
                };
                this.logger = function () {
                    return e.debug ? e.logger || console : e.logger || a
                }();
                for (t in l)this.config[t] = l[t];
                this.capabilities = i, r.call(this), n = this.connection = c.connect(this.config.url, this.config.socketio), n.on("connect", function () {
                    u.emit("connectionReady", n.socket.sessionid), u.sessionReady = !0, u.testReadiness()
                }), n.on("message", function (e) {
                    var t, n = u.webrtc.getPeers(e.from, e.roomType);
                    "offer" === e.type ? (n.length && n.forEach(function (n) {
                        n.sid == e.sid && (t = n)
                    }), t || (t = u.webrtc.createPeer({
                        id: e.from,
                        sid: e.sid,
                        type: e.roomType,
                        enableDataChannels: u.config.enableDataChannels && "screen" !== e.roomType,
                        sharemyscreen: "screen" === e.roomType && !e.broadcaster,
                        broadcaster: "screen" !== e.roomType || e.broadcaster ? null : u.connection.socket.sessionid
                    }), u.emit("createdPeer", t)), t.handleMessage(e)) : n.length && n.forEach(function (t) {
                        t.sid === e.sid && t.handleMessage(e)
                    })
                }), n.on("remove", function (e) {
                    e.id !== u.connection.socket.sessionid && u.webrtc.removePeers(e.id, e.type)
                }), e.logger = this.logger, e.debug = !1, this.webrtc = new o(e), ["mute", "unmute", "pauseVideo", "resumeVideo", "pause", "resume", "sendToAll", "sendDirectlyToAll"].forEach(function (e) {
                    u[e] = u.webrtc[e].bind(u.webrtc)
                }), this.webrtc.on("*", function () {
                    u.emit.apply(u, arguments)
                }), d.debug && this.on("*", this.logger.log.bind(this.logger, "SimpleWebRTC event:")), this.webrtc.on("localStream", function () {
                    u.testReadiness()
                }), this.webrtc.on("message", function (e) {
                    u.connection.emit("message", e)
                }), this.webrtc.on("peerStreamAdded", this.handlePeerStreamAdded.bind(this)), this.webrtc.on("peerStreamRemoved", this.handlePeerStreamRemoved.bind(this)), this.config.adjustPeerVolume && (this.webrtc.on("speaking", this.setVolumeForAll.bind(this, this.config.peerVolumeWhenSpeaking)), this.webrtc.on("stoppedSpeaking", this.setVolumeForAll.bind(this, 1))), n.on("stunservers", function (e) {
                    u.webrtc.config.peerConnectionConfig.iceServers = e, u.emit("stunservers", e)
                }), n.on("turnservers", function (e) {
                    u.webrtc.config.peerConnectionConfig.iceServers = u.webrtc.config.peerConnectionConfig.iceServers.concat(e), u.emit("turnservers", e)
                }), this.webrtc.on("iceFailed", function () {
                }), this.webrtc.on("connectivityError", function () {
                }), this.webrtc.on("audioOn", function () {
                    u.webrtc.sendToAll("unmute", {name: "audio"})
                }), this.webrtc.on("audioOff", function () {
                    u.webrtc.sendToAll("mute", {name: "audio"})
                }), this.webrtc.on("videoOn", function () {
                    u.webrtc.sendToAll("unmute", {name: "video"})
                }), this.webrtc.on("videoOff", function () {
                    u.webrtc.sendToAll("mute", {name: "video"})
                }), this.webrtc.on("localScreen", function (e) {
                    var t = document.createElement("video"), n = u.getRemoteVideoContainer();
                    t.oncontextmenu = function () {
                        return !1
                    }, t.id = "localScreen", s(e, t), n && n.appendChild(t), u.emit("localScreenAdded", t), u.connection.emit("shareScreen"), u.webrtc.peers.forEach(function (e) {
                        var t;
                        "video" === e.type && (t = u.webrtc.createPeer({
                            id: e.id,
                            type: "screen",
                            sharemyscreen: !0,
                            enableDataChannels: !1,
                            receiveMedia: {mandatory: {OfferToReceiveAudio: !1, OfferToReceiveVideo: !1}},
                            broadcaster: u.connection.socket.sessionid
                        }), u.emit("createdPeer", t), t.start())
                    })
                }), this.webrtc.on("localScreenStopped", function () {
                    u.stopScreenShare()
                }), this.config.autoRequestMedia && this.startLocalVideo()
            }

            var o = e("webrtc"), r = e("wildemitter"), i = e("webrtcsupport"), s = e("attachmediastream"), a = e("mockconsole"), c = e("socket.io-client");
            n.prototype = Object.create(r.prototype, {constructor: {value: n}}), n.prototype.leaveRoom = function () {
                this.roomName && (this.connection.emit("leave"), this.webrtc.peers.forEach(function (e) {
                    e.end()
                }), this.getLocalScreen() && this.stopScreenShare(), this.emit("leftRoom", this.roomName), this.roomName = void 0)
            }, n.prototype.disconnect = function () {
                this.connection.disconnect(), delete this.connection
            }, n.prototype.handlePeerStreamAdded = function (e) {
                var t = this, n = this.getRemoteVideoContainer(), o = s(e.stream);
                e.videoEl = o, o.id = this.getDomId(e), n && n.appendChild(o), this.emit("videoAdded", o, e), window.setTimeout(function () {
                    t.webrtc.isAudioEnabled() || e.send("mute", {name: "audio"}), t.webrtc.isVideoEnabled() || e.send("mute", {name: "video"})
                }, 250)
            }, n.prototype.handlePeerStreamRemoved = function (e) {
                var t = this.getRemoteVideoContainer(), n = e.videoEl;
                this.config.autoRemoveVideos && t && n && t.removeChild(n), n && this.emit("videoRemoved", n, e)
            }, n.prototype.getDomId = function (e) {
                return [e.id, e.type, e.broadcaster ? "broadcasting" : "incoming"].join("_")
            }, n.prototype.setVolumeForAll = function (e) {
                this.webrtc.peers.forEach(function (t) {
                    t.videoEl && (t.videoEl.volume = e)
                })
            }, n.prototype.joinRoom = function (e, t) {
                var n = this;
                this.roomName = e, this.connection.emit("join", e, function (o, r) {
                    if (o)n.emit("error", o); else {
                        var i, s, a, c;
                        for (i in r.clients) {
                            s = r.clients[i];
                            for (a in s)s[a] && (c = n.webrtc.createPeer({
                                id: i,
                                type: a,
                                enableDataChannels: n.config.enableDataChannels && "screen" !== a,
                                receiveMedia: {
                                    mandatory: {
                                        OfferToReceiveAudio: "screen" !== a,
                                        OfferToReceiveVideo: !0
                                    }
                                }
                            }), n.emit("createdPeer", c), c.start())
                        }
                    }
                    t && t(o, r), n.emit("joinedRoom", e)
                })
            }, n.prototype.getEl = function (e) {
                return "string" == typeof e ? document.getElementById(e) : e
            }, n.prototype.startLocalVideo = function () {
                var e = this;
                this.webrtc.startLocalMedia(this.config.media, function (t, n) {
                    t ? e.emit("localMediaError", t) : s(n, e.getLocalVideoContainer(), e.config.localVideo)
                })
            }, n.prototype.stopLocalVideo = function () {
                this.webrtc.stopLocalMedia()
            }, n.prototype.getLocalVideoContainer = function () {
                var e = this.getEl(this.config.localVideoEl);
                if (e && "VIDEO" === e.tagName)return e.oncontextmenu = function () {
                    return !1
                }, e;
                if (e) {
                    var t = document.createElement("video");
                    return t.oncontextmenu = function () {
                        return !1
                    }, e.appendChild(t), t
                }
            }, n.prototype.getRemoteVideoContainer = function () {
                return this.getEl(this.config.remoteVideosEl)
            }, n.prototype.shareScreen = function (e) {
                this.webrtc.startScreenShare(e)
            }, n.prototype.getLocalScreen = function () {
                return this.webrtc.localScreen
            }, n.prototype.stopScreenShare = function () {
                this.connection.emit("unshareScreen");
                var e = document.getElementById("localScreen"), t = this.getRemoteVideoContainer(), n = this.getLocalScreen();
                this.config.autoRemoveVideos && t && e && t.removeChild(e), e && this.emit("videoRemoved", e), n && n.stop(), this.webrtc.peers.forEach(function (e) {
                    e.broadcaster && e.end()
                })
            }, n.prototype.testReadiness = function () {
                var e = this;
                this.webrtc.localStream && this.sessionReady && e.emit("readyToCall", e.connection.socket.sessionid)
            }, n.prototype.createRoom = function (e, t) {
                2 === arguments.length ? this.connection.emit("create", e, t) : this.connection.emit("create", e)
            }, n.prototype.sendFile = function () {
                return i.dataChannel ? void 0 : this.emit("error", new Error("DataChannelNotSupported"))
            }, t.exports = n
        }).call(this, e("1YiZ5S"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../node_modules/simplewebrtc/simplewebrtc.js", "/../node_modules/simplewebrtc")
    }, {
        "1YiZ5S": 6,
        attachmediastream: 9,
        buffer: 2,
        mockconsole: 10,
        "socket.io-client": 11,
        webrtc: 27,
        webrtcsupport: 28,
        wildemitter: 29
    }]
}, {}, [1]);