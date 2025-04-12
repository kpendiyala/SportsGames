from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#initializes the database 
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///players.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        from .models import Player, HighScore
        db.create_all()

    from .routes.scores import highscores_bp
    from .routes.wordle_streak import streak_bp
    app.register_blueprint(highscores_bp)
    app.register_blueprint(streak_bp)

    return app