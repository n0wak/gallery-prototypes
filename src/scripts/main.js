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
		for (let [index, item] of gridItems.entries()) {
			//console.log (item, );
			let last = item.visible;
			let current = verge.inViewport(item.dom);
			if (current != last) {
				console.log ("CHANGE", gridItems[index]);
				gridItems[index].visible = current;
			}
			if (current == true && last == true) {
				console.log(">> ", item.dom.offsetTop, lastScrollPos, verge.viewportH());
				let diff = Math.abs( ( lastScrollPos - item.dom.offsetTop ) / verge.viewportH() );
				diff = diff<.5 ? 2*diff*diff : -1+(4-2*diff)*diff;

				console.log(Math.abs(diff));

				item.dom.style.opacity = 1 - Math.abs(diff);

				if (diff > 0) {
					//item.dom.style.transform = scale(0.5 + 0.5*Math.abs(diff), 0.5 + 0.5*Math.abs(diff))
				}

			}
		}
	}






	let main = function() {
    console.log("MAIN", t, verge);

		let _items = document.getElementsByClassName("gallery__grid__item");
		for (let _item of _items) {
			let isVis = verge.inViewport(_item);
			gridItems.push({dom:_item, visible: isVis, active: false});
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
