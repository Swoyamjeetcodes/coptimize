# COptimize 🚀🔥⚡

COptimize is a web-based tool that analyzes C code and suggests the best compiler optimization flag based on extracted features. The project leverages machine learning to predict the most suitable optimization setting, with a focus on reducing execution time by recommending flags such as `-O0`, `-O1`, `-O2`, `-O3`, and `-Ofast` for performance enhancement. 🎯📊💡

## Live Website 🌍🔗✨

The application is hosted at: [COptimize](https://coptimize.onrender.com/)

## Features ⚙️📌🚀

- Upload C code as a file or paste it into a text box.
- Extracts static code features such as Lines of Code (LOC), loop counts, and conditionals.
- Uses a trained machine learning model to predict the best compiler optimization flag.
- Provides optimization recommendations instantly.

## Tech Stack 🖥️🔬💻

- **Backend**: Flask
- **Machine Learning**: scikit-learn (Random Forest Classifier)
- **Frontend**: HTML, CSS, JavaScript (via templates)
- **Deployment**: Render.com

## Installation 🛠️📦⚡

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Swoyamjeetcodes/coptimize.git
   cd coptimize
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

5. Open the application in your browser at:
   ```
   http://localhost:5000
   ```

## Project Structure 📂📝📁

```
├── app.py             # Flask application
├── model.py           # Machine learning model for optimization
├── features.csv       # Training dataset
├── requirements.txt   # Dependencies
├── templates/         # HTML templates
├── static/            # Static assets (CSS, JS)
└── uploads/           # Directory for uploaded C files
```

## Usage 🎯🖥️🚀

1. Visit the hosted application or run it locally.
2. Upload a C file or enter code manually.
3. Click submit to analyze the code.
4. The application will predict and display the best optimization flag.

## Dependencies 📌📜💡

The required dependencies are listed in `requirements.txt`:
- Flask
- scikit-learn
- pycparser
- pandas
- numpy
- gunicorn

## License 📜🔓✅

This project is licensed under the MIT License. 🎉⚖️📖

