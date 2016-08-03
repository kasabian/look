adminApp.controller("galleryController", ["$scope", "FileUploader", "Api", "photoCatrgories", function($scope, FileUploader, Api, photoCatrgories) {
     var self = this;
     
     $scope.$emit("change_page", {menuClass: "gallery_link"});

     this.categories = photoCatrgories;
     this.uploadCategoryId = 0;
     this.beforeAsignUploadItems = [];

     this.uploaders = [];

     getNewUploaders = function() {
          var uploader = new FileUploader();

          uploader.url = "/upload/img";
          uploader.alias = "avatar";

          uploader.onSuccessItem = function(fileItem, response, status, headers) {
                 
               if(response.path){
                    
                    self.beforeAsignUploadItems.unshift({
                       big_url : response.path,
                       photos_category_id : self.categories[self.uploadCategoryId]._id 
                    });  
               }    
          }

          uploader.onCompleteAll = function() {

               Api.createPhotosItems(self.beforeAsignUploadItems).then(function(response) {
                    self.beforeAsignUploadItems = [];

                    angular.forEach(response.collections, function(item) {
                         self.categories[self.uploadCategoryId].items.unshift(item);
                    });
               });
          }


          return uploader;
     };

     angular.forEach(this.categories, function(category) {
          category['uploader'] = getNewUploaders();
     });


     this.addNewCategory = function(name) {

          Api.createPhotosCategory({
               name:name
          }).then(function(response) {
               response['uploader'] = getNewUploaders();
               self.categories.unshift(response);
          });
     }


     this.removeCategory = function(id, array_i) {

          Api.removePhotosCategory({

               photos_category_id:id
          });

          this.categories.splice(array_i, 1);
     }

     this.uploadPhotoToCategory = function(index) {
           self.uploadCategoryId = index;
     };

     this.removePhotoItem = function(categoryId, photoIndex) {

        angular.forEach(self.categories, function(category) {
               if(category._id == categoryId) {
                   
                    debugger
                    Api.removePhotoItem({
                         photo_item_id: category.items[photoIndex]._id
                    });

                    category.items.splice(photoIndex, 1); 
               }
        });

     };
     

     

     return $scope.galleryController = this;
	
}]);