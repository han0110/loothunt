webpackHotUpdate("styles",{

/***/ "./layouts/Layout.sass":
/*!*****************************!*\
  !*** ./layouts/Layout.sass ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"main-container":"Layout___main-container___2i5LX","mainContainer":"Layout___main-container___2i5LX","spin":"Layout___spin___1TIIv"};;
    if (true) {
      var injectCss = function injectCss(prev, href) {
        var link = prev.cloneNode();
        link.href = href;
        link.onload = function() {
          prev.parentNode.removeChild(prev);
        };
        prev.stale = true;
        prev.parentNode.insertBefore(link, prev);
      };
      module.hot.dispose(function() {
        window.__webpack_reload_css__ = true;
      });
      if (window.__webpack_reload_css__) {
        module.hot.__webpack_reload_css__ = false;
        console.log("[HMR] Reloading stylesheets...");
        var prefix = document.location.protocol + '//' + document.location.host;
        document
          .querySelectorAll("link[href][rel=stylesheet]")
          .forEach(function(link) {
            if (!link.href.match(prefix) || link.stale) return;
            injectCss(link, link.href.split("?")[0] + "?unix=1549376536591");
          });
      }
    }
  

/***/ })

})
//# sourceMappingURL=styles.ee8c091bec47f7732c09.hot-update.js.map