# Survey Service

## 사용 기술
- Node.js
- NestJS
- TypeScript
- GraphQL
- TypeORM
- PostgreSQL
- Docker (optional)

## 기능
- 설문지 CRUD
- 문항 CRUD
- 선택지 CRUD
- 답변 CRUD
- 설문지 완료 및 완료된 설문지 확인
- 완료된 설문지 조회 API

객관식 설문지의 데이터 베이스 설계
- 답변별 점수가 존재한다.
  1. 패키지 여행 - 0점
  2. 자유여행 - 1점
  3. 테마 여행 - 2점
        
- 설문지는 답변을 체크할 수 있다.
- 답변의 총점을 확인할 수 있다.


## 환경 설정
```env
# .env 파일 예시
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=survey
APP_PORT=4000
```

## 빌드 및 실행 방법

```bash
# 필요한 패키지 설치
npm install

# 서버 실행
npm run start
```

## 빌드 및 실행 방법 (Docker)

1. Docker 네트워크 생성
```
docker network create survey_network
```
2. Docker 이미지 빌드
```
docker-compose build
```
3. Docker 컨테이너 실행
```
docker-compose up -d
```

## API 사용 예시

GraphQL API 사용 방법에 대한 간단한 예시를 제공합니다.

```graphql
# 설문지 완료
mutation CompleteSurvey($userId: String!, $surveyId: Int!) {
  completeSurvey(userId: $userId, surveyId: $surveyId) {
    id
    userId
    surveyId
    surveyContent
    answers
  }
}

```

---

### 엔티티 설명

1. **Survey**
   - `id`: 설문지의 고유 식별자.
   - `title`: 설문지의 제목.
   - `description`: 설문지의 설명 (optional).

2. **Question**
   - `id`: 문항의 고유 식별자.
   - `text`: 문항의 내용.
   - `order`: 문항의 순서.
   - `surveyId`: 속한 설문지 (Foreign Key from Survey).

3. **Option**
   - `id`: 옵션의 고유 식별자.
   - `text`: 옵션의 내용.
   - `score`: 옵션의 점수.
   - `questionId`: 속한 문항 (Foreign Key from Question).

4. **Answer**
   - `id`: 답변의 고유 식별자.
   - `userId`: 답변한 사용자의 식별자.
   - `questionId`: 답변한 문항의 식별자. (Foreign Key from Question)
   - `optionId`: 선택한 옵션의 식별자. (Foreign Key from Option)

5. **CompletedSurvey**
   - `id`: 완료된 설문지의 고유 식별자.
   - `userId`: 설문을 완료한 사용자의 식별자.
   - `surveyId`: 완료한 설문지의 식별자.
   - `answers`: 사용자의 답변들 (JSON 형식).
   - `surveyContent`: 완료 시점의 설문지 내용 (JSON 형식).

### 데이터 관계

- `Survey` 엔티티는 여러 `Question` 엔티티를 포함합니다.
- 각 `Question`은 하나의 `Survey`에 속하며 여러 `Option`을 가집니다.
- `Option`은 특정 `Question`에 속합니다.
- `Answer`는 사용자의 답변을 나타내며, 특정 `Question`과 `Option`에 연결됩니다.
- `CompletedSurvey`는 사용자가 완료한 설문지를 나타내며, 해당 사용자의 답변과 설문지 내용을 저장합니다.

<img src="./img/Survery-ERD.pdf" width="600" height="600">
---