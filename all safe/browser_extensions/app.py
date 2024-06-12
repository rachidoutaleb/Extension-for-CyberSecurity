from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
f_log = open("log.txt",'w+')
CORS(app)
@app.route('/api/data', methods=['POST'])
def process_data():
    print("received = ",request)
    if request.is_json:
        data = request.json
        if 'data' in data:
            received_data = data['data']
            print("data body content : "+ received_data)
            f_log.close()
            response = {'message': 'Received data successfully', 'received_data': received_data}
            return jsonify(response), 200
        else:
            return jsonify({'error': 'No data key found in the JSON'}), 400
    else:
        return jsonify({'error': 'Request must be in JSON format'}), 400

if __name__ == '__main__':
    app.run(debug=True)

