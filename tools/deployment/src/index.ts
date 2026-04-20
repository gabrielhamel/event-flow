import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function parseEnvContent(content: string): Record<string, string> {
  const env: Record<string, string> = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    env[key] = value;
  }
  return env;
}

const deploymentEnv = parseEnvContent(requireEnv("DEPLOYMENT_ENV_CONTENT"));

const portainerUrl = requireEnv("PORTAINER_URL");
const portainerUser = requireEnv("PORTAINER_USER");
const portainerPassword = requireEnv("PORTAINER_PASSWORD");
const stackId = requireEnv("STACK_ID");
const endpointId = requireEnv("ENDPOINT_ID");

console.log("1️⃣  Authenticating with Portainer...");

const authResponse = await fetch(`${portainerUrl}/api/auth`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    Username: portainerUser,
    Password: portainerPassword,
  }),
});

if (!authResponse.ok) {
  throw new Error(`Authentication failed: ${authResponse.status} ${authResponse.statusText}`);
}

const { jwt } = (await authResponse.json()) as { jwt: string };

if (!jwt) {
  throw new Error("Failed to get JWT from Portainer");
}

console.log("✅ JWT obtained successfully");

console.log("2️⃣  Triggering stack update...");

const stackFileContent = readFileSync(resolve(process.cwd(), "stack.yml"), "utf-8");

const updateResponse = await fetch(
  `${portainerUrl}/api/stacks/${stackId}?endpointId=${endpointId}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Env: Object.entries(deploymentEnv).map(([name, value]) => ({
        name,
        value,
      })),
      Prune: true,
      RepullImageAndRedeploy: true,
      StackFileContent: stackFileContent,
    }),
  },
);

if (!updateResponse.ok) {
  const body = await updateResponse.text();
  throw new Error(
    `Stack update failed: ${updateResponse.status} ${updateResponse.statusText}\n${body}`,
  );
}

console.log("✅ Stack update triggered successfully");
