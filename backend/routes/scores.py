from flask import Blueprint, request, jsonify
from .. import db
from ..models import HighScore

highscores_bp = Blueprint('highscores', __name__)

@highscores_bp.route('/highscores', methods=['POST'])
def post_highscore():
    data = request.json
    new_score = HighScore(player_name=data['player_name'], score=data['score'])
    db.session.add(new_score)
    db.session.commit()
    return jsonify({'message': 'high score added'}), 201

@highscores_bp.route('/highscores', methods=['GET'])
def get_highscores():
    high_scores = HighScore.query.all()
    result = [{'player_name': hs.player_name, 'score': hs.score} for hs in high_scores]
    return jsonify(result), 200

@highscores_bp.route('/highscores/<int:id>', methods=['GET'])
def get_highscore(id):
    highscore = HighScore.query.get(id)
    if highscore:
        return jsonify({'player_name': highscore.player_name, 'score': highscore.score}), 200
    else:
        return jsonify({'message': 'high score not found'}), 404

@highscores_bp.route('/highscores/<int:id>', methods=['DELETE'])
def delete_highscore(id):
    highscore = HighScore.query.get(id)
    if highscore:
        db.session.delete(highscore)
        db.session.commit()
        return jsonify({'message': 'high score deleted'}), 200
    else:
        return jsonify({'message': 'high score not found'}), 404

@highscores_bp.route('/highscores/delete_all', methods=['DELETE'])
def delete_all_highscores():
    try:
        num_rows_deleted = db.session.query(HighScore).delete()
        db.session.commit()
        return jsonify({'message': f'all high scores deleted ({num_rows_deleted} rows)'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'error deleting high scores: {str(e)}'}), 500
