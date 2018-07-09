sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.DetailTab", {
		onInit: function () {
			//sap.ui.getCore().setModel(new JSONModel([]), "detailEditNoteModel");	
		},
		onAfterRendering: function () {
			var detailEditNoteData = {
				enable: false,
				btnVisibility: false,
				editBtn: true
			};
			/*	this.getView().setModel(new JSONModel(detailEditNoteData),"detailEditNoteModel");*/
			this.getOwnerComponent().getModel("detailEditNoteModel").setData(detailEditNoteData);
			//this.getView().getModel("detailEditNoteModel").getData()
		},
		onSaveDetailNotes: function (oEvent) {
			debugger;
			var that = this;
			this.getView().setBusy(true);
			var odatamodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZEAM_066_WM_FIORI_APP_SRV");
			var data = {
				Aufnr: "000001005836",
				NVHEADERTOWONOTES: [{
					"Objtype": "",
					"Objkey": "",
					"FormatCol": "*",
					"TextLine": "Test"
				}]
			};
			var path = "/HeaderSet"
			odatamodel.create(path, data, {
				success: function (odata, responce) {
					debugger;
					var detailEditNoteData = {
						enable: false,
						btnVisibility: false,
						editBtn: true
					};
					that.getOwnerComponent().getModel("detailEditNoteModel").setData(detailEditNoteData);
					that.getView().setBusy(false);
				},
				error: function (error) {
					debugger;
						var detailEditNoteData = {
						enable: true,
						btnVisibility: true,
						editBtn: false
					};
					that.getOwnerComponent().getModel("detailEditNoteModel").setData(detailEditNoteData);
					that.getView().setBusy(false);
				}
			});

		},
		onCancelDetailNotes: function (oEvent) {
			//	sap.ui.getCore().getModel("detailNotesData").setData(new JSONModel(this.detailNoteDataFixed));
			//	this.byId("editBtnId").setVisible(true);
			this.getView().getModel("detailEditNoteModel").setProperty("/editBtn", true);
			this.getView().getModel("detailEditNoteModel").setProperty("/enable", false);
			this.getView().getModel("detailEditNoteModel").setProperty("/btnVisibility", false);
		}
	});

});