(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[7724],{78108:function(At,T,t){"use strict";t.r(T),t.d(T,{Content:function(){return Dt}});var v=t(71748),g=t(33860),y=t(48736),P=t(27049),st=t(64896),p=t(37744),rt=t(402),O=t(95574),lt=t(12968),R=t(62462),Ct=t(49111),N=t(19650),Tt=t(43185),z=t(94412),i=t(57663),r=t(71577),A=t(34792),M=t(48086),s=t(71153),W=t(60331),f=t(37730),I=t(33565),X=t(13062),w=t(71230),ot=t(89032),l=t(15746),$=t(67294),j=t(93179),k=t(58533),q=t(71455),dt=t(9684),H=t(96534),vt=t(62298),Z=t(73171),et=t(21444),It=t(38296),ct=t(17474),n=t(85893),jt=10,Y=JSON.parse(localStorage.getItem("token")||"{}"),Dt=function(K){var nt=K.children,at=K.extraContent,D=K.left;return D?(0,n.jsxs)(w.Z,{gutter:16,children:[(0,n.jsx)(l.Z,{children:at}),(0,n.jsx)(l.Z,{style:{flex:1},children:nt})]}):(0,n.jsxs)(w.Z,{gutter:16,children:[(0,n.jsx)(l.Z,{style:{flex:1},children:nt}),(0,n.jsx)(l.Z,{children:at})]})},mt=function(){var K,nt=(0,$.useState)((dt.m===null||dt.m===void 0||(K=dt.m.location)===null||K===void 0?void 0:K.state)||{}),at=(0,I.Z)(nt,1),D=at[0],G=D.id,it=D.title,e=D.station,Zt=D.cover,V=D.count,S=D.tag,Lt=D.author,Ot=D.model,Bt=D.summary,ut=(0,$.useState)(),h=(0,I.Z)(ut,2),c=h[0],L=h[1],B=(0,$.useState)([]),C=(0,I.Z)(B,2),u=C[0],E=C[1],o=c||{},U=o.pageNum,tt=U===void 0?0:U,Et=o.nextPage,x=Et===void 0?0:Et,Mt=(0,$.useState)(!1),ft=(0,I.Z)(Mt,2),J=ft[0],Ut=ft[1],ht=(0,$.useState)(!1),F=(0,I.Z)(ht,2),Q=F[0],gt=F[1],_t=function(_){return(0,j.vz)({albumId:_,pageNum:tt+1,pageSize:jt}).then(function(d){var m;L(d==null?void 0:d.data),E([].concat((0,f.Z)(u),(0,f.Z)((d==null||(m=d.data)===null||m===void 0?void 0:m.list)||[])))})};return(0,$.useEffect)(function(){G===void 0?(0,ct.Br)(ct.jR,null):_t(G)},[]),(0,n.jsxs)("div",{style:{margin:"0 6%"},children:[(0,n.jsx)(p.Z,{style:{border:"1px solid rgb(235, 237, 240)"},onBack:function(){return dt.m.goBack()},title:it,subTitle:"".concat(V,"P"),tags:[(0,n.jsx)(W.Z,{color:H.dj,children:Ot},"model"),(0,n.jsx)(W.Z,{color:H.dj,children:e},"station"),(0,n.jsx)(W.Z,{color:H.dj,children:Lt},"author")].concat((0,f.Z)((S==null?void 0:S.split(",").map(function(a){return(0,n.jsx)(W.Z,{color:H.dj,children:a},a)}))||[])),extra:(0,n.jsxs)(N.Z,{size:"large",children:[(0,n.jsx)(z.Z,{action:"/antq/web/album/add-pic",data:{albumId:G},headers:{Authorization:(Y==null?void 0:Y.token_type)+" "+(Y==null?void 0:Y.access_token)},showUploadList:!1,listType:"picture",onChange:function(_){if(_.file.status==="done"){var d=_.file.response,m=d.data,b=d.code,xt=d.msg;b===1e3?(E([m].concat((0,f.Z)(u))),M.ZP.success("\u4E0A\u4F20\u6210\u529F")):M.ZP.error(xt)}},children:(0,n.jsx)(r.Z,{icon:(0,n.jsx)(vt.Z,{}),type:"primary",children:"\u4E0A\u4F20"})}),(0,n.jsx)(Z.Z,{onClick:function(){return gt(!Q)},style:{fontSize:20,color:Q?"gray":"orangered"}},"del"),(0,n.jsx)("div",{onClick:function(){return Ut(!J)},children:J?(0,n.jsx)(et.Z,{style:{fontSize:20}}):(0,n.jsx)(It.Z,{style:{fontSize:20}})},"full")]}),children:(0,n.jsxs)(Dt,{left:!0,extraContent:(0,n.jsx)(R.Z,{width:120,height:120,preview:!1,style:{objectFit:"cover"},src:Zt,alt:it}),children:[(0,n.jsx)(O.Z.Title,{level:4,children:Ot}),(0,n.jsx)(O.Z.Paragraph,{children:Bt})]})}),(0,n.jsx)(P.Z,{orientation:"left",plain:!0,dashed:!0,children:(0,n.jsx)(O.Z.Text,{type:"secondary",style:{fontSize:12},strong:!0,children:"\u56FE\u7247\u5C55\u793A"})}),(0,n.jsx)(k.Z,{dataLength:(u==null?void 0:u.length)||0,next:function(){return _t(G)},hasMore:x!==0,loader:(0,n.jsx)(g.Z,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:(0,n.jsx)(P.Z,{plain:!0,children:"It is all, nothing more \u{1F910}"}),scrollableTarget:"scrollableDiv",children:(0,n.jsx)("div",{className:"photo",children:(0,n.jsx)(q.TV,{bannerVisible:!1,maskOpacity:.5,children:u.map(function(a){return(0,n.jsxs)(N.Z,{direction:"vertical",style:{margin:10,border:"1px solid rgba(158,158,158,.05)"},children:[Q?(0,n.jsx)(Z.Z,{onClick:function(){(0,j.xM)(a.id).then(function(){return E((0,f.Z)(u.filter(function(d){return d.id!==a.id})))})},style:{fontSize:20,textAlign:"end",visibility:Q?"visible":"hidden",color:"orangered",opacity:.6}}):(0,n.jsx)(n.Fragment,{}),(0,n.jsx)(q.HI,{src:a.url,children:J?(0,n.jsx)("img",{src:a.url,style:{maxWidth:"98%",margin:"1%"},alt:""}):(0,n.jsx)("img",{src:a.url,className:"img",style:{maxHeight:280,margin:5},alt:""})})]},a.id)})})})})]})};T.default=mt},55213:function(At,T,t){"use strict";t.r(T);var v=t(13062),g=t(71230),y=t(89032),P=t(15746),st=t(58024),p=t(91894),rt=t(71153),O=t(60331),lt=t(12968),R=t(62462),Ct=t(71748),N=t(33860),Tt=t(48736),z=t(27049),i=t(402),r=t(95574),A=t(47673),M=t(4107),s=t(37730),W=t(43185),f=t(94412),I=t(49111),X=t(19650),w=t(94233),ot=t(51890),l=t(96132),$=t(57663),j=t(71577),k=t(33565),q=t(71343),dt=t(34792),H=t(48086),vt=t(57361),Z=t(67294),et=t(93179),It=t(58533),ct=t(63511),n=t(73171),jt=t(88528),Y=t(89366),Dt=t(62298),mt=t(5966),Pt=t(37476),K=t(24739),nt=t(90672),at=t(32293),D=t(78108),G=t(96534),it=t(17474),e=t(85893),Zt="\u6DFB\u52A0\u56FE\u96C6",V=JSON.parse(localStorage.getItem("token")||"{}"),S=function(h){var c=h.label,L=h.name;return(0,e.jsx)(mt.Z,{width:"md",name:L,label:c,rules:[{required:!0,message:"".concat(c,"\u4E0D\u80FD\u4E3A\u7A7A!")}],placeholder:"\u8BF7\u8F93\u5165".concat(c)})},Lt=function(h){var c=h.album,L=h.refresh;return(0,e.jsx)(Pt.Y,{title:"\u5220\u9664".concat(c.title),width:400,trigger:(0,e.jsx)(n.Z,{style:{fontSize:20,color:"orangered",opacity:.6}}),modalProps:{destroyOnClose:!0},onFinish:(0,vt.Z)((0,q.Z)().mark(function B(){var C,u;return(0,q.Z)().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,et.RA)((C=c.id)!==null&&C!==void 0?C:"");case 2:return u=o.sent,u.code===1e3&&H.ZP.success("\u5220\u9664\u6210\u529F"),L(),o.abrupt("return",!0);case 6:case"end":return o.stop()}},B)})),children:(0,e.jsxs)("b",{children:["\u786E\u8BA4\u5220\u9664",c.title,"?"]})})},Ot=function(h){var c=(0,Z.useState)(),L=(0,k.Z)(c,2),B=L[0],C=L[1],u=h.refresh;return(0,e.jsxs)(Pt.Y,{title:(0,e.jsx)("b",{children:Zt}),width:740,trigger:(0,e.jsx)(j.Z,{type:"primary",children:(0,e.jsx)(jt.Z,{style:{fontSize:16}})}),modalProps:{destroyOnClose:!0},onFinish:function(){var E=(0,vt.Z)((0,q.Z)().mark(function o(U){var tt;return(0,q.Z)().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,(0,et.Ac)((0,l.Z)((0,l.Z)({},U),{},{cover:B}));case 2:return tt=x.sent,tt.code===1e3&&H.ZP.success("\u6DFB\u52A0\u6210\u529F"),u(),x.abrupt("return",!0);case 6:case"end":return x.stop()}},o)}));return function(o){return E.apply(this,arguments)}}(),submitter:{searchConfig:{submitText:"\u6DFB\u52A0",resetText:"\u53D6\u6D88"}},children:[(0,e.jsx)(ot.C,{src:B,icon:(0,e.jsx)(Y.Z,{})}),(0,e.jsxs)(K.UW,{children:[(0,e.jsx)(S,{name:"title",label:"\u6807\u9898"}),(0,e.jsx)(S,{name:"station",label:"\u7AD9\u70B9"}),(0,e.jsx)(S,{name:"author",label:"\u4F5C\u8005"}),(0,e.jsx)(S,{name:"model",label:"\u6A21\u7279"}),(0,e.jsx)(mt.Z,{width:"sm",name:"cover",label:"\u5C01\u9762",fieldProps:{onChange:function(o){return C(o.target.value)},value:B},placeholder:"\u8BF7\u8F93\u5165/\u4E0A\u4F20\u5C01\u9762"}),(0,e.jsx)(f.Z,{action:"/antq/web/minio/upload",headers:{Authorization:(V==null?void 0:V.token_type)+" "+(V==null?void 0:V.access_token)},showUploadList:!1,onChange:function(o){var U;o.file.status==="done"&&C((U=o.file.response)===null||U===void 0?void 0:U.data)},children:(0,e.jsxs)(X.Z,{direction:"vertical",children:[(0,e.jsx)("div",{children:"upload"}),(0,e.jsx)(j.Z,{icon:(0,e.jsx)(Dt.Z,{}),type:"primary",children:"\u4E0A\u4F20"})]})}),(0,e.jsx)(S,{name:"tag",label:"\u6807\u7B7E"}),(0,e.jsx)(nt.Z,{width:690,name:"summary",label:"\u63CF\u8FF0",placeholder:"\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F"}),(0,e.jsx)(at.Z,{width:690,fieldProps:{beforeUpload:function(o){return o.size/(1024*1024)>100?(H.ZP.success("\u4E0A\u4F20\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7100MB"),f.Z.LIST_IGNORE):!1}},max:1,label:"\u56FE\u96C6ZIP",name:"file"})]})]})},Bt=function(){var h=(0,Z.useState)(),c=(0,k.Z)(h,2),L=c[0],B=c[1],C=(0,Z.useState)([]),u=(0,k.Z)(C,2),E=u[0],o=u[1],U=L||{},tt=U.nextPage,Et=tt===void 0?0:tt,x=(0,Z.useState)(!1),Mt=(0,k.Z)(x,2),ft=Mt[0],J=Mt[1],Ut=(0,Z.useState)({pageNum:0,pageSize:8}),ht=(0,k.Z)(Ut,2),F=ht[0],Q=ht[1],gt=function(){J(!0),(0,et.U8)(F).then(function(_){var d,m,b;B(_==null?void 0:_.data),o([].concat((0,s.Z)(E),(0,s.Z)((_==null||(d=_.data)===null||d===void 0?void 0:d.list)||[]))),Q((0,l.Z)((0,l.Z)({},F),{},{pageNum:((m=_==null||(b=_.data)===null||b===void 0?void 0:b.pageNum)!==null&&m!==void 0?m:0)+1}))}).then(function(){return J(!1)})},_t=function(){J(!0),(0,et.U8)((0,l.Z)((0,l.Z)({},F),{},{pageNum:0})).then(function(_){var d,m,b;B(_==null?void 0:_.data),o((_==null||(d=_.data)===null||d===void 0?void 0:d.list)||[]),Q((0,l.Z)((0,l.Z)({},F),{},{pageNum:((m=_==null||(b=_.data)===null||b===void 0?void 0:b.pageNum)!==null&&m!==void 0?m:0)+1}))}),J(!1)};return(0,Z.useEffect)(function(){gt()},[]),(0,Z.useEffect)(function(){_t()},[F.search]),(0,e.jsxs)(ct.ZP,{children:[(0,e.jsxs)(X.Z,{size:"large",children:[(0,e.jsx)(M.Z.Search,{style:{width:240},loading:ft,onSearch:function(_){Q((0,l.Z)((0,l.Z)({},F),{},{pageNum:0,search:_}))},enterButton:!0}),(0,e.jsx)(Ot,{refresh:_t})]}),(0,e.jsx)(z.Z,{orientation:"left",plain:!0,dashed:!0,children:(0,e.jsx)(r.Z.Text,{type:"secondary",style:{fontSize:12},strong:!0,children:"\u56FE\u96C6\u5C55\u793A"})}),(0,e.jsx)(It.Z,{dataLength:(E==null?void 0:E.length)||0,next:function(){return gt()},hasMore:Et!==0,loader:(0,e.jsx)(N.Z,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:(0,e.jsx)(z.Z,{plain:!0,children:"It is all, nothing more \u{1F910}"}),scrollableTarget:"scrollableDiv",children:(0,e.jsx)(g.Z,{style:{padding:10},children:E.map(function(a){return(0,e.jsx)(P.Z,{span:6,style:{padding:6},children:(0,e.jsxs)(p.Z,{style:{padding:5},bordered:!0,hoverable:!0,size:"small",cover:(0,e.jsx)(R.Z,{className:"card",width:"100%",height:240,preview:!1,style:{objectFit:"cover",borderRadius:2},src:a.cover,onClick:function(){return(0,it.Br)(it.UD,a)},alt:a.title}),children:[(0,e.jsx)(r.Z.Title,{level:5,children:a.title}),(0,e.jsxs)(D.Content,{extraContent:(0,e.jsx)(Lt,{album:a,refresh:_t}),children:[(0,e.jsxs)(O.Z,{color:G.dj,children:[a.count,"P"]}),(0,e.jsxs)(O.Z,{color:G.dj,children:["\u6A21\u7279-",a.model]}),(0,e.jsx)(O.Z,{color:G.dj,children:a.station})]})]})},a.id)})})})]})};T.default=Bt},93179:function(At,T,t){"use strict";t.d(T,{vz:function(){return st},U8:function(){return rt},RA:function(){return lt},xM:function(){return Ct},Ac:function(){return Tt}});var v=t(71343),g=t(96132),y=t(57361),P=t(21704);function st(i,r){return p.apply(this,arguments)}function p(){return p=(0,y.Z)((0,v.Z)().mark(function i(r,A){return(0,v.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,P.WY)("/antq/web/album/info-page",(0,g.Z)({method:"POST",data:r},A||{})));case 1:case"end":return s.stop()}},i)})),p.apply(this,arguments)}function rt(i,r){return O.apply(this,arguments)}function O(){return O=(0,y.Z)((0,v.Z)().mark(function i(r,A){return(0,v.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,P.WY)("/antq/web/album/album-page",(0,g.Z)({method:"POST",data:r},A||{})));case 1:case"end":return s.stop()}},i)})),O.apply(this,arguments)}function lt(i,r){return R.apply(this,arguments)}function R(){return R=(0,y.Z)((0,v.Z)().mark(function i(r,A){return(0,v.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,P.WY)("/antq/web/album/delete",(0,g.Z)({params:{id:r},method:"DELETE"},A||{})));case 1:case"end":return s.stop()}},i)})),R.apply(this,arguments)}function Ct(i,r){return N.apply(this,arguments)}function N(){return N=(0,y.Z)((0,v.Z)().mark(function i(r,A){return(0,v.Z)().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,P.WY)("/antq/web/album/delete-pic",(0,g.Z)({params:{id:r},method:"DELETE"},A||{})));case 1:case"end":return s.stop()}},i)})),N.apply(this,arguments)}function Tt(i,r){return z.apply(this,arguments)}function z(){return z=(0,y.Z)((0,v.Z)().mark(function i(r,A){var M,s,W,f,I,X,w,ot,l;return(0,v.Z)().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return M=r.title,s=r.station,W=r.cover,f=r.tag,I=r.author,X=r.model,w=r.summary,ot=r.file,l=new FormData,l.append("file",ot[0].originFileObj),M&&l.append("title",M),s&&l.append("station",s),W&&l.append("cover",W),f&&l.append("tag",f),I&&l.append("author",I),X&&l.append("model",X),w&&l.append("summary",w),j.abrupt("return",(0,P.WY)("/antq/web/album/upload",(0,g.Z)({method:"POST",headers:{"Content-Type":"multipart/form-data"},data:l},A||{})));case 11:case"end":return j.stop()}},i)})),z.apply(this,arguments)}},17474:function(At,T,t){"use strict";t.d(T,{Ld:function(){return g},Gp:function(){return y},_h:function(){return P},UD:function(){return st},jR:function(){return p},Br:function(){return rt}});var v=t(9684),g="/snowball/stock-info",y="/blog/detail",P="/util/vditor",st="/album/detail",p="/album/list",rt=function(lt,R){return v.m.push(lt,R)}}}]);
