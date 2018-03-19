({
	queryTime : function(component, queryDate) {
		var action = component.get("c.initTimeLogger");
		console.log("TimeLoggerHelper.queryTime",queryDate);

		action.setParams({queryDate:queryDate});
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (component.isValid() && state == "SUCCESS") {
	            var ret = response.getReturnValue();
				var d = $A.localizationService.formatDate(ret.queryDate, "YYYY-MM-DD");
				console.log( "callbackResponse.getReturnValue", ret );
				console.log( "queryDate", d);
				component.set("v.projectList", ret.projectList);
				component.set("v.timeList", ret.timeList);
				component.set("v.queryDate", d);
			}
		});
		$A.enqueueAction(action);
	}
})