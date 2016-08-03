adminApp.controller("pricesController", ["$scope", "FileUploader", "Services", "Api", function($scope, FileUploader, Services, Api) {
     	
     	var self = this;

     	$scope.$emit("change_page", {menuClass: "prices_link"});

     	this.services = Services;

          this.nameNewService = ""; 

          this.addService = function() {
               
               if(!this.nameNewService || !this.imgSrc) {
                    alert("Нужно заполнить все поля");

                    return false
               }

               Api.createService({
                    name: this.nameNewService,
                    src:  this.imgSrc,
                    description: this.descriptionNewService
               }).then(function(response) {

                   self.nameNewService = "";
                   self.imgSrc = "";
                   self.descriptionNewService = "";   

                   self.services.unshift(response);
               });

          }     

          this.removeService = function(index){
               var service_id = this.services[index]._id;

               this.services.splice(index, 1);

               Api.removeService({
                    service_id : service_id
               });
          }

          this.addItemToService = function(index) {

               if(!this.services[index].serviceItemName || !this.services[index].serviceItemPrice) {
                    alert("Нужно заполнить все поля");

                    return false
               }

               Api.createServiceItem({
                    name: this.services[index].serviceItemName,
                    price: this.services[index].serviceItemPrice,
                    is_promo: false,
                    promo_count: this.services[index].serviceItemPromoCount ? this.services[index].serviceItemPromoCount : 0,
                    service_id: this.services[index]._id,

               }).then(function(response) {
                    self.services[index].items.unshift(response);
               });    

               this.services[index].serviceItemName = "";
               this.services[index].serviceItemPrice = "";    
               this.services[index].serviceItemPromoCount = 0;    
          }

          this.removeItem = function(service, index) {

               Api.removeServiceItem({
                    item_id:service.items[index]._id
               });

               service.items.splice(index, 1);
          }

          this.startEditItem = function(serviceItem) {
               serviceItem.editItem = true;

               serviceItem.priceEditing = serviceItem.price; 
               serviceItem.nameEditing = serviceItem.name; 
               serviceItem.promo_countEditing = serviceItem.promo_count;
          }

          this.endEditingItem = function(serviceItem) {
               serviceItem.editItem = false;
               serviceItem.price = serviceItem.priceEditing; 
               serviceItem.name = serviceItem.nameEditing;
               serviceItem.promo_count = serviceItem.promo_countEditing; 

               Api.updateItem(serviceItem);
          }

          this.uploader = new FileUploader();

          this.uploader.url = "/upload/img";
          this.uploader.alias = "avatar";
          
          this.imgSrc = "";

          this.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                 
               if(response.path){
                 
                    self.imgSrc = response.path;   
               }    
          }

          this.uploader.onAfterAddingFile = function(fileItem) {
            self.uploader.uploadAll();
          }

        return $scope.PricesController = this;
	}
]);