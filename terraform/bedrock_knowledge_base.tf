# IAM Role for Bedrock Knowledge Base Execution
resource "aws_iam_role" "bedrock_kb_role" {
  name = "${var.project_name}-bedrock-kb-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "bedrock.amazonaws.com"
        }
      }
    ]
  })
}

# Policy allowing Bedrock to read from S3 and invoke Titan Embeddings
resource "aws_iam_role_policy" "bedrock_kb_policy" {
  name = "${var.project_name}-bedrock-kb-policy"
  role = aws_iam_role.bedrock_kb_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel"
        ]
        Resource = "arn:aws:bedrock:${var.aws_region}::foundation-model/amazon.titan-embed-text-v1"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.manuals_bucket.arn,
          "${aws_s3_bucket.manuals_bucket.arn}/*"
        ]
      }
    ]
  })
}

# OpenSearch Serverless Security Policies
resource "aws_opensearchserverless_security_policy" "encryption_policy" {
  name = "${var.project_name}-enc"
  type = "encryption"

  policy = jsonencode({
    Rules = [
      {
        ResourceType = "collection"
        Resource = [
          "collection/${var.project_name}-vector-db"
        ]
      }
    ]
    AWSOwnedKey = true
  })
}

resource "aws_opensearchserverless_security_policy" "network_policy" {
  name = "${var.project_name}-net"
  type = "network"

  policy = jsonencode({
    Rules = [
      {
        ResourceType = "collection"
        Resource = [
          "collection/${var.project_name}-vector-db"
        ]
        AllowFromPublic = true
      }
    ]
  })
}

# OpenSearch Serverless Collection for Vector Storage
resource "aws_opensearchserverless_collection" "vector_collection" {
  name       = "${var.project_name}-vector-db"
  type       = "VECTORSEARCH"
  depends_on = [aws_opensearchserverless_security_policy.encryption_policy]
}
