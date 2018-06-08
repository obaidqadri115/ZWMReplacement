sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.CompleteButtonClick", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("orderDetails").attachPatternMatched(this._onRouteMatched, this);

		},
		//Getting data from odata service
		_onRouteMatched: function(oEvent) {

			var detailData = oEvent.getParameter("arguments");

			var model = new sap.ui.model.json.JSONModel(detailData);
			this.getView().setModel(model);
		},
			onPress:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this).navTo("orderDetails");
		}
	});

});