import unittest
import json
from scores import app, db

class HighScoreTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_post_highscore(self):
        response = self.app.post('/highscores',
                                 data=json.dumps({'player_name': 'eldenlord123', 'score': 100}),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('high score added', str(response.data))

    def test_get_highscores(self):
        self.app.post('/highscores',
                      data=json.dumps({'player_name': 'eldenlord123', 'score': 100}),
                      content_type='application/json')
        response = self.app.get('/highscores')
        self.assertEqual(response.status_code, 200)
        self.assertIn('eldenlord123', str(response.data))

    def test_get_highscore(self):
        self.app.post('/highscores',
                      data=json.dumps({'player_name': 'eldenlord123', 'score': 100}),
                      content_type='application/json')
        response = self.app.get('/highscores/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('eldenlord123', str(response.data))

    def test_delete_highscore(self):
        self.app.post('/highscores',
                      data=json.dumps({'player_name': 'eldenlord123', 'score': 100}),
                      content_type='application/json')
        response = self.app.delete('/highscores/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('high score deleted', str(response.data))

if __name__ == '__main__':
    unittest.main()
