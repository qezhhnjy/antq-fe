(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[8315],{64335:function(ce,$,t){"use strict";var B=t(67294),j=(0,B.createContext)({});$.Z=j},21349:function(ce,$,t){"use strict";var B=t(84305),j=t(39559),s=t(53645),k=t.n(s),w=t(67294),G=t(94184),O=t.n(G),J=t(64335),H=function(N){var X=(0,w.useContext)(J.Z),ie=N.children,q=N.contentWidth,Y=N.className,le=N.style,I=(0,w.useContext)(j.ZP.ConfigContext),K=I.getPrefixCls,Q=N.prefixCls||K("pro"),fe=q||X.contentWidth,ae="".concat(Q,"-grid-content");return w.createElement("div",{className:O()(ae,Y,{wide:fe==="Fixed"}),style:le},w.createElement("div",{className:"".concat(Q,"-grid-content-children")},ie))};$.Z=H},38315:function(ce,$,t){"use strict";t.d($,{ZP:function(){return te}});var B=t(38663),j=t(70883),s=t(22122),k=t(96156),w=t(6610),G=t(5991),O=t(10379),J=t(81907),H=t(90484),o=t(67294),N=t(94184),X=t.n(N),ie=t(98423),q=t(48717),Y=t(65632),le=t(85061),I=t(75164);function K(v){var e,a=function(c){return function(){e=null,v.apply(void 0,(0,le.Z)(c))}},r=function(){if(e==null){for(var c=arguments.length,i=new Array(c),m=0;m<c;m++)i[m]=arguments[m];e=(0,I.Z)(a(i))}};return r.cancel=function(){return I.Z.cancel(e)},r}function Q(){return function(e,a,r){var l=r.value,c=!1;return{configurable:!0,get:function(){if(c||this===e.prototype||this.hasOwnProperty(a))return l;var m=K(l.bind(this));return c=!0,Object.defineProperty(this,a,{value:m,configurable:!0,writable:!0}),c=!1,m}}}}var fe=t(64019);function ae(v){return v!==window?v.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function Re(v,e,a){if(a!==void 0&&e.top>v.top-a)return a+e.top}function Oe(v,e,a){if(a!==void 0&&e.bottom<v.bottom+a){var r=window.innerHeight-e.bottom;return a+r}}var ve=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],ee=[];function De(){return ee}function Ne(v,e){if(!!v){var a=ee.find(function(r){return r.target===v});a?a.affixList.push(e):(a={target:v,affixList:[e],eventHandlers:{}},ee.push(a),ve.forEach(function(r){a.eventHandlers[r]=(0,fe.Z)(v,r,function(){a.affixList.forEach(function(l){l.lazyUpdatePosition()})})}))}}function me(v){var e=ee.find(function(a){var r=a.affixList.some(function(l){return l===v});return r&&(a.affixList=a.affixList.filter(function(l){return l!==v})),r});e&&e.affixList.length===0&&(ee=ee.filter(function(a){return a!==e}),ve.forEach(function(a){var r=e.eventHandlers[a];r&&r.remove&&r.remove()}))}var Te=function(v,e,a,r){var l=arguments.length,c=l<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,a):r,i;if((typeof Reflect=="undefined"?"undefined":(0,H.Z)(Reflect))==="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(v,e,a,r);else for(var m=v.length-1;m>=0;m--)(i=v[m])&&(c=(l<3?i(c):l>3?i(e,a,c):i(e,a))||c);return l>3&&c&&Object.defineProperty(e,a,c),c};function Ae(){return typeof window!="undefined"?window:null}var ne;(function(v){v[v.None=0]="None",v[v.Prepare=1]="Prepare"})(ne||(ne={}));var de=function(v){(0,O.Z)(a,v);var e=(0,J.Z)(a);function a(){var r;return(0,w.Z)(this,a),r=e.apply(this,arguments),r.state={status:ne.None,lastAffix:!1,prevTarget:null},r.getOffsetTop=function(){var l=r.props,c=l.offsetBottom,i=l.offsetTop;return c===void 0&&i===void 0?0:i},r.getOffsetBottom=function(){return r.props.offsetBottom},r.savePlaceholderNode=function(l){r.placeholderNode=l},r.saveFixedNode=function(l){r.fixedNode=l},r.measure=function(){var l=r.state,c=l.status,i=l.lastAffix,m=r.props.onChange,y=r.getTargetFunc();if(!(c!==ne.Prepare||!r.fixedNode||!r.placeholderNode||!y)){var x=r.getOffsetTop(),T=r.getOffsetBottom(),b=y();if(!!b){var f={status:ne.None},Z=ae(b),C=ae(r.placeholderNode),P=Re(C,Z,x),S=Oe(C,Z,T);P!==void 0?(f.affixStyle={position:"fixed",top:P,width:C.width,height:C.height},f.placeholderStyle={width:C.width,height:C.height}):S!==void 0&&(f.affixStyle={position:"fixed",bottom:S,width:C.width,height:C.height},f.placeholderStyle={width:C.width,height:C.height}),f.lastAffix=!!f.affixStyle,m&&i!==f.lastAffix&&m(f.lastAffix),r.setState(f)}}},r.prepareMeasure=function(){if(r.setState({status:ne.Prepare,affixStyle:void 0,placeholderStyle:void 0}),!1)var l},r}return(0,G.Z)(a,[{key:"getTargetFunc",value:function(){var l=this.context.getTargetContainer,c=this.props.target;return c!==void 0?c:l||Ae}},{key:"componentDidMount",value:function(){var l=this,c=this.getTargetFunc();c&&(this.timeout=setTimeout(function(){Ne(c(),l),l.updatePosition()}))}},{key:"componentDidUpdate",value:function(l){var c=this.state.prevTarget,i=this.getTargetFunc(),m=(i==null?void 0:i())||null;c!==m&&(me(this),m&&(Ne(m,this),this.updatePosition()),this.setState({prevTarget:m})),(l.offsetTop!==this.props.offsetTop||l.offsetBottom!==this.props.offsetBottom)&&this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout),me(this),this.updatePosition.cancel(),this.lazyUpdatePosition.cancel()}},{key:"updatePosition",value:function(){this.prepareMeasure()}},{key:"lazyUpdatePosition",value:function(){var l=this.getTargetFunc(),c=this.state.affixStyle;if(l&&c){var i=this.getOffsetTop(),m=this.getOffsetBottom(),y=l();if(y&&this.placeholderNode){var x=ae(y),T=ae(this.placeholderNode),b=Re(T,x,i),f=Oe(T,x,m);if(b!==void 0&&c.top===b||f!==void 0&&c.bottom===f)return}}this.prepareMeasure()}},{key:"render",value:function(){var l=this,c=this.context.getPrefixCls,i=this.state,m=i.affixStyle,y=i.placeholderStyle,x=this.props,T=x.prefixCls,b=x.children,f=X()((0,k.Z)({},c("affix",T),!!m)),Z=(0,ie.Z)(this.props,["prefixCls","offsetTop","offsetBottom","target","onChange"]);return o.createElement(q.Z,{onResize:function(){l.updatePosition()}},o.createElement("div",(0,s.Z)({},Z,{ref:this.savePlaceholderNode}),m&&o.createElement("div",{style:y,"aria-hidden":"true"}),o.createElement("div",{className:f,ref:this.saveFixedNode,style:m},o.createElement(q.Z,{onResize:function(){l.updatePosition()}},b))))}}]),a}(o.Component);de.contextType=Y.E_,Te([Q()],de.prototype,"updatePosition",null),Te([Q()],de.prototype,"lazyUpdatePosition",null);var Se=de,Le=t(84305),he=t(39559),Ze=t(64896),Ie=t(37744),M=t(28991),ge=t(81253),Ke=t(36017),ze=t(18106),Be=t(58634),Ce=t(64335),Ue=t(21349),We=t(97435),$e=t(56264),Fe=["children","className","extra","style","renderContent"],He=function(e){var a=e.children,r=e.className,l=e.extra,c=e.style,i=e.renderContent,m=(0,ge.Z)(e,Fe),y=(0,o.useContext)(he.ZP.ConfigContext),x=y.getPrefixCls,T=e.prefixCls||x("pro"),b="".concat(T,"-footer-bar"),f=(0,o.useContext)(Ce.Z),Z=(0,o.useMemo)(function(){var P=f.hasSiderMenu,S=f.isMobile,L=f.siderWidth;if(!!P)return L?S?"100%":"calc(100% - ".concat(L,"px)"):"100%"},[f.collapsed,f.hasSiderMenu,f.isMobile,f.siderWidth]),C=o.createElement(o.Fragment,null,o.createElement("div",{className:"".concat(b,"-left")},l),o.createElement("div",{className:"".concat(b,"-right")},a));return(0,o.useEffect)(function(){return!f||!(f==null?void 0:f.setHasFooterToolbar)?function(){}:(f==null||f.setHasFooterToolbar(!0),function(){var P;f==null||(P=f.setHasFooterToolbar)===null||P===void 0||P.call(f,!1)})},[]),o.createElement("div",(0,s.Z)({className:X()(r,"".concat(b)),style:(0,M.Z)({width:Z},c)},(0,We.Z)(m,["prefixCls"])),i?i((0,M.Z)((0,M.Z)((0,M.Z)({},e),f),{},{leftWidth:Z}),C):C)},we=He,g=t(12395),n=t(83832),u=t(28481),d=function(e){if(!e)return 1;var a=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/a},h=function(e){var a=e.children,r=e.style,l=e.className,c=e.markStyle,i=e.markClassName,m=e.zIndex,y=m===void 0?9:m,x=e.gapX,T=x===void 0?212:x,b=e.gapY,f=b===void 0?222:b,Z=e.width,C=Z===void 0?120:Z,P=e.height,S=P===void 0?64:P,L=e.rotate,re=L===void 0?-22:L,_=e.image,xe=e.content,ye=e.offsetLeft,Me=e.offsetTop,ue=e.fontStyle,Ee=ue===void 0?"normal":ue,Pe=e.fontWeight,V=Pe===void 0?"normal":Pe,je=e.fontColor,Ge=je===void 0?"rgba(0,0,0,.15)":je,Xe=e.fontSize,Ye=Xe===void 0?16:Xe,Ve=e.fontFamily,ke=Ve===void 0?"sans-serif":Ve,et=e.prefixCls,tt=(0,o.useContext)(he.ZP.ConfigContext),rt=tt.getPrefixCls,Je=rt("pro-layout-watermark",et),at=X()("".concat(Je,"-wrapper"),l),nt=X()(Je,i),ot=(0,o.useState)(""),Qe=(0,u.Z)(ot,2),it=Qe[0],_e=Qe[1];return(0,o.useEffect)(function(){var be=document.createElement("canvas"),oe=be.getContext("2d"),se=d(oe),lt="".concat((T+C)*se,"px"),st="".concat((f+S)*se,"px"),ct=ye||T/2,dt=Me||f/2;if(be.setAttribute("width",lt),be.setAttribute("height",st),oe){oe.translate(ct*se,dt*se),oe.rotate(Math.PI/180*Number(re));var ut=C*se,qe=S*se;if(_){var pe=new Image;pe.crossOrigin="anonymous",pe.referrerPolicy="no-referrer",pe.src=_,pe.onload=function(){oe.drawImage(pe,0,0,ut,qe),_e(be.toDataURL())}}else if(xe){var ft=Number(Ye)*se;oe.font="".concat(Ee," normal ").concat(V," ").concat(ft,"px/").concat(qe,"px ").concat(ke),oe.fillStyle=Ge,oe.fillText(xe,0,0),_e(be.toDataURL())}}else console.error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas")},[T,f,ye,Me,re,Ee,V,C,S,ke,Ge,_,xe,Ye]),o.createElement("div",{style:(0,M.Z)({position:"relative"},r),className:at},a,o.createElement("div",{className:nt,style:(0,M.Z)({zIndex:y,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundSize:"".concat(T+C,"px"),pointerEvents:"none",backgroundRepeat:"repeat",backgroundImage:"url('".concat(it,"')")},c)}))},E=h,A=["title","content","pageHeaderRender","header","prefixedClassName","extraContent","style","prefixCls","breadcrumbRender"],p=["children","loading","className","style","footer","affixProps","ghost","fixedHeader","breadcrumbRender"];function R(v){return(0,H.Z)(v)==="object"?v:{spinning:v}}var z=function(e){var a=e.tabList,r=e.tabActiveKey,l=e.onTabChange,c=e.tabBarExtraContent,i=e.tabProps,m=e.prefixedClassName;return Array.isArray(a)||c?o.createElement(Be.Z,(0,s.Z)({className:"".concat(m,"-tabs"),activeKey:r,onChange:function(x){l&&l(x)},tabBarExtraContent:c},i),a==null?void 0:a.map(function(y,x){return o.createElement(Be.Z.TabPane,(0,s.Z)({},y,{tab:y.tab,key:y.key||x}))})):null},D=function(e,a,r){return!e&&!a?null:o.createElement("div",{className:"".concat(r,"-detail")},o.createElement("div",{className:"".concat(r,"-main")},o.createElement("div",{className:"".concat(r,"-row")},e&&o.createElement("div",{className:"".concat(r,"-content")},e),a&&o.createElement("div",{className:"".concat(r,"-extraContent")},a))))},U=function(e){var a=useContext(RouteContext);return React.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center"}},React.createElement(_Breadcrumb,_extends({},a==null?void 0:a.breadcrumb,a==null?void 0:a.breadcrumbProps,e)))},W=function(e){var a,r=(0,o.useContext)(Ce.Z),l=e.title,c=e.content,i=e.pageHeaderRender,m=e.header,y=e.prefixedClassName,x=e.extraContent,T=e.style,b=e.prefixCls,f=e.breadcrumbRender,Z=(0,ge.Z)(e,A),C=(0,o.useMemo)(function(){if(!!f)return f},[f]);if(i===!1)return null;if(i)return o.createElement(o.Fragment,null," ",i((0,M.Z)((0,M.Z)({},e),r)));var P=l;!l&&l!==!1&&(P=r.title);var S=(0,M.Z)((0,M.Z)((0,M.Z)({},r),{},{title:P},Z),{},{footer:z((0,M.Z)((0,M.Z)({},Z),{},{breadcrumbRender:f,prefixedClassName:y}))},m),L=S.breadcrumb,re=(!L||!(L==null?void 0:L.itemRender)&&!(L==null||(a=L.routes)===null||a===void 0?void 0:a.length))&&!f;return["title","subTitle","extra","tags","footer","avatar","backIcon"].every(function(_){return!S[_]})&&re&&!c&&!x?null:o.createElement("div",{className:"".concat(y,"-warp")},o.createElement(Ie.Z,(0,s.Z)({},S,{breadcrumb:f===!1?void 0:(0,M.Z)((0,M.Z)({},S.breadcrumb),r.breadcrumbProps),breadcrumbRender:C,prefixCls:b}),(m==null?void 0:m.children)||D(c,x,y)))},F=function(e){var a,r,l=e.children,c=e.loading,i=c===void 0?!1:c,m=e.className,y=e.style,x=e.footer,T=e.affixProps,b=e.ghost,f=e.fixedHeader,Z=e.breadcrumbRender,C=(0,ge.Z)(e,p),P=(0,o.useContext)(Ce.Z),S=(0,o.useContext)(he.ZP.ConfigContext),L=S.getPrefixCls,re=e.prefixCls||L("pro"),_="".concat(re,"-page-container"),xe=X()(_,m,(a={},(0,k.Z)(a,"".concat(re,"-page-container-ghost"),b),(0,k.Z)(a,"".concat(re,"-page-container-with-footer"),x),a)),ye=(0,o.useMemo)(function(){return l?o.createElement(o.Fragment,null,o.createElement("div",{className:"".concat(_,"-children-content")},l),P.hasFooterToolbar&&o.createElement("div",{style:{height:48,marginTop:24}})):null},[l,_,P.hasFooterToolbar]),Me=(0,o.useMemo)(function(){var V;return Z==!1?!1:Z||(C==null||(V=C.header)===null||V===void 0?void 0:V.breadcrumbRender)},[Z,C==null||(r=C.header)===null||r===void 0?void 0:r.breadcrumbRender]),ue=o.createElement(W,(0,s.Z)({},C,{breadcrumbRender:Me,ghost:b,prefixCls:void 0,prefixedClassName:_})),Ee=(0,o.useMemo)(function(){if(o.isValidElement(i))return i;if(typeof i=="boolean"&&!i)return null;var V=R(i);return o.createElement(n.Z,V)},[i]),Pe=(0,o.useMemo)(function(){var V=Ee||ye;return e.waterMarkProps||P.waterMarkProps?o.createElement(E,e.waterMarkProps||P.waterMarkProps,V):V},[e.waterMarkProps,P.waterMarkProps,Ee,ye]);return o.createElement("div",{style:y,className:xe},f&&ue?o.createElement(Se,(0,s.Z)({offsetTop:P.hasHeader&&P.fixedHeader?P.headerHeight:0},T),ue):ue,Pe&&o.createElement(Ue.Z,null,Pe),x&&o.createElement(we,{prefixCls:re},x))},te=F},56264:function(){},53645:function(){},12395:function(){},70883:function(){},81262:function(){},59903:function(){},34952:function(ce,$,t){"use strict";var B=t(22122),j=t(67294),s=t(15105),k=function(O,J){var H={};for(var o in O)Object.prototype.hasOwnProperty.call(O,o)&&J.indexOf(o)<0&&(H[o]=O[o]);if(O!=null&&typeof Object.getOwnPropertySymbols=="function")for(var N=0,o=Object.getOwnPropertySymbols(O);N<o.length;N++)J.indexOf(o[N])<0&&Object.prototype.propertyIsEnumerable.call(O,o[N])&&(H[o[N]]=O[o[N]]);return H},w={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},G=j.forwardRef(function(O,J){var H=function(I){var K=I.keyCode;K===s.Z.ENTER&&I.preventDefault()},o=function(I){var K=I.keyCode,Q=O.onClick;K===s.Z.ENTER&&Q&&Q()},N=O.style,X=O.noStyle,ie=O.disabled,q=k(O,["style","noStyle","disabled"]),Y={};return X||(Y=(0,B.Z)({},w)),ie&&(Y.pointerEvents="none"),Y=(0,B.Z)((0,B.Z)({},Y),N),j.createElement("div",(0,B.Z)({role:"button",tabIndex:0,ref:J},q,{onKeyDown:H,onKeyUp:o,style:Y}))});$.Z=G},36017:function(ce,$,t){"use strict";var B=t(38663),j=t.n(B),s=t(81262),k=t.n(s),w=t(30887),G=t(59250)},37744:function(ce,$,t){"use strict";t.d($,{Z:function(){return we}});var B=t(96156),j=t(28481),s=t(67294),k=t(94184),w=t.n(k),G=t(28991),O={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},J=O,H=t(27029),o=function(n,u){return s.createElement(H.Z,(0,G.Z)((0,G.Z)({},n),{},{ref:u,icon:J}))};o.displayName="ArrowLeftOutlined";var N=s.forwardRef(o),X={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},ie=X,q=function(n,u){return s.createElement(H.Z,(0,G.Z)((0,G.Z)({},n),{},{ref:u,icon:ie}))};q.displayName="ArrowRightOutlined";var Y=s.forwardRef(q),le=t(48717),I=t(65632),K=t(22122),Q=t(85061),fe=t(50344),ae=t(57254),Re=t(81555),Oe=function(g,n){var u={};for(var d in g)Object.prototype.hasOwnProperty.call(g,d)&&n.indexOf(d)<0&&(u[d]=g[d]);if(g!=null&&typeof Object.getOwnPropertySymbols=="function")for(var h=0,d=Object.getOwnPropertySymbols(g);h<d.length;h++)n.indexOf(d[h])<0&&Object.prototype.propertyIsEnumerable.call(g,d[h])&&(u[d[h]]=g[d[h]]);return u},ve=function(n){var u=n.prefixCls,d=n.separator,h=d===void 0?"/":d,E=n.children,A=n.overlay,p=n.dropdownProps,R=Oe(n,["prefixCls","separator","children","overlay","dropdownProps"]),z=s.useContext(I.E_),D=z.getPrefixCls,U=D("breadcrumb",u),W=function(v){return A?s.createElement(Re.Z,(0,K.Z)({overlay:A,placement:"bottomCenter"},p),s.createElement("span",{className:"".concat(U,"-overlay-link")},v,s.createElement(ae.Z,null))):v},F;return"href"in R?F=s.createElement("a",(0,K.Z)({className:"".concat(U,"-link")},R),E):F=s.createElement("span",(0,K.Z)({className:"".concat(U,"-link")},R),E),F=W(F),E?s.createElement("span",null,F,h&&s.createElement("span",{className:"".concat(U,"-separator")},h)):null};ve.__ANT_BREADCRUMB_ITEM=!0;var ee=ve,De=function(n){var u=n.children,d=s.useContext(I.E_),h=d.getPrefixCls,E=h("breadcrumb");return s.createElement("span",{className:"".concat(E,"-separator")},u||"/")};De.__ANT_BREADCRUMB_SEPARATOR=!0;var Ne=De,me=t(7266),Te=t(21687),Ae=t(96159),ne=function(g,n){var u={};for(var d in g)Object.prototype.hasOwnProperty.call(g,d)&&n.indexOf(d)<0&&(u[d]=g[d]);if(g!=null&&typeof Object.getOwnPropertySymbols=="function")for(var h=0,d=Object.getOwnPropertySymbols(g);h<d.length;h++)n.indexOf(d[h])<0&&Object.prototype.propertyIsEnumerable.call(g,d[h])&&(u[d[h]]=g[d[h]]);return u};function de(g,n){if(!g.breadcrumbName)return null;var u=Object.keys(n).join("|"),d=g.breadcrumbName.replace(new RegExp(":(".concat(u,")"),"g"),function(h,E){return n[E]||h});return d}function Se(g,n,u,d){var h=u.indexOf(g)===u.length-1,E=de(g,n);return h?s.createElement("span",null,E):s.createElement("a",{href:"#/".concat(d.join("/"))},E)}var Le=function(n,u){return n=(n||"").replace(/^\//,""),Object.keys(u).forEach(function(d){n=n.replace(":".concat(d),u[d])}),n},he=function(n,u,d){var h=(0,Q.Z)(n),E=Le(u||"",d);return E&&h.push(E),h},Ze=function(n){var u=n.prefixCls,d=n.separator,h=d===void 0?"/":d,E=n.style,A=n.className,p=n.routes,R=n.children,z=n.itemRender,D=z===void 0?Se:z,U=n.params,W=U===void 0?{}:U,F=ne(n,["prefixCls","separator","style","className","routes","children","itemRender","params"]),te=s.useContext(I.E_),v=te.getPrefixCls,e=te.direction,a,r=v("breadcrumb",u);if(p&&p.length>0){var l=[];a=p.map(function(i){var m=Le(i.path,W);m&&l.push(m);var y;return i.children&&i.children.length&&(y=s.createElement(me.Z,null,i.children.map(function(x){return s.createElement(me.Z.Item,{key:x.path||x.breadcrumbName},D(x,W,p,he(l,x.path,W)))}))),s.createElement(ee,{overlay:y,separator:h,key:m||i.breadcrumbName},D(i,W,p,l))})}else R&&(a=(0,fe.Z)(R).map(function(i,m){return i&&((0,Te.Z)(i.type&&(i.type.__ANT_BREADCRUMB_ITEM===!0||i.type.__ANT_BREADCRUMB_SEPARATOR===!0),"Breadcrumb","Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"),(0,Ae.Tm)(i,{separator:h,key:m}))}));var c=w()(r,(0,B.Z)({},"".concat(r,"-rtl"),e==="rtl"),A);return s.createElement("div",(0,K.Z)({className:c,style:E},F),a)};Ze.Item=ee,Ze.Separator=Ne;var Ie=Ze,M=Ie,ge=t(51890),Ke=t(34952),ze=t(42051),Be=function(n,u,d){return!u||!d?null:s.createElement(ze.Z,{componentName:"PageHeader"},function(h){var E=h.back;return s.createElement("div",{className:"".concat(n,"-back")},s.createElement(Ke.Z,{onClick:function(p){d==null||d(p)},className:"".concat(n,"-back-button"),"aria-label":E},u))})},Ce=function(n){return s.createElement(M,n)},Ue=function(n){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"ltr";return n.backIcon!==void 0?n.backIcon:u==="rtl"?s.createElement(Y,null):s.createElement(N,null)},We=function(n,u){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ltr",h=u.title,E=u.avatar,A=u.subTitle,p=u.tags,R=u.extra,z=u.onBack,D="".concat(n,"-heading"),U=h||A||p||R;if(!U)return null;var W=Ue(u,d),F=Be(n,W,z),te=F||E||U;return s.createElement("div",{className:D},te&&s.createElement("div",{className:"".concat(D,"-left")},F,E&&s.createElement(ge.C,E),h&&s.createElement("span",{className:"".concat(D,"-title"),title:typeof h=="string"?h:void 0},h),A&&s.createElement("span",{className:"".concat(D,"-sub-title"),title:typeof A=="string"?A:void 0},A),p&&s.createElement("span",{className:"".concat(D,"-tags")},p)),R&&s.createElement("span",{className:"".concat(D,"-extra")},R))},$e=function(n,u){return u?s.createElement("div",{className:"".concat(n,"-footer")},u):null},Fe=function(n,u){return s.createElement("div",{className:"".concat(n,"-content")},u)},He=function(n){var u=s.useState(!1),d=(0,j.Z)(u,2),h=d[0],E=d[1],A=function(R){var z=R.width;E(z<768)};return s.createElement(I.C,null,function(p){var R,z=p.getPrefixCls,D=p.pageHeader,U=p.direction,W,F=n.prefixCls,te=n.style,v=n.footer,e=n.children,a=n.breadcrumb,r=n.breadcrumbRender,l=n.className,c=!0;"ghost"in n?c=n.ghost:D&&"ghost"in D&&(c=D.ghost);var i=z("page-header",F),m=function(){var C;return((C=a)===null||C===void 0?void 0:C.routes)?Ce(a):null},y=m(),x=a&&"props"in a,T=(W=r==null?void 0:r(n,y))!==null&&W!==void 0?W:y,b=x?a:T,f=w()(i,l,(R={"has-breadcrumb":!!b,"has-footer":!!v},(0,B.Z)(R,"".concat(i,"-ghost"),c),(0,B.Z)(R,"".concat(i,"-rtl"),U==="rtl"),(0,B.Z)(R,"".concat(i,"-compact"),h),R));return s.createElement(le.Z,{onResize:A},s.createElement("div",{className:f,style:te},b,We(i,n,U),e&&Fe(i,e),$e(i,v)))})},we=He},64896:function(ce,$,t){"use strict";var B=t(59903),j=t.n(B),s=t(36017),k=t(94233)}}]);
