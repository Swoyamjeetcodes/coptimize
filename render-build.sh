#!/usr/bin/env bash

# Update package list and install clang
apt-get update && apt-get install -y clang

# Continue with Python dependencies
pip install -r requirements.txt
