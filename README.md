# Project guide

## Issue

Issue에는 Feature와 Debug를 정리합니다. (향후 추가 예정)\
Title에는 [Feature] 혹은 [Debug]를 앞에 표시 후 타이틀을 작성합니다.

컨텐츠의 양식은 다음과 같습니다.

```plain
작업일

- [ ] 작업 내용 [commit link(사항 있다면)]
```

## Branch

main branch는 feature/#(issue id)와 같이 네이밍합니다. ex) feature/#10

## Commit

commit은 [git convention](https://www.conventionalcommits.org/en/v1.0.0/)을 따르되, Issue id를 반드시 붙여주셔야 합니다.\
type은 대문자로 시작합니다.

ex)

```plain
# issue id => #1, #2, #3 ...
Feat(#1): 로그인 기능 추가
```

## PR

1. pull request는 commit 하나에만 할당됩니다.

2. pull request를 보내기 전, 본인의 commit 사항에 대해 우선적으로 코드리뷰를 하고 comment를 남깁니다.

3. pull request를 요청한 뒤, 담당 코드 리뷰어와 함께 코드 리뷰를 완료합니다.

4. pull request가 완료되면 요청 보낸 branch는 삭제합니다.

> 문서 변경사항에 대해서는 docs branch에 문서 변경사항만 (이외 코드 변경 사항은 반영하지 말것!!) 추가하여 PR을 보내주세요.
