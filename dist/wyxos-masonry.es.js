import { ref as d, onMounted as _, onBeforeUnmount as w, nextTick as L, computed as M, openBlock as y, createElementBlock as x, normalizeClass as u, renderSlot as m, createElementVNode as g, createCommentVNode as P, createVNode as N, TransitionGroup as B, withCtx as $, Fragment as F, renderList as z, toDisplayString as E } from "vue";
const R = (s, p) => {
  const r = s.__vccOpts || s;
  for (const [o, c] of p)
    r[o] = c;
  return r;
}, V = ["data-index"], D = ["src", "alt"], O = ["onClick"], T = ["disabled"], W = {
  __name: "WyxosMasonry",
  props: {
    load: Function,
    loadNext: Function,
    loadPrevious: Function,
    pages: Array,
    canLoadMore: Boolean,
    // Flag indicating if more content can be loaded
    containerClass: { type: String, default: "infinite-scroll flex-1 flex flex-col overflow-x-hidden overflow-y-auto custom-scroll" },
    // Customizable container class
    buttonClass: { type: String, default: "load-more-button" },
    // Customizable button class
    loaderClass: { type: String, default: "text-center" },
    // Customizable loader class
    gridItemClass: { type: String, default: "grid-item" },
    // Customizable grid item class
    cacheSize: { type: Number, default: 5 }
    // Number of pages to cache
  },
  emits: [
    "updatePages"
  ],
  setup(s, { emit: p }) {
    const r = p, o = d(!1), c = d(""), n = s, C = d(null), f = d(null), h = d(!1);
    let v = null;
    _(async () => {
      var a;
      const e = await ((a = n.load) == null ? void 0 : a.call(n));
      e && r("updatePages", [e]), h.value = !0, f.value && (v = new IntersectionObserver(I, {
        root: C.value,
        threshold: 0.8
      }), v.observe(f.value));
    }), w(() => {
      f.value && v && v.disconnect();
    });
    const I = (e) => {
      e.forEach((a) => {
        a.isIntersecting && n.canLoadMore && !o.value && k();
      });
    }, k = async () => {
      var a;
      if (o.value) return;
      o.value = !0, c.value = "next";
      const e = await ((a = n.loadNext) == null ? void 0 : a.call(n));
      if (e) {
        const t = [...n.pages, e];
        if (r("updatePages", t), await L(), o.value = !1, c.value = "", t.length > n.cacheSize) {
          const l = t.slice(1);
          r("updatePages", l);
        }
      } else
        o.value = !1, c.value = "";
    }, S = M(() => n.pages.reduce((e, a) => {
      let t = a.items.map((l, i) => (l.page = a.page, l.pageIndex = i, l));
      return e.concat(t);
    }, [])), b = (e) => {
      const a = e.pageIndex, t = e.page, l = n.pages.map((i) => (i.page === t && i.items.splice(a, 1), i));
      r("updatePages", l);
    };
    return (e, a) => (y(), x("div", {
      ref_key: "infiniteScroll",
      ref: C,
      class: u(s.containerClass)
    }, [
      o.value && c.value === "previous" ? m(e.$slots, "loader", { key: 0 }, () => [
        g("p", {
          class: u(s.loaderClass)
        }, "Loading previous content...", 2)
      ], !0) : P("", !0),
      N(B, {
        class: "grid grid-cols-6 gap-4 infinite-scroll-content relative",
        tag: "div",
        name: "w-masonry-list"
      }, {
        default: $(() => [
          (y(!0), x(F, null, z(S.value, (t, l) => (y(), x("div", {
            key: t.key,
            "data-index": t.pageIndex,
            class: u(s.gridItemClass)
          }, [
            m(e.$slots, "item", {
              item: t,
              onRemove: b
            }, () => [
              g("img", {
                src: t.src,
                alt: t.title
              }, null, 8, D),
              g("button", {
                onClick: (i) => b(t)
              }, "Remove", 8, O)
            ], !0)
          ], 10, V))), 128))
        ]),
        _: 3
      }),
      h.value ? P("", !0) : m(e.$slots, "loader", { key: 1 }, () => [
        g("p", {
          class: u(s.loaderClass)
        }, "Loading content...", 2)
      ], !0),
      m(e.$slots, "load-more-button", {}, () => [
        g("button", {
          ref_key: "loadMoreButton",
          ref: f,
          onClick: k,
          disabled: o.value,
          class: u(s.buttonClass)
        }, E(o.value ? "Loading next content..." : "Load more"), 11, T)
      ], !0)
    ], 2));
  }
}, G = /* @__PURE__ */ R(W, [["__scopeId", "data-v-dc36e1e0"]]);
export {
  G as default
};
