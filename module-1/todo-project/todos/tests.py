from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from datetime import date, timedelta
from .models import Todo


class TodoModelTest(TestCase):
    """Test the Todo model"""
    
    def setUp(self):
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="This is a test todo",
            due_date=date.today() + timedelta(days=7)
        )
    
    def test_todo_creation(self):
        """Test that a todo can be created"""
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertEqual(self.todo.description, "This is a test todo")
        self.assertFalse(self.todo.is_resolved)
        self.assertIsNotNone(self.todo.created_at)
    
    def test_todo_str(self):
        """Test the string representation of Todo"""
        self.assertEqual(str(self.todo), "Test Todo")
    
    def test_todo_ordering(self):
        """Test that todos are ordered by created_at descending"""
        from time import sleep
        sleep(0.01)  # Small delay to ensure different timestamps
        todo2 = Todo.objects.create(title="Second Todo")
        todos = list(Todo.objects.all())
        # Most recent should be first
        self.assertEqual(todos[0], todo2)
        self.assertEqual(todos[1], self.todo)
        # Verify ordering: first todo should have later or equal created_at
        self.assertGreaterEqual(todos[0].created_at, todos[1].created_at)


class TodoViewsTest(TestCase):
    """Test the Todo views"""
    
    def setUp(self):
        self.client = Client()
        self.todo = Todo.objects.create(
            title="Test Todo",
            description="Test description",
            due_date=date.today()
        )
    
    def test_home_view(self):
        """Test that home view displays all todos"""
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Todo")
        self.assertTemplateUsed(response, 'home.html')
    
    def test_create_todo_get(self):
        """Test GET request to create todo page"""
        response = self.client.get(reverse('create_todo'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'create_todo.html')
    
    def test_create_todo_post(self):
        """Test POST request to create a new todo"""
        response = self.client.post(reverse('create_todo'), {
            'title': 'New Todo',
            'description': 'New description',
            'due_date': date.today() + timedelta(days=1)
        })
        self.assertEqual(response.status_code, 302)  # Redirect after creation
        self.assertTrue(Todo.objects.filter(title='New Todo').exists())
    
    def test_create_todo_without_title(self):
        """Test that creating todo without title fails"""
        initial_count = Todo.objects.count()
        response = self.client.post(reverse('create_todo'), {
            'description': 'No title'
        })
        self.assertEqual(Todo.objects.count(), initial_count)
        self.assertEqual(response.status_code, 200)  # Stays on page with error
    
    def test_edit_todo_get(self):
        """Test GET request to edit todo page"""
        response = self.client.get(reverse('edit_todo', args=[self.todo.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.todo.title)
        self.assertTemplateUsed(response, 'edit_todo.html')
    
    def test_edit_todo_post(self):
        """Test POST request to update a todo"""
        response = self.client.post(reverse('edit_todo', args=[self.todo.id]), {
            'title': 'Updated Todo',
            'description': 'Updated description',
            'due_date': date.today() + timedelta(days=2)
        })
        self.assertEqual(response.status_code, 302)  # Redirect after update
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Todo')
        self.assertEqual(self.todo.description, 'Updated description')
    
    def test_delete_todo_get(self):
        """Test GET request to delete confirmation page"""
        response = self.client.get(reverse('delete_todo', args=[self.todo.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.todo.title)
        self.assertTemplateUsed(response, 'delete_todo.html')
    
    def test_delete_todo_post(self):
        """Test POST request to delete a todo"""
        todo_id = self.todo.id
        response = self.client.post(reverse('delete_todo', args=[todo_id]))
        self.assertEqual(response.status_code, 302)  # Redirect after deletion
        self.assertFalse(Todo.objects.filter(id=todo_id).exists())
    
    def test_toggle_resolved(self):
        """Test toggling the resolved status of a todo"""
        initial_status = self.todo.is_resolved
        response = self.client.get(reverse('toggle_resolved', args=[self.todo.id]))
        self.assertEqual(response.status_code, 302)  # Redirect after toggle
        self.todo.refresh_from_db()
        self.assertNotEqual(self.todo.is_resolved, initial_status)
    
    def test_toggle_resolved_twice(self):
        """Test toggling resolved status twice returns to original"""
        initial_status = self.todo.is_resolved
        # Toggle once
        self.client.get(reverse('toggle_resolved', args=[self.todo.id]))
        self.todo.refresh_from_db()
        self.assertNotEqual(self.todo.is_resolved, initial_status)
        # Toggle again
        self.client.get(reverse('toggle_resolved', args=[self.todo.id]))
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.is_resolved, initial_status)
    
    def test_edit_nonexistent_todo(self):
        """Test editing a todo that doesn't exist returns 404"""
        response = self.client.get(reverse('edit_todo', args=[99999]))
        self.assertEqual(response.status_code, 404)
    
    def test_delete_nonexistent_todo(self):
        """Test deleting a todo that doesn't exist returns 404"""
        response = self.client.post(reverse('delete_todo', args=[99999]))
        self.assertEqual(response.status_code, 404)
    
    def test_empty_todo_list(self):
        """Test home page with no todos"""
        Todo.objects.all().delete()
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No TODOs yet!")


class TodoIntegrationTest(TestCase):
    """Integration tests for complete workflows"""
    
    def setUp(self):
        self.client = Client()
    
    def test_complete_todo_workflow(self):
        """Test the complete workflow: create, edit, toggle, delete"""
        # Create a todo
        response = self.client.post(reverse('create_todo'), {
            'title': 'Workflow Todo',
            'description': 'Testing workflow',
            'due_date': date.today() + timedelta(days=5)
        })
        self.assertEqual(response.status_code, 302)
        todo = Todo.objects.get(title='Workflow Todo')
        self.assertFalse(todo.is_resolved)
        
        # Edit the todo
        response = self.client.post(reverse('edit_todo', args=[todo.id]), {
            'title': 'Updated Workflow Todo',
            'description': 'Updated workflow',
            'due_date': date.today() + timedelta(days=10)
        })
        self.assertEqual(response.status_code, 302)
        todo.refresh_from_db()
        self.assertEqual(todo.title, 'Updated Workflow Todo')
        
        # Toggle resolved
        response = self.client.get(reverse('toggle_resolved', args=[todo.id]))
        self.assertEqual(response.status_code, 302)
        todo.refresh_from_db()
        self.assertTrue(todo.is_resolved)
        
        # Delete the todo
        response = self.client.post(reverse('delete_todo', args=[todo.id]))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Todo.objects.filter(id=todo.id).exists())
