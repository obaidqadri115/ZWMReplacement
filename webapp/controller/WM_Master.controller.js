sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Master", {

		onInit: function () {

			this.getOwnerComponent().getRouter().getRoute("master").attachPatternMatched(this._onRouteMatched, this);
			/*	var oWMModel = sap.ui.getCore().getModel("WOModel");	
				this.getView().setModel(oWMModel);*/
		},

		onAfterRendering: function () {
			//var oWMModel = this .getView().getModel("WOModel");
			//var data = oWMModel.getData()[0];
			this.getOwnerComponent().getRouter().navTo("workOrderDetail", {
				WONum: "0"
			});
		},

		onSelectionChange: function (oEvent) {
			//var oWMModel = this .getView().getModel("WOModel");
			var sOrderPath = oEvent.getSource()._aSelectedPaths[0];

			//var data = oWMModel.getProperty(sOrderPath);
			this.getOwnerComponent().getRouter().navTo("workOrderDetail", {
				WONum: sOrderPath.split("/")[1]
			});
		},
		dateFormatter: function (value1) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy"
			});
			var date = oDateFormat.format(new Date(value1));
			return date;
		},
		piority:function(val){
			if(val == ""){
				val = "None"
			}else {
				val = val.split("-")[1];
			}
			return val;
		}
	});

});