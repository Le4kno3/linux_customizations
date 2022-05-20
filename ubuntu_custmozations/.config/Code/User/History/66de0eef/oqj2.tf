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
  secret_key = "qnuBK7WVX8dOnho48Z0j+VAq/OZfGg23gkRcESN+"
}

# Setup authentication

# Deploy a new instance
# resource "aws_vpc" "example" {
#   cidr_block = "10.0.0.0/16"
# }
# resource "aws_instance" "my-first-server" {     # here the name "web" is not the name of the instance, it is like a reference to the instance for AMI. Like alias.
#   ami           = "ami-0851b76e8b1bce90b"        # It is id of the type of OS you want to install.
#   instance_type = "t2.micro"
#   tags = {
#       Name = "testing"
#   }
# }