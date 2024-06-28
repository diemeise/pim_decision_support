
function getRules() {
  return rules();
}

const rules = [
  {
    "name": "Überprüfung auf aktuelle PK-Therapie",
    "condition": "questionnaire.pk_therapie_aktuell === true",
    "action": "goto 'Therapieart Überprüfen'",
    "else": "goto 'Überprüfung auf frühere PK-Therapie'"
  },
  {
    "name": "Therapieart Überprüfen THS",
    "condition": "Patient.aktuelle_therapieform === THS",
    "action": "goto 'Letzte Kontrolle Überprüfen'",
    "else": "goto 'Therapieart Überprüfen Medikamentös'"
  },
  {
    "name": "Therapieart Überprüfen Medikamentös",
    "condition": "Patient.aktuelle_therapieform === Medikamentös (Levodopa)",
    "action": "goto 'Medikamentöse Therapie ausreichend'"
  },
  {
    "name": "Medikamentöse Therapie ausreichend",
    "condition": "Patient.aktuelle_medikamente_sind_ausreichend === true",
    "action": "goto 'Medikamentöse Therapie ausreichen'",
    "else": "goto 'Aktuelle Symptome überprüfen'"
  },
  {
    "name": "Medikamentöse Therapie ausreichend",
    "condition": "true === true",
    "action": "Prozess.ende('Die aktuelle Therapie ist ausreichend')"
  },
  {
    "name": "Aktuelle Symptome überprüfen",
    "condition": "'tremor' in Patient.parkinson_smyptome_aktuell_text",
    "action": "goto 'Kontraindikation STN vorhanden'",
    "else": "goto 'Aktuelle Symptome überprüfen 2'"
  },
  {
    "name": "Aktuelle Symptome überprüfen 2",
    "condition": "'wirkungsfluktuationen' in Patient.parkinson_smyptome_aktuell_text",
    "action": "goto 'Welche Therapie ist möglich'"
  },
  {
    "name": "Kontraindikation STN vorhanden",
    "condition": "Patient.kontraindikation_STN === true && Patient.risiko_gegen_op === false",
    "action": "goto 'Empfehlung VIM-THS GPI-THS'",
    "else": "goto 'Kontraindikation STN vorhanden 2'"
  },
  {
    "name": "Kontraindikation STN vorhanden 2",
    "condition": "Patient.kontraindikation_STN === false && Patient.risiko_gegen_op === false",
    "action": "goto 'Empfehlung STN-THS'",
    "else": "goto 'Risikobewertung gegen OP'"
  },
  {
    "name": "Risikobewertung gegen OP",
    "condition": "Patient.risiko_gegen_op === true",
    "action": "goto 'Keine OP möglich"
  },
  {
    "name": "Welche Therapie ist möglich",
    "condition": "Patient.THS_möglich === false && Patient.pumpentherapie_möglich === false",
    "action": "goto 'Verbesserung durch Optimierung Therapie'",
    "else": "goto 'Welche Therapie ist möglich 3'"
  },
  {
    "name": "Welche Therapie ist möglich",
    "condition": "Patient.THS_möglich === false && Patient.pumpentherapie_möglich === false",
    "action": "goto 'Empfehlung Pallidotomie'",
    "else": "goto 'Welche Therapie ist möglich 3'"
  },
  {
    "name": "Welche Therapie ist möglich2",
    "condition": "Patient.THS_möglich === true && Patient.pumpentherapie_möglich === false",
    "action": "goto 'Verbesserung durch Optimierung Therapie'",
    "else": "goto 'Welche Therapie ist möglich 3'"
  },
  {
    "name": "Welche Therapie ist möglich3",
    "condition": "Patient.THS_möglich === false && Patient.pumpentherapie_möglich === true",
    "action": "goto 'Empfehlung Pumpentherapie'",
    "else": "goto 'Welche Therapie ist möglich 4'"
  },
  {
    "name": "Welche Therapie ist möglich4",
    "condition": "Patient.THS_möglich === true && Patient.pumpentherapie_möglich === false",
    "action": "goto 'Empfehlung Pumpentherapie und THS'"
  },
  {
    "name": "Verbesserung durch Optimierung oraler Therapie",
    "condition": "true === true",
    "action": "goto 'Empfehlung THS'",
    "else": "goto 'Keine Empfehlung möglich'"
  },
  {
    "name": "Empfehlung THS",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: THS')"
  },
  {
    "name": "Empfehlung VIM-THS GPI-THS",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: VIM-THS oder GPI-THS')"
  },
  {
    "name": "Empfehlung STN-THS",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: STN-THS')"
  },
  {
    "name": "Empfehlung Pallidotomie",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: Pallidotomie')"
  },
  {
    "name": "Empfehlung Pumpentherapie",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: Pumpentherapie')"
  },
  {
    "name": "Empfehlung Pumpentherapie und THS",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: Pumpentherapie oder THS')"
  },
  {
    "name": "Keine OP möglich",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: Es ist unter den aktuellen Bedingungen keine Operation möglich')"
  },
  {
    "name": "Keine Empfehlung möglich",
    "condition": "true === true",
    "action": "Prozess.ende('Empfehlung: Es ist unter den aktuellen Bedingungen keine Empfehlungsgabe möglich')"
  },

  {
    "name": "Letzte Kontrolle Überprüfen",
    "condition": "Patient.letzteKontrolle > 3",
    "action": "goto 'Schrittmacher Überprüfen'"
  },
  {
    "name": "Schrittmacher Überprüfen",
    "condition": "Patient.schrittmacherErschöpft === true",
    "action": "goto 'Batteriewechsel Überprüfen'"
  },

  {
    "name": "Batteriewechsel Überprüfen",
    "condition": "Patient.schrittmacherErschöpft === false",
    "action": "Batterie.wechseln()"
  },
  {
    "name": "Überprüfung auf frühere PK-Therapie",
    "condition": "Patient.erhältAktuellPKTherapie === false && Patient.hatteFrüherePKTherapie === false",
    "action": "Prozess.ende()"
  }
]
