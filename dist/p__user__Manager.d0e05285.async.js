(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[106],{51014:function(ee,B,e){"use strict";var U=e(62350),C=e(75443),Y=e(57663),R=e(71577),V=e(34792),M=e(48086),S=e(3182),L=e(2824),G=e(94043),F=e.n(G),o=e(67294),i=e(85893),D=function(O){var P=o.useState(!1),m=(0,L.Z)(P,2),Z=m[0],J=m[1],_=o.useState(!1),W=(0,L.Z)(_,2),te=W[0],K=W[1],p=function(){J(!0)},w=function(){var A=(0,S.Z)(F().mark(function H(){var j,I;return F().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return K(!0),h.prev=1,h.next=4,O.request();case 4:j=h.sent,j.code===1e3?M.default.success("\u5220\u9664\u6210\u529F"):M.default.error(j.msg);case 6:return h.prev=6,J(!1),K(!1),(I=O.table.current)===null||I===void 0||I.reload(),h.finish(6);case 11:case"end":return h.stop()}},H,null,[[1,,6,11]])}));return function(){return A.apply(this,arguments)}}(),x=function(){J(!1)};return(0,i.jsx)(C.Z,{title:O.title,visible:Z,onConfirm:w,okButtonProps:{loading:te},onCancel:x,children:(0,i.jsx)(R.Z,{type:"primary",danger:!0,onClick:p,children:O.children})})};B.Z=D},72152:function(ee,B,e){"use strict";var U=e(64896),C=e(37744),Y=e(98858),R=e(4914),V=e(71153),M=e(60331),S=e(57663),L=e(71577),G=e(67294),F=e(37476),o=e(96534),i=e(85893),D=function(O){var P,m=O.info;return(0,i.jsx)(F.Z,{title:m.title,width:800,trigger:(0,i.jsx)(L.Z,{type:"primary",children:m.title}),submitter:!1,children:(0,i.jsx)(C.Z,{title:(0,i.jsx)("span",{style:{color:o.dj},children:m.name}),className:"site-page-header",subTitle:m.introduction,tags:typeof m.tag=="string"?(0,i.jsx)(M.Z,{color:o.dj,children:m.tag}):m.tag,avatar:{src:m.avatar},children:(0,i.jsx)(R.Z,{size:"middle",column:3,children:(P=m.info)===null||P===void 0?void 0:P.map(function(Z){return(0,i.jsx)(R.Z.Item,{label:(0,i.jsx)(M.Z,{color:o.dj,children:Z.label}),children:(0,i.jsx)("span",{style:{color:o.dj},children:Z.value})},Z.value)})})})})};B.Z=D},90055:function(ee,B,e){"use strict";e.r(B),e.d(B,{default:function(){return ge}});var U=e(3182),C=e(2824),Y=e(86582),R=e(71153),V=e(60331),M=e(94233),S=e(51890),L=e(47673),G=e(4107),F=e(94043),o=e.n(F),i=e(77948),D=e(67294),b=e(38315),O=e(43185),P=e(94412),m=e(49111),Z=e(19650),J=e(34792),_=e(48086),W=e(11849),te=e(57663),K=e(71577),p=e(952),w=e(37476),x=e(5966),A=e(64317),H=e(63434),j=e(45779),I=e(89366),ne=e(62298),h=e(68139),t=e(85893),T=JSON.parse(localStorage.getItem("token")||"{}"),se=function(E){var k=(0,D.useState)(),Q=(0,C.Z)(k,2),X=Q[0],z=Q[1],q=E.table,N=E.title,f=E.info,n=f.user,r=f.roleList,d=E.onFinish;return(0,t.jsxs)(w.Z,{title:N,width:800,trigger:(0,t.jsx)(K.Z,{type:"primary",children:N}),modalProps:{destroyOnClose:!0},submitter:{searchConfig:{submitText:N,resetText:"\u53D6\u6D88"}},onFinish:function(){var l=(0,U.Z)(o().mark(function s(a){var y,c;return o().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,d((0,W.Z)((0,W.Z)({},a),{},{id:n==null?void 0:n.id}),a.roles.map(function(g){return{id:g}}));case 2:return c=u.sent,c.code===1e3&&_.default.success("\u6DFB\u52A0\u6210\u529F"),u.next=6,(y=q.current)===null||y===void 0?void 0:y.reload();case 6:return u.abrupt("return",!0);case 7:case"end":return u.stop()}},s)}));return function(s){return l.apply(this,arguments)}}(),children:[(0,t.jsx)(S.C,{src:X,icon:(0,t.jsx)(I.Z,{})}),(0,t.jsxs)(p.UW,{children:[(0,t.jsx)(x.Z,{width:"md",name:"username",label:"\u7528\u6237\u540D",rules:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A!"}],initialValue:n.username,disabled:n.id!==void 0,placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"}),(0,t.jsx)(x.Z.Password,{width:"md",name:"password",label:"\u5BC6\u7801",initialValue:n.password,rules:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A!"}],hasFeedback:!0,placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801"})]}),(0,t.jsxs)(p.UW,{children:[(0,t.jsx)(x.Z,{width:"sm",name:"avatar",label:"\u5934\u50CF",initialValue:n.avatar,fieldProps:{onChange:function(s){return z(s.target.value)},value:X},placeholder:"\u8BF7\u8F93\u5165\u5934\u50CF\u7F51\u5740"}),(0,t.jsx)(h.Z,{quality:.1,rotate:!0,children:(0,t.jsx)(P.Z,{action:"/antq/web/minio/upload",headers:{Authorization:(T==null?void 0:T.token_type)+" "+(T==null?void 0:T.access_token)},showUploadList:!1,onChange:function(s){var a;s.file.status==="done"&&z((a=s.file.response)===null||a===void 0?void 0:a.data)},children:(0,t.jsxs)(Z.Z,{direction:"vertical",children:[(0,t.jsx)("div",{children:"upload"}),(0,t.jsx)(K.Z,{icon:(0,t.jsx)(ne.Z,{}),type:"primary",children:"\u4E0A\u4F20"})]})})}),(0,t.jsx)(x.Z,{width:"md",name:"nickname",label:"\u6635\u79F0",initialValue:n.nickname,tooltip:"What do you want others to call you?",rules:[{required:!0,message:"\u6635\u79F0\u4E0D\u80FD\u4E3A\u7A7A!",whitespace:!0}],placeholder:"\u8BF7\u8F93\u5165\u6635\u79F0"})]}),(0,t.jsxs)(p.UW,{children:[(0,t.jsx)(A.Z,{mode:"multiple",width:"md",name:"roles",label:"\u89D2\u8272",initialValue:r.map(function(l){return l.id}),request:(0,U.Z)(o().mark(function l(){var s,a;return o().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,(0,j.Oj)();case 2:return a=c.sent,c.abrupt("return",(a==null||(s=a.data)===null||s===void 0?void 0:s.filter(function(v){var u,g;return(v==null||(u=v.role)===null||u===void 0?void 0:u.id)&&(v==null||(g=v.role)===null||g===void 0?void 0:g.roleName)}).map(function(v){var u,g;return{label:((u=v.role)===null||u===void 0?void 0:u.roleName)||"",value:((g=v.role)===null||g===void 0?void 0:g.id)||""}}))||[]);case 4:case"end":return c.stop()}},l)})),placeholder:"\u8BF7\u9009\u62E9\u89D2\u8272",rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u89D2\u8272!"}]}),(0,t.jsx)(x.Z,{width:"md",name:"phone",initialValue:n.phone,label:"\u624B\u673A\u53F7\u7801",rules:[{required:!0,message:"\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A!"}],placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801"})]}),(0,t.jsxs)(p.UW,{children:[(0,t.jsx)(x.Z,{width:"md",name:"email",label:"\u90AE\u7BB1",initialValue:n.email,rules:[{type:"email",message:"\u90AE\u7BB1\u4E0D\u5408\u6CD5!"}],placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1"}),(0,t.jsx)(A.Z,{width:"md",name:"gender",label:"\u6027\u522B",initialValue:n.gender+"",valueEnum:{"1":"\u7537","0":"\u5973"},placeholder:"\u8BF7\u9009\u62E9\u6027\u522B",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u6027\u522B!"}]})]}),(0,t.jsxs)(H.Z,{width:"md",name:"agreement",rules:[{validator:function(s,a){return a?Promise.resolve():Promise.reject(new Error("\u8BF7\u5148\u9605\u8BFB\u534F\u8BAE"))}}],valuePropName:"checked",children:["\u6211\u5DF2\u7ECF\u9605\u8BFB\u76F8\u5173 ",(0,t.jsx)("a",{href:"",children:"\u534F\u8BAE"})]})]})},ae=se,ue=e(16346),re=e(32819),le=e(89178),oe=e(18603),ie=e(68628),de=e(54977),ve=e(73171),me=e(76570),ce=e(31223),fe=e(72152),he=e(51014),$=e(96534),Ee=G.Z.Search,je=function(){var E=(0,D.useRef)(),k=[{dataIndex:"index",valueType:"indexBorder",width:40},{title:(0,t.jsx)(ue.Z,{style:{fontSize:"20px"}}),dataIndex:["user","avatar"],render:function(n){return(0,t.jsx)(S.C,{src:n})}},{title:"\u7528\u6237\u540D\u79F0",dataIndex:["user","username"],render:function(n){return(0,t.jsx)(V.Z,{style:{fontSize:"14px"},color:$.dj,icon:(0,t.jsx)(I.Z,{style:{fontSize:16}}),children:n})}},{title:"\u6635\u79F0",dataIndex:["user","nickname"]},{title:"\u624B\u673A\u53F7\u7801",dataIndex:["user","phone"]},{title:"\u90AE\u7BB1",dataIndex:["user","email"]},{title:"\u6027\u522B",dataIndex:["user","gender"],render:function(n){return n===1?(0,t.jsx)(re.Z,{spin:!0,style:{color:$.dj}}):n===0?(0,t.jsx)(le.Z,{spin:!0,style:{color:"#FA541C"}}):"\u672A\u77E5"}},{title:"\u89D2\u8272",dataIndex:"roleList",render:function(n){return n==null?void 0:n.map(function(r){return(0,t.jsx)(V.Z,{icon:(0,t.jsx)(oe.Z,{}),color:$.dj,children:r.roleName},r.id)})}},{title:"\u64CD\u4F5C",key:"option",width:200,valueType:"option",render:function(n,r){var d=r.user,l=r.roleList,s={title:(0,t.jsx)(ie.Z,{style:{fontSize:16}}),avatar:d.avatar,name:d.username||"",introduction:d.nickname,tag:d.gender===1?(0,t.jsx)(re.Z,{spin:!0,style:{color:$.dj}}):d.gender===0?(0,t.jsx)(le.Z,{spin:!0,style:{color:$.Dj}}):"\u672A\u77E5",info:[{label:"\u90AE\u7BB1",value:d.email},{label:"\u624B\u673A",value:d.phone}].concat((0,Y.Z)(l==null?void 0:l.map(function(a){return{label:"\u89D2\u8272",value:a.roleName}})))};return[(0,t.jsx)(fe.Z,{info:s},d.id),(0,t.jsx)(ae,{table:E,title:(0,t.jsx)(de.Z,{style:{fontSize:16}}),info:r,onFinish:j.Nq},"update"),(0,t.jsx)(he.Z,{title:"\u786E\u5B9A\u5220\u9664\u7528\u6237?",table:E,request:function(){return(0,j.h8)(d.id||"")},children:(0,t.jsx)(ve.Z,{style:{fontSize:16}})},"del")]}}],Q={user:{},roleList:[]},X=(0,D.useState)(""),z=(0,C.Z)(X,2),q=z[0],N=z[1];return(0,t.jsx)(b.ZP,{children:(0,t.jsx)(i.ZP,{columns:k,pagination:{size:"default",pageSize:10},actionRef:E,request:function(){var f=(0,U.Z)(o().mark(function n(r){var d,l;return o().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=r.pageSize,l=r.current,a.abrupt("return",(0,j.tM)({pageSize:d,pageNum:l,search:q}).then(function(y){var c,v;return{data:(c=y.data)===null||c===void 0?void 0:c.list,success:!0,total:(v=y.data)===null||v===void 0?void 0:v.total}}));case 2:case"end":return a.stop()}},n)}));return function(n){return f.apply(this,arguments)}}(),headerTitle:(0,t.jsx)(Ee,{allowClear:!0,enterButton:(0,t.jsx)(me.Z,{}),onSearch:function(n){var r;N(n),(r=E.current)===null||r===void 0||r.reload()}}),rowKey:function(n){return n.user.id||""},toolBarRender:function(){return[(0,t.jsx)(ae,{table:E,title:(0,t.jsx)(ce.Z,{style:{fontSize:16}}),info:Q,onFinish:j.cn})]},search:!1})})},ge=je}}]);
