PS C:\Projects\task-manager> curl.exe -X POST http://localhost:3000/tasks/create `
>>   -F "title=My Task Title" `
>>   -F "description=This is a sample task" `
>>   -F "projectId=1" `
>>   -F "assigneeId=1" `
>>   -F "file=@C:/Projects/TWSCertificate.png;type=image/png"
>>

<!-- indexing, error handling, filters, sort, pagination, searching -->

