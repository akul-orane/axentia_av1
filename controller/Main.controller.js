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

      // Set default parameters for better performance
      oModel.setSizeLimit(1000);

      // Attach error handler for the model
      oModel.attachRequestFailed(this.onModelError.bind(this));

      MessageToast.show("Loading Business Partners from OData service...");
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
      var oError = oEvent.getParameter("message");
      var sDetails = oEvent.getParameter("response") ? oEvent.getParameter("response").statusCode + " - " + oEvent.getParameter("response").statusText : "";

      MessageBox.error("OData Service Error:\n\n" + oError + "\n\n" + sDetails, {
        title: "Connection Issue",
        details: "Please check:\n1. Your SAP system is running\n2. The service /sap/opu/odata/sap/API_BUSINESS_PARTNER/ is active\n3. You are logged in with proper authorizations\n4. The OData URI in manifest.json is correct"
      });
    }

  });
});
