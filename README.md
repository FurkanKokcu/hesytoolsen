<div align="center">
  <img src="round-icon.png" alt="Hesy Tools Logo" width="120" height="120">

  # Hesy Tools
  
  **For a reason, for health.**

  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  ![Platform](https://img.shields.io/badge/Platform-Web-orange)
  ![Status](https://img.shields.io/badge/Status-Beta-yellow)
  ![Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20JS%20%7C%20Bootstrap-purple)

  <p>
    A comprehensive digital assistant designed for dentistry students and professionals.<br>
    Streamline your clinical workflow with instant calculations, risk assessments, and guides.
  </p>

  [Live Demo](https://hesytoolsen.pages.dev) • [Report Bug](https://github.com/FurkanKokcu/hesytools/issues) • [Request Feature](https://github.com/FurkanKokcu/hesytools/issues)
</div>

---

## 🦷 About The Project

**Hesy Tools** (formerly Hesy Dental Suite) is a web-based utility designed to solve the daily calculation and information retrieval problems faced by dentists.

It eliminates the need for manual calculation of periodontal indices, memorizing complex hematological protocols, or searching for prosthetic troubleshooting guides. Everything is one tap away.

**Why the name?**
The name is a tribute to **Hesy-Ra**, the first known dentist in history (Ancient Egypt, c. 2600 BC).

---

## 🚀 Key Features

### 🩺 PerioFind
- **Periodontitis Staging:** Calculator based on tooth loss, attachment loss, and smoking habits.
- **Gingivitis Calculator:** Calculates bleeding scores and determines clinical gingival health.

### 🩸 HemaCheck & HemaMath
- **Risk Assessment:** Analyzes INR, Hemoglobin, HbA1c, and Blood Pressure values to determine if a procedure is safe.
- **Protocols:** Instant access to management protocols for Hemophilia, Von Willebrand, Thrombocytopenia, and more.

### 💊 Rx (Prescriptions)
- **Active Ingredients:** Protocols using international non-proprietary names (Amoxicillin, Ibuprofen, etc.).
- **Scenarios:** Ready-to-use regimens for Sinus Infections, Abscesses, TMJ Pain, and Prophylaxis.

### 🛠️ ProAssist (Herbst)
- **Troubleshooting:** Step-by-step guides for fixing denture stability issues (e.g., "Denture dislodges when yawning").

### 👶 PedoGuide
- **Eruption Charts:** Interactive guide for primary and permanent tooth eruption ages (4-12 years).

### 📝 Smart Consultation
- **Auto-Generator:** Generates professional anamnesis text based on patient complaints (converting layman terms like "sugar" to "Diabetes Mellitus").

---

## 💻 Tech Stack

This project is built with simplicity and speed in mind, running entirely on the client-side.

* **Core:** HTML5, CSS3, JavaScript (ES6)
* **Framework:** Bootstrap 4 (Responsive Design), jQuery
* **Icons:** FontAwesome (via CDN)

---

## 📦 Installation & Usage

Since this is a static web application, you don't need a complex backend server.

### Option 1: Run Locally
1.  Clone the repo:
    ```sh
    git clone [https://github.com/FurkanKokcu/hesytools.git](https://github.com/FurkanKokcu/hesytools.git)
    ```
2.  Navigate to the project folder:
    ```sh
    cd hesytools
    ```
3.  Open `index.html` in any web browser.

### Option 2: Host Yourself
You can simply upload these files to GitHub Pages, Netlify, or Vercel.

---

## 📂 Project Structure

```text
hesytools/
├── index.html       # Main application interface
├── main.js          # Core logic (Consultation, UI handling)
├── hemadata.js      # Hematology database
├── herbst.js        # Prosthetic tests database
├── receteler.js     # Prescription protocols (English/Generic)
├── pedoguide.js     # Pediatric eruption data
├── manifest.json    # PWA Manifest
└── round-icon.png   # Logo files
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

    Fork the Project

    Create your Feature Branch (git checkout -b feature/AmazingFeature)

    Commit your Changes (git commit -m 'Add some AmazingFeature')

    Push to the Branch (git push origin feature/AmazingFeature)

    Open a Pull Request
---

## 📜 License

Distributed under the GNU GPLv3 License. See LICENSE for more information.

    "Free software is a matter of liberty, not price."
---

## 👤 Contact

Furkan Kökçü - Dentistry Student & Developer

Project Link: https://github.com/FurkanKokcu/hesytools

---
