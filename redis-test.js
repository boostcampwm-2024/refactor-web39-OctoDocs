const Redis = require("ioredis");

// Redis 클라이언트 생성
const redis = new Redis({
  host: "localhost",
  port: 6379,
});

// 여러 개의 node와 page 정보를 삽입하는 함수
async function insertData() {
  const nodes = [];
  const pages = [];

  // node:1부터 node:100까지 생성
  for (let i = 1; i <= 1000; i++) {
    const x = 180;
    const y = 479;
    const color = "#FFFFFF";

    // nodes.push({
    //   id: i,
    //   x: x,
    //   y: y,
    //   color: color,
    // });

    const content = `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"페이지 내용 ${i}"}]}]}`;
    const title = `페이지 제목 ${i}`;

    pages.push({
      id: i,
      content: content,
      title: title,
    });
  }

  // node 정보 삽입
  // for (const node of nodes) {
  //   await redis.hmset(
  //     `node:${node.id}`,
  //     "x",
  //     node.x,
  //     "y",
  //     node.y,
  //     "color",
  //     node.color
  //   );
  //   console.log(`Inserted node:${node.id}`);
  // }

  // page 정보 삽입
  for (const page of pages) {
    await redis.hmset(
      `page:${page.id}`,
      "content",
      page.content,
      "title",
      page.title
    );
    console.log(`Inserted page:${page.id}`);
  }

  console.log("Data insertion complete");
}

insertData();
