import{r as w,c as D,o as v,a as M,b as r,t as L,u as i,F as S,d as k,w as E,v as X,p as Y,e as $,f as j,g as q}from"./vendor.fde2c95a.js";const K=function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const y of a.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&m(y)}).observe(document,{childList:!0,subtree:!0});function g(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function m(t){if(t.ep)return;t.ep=!0;const a=g(t);fetch(t.href,a)}};K();var V=(f,_)=>{const g=f.__vccOpts||f;for(const[m,t]of _)g[m]=t;return g};const x=f=>(Y("data-v-468bd7ac"),f=f(),$(),f),z={class:"main"},G=x(()=>r("h1",null,"\u5730\u56FE\u7F16\u53F7",-1)),H={class:"selectArea"},J=["disabled"],Q=["disabled"],T=["disabled"],Z=x(()=>r("button",null,"\u9009\u62E9\u5730\u56FE",-1)),tt=["onClick"],et={class:"bestStep"},nt={setup(f){const t=w({startFlag:0,active:0,step:0,count:10,result:[],mapNum:Math.floor(Math.random()*1e5)}),a=D(()=>t.result.reduce((e,n)=>Math.max(e,n),0)),y=function(e,n,o){const s=[],l=function(p,b){const c=Math.floor(Math.random()*p),h=Math.floor(Math.random()*b);if(!(c==0&&h==0||c==p-1&&h==b-1)){for(let O=0;O<s.length;O++)if(s[O].toString()==[c,h].toString())return!1;s.push([c,h])}};for(;s.length<o;)l(e,n);return s},C=function(e,n,o){t.table=new Array(10).fill(null).map(l=>new Array(10).fill(null)),t.table[0][0]="\u{1F40E}";const s=y(e,n,o);for(let l=0;l<s.length;l++){const p=s[l];t.table[p[0]][p[1]]="\u26F0\uFE0F"}},N=function(e,n,o){const s=o.map(c=>c.slice()),l=[[0,0]],p=[[-1,0],[1,0],[0,1],[0,-1]],b=Array.from(Array(e),c=>Array(n).fill(null));for(s[0][0]="";l.length!=0;)for(let c=0;c<l.length;c++){const h=l.shift(),O=h[0],P=h[1];for(let A=0;A<p.length;A++){const R=p[A],u=O+R[0],d=P+R[1];if(u>=0&&u<e&&d>=0&&d<n&&s[u][d]!="\u26F0\uFE0F"){if(u==e-1&&d==n-1)return s[u][d]="",b[u][d]=h,b;s[u][d]==null&&(l.push([u,d]),s[u][d]="",b[u][d]=h)}}}};do C(10,10,20);while(!N(10,10,t.table));const I=function(e,n,o){t.active==0&&o[9][9]!="\u{1F40E}"&&(o[e-1][n-1]==null&&t.count>0?(o[e-1][n-1]="\u274C",t.count--):o[e-1][n-1]=="\u274C"&&t.count>=0&&(o[e-1][n-1]=null,t.count++))},F=function(e,n,o){const s=[[n-1,o-1]];let l=[n-1,o-1];if(e){for(;e[l[0]][l[1]]!=null;)s.push(e[l[0]][l[1]]),l=e[l[0]][l[1]];return s.reverse(),s[0].toString()==[0,0].toString()?s:[]}else return[]},B=function(){t.startFlag=1,t.active=1;const e=F(N(10,10,t.table),10,10);if(e.length>0){const n=setInterval(()=>{if(e.length>0){const o=e.shift();e.length!=0&&(t.step++,t.table[o[0]][o[1]]="",t.table[e[0][0]][e[0][1]]="\u{1F40E}")}else clearInterval(n),t.active=0,t.result.push(t.step)},100)}else alert("\u4E0D\u53EF\u4EE5\u628A\u8DEF\u5C01\u6B7B!"),t.startFlag=0,t.active=0},U=function(){t.startFlag=0,t.step=0,t.count=10;for(let e=0;e<t.table.length;e++)for(let n=0;n<t.table[0].length;n++)t.table[e][n]!="\u26F0\uFE0F"&&(t.table[e][n]=null);t.table[0][0]="\u{1F40E}"},W=function(){t.startFlag=0,t.step=0,t.count=10,t.result.length=0,t.mapNum=Math.floor(Math.random()*1e5);do C(10,10,20);while(!N(10,10,t.table))};return(e,n)=>(v(),M("div",z,[r("div",null,[G,r("h2",null,L(i(t).mapNum),1)]),r("div",H,[r("button",{onClick:B,disabled:i(t).startFlag},"\u5F00\u59CB",8,J),r("button",{onClick:U,disabled:i(t).active},"\u91CD\u6765",8,Q),r("button",{onClick:W,disabled:i(t).active},"\u968F\u673A\u5730\u56FE",8,T),Z]),r("div",null,[r("h1",null,"\u5269\u4F59\u653E\u7F6E\u969C\u788D\u6B21\u6570\uFF1A"+L(i(t).count),1)]),r("div",null,[r("table",null,[(v(!0),M(S,null,k(i(t).table.length,o=>(v(),M("tr",null,[(v(!0),M(S,null,k(i(t).table[0].length,s=>(v(),M("td",{class:"area",onClick:l=>I(o,s,i(t).table)},L(i(t).table[o-1][s-1]),9,tt))),256))]))),256))])]),r("div",null,[r("h1",null,"\u603B\u6B65\u6570\uFF1A"+L(i(t).step),1)]),r("div",et,[E(r("h1",null,"\u5386\u53F2\u6700\u4F73:"+L(i(a))+"\u6B65",513),[[X,i(a)!=0]])])]))}};var st=V(nt,[["__scopeId","data-v-468bd7ac"]]);const ot={setup(f){return(_,g)=>(v(),j(st))}};q(ot).mount("#app");