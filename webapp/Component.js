sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZWMReplacement/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models,JSONModel) {
	"use strict";

	return UIComponent.extend("ZWMReplacement.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
			
		var data;
			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV");
			odatamodel.read(
				"/UserSet?$filter=Userid eq '11133536'&$expand=OPERATIONSSET,RETURNSET",
				null, null, false,
				function(responce) {
					console.log(responce.results[0]);
					data = responce.results[0];
				},
				function(error) {
					console.log(error);
				});
			var oprset;
			var rlength = data.RETURNSET.results.length;
			if ((rlength === null) || (rlength === "") || (rlength === 0)) {
				oprset = data.OPERATIONSSET;
			} else {
				oprset = data.RETURNSET.results;

			}
			var jModel = new JSONModel(oprset); 
			this.setModel(jModel); 

		}
	});
});