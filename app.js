/* ==========================================
   CCNHS Concern Portal
   app.js
   Part 1A
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Form Elements
    // ==========================

    const reportForm = document.getElementById("reportForm");

    const successMessage =
        document.getElementById("successMessage");

    const totalReports =
        document.getElementById("totalReports");

    // ==========================
    // Local Report Counter
    // (Temporary until Firebase)
    // ==========================

    let reports =
        Number(localStorage.getItem("reports")) || 0;

    totalReports.textContent = reports;

    // ==========================
    // Submit Form
    // ==========================

    reportForm.addEventListener("submit", submitReport);

    function submitReport(event){

        event.preventDefault();

        // --------------------------
        // Get Values
        // --------------------------

        const name =
            document.getElementById("name").value.trim();

        const section =
            document.getElementById("section").value.trim();

        const category =
            document.getElementById("category").value;

        const description =
            document.getElementById("description").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const priority =
            document.getElementById("priority").value;

        const attachment =
            document.getElementById("attachment").files[0];

        const anonymous =
            document.querySelector(
                'input[name="anonymous"]:checked'
            ).value;

        // --------------------------
        // Validation
        // --------------------------

        if(section === ""){

            alert("Please enter your Grade & Section.");

            return;

        }

        if(category === ""){

            alert("Please select a concern category.");

            return;

        }

        if(description === ""){

            alert("Please describe your concern.");

            return;

        }

        // --------------------------
        // Report Object
        // --------------------------

        const report = {

            name:
                anonymous === "yes"
                ? "Anonymous"
                : name,

            section,

            category,

            description,

            email,

            phone,

            priority,

            anonymous,

            attachment:
                attachment
                ? attachment.name
                : null,

            status: "Pending",

            submittedAt:
                new Date().toLocaleString()

        };

        console.log(report);

                // ==========================
        // Save Report (Temporary)
        // ==========================

        let reportList =
            JSON.parse(
                localStorage.getItem("reportList")
            ) || [];

        report.id =
            Date.now();

        reportList.push(report);

        localStorage.setItem(

            "reportList",

            JSON.stringify(reportList)

        );

        // ==========================
        // Update Counter
        // ==========================

        reports++;

        localStorage.setItem(

            "reports",

            reports

        );

        totalReports.textContent =
            reports;

        // ==========================
        // Success Message
        // ==========================

        successMessage.style.color =
            "#16a34a";

        successMessage.innerHTML =

            "✅ Your concern has been submitted successfully. Thank you for speaking up!";

        // ==========================
        // Clear Form
        // ==========================

        reportForm.reset();

        document.querySelector(

            'input[name="anonymous"][value="yes"]'

        ).checked = true;

        // ==========================
        // Scroll to Message
        // ==========================

        successMessage.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

        // ==========================
        // Auto Hide Message
        // ==========================

        setTimeout(() => {

            successMessage.innerHTML = "";

        }, 5000);

        // ==========================
        // Ready for Firebase
        // ==========================

        /*
        In Part 2,
        this localStorage save will be
        replaced with:

        await addDoc(
            collection(db,"reports"),
            report
        );

        so reports are stored in
        Firebase Firestore instead of
        the browser.
        */

    }
        // ==========================
        // Validate Email
        // ==========================

        if(email !== ""){

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailPattern.test(email)){

                alert("Please enter a valid email address.");

                return;

            }

        }

        // ==========================
        // Validate Phone Number
        // ==========================

        if(phone !== ""){

            const phonePattern =
                /^09\d{9}$/;

            if(!phonePattern.test(phone)){

                alert(
                    "Please enter a valid Philippine mobile number."
                );

                return;

            }

        }

        // ==========================
        // Validate Attachment
        // ==========================

        if(attachment){

            const maxSize =
                5 * 1024 * 1024;

            if(attachment.size > maxSize){

                alert(
                    "File size must not exceed 5MB."
                );

                return;

            }

            const allowedTypes = [

                "image/jpeg",

                "image/png",

                "application/pdf",

                "application/msword",

                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

            ];

            if(!allowedTypes.includes(attachment.type)){

                alert(
                    "Unsupported file type."
                );

                return;

            }

        }

        // ==========================
        // Loading State
        // ==========================

        const submitButton =
            document.querySelector(".submit-btn");

        submitButton.disabled = true;

        submitButton.innerHTML =
            "Submitting...";

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.innerHTML =
                "Submit Report";

        },1500);

    }

    // ==========================
    // Description Character Counter
    // ==========================

    const description =
        document.getElementById("description");

    if(description){

        const counter =
            document.createElement("small");

        counter.id = "characterCounter";

        counter.style.display = "block";

        counter.style.marginTop = "8px";

        counter.style.color = "#64748b";

        description.insertAdjacentElement(

            "afterend",

            counter

        );

        description.addEventListener("input",()=>{

            counter.textContent =
                description.value.length +
                " / 1000 characters";

        });

    }

    // ==========================
    // Console Ready
    // ==========================

    console.log(

        "CCNHS Concern Portal Initialized"

    );

});

import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

await addDoc(collection(db, "reports"), {
    name: report.name,
    section: report.section,
    category: report.category,
    description: report.description,
    email: report.email,
    phone: report.phone,
    priority: report.priority,
    anonymous: report.anonymous,
    status: "Pending",
    createdAt: serverTimestamp()
});

/* ==========================================
   CCNHS Concern Portal
   app.js
   Part 2B
   Load Reports from Firestore
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================
// Load Report Counter
// ==========================

async function loadReportCounter(){

    try{

        const reportsRef = collection(db, "reports");

        const snapshot = await getDocs(reportsRef);

        const totalReports =
            document.getElementById("totalReports");

        if(totalReports){

            totalReports.textContent =
                snapshot.size;

        }

    }catch(error){

        console.error(
            "Failed to load report count:",
            error
        );

    }

}

// ==========================
// Load All Reports
// ==========================

async function loadReports(){

    try{

        const reportsRef =
            collection(db,"reports");

        const q =
            query(
                reportsRef,
                orderBy("createdAt","desc")
            );

        const snapshot =
            await getDocs(q);

        const reports = [];

        snapshot.forEach((doc)=>{

            reports.push({

                id:doc.id,

                ...doc.data()

            });

        });

        console.table(reports);

        return reports;

    }catch(error){

        console.error(
            "Error loading reports:",
            error
        );

        return [];

    }

}

// ==========================
// Initialize
// ==========================

window.addEventListener("load", async ()=>{

    await loadReportCounter();

    await loadReports();

});

/* ==========================================
   CCNHS Concern Portal
   app.js
   Part 2C
   Real-Time Firestore Updates
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================
// Listen for Live Reports
// ==========================

function listenForReports(){

    const reportsRef = collection(db, "reports");

    const q = query(

        reportsRef,

        orderBy("createdAt","desc")

    );

    onSnapshot(q,(snapshot)=>{

        const reports = [];

        snapshot.forEach((doc)=>{

            reports.push({

                id:doc.id,

                ...doc.data()

            });

        });

        updateCounter(reports);

        updateDashboard(reports);

    },(error)=>{

        console.error(

            "Realtime Listener Error:",

            error

        );

    });

}

// ==========================
// Update Homepage Counter
// ==========================

function updateCounter(reports){

    const totalReports =
        document.getElementById("totalReports");

    if(totalReports){

        totalReports.textContent =
            reports.length;

    }

}

// ==========================
// Prepare Dashboard Data
// ==========================

function updateDashboard(reports){

    const reportContainer =
        document.getElementById("reportContainer");

    if(!reportContainer){

        return;

    }

    reportContainer.innerHTML = "";

    reports.forEach((report)=>{

        const card =
            document.createElement("div");

        card.className =
            "report-card";

        card.innerHTML = `

            <h3>${report.category}</h3>

            <p>

                <strong>Name:</strong>

                ${report.name}

            </p>

            <p>

                <strong>Section:</strong>

                ${report.section}

            </p>

            <p>

                <strong>Priority:</strong>

                ${report.priority}

            </p>

            <p>

                <strong>Status:</strong>

                ${report.status}

            </p>

            <button

                class="view-btn"

                data-id="${report.id}"

            >

                View Report

            </button>

        `;

        reportContainer.appendChild(card);

    });

}

// ==========================
// Notification
// ==========================

function showNotification(message){

    const notification =
        document.createElement("div");

    notification.className =
        "notification";

    notification.textContent =
        message;

    document.body.appendChild(notification);

    setTimeout(()=>{

        notification.classList.add("show");

    },100);

    setTimeout(()=>{

        notification.classList.remove("show");

        setTimeout(()=>{

            notification.remove();

        },300);

    },3500);

}

// ==========================
// Start Listener
// ==========================

window.addEventListener("load",()=>{

    listenForReports();

    console.log(

        "Realtime Firestore Connected"

    );

});
