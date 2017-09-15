/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*


MODULES

*/

//var Utils = require('./modules/Utils.js');
/*


APP


*/

var Header = __webpack_require__(1);
var Navigation = __webpack_require__(2);

var verge = __webpack_require__(3);

!function() {
	'use strict';

	let t = "test";
	let gridItems = [];
	let current = false;

	let nav;

	let header = new Header(document.getElementsByClassName("intro__header"))


	let getCurrent = function() {

		let gtop = document.getElementsByClassName("gallery")[0].offsetTop;

		let activeIndex = -1;


		for (let [index, item] of gridItems.entries()) {
			//console.log (item, );
			let last = item.visible;
			let current = verge.inViewport(item.dom);
			if (current != last) {
				//console.log ("CHANGE", gridItems[index]);
				gridItems[index].visible = current;

			}
			//if (current == true && last == true) {
				//console.log(">> ", item.dom.offsetTop, lastScrollPos, verge.viewportH());
				let diff = ( ( lastScrollPos + gtop/2 - item.dom.offsetTop) / verge.viewportH() );
				//if (diff < 2) { diff = 0;}
				diff = diff<.5 ? 2*diff*diff : -1+(4-2*diff)*diff;
				//

				//console.log (item.dom.offsetTop, lastScrollPos, "?", verge.viewportH());

				item.dom.style.opacity = Math.max(0, 1 - diff);

				if (Math.max(0, 1 - diff) > 0.65) {
					item.dom.classList.add('active');
					activeIndex = index;

					if (!item.dom.classList.contains('loaded')) {
						let d = Array.prototype.slice.call(item.dom.getElementsByTagName("source"));
						d.map(function(_item) {
							_item.setAttribute("srcset", _item.getAttribute("_srcset"));
						})

					}

				} else {
					item.dom.classList.remove('active');
				}

			//}
		}
		nav.setIndex(activeIndex);

	}



	let navPoint = 0;

	let main = function() {
    console.log("MAIN", t, verge);

		let _items = document.getElementsByClassName("gallery__grid__item");
		for (let _index = 0; _index < _items.length; _index++) {
			//let isVis = verge.inViewport(_item);
			gridItems.push({dom:_items[_index], visible: false, active: false, loaded : false});
		}



		nav = new Navigation(document.getElementsByClassName("intro__nav")[0]);

		navPoint = nav.getPos();

		window.addEventListener('scroll', function(e) {
		  lastScrollPos = verge.scrollY();
		  if (!isScrolling) {
		    window.requestAnimationFrame(function() {
		      onScroll(lastScrollPos);
		      isScrolling = false;
		    });
		  }
		  isScrolling = true;
		});

		window.dispatchEvent(new Event("scroll"));
		getCurrent();

  };


	window.addEventListener('DOMContentLoaded', main);
	//window.addEventListener('load', main);



	let lastScrollPos = 0;
	let isScrolling = false;

	let onScroll = function( pos ) {
		//console.log ("scroll", pos);
		getCurrent();
		if (pos >= navPoint) {
			nav.setSticky(true);
		} else {
			nav.setSticky(false);
		}
	}



}();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Header = function(dom) {


  


}
module.exports = Header;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Navigation = function(dom) {

  let items = [];
  let sticky = false;
  let index = 0;

  let _items = dom.getElementsByClassName("intro__nav__item");
  for (let _index = 0; _index < _items.length; _index++) {
    items.push({dom:_items[_index], visible: false, active: false});

    _items[_index].onclick = function(e) {
  		e.preventDefault();
  		document.getElementById(_item.getAttribute('data-scrollto')).scrollIntoView(true);

      window.dispatchEvent(new Event("scroll"));
    }
  }

  return {
    setSticky : function(_toggle) {
      sticky = _toggle;
      dom.classList.toggle('sticky', _toggle);

    },

    getPos : function() {
      if (!sticky) {

        return dom.offsetTop
      }
    },

    getSticky : function() {
      return sticky;
    },

    setIndex : function (_index) {
      console.log ("set index", _index);

      if (_index != -1 && _index < items.length) {
        items[index].dom.classList.remove("active");
        index = _index;
        items[index].dom.classList.add("active");
      }
    }
  }

}
module.exports = Navigation;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*!
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"verge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return a=a&&!a.nodeType?a[0]:a,a&&1===a.nodeType?b(a.getBoundingClientRect(),c):!1}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,e="function"==typeof e?e.call(b):e,e/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return b>a?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return b>a?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});


/***/ })
/******/ ]);