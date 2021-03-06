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

//for when add employee button is pushed
var validButton = document.getElementById('addEmployee');
if (validButton){

	document.getElementById('addEmployeeButton').addEventListener('click',function(event){      	
		
		var addEmployee = document.getElementById("addEmployee");               

		
		var req = new XMLHttpRequest();

		
		var parameters =	"fName="+addEmployee.elements.fName.value +    
							"&lName="+addEmployee.elements.lName.value;


		req.open("GET", "/add_employee?" + parameters, true);                
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
		
		
		req.send("/add_employee?" + parameters);	
	});
};


//for when add order button is pushed 
var validButton = document.getElementById('addOrderButton');
if (validButton){


	document.getElementById('addOrderButton').addEventListener('click',function(event){      	
		
		var addMenuItem = document.getElementById("addOrder");               

		
		var req = new XMLHttpRequest();

		
		var parameters =	"customer_id="+addOrder.elements.customers.value +    
							"&isDelivery="+addOrder.elements.isDelivery.value +
							"&employee_id="+addOrder.elements.employees.value + 
							"&deliveryYear="+addOrder.elements.deliveryYear.value +
							"&deliveryMonth="+addOrder.elements.deliveryMonth.value + 
							"&deliveryDay="+addOrder.elements.deliveryDay.value +
							"&items="+addOrder.elements.items.value +
							"&quantity="+addOrder.elements.quantity.value;

		

		
		req.open("GET", "/add_order?" + parameters, true);                
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
		
		
		req.send("/add_order?" + parameters);	
	});
	

};

//for deleting data
function deleteData(tableId, id){                                
    
	var req = new XMLHttpRequest();
	
	//switches will delete from different table based on what tableId was
	switch(tableId){
		case "customers":
			req.open("GET", "/delete_customer?id=" + id, true); 
			break;
		case "employees":
			req.open("GET", "/delete_employee?id=" + id, true); 
			break;
		case "menu_items":
			req.open("GET", "/delete_menu_item?id=" + id, true); 
			break;
		
	}		

	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){          
	    	console.log('success');
		} else {
		    console.log('error');
		}
	});
	
	switch(tableId){
		case "customers":
			req.send("/delete_customer?id=" + id); 
			break;
		case "employees":
			req.send("/delete_employee?id=" + id); 
			break;
		case "menu_items":
			req.send("/delete_menu_item?id=" + id); 
			break;
	}			

}

//will display additional forms if order is a delivery
function deliveryCheck(val){
	
	var x = document.getElementsByClassName('reveal-if-active');
	if (val == 1){
		for (var i = 0; i < x.length; i++){
			x[i].style.visibility = 'visible';
		}
	}
	else{
		for (var i = 0; i < x.length; i++){
			x[i].style.visibility = 'hidden';
		}
	}
}

