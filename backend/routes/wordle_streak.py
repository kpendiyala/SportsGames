from flask import Blueprint, request, jsonify
from datetime import date, timedelta
from .. import db
from ..models import Player

streak_bp = Blueprint('streak', __name__)

@streak_bp.route('/streak', methods=['POST'])
def update_streak():
    data = request.json
    name = data['player_name']
    today = date.today()

    player = Player.query.filter_by(player_name=name).first()

    if not player:
        player = Player(player_name=name, streak=1, last_played=today)
        db.session.add(player)
    else:
        if player.last_played == today:
            return jsonify({'message': 'already played', 'streak': player.streak}), 200
        elif player.last_played == today - timedelta(days=1):
            player.streak += 1
        else:
            player.streak = 1
        player.last_played = today

    db.session.commit()
    return jsonify({'message': 'Streak updated', 'streak': player.streak}), 200
