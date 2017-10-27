# 바닐라코딩 사용자 관리 시스템

### 브랜치 가이드

- `v0-vanilla`: 순 바닐라
- `v1-oop1`: OOP 1단계
- `v2-oop2`: OOP 2단계
- `v3-mvc`: MVC 패턴
- `v4-debugging-demo`: Debuggin Demo
- `v5-debugging`: Debugging Practice
- `v6-routing`: Routing

---

### TODO

1. [필수] 사용자 생성(수정 제외) Form이 열린 상태를 URL로 구분할 수 있게 해주세요.

    - 예를 들어, 사용자를 만들려고 사용자 생성 폼을 열었던 상태로 URL을 이용하여 다시 방문할 수 있어야 합니다.
    - 입력창에 넣었던 값은 무시해도 됩니다.

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
git push origin v6-routing
```

---

### 작업 내용 Ken과 공유하는 법

작업 내용 저장 후, 다음 링크의 방법을 따라하세요.[PR 만들기](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

**영어 잘 이해 안되시면 슬랙에서 물어보세요!**
