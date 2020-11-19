> select header - content-type:application-json 
# auth apis 
 + /api/signup  [POST]  
 + /api/signin [POST]   
 + /api/signout [GET] add extra header Bearer Token 

# Org apis  
+ /api/org/:orgid [GET] Bearer Token required 
+ /api/events/org/:orgid [GET] Bearer Token required 

# Event  
+ /api/:orgid/event/create [POST] Bearer Token Required 
+ /api/events/date  [GET]  
+ /api/events/:eventId  [GET] 
