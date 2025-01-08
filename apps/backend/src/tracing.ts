import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
// import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
} from '@opentelemetry/semantic-conventions';
import * as process from 'process';

export function initializeTracing() {
  const sdk = new NodeSDK({
    // 데이터를 콘솔에 출력할 백엔드 설정
    traceExporter: new ConsoleSpanExporter(),
    // 자동화된 감지, 설정
    instrumentations: [
      getNodeAutoInstrumentations({
        // 추적 1. HTTP 요청/응답 추적
        '@opentelemetry/instrumentation-http': {
          enabled: true,
        },
        // 추적 2. Express 미들웨어 추적
        '@opentelemetry/instrumentation-express': {
          enabled: true,
        },
        // 추적 3. PostgreSQL 쿼리 추적
        '@opentelemetry/instrumentation-pg': {
          enabled: true,
        },
      }),
    ],
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'OctoDocs Service',
      [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]:
        process.env.NODE_ENV || 'development',
    }),
  });

  // OpenTelemetry 트레이싱 기능 활성화
  sdk.start();

  // 애플리케이션 종료 시 SDK 해제, 리소스 해제
  process.on('SIGTERM', async () => {
    await sdk.shutdown();
    process.exit(0);
  });

  // sdk 객체 반환
  return sdk;
}
