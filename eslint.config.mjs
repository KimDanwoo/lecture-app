import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';
import fsdBoundariesConfig from './eslint.fsd-boundaries.config.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
  {
    rules: {
      'no-console': 'error', // console.log 사용 금지
      'no-use-before-define': ['error', { functions: false }], // 함수 선언 전 사용 금지
      'comma-dangle': ['error', 'always-multiline'], // 마지막 요소 뒤에 쉼표 사용
      indent: ['error', 2], // 들여쓰기 2칸
      quotes: ['error', 'single'], // 싱글 쿼테이션 사용
      'eol-last': ['error', 'always'], // 파일 끝에 개행 문자 추가
      'no-trailing-spaces': 'error', // 빈 줄 끝에 공백 금지
      eqeqeq: ['error', 'always'], // 일치 연산자 사용
      'object-curly-spacing': ['error', 'always'], // 객체 리터럴 중괄호 사이에 공백 추가
      // TS 프로젝트에서 no-unused-vars는 @typescript-eslint 규칙이 더 정확하지만,
      // 요청대로 기본 규칙도 켜두고, TS 규칙도 함께 맞춥니다.
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none' }],
      'prefer-const': ['error'], // const 사용 권장
      'no-var': 'error', // var 사용 금지
      'max-len': ['error', { code: 120 }], // 코드 한 줄 길이 제한
      'no-shadow': 'error', // 변수 중복 선언 금지
      '@typescript-eslint/no-shadow': 'error',
      'arrow-body-style': ['error', 'as-needed'], // 필요할 때만 중괄호 사용
      'no-duplicate-imports': 'error', // 중복된 import 금지
      'prefer-template': 'error', // 문자열 연결 시 템플릿 리터럴 사용 권장
      'no-nested-ternary': 'error', // 중첩된 삼항 연산자 금지
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }], // 주석 앞에 공백 추가
    },
  },
  ...fsdBoundariesConfig,
]);

export default eslintConfig;
