# Database Design

Users
- name : String
- email : String
- password : String

Products
- name : String
- price : Number
- category : String

Orders
- userId : ObjectId
- products : Array
- totalAmount : Number