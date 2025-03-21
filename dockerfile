# Use an official Python image as the base
FROM python:3.9-slim

# Install system dependencies (clang)
RUN apt-get update && apt-get install -y clang

# Set the working directory
WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create the uploads directory
RUN mkdir -p uploads

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Run the application with Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:$PORT", "app:app"]