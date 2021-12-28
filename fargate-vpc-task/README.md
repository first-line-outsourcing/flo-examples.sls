# fargate-vpc-task

Simple Fargate + VPC configuration for running tasks

## Deploy:

```bash
$ sls deploy -v
```

1. Get ECR repository URI from `ServerRepositoryURI` field of the deployment logs.
2. Note somewhere the create job endpoint URL from the deployment logs.
3. Push a docker image to the ECR repository.
   1. Build an docker image: `docker build  --network host -t <ECR repository URI> .`
   2. Add ECR credential for docker: `aws --profile flo-examples ecr get-login-password | docker login --username AWS --password-stdin <ECR repository domain>` where `<ECR repository domain>` is the first part of the ECR URI(before /).
   3. Push docker image to the ECR repository: `docker push <ECR repository URI>`
4. Done. The service is ready.

## Usage

Send a request to the create job endpoint, it will create a task using fargate. Task will be finished after ~10s.

## Links

- [https://aws.amazon.com/ru/fargate/](https://aws.amazon.com/ru/fargate/)
- [https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [https://www.docker.com/](https://www.docker.com/)




