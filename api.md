> select header - content-type:application-json 
# auth apis 
 + /api/signup  [POST]  

 + /api/signin [POST]   
 ```
 Body 
 {
    "email":"user@gmail.com",
    "password":"password"
}
JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiZjAxNmUzMzE4ODE4MDg5N2Q1ZmUiLCJpYXQiOjE2MDY0NTQwMjR9.ZXoA-Uxqf1VhQcUd9q35WcRbD3v-RI9ieletuad_qiI",
    "user": {
        "_id": "5fbbf016e33188180897d5fe",
        "name": "user",
        "email": "user@gmail.com"
    }
}
 ```
 
 + /api/signout [GET] add extra header Bearer Token 

# Org apis  
+ /api/org/:orgid [GET] Bearer Token required 

+ /api/events/org/:orgid [GET] Bearer Token required 
```
JSON 
[
    {
        "timing": "2020-11-23T18:03:50.402Z",
        "_id": "5fbbf9952c86d63e9c48c064",
        "name": "game dev 4",
        "org": {
            "_id": "5fbbf016e33188180897d5fe",
            "name": "admin"
        },
        "createdAt": "2020-11-23T18:04:05.642Z",
        "updatedAt": "2020-11-23T18:04:05.642Z",
        "__v": 0
    }
]
```

# Event  
+ /api/:orgid/event/create [POST] Bearer Token Required 

+ /api/events/date  [GET]  
 ```
 Body 
{
    "timing":"2020-11-23"
}
Json
[
    {
        "timing": "2020-11-23T10:37:26.189Z",
        "_id": "5fbb90eabb65c754f860bf60",
        "name": "game dev intro",
        "createdAt": "2020-11-23T10:37:30.168Z",
        "updatedAt": "2020-11-23T10:37:30.168Z",
        "__v": 0
    },
    {
        "timing": "2020-11-23T17:22:19.532Z",
        "_id": "5fbbf192e33188180897d5ff",
        "name": "game dev 2",
        "createdAt": "2020-11-23T17:29:54.626Z",
        "updatedAt": "2020-11-23T17:29:54.626Z",
        "__v": 0
    }
]
 ```
 
+ /api/events/:eventId  [GET] 
```
JSON
{
    "timing": "2020-11-23T10:37:26.189Z",
    "_id": "5fbb90eabb65c754f860bf60",
    "name": "game dev intro",
    "__v": 0
}
```

# Banner  
+ /api/banner/create/:orgId [POST] Bearer Token Required 
+ /api/banner  [GET]  
```
JSON
{
    "banners": [
        {
            "_id": "5fbbf4a80c79cd4b5c86b90a",
            "name": "gfg",
            "description": "a source to learn coding concepts",
            "siteLink": "www.gfg.com",
            "createdAt": "2020-11-23T17:43:04.122Z",
            "updatedAt": "2020-11-23T17:43:04.122Z",
            "__v": 0
        },
        {
            "_id": "5fbbf4f10c79cd4b5c86b90b",
            "name": "interviewBit",
            "description": "a prepartion guide for coding interviews",
            "siteLink": "www.interviewBit.com",
            "createdAt": "2020-11-23T17:44:17.398Z",
            "updatedAt": "2020-11-23T17:44:17.398Z",
            "__v": 0
        }
    ]
}
```

