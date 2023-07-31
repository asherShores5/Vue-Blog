// Login.vue
<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" autocomplete="email" required />
                <!-- Set autocomplete="email" to suggest previously entered email addresses -->
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="formData.password" autocomplete="current-password" required />
                <!-- Set autocomplete="current-password" to suggest previously entered passwords -->
            </div>
            <button type="submit">Login</button>
            <!-- Display the loginError when it is not an empty string -->
            <p v-if="loginError" class="error-message">{{ loginError }}</p>
        </form>
    </div>
</template>

// Login.vue
<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
            },
            loginError: '',
        };
    },
    methods: {
        async login() {
            try {
                // Trim and convert the user input email to lowercase for case-insensitive comparison
                const email = this.formData.email.trim().toLowerCase();

                // Get user data from the server using the provided email
                const response = await axios.get('http://localhost:3001/users', {
                    params: { email },
                });

                // Check if the response contains any user data
                if (response.data.length === 0) {
                    this.loginError = 'User not found.';
                    return;
                }

                // Compare the user's input password with the stored password
                const user = response.data[0];
                if (user.password !== this.formData.password) {
                    this.loginError = 'Invalid email or password.';
                    return;
                }

                // Handle the successful login
                // Set the token cookie and redirect to the desired page
                this.setTokenCookie('YOUR_JWT_TOKEN'); // Replace 'YOUR_JWT_TOKEN' with the actual token received from the server

                // Redirect the user to the desired page (e.g., account page or dashboard)
                // this.$router.push('/account');

                // Clear any previous login errors and show success message to the user
                this.loginError = '';
                alert('Login successful!');
            } catch (error) {
                console.error('An error occurred while logging in:', error);

                // Show error message to the user
                this.loginError = 'An error occurred during login.';
            }
        },
        setTokenCookie(token) {
            // Set the token in a cookie or in localStorage for future use
            localStorage.setItem('jwt_token', token);
        },
    },
};
</script>


<style>
/* Your login form styles */
.login-form {
    max-width: 400px;
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

input {
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
