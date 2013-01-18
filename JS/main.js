/*
Pedro J Rodriguez
VFW Project 2
0113 16Jan2013
*/
window.addEventListener("DOMContentLoaded", function(){
	
	
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
	
	var captureData = function(){
		localStorage.setItem("Place Order", placeOrderRadio.value);
		localStorage.setItem("Information", informationRadio.value);
		localStorage.setItem("Subscribe", subscribeRadio.value);
		localStorage.setItem("First Name", yourName.value);
		localStorage.setItem("Last Name", lastName.value);
		localStorage.setItem("Email", yourEmail.value);
		localStorage.setItem("Activity Type", activityType.value);
		localStorage.setItem("Flavor Type", flavorType.value);
		localStorage.setItem("Quantity", quantity.value);
		localStorage.setItem("Type of Pickup", pickupType.value);
		localStorage.setItem("Date", pickaDate.value);
		localStorage.setItem("More Information", additionalInfo.value);
		localStorage.setItem(id, JSON.stringify)
	};
	
	var getData	= function(){
		var yourNameKey = localStorage.key("First Name");
		var yourNameValue = localStorage.getItem(yourNameKey);
		yourName.value = yourNameValue;
	}
	
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
	
	//event listeners
	placeOrderRadio.addEventListener("blur", captureData);
	informationRadio.addEventListener("blur", captureData);
	subscribeRadio.addEventListener("blur", captureData);
	yourName.addEventListener("blur", captureData);
	lastName.addEventListener("blur", captureData);
	yourEmail.addEventListener("blur", captureData);
	activityType.addEventListener("blur", captureData);
	flavorType.addEventListener("blur", captureData);
	quantity.addEventListener("blur", captureData);
	pickupType.addEventListener("blur", captureData);
	pickaDate.addEventListener("blur", captureData);
	additionalInfo.addEventListener("blur", captureData);
	resetForm.addEventListener("click", clearForm);





});


