import unittest
import json
import uuid
from datetime import date, timedelta
from backend import create_app, db
from backend.models import Player

class StreakTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def _unique_name(self):
        return f"user_{uuid.uuid4().hex[:6]}"

    def test_new_streak(self):
        name = self._unique_name()
        res = self.client.post('/streak',
            data=json.dumps({'player_name': name}),
            content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()['streak'], 1)

    def test_consecutive_day_streak_increment(self):
        name = self._unique_name()
        with self.app.app_context():
            yesterday = date.today() - timedelta(days=1)
            db.session.add(Player(player_name=name, streak=3, last_played=yesterday))
            db.session.commit()

        res = self.client.post('/streak',
            data=json.dumps({'player_name': name}),
            content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()['streak'], 4)

    def test_non_consecutive_day_streak_reset(self):
        name = self._unique_name()
        with self.app.app_context():
            old_day = date.today() - timedelta(days=3)
            db.session.add(Player(player_name=name, streak=5, last_played=old_day))
            db.session.commit()

        res = self.client.post('/streak',
            data=json.dumps({'player_name': name}),
            content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()['streak'], 1)

    def test_already_played_today(self):
        name = self._unique_name()
        with self.app.app_context():
            today = date.today()
            db.session.add(Player(player_name=name, streak=2, last_played=today))
            db.session.commit()

        res = self.client.post('/streak',
            data=json.dumps({'player_name': name}),
            content_type='application/json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()['message'], 'already played')
        self.assertEqual(res.get_json()['streak'], 2)

if __name__ == '__main__':
    unittest.main()
