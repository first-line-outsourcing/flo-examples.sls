# Serverless examples

Before deploy an example you should configure `flo-examples` AWS profile on your local machine. Run the following command to configure the profile:

```bash
$ aws configure --profile flo-examples
```

Also, you need serverless framework to be installed globally:
```bash
$ npm i -g serverless@2.x.x
```

Usually, all examples can be deployed with the following command:
```bash
$ sls deploy -v
```
