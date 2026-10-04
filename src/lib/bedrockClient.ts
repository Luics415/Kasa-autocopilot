import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelWithResponseStreamCommand
} from "@aws-sdk/client-bedrock-runtime";
import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
  RetrieveCommand
} from "@aws-sdk/client-bedrock-agent-runtime";

export interface BedrockConfig {
  region: string;
  modelId: string;
  knowledgeBaseId?: string;
  isLive: boolean;
}

export function getBedrockConfig(): BedrockConfig {
  const isLive = process.env.AWS_MODE === "live";
  return {
    region: process.env.AWS_REGION || "us-east-1",
    modelId: process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-5-sonnet-20241022-v2:0",
    knowledgeBaseId: process.env.BEDROCK_KNOWLEDGE_BASE_ID,
    isLive
  };
}

let bedrockRuntimeClient: BedrockRuntimeClient | null = null;
let bedrockAgentRuntimeClient: BedrockAgentRuntimeClient | null = null;

export function getBedrockRuntimeClient(): BedrockRuntimeClient {
  if (!bedrockRuntimeClient) {
    const config = getBedrockConfig();
    bedrockRuntimeClient = new BedrockRuntimeClient({
      region: config.region,
      ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              sessionToken: process.env.AWS_SESSION_TOKEN
            }
          }
        : {})
    });
  }
  return bedrockRuntimeClient;
}

export function getBedrockAgentRuntimeClient(): BedrockAgentRuntimeClient {
  if (!bedrockAgentRuntimeClient) {
    const config = getBedrockConfig();
    bedrockAgentRuntimeClient = new BedrockAgentRuntimeClient({
      region: config.region,
      ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              sessionToken: process.env.AWS_SESSION_TOKEN
            }
          }
        : {})
    });
  }
  return bedrockAgentRuntimeClient;
}
