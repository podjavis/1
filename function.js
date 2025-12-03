// function.js

// --- utilitaire pause ---
function pause(s = 0.05) {
    return new Promise(resolve => setTimeout(resolve, 1000 * s));
}

// --- typewriter ---
let i = 0;
async function type(text, container) {
    let queue = text.split("");
    while (queue.length) {
        let char = queue.shift();
        container.append(char);

        // petite oscillation de vitesse
        const speed = 0.005 + Math.sin(i / 5) * 0.005;
        await pause(speed);
        i++;
    }
}

// // --- effet Matrix ---
// function startMatrix() {
//     const canvas = document.createElement("canvas");
//     canvas.id = "matrix";
//     canvas.style.position = "absolute";
//     canvas.style.top = 0;
//     canvas.style.left = 0;
//     canvas.style.width = "100%";
//     canvas.style.height = "100%";
//     canvas.style.zIndex = 1;
//     canvas.style.pointerEvents = "none";

//     const crt = document.getElementById("crt");
//     crt.prepend(canvas);

//     const ctx = canvas.getContext("2d");
//     canvas.width = crt.offsetWidth;
//     canvas.height = crt.offsetHeight;

//     const letters = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛝᛟᛞᛠ";
//     const fontSize = 16;
//     const columns = Math.floor(canvas.width / fontSize);
//     const drops = Array(columns).fill(0);

//     function draw() {
//         ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         ctx.fillStyle = "#00ff66";
//         ctx.font = fontSize + "px monospace";

//         for (let i = 0; i < drops.length; i++) {
//             const text = letters.charAt(Math.floor(Math.random() * letters.length));
//             ctx.fillText(text, i * fontSize, drops[i] * fontSize);

//             drops[i]++;
//             if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//                 drops[i] = 0;
//             }
//         }
//     }

//     const interval = setInterval(draw, 50);
//     return { canvas, stop: () => clearInterval(interval) };
// }

// --- effet Matrix sur index.html ---

function startMatrix() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    canvas.style.position = "fixed";     // full-screen PAR-DESSUS TOUTE LA PAGE
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = 9999;          // au dessus de tout
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛝᛟᛞᛠ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff66";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    const interval = setInterval(draw, 50);

    return {
        canvas,
        stop: () => {
            clearInterval(interval);
            canvas.remove();
        }
    };
}



// ---- BOOT SEQUENCE ----
async function start() {
    // masquer le bouton et afficher le CRT
    document.getElementById("startButton").style.display = "none";
    document.getElementById("monitor").style.display = "flex";
    const terminal = document.querySelector(".terminal");
    terminal.innerHTML = "";
    const { canvas, stop } = startMatrix();

    // Animation Matrix pendant 5 secondes
    await pause(5);

    // Stopper l'effet et retirer le canvas
    stop();
    // crtFrame.style.display = "block";  // affiche l'iframe
    canvas.remove();


//     const text_2 = `

// ====================================================
//    GALACTIC CENTRAL INTELLIGENCE — CLASSIFIED FILE
// ====================================================

// ----------------------------------------------------
//    ▓▓▓ SUBJECT SUMMARY ▓▓▓
// ----------------------------------------------------
// ID..................: UNKNOWN                        
// Codename............: POD JAVIS                      
// Species.............: UNCONFIRMED (HUMAN-COMPATIBLE) 
// Status..............: ACTIVE / UNTRACEABLE           
// Risk Level..........: MODERATE — BEHAVIORAL ANOMALIES
// Last Known Location.: UNVERIFIED (MULTIPLE REPORTS)  

// ----------------------------------------------------
//    ▓▓▓ APPEARANCE & KNOWN TRAITS ▓▓▓
// ----------------------------------------------------
// • Height.............: ~185 cm                     
// • Build..............: Lean athletic  
// • Skin...............: Mixed complexion — brown skin  
// • Clothing...........: Oversized jacket, muted colors  
// • Headwear...........: White bucket hat (signature)  
// • Facial Visibility..: NONE — no confirmed sightings  
// • Other Notes........: Aura described as “quiet, magnetic”
// • Location...........: No official records (Last seen on heath)
// • 
// ----------------------------------------------------
//    ▓▓▓ OBSERVED HABITS ▓▓▓
// ----------------------------------------------------
// • Frequently sighted in low-light environments  
// • Often moves in nightlife zones, back alleys,  
//   orbital underlevels, and fringe settlements  
// • Drinks regularly — unknown tolerance  
// • High social invisibility; blends with civilians  
// • Eyes display micro-delays suggesting dissociation  

// ----------------------------------------------------
//    ▓▓▓ PSYCHOLOGICAL NOTES ▓▓▓
// ----------------------------------------------------
// Subject is classified as a high-opacity individual.
// Motivations remain unclear — analysts suspect an
// ongoing personal quest, origin unknown, objective
// unknown, destination unknown.

// Behavioral Profile:
// • Moves with intent, yet never reveals purpose  
// • Appears connected to many individuals across
//   multiple systems, yet no one provides verifiable
//   information about him  
// • Social circle described as “closed, encrypted,
//   impossible to map”  
// • Possible ties to a shadow network or an informal
//   underground collective — unconfirmed  
// • Speaks little, observes much; actions suggest a
//   long-term pursuit rather than random drifting

// WITNESS STATEMENTS:
// • “He knows everyone. No one knows him.”  
// • “Feels like he’s searching for something… but
//    even he might not know what it is.”  
// • “Moves like a ghost with a mission.”  
 

// ----------------------------------------------------
//    ▓▓▓ ENVIRONMENT CONTEXT ▓▓▓
// ----------------------------------------------------
// Galactic Sector: fractured systems  
// Atmosphere.....: neon cities, dying stations,  
//                   smoke-filled bars, drifting cargo  
// Population.....: mixed — humans, synthetics, aliens  
// Cultural Notes.: Environments rich in trap-soul, R&B textures:
//                  muted drums, reversed pads, slow reverb-heavy vocals   
                 

// Subject navigates these environments effortlessly.
// Locations where Bryson Tiller, Tory Lanez (R&B mood),
//   and early Drake energy resonate culturally 

// ----------------------------------------------------
//    ▓▓▓ LATEST UPDATES ▓▓▓
// ----------------------------------------------------

// • Subject’s face has NEVER been officially recorded  
//   → No facial ID possible  
//   → No composite sketch available  
// • Movements have increased significantly in recent cycles  
// • Appears active, purposeful — “in motion more than ever”  
// • Rumors suggest he is following a trail, though the nature
//   of the target remains unidentified  

// ----------------------------------------------------
//    END OF RECORD — ENTITY_LOG_00047
// ====================================================
// \n\n`;

    const text_2 = `
======================================================================================================================
                                GALACTIC CENTRAL INTELLIGENCE — CLASSIFIED FILE
======================================================================================================================
======================================================    ||   =======================================================
              ▓▓▓ SUBJECT SUMMARY ▓▓▓                  ||               ▓▓▓ APPEARANCE & KNOWN TRAITS ▓▓▓
======================================================    ||   =======================================================

ID..................: UNKNOWN                             ||  • Height.............: ~185 cm
Codename............: POD JAVIS                           ||  • Build..............: Lean athletic
Species.............: UNCONFIRMED (HUMAN-COMPATIBLE)      ||  • Skin...............: Mixed complexion — brown skin
Status..............: ACTIVE / UNTRACEABLE                ||  • Clothing...........: Oversized jacket, muted colors
Risk Level..........: MODERATE — BEHAVIORAL ANOMALIES     ||  • Headwear...........: White bucket hat (signature)
Last Known Location.: UNVERIFIED (MULTIPLE REPORTS)       ||  • Facial Visibility..: NONE — no confirmed sightings
                                                          ||  • Other Notes........: Aura described as "quiet, heavy"
                                                          ||  • Location...........: No records (Last seen on heath)

======================================================    ||   =======================================================
              ▓▓▓ OBSERVED HABITS ▓▓▓                  ||               ▓▓▓ PSYCHOLOGICAL NOTES ▓▓▓
======================================================    ||   =======================================================

• Frequently sighted in low-light environments            ||  Subject is classified as a high-opacity individual.
• Often moves in nightlife zones, back alleys,            ||  Motivations remain unclear — ongoing personal quest
  orbital underlevels, and fringe settlements             ||  Origin unknown, objective unknown, destination unknown
• Drinks regularly — unknown tolerance                    ||  
• High social invisibility; blends with civilians         ||  Behavioral Profile:
• Eyes display micro-delays suggesting dissociation       ||  • Moves with intent, yet never reveals purpose
                                                          ||  • Connected to many individuals across multiple systems
                                                          ||  • Social circle: “closed, encrypted, impossible to map”
                                                          ||  • Possible shadow network / underground collective
                                                          ||  • Speaks little, observes much; long-term pursuit 
                                                          ||  
                                                          ||  WITNESS STATEMENTS:
                                                          ||  • “He knows everyone. No one knows him.”
                                                          ||  • “Feels like he’s searching for something…”
                                                          ||  • “Moves like a ghost with a mission.”

======================================================    ||   =======================================================
              ▓▓▓ ENVIRONMENT CONTEXT ▓▓▓              ||                  ▓▓▓ LATEST UPDATES ▓▓▓
======================================================    ||   =======================================================
    
Galactic Sector: fractured systems                        ||  • Subject’s face has NEVER been officially recorded
Atmosphere.....: neon cities, dying stations,             ||    → No facial ID possible
                smoke-filled bars, drifting cargo         ||    → No composite sketch available
Population.....: mixed — humans, synthetics, aliens       ||  • Movements increased significantly in recent cycles
Cultural Notes.: trap-soul / R&B textures                 ||  • Appears active, purposeful — “in motion more than ever”
                muted drums, reversed pads,               ||  • Rumors suggest he is following a trail (unknown target)
                slow reverb-heavy vocals                  ||  
    
Subject navigates these environments effortlessly.        ||
Locations where Bryson Tiller, Tory Lanez,                ||
and early Drake energy resonate culturally                ||
======================================================    ||   =======================================================
                                      END OF RECORD — ENTITY_LOG_00047
======================================================================================================================

\n\n`;

    await type(text_2, terminal);

    // Ajuste la hauteur automatiquement à la taille du contenu
    const crt = document.getElementById("crt");
    crt.style.height = terminal.scrollHeight + "px";
}

// click listener
document.getElementById("startButton").addEventListener("click", start);

