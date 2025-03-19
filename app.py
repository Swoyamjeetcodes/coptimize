from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
import os
import uuid
from model import optimize_code

app = Flask(__name__)
CORS(app)  # Enable CORS

# Set upload folder
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result/<result>')
def result_page(result):
    return render_template('result.html', result=result)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' in request.files:
            c_file = request.files['file']
            if c_file.filename == '':
                return jsonify({'error': 'No file selected'}), 400

            file_path = os.path.join(UPLOAD_FOLDER, c_file.filename)
            c_file.save(file_path)

        elif 'code' in request.form:
            code = request.form['code']
            file_name = f'{uuid.uuid4()}.c'
            file_path = os.path.join(UPLOAD_FOLDER, file_name)
            with open(file_path, 'w') as f:
                f.write(code)

        else:
            return jsonify({'error': 'Invalid request'}), 400

        result = optimize_code(file_path)
        return redirect(url_for('result_page', result=result))

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure compatibility for both Render and local development
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
