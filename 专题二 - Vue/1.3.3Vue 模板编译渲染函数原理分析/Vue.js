(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
})(this, function() {
	//Vue.options.components
	//Vue.component..  Vue.directive..
	var ASSET_TYPES = [
		'component',
		'directive',
		'filter'
	];

	var LIFECYCLE_HOOKS = [
		'beforeCreate',
		'created',
		'beforeMount',
		'mounted',
		'beforeUpdate',
		'updated',
		'beforeDestroy',
		'destroyed',
		'activated',
		'deactivated',
		'errorCaptured'
	];

	//全局配置对象
	var config = {
		optionMergeStrategies: Object.create(null),
	}

	var inBrowser = typeof window !== 'undefined';
	var noop = function() {}

	var inBrowser = typeof window !== 'undefined';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key)
	}

	function isPlainObject(obj) {
		return toString.call(obj) === "[object Object]"
	}

	function isReserved(str) {
		var c = (str + '').charCodeAt(0); //获取Unicode 编码  0-65535
		return c === 0x24 || c === 0x5F // 十六进制的Unicode 编码  $ === 0x24  _ === 0x5F
	}

	var strats = config.optionMergeStrategies; // var strats = {}
	//自定义策略处理
	strats.data = function(parentVal, childVal, vm) {
		if (!vm) {
			if (childVal && typeof childVal !== "function") {
				console.error("data选项应该为函数 返回组件中每个实例的值")
			}
			//处理子组件data的选项
			return mergeDataOrFn(parentVal, childVal)
		}
		//处理根实例data的选项
		return mergeDataOrFn(parentVal, childVal, vm)
	}

	function mergeDataOrFn(parentVal, childVal, vm) {
		if (!vm) {
			//1: 子组件中的parentVal childVal 都应该是函数
			/*
			会遇到的情况:
			1: parentVal === undefined   return childVal
			2: childVal === undefined   return parentVal
			3: parentVal ===  function(){}  childVal ===  function(){}  mergeData  把两者的返回值对象合并成一个
			*/
		} else {
			return function mergedInstanceDataFn() {
				return typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
			}
		}
	}

	//所有钩子函数的自定义策略  parentVal === undefined   childVal === function(){}   [function(){}]
	function mergeHook(parentVal, childVal) {
		//parentVal 数组
		return childVal ?
			parentVal ?
			parentVal.concat(childVal) :
			Array.isArray(childVal) ?
			childVal : [childVal] :
			parentVal
	}
	LIFECYCLE_HOOKS.forEach(function(hook) {
		strats[hook] = mergeHook;
	})
	// "所有" 选择的默认策略
	var defaultStrat = function(parentVal, childVal) {
		return childVal === undefined ?
			parentVal :
			childVal
	};


	function mergeOptions(parent, child, vm) {
		/*选项规范检测  Components  Props  Inject  Directives */
		var options = {};
		var key;
		for (key in parent) { //components
			mergeField(key);
		}
		for (key in child) { //components
			if (!hasOwn(parent, key)) {
				mergeField(key);
			}
		}
		//选项的策略处理 el data  生命周期的钩子函数  ....
		//自定义策略（strats对象）  默认策略
		function mergeField(key) {
			var strat = strats[key] || defaultStrat;
			options[key] = strat(parent[key], child[key], vm, key); //options.data
		}
		return options;
	}

	function callHook(vm, hook) {
		var handlers = vm.$options[hook];
		if (handlers) {
			for (var i = 0, j = handlers.length; i < j; i++) {
				handlers[i].call(vm);
			}
		}
	}
	var sharedPropertyDefinition = {
		enumerable: true,
		configurable: true,
		get: noop,
		set: noop
	};

	function proxy(target, sourceKey, key) {
		sharedPropertyDefinition.get = function proxyGetter() {
			return this[sourceKey][key]
		};
		sharedPropertyDefinition.set = function proxySetter(val) {
			this[sourceKey][key] = val;
		};
		Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState(vm) {
		var opts = vm.$options;
		if (opts.data) {
			initData(vm);
		} else {
			//observe(vm._data = {}, true /* asRootData */ );
		}
	}

	function initData(vm) {
		//校验数据对象data是否是一个纯对象
		var data = vm.$options.data;
		data = vm._data = typeof data === 'function' ?
			data(vm, vm) :
			data || {};
		if (!isPlainObject(data)) {
			data = {};
			console.error(
				'data functions should return an object:\n' +
				'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
				vm
			);
		}

		// proxy data on instance
		var keys = Object.keys(data);
		var props = vm.$options.props;
		var methods = vm.$options.methods;
		var i = keys.length;
		while (i--) {
			var key = keys[i]; {
				if (methods && hasOwn(methods, key)) {
					//methods 对象上的 key 属性 已经被定义为data数据对象属性。
					console.error(
						("Method \"" + key + "\" has already been defined as a data property."),
						vm
					);
				}
			}
			if (props && hasOwn(props, key)) {
				// data的数据属性 key 因为成为props 的prop  prop 是该属性的默认值。
				console.error(
					"The data property \"" + key + "\" is already declared as a prop. " +
					"Use prop default value instead.",
					vm
				);
			} else if (!isReserved(key)) { //$  _
				//数据代理的时候 是否有不合法的属性
				proxy(vm, "_data", key);
			}
		}
		// observe data  开启响应式之路
		//observe(data, true /* asRootData */ );
	}


	function initMixin(Vue) {
		Vue.prototype._init = function(options) {
			var vm = this;
			//选项合并
			vm.$options = mergeOptions(Vue.options, options || {}, vm);
			callHook(vm, 'beforeCreate');
			initState(vm);
			console.log(vm.$options)
			if (vm.$options.el) {
				vm.$mount(vm.$options.el); //字符串
			}
		}
	}



	//config
	function initGlobalAPI(Vue) {
		var configDef = {};
		configDef.get = function() {
			return config;
		}
		configDef.set = function(newval) {
			console.error("不要尝试修改Vue.config的引用")
		}
		Object.defineProperty(Vue, 'config', configDef); //监听你对Vue.config
	}

	function initExtend(Vue) {
		/*用于原型继承  缓存构造函数*/
		Vue.cid = 0;
		var cid = 1;
		Vue.extend = function(extendOptions) {
			extendOptions = extendOptions || {};
			var Super = this; //Super  === Vue
			var SuperId = Super.cid;
			//缓存检测 cachedCtors
			var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
			//缓存处理  cachedCtors[0] = 子类的引用
			if (cachedCtors[SuperId]) {
				return cachedCtors[SuperId]
			}
			var name = extendOptions.name || Super.options.name;
			if (name) {
				//validateComponentName(name);   //规范检测
			}

			//子类 构造函数
			var Sub = function VueComponent(options) {
				this._init(options);
			};
			//{}.__proto__ = Super.prototype = Vue.prototype
			Sub.prototype = Object.create(Super.prototype);
			Sub.prototype.constructor = Sub;
			Sub.cid = cid++;
			//Super == Vue  Vue.component  注册全局组件   Vue.options.components  内置的抽象组件
			ASSET_TYPES.forEach(function(type) {
				Sub[type] = Super[type];
			});
			//组件在初始化 mergeOptions  选项的合并 => 规范的检测  => 策略的处理
			Sub.options = mergeOptions(
				Super.options, //Vue.options
				extendOptions //组件的选项对象
			);
			console.log(Sub.options)
			cachedCtors[SuperId] = Sub;
			return Sub;
		}
	}

	function Vue(options) {
		if (!(this instanceof Vue)) {
			console.error('Vue is a constructor and should be called with the `new` keyword');
		}
		this._init(options);
	}

	Vue.options = Object.create(null);
	ASSET_TYPES.forEach(function(type) {
		Vue.options[type + 's'] = Object.create(null);
	});

	function query(el) { // query(el)  el === 字符串 || DOM对象
		if (typeof el === 'string') {
			var selected = document.querySelector(el);
			if (!selected) {
				console.error(
					'Cannot find element: ' + el
				);
				return document.createElement('div')
			}
			return selected
		} else {
			return el
		}
	}

	function getOuterHTML(el) { //DOM元素 outerHTML  innerHTML
		if (el.outerHTML) {
			return el.outerHTML
		} else { //IE9-11  svg  兼容性处理
			var container = document.createElement('div');
			container.appendChild(el.cloneNode(true));
			return container.innerHTML
		}
	}

	//挂载组件
	function mountComponent() {
		//vm._render()  回去调用vm.$options.render 返回生成的虚拟节点（vnode）
       //vm._update     把vm._render()生成的虚拟节点 渲染成真正的DOM
	   //new Watcher(updateComponent)  渲染函数观察者  updateComponent   vm.$options.rende  get的拦截器   重新渲染
	}

	//runtime  构建时完成
	Vue.prototype.$mount = function(el, hydrating) {
		//渲染函数  组件的挂载
		el = el && inBrowser ? query(el) : undefined;
		return mountComponent(this, el, hydrating)
	};

	var mount = Vue.prototype.$mount;

	//完整版本  运行时 + compiler = 完整版本
	Vue.prototype.$mount = function(el, hydrating) {
		el = el && query(el);
		//
		if (el === document.body || el === document.documentElement) {
			console.error(
				"Do not mount Vue to <html> or <body> - mount to normal elements instead."
			);
			return this
		}
		var options = this.$options;
		if (!options.render) {
			var template = options.template;
			if (template) {
				if (typeof template === 'string') {
					if (template.charAt(0) === '#') {
						template = idToTemplate(template);
						/* istanbul ignore if */
						if (!template) {
							console.error(
								("Template element not found or is empty: " + (options.template)),
								this
							);
						}
					}
				} else if (template.nodeType) {
					template = template.innerHTML;
				} else {
					{
						console.error('invalid template option:' + template, this);
					}
					return this
				}
			} else if (el) {
				template = getOuterHTML(el);
			}
			console.log(el);
			//内置一个编译器  compileToFunctions
			if (template) {
				//template  模板 => render function  => AST  
				//{}  开发者拥有定制编译器的能力
				var ref = compileToFunctions(template, {
					shouldDecodeNewlines: shouldDecodeNewlines,   //兼容
					shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,//兼容
					delimiters: options.delimiters,   //改变本文插入符
					comments: options.comments        //保留渲染模板中的注释
				}, this);
				var render = ref.render;
				var staticRenderFns = ref.staticRenderFns;
				options.render = render;
				options.staticRenderFns = staticRenderFns;
			}
			return mount.call(this, el, hydrating);
		}
	}

	initMixin(Vue);
	initGlobalAPI(Vue);
	initExtend(Vue);
	return Vue;
});
