# Bootcamp-chat-api
````
$username="test"
$password="demo"
````
```
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"$username",
	"password":"$password"
}'
```
```
curl --request GET \
  --url http://localhost:3000/profile \
  --header 'Authorization: Bearer $token'
```