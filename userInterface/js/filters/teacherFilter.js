var myApp = angular.module('drona');
myApp.filter('teacherToLink', function() {
    return function(teachers) {
     if(!angular.isArray(teachers)) return ;
     else{
       return teachers.join(', ');
      }
    };
});
