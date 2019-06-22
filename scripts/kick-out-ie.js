// Trident: IE >= 8
// MSIE: IE <= 10
if (
  navigator.userAgent.indexOf("Trident") != -1 ||
  navigator.userAgent.indexOf("MSIE") != -1
) {
  (function(f) {
    window.addEventListener
      ? window.addEventListener("DOMContentLoaded", f, false)
      : window.attachEvent
      ? window.attachEvent("onload", f) // IE >= 6 & <= 8
      : (window.onload = f);
  })(function() {
    /**
     * Returns translated text from key.
     *
     * @param {string} key Key of translated string.
     * @returns {string} Translted text.
     */
    function tr(key) {
      this.translation = {
        en: {
          this_page_doesnt_support_ie:
            "This page doesn't support Internet Explorer!",
          install_a_modern_browser:
            "Install any of the following modern browsers to show this page correctly.",
          click_to_open_by_edge:
            "Or click the following icon to open this page in Edge right now!",
        },
        // Japanese bad with computers persist in Internet Explorer.
        ja: {
          this_page_doesnt_support_ie:
            "Internet Explorerは、本ページのサポート対象外です",
          install_a_modern_browser:
            "このページを正しく表示するには、以下のブラウザのいずれかをインストールしてください",
          click_to_open_by_edge:
            "もしくは、以下のアイコンをクリックし、Edgeで開いてください",
        },
        // Korean and traditional Chinese may be needed. (PRs are welcome)
      };

      // IE doesn't have `navigator.languages`
      // IE 10- doesn't have `navigator.language`
      var full_lang = navigator.language || navigator.userLanguage;
      if (full_lang in this.translation && key in this.translation[full_lang]) {
        return this.translation[full_lang][key];
      }
      // ja-JP => [ja, JP] => ja
      var pure_lang = full_lang.split("-")[0];
      if (pure_lang in this.translation && key in this.translation[pure_lang]) {
        return this.translation[pure_lang][key];
      }
      if (key in this.translation.en) return translation.en[key];
      return key;
    }

    /**
     * Returns created text node with translated text.
     *
     * Equals to `document.createTextNode(tr(key))`..
     * @param {string} key Key of translated text.
     * @returns {Text} Text node with translated text.
     */
    function txt(key) {
      return document.createTextNode(tr(key));
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
          // IE <= 8 don't permit "class" as property name
          tag_.setAttribute(attr_name == "cls" ? "classs" : attr_name, attrs_list[attr_name]);
        }
      }
      return tag_;
    }

    var popup = tag("div", { id: "kickoutie-popup" });

    var browsers_parent = tag("p", {
      cls: "kickoutie-clearfix",
      id: "kickoutie-browsers-parent",
    });

    document.body.appendChild(tag("div", { id: "kickoutie-wrapper" }));
    document.body
      .appendChild(popup)
      .appendChild(tag("h3", { id: "kickoutie-popup-title" }))
      .appendChild(txt("this_page_doesnt_support_ie"));
    popup.appendChild(
      tag("img", {
        src:
          "https://consumerist.com/consumermediallc.files.wordpress.com/2016/01/msie_nomore.jpg",
        alt: "No Internet Explorer",
        width: "255",
        height: "143",
      })
    );
    popup.appendChild(tag("p")).appendChild(txt("install_a_modern_browser"));
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
    if (navigator.userAgent.match("Windows NT [1-9][0-9]+\\.")) {
      popup.appendChild(tag("p")).appendChild(txt("click_to_open_by_edge"));
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
}
