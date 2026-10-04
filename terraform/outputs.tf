output "s3_manuals_bucket_name" {
  description = "Name of the S3 bucket storing raw OEM workshop manuals"
  value       = aws_s3_bucket.manuals_bucket.id
}

output "opensearch_collection_arn" {
  description = "ARN of the OpenSearch Serverless collection"
  value       = aws_opensearchserverless_collection.vector_collection.arn
}

output "dynamodb_sessions_table" {
  description = "Name of the DynamoDB diagnostic sessions table"
  value       = aws_dynamodb_table.diagnostic_sessions.name
}
