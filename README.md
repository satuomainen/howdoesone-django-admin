# My Credit Cards App

"Totally legit super secure app for storing my Credit Card data and serving it
to a mobile app."

These are my notes on how to create a quick-and-dirty mockup of a simple Django
web app backend with a generated CRUD for managing the displayed data.

## How did I set this up?

`mkdir djangocrud`
`cd djangocrud`
`python3 -m venv venv`
`source venv/bin/activate`
`pip install django`
`pip install djangorestframework`
`pip install django-cors-headers`
`django-admin startproject project`
`./manage.py startapp mycreditcards`

## Ok, setup done. What next?

Add the app and the REST framwork module to the `project/settings.py`:
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'mycreditcards'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # as first entry
    ...
]

```

Define models in [mycreditcards/models.py](mycreditcards/models.py), create
migrations for them and finally run the migrations to create the database
tables.

`./manage.py makemigrations`
`./manage.py migrate`

If you change the model, you should make and create the migrations again. To
completely start from scratch (and lose any DB data) you can just delete
all the files in the `migrations` (except `__init__.py`) and also the file
`db.sqlite3` in the repo root.

## Manage data in the database with the powers of django admin!

`./manage.py createsuperuser` (for example, admin/kissa123). Note that you have
to run this again if you delete the file `db.sqlite3`.

Edit [mycreditcards/admin.py](mycreditcards/admin.py) and register all the
models there.

Then just run the adming server and be amazed:

`./manage.py runserver` and browse to the [admin view](http://127.0.0.1:8000/admin)

# Prepare the REST API

To turn the models into JSON, we need serializer classes. Take a look in
[mycreditcards/serializers.py](mycreditcards/serializers.py).

Then the JSON views need to be specified as responses to HTTP requests, i.e. the
objects are rendered as JSON objects instead of HTML documents. See
[mycreditcards/views.py](mycreditcards/views.py).

Finally, the routes were added to [project/urls.py](project/urls.py).

# Run the app in the devenv

`npm run publish:app` will build the React frontend app and put it to where the Django
development server will serve it to you at `http://localhost:8000`.

# Run the app in production

No, do not :-)
