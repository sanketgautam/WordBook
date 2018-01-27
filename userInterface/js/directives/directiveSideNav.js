var myApp = angular.module('drona');

myApp.directive("menuLink", function() {
    return {
      scope: {
        section: "="
      },
      template: '<md-button\n    ng-class="{\'active\' : isSelected()}"\n    ui-sref="{{section.url}}"\n    ng-click="focusSection()">\n  {{section | humanizeDoc}}\n  <span class="md-visually-hidden"\n    ng-if="isSelected()">\n    current page\n  </span>\n</md-button>\n',
      link: function(e, t) {
        var a = t.parent().controller();
        e.isSelected = function() {
          return a.isSelected(e.section)
        }, e.focusSection = function() {
          a.autoFocusContent = !0
        }
      }
    }
  }).directive("menuToggle", ["$mdUtil", "$animateCss", "$$rAF", function(e, t, a) {
    return {
      scope: {
        section: "="
      },
      template: '<md-button class="md-button-toggle"\n  ng-click="toggle()"\n  aria-controls="docs-menu-{{section.name | nospace}}"\n  aria-expanded="{{isOpen()}}">\n  <div flex layout="row">\n    {{section.name}}\n    <span flex></span>\n    <span aria-hidden="true" class="md-toggle-icon"\n    ng-class="{\'toggled\' : isOpen()}">\n      <md-icon>expand_less</md-icon>\n    </span>\n  </div>\n  <span class="md-visually-hidden">\n    Toggle {{isOpen()? \'expanded\' : \'collapsed\'}}\n  </span>\n</md-button>\n\n<ul id="docs-menu-{{section.name | nospace}}"\n  class="menu-toggle-list"\n  aria-hidden="{{!renderContent}}"\n  ng-style="{ visibility: renderContent ? \'visible\' : \'hidden\' }">\n\n  <li ng-repeat="page in section.pages">\n    <menu-link section="page"></menu-link>\n  </li>\n</ul>\n',
      link: function(n, o) {
        var l = o.parent().controller();
        n.renderContent = !1, n.isOpen = function() {
          return l.isOpen(n.section)
        }, n.toggle = function() {
          l.toggleOpen(n.section)
        }, e.nextTick(function() {
          n.$watch(function() {
            return l.isOpen(n.section)
          }, function(l) {
            var i = o.find("ul");
            i[0].querySelector("a.active");
            l && (n.renderContent = !0), a(function() {
              var a = l ? i[0].scrollHeight : 0;
              t(i, {
                easing: "cubic-bezier(0.35, 0, 0.25, 1)",
                to: {
                  height: a + "px"
                },
                duration: .75
              }).start().then(function() {
                var t = i[0].querySelector("a.active");
                if (n.renderContent = l, l && t && 0 === i[0].scrollTop) {
                  var a = t.scrollHeight,
                    o = t.offsetTop,
                    s = t.offsetParent,
                    r = s ? s.offsetTop : 0,
                    m = 2 * a,
                    d = o + r - m;
                  e.animateScrollTo(document.querySelector(".docs-menu").parentNode, d)
                }
              })
            })
          })
        });
        var i = o[0].parentNode.parentNode.parentNode;
        if (i.classList.contains("parent-list-item")) {
          var s = i.querySelector("h2");
          o[0].firstChild.setAttribute("aria-describedby", s.id)
        }
      }
    }
  }])
  .filter("nospace", function() {
    return function(e) {
      return e ? e.replace(/ /g, "") : ""
    }
  })
  .filter("humanizeDoc", function() {
    return function(e) {
      if (e) return "directive" === e.type ? e.name.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase()
      }) : e.label || e.name
    }
  }).filter("directiveBrackets", function() {
    return function(e, t) {
      if (t) {
        if (!t.element && t.attribute) return "[" + e + "]";
        if (t.element && e.indexOf("-") > -1) return "<" + e + ">"
      }
      return e
    }
  }).directive("docsScrollClass", function() {
    return {
      restrict: "A",
      link: function(e, t, a) {
        function n() {
          var e = 0 !== o[0].scrollTop;
          e !== l && t.toggleClass(a.docsScrollClass, e), l = e
        }
        var o = t.parent(),
          l = !1;
        n(), o.on("scroll", n)
      }
    }
  });


myApp.directive('serverError', function() {
  return {
    restrict: "A",
    require: '?ngModel',
    link: function(scope, element, attrs, ctrl) {
      element.on('change',function(el){

        $scope.$apply(function () {
          ctrl.$setValidity('server', true)
      });

    });
    }
  }

});
