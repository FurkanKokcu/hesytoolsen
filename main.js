console.log(`/*
* Hesy Tools
* Copyright (C) 2025 Furkan Kökçü
*
* This program is free software: You can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*/`)
$('.dropdown-menu .dropdown-item').on('click', function(){
    $(".navbar-collapse").collapse('hide');
});

$('.dropdown-menu .dropdown-item, .nav-item .nav-link').on('click', function(){
    if(!$(this).hasClass('dropdown-toggle')){
        $(".navbar-collapse").collapse('hide');
    }
});

// 2. BUG FIX: UNABLE TO GO BACK
// When a tab is clicked (shown.bs.tab event), we perform cleanup
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

    // Remove "active" class from everyone
    $('.nav-link').removeClass('active');
    $('.dropdown-item').removeClass('active');

    // Add "active" class only to the clicked element
    $(e.target).addClass('active');

    // IF the clicked item is inside a dropdown (like Periodontitis),
    // highlight its parent "Periofind" button as well
    if ($(e.target).hasClass('dropdown-item')) {
        $('#navbardrop').addClass('active'); // ID of the main item in navbar
    }
});

function deleteme(thisnote){
    thisnote.parentElement.remove();
    localStorage.setItem("notlarHTML", document.getElementById("notesdiv").innerHTML);
}


document.addEventListener('alpine:init', () => {
    Alpine.data('hesyapp', () => ({
        diskaybi: '',
        atasmankaybi: '',
        sigara: '',
        periosonuc: '',
        kanamaging:'',
        yuzging:'',
        gingsonuc:'',
        hastalik:'',
        islem:'',
        ilac:'',
        konssonuc:'',
        check1:'',
        lathassozluk: {},
        herbstverileri: [],
        receteverileri:[],
        ha1c:'',
        sysInput:'',
        diaInput:'',
        inr:'',
        hemoglobin:'',
        hemasonuc:'',
        pedoguideicerik:'',
        pedoguideverileri: [],
        secilenPedo: null,
        baslik:'',
        icerik:'',
        notesdiv:'',
        updates:[],


        async init(){
            try{
                const [lathasanswer, herbstanswer, receteanswer, pedoanswer, changelog]= await Promise.all([
                    fetch('lathas.json'),
                                                                                                           fetch('herbst.json'),
                                                                                                           fetch('receteler.json'),
                                                                                                           fetch('pedoguide.json'),
                                                                                                           fetch('changelog.json')
                ])
                this.lathassozluk = await lathasanswer.json();
                this.herbstverileri = await herbstanswer.json();
                this.receteverileri = await receteanswer.json();
                this.pedoguideverileri = await pedoanswer.json();
                this.updates = await changelog.json();
                this.initNotes();
            }
            catch(hata){
                console.error("File could not be read:", hata)
            }
        },

        initNotes() {
            this.notesdiv = localStorage.getItem("notlarHTML") || "";
        },

        perio(){
            let evre;
            let drc;

            const dis = Number(this.diskaybi) || 0;
            const atasman = Number(this.atasmankaybi) || 0;
            const sig = Number(this.sigara) || 0;

            if (dis < 1 && atasman < 3) {
                evre = 1;
            } else if (dis < 1 && atasman > 2) {
                evre = 2;
            } else if (dis <= 4) {
                evre = 3;
            } else {
                evre = 4;
            }

            if (sig < 10) {
                drc = "A";
            } else if (sig < 20) {
                drc = "B";
            } else {
                drc = "C";
            }
            this.periosonuc = `Patient has Stage ${evre} Grade ${drc} periodontitis.`;
        },

        ging(){
            let gingvar
            let gingind
            const kana = Number(this.kanamaging);
            const yuzd = Number(this.yuzging);
            if (yuzd === 0){
                this.gingsonuc = "Surface count cannot be zero.";
                return;
            }
            gingind=(kana/yuzd)*100
            if(gingind>10){
                gingvar = "Gingivitis present!"
            }else{
                gingvar = "Healthy!"
            }
            this.gingsonuc = `Bleeding percentage %${gingind.toFixed(2)} - ${gingvar}`
        },

        kons(){
            const girdi = this.hastalik;
            const islem = this.islem;
            const ilac = this.ilac;
            const lathas = this.lathassozluk
            const lagir = lathas[girdi]||girdi
            const check = this.check1;

            if (check){
                this.konssonuc = `In the oral anamnesis taken from the patient, it was learned that they have a history of ${lagir} and do not use any medication. ${islem} will be performed on the patient. Your evaluation is requested.`  ;
            } else if (ilac === ""){
                this.konssonuc = `In the oral anamnesis taken from the patient, it was learned that they have a history of ${lagir} and use medication, but do not know the name of the medication. ${islem} will be performed on the patient. Your evaluation is requested.`  ;
            }
            else{
                this.konssonuc = `In the oral anamnesis taken from the patient, it was learned that they have a history of ${lagir} and use medication named ${ilac}. ${islem} will be performed on the patient. Your evaluation is requested.`  ;
            }
        },

        hemamathfunc(){
            const ha1c = this.ha1c;
            const buyuk = this.sysInput;
            const kucuk = this.diaInput;
            const inr = this.inr;
            const hemoglobin = this.hemoglobin;
            let inrdeger
            let hemoglobindeger
            let ha1cdeger
            let tansiyondeger

            if (inr<=3){
                inrdeger = "Low risk regarding bleeding, no objection to surgical extraction."
            }else if (inr>3){
                inrdeger = "Consultation required!"
            }

            if (hemoglobin>18){
                hemoglobindeger = "Consultation required!"
            }else if(hemoglobin>10){
                hemoglobindeger = "Any dental treatment can be performed."
            }else if(hemoglobin>7){
                hemoglobindeger = "Be careful. Wound healing may be delayed. Increased risk of General Anesthesia/Sedation."
            }else{
                hemoglobindeger = "Consultation required!"
            }

            if (ha1c<7){
                ha1cdeger = "Any dental treatment can be performed."
            }else if (ha1c<9){
                ha1cdeger = "Increased risk of infection, wound healing impaired. Prophylactic antibiotic may be required."
            }else{
                ha1cdeger = "Consultation required!"
            }

            if (buyuk<90 || kucuk<60){
                tansiyondeger = "Hypotension. Risk of syncope!"
            }else if(buyuk<180 || kucuk<110){
                tansiyondeger="Within normal range"
            }else{
                tansiyondeger = "Hypertension, Procedure strictly prohibited!"
            }
            this.hemasonuc = `
            <strong>INR:</strong> ${inrdeger} <br>
            <strong>Hemoglobin:</strong> ${hemoglobindeger} <br>
            <strong>HbA1c:</strong> ${ha1cdeger} <br>
            <strong>Blood Pressure:</strong> ${tansiyondeger}
            `;
        },

        notesfunc() {
            if (this.icerik === "hesy dental suite") {
                alert("I guess you've been using it for a while");
                this.icerik = "";
                return;
            }

            if (this.baslik === "") {
                alert("Please enter a title for your note.");
                return;
            }

            const yeniNot = `
            <div class="card p-3 mb-2">
            <h3>${this.baslik}</h3>
            <p>${this.icerik}</p>
            <button onclick="deleteme(this)" class="btn btn-danger btn-sm">Delete</button>
            </div>
            `;

            this.notesdiv += yeniNot;

            // 5. Save as "HTML" to LocalStorage
            localStorage.setItem("notlarHTML", this.notesdiv);

            // 6. Clear the boxes
            this.baslik = "";
            this.icerik = "";
        }


    }))
})
