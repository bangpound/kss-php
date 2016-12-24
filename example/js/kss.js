(function() {
  var KssStateGenerator;

  KssStateGenerator = (function() {
    function KssStateGenerator() {
      var i, j, len, len1, pseudos, ref, ref1, replaceRule, rule, stylesheet;
      pseudos = /(:hover|:disabled|:active|:visited|:focus|:target)/g;
      try {
        ref = document.styleSheets;
        for (i = 0, len = ref.length; i < len; i++) {
          stylesheet = ref[i];
          if (stylesheet.href.indexOf(document.domain) >= 0) {
            ref1 = stylesheet.cssRules;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              rule = ref1[j];
              if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
                replaceRule = function(matched) {
                  return matched.replace(/:/g, '.pseudo-class-');
                };
                this.insertRule(rule.cssText.replace(pseudos, replaceRule));
              }
              pseudos.lastIndex = 0;
            }
          }
        }
      } catch (error) {}
    }

    KssStateGenerator.prototype.insertRule = function(rule) {
      var headEl, styleEl;
      headEl = document.getElementsByTagName('head')[0];
      styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = rule;
      } else {
        styleEl.appendChild(document.createTextNode(rule));
      }
      return headEl.appendChild(styleEl);
    };

    return KssStateGenerator;

  })();

  new KssStateGenerator;

}).call(this);
