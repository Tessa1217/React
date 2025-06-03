# 📋 설문조사 클론 프로젝트 (Google Forms Clone)

React와 Spring Boot 3 (Java 17)를 기반으로 개발한 설문조사 클론 프로젝트입니다.  
실제 서비스를 염두에 둔 백엔드 설계와 다양한 리액트 기능을 실습하면서 학습을 목적으로 진행된 프로젝트입니다.

---

## 📌 프로젝트 개요

- **목적**: React 학습 및 백엔드 설계 역량 강화
- **기능**: 사용자 인증, 설문 생성/응답, 다양한 질문 유형, 조건 분기 로직 등
- **백엔드**: Spring Boot 3, JPA, MySQL
- **프론트엔드**: React, TailwindCSS, React Hook Form, Redux Toolkit, Redux-Saga
- **형상관리**: Git, GitHub

---

## 🗂️ 기술 스택

### 🔧 Backend

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- MySQL 8
- Spring Security
- JWT Authentication

### 🎨 Frontend

- React
- Tailwind CSS
- React Hook Form
- Redux Toolkit
- React Query
- Toastify
- Vite

---

## 🧱 ERD 요약

> 자세한 테이블 구조는 DDL 참고

- **users**: 사용자 정보 (이메일, 비밀번호, 이름 등)
- **user_roles**: 사용자-롤 관계
- **roles**: 사용자 롤 테이블 (롤 이름 - 관리자, 일반 사용자)
- **code_group / code**: 공통 코드 관리 (질문 유형 등)
- **form**: 설문지 정보 (제목, 설명, 공개 여부 등)
- **question**: 설문 질문 (유형, 옵션, 필수 여부 등)
- **option_set / option_set_item**: 재사용 가능한 옵션 집합
- **option_item**: 특정 질문에 연결된 선택지
- **question_logic**: 선택에 따라 분기되는 조건 로직
- **form_response / form_answer**: 설문 응답 및 답변 저장

---

## 💡 주요 기능

- 회원가입 / 로그인 / JWT 인증
- 로그인 사용자와 비로그인 사용자별 메인 화면
- 설문지 생성 및 수정
- 질문 유형 (객관식, 단답형, 체크박스 등) 추가
- 설문 응답 저장
- 응답 결과 조회

---

## 🖼️ 화면 예시

- [x] 로그인/회원가입 페이지
- [x] 메인화면
- [x] 설문지 생성/수정 UI
- [x] 질문 카드 렌더링 (QuestionCardRenderer)
- [x] 모달 팝업 (예: 이메일 중복 확인)
- [x] 응답 제출 완료 화면

---

## ⚙️ 향후 개선 과제

- 관리자 페이지 (코드 그룹 관리 등)
- 공통 옵션 집합 재사용 가능
- 질문 간 조건 분기 (분기 로직)
- 설문 통계 기능 (차트 등)
- 리팩토링 및 테스트 코드 보완
- 다국어 지원 (i18n)

---

## 📁 프론트엔드 디렉터리 구조

<details>
<summary>디렉터리 트리 보기</summary>
<pre>
  <code>
.
├── public/                      # 정적 파일
│   └── vite.svg
├── src/
│   ├── app/                     # 앱 진입점 및 전역 상태(store, saga 등)
│   ├── assets/                  # 이미지, 아이콘 등 에셋
│   ├── entities/                # 핵심 도메인 단위 모듈
│   │   ├── form/                # 폼(Form) 도메인
│   │   │   ├── lib/             # 유틸리티 및 validation
│   │   │   ├── model/           # API 호출 및 상태 모델
│   │   │   ├── ui/              # 뷰 컴포넌트 (edit/view/renderer)
│   │   │   └── index.js
│   │   ├── question/            # 질문(Question) 도메인
│   │   │   ├── model/           
│   │   │   └── ui/              # 질문 편집기 및 뷰어
│   │   └── user/                # 사용자 상태 및 모델
│   ├── features/                # 페이지 단위 복합 기능
│   │   ├── auth/                # 로그인 / 회원가입
│   │   ├── formEditor/          # 폼 편집기
│   │   ├── formList/            # 폼 목록
│   │   ├── formViewer/          # 폼 뷰어 (응답용)
│   │   └── responseList/        # 응답 목록
│   ├── pages/                   # 실제 라우팅되는 페이지 컴포넌트
│   ├── shared/                  # 공통 훅, 유틸, 컴포넌트 등
│   │   ├── api/                 # axios client 등
│   │   ├── contexts/            # 컨텍스트 API
│   │   ├── hooks/               # 커스텀 훅
│   │   ├── lib/                 # redux-saga 헬퍼 등
│   │   ├── model/               # 공통 상태 모델
│   │   ├── router/              # 라우팅 가드
│   │   └── ui/                  # 공통 UI 컴포넌트
│   ├── widgets/                 # Header, Footer, Main 등 기본 레이아웃
│   ├── App.jsx                 
│   ├── main.jsx
│   └── ...
├── .env.development
├── index.html
├── package.json
└── vite.config.js    
  </code>
</pre>
</details>

### 🧩 폴더 설명 요약

- `app/`: 앱 진입점 (AppRouter, store 등)
- `entities/`: 도메인 중심 모듈화 (form, question 등)
- `features/`: 기능 단위 UI (폼 편집기, 설문 결과 조회 등)
- `pages/`: 라우팅 단위 페이지
- `shared/`: 공통 훅, 유틸, 컴포넌트
- `widgets/`: 공통 레이아웃 컴포넌트 (Header, Footer 등)

---

## 🚀 실행 방법

### 백엔드

```bash
cd survey
./gradlew bootRun
```

### 프론트엔드

```bash
cd survey-frontend
npm run dev
```
