/*


MODULES

*/

//var Utils = require('./modules/Utils.js');
/*


APP


*/
var verge = require('./vendor/verge.min.js');

!function() {
	'use strict';

	let t = "test";
	let gridItems = [];
	let current = false;


	let getCurrent = function() {

		let gtop = document.getElementsByClassName("gallery")[0].offsetTop;

		for (let [index, item] of gridItems.entries()) {
			//console.log (item, );
			let last = item.visible;
			let current = verge.inViewport(item.dom);
			if (current != last) {
				console.log ("CHANGE", gridItems[index]);
				gridItems[index].visible = current;

				// if (!current) {
				// 	item.dom.classList.remove('active', current);
				// }
			}
			if (current == true && last == true) {
				console.log(">> ", item.dom.offsetTop, lastScrollPos, verge.viewportH());
				let diff = Math.abs( ( lastScrollPos + gtop/2 - item.dom.offsetTop) / verge.viewportH() );
				diff = diff<.5 ? 2*diff*diff : -1+(4-2*diff)*diff;

				console.log(Math.abs(diff));

				item.dom.style.opacity = 1 - Math.abs(diff);

				if (1 - diff > 0.65) {
					item.dom.classList.add('active');
				} else {
					item.dom.classList.remove('active');
				}

			}
		}
	}






	let main = function() {
    console.log("MAIN", t, verge);

		let _items = document.getElementsByClassName("gallery__grid__item");
		for (let _item of _items) {
			//let isVis = verge.inViewport(_item);
			gridItems.push({dom:_item, visible: false, active: false});
		}

		getCurrent();
  };


	window.addEventListener('DOMContentLoaded', main);



	let lastScrollPos = 0;
	let isScrolling = false;

	let onScroll = function( pos ) {
		//console.log ("scroll", pos);
		getCurrent();
	}


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
}();
