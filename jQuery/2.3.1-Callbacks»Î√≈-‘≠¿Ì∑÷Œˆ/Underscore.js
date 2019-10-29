(function(root) {
	var optionsCache = {};
	var _ = {
		callbacks: function(options) {
			options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : {};
            var list = [];
			var index,length,testting,memory,start,starts;
			var fire = function(data){
				memory = options.memory && data;
				index = starts||0;
				start = 0;
				testting = true;
				length = list.length;
				for(;index < length;index++){
					if(list[index].apply(data[0], data[1]) === false && options.stopOnfalse){
						break;
					}
				}
			}
			var self = {
				add: function(){
					var args = Array.prototype.slice.call(arguments);
					start = list.length;
					args.forEach(function(fn){
						if(toString.call(fn) ==="[object Function]"){
							list.push(fn);
						}
					});
					if(memory){
					 starts = start;
					 fire(memory);	
					}
				},
				fireWith: function(context, arguments){
					var args = [context, arguments];
					if(!options.once || !testting){
					 fire(args);
					}
					
				},
				fire: function(){
					self.fireWith(this, arguments);
				}
			}
			return self;
		},
	}

	function createOptions(options) {
		var object = optionsCache[options] = {};
		options.split(/\s+/).forEach(function(value) {
			object[value] = true;
		});
		return object;
	}
	root._ = _;
})(this);
