
# This is WebApplication for Service Fog Manager

# What is it?
  This is demo WebApplication for Service Fog Manager for WebEng Lab in KAIST. The WebApplication is developed using React. Developer of this WebApplication is Kalomidin Klichev.

# What it does?
  This WebApplication is Task designed. Certain tasks are registered such as "Resting Environment". When client requests for certain task to be performed then this Web Application provides with these services:
1. Information about services that are required to perform the task. This information includes:
    
    a. Required tasks.
    
    b. Tasks that are available.
  
2. Information about that task.
    
3. Execution/Stop for specific task.

4. This application has task list service where you can see tasks that are being performed.

# How it is designed?
  There are in total 5 Servers that WebApplication needs to interact with. This are following:
      1. Logging => Stores Logging information
      2.ServiceSearcher => Gets request about task information and responds with the required "Services" that are needed to perform that specific task
      3.ServiceProvider => Gets request about which service to be performed and what kind of service need to be performed by that service.
      4.ServiceRegistry => Gets request about service information and checks whether ServiceProvider that provides that service is available or not. If available then responds with it is url, otherwise with 0 responds. In one request can be requested for more than 1 service.
      5.ServiceSelector => Gets request about task and services that are available. Responds with tasks that are needed to be performed.
  
  The main part of the WebApplication is performed when task is requested to perform. When certain task requested to perform, following actions happen:
  1. WebApplication sends request with task information to ServiceSearcher and gets respond.
  2. Using respond from ServiceSearcher about services needed, WebApplication requests ServiceRegistry to know available services. ServiceRegistry responds with urls that are available to perform certain task.
  3. After knowing which services are available from the response of the ServiceRegistry, WebApplication requests ServiceSelector for the services needed to be performed from each Service. For instance, each task may use light but different type of level of brighteness and also there is other dependencies such as time(Ex: in the morning and afternoon same task may require different type of level of brighteness).
  4. In the final stage, WebApplication using urls it received from ServiceRegistry request to ServiceProvider with information specific service that it provides and also services needed by that service. Then execution takes place.
  # Few more Important Notes:
  Since there is no backend, there are certain things need to be clarified for backend developers to use this WebApplication as stated below:
  1. All the requests done to the server are http requests. It would be great to read Context.js file and function setServices to understand/develop further this Application.
  2. Login/Register Service is crucial for this application because before performing tasks there is need for autenthification.
  
  
  For further questions, please contact me.
  
      
      
  
