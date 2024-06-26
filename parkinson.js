const buttonSend = document.getElementById("button_send");
buttonSend.addEventListener("click", checkInput);
const buttonStatusLabel = document.getElementById("button_status_text")
var questionnaire = {}



function checkInput(){
    var allInputsGiven = true;
    
    questionnaire = {}
    
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
        calculateRecommendation();
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

async function checkRules(patient) {
    console.log(`Prüfe Regeln für Patient: ${JSON.stringify(patient)}`);
    for (const rule of rules) {
        const condition = new Function('Patient', `return ${rule.condition};`);
        if (condition(patient) && !patient.lastRule || patient.lastRule !== rule.name) {
            patient.lastRule = rule.name; 
            const action = rule.action.split(' ');
            console.log(`Regel erfüllt: ${rule.name}, Aktion: ${rule.action}`);
            if (action[0] === 'goto') {
                const nextRuleName = rule.action.substring(5).trim().replace(/'/g, '');
                console.log(`Goto: ${nextRuleName}`);
                await executeRule(nextRuleName, patient);
                break;
            } else if (action[0] === 'Prozess.ende()') {
                console.log('ENDE des Prozesses.');
                return;
            } else if (action[0] === 'Batterie.wechseln()') {
                console.log('Wechsel der Batterie wird ausgeführt.');
                return;
            }
        }
    }
}

async function executeRule(ruleName, questionnaire) {
    const rule = rules.find(r => r.name === ruleName);
    if (!rule) {
        console.log(`Keine Regel gefunden mit dem Namen: ${ruleName}`);
        return;
    }
    console.log(`Ausführung der Regel: ${ruleName}`); 
    switch (ruleName) {
        case "Therapieart Überprüfen":
            if (!questionnaire.therapieArt) { 
                const therapyType = await askQuestion('Welche Therapie? (THS/Andere) ');
                questionnaire.therapieArt = therapyType.toUpperCase();
                console.log(`Therapieart: ${questionnaire.therapieArt}`);
            }
            await checkRules(questionnaire);
            break;
        case "Letzte Kontrolle Überprüfen":
            const lastControl = await askQuestion('Letzte Kontrolle vor mehr als 3 Monaten? (ja/nein) ');
            questionnaire.letzteKontrolle = lastControl.toLowerCase() === 'ja';
            console.log(`Letzte Kontrolle: ${questionnaire.letzteKontrolle}`);
            await checkRules(questionnaire);
            break;
        case "Schrittmacher Überprüfen":
            const schrittmacher = await askQuestion('Ist der Schrittmacher erschöpft? (ja/nein) ');
            questionnaire.schrittmacherErschöpft = schrittmacher.toLowerCase() === 'ja';
            console.log(`Schrittmacher erschöpft: ${questionnaire.schrittmacherErschöpft}`);
            await checkRules(questionnaire);
            break;
        case "Batteriewechsel Überprüfen":
            console.log('Wechsel der Batterie');
            break;
        default:
            break;
    }
}
