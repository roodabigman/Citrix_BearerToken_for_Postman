# Citrix_BearerToken_for_Postman
pre-request script to manage generation / refresh of BearerToken for Postman API testing with Citrix APIs

To automate the generation, storage, and refresh of the API Bearer Token in Postman, we need to use a custom pre-request script on a collection.  The reason for this is Citrix APIs do not use standard Oauth syntax for the bearer token and have a prepended "CWSAuth Bearer=" syntax that we need to add to the token returned before we can use it.

Start a new collection in Postman that will house your Citrix API queries.  Then Click the 3 dots to the right side of the collection name and select "edit", when the edit pane opens, click the "pre request scripts" tab.

Copy the content from the pre_request_script.js file in this repo and past it into the pre request script field.

![image](https://user-images.githubusercontent.com/67022036/236983843-5233d36b-0788-4f3a-95f9-675094dab273.png)

Now switch to the "variables" tab for the collection and create the 2 variables that will hold the bearer token and expiration timestamp

currentAccessToken
accessTokenExpiry

![image](https://user-images.githubusercontent.com/67022036/236895114-dd86f0a9-f5f6-47b4-ab81-c61713ba2a68.png)

Now, when you create a request, add a Header called "authorization" and assign the variable {{currentAccessToken}}

![image](https://user-images.githubusercontent.com/67022036/236895194-cf7b6c29-5298-47f3-8a97-4addede9d02b.png)

As you build multiple requests, duplicate the ones you already have working so the header details get copied over.

And thats it!  Now all you have to do is run requests. open postman cold after not using it for a while, click "send" on any request, and it will just work.  in the background the pre-request script will see that the current bearer token is expired, will request and store a new one along with the expiration timestamp, and your request will run with the bearer token without you having to worry about it.  really speeds up API testing to no longer have to be concerned with token generation or expiration!
