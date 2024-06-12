import joblib
from pandas import read_csv
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Charger le dataset et le diviser en ensembles d'entraînement et de test
df = read_csv('pdfdataset_n.csv')
X = df.iloc[:, 0:21]
y = df.iloc[:, 21]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Entraîner le modèle Random Forest
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Sauvegarder le modèle entraîné dans un fichier
model_filename = 'random_forest_model.pkl'
joblib.dump(clf, model_filename)
print(f"Modèle sauvegardé dans {model_filename}")
