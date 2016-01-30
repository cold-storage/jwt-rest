# REST Service with JWT Authentication

Fully working example of JSON web token authentication.

* https://tools.ietf.org/html/rfc7519
* https://github.com/brianloveswords/node-jws

Here's how you login.

```
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"yodle": "frodle"}' \
    "http://localhost:3377/login"

{
  "user": {
    "joe": "user",
    "iat": 1454139434,
    "exp": 1454225834
  },
  "jwt": "eyJhbGciOiJIUzUxMiJ9.eyJqb2UiOiJ1c2VyIiwiaWF0IjoxNDU0MTM5NDM0LCJleHAiOjE0NTQyMjU4MzR9.D74vT7euNQx7TA9Tj_JePhE7TuI6G94sG0W39QU-vwVjcs948hpzEV2bw1PnwBFf91m6vUc15NiK6DfuIG0qoA"
}
```

Just use the JWT from login and make sure your requests have the JWT in the
Authorization header like this.

```
curl -X GET \
    -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJqb2UiOiJ1c2VyIiwiaWF0IjoxNDU0MTM5NDM0LCJleHAiOjE0NTQyMjU4MzR9.D74vT7euNQx7TA9Tj_JePhE7TuI6G94sG0W39QU-vwVjcs948hpzEV2bw1PnwBFf91m6vUc15NiK6DfuIG0qoA" \
    "http://localhost:3377"

{
  "joe": "user",
  "iat": 1454139434,
  "exp": 1454225834
}
```