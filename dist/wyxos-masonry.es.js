import { ref as i, onMounted as I, onBeforeUnmount as L, nextTick as w, computed as M, openBlock as d, createElementBlock as u, createCommentVNode as k, createVNode as B, TransitionGroup as N, withCtx as C, Fragment as F, renderList as S, renderSlot as E, createElementVNode as _, toDisplayString as R } from "vue";
const V = (g, f) => {
  const l = g.__vccOpts || g;
  for (const [n, r] of f)
    l[n] = r;
  return l;
}, D = {
  key: 0,
  class: "text-center"
}, O = ["data-index"], T = ["src", "alt"], W = ["onClick"], $ = { key: 1 }, A = ["disabled"], G = {
  __name: "WyxosMasonry",
  props: {
    load: Function,
    loadNext: Function,
    loadPrevious: Function,
    pages: Array,
    canLoadMore: Boolean
    // Flag indicating if more content can be loaded
  },
  emits: [
    "updatePages"
  ],
  setup(g, { emit: f }) {
    const l = f, n = i(!1), r = i(""), a = g, m = i(null), v = i(null), x = i(!1);
    let p = null;
    I(async () => {
      var o;
      const t = await ((o = a.load) == null ? void 0 : o.call(a));
      t && l("updatePages", [t]), x.value = !0, v.value && (p = new IntersectionObserver(P, {
        root: m.value,
        threshold: 0.8
      }), p.observe(v.value));
    }), L(() => {
      v.value && p && p.disconnect();
    });
    const P = (t) => {
      t.forEach((o) => {
        o.isIntersecting && a.canLoadMore && !n.value && y();
      });
    }, y = async () => {
      var o;
      if (n.value) return;
      n.value = !0, r.value = "next";
      const t = await ((o = a.loadNext) == null ? void 0 : o.call(a));
      if (t) {
        const e = [...a.pages, t];
        if (l("updatePages", e), await w(), n.value = !1, r.value = "", e.length > 5) {
          const s = e.slice(1);
          l("updatePages", s);
        }
      } else
        n.value = !1, r.value = "";
    }, b = M(() => a.pages.reduce((t, o) => {
      let e = o.items.map((s, c) => (s.page = o.page, s.pageIndex = c, s));
      return t.concat(e);
    }, [])), h = (t) => {
      const o = t.pageIndex, e = t.page, s = a.pages.map((c) => (c.page === e && c.items.splice(o, 1), c));
      l("updatePages", s);
    };
    return (t, o) => (d(), u("div", {
      ref_key: "infiniteScroll",
      ref: m,
      class: "infinite-scroll flex-1 flex flex-col overflow-x-hidden overflow-y-auto custom-scroll"
    }, [
      n.value && r.value === "previous" ? (d(), u("p", D, "Loading previous content...")) : k("", !0),
      B(N, {
        class: "grid grid-cols-6 gap-4 infinite-scroll-content relative",
        tag: "div",
        name: "list"
      }, {
        default: C(() => [
          (d(!0), u(F, null, S(b.value, (e, s) => (d(), u("div", {
            key: e.key,
            "data-index": e.pageIndex,
            class: "grid-item"
          }, [
            E(t.$slots, "item", {
              item: e,
              onRemove: h
            }, () => [
              _("img", {
                src: e.src,
                alt: e.title
              }, null, 8, T),
              _("button", {
                onClick: (c) => h(e)
              }, "Remove", 8, W)
            ], !0)
          ], 8, O))), 128))
        ]),
        _: 3
      }),
      x.value ? k("", !0) : (d(), u("p", $, "Loading content...")),
      _("button", {
        ref_key: "loadMoreButton",
        ref: v,
        onClick: y,
        disabled: n.value,
        class: "load-more-button"
      }, R(n.value ? "Loading next content..." : "Load more"), 9, A)
    ], 512));
  }
}, j = /* @__PURE__ */ V(G, [["__scopeId", "data-v-b49e30c0"]]);
export {
  j as default
};
