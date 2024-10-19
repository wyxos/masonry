import { ref as i, onMounted as w, nextTick as I, onBeforeUnmount as N, computed as M, openBlock as x, createElementBlock as h, normalizeClass as c, renderSlot as p, createElementVNode as m, createCommentVNode as L, createVNode as _, TransitionGroup as B, withCtx as P, Fragment as $, renderList as q, toDisplayString as F } from "vue";
const z = (o, v) => {
  const s = o.__vccOpts || o;
  for (const [l, d] of v)
    s[l] = d;
  return s;
}, E = ["data-index"], R = ["src", "alt"], D = ["onClick"], K = ["disabled"], O = {
  __name: "WyxosMasonry",
  props: {
    load: { type: Function, required: !0 },
    loadNext: { type: Function, required: !0 },
    loadPrevious: { type: Function, required: !0 },
    modelValue: { type: Array, required: !0 },
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
  setup(o, { emit: v }) {
    const s = v, l = i(!1), d = i(""), n = o, C = i(null), y = i(null), f = i(!1);
    let g = null;
    w(async () => {
      s("update:modelValue", []), f.value = !1;
      const e = await n.load();
      console.log("page", e), e && s("update:modelValue", [e]), f.value = !0, await I(), y.value && (g = new IntersectionObserver(S, {
        root: C.value,
        threshold: 0.8
      }), g.observe(y.value));
    }), N(() => {
      g && g.disconnect();
    });
    const S = (e) => {
      e.forEach((t) => {
        t.isIntersecting && n.canLoadMore && !l.value && V();
      });
    }, V = async () => {
      if (!(f && !l.value && b.value.length > 0)) return;
      l.value = !0, d.value = "next";
      const t = await n.loadNext();
      if (t) {
        if ([...n.modelValue, t].length > n.cacheSize) {
          const r = n.modelValue.slice(1);
          s("update:modelValue", r);
        }
        await I();
        const a = [...n.modelValue, t];
        s("update:modelValue", a), l.value = !1, d.value = "";
      } else
        l.value = !1, d.value = "";
    }, b = M(() => n.modelValue.reduce((e, t) => {
      let a = t.items.map((r, u) => (r.page = t.page, r.pageIndex = u, r));
      return e.concat(a);
    }, [])), k = (e) => {
      const t = e.pageIndex, a = e.page, r = n.modelValue.map((u) => (u.page === a && u.items.splice(t, 1), u));
      s("update:modelValue", r);
    };
    return (e, t) => (x(), h("div", {
      ref_key: "infiniteScroll",
      ref: C,
      class: c(o.containerClass)
    }, [
      l.value && d.value === "previous" ? p(e.$slots, "loader", { key: 0 }, () => [
        m("p", {
          class: c(o.loaderClass)
        }, "Loading previous content...", 2)
      ], !0) : L("", !0),
      _(B, {
        class: "grid grid-cols-6 gap-4 infinite-scroll-content relative",
        tag: "div",
        name: "w-masonry-list"
      }, {
        default: P(() => [
          (x(!0), h($, null, q(b.value, (a, r) => (x(), h("div", {
            key: `${a[o.primaryKey]}`,
            "data-index": a.pageIndex,
            class: c(o.gridItemClass)
          }, [
            p(e.$slots, "item", {
              item: a,
              onRemove: k
            }, () => [
              m("img", {
                src: a.src,
                alt: a.title
              }, null, 8, R),
              m("button", {
                onClick: (u) => k(a)
              }, "Remove", 8, D)
            ], !0)
          ], 10, E))), 128))
        ]),
        _: 3
      }),
      f.value ? L("", !0) : p(e.$slots, "loader", { key: 1 }, () => [
        m("p", {
          class: c(o.loaderClass)
        }, "Loading content...", 2)
      ], !0),
      p(e.$slots, "load-more-button", {}, () => [
        m("button", {
          ref_key: "loadMoreButton",
          ref: y,
          onClick: V,
          disabled: l.value,
          class: c(o.buttonClass)
        }, F(l.value ? "Loading next content..." : "Load more"), 11, K)
      ], !0)
    ], 2));
  }
}, W = /* @__PURE__ */ z(O, [["__scopeId", "data-v-81c3b6b2"]]);
export {
  W as default
};
