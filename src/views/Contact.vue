<template>
    <div class="contact-page">
        <h2>Contact Us</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="formData.name" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" required />
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="formData.message" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                message: '',
            },
        };
    },
    methods: {
        submitForm() {
            // You can add your submission logic here (e.g., API call)
            console.log('Form submitted!', this.formData);
            // Clear the form fields after submission
            this.formData.name = '';
            this.formData.email = '';
            this.formData.message = '';
        },
    },
};
</script>

<style>
/* Add some basic styling for the contact form */
.contact-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

input,
textarea {
    padding: 5px;
    font-size: 16px;
    width: 100%;
    border: 1px solid #ccc;
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
