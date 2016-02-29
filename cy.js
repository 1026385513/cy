/*
 *cy:eqdo@163.com
 */
 (function (w){
 	
 	window.cy=function(s){
 	 	return new cy.prototype.init(s);
 	};
 	cy.prototype={};
 	cy.fn=cy.prototype={

 	init:function(s){
 		var context;
 		if (this==w)
 		{
 			context=w.document;
 		}
 		else
 		{
 			context=this;
 		}
 		
 		return cy.fn.merge(cy.fn.get(s),this);
 	},
 	get:function(s,c)
 	{
 		var m,e,g;
 		e=[];
 		g=[];
 		c=(c==undefined)?document.all:c;
 		if (typeof s==='string'&&s!=='')
 		{
 			s=cy.fn.trim(s);
 			m=s.split(' ');
 			s=m[0];
 			if (/\./.test(s))
 			{
 				for(var i=0;i<c.length;i++)
 				{
 					//if (c[i].classList.contains(s.replace('.','')))
 					if (cy.fn.hasClass.call(c[i],s.replace('.','')))
 					{
 						e.push(c[i]);
 					}
 				}
 			}
 			else if (/#/.test(s))
 			{
 				e.push(document.getElementById(s.replace('#','')));
 			}
 			else
 			{
 				e=e.concat(cy.fn.fliter(c,s));
 			}
 		}
 		/*contex err c,document*/
 		else if (typeof s==='object'&&s.nodeType!==undefined)
 		{
 			return cy.fn.inArray(s,cy.fn.all(c,c))?[s]:[];
 		}
 		else if (typeof s==='object'&&s instanceof cy)
 		{
 			return cy.fn.inArray([s.elm],cy.fn.all(c,c))?[s.elm]:[];
 		}
 		else if (typeof s==='object'&&(s instanceof Array || s instanceof HTMLCollection))
 		{
 			return cy.fn.inArray(s,cy.fn.all(c,c))?s:[];
 		}
 		m.shift(0);
 		s=m.join(' ');
 		if (s==='')
 		{
 			return e;
 		}
 		else
 		{
 			g=g.concat(cy.fn.all(e));
 			return cy.fn.get(s,g);
 		}

 	},
 	fliter:function(e,s){
 		var d=[];
 		d=e.nodeType!==undefined?[e]:e;
 		if (typeof s=='string')
 		{
 			var g=[];
 			s=s.toLowerCase();
 			for (var i=0;i<d.length;i++)
 			{
 				if (d[i].tagName.toLowerCase()==s)
 				{
 					g.push(d[i]);
 				}
 			}
 			d=g;
 		}
 		return d;
 	},
 	all:function(e,d)
 	{
 		if (d===undefined)
 		{
 			d=[];
 		}
 		var r=[];
 		if (e==document.all) return e;
 		if (e.nodeType!==undefined)
 		{
 			e=[e];
 		}
 		for( var j=0;j<e.length;j++)
 		{
 			var c=e[j].childNodes;
	 		for(var i=0;i<c.length;i++)
	 		{
	 			if (c[i].nodeType==1)
	 			{
	 				r.push(c[i]);
	 				r=cy.fn.all(c[i],r);
	 			}
	 		}
 		}
 		r=r.concat(d);
 		return r;
 	},
 	/*没考虑重复元素和排序*/
 	inArray:function(o,f){
 		if (typeof o=='undefined') return;
 		if (o.nodeType!==undefined) o=[o];
 		var r=[];
 		for ( var i=0;i<o.length;i++)
 		{
 			for (var j=0;j<f.length;j++)
 			{
 				if (o[i]==f[j])
 				{
 					r.push(o[i]);
 					break;
 				}
 			}
 		}
 		if (r.length==o.length){
 			return true;
 		}
 		return false;
 	},
 	index:function(o,f)
 	{
 		var index=-1;
 		for(var i=0;i<f.length;i++)
 		{
 			if (o.parentElement==f[i])
 			{
 				index=i;
 				break;
 			}
 		}
 		return index;
 	},
 	getClass:function(){
 		var c=[];
 		var n=typeof this.className!=="undefined" ?this.className:this.elm[0].className;
 		if (n)
 		{
 			c=n.split(' ');
 			for( var j=0;j<c.length;j++)
 			{
 				if (c[j]=='')
 				{
 					c.splice(j,1);
 				}
 			}
 		}
 		return c;
 	},
 	hasClass:function(s){
 		var o=typeof this.elm !=="undefined"?this.elm[0]:this;
 		if (o)
 		{
 			var c=cy.fn.getClass.call(o);
 			if (c.indexOf(s)>=0)
 			{
 				return true;
 			}
 			else
 			{
 				return false;
 			}

 		}
 	},
 	addClass:function(s)
 	{
 		for(var i=0;i<this.elm.length;i++)
 		{
 			this.elm[i].className+=' '+s;
 		}
 		return this;
 	},
 	removeClass:function(s)
 	{
 		for(var i=0;i<this.elm.length;i++)
 		{
 			var c=cy.fn.getClass.call(this.elm[i]);
 			for(var j=0;j<c.length;j++)
 			{
 				if (c[j]==s)
 				{
 					c.splice(j,1);
 				}
 			}
 			this.elm[i].className=c.join(' ');
 		}
 		return this;
 	},
 	each:function(f){
 		var c=this.elm;
 		for(var i=0;i<c.length;i++)
 		{
 			f.call(c[i],i);
 		}
 	},
 	first:function()
 	{
 		var o=this.caller;
 		return o.firstElementChild||o.firstChild;
 	},
 	last:function()
 	{
 		var o=this.caller;
 		return o.lastElementChild||o.lastChild;
 	},
 	trim:function(s)
 	{
 		return s.replace(/(^\s*)|(\s*$)/g,'');
 	},
 	merge:function(a,r)
 	{
 		r.elm=a;
 		r.prototype=cy.fn;
 		return	r;
 	},
 	extend:function(n,f)
 	{
 		cy.prototype[n]=f;
 	}
 	}
 	cy.fn.init.prototype=cy.prototype;
 	cy.timers=[];
 	cy.clock=null;
 	cy.clockhandle=null;
 	cy.event={};
 	cy.Time=function (){return (new Date()).getTime();};
 	cy.readyFuns=[];
 	cy.ready=function(f){
	cy.readyFuns.push(f);
	};
	window.onload=function(){
		for(var i=0;i<cy.readyFuns.length;i++)
		{
			cy.readyFuns[i]();
		}
	};

 })(window);
 //a=cy('#menu').elm[0].children; cy(a).tab(cy('.menu-son'));

cy.prototype.extend('tab',function(s,c,o){
 		var t=this;
 		var b=t.elm;
 		var edefault=function(that)
	 	{
	 		if (that.style.display=='none')
	 		{
	 			that.style.display='block';
	 		}
	 		else
	 		{
	 			that.style.display='none';
	 		}
	 		
	 	};
	 	var allnone=function()
	 	{
	 		for(var k=0;k<s.elm.length;k++)
	 		{
	 			s.elm[k].style.display='none';
	 		}
	 	}
 		for(var i=0; i<b.length;i++)
 		{
 			(function(el,son){
 			
 			el.onmouseover=function(e)
 			{
 				t.removeClass(c);
 				cy(el).addClass(c);
 				allnone();
 				if (son!==undefined)
 				{
 					edefault(son);
 				}
 				
 			};
 			if (o)
 			{
 				el.onmouseleave=function()
 				{
 					if (c) cy(this).removeClass(c);
 					son.style.display="none";
 					//if (cy(s.elm[i]).after!=undefined)
 					//{
 						//cy(s.elm[i]).after();
 					//}
 				};
 			}
 			})(b[i],s.elm[i]);
 		}
 		return this;
 	});

cy.ajax={
	h:[],
	r:[],
	i:0,
	init:function(){
		if (window.XMLHttpRequest)
		{
			var ajax=new XMLHttpRequest();
		}else
		{
			var ajax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		cy.ajax.i+=1;
		var o={h:ajax,id:cy.ajax.i,fuc:null};
		var n=cy.ajax.h.push(o);
		ajax.onreadystatechange=function(){cy.ajax.on(o)};
		return o;
	},
	on:function(a){
		if (a.h.readyState==4 && a.h.status==200)
		{
			if (a.fuc)
			{
				a.fuc();
				var n=cy.ajax.h.indexOf(a);
				cy.ajax.h.splice(n,1);
			}
		}
	},
	
	get:function(u,f){
		var o=cy.ajax.init();
		o.fuc=f;
		o.h.open("GET",u,true);
		o.h.send();
	}
};

cy.prototype.extend('step',function(f,d,s,c){
	
	if (c.m==0)
	{
		c.m=1/s;
	}
	var x=d * cy.fn.easing[f](c.m);
	c.m=c.m+1/s;
	if (x>d) x=d;
	return x;
});
cy.prototype.extend('easing',{
	sin:function(t){return Math.sin(t)},
 	linear: function (t) { return t },
	easeInQuad: function (t) { return t*t },
 	easeOutQuad: function (t) { return t*(2-t) },
	easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	easeInCubic: function (t) { return t*t*t },
	easeOutCubic: function (t) { return (--t)*t*t+1 },  
	easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },  
	easeInQuart: function (t) { return t*t*t*t },
	easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	easeInQuint: function (t) { return t*t*t*t*t },
	easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
});

cy.clock={
	create:function(f,t,e){
		var time1,time2;
		time1=cy.Time();
		var tm={fun:f,step:t,start:time1,m:0,status:'run',elm:e,sleep:0};
		cy.timers.push(tm);
		if (cy.clockhandle===null)
		{
			cy.clockhandle=setInterval(function(){
				time2=cy.Time();
				for(var i=0;i<cy.timers.length;i++)
				{
					if (cy.timers[i].status=='block') continue;
					if ((time2-cy.timers[i].start)>=cy.timers[i].step)
					{
						cy.timers[i].start=time2;
						cy.timers[i].fun();
					}
				}

			},13);
		}
		return tm;
	},
	pause:function(e,n){
		var c=[];
		for (var i=0;i<cy.timers.length;i++)
		{
			if (cy.fn.inArray(cy.timers[i].elm,e))
			{
				c.push(cy.timers[i]);
			}
		}
		n=(n&&n<c.length)?n:0;
		c[n].status=c[n].status=='block'?'run':'block';
	},
	sleep:function(t){
		this.sleep=t;
	}
};
//cy('.banner').scroll(cy('.item'),{dir:'top',easing:'easeInQuad'});cy('.banner2').scroll(cy('.item2'),{dir:'top',easing:'linear'});

cy.event={
	all:[],
	dic:['abort',
		 'blur',
		 'change',
		 'click',
		 'dblclick',
		 'error',
		 'focus',
		 'keydown',
		 'keypress',
		 'keyup',
		 'load',
		 'mousedown',
		 'mousemove',
		 'mouseout',
		 'mouseleave',
		 'mouseover',
		 'mouseup',
		 'reset',
		 'resize',
		 'select',
		 'submit',
		 'unload',
		],
	add:function(o,e,f){
		var evt;	
		if (cy.event.all.length>0)
		{
			for(var i=0;i<cy.event.all.length;i++)
			{
				if (cy.fn.inArray(o,cy.event.all[i]['o']))
				{
					evt=cy.event.all[i]['e'];
					var l;
					l=evt.length;
					evt[l]={};
					evt[l][e]=f;
					break;
				}
			}
		}
		if (typeof(evt)=='undefined')
		{
			evt={};
			evt['o']=o;
			evt['e']=[];
			evt['e'][0]={};
			evt['e'][0][e]=f;
			cy.event.all.push(evt);
		}
	},
	remove:function(){},
	trigger:function(o,e,n){
		for(var i=0;i<cy.event.all.length;i++)
		{
			if (cy.fn.inArray(o,cy.event.all[i]['o']))
			{
				var evt=cy.event.all[i]['e'];
				for(var j=0;j<evt.length;j++)
				{
					if (typeof evt[j][e] !=='undefined')
					{
						evt[j][e].call(cy.event.all[i],n);
					}	
				}
				break;
			}
		}
	},
	test:function(f,s)
	{
		for(var i=0;i<cy.event.dic.length;i++)
			{
				(function (i){
				document[f](s+cy.event.dic[i],function(){
					var e=arguments[0]||window.event;
					var t=e.srcElement?e.srcElement:e.target;
					for(var k=0;k<cy.event.all.length;k++)
					{
						var evt=cy.event.all[k];
						if (cy.fn.get(t,evt['o']).length)
						{
							for (var j=0;j<evt['e'].length;j++)
							{
								if (evt['e'][j][cy.event.dic[i]])
								{
									//evt['e'][j][cy.event.dic[i]].call(t);
									evt['e'][j][cy.event.dic[i]].call(t,e);
								}
							}
							break;
						}
					}
				},false);
				})(i);
			}
	},
	init:function(){
		if (document.attachEvent)
		{
			cy.event.test('attachEvent','on');
		}
		else
		{
			cy.event.test('addEventListener','');
		}
	},
	fixEvent:function(e){
    	if (! e.hasOwnProperty('offsetX')) {
	        e.offsetX=e.layerX - e.currentTarget.offsetLeft;
	        e.offsetY=e.layerY - e.currentTarget.offsetTop;
    	}
    	return e;
	}
};
cy.event.init();
cy.prototype.extend('on',function(e,f){
	var elm=this.elm;
	cy.event.add(elm,e,f);
	return this;
});
cy.prototype.extend('trigger',function(e,n){
	var elm=this.elm;
	cy.event.trigger(elm,e,n);
	return this;
});
cy.prototype.extend('pause',function(n){
	var e=this.elm;
	cy.clock.pause(e,n);
	return this;
});

cy.prototype.extend('slide',function(o){
	var t=this;
	var c=t.elm[0];
	var nd=0;
	if (c.length==0) return;
	var d=parseInt(o.step);
		switch(o.dir)
		{
			case "left":nd=-1;break;
			case "right":nd=1;break;
			case "top":nd=-1;break;
			case "right":nd=1;break;
		}
	t.on('block',function(){
		t.pause();
	});
	t.on('pre',function(){
		t.pause();
		t.trigger('moveleft');
		cy(c.children).removeClass('on');
		cy(c.children[1]).addClass('on');
		cy(c.children[1]).trigger('click');
		t.pause();
	});
	t.on('next',function(){
		t.pause();
		t.trigger('moveright');
		cy(c.children).removeClass('on');
		cy((c.firstElementChild||c.firstChild)).addClass('on');
		cy((c.firstElementChild||c.firstChild)).trigger('click');
		t.pause();
	});
	t.on('moveleft',function(){
		var i=0;
		var intv;
		intv=cy.clock.create(function(){
			i=-cy.fn.step('linear',d,20,intv);
			c.style[o.dir]=i+'px';
			if (i<=-d)
			{
				var pz=cy.timers.indexOf(intv);
				cy.timers.splice(pz,1);
				c.style[o.dir]=-d+'px';
				c.appendChild((c.firstElementChild||c.firstChild));
				//c.appendChild(cy(c.children).elm[0]);
				//c.insertBefore((c.lastElementChild||c.lastChild),(c.firstElementChild||c.firstChild));
				//c.appendChild(c.firstElementChild);
				c.style[o.dir]='0px';
			}
		},10,c);
	});
	t.on('moveright',function(){
		var i=0;
		var intv;
		c.insertBefore((c.lastElementChild||c.lastChild),(c.firstElementChild||c.firstChild));
		var intv=cy.clock.create(function(){
			i=-d+cy.fn.step('linear',d,20,intv);
			c.style[o.dir]=i+'px';
			if (i>=0)
			{
				var pz=cy.timers.indexOf(intv);
				cy.timers.splice(pz,1);
				c.style[o.dir]='0px';
			}
		},10,c);
		
	});

	var sintv=cy.clock.create(function(){
		t.trigger('pre');

	},4000,c);
	if (o.content)
	{
		var son=cy(o.content);
		cy(c.children).each(function(x){
			cy(this).on('click',function(){
				son.removeClass('on');
				cy(son.elm[x]).addClass('on');
			});
		});
	}
});

cy.prototype.extend('scroll',function(o){
 		var t=this.elm[0];
 		var self=this;
 		var w=t.clientWidth;
 		var h=t.clientHeight;
 		var dir=['left','right','top','bottom'];
 		var sons=cy(o['son']);
 		var menu=cy(o['menu']);
 		var lth=o['width'];
 		var slen=sons.elm.length;
 		var index=0;
 		var d="";
 		var b=0;
 		var now,nex;
 		var m=0;
 		var fg=-1;
 		if (slen<=1) return;
 		now=sons.elm[index];
 		nex=sons.elm[index+1];
 		for(var i=0;i<dir.length;i++)
 		{
 			if (o['dir']==dir[i])
 			{
 				d=o['dir'];
 				if (i>1)
 				{
 					b=-h;
 				}
 				else{
 					b=-w;
 				}
 				break;
 			}
 		}
 		if (d=="") return;
 		
 		if(d=="right")
 		{
 			d="left";
 			b=-b;
 			fg=1;
 			
 		}
 		else if(d=="bottom")
 		{
 			d="top";
 			b=-b;
 			fg=1;
 		}
 		
		var done=function(){
			sons.removeClass('on');
 			nex.style[d]=-b+'px';
 			now.style[d]='0px';
 			t.style[d]='0px';
 			cy(now).addClass('on');
 			cy(nex).addClass('on');
		};
		cy(t).on('scroll',function(){
 			var sintv=cy.clock.create(function(){ 
 				m=fg*cy.fn.step(o['easing'],lth,20,sintv);
 				t.style[d]=m+'px';
 				if (Math.abs(m)>=Math.abs(b))
 				{
 					var pz=cy.timers.indexOf(sintv);
 					cy.timers.splice(pz,1);
 				}
 			},10,t,self);
 		});
 		menu.on('click',function(x){
			if (typeof x=="object"||typeof x=="undefined")
			{
				var lis=menu.elm;
				var li=this;
				var i=lis.indexOf(li);
				x=i;
			}
			cy(t).trigger('sort',x);
			cy(menu.elm).removeClass('on');
			cy(menu.elm[x]).addClass('on');
		});
 		var intv=cy.clock.create(function(){
 			cy(t).trigger('sort',index+1);
 			menu.removeClass('on');
 			cy(menu.elm[index]).addClass('on');
 		},4000,t);
 		cy(t).on('scroll_block',function(){
 			cy(t).pause();
 		});
 		cy(t).on('scroll_restart',function(){
 			intv.start=cy.Time();
 		});
 		cy(t).on('left',function(){
 			 d="left";
 			 fg=-1;
 			 b=b>0?-b:b;
 			var n=index+1>=slen?0:index+1;
 			cy(menu.elm[n]).trigger("click",n);
 		});
 		cy(t).on('right',function(){
 			 d="left";
 			 fg=1;
 			 b=b>0?b:-b;
 			var n=index-1<0?slen-1:index-1;
 			cy(menu.elm[n]).trigger("click",n);
 		});
 		cy(t).on('sort',function(){
 			cy(t).pause();
 			if (typeof arguments[0] !=='undefined')
 			{
 				var n=parseInt(arguments[0]);
 				n=n>=slen?0:n;
 				n=n<0?slen-1:n;
 				nex=sons.elm[n];
	 			if (n!=index)
	 			{
	 				done();
	 				cy(t).trigger('scroll');
	 			}

	 			cy(t).trigger('scroll_restart');
	 			cy(t).pause();
	 			index=n;
	 			now=sons.elm[index];
 			}
 		});
});

cy.prototype.extend('setArgs',function(s){
	var self=this;
	self.each(function(){
		var href=this.href||this.src;
		var c=href.split('?');
		href=c.length>1?href:href+'?';
		href=href+s;
		if (typeof this.href!=="undefined")
		{
			this.href=href;
		}
		if (typeof this.src!=="undefined")
		{
			this.src=href;
		}
	});

});
cy.prototype.extend('getArgs',function(s){
	var get=function(str){
		var c=str.split('?');
		if (c.length<1||c[1]=='') return;
		return c[1].split('&');
	};
	if (!this.elm)
	{
		return get(window.location.href);
	}else{
		var r=[];
		this.each(function(){
			var ss=this.href||this.src;
			r.push(get(ss));
		});
		return r;
	}
});
cy.prototype.extend('lazyLoad',function(a){
	var elms=this.elm;
	var tops=[];
	var urls=[];
	var eindex=0;
	var elock='off';
	var wh=window.innerHeight||document.documentElement.clientHeight;
	for (var i=0;i<elms.length;i++)
	{
		tops[i]=elms[i].offsetTop;
		urls[i]=elms[i].getAttribute(a);
	}
	var aeratest=function(s)
	{
		var t=document.body.scrollTop||document.documentElement.scrollTop;
		for(var i=s;i<elms.length;i++)
		{
			if (t+wh>tops[i])
			{
				if (!elms[i].getAttribute('data-img-loaded'))
				{
					elms[i].src=urls[i];
					elms[i].setAttribute('data-img-loaded',1);
				}
					eindex=i;
			}
			else
			{
					return;
			}
		}		
	};
	var preload=function(s)
	{
		if (elock!=='off') return;
		if (s>=elms.length) return;
		if (typeof elms[s] !=undefined&&!elms[s].getAttribute('data-img-loaded'))
		{
			var k=s;
			var t=0;
			var m=1;
			for (;k<s+m;k++)
			{
				if (k>=elms.length) return;
				elms[k].src=urls[k];
				(function(i){
					elms[i].onload=function(){
						t++;
						if (t==m)
						{
							eindex=s+m;
							preload(s+m);
						}
					};
					})(k);
			}
		}
	};
	var ons=window.onscroll;
	window.onscroll=function(){
		if (ons) ons();
		aeratest(eindex);
	};	
});

cy.prototype.extend('fixed',function(o){
	var self=this;
	var p=o.position;
	var e=o.easing;
	var ton=window.onscroll;
	var top=0;
	var left=0;
	var ot=[];
	var ol=[];
	var flag=[];
	var s=null;
	var etm=0;
	self.each(function(){
		ot.push(this.offsetTop);
		ol.push(this.offsetLeft);
		flag.push(0);
	});
	var fon=function(){
		top=document.documentElement.scrollTop||document.body.scrollTop;
		left=document.documentElement.scrollLeft||document.body.scrollLeft;
	};
	var set=function(){
		self.each(function(i){
			if (!flag[i])
			{
				var elm=this;
				var t=p=='fixed'?ot[i]:ot[i]+top;
				var l=p=='fixed'?ol[i]:ol[i]+left;
				var w=elm.clientWidth;
				var h=elm.clientHeight;
				if (p=='fixed')
				{
					var c='position:'+p+';left:'+l+'px;top:'+t+'px;';
					elm.style.cssText=c;
					flag[i]=1; 
				}else if(p=='absolute'){
					s={time:cy.Time(),top:top,left:left};
					flag[i]=2;
				}	
			}
		
		});
	};
	window.onscroll=function(){
		if (ton) ton();
		fon();
		set();
	};
	var doscroll=function(x){

	}
	
	var clock=cy.clock.create(function(){
		self.each(function(i){
			//var st=cy.fn.easing();
			if (cy.Time()-s.time>=200&&flag[i]==2)
			{
				var dur=s.top-ot[i];
				var m=-cy.fn.step('linear',s.top-ot[i],20,clock);
 				t.style[d]=m+'px';
 				if (m<=-b)
 				{
 					var pz=cy.timers.indexOf(sintv);
 					cy.timers.splice(pz,1);
 				}
				flag[i]==3;
			}
		})
	},20);

	
});

cy.prototype.extend('cydate',function(){
	
});
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		if ( this === undefined || this === null ) {
			throw new TypeError( '"this" is null or not defined' );
		}

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
      	fromIndex = 0;
      }

      if (fromIndex < 0) {
      	fromIndex += length;
      	if (fromIndex < 0) {
      		fromIndex = 0;
      	}
      }

      for (;fromIndex < length; fromIndex++) {
      	if (this[fromIndex] === searchElement) {
      		return fromIndex;
      	}
      }

      return -1;
  };
}

