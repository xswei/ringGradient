(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (factory((global.d3 = global.d3 || {})));
}(this,function(exports){
	function RingGradient(options){
		if(options.svg instanceof d3.selection){
			this.container = options.svg;
		}else{
			if(d3.select(options.svg) instanceof d3.selection){
				this.container = d3.select(options.svg)
			}else{
				throw new Error("container unavailable !");
			}
		}
		this.cx = options.cx?options.cx:0;
		this.cy = options.cy?options.cy:0;
		this.r = options.radius?options.radius:100;
		this.color = options.color?options.color:d3.scaleSequential(d3.interpolate("blue","red"));
		this.ringWidth = options.ringWidth?options.ringWidth:5;
		this.dotR = options.dotRadius?options.dotRadius:10;
		this.dotW = options.dotStrokeWidth?options.dotStrokeWidth:3;
		this.dotFill = options.dotFill?options.dotFill:"#FFF";
		this.textFormat = options.textFormat?options.textFormat:d3.format(".1%");
		this.t = options.t?options.t:0;

		this.defs = this.container.select("defs").empty()?this.container.append("defs"):this.container.select("defs");
		this.uuid = "s_"+uuid();



		this.init = function(){
			var linear1 = this.defs.append("linearGradient")
					.attr("x1","0%").attr("x2","0%").attr("y1","0%").attr("y2","100%")
					.attr("class",this.uuid)
					.attr("id",this.uuid+"_1"),
				linear2 = this.defs.append("linearGradient")
					.attr("x1","0%").attr("x2","0%").attr("y1","100%").attr("y2","0%")
					.attr("class",this.uuid)
					.attr("id",this.uuid+"_2");
			linear1.append("stop").attr("offset","0%").attr("stop-color",this.color(0));
			linear1.append("stop").attr("offset","100%").attr("class","ringGradient_linear_1_stop")
				.attr("stop-color",this.color(this.t));
			linear2.append("stop").attr("offset","0%").attr("stop-color",this.color(0.5));
			linear2.append("stop").attr("offset","100%").attr("class","ringGradient_linear_2_stop")
				.attr("stop-color",this.color(0.5));
			this.g = this.container.append("g")
				.attr("class","ringGradient_g")
				.attr("transform","translate("+this.cx+","+this.cy+")")
			this.ring1 = this.g.append("path").attr("class","ringGradient_ring_1")
				.style("stroke","url(#"+this.uuid+"_1)")
				.attr("stroke-width",this.ringWidth)
				.attr("fill","none")
			this.ring2 = this.g.append("path").attr("class","ringGradient_ring_2")
				.style("stroke","url(#"+this.uuid+"_2)")
				.attr("stroke-width",this.ringWidth)
				.attr("fill","none")
			this.dot = this.g.append("circle")
				.attr("class","ringGradient_dot")
				.attr("r",this.dotR)
				.attr("cx",0)
				.attr("cy",-this.r)
				.attr("stroke-width",this.dotW)
				.attr("fill",this.dotFill)
				.attr("stroke",this.color(0))
			this.text = this.g.append("text")
				.attr("class","ringGradient_text")
				.attr("font-size",this.r/3)
				.attr("font-weight","bold")
				.attr("dy",".3em")
				.attr("text-anchor","middle")
				.text(this.textFormat(this.t))

			this.update(this.t)
		}
		this.update = function(t){
			this.t = t;
			var deltaAngle = Math.PI*2*t,
				dx = Math.sin(deltaAngle)*this.r,
				dy = Math.cos(deltaAngle)*this.r,
				selector2 = "#"+this.uuid+"_2",
				selector1 = "#"+this.uuid+"_1";
			if(t>=1){
				this.container.select(selector1)
					.select(".ringGradient_linear_1_stop")
					.attr("stop-color",this.color(0.5))
				this.container.select(selector2)
					.select(".ringGradient_linear_2_stop")
					.attr("stop-color",this.color(1))
				this.ring2.attr("d","M"+0+" "+this.r+"A"+this.r+" "+this.r+" 180 0 1 "+0+" "+(-this.r));
				this.ring1.attr("d","M"+0+" "+(-this.r)+"A"+this.r+" "+this.r+" 180 0 1 0 "+this.r);
				this.dot.attr("cx",0).attr("cy",-this.r).attr("stroke",this.color(1));
				this.text.text(this.textFormat(t));
			}else if(t>=0.5){
				this.container.select(selector1)
					.select(".ringGradient_linear_1_stop")
					.attr("stop-color",this.color(0.5))
				this.container.select(selector2)
					.select(".ringGradient_linear_2_stop")
					.attr("stop-color",this.color(t))
				this.ring1.attr("d","M"+0+" "+(-this.r)+"A"+this.r+" "+this.r+" 180 0 1 0 "+this.r);
				this.ring2.attr("d","M"+0+" "+this.r+"A"+this.r+" "+this.r+" "+360*(t-0.5)+" 0 1 "+dx+" "+(-dy));
				this.dot.attr("cx",dx)
					.attr("cy",-dy)
					.attr("stroke",this.color(t))
				this.text.text(this.textFormat(t));
			}else{
				this.container.select(selector1)
					.select(".ringGradient_linear_1_stop")
					.attr("stop-color",this.color(t))
				this.container.select(selector2)
					.select(".ringGradient_linear_2_stop")
					.attr("stop-color",this.color(0.5))
				this.ring2.attr("d","")
				this.ring1.attr("d","M0 "+(-this.r)+"A"+this.r+" "+this.r+" "+ (360*t) +" 0"+" 1 "+(dx)+" "+(-dy));
				this.dot.attr("cx",dx)
					.attr("cy",-dy)
					.attr("stroke",this.color(t))
				this.text.text(this.textFormat(t));
			}
		}
		this.delete = function(){
			if(this.container){
				this.defs.selectAll(("."+this.uuid)).remove()
				this.g.remove();
			}
		}
		this.init();
		return this;
	}

	function uuid() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
		s[8] = s[13] = s[18] = s[23] = "_";

		var uuid = s.join("");
		return uuid;
	}

	exports.RingGradient = RingGradient;
}))