#!/bin/bash
set -e  # Stop on error

echo "Updating system packages..."
apt-get update

echo "Installing Clang..."
apt-get install -y clang

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Build completed successfully!"
