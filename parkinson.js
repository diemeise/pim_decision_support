
const buttonSend = document.getElementById("button_send");
buttonSend.addEventListener("click", onEvaluate);//checkInput);
const buttonStatusLabel = document.getElementById("button_status_text")
var questionnaire = {}
/* const rulesFile = fetch('rules.json')
    .then((res) => res.text())
    then((text) => {
        JSON.parse(text);
    })
    . catch(e => (console.error(e)));
    */
//const rules = JSON.parse(fs.readFileSync('rules.json', 'utf8'));


function onEvaluate(){
    if(checkInput()){
    }
    calculateRecommendation();
}

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
    
    //checkboxen für Symptome wenn notwendig
    if(("parkinson_symptome_aktuell" in questionnaire && questionnaire["parkinson_symptome_aktuell"] )|| ("symptome_nach_medikamente_vorhanden" in questionnaire && questionnaire["symptome_nach_medikamente_vorhanden"])){
            const symptomeAktuell = [...document.querySelectorAll('input[name=symptome]:checked')].map(e => e.value);
            if(!symptomeAktuell){
                console.log("Keine Symptome angegeben obwohl 'Ja' angekreuzt wurde.");
                allInputsGiven = false;
            }else{
                saveAnswer("parkinson_symptome_aktuell_symptome", symptomeAktuell.toString())
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
        return true;
    }else{
        buttonStatusLabel.innerHTML = "Bitte alle Felder ausfüllen";
        return false;
    }
}    

function saveAnswer(key,value){    
    if(key in questionnaire){
        console.log("Wert " + key + "existiert bereits");
    }else{
        switch(value){
            case "yes":
                valueToSave = true;
            case "no":                
            valueToSave = false;
            default:
                valueToSave = value;
        }
        console.log("speichere Wert " + key + ", " + valueToSave + " in questionnaire");
        questionnaire[key] = valueToSave;
    }
}

//Regeln verarbeiten
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

async function executeRule(rule) {
    if(!rule){
        return;
    }
    console.log(`Ausführung der Regel: ${rule.name}`);
    console.log(`Überprüfe Condition ${rule.condition}`);
    
    //chek if condition is true

    console.log(rule.condition);
    console.log(questionnaire)
    console.log(`${eval(rule.condition)}`)  
    if(eval(rule.condition)){
        //checkIfFinished()
        console.log(`Regel "${rule.name}" erfüllt.`);
        console.log(`Führe nächste Regel "${rule.action}" aus.`);
        findNextRule(rule.action);
    }else{
        console.log(`Regel "${rule.name}" nicht erfüllt.`);
        console.log(`Führe nächste Regel "${rule.else}" aus.`);
        executeRule(findNextRule(rule.else));
    }
}

//hier wird die nächste Regel gesucht oder das Programm beendet, wenn es soweit ist
function findNextRule(ruleName){
    
    const regexNextRule = new RegExp("goto");
    const regexFinished = new RegExp("finish");

    if(regexNextRule.test(ruleName)){
        ruleName = ruleName.split('=')[1];
        console.log(ruleName);
        const rule = rules.find(r => r.name === ruleName);
        if (!rule) {
            setResponseText(`Fehler: Keine Regel gefunden mit dem Namen: ${ruleName}`);
            return;
        }
    return rule;
    }
    //Prozess endet nach dieser Regel
    if(regexFinished.test(ruleName)){
        const endStatusText = ruleName.split('=')[1];
        setResponseText(`Beendet: ${endStatusText}`)
    }
    
}


function calculateRecommendation(){
    //Name der ersten Regel
    const firstRuleName = "Überprüfung auf aktuelle PK-Therapie";
    const rule = rules.find(r => r.name === firstRuleName);
    if(!rule){
        const errorText = `Fehler: Startregel "${firstRuleName}" konnte nicht gefunden werden.`;
        setResponseText(errorText);
        return;
    }else {        
        console.log(`Starte Berechnung`);
        executeRule(rule);
    }
    }
       



function setResponseText(text){
    const label = document.getElementById("return_text")
    label.innerHTML = text;
    console.log(`setResponseText: ${text}`)
}