"use strict";
/*
 * Code for University of Strathclyde Mobile App Development.
 * Developed by John McMenemy 2019.
 *
 * Code confidential to developer and course examiners.
 *
 */


window.addEventListener("load", init);

function setLocalStorageItem(key, value) {
    if(typeof  localStorage != "undefined"){
        localStorage.setItem(key, value);
    }else{
        console.log("No local storage!");
    }
}

function init(){

    getECBRatesAndLoad();

}

function getECBRatesAndLoad(){

    let chosenCurrencies = {"home":"GBP", "visiting":"EUR"};

    let bankFee = {"fee":0};

    let currencies = {"EUR":1};

    if(navigator.onLine) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');

        xhr.onreadystatechange = function () {

            let DONE = 4;
            let OK = 200;

            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    let parser = new DOMParser();
                    let xmlResponse = parser.parseFromString(xhr.responseText, "text/xml");

                    let ratesObject = xmlResponse.getElementsByTagName("Cube")[0];

                    for (let node of ratesObject.childNodes[1].childNodes) {
                        if (node.attributes) {
                            let currencyName = node.getAttribute("currency");
                            let currencyRate = node.getAttribute("rate");

                            currencies[currencyName] = currencyRate;

                        }
                    }

                    setLocalStorageItem("ratesECB201748244", JSON.stringify(currencies));

                    setUpApp(currencies, chosenCurrencies, bankFee);

                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.

                    currencies = getECBRatesFromLocalStorage();

                    setUpApp(currencies, chosenCurrencies, bankFee);

                }
            }
        }

        xhr.send(null);

    }else{
        window.alert("Please connect to the Internet to get or update the rates!");

        currencies = getECBRatesFromLocalStorage();

        setUpApp(currencies, chosenCurrencies, bankFee);
    }

    return currencies;

}

function getECBRatesFromLocalStorage(){

    let ratesLocalStorage = localStorage.getItem("ratesECB201748244");

    if(ratesLocalStorage){
        let parsed = JSON.parse(ratesLocalStorage);
        parsed["EUR"] = 1;
        return parsed;
    } else{
        return {"EUR":1};
    }

}

function setUpApp(currencies, chosenCurrencies, bankFee){

    buildMenu(currencies);

    addCurrencyButtonListeners(chosenCurrencies);

    addNumberButtonFunctionality(currencies, chosenCurrencies, bankFee);

    getBankFeeFromLocalStorage(bankFee);

    setPreferredCurrenciesFromLocalStorage(chosenCurrencies);

    setChosenConversionText(chosenCurrencies);

    setBankFeeDisplayText(bankFee);

    addBankFeeDivListeners(bankFee);

    addAboutPageDivListeners();
}

// Whenever you press a currency you should see a choice for home or visiting country
function addCurrencyButtonListeners(chosenCurrencies){

    let currencyButtons = document.getElementsByClassName("currency");

    for( let button of Object.values(currencyButtons)){

        button.addEventListener("click", function () {

            let selectedCurrency = button.getElementsByTagName("p")[0].innerText;

            let homeVisitingButtonsDiv = O("setCurrencyDiv");

            attachListenersForSelectingCurrency(selectedCurrency, chosenCurrencies, homeVisitingButtonsDiv);

            homeVisitingButtonsDiv.style.visibility = "visible";

        })

    }

}

// Add listeners to the Home/Visiting/Cancel buttons that allow you te set the currency as such
function attachListenersForSelectingCurrency(selectedCurrency, chosenCurrencies, homeVisitingButtonsDiv) {

    let homeButton = O("setHomeCurrencyButton"),
        homeButtonClone = homeButton.cloneNode(true);
    let visitingButton = O("setVisitingCurrencyButton"),
        visitingButtonClone = visitingButton.cloneNode(true);
    let cancelButton = O("cancelCurrencyButton");

    function clearEventListeners() {

        // Clears the events listeners by using the clones of the objects

        if(homeButton.parentNode){
            homeButton.parentNode.replaceChild(homeButtonClone, homeButton);
        }

        if(visitingButton.parentNode){
            visitingButton.parentNode.replaceChild(visitingButtonClone, visitingButton);
        }
    }

    // This is here for the sake of removing duplicate lines later on
    function updateChosenConversionTextAndHideButtons(){
        setChosenConversionText(chosenCurrencies);

        homeVisitingButtonsDiv.style.visibility = "hidden";

        clearEventListeners();

    }


    if (chosenCurrencies["home"] !== selectedCurrency){

        homeButton.addEventListener("click", function () {
            chosenCurrencies["home"] = selectedCurrency;

            setLocalStorageItem("home201748244", selectedCurrency);

            updateChosenConversionTextAndHideButtons();
        })

    }else{

        homeButton.style.opacity = "0.5";

    }

    if(chosenCurrencies["visiting"] !== selectedCurrency){

        visitingButton.addEventListener("click", function () {
            chosenCurrencies["visiting"] = selectedCurrency;

            setLocalStorageItem("visiting201748244", selectedCurrency);

            updateChosenConversionTextAndHideButtons();
        })

    }else{

        visitingButton.style.opacity = "0.5";

    }

    cancelButton.addEventListener("click", function () {

        homeVisitingButtonsDiv.style.visibility = "hidden";

        homeButton.style.opacity = "1";

        visitingButton.style.opacity = "1";

        clearEventListeners();

    })

}

function addNumberButtonFunctionality(currencies, chosenCurrencies, bankFee){

    let calculatorButtons = document.getElementsByClassName("numberButton");

    let displayText = O("text");

    for( let button of Object.values(calculatorButtons)){ // Attach Listeners to all calculator buttons

        if(!isNaN(button.value)){ // Number Button

            button.addEventListener("click", function(){

                if(displayText.innerText === "0"){
                    displayText.innerText = "";
                }

                displayText.innerText += button.value;
            })

        } else if(button.value === "c"){ // Clear display

            button.addEventListener("click", function () {
                displayText.innerText = "0";
            })

        } else if (button.value === "="){ // Calculate Conversion

            button.addEventListener("click", function () {

                let userValue = displayText.innerText;

                displayText.innerText = calculateConversion(userValue, currencies, chosenCurrencies, bankFee);
            })

        }

    }

}

function calculateConversion(userValue, currencies, chosenCurrencies, bankFee){

    let result = (userValue / currencies[chosenCurrencies["visiting"]]) * currencies[chosenCurrencies["home"]];

    let fee = result * (bankFee["fee"]/100);
    result += fee;
    return Math.trunc(result);
}

function getBankFeeFromLocalStorage(bankFee){

    let bankFeeLocalStorage = localStorage.getItem("bankFee201748244");

    if(bankFeeLocalStorage){
        bankFee["fee"] = bankFeeLocalStorage;
    }

}

function setPreferredCurrenciesFromLocalStorage(chosenCurrencies) {
    if(typeof localStorage == "undefined"){
        window.alert("Saving user preferences for Home and Visiting currencies is not possible on this browser/device.");
    }else{

        let localStorageHome = localStorage.getItem("home201748244");

        if(localStorageHome){
            chosenCurrencies["home"] = localStorageHome;
        }

        let localStorageVisiting = localStorage.getItem("visiting201748244");

        if(localStorageVisiting){
            chosenCurrencies["visiting"] = localStorageVisiting;
        }

    }
}

// Display the chosen conversion as text
function setChosenConversionText(chosenCurrencies){

    let chosenConversionText = O("chosenConversion");
    chosenConversionText.innerText = chosenCurrencies["visiting"] + "→" + chosenCurrencies["home"];

}

function setBankFeeDisplayText(bankFee) {

    let bankFeeText = O("bankFeeDisplay");
    bankFeeText.innerText = bankFee["fee"] + "% Fee";

}

function addBankFeeDivListeners(bankFee){

    // Showing and hiding menu functionality

    let bankFeeButton = O("bankFeeSpan");

    bankFeeButton.addEventListener("click", function () {
        S("setBankFeeDiv").visibility = "visible";
    })

    let cancelBankFeeButton = O("cancelBankFeeButton");

    function hideBankFeeMenu(){
        S("setBankFeeDiv").visibility = "hidden";
        S("errorMessageBankFee").visibility = "hidden";
        bankFeeInput.value = null;
    }

    cancelBankFeeButton.addEventListener("click", function () {
        hideBankFeeMenu();
    })

    // Entering bank fee percentage functionality

    let bankFeeInput = O("bankFeeInput");

    bankFeeInput.addEventListener("keypress", function (event) {
        let key = event.key;
        if(key === "Enter"){
            bankFee["fee"] = Math.trunc(bankFeeInput.value);

            if(bankFee["fee"] < 0 || bankFee["fee"] > 100){
                S("errorMessageBankFee").visibility = "visible";
            }else{
                setLocalStorageItem("bankFee201748244", bankFee["fee"]);
                setBankFeeDisplayText(bankFee);
                hideBankFeeMenu();
            }
        }
    })

}

function addAboutPageDivListeners(){

    // Showing and Hiding menu functionality

    let aboutMenuButton = O("aboutMenuSpan");

    aboutMenuButton.addEventListener("click", function () {
        S("aboutPageDiv").visibility = "visible";
    })

    let cancelAboutButton = O("cancelAboutButton");
    cancelAboutButton.addEventListener("click", function () {
        S("aboutPageDiv").visibility = "hidden";
    })
}

function buildMenu(currencies){

    let currencyMenuDiv = O("currencyMenu");

    let html = "";

    html += getBankFeeMenuOptionHTML();

    html += getCurrencyMenuOptionsHTML(currencies);

    html += getAboutMenuOptionHTML();

    currencyMenuDiv.innerHTML = html;

    addMenuFunction();

}

function getBankFeeMenuOptionHTML(){

    let html = "<span id='bankFeeSpan' class='menuSpan bigFont whiteText'>";
    html += "<img class='currencyIcon flexSizeFix' src='resources/bankIcon.svg'>";
    html += "<p class='flexSizeFix'>Fee</p>";
    html += "</span>";

    return html;

}

function getAboutMenuOptionHTML(){

    let html = "<span id='aboutMenuSpan' class='menuSpan bigFont whiteText'>";
    html += "<img class='currencyIcon flexSizeFix' src='resources/aboutIcon.svg'>";
    html += "<p class='flexSizeFix'>About</p>";
    html += "</span>";

    return html;
}

function getCurrencyMenuOptionsHTML(currencies){

    let html = "";

    let currencyNames = Object.keys(currencies);

    for(let currencyName of currencyNames){

        html += "<span class='currency menuSpan bigFont whiteText'>";

        html += "<img class='currencyIcon flexSizeFix' src='resources/countryFlags/" + currencyName + ".svg'>";

        html += "<p class='flexSizeFix'>" + currencyName + "</p>";

        html += "</span>";
    }

    return html;

}

function addMenuFunction(){

    let menuImage = O("menuIcon");

    menuImage.addEventListener("click", function () {

        let currencyMenu = O("currencyMenu");

        if (currencyMenu.style.visibility === "visible"){
            currencyMenu.style.animation = "hideMenu 1s 1";

            setTimeout(function () {
                currencyMenu.style.visibility = "hidden";
            }, 1000);

        } else {
            currencyMenu.style.visibility = "visible";
            currencyMenu.style.animation = "displayMenu 1s 1";
        }
    });
}
