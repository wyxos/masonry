import { ref as c, onMounted as w, onBeforeUnmount as L, nextTick as M, computed as N, openBlock as y, createElementBlock as x, normalizeClass as u, renderSlot as v, createElementVNode as f, createCommentVNode as V, createVNode as _, TransitionGroup as B, withCtx as P, Fragment as $, renderList as F, toDisplayString as z } from "vue";
const E = (n, p) => {
  const r = n.__vccOpts || n;
  for (const [l, d] of p)
    r[l] = d;
  return r;
}, R = ["data-index"], D = ["src", "alt"], K = ["onClick"], O = ["disabled"], T = {
  __name: "WyxosMasonry",
  props: {
    load: Function,
    loadNext: Function,
    loadPrevious: Function,
    modelValue: Array,
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
    cacheSize: { type: Number, default: 5 },
    // Number of pages to cache
    primaryKey: "id"
  },
  emits: [
    "update:modelValue"
  ],
  setup(n, { emit: p }) {
    const r = p, l = c(!1), d = c(""), o = n, C = c(null), m = c(null), h = c(!1);
    let g = null;
    w(async () => {
      var a;
      const e = await ((a = o.load) == null ? void 0 : a.call(o));
      e && r("update:modelValue", [e]), h.value = !0, m.value && (g = new IntersectionObserver(I, {
        root: C.value,
        threshold: 0.8
      }), g.observe(m.value));
    }), L(() => {
      m.value && g && g.disconnect();
    });
    const I = (e) => {
      e.forEach((a) => {
        a.isIntersecting && o.canLoadMore && !l.value && b();
      });
    }, b = async () => {
      var a;
      if (l.value) return;
      l.value = !0, d.value = "next";
      const e = await ((a = o.loadNext) == null ? void 0 : a.call(o));
      if (e) {
        const t = [...o.pages, e];
        if (r("update:modelValue", t), await M(), l.value = !1, d.value = "", t.length > o.cacheSize) {
          const s = t.slice(1);
          r("update:modelValue", s);
        }
      } else
        l.value = !1, d.value = "";
    }, S = N(() => o.modelValue.reduce((e, a) => {
      let t = a.items.map((s, i) => (s.page = a.page, s.pageIndex = i, s));
      return e.concat(t);
    }, [])), k = (e) => {
      const a = e.pageIndex, t = e.page, s = o.modelValue.map((i) => (i.page === t && i.items.splice(a, 1), i));
      r("update:modelValue", s);
    };
    return (e, a) => (y(), x("div", {
      ref_key: "infiniteScroll",
      ref: C,
      class: u(n.containerClass)
    }, [
      l.value && d.value === "previous" ? v(e.$slots, "loader", { key: 0 }, () => [
        f("p", {
          class: u(n.loaderClass)
        }, "Loading previous content...", 2)
      ], !0) : V("", !0),
      _(B, {
        class: "grid grid-cols-6 gap-4 infinite-scroll-content relative",
        tag: "div",
        name: "w-masonry-list"
      }, {
        default: P(() => [
          (y(!0), x($, null, F(S.value, (t, s) => (y(), x("div", {
            key: `${t[n.primaryKey]}`,
            "data-index": t.pageIndex,
            class: u(n.gridItemClass)
          }, [
            v(e.$slots, "item", {
              item: t,
              onRemove: k
            }, () => [
              f("img", {
                src: t.src,
                alt: t.title
              }, null, 8, D),
              f("button", {
                onClick: (i) => k(t)
              }, "Remove", 8, K)
            ], !0)
          ], 10, R))), 128))
        ]),
        _: 3
      }),
      h.value ? V("", !0) : v(e.$slots, "loader", { key: 1 }, () => [
        f("p", {
          class: u(n.loaderClass)
        }, "Loading content...", 2)
      ], !0),
      v(e.$slots, "load-more-button", {}, () => [
        f("button", {
          ref_key: "loadMoreButton",
          ref: m,
          onClick: b,
          disabled: l.value,
          class: u(n.buttonClass)
        }, z(l.value ? "Loading next content..." : "Load more"), 11, O)
      ], !0)
    ], 2));
  }
}, A = /* @__PURE__ */ E(T, [["__scopeId", "data-v-fe48de8f"]]);
export {
  A as default
};
