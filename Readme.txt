====================================================
CCNHS CONCERN SYSTEM
Student Concern Reporting System
Version 1.0
====================================================

Developer:
Mat

====================================================
PROJECT DESCRIPTION
====================================================

The CCNHS Concern System is a web-based application
that allows students to submit concerns online while
providing administrators with a secure dashboard to
review, manage, resolve, and delete reports.

The system uses Firebase Authentication and
Cloud Firestore as its backend database.

====================================================
FEATURES
====================================================

STUDENT PORTAL

✓ Submit student concerns
✓ Upload evidence (optional)
✓ Responsive design
✓ Modern glassmorphism interface

ADMIN PORTAL

✓ Secure Firebase Authentication
✓ Dashboard
✓ View all reports
✓ Search reports
✓ Filter reports
✓ Resolve reports
✓ Delete reports
✓ View report details
✓ Export reports to CSV
✓ Print reports
✓ Real-time updates

====================================================
PROJECT STRUCTURE
====================================================

CCNHS-Concern-System/

│
├── index.html
├── admin.html
├── dashboard.html
├── report.html
│
├── style.css
├── admin.css
├── dashboard.css
├── report.css
│
├── app.js
├── firebase.js
├── auth.js
├── dashboard.js
├── reports.js
│
├── firestore.rules
└── README.txt

====================================================
REQUIREMENTS
====================================================

Google Chrome
Visual Studio Code (recommended)

Firebase Project

Firestore Database

Firebase Authentication

Firebase Storage (optional)

Internet Connection

====================================================
FIREBASE SETUP
====================================================

1. Go to Firebase Console

2. Create a new project.

3. Enable Firestore Database.

4. Enable Authentication.

5. Enable Email/Password Sign-in.

6. Enable Firebase Storage
   (if attachments are used).

7. Copy your Firebase configuration.

8. Paste the configuration into:

firebase.js

====================================================
CREATE THE FIRST ADMIN
====================================================

Open Firebase Console

Authentication

Users

Add User

Email:
admin@ccnhs.edu.ph

Password:
Create your own secure password.

Use these credentials to log in through
admin.html.

====================================================
HOW TO RUN
====================================================

Method 1 (Recommended)

Open the project in Visual Studio Code.

Install the Live Server extension.

Right-click index.html.

Select "Open with Live Server".

Method 2

Upload the project to Firebase Hosting.

====================================================
SYSTEM WORKFLOW
====================================================

Student opens index.html

↓

Student submits concern

↓

Report is saved to Firestore

↓

Administrator logs in

↓

Dashboard loads reports

↓

Administrator reviews report

↓

Administrator resolves or deletes report

====================================================
SECURITY
====================================================

Authentication protects the Admin Portal.

Firestore Rules prevent unauthorized access.

Only authenticated administrators can
read, update, or delete reports.

====================================================
TROUBLESHOOTING
====================================================

Dashboard not loading?

• Check firebase.js
• Check Firestore Rules
• Check internet connection

Login not working?

• Verify Email/Password sign-in is enabled.
• Confirm the admin account exists.

Reports not appearing?

• Verify reports are saved in the
  "reports" collection.

Images not showing?

• Check Firebase Storage.
• Verify attachment URLs are valid.

====================================================
FUTURE IMPROVEMENTS
====================================================

• Email notifications

• SMS notifications

• Student report tracking

• Admin analytics

• Charts and graphs

• PDF report export

• Multi-admin support

• Role-based permissions

• Dark mode

====================================================
END OF DOCUMENT
====================================================