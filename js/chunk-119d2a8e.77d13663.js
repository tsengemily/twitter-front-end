(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-119d2a8e"],{"010b":function(t,e,a){},2032:function(t,e){function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}t.exports=a,t.exports["default"]=t.exports,t.exports.__esModule=!0},2375:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner"},[a("div",{staticClass:"bouncing-loader"},[a("div"),a("div"),a("div")])])}],n=(a("ef0c"),a("2877")),o={},i=Object(n["a"])(o,r,s,!1,null,"35d9a48c",null);e["a"]=i.exports},2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a("6795"),s=a("e132"),n=a("a3f3"),o=a("5631");function i(t){return r(t)||s(t)||n(t)||o()}},"30e0":function(t,e,a){"use strict";a("368c")},"368c":function(t,e,a){},"4df4":function(t,e,a){"use strict";var r=a("0366"),s=a("7b0b"),n=a("9bdd"),o=a("e95a"),i=a("50c4"),c=a("8418"),l=a("35a1");t.exports=function(t){var e,a,u,d,m,p,f=s(t),v="function"==typeof this?this:Array,g=arguments.length,b=g>1?arguments[1]:void 0,h=void 0!==b,C=l(f),w=0;if(h&&(b=r(b,g>2?arguments[2]:void 0,2)),void 0==C||v==Array&&o(C))for(e=i(f.length),a=new v(e);e>w;w++)p=h?b(f[w],w):f[w],c(a,w,p);else for(d=C.call(f),m=d.next,a=new v;!(u=m.call(d)).done;w++)p=h?n(d,b,[u.value,w],!0):u.value,c(a,w,p);return a.length=w,a}},"4ef5":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting-container"},[t.isLoading?a("Spinner"):[a("div",{staticClass:"row"},[a("Navbar",{attrs:{isSetting:t.isSetting,MainPage:t.MainPage,PersonalInfo:t.PersonalInfo,ChatRoom:t.ChatRoom}}),a("div",{staticClass:"setting-main"},[a("div",{staticClass:"setting-main-header"},[t._v("帳戶設定")]),a("form",{on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit(e)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"account"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.account,expression:"userData.account"}],staticClass:"form-control",attrs:{id:"accout",type:"text",placeholder:"帳號",required:"",name:"accout"},domProps:{value:t.userData.account},on:{input:function(e){e.target.composing||t.$set(t.userData,"account",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.name,expression:"userData.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",placeholder:"名稱",required:"",name:"name"},domProps:{value:t.userData.name},on:{input:function(e){e.target.composing||t.$set(t.userData,"name",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.email,expression:"userData.email"}],staticClass:"form-control",attrs:{id:"email",type:"email",placeholder:"Email",required:"",name:"email"},domProps:{value:t.userData.email},on:{input:function(e){e.target.composing||t.$set(t.userData,"email",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.password,expression:"userData.password"}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"密碼",required:"",name:"password",autocomplete:"off"},domProps:{value:t.userData.password},on:{input:function(e){e.target.composing||t.$set(t.userData,"password",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"passwordConfirm"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.userData.checkPassword,expression:"userData.checkPassword"}],staticClass:"form-control",attrs:{id:"passwordConfirm",type:"password",placeholder:"密碼確認",required:"",name:"checkPassword",autocomplete:"off"},domProps:{value:t.userData.checkPassword},on:{input:function(e){e.target.composing||t.$set(t.userData,"checkPassword",e.target.value)}}})]),a("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"submit"}},[t._v("儲存")])])])],1)]],2)},s=[],n=a("5530"),o=a("1da1"),i=(a("96cf"),a("b0c0"),a("d178")),c=a("2375"),l=a("1602"),u=a("2fa3"),d=a("2f62"),m={name:"Setting",components:{Navbar:i["a"],Spinner:c["a"]},data:function(){return{MainPage:!1,isSetting:!1,PersonalInfo:!1,ChatRoom:!1,userData:{account:"",name:"",email:"",password:"",checkPassword:""},isLoading:!0,localId:0}},created:function(){var t=this.$router.history.current.name;"Setting"===t&&(this.MainPage=!1,this.isSetting=!0,this.PersonalInfo=!1,this.ChatRoom=!1),this.localId=localStorage.getItem("userId");var e={userId:this.localId},a=e.userId;this.getUserId({userId:a})},methods:{getUserId:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=t.userId,a.prev=1,e.isLoading=!0,a.next=5,l["a"].get({userId:r});case 5:s=a.sent,e.userData=Object(n["a"])({},s.data),e.isLoading=!1,a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](1),e.isLoading=!1,u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試"});case 14:case"end":return a.stop()}}),a,null,[[1,10]])})))()},handleSubmit:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,s,n,o,i,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.isLoading=!0,e.userData.account!==e.userData.email){a.next=5;break}return u["a"].fire({icon:"error",title:"請勿將帳號與密碼設置為一樣"}),a.abrupt("return",!1);case 5:if(e.userData.password===e.userData.checkPassword){a.next=8;break}return u["a"].fire({icon:"error",title:"密碼與確認密碼不一致"}),a.abrupt("return",!1);case 8:return r=t.target,s=new FormData(r),console.log(s),n={userId:e.currentUser.id},o=n.userId,a.next=14,l["a"].updateUserInfo({userId:o,account:e.userData.account,name:e.userData.name,email:e.userData.email,password:e.userData.password,checkPassword:e.userData.checkPassword});case 14:i=a.sent,c=i.data,console.log("data.status",c.status),e.isLoading=!1,e.$router.push({name:"MainPage",params:{id:e.currentUser.id}}),a.next=26;break;case 21:a.prev=21,a.t0=a["catch"](0),e.isLoading=!1,console.log(a.t0),u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試"});case 26:case"end":return a.stop()}}),a,null,[[0,21]])})))()}},computed:Object(n["a"])({},Object(d["b"])(["currentUser","isAuthenticated"]))},p=m,f=(a("30e0"),a("2877")),v=Object(f["a"])(p,r,s,!1,null,"bb495e14",null);e["default"]=v.exports},5631:function(t,e){function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}t.exports=a,t.exports["default"]=t.exports,t.exports.__esModule=!0},"583d":function(t,e,a){},6795:function(t,e,a){var r=a("2032");function s(t){if(Array.isArray(t))return r(t)}t.exports=s,t.exports["default"]=t.exports,t.exports.__esModule=!0},"68b3":function(t,e,a){"use strict";a("010b")},"9bdd":function(t,e,a){var r=a("825a"),s=a("2a62");t.exports=function(t,e,a,n){try{return n?e(r(a)[0],a[1]):e(a)}catch(o){throw s(t),o}}},a3f3:function(t,e,a){a("fb6a"),a("d3b7"),a("b0c0"),a("a630"),a("3ca3");var r=a("2032");function s(t,e){if(t){if("string"===typeof t)return r(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?r(t,e):void 0}}t.exports=s,t.exports["default"]=t.exports,t.exports.__esModule=!0},a630:function(t,e,a){var r=a("23e7"),s=a("4df4"),n=a("1c7e"),o=!n((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:s})},d178:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"nav navbar-container"},[r("ul",{staticClass:"nav mb-4 nav-container"},[r("router-link",{attrs:{to:{name:"MainPage",params:{id:t.currentUser.id}}}},[r("li",{staticClass:"nav-item nav-container-img"},[r("img",{staticClass:"nav-container-img-acLogo",attrs:{src:a("91df"),alt:""}})])]),r("li",{staticClass:"nav-item nav-container-mainPage"},[r("router-link",{staticClass:"nav-container-mainPage-fontColor",class:{routerLinkActive:t.MainPage},attrs:{to:{name:"MainPage",params:{id:t.currentUser.id}}}},[r("i",{staticClass:"fas fa-home nav-container-mainPage-fontColor-linkStyle",staticStyle:{"font-size":"25px"}},[r("span",{staticClass:"nav-container-mainPage-fontColor-linkStyle-fontStyle"},[t._v("首頁")])])])],1),r("li",{staticClass:"nav-item nav-container-mainPage"},[r("router-link",{staticClass:"nav-container-mainPage-fontColor",class:{routerLinkActive:t.ChatRoom},attrs:{to:{name:"PublicChatroom"}}},[r("i",{staticClass:"far fa-envelope nav-container-mainPage-fontColor-linkStyle",staticStyle:{"font-size":"25px"}},[r("span",{staticClass:"nav-container-mainPage-fontColor-linkStyle-fontStyle"},[t._v("公開聊天室")])])])],1),r("li",{staticClass:"nav-item-userData"},[r("router-link",{staticClass:"nav-item-userData-font-color",class:{routerLinkActive:t.PersonalInfo},attrs:{to:{name:"user",params:{id:t.currentUser.id}}}},[r("i",{staticClass:"far fa-user link-style",staticStyle:{"font-size":"25px"}},[r("span",[t._v("個人資料")])])])],1),r("li",{staticClass:"nav-item"},[r("router-link",{staticClass:"font-color",class:{routerLinkActive:t.isSetting},attrs:{to:"/setting"}},[r("i",{staticClass:"fas fa-cog link-style",staticStyle:{"font-size":"25px"}},[r("span",[t._v("設定")])])])],1),r("li",{staticClass:"nav-item"},[t.isSetting?r("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button"}},[t._v(" 註冊 ")]):t._e(),t.MainPage?r("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"button","data-toggle":"modal","data-target":"#tweetModal"}},[t._v(" 推文 ")]):t._e()]),r("li",{staticClass:"nav-item log-out log-out-style"},[r("i",{staticClass:"fas fa-sign-out-alt",staticStyle:{"font-size":"25px"},on:{click:t.logout}},[r("span",[t._v("登出")])])])],1),r("div",{staticClass:"modal fade",attrs:{id:"tweetModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[r("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[r("div",{staticClass:"modal-content"},[t._m(0),r("form",{staticClass:"tweet-textarea",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit(e)}}},[r("div",{staticClass:"modal-counter"},[t._v(" 推文剩餘字數:"+t._s(140-this.description.length)+"字 ")]),r("div",{staticClass:"modal-body"},[r("img",{staticClass:"user-photo",attrs:{src:t.avatar,alt:""}}),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control msg-board",attrs:{placeholder:"有什麼新鮮事?"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),r("div",{staticClass:"modal-footer"},[t.isProcessing?r("button",{staticClass:"btn btn-primary modal-btn-size",attrs:{type:"submit",disabled:""}},[t._v(" 推文中! ")]):t._e(),t.isProcessing?t._e():r("button",{staticClass:"btn btn-primary modal-btn-size",attrs:{type:"submit"}},[t._v(" 推文 ")])])])])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}}),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],n=a("5530"),o=a("2909"),i=a("1da1"),c=(a("96cf"),a("a4d3"),a("e01a"),a("1157")),l=a.n(c),u=a("2f62"),d=a("1602"),m=a("2fa3"),p={name:"Navbar",props:{isSetting:{type:Boolean,default:!1,required:!0},MainPage:{type:Boolean,default:!1,required:!0},PersonalInfo:{type:Boolean,default:!1,required:!0},ChatRoom:{type:Boolean,default:!1,required:!0}},data:function(){return{description:"",userData:{},ModalTweetData:[],isProcessing:!1,avatar:""}},created:function(){this.showAvatar()},methods:{logout:function(){this.$store.commit("revokeAuthentication"),this.$router.push("/login")},showAvatar:function(){this.avatar=localStorage.getItem("avatar")},handleSubmit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s,n,i,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.isProcessing=!0,r=t.target,s=new FormData(r),0!==e.description.length){a.next=8;break}return m["a"].fire({icon:"error",title:"請輸入文字"}),e.isProcessing=!1,a.abrupt("return");case 8:if(!(e.description.length>140)){a.next=12;break}return m["a"].fire({icon:"error",title:"輸入文字不能超過140字"}),e.isProcessing=!1,a.abrupt("return");case 12:return console.log(s),console.log("description",e.description),a.next=16,d["a"].tweet({description:e.description});case 16:if(n=a.sent,i=n.data,"success"===i.status){a.next=20;break}throw new Error(i.message);case 20:return a.next=22,d["a"].mainPage();case 22:c=a.sent,e.ModalTweetData=Object(o["a"])(c.data),e.$emit("afterModalTweet",e.ModalTweetData),l()("#tweetModal").modal("hide"),e.description="",e.isProcessing=!1,a.next=35;break;case 30:a.prev=30,a.t0=a["catch"](0),console.log(a.t0),m["a"].fire({icon:"error",title:"無法建立推文，請稍後再試"}),e.isProcessing=!1;case 35:case"end":return a.stop()}}),a,null,[[0,30]])})))()}},computed:Object(n["a"])({},Object(u["b"])(["currentUser","isAuthenticated"]))},f=p,v=(a("68b3"),a("2877")),g=Object(v["a"])(f,r,s,!1,null,"10935a68",null);e["a"]=g.exports},d28b:function(t,e,a){var r=a("746f");r("iterator")},e132:function(t,e,a){function r(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630"),t.exports=r,t.exports["default"]=t.exports,t.exports.__esModule=!0},ef0c:function(t,e,a){"use strict";a("583d")},fb6a:function(t,e,a){"use strict";var r=a("23e7"),s=a("861d"),n=a("e8b5"),o=a("23cb"),i=a("50c4"),c=a("fc6a"),l=a("8418"),u=a("b622"),d=a("1dde"),m=d("slice"),p=u("species"),f=[].slice,v=Math.max;r({target:"Array",proto:!0,forced:!m},{slice:function(t,e){var a,r,u,d=c(this),m=i(d.length),g=o(t,m),b=o(void 0===e?m:e,m);if(n(d)&&(a=d.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?s(a)&&(a=a[p],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return f.call(d,g,b);for(r=new(void 0===a?Array:a)(v(b-g,0)),u=0;g<b;g++,u++)g in d&&l(r,u,d[g]);return r.length=u,r}})}}]);
//# sourceMappingURL=chunk-119d2a8e.77d13663.js.map