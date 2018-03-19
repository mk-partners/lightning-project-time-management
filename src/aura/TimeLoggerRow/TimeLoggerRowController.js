({
	doInit : function(component, event, helper) {
		console.log("TimeLoggerRowController.doInit v.2018-03-04 9:30PM");
		var seconds = 0;
		var minutes = 0;
		var hours = 0;
		var timeRecord = component.get("v.timeRecord");
		console.log("timeRecord", timeRecord.Start_DateTime__c);
		if ( timeRecord.Assignment__c != null && timeRecord.Start_DateTime__c != null ){
			var startDate = $A.localizationService.formatDateTime(timeRecord.Start_DateTime__c);
			startDate = new Date(startDate);
		    var endDate = new Date();
			if ( timeRecord.End_DateTime__c != null ){
				endDate = $A.localizationService.formatDateTime(timeRecord.End_DateTime__c);
				endDate = new Date(endDate);
			}
			console.log( "dates", startDate, endDate );
			var duration = endDate.getTime() - startDate.getTime();
			seconds = parseInt((duration/1000)%60);
            minutes = parseInt((duration/(1000*60))%60);
			hours = parseInt((duration/(1000*60*60))%24);
		}
		component.set("v.seconds",seconds);
		component.set("v.minutes",minutes);
		component.set("v.hours",hours);
		if (
			timeRecord.Id != null &&
			timeRecord.Start_DateTime__c != null &&
			timeRecord.End_DateTime__c == null
		){
			helper.startTimer(component,event,helper);
		}
		helper.selectProject(component, event, helper);
    },
    start : function(component, event, helper) {
		var timeRecord = component.get("v.timeRecord");
		console.log("TimeLoggerRowController.start",timeRecord.Start_DateTime__c);
		if ( timeRecord.Start_DateTime__c != null && timeRecord.End_DateTime__c != null ){
			console.log(timeRecord);
			var startDate = $A.localizationService.formatDateTime(timeRecord.Start_DateTime__c);
			startDate = new Date(startDate);
			var endDate = $A.localizationService.formatDateTime(timeRecord.End_DateTime__c);
			endDate = new Date(endDate);
			var duration = endDate.getTime() - startDate.getTime();
			var newStartDate = new Date( new Date().getTime() - duration);
			console.log('newStartDate',newStartDate);
			timeRecord.Start_DateTime__c = newStartDate;
			timeRecord.End_DateTime__c = null;
		}
		helper.saveTime(component,timeRecord);
        helper.startTimer(component,event,helper);
    },
    stop : function(component, event, helper) {
		helper.stopTimer(component, event, helper);
		var timeRecord = component.get("v.timeRecord");
		console.log("TimeLoggerRowController.stop",timeRecord);
		timeRecord.Duration__c = helper.calculateDuration(component);
		component.set("v.timeRecord",timeRecord);
		component.set("v.mode","edit");
    },
	edit : function(component, event, helper){
		component.set("v.mode","edit");
	},
	save : function(component, event, helper){
		var timeRecord = component.get("v.timeRecord");
		timeRecord.Duration__c = helper.calculateDuration(component);
		helper.saveTime(component,timeRecord);
	},
	back : function(component, event, helper){
		component.set("v.mode","time");
	},
	selectProject : function(component, event, helper){
		helper.selectProject(component, event, helper);
	}
})