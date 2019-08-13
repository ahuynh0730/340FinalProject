//for when add customer button is pushed
var validButton = document.getElementById('addCustomerButton');
if (validButton){
	document.getElementById('addCustomerButton').addEventListener('click',function(event){      	
		
		var addCustomer = document.getElementById("addCustomer");               

		
		var req = new XMLHttpRequest();

		
		var parameters =	"fname="+addCustomer.elements.fname.value +    
							"&lname="+addCustomer.elements.lname.value +
							"&address="+addCustomer.elements.address.value +
							"&city="+addCustomer.elements.city.value +
							"&state="+addCustomer.elements.state.value +
							"&zipcode="+addCustomer.elements.zipcode.value;
		

		
		req.open("GET", "/add_customer?" + parameters, true);                
		req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

		
		req.addEventListener('load', function(){                        
			if(req.status >= 200 && req.status < 400){

				
				var response = JSON.parse(req.responseText);            
				var id = response.inserted;

				
				
			}
			else {
				console.log("error");
			}
		});
		
		
		req.send("/add_customer?" + parameters);	
	});
};


//for when add menu item button is pushed
var validButton = document.getElementById('addMenuButton');
if (validButton){
	document.getElementById('addMenuButton').addEventListener('click',function(event){      	
		
		var addMenuItem = document.getElementById("addMenuItem");               

		
		var req = new XMLHttpRequest();

		
		var parameters =	"item_name="+addMenuItem.elements.item_name.value +    
							"&type="+addMenuItem.elements.type.value +
							"&price="+addMenuItem.elements.price.value +
							"&quantity="+addMenuItem.elements.quantity.value;

		

		
		req.open("GET", "/add_menu_item?" + parameters, true);                
		req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

		
		req.addEventListener('load', function(){                        
			if(req.status >= 200 && req.status < 400){

				
				var response = JSON.parse(req.responseText);            
				var id = response.inserted;

				
				
			}
			else {
				console.log("error");
			}
		});
		
		
		req.send("/add_menu_item?" + parameters);	
	});
};
