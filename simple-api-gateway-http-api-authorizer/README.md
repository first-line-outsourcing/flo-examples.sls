# Simple API Gateway HTTP API authorizer

This example shows how to configure an authorizer for an HTTP API route.

Deploy:

```bash
$ sls deploy -v
```

How to call the hello endpoint:
- Provide `Authorization: token` header to pass authorization
- Provide `Authorization: error` header to throw an error into authorization handler
- Provide any value other than described above to fail authorization

Example:
```bash
$ curl -i -X GET -H 'Authorization: token' https://gvgnw7ufpc.execute-api.us-east-1.amazonaws.com/hello
```

Links:
- [https://www.serverless.com/framework/docs/providers/aws/events/http-api#lambda-request-authorizers](https://www.serverless.com/framework/docs/providers/aws/events/http-api#lambda-request-authorizers) 
- [https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html)
- [https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.example-code](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.example-code)
- [https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)
