sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZWMReplacement.controller.WM_Detail", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("orderDetails").attachPatternMatched(this._onRouteMatched, this);
		},
		onNavto: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("completeButtonClick");

			// this.getOwnerComponent().getRouter().navTo("TimesheetReview");
		},
		onTimeSheet: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("timeSheet");

			// this.getOwnerComponent().getRouter().navTo("TimesheetReview");
		},

		onClick: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "ENRT";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		onClickOnSite: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "ONST";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		onClickInProgress: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "FWIP";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		onClickHold: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "HOLD";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		onClickReturns: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "RETN";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		onClickForms: function() {
			var orderNo = this.getView().byId("name11").getValue();
			var operationNo = this.getView().byId("name12").getValue();
			var orderSts = "ODFC";

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZEAM_WM_FIORI_APP_SRV/", true, "", "");
			var oEntry = {};
			oEntry.Aufnr = orderNo;
			oEntry.Vornr = operationNo;
			oEntry.Status = orderSts;

			oModel.create("/OpUserStatusSet", oEntry, {
				method: "POST",
				success: function(data) {
					alert(JSON.stringify(data));
				},
				error: function() {

				}
			});

		},

		_onRouteMatched: function(oEvent) {
			// var orderId = oEvent.getParameter("arguments");
			// // var productId = oEvent.getParameter("arguments").productId;
			// this.getView().bindElement("/orders/" + orderId);
			var detailData = oEvent.getParameter("arguments");
			// var productId = oEvent.getParameter("arguments").productId;
			var model = new sap.ui.model.json.JSONModel(detailData);
			this.getView().setModel(model);

			this.getView().byId("enableEnroute").setEnabled(true);
			this.getView().byId("enableOnSite").setEnabled(true);
			this.getView().byId("enableInProgress").setEnabled(true);
			this.getView().byId("enableHold").setEnabled(true);
			this.getView().byId("enableReturns").setEnabled(true);
			this.getView().byId("enableForms").setEnabled(true);
		}

	});

});