/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TASK_SERVICE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
