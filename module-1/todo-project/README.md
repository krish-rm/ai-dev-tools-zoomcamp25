# Django TODO Application

A simple and elegant TODO application built with Django, featuring full CRUD operations, due dates, and resolved status tracking.

## Features

- ✅ Create, edit, and delete TODOs
- 📅 Assign due dates to TODOs
- ✓ Mark TODOs as resolved/unresolved
- 🎨 Modern and responsive UI
- 🧪 Comprehensive test coverage

## Requirements

- Python 3.10+
- Django 5.2.8

## Installation

1. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Start the development server:
```bash
python manage.py runserver
```

5. Open your browser and navigate to `http://127.0.0.1:8000/`

## Running Tests

To run all tests:
```bash
python manage.py test
```

## Project Structure

```
01-todo/
├── manage.py
├── requirements.txt
├── todo_project/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── todos/                 # TODO app
│   ├── models.py         # Todo model
│   ├── views.py          # View functions
│   ├── urls.py           # App URL configuration
│   ├── tests.py          # Test cases
│   └── migrations/       # Database migrations
└── templates/            # HTML templates
    ├── base.html
    ├── home.html
    ├── create_todo.html
    ├── edit_todo.html
    └── delete_todo.html
```

## Usage

1. **Create a TODO**: Click "Create New TODO" button and fill in the form
2. **Edit a TODO**: Click "Edit" button on any TODO item
3. **Mark as Resolved**: Click "Mark as Resolved" to toggle the status
4. **Delete a TODO**: Click "Delete" button and confirm deletion


