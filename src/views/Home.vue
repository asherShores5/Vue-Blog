<template>
    <div class="landing-page">
        <!-- Hero Section -->
        <div class="hero">
            <h1>Welcome to Our Blog</h1>
            <p>Discover Interesting Stories and Ideas</p>
            <router-link to="/blog" class="cta-button btn btn-primary">Explore More</router-link>
        </div>

        <!-- Featured Blog Post Section -->
        <div class="featured-blog-post" v-if="featuredPost">
            <h2 class="mb-4">Featured Post</h2>
            <div class="post">
                <h3 class="mb-3">{{ featuredPost.title }}</h3>
                <p>{{ featuredPost.summary }}</p>
                <router-link :to="'/post/' + featuredPost.id" class="btn btn-secondary">Read More</router-link>
            </div>
        </div>

        <!-- Recent Blog Posts Section -->
    <div class="recent-blog-posts">
      <h2 class="mb-4">Recent Posts</h2>
      <div v-for="post in recentPosts" :key="post.id" class="post">
        <h3 class="mb-3">{{ post.title }}</h3>
        <p>{{ post.summary }}</p>
        <router-link :to="'/post/' + (post.id || '')" class="btn btn-secondary">Read More</router-link>
      </div>
    </div>
    </div>
</template>

<script>
import PostList from '../components/PostList.vue';

export default {
    data() {
        return {
            featuredPost: null,
            recentPosts: [],
        };
    },
    async created() {
        // Fetch featured post and recent posts using the PostList component's fetchPosts method
        const posts = await this.fetchPosts();
        this.featuredPost = posts[0]; // Assuming the first post is the featured post
        this.recentPosts = posts.slice(1, 3); // Get the 2 most recent posts
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await PostList.methods.fetchPosts(); // Call the fetchPosts method from the PostList component
                return response;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    },
};
</script>

<style>
/* Add some basic styling for the landing page */
.landing-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.hero {
    text-align: center;
    margin-bottom: 40px;
}

.hero h1 {
    font-size: 36px;
    margin-bottom: 10px;
}

.hero p {
    font-size: 18px;
    margin-bottom: 20px;
}

/* Bootstrap button style */
.cta-button,
.post a.btn {
    text-decoration: none;
}

.post a.btn:hover {
    text-decoration: none;
}

/* Center the buttons */
.cta-button {
    display: block;
    margin: 0 auto;
}

.featured-blog-post {
    margin-bottom: 40px;
}

.featured-blog-post h2,
.recent-blog-posts h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.post {
    margin-bottom: 20px;
}

.post h3 {
    font-size: 20px;
    margin-bottom: 5px;
}

.post p {
    margin-bottom: 10px;
}

/* Bootstrap button style */
.post a.btn {
    text-decoration: none;
}

.post a.btn:hover {
    text-decoration: none;
}
</style>
