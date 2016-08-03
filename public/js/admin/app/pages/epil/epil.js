adminApp.controller("epilController", ["$scope", "Api", "epilData", function($scope, Api, epilData) {
     var self = this;
     
     $scope.$emit("change_page", {menuClass: "epil_link"});

     this.epils = epilData;

     this.createEpilData = {};

     this.createEpil = function() {

     	if(!this.createEpilData.service_type_name || 
     	   !this.createEpilData.value_1 || 
     	   !this.createEpilData.value_2 || 
     	   !this.createEpilData.value_3
     	) {

     		alert("Нужно заполнить все поля!");
     		return false;
     	}

     	Api.createEpil(this.createEpilData).then(function(response) {
     		self.epils.unshift(response);
     	});

     };

     this.removeEpil = function(index) {

     	Api.removeEpil({
     		service_id: self.epils[index]._id
     	});

     	self.epils.splice(index, 1);	

     };

     this.startEditItem = function(epil) {

     	epil.service_type_name_editing = epil.service_type_name; 
        epil.value_1_editing = epil.value_1;
        epil.value_2_editing = epil.value_2; 
        epil.value_3_editing = epil.value_3; 

     	epil.editItem = true;
     };

      this.endEditingItem = function(epil) {

      	epil.service_type_name = epil.service_type_name_editing; 
        epil.value_1 = epil.value_1_editing;
        epil.value_2 = epil.value_2_editing; 
        epil.value_3 = epil.value_3_editing;
        
        Api.updateEpil(epil);

      	epil.editItem = false;
     };
     
     return $scope.epilController = this;
	
}]);