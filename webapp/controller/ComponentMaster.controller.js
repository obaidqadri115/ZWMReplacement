sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.ComponentMaster", {
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("componentMasterDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(e) {
			if (e.mParameters.name === "componentMasterDetail") {
				var componentData = sap.ui.getCore().getModel("woComponentModel").getData();
				this.getView().setModel(new JSONModel(componentData), "ComponentModel");
			}
		},
		onSelectionChange: function(e) {
			var index = e.oSource.indexOfItem(e.mParameters.listItem);
			this.getOwnerComponent().getRouter().navTo("componentDetail", {
				WONum: index
			});
		},
		onComponentUpdateFinesh: function(e) {
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