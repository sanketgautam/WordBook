'use strict';

var myApp = angular.module('drona');

myApp.controller('dashboardCommonController', ["$scope", "$mdSidenav", "$timeout", "$mdDialog", "menu", "$location", "$rootScope", "$mdUtil",'restAPI','$window','$state', function(e, n, o, l, i, s, r, m,restAPI,$window,$state) {
 

  function c() {
    o(function() {
      n("left").open()
    })
  }

  function p() {
    return s.path()
  }

  function u() {
    m.animateScrollTo(P, 0, 200)
  }

  function g(e) {
    e && e.preventDefault(), o(function() {
      j.focus()
    }, 90)
  }

  function f(e) {
    return i.isPageSelected(e)
  }

  function y(e) {
    var t = !1,
      a = i.openedSection;
    return a === e ? t = !0 : e.children && e.children.forEach(function(e) {
      e === a && (t = !0)
    }), t
  }

  function v(e) {
    return i.isSectionSelected(e)
  }

  function x(e) {
    i.toggleSelectSection(e)
  }
  var w = this;
  e.menu = i, e.path = p, e.openMenu = c, e.isSectionSelected = y, e.scrollTop = u, e.thisYear = (new Date).getFullYear(), e.focusMainContent = g,
    this.isOpen = v, this.isSelected = f, this.toggleOpen = x, this.autoFocusContent = !1;
}]);
