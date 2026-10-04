terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# S3 Bucket for Raw OEM Workshop Manuals
resource "aws_s3_bucket" "manuals_bucket" {
  bucket        = "${var.project_name}-workshop-manuals-${var.aws_region}"
  force_destroy = false
}

resource "aws_s3_bucket_versioning" "manuals_versioning" {
  bucket = aws_s3_bucket.manuals_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "manuals_encryption" {
  bucket = aws_s3_bucket.manuals_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "manuals_block_public" {
  bucket = aws_s3_bucket.manuals_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# DynamoDB Table for Diagnostic Sessions & Audit Logs
resource "aws_dynamodb_table" "diagnostic_sessions" {
  name         = "${var.project_name}-diagnostic-sessions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "vin"
  range_key    = "query_timestamp"

  attribute {
    name = "vin"
    type = "S"
  }

  attribute {
    name = "query_timestamp"
    type = "N"
  }

  point_in_time_recovery {
    enabled = true
  }
}
