from pandas import read_csv, DataFrame
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from feature_extraction import feature_extraction

# Load dataset and split it into training and testing sets
df = read_csv('pdfdataset_n.csv')
X = df.iloc[:, 0:21]
y = df.iloc[:, 21]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# Train the Random Forest model
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Path to the PDF file to be analyzed
path = r'C:\Users\routa\Downloads\B_en_A_sujet_eco_2021.pdf'
features = feature_extraction(path)

# Check if features are correctly extracted and reshaped
if len(features) > 0:
    # Convert features to DataFrame with appropriate column names
    features_df = DataFrame(features, columns=X.columns)
    result = clf.predict(features_df)
    
    # Display the appropriate message based on the prediction
    if result[0] == 'yes':  # Assuming 'yes' indicates a malicious PDF
        print("The PDF is malicious.")
    else:  # Assuming 'no' indicates a legitimate PDF
        print("The PDF is legitimate.")
else:
    print("Feature extraction failed. No features extracted.")
