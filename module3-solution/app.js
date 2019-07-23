( function (){
  'use strict' ;
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);


  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
var menu =this;
menu.searchTerm ="";
menu.msg="";
menu.founditems = [];
menu.result="";
menu.clickButton= function(){
  if(menu.searchTerm === "")
{menu.msg="Nothing is found";
menu.result = "";}
  else
{menu.founditems = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
menu.msg="";
//menu.result="(" + menu.founditems.length + ") results available";}
};
menu.removeItem=function(indexItem){
menu.founditems.splice(indexItem,1);
};
}
}
MenuSearchService.$inject=['$http'];
function MenuSearchService($http){
var service = this;
var found =[];
service.getMatchedMenuItems = function(searchTerm) {

 $http({
  method : "GET",
  url : ("https://davids-restaurant.herokuapp.com/menu_items.json")
}).then(function(response){
  for (var i =0 ; i<(response.data).menu_items.length;i++){
    if(((response.data).menu_items[i]).description.toLowerCase().indexOf(searchTerm) !== -1)
    {found.push(response.data.menu_items[i]);
    console.log(response.data.menu_items[i]);}
    }
    })
  .catch(function(error){console.log("wrong!");
});
return found;
   };

}

function FoundItems(){
  var ddo ={
     templateUrl : 'found.html'
};
  return ddo;
}

})();
