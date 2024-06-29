
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
    "action": "goto=Medikamentoese Therapie effectiv",
    "else": "goto=Ende Fehler"
  },
  {
    "name": "Medikamentoese Therapie effectiv",
    "condition": "questionnaire.aktuelle_medikamente_sind_effektiv === true",
    "action": "goto=Aktuelle Symptome ueberpruefen 3",
    "else": "goto=Aktuelle Therapie ausreichend"
  },
  {
    "name": "Aktuelle Therapie ausreichend",
    "condition": "questionnaire.aktuelle_medikamente_sind_ausreichend === true",
    "action": "goto=Aktuelle Therapie ausreichend",
    "else": "goto=Aktuelle Symptome ueberpruefen"
  },
  {
    "name": "Aktuelle Therapie ausreichend",
    "condition": "true === true",
    "action": "finish=Die aktuelle Therapie ist ausreichend"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen",
    "condition": "questionnaire.schwerer_tremor_vorhanden === true",
    "action": "goto=Kontraindikation STN vorhanden",
    "else": "goto=Aktuelle Symptome ueberpruefen 2"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen 2",
    "condition": "questionnaire.wirkungsfluktationen_vorhanden === true",
    "action": "goto=Welche Therapie ist moeglich"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen 3",
    "condition": "questionnaire.off_symptome_2h === true || questionnaire.1stunde_ueberbeweglichkeit === true",
    "action": "goto=Empfehlung invasives Verfahren",
    "else": "goto=Aktuelle Symptome ueberpruefen 4"
  },
  {
    "name": "Aktuelle Symptome ueberpruefen 4",
    "condition": "questionnaire.5_medikamente_tag === true",
    "action": "goto=Levodopa Kombination Dopaminagonisten",
    "else": "goto=Ende Fehler"
  },
  {
    "name": "Levodopa Kombination Dopaminagonisten",
    "condition": "questionnaire.levodopa_therapie_mit_dopaminagonisten === true",
    "action": "goto=Levodopa Kombination Dopaminagonisten effektiv",
    "else": "goto=Keine Empfehlung moeglich"
  },
  {
    "name": "Levodopa Kombination Dopaminagonisten effektiv",
    "condition": "questionnaire.levodopa_therapie_mit_dopaminagonisten_effektiv === true",
    "action": "goto=Empfehlung invasives Verfahren",
    "else": "goto=Keine Empfehlung moeglich"
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
    "else": "goto=Welche Therapie ist moeglich 2"
  },
  {
    "name": "Welche Therapie ist moeglich 2",
    "condition": "questionnaire.THS_moeglich === true && questionnaire.pumpentherapie_moeglich === false",
    "action": "goto=Verbesserung durch Optimierung oraler Therapie",
    "else": "goto=Welche Therapie ist moeglich 3"
  },
  {
    "name": "Welche Therapie ist moeglich 3",
    "condition": "questionnaire.THS_moeglich === false && questionnaire.pumpentherapie_moeglich === true",
    "action": "goto=Empfehlung Pumpentherapie",
    "else": "goto=Welche Therapie ist moeglich 4"
  },
  {
    "name": "Welche Therapie ist moeglich 4",
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
    "condition": "questionnaire.pk_therapie_vergangenheit === true",
    "action": "goto=Welche Therapie wurde durchgefuehrt 1",
    "else": "goto=Welche Symptome haben Sie"
  },
  //tajs Regeln
  {
    "name": "Welche Symptome haben Sie?",
    "condition": "questionnaire.impulskontrollstoerung_vorhanden === true",
    "action": "goto=Ist eine orale Gabe von Medikamenten moeglich?",
    "else": "goto=Welche Symptome haben Sie? 2"
  },
  {
    "name": "Ist eine orale Gabe von Medikamenten moeglich?",
    "condition": "questionnaire.orale_medikamente_moeglich === true",
    "action": "goto=Sind die Impulskontrollstoerungen auf die Medikamentengabe zurueckzufuehren?",
    "else": "goto=Empfehlung STN-THS"
  },
  {
    "name": "Sind die Impulskontrollstoerungen auf die Medikamentengabe zurueckzufuehren?",
    "condition": "questionnaire.impulskontrollstoerung_durch_medikamente === true",
    "action": "goto=Empfehlung STN-THS",
    "else": "goto=Keine Empfehlung moeglich"
  },
  {
    "name": "Welche Symptome haben Sie? 2",
    "condition": "questionnaire.parkinson_symptome_aktuell_symptome.includes(\"motorische_fluktuationen\")",
    "action": "goto=motorische Fluktuationen",
    "else": "goto=Ende Fehler"
  },
  {
    "name": "motorische Fluktuationen",
    "condition": "questionnaire.patient_alter > 60",
    "action": "goto=Verbesserungen mehr 33 prozent",
    "else": "goto=PK Diagnose aelter 4 Jahre"
  },
  {
    "name": "Verbesserungen mehr 33 prozent",
    "condition": "questionnaire.verbesserung_durch_optimierung_oraler_therapie === true",
    "action": "goto=Spricht Risikobewertung gegen OP?",
    "else": "goto=Keine Empfehlung moeglich"
  },
  {
    "name": "Spricht Risikobewertung gegen OP?",
    "condition": "questionnaire.risiko_gegen_op === true",
    "action": "goto=Keine Empfehlung moeglich",
    "else": "goto=Empfehlung STN-THS"
  },
  {
    "name": "PK Diagnose aelter 4 Jahre",
    "condition": "(questionnaire.patient_alter - questionnaire.alter_bei_PK_diagnose) > 4",
    "action": "goto=Fluktuationen seit weniger als 3 Jahren vorhanden?",
    "else": "finish=Keine Empfehlung moeglich"
  },
  {
    "name": "Fluktuationen seit weniger als 3 Jahren vorhanden?",
    "condition": "questionnaire.motorische_fluktuationen_weniger_3_jahre === true",
    "action": "goto=Verbesserungen 50% durch stand. Levedopa-Test?",
    "else": "finish=Keine Empfehlung moeglich"
  },
  {
    "name": "Verbesserungen 50% durch stand. Levedopa-Test?",
    "condition": "questionnaire.motorische_fluktuationen_durch_levodopa_kontrolliert === true",
    "action": "goto=Spricht Risikobewertung gegen OP?",
    "else": "finish=Keine Empfehlung moeglich"
  },



//nicht mehr taj
  {
    "name": "Welche Therapie wurde durchgefuehrt 1",
    "condition": "questionnaire.alte_therapieform === \"THS\"",
    "action": "goto=Bestehen Entzugssymptome",
    "else": "goto=Welche Therapie wurde durchgefuehrt 2"
  },
  {
    "name": "Welche Therapie wurde durchgefuehrt 2",
    "condition": "questionnaire.alte_therapieform === \"Medikamentoes (Levodopa)\"",
    "action": "goto=Medikamentoese Therapie effectiv",
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
    "condition": "questionnaire.ths_erfolgreich === true",
    "action": "goto=Empfehlung THS",
    "else": "goto=Keine Empfehlung moeglich"
  },





  //Mögliche Empfehlungen
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
    "action": "finish=Empfehlung: Es ist unter den aktuellen Bedingungen keine Empfehlungsgabe möglich"
  },  
  {
    "name": "Schrittmacher ueberpruefen",
    "condition": "true === true",
    "action": "finish=Empfehlung: Batterie des Schrittmachers überprüfen"
  },
  {
    "name": "Ende Fehler",
    "condition": "true === true",
    "action": "finish=Bei der Evaluation ist ein Fehler aufgetreten. Bitte überprüfen Sie ihre Eingaben",
  }
]
