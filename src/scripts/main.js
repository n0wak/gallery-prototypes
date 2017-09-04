/*


MODULES

*/

//var Utils = require('./modules/Utils.js');
/*


APP


*/

var Header = require('./modules/Header.js');
var Navigation = require('./modules/nav.js');

var verge = require('./vendor/verge.min.js');

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
				console.log ("CHANGE", gridItems[index]);
				gridItems[index].visible = current;

				// if (!current) {
				// 	item.dom.classList.remove('active', current);
				// }
			}
			if (current == true && last == true) {
				//console.log(">> ", item.dom.offsetTop, lastScrollPos, verge.viewportH());
				let diff = Math.abs( ( lastScrollPos + gtop/2 - item.dom.offsetTop) / verge.viewportH() );
				diff = diff<.5 ? 2*diff*diff : -1+(4-2*diff)*diff;
				//
				//console.log(Math.abs(diff));

				item.dom.style.opacity = 1 - Math.abs(diff);

				if (1 - diff > 0.65) {
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

			}
		}
		nav.setIndex(activeIndex);

	}



	let navPoint = 0;

	let main = function() {
    console.log("MAIN", t, verge);

		let _items = document.getElementsByClassName("gallery__grid__item");
		for (let _item of _items) {
			//let isVis = verge.inViewport(_item);
			gridItems.push({dom:_item, visible: false, active: false, loaded : false});
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
