import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatAbortService {
  private controllers: Map<
    string,
    { controller: AbortController; timestamp: number }
  > = new Map();
  private ttl: number = 60000;

  constructor() {
    setInterval(() => this.cleanup(), 10000);
  }

  createController(requestId: string): AbortController {
    const controller = new AbortController();
    const timestamp = Date.now();
    this.controllers.set(requestId, { controller, timestamp });
    return controller;
  }

  getController(requestId: string): AbortController | undefined {
    return this.controllers.get(requestId)?.controller;
  }

  abortRequest(requestId: string): boolean {
    const entry = this.controllers.get(requestId);
    if (entry) {
      if (entry.controller.signal.aborted) {
        // 이미 취소된 경우, 추가 작업을 하지 않음
        console.log(`Request with ID ${requestId} is already aborted.`);
        return false;
      }

      entry.controller.abort();
      this.controllers.delete(requestId);
      return true;
    }
    return false;
  }

  private cleanup(): void {
    const now = Date.now();
    this.controllers.forEach((entry, requestId) => {
      if (now - entry.timestamp > this.ttl) {
        this.controllers.delete(requestId);
      }
    });
  }
}
