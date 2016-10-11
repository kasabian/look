adminApp.factory('Api',[ "Http", function(Http) {

	var Api = {};

    Api.getServices = function() {

        return Http.get("/api/get_services", {})
    }

    Api.createService = function(obj) {
        return Http.post("/api/create_service", obj)
    }

    Api.removeService = function(obj) {
        return Http.post("/api/remove_service", obj)
    }

    Api.updateService = function(obj) {
        return Http.post("/api/update_service", obj)
    }

    Api.createServiceItem = function(obj) {
        return Http.post("/api/create_service_item", obj)
    }

    Api.removeServiceItem = function(obj) {
        return Http.post("/api/remove_service_item", obj)
    }

    Api.updateItem = function(obj) {
        return Http.post("/api/update_item", obj)
    }

    Api.getAllPhotosCategorys = function() {
        return Http.get("/api/get_all_photos_category", {})
    }

    Api.createPhotosCategory = function(obj) {
        return Http.post("/api/create_photos_category", obj)
    }

    Api.removePhotosCategory = function(obj) {
        return Http.post("/api/remove_photos_category", obj)
    }

    Api.createPhotosItems = function(obj) {
        return Http.post("/api/create_photos_items", obj)
    }


    Api.removePhotoItem = function(obj) {
        return Http.post("/api/remove_photo_item", obj)
    } 

    Api.getEpilsPrices = function(obj) {
        return Http.get("/api/get_epils_prices", obj)
    }

    Api.createEpil = function(obj) {
        return Http.post("/api/create_epil", obj)
    }

    Api.removeEpil = function(obj) {
      return Http.post("/api/remove_epil", obj)
    }

    Api.updateEpil = function(obj) {
      return Http.post("/api/update_epil", obj)
    }
    
    return Api;

}]);