/*! For license information please see app.js.LICENSE.txt */
(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var i in n)e.push(n[i]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){for(var e in t.Context.refreshAll(),n)n[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,n+=1,o.windowContext||(o.windowContext=!0,o.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;t&&e&&!n&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",(function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))}))},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",(function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))}))},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll?i.forward:i.backward;for(var r in this.waypoints[n]){var s=this.waypoints[n][r];if(null!==s.triggerPoint){var a=i.oldScroll<s.triggerPoint,l=i.newScroll>=s.triggerPoint;(a&&l||!a&&!l)&&(s.queueTrigger(o),t[s.group.id]=s.group)}}}for(var h in t)t[h].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;o>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),i={};for(var r in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c=this.waypoints[r][a],f=c.options.offset,d=c.triggerPoint,y=0,w=null==d;c.element!==c.element.window&&(y=c.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(c):"string"==typeof f&&(f=parseFloat(f),c.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,c.triggerPoint=Math.floor(y+l-f),h=d<s.oldScroll,p=c.triggerPoint>=s.oldScroll,u=!h&&!p,!w&&h&&p?(c.queueTrigger(s.backward),i[c.group.id]=c.group):(!w&&u||w&&s.oldScroll>=c.triggerPoint)&&(c.queueTrigger(s.forward),i[c.group.id]=c.group)}}return o.requestAnimationFrame((function(){for(var t in i)i[t].flushTriggers()})),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},o=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],o="up"===n||"left"===n;i.sort(o?e:t);for(var r=0,s=i.length;s>r;r+=1){var a=i[r];(a.options.continuous||r===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=o.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return i[t.axis][t.name]||new n(t)},o.Group=n}(),function(){"use strict";function e(t){return t===t.window}function n(t){return e(t)?t:t.defaultView}function i(t){this.element=t,this.handlers={}}var o=window.Waypoint;i.prototype.innerHeight=function(){return e(this.element)?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){return e(this.element)?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function n(t,e,n){for(var i=0,o=e.length-1;o>i;i++){var r=e[i];n&&n!==r||t.removeEventListener(r)}}var i=t.split("."),o=i[0],r=i[1],s=this.element;if(r&&this.handlers[r]&&o)n(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)n(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])n(s,this.handlers[r][l],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,e=n(this.element.ownerDocument),i={top:0,left:0};return this.element.getBoundingClientRect&&(i=this.element.getBoundingClientRect()),{top:i.top+e.pageYOffset-t.clientTop,left:i.left+e.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var n=t.split("."),i=n[0],o=n[1]||"__default",r=this.handlers[o]=this.handlers[o]||{};(r[i]=r[i]||[]).push(e),this.element.addEventListener(i,e)},i.prototype.outerHeight=function(t){var n,i=this.innerHeight();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginTop,10),i+=parseInt(n.marginBottom,10)),i},i.prototype.outerWidth=function(t){var n,i=this.innerWidth();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginLeft,10),i+=parseInt(n.marginRight,10)),i},i.prototype.scrollLeft=function(){var t=n(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=n(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function e(e,n){if("object"==t(e)&&"object"==t(n))for(var i in n)n.hasOwnProperty(i)&&(e[i]=n[i]);return e}for(var n=Array.prototype.slice.call(arguments),i=1,o=n.length;o>i;i++)e(n[0],n[i]);return n[0]},i.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},o.adapters.push({name:"noframework",Adapter:i}),o.Adapter=i}()})(),(()=>{"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var n=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.elem=e}var n,i;return n=t,(i=[{key:"init",value:function(){}}])&&e(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}(),i={};i.helpers={initComponents:function(e){return function(e,n){var i,o=function(t){var e=t.getAttribute("data-js-component");if(e)for(var i=0,o=(e=e.split(" ")).length;i<o;i++){var r=e[i];if(n.components[r]){var s=new n.components[r](t,n);s.init&&s.init()}}},r=function(e){if(Array.isArray(e))return t(e)}(i=e.querySelectorAll("[data-js-component]"))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(i)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?t(e,n):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();if(r)for(var s=0;s<r.length;s++)o(r[s]);o(e)}(e,i)}},i.components={Header:function(t){return new n(t,i).init()}};const o=i;document.addEventListener("DOMContentLoaded",(function(t){o.helpers.initComponents(document.body,o)}))})();
//# sourceMappingURL=app.js.map