<template>
    <div class="container mt-4">
        <h2>About Us</h2>
        <p>
            Welcome to our blog! We are a group of passionate writers who love to share our thoughts and experiences with
            the world.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
            dapibus diam.
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
        </p>
        <p>
            In this blog, you will find a wide range of topics, including technology, travel, lifestyle, and more. We hope
            our articles
            will be informative, entertaining, and thought-provoking.
        </p>
        <p>
            If you have any suggestions or feedback, feel free to get in touch with us. We love to hear from our readers!
        </p>
    </div>
</template>

<script>
export default {
    name: 'About',

    methods: {
        // ... (existing methods)

        goToAccountPage() {
            // You can use Vue Router to navigate to the account page
            this.$router.push('/account'); // Replace '/account' with the actual route for the account page
        },
    }
};
</script>

<style>
/* Add some basic styles for the about page if needed */
.container {
    max-width: 800px;
    margin: 0 auto;
}
</style>