//编译器中默认的配置项
var baseOptions = {
	expectHTML: true,
	modules: {},
	directives: {},
	isPreTag: {},
	isUnaryTag: {},
	mustUseProp: {},
	canBeLeftOpenTag: {},
	isReservedTag: {},
	getTagNamespace: {},
	staticKeys: {}
};

var noop = function(){}

function extend(to, _from) {
	for (var key in _from) {
		to[key] = _from[key];
	}
	return to
}

function createFunction(code, errors) {	
	try {
		return new Function(code);    //渲染函数的长相
	} catch (err) {
		errors.push({
			err: err,
			code: code
		});
		return noop
	}
}

function createCompileToFunctionFn(compile) {
	var cache = Object.create(null);
	return function compileToFunctions(template, options, vm) {
		options = extend({}, options);
		/* istanbul ignore if */
		{
			// detect possible CSP restriction
			try {
				new Function('return 1'); //渲染函数 code
			} catch (e) {
				if (e.toString().match(/unsafe-eval|CSP/)) {
					console.error(
						'It seems you are using the standalone build of Vue.js in an ' +
						'environment with Content Security Policy that prohibits unsafe-eval. ' +
						'The template compiler cannot work in this environment. Consider ' +
						'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
						'templates into render functions.'
					);
				}
			}
		}
		// check cache 优化
		var key = options.delimiters ?
			String(options.delimiters) + template :
			template;
		if (cache[key]) {
			return cache[key]
		}
		var compiled = compile(template, options); //ast  render  staticRenderFns
		var res = {};
		var fnGenErrors = []; //编译错误信息  渲染函数所需要的字符串
		console.log(compiled.render)
		res.render = createFunction(compiled.render, fnGenErrors);
		return (cache[key] = res);

	}
}

function createCompilerCreator(baseCompile) {
	return function createCompiler() {
		//编译的核心方法
		function compile(template, options) {
			var finalOptions = Object.create(baseOptions); //{}.__proto__  baseOptions  编译器内置的配置项
			var errors = []; //错误
			var tips = []; //提示信息
			finalOptions.warn = function(msg, tip) { //msg 信息
				(tip ? tips : errors).push(msg);
			};
			//自定义编译器的选项  内置的编译器选项
			if (options) {
				//合并finalOptions
			}
			var compiled = baseCompile(template, finalOptions);
			compiled.errors = errors;
			compiled.tips = tips;
			return compiled
		}
		return {
			compile: compile,
			compileToFunctions: createCompileToFunctionFn(compile)
		}
	}
}

//createCompilerCreator 编译器的构造者
var createCompiler = createCompilerCreator(function baseCompile(template, options) {
	//模板 编译成 AST  词法分析   句法分析  代码生成 （token）
	//var ast = parse(template.trim(), options); //parseHTML
	//if (options.optimize !== false) {
	//	optimize(ast, options);
	//}
	//var code = generate(ast, options); //web 所需要的代码
	return {
		ast: {},
		render: "alert('hello compile')", //渲染函数所需要的字符串   生成渲染函数
		staticRenderFns: "staticRenderFns"
	}
});

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;
