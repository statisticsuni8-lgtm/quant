# Vercel & Supabase 연동 및 배포 가이드 (Vercel & Supabase Configuration Guide)

이 문서는 본 프로젝트를 **Vercel**에 배포하고, **Supabase**의 데이터베이스(SQL) 및 API Key 환경 변수를 연동하는 상세 단계를 한글로 알기 쉽게 설명합니다.

---

## 1. Vercel 환경 변수 (Environment Variables) 설정 방법

Vercel 배포 시, 외부 API나 데이터베이스 연동에 필요한 비밀 키들이 코드에 노출되지 않도록 **Vercel 대시보드**에 직접 환경 변수를 등록해야 합니다.

### 📍 대시보드 등록 단계
1. **Vercel 대시보드**(https://vercel.com)에 로그인합니다.
2. 배포할 프로젝트(Project)를 클릭하여 진입합니다.
3. 상단 탭 메뉴 중 **`Settings` (설정)**를 클릭합니다.
4. 왼쪽 사이드바에서 **`Environment Variables` (환경 변수)**를 선택합니다.
5. **Key**와 **Value** 입력 칸에 아래의 필수 환경 변수들을 하나씩 추가하고, 우측의 **`Add`** 버튼을 누릅니다.

### 🔑 필수 등록 환경 변수 목록
현재 앱에서 사용 가능한 핵심 환경 변수들입니다:

*   **`GEMINI_API_KEY`**: Gemini AI 연동을 위한 구글 AI 스튜디오 API 키입니다.
*   **`SUPABASE_URL`**: Supabase 프로젝트 설정에서 발급받은 API URL 주소입니다. (`https://xxxx.supabase.co` 형태)
*   **`SUPABASE_ANON_KEY`**: Supabase의 Anon/Public API 개인 키입니다.
*   **`PORT`**: Vercel 배포 시에는 Vercel의 서버리스/엣지 라우팅 시스템이 포트를 자동으로 바인딩하므로 **별도로 추가하지 않아야 합니다.** (로컬 개발 서버 포트는 `3000`으로 고정되어 있습니다)

*주의: 환경 변수를 등록한 후에는 변경 사항을 적용하기 위해 Vercel에서 **`Redeploy` (재배포)**를 실행해 주어야 합니다.*

---

## 2. Supabase SQL Editor 사용 및 테이블 생성법

Supabase 대시보드에서 데이터베이스 테이블을 구축하고 인덱스/조회를 고도화하기 위해 **SQL Editor**를 사용합니다.

### 📍 SQL Editor 진입 및 실행 단계
1. **Supabase 대시보드**(https://supabase.com/dashboard)에 로그인 후 해당 프로젝트를 선택합니다.
2. 왼쪽 사이드바 메뉴 중 번개 모양 아래에 있는 **`SQL Editor`** (아이콘: `>_`)를 클릭합니다.
3. **`New query`** 버튼을 눌러 비어 있는 새로운 SQL 에디터 창을 생성합니다.
4. 실행할 SQL 문을 에디터 칸에 붙여넣고, 우측 하단의 **`Run`** (또는 `Ctrl + Enter`) 버튼을 클릭하여 실행합니다.

---

## 3. Supabase API Key 및 주소 확인 위치

Vercel 환경 변수에 입력해야 할 Supabase 주소와 키를 복사하는 경로입니다.

1. Supabase 대시보드 왼쪽 하단의 톱니바퀴 아이콘인 **`Project Settings` (프로젝트 설정)**를 클릭합니다.
2. 메뉴 목록에서 **`API`** 탭을 선택합니다.
3. 화면에 표시되는 다음 정보들을 복사하여 Vercel 환경 변수에 각각 입력합니다:
   *   **Project URL** ➡️ Vercel의 **`SUPABASE_URL`**에 등록
   *   **`anon` `public` API Key** ➡️ Vercel의 **`SUPABASE_ANON_KEY`**에 등록

---

## 4. 풀스택 프로젝트 Vercel 배포 시 주의사항 (Vite + Express)

본 프로젝트는 프론트엔드(Vite SPA)와 백엔드(Express API 서버)가 결합된 풀스택 구조를 가지고 있습니다. Vercel에서 Node.js 백엔드 엔드포인트가 정상적으로 기능하도록 내장 구성을 반영했습니다:
*   백엔드 API 요청은 모두 `/api/*` 경로로 요청이 유입되어야 하며, `server.ts`가 가볍게 패싱하도록 빌드 설계되어 있습니다.
*   로컬 개발 환경에서는 `npm run dev`로 시뮬레이션하고, Vercel 상에서는 프론트엔드 배포와 함께 제공된 가이드를 따라 안전하게 연동을 끝마칠 수 있습니다.
