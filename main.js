console.log(`/*
 * Hesy Tools
 * Copyright (C) 2025 Furkan Kökçü
 *
 * This program is free software: you can redistribute it and/or modify
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

    // 2. ISSUE: UNABLE TO GO BACK (BUG FIX)
    // When a tab is clicked (shown.bs.tab event), we do a cleanup
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        
        // First, we rip the "active" tag off everyone
        $('.nav-link').removeClass('active');
        $('.dropdown-item').removeClass('active');
        
        // We only give the "active" tag to the friend currently clicked
        $(e.target).addClass('active');

        // IF the clicked thing is inside a dropdown (like Periodontitis),
        // we also highlight its parent "Periofind" button so it's clear
        if ($(e.target).hasClass('dropdown-item')) {
            $('#navbardrop').addClass('active'); // The ID of the main title in Navbar
        }
    });


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
        updates:[],
        user:'',
        status:'',
        yolcheck:'',
        alergycheck:'',
        kilo:'',
        profilaksisonuc:'',
        


        async init(){
            try{
                const [lathasanswer, herbstanswer, receteanswer, pedoanswer,]= await Promise.all([
                    fetch('lathas.json'),
                    fetch('herbst.json'),
                    fetch('receteler.json'),
                    fetch('pedoguide.json'),
                    
                ])
                this.lathassozluk = await lathasanswer.json();
                this.herbstverileri = await herbstanswer.json();
                this.receteverileri = await receteanswer.json();
                this.pedoguideverileri = await pedoanswer.json();
                this.user = localStorage.getItem("username") || "";

            }
            catch(hata){
                console.error("File could not be read:", hata)
            }
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
            this.periosonuc = `The patient has Stage ${evre} Grade ${drc} periodontitis.`;
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
            this.gingsonuc = `Bleeding percentage %${gingind}  ${gingvar}`
        },

        kons(){
            const girdi = this.hastalik;
            const islem = this.islem;
            const ilac = this.ilac;
            const lathas = this.lathassozluk
            const lagir = lathas[girdi]||girdi
            const check = this.check1;

            if (check){
                this.konssonuc = `In the verbal anamnesis taken from the patient, it was learned that there is a history of ${lagir} and no medication is used. ${islem} will be applied to the patient. Your evaluation is requested.`  ;
            } else if (ilac === ""){
                this.konssonuc = `In the verbal anamnesis taken from the patient, it was learned that there is a history of ${lagir} and uses medication but does not know the name of the medication used. ${islem} will be applied to the patient. Your evaluation is requested.`  ;   
            }
            else{
                this.konssonuc = `In the verbal anamnesis taken from the patient, it was learned that there is a history of ${lagir} and the name of the medication used is ${ilac}. ${islem} will be applied to the patient. Your evaluation is requested.`  ;
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
                inrdeger = "Low risk for bleeding, no objection to surgical extraction"
            }else if (inr>3){
                inrdeger = "Consultation required!"
            }

            if (hemoglobin>18){
                hemoglobindeger = "Consultation required!"
            }else if(hemoglobin>10){
                hemoglobindeger = "All kinds of dental treatments can be performed."
            }else if(hemoglobin>7){
                hemoglobindeger = "Caution should be exercised. Wound healing may be delayed. General anesthesia/Sedation risk increases."
            }else{
                hemoglobindeger = "Consultation required!"
            }

            if (ha1c<7){
                ha1cdeger = "All kinds of dental treatments can be performed."
            }else if (ha1c<9){
                ha1cdeger = "Infection risk increases, wound healing is impaired. Prophylactic (preventive) antibiotics may be required."
            }else{
                ha1cdeger = "Consultation required!"
            }

            if (buyuk<90 || kucuk<60){
                tansiyondeger = "Hypotension. Risk of syncope!"
            }else if(buyuk<180 || kucuk<110){
                tansiyondeger="In normal values"
            }else{
                tansiyondeger = "Hypertension, Absolutely no procedure should be performed!"
            }
            this.hemasonuc = `
                    <strong>INR:</strong> ${inrdeger} <br>
                    <strong>Hemoglobin:</strong> ${hemoglobindeger} <br>
                    <strong>HbA1c:</strong> ${ha1cdeger} <br>
                    <strong>Blood Pressure:</strong> ${tansiyondeger}
                `;
        },

        settingsfunc(){
            localStorage.setItem("username", this.user)
            this.status="Saved"
        },

        profilaksifunc() {
            const kilo = this.kilo;
            const { yolcheck, alergycheck } = this;
            let prohesap;
            let ilac;

            if (yolcheck) {
                if (alergycheck) {
                    prohesap = Math.min(kilo * 15, 500);
                    ilac = "Azithromycin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Amoxicillin";
                }
            } else { 
                if (alergycheck) {
                    prohesap = Math.min(kilo * 20, 600);
                    ilac = "Clindamycin";
                } else {
                    prohesap = Math.min(kilo * 50, 2000);
                    ilac = "Ampicillin";
                }
            }

            this.profilaksisonuc = `${prohesap} mg of ${ilac} should be used 30-60 minutes before the procedure!`;
        }
        

    }))
 })
