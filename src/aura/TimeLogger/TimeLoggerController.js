({
	doInit : function(component, event, helper){
		console.log('TimeLoggerController.doInit v.2018-03-04 9:24pm');
		var queryDate = component.get("v.queryDate");
		if ( null == queryDate ){
			queryDate = new Date();
		}
		console.log("queryDate",queryDate);
		helper.queryTime(component, queryDate);
	},
	addTime : function(component, event, helper){
		var timeList = component.get("v.timeList");
		var queryDate = component.get("v.queryDate");
		var y = queryDate.substring(0,4);
		var m = queryDate.substring(5,7);
		var d = queryDate.substring(8,10);
		console.log( y,m,d );
		var rightNow = new Date();
		rightNow.setFullYear(y,m,d);
		rightNow.setFullYear( rightNow.getFullYear(), rightNow.getMonth()-1, rightNow.getDate() );
		console.log('rightNow',rightNow);
		var t = {
			sobjectType:'Time__c',
			Project__c:null,
			Assignment__c:null,
			Start_DateTime__c: rightNow
		};
		console.log(t);
		timeList.push(t);
		component.set("v.timeList",timeList);
	},
	changeDay : function(component, event, helper){
		var queryDate = component.get("v.queryDate");
		console.log("TimeLoggerController.changeDay",queryDate);

		var localDate = $A.localizationService.formatDateTime(queryDate);
		queryDate = new Date(localDate);
		var buttonId = event.getSource().getLocalId();
		var diff = 0;
		if ( null != buttonId && buttonId == 'back' ){
			diff = -1;
		}
		else if ( null != buttonId && buttonId == 'forward' ){
			diff = 1;
		}
		queryDate.setDate(queryDate.getDate()+diff);
		helper.queryTime(component, queryDate);
	}
})