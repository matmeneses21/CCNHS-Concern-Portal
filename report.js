/* ==========================================
   CCNHS Concern System
   reports.js
   Part 1A
   Load Selected Report
========================================== */

import { db } from "./firebase.js";

import {

    doc,

    getDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// Get Selected Report
// ==========================================

const storedReport =

    JSON.parse(

        sessionStorage.getItem(

            "selectedReport"

        )

    );

// ==========================================
// If No Report Selected
// ==========================================

if(!storedReport){

    alert(

        "No report selected."

    );

    window.location.href =

        "dashboard.html";

}

// ==========================================
// HTML Elements
// ==========================================

const studentName =
    document.getElementById("studentName");

const studentSection =
    document.getElementById("studentSection");

const studentEmail =
    document.getElementById("studentEmail");

const studentPhone =
    document.getElementById("studentPhone");

const reportCategory =
    document.getElementById("reportCategory");

const reportPriority =
    document.getElementById("reportPriority");

const reportStatus =
    document.getElementById("reportStatus");

const reportDate =
    document.getElementById("reportDate");

const reportDescription =
    document.getElementById("reportDescription");

// ==========================================
// Load Report From Firestore
// ==========================================

window.addEventListener(

    "load",

    loadReport

);

async function loadReport(){

    try{

        const reportRef =

            doc(

                db,

                "reports",

                storedReport.id

            );

        const reportSnap =

            await getDoc(

                reportRef

            );

        if(!reportSnap.exists()){

            alert(

                "Report not found."

            );

            window.location.href =

                "dashboard.html";

            return;

        }

        const report =

            reportSnap.data();

        displayReport(report);

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to load report."

        );

    }

}

// ==========================================
// Placeholder
// (Completed in Part 1B)
// ==========================================

function displayReport(report){

    console.log(report);

}

/* ==========================================
   reports.js
   Part 1B
   Display Report Details & Attachment
========================================== */

// ==========================================
// Attachment Elements
// ==========================================

const attachmentImage =
    document.getElementById("attachmentImage");

const attachmentPDF =
    document.getElementById("attachmentPDF");

const downloadAttachment =
    document.getElementById("downloadAttachment");

const noAttachment =
    document.getElementById("noAttachment");

// ==========================================
// Display Report
// ==========================================

function displayReport(report){

    // Student Information

    studentName.textContent =
        report.name || "Anonymous";

    studentSection.textContent =
        report.section || "N/A";

    studentEmail.textContent =
        report.email || "N/A";

    studentPhone.textContent =
        report.phone || "N/A";

    // Concern Information

    reportCategory.textContent =
        report.category || "N/A";

    reportPriority.textContent =
        report.priority || "Low";

    reportStatus.textContent =
        report.status || "Pending";

    reportDescription.textContent =
        report.description || "No description provided.";

    // Date Submitted

    if(report.createdAt?.toDate){

        reportDate.textContent =

            report.createdAt

            .toDate()

            .toLocaleString();

    }else{

        reportDate.textContent =

            "N/A";

    }

    // Badge Colors

    reportPriority.className =
        "priority " +
        String(report.priority || "low")
        .toLowerCase();

    reportStatus.className =
        "status " +
        String(report.status || "pending")
        .toLowerCase();

    // Attachment

    loadAttachment(

        report.attachmentURL,

        report.attachmentType

    );

}

// ==========================================
// Load Attachment
// ==========================================

function loadAttachment(

    url,

    type

){

    // Hide everything first

    attachmentImage.style.display =

        "none";

    attachmentPDF.style.display =

        "none";

    downloadAttachment.style.display =

        "none";

    noAttachment.style.display =

        "block";

    if(!url){

        return;

    }

    downloadAttachment.href = url;

    downloadAttachment.style.display =

        "inline-flex";

    noAttachment.style.display =

        "none";

    if(

        type &&

        type.startsWith("image")

    ){

        attachmentImage.src = url;

        attachmentImage.style.display =

            "block";

    }

    else if(

        type ===

        "application/pdf"

    ){

        attachmentPDF.src = url;

        attachmentPDF.style.display =

            "block";

    }

    else{

        noAttachment.style.display =

            "block";

    }

}

/* ==========================================
   reports.js
   Part 1C
   Resolve, Delete & Print Report
========================================== */

import {

    doc,

    updateDoc,

    deleteDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// HTML Elements
// ==========================================

const resolveBtn =
    document.getElementById("resolveBtn");

const deleteBtn =
    document.getElementById("deleteBtn");

const printBtn =
    document.getElementById("printBtn");

// ==========================================
// Resolve Report
// ==========================================

if(resolveBtn){

    resolveBtn.addEventListener(

        "click",

        resolveReport

    );

}

async function resolveReport(){

    const confirmResolve =

        confirm(

            "Mark this report as resolved?"

        );

    if(!confirmResolve){

        return;

    }

    try{

        const reportRef =

            doc(

                db,

                "reports",

                storedReport.id

            );

        await updateDoc(

            reportRef,

            {

                status:"Resolved",

                resolvedAt:new Date()

            }

        );

        alert(

            "Report marked as resolved."

        );

        window.location.href =

            "dashboard.html";

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to update report."

        );

    }

}

// ==========================================
// Delete Report
// ==========================================

if(deleteBtn){

    deleteBtn.addEventListener(

        "click",

        deleteReport

    );

}

async function deleteReport(){

    const confirmDelete =

        confirm(

            "Delete this report permanently?"

        );

    if(!confirmDelete){

        return;

    }

    try{

        const reportRef =

            doc(

                db,

                "reports",

                storedReport.id

            );

        await deleteDoc(

            reportRef

        );

        sessionStorage.removeItem(

            "selectedReport"

        );

        alert(

            "Report deleted successfully."

        );

        window.location.href =

            "dashboard.html";

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to delete report."

        );

    }

}

// ==========================================
// Print Report
// ==========================================

if(printBtn){

    printBtn.addEventListener(

        "click",

        ()=>{

            window.print();

        }

    );

}

// ==========================================
// Dashboard Shortcut
// ==========================================

document.addEventListener(

    "keydown",

    (event)=>{

        if(event.key==="Escape"){

            window.location.href =

                "dashboard.html";

        }

    }

);

// ==========================================
// Console
// ==========================================

console.log(

    "Report Viewer Ready"

);