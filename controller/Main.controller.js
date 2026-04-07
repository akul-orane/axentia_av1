sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("com.demo.fioriapp.controller.Main", {

    onInit: function () {
      var oModel = this.getView().getModel();

      oModel.read("/A_BusinessPartner", {
        success: function (oData) {
          console.log("Data loaded", oData);
        },
        error: function (oError) {
          console.error("Error", oError);
        }
      });
    }

  });
});