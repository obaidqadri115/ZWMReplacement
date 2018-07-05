sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.ComponentDetail", {
		onInit:function(){
			//debugger;
				this.getOwnerComponent().getRouter().getRoute("componentDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(e) {
			if (e.mParameters.name === "componentDetail") {
				//debugger;
				var componentDetailData = sap.ui.getCore().getModel("woComponentModel").getData()[e.mParameters.arguments.WONum];
				this.getView().setModel(new JSONModel(componentDetailData), "ComponentDetailModel");
			}
		}
	});

});