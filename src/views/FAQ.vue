<template>
    <div class="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
            <!-- Loop through the questions and answers -->
            <li v-for="(item, index) in faqItems" :key="index">
                <div class="question" @click="toggleAnswer(index)">
                    {{ item.question }}
                    <span class="toggle-icon">{{ item.isOpen ? '-' : '+' }}</span>
                </div>
                <div v-if="item.isOpen" class="answer">
                    {{ item.answer }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqItems: [
                {
                    question: 'How can I create a new blog post?',
                    answer: 'To create a new blog post, log in to your account, navigate to the dashboard, and click on "Create New Post." Fill in the title, content, and any other details, then click "Publish." Your post will be live on the blog!',
                    isOpen: false,
                },
                {
                    question: 'Can I edit or delete my blog posts?',
                    answer: 'Yes, you can edit or delete your blog posts. After logging in, go to the dashboard, find the post you want to edit or delete, and click the corresponding action buttons.',
                    isOpen: false,
                },
                {
                    question: 'How do I leave a comment on a blog post?',
                    answer: 'To leave a comment on a blog post, scroll to the bottom of the post and find the comment section. Enter your comment and click "Submit." Please keep your comments respectful and relevant to the post content.',
                    isOpen: false,
                },
                {
                    question: 'How do I navigate through different blog posts?',
                    answer: 'You can navigate through different blog posts by using the navigation buttons or links on the blog page. Click on the post title or "Read More" link to view the full post. Use the "Previous" and "Next" buttons to move between posts.',
                    isOpen: false,
                },
                // Add more blog-related FAQ items as needed
            ],
        };
    },
    methods: {
        toggleAnswer(index) {
            // Toggle the isOpen property to show/hide the answer
            this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
        },
    },
};
</script>

<style>
/* Add some basic styling for the FAQ component */
.faq {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
}

.question {
    font-weight: bold;
    cursor: pointer;
}

.toggle-icon {
    float: right;
}

.answer {
    margin-top: 10px;
}
</style>
