import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { pull } from 'langchain/hub';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
});
// Embeddings 초기화
const embeddings = new HuggingFaceTransformersEmbeddings({
  model: 'Xenova/all-MiniLM-L6-v2',
});

@Injectable()
export class LangchainService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async query(question: string) {
    const promptTemplate = await pull('rlm/rag-prompt');
    const queryEmbeddings = await embeddings.embedQuery(question);
    // const retrievedDocs = await this.dataSource.query(
    //   `SELECT content FROM page ORDER BY embedding <=> '[${queryEmbeddings.join(',')}]' LIMIT 1;`,
    // );
    const retrievedDocs = await this.dataSource.query(
      `
      select document from hybrid_search(
        '${question}',
        '[${queryEmbeddings.join(',')}]'::vector(384),
        5
      );
      `,
    );
    // const retrievedDocs = await this.vectorStore.similaritySearch(question, 1);
    retrievedDocs.forEach((doc) => {
      console.log(doc.document);
    });
    // const docsContent = retrievedDocs
    //   .map((doc) => {
    //     return this.extractTextValues(JSON.parse(JSON.stringify(doc.content)));
    //   })
    //   .join('\n');
    const docsContent = retrievedDocs.map((doc) => doc.document).join('\n');

    const messages = await promptTemplate.invoke({
      question: question,
      context: docsContent,
    });
    return await llm.stream(messages);
  }
  /**
   *
   * @param pageContent 페이지 변경 사항 JSON
   * @returns JSON 중 text key만 추출해서 합친 문자열
   */
  extractTextValues(pageContent: object) {
    const result: string[] = [];
    const stack: any[] = [pageContent]; // 스택을 사용하여 JSON 탐색

    while (stack.length > 0) {
      const current = stack.pop();

      if (typeof current === 'object' && current !== null) {
        if (Array.isArray(current)) {
          // 배열이면 모든 요소를 스택에 추가
          stack.push(...current);
        } else {
          // 객체면 다시 탐색
          for (const [key, value] of Object.entries(current)) {
            if (key === 'text') {
              result.push(String(value));
            } else {
              stack.push(value);
            }
          }
        }
      }
    }

    return result.join('\n');
  }
}
