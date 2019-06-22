(function(f) {
  window.addEventListener
    ? window.addEventListener("load", f, false)
    : window.attachEvent
    ? window.attachEvent("onload", f)
    : (window.onload = f);
})(function() {
  // Trident: IE >= 8
  // MSIE: IE <= 10
  if (
    navigator.userAgent.indexOf("Trident") == -1 &&
    navigator.userAgent.indexOf("MSIE") == -1
  ) {
    return; // Not IE
  }

  /**
   * Create an element `<name attr0=val0 attr1=val1 ...></name>`.
   *
   * `tag("name", [["attr0", "val0"], ["attr1", "val1"], ...])`
   * @param {string} name Tag name.
   * @param {{[attr_name:string]:string}?|undefined} attrs_list List of attributes.
   * @returns {HTMLElement} element object.
   */
  function tag(name, attrs_list) {
    var tag_ = document.createElement(name);
    // Boolean([]) = true
    if (attrs_list) {
      for (attr_name in attrs_list) {
        tag_.setAttribute(attr_name, attrs_list[attr_name]);
      }
    }
    return tag_;
  }

  var popup = tag("div", { id: "kickoutie-popup" });

  var browsers_parent = tag("p", {
    class: "kickoutie-clearfix",
    id: "kickoutie-browsers-parent",
  });

  document.body.appendChild(tag("div", { id: "kickoutie-wrapper" }));
  document.body
    .appendChild(popup)
    .appendChild(tag("h3", { id: "kickoutie-popup-title" }))
    .appendChild(
      document.createTextNode("This page doesn't support Internet Explorer!")
    );
  popup.appendChild(
    tag("img", {
      src:
        "https://consumerist.com/consumermediallc.files.wordpress.com/2016/01/msie_nomore.jpg",
      alt: "No Internet Explorer",
      width: "255",
      height: "143",
    })
  );
  popup
    .appendChild(tag("p"))
    .appendChild(
      document.createTextNode(
        "Install any of the following modern browsers to show this page correctly."
      )
    );
  popup
    .appendChild(browsers_parent)
    .appendChild(tag("a", { href: "https://www.mozilla.org/firefox/new/" }))
    .appendChild(
      tag("img", {
        src:
          "https://upload.wikimedia.org/wikipedia/commons/6/67/Firefox_Logo%2C_2017.svg",
        height: "128",
        width: "128",
      })
    );
  browsers_parent
    .appendChild(tag("a", { href: "https://www.google.com/chrome/" }))
    .appendChild(
      tag("img", {
        src: "https://www.google.com/chrome/static/images/chrome-logo.svg",
        height: "128",
        width: "128",
      })
    );
  // Windows 10+
  if (navigator.userAgent.match("Windows NT 1[0-9]\\.")) {
    popup
      .appendChild(tag("p"))
      .appendChild(
        document.createTextNode(
          "Or click the following icon to open this page in Edge right now!"
        )
      );
    popup
      .appendChild(tag("p"))
      .appendChild(tag("a", { href: "microsoft-edge:" + location.href }))
      .appendChild(
        tag("img", {
          src:
            "https://upload.wikimedia.org/wikipedia/commons/d/d6/Microsoft_Edge_logo.svg",
          height: "128",
          width: "128",
        })
      );
  }
});
