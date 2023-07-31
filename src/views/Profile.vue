<!-- src/views/Profile.vue -->
<template>
    <div>
        <h2>Profile</h2>
        <div>
            <strong>email:</strong> {{ user.email }}
        </div>
        <div>
            <strong>Email:</strong> {{ user.email }}
        </div>
        <div>
            <strong>Joined:</strong> {{ formatDate(user.createdAt) }}
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
    },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toDateString();
        },
    },
};
</script>
