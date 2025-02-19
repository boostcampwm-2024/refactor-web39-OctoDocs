import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';

@Injectable()
export class AbortService {
  private cache = new NodeCache({ stdTTL: 10, checkperiod: 2 });

  createController(requestId: string): AbortController {
    const controller = new AbortController();
    this.cache.set(requestId, controller);

    return controller;
  }

  getController(requestId: string): AbortController | undefined {
    return this.cache.get(requestId);
  }

  abortRequest(requestId: string): boolean {
    const controller = this.cache.get<AbortController>(requestId);
    if (controller) {
      controller.abort();
      this.cache.del(requestId);
      return true;
    }
    return false;
  }
}
