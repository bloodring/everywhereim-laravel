"use strict";
let idPlaceholder = document.getElementById("idPlaceholder")
let colorPlaceholder = document.getElementById("colorPlaceholder")
const homePagina = document.getElementById("gebruikersDiv");
const kleurenPagina = document.getElementById("kleurenDiv");
const kleurenToevoegPagina = document.getElementById("kleurenAddDiv");

let pressedColorId;
let chosenColor = "";
let fetchClickedColor = "";

kleurenPagina.style.display = "none";
kleurenToevoegPagina.style.display = "none";

const color01 = document.getElementById("color01").addEventListener("click", function () {
    chosenColor = "#008000"
    console.log(chosenColor)
    changeToSelectedColor(pressedColorId);
    showHomePage()
})
const color02 = document.getElementById("color02").addEventListener("click", function () {
    chosenColor = "#FF0000"
    console.log(chosenColor)
    changeToSelectedColor(pressedColorId);
    showHomePage()
})
const color03 = document.getElementById("color03").addEventListener("click", function () {
    chosenColor = "#0000FF"
    console.log(chosenColor)
    changeToSelectedColor(pressedColorId);
    showHomePage()
})
const color04 = document.getElementById("color04").addEventListener("click", function () {
    chosenColor = "#FFFF00"
    console.log(chosenColor)
    changeToSelectedColor(pressedColorId);
    showHomePage()
})

const removeButton = document.getElementById("removeColor").addEventListener("click", function () {
    removeColor(pressedColorId);
});

const goBackButton = document.getElementById("goBack").addEventListener("click", function(){
    goBack();
})

const goBack = () => {
    alert("Kleur toevoegen als DB goed is")
    showHomePage();
}

//Functie om de homepagina weer te geven
const showHomePage = () => {
    homePagina.style.display = "block";
    kleurenPagina.style.display = "none";
    kleurenToevoegPagina.style.display = "none";
    fetchColors();
};

//Functie om de kleur te verwijderen en checken of er een kleur aanwezig is.
const removeColor = (colorIdToRemove) => {
    if (fetchClickedColor == "") {
        alert("Er is geen kleur om te verwijderen, kies eerst een kleur!")
    } else {
        chosenColor = "";
        changeToSelectedColor(colorIdToRemove)
        showHomePage();
    }
    
};

//Functie om de kleuren uit DB te halen
const fetchColors = () => {
    let request = new XMLHttpRequest()

    request.open("GET", "/api/users", true)

    request.onload = function () {
        let data = JSON.parse(this.response);
        //console.log(data);
        showResults(data);
    }

    request.send()

}

//Functie om de kleuren etc weer te geven
const showResults = function (data) {
    console.log(data);
  
    var mainContainer = document.getElementById("colorPlaceholder");
    
    //Zorg ervoor dat zodra hij opnieuw aangeroepen wordt hij eerst leeggemaakt wordt 
    mainContainer.innerHTML = ""

    for (let i = 0; i < data.length; i++) {

        //Een container maken voor betere styling
        var wholeContainer = document.createElement("div");
        wholeContainer.id = "wholeWrapper";

        //Div aanmaken voor de kleur
        var kleur = document.createElement("div");
        kleur.className = "divClass";
        kleur.style.background = data[i].color;
        kleur.id = "Kleuren" + data[i].id;

        //Paragraph aanmaken voor het ID
        var paragraph = document.createElement("p");
        paragraph.innerHTML = data[i].id + ".";

        //Een container aanmaken voor de buttons, voor de styling
        var buttonContainer = document.createElement("div");
        buttonContainer.id = "right";

        //Button aanmaken voor Toevoegen (+)
        var button = document.createElement("button");
        button.innerHTML = "+"
        button.id = "button" + data[i].id;
        button.className = "buttonAdd";
        
       

        /**
         * Functie voor buttons:
         */
        //Zorgt ervoor dat er een nieuwe kleur toegevoegd kan worden
        setTimeout(function () {
            var buttonClick = document.getElementById("button" + data[i].id);

            buttonClick.addEventListener("click", function () {
                console.log("Button Geklikt met id:" + data[i].id)
                homePagina.style.display = "none";
                kleurenToevoegPagina.style.display = "block";
            });
        }, 0.1000);

        /**
         * Functie voor Kleuren:
         */
        //Zorgt ervoor dat je op een kleur kan klikken en de nieuwe kleur kan selecteren
        setTimeout(function () {
            var kleurenClick = document.getElementById("Kleuren" + data[i].id);

            kleurenClick.addEventListener("click", function () {
                console.log("Kleur Geklikt met id:" + data[i].id)
                pressedColorId = data[i].id
                fetchClickedColor = data[i].color;
                //console.log(pressedColor)
                homePagina.style.display = "none";
                kleurenPagina.style.display = "block";

            });
        }, 0.1000);


        //Logica om de kleuren met knoppen goed weer te geven
        kleur.appendChild(paragraph);
        mainContainer.appendChild(kleur);
        buttonContainer.appendChild(button);
        wholeContainer.appendChild(kleur);
        wholeContainer.appendChild(buttonContainer);
        mainContainer.appendChild(wholeContainer);


    }
}

//Functie om de kleur naar de gekozen kleur te veranderen
const changeToSelectedColor = function (id) {
    console.log(id)
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                console.log("Kleur veranderd");
            } else {
                console.error('kleur is niet goed verstuurd!');
            }
        }
    };
    xHttp.onerror = function () {
        console.log("erooorrr");
    };
    xHttp.open('PUT', 'api/users/' + id, true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    xHttp.send(JSON.stringify({
        id: id,
        color: chosenColor
    }));

}

//Functie om een kleur toe te voegen (Niet werkend in DB gekegen, post request werkt wel)
const postColor = () => {
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                console.log("Kleur gepost");
            } else {
                console.error('Er is iets niet goed gegaan!');
            }
        }
    };
    xHttp.onerror = function () {
        console.log("erooorrr");
    };
    xHttp.open('POST', 'api/users', true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    xHttp.send(JSON.stringify({
        color: "#0000A0"
    }));

}

//Functie om de kleur te verwijderen in de database
const deleteColor = () => {
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200 || xHttp.status == 201) {
                console.log("Verwijderd!");
            } else {
                console.error('Er is iets niet goed gegaan');
            }
        }
    };
    xHttp.onerror = function () {
        console.log("erooorrr");
    };
    xHttp.open('DELETE', 'api/users/delete', true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    xHttp.send(JSON.stringify({
    }));

}

//Test functie om te checken of er gepost kon worden
const sendData = () => {
    postColor();
}


//Initialize
fetchColors();