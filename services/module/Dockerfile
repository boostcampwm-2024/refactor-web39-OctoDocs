# node_modules를 가지고 있는 이미지
# 이 이미지를 기반으로 각 workspace 별 이미지를 만들면 
# yarn install 레이어를 공유하게 된다.
FROM summersummerwhy/octodocs-modules:latest

WORKDIR /app

# 호이스팅을 위해
COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/websocket/package.json ./apps/websocket/

# 의존성 설치
RUN yarn install --check-files