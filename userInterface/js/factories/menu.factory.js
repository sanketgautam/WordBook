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
    url: "dashboard.recentwords",
    type: "link"
  },
  {
    name: "My Words Collection",
    url: "dashboard.mywordscollection",
    type: "link"
  },
  {
    name: "Vocab Games",
    url: "dashboard.vocabgames",
    type: "link"
  },
  {
    name: "Recommended Words",
    url: "dashboard.recommend",
    type: "link"
  },
  {
    name: "Logout",
    url: "dashboard.logout",
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
