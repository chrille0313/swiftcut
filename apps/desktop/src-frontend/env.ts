import { createEnv } from "@t3-oss/env-core";

// SwiftCut runs fully local - there are no required environment variables yet.
// When cloud/AI features land, declare VITE_-prefixed client vars here (with zod
// validation) and consumers import `env` instead of reading `import.meta.env`.
export const env = createEnv({
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
