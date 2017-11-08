# 바닐라코딩 사용자 관리 시스템

### 브랜치 가이드

- `v0-vanilla`: 순 바닐라
- `v1-oop1`: OOP 1단계
- `v2-oop2`: OOP 2단계
- `v3-mvc`: MVC 패턴
- `v4-debugging-demo`: Debuggin Demo
- `v5-debugging`: Debugging Practice
- `v6-routing`: Routing
- `v7-pubsub`: Publish and Subscribe
- `v8-async1`: Async programming

---

### TODO

여러분은 바닐라코딩 사용자 관리 시스템에 페이스북 API를 이용하여 아래의 내용처럼 현재 코드를 수정 혹은 추가하셔야 합니다.

1. [보너스] 로그인한 사용자의 사진과 이름 보여주기

    - 보여주는 형식은 자유롭게 하여, 로그인한 사용자의 프로필 사진과 이름을 사용자 생성 그리고 현재 사용자 리스트 페이지에서 볼 수 있게 적용해주세요.
    - [관련 API 문서](https://developers.facebook.com/docs/graph-api/reference/user/picture/)(페이스북 로그인 필수)

2. [보너스] 로그인시, 로그인한 사용자의 친구들을 현재 사용자 리스트에 추가해서 보여주기

    - 사용자가 로그인할 경우, 사용자의 친구들의 이름을 찾아와서 현재 사용자 리스트에 추가해주세요. (친구들의 별명은 편하신대로 처리해주세요.)
    - 현재 사용자 리스트 페이지로 이동할 경우, 친구들의 이름들이 이미 리스트에 추가되어 있어야 합니다.
    - [관련 API 문서](https://developers.facebook.com/docs/graph-api/reference/user/friends/)(페이스북 로그인 필수)

**페이스북 테스트 사용자들**

아래의 테스트 사용자 이메일과 비밀번호를 이용하여 페이스북 관련 기능을 테스트할수 있습니다.

```
< 이메일 > - 아무거나 골라서 사용하세요.
jeonduhwan_gbprdvg_jeonduhwan@tfbnw.net
baggeunhye_joaqywz_baggeunhye@tfbnw.net
gim-yeongsam_auqkyyh_gim-yeongsam@tfbnw.net
notaeu_botecab_notaeu@tfbnw.net
nomuhyeon_oirzheh_nomuhyeon@tfbnw.net
iseungman_uowsscf_iseungman@tfbnw.net
imyeongbag_abzfyue_imyeongbag@tfbnw.net
gimdaejung_viwqrmp_gimdaejung@tfbnw.net
obama_qqykfzs_obama@tfbnw.net
dolamppu_dpwcavs_dolamppu@tfbnw.net
imija_vrunsfg_imija@tfbnw.net
juhyeonmi_aikrsja_juhyeonmi@tfbnw.net
nahun-a_rzkvbpa_nahun-a@tfbnw.net
hyeoncheol_ektlakw_hyeoncheol@tfbnw.net
nosayeon_anyrvxr_nosayeon@tfbnw.net
imusong_jxyotxv_imusong@tfbnw.net
elbiseu_posylpc_elbiseu@tfbnw.net
sintaeyong_llqmkhj_sintaeyong@tfbnw.net

< 비밀번호 > - 모든 테스트 사용자 공통
a1b2c3d4!
```

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
git push origin v8-async1
```

---

### 작업 내용 Ken과 공유하는 법

작업 내용 저장 후, 다음 링크의 방법을 따라하세요.[PR 만들기](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

**영어 잘 이해 안되시면 슬랙에서 물어보세요!**
