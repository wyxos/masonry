(function(i,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i.WyxosMasonry={},i.Vue))})(this,function(i,e){"use strict";const h=(n,p)=>{const s=n.__vccOpts||n;for(const[l,c]of p)s[l]=c;return s},k=["data-index"],b=["src","alt"],S=["onClick"],N=["disabled"],_=h({__name:"WyxosMasonry",props:{load:{type:Function,required:!0},loadNext:{type:Function,required:!0},loadPrevious:{type:Function,required:!0},modelValue:{type:Array,required:!0},canLoadMore:Boolean,containerClass:{type:String,default:"infinite-scroll flex-1 flex flex-col overflow-x-hidden overflow-y-auto custom-scroll"},buttonClass:{type:String,default:"load-more-button"},loaderClass:{type:String,default:"text-center"},gridItemClass:{type:String,default:"grid-item"},cacheSize:{type:Number,default:5},primaryKey:"id"},emits:["update:modelValue"],setup(n,{emit:p}){const s=p,l=e.ref(!1),c=e.ref(""),r=n,y=e.ref(null),g=e.ref(null),m=e.ref(!1);let f=null;e.onMounted(async()=>{s("update:modelValue",[]),m.value=!1;const t=await r.load();console.log("page",t),t&&s("update:modelValue",[t]),m.value=!0,await e.nextTick(),g.value&&(f=new IntersectionObserver(B,{root:y.value,threshold:.8}),f.observe(g.value))}),e.onBeforeUnmount(()=>{f&&f.disconnect()});const B=t=>{t.forEach(o=>{o.isIntersecting&&r.canLoadMore&&!l.value&&x()})},x=async()=>{if(!(m&&!l.value&&V.value.length>0))return;l.value=!0,c.value="next";const o=await r.loadNext();if(o){if([...r.modelValue,o].length>r.cacheSize){const d=r.modelValue.slice(1);s("update:modelValue",d)}await e.nextTick();const a=[...r.modelValue,o];s("update:modelValue",a),l.value=!1,c.value=""}else l.value=!1,c.value=""},V=e.computed(()=>r.modelValue.reduce((t,o)=>{let a=o.items.map((d,u)=>(d.page=o.page,d.pageIndex=u,d));return t.concat(a)},[])),C=t=>{const o=t.pageIndex,a=t.page,d=r.modelValue.map(u=>(u.page===a&&u.items.splice(o,1),u));s("update:modelValue",d)};return(t,o)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"infiniteScroll",ref:y,class:e.normalizeClass(n.containerClass)},[l.value&&c.value==="previous"?e.renderSlot(t.$slots,"loader",{key:0},()=>[e.createElementVNode("p",{class:e.normalizeClass(n.loaderClass)},"Loading previous content...",2)],!0):e.createCommentVNode("",!0),e.createVNode(e.TransitionGroup,{class:"grid grid-cols-6 gap-4 infinite-scroll-content relative",tag:"div",name:"w-masonry-list"},{default:e.withCtx(()=>[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(V.value,(a,d)=>(e.openBlock(),e.createElementBlock("div",{key:`${a[n.primaryKey]}`,"data-index":a.pageIndex,class:e.normalizeClass(n.gridItemClass)},[e.renderSlot(t.$slots,"item",{item:a,onRemove:C},()=>[e.createElementVNode("img",{src:a.src,alt:a.title},null,8,b),e.createElementVNode("button",{onClick:u=>C(a)},"Remove",8,S)],!0)],10,k))),128))]),_:3}),m.value?e.createCommentVNode("",!0):e.renderSlot(t.$slots,"loader",{key:1},()=>[e.createElementVNode("p",{class:e.normalizeClass(n.loaderClass)},"Loading content...",2)],!0),e.renderSlot(t.$slots,"load-more-button",{},()=>[e.createElementVNode("button",{ref_key:"loadMoreButton",ref:g,onClick:x,disabled:l.value,class:e.normalizeClass(n.buttonClass)},e.toDisplayString(l.value?"Loading next content...":"Load more"),11,N)],!0)],2))}},[["__scopeId","data-v-81c3b6b2"]]);i.default=_,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
