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
                    question: 'What is Vue.js?',
                    answer: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
                    isOpen: false,
                },
                {
                    question: 'How do I install Vue CLI?',
                    answer: 'You can install Vue CLI globally using npm or yarn: npm install -g @vue/cli',
                    isOpen: false,
                },
                // Add more FAQ items as needed
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
