terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-south-1"
  access_key = "AKIAU2HEQS3ZB5Y5Z5VQ"
  secret_key = "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"
}

# Setup authentication

