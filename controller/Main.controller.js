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
      this._oModel = oModel;

      oModel.setSizeLimit(1000);
      oModel.attachRequestFailed(this.onModelError.bind(this));

      MessageToast.show("Connecting to Z_CDS_AKULPRACT_CDS service...");
    },

    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
      var oTable = this.byId("bpTable");
      var oBinding = oTable.getBinding("items");

      if (!oBinding) {
        return;
      }

      if (sQuery && sQuery.length > 0) {
        var aFilters = [
          new Filter("BusinessPartner", FilterOperator.Contains, sQuery),
          new Filter("BusinessPartnerFullName", FilterOperator.Contains, sQuery)
        ];
        var oFilter = new Filter({
          filters: aFilters,
          and: false
        });
        oBinding.filter(oFilter);
      } else {
        oBinding.filter([]);
      }
    },

    onRefresh: function () {
      var oTable = this.byId("bpTable");
      var oBinding = oTable.getBinding("items");

      if (oBinding) {
        oBinding.refresh();
      }
      MessageToast.show("Data refreshed");
    },

    onItemPress: function (oEvent) {
      var oItem = oEvent.getSource();
      var oContext = oItem.getBindingContext();
      var sBPId = oContext.getProperty("BusinessPartner");

      MessageBox.information("Selected Business Partner: " + sBPId + "\n\n" +
        "In a real Fiori app this would open a detail page or Object Page.");
    },

    onCreatePress: function () {
      MessageBox.information(
        "Create Business Partner functionality would be implemented here.\n\n" +
        "This typically uses OData.create() or navigates to a Create dialog/Object Page."
      );
    },

    onModelError: function (oEvent) {
      var oError = oEvent.getParameter("message") || "Unknown error";
      var oResponse = oEvent.getParameter("response");
      var sDetails = oResponse ? 
        (oResponse.statusCode || "") + " " + (oResponse.statusText || "") : "";

      MessageBox.error("Failed to load data from OData service", {
        title: "OData Error",
        details: "URL: https://npsap01.namdhariseeds.com:44310/sap/opu/odata/sap/Z_CDS_AKULPRACT_CDS/\n\n" +
                 "Error: " + oError + "\n" + sDetails + "\n\n" +
                 "Check:\n" +
                 "• You are on the company network / VPN\n" +
                 "• The service Z_CDS_AKULPRACT_CDS is active\n" +
                 "• You have proper authorizations on the CDS view"
      });
    }

  });
});
