<template>
    <div class="search-page">
        <h2>Search Page</h2>
        <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Enter your search query" />

        <ul v-if="searchResults.length > 0" class="search-results">
            <li v-for="result in searchResults" :key="result.id">
                <!-- Replace the list item content with a router-link styled as a button -->
                <router-link :to="'/post/' + result.id" class="btn btn-secondary btn-block">
                    {{ result.title }}
                </router-link>
            </li>
        </ul>

        <p v-else>No search results found.</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            searchResults: [],
            allPosts: [], // add this line
            allTitles: [], // array to store all titles
        };
    },
    async created() {
        // Fetch all posts from the JSON server directly in the SearchPage component
        this.allPosts = await this.fetchPosts(); // change this line
        this.searchResults = [...this.allPosts]; // initialize searchResults with allPosts

        // retrieve all the titles
        this.allTitles = this.allPosts.map(post => post.title);
        // print all the titles
        console.log(this.allTitles);
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('http://localhost:3001/posts'); // Replace the URL with your JSON server endpoint
                return response.data || []; // Access the posts directly from the response data
            } catch (error) {
                console.error(error);
                return [];
            }
        },
        handleSearch() {
            const query = this.searchQuery.toLowerCase();
            // Filter the posts based on the search query
            this.searchResults = this.allPosts.filter((post) =>
                post.title.toLowerCase().includes(query)
            );
        },
    },
};
</script>



<style>
/* Add some basic styling for the search page */
.search-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}

.search-results {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}

.btn {
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    background: #007BFF;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    transition: background 0.2s;
}

.btn-block {
    display: block;
    width: 100%;
}

.btn:hover {
    background: #0056b3;
}
</style>
