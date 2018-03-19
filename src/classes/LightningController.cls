/**
* @name LightningController
* @date 2018-03-19
* @description Apex methods used by Lightning Components
* @author MK Partners, Inc.
* @license https://github.com/mk-partners/lightning-project-time-management/blob/master/LICENSE
* @website https://github.com/mk-partners/lightning-project-time-management
**/
public class LightningController {

	@auraEnabled
	public static sObject saveRecord(sObject record){
		system.debug(JSON.serialize(record));
		upsert record;
		return record;
	}

	@auraEnabled
	public static Map<String,Object> initTimeLogger(String queryDate){
		//2018-03-02T05:24:18.104Z
		queryDate = queryDate.replace('T',' ').left(19);
		DateTime qd = DateTime.valueOf(queryDate);
		Integer offset = UserInfo.getTimezone().getOffset(qd);
		Datetime local = qd.addSeconds(offset/1000);

		system.debug(local);
		Map<String,Object> res = new Map<String,Object>();
		List<Project__c> projectList = new List<Project__c>();
		for ( Project__c p : [
			SELECT Id, Name, Account__c, Account__r.Status__c, 
			(
				SELECT Id, Name
				FROM Assignments__r
				WHERE Status__c != 'Approved'
				AND Owner_User__c = :UserInfo.getUserId()
				ORDER BY Name
			)
			FROM Project__c
			WHERE Id IN (
				SELECT Project__c
				FROM Assignment__c
				WHERE Owner_User__c = :UserInfo.getUserId()
				AND Status__c != 'Archived'
			)
			AND Status__c != 'Archived'
			ORDER BY Name
		]){
			projectList.add(p);
		}
		List<Time__c> timeList = new List<Time__c>();
		for ( Time__c t : [
			SELECT Id, Project__c, Assignment__c, Start_DateTime__c, End_DateTime__c, Notes__c,
				Project__r.Account__c, Project__r.Account__r.Status__c
			FROM Time__c
			WHERE Date__c = :local.date()
			AND OwnerId = :UserInfo.getUserId()
		]){
			timeList.add(t);
		}
		res.put('queryDate',local);
		res.put('timeList',timeList);
		res.put('projectList',projectList);
		system.debug(JSON.serialize(res));
		return res;
	}

}