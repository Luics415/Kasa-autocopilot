variable "aws_region" {
  description = "AWS region for Amazon Bedrock and OpenSearch Serverless"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (staging, prod)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name tag"
  type        = string
  default     = "kasa-autocopilot"
}

variable "bedrock_model_id" {
  description = "Amazon Bedrock foundation model ID"
  type        = string
  default     = "anthropic.claude-3-5-sonnet-20241022-v2:0"
}
