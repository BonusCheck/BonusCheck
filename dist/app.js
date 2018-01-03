
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
var bind = __webpack_require__(10);
var isBuffer = __webpack_require__(33);
var listToStyles = __webpack_require__(31)
var normalizeHeaderName = __webpack_require__(35);
var settle = __webpack_require__(36);
var buildURL = __webpack_require__(38);
var parseHeaders = __webpack_require__(39);
var isURLSameOrigin = __webpack_require__(40);
var createError = __webpack_require__(12);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(41);
      var cookies = __webpack_require__(42);
var enhanceError = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_sidebar__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_addUser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_deleteUser__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_addInstaller__ = __webpack_require__(64);
//
//
//
//
//
//
//

var axios = __webpack_require__(5);
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Dash',
  components: {
  	'side-bar': __WEBPACK_IMPORTED_MODULE_0__components_sidebar__["a" /* default */],
    'add-user': __WEBPACK_IMPORTED_MODULE_1__components_addUser__["a" /* default */],
    'delete-user': __WEBPACK_IMPORTED_MODULE_2__components_deleteUser__["a" /* default */],
    'add-installer': __WEBPACK_IMPORTED_MODULE_3__components_addInstaller__["a" /* default */]
  },
  data: function data(){
  	return {
      user: '',
      buttons: [],
      currentView: 'add-user'
    }
  }, 
  methods: {
    updateView: function(view){
      this.currentView = view;
    }
  },
      //If no session received, return home
      if(!req.data.roll){
        this$1.$router.push('/');
      }

      if(req.data.roll === 'Admin'){
        this$1.buttons.push(
          {
            name: 'Add user',
            link: 'add-user'
          },
          {
            name: 'Delete user',
            link: 'delete-user'
          },
          {
            name: 'Add installer',
            link: 'add-installer'
          },
          {
            name: 'View transaction logs'
          },
          {
            name: 'Enter time worked'
          },
          {
            name: 'View project data'
          },
          {
           name: 'View bonus schedule' 
          },
          {
            name: 'View bonus history'
          },
          {
            name: 'View payment history'
          },
          {
            name: 'Approve time'
          },
          {
            name: 'Create a project'
          },
          {
            name: 'Create a customer'
          },
          {
            name: 'Create roles'
          },
          {
            name: 'Modify roles'
          },
          {
            name: 'Modify project'
          },
          {
            name: 'Modify bonuses'
          },
          {
            name: 'Create payments'
          },
          {
            name: 'Modify payments'
          },
          {
            name: 'Create payment types'
          },
          {
            name: 'Modify payment types'
          }
        );
      }
      console.log(this$1.buttons);
	 })
	.catch(function(err){
		console.log(err);
	});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "side-bar",
  props: ["buttons"]
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "add-user",
  props: ["user"],
  beforeMount: function beforeMount(){
  	console.log(this);
  }
}); 


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'delete-user'
});


/***/ }),
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "add-installer",
  props: ["user"]
}); 


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Login__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Dash__ = __webpack_require__(55);








__WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);

var routes = [
{
	name: 'home',
	component: __WEBPACK_IMPORTED_MODULE_3__Home__["a" /* default */],
	path: '/',
	alias: '/home'
},
{
	name: 'login',
	component: __WEBPACK_IMPORTED_MODULE_4__Login__["a" /* default */],
	path: '/login'
},
{
	name: 'dash',
	component: __WEBPACK_IMPORTED_MODULE_5__Dash__["a" /* default */],
	path: '/dash'
}
];

var router = new __WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]({
	mode: 'history',
	routes: routes
});

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */]({
  components: {
    App: __WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */]
  },
  router: router,
  el: '#app',
  template: '<App/>'
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_App_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04c2046b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_App_vue__ = __webpack_require__(23);
/* 23 */
/* 24 */
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2), __webpack_require__(8), __webpack_require__(25).setImmediate))
/* 25 */
__webpack_require__(26);
/* 26 */
/* 27 */
/* 28 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_33885605_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Home_vue__ = __webpack_require__(50);
  __webpack_require__(29)
/* 29 */
var content = __webpack_require__(30);
/* 30 */
/* 31 */
/* 32 */
var bind = __webpack_require__(10);
var Axios = __webpack_require__(34);
var defaults = __webpack_require__(6);
axios.Cancel = __webpack_require__(14);
axios.CancelToken = __webpack_require__(48);
axios.isCancel = __webpack_require__(13);
axios.spread = __webpack_require__(49);
/* 33 */
/* 34 */
var InterceptorManager = __webpack_require__(43);
var dispatchRequest = __webpack_require__(44);
/* 35 */
/* 36 */
/* 37 */
/* 38 */
/* 39 */
/* 40 */
/* 41 */
/* 42 */
/* 43 */
/* 44 */
var transformData = __webpack_require__(45);
var isCancel = __webpack_require__(13);
var defaults = __webpack_require__(6);
var isAbsoluteURL = __webpack_require__(46);
var combineURLs = __webpack_require__(47);
/* 45 */
/* 46 */
/* 47 */
/* 48 */
/* 49 */
/* 50 */
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_addInstaller_vue__ = __webpack_require__(20);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78a34b52_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_addInstaller_vue__ = __webpack_require__(65);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_addInstaller_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78a34b52_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_addInstaller_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\addInstaller.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78a34b52", Component.options)
  } else {
    hotAPI.reload("data-v-78a34b52", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("form", { attrs: { method: "post", action: "/installers/add" } }, [
        _c("input", {
          attrs: { type: "hidden", name: "created_by_id", value: "" }
        }),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "hidden", name: "modified_by_id", value: "" }
        }),
        _vm._v(" "),
        _c("input", {
          attrs: {
            type: "text",
            name: "first_name",
            placeholder: "First name",
            required: ""
          }
        }),
        _vm._v(" "),
        _c("input", {
          attrs: {
            type: "text",
            name: "last_name",
            placeholder: "Last name",
            required: ""
          }
        }),
        _vm._v(" "),
        _c("input", {
          attrs: {
            type: "text",
            name: "current_wage",
            placeholder: "Current wage",
            required: ""
          }
        }),
        _vm._v(" "),
        _c("input", {
          attrs: {
            type: "text",
            name: "fk_installer_role_id",
            placeholder: "Role",
            required: ""
          }
        }),
        _vm._v(" "),
        _c("input", { attrs: { type: "submit", value: "Submit" } })
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78a34b52", esExports)
  }
}

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("side-bar", { attrs: { buttons: _vm.buttons } }),
      _vm._v(" "),
      _c(_vm.currentView, { tag: "component", attrs: { user: _vm.user } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8c588190", esExports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map