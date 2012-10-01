if (typeof (jQuery) != "undefined") {
    if (typeof (jQuery.fn.hoverIntent) == "undefined") {
        (function(b) {
            b.fn.hoverIntent = function(p, r) {
                var g = {sensitivity: 7,interval: 100,timeout: 0};
                g = b.extend(g, r ? {over: p,out: r} : p);
                var a, f, t, v;
                var u = function(c) {
                    a = c.pageX;
                    f = c.pageY
                };
                var w = function(c, d) {
                    d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
                    if ((Math.abs(t - a) + Math.abs(v - f)) < g.sensitivity) {
                        b(d).unbind("mousemove", u);
                        d.hoverIntent_s = 1;
                        return g.over.apply(d, [c])
                    } else {
                        t = a;
                        v = f;
                        d.hoverIntent_t = setTimeout(function() {
                            w(c, d)
                        }, g.interval)
                    }
                };
                var s = function(c, d) {
                    d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
                    d.hoverIntent_s = 0;
                    return g.out.apply(d, [c])
                };
                var x = function(e) {
                    var d = this;
                    var c = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
                    while (c && c != this) {
                        try {
                            c = c.parentNode
                        } catch (e) {
                            c = this
                        }
                    }
                    if (c == this) {
                        if (b.browser.mozilla) {
                            if (e.type == "mouseout") {
                                d.mtout = setTimeout(function() {
                                    q(e, d)
                                }, 30)
                            } else {
                                if (d.mtout) {
                                    d.mtout = clearTimeout(d.mtout)
                                }
                            }
                        }
                        return
                    } else {
                        if (d.mtout) {
                            d.mtout = clearTimeout(d.mtout)
                        }
                        q(e, d)
                    }
                };
                var q = function(e, d) {
                    var c = jQuery.extend({}, e);
                    if (d.hoverIntent_t) {
                        d.hoverIntent_t = clearTimeout(d.hoverIntent_t)
                    }
                    if (e.type == "mouseover") {
                        t = c.pageX;
                        v = c.pageY;
                        b(d).bind("mousemove", u);
                        if (d.hoverIntent_s != 1) {
                            d.hoverIntent_t = setTimeout(function() {
                                w(c, d)
                            }, g.interval)
                        }
                    } else {
                        b(d).unbind("mousemove", u);
                        if (d.hoverIntent_s == 1) {
                            d.hoverIntent_t = setTimeout(function() {
                                s(c, d)
                            }, g.timeout)
                        }
                    }
                };
                return this.mouseover(x).mouseout(x)
            }
        })(jQuery)
    }
    jQuery(document).ready(function(b) {
        var a = function(c, e) {
            var f = b(e), d = f.attr("tabindex");
            if (d) {
                f.attr("tabindex", "0").attr("tabindex", d)
            }
        };
        b("#wpadminbar").removeClass("nojq").removeClass("nojs").find("li.menupop").hoverIntent({over: function(c) {
                b(this).addClass("hover")
            },out: function(c) {
                b(this).removeClass("hover")
            },timeout: 180,sensitivity: 7,interval: 100});
        b("#wp-admin-bar-get-shortlink").click(function(c) {
            c.preventDefault();
            b(this).addClass("selected").children(".shortlink-input").blur(function() {
                b(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")
            }).focus().select()
        });
        b("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar", function(f) {
            if (f.which != 13) {
                return
            }
            var d = b(f.target), c = d.closest("ab-sub-wrapper");
            f.stopPropagation();
            f.preventDefault();
            if (!c.length) {
                c = b("#wpadminbar .quicklinks")
            }
            c.find(".menupop").removeClass("hover");
            d.parent().toggleClass("hover");
            d.siblings(".ab-sub-wrapper").find(".ab-item").each(a)
        }).each(a);
        b("#wpadminbar .ab-item").bind("keydown.adminbar", function(d) {
            if (d.which != 27) {
                return
            }
            var c = b(d.target);
            d.stopPropagation();
            d.preventDefault();
            c.closest(".hover").removeClass("hover").children(".ab-item").focus();
            c.siblings(".ab-sub-wrapper").find(".ab-item").each(a)
        });
        b("#wpadminbar").click(function(c) {
            if (c.target.id != "wpadminbar" && c.target.id != "wp-admin-bar-top-secondary") {
                return
            }
            c.preventDefault();
            b("html, body").animate({scrollTop: 0}, "fast")
        })
    })
} else {
    (function(j, l) {
        var e = function(o, n, d) {
            if (o.addEventListener) {
                o.addEventListener(n, d, false)
            } else {
                if (o.attachEvent) {
                    o.attachEvent("on" + n, function() {
                        return d.call(o, window.event)
                    })
                }
            }
        }, f, g = new RegExp("\\bhover\\b", "g"), b = [], k = new RegExp("\\bselected\\b", "g"), h = function(n) {
            var d = b.length;
            while (d--) {
                if (b[d] && n == b[d][1]) {
                    return b[d][0]
                }
            }
            return false
        }, i = function(u) {
            var o, d, r, n, q, s, v = [], p = 0;
            while (u && u != f && u != j) {
                if ("LI" == u.nodeName.toUpperCase()) {
                    v[v.length] = u;
                    d = h(u);
                    if (d) {
                        clearTimeout(d)
                    }
                    u.className = u.className ? (u.className.replace(g, "") + " hover") : "hover";
                    n = u
                }
                u = u.parentNode
            }
            if (n && n.parentNode) {
                q = n.parentNode;
                if (q && "UL" == q.nodeName.toUpperCase()) {
                    o = q.childNodes.length;
                    while (o--) {
                        s = q.childNodes[o];
                        if (s != n) {
                            s.className = s.className ? s.className.replace(k, "") : ""
                        }
                    }
                }
            }
            o = b.length;
            while (o--) {
                r = false;
                p = v.length;
                while (p--) {
                    if (v[p] == b[o][1]) {
                        r = true
                    }
                }
                if (!r) {
                    b[o][1].className = b[o][1].className ? b[o][1].className.replace(g, "") : ""
                }
            }
        }, m = function(d) {
            while (d && d != f && d != j) {
                if ("LI" == d.nodeName.toUpperCase()) {
                    (function(n) {
                        var o = setTimeout(function() {
                            n.className = n.className ? n.className.replace(g, "") : ""
                        }, 500);
                        b[b.length] = [o, n]
                    })(d)
                }
                d = d.parentNode
            }
        }, c = function(q) {
            var o, d, p, n = q.target || q.srcElement;
            while (true) {
                if (!n || n == j || n == f) {
                    return
                }
                if (n.id && n.id == "wp-admin-bar-get-shortlink") {
                    break
                }
                n = n.parentNode
            }
            if (q.preventDefault) {
                q.preventDefault()
            }
            q.returnValue = false;
            if (-1 == n.className.indexOf("selected")) {
                n.className += " selected"
            }
            for (o = 0, d = n.childNodes.length; o < d; o++) {
                p = n.childNodes[o];
                if (p.className && -1 != p.className.indexOf("shortlink-input")) {
                    p.focus();
                    p.select();
                    p.onblur = function() {
                        n.className = n.className ? n.className.replace(k, "") : ""
                    };
                    break
                }
            }
            return false
        }, a = function(n) {
            var s, q, p, d, r, o;
            if (n.id != "wpadminbar" && n.id != "wp-admin-bar-top-secondary") {
                return
            }
            s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (s < 1) {
                return
            }
            o = s > 800 ? 130 : 100;
            q = Math.min(12, Math.round(s / o));
            p = s > 800 ? Math.round(s / 30) : Math.round(s / 20);
            d = [];
            r = 0;
            while (s) {
                s -= p;
                if (s < 0) {
                    s = 0
                }
                d.push(s);
                setTimeout(function() {
                    window.scrollTo(0, d.shift())
                }, r * q);
                r++
            }
        };
        e(l, "load", function() {
            f = j.getElementById("wpadminbar");
            if (j.body && f) {
                j.body.appendChild(f);
                if (f.className) {
                    f.className = f.className.replace(/nojs/, "")
                }
                e(f, "mouseover", function(d) {
                    i(d.target || d.srcElement)
                });
                e(f, "mouseout", function(d) {
                    m(d.target || d.srcElement)
                });
                e(f, "click", c);
                e(f, "click", function(d) {
                    a(d.target || d.srcElement)
                })
            }
            if (l.location.hash) {
                l.scrollBy(0, -32)
            }
        })
    })(document, window)
}
;
(function(a) {
    a.fn.hoverIntent = function(k, j) {
        var l = {sensitivity: 7,interval: 100,timeout: 0};
        l = a.extend(l, j ? {over: k,out: j} : k);
        var n, m, h, d;
        var e = function(f) {
            n = f.pageX;
            m = f.pageY
        };
        var c = function(g, f) {
            f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
            if ((Math.abs(h - n) + Math.abs(d - m)) < l.sensitivity) {
                a(f).unbind("mousemove", e);
                f.hoverIntent_s = 1;
                return l.over.apply(f, [g])
            } else {
                h = n;
                d = m;
                f.hoverIntent_t = setTimeout(function() {
                    c(g, f)
                }, l.interval)
            }
        };
        var i = function(g, f) {
            f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
            f.hoverIntent_s = 0;
            return l.out.apply(f, [g])
        };
        var b = function(o) {
            var g = jQuery.extend({}, o);
            var f = this;
            if (f.hoverIntent_t) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t)
            }
            if (o.type == "mouseenter") {
                h = g.pageX;
                d = g.pageY;
                a(f).bind("mousemove", e);
                if (f.hoverIntent_s != 1) {
                    f.hoverIntent_t = setTimeout(function() {
                        c(g, f)
                    }, l.interval)
                }
            } else {
                a(f).unbind("mousemove", e);
                if (f.hoverIntent_s == 1) {
                    f.hoverIntent_t = setTimeout(function() {
                        i(g, f)
                    }, l.timeout)
                }
            }
        };
        return this.bind("mouseenter", b).bind("mouseleave", b)
    }
})(jQuery);
var showNotice, adminMenu, columns, validateForm, screenMeta;
(function(a) {
    adminMenu = {init: function() {
        },fold: function() {
        },restoreMenuState: function() {
        },toggle: function() {
        },favorites: function() {
        }};
    columns = {init: function() {
            var b = this;
            a(".hide-column-tog", "#adv-settings").click(function() {
                var d = a(this), c = d.val();
                if (d.prop("checked")) {
                    b.checked(c)
                } else {
                    b.unchecked(c)
                }
                columns.saveManageColumnsState()
            })
        },saveManageColumnsState: function() {
            var b = this.hidden();
            a.post(ajaxurl, {action: "hidden-columns",hidden: b,screenoptionnonce: a("#screenoptionnonce").val(),page: pagenow})
        },checked: function(b) {
            a(".column-" + b).show();
            this.colSpanChange(+1)
        },unchecked: function(b) {
            a(".column-" + b).hide();
            this.colSpanChange(-1)
        },hidden: function() {
            return a(".manage-column").filter(":hidden").map(function() {
                return this.id
            }).get().join(",")
        },useCheckboxesForHidden: function() {
            this.hidden = function() {
                return a(".hide-column-tog").not(":checked").map(function() {
                    var b = this.id;
                    return b.substring(b, b.length - 5)
                }).get().join(",")
            }
        },colSpanChange: function(b) {
            var d = a("table").find(".colspanchange"), c;
            if (!d.length) {
                return
            }
            c = parseInt(d.attr("colspan"), 10) + b;
            d.attr("colspan", c.toString())
        }};
    a(document).ready(function() {
        columns.init()
    });
    validateForm = function(b) {
        return !a(b).find(".form-required").filter(function() {
            return a("input:visible", this).val() == ""
        }).addClass("form-invalid").find("input:visible").change(function() {
            a(this).closest(".form-invalid").removeClass("form-invalid")
        }).size()
    };
    showNotice = {warn: function() {
            var b = commonL10n.warnDelete || "";
            if (confirm(b)) {
                return true
            }
            return false
        },note: function(b) {
            alert(b)
        }};
    screenMeta = {element: null,toggles: null,page: null,init: function() {
            this.element = a("#screen-meta");
            this.toggles = a(".screen-meta-toggle a");
            this.page = a("#wpcontent");
            this.toggles.click(this.toggleEvent)
        },toggleEvent: function(c) {
            var b = a(this.href.replace(/.+#/, "#"));
            c.preventDefault();
            if (!b.length) {
                return
            }
            if (b.is(":visible")) {
                screenMeta.close(b, a(this))
            } else {
                screenMeta.open(b, a(this))
            }
        },open: function(b, c) {
            a(".screen-meta-toggle").not(c.parent()).css("visibility", "hidden");
            b.parent().show();
            b.slideDown("fast", function() {
                c.addClass("screen-meta-active")
            })
        },close: function(b, c) {
            b.slideUp("fast", function() {
                c.removeClass("screen-meta-active");
                a(".screen-meta-toggle").css("visibility", "");
                b.parent().hide()
            })
        }};
    a(".contextual-help-tabs").delegate("a", "click focus", function(d) {
        var c = a(this), b;
        d.preventDefault();
        if (c.is(".active a")) {
            return false
        }
        a(".contextual-help-tabs .active").removeClass("active");
        c.parent("li").addClass("active");
        b = a(c.attr("href"));
        a(".help-tab-content").not(b).removeClass("active").hide();
        b.addClass("active").show()
    });
    a(document).ready(function() {
        var i = false, c, e, j, h, b = a("#adminmenu"), d = a("input.current-page"), f = d.val(), g;
        g = function(k, m) {
            var n = a(m), l = n.attr("tabindex");
            if (l) {
                n.attr("tabindex", "0").attr("tabindex", l)
            }
        };
        a("#collapse-menu", b).click(function() {
            var k = a(document.body);
            a("#adminmenu div.wp-submenu").css("margin-top", "");
            if (k.hasClass("folded")) {
                k.removeClass("folded");
                setUserSetting("mfold", "o")
            } else {
                k.addClass("folded");
                setUserSetting("mfold", "f")
            }
            return false
        });
        a("li.wp-has-submenu", b).hoverIntent({over: function(s) {
                var t, q, k, r, l = a(this).find(".wp-submenu"), u, n, p;
                if (l.is(":visible")) {
                    return
                }
                u = a(this).offset().top;
                n = a(window).scrollTop();
                p = u - n - 30;
                t = u + l.height() + 1;
                q = a("#wpwrap").height();
                k = 60 + t - q;
                r = a(window).height() + n - 15;
                if (r < (t - k)) {
                    k = t - r
                }
                if (k > p) {
                    k = p
                }
                if (k > 1) {
                    l.css("margin-top", "-" + k + "px")
                } else {
                    l.css("margin-top", "")
                }
                b.find(".wp-submenu").removeClass("sub-open");
                l.addClass("sub-open")
            },out: function() {
                a(this).find(".wp-submenu").removeClass("sub-open").css("margin-top", "")
            },timeout: 200,sensitivity: 7,interval: 90});
        a("li.wp-has-submenu > a.wp-not-current-submenu", b).bind("keydown.adminmenu", function(l) {
            if (l.which != 13) {
                return
            }
            var k = a(l.target);
            l.stopPropagation();
            l.preventDefault();
            b.find(".wp-submenu").removeClass("sub-open");
            k.siblings(".wp-submenu").toggleClass("sub-open").find('a[role="menuitem"]').each(g)
        }).each(g);
        a('a[role="menuitem"]', b).bind("keydown.adminmenu", function(l) {
            if (l.which != 27) {
                return
            }
            var k = a(l.target);
            l.stopPropagation();
            l.preventDefault();
            k.add(k.siblings()).closest(".sub-open").removeClass("sub-open").siblings("a.wp-not-current-submenu").focus()
        });
        a("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");
        a("div.updated, div.error").not(".below-h2, .inline").insertAfter(a("div.wrap h2:first"));
        screenMeta.init();
        a("tbody").children().children(".check-column").find(":checkbox").click(function(k) {
            if ("undefined" == k.shiftKey) {
                return true
            }
            if (k.shiftKey) {
                if (!i) {
                    return true
                }
                c = a(i).closest("form").find(":checkbox");
                e = c.index(i);
                j = c.index(this);
                h = a(this).prop("checked");
                if (0 < e && 0 < j && e != j) {
                    c.slice(e, j).prop("checked", function() {
                        if (a(this).closest("tr").is(":visible")) {
                            return h
                        }
                        return false
                    })
                }
            }
            i = this;
            return true
        });
        a("thead, tfoot").find(".check-column :checkbox").click(function(m) {
            var n = a(this).prop("checked"), l = "undefined" == typeof toggleWithKeyboard ? false : toggleWithKeyboard, k = m.shiftKey || l;
            a(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function() {
                if (a(this).closest("tr").is(":hidden")) {
                    return false
                }
                if (k) {
                    return a(this).prop("checked")
                } else {
                    if (n) {
                        return true
                    }
                }
                return false
            });
            a(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function() {
                if (k) {
                    return false
                } else {
                    if (n) {
                        return true
                    }
                }
                return false
            })
        });
        a("#default-password-nag-no").click(function() {
            setUserSetting("default_password_nag", "hide");
            a("div.default-password-nag").hide();
            return false
        });
        a("#newcontent").bind("keydown.wpevent_InsertTab", function(p) {
            if (p.keyCode != 9) {
                return true
            }
            var m = p.target, r = m.selectionStart, l = m.selectionEnd, q = m.value, k, o;
            try {
                this.lastKey = 9
            } catch (n) {
            }
            if (document.selection) {
                m.focus();
                o = document.selection.createRange();
                o.text = "\t"
            } else {
                if (r >= 0) {
                    k = this.scrollTop;
                    m.value = q.substring(0, r).concat("\t", q.substring(l));
                    m.selectionStart = m.selectionEnd = r + 1;
                    this.scrollTop = k
                }
            }
            if (p.stopPropagation) {
                p.stopPropagation()
            }
            if (p.preventDefault) {
                p.preventDefault()
            }
        });
        a("#newcontent").bind("blur.wpevent_InsertTab", function(k) {
            if (this.lastKey && 9 == this.lastKey) {
                this.focus()
            }
        });
        if (d.length) {
            d.closest("form").submit(function(k) {
                if (a('select[name="action"]').val() == -1 && a('select[name="action2"]').val() == -1 && d.val() == f) {
                    d.val("1")
                }
            })
        }
    });
    a(document).bind("wp_CloseOnEscape", function(c, b) {
        if (typeof (b.cb) != "function") {
            return
        }
        if (typeof (b.condition) != "function" || b.condition()) {
            b.cb()
        }
        return true
    })
})(jQuery);
(function(d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(f, e) {
        d.fx.step[e] = function(g) {
            if (g.state == 0) {
                g.start = c(g.elem, e);
                g.end = b(g.end)
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });
    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }
    function c(g, e) {
        var f;
        do {
            f = d.curCSS(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {aqua: [0, 255, 255],azure: [240, 255, 255],beige: [245, 245, 220],black: [0, 0, 0],blue: [0, 0, 255],brown: [165, 42, 42],cyan: [0, 255, 255],darkblue: [0, 0, 139],darkcyan: [0, 139, 139],darkgrey: [169, 169, 169],darkgreen: [0, 100, 0],darkkhaki: [189, 183, 107],darkmagenta: [139, 0, 139],darkolivegreen: [85, 107, 47],darkorange: [255, 140, 0],darkorchid: [153, 50, 204],darkred: [139, 0, 0],darksalmon: [233, 150, 122],darkviolet: [148, 0, 211],fuchsia: [255, 0, 255],gold: [255, 215, 0],green: [0, 128, 0],indigo: [75, 0, 130],khaki: [240, 230, 140],lightblue: [173, 216, 230],lightcyan: [224, 255, 255],lightgreen: [144, 238, 144],lightgrey: [211, 211, 211],lightpink: [255, 182, 193],lightyellow: [255, 255, 224],lime: [0, 255, 0],magenta: [255, 0, 255],maroon: [128, 0, 0],navy: [0, 0, 128],olive: [128, 128, 0],orange: [255, 165, 0],pink: [255, 192, 203],purple: [128, 0, 128],violet: [128, 0, 128],red: [255, 0, 0],silver: [192, 192, 192],white: [255, 255, 255],yellow: [255, 255, 0],transparent: [255, 255, 255]}
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode, g = f.name, h;
            return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h))
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }
    function d(b) {
        return !a(b).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.ui = a.ui || {};
    if (a.ui.version)
        return;
    a.extend(a.ui, {version: "1.8.20",keyCode: {ALT: 18,BACKSPACE: 8,CAPS_LOCK: 20,COMMA: 188,COMMAND: 91,COMMAND_LEFT: 91,COMMAND_RIGHT: 93,CONTROL: 17,DELETE: 46,DOWN: 40,END: 35,ENTER: 13,ESCAPE: 27,HOME: 36,INSERT: 45,LEFT: 37,MENU: 93,NUMPAD_ADD: 107,NUMPAD_DECIMAL: 110,NUMPAD_DIVIDE: 111,NUMPAD_ENTER: 108,NUMPAD_MULTIPLY: 106,NUMPAD_SUBTRACT: 109,PAGE_DOWN: 34,PAGE_UP: 33,PERIOD: 190,RIGHT: 39,SHIFT: 16,SPACE: 32,TAB: 9,UP: 38,WINDOWS: 91}}), a.fn.extend({propAttr: a.fn.prop || a.fn.attr,_focus: a.fn.focus,focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },scrollParent: function() {
            var b;
            return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },zIndex: function(c) {
            if (c !== b)
                return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]), e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0)
                            return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }}), a.each(["Width", "Height"], function(c, d) {
        function h(b, c, d, f) {
            return a.each(e, function() {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            }), c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = {innerWidth: a.fn.innerWidth,innerHeight: a.fn.innerHeight,outerWidth: a.fn.outerWidth,outerHeight: a.fn.outerHeight};
        a.fn["inner" + d] = function(c) {
            return c === b ? g["inner" + d].call(this) : this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function(b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {data: function(b, c, d) {
            return !!a.data(b, d[3])
        },focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },tabbable: function(b) {
            var d = a.attr(b, "tabindex"), e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }}), a(function() {
        var b = document.body, c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {minHeight: "100px",height: "auto",padding: 0,borderWidth: 0}), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {plugin: {add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d)
                    e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
            },call: function(a, b, c) {
                var d = a.plugins[b];
                if (!d || !a.element[0].parentNode)
                    return;
                for (var e = 0; e < d.length; e++)
                    a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }},contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden")
                return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }})
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(b) {
            for (var d = 0, e; (e = b[d]) != null; d++)
                try {
                    a(e).triggerHandler("remove")
                } catch (f) {
                }
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function(b, c) {
            return this.each(function() {
                return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {
                    }
                }), d.call(a(this), b, c)
            })
        }
    }
    a.widget = function(b, c, d) {
        var e = b.split(".")[0], f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
            return !!a.data(c, b)
        }, a[e] = a[e] || {}, a[e][b] = function(a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {namespace: e,widgetName: b,widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,widgetBaseClass: f}, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function(c, d) {
        a.fn[c] = function(e) {
            var f = typeof e == "string", g = Array.prototype.slice.call(arguments, 1), h = this;
            return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function() {
                var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b)
                    return h = f, !1
            }) : this.each(function() {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            }), h)
        }
    }, a.Widget = function(a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {widgetName: "widget",widgetEventPrefix: "",options: {disabled: !1},_createWidget: function(b, c) {
            a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },_getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },_create: function() {
        },_init: function() {
        },destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },widget: function() {
            return this.element
        },option: function(c, d) {
            var e = c;
            if (arguments.length === 0)
                return a.extend({}, this.options);
            if (typeof c == "string") {
                if (d === b)
                    return this.options[c];
                e = {}, e[c] = d
            }
            return this._setOptions(e), this
        },_setOptions: function(b) {
            var c = this;
            return a.each(b, function(a, b) {
                c._setOption(a, b)
            }), this
        },_setOption: function(a, b) {
            return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
        },enable: function() {
            return this._setOption("disabled", !1)
        },disable: function() {
            return this._setOption("disabled", !0)
        },_trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)
                for (e in f)
                    e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }}
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }), a.widget("ui.mouse", {options: {cancel: ":input,option",distance: 1,delay: 0},_mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent"))
                    return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
            }), this.started = !1
        },_mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },_mouseDown: function(b) {
            if (c)
                return;
            this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
            var d = this, e = b.which == 1, f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
            if (!e || f || !this._mouseCapture(b))
                return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                d.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = this._mouseStart(b) !== !1;
                if (!this._mouseStarted)
                    return b.preventDefault(), !0
            }
            return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                return d._mouseMove(a)
            }, this._mouseUpDelegate = function(a) {
                return d._mouseUp(a)
            }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
        },_mouseMove: function(b) {
            return !a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },_mouseUp: function(b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
        },_mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },_mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },_mouseStart: function(a) {
        },_mouseDrag: function(a) {
        },_mouseStop: function(a) {
        },_mouseCapture: function(a) {
            return !0
        }})
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.widget("ui.sortable", a.ui.mouse, {widgetEventPrefix: "sort",ready: !1,options: {appendTo: "parent",axis: !1,connectWith: !1,containment: !1,cursor: "auto",cursorAt: !1,dropOnEmpty: !0,forcePlaceholderSize: !1,forceHelperSize: !1,grid: !1,handle: !1,helper: "original",items: "> *",opacity: !1,placeholder: !1,revert: !1,scroll: !0,scrollSensitivity: 20,scrollSpeed: 20,scope: "default",tolerance: "intersect",zIndex: 1e3},_create: function() {
            var a = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },destroy: function() {
            a.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--)
                this.items[b].item.removeData(this.widgetName + "-item");
            return this
        },_setOption: function(b, c) {
            b === "disabled" ? (this.options[b] = c, this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")) : a.Widget.prototype._setOption.apply(this, arguments)
        },_mouseCapture: function(b, c) {
            var d = this;
            if (this.reverting)
                return !1;
            if (this.options.disabled || this.options.type == "static")
                return !1;
            this._refreshItems(b);
            var e = null, f = this, g = a(b.target).parents().each(function() {
                if (a.data(this, d.widgetName + "-item") == f)
                    return e = a(this), !1
            });
            a.data(b.target, d.widgetName + "-item") == f && (e = a(b.target));
            if (!e)
                return !1;
            if (this.options.handle && !c) {
                var h = !1;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    this == b.target && (h = !0)
                });
                if (!h)
                    return !1
            }
            return this.currentItem = e, this._removeCurrentsFromItems(), !0
        },_mouseStart: function(b, c, d) {
            var e = this.options, f = this;
            this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), a.extend(this.offset, {click: {left: b.pageX - this.offset.left,top: b.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()}), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0],parent: this.currentItem.parent()[0]}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), e.containment && this._setContainment(), e.cursor && (a("body").css("cursor") && (this._storedCursor = a("body").css("cursor")), a("body").css("cursor", e.cursor)), e.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", e.opacity)), e.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", e.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
            if (!d)
                for (var g = this.containers.length - 1; g >= 0; g--)
                    this.containers[g]._trigger("activate", b, f._uiHash(this));
            return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
        },_mouseDrag: function(b) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            if (this.options.scroll) {
                var c = this.options, d = !1;
                this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < c.scrollSensitivity ? this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + c.scrollSpeed : b.pageY - this.overflowOffset.top < c.scrollSensitivity && (this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - c.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < c.scrollSensitivity ? this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + c.scrollSpeed : b.pageX - this.overflowOffset.left < c.scrollSensitivity && (this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - c.scrollSpeed)) : (b.pageY - a(document).scrollTop() < c.scrollSensitivity ? d = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < c.scrollSensitivity && (d = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed)), b.pageX - a(document).scrollLeft() < c.scrollSensitivity ? d = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < c.scrollSensitivity && (d = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed))), d !== !1 && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y")
                this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")
                this.helper[0].style.top = this.position.top + "px";
            for (var e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e], g = f.item[0], h = this._intersectsWithPointer(f);
                if (!h)
                    continue;
                if (g != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != g && !a.ui.contains(this.placeholder[0], g) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], g) : !0)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(f))
                        this._rearrange(b, f);
                    else
                        break;
                    this._trigger("change", b, this._uiHash());
                    break
                }
            }
            return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },_mouseStop: function(b, c) {
            if (!b)
                return;
            a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
            if (this.options.revert) {
                var d = this, e = d.placeholder.offset();
                d.reverting = !0, a(this.helper).animate({left: e.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),top: e.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
                    d._clear(b)
                })
            } else
                this._clear(b, c);
            return !1
        },cancel: function() {
            var b = this;
            if (this.dragging) {
                this._mouseUp({target: null}), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var c = this.containers.length - 1; c >= 0; c--)
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this)), this.containers[c].containerCache.over && (this.containers[c]._trigger("out", null, b._uiHash(this)), this.containers[c].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {helper: null,dragging: !1,reverting: !1,_noFinalSort: null}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
        },serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            return b = b || {}, a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }), !d.length && b.key && d.push(b.key + "="), d.join("&")
        },toArray: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected), d = [];
            return b = b || {}, c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            }), d
        },_intersectsWith: function(a) {
            var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = d + j > h && d + j < i && b + k > f && b + k < g;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? l : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },_intersectsWithPointer: function(b) {
            var c = this.options.axis === "x" || a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top, b.height), d = this.options.axis === "y" || a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left, b.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
            return e ? this.floating ? g && g == "right" || f == "down" ? 2 : 1 : f && (f == "down" ? 2 : 1) : !1
        },_intersectsWithSides: function(b) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, b.top + b.height / 2, b.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, b.left + b.width / 2, b.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && d || f == "left" && !d : e && (e == "down" && c || e == "up" && !c)
        },_getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down" : "up")
        },_getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right" : "left")
        },refresh: function(a) {
            return this._refreshItems(a), this.refreshPositions(), this
        },_connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },_getItemsAsjQuery: function(b) {
            var c = this, d = [], e = [], f = this._connectWith();
            if (f && b)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element) : a(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
                    }
                }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options,item: this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var g = e.length - 1; g >= 0; g--)
                e[g][0].each(function() {
                    d.push(this)
                });
            return a(d)
        },_removeCurrentsFromItems: function() {
            var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
            for (var b = 0; b < this.items.length; b++)
                for (var c = 0; c < a.length; c++)
                    a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },_refreshItems: function(b) {
            this.items = [], this.containers = [this];
            var c = this.items, d = this, e = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]], f = this._connectWith();
            if (f && this.ready)
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = a(f[g]);
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = a.data(h[i], this.widgetName);
                        j && j != this && !j.options.disabled && (e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], b, {item: this.currentItem}) : a(j.options.items, j.element), j]), this.containers.push(j))
                    }
                }
            for (var g = e.length - 1; g >= 0; g--) {
                var k = e[g][1], l = e[g][0];
                for (var i = 0, m = l.length; i < m; i++) {
                    var n = a(l[i]);
                    n.data(this.widgetName + "-item", k), c.push({item: n,instance: k,width: 0,height: 0,left: 0,top: 0})
                }
            }
        },refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var c = this.items.length - 1; c >= 0; c--) {
                var d = this.items[c];
                if (d.instance != this.currentContainer && this.currentContainer && d.item[0] != this.currentItem[0])
                    continue;
                var e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item;
                b || (d.width = e.outerWidth(), d.height = e.outerHeight());
                var f = e.offset();
                d.left = f.left, d.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    var f = this.containers[c].element.offset();
                    this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
                }
            return this
        },_createPlaceholder: function(b) {
            var c = b || this, d = c.options;
            if (!d.placeholder || d.placeholder.constructor == String) {
                var e = d.placeholder;
                d.placeholder = {element: function() {
                        var b = a(document.createElement(c.currentItem[0].nodeName)).addClass(e || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        return e || (b.style.visibility = "hidden"), b
                    },update: function(a, b) {
                        if (e && !d.forcePlaceholderSize)
                            return;
                        b.height() || b.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10)), b.width() || b.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10))
                    }}
            }
            c.placeholder = a(d.placeholder.element.call(c.element, c.currentItem)), c.currentItem.after(c.placeholder), d.placeholder.update(c, c.placeholder)
        },_contactContainers: function(b) {
            var c = null, d = null;
            for (var e = this.containers.length - 1; e >= 0; e--) {
                if (a.ui.contains(this.currentItem[0], this.containers[e].element[0]))
                    continue;
                if (this._intersectsWith(this.containers[e].containerCache)) {
                    if (c && a.ui.contains(this.containers[e].element[0], c.element[0]))
                        continue;
                    c = this.containers[e], d = e
                } else
                    this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            if (!c)
                return;
            if (this.containers.length === 1)
                this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1;
            else if (this.currentContainer != this.containers[d]) {
                var f = 1e4, g = null, h = this.positionAbs[this.containers[d].floating ? "left" : "top"];
                for (var i = this.items.length - 1; i >= 0; i--) {
                    if (!a.ui.contains(this.containers[d].element[0], this.items[i].item[0]))
                        continue;
                    var j = this.items[i][this.containers[d].floating ? "left" : "top"];
                    Math.abs(j - h) < f && (f = Math.abs(j - h), g = this.items[i])
                }
                if (!g && !this.options.dropOnEmpty)
                    return;
                this.currentContainer = this.containers[d], g ? this._rearrange(b, g, null, !0) : this._rearrange(b, null, this.containers[d].element, !0), this._trigger("change", b, this._uiHash()), this.containers[d]._trigger("change", b, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", b, this._uiHash(this)), this.containers[d].containerCache.over = 1
            }
        },_createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            return d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] == this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width,height: this.currentItem[0].style.height,position: this.currentItem.css("position"),top: this.currentItem.css("top"),left: this.currentItem.css("left")}), (d[0].style.width == "" || c.forceHelperSize) && d.width(this.currentItem.width()), (d[0].style.height == "" || c.forceHelperSize) && d.height(this.currentItem.height()), d
        },_adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0],top: +b[1] || 0}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)
                b = {top: 0,left: 0};
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return {top: 0,left: 0}
        },_cacheMargins: function() {
            this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window")
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment)) {
                var c = a(b.containment)[0], d = a(b.containment).offset(), e = a(c).css("overflow") != "hidden";
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },_convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
            return {top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
        },_generatePosition: function(b) {
            var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName);
            this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            var f = b.pageX, g = b.pageY;
            if (this.originalPosition) {
                this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top));
                if (c.grid) {
                    var h = this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1];
                    g = this.containment ? h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3] ? h - this.offset.click.top < this.containment[1] ? h + c.grid[1] : h - c.grid[1] : h : h;
                    var i = this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0];
                    f = this.containment ? i - this.offset.click.left < this.containment[0] || i - this.offset.click.left > this.containment[2] ? i - this.offset.click.left < this.containment[0] ? i + c.grid[0] : i - c.grid[0] : i : i
                }
            }
            return {top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
        },_rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var e = this, f = this.counter;
            window.setTimeout(function() {
                f == e.counter && e.refreshPositions(!d)
            }, 0)
        },_clear: function(b, c) {
            this.reverting = !1;
            var d = [], e = this;
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var f in this._storedCSS)
                    if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static")
                        this._storedCSS[f] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            this.fromOutside && !c && d.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c && d.push(function(a) {
                this._trigger("update", a, this._uiHash())
            });
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                c || d.push(function(a) {
                    this._trigger("remove", a, this._uiHash())
                });
                for (var f = this.containers.length - 1; f >= 0; f--)
                    a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !c && (d.push(function(a) {
                        return function(b) {
                            a._trigger("receive", b, this._uiHash(this))
                        }
                    }.call(this, this.containers[f])), d.push(function(a) {
                        return function(b) {
                            a._trigger("update", b, this._uiHash(this))
                        }
                    }.call(this, this.containers[f])))
            }
            for (var f = this.containers.length - 1; f >= 0; f--)
                c || d.push(function(a) {
                    return function(b) {
                        a._trigger("deactivate", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over && (d.push(function(a) {
                    return function(b) {
                        a._trigger("out", b, this._uiHash(this))
                    }
                }.call(this, this.containers[f])), this.containers[f].containerCache.over = 0);
            this._storedCursor && a("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop", b, this._uiHash());
                    for (var f = 0; f < d.length; f++)
                        d[f].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return !1
            }
            c || this._trigger("beforeStop", b, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
            if (!c) {
                for (var f = 0; f < d.length; f++)
                    d[f].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },_trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },_uiHash: function(b) {
            var c = b || this;
            return {helper: c.helper,placeholder: c.placeholder || a([]),position: c.position,originalPosition: c.originalPosition,offset: c.positionAbs,item: c.currentItem,sender: b ? b.element : null}
        }}), a.extend(a.ui.sortable, {version: "1.8.20"})
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {widgetEventPrefix: "drag",options: {addClasses: !0,appendTo: "parent",axis: !1,connectToSortable: !1,containment: !1,cursor: "auto",cursorAt: !1,grid: !1,handle: !1,helper: "original",iframeFix: !1,opacity: !1,refreshPositions: !1,revert: !1,revertDuration: 500,scope: "default",scroll: !0,scrollSensitivity: 20,scrollSpeed: 20,snap: !1,snapMode: "both",snapTolerance: 20,stack: !1,zIndex: !1},_create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },destroy: function() {
            if (!this.element.data("draggable"))
                return;
            return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },_mouseCapture: function(b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width: this.offsetWidth + "px",height: this.offsetHeight + "px",position: "absolute",opacity: "0.001",zIndex: 1e3}).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },_mouseStart: function(b) {
            var c = this.options;
            return this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left}, a.extend(this.offset, {click: {left: b.pageX - this.offset.left,top: b.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
        },_mouseDrag: function(b, c) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1)
                    return this._mouseUp({}), !1;
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y")
                this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")
                this.helper[0].style.top = this.position.top + "px";
            return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
        },_mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
            var d = this.element[0], e = !1;
            while (d && (d = d.parentNode))
                d == document && (e = !0);
            if (!e && this.options.helper === "original")
                return !1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var f = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    f._trigger("stop", b) !== !1 && f._clear()
                })
            } else
                this._trigger("stop", b) !== !1 && this._clear();
            return !1
        },_mouseUp: function(b) {
            return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
        },cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },_getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
            return a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            }), c
        },_createHelper: function(b) {
            var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
        },_adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0],top: +b[1] || 0}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)
                b = {top: 0,left: 0};
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return {top: 0,left: 0}
        },_cacheMargins: function() {
            this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0,top: parseInt(this.element.css("marginTop"), 10) || 0,right: parseInt(this.element.css("marginRight"), 10) || 0,bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window")
                this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment), d = c[0];
                if (!d)
                    return;
                var e = c.offset(), f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            } else
                b.containment.constructor == Array && (this.containment = b.containment)
        },_convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1, e = this.options, f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = /(html|body)/i.test(f[0].tagName);
            return {top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)}
        },_generatePosition: function(b) {
            var c = this.options, d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, e = /(html|body)/i.test(d[0].tagName), f = b.pageX, g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else
                        h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                }
            }
            return {top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())}
        },_clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },_trigger: function(b, c, d) {
            return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
        },plugins: {},_uiHash: function(a) {
            return {helper: this.helper,position: this.position,originalPosition: this.originalPosition,offset: this.positionAbs}
        }}), a.extend(a.ui.draggable, {version: "1.8.20"}), a.ui.plugin.add("draggable", "connectToSortable", {start: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = a.extend({}, c, {item: d.element});
            d.sortables = [], a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({instance: c,shouldRevert: c.options.revert}), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },stop: function(b, c) {
            var d = a(this).data("draggable"), e = a.extend({}, c, {item: d.element});
            a.each(d.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({top: "auto",left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = this, f = function(b) {
                var c = this.offset.click.top, d = this.offset.click.left, e = this.positionAbs.top, f = this.positionAbs.left, g = b.height, h = b.width, i = b.top, j = b.left;
                return a.ui.isOver(e + c, f + d, i, j, g, h)
            };
            a.each(d.sortables, function(f) {
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }}), a.ui.plugin.add("draggable", "cursor", {start: function(b, c) {
            var d = a("body"), e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }}), a.ui.plugin.add("draggable", "opacity", {start: function(b, c) {
            var d = a(c.helper), e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }}), a.ui.plugin.add("draggable", "scroll", {start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x")
                    d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y")
                    d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x")
                    b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y")
                    b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }}), a.ui.plugin.add("draggable", "snap", {start: function(b, c) {
            var d = a(this).data("draggable"), e = d.options;
            d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
                var b = a(this), c = b.offset();
                this != d.element[0] && d.snapElements.push({item: this,width: b.outerWidth(),height: b.outerHeight(),top: c.top,left: c.left})
            })
        },drag: function(b, c) {
            var d = a(this).data("draggable"), e = d.options, f = e.snapTolerance, g = c.offset.left, h = g + d.helperProportions.width, i = c.offset.top, j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left, m = l + d.snapElements[k].width, n = d.snapElements[k].top, o = n + d.snapElements[k].height;
                if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f, q = Math.abs(o - i) <= f, r = Math.abs(l - h) <= f, s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {top: n - d.helperProportions.height,left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o,left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0,left: l - d.helperProportions.width}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0,left: m}).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f, q = Math.abs(o - j) <= f, r = Math.abs(l - g) <= f, s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {top: n,left: 0}).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {top: o - d.helperProportions.height,left: 0}).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {top: 0,left: l}).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {top: 0,left: m - d.helperProportions.width}).left - d.margins.left)
                }
                !d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {snapItem: d.snapElements[k].item})), d.snapElements[k].snapping = p || q || r || s || t
            }
        }}), a.ui.plugin.add("draggable", "stack", {start: function(b, c) {
            var d = a(this).data("draggable").options, e = a.makeArray(a(d.stack)).sort(function(b, c) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
            });
            if (!e.length)
                return;
            var f = parseInt(e[0].style.zIndex) || 0;
            a(e).each(function(a) {
                this.style.zIndex = f + a
            }), this[0].style.zIndex = f + e.length
        }}), a.ui.plugin.add("draggable", "zIndex", {start: function(b, c) {
            var d = a(c.helper), e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }})
})(jQuery);
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.widget("ui.droppable", {widgetEventPrefix: "drop",options: {accept: "*",activeClass: !1,addClasses: !0,greedy: !1,hoverClass: !1,scope: "default",tolerance: "intersect"},_create: function() {
            var b = this.options, c = b.accept;
            this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }, this.proportions = {width: this.element[0].offsetWidth,height: this.element[0].offsetHeight}, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
        },destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++)
                b[c] == this && b.splice(c, 1);
            return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
        },_setOption: function(b, c) {
            b == "accept" && (this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },_activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
        },_deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
        },_over: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0])
                return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
        },_out: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0])
                return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },_drop: function(b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0])
                return !1;
            var e = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {offset: b.element.offset()}), b.options.tolerance))
                    return e = !0, !1
            }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
        },ui: function(a) {
            return {draggable: a.currentItem || a.element,helper: a.helper,position: a.position,offset: a.positionAbs}
        }}), a.extend(a.ui.droppable, {version: "1.8.20"}), a.ui.intersect = function(b, c, d) {
        if (!c.offset)
            return !1;
        var e = (b.positionAbs || b.position.absolute).left, f = e + b.helperProportions.width, g = (b.positionAbs || b.position.absolute).top, h = g + b.helperProportions.height, i = c.offset.left, j = i + c.proportions.width, k = c.offset.top, l = k + c.proportions.height;
        switch (d) {
            case "fit":
                return i <= e && f <= j && k <= g && h <= l;
            case "intersect":
                return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
            case "pointer":
                var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
                return o;
            case "touch":
                return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
            default:
                return !1
        }
    }, a.ui.ddmanager = {current: null,droppables: {"default": []},prepareOffsets: function(b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [], e = c ? c.type : null, f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            g: for (var h = 0; h < d.length; h++) {
                if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element))
                    continue;
                for (var i = 0; i < f.length; i++)
                    if (f[i] == d[h].element[0]) {
                        d[h].proportions.height = 0;
                        continue g
                    }
                d[h].visible = d[h].element.css("display") != "none";
                if (!d[h].visible)
                    continue;
                e == "mousedown" && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {width: d[h].element[0].offsetWidth,height: d[h].element[0].offsetHeight}
            }
        },drop: function(b, c) {
            var d = !1;
            return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!this.options)
                    return;
                !this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
            }), d
        },dragStart: function(b, c) {
            b.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible)
                    return;
                var d = a.ui.intersect(b, this, this.options.tolerance), e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
                if (!e)
                    return;
                var f;
                if (this.options.greedy) {
                    var g = this.element.parents(":data(droppable):eq(0)");
                    g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
                }
                f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
            })
        },dragStop: function(b, c) {
            b.element.parents(":not(body,html)").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }}
})(jQuery);
var wpWidgets;
(function(a) {
    wpWidgets = {init: function() {
            var f, d = a("div.widgets-sortables"), c = !!("undefined" != typeof isRtl && isRtl), e = (isRtl ? "marginRight" : "marginLeft"), b;
            a("#widgets-right").children(".widgets-holder-wrap").children(".sidebar-name").click(function() {
                var h = a(this).siblings(".widgets-sortables"), g = a(this).parent();
                if (!g.hasClass("closed")) {
                    h.sortable("disable");
                    g.addClass("closed")
                } else {
                    g.removeClass("closed");
                    h.sortable("enable").sortable("refresh")
                }
            });
            a("#widgets-left").children(".widgets-holder-wrap").children(".sidebar-name").click(function() {
                a(this).parent().toggleClass("closed")
            });
            d.each(function() {
                if (a(this).parent().hasClass("inactive")) {
                    return true
                }
                var i = 50, g = a(this).children(".widget").length;
                i = i + parseInt(g * 48, 10);
                a(this).css("minHeight", i + "px")
            });
            a("a.widget-action").live("click", function() {
                var i = {}, j = a(this).closest("div.widget"), g = j.children(".widget-inside"), h = parseInt(j.find("input.widget-width").val(), 10);
                if (g.is(":hidden")) {
                    if (h > 250 && g.closest("div.widgets-sortables").length) {
                        i.width = h + 30 + "px";
                        if (g.closest("div.widget-liquid-right").length) {
                            i[e] = 235 - h + "px"
                        }
                        j.css(i)
                    }
                    wpWidgets.fixLabels(j);
                    g.slideDown("fast")
                } else {
                    g.slideUp("fast", function() {
                        j.css({width: "",margin: ""})
                    })
                }
                return false
            });
            a("input.widget-control-save").live("click", function() {
                wpWidgets.save(a(this).closest("div.widget"), 0, 1, 0);
                return false
            });
            a("a.widget-control-remove").live("click", function() {
                wpWidgets.save(a(this).closest("div.widget"), 1, 1, 0);
                return false
            });
            a("a.widget-control-close").live("click", function() {
                wpWidgets.close(a(this).closest("div.widget"));
                return false
            });
            d.children(".widget").each(function() {
                wpWidgets.appendTitle(this);
                if (a("p.widget-error", this).length) {
                    a("a.widget-action", this).click()
                }
            });
            a("#widget-list").children(".widget").draggable({connectToSortable: "div.widgets-sortables",handle: "> .widget-top > .widget-title",distance: 2,helper: "clone",zIndex: 5,containment: "document",start: function(h, g) {
                    g.helper.find("div.widget-description").hide();
                    b = this.id
                },stop: function(h, g) {
                    if (f) {
                        a(f).hide()
                    }
                    f = ""
                }});
            d.sortable({placeholder: "widget-placeholder",items: "> .widget",handle: "> .widget-top > .widget-title",cursor: "move",distance: 2,containment: "document",start: function(h, g) {
                    g.item.children(".widget-inside").hide();
                    g.item.css({margin: "",width: ""})
                },stop: function(i, g) {
                    if (g.item.hasClass("ui-draggable") && g.item.data("draggable")) {
                        g.item.draggable("destroy")
                    }
                    if (g.item.hasClass("deleting")) {
                        wpWidgets.save(g.item, 1, 0, 1);
                        g.item.remove();
                        return
                    }
                    var h = g.item.find("input.add_new").val(), l = g.item.find("input.multi_number").val(), k = b, j = a(this).attr("id");
                    g.item.css({margin: "",width: ""});
                    b = "";
                    if (h) {
                        if ("multi" == h) {
                            g.item.html(g.item.html().replace(/<[^<>]+>/g, function(n) {
                                return n.replace(/__i__|%i%/g, l)
                            }));
                            g.item.attr("id", k.replace("__i__", l));
                            l++;
                            a("div#" + k).find("input.multi_number").val(l)
                        } else {
                            if ("single" == h) {
                                g.item.attr("id", "new-" + k);
                                f = "div#" + k
                            }
                        }
                        wpWidgets.save(g.item, 0, 0, 1);
                        g.item.find("input.add_new").val("");
                        g.item.find("a.widget-action").click();
                        return
                    }
                    wpWidgets.saveOrder(j)
                },receive: function(i, h) {
                    var g = a(h.sender);
                    if (!a(this).is(":visible") || this.id.indexOf("orphaned_widgets") != -1) {
                        g.sortable("cancel")
                    }
                    if (g.attr("id").indexOf("orphaned_widgets") != -1 && !g.children(".widget").length) {
                        g.parents(".orphan-sidebar").slideUp(400, function() {
                            a(this).remove()
                        })
                    }
                }}).sortable("option", "connectWith", "div.widgets-sortables").parent().filter(".closed").children(".widgets-sortables").sortable("disable");
            a("#available-widgets").droppable({tolerance: "pointer",accept: function(g) {
                    return a(g).parent().attr("id") != "widget-list"
                },drop: function(h, g) {
                    g.draggable.addClass("deleting");
                    a("#removing-widget").hide().children("span").html("")
                },over: function(h, g) {
                    g.draggable.addClass("deleting");
                    a("div.widget-placeholder").hide();
                    if (g.draggable.hasClass("ui-sortable-helper")) {
                        a("#removing-widget").show().children("span").html(g.draggable.find("div.widget-title").children("h4").html())
                    }
                },out: function(h, g) {
                    g.draggable.removeClass("deleting");
                    a("div.widget-placeholder").show();
                    a("#removing-widget").hide().children("span").html("")
                }})
        },saveOrder: function(c) {
            if (c) {
                a("#" + c).closest("div.widgets-holder-wrap").find("img.ajax-feedback").css("visibility", "visible")
            }
            var b = {action: "widgets-order",savewidgets: a("#_wpnonce_widgets").val(),sidebars: []};
            a("div.widgets-sortables").each(function() {
                if (a(this).sortable) {
                    b["sidebars[" + a(this).attr("id") + "]"] = a(this).sortable("toArray").join(",")
                }
            });
            a.post(ajaxurl, b, function() {
                a("img.ajax-feedback").css("visibility", "hidden")
            });
            this.resize()
        },save: function(g, d, e, b) {
            var h = g.closest("div.widgets-sortables").attr("id"), f = g.find("form").serialize(), c;
            g = a(g);
            a(".ajax-feedback", g).css("visibility", "visible");
            c = {action: "save-widget",savewidgets: a("#_wpnonce_widgets").val(),sidebar: h};
            if (d) {
                c.delete_widget = 1
            }
            f += "&" + a.param(c);
            a.post(ajaxurl, f, function(i) {
                var j;
                if (d) {
                    if (!a("input.widget_number", g).val()) {
                        j = a("input.widget-id", g).val();
                        a("#available-widgets").find("input.widget-id").each(function() {
                            if (a(this).val() == j) {
                                a(this).closest("div.widget").show()
                            }
                        })
                    }
                    if (e) {
                        b = 0;
                        g.slideUp("fast", function() {
                            a(this).remove();
                            wpWidgets.saveOrder()
                        })
                    } else {
                        g.remove();
                        wpWidgets.resize()
                    }
                } else {
                    a(".ajax-feedback").css("visibility", "hidden");
                    if (i && i.length > 2) {
                        a("div.widget-content", g).html(i);
                        wpWidgets.appendTitle(g);
                        wpWidgets.fixLabels(g)
                    }
                }
                if (b) {
                    wpWidgets.saveOrder()
                }
            })
        },appendTitle: function(b) {
            var c = a('input[id*="-title"]', b).val() || "";
            if (c) {
                c = ": " + c.replace(/<[^<>]+>/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            a(b).children(".widget-top").children(".widget-title").children().children(".in-widget-title").html(c)
        },resize: function() {
            a("div.widgets-sortables").each(function() {
                if (a(this).parent().hasClass("inactive")) {
                    return true
                }
                var c = 50, b = a(this).children(".widget").length;
                c = c + parseInt(b * 48, 10);
                a(this).css("minHeight", c + "px")
            })
        },fixLabels: function(b) {
            b.children(".widget-inside").find("label").each(function() {
                var c = a(this).attr("for");
                if (c && c == a("input", this).attr("id")) {
                    a(this).removeAttr("for")
                }
            })
        },close: function(b) {
            b.children(".widget-inside").slideUp("fast", function() {
                b.css({width: "",margin: ""})
            })
        }};
    a(document).ready(function(b) {
        wpWidgets.init()
    })
})(jQuery);
