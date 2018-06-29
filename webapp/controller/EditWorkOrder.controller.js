sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.EditWorkOrder", {

	onPressEditBack:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this).navTo("workOrderMainTab");
		}


	});

});