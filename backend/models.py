from . import db

class HighScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(100), unique=True, nullable=False)
    streak = db.Column(db.Integer, default=0)
    last_played = db.Column(db.Date, nullable=True)