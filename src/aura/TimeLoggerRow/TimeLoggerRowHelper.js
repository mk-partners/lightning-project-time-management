({
    calculateDuration : function(component){
        var hours = component.get("v.hours");
		var minutes = component.get("v.minutes");
		var seconds = component.get("v.seconds");

        var dur = 0;
        if ( null != hours && parseFloat(hours) != 'NaN' ){
            dur += parseFloat(hours);
        }
        if ( null != minutes && parseFloat(minutes) != 'NaN' ){
            dur += parseFloat(minutes)/60;
        }
        if ( null != seconds && parseFloat(seconds) != 'NaN' ){
            dur += parseFloat(seconds)/(60*60);
        }
        console.log('dur',dur);
        return dur;
    },
    saveTime : function(component, timeRecord){
        var startDateTime = new Date(timeRecord.Start_DateTime__c);
        console.log("TimeLoggerRowHelper.saveTime", timeRecord.Start_DateTime__c);

        var startDate = $A.localizationService.formatDateTime(timeRecord.Start_DateTime__c);
        startDate = new Date(startDate);
        console.log("startDate",startDate);

        console.log("Duration__c",parseFloat(timeRecord.Duration__c));

        // var tz = 8*60*60*1000;
        // var startTime = new Date(startDateTime.getTime() + tz );
        var dur = parseFloat(timeRecord.Duration__c);
        var ms = dur*60*60*1000;
        var endTime = new Date(startDate.getTime() + ms);
        timeRecord.Start_DateTime__c = startDate;
        timeRecord.End_DateTime__c = endTime;

        console.log("TimeLoggerRowHelper.saveTime",timeRecord);
        var action = component.get("c.saveRecord");
        action.setParams({record:timeRecord});
        action.setCallback(this, function(response) {
	        var state = response.getState();
			console.log(state);
	        if (component.isValid() && state == "SUCCESS") {
	            var ret = response.getReturnValue();
				console.log(ret);
				component.set("v.timeRecord",ret);
                component.set("v.mode","time");
			}
		});
		$A.enqueueAction(action);
    },
    selectProject : function(component, event, helper){
        var timeRecord = component.get("v.timeRecord");
		var projectList = component.get("v.projectList");
		var assignmentList = [];
		for ( var p in projectList ){
			if ( timeRecord.Project__c == projectList[p].Id ){
				for ( var a in projectList[p].Assignments__r ){
					assignmentList.push(projectList[p].Assignments__r[a]);
				}
			}
		}
		component.set("v.assignmentList",assignmentList);
    },
    startTimer : function(component, event, helper){
		window.intervalId = setInterval(function(){
			let seconds = component.get('v.seconds');
			let minutes = component.get('v.minutes');
			let hours = component.get('v.hours');
			seconds += 1;
			component.set('v.seconds', seconds);
			if (seconds % 60 === 0 && seconds != 0){
				component.set('v.seconds', 0);
				minutes += 1;
				component.set('v.minutes', minutes);
			}
			if (minutes % 60 === 0 && minutes != 0){
				component.set('v.minutes', 0);
				hours += 1;
				component.set('v.hours', hours);
			}
		}, 1000);
		component.set('v.isCounting', true);
		component.set('v.intervalId', window.intervalId);
    },
    stopTimer : function(component, event, helper){
        var Interval = component.get("v.intervalId");
        clearInterval(Interval);
        component.set("v.isCounting",false);
    }
})