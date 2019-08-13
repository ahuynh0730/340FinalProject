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

			
			var table = document.getElementById("customerTable");   

			
			var row = table.insertRow(-1);                          

			
            
			
            
            	

			var updateData = document.createElement('td');              
			var updateDataLink = document.createElement('a');
			updateDataLink.setAttribute('href','/updateTable?id=' + id);      
			var updateButton = document.createElement('input');         
			updateButton.setAttribute('value','Update Customer');       
            updateButton.setAttribute('type','button');         
			updateDataLink.appendChild(updateButton);
			updateData.appendChild(updateDataLink);
			row.appendChild(updateData);                                     
            
   
			var deleteCell = document.createElement('td');                 
			var deleteButton = document.createElement('input');             
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');                     
			deleteButton.setAttribute('value','Delete');
			deleteButton.setAttribute('onClick', 'deleteData("dataTable",' + id +')');
			var deleteHidden = document.createElement('input');             
			deleteHidden.setAttribute('type','hidden');
			deleteHidden.setAttribute('id', 'delete' + id);
			deleteCell.appendChild(deleteButton);                           
			deleteCell.appendChild(deleteHidden);
			row.appendChild(deleteCell);                                    

		}
		else {
	    	console.log("error");
		}
	});
	
	
	req.send("/add_customer?" + parameters);
	event.preventDefault(); 	
});

