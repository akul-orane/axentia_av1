# Fiori OData Application - Business Partners

This is a complete SAP Fiori application that consumes the standard SAP OData service `API_BUSINESS_PARTNER`.

## Features

- **Live OData Binding** to `/A_BusinessPartner` entity set
- **Search** functionality (by ID or Name)
- **Refresh** button
- **Responsive Table** with growing scroll
- **Error handling** with helpful messages
- **Click on row** to see details
- Modern SAP Fiori 3 theme

## How to Run

### Option 1: Quick Test (Local with Mock Data)

1. Open `index.html` directly in your browser
2. The app will try to connect to the OData service
3. For testing without SAP backend, you can use a mock server (see below)

### Option 2: Connect to Real SAP System (Recommended)

1. Deploy this app to your SAP BTP or SAP NetWeaver system, **OR**
2. Use a local web server with proper proxy to `/sap/opu/odata/sap/`

### Option 3: Use SAP Business Application Studio / VS Code with Live Preview

- Open this folder in SAP Business Application Studio
- Run with `index.html` preview
- Configure destination/proxy to your S/4HANA system

## Configuration

Edit `manifest.json` to change the OData service URL:

```json
"uri": "/sap/opu/odata/sap/API_BUSINESS_PARTNER/"
```

Common alternative services:
- `API_BUSINESS_PARTNER` (recommended for S/4HANA)
- `ZUI5_DEMO_SRV` (your custom service)
- Any standard or custom OData v2 service

## Next Steps for Production App

1. Add **SmartTable** or **List Report** template using SAP Fiori Elements
2. Create **Object Page** for detail view
3. Add **Create/Update/Delete** operations
4. Implement proper **authentication** and **CSRF** handling
5. Add **filter bar**, **variant management**, and **personalization**

## Project Structure

```
├── index.html                 ← Entry point (runs the Component)
├── manifest.json              ← App configuration + OData model
├── Component.js
├── views/
│   └── Main.view.xml          ← UI with Table + Search
├── controller/
│   └── Main.controller.js     ← Logic, search, error handling
└── README.md
```

**You're all set!** Open `index.html` and start exploring your Fiori OData app.

The table will automatically load data when connected to a running SAP system with the Business Partner OData service activated.
