def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()