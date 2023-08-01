<template>
    <div class="account" v-if="isLoggedIn && user">
        <h2>Welcome, {{ user.name }}</h2>
        <p>Account Details:</p>
        <p>Email: {{ user.email }}</p>
        <!-- Add more account details here as needed -->

        <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
    <div class="account" v-else>
        <h2>Welcome, Guest</h2>
        <p>Please login to access your account.</p>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
    </div>
</template>

<script>

export default {
    name: 'Account',
    data() {
        return {
            user: null,
        };
    },
    computed: {
        isLoggedIn() {
            return this.$root.$user.isLoggedIn;
        },
    },
    methods: {

        async logout() {
            try {
                // Emit an event up to the parent component (App.vue)
                this.$emit('update:user', null);
                this.$emit('update:isLoggedIn', false);

                // Redirect the user to the home page or any other page after logout
                this.$router.push('/');

                console.log('Logout successful');
            } catch (error) {
                console.error('Logout Error:', error);
                // Handle logout errors here, if necessary.
            }
        },
    },
};
</script>


<style>
/* Add some styling for the account page */
.account {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
