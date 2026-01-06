const disRehberi = {
    // --- 4 YEARS: Primary Dentition (Stable Period) ---
    4: [
        "🟡 51 - Upper Right Primary Central (Present)",
        "🟡 52 - Upper Right Primary Lateral (Present)",
        "🟡 53 - Upper Right Primary Canine (Present)",
        "🟡 54 - Upper Right Primary 1st Molar (Present)",
        "🟡 55 - Upper Right Primary 2nd Molar (Present)",
        "🟡 61 - Upper Left Primary Central (Present)",
        "🟡 62 - Upper Left Primary Lateral (Present)",
        "🟡 63 - Upper Left Primary Canine (Present)",
        "🟡 64 - Upper Left Primary 1st Molar (Present)",
        "🟡 65 - Upper Left Primary 2nd Molar (Present)",
        "🟡 71 - Lower Left Primary Central (Present)",
        "🟡 72 - Lower Left Primary Lateral (Present)",
        "🟡 73 - Lower Left Primary Canine (Present)",
        "🟡 74 - Lower Left Primary 1st Molar (Present)",
        "🟡 75 - Lower Left Primary 2nd Molar (Present)",
        "🟡 81 - Lower Right Primary Central (Present)",
        "🟡 82 - Lower Right Primary Lateral (Present)",
        "🟡 83 - Lower Right Primary Canine (Present)",
        "🟡 84 - Lower Right Primary 1st Molar (Present)",
        "🟡 85 - Lower Right Primary 2nd Molar (Present)"
    ],

    // --- 5 YEARS: Pre-Eruption Phase (Diastemas may form) ---
    5: [
        "⚠️ 6-Year Molars (16, 26, 36, 46) Ready under gingiva!",
        "🟡 51 - Upper Right Pri. Central (Root resorption started)",
        "🟡 61 - Upper Left Pri. Central (Root resorption started)",
        "🟡 71 - Lower Left Pri. Central (Mobile/Loose)",
        "🟡 81 - Lower Right Pri. Central (Mobile/Loose)",
        "🟡 (All other primary teeth are stable)"
    ],

    // --- 6 YEARS: Mixed Dentition Begins! ---
    6: [
        "🟢 36 - Lower Left 1st Molar ERUPTED",
        "🟢 46 - Lower Right 1st Molar ERUPTED",
        "🟢 16 - Upper Right 1st Molar ERUPTED",
        "🟢 26 - Upper Left 1st Molar ERUPTED",
        "🔴 71 - Lower Left Pri. Central (MOBILE / EXFOLIATED)",
        "🔴 81 - Lower Right Pri. Central (MOBILE / EXFOLIATED)",
        "🟢 31 - Lower Left Perm. Central (Erupting)",
        "🟢 41 - Lower Right Perm. Central (Erupting)",
        "🟡 51, 61 - Upper Pri. Centrals (Still present)",
        "🟡 Primary Laterals, Canines, Molars (B, C, D, E) Present"
    ],

    // --- 7 YEARS: Upper Anteriors Changing ---
    7: [
        "🟢 11 - Upper Right Perm. Central ERUPTED (51 Lost)",
        "🟢 21 - Upper Left Perm. Central ERUPTED (61 Lost)",
        "🟢 32 - Lower Left Perm. Lateral ERUPTED (72 Lost)",
        "🟢 42 - Lower Right Perm. Lateral ERUPTED (82 Lost)",
        "🔴 52 - Upper Right Pri. Lateral (MOBILE)",
        "🔴 62 - Upper Left Pri. Lateral (MOBILE)",
        "🟡 53, 63 - Upper Pri. Canines (Present)",
        "🟡 54, 64 - Upper Pri. 1st Molars (Present)",
        "🟡 55, 65 - Upper Pri. 2nd Molars (Present)",
        "🟡 73, 83 - Lower Pri. Canines (Present)",
        "🟡 74, 84 - Lower Pri. 1st Molars (Present)",
        "🟡 75, 85 - Lower Pri. 2nd Molars (Present)"
    ],

    // --- 8 YEARS: Upper Laterals Erupting ---
    8: [
        "🟢 12 - Upper Right Perm. Lateral ERUPTED",
        "🟢 22 - Upper Left Perm. Lateral ERUPTED",
        "🟢 11, 21 - Perm. Centrals (Present)",
        "🟢 31, 32, 41, 42 - Lower Incisors (Present)",
        "🟢 16, 26, 36, 46 - 6-Year Molars (Present)",
        "🟡 53, 63 - Upper Pri. Canines (Stable)",
        "🟡 54, 64 - Upper Pri. 1st Molars (Stable)",
        "🟡 55, 65 - Upper Pri. 2nd Molars (Stable)",
        "🟡 73, 83 - Lower Pri. Canines (May be mobile)",
        "🟡 74, 84 - Lower Pri. 1st Molars (Stable)",
        "🟡 75, 85 - Lower Pri. 2nd Molars (Stable)"
    ],

    // --- 9 YEARS: Lower Canines Changing ---
    9: [
        "🟢 33 - Lower Left Perm. Canine ERUPTED (73 Lost)",
        "🟢 43 - Lower Right Perm. Canine ERUPTED (83 Lost)",
        "🔴 74 - Lower Left Pri. 1st Molar (MOBILE)",
        "🔴 84 - Lower Right Pri. 1st Molar (MOBILE)",
        "🔴 54 - Upper Right Pri. 1st Molar (MOBILE)",
        "🔴 64 - Upper Left Pri. 1st Molar (MOBILE)",
        "🟡 53, 63 - Upper Pri. Canines (Still Present)",
        "🟡 55, 65 - Upper Pri. 2nd Molars (Still Present)",
        "🟡 75, 85 - Lower Pri. 2nd Molars (Still Present)"
    ],

    // --- 10 YEARS: 1st Premolars ---
    10: [
        "🟢 14 - Upper Right 1st Premolar ERUPTED (54 Lost)",
        "🟢 24 - Upper Left 1st Premolar ERUPTED (64 Lost)",
        "🟢 34 - Lower Left 1st Premolar ERUPTED (74 Lost)",
        "🟢 44 - Lower Right 1st Premolar ERUPTED (84 Lost)",
        "🔴 55 - Upper Right Pri. 2nd Molar (MOBILE)",
        "🔴 65 - Upper Left Pri. 2nd Molar (MOBILE)",
        "🔴 75 - Lower Left Pri. 2nd Molar (MOBILE)",
        "🔴 85 - Lower Right Pri. 2nd Molar (MOBILE)",
        "🔴 53, 63 - Upper Pri. Canines (MOBILE)",
        "🟡 Lower E's and Upper C's about to exfoliate."
    ],

    // --- 11 YEARS: Goodbye Primary Teeth (2nd Premolar & Upper Canine) ---
    11: [
        "🟢 15 - Upper Right 2nd Premolar ERUPTED (55 Lost)",
        "🟢 25 - Upper Left 2nd Premolar ERUPTED (65 Lost)",
        "🟢 35 - Lower Left 2nd Premolar ERUPTED (75 Lost)",
        "🟢 45 - Lower Right 2nd Premolar ERUPTED (85 Lost)",
        "🟢 13 - Upper Right Perm. Canine ERUPTED (53 Lost)",
        "🟢 23 - Upper Left Perm. Canine ERUPTED (63 Lost)",
        "⚪ No Primary Teeth Left (Usually).",
        "⚠️ If primary teeth remain, extraction may be indicated."
    ],

    // --- 12 YEARS: 2nd Molars (12-Year Molars) ---
    12: [
        "🟢 17 - Upper Right 2nd Molar ERUPTED",
        "🟢 27 - Upper Left 2nd Molar ERUPTED",
        "🟢 37 - Lower Left 2nd Molar ERUPTED",
        "🟢 47 - Lower Right 2nd Molar ERUPTED",
        "🟢 All Incisors, Canines, and Premolars complete.",
        "🟢 1st Molars (6-Year) complete.",
        "⚪ Total 28 Teeth Present (excluding wisdom teeth)."
    ]
};
