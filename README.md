# 바닐라코딩 사용자 관리 시스템

### 브랜치 가이드

- `v0`: 순 바닐라
- `v1`: OOP 1단계
- `v2`: OOP 2단계
- `v3`: OOP 3단계
- `v4`: 파일 분류
- `v5`: MVC
- `v6`: MVC with IIFE pattern
- `v7`: Debugging
- `v8`: Debugging Practice
- `v9`: Routing
- `v10`: Publish & Subscribe

---

### 필수 사항

여러분은 바닐라코딩 사용자 관리 시스템에 아래의 내용처럼 현재 코드를 Refactoring하셔야 합니다.

1. Pub-Sub을 이용하여 새로 생성된 사용자를 현재 사용자 리스트에 추가하기.

    - 사용자를 새로 만들 경우, 현재 사용자 리스트에 추가됩니다. 기존의 코드를 읽어보시고 Pub-Sub 패턴을 이용하여 UI에 사용자가 추가되도록 Refactoring 해보세요.

---

### Installation

- 우선 repository를 본인 Github 계정으로 fork해주세요. (해당 repository 페이지 오른쪽 상단에 보시면 fork 버튼이 있습니다.)

```
// ** 본인이 원하는 디렉토리내에서 실행할 것. **

// fork해온 프로젝트를 본인 컴퓨터에 다운받는 명령어
git clone REMOTE_URL

// 방금 clone한 디렉토리로 이동
cd PROJECT_NAME

// 작업에 필요한 구성 요소 설치
npm install
```

---

### 작업하는 방법

```
// 프로젝트 디렉토리로 이동 후, 아래의 명령어를 실행시켜 보세요.
// 브라우저에 자동으로 작업하는 페이지가 열리고,
// 작업을 하시면서 변동 사항을 저장하시면 자동으로 브라우저는 변화를 감지하고 새로운 화면을 보여줍니다.
npm start

// 작업 끝내기
MAC/Window: control + C
```

---

### 작업 내용 저장하는 법

```
// 프로젝트 디렉토리에서 아래의 명령어를 순서대로 실행한다.
git status
git add FILE_NAME
git commit -m "COMMIT_MSG"
git push origin master
```

---

### 작업 내용 Ken과 공유하는 법

작업 내용 저장 후, 다음 링크의 방법을 따라하세요.[PR 만들기](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

**영어 잘 이해 안되시면 슬랙에서 물어보세요!**
