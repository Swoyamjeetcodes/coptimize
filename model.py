import os
import subprocess
import numpy as np
import pandas as pd
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import time

# Load dataset
dataset_path = "features.csv"  # CSV file containing training data

try:
    df = pd.read_csv(dataset_path)
    X = df[['LOC', 'ForLoops', 'WhileLoops', 'IfStatements']].values  # Feature columns
    y = df['BestFlag'].values  # Target column

    # Train-Test Split (if needed)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestClassifier(class_weight='balanced', random_state=42)
    model.fit(X_train, y_train)
    print("Model trained successfully using dataset.")
except Exception as e:
    print(f"Error loading dataset: {e}")


def count_lines_of_code(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return sum(1 for line in f if line.strip())


def analyze_static_features(file_path):
    command = ["clang", "-Xclang", "-ast-dump=json", "-fsyntax-only", file_path]
    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        print("Error: Clang AST dump failed.")
        return 0, 0, 0

    try:
        ast = json.loads(result.stdout)
    except json.JSONDecodeError:
        print("Error: Failed to parse Clang AST output.")
        return 0, 0, 0

    def count_nodes(node, kind):
        if isinstance(node, dict):
            return (node.get("kind") == kind) + sum(count_nodes(v, kind) for v in node.values())
        if isinstance(node, list):
            return sum(count_nodes(item, kind) for item in node)
        return 0

    for_loops = count_nodes(ast, "ForStmt")
    while_loops = count_nodes(ast, "WhileStmt")
    if_statements = count_nodes(ast, "IfStmt")

    return for_loops, while_loops, if_statements


def extract_features_from_code(file_path):
    loc = count_lines_of_code(file_path)
    num_for_loops, num_while_loops, num_if_statements = analyze_static_features(file_path)
    return [loc, num_for_loops, num_while_loops, num_if_statements]


def optimize_code(file_path):
    try:
        features = extract_features_from_code(file_path)
        predicted_opt = model.predict([features])[0]
        return predicted_opt
    except Exception as e:
        print(f"Error during optimization: {e}")
        return None
