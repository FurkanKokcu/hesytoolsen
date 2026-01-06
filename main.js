/*
 * Hesy Tools
 * Copyright (C) 2025 Furkan Kökçü
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

function test(){
    const girdi = document.getElementById("hastalik").value.toLowerCase(); // Case insensitive
    const islem = document.getElementById("islem").value;
    const ilac = document.getElementById("ilac").value;

    // Dictionary: Layman terms (English) -> Medical Terminology (English)
    const lathas = {
        // --- Oral & Dental ---
        "sugar": "diabetes mellitus",
        "diabetes": "diabetes mellitus",
        "inflammation": "infection / inflammation",
        "gum inflammation": "gingivitis",
        "gum recession": "periodontal recession",
        "tooth abscess": "periapical abscess",
        "bone loss": "alveolar bone resorption",
        "jaw inflammation": "osteomyelitis",
        "jaw fracture": "mandibular / maxillary fracture",
        "jaw joint pain": "temporomandibular joint dysfunction (TMJ)",
        "mouth sore": "aphthous stomatitis",
        "thrush": "oral candidiasis",
        "cold sore": "herpes labialis",
        "black tongue": "lingua villosa nigra",
        "dry mouth": "xerostomia",
        "bad breath": "halitosis",
        "bloody saliva": "hemoptysis (if systemic) or traumatic bleeding",
        "bone spur": "torus mandibularis / torus palatinus",

        // --- ENT Related ---
        "sinusitis": "sinusitis",
        "ear infection": "otitis media / otitis externa",
        "tonsillitis": "tonsillitis",
        "sore throat": "pharyngitis",
        "adenoid": "adenoid hypertrophy",

        // --- Internal Medicine / Infection ---
        "high blood pressure": "hypertension",
        "heart failure": "congestive heart failure",
        "blood thinner": "anticoagulant therapy (e.g., warfarin, aspirin)",
        "anemia": "anemia",
        "thyroid": "hypothyroidism / hyperthyroidism",
        "liver disease": "hepatopathy / hepatitis / cirrhosis",
        "kidney failure": "renal failure",
        "heart attack": "history of myocardial infarction",
        "tuberculosis": "tuberculosis",
        "hepatitis b": "HBV infection",
        "hepatitis c": "HCV infection",
        "aids": "HIV positive",
        "hiv": "HIV positive",

        // --- Rheumatology / Orthopedics ---
        "rheumatism": "rheumatoid arthritis",
        "osteoporosis": "osteoporosis",
        "joint inflammation": "arthritis",
        "muscle wasting": "muscular atrophy",

        // --- Dermatology ---
        "eczema": "dermatitis",
        "psoriasis": "psoriasis",
        "vitiligo": "vitiligo",
        "fungus": "candidiasis / tinea",
        "herpes": "herpes simplex",

        // --- Oncology / Pathology ---
        "non-healing ulcer": "oral squamous cell carcinoma suspicion",
        "swollen lymph node": "lymphadenopathy",
        "lump in mouth": "possible oral neoplasia",
        "jaw tumor": "ameloblastoma / odontogenic tumor",
        "cyst": "radicular cyst / dentigerous cyst",

        // --- Psychiatry / Neurology ---
        "teeth grinding": "bruxism",
        "fainting": "history of syncope",
        "epilepsy": "epilepsy",
        "anxiety": "anxiety disorder",
        "jaundice": "hepatitis / icterus"
    };

    const lagir = lathas[girdi] || girdi;
    const check = document.getElementById("check1").checked;

    const outputDiv = document.getElementById("demo");

    if (check){
        outputDiv.innerHTML = `In the verbal anamnesis, it was learned that the patient has a history of <strong>${lagir}</strong> and does not use any medication. The procedure <strong>${islem}</strong> will be performed. Submitted for your evaluation.`;
    } else if (ilac === ""){
        outputDiv.innerHTML = `In the verbal anamnesis, it was learned that the patient has a history of <strong>${lagir}</strong> and uses medication but does not know the name. The procedure <strong>${islem}</strong> will be performed. Submitted for your evaluation.`;
    } else {
        outputDiv.innerHTML = `In the verbal anamnesis, it was learned that the patient has a history of <strong>${lagir}</strong> and uses the medication <strong>${ilac}</strong>. The procedure <strong>${islem}</strong> will be performed. Submitted for your evaluation.`;
    }
}

function perio(){
    let drc;
    let evre;
    const dis = document.getElementById("diskaybi").value;
    const atasman = document.getElementById("atasmankaybi").value;
    const sig = document.getElementById("sigara").value || 0;

    if (dis < 1 && atasman < 3){
        evre = 1;
    } else if(dis < 1 && atasman > 2){
        evre = 2;
    } else if(dis <= 4){
        evre = 3;
    } else {
        evre = 4;
    }

    if(sig < 10){
        drc = "A";
    } else if(sig < 20){
        drc = "B";
    } else {
        drc = "C";
    }
    document.getElementById("perio").innerHTML = `Patient has Periodontitis <strong>Stage ${evre}, Grade ${drc}</strong>.`;
}

function ging(){
    const kana = Number(document.getElementById("kanama").value);
    const yuzd = Number(document.getElementById("yuz").value);
    let gingvar;
    let gingind;

    if (yuzd === 0) {
        document.getElementById("ging").innerHTML = "Surface count cannot be zero.";
        return;
    }

    gingind = (kana / yuzd) * 100;

    if(gingind > 10){
        gingvar = "<span class='text-danger'>Gingivitis Present!</span>";
    } else {
        gingvar = "<span class='text-success'>Healthy / Clinical Gingival Health</span>";
    }
    document.getElementById("ging").innerHTML = `Bleeding Score: %${gingind.toFixed(1)} - ${gingvar}`;
}

$(document).ready(function() {
    // --- HTML BUILDER (Herbst) ---
    const kapsayici = document.getElementById("herbstIcerikAlani");

    if (kapsayici && typeof herbstVerileri !== 'undefined') {
        let htmlDeposu = "";
        herbstVerileri.forEach((grup) => {
            htmlDeposu += `<h3 class="mt-4 mb-3 text-primary border-bottom pb-2">${grup.baslik}</h3>`;
            htmlDeposu += `<div class="accordion" id="accordion-${grup.kisaKod}">`;

            grup.testler.forEach((test, index) => {
                let uniqueId = `${grup.kisaKod}-${index}`;
                htmlDeposu += `
                <div class="card mb-2">
                <div class="card-header p-0" id="heading-${uniqueId}">
                <h5 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed p-3 font-weight-bold text-dark" type="button" data-toggle="collapse" data-target="#collapse-${uniqueId}" aria-expanded="false" aria-controls="collapse-${uniqueId}" style="text-decoration:none;">
                ${test.soru}
                </button>
                </h5>
                </div>
                <div id="collapse-${uniqueId}" class="collapse" aria-labelledby="heading-${uniqueId}" data-parent="#accordion-${grup.kisaKod}">
                <div class="card-body">
                ${test.icerik}
                </div>
                </div>
                </div>`;
            });
            htmlDeposu += `</div>`;
        });
        kapsayici.innerHTML = htmlDeposu;
    }

    // --- RECIPE BUILDER ---
    const receteKapsayici = document.getElementById("receteIcerikAlani");

    if (receteKapsayici && typeof receteVerileri !== 'undefined') {
        let receteHTML = `<h4 class="mb-4 text-center mt-3 text-primary">Common Prescriptions</h4>`;
        receteHTML += `<div class="accordion" id="accordionRecete">`;

        receteVerileri.forEach((item, index) => {
            let collapseId = `recete-${index}`;
            receteHTML += `
            <div class="card mb-3">
            <div class="card-header p-0" id="heading-${collapseId}">
            <h5 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed p-3 font-weight-bold" type="button" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}" style="text-decoration:none;">
            ${item.tani}
            </button>
            </h5>
            </div>
            <div id="${collapseId}" class="collapse" aria-labelledby="heading-${collapseId}" data-parent="#accordionRecete">
            <div class="card-body">
            <ul class="list-group list-group-flush">
            ${item.ilaclar.map(ilac => `
                <li class="list-group-item d-flex justify-content-between align-items-center" style="background-color: transparent;">
                <div>
                <strong>${ilac.ad}</strong>
                <div class="small text-muted">Dose: ${ilac.doz}</div>
                </div>
                <span class="badge badge-primary badge-pill">${ilac.kullanim}</span>
                </li>
                `).join('')}
                </ul>
                </div>
                </div>
                </div>`;
        });
        receteHTML += `</div>`;
        receteKapsayici.innerHTML = receteHTML;
    }

    // --- HEMATOLOGY TABLE ---
    if(typeof hematolojiVerisi !== 'undefined'){
        $.each(hematolojiVerisi, function(index, satir) {
            var yeniSatir = `
            <tr>
            <td>${satir.hastalik}</td>
            <td>${satir.islem}</td>
            <td>${satir.risk}</td>
            <td>${satir.protokol}</td>
            </tr>
            `;
            $("#hemaTabloGovdesi").append(yeniSatir);
        });
    }

    $("#hemaarama").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#hemaTabloGovdesi tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

// Navbar Collapse Logic
$('.dropdown-menu .dropdown-item, .nav-item .nav-link').on('click', function(){
    if(!$(this).hasClass('dropdown-toggle')){
        $(".navbar-collapse").collapse('hide');
    }
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $('.nav-link').removeClass('active');
    $('.dropdown-item').removeClass('active');
    $(e.target).addClass('active');
    if ($(e.target).hasClass('dropdown-item')) {
        $('#navbardrop').addClass('active');
    }
});

// Hemotology Calculator
function hemamathfunc(){
    const ha1c = Number(document.getElementById("ha1c").value);
    const buyuk = Number(document.getElementById("sysInput").value);
    const kucuk = Number(document.getElementById("diaInput").value);
    const inr = Number(document.getElementById("inr").value);
    const hemoglobin = Number(document.getElementById("hemoglobin").value);
    let inrdeger, hemoglobindeger, ha1cdeger, tansiyondeger;

    // INR
    if (inr <= 3){
        inrdeger = "Low risk for bleeding, safe for simple extractions.";
    } else {
        inrdeger = "Consultation required!";
    }

    // Hemoglobin
    if (hemoglobin > 18){
        hemoglobindeger = "Consultation required!";
    } else if(hemoglobin > 10){
        hemoglobindeger = "Safe for all dental procedures.";
    } else if(hemoglobin > 7){
        hemoglobindeger = "Proceed with caution. Delayed healing. Increased risk for GA/Sedation.";
    } else {
        hemoglobindeger = "Consultation required!";
    }

    // HbA1c
    if (ha1c < 7){
        ha1cdeger = "Safe for all dental procedures.";
    } else if (ha1c < 9){
        ha1cdeger = "Increased infection risk, impaired healing. Prophylactic antibiotics may be needed.";
    } else {
        ha1cdeger = "Consultation required!";
    }

    // Blood Pressure
    if (buyuk < 90 || kucuk < 60){
        tansiyondeger = "Hypotension. Risk of syncope!";
    } else if(buyuk < 180 || kucuk < 110){
        tansiyondeger = "Within normal/acceptable limits.";
    } else {
        tansiyondeger = "Hypertension Crisis! Do not proceed.";
    }

    document.getElementById("hemaan").innerHTML = `
    <strong>INR:</strong> ${inrdeger} <br>
    <strong>Hemoglobin:</strong> ${hemoglobindeger} <br>
    <strong>HbA1c:</strong> ${ha1cdeger} <br>
    <strong>Blood Pressure:</strong> ${tansiyondeger}
    `;
}

// Pedo Guide
let text = "";
const yasliste = [4, 5, 6, 7, 8, 9, 10, 11, 12];

function pedoguidef(){
    for (let yas of yasliste){
        text += `<button class="btn btn-primary" onclick="pedo(${yas})">${yas}</button> `;
    }
    const pedoDiv = document.getElementById("pedoguideicerik");
    if(pedoDiv) pedoDiv.innerHTML = text;
}
pedoguidef();

function pedo(yas){
    if(typeof disRehberi === 'undefined') return;
    const liste = disRehberi[yas];
    let html = `<h3>${yas} Years Old - Dental Guide</h3><ul>`;
    for (let item of liste){
        html += `<li>${item}</li>`;
    }
    html += `</ul>`;
    document.getElementById("pedoicerik").innerHTML = html;
}

// Notes System
function notesfunc(){
    const title = document.getElementById("baslik").value;
    const comment = document.getElementById("icerik").value;
    const notesrem = `
    <div class="card p-3 mb-2">
    <h3>${title}</h3>
    <p>${comment}</p>
    <button onclick="deleteme(this)" class="btn btn-danger btn-sm">Delete</button>
    </div>
    `;
    if(title != ""){
        document.getElementById("notesdiv").innerHTML += notesrem;
        localStorage.setItem("notlarHTML", document.getElementById("notesdiv").innerHTML);
        document.getElementById("baslik").value = "";
        document.getElementById("icerik").value = "";
    } else if(comment === "hesy dental suite"){
        alert("You must be an OG user!")
    }
}
function deleteme(thisnote){
    thisnote.parentElement.remove();
    localStorage.setItem("notlarHTML", document.getElementById("notesdiv").innerHTML);
}

window.onload = function() {
    const kayitliHTML = localStorage.getItem("notlarHTML");
    if (kayitliHTML) {
        document.getElementById("notesdiv").innerHTML = kayitliHTML;
    }
}
