# 베이스 이미지를 postgres:16으로 설정
FROM postgres:16

# 시스템 패키지 업데이트 및 설치
RUN apt update -y && \
    apt install -y --no-install-recommends \
    wget \
    build-essential \
    postgresql-server-dev-16 \
    automake \
    unzip \
    libmecab-dev \
    git && \
    \
    # pgvector 설치
    cd /tmp && \
    wget --no-check-certificate https://github.com/pgvector/pgvector/archive/refs/tags/v0.8.0.tar.gz && \
    tar -xvzf v0.8.0.tar.gz && \
    cd pgvector-0.8.0 && \
    make && \
    make install && \
    \
    # mecab-ko 설치
    cd /tmp && \
    wget --no-check-certificate https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz && \
    tar xvfz mecab-0.996-ko-0.9.2.tar.gz && \
    cd mecab-0.996-ko-0.9.2 && \
    ./configure CC=gcc CXX=g++ CFLAGS="-m64" CXXFLAGS="-m64" && \
    make && \
    make install && \
    \
    # mecab-ko-dic 설치
    cd /tmp && \
    wget --no-check-certificate https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/mecab-ko-dic-2.1.1-20180720.tar.gz && \
    tar xvfz mecab-ko-dic-2.1.1-20180720.tar.gz && \
    cd mecab-ko-dic-2.1.1-20180720 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make install && \
    \
    # textsearch_ko 설치
    cd /tmp && \
    git config --global http.sslVerify false && \
    git clone https://github.com/i0seph/textsearch_ko.git && \
    cd textsearch_ko && \
    make USE_PGXS=1 && \
    make USE_PGXS=1 install && \
    cp ts_mecab_ko.sql /docker-entrypoint-initdb.d/ && \
    \
    # 불필요한 파일 및 패키지 제거
    apt remove -y wget git build-essential automake unzip && \
    apt autoremove -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* /tmp/*

# 초기화 SQL 스크립트 복사
COPY services/postgres/init.sql /docker-entrypoint-initdb.d/init.sql

# PostgreSQL 컨테이너 기본 명령어 설정
CMD ["postgres"]
