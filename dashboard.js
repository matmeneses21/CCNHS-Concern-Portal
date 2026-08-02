/* ==========================================
   CCNHS Concern System
   dashboard.js
   Part 1A
   Firebase Initialization & Live Reports
========================================== */

import { db } from "./firebase.js";

import {

    collection,

    query,

    orderBy,

    onSnapshot

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// Global Variables
// ==========================================

let reports = [];

// ==========================================
// HTML Elements
// ==========================================

const reportsTable =
    document.getElementById("reportsTable");

const totalReports =
    document.getElementById("totalReports");

const pendingReports =
    document.getElementById("pendingReports");

const resolvedReports =
    document.getElementById("resolvedReports");

const highPriorityReports =
    document.getElementById("highPriorityReports");

const notificationBadge =
    document.querySelector(".badge");

// ==========================================
// Initialize Dashboard
// ==========================================

window.addEventListener("load",()=>{

    console.log(

        "Dashboard Initialized"

    );

    loadReports();

});

// ==========================================
// Load Reports
// ==========================================

function loadReports(){

    const reportsRef =

        collection(db,"reports");

    const reportsQuery =

        query(

            reportsRef,

            orderBy(

                "createdAt",

                "desc"

            )

        );

    onSnapshot(

        reportsQuery,

        (snapshot)=>{

            reports = [];

            snapshot.forEach((doc)=>{

                reports.push({

                    id:doc.id,

                    ...doc.data()

                });

            });

            console.log(

                "Reports Loaded:",

                reports.length

            );

            updateDashboard();

        },

        (error)=>{

            console.error(

                "Firestore Error:",

                error

            );

        }

    );

}

// ==========================================
// Update Dashboard
// ==========================================

function updateDashboard(){

    updateStatistics();

    renderReportsTable();

}

// ==========================================
// Placeholder Functions
// (Completed in Part 1B)
// ==========================================

function updateStatistics(){

}

function renderReportsTable(){

}

/* ==========================================
   dashboard.js
   Part 1B
   Statistics & Reports Table
========================================== */

// ==========================================
// Update Statistics
// ==========================================

function updateStatistics(){

    const total = reports.length;

    const pending = reports.filter(

        report => report.status === "Pending"

    ).length;

    const resolved = reports.filter(

        report => report.status === "Resolved"

    ).length;

    const high = reports.filter(

        report => report.priority === "High"

    ).length;

    totalReports.textContent = total;

    pendingReports.textContent = pending;

    resolvedReports.textContent = resolved;

    highPriorityReports.textContent = high;

    if(notificationBadge){

        notificationBadge.textContent = pending;

    }

}

// ==========================================
// Render Reports Table
// ==========================================

function renderReportsTable(){

    if(!reportsTable){

        return;

    }

    reportsTable.innerHTML = "";

    reports.forEach(report=>{

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${formatDate(report.createdAt)}</td>

            <td>${report.name || "Anonymous"}</td>

            <td>${report.section || "-"}</td>

            <td>${report.category}</td>

            <td>

                <span class="priority ${String(report.priority).toLowerCase()}">

                    ${report.priority}

                </span>

            </td>

            <td>

                <span class="status ${String(report.status).toLowerCase()}">

                    ${report.status}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button

                        class="view-btn"

                        data-id="${report.id}"

                    >

                        View

                    </button>

                    <button

                        class="resolve-btn"

                        data-id="${report.id}"

                    >

                        Resolve

                    </button>

                    <button

                        class="delete-btn"

                        data-id="${report.id}"

                    >

                        Delete

                    </button>

                </div>

            </td>

        `;

        reportsTable.appendChild(row);

    });

    attachButtonEvents();

}

// ==========================================
// Format Firestore Date
// ==========================================

function formatDate(timestamp){

    if(!timestamp){

        return "N/A";

    }

    if(timestamp.toDate){

        return timestamp.toDate()

        .toLocaleString();

    }

    return "N/A";

}

// ==========================================
// Attach Button Events
// ==========================================

function attachButtonEvents(){

    document

    .querySelectorAll(".view-btn")

    .forEach(button=>{

        button.onclick=()=>{

            viewReport(

                button.dataset.id

            );

        };

    });

    document

    .querySelectorAll(".resolve-btn")

    .forEach(button=>{

        button.onclick=()=>{

            resolveReport(

                button.dataset.id

            );

        };

    });

    document

    .querySelectorAll(".delete-btn")

    .forEach(button=>{

        button.onclick=()=>{

            deleteReport(

                button.dataset.id

            );

        };

    });

}

// ==========================================
// Placeholder Functions
// ==========================================

function viewReport(id){

    console.log(

        "View Report:",

        id

    );

}

function resolveReport(id){

    console.log(

        "Resolve Report:",

        id

    );

}

function deleteReport(id){

    console.log(

        "Delete Report:",

        id

    );

}

/* ==========================================
   dashboard.js
   Part 1C
   Search, Filters & Refresh
========================================== */

// ==========================================
// HTML Elements
// ==========================================

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const priorityFilter =
    document.getElementById("priorityFilter");

const refreshButton =
    document.getElementById("refreshBtn");

// ==========================================
// Search & Filter
// ==========================================

function filterReports(){

    let filteredReports = [...reports];

    // Search

    const keyword =
        searchInput.value
        .trim()
        .toLowerCase();

    if(keyword !== ""){

        filteredReports =
            filteredReports.filter(report=>{

                return (

                    (report.name || "")
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    (report.section || "")
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    (report.category || "")
                    .toLowerCase()
                    .includes(keyword)

                );

            });

    }

    // Status

    if(statusFilter.value !== "all"){

        filteredReports =
            filteredReports.filter(report=>{

                return report.status ===
                    statusFilter.value;

            });

    }

    // Priority

    if(priorityFilter.value !== "all"){

        filteredReports =
            filteredReports.filter(report=>{

                return report.priority ===
                    priorityFilter.value;

            });

    }

    displayFilteredReports(filteredReports);

}

// ==========================================
// Display Filtered Reports
// ==========================================

function displayFilteredReports(filteredReports){

    reportsTable.innerHTML = "";

    filteredReports.forEach(report=>{

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${formatDate(report.createdAt)}</td>

            <td>${report.name || "Anonymous"}</td>

            <td>${report.section || "-"}</td>

            <td>${report.category}</td>

            <td>

                <span class="priority ${String(report.priority).toLowerCase()}">

                    ${report.priority}

                </span>

            </td>

            <td>

                <span class="status ${String(report.status).toLowerCase()}">

                    ${report.status}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        data-id="${report.id}">

                        View

                    </button>

                    <button
                        class="resolve-btn"
                        data-id="${report.id}">

                        Resolve

                    </button>

                    <button
                        class="delete-btn"
                        data-id="${report.id}">

                        Delete

                    </button>

                </div>

            </td>

        `;

        reportsTable.appendChild(row);

    });

    attachButtonEvents();

}

// ==========================================
// Event Listeners
// ==========================================

searchInput.addEventListener(

    "keyup",

    filterReports

);

statusFilter.addEventListener(

    "change",

    filterReports

);

priorityFilter.addEventListener(

    "change",

    filterReports

);

// ==========================================
// Refresh Dashboard
// ==========================================

refreshButton.addEventListener(

    "click",

    ()=>{

        renderReportsTable();

        updateStatistics();

        alert(

            "Dashboard refreshed successfully."

        );

    }

);

// ==========================================
// Console
// ==========================================

console.log(

    "Search & Filters Ready"

);

/* ==========================================
   dashboard.js
   Part 2A
   View, Resolve & Delete Reports
========================================== */

import {

    doc,

    getDoc,

    updateDoc,

    deleteDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// View Report
// ==========================================

async function viewReport(id){

    try{

        const reportRef =

            doc(db,"reports",id);

        const reportSnap =

            await getDoc(reportRef);

        if(!reportSnap.exists()){

            alert(

                "Report not found."

            );

            return;

        }

        const report =

            reportSnap.data();

        sessionStorage.setItem(

            "selectedReport",

            JSON.stringify({

                id:id,

                ...report

            })

        );

        window.location.href =

            "report.html";

    }catch(error){

        console.error(error);

        alert(

            "Unable to open report."

        );

    }

}

// ==========================================
// Resolve Report
// ==========================================

async function resolveReport(id){

    const confirmResolve =

        confirm(

            "Mark this report as Resolved?"

        );

    if(!confirmResolve){

        return;

    }

    try{

        const reportRef =

            doc(db,"reports",id);

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

    }catch(error){

        console.error(error);

        alert(

            "Unable to update report."

        );

    }

}

// ==========================================
// Delete Report
// ==========================================

async function deleteReport(id){

    const confirmDelete =

        confirm(

            "Delete this report permanently?"

        );

    if(!confirmDelete){

        return;

    }

    try{

        const reportRef =

            doc(db,"reports",id);

        await deleteDoc(

            reportRef

        );

        alert(

            "Report deleted successfully."

        );

    }catch(error){

        console.error(error);

        alert(

            "Unable to delete report."

        );

    }

}

// ==========================================
// Statistics Refresh
// ==========================================

async function refreshStatistics(){

    updateStatistics();

    renderReportsTable();

}

// ==========================================
// Dashboard Ready
// ==========================================

console.log(

    "Report Actions Ready"

);

/* ==========================================
   dashboard.js
   Part 2B
   Export, Notifications & Activity
========================================== */

// ==========================================
// Export Reports to CSV
// ==========================================

const exportBtn =
    document.getElementById("exportBtn");

if(exportBtn){

    exportBtn.addEventListener(

        "click",

        exportReports

    );

}

function exportReports(){

    if(reports.length === 0){

        alert(

            "No reports available."

        );

        return;

    }

    let csv =

        "Date,Name,Section,Category,Priority,Status\n";

    reports.forEach(report=>{

        csv += `"${formatDate(report.createdAt)}",`;

        csv += `"${report.name || "Anonymous"}",`;

        csv += `"${report.section || "-"}",`;

        csv += `"${report.category}",`;

        csv += `"${report.priority}",`;

        csv += `"${report.status}"\n`;

    });

    const blob =

        new Blob(

            [csv],

            {

                type:"text/csv"

            }

        );

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download =

        "CCNHS_Student_Reports.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

// ==========================================
// Recent Activity
// ==========================================

function updateRecentActivity(){

    const activity =

        document.getElementById(

            "activityList"

        );

    if(!activity){

        return;

    }

    activity.innerHTML = "";

    reports.slice(0,5).forEach(report=>{

        const item =

            document.createElement("div");

        item.className =

            "activity-item";

        item.innerHTML = `

            <div class="activity-icon">

                <i class="fas fa-file-circle-plus"></i>

            </div>

            <div class="activity-content">

                <h4>

                    ${report.category}

                </h4>

                <p>

                    ${report.name || "Anonymous"}

                    submitted a concern.

                </p>

                <small>

                    ${formatDate(report.createdAt)}

                </small>

            </div>

        `;

        activity.appendChild(item);

    });

}

// ==========================================
// Notification Badge
// ==========================================

function updateNotifications(){

    if(notificationBadge){

        const pending =

            reports.filter(

                report=>

                report.status==="Pending"

            ).length;

        notificationBadge.textContent =

            pending;

    }

}

// ==========================================
// Override Dashboard Update
// ==========================================

const oldUpdateDashboard =

    updateDashboard;

updateDashboard = function(){

    oldUpdateDashboard();

    updateRecentActivity();

    updateNotifications();

};

// ==========================================
// Refresh Button
// ==========================================

const refreshBtn =

    document.getElementById(

        "refreshBtn"

    );

if(refreshBtn){

    refreshBtn.addEventListener(

        "click",

        ()=>{

            updateDashboard();

            alert(

                "Dashboard refreshed successfully."

            );

        }

    );

}

// ==========================================
// Dashboard Ready
// ==========================================

console.log(

    "CCNHS Dashboard Fully Loaded"

);