# COPY 명령어는 여러 디렉토리를 목적지로 파일 복사하는 것이 불가능하다.
# 빌드 스테이지에서 COPY 명령어를 여러 번 생성해서 여러 디렉토리로 파일을 복사한다.
# 그 후 그 디렉토리 자체를 다음 스테이지에서 그대로 복사하여 layer의 개수를 줄인다.
FROM node:20-slim as builder 

WORKDIR /app

# 호이스팅을 위해
COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/websocket/package.json ./apps/websocket/
COPY apps/scheduler/package.json ./apps/scheduler/

# node_modules를 가지고 있는 이미지
# 이 이미지를 기반으로 각 workspace 별 이미지를 만들면 
# yarn install 레이어를 공유하게 된다.
FROM growth123/octodocs-modules:latest

# 호이스팅을 위해
COPY --from=builder /app /app

# 의존성 설치
RUN cd /app && yarn install --check-files && yarn cache clean