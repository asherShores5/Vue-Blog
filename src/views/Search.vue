<template>
    <div class="search-page">
        <h2>Search Page</h2>
        <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Enter your search query" />

        <ul v-if="searchResults.length > 0" class="search-results">
            <li v-for="result in searchResults" :key="result.id">
                {{ result.title }}
            </li>
        </ul>

        <p v-else>No search results found.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            searchResults: [],
            // Replace this with your actual search data or API endpoint
            searchData: [
                { id: 1, title: 'Sample Result 1' },
                { id: 2, title: 'Sample Result 2' },
                { id: 3, title: 'Sample Result 3' },
                // Add more search results as needed
            ],
        };
    },
    methods: {
        handleSearch() {
            const query = this.searchQuery.toLowerCase();
            // Filter search results based on the query
            this.searchResults = this.searchData.filter((item) =>
                item.title.toLowerCase().includes(query)
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
</style>
