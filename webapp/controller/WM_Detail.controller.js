sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Detail", {

		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("workOrderDetail").attachPatternMatched(this._onRouteMatched, this);
		},

		/*	onListItemPress: function (oEvent) {
				var data = this.getView().getModel("WODetModel").getData().NVHEADERTOCOMPONENTS.results;
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woComponentModel");
				//var data = this.getView().getModel("WOModel").getData()[this.selectedWorkOrder].NVHEADERTOCOMPONENTS.results;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("componentMasterDetail");
			},*/
		onListItemPress: function (oEvent) {
			var data = this.getView().getModel("WODetModel").getData().NVHEADERTOCOMPONENTS.results;
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woComponentModel");
			/*	//var data = this.getView().getModel("WOModel").getData()[this.selectedWorkOrder].NVHEADERTOCOMPONENTS.results;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("componentMasterDetail");*/
			if (!this.compDialog) {
				this.compDialog = sap.ui.xmlfragment("ZWMReplacement.fragments.componentsDialog", this);
				this.getView().addDependent(this.compDialog);
			}
			var selObj = oEvent.mParameters.listItem.getBindingContext("WODetModel").getObject();
			//sap.ui.getCore().byId("componentsSFId")
			selObj.editable = false;
			var clonedObj = $.extend({}, true, selObj);
			this.compDialog.setModel(new JSONModel(clonedObj), "ComponentDetailModel");
			sap.ui.getCore().byId("componentsSFId").bindElement("/");
			this.compDialog.open(); //
		},

		onListItemPressOperations: function (oEvent) {
			var data = this.getView().getModel("WODetModel").getData().NVHEADERTOOPERATIONS.results;
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woOperationModel");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("operationMasterDetail");
		},

		/*	onPressEdit: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("editWO");
			},*/
		onPressEdit: function (oEvent) {
			/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("editWO");*/
			oEvent.oSource.setVisible(false);
			//this.detailNoteDataFixed = $.extend([],true,sap.ui.getCore().getModel("detailNotesData").getData());
			/*sap.ui.getCore().getModel("detailEditNoteModel").setProperty("/enable",true);
			sap.ui.getCore().getModel("detailEditNoteModel").setProperty("/btnVisibility",true);*/
			this.getView().getModel("detailEditNoteModel").setProperty("/enable", true);
			this.getView().getModel("detailEditNoteModel").setProperty("/btnVisibility", true);
		},
		/*	_onRouteMatched: function (oEvent) {
				var detailData = oEvent.getParameter("arguments");
				this.selectedWorkOrder = detailData.WONum;
				var model = this.getView().getModel("WOModel").getData()[detailData.WONum];
				var jsonModel = new sap.ui.model.json.JSONModel(model);
				this.getView().setModel(jsonModel, "WODetModel");
			},*/
		_onRouteMatched: function (oEvent) {
			var detailData = oEvent.getParameter("arguments");
			this.selectedWorkOrder = detailData.WONum;
			var model = this.getView().getModel("WOModel").getData()[detailData.WONum];
			var jsonModel = new sap.ui.model.json.JSONModel(model);
			this.getView().setModel(jsonModel, "WODetModel");
			/*var detailEditNoteData = {
				enable:false,
				btnVisibility:false
			};
			this.getModel("detailEditNoteModel").setData(new JSONModel(detailEditNoteData));*/
			//sap.ui.getCore().setModel(new JSONModel([]), "detailNotesData");
		},
		dateFormatter: function (value1, value2) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy"
			});
			var date = oDateFormat.format(new Date(value1));

			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "HH:mm:ss"
			});
			if (value2 != undefined) {
				var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
				var timeStr = timeFormat.format(new Date(value2 + TZOffsetMs));
			}
			return date + " " + timeStr;
		},
		onCloseCompDialog: function () {
			this.compDialog.close();
		}

	});

});