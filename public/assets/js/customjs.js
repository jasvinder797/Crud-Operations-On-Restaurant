console.log = function(){};  /*disable all console log */
window.onload = function() 
{
    localStorage.clear();
    var formUpdate = document.getElementById('form_update');
    var formCreate = document.getElementById('form_create');
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = 'block';
    formUpdate.style.display = 'none';
    formCreate.style.display = 'none';
    driverSearchBox();
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("GET", "https://restaurantappp.herokuapp.com/api/order");
        ajaxRequest.send(null);
    }
    function ajaxResponse() 
    {
        if(ajaxRequest.readyState != 4){}
        else if(ajaxRequest.status == 200)
        {
           
            createList(ajaxRequest.response);
        }
        else
        {
    	   alert("Its in Error");
        }
    }
}
function driverSearchBox()
{
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("GET", "https://restaurantappp.herokuapp.com/api/driver");
        ajaxRequest.send(null);
    }
    function ajaxResponse() 
    {
        if(ajaxRequest.readyState != 4){}
        else if(ajaxRequest.status == 200)
        {
            createDriverList(ajaxRequest.response,2);
        }
        else
        {
    	   alert("Its in Error");
        }
    }
}
function createDriverList(obj,key)
{
    var data = JSON.parse(obj)   /*==Convert string data to JSON Oject so that we can easliy parse it ===*/
    var driverString ="<option>Select Driver</option>";
    for(var i=0;i<data.length;i++)
    {
        driverString += '<option>'+data[i].name+'</option>';
    }
    if(key==1)
    {
        document.getElementById('ndrivers').innerHTML = driverString;
    }
    else if(key==2)
    {
        document.getElementById('sdrivers').innerHTML = driverString;
    }
    else{
        document.getElementById('drivers').innerHTML = driverString;
    }

}
function createList(obj)
{
    var data = JSON.parse(obj)   /*==Convert string data to JSON Oject so that we can easliy parse it ===*/
    var rowString ="";
    var packed=0,away=0,delivered=0,todo=0;
    for(var i=0;i<data.length;i++)
    {
        if(data[i].orderstatus.toLowerCase()=="packed")
        {
            packed++;
              rowString +='<div class="order col-sm-6 col-lg-3"><div class="card text-white bg-flat-color-1"><div class="action_packed">Packed</div><div class="card-body pb-0"><h4 id="margin"><span class="count">Order No : '+data[i].ordernumber+'</span></h4><p id="margin" class="text-light">Client : '+data[i].clientname+'</p><p id="margin" class="text-light">Phone : '+data[i].phonenuber+'</p><p id="margin" class="text-light">Driver : '+data[i].driver+'</p><h4 id="margin"><span class="count">'+data[i].ordername+'</span></h4></div><div class="action_packed"><div class="col-sm-6 text-center nopadding update" onClick="displayUpdateForm(\'' + data[i]._id + '\')"><a id="white" href="#">Update&nbsp;&nbsp;<i class="fa fa-edit" aria-hidden="true"></i></a></div><div class="col-sm-6 text-center nopadding" onClick="requestForDelete(\'' + data[i]._id + '\')"><a id="white" href="#">Delete&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></a></div></div></div></div>'   
        }
        else if(data[i].orderstatus.toLowerCase()=="delivered")
        {
            delivered++;
              rowString +='<div class="order col-sm-6 col-lg-3"><div class="card text-white bg-flat-color-5"><div class="action_delivered">Delivered</div><div class="card-body pb-0"><h4 id="margin"><span class="count">Order No : '+data[i].ordernumber+'</span></h4><p id="margin" class="text-light">Client : '+data[i].clientname+'</p><p id="margin" class="text-light">Phone : '+data[i].phonenuber+'</p><p id="margin" class="text-light">Driver : '+data[i].driver+'</p><h4 id="margin"><span class="count">'+data[i].ordername+'</span></h4></div><div class="action_delivered"><div class="col-sm-6 text-center nopadding update" onClick="displayUpdateForm(\'' + data[i]._id + '\')"><a id="white" href="#">Update&nbsp;&nbsp;<i class="fa fa-edit" aria-hidden="true"></i></a></div><div class="col-sm-6 text-center nopadding" onClick="requestForDelete(\'' + data[i]._id + '\')"><a id="white" href="#">Delete&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></a></div></div></div></div>'  
        }
        else if(data[i].orderstatus.toLowerCase()=="todo")
        {
            todo++;
             rowString +='<div class="order col-sm-6 col-lg-3"><div class="card text-white bg-flat-color-3"><div class="action_todo">ToDo</div><div class="card-body pb-0"><h4 id="margin"><span class="count">Order No : '+data[i].ordernumber+'</span></h4><p id="margin" class="text-light">Client : '+data[i].clientname+'</p><p id="margin" class="text-light">Phone : '+data[i].phonenuber+'</p><p id="margin" class="text-light">Driver : '+data[i].driver+'</p><h4 id="margin"><span class="count">'+data[i].ordername+'</span></h4></div><div class="action_todo"><div class="col-sm-6 text-center nopadding update" onClick="displayUpdateForm(\'' + data[i]._id + '\')"><a id="white" href="#">Update&nbsp;&nbsp;<i class="fa fa-edit" aria-hidden="true"></i></a></div><div class="col-sm-6 text-center nopadding" onClick="requestForDelete(\'' + data[i]._id + '\')"><a id="white" href="#">Delete&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></a></div></div></div></div>'   
        }
        else if(data[i].orderstatus.toLowerCase()=="away")
        {
            away++;
             rowString +='<div class="order col-sm-6 col-lg-3"><div class="card text-white bg-flat-color-4"><div class="action_away">Away</div><div class="card-body pb-0"><h4 id="margin"><span class="count">Order No : '+data[i].ordernumber+'</span></h4><p id="margin" class="text-light">Client : '+data[i].clientname+'</p><p id="margin" class="text-light">Phone : '+data[i].phonenuber+'</p><p id="margin" class="text-light">Driver : '+data[i].driver+'</p><h4 id="margin"><span class="count">'+data[i].ordername+'</span></h4></div><div class="action_away"><div class="col-sm-6 text-center nopadding update" onClick="displayUpdateForm(\'' + data[i]._id + '\')"><a id="white" href="#">Update&nbsp;&nbsp;<i class="fa fa-edit" aria-hidden="true"></i></a></div><div class="col-sm-6 text-center nopadding" onClick="requestForDelete(\'' + data[i]._id + '\')"><a id="white" href="#">Delete&nbsp;&nbsp;<i class="fa fa-trash" aria-hidden="true"></i></a></div></div></div></div>'   
        }
      
      }

    document.getElementById('orders').innerHTML = rowString;
    document.getElementById('packed').innerHTML = packed;
    document.getElementById('delivered').innerHTML = delivered;
    document.getElementById('away').innerHTML = away;
    document.getElementById('todo').innerHTML = todo;
    
    //document.getElementById("loading").style.display = "none";
}
function displayCreate(id){
    var formUpdate = document.getElementById('form_update');
    var formCreate = document.getElementById('form_create');
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = 'none';
    formUpdate.style.display = 'none';
    formCreate.style.display = 'block';
    updateRecord(id);
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("GET", "https://restaurantappp.herokuapp.com/api/driver");
        ajaxRequest.send(null);
    }
    function ajaxResponse() 
    {
        if(ajaxRequest.readyState != 4){}
        else if(ajaxRequest.status == 200)
        {
            createDriverList(ajaxRequest.response,1);
        }
        else
        {
    	   alert("Its in Error");
        }
    }
}
function displayUpdateForm(id){
    var formUpdate = document.getElementById('form_update');
    var formCreate = document.getElementById('form_create');
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = 'none';
    formUpdate.style.display = 'block';
    formCreate.style.display = 'none';
    updateRecord(id);
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("GET", "https://restaurantappp.herokuapp.com/api/driver");
        ajaxRequest.send(null);
    }
    function ajaxResponse() 
    {
        if(ajaxRequest.readyState != 4){}
        else if(ajaxRequest.status == 200)
        {
            createDriverList(ajaxRequest.response,2);
        }
        else
        {
    	   alert("Its in Error");
        }
    }
}
function displayOrders()
{
   var formUpdate = document.getElementById('form_update');
    var formCreate = document.getElementById('form_create');
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = 'block';
    formUpdate.style.display = 'none';
    formCreate.style.display = 'none';
}

function requestForDelete(id){
   var choice =  confirm("Are you sure, you want to delete this record")
   if (choice == true) 
   {
       deleteRecord(id);
        document.getElementById("loading").style.display = "block";

   }  			
}



function editRecord(record){

     localStorage.setItem('testObject', record);  /*==store the id in the local storag so that we can use to get the record baseed on the id=*/
     window.location.href="profile.html";
}
function updateRecord(id){
   
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) 
            {
                ajaxRequest.onreadystatechange = ajaxResponse;
                ajaxRequest.open("GET", "https://restaurantappp.herokuapp.com/api/order/"+id); // Where?
                ajaxRequest.send(null);
			}
       function ajaxResponse() {//This gets called when the readyState changes.

		             if(ajaxRequest.readyState != 4){
                    
                         console.log("its in process")

                 }else if(ajaxRequest.status == 200){

                          createForm(ajaxRequest.response);  /*===Record delted complete load the data again from get api======*/

                 }else{

                 	   console.log("Error")
                 }

  }


}
function createForm(obj)
{
    var data = JSON.parse(obj);   
    var formString ="";
      formString += '<div class="card"><div class="card-header"><strong>Update</strong><div class="card-body card-block"><form action="" method="post" class=""><div class="row"><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Order No.</label><input type="number"  name="nf-email" class="form-control" value="'+data.ordernumber+'" id="ordernumber"></div></div><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Order Name</label><input type="text"  name="nf-email" value="'+data.ordername+'" class="form-control" id="ordername"></div></div></div><div class="row"><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Client Name</label><input type="text"  name="nf-email" value="'+data.clientname+'" class="form-control" id="clientname"></div></div><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Client Phone</label><input type="number"  name="nf-email" value="'+data.phonenuber+'" class="form-control" id="phonenuber"></div></div></div> <div class="form-group"><label for="nf-email" class=" form-control-label">Client Address</label><input type="text"  name="nf-email" value="'+data.clientaddress+'" class="form-control" id="clientaddress"></div><div class="row"><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Order Status</label><select type="number"  name="nf-email" id="orderstatus" class="form-control"><option>select Status</option><option>ToDo</option><option>Packed</option><option>Delivered</option><option>Away</option></select></div></div><div class="col-sm-6"><div class="form-group"><label for="nf-email" class=" form-control-label">Driver</label><select name="nf-email" class="form-control" id="drivers"></select></div></div></div></form></div><div class="card-footer"><button type="submit" class="btn btn-primary btn-sm" onclick="saveRecord(\'' + data._id + '\');"><i class="fa fa-dot-circle-o"></i> Submit</button><button type="reset" class="btn btn-danger btn-sm" onclick="displayOrders();"><i class="fa fa-ban"></i> Cancel</button></div></div>';
    document.getElementById("form_update").innerHTML = formString;
    
}
function createOrder(){
    var order = new Object();
    order.ordernumber = document.getElementById("nordernumber").value;
    order.ordername = document.getElementById("nordername").value;
    order.clientname = document.getElementById("nclientname").value;
    order.phonenuber = document.getElementById("nphonenuber").value;
    order.clientaddress = document.getElementById("nclientaddress").value;
    order.orderstatus = document.getElementById("norderstatus").value.toLowerCase();
    order.driver = document.getElementById("ndrivers").value;
    alert(JSON.stringify(order))
        var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("POST", "https://restaurantappp.herokuapp.com/api/order/");
            ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
                onload(); 
            }
            else
            {
                console.log("Error")
            }

  }
      
}
function saveRecord(id){
  
    var order = new Object();
    order.ordernumber = document.getElementById("ordernumber").value;
    order.ordername = document.getElementById("ordername").value;
    order.clientname = document.getElementById("clientname").value;
    order.phonenuber = document.getElementById("phonenuber").value;
    order.clientaddress = document.getElementById("clientaddress").value;
    order.orderstatus = document.getElementById("orderstatus").value.toLowerCase();
    order.driver = document.getElementById("drivers").value;
    alert(JSON.stringify(order))
        var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("PUT", "https://restaurantappp.herokuapp.com/api/order/"+id);
            ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
                onload(); 
            }
            else
            {
                console.log("Error")
            }

  }
      
}
function deleteRecord(id){
   
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) 
            {
                ajaxRequest.onreadystatechange = ajaxResponse;
                ajaxRequest.open("DELETE", "https://restaurantappp.herokuapp.com/api/order/"+id); // Where?
                ajaxRequest.send(null);
			}
       function ajaxResponse() {//This gets called when the readyState changes.

		             if(ajaxRequest.readyState != 4){
                    
                         console.log("its in process")

                 }else if(ajaxRequest.status == 200){

                          onload();  /*===Record delted complete load the data again from get api======*/

                 }else{

                 	   console.log("Error")
                 }

  }


}


