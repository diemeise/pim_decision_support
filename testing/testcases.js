function loadTestCases(){
    return[case1 = {
        questionnaire: testcase1,
        expected: expected1   
    },
    case2 = {
        questionnaire: testcase2,
        expected: expected2,
        
    }]
}

const testcase1 = {
    "stunde_ueberbeweglichkeit": true,
    "5_medikamente_tag": true,
    "THS_moeglich": true,
    "aktuelle_medikamente_sind_ausreichend": true,
    "aktuelle_medikamente_sind_effektiv": true,
    "aktuelle_therapieform": "THS",
    "alter_bei_PK_diagnose": "12",
    "impulskontrollstoerung_durch_medikamente": true,
    "impulskontrollstoerung_vorhanden": true,
    "kontraindikation_STN": true,
    "motorische_fluktuationen_durch_levodopa_kontrolliert": true,
    "motorische_fluktuationen_weniger_3_jahre": true,
    "off_symptome_2h": true,
    "orale_medikamente_moeglich": true,
    "parkinson_symptome_aktuell": true,
    "parkinson_symptome_aktuell_symptome": [],
    "patient_alter": "24",
    "pk_diagnose_vorhanden": true,
    "pk_therapie_aktuell": true,
    "pk_therapie_vergangenheit": true,
    "pumpentherapie_moeglich": true,
    "risiko_gegen_op": true,
    "schrittmacher_hat_Ladung": true,
    "schwerer_tremor_vorhanden": true,
    "symptome_nach_medikamente_vorhanden": true,
    "ths_batterie_aelter_drei_Monate": true,
    "ths_batterie_geladen": true,
    "ths_erfolgreich": true,
    "verbesserung_durch_optimierung_oraler_therapie": true,
    "wirkungsfluktationen_vorhanden": true
}
const expected1 = "Beendet: Empfehlung: Batterie des Schrittmachers ueberpruefen"

const testcase2 = {
    "stunde_ueberbeweglichkeit": true,
    "5_medikamente_tag": true,
    "THS_moeglich": true,
    "aktuelle_medikamente_sind_ausreichend": true,
    "aktuelle_medikamente_sind_effektiv": true,
    "aktuelle_therapieform": "THS",
    "alter_bei_PK_diagnose": "12",
    "impulskontrollstoerung_durch_medikamente": true,
    "impulskontrollstoerung_vorhanden": true,
    "kontraindikation_STN": true,
    "motorische_fluktuationen_durch_levodopa_kontrolliert": true,
    "motorische_fluktuationen_weniger_3_jahre": true,
    "off_symptome_2h": true,
    "orale_medikamente_moeglich": true,
    "parkinson_symptome_aktuell": true,
    "parkinson_symptome_aktuell_symptome": [],
    "patient_alter": "24",
    "pk_diagnose_vorhanden": true,
    "pk_therapie_aktuell": true,
    "pk_therapie_vergangenheit": true,
    "pumpentherapie_moeglich": true,
    "risiko_gegen_op": true,
    "schrittmacher_hat_Ladung": true,
    "schwerer_tremor_vorhanden": true,
    "symptome_nach_medikamente_vorhanden": true,
    "ths_batterie_aelter_drei_Monate": false,
    "ths_batterie_geladen": true,
    "ths_erfolgreich": true,
    "verbesserung_durch_optimierung_oraler_therapie": true,
    "wirkungsfluktationen_vorhanden": true
}
const expected2 = "Beendet: Empfehlung: Es ist unter den aktuellen Bedingungen keine Empfehlungsgabe moeglich"

setDebugButtons();
