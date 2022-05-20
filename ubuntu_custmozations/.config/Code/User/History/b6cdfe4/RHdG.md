# Malicious address detection

## Description

This agent checks transactions against a pre-defined list of addresses that are known to have been involved in public hacks.

## Supported Chains

- Ethereum

## Alerts

- HAL-MALICIOUS-ADDR
  - Fired when the malicious address is initiating a transaction
  - Severity is always set to "medium"
  - Type is always set to "suspicious"
  - Metadata field contains to and from addresses, transaction value, and the malicious address

## Test Data

The agent behavior can be verified with the following block:
- block: 13125071
- transaction: 0x6bb7039bd0bff1083c7d651ec32065239e574c3c8034a44ec6859f87b9e01dc9

To run unit tests:
- python3 -m pytest -sv

