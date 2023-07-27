<template>
    <div class="container mt-4">
        <div v-if="isLoggedIn">
            <h2>Welcome, {{ user.name }}</h2>
            <button class="btn btn-primary btn-rounded" @click="goToAccount">Account Page</button>
            <button class="btn btn-danger btn-rounded" @click="logout">Logout</button>
        </div>
        <div v-else>
            <h2>{{ isLoginForm ? "Login" : "Sign Up" }}</h2>
            <hr>
            <form v-if="isLoginForm" @submit.prevent="login">
                <!-- Login Form Fields -->
                <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="loginEmail" v-model="loginData.email" required>
                </div>
                <div class="mb-3">
                    <label for="loginPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="loginPassword" v-model="loginData.password" required
                        autocomplete="off">
                </div>
                <div class="d-inline-flex justify-content-left">
                    <button type="submit" class="btn btn-primary btn-rounded">Login</button>
                </div>
            </form>

            <form v-else @submit.prevent="signup" @input="validatePasswords">
                <!-- Sign Up Form Fields -->
                <div class="mb-3">
                    <label for="signupName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="signupName" v-model="signupData.name" required>
                </div>
                <div class="mb-3">
                    <label for="signupEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="signupEmail" v-model="signupData.email" required>
                </div>
                <div class="mb-3">
                    <label for="signupPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="signupPassword" v-model="signupData.password" required
                        autocomplete="off">
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required
                        autocomplete="off">
                    <div v-if="passwordMismatch" class="text-danger">Passwords do not match</div>
                </div>
                <div class="d-inline-flex justify-content-left">
                    <button type="submit" class="btn btn-primary btn-rounded">Sign Up</button>
                </div>
            </form>
            <div class="d-inline-flex justify-content-center mt-3">
                <button class="btn btn-warning btn-rounded" @click="toggleForm">
                    {{ isLoginForm ? "Or Sign Up" : "Or Log In" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Import jwt_decode function

export default {
    data() {
        return {
            isLoggedIn: false,
            user: null,
            isLoginForm: true,
            loginData: {
                email: "",
                password: "",
            },
            signupData: {
                name: "",
                email: "",
                password: "",
            },
            confirmPassword: "",
            passwordMismatch: false,
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3001/login', {
                    email: this.loginData.email,
                    password: this.loginData.password,
                });
                const token = response.data.token;

                // Save the token to local storage
                localStorage.setItem('token', token);

                // Decode the token to get the user data
                const userData = jwt_decode(token);

                // Emit an event up to the parent component (App.vue)
                this.$emit('update:user', userData);
                this.$emit('update:isLoggedIn', true);

                console.log('Login successful');
                console.log('Token received from server:', token);

            } catch (error) {
                console.error('Login Error:', error);
                // Handle login errors here, if necessary.
            }
        },

        async signup() {
            try {
                // Check if the email is already taken before proceeding with the signup
                const existingUserResponse = await axios.get('http://localhost:3001/users', {
                    params: {
                        email: this.signupData.email,
                    },
                });

                if (existingUserResponse.data.length > 0) {
                    // Email is already taken, display an error message to the user
                    console.log("Email is already taken.");
                    // You can set a variable here to display an error message to the user on the form.
                    return;
                }

                // If the email is not taken, proceed with the signup process
                const newUser = {
                    id: Date.now(),
                    name: this.signupData.name,
                    email: this.signupData.email,
                    password: this.signupData.password,
                    // Add other fields as needed
                };

                const response = await axios.post('http://localhost:3001/users', newUser);

                console.log("Sign Up Response:", response.data);

                // Clear form fields on successful signup
                this.signupData.name = "";
                this.signupData.email = "";
                this.signupData.password = "";
                this.confirmPassword = "";

                // Do further handling here, such as setting authentication tokens or redirecting the user.
            } catch (error) {
                console.error("Sign Up Error:", error);
                // Handle signup errors here.
            }
        },
        toggleForm() {
            this.isLoginForm = !this.isLoginForm;
        },
        validatePasswords() {
            this.passwordMismatch = this.signupData.password !== this.confirmPassword;
        },
        goToAccount() {
            // Implement the route for the account page (e.g., using Vue Router)
            // Replace '/account' with the actual path to the account page
            this.$router.push('/account');
        },
        logout() {
            this.isLoggedIn = false;
            this.user = null;
            // Add any additional logout logic here, such as clearing authentication tokens or redirecting the user to the login page.
        },
    },
};
</script>

<style>
/* Add some basic styling for the login page */
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

/* Style the buttons */
.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0;
    /* Rounded edges removed */
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-link {
    text-decoration: underline;
    cursor: pointer;
}

/* Add some spacing for the "Or Sign Up" link */
.mt-3 {
    margin-top: 15px;
}

/* Style the password mismatch error message */
.text-danger {
    color: red;
}

.btn-rounded {
    border-radius: 50px;
}</style>
