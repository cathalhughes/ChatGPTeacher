<template>
    <div>
        <h1>Ask ChatGPTeacher</h1>
        <h2>A lesson plan generator</h2>
        <input v-model="topic" type="text" />
        <select v-model="lessonDuration">
            <option value="" disabled selected>Plan Duration...</option>
            <option value="one day">One Day</option>
            <option value="week">Week</option>
            <option value="fortnight">Fortnight</option>
            <option value="month">Month</option>
        </select>
        <select v-model="ageGroup">
            <option value="" disabled selected>Age Group...</option>
            <option value="7-9">7-9</option>
            <option value="9-11">9-11</option>
            <option value="11-13">11-13</option>
        </select>
        <span><button :disabled="!topic" @click="sendMessage()">Submit</button></span>
        <div class="messageBox">
            <template v-for="message in messages">
                <div
                    v-if="message.from === 'user'"
                    class="messageFromUser"
                    :key="message.topic"
                >
                    <p><b>Topic:</b> {{ message.data.topic }}</p>
                    <p><b>Lesson Duration:</b> {{ message.data.lessonDuration }}</p>
                    <p><b>Age Group:</b> {{ message.data.ageGroup }}</p>
                </div>
                <div
                    v-if="message.from !== 'user'"
                    class="messageFromChatGpt"
                    :key="message.topic"
                    v-html="message.data"
                />
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
            topic: null,
            lessonDuration: null,
            ageGroup: null,
        };
    },

    methods: {
        async sendMessage() {

            const userMessage = `Topic: ${this.topic}\n\nLesson Duration: ${this.lessonDuration}\n\nAge Group: ${this.ageGroup}`
            console.log({ userMessage });
            this.messages.push({
                from: 'user',
                data: { topic: this.topic, lessonDuration: this.lessonDuration, ageGroup: this.ageGroup },
            });

            // topic, duration, age group, other suggestions ("differentiate between groups of mixed abaility", "integration with other subject areas", "methodologies emplpoyed")

            await axios
                .post('/api/teacher/generate-lesson', { topic: this.topic, lessonDuration: this.lessonDuration, ageGroup: this.ageGroup })
                .then((response) => {
                    this.messages.push(response.data);
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input, select, h4>div {
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
