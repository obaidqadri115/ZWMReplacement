sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Master", {

		onInit: function() {

			this.getOwnerComponent().getRouter().getRoute("master").attachPatternMatched(this._onRouteMatched, this);

		},

		onSelectionChange: function(oEvent) {

			var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext().sPath;
			sOrderId = sOrderId.substring(9);
			var data = oEvent.getSource().getSelectedItem().getBindingContext().oModel.oData.results[sOrderId];
			this.getOwnerComponent().getRouter().navTo("workOrderMainTab", {
				order: sOrderId,
				orderData: data
			});
		

		}
	});

});