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

    // ISSUE 2: CANNOT RETURN (BUG FIX)
    // When a tab is clicked (shown.bs.tab event), we do a cleanup
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        
        // First, we remove the "active" label from everyone
        $('.nav-link').removeClass('active');
        $('.dropdown-item').removeClass('active');
        
        // We only give the "active" label to the currently clicked item
        $(e.target).addClass('active');

        // IF the clicked item is inside a dropdown (like Periodontitis),
        // we also highlight its parent "Periofind" button so it's visible
        if ($(e.target).hasClass('dropdown-item')) {
            $('#navbardrop').addClass('active'); // The ID of the main title in the navbar
        }
    });

const URL = "./my_model/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // MODIFICATION 1: We set flip = false to avoid mirror effect on the rear camera
        const flip = false; 
        
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        
        // MODIFICATION 2: We add a parameter to open the rear camera (environment)
        await webcam.setup({ facingMode: "environment" }); 
        
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
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
        updates:[],
        user:'',
        status:'',
        yolcheck:'',
        alergycheck:'',
        kilo:'',
        profilaksisonuc:'',
        probed:'',
        patientres:'',
        


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

            if (sig === 0) {
                drc = "A";
            } else if (sig < 10) {
                drc = "B";
            } else {
                drc = "C";
            }
            this.periosonuc = `Patient has stage ${evre} grade ${drc} periodontitis.`;
        },

        ging(){
            let gingvar
            let gingind
            const kana = Number(this.kanamaging);
            const yuzd = Number(this.yuzging);
            const probe = Number(this.probed);
            if (yuzd === 0){
                this.gingsonuc = "Number of probed surfaces cannot be zero.";
                return;
            }
            gingind=(kana/yuzd)*100
            if(gingind>10 && probe>4){
                gingvar = "Patient has periodontitis!"
            }else if (gingind>10){
                gingvar = "Gingivitis present!"
            }else if (probe <= 3){
                gingvar = "Healthy!"
            }else if (probe === 4){
                gingvar = "Health on reduced periodontium!"
            }else{
                gingvar = ""
            }

            this.gingsonuc = `Bleeding percentage ${gingind}%  ${gingvar}`
        },

        kons(){
            const girdi = this.hastalik;
            const islem = this.islem;
            const ilac = this.ilac;
            const lathas = this.lathassozluk
            const lagir = lathas[girdi]||girdi
            const check = this.check1;

            if (check){
                this.konssonuc = `In the verbal anamnesis, it was learned that the patient has a history of ${lagir} and uses no medication. The procedure ${islem} will be applied to the patient. Your evaluation is requested.`  ;
            } else if (ilac === ""){
                this.konssonuc = `In the verbal anamnesis, it was learned that the patient has a history of ${lagir} and uses medication, but the name is unknown. The procedure ${islem} will be applied to the patient. Your evaluation is requested.`  ;   
            }
            else{
                this.konssonuc = `In the verbal anamnesis, it was learned that the patient has a history of ${lagir} and uses the medication ${ilac}. The procedure ${islem} will be applied to the patient. Your evaluation is requested.`  ;
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
                inrdeger = "Low risk for bleeding, no contraindication for surgical extraction"
            }else if (inr>3){
                inrdeger = "Consultation required!"
            }

            if (hemoglobin>18){
                hemoglobindeger = "Consultation required!"
            }else if(hemoglobin>10){
                hemoglobindeger = "Any dental treatment can be performed."
            }else if(hemoglobin>7){
                hemoglobindeger = "Caution advised. Wound healing may be delayed. Increased risk for general anesthesia/sedation."
            }else{
                hemoglobindeger = "Consultation required!"
            }

            if (ha1c<7){
                ha1cdeger = "Any dental treatment can be performed."
            }else if (ha1c<9){
                ha1cdeger = "Increased risk of infection, impaired wound healing. Prophylactic (preventive) antibiotic may be required."
            }else{
                ha1cdeger = "Consultation required!"
            }

            if (buyuk<90 || kucuk<60){
                tansiyondeger = "Hypotension. Risk of syncope!"
            }else if(buyuk<180 || kucuk<110){
                tansiyondeger="Within normal limits"
            }else{
                tansiyondeger = "Hypertension, Absolutely no procedure!"
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

            this.profilaksisonuc = `${prohesap} mg ${ilac} should be used 30-60 minutes before the procedure!`;
        }
        

    }))
 })
