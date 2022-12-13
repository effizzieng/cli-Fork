/**
 * Copyright 2022 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import dotenv from "dotenv";

import type { FluenceEnv } from "../environment.d";

import { NETWORKS } from "./multiaddr";

export const FLUENCE_ENV = "FLUENCE_ENV";

dotenv.config();

const resolveEnvVariable = <T>(
  variableName: string,
  isValid: (v: unknown) => v is T,
  defaultVariable: T
): T => {
  const variable = process.env[variableName];

  if (variable === undefined) {
    return defaultVariable;
  }

  if (!isValid(variable)) {
    throw new Error(
      `Invalid environment variable: ${variableName}="${variable}"`
    );
  }

  return variable;
};

process.env[FLUENCE_ENV] = resolveEnvVariable(
  FLUENCE_ENV,
  (v): v is FluenceEnv => NETWORKS.some((n) => n === v) || v === "local",
  "kras"
);
