import os
import subprocess
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from pycparser import c_parser, c_ast

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
    """Count the number of non-empty lines in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return sum(1 for line in f if line.strip())

def preprocess_c_file(file_path, fake_libc_include_path):
    """Preprocess the C file using the C preprocessor (cpp)."""
    try:
        # Run the C preprocessor
        command = [
            "cpp",
            "-I", fake_libc_include_path,  # Include the fake_libc_include directory
            file_path
        ]
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Preprocessing failed: {result.stderr}")
            return None
        return result.stdout
    except Exception as e:
        print(f"Error during preprocessing: {e}")
        return None

def analyze_static_features(file_path):
    """Analyze a C file to count for loops, while loops, and if statements."""
    # Path to the fake_libc_include folder
    fake_libc_include_path = os.path.join("utils", "fake_libc_include")
    
    # Preprocess the C file
    preprocessed_code = preprocess_c_file(file_path, fake_libc_include_path)
    if preprocessed_code is None:
        return 0, 0, 0  # Return default values if preprocessing fails
    
    # Initialize the C parser
    parser = c_parser.CParser()
    
    try:
        # Parse the preprocessed C code
        ast = parser.parse(preprocessed_code)
    except Exception as e:
        print(f"Error parsing C file: {e}")
        return 0, 0, 0  # Return default values if parsing fails
    
    # Counters for features
    for_loops = 0
    while_loops = 0
    if_statements = 0
    
    # Recursive function to traverse the AST
    def count_nodes(node):
        nonlocal for_loops, while_loops, if_statements
        if isinstance(node, c_ast.For):
            for_loops += 1
        elif isinstance(node, c_ast.While):
            while_loops += 1
        elif isinstance(node, c_ast.If):
            if_statements += 1
        
        # Recursively visit child nodes
        for _, child in node.children():
            count_nodes(child)
    
    # Start traversing the AST
    count_nodes(ast)
    
    return for_loops, while_loops, if_statements

def extract_features_from_code(file_path):
    """Extract features (LOC, for loops, while loops, if statements) from a C file."""
    loc = count_lines_of_code(file_path)
    num_for_loops, num_while_loops, num_if_statements = analyze_static_features(file_path)
    
    # Print the extracted features
    print("Extracted Features:")
    print(f"  - Lines of Code (LOC): {loc}")
    print(f"  - Number of For Loops: {num_for_loops}")
    print(f"  - Number of While Loops: {num_while_loops}")
    print(f"  - Number of If Statements: {num_if_statements}")
    
    return [loc, num_for_loops, num_while_loops, num_if_statements]

def optimize_code(file_path):
    """Predict the best optimization for a given C file."""
    try:
        features = extract_features_from_code(file_path)
        predicted_opt = model.predict([features])[0]
        return predicted_opt
    except Exception as e:
        print(f"Error during optimization: {e}")
        return None