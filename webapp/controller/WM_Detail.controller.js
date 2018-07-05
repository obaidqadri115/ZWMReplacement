sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Detail", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("workOrderDetail").attachPatternMatched(this._onRouteMatched, this);
		},

		onListItemPress: function(oEvent) {
			var data = this.getView().getModel("WODetModel").getData().NVHEADERTOCOMPONENTS.results;
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woComponentModel");
			//var data = this.getView().getModel("WOModel").getData()[this.selectedWorkOrder].NVHEADERTOCOMPONENTS.results;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("componentMasterDetail");
		},

		onListItemPressOperations: function(oEvent) {
			var data = this.getView().getModel("WODetModel").getData().NVHEADERTOOPERATIONS.results;
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woOperationModel");
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("operationMasterDetail");
		},
		
		onPressEdit: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("editWO");
		},
		_onRouteMatched: function(oEvent) {
			var detailData = oEvent.getParameter("arguments");
			this.selectedWorkOrder = detailData.WONum;
			var model = this.getView().getModel("WOModel").getData()[detailData.WONum];
			var jsonModel = new sap.ui.model.json.JSONModel(model);
			this.getView().setModel(jsonModel, "WODetModel");
		},
		dateFormatter: function(value1,value2) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy"
			});
			var date = oDateFormat.format(new Date(value1));

			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "HH:mm:ss"
			});
			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			var timeStr = timeFormat.format(new Date(value2 + TZOffsetMs));
			return date +" "+ timeStr;

		}

	});

});