
function getRules() {
  return rules();
}

const rules = [
  {
    "name": "ueberpruefung auf aktuelle PK-Therapie",
    "condition": "questionnaire.pk_therapie_aktuell === true",
    "action": "goto=Therapieart ueberpruefen THS",
    "else": "goto=ueberpruefung auf fruehere PK-Therapie"
  },
  {
    "name": "Therapieart ueberpruefen THS",
    "condition": "questionnaire.aktuelle_therapieform === \"THS\"",
    "action": "goto=Letzte Kontrolle ueberpruefen",
    "else": "goto=Therapieart ueberpruefen Medikamentoes"
  },
  {
    "name": "Therapieart ueberpruefen Medikamentoes",
    "condition": "questionnaire.aktuelle_therapieform === \"Medikamentoes (Levodopa)\"",
    "action": "goto=Medikamentoese Therapie ausreichend"
  },
  {
    "name": "Medikamentoese Therapie ausreichend",
    "condition": "questionnaire.aktuelle_medikamente_sind_ausreichend === true",
    "action": "goto=Medikamentoese Therapie ausreichen",
    "else": "goto=Aktuelle Symptome ueberpruefen"
  },
  {
    "name": "Medikamentoese Therapie ausreichend",
    "condition": "true === true",
    "action": "finish=Die aktuelle Therapie ist ausreichend"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen",
    "condition": "schwerer_tremor_vorhanden === true",
    "action": "goto=Kontraindikation STN vorhanden",
    "else": "goto=Aktuelle Symptome ueberpruefen 2"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen 2",
    "condition": "wirkungsfluktationen_vorhanden === true",
    "action": "goto=Welche Therapie ist moeglich"
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
    "action": "goto=Keine OP moeglich"
  },
  {
    "name": "Welche Therapie ist moeglich",
    "condition": "questionnaire.THS_moeglich === false && questionnaire.pumpentherapie_moeglich === false",
    "action": "goto=Empfehlung Pallidotomie",
    "else": "goto=Welche Therapie ist moeglich 3"
  },
  {
    "name": "Welche Therapie ist moeglich2",
    "condition": "questionnaire.THS_moeglich === true && questionnaire.pumpentherapie_moeglich === false",
    "action": "goto=Verbesserung durch Optimierung oraler Therapie",
    "else": "goto=Welche Therapie ist moeglich 3"
  },
  {
    "name": "Welche Therapie ist moeglich3",
    "condition": "questionnaire.THS_moeglich === false && questionnaire.pumpentherapie_moeglich === true",
    "action": "goto=Empfehlung Pumpentherapie",
    "else": "goto=Welche Therapie ist moeglich 4"
  },
  {
    "name": "Welche Therapie ist moeglich4",
    "condition": "questionnaire.THS_moeglich === true && questionnaire.pumpentherapie_moeglich === true",
    "action": "goto=Empfehlung Pumpentherapie und THS"
  },
  {
    "name": "Verbesserung durch Optimierung oraler Therapie",
    "condition": "questionnaire.verbesserung_durch_optimierung_oraler_therapie === true",
    "action": "goto=Keine Empfehlung moeglich",
    "else": "goto=Empfehlung THS"
  },
  {
    "name": "Letzte Kontrolle ueberpruefen",
    "condition": "questionnaire.ths_batterie_aelter_drei_Monate === true || questionnaire.parkinson_symptome_aktuell_symptome.includes(\"entzugssymptome\") || questionnaire.schrittmacher_hat_Ladung === false",
    "action": "goto=Schrittmacher ueberpruefen",
    "else": "goto=Keine Empfehlung moeglich"
  },
  {
    "name": "ueberpruefung auf fruehere PK-Therapie",
    "condition": "questionnaire.pk_therapie_aktuell === false && questionnaire.pk_therapie_vergangenheit === false",
    "action": "goto=Welche Therapie wurde durchgefuehrt 1",
    "else": "goto=Welche Symptome haben Sie"
  },
  {
    "name": "Welche Therapie wurde durchgefuehrt 1",
    "condition": "questionnaire.alte_therapieform === \"THS\"",
    "action": "goto=Bestehen Entzugssymptome",
    "else": "goto=Welche Therapie wurde durchgefuehrt 2"
  },
  {
    "name": "Welche Therapie wurde durchgefuehrt 2",
    "condition": "questionnaire.alte_therapieform === \"Medikamentoes (Levodopa)\"",
    "action": "goto=Medikamentoese Therapie ausreichend",
    "else": "goto=Ende Fehler"
  },
  {
    "name": "Bestehen Entzugssymptome",
    "condition": "questionnaire.parkinson_symptome_aktuell_symptome.includes(\"entzugssymptome\")",
    "action": "goto=War letzte THS erfolgreich",
    "else": "goto=Keine Empfehlung moeglich"
  },
  {
    "name": "War letzte THS erfolgreich",
    "condition": "ths_erfolgreich === true)",
    "action": "goto=Empfehlung THS",
    "else": "goto=Keine Empfehlung moeglich"
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
    "name": "Keine OP moeglich",
    "condition": "true === true",
    "action": "finish=Empfehlung: Es ist unter den aktuellen Bedingungen keine Operation moeglich"
  },
  {
    "name": "Keine Empfehlung moeglich",
    "condition": "true === true",
    "action": "finish=Empfehlung: Es ist unter den aktuellen Bedingungen keine Empfehlungsgabe moeglich"
  },  
  {
    "name": "Schrittmacher ueberpruefen",
    "condition": "true === true",
    "action": "finish=Empfehlung: Batterie des Schrittmachers ueberpruefen"
  },
  {
    "name": "Ende Fehler",
    "condition": "true === true",
    "action": "finish=Bei der Evaluation ist ein Fehler aufgetreten",
  }
]
