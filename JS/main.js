/*
Pedro J Rodriguez
VFW Project 4
0113 31Jan2013
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
	function proceedWithForm(key){
		if(!(key)){
			var id = Math.floor(Math.random()*10000001);
		}else{
			id = key;
		}
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
		if (localStorage.length === 0){
			alert("You Have Not Added Any Data! Sample data has been added.");
			fillTestData();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, stoLen=localStorage.length; i<stoLen; i++){
			var makeAList = document.createElement("li");
			var myLinkHolder = document.createElement("li");
			makeList.appendChild(makeAList);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var theinfo = JSON.parse(value);
			var makeASubList = document.createElement("ul");
			makeAList.appendChild(makeASubList);
			getSetImage(theinfo.activity[1], makeASubList);
			for(var x in theinfo){
				var makeSubListItem = document.createElement("li");
				makeASubList.appendChild(makeSubListItem);
				var optionSubText = theinfo[x][0]+" "+theinfo[x][1];
				makeSubListItem.innerHTML = optionSubText;
				makeASubList.appendChild(myLinkHolder);
			}
			makeEditButtons(localStorage.key(i), myLinkHolder);
		}

	}
	function getSetImage(imgName, makeASubList){
		var imageList = document.createElement("li");
		makeASubList.appendChild(imageList);
		var myNewImage 	= document.createElement("img");
		var imgSource	= myNewImage.setAttribute("src", "Images/"+ imgName + ".png");
		imageList.appendChild(myNewImage);
	}
	function fillTestData(){
		for(var i in json){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[i]));
		}
	}
	
	function makeEditButtons(key, myLinkHolder){
		var editItemLi = document.createElement("a");
	    editItemLi.href = "#";
		editItemLi.key = key;
		var editItemLiText = "Edit Item";
		editItemLi.addEventListener("click", editMyItem);
		editItemLi.innerHTML = editItemLiText;
		myLinkHolder.appendChild(editItemLi);
		
		var makeABreak = document.createElement("br");
		myLinkHolder.appendChild(makeABreak);
		
		var deleteItemLi = document.createElement("a");
		deleteItemLi.href = "#";
		deleteItemLi.key  = key;
		var deleteItemText = "Delete Item";
		deleteItemLi.addEventListener("click", deleteMyItem);
		deleteItemLi.innerHTML = deleteItemText;
		myLinkHolder.appendChild(deleteItemLi);
	}
	function deleteMyItem(){
		var say = confirm("All content will be deleted!!");
		if(say){
			localStorage.removeItem(this.key);
			window.location.reload();	
		}else{
			alert("Items are not DELETED");
			window.location.reload();
			return false;
		}
	}
	
	//this funciton edits the items in your form
	function editMyItem(){
		var myValue = localStorage.getItem(this.key);
		var item = JSON.parse(myValue);
		
		myControls("off");
		var myRadio = document.forms[0].formtype;
		for(var f=0; f < myRadio.length; f++){
			if(myRadio[f].value == "Place Order" && item.formType[1] == "Place Order"){
				myRadio[f].setAttribute("checked", "checked");
			}else if (myRadio[f].value == "Information" && item.formType[1] == "Information"){
				myRadio[f].setAttribute("checked", "checked");	
			}else if (myRadio[f].value == "Subscribe" && item.formType[1] == "Subscribe"){
				myRadio[f].setAttribute("checked", "checked");
			}
		}
		$("activity").value = item.activity[1];
		$("firstName").value = item.firstName[1];
		$("lastName").value =	item.yourLastName[1];
		$("email").value = item.email[1];
		$("flavorGroup").value = item.flavor[1];
		$("rangeSlider").value = item.howmany[1];
		$("deliveryType").value = item.delivery[1];
		$("duedate").value = item.date[1];
		$("moreInfo").value = item.addinfo[1];
		
		proceed.removeEventListener("click", proceedWithForm);
		$("proceed").value = "Edit Information";
		var editInformationSubmit = $("proceed");
		editInformationSubmit.addEventListener("click", validateFields);
		editInformationSubmit.key = this.key;
			
	}
	function validateFields(z){
		var getFirstName = $("firstName");
		var getLastName  = $("lastName");
		var getTheEmail  = $("email");
		
		valErrors.innerHTML = "";
		getFirstName.style.border = "1px solid black";
		getLastName.style.border =  "1px solid black";
		getTheEmail.style.border = "1px solid black";
		
		//This will be the error messages
		var myMessageArray = [];
		if(getFirstName.value === ""){
			var getFirstNameError = "Please Enter A First Name!";
			getFirstName.style.border = "2px solid yellow";
			myMessageArray.push(getFirstNameError);	
		}
		if(getLastName.value === ""){
			var getLastNameError = "Please Enter A Last Name!";
			getLastName.style.border =  "2px solid yellow";
			myMessageArray.push(getLastNameError);
		}
		var emailVal = /^\w+([\.-]?\w+)*@\w+([\.-])*(\.\w{2,3})+$/;
		if(!(emailVal.exec(getTheEmail.value))){
			var getTheEmailError = "Please Enter A Correct Email!";
			getTheEmail.style.border = " 2px solid yellow";
			myMessageArray.push(getTheEmailError);
		}
		
		if(myMessageArray.length >= 1){
			for(var g=0, h=myMessageArray.length; g < h; g++){
				var errorText = document.createElement("li");
				errorText.innerHTML = myMessageArray[g];
				valErrors.appendChild(errorText);
				}
				z.preventDefault();
				return false;
		}else{
			proceedWithForm(this.key);
		}
	}	
	//Variables and function calls
	var typeOfActivity = ["--Choose The Activity Type--", "Birthdays", "Graduation", "School Activity", "Adult Birthdays", "Weddings", "Bachelor Party", "Bachelorette Party", "Baby Shower", "Job Related", "Going Away", "Get Well", "Other"];
	var chooseFlavor = ["--Choose The Flavor--", "Flavor 1", "Flavor 2", "Flavor 3"];
	var selectPickupType= ["--Choose Your Delivery Method--", "Delivered", "Self Pickup"];
	var formTypeValue;
	var valErrors = $("valErrors");
	activities();
	flavor();
	transportation();
			
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
	proceed.addEventListener("click", validateFields);
	
});


