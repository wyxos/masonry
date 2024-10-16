import { ref as u, onMounted as w, onBeforeUnmount as L, nextTick as M, computed as N, openBlock as y, createElementBlock as x, normalizeClass as c, renderSlot as g, createElementVNode as m, createCommentVNode as k, createVNode as _, TransitionGroup as B, withCtx as P, Fragment as $, renderList as F, toDisplayString as z } from "vue";
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
    const r = p, l = u(!1), d = u(""), t = n, C = u(null), f = u(null), h = u(!1);
    let v = null;
    w(async () => {
      var a;
      const e = await ((a = t.load) == null ? void 0 : a.call(t));
      e && r("update:modelValue", [e]), h.value = !0, f.value && (v = new IntersectionObserver(I, {
        root: C.value,
        threshold: 0.8
      }), v.observe(f.value));
    }), L(() => {
      f.value && v && v.disconnect();
    });
    const I = (e) => {
      e.forEach((a) => {
        a.isIntersecting && t.canLoadMore && !l.value && V();
      });
    }, V = async () => {
      var a;
      if (l.value) return;
      l.value = !0, d.value = "next";
      const e = await ((a = t.loadNext) == null ? void 0 : a.call(t));
      if (e) {
        if ([...t.modelValue, e].length > t.cacheSize) {
          const s = t.modelValue.slice(1);
          r("update:modelValue", s);
        }
        await M();
        const o = [...t.modelValue, e];
        r("update:modelValue", o), l.value = !1, d.value = "";
      } else
        l.value = !1, d.value = "";
    }, S = N(() => t.modelValue.reduce((e, a) => {
      let o = a.items.map((s, i) => (s.page = a.page, s.pageIndex = i, s));
      return e.concat(o);
    }, [])), b = (e) => {
      const a = e.pageIndex, o = e.page, s = t.modelValue.map((i) => (i.page === o && i.items.splice(a, 1), i));
      r("update:modelValue", s);
    };
    return (e, a) => (y(), x("div", {
      ref_key: "infiniteScroll",
      ref: C,
      class: c(n.containerClass)
    }, [
      l.value && d.value === "previous" ? g(e.$slots, "loader", { key: 0 }, () => [
        m("p", {
          class: c(n.loaderClass)
        }, "Loading previous content...", 2)
      ], !0) : k("", !0),
      _(B, {
        class: "grid grid-cols-6 gap-4 infinite-scroll-content relative",
        tag: "div",
        name: "w-masonry-list"
      }, {
        default: P(() => [
          (y(!0), x($, null, F(S.value, (o, s) => (y(), x("div", {
            key: `${o[n.primaryKey]}`,
            "data-index": o.pageIndex,
            class: c(n.gridItemClass)
          }, [
            g(e.$slots, "item", {
              item: o,
              onRemove: b
            }, () => [
              m("img", {
                src: o.src,
                alt: o.title
              }, null, 8, D),
              m("button", {
                onClick: (i) => b(o)
              }, "Remove", 8, K)
            ], !0)
          ], 10, R))), 128))
        ]),
        _: 3
      }),
      h.value ? k("", !0) : g(e.$slots, "loader", { key: 1 }, () => [
        m("p", {
          class: c(n.loaderClass)
        }, "Loading content...", 2)
      ], !0),
      g(e.$slots, "load-more-button", {}, () => [
        m("button", {
          ref_key: "loadMoreButton",
          ref: f,
          onClick: V,
          disabled: l.value,
          class: c(n.buttonClass)
        }, z(l.value ? "Loading next content..." : "Load more"), 11, O)
      ], !0)
    ], 2));
  }
}, A = /* @__PURE__ */ E(T, [["__scopeId", "data-v-6edafba2"]]);
export {
  A as default
};
