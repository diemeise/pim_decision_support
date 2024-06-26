const buttonSend = document.getElementById("button_send");
buttonSend.addEventListener("click", onEvaluate);//checkInput);
const buttonStatusLabel = document.getElementById("button_status_text")
let questionnaire = {}
let traversedRules = []

function onEvaluate(){
    if(!checkInput()){
        buttonStatusLabel.innerHTML = "Der Algorithmus funktioniert nicht immer korrekt, wenn nicht alle Fragen beantwortet wurden.<br> Bitte überprüfen Sie ihre Eingaben.";
    }else{
        buttonStatusLabel.innerHTML = "";
    }
    //Algorithmus wird trotzdem ausgeführt, Warnung muss reichen
    calculateRecommendation();
}

function checkInput(){
    let allInputsGiven = true;
    
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
    
    //checkboxen für Symptome 
    let symptomeAktuell = [];
    if(("parkinson_symptome_aktuell" in questionnaire && questionnaire["parkinson_symptome_aktuell"] )|| ("symptome_nach_medikamente_vorhanden" in questionnaire && questionnaire["symptome_nach_medikamente_vorhanden"])){
            symptomeAktuell = [...document.querySelectorAll('input[name=symptome]:checked')].map(e => e.value);
            if(!symptomeAktuell){
                console.log("Keine Symptome angegeben obwohl 'Ja' angekreuzt wurde.");
                allInputsGiven = false;                
            }            
    }    
    saveAnswer("parkinson_symptome_aktuell_symptome", symptomeAktuell)

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
        return false;
    }
}    

function saveAnswer(key,value){    
    if(key in questionnaire){
        console.log("Wert " + key + "existiert bereits");
    }else{
        switch(value){
            case 'yes':
                valueToSave = true;
                break;
            case 'no':                
                valueToSave = false;
                break;
            default:
                valueToSave = value;
                break;
        }
        console.log("speichere Wert " + key + ", " + valueToSave + " in questionnaire");
        questionnaire[key] = valueToSave;
    }
}

//Regeln verarbeiten
async function executeRule(rule) {
    if(!rule){
        return;
    }
    console.log(`Ausführung der Regel: ${rule.name}`);
    console.log(`Überprüfe Condition ${rule.condition}`);
    

    if(eval(rule.condition)){
        //checkIfFinished()
        console.log(`Regel "${rule.name}" erfüllt.`);
        console.log(`Führe nächste Regel "${rule.action}" aus.`);
        
        traversedRules.push({rule: rule, conditionFullfilled: true});
        executeRule(findNextRule(rule.action));
    }else{
        console.log(`Regel "${rule.name}" nicht erfüllt.`);
        console.log(`Führe nächste Regel "${rule.else}" aus.`);

        traversedRules.push({rule: rule, conditionFullfilled: false});
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
    const firstRuleName = "ueberpruefung auf aktuelle PK-Therapie";
    const rule = rules.find(r => r.name === firstRuleName);
    if(!rule){
        const errorText = `Fehler: Startregel "${firstRuleName}" konnte nicht gefunden werden.`;
        setResponseText(errorText);
        return;
    }else {        
        console.log(`Starte Berechnung`);
        executeRule(rule);
    }
    if(document.getElementById("button_show_tree")){
        document.getElementById("button_show_tree").style.visibility = 'visible';
    }
    }




function setResponseText(text){
    const label = document.getElementById("return_text")
    label.innerHTML = text;
    console.log(`setResponseText: ${text}`)
}

function setDebugButtons(){
    //überprüfe ob testcases geladen sind
    const debugDiv = document.getElementById("debug_div");
    if (typeof loadTestCases === "function"){
        
        const testCases = loadTestCases()
        for (const testCase of testCases){
            let button = document.createElement("input");
            button.type = "button";
            button.id = `button_test_${testCases.indexOf(testCase)}`
            button.value= `Test ${testCases.indexOf(testCase)}`
            button.onclick = function(){runTestCase(testCase.questionnaire, testCase.expected);};
            debugDiv.appendChild(button);
        }
    }
    const buttonSend = document.getElementById("button_send");
    let button = document.createElement("input");
    button.type = "button";
    button.id= `button_show_tree`
    button.value= `Zeige Regelbaum`
    button.style.visibility = 'hidden'
    button.onclick = function(){showDebugTree();};
    buttonSend.parentNode.insertBefore(button, buttonSend.nextSibling);
}

function runTestCase(testQuestionnaire, expected){
    const debugLabel = document.getElementById("debug_label");
    debugLabel.innerHTML = `Erwarte als Ergebnis: ${expected}`;
    questionnaire = testQuestionnaire;
    calculateRecommendation();
    const result = document.getElementById("return_text").innerHTML;
    
    if (result === expected){
        debugLabel.style ="background-color: green;"
    }else{
        debugLabel.style ="background-color: red;"
    }    
}

function showDebugTree(){
    console.log(traversedRules);
    //html-Text-erzeugen
    const parentDiv = document.createElement("div");
    let index = 0;
    for (rule of traversedRules){
        index = traversedRules.indexOf(rule)+1;
        let div = document.createElement("div");
        div.innerHTML = `
            <b>Regel ${index}: ${rule.rule.name}</b></br>
            Bedingung: ${rule.rule.condition}</br>
            Erfüllt?: ${rule.conditionFullfilled}</br>`;
        if(rule.conditionFullfilled){
            div.innerHTML +=`
            <i>Wenn: ${rule.rule.action}</i></br>
            Sonst: ${rule.rule.else}</br>
            </br>
            `
        }else{
            div.innerHTML +=`
            Wenn: ${rule.rule.action}</br>
            <i>Sonst: ${rule.rule.else}</i></br>
            </br>
            `
        }
        parentDiv.appendChild(div);
    }
    const treeDiv = document.getElementById("tree_div");
    treeDiv.appendChild(parentDiv);
}