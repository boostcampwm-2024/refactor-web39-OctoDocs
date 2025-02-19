import { Injectable } from '@nestjs/common';

interface AbortEntry {
  controller: AbortController;
  createdAt: number;
}

@Injectable()
export class AbortService {
  private controllers: Map<string, AbortEntry> = new Map();
  private readonly TTL = 10 * 1000; // 10초 후 자동 삭제
  private readonly CHECK_INTERVAL = 2 * 1000; // 2초마다 체크

  constructor() {
    // 주기적으로 오래된 요청 정리
    setInterval(() => this.cleanupExpiredControllers(), this.CHECK_INTERVAL);
  }

  createController(requestId: string): AbortController {
    const controller = new AbortController();
    this.controllers.set(requestId, { controller, createdAt: Date.now() });

    return controller;
  }

  getController(requestId: string): AbortController | undefined {
    return this.controllers.get(requestId)?.controller;
  }

  abortRequest(requestId: string): boolean {
    const entry = this.controllers.get(requestId);
    if (entry) {
      entry.controller.abort();
      this.controllers.delete(requestId);
      console.log(`🚫 요청 중단됨: ${requestId}`);
      return true;
    }
    return false;
  }

  private cleanupExpiredControllers(): void {
    const now = Date.now();
    for (const [requestId, entry] of this.controllers) {
      if (now - entry.createdAt > this.TTL) {
        console.log(`⏳ TTL 만료: ${requestId} 요청 자동 중단`);
        entry.controller.abort();
        this.controllers.delete(requestId);
      }
    }
  }
}
