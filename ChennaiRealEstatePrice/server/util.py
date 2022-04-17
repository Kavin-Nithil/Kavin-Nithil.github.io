import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None
__mzzone = None
__salecond = None
__park = None
__type=None
__road=None

def get_estimated_price(location,sqft,dist,bed,bath,room,sale_cond,park,build_type,Street,zone,age):
    X = np.zeros(12)
    X[0] = __locations.index(location.lower())
    X[1] = sqft
    X[2] = dist
    X[3] = bed
    X[4] = bath
    X[5] = room
    X[6] = __salecond.index(sale_cond.lower())
    X[7] = __park.index(park.lower())
    X[8] = __type.index(build_type.lower())
    X[9] = __road.index(Street.lower())
    X[10] = __mzzone.index(zone.lower())
    X[11] = age

    return __model.predict([X])[0]

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations
    global __mzzone
    global __salecond
    global __park
    global __type
    global __road

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[5:12]  # first 3 columns are sqft, bath, bhk
        __mzzone = __data_columns[12:18]
        __salecond = __data_columns[18:23]
        __park = __data_columns[23:25]
        __type = __data_columns[25:28]
        __road = __data_columns[28:31]

    global __model
    if __model is None:
        with open('./artifacts/TARP_PROJECT(WEBSITE).pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns
def get_mzzone():
    return __mzzone

def get_park():
    return __park
def get_salecond():
    return __salecond
def get_type():
    return __type
def get_road():
    return __road

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_data_columns())
    print(get_location_names())
    print(get_park())
    print(get_salecond())
    print(get_type())
    print(get_road())
    print(get_estimated_price('Karapakkam',1200,200,3,2,5,'Family','Yes','House','Paved','RH',10000))
    print(get_estimated_price('Chrompet',800,500,2,1,4,'AbNormal','No','Commercial','Paved','I',1200))
    print(get_estimated_price('T Nagar',1700,110,3,1,4,'Family','Yes','Others','Paved','RM',365))
    print(get_estimated_price('KK Nagar',600,200,1,1,2,'AbNormal','No','Commercial','Paved','RH',120000))
