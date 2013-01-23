/*
Pedro J Rodriguez
VFW Project 2
0113 16Jan2013
*/
window.addEventListener("DOMContentLoaded", function(){
	
	function $(x){
		var elemtID = document.getElementById(x);
		return elemtID;
	}
	
		
	//create selec field element with options
	function activities(){
		var yourActivity = document.getElementsByTagName("form"),
			selectItems = $("select"),
			makeSelections = document.createElement("select");
			makeSelections.setAttribute("id", "activity");
		for(var i=0, j=typeOfActivity.length; i<j; i++){
			var myOptions = document.createElement("option");
			var optionText = typeOfActivity[i];
			myOptions.setAttribute("value", optionText);
			myOptions.innerHTML = optionText;
			makeSelections.appendChild(myOptions);
	
		}
		selectItems.appendChild(makeSelections);
		
		
	}
	function flavor(){
		var myFlavor = document.getElementsByTagName("form"),
			selectFlavor = $("flavorType"),
			makeFlavorSel = document.createElement("select");
			makeFlavorSel.setAttribute("id", "flavorGroup");
		for(var a=0, b=chooseFlavor.length; a<b; a++){
			var myFlavorOptions = document.createElement("option");
			var flavorOptionText = chooseFlavor[a];
			myFlavorOptions.setAttribute("value", flavorOptionText);
			myFlavorOptions.innerHTML = flavorOptionText;
			makeFlavorSel.appendChild(myFlavorOptions);
			
		}
		selectFlavor.appendChild(makeFlavorSel);
	}
	function transportation(){
		var deliveryType = document.getElementsByTagName("form"),
			myDeliveryMethod = $("pickupType"),
			makeDeliverySel = document.createElement("select");
			makeDeliverySel.setAttribute("id", "deliveryType");
		for(var c=0, d=selectPickupType.length; c<d; c++){
			var myDeliveryOptions = document.createElement("option");
			var myDeliveryOptionText = selectPickupType[c];
			myDeliveryOptions.setAttribute("value", myDeliveryOptionText);
			myDeliveryOptions.innerHTML = myDeliveryOptionText;
			makeDeliverySel.appendChild(myDeliveryOptions);
			
			
		}
			myDeliveryMethod.appendChild(makeDeliverySel);
	}
	//find value of selected radio
	function getRadio(){
		var radio = document.forms[0].formtype;
		for(var e=0; e<radio.length; e++){
			if (radio[e].checked){
				formTypeValue = radio[e].value;
			}
			
		}
	}
	
	function myControls(n){
		switch(n){
			case "on":
				$("formPartOne").style.display = "none";
				$("proceed").style.display = "none";
				$("reset").style.display = "inline";
				$("displayData").style.display = "none";
				$("anotherRequest").style.display = "inline";
				break;
			case "off":
				$("formPartOne").style.display = "block";
				$("proceed").style.display = "block";
				$("reset").style.display = "inline";
				$("displayData").style.display = "inline";
				$("anotherRequest").style.display = "none";				
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//to store the data
	function proceedWithForm(){
		var id = Math.floor(Math.random()*10000001);
		getRadio();
		var item 				= {};
			item.formType		= ["Choose Type of Form: ", formTypeValue];
			item.activity 		= ["Activity: ", $("activity").value];
			item.firstName 		= ["First Name: ", $("firstName").value];
			item.yourLastName 	= ["Last Name: ", $("lastName").value];
			item.email 			= ["Email: ", $("email").value];
			item.flavor			= ["Flavor Type: ", $("flavorGroup").value];
			item.howmany		= ["How Many People? ", $("rangeSlider").value];
			item.delivery  		= ["Delivery Type: ", $("deliveryType").value];
			item.date			= ["Date to Schedule: ", $("duedate").value];
			item.addinfo		= ["Additional Information: ", $("moreInfo").value];
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Form Saved and Proceeding");
	}
	function getData(){
		myControls("on");
		if (localStorage.length ===0){
			alert("You Have Not Added Any Data!!");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, stoLen=localStorage.length; i<stoLen; i++){
			var makeAList = document.createElement("li");
			makeList.appendChild(makeAList);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var theinfo = JSON.parse(value);
			var makeASubList = document.createElement("ul");
			makeAList.appendChild(makeASubList);
			for(var n in theinfo){
				var makeSubListItem = document.createElement("li");
				makeASubList.appendChild(makeSubListItem);
				var optSubText = theinfo[n][0]+" "+ theinfo[n][1];
				makeSubListItem.innerHTML = optSubText;
			}
		}
	}
	
	//Variables and function calls
	var typeOfActivity = ["--Choose The Activity Type--", "Birthdays", "Graduation", "School Activity", "Adult Birthdays", "Weddings", "Bachelor Party", "Bachelorette Party", "Baby Shower", "Job Related", "Going Away", "Get Well", "Other"];
	var chooseFlavor = ["--Choose The Flavor--", "Flavor 1", "Flavor 2", "Flavor 3"];
	var selectPickupType= ["--Choose Your Delivery Method--", "Delivered", "Self Pickup"];
	var formTypeValue;

	activities();
	flavor();
	transportation();
	
	
	var placeOrderRadio = document.getElementById("placeOrder");
	var informationRadio = document.getElementById("information");
	var subscribeRadio = document.getElementById("subscribe");
	var yourName = document.getElementById("firstName");
	var lastName = document.getElementById("lastName");
	var yourEmail = document.getElementById("email");
	var activityType = document.getElementById("activity");
	var flavorType = document.getElementById("flavorType");
	var quantity = document.getElementById("rangeSlider");
	var pickupType = document.getElementById("pickupType");
	var pickaDate = document.getElementById("duedate");
	var additionalInfo = document.getElementById("moreInfo");
	var resetForm = document.getElementById("reset");
		
	var clearForm = function(){
		if (localStorage.length === 0){
			alert("You have nothing to clear.")
		}else{
			localStorage.clear();
			alert("Form Cleared!");
			window.location.reload();
			return false;
		}
		
	}
	//Buttons with event listeners
	var displayData = $("displayData");
	displayData.addEventListener("click", getData);
	var clearMyform = $("reset");
	clearMyform.addEventListener("click", clearForm);	
	var proceed = $("proceed");
	proceed.addEventListener("click", proceedWithForm);
	
});


