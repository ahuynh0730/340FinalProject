//for when add customer button is pushed
document.getElementById('addCustomerButton').addEventListener('click',function(event){      	
	
	console.log("function called");
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

