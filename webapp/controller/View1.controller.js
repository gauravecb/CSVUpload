sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function (Controller,Fragment) {
	"use strict";

	return Controller.extend("com.CSV.CSVUpload.controller.View1", {
		onInit: function () {
            var sPath = jQuery.sap.getModulePath("com.CSV.CSVUpload", "/model/sample.csv");
            this.getView().byId("idLink").setHref(sPath);
		},
	    onOpenUplod : function(){
	    	var oView = this.getView();

			// create dialog lazily
			if (!this.byId("uploadCSV")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "com.CSV.CSVUpload.Fragment.Upload",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("uploadCSV").open();
	    }
	    },
	    handleUpload: function(oEvent) {
          var that = this;
        var oFile = this.getView().byId("fileUploader").getFocusDomRef().files[0];
          if (oFile && window.FileReader) {
            var reader = new FileReader();
            reader.onload = function(evt) {
              var strCSV = evt.target.result; //string in CSV 
              that.csvJSON(strCSV);
            };
            reader.readAsText(oFile);
          }
        },

        csvJSON: function(csv) {
          var lines = csv.split("\n");
          var result = [];
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            result.push(obj);
          }
          var oStringResult = JSON.stringify(result);
          var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
          var oResult = oFinalResult.slice(0, oFinalResult.length - 1);
          console.log(result);
          /*var result = [];
          $.each(oResult, function(i, e) {
            if ($.inArray(oResult[i].Status, result) == -1) result.push(oResult[i].Status);
          });*/
         
         
        },
        handleCancel : function(){
        	this.byId("uploadCSV").close();
        },
       
	});
});