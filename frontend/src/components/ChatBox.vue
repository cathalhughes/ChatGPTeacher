<template>
    <div>
        <h1>Ask ChatGPTeacher</h1>
        <input v-model="currentMessage" type="text" />
        <span><button @click="sendMessage(currentMessage)">Ask</button></span>
        <div class="messageBox">
            <template v-for="message in messages">
                <div
                    :class="message.from === 'user' ? 'messageFromUser' : 'messageFromChatGpt'"
                    :key="message"
                    v-html="message.data"
                ></div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ChatBox',
    data() {
        return {
            messages: [],
            currentMessage: null,
        };
    },

    methods: {
        async sendMessage(message) {
            this.messages.push({
                from: 'user',
                data: message,
            });

            // topic, duration, age group, other suggestions ("differentiate between groups of mixed abaility", "integration with other subject areas", "methodologies emplpoyed")

            await axios
                .post('/api/teacher/generate-lesson', { message: message })
                .then((response) => {
                    this.messages.push(response.data);
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
    width: 300px;
    padding: 10px;
}

button {
    height: 40px;
    background-color: powderblue;
    padding: 10px;
}
.messageBox {
    height: 500px;
    background-color: gainsboro;
    margin: 0 15% 0 15%;
    margin-top: 20px;
    padding: 5%;
    overflow-y: auto;
    overflow-x: hidden;
}

.messageFromUser {
    text-align: right;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 30%;
    margin-left: 70%;
}

.messageFromChatGpt {
    text-align: left;
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
}
</style>
