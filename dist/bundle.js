(function () {
'use strict';

(function (window, undefined) {
  'use strict';

  var cssremunit = function cssremunit() {
    var div = document.createElement('div');
    div.style.cssText = 'font-size: 1rem;';

    return (/rem/.test(div.style.fontSize)
    );
  },
      isStyleSheet = function isStyleSheet() {
    var styles = document.getElementsByTagName('link'),
        filteredLinks = [];

    for (var i = 0; i < styles.length; i++) {
      if (styles[i].rel.toLowerCase() === 'stylesheet' && styles[i].getAttribute('data-norem') === null) {
        filteredLinks.push(styles[i].href);
      }
    }

    return filteredLinks;
  },
      processLinks = function processLinks() {
    for (var i = 0; i < links.length; i++) {
      xhr(links[i], storeCSS);
    }
  },
      storeCSS = function storeCSS(response, link) {
    preCSS.push(response.responseText);
    CSSLinks.push(link);

    if (CSSLinks.length === links.length) {
      for (var j = 0; j < CSSLinks.length; j++) {
        matchCSS(preCSS[j], CSSLinks[j]);
      }

      if ((links = importLinks.slice(0)).length > 0) {
        CSSLinks = [];
        preCSS = [];
        importLinks = [];
        processLinks();
      } else {
        buildCSS();
      }
    }
  },
      matchCSS = function matchCSS(sheetCSS, link) {
    var clean = removeMediaQueries(sheetCSS).replace(/\/\*[\s\S]*?\*\//g, ''),
        pattern = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g,
        current = clean.match(pattern),
        remPattern = /\d*\.?\d+rem/g,
        remCurrent = clean.match(remPattern),
        sheetPathPattern = /(.*\/)/,
        sheetPath = sheetPathPattern.exec(link)[0],
        importPattern = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm,
        importStatement;

    while ((importStatement = importPattern.exec(sheetCSS)) !== null) {
      if (importStatement[1].indexOf('/') === 0) {
        importLinks.push(importStatement[1]);
      } else {
        importLinks.push(sheetPath + importStatement[1]);
      }
    }

    if (current !== null && current.length !== 0) {
      found = found.concat(current);
      foundProps = foundProps.concat(remCurrent);
    }
  },
      buildCSS = function buildCSS() {
    var pattern = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g;
    for (var i = 0; i < found.length; i++) {
      rules = rules + found[i].substr(0, found[i].indexOf('{') + 1);
      var current = found[i].match(pattern);
      for (var j = 0; j < current.length; j++) {
        rules = rules + current[j];
        if (j === current.length - 1 && rules[rules.length - 1] !== '}') {
          rules = rules + '\n}';
        }
      }
    }

    parseCSS();
  },
      parseCSS = function parseCSS() {
    for (var i = 0; i < foundProps.length; i++) {
      css[i] = Math.round(parseFloat(foundProps[i].substr(0, foundProps[i].length - 3) * fontSize)) + 'px';
    }

    loadCSS();
  },
      loadCSS = function loadCSS() {
    for (var i = 0; i < css.length; i++) {
      if (css[i]) {
        rules = rules.replace(foundProps[i], css[i]);
      }
    }
    var remcss = document.createElement('style');
    remcss.setAttribute('type', 'text/css');
    remcss.id = 'remReplace';
    document.getElementsByTagName('head')[0].appendChild(remcss);
    if (remcss.styleSheet) {
      remcss.styleSheet.cssText = rules;
    } else {
      remcss.appendChild(document.createTextNode(rules));
    }
  },
      xhr = function xhr(url, callback) {
    try {
      var xhr = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') || new ActiveXObject('Msxml2.XMLHTTP') : new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr, url);
        }
      };

      xhr.send(null);
    } catch (e) {
      if (window.XDomainRequest) {
        var xdr = new XDomainRequest();
        xdr.open('get', url);
        xdr.onload = function () {
          callback(xdr, url);
        };
        xdr.onerror = function () {
          return false;
        };
        xdr.send();
      }
    }
  },
      removeMediaQueries = function removeMediaQueries(css) {
    if (!window.matchMedia && !window.msMatchMedia) {
      css = css.replace(/@media[\s\S]*?\}\s*\}/g, '');
    }

    return css;
  };

  if (!cssremunit()) {
    var rules = '',
        links = isStyleSheet(),
        importLinks = [],
        found = [],
        foundProps = [],
        preCSS = [],
        CSSLinks = [],
        css = [],
        fontSize = '';

    fontSize = function () {
      var doc = document,
          docElement = doc.documentElement,
          body = doc.body || doc.createElement('body'),
          isFakeBody = !doc.body,
          div = doc.createElement('div'),
          currentSize = body.style.fontSize,
          size;

      if (isFakeBody) {
        docElement.appendChild(body);
      }

      div.style.cssText = 'width:1em; position:absolute; visibility:hidden; padding: 0;';

      body.style.fontSize = '1em';

      body.appendChild(div);
      size = div.offsetWidth;

      if (isFakeBody) {
        docElement.removeChild(body);
      } else {
        body.removeChild(div);
        body.style.fontSize = currentSize;
      }

      return size;
    }();

    processLinks();
  }
})(window);

}());
//# sourceMappingURL=bundle.js.map
