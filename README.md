<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post List</title>
</head>
<body>
    <h1>Posts</h1>
    <a href="{{ url_for('new_post') }}">Create New Post</a>
    <ul>
        {% for post in posts %}
        <li>
            <a href="{{ url_for('post_detail', id=post.id) }}">{{ post.title }}</a> by {{ post.nickname }} 
            ({{ post.date_posted.strftime('%Y-%m-%d %H:%M:%S') }})
        </li>
        {% else %}
        <li>No posts available</li>
        {% endfor %}
    </ul>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Post</title>
</head>
<body>
    <h1>Create a New Post</h1>
    <form method="POST" action="{{ url_for('new_post') }}">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required><br><br>

        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" name="nickname" required><br><br>

        <label for="content">Content:</label><br>
        <textarea id="content" name="content" rows="10" cols="30" required></textarea><br><br>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ post.title }}</title>
</head>
<body>
    <h1>{{ post.title }}</h1>
    <p><strong>By:</strong> {{ post.nickname }}</p>
    <p>{{ post.content }}</p>
    <p><em>Posted on {{ post.date_posted.strftime('%Y-%m-%d %H:%M:%S') }}</em></p>

    <a href="{{ url_for('edit_post', id=post.id) }}">Edit</a>
    <form method="POST" action="{{ url_for('delete_post', id=post.id) }}" style="display:inline;">
        <button type="submit">Delete</button>
    </form>
    <a href="{{ url_for('index') }}">Back to list</a>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Post</title>
</head>
<body>
    <h1>Edit Post</h1>
    <form method="POST" action="{{ url_for('edit_post', id=post.id) }}">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="{{ post.title }}" required><br><br>

        <label for="content">Content:</label><br>
        <textarea id="content" name="content" rows="10" cols="30" required>{{ post.content }}</textarea><br><br>

        <button type="submit">Update</button>
    </form>
    <a href="{{ url_for('post_detail', id=post.id) }}">Cancel</a>
</body>
</html>
