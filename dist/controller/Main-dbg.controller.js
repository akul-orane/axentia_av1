sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("com.demo.fioriapp.controller.Main", {

    onInit: function () {
      var oModel = this.getView().getModel();
      if (!oModel) {
        console.error("ODataModel not found in view");
        return;
      }
      this._oModel = oModel;

      try {
        oModel.setSizeLimit(1000);
        oModel.attachRequestFailed(this.onModelError.bind(this));
        MessageToast.show("Loading data from Z_CDS_AKULPRACT_CDS...");
      } catch (e) {
        console.error("Error initializing model:", e);
      }
    },

    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
      var oTable = this.byId("mainTable");
      var oBinding = oTable.getBinding("items");

      if (!oBinding) return;

      if (sQuery && sQuery.length > 0) {
        var aFilters = [
          new Filter("BillingDocument", FilterOperator.Contains, sQuery),
          new Filter("CustomerName", FilterOperator.Contains, sQuery),
          new Filter("MaterialDescription", FilterOperator.Contains, sQuery)
        ];
        oBinding.filter(new Filter({ filters: aFilters, and: false }));
      } else {
        oBinding.filter([]);
      }
    },

    onRefresh: function () {
      var oTable = this.byId("mainTable");
      var oBinding = oTable.getBinding("items");
      if (oBinding) oBinding.refresh();
      MessageToast.show("Data refreshed");
    },

    onItemPress: function (oEvent) {
      var sId = oEvent.getSource().getBindingContext().getProperty("ID");
      MessageBox.information("Record selected: " + sId);
    },

    onModelError: function (oEvent) {
      var oError = oEvent.getParameter("message") || "Unknown error";
      MessageBox.error("Failed to load data from OData service", {
        title: "Connection Error",
        details: "Service URL: /sap/opu/odata/sap/Z_CDS_AKULPRACT_CDS/\n\nError: " + oError + 
                 "\n\nPossible causes:\n• Not connected to company network/VPN\n• Service not activated\n• Missing authorization on the CDS view"
      });
    }

  });
});
