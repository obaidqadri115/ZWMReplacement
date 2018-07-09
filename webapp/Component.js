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
			var jModel;
			var that = this;
			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEAM_066_WM_FIORI_APP_SRV");
			odatamodel.read(
				"/HeaderSet?$filter=Userid eq '11153519'&$expand=NVHEADERTOOPERATIONS,NVHEADERTOCOMPONENTS,NVHEADERTOOBJECTS",
				null, null, false,
				function(responce) {
					console.log(responce.results);
					data = responce.results;
					//JSON.Parse(JSON.stringify(data));
					jModel = new JSONModel(data);
					that.setModel(jModel,"WOModel");
				},
				function(error) {
					console.log(error);
				});	
				that.setModel(new JSONModel({}),"detailEditNoteModel");
			}
			//this.setModel(jModel); 
			
			//var jModel1 = new JSONModel(data1); 
			//this.setModel(jModel1);
		//}
	});
});