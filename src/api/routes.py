"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required
import hashlib

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def new_user():
    body = request.json

    try:
        hashed_password = hashlib.md5( body['password'].encode('utf-8') ).hexdigest()
        new_user = User(body['email'], hashed_password)
        print(new_user)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 200
    except Exception as err:
        return jsonify({"message": "Oops, there has been an error" + str(err)}), 500

@api.route('/login', methods=['POST'])
def login():
    email= request.json.get('email')
    password= request.json.get('password')

    if email == None or password == None:
        return jsonify({"Error, you MUST include an email and a password"})
    
    find_user = User.query.filter_by(email = email).first()
    if find_user == None:
        return jsonify({"Mesage": "Error, user not found"}), 404
    
    if find_user.password == hashlib.md5(password.encode('utf-8') ).hexdigest():
        return jsonify({"token": create_access_token(identity = find_user.email)}), 200
    
    return jsonify({"message": "Oops, the password doesn't match...Why?!"}), 401