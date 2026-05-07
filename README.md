# seongnam-library

성남시 도서관 대출가능 검색 Vercel 배포용 프로젝트입니다.

## 필수 환경변수

Vercel Project Settings → Environment Variables 에서 아래 값을 추가하세요.

- Name: `LIBRARY_API_KEY`
- Value: 도서관 정보나루 API 키

환경변수 추가 후 Deployments 메뉴에서 Redeploy 해야 적용됩니다.

## 표시 기준

도서관 정보나루 `bookExist` 응답에서 `hasBook=Y` 이고 `loanAvailable=Y` 인 경우만 초록색으로 표시합니다.
