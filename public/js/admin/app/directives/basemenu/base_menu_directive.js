adminApp.directive("baseMenu", function($location) {
    return {
        restrict: 'E',
        templateUrl: "../app/directives/basemenu/base_menu.html",

        link: function($scope, element, attrs) {

            $scope.$on("change_page", function(e, obj) {
               $(element).find("li").removeClass("active");
              
               $("." + obj.menuClass).addClass("active");

               $('body,html').animate({scrollTop:0},100);
            });
        }
    }

});
