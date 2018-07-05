sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function(Controller , JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.OperationMaster", {
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("operationMasterDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(e) {
			if (e.mParameters.name === "operationMasterDetail") {
				var componentData = sap.ui.getCore().getModel("woOperationModel").getData();
				this.getView().setModel(new JSONModel(componentData), "operationModel");
			}
		},
		onSelectionChange: function(e) {
			var index = e.oSource.indexOfItem(e.mParameters.listItem);
			this.getOwnerComponent().getRouter().navTo("operationDetail", {
				operationNum: index
			});
		},
		onOperationUpdateFinesh: function(e) {
			if (e.oSource.getItems().length > 0) {
				e.oSource.fireItemPress({
					listItem: e.oSource.getItems()[0],
					srcControl:e.oSource.getItems()[0]
				});
				e.oSource.getItems()[0].setSelected(true);
			}
		}
	
	});

});