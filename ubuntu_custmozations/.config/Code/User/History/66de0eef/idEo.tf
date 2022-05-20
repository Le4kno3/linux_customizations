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
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  tags = {
    Name = "HelloWorld"
  }
}