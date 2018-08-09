sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Detail", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("workOrderDetail").attachPatternMatched(this._onRouteMatched, this);
		},

		/*	onListItemPress: function (oEvent) {
				var data = this.getView().getModel("WODetModel").getData().NVHEADERTOCOMPONENTS.results;
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woComponentModel");
				//var data = this.getView().getModel("WOModel").getData()[this.selectedWorkOrder].NVHEADERTOCOMPONENTS.results;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("componentMasterDetail");
			},*/
		onListItemPress: function(oEvent) {
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

		onListItemPressOperations: function(oEvent) {
			var data = this.getView().getModel("WODetModel").getData().NVHEADERTOOPERATIONS.results;
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woOperationModel");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("operationMasterDetail");
		},

		/*	onPressEdit: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("editWO");
			},*/
		onPressEdit: function(oEvent) {
			/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("editWO");*/
			oEvent.oSource.setVisible(false);
			//this.detailNoteDataFixed = $.extend([],true,sap.ui.getCore().getModel("detailNotesData").getData());
			/*sap.ui.getCore().getModel("detailEditNoteModel").setProperty("/enable",true);
			sap.ui.getCore().getModel("detailEditNoteModel").setProperty("/btnVisibility",true);*/
			this.getView().getModel("detailEditNoteModel").setProperty("/enable", true);
			this.getView().getModel("detailEditNoteModel").setProperty("/btnVisibility", true);
		},

		onPressAdd: function(oEvent) {
			// var data = this.getView().getModel("WODetModel").getData().NVHEADERTOCOMPONENTS.results;
			// sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(data), "woComponentModel");

			var oFileUploader = sap.ui.getCore().byId("AttachUploader");

			if (!this.attachmentDialog) {
				this.attachmentDialog = sap.ui.xmlfragment("ZWMReplacement.fragments.attachment", this);
				//this.getView().addDependent(this.attachmentDialog);
			}
			// var selObj = oEvent.mParameters.listItem.getBindingContext("WODetModel").getObject();

			// selObj.editable = false;
			// var clonedObj = $.extend({}, true, selObj);
			// this.compDialog.setModel(new JSONModel(clonedObj), "ComponentDetailModel");
			// sap.ui.getCore().byId("componentsSFId").bindElement("/");

			this.attachmentDialog.open();
			oFileUploader.setValue("");
		},
		/*	_onRouteMatched: function (oEvent) {
				var detailData = oEvent.getParameter("arguments");
				this.selectedWorkOrder = detailData.WONum;
				var model = this.getView().getModel("WOModel").getData()[detailData.WONum];
				var jsonModel = new sap.ui.model.json.JSONModel(model);
				this.getView().setModel(jsonModel, "WODetModel");
			},*/
		_onRouteMatched: function(oEvent) {
			var detailData = oEvent.getParameter("arguments");
			this.selectedWorkOrder = detailData.WONum;
			var model = this.getView().getModel("WOModel").getData()[detailData.WONum];
			var jsonModel = new sap.ui.model.json.JSONModel(model);
			this.getView().setModel(jsonModel, "WODetModel");

			debugger;
			// this.byId("map_iframe")._xContent.src = model.NVHEADERTOWOMAP.Url.replace("http","https");
			/*var detailEditNoteData = {
				enable:false,
				btnVisibility:false
			};
			this.getModel("detailEditNoteModel").setData(new JSONModel(detailEditNoteData));*/
			//sap.ui.getCore().setModel(new JSONModel([]), "detailNotesData");
			/*var index = event.mParameters.arguments.context;
			var mapsArr = this.MasterRef.getView().getModel("workOrders").getData()[index].NVHEADERTOWOMAP;
			var url = mapsArr.Url.replace("http", "https");*/

			/*var url = this.getView().getModel("WODetModel").oData.NVHEADERTOWOMAP.Url;
			url = url.replace("http", "https");*/
			
			var url = "https://hved.utl.accenture.com/geoeam-au/index.html?id=1007193&locale=en";
			var frame = "<iframe src=" + url + " width='100%' height='550px'></iframe>";
			this.byId("mapsId").setContent(frame);

		},
		dateFormatter: function(value1, value2) {
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
		//////////////////////////////
		onAttachUpload: function(oEvent) {
			var oFileUploader = sap.ui.getCore().byId("AttachUploader");
			var sFileName = oFileUploader.getValue();
			var oView = this.getView();
			if (!oFileUploader.getValue()) {
				sap.m.MessageToast.show("Choose a file first");
				return;
			}

			// var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			// var base64_marker = 'data:' + file.type + ';base64,';
			// var reader = new FileReader();

			// // On load 
			// reader.onload = (function(file) {
			// 	return function(evt) {
			// 		// Locate base64_content 
			// 		var base64Index = evt.target.result.index0f(base64_marker) + base64_marker.length;
			// 		// Get base64 content
			// 		var base64 = evt.target.result.substring(base64Index);
			// 		var sTasksService = window.location.origin + "/sap/opu/odata/RUNUP/MYRUNUPTASKSSRV/RunupTasks";
			// 		var sAttachService = window.location.origin + "/sap/opu/odata/RUNUP/MYRUNUPTASKSSRV/RunupNewAttachments";
			// 		var oViewModel = oView.getModel();
			// 		var oContext = oView.getBindingContext();
			// 		var oRunupTask = oViewModel.getProperty(oContext.getPath());
			// 		var oDataModel = sap.ui.getCore().getModel();
			// 		var sWorkitemld = JSON.stringify(oRunupTask.WiId);
			// 		var service_url = sAttachService;
			// 		var token;
			// 		$.ajaxSetup({
			// 			cache: false
			// 		});
			// 		jQuery.ajax({
			// 			url: service_url,
			// 			async: false,
			// 			dataType: 'json',
			// 			cache: false,
			// 			data: base64,
			// 			type: "POST",
			// 			beforeSend: function(xhr) {
			// 				xhr.setRequestHeader("X-CSRF-Token", token);
			// 				xhr.setRequestHeader("Content-Type", file.type);
			// 				xhr.setRequestHeader("slug", sFileName);
			// 				xhr.setRequestHeader("WorkitemId", oRunupTask.WiId);
			// 			},
			// 			success: function(odata) {
			// 				sap.m.MessageToast.show("File successfully uploaded");
			// 				oFileUploader.setValue("");
			// 			},
			// 			error: function(odata) {
			// 				sap.m.MessageToast.show("File Upload error");
			// 			}
			// 		});
			// 	};
			// })(file);
			// // Read file 
			// reader.readAsDataURL(file);
			// oView = this.getView();
			// oAttachDataModel = this.oDataModel;
		},

		handleValueChange: function(oEvent) {
			debugger;
			var files = oEvent.mParameters.files[0];
			var data = {
				Name: files.name,
				Type: files.type
			};
			this.getView().getModel("WODetModel").oData.NVHEADERTOATTACHMENTS.results.push(data);
			this.getView().getModel("WODetModel").refresh();
			this.attachmentDialog.close();

		},

		deleteAttachment: function(oEvent) {
			debugger;
			var li = oEvent.mParameters.listItem;
			var indexli = oEvent.oSource.indexOfItem(li);
			this.getView().getModel("WODetModel").oData.NVHEADERTOATTACHMENTS.results.splice(indexli, 1);
			this.getView().getModel("WODetModel").refresh();
		},

		onListItemPressAttachment: function(oEvent) {
			debugger;

			var li = oEvent.mParameters.listItem;
			var indexli = oEvent.oSource.indexOfItem(li);

			var ObjID = this.getView().getModel("WODetModel").oData.NVHEADERTOATTACHMENTS.results[indexli].Objid;
			// var a = parseInt(ObjID);
			//var that = this;

			if (ObjID === undefined) {
				alert("Item not yet saved in server");
			} else if (ObjID === "") {
				alert("No ObjID defined for this item in server");
			} else {
				window.open("https://hved.utl.accenture.com/sap/opu/odata/SAP/ZEAM_066_WM_FIORI_APP_SRV/AttDownloadSet(Objid='" + ObjID +
					"')/$value");
			}

			/*var str =
				"https://hved.utl.accenture.com/sap/opu/odata/SAP/ZEAM_066_WM_FIORI_APP_SRV/AttDownloadSet(Objid='12EFDB6B857E1EE893BD907E632CC5AB')/$value";
			var pos = str.indexOf("=");
			var res = str.slice(0, pos + 2);
			var text2 = "')/$value";
			var text3 = res.concat("", ObjID);
			var text4 = text3.concat("", text2);
			window.open(text4);*/
			// window.open("https://hved.utl.accenture.com/sap/opu/odata/SAP/ZEAM_066_WM_FIORI_APP_SRV/AttDownloadSet(Objid="+ObjID+")/$value");

			/*	if (!this.showAttachmentDialog) {
					this.showAttachmentDialog = sap.ui.xmlfragment("ZWMReplacement.fragments.showAttachment", this);
					//this.getView().addDependent(this.showAttachmentDialog);
				}
				
				this.showAttachmentDialog.open();
				
				this.getView().getModel("WODetModel").refresh();*/

		},

		//////////////////////////////
		onCloseCompDialog: function() {
			this.compDialog.close();
		},
		OnCloseAttachDialog: function() {
			var oFileUploader = sap.ui.getCore().byId("AttachUploader");
			oFileUploader.setValue("");
			this.attachmentDialog.close();
		}

	});

});