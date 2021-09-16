# Get media info service example

This example shows you how to create a service to fetch media info from a media file. Also, it shows you how to build your own services using typical architecture.
To get more information about typical architecture read [this](https://www.notion.so/firstlineoutsourcing/Serverless-88c01a5776f948fd88d392d426da085b) article.

Deploy:
```bash
$ sls deploy -v
```

Make a request:
```bash
$ curl --location --request POST 'https://hf2frus86c.execute-api.us-east-1.amazonaws.com/api/media-info' --header 'Content-Type: application/json' --data-raw '{"url": "https://file-examples-com.github.io/uploads/2018/04/file_example_AVI_480_750kB.avi"}'
```
