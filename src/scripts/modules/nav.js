var Navigation = function(dom) {

  let items = [];
  let sticky = false;
  let index = 0;

  console.log ("NAV INIT")

  let _items = dom.getElementsByClassName("intro__nav__item");
  for (let _item of _items) {
    items.push({dom:_item, visible: false, active: false});

    _item.onclick = function(e) {
  		e.preventDefault();
      console.log ("click", _item.getAttribute('data-scrollto'));
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
