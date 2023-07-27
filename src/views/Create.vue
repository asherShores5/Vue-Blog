<template>
    <div class="create-post-form">
        <h2>Create a New Post</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="formData.title" required />
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea id="content" v-model="formData.content" required></textarea>
            </div>
            <button type="submit">Create Post</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                title: '',
                content: '',
            },
        };
    },
    methods: {
        async handleSubmit() {
            // Check if the form data is valid
            if (this.formData.title && this.formData.content) {
                try {
                    // Get the latest post ID from the JSON server
                    const response = await axios.get('http://localhost:3001/posts');
                    const posts = response.data.posts || [];
                    const latestPostId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) : 0;

                    // Create a new post object with the form data and a new ID
                    const newPost = {
                        id: latestPostId + 1,
                        title: this.formData.title,
                        content: this.formData.content,
                    };

                    // Append the new post to the existing posts in the database
                    await axios.post('http://localhost:3001/posts', newPost);

                    // Reset the form data after successful submission
                    this.formData.title = '';
                    this.formData.content = '';

                    // Optionally, you can redirect the user to the updated blog page or show a success message
                } catch (error) {
                    console.error(error);
                    // Handle the error (e.g., show an error message to the user)
                }
            }
        },
    },
};
</script>

<style>
/* Add some basic styling for the create post form */
.create-post-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}
</style>
