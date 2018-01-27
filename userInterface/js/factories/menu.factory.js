var myApp = angular.module('drona');


'use strict';

angular
  .module('drona')
  .factory('menu', [
    "$location", "$rootScope", "$http", "$window", menu
  ]);


function menu($location, $rootScope, $http, $window) {

  var sections = [{
    name: "Recent Words",
    url: "/recentwords",
    type: "link"
  },
  {
    name: "My Words Collection",
    url: "/mywordscollection",
    type: "link"
  },
  {
    name: "Vocab Games",
    url: "/vocabgames",
    type: "link"
  },
  {
    name: "Logout",
    url: "/logout",
    type: "link"
  }];


  var b;
  return b = {
    sections: sections,
    selectSection: function(e) {
      b.openedSection = e
    },
    toggleSelectSection: function(e) {
      b.openedSection = b.openedSection === e ? null : e
    },
    isSectionSelected: function(e) {
      return b.openedSection === e
    },
    selectPage: function(e, t) {
      b.currentSection = e, b.currentPage = t
    },
    isPageSelected: function(e) {
      return b.currentPage === e
    }
  }
};
