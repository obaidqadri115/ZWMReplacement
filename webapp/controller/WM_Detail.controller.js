sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Detail", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("orderDetails").attachPatternMatched(this._onRouteMatched, this);
		},

		onListItemPress: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("componentMasterDetail");
		},
		
		onListItemPressOperations: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("operationMasterDetail");
		}

	});

});