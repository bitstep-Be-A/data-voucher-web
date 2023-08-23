# Project guide

## 배포

```console
aws s3 sync ./build s3://[S3 버킷 이름] --profile=[IAM 사용자 이름]
```

## Serializer

서버 쪽 데이터와의 격리성을 구현하기 위해 Serializer 객체를 통해 typescript model 객체로 변환하거나 역으로 변환합니다.
