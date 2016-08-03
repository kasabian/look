adminApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });

        $routeProvider

        .when('/admin', {   
            templateUrl: "../app/pages/prices/index.html",
            controller: "pricesController",
            resolve: {
                Services:function(Api) {
                    return Api.getServices();
                }
            }

        })

        .when('/admin/gallery', {   
            templateUrl: "../app/pages/gallery/index.html",
            controller: "galleryController",
            resolve: {
                photoCatrgories:function(Api) {
                    return Api.getAllPhotosCategorys();
                }
            }

        })

        .when('/admin/epil_link', {   
            templateUrl: "../app/pages/epil/index.html",
            controller: "epilController",
            resolve: {
                epilData:function(Api) {
                    return  Api.getEpilsPrices();
                }
            }

        })

        

        .otherwise({
            redirectTo: '/admin'
        });


    }]);
