from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import joblib
from flask_cors import CORS
from pandas import DataFrame
from feature_extraction import feature_extraction  # Assurez-vous que ce module est dans votre chemin de travail

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

model_filename = r'random_forest_model.pkl'
try:
    clf = joblib.load(model_filename)
    print(f'Modèle chargé depuis {model_filename}')
except Exception as e:
    print(f'Erreur lors du chargement du modèle : {e}')
    clf = None

columns = ['obj', 'endobj', 'stream', 'endstream', 'xref', 'trailer', 'startxref', 
           'Page', 'Encrypt', 'ObjStm', 'JS', 'Javascript', 'AA', 'OpenAction', 
           'AcroForm', 'JBIG2Decode', 'RichMedia', 'Launch', 'EmbeddedFile', 'XFA', 
           'Colors']

@app.route('/pdf_detection', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'Aucun fichier sélectionné'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'message': 'Nom de fichier invalide'}), 400

        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            try:
                features = feature_extraction(filepath)
            except Exception as e:
                return jsonify({'message': 'Erreur lors de l\'extraction des caractéristiques'}), 500
            if len(features) > 0 and len(features[0]) == len(columns):
                features_df = DataFrame(features, columns=columns)
                try:
                    result = clf.predict(features_df)
                except Exception as e:
                    return jsonify({'message': 'Erreur lors de la prédiction'}), 500
                if result[0] == 'yes':
                    message = "Le PDF est malveillant."
                else:
                    message = "Le PDF est légitime."
            else:
                message = "Échec de l'extraction des caractéristiques ou nombre de caractéristiques incorrect."
            os.remove(filepath)
            return jsonify({'message': message})
        else:
            return jsonify({'message': 'Format de fichier non pris en charge. Veuillez télécharger un fichier PDF.'}), 400
    except Exception as e:
        return jsonify({'message': 'Erreur lors de l\'analyse du fichier.'}), 500

if __name__ == '__main__': 
    app.run(debug=False, port=5003)
