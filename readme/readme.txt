App     : mongodbDemo
Version : 1.0.0
Author  : Shubham Anand
email   : anandshubham.emilence@gmail.com

baseUrl: http://localhost:4000/mongodbDemo/v1
uploadPath: 
readmePath: http://localhost:4000/mongodbDemo/v1/readme/readme.txt

basicAuth credentials:
    UserName: 
    Password: 

Notes:
    --> Send token in header in all API's(except signup, login and forgotPassword API's) like:
    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE1MzExMjM3NDAsImV4cCI6MTUzMzcxNTc0MH0.ARupD0Y3bvzvCVDHeZtTFNU_6cFjNmwTMrqsIjD_C7M
    
    --> send languageCode as query parameter in GET, DELETE type APIs and in body in PUT, POST APIs

        en: english
        ar: arabic 

        send like:
            languageCode: en

=========================== Request Status Codes =======================

    ACTION_COMPLETE: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500



//********************************************************************//
//                          user register                             //
//********************************************************************//
1 . Register User(post)
       	Request Type = Post
	    Body = urlencoded
        Request Type = Post
        Request URL: http://localhost:4000/mongodbDemo/v1/auth/register
        Mandatory param - (userEmail, userPassword) OR (userEmail, userSocialId, userSocialName)

        Request : {
                "userEmail": "anandshubham.emilence@gmail.com",
                "userPassword": "shubham748",
                "userFirstName": "Shubham"
        }

        Response : {
            "message": "Successful.",
            "status": 200,
            "data": {
                "userEmail": "anandshubham.emilence@gmail.com",
                "userPassword": "$2a$10$eAyO096CbV3vAQtlE8aZ.e6RW6uEIcR.OXheKaLpQZIvKlZ6zqobS",
                "userSocialId": "",
                "userSocialName": "",
                "userFirstName": "Shubham",
                "userLastName": "",
                "username": "",
                "deactivate": "0",
                "_id": "5d4d5e3ea7d28f0bbfb09f55",
                "__v": 0
            }
        }
//********************** End of user register ************************//

//********************************************************************//
//                          user register                             //
//********************************************************************//
2 . Login User(post)
       	Request Type = Post
	    Body = urlencoded
        Request Type = Post
        Request URL: http://localhost:4000/mongodbDemo/v1/auth/login
        Mandatory param - (userEmail, userPassword) OR (userSocialId, userSocialName)

        Request : {
                "userEmail": "anandshubham.emilence@gmail.com",
                "userPassword": "shubham748"
        }

        Response : {
            "message": "Successful.",
            "status": 200,
            "data": {
                "userEmail": "anandshubham.emilence@gmail.com",
                "userPassword": "$2a$10$eAyO096CbV3vAQtlE8aZ.e6RW6uEIcR.OXheKaLpQZIvKlZ6zqobS",
                "userSocialId": "",
                "userSocialName": "",
                "userFirstName": "Shubham",
                "userLastName": "",
                "username": "",
                "deactivate": "0",
                "_id": "5d4d5e3ea7d28f0bbfb09f55",
                "__v": 0
            }
        }
//********************** End of user register ************************//