adminApp.factory('Http',[ "$http", "$q", function($http, $q) {

    var Http = {},
        urlsStatus = {};


    Http.post = function(url, data) {
        var deffered = $q.defer();
        
        $http({
            method: 'POST',
            url: url,
            data: data,
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (response) {

            deffered.resolve(response);
        }).error(function(response, status) {

            deffered.reject(response);
        });

        return deffered.promise;
    };



    Http.put = function(url, data) {
        var deffered = $q.defer();

        data = $.param(data);

        $http({
            method: 'PUT',
            url: url,
            data: data,
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (response) {

            deffered.resolve(response);
        }).error(function(response, status) {

            deffered.reject(response);
        });

        return deffered.promise;
    };



    Http.postPhoto = function(url, fd) {
        var deffered = $q.defer();

        $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
        }).success(function(data) {
            deffered.resolve(data);
        }).error(function(data, status) {

            deffered.reject(data);

        });

        return deffered.promise;
    };

    Http.get = function(url, dataObj) {
        var deffered = $q.defer();

        dataObj = dataObj || {};

        url += "?";

        angular.forEach(dataObj, function(value, key) {
            url += (key + "=" + value + "&")
        });

        if(url[url.length-1] === "&" || url[url.length-1] === "?") {
            url = url.slice(0, -1);
        }

        if(!angular.isObject(urlsStatus[url]) ||
           urlsStatus[url].status == false
        ) {

            urlsStatus[url] = {
                status: true,
                promise: deffered.promise
            };

        } else {

            return urlsStatus[url].promise;
        }

        $http.get(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .success(function (data) {

                urlsStatus[url].status = false;

                deffered.resolve(data);
            }).error(function(data, status) {

                urlsStatus[url].status = false;
                deffered.reject(data);
            });

        return deffered.promise;
    };


    return Http;

}]);