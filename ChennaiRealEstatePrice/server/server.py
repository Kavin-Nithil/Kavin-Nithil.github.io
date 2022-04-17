from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_mzzone_names', methods=['GET'])
def get_mzzone_names():
    response = jsonify({
        'Zone': util.get_mzzone()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_park_names', methods=['GET'])
def get_park_names():
    response = jsonify({
        'Parking_Facility': util.get_park()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_road_names', methods=['GET'])
def get_road_names():
    response = jsonify({
        'Road_Type': util.get_road()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_salecond_names', methods=['GET'])
def get_salecond_names():
    response = jsonify({
        'Sale_Condition': util.get_salecond()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_type_names', methods=['GET'])
def get_type_names():
    response = jsonify({
        'Build_Type': util.get_type()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET','POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    dist = int(request.form['dist'])
    bed = int(request.form['bed'])
    bath = int(request.form['bath'])
    room = int(request.form['room'])
    sale_cond = request.form['sale_cond']
    park = request.form['park']
    build_type = request.form['build_type']
    street = request.form['street']
    zone = request.form['zone']
    age = int(request.form['age'])


    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,dist,bed,bath,room,sale_cond,park,build_type,street,zone,age)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()