(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6490fa0b"],{"010b":function(t,e,a){},"03aa":function(t,e,a){"use strict";a("5bc5")},"1ed3":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container d-flex"},[a("router-link",{attrs:{to:{name:"user",params:{id:t.topUser.id}}}},[a("img",{staticClass:"user-avatar",attrs:{src:t.topUser.avatar}})]),a("div",[a("h2",{staticClass:"user-name"},[t._v(" "+t._s(t.topUser.name)+" ")]),a("p",{staticClass:"user-account ml-2"},[t._v(" @"+t._s(t.topUser.account)+" ")]),t.topUser.isFollowed?[a("button",{staticClass:"follow-btn following",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteFollow(t.topUser.id)}}},[t._v(" 正在跟隨 ")])]:[a("button",{staticClass:"follow-btn follow",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addFollow(t.topUser.id)}}},[t._v(" 跟隨 ")])]],2)],1)},s=[],n=a("1da1"),i=a("5530"),o=(a("96cf"),a("1602")),c=a("2fa3"),l=a("2f62"),u={props:{initialTopUser:{type:Object,required:!0}},data:function(){return{topUser:this.initialTopUser,followingCount:0}},computed:Object(i["a"])({},Object(l["b"])(["currentUser"])),methods:{addFollow:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o["a"].addFollow({id:t.topUser.id});case 3:if(a=e.sent,r=a.data,"success"===r.status){e.next=7;break}throw new Error(r.message);case 7:t.topUser=Object(i["a"])(Object(i["a"])({},t.topUser),{},{isFollowed:!0}),c["a"].fire({icon:"success",title:"新增跟隨成功"}),t.$emit("after-add-follow",{userId:t.topUser.id}),e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),c["a"].fire({icon:"error",title:"無法新增跟隨，請稍後再試"}),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))()},deleteFollow:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o["a"].deleteFollow({userId:t});case 3:if(r=a.sent,s=r.data,"success"===s.status){a.next=7;break}throw new Error(s.message);case 7:e.topUser=Object(i["a"])(Object(i["a"])({},e.topUser),{},{isFollowed:!1}),c["a"].fire({icon:"success",title:"取消跟隨成功"}),e.$emit("after-delete-follow",{userId:e.topUser.id}),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),c["a"].fire({icon:"error",title:"無法取消跟隨，請稍後再試"}),console.log(a.t0);case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()}}},d=u,f=(a("03aa"),a("2877")),p=Object(f["a"])(d,r,s,!1,null,"6c57f4a0",null);e["a"]=p.exports},"3e69":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header d-flex align-items-center"},[r("div",{on:{click:function(e){return t.$router.back()}}},[r("img",{staticClass:"back-arrow",attrs:{src:a("c5d4")}})]),r("div",[r("router-link",{attrs:{to:{name:"user",params:{id:t.userId}}}},[r("h1",{staticClass:"header-name"},[t._v(t._s(t.userName))])]),r("p",{staticClass:"header-post-counts"},[t._v(t._s(t.userTweetsCount)+"推文")])],1)])},s=[],n=(a("a9e3"),{props:{userId:{type:Number,required:!0},userName:{type:String,required:!0},userTweetsCount:{type:Number,required:!0}}}),i=n,o=(a("5697"),a("2877")),c=Object(o["a"])(i,r,s,!1,null,"d971712c",null);e["a"]=c.exports},5697:function(t,e,a){"use strict";a("e5bf")},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var r=a("1d80"),s=a("5899"),n="["+s+"]",i=RegExp("^"+n+n+"*"),o=RegExp(n+n+"*$"),c=function(t){return function(e){var a=String(r(e));return 1&t&&(a=a.replace(i,"")),2&t&&(a=a.replace(o,"")),a}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5bc5":function(t,e,a){},"68b3":function(t,e,a){"use strict";a("010b")},7156:function(t,e,a){var r=a("861d"),s=a("d2bb");t.exports=function(t,e,a){var n,i;return s&&"function"==typeof(n=e.constructor)&&n!==a&&r(i=n.prototype)&&i!==a.prototype&&s(t,i),t}},a9e3:function(t,e,a){"use strict";var r=a("83ab"),s=a("da84"),n=a("94ca"),i=a("6eeb"),o=a("5135"),c=a("c6b6"),l=a("7156"),u=a("c04e"),d=a("d039"),f=a("7c73"),p=a("241c").f,m=a("06cf").f,v=a("9bf2").f,b=a("58a8").trim,g="Number",C=s[g],h=C.prototype,A=c(f(h))==g,w=function(t){var e,a,r,s,n,i,o,c,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=b(l),e=l.charCodeAt(0),43===e||45===e){if(a=l.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:r=2,s=49;break;case 79:case 111:r=8,s=55;break;default:return+l}for(n=l.slice(2),i=n.length,o=0;o<i;o++)if(c=n.charCodeAt(o),c<48||c>s)return NaN;return parseInt(n,r)}return+l};if(n(g,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var k,_=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof _&&(A?d((function(){h.valueOf.call(a)})):c(a)!=g)?l(new C(w(e)),a,_):w(e)},x=r?p(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),y=0;x.length>y;y++)o(C,k=x[y])&&!o(_,k)&&v(_,k,m(C,k));_.prototype=h,h.constructor=_,i(s,g,_)}},c5d4:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB5SURBVHgB7dfBCYAwEETR0Qoswc6SzreEpAPNQg5R4kGFnct8GMnNBwoi8L7UVtqsnyn5jY9hBYTuCJ8huBnClxGYEEIIIcRXRNTMDUs/7OBW13bZwK/6JYP7aAqGd/EJk0AoQxhhhBEmHkP5r5lhDMRyB1y+EX87AdxCwzt7prpuAAAAAElFTkSuQmCC"},d178:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"nav navbar-container"},[r("ul",{staticClass:"nav mb-4 nav-container"},[r("router-link",{attrs:{to:{name:"MainPage",params:{id:t.currentUser.id}}}},[r("li",{staticClass:"nav-item nav-container-img"},[r("img",{staticClass:"nav-container-img-acLogo",attrs:{src:a("91df"),alt:""}})])]),r("li",{staticClass:"nav-item nav-container-mainPage"},[r("router-link",{staticClass:"nav-container-mainPage-fontColor",class:{routerLinkActive:t.MainPage},attrs:{to:{name:"MainPage",params:{id:t.currentUser.id}}}},[r("i",{staticClass:"fas fa-home nav-container-mainPage-fontColor-linkStyle",staticStyle:{"font-size":"25px"}},[r("span",{staticClass:"nav-container-mainPage-fontColor-linkStyle-fontStyle"},[t._v("首頁")])])])],1),r("li",{staticClass:"nav-item nav-container-mainPage"},[r("router-link",{staticClass:"nav-container-mainPage-fontColor",class:{routerLinkActive:t.ChatRoom},attrs:{to:{name:"PublicChatroom"}}},[r("i",{staticClass:"far fa-envelope nav-container-mainPage-fontColor-linkStyle",staticStyle:{"font-size":"25px"}},[r("span",{staticClass:"nav-container-mainPage-fontColor-linkStyle-fontStyle"},[t._v("公開聊天室")])])])],1),r("li",{staticClass:"nav-item-userData"},[r("router-link",{staticClass:"nav-item-userData-font-color",class:{routerLinkActive:t.PersonalInfo},attrs:{to:{name:"user",params:{id:t.currentUser.id}}}},[r("i",{staticClass:"far fa-user link-style",staticStyle:{"font-size":"25px"}},[r("span",[t._v("個人資料")])])])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"font-color",class:{routerLinkActive:t.isSetting},attrs:{to:"/setting"}},[r("i",{staticClass:"fas fa-cog link-style",staticStyle:{"font-size":"25px"}},[r("span",[t._v("設定")])])])],1),r("li",{staticClass:"nav-item"},[t.isSetting?r("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button"}},[t._v(" 註冊 ")]):t._e(),t.MainPage?r("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button","data-toggle":"modal","data-target":"#tweetModal"}},[t._v(" 推文 ")]):t._e()]),r("li",{staticClass:"nav-item log-out log-out-style"},[r("i",{staticClass:"fas fa-sign-out-alt",staticStyle:{"font-size":"25px"},on:{click:t.logout}},[r("span",[t._v("登出")])])])],1),r("div",{staticClass:"modal fade",attrs:{id:"tweetModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[r("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[r("div",{staticClass:"modal-content"},[t._m(0),r("form",{staticClass:"tweet-textarea",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit(e)}}},[r("div",{staticClass:"modal-counter"},[t._v(" 推文剩餘字數:"+t._s(140-this.description.length)+"字 ")]),r("div",{staticClass:"modal-body"},[r("img",{staticClass:"user-photo",attrs:{src:t.avatar,alt:""}}),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control msg-board",attrs:{placeholder:"有什麼新鮮事?"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),r("div",{staticClass:"modal-footer"},[t.isProcessing?r("button",{staticClass:"btn btn-primary modal-btn-size",attrs:{type:"submit",disabled:""}},[t._v(" 推文中! ")]):t._e(),t.isProcessing?t._e():r("button",{staticClass:"btn btn-primary modal-btn-size",attrs:{type:"submit"}},[t._v(" 推文 ")])])])])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}}),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],n=a("5530"),i=a("2909"),o=a("1da1"),c=(a("96cf"),a("a4d3"),a("e01a"),a("1157")),l=a.n(c),u=a("2f62"),d=a("1602"),f=a("2fa3"),p={name:"Navbar",props:{isSetting:{type:Boolean,default:!1,required:!0},MainPage:{type:Boolean,default:!1,required:!0},PersonalInfo:{type:Boolean,default:!1,required:!0},ChatRoom:{type:Boolean,default:!1,required:!0}},data:function(){return{description:"",userData:{},ModalTweetData:[],isProcessing:!1,avatar:""}},created:function(){this.showAvatar()},methods:{logout:function(){this.$store.commit("revokeAuthentication"),this.$router.push("/login")},showAvatar:function(){this.avatar=localStorage.getItem("avatar")},handleSubmit:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,s,n,o,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.isProcessing=!0,r=t.target,s=new FormData(r),0!==e.description.length){a.next=8;break}return f["a"].fire({icon:"error",title:"請輸入文字"}),e.isProcessing=!1,a.abrupt("return");case 8:if(!(e.description.length>140)){a.next=12;break}return f["a"].fire({icon:"error",title:"輸入文字不能超過140字"}),e.isProcessing=!1,a.abrupt("return");case 12:return console.log(s),console.log("description",e.description),a.next=16,d["a"].tweet({description:e.description});case 16:if(n=a.sent,o=n.data,"success"===o.status){a.next=20;break}throw new Error(o.message);case 20:return a.next=22,d["a"].mainPage();case 22:c=a.sent,e.ModalTweetData=Object(i["a"])(c.data),e.$emit("afterModalTweet",e.ModalTweetData),l()("#tweetModal").modal("hide"),e.description="",e.isProcessing=!1,a.next=35;break;case 30:a.prev=30,a.t0=a["catch"](0),console.log(a.t0),f["a"].fire({icon:"error",title:"無法建立推文，請稍後再試"}),e.isProcessing=!1;case 35:case"end":return a.stop()}}),a,null,[[0,30]])})))()}},computed:Object(n["a"])({},Object(u["b"])(["currentUser","isAuthenticated"]))},m=p,v=(a("68b3"),a("2877")),b=Object(v["a"])(m,r,s,!1,null,"10935a68",null);e["a"]=b.exports},e5bf:function(t,e,a){}}]);
//# sourceMappingURL=chunk-6490fa0b.81602ccc.js.map