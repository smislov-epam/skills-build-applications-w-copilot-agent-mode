from django.core.management.base import BaseCommand
from octofit_tracker.models.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Users
        users = [
            User(email='tony@stark.com', name='Iron Man', team='Marvel', is_superhero=True),
            User(email='steve@rogers.com', name='Captain America', team='Marvel', is_superhero=True),
            User(email='bruce@wayne.com', name='Batman', team='DC', is_superhero=True),
            User(email='clark@kent.com', name='Superman', team='DC', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Activities
        activities = [
            Activity(user='tony@stark.com', activity_type='Running', duration=30, date=date.today()),
            Activity(user='steve@rogers.com', activity_type='Cycling', duration=45, date=date.today()),
            Activity(user='bruce@wayne.com', activity_type='Swimming', duration=25, date=date.today()),
            Activity(user='clark@kent.com', activity_type='Flying', duration=60, date=date.today()),
        ]
        Activity.objects.bulk_create(activities)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=150)
        Leaderboard.objects.create(team='DC', points=170)

        # Workouts
        workouts = [
            Workout(name='Super Strength', description='Strength workout for superheroes', difficulty='Hard'),
            Workout(name='Agility Training', description='Agility and speed drills', difficulty='Medium'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
