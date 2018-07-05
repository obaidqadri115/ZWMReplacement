sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.OperationDetail", {
		
		onInit:function(){
			debugger;
				this.getOwnerComponent().getRouter().getRoute("operationDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(e) {
			if (e.mParameters.name === "operationDetail") {
				debugger;
				var DetailData = sap.ui.getCore().getModel("woOperationModel").getData()[e.mParameters.arguments.operationNum];
				this.getView().setModel(new JSONModel(DetailData), "operationDetailModel");
			}
		}
	
	});

});