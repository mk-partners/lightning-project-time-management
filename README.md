# lightning-project-time-management
Lightning based application for Project and Time Management

Use of this application and its code is provided by MK Partners, Inc. at no charge per the included license.

As MK Partners is a for profit company, we cannot provide free support for this application or its code.  Customization and support is available for a charge at <a href="https://www.mkpartners.com">www.mkpartners.com</a>.


## Installation Instructions
1. Use the Deploy to Salesforce button to install directly from GitHub to your org.  We recommend installing in a Sandbox as no test coverage is included in this GitHub repo.
<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

2. Modify your Profile(s) to provide proper CRUD access to the Project__c, Assignment__c, and Time__c objects.
3. Modify your Profile(s) to provide proper Field Level Security to the Project__c, Assignment__c, and Time__c objects.
4. Modify your Profile(s) to provide proper access to the Projects and Time tabs
5. Modify your App(s) to include the TimeLogger component in the Utility Bar
(note: you may need to refresh your browser twice to ensure the latest version is loaded)
6. Create a new Project record
7. Create a new Assignment record on the above Project, enter your User in the Owner User field.
8. Try logging some time!