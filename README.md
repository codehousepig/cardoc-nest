<div align="center">
  
# [Assignment 7] 카닥(cardoc)
### **[원티드x위코드] 프리온보딩 백엔드 코스 과제7 - 개인과제** <br>
### **[과제 출제 기업 정보]** 
<img src="https://user-images.githubusercontent.com/61304585/143189202-f81a07a6-5510-4e75-81af-826dbb280b5a.png" width=500> <br>
[기업명] **카닥** <br>

[🔗 카닥 사이트](https://www.cardoc.co.kr/) <br>

[🔗 wanted 채용공고 링크](https://www.wanted.co.kr/wd/57545) <br>

</br>


| 이름   | github                                          | blog                                             | 프로젝트 회고 |
| ------ | ----------------------------------------------- | ------------------------------------------------ | ------------ |
| 정천우 | [codehousepig](https://github.com/codehousepig) | [codehousepig](https://blog.naver.com/codehouse9) | [개인과제]() |      |

</div>


<br>
<br>
<br>
<br>

## 📖 과제 내용

### [필수 포함 사항]

- READ.ME 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - **서버 구조 및 디자인 패턴에 대한 개략적인 설명**
  - 완료된 시스템이 배포된 서버의 주소
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</br>

### [개발 요구사항]

<details>
  <summary><b>1. 배경 및 공통 요구사항</b></summary>
  
  <aside>
    
    😁 카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.
    
  </aside>
  
  - 데이터베이스 환경은 별도로 제공하지 않습니다. <br>
  **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
  - 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다. <br>
  - 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다. <br>
  - Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다. <br>
  
  | Response Code             | Description                     |
  | ------------------------- | ------------------------------- |
  | 200 OK                    | 성공                            |
  | 400 Bad Request           | Parameter가 잘못된 (범위, 값 등) |
  | 401 Unauthorized          | 인증을 위한 Header가 잘못됨      |
  | 500 Internal Server Error | 기타 서버 에러                  |
  
</details>

<details>
  <summary><b>2. 사용자 생성 API</b></summary>
  
  🎁 **요구사항**
  - ID/Password로 사용자를 생성하는 API.
  - 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.
  
  ```javascript
  /* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
  ```
  
</details>

<details>
  <summary><b>3. 사용자가 소유한 타이어 정보를 저장하는 API</b></summary>
  
  🎁 **요구사항**
  - 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
  - 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.
  
  ```javascript
  /* Request Body 예제 */
  [
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
  ]
  ```
  
  🔍 **상세구현 가이드**
  - 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다. <br>
  **자동차 정보 조회 API 사용 예제 →**  <br>
  **📄** [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000) <br>
  **📄** [https://dev.mycar.cardoc.co.kr/v1/trim/9000](https://dev.mycar.cardoc.co.kr/v1/trim/9000) <br>
  **📄** [https://dev.mycar.cardoc.co.kr/v1/trim/11000](https://dev.mycar.cardoc.co.kr/v1/trim/11000) <br>
  **📄** [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000) <br>
  - 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다. <br>
  - 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다. <br>
  위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다. <br>
  
</details>

<details>
  <summary><b>4. 사용자가 소유한 타이어 정보 조회 API</b></summary>
  
  🎁 **요구사항** <br>
  - 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.
  
</details>

<details>
  <summary><b>5. 결과 제출 방법</b></summary>
  <aside>
    
    🙋‍♀️ Github Repository 주소를 제출해주세요.
    
  </aside>
  
  🎁 **요구사항** <br>
  **README**에 다음 사항을 서술해주세요.
  - 서버 구조 및 디자인 패턴에 대한 개략적인 설명.
  - 서버 실행 방법 - API 요청 / 응답 spec 문서
  
</details>

</br>
</br>

## 🛠 사용 기술 및 Tools

### [Back-End] ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) 

### [Deploy] <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>

### [Etc.] <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">

<br>
<br>

## DB Schema

<br>
비슷한 정보들이 많아 보여 가이드에 있는 API 사용 예제를 이용하여 직접 조회하면 설계를 생각해 봄. <br>
예제에서 조회가 가능한 최대 trimId는 29090(branID: 35) <br>
계속 조회해 보았는데 29073(1개, branID: 5) / 29074(1개, branID: 10) / 29075 ~ 29078(4개, branID: 38) / 29079 ~ 29084(6개, branID: 21) / 29085 ~ 29089(5개, branID: 44)으로 규칙성을 찾지 못함. <br>
<br>

<img src="https://user-images.githubusercontent.com/61304585/143197784-5736f3e1-a50c-456d-afb4-8455cc7bc8a5.png" width=700> <br>

<br>
가이드에 나온 번호를 기준으로 나온 번호의 위아래 번호를 조회해 보면 비교해 봄. <br>
정리하여 보니 자동차의 옵션별로 저장되어 있었고, 자세히 보면 타이어의 앞뒤도 다름. <br>
그리하여 PK는 자동차 차종 ID (trimId)로 하고 각 테이블별로 1:1로 연관관계로 진행함. <br>

<img src="https://user-images.githubusercontent.com/61304585/143219637-fa35c600-8b5e-494c-be95-7ee1b957a56d.png" width=700> <br>

</br>
</br>

## 📌 구현 기능

### 1. NestJS Lifecycle events 활용하기

DB 초기화 작업을 자동으로 수행하기 위해 NestJS의 생명주기를 이용했습니다. <br>
모든 모듈이 초기화된 후 연결을 수신하기 전, 애플리케이션이 부트스트랩 될 때 호출되는 onApplicationBootstrap() 후크를 사용했습니다.

```
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    // initialize database
  }
}
```

서버 구동시 테이블 생성과 동시에 테스트 가능한 데이터가 삽입됩니다.
- 유저 3명
- 자동차 차종 ID 12개 등록 (4999 ~ 5001, 8999 ~ 9001, 10999 ~ 11001, 14999 ~ 15001)

### 2. 사용자 생성 API
- 회원가입시 password 같은 민감정보는 해쉬 알고리즘인 bcrypt를 사용해 암호화 하여 database에 저장했습니다
- 로그인이 성공적으로 완료되면 JWT 토큰이 반환됩니다
- JWT 토큰 유효성을 검사하는 미들웨어를 추가하여 이후의 api 호출 시 토큰 유효성 여부를 검사합니다.


### 3. 사용자가 소유한 타이어 정보를 저장하는 API
- 인증받은 사용자만이 정보를 저장하는 api를 호출할 수 있습니다.
- 5명이 초과되는 정보에 대해서는 '400 Bad Request' 보내어 잘못된 요청을 알립니다.
- 요청을 보낸 5명의 id 중 없는 사용자가 있더라도 다른 사용자들은 올바르게 정보가 저장되도록 transaction 을 이용하였습니다.
- template 이라는 view를 담당하는 서비스를 만들어 **상세구현 가이드** 에 나와있는 '자동차 정보 조회 API 사용 예제' 와 유사하게 만들었습니다.

### 4. 사용자가 소유한 타이어 정보 조회 API
- JWT를 통해 사용자에게 trimID가 저장되어 있고, 그에 해당하는 trimID에 대한 정보가 DB에 사전에 등록되어 있다면 조회가 가능하도록 하였습니다.

<br>
<br>

## 📖 API Document

[🔗 Swagger UI](http://13.125.0.161:3017/api/)

### API Test 방법 <br>

1. 다음 링크로 이동합니다. [Swagger 링크](http://13.125.0.161:3017/api/) <br>
2. POST '/user 회원가입: 사용자 생성' 요청을 통해 회원 정보를 추가합니다. <br>
3. POST '/auth/login 로그인' 요청을 통해 '인증 토큰'을 받습니다. <br>
4. '인증 토큰'을 상단의 Authorize 에 넣습니다. <br>
5. PATCH '/user' 를 통해 자신의 자동차 정보를 등록합니다. <br>
6. 다시 한번 3, 4번 을 반복해 줍니다. (JWT 토큰에 trimID를 저장하여 받아오기 위해) <br>
7. GET '/user/mytire' 를 통해 사용자가 소유한 타이어 정보를 조회할 수 있습니다. 
<br>
1. GET 'trim/{id}'는 로그인과는 별개로 저장되어 있는 자동차 정보를 조회할 수 있습니다. <br>

<br>
<br>

## 🛠 설치 및 실행 방법(Local)

### 설치

1. 레포지토리를 clone 받습니다 <br>
(DB 설정에 관한 ormconfig.json 와 docker-compose.yml 을 첨부하였으니 다운로드해 그대로 따라 하시면 됩니다.) <br>

```
$ git clone https://github.com/codehousepig/cardoc-nest.git
```

2. clone한 경로에 들어간 후 의존성을 설치하고 환경 셋팅을 진행합니다. <br>

```
$ cd cardoc-nest
$ npm install
```

3. Docker Desktop 을 실행합니다. <br>

- Docker가 설치되어 있지 않다면 [여기](https://www.docker.com/get-started)에서 설치해 주세요. <br>
(Windows 또는 Mac용 Docker Desktop을 설치한 경우 Docker Compose가 이미 있습니다.) <br>
(그 외의 환경에서는 Docker-Compose 를 따로 설치해주어야 합니다.) <br>
```
$ docker-compose up
```

4.서버를 구동합니다. <br>
 
```
$ npm start
```

## 🌲 File Tree

```
📦src
 ┣ 📂auth
 ┃ ┣ 📂guard
 ┃ ┃ ┣ 📜jwt-auth.guard.ts
 ┃ ┃ ┗ 📜local-auth.guard.ts
 ┃ ┣ 📂strategy
 ┃ ┃ ┣ 📜jwt.strategy.ts
 ┃ ┃ ┗ 📜local.strategy.ts
 ┃ ┣ 📜auth.module.ts
 ┃ ┣ 📜auth.service.ts
 ┃ ┗ 📜constant.ts
 ┃ 📂base
 ┃ ┗ 📜base.entity.ts
 ┣ 📂baseinfo (trim)
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-baseinfo.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜baseinfo.entity.ts
 ┃ ┣ 📜baseinfo.controller.ts
 ┃ ┣ 📜baseinfo.module.ts
 ┃ ┗ 📜baseinfo.service.ts
 ┣ 📂driving
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-driving.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜driving.entity.ts
 ┃ ┣ 📜driving.controller.ts
 ┃ ┣ 📜driving.module.ts
 ┃ ┗ 📜driving.service.ts
 ┃ 📂enums
 ┃ ┗ 📜user.role.enum.ts
 ┣ 📂front-tire
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-front-tire.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜front-tire.entity.ts
 ┃ ┣ 📜front-tire.controller.ts
 ┃ ┣ 📜front-tire.module.ts
 ┃ ┗ 📜front-tire.service.ts
 ┣ 📂rear-tire
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-rear-tire.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜rear-tire.entity.ts
 ┃ ┣ 📜rear-tire.controller.ts
 ┃ ┣ 📜rear-tire.module.ts
 ┃ ┗ 📜rear-tire.service.ts
 ┣ 📂spec
 ┃ ┣ 📂dto
 ┃ ┃ ┗ 📜create-spec.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜spec.entity.ts
 ┃ ┣ 📜spec.controller.ts
 ┃ ┣ 📜spec.module.ts
 ┃ ┗ 📜spec.service.ts
 ┣ 📂template
 ┃ ┣ 📜template.controller.ts
 ┃ ┣ 📜template.module.ts
 ┃ ┗ 📜template.service.ts
 ┣ 📂user
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-user.dto.ts
 ┃ ┃ ┣ 📜login-user.dto.ts
 ┃ ┃ ┗ 📜update-user.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┣ 📜user.controller.ts
 ┃ ┣ 📜user.module.ts
 ┃ ┗ 📜user.service.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts
```

## 🛠 Dependencies
<div align=center>
  <img src="https://user-images.githubusercontent.com/61304585/143218909-98262fc8-73f7-4743-b86d-0e56f8ab8032.png" width=600>
</div>

</br>
</br>

## Reference

이 프로젝트는 [원티드x위코드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 7차 과제 일환으로 카닥(cardoc)에서 출제한 과제를 기반으로 만들었습니다.
