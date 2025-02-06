[![Sprint 33](https://github.com/user-attachments/assets/2b23184d-90ed-458d-9dc4-dab9579c1e48)](https://octodocs.site)

<br>

<div align="center">
  
   ![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fboostcampwm-2024%2Frefactor-web39-OctoDocs&count_bg=%23000000&title_bg=%23000000&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false) [![Group 112 (1)](https://github.com/user-attachments/assets/b7b4387e-ffe9-4469-82b7-c14509282d86)](https://octodocs.shop)
 [![Group 83 (2)](https://github.com/user-attachments/assets/2d106d94-430c-47bc-a9e2-1f0026f76c2f)](https://github.com/boostcampwm-2024/refactor-web39-OctoDocs/wiki)

</div>

<p align="center">
  <a href="#옥토독스소개">🐙 서비스 소개</a> <br>
  <a href="#핵심경험">🗜️ 팀의 핵심 경험</a> <br>
  <a href="#프로젝트구조">⚙️ 프로젝트 구조</a> <br>
  <a href="#팀원소개">🍻 팀원 소개</a> <br>
</p>

<br><br>

<h1 id="옥토독스소개">🐙 Octodocs 서비스 소개 </h1>
<div align="center">
<br>
<h3> 옥토독스, <br> 협업을 위한 <br> 연결형 지식관리 툴</h3>
<br>

![Group 117 (2)](https://github.com/user-attachments/assets/04e39b34-9483-4896-bd6b-6456c4784eee)

<br>

### 🪡 연결형 지식 관리 툴

📢 마크다운, 이미지, 코드 등을 활용해서 간편하게 **문서 작성**이 가능합니다. <br>
📢 작성한 문서들을 **연결**하고 **배치**하면서 새로운 아이디어를 쉽게 떠올릴 수 있습니다.

![문서 작성과 연결 gif](https://raw.githubusercontent.com/summersummerwhy/gif/main/391353713-1ac81d56-a0ce-403c-9e3f-7ba092b6a5b6-ezgif.com-video-to-gif-converter.gif)

<br>

### 👥 실시간 동시 편집 및 협업 툴

📢 에디터에서 간편하게 **실시간 동시 편집**이 가능합니다. <br>
📢 작성된 문서들도 **함께 연결하고 배치**해 보며 우리 팀만의 구조를 만들어 볼 수 있습니다.

![실시간 동시편집 gif](https://raw.githubusercontent.com/summersummerwhy/gif/main/391975638-86b0dcaf-3640-4836-8b91-207b39b17b05-ezgif.com-video-to-gif-converter.gif)

<br>

### 📮 워크스페이스 초대 가능

📢 우리 팀만의 **워크 스페이스를 생성**하고 팀원들을 **초대**할 수 있습니다. <br>
📢 워크 스페이스의 **공개 범위**를 설정해서 누구나 참여할 수 있는 공간도 생성이 가능합니다.

![워크스페이스 초대 gif](https://raw.githubusercontent.com/summersummerwhy/gif/main/391998820-0c096e40-bed4-4cee-bb8e-40f72a5d43f2-ezgif.com-video-to-gif-converter.gif)

<br>
</div>

<div align="center">
  <a href="https://octodocs.site/" target="_blank">
    ➡️ 지금 옥토독스 사용해보러 가기!
  </a>
</div>

<br><br>

<h1 id="핵심경험">🗜️ Octodocs 팀의 핵심 경험</h1>

### 🗣️ 실시간 편집 구현 과정

실시간으로 여러 사용자가 동일한 문서를 편집할 때, 충돌 없이 동기화하는 것은 어려운 문제입니다. Octodocs 팀은 이를 직접 구현하는 대신 **YJS**와 **Socket.IO**를 결합하는 전략을 선택했습니다. 하지만 이 두 라이브러리를 통합하는 과정에서 예상치 못한 문제들을 어떻게 해결했을까요?

→ [🔗 실시간 편집의 비밀, 지금 바로 확인하기](https://github.com/boostcampwm-2024/web15-OctoDocs/wiki/%EC%8B%A4%EC%8B%9C%EA%B0%84-%ED%8E%B8%EC%A7%91-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95)

<br>

### ☄️ 데이터 흐름 변경

Octodocs 팀은 기존 RESTful API 기반 상태 관리를 버리고 **YDoc 중심의 단일 Truth Source**와 **소켓 기반 단방향 흐름**으로 전환했습니다. 이로 인해 모든 상태가 YDoc을 통해 일관되게 관리되고, 데이터 흐름도 간소화되었습니다. 기존 방식을 버리고 이 변화를 선택한 이유는 무엇일까요? 또한, 중복 관리와 데이터 충돌을 줄이기 위한 **data flow 변화**의 핵심은 무엇이었을까요?

→ [🔗 데이터 흐름에 몸을 맡겨보기](https://github.com/boostcampwm-2024/web15-OctoDocs/wiki/%EC%86%8C%EC%BC%93%EC%9C%BC%EB%A1%9C-%EC%9D%B8%ED%95%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EC%9D%98-%EB%B3%B5%EC%9E%A1%EC%84%B1%EA%B3%BC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%9D%90%EB%A6%84-%EB%B3%80%EA%B2%BD)

<br>

### 🔑 워크스페이스 별 권한 부여

Octodocs 팀은 배포를 끝낸 사이트를 발표에 직접 이용하다가, 발표를 듣는 사용자들이 발표 자료를 멋대로 변경할 수도 있다는 걱정을 마주했고 **사용자들이 워크스페이스별 권한을 관리**할 수 있어야겠다는 결론을 내렸습니다. 하지만 워크스페이스에 초대를 하면 알림이 가는 시스템을 만들기에는 개발 기간이 얼마 남지 않은 상태였어요. Octodocs 팀은 어떻게 워크스페이스별 권한 관리를 구현하였을까요?

→ [🔗 발표 자료 워크스페이스 접근 금지](https://github.com/boostcampwm-2024/web15-OctoDocs/wiki/%EC%9B%8C%ED%81%AC%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4-%EA%B6%8C%ED%95%9C-%EC%84%A4%EA%B3%84%2C-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95)

<br>

### 🧨 Redis를 활용해 데이터베이스 부하 줄이기

실시간으로 문서를 동시에 편집하면 굉장히 많은 변경 사항이 발생합니다. 누군가 타이핑을 할 때마다 변경 사항들을 모두 데이터베이스에 반영하기에는 부하가 너무 발생했기에, Octodocs 팀은 **redis를 도입**하기로 결정했습니다. 어떤 지점에서 redis 도입을 결정했고, 어떻게 redis를 활용하고 있을까요?

→ [🔗 Redis 같은 걸 끼얹나?](https://github.com/boostcampwm-2024/web15-OctoDocs/wiki/redis%EB%A5%BC-%ED%86%B5%ED%95%B4-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%BF%BC%EB%A6%AC-%EC%A4%84%EC%9D%B4%EA%B8%B0)

<br>

### 🐳 개발 환경, 배포 환경 및 CI/CD 개선해나가기

Octodocs 팀은 사용자 경험 향상은 물론, 일관된 코드 품질 유지와 **개발자 친화적인 쾌적한 개발 환경 조성**을 위해 많은 노력을 기울였습니다. 멀티 레포에서 모노레포로의 전환, GitHub Actions를 활용한 CI/CD 구축, Docker와 Docker Compose의 도입까지—우리는 어떤 변화를 거쳤을까요?

→ [🔗 환경 개선의 여정 따라가기](https://github.com/boostcampwm-2024/web15-OctoDocs/wiki/%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD%2C-%EB%B0%B0%ED%8F%AC-%ED%99%98%EA%B2%BD-%EB%B0%8F-CI-CD%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B0%9C%EC%84%A0-%EA%B3%BC%EC%A0%95)

<br>

### 🔄불필요한 리렌더링 개선

사용자가 자주 이용하는 페이지 리스트 기능이 매번 전체 페이지를 리렌더링하면서 사용자 경험을 저하시키고 성능 문제를 야기했습니다. 이 문제는 어떤 원인에서 비롯되었으며, 우리 팀은 어떤 접근 방식으로 해결할 수 있었을까요?

→ [🔗페이지 리스트 렌더링 시 전체 리렌더링 발생 문제 개선](https://github.com/boostcampwm-2024/refactor-web39-OctoDocs/wiki/%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%8B%9C-%EC%A0%84%EC%B2%B4-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%B0%9C%EC%83%9D-%EB%AC%B8%EC%A0%9C-%EA%B0%9C%EC%84%A0)

<br>

### ⚡ FCP, LCP 점수 개선하기

웹 페이지의 첫 인상을 결정짓는 중요한 지표인 FCP와 LCP가 각각 1.1초, 1.3초로 측정되었습니다. 우리 팀은 이 성능 지표를 1초 미만으로 단축시키는 목표를 설정하고, 이를 성공적으로 35% 이상 개선할 수 있었습니다. 이 성과는 어떻게 달성할 수 있었을까요?

→ [🔗FCP(사용하지 않는 자바스크립트 줄이기)](https://github.com/boostcampwm-2024/refactor-web39-OctoDocs/wiki/lighthouse-%EA%B0%9C%EC%84%A0(1)-FCP(%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A4%84%EC%9D%B4%EA%B8%B0)), [🔗FCP(lazy loading)](https://github.com/boostcampwm-2024/refactor-web39-OctoDocs/wiki/lighthouse-%EA%B0%9C%EC%84%A0(2)-FCP(lazy-loading)), [🔗LCP(useSuspenseQuery)](https://github.com/boostcampwm-2024/refactor-web39-OctoDocs/wiki/lighthouse-%EA%B0%9C%EC%84%A0(3)-LCP(useSuspenseQuery))

<br><br>

<h1 id="프로젝트구조">⚙️ 프로젝트 구조</h1>

### System Architecture

![image (13)](https://github.com/user-attachments/assets/bee51119-c814-4f57-8cda-60ea4bfdd2dd)

<br>

### Tech Stack

<table>
    <thead>
        <tr>
            <th>Category</th>
            <th>Stack</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p align=center>Common</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Node.js-114411?logo=node.js">
                <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Socket.io-010101?logo=Socket.io">
                <img src="https://img.shields.io/badge/YJS-05A2BA?logo=yjs&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=ffffff">
                <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=Eslint">
                <img src="https://img.shields.io/badge/yarn-2C8EBB?logo=yarn&logoColor=ffffff">
                <img src="https://img.shields.io/badge/.ENV-ECD53F?logo=.ENV&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                  <p align=center>Frontend</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=ffffff">
                <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=ffffff">
                <img src="https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Novel-3C3C3C?logo=novel&logoColor=ffffff">
                <img src="https://img.shields.io/badge/React_Flow-0078D7?logo=reactflow&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Backend</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=ffffff">
                <img src="https://img.shields.io/badge/TypeORM-FDF24A?logo=typeorm&logoColor=ffffff">
                <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Deployment</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/nginx-014532?logo=Nginx&logoColor=009639&">
                <img src="https://img.shields.io/badge/Naver Cloud Platform-03C75A?logo=naver&logoColor=ffffff">  
                <img src="https://img.shields.io/badge/GitHub Actions-2088FF?logo=GitHub Actions&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p align=center>Collaboration</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Slack-4A154B?logo=Slack&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Gather.town-008B8B?logo=gather&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>
<br><br>

<h1 id="팀원소개">🍻 팀원 소개</h1>

|  [J097\_민서진](https://github.com/summersummerwhy)  |  [J100\_박경희](https://github.com/pkh0106)  |  [J162\_유성민](https://github.com/ezcolin2)  |  [J239\_조배경](https://github.com/baegyeong)  |
| :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="204" alt="스크린샷 2024-10-29 오후 11 41 04" src="https://github.com/user-attachments/assets/e093f852-a6ea-4937-b0ce-b89276bd7135"> | <img width="204" alt="스크린샷 2024-10-29 오후 11 41 55" src="https://github.com/user-attachments/assets/0f638ba9-a1ad-47b8-a874-957c0119384c"> | <img width="204" alt="스크린샷 2024-10-29 오후 11 41 00" src="https://github.com/user-attachments/assets/1d77b650-70f1-4dee-9489-dc0122b7c9ff"> | <img width="204" alt="스크린샷 2024-10-29 오후 11 40 31" src="https://github.com/user-attachments/assets/db99b6b2-ae06-4758-8687-17ebb860a52b"> |
|   **`BE`**               |          **`FE`**          |           **`BE`**          |    **`FE`**               |
