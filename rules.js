
function getRules() {
  return rules();
}

const rules = [
  {
    "name": "Überprüfung auf aktuelle PK-Therapie",
    "condition": "questionnaire.pk_therapie_aktuell === true",
    "action": "goto=Therapieart Überprüfen THS",
    "else": "goto=Überprüfung auf frühere PK-Therapie"
  },
  {
    "name": "Therapieart Überprüfen THS",
    "condition": "questionnaire.aktuelle_therapieform === THS",
    "action": "goto=Letzte Kontrolle Überprüfen",
    "else": "goto=Therapieart Überprüfen Medikamentös"
  },
  {
    "name": "Therapieart Überprüfen Medikamentös",
    "condition": "questionnaire.aktuelle_therapieform === Medikamentös (Levodopa)",
    "action": "goto=Medikamentöse Therapie ausreichend"
  },
  {
    "name": "Medikamentöse Therapie ausreichend",
    "condition": "questionnaire.aktuelle_medikamente_sind_ausreichend === true",
    "action": "goto=Medikamentöse Therapie ausreichen",
    "else": "goto=Aktuelle Symptome überprüfen"
  },
  {
    "name": "Medikamentöse Therapie ausreichend",
    "condition": "true === true",
    "action": "finish=Die aktuelle Therapie ist ausreichend"
  },
  {
    "name": "Aktuelle Symptome überprüfen",
    "condition": "schwerer_tremor_vorhanden === true",
    "action": "goto=Kontraindikation STN vorhanden",
    "else": "goto=Aktuelle Symptome überprüfen 2"
  },
  {
    "name": "Aktuelle Symptome überprüfen 2",
    "condition": "wirkungsfluktationen_vorhanden === true",
    "action": "goto=Welche Therapie ist möglich"
  },
  {
    "name": "Kontraindikation STN vorhanden",
    "condition": "questionnaire.kontraindikation_STN === true && questionnaire.risiko_gegen_op === false",
    "action": "goto=Empfehlung VIM-THS GPI-THS",
    "else": "goto=Kontraindikation STN vorhanden 2"
  },
  {
    "name": "Kontraindikation STN vorhanden 2",
    "condition": "questionnaire.kontraindikation_STN === false && questionnaire.risiko_gegen_op === false",
    "action": "goto=Empfehlung STN-THS",
    "else": "goto=Risikobewertung gegen OP"
  },
  {
    "name": "Risikobewertung gegen OP",
    "condition": "questionnaire.risiko_gegen_op === true",
    "action": "goto=Keine OP möglich"
  },
  {
    "name": "Welche Therapie ist möglich",
    "condition": "questionnaire.THS_möglich === false && questionnaire.pumpentherapie_möglich === false",
    "action": "goto=Empfehlung Pallidotomie",
    "else": "goto=Welche Therapie ist möglich 3"
  },
  {
    "name": "Welche Therapie ist möglich2",
    "condition": "questionnaire.THS_möglich === true && questionnaire.pumpentherapie_möglich === false",
    "action": "goto=Verbesserung durch Optimierung oraler Therapie",
    "else": "goto=Welche Therapie ist möglich 3"
  },
  {
    "name": "Welche Therapie ist möglich3",
    "condition": "questionnaire.THS_möglich === false && questionnaire.pumpentherapie_möglich === true",
    "action": "goto=Empfehlung Pumpentherapie",
    "else": "goto=Welche Therapie ist möglich 4"
  },
  {
    "name": "Welche Therapie ist möglich4",
    "condition": "questionnaire.THS_möglich === true && questionnaire.pumpentherapie_möglich === true",
    "action": "goto=Empfehlung Pumpentherapie und THS"
  },
  {
    "name": "Verbesserung durch Optimierung oraler Therapie",
    "condition": "questionnaire.verbesserung_durch_optimierung_oraler_therapie === true",
    "action": "goto=Keine Empfehlung möglich",
    "else": "goto=Empfehlung THS"
  },


  {
    "name": "Letzte Kontrolle Überprüfen",
    "condition": "ths_batterie_3Monate === true || \"entzugssymptome\" in questionnaire.parkinson_smyptome_aktuell_text || schrittmacher_erschöpft === true",
    "action": "goto=Schrittmacher Überprüfen",
    "else": "goto=Keine Empfehlung möglich"
  },
  {
    "name": "Überprüfung auf frühere PK-Therapie",
    "condition": "questionnaire.pk_therapie_aktuell === false && questionnaire.pk_therapie_vergangenheit === false",
    "action": "finish=Therapiene werden überbewertet"
  },





  {
    "name": "Empfehlung THS",
    "condition": "true === true",
    "action": "finish=Empfehlung: THS"
  },
  {
    "name": "Empfehlung VIM-THS GPI-THS",
    "condition": "true === true",
    "action": "finish=Empfehlung: VIM-THS oder GPI-THS"
  },
  {
    "name": "Empfehlung STN-THS",
    "condition": "true === true",
    "action": "finish=Empfehlung: STN-THS"
  },
  {
    "name": "Empfehlung Pallidotomie",
    "condition": "true === true",
    "action": "finish=Empfehlung: Pallidotomie"
  },
  {
    "name": "Empfehlung Pumpentherapie",
    "condition": "true === true",
    "action": "finish=Empfehlung: Pumpentherapie"
  },
  {
    "name": "Empfehlung Pumpentherapie und THS",
    "condition": "true === true",
    "action": "finish=Empfehlung: Pumpentherapie oder THS"
  },
  {
    "name": "Keine OP möglich",
    "condition": "true === true",
    "action": "finish=Empfehlung: Es ist unter den aktuellen Bedingungen keine Operation möglich"
  },
  {
    "name": "Keine Empfehlung möglich",
    "condition": "true === true",
    "action": "finish=Empfehlung: Es ist unter den aktuellen Bedingungen keine Empfehlungsgabe möglich"
  },
  
  {
    "name": "Schrittmacher Überprüfen",
    "condition": "true === true",
    "action": "finish=Batterie des Schrittmachers überprüfen"
  }
]
