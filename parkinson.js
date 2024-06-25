const buttonSend = document.getElementById("button_send");
buttonSend.addEventListener("click", checkInput);
const buttonStatusLabel = document.getElementById("button_status_text")
var questionnaire = {}



function checkInput(){
    var allInputsGiven = true;

    //radiobuttons
    const radioButtonAnswers = document.querySelectorAll("form");
    radioButtonAnswers.forEach(rba => {

        if(!rba.elements[rba.id].value){
            console.log(rba.id + "  is empty");
            allInputsGiven = false;
        }else{
            saveAnswer(rba.id,rba.elements[rba.id].value);
        }
    });    
    
    //textfelder für Symptome wenn notwendig
    if("parkinson_symptome_aktuell" in questionnaire & questionnaire["parkinson_symptome_aktuell"]){
            const symptomeAktuell = document.getElementById("parkinson_smyptome_aktuell_text")
            if(!symptomeAktuell.value){

                console.log("Keine Symptome angegeben obwohl 'Ja' angekreuzt wurde.");
                allInputsGiven = false;
            }else{
                symptome = symptomeAktuell.value.split(',');
                saveAnswer("parkinson_symptome_aktuell_text", symptome)
            }
    }

    if("symptome_nach_medikamente_vorhanden" in questionnaire & questionnaire["symptome_nach_medikamente_vorhanden"]){
        const symptomeAktuell = document.getElementById("symptome_nach_medikamente_vorhanden_text")
        if(!symptomeAktuell.value){
            console.log("Keine Symptome angegeben obwohl 'Ja' angekreuzt wurde.");
            allInputsGiven = false;
        }else{
            symptome = symptomeAktuell.value.split(',');
            saveAnswer("symptome_nach_medikamente_vorhanden_text", symptome)

        }
    }

    //Zahleninputs
    const numericAnswers = document.querySelectorAll('input[type="number"]')
    numericAnswers.forEach( numa =>{
        //ich hasse javascript
        if(isNaN(numa.value) || !(numa.value)){
            console.log(numa.id + " ist keine Nummer (" + numa.value + ")")
            allInputsGiven = false;
        }else{
            saveAnswer(numa.id, numa.value);
        }

    })
    

        
    if(allInputsGiven){

    }else{
        buttonStatusLabel.innerHTML = "Bitte alle Felder ausfüllen";
    }
}    





function saveAnswer(key,value){    
    if(key in questionnaire){
        console.log("Wert " + key + "existiert bereits");
    }else{
        valueToSave = true;
        if (value == "no"){
            valueToSave = false;
        }
        console.log("speichere Wert " + key + ", " + valueToSave + " in questionnaire");
        questionnaire[key] = valueToSave;
    }
}

    
