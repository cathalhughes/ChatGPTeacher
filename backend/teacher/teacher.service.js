// Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
const { OpenAIChat } = require('langchain/llms/openai');

// Import the BufferMemory module
const { BufferMemory } = require('langchain/memory');

// Import the Chains module
const { LLMChain } = require('langchain/chains');

// Import the PromptTemplate module
const { PromptTemplate } = require('langchain/prompts');

const generateLesson = async ({ topic, lessonDuration, ageGroup }) => {
    // Instantiate the BufferMemory passing the memory key for storing state
    // https://stackoverflow.com/questions/76941870/valueerror-one-input-key-expected-got-text-one-text-two-in-langchain-wit
    // const memory = new BufferMemory({ memoryKey: 'chat_history' });

    //Instantiante the OpenAI model
    //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAIChat({
        openAIApiKey: process.env.CHATGPT_TOKEN,
        temperature: 0.9,
        modelName: 'gpt-3.5-turbo',
        // modelName: 'gpt-4',
    });

    //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input
    //Note the input variables {chat_history} and {input}
    const template = `The AI should act as a primary teacher who is an expert in lesson plans and produce lesson plans on the given topic. If the topic passed in is inexplicable just mention that it is not possible to generate a lesson plan.
    The lesson plan should cover the specified time span that will be provided. It should produce learning outcomes across the duration of the specified time span and provide suggestions on how they can be completed, you must suggest things such as: materials, sample lesson ideas, discussion prompts, visual prompts, project work, art activities, external speakers, online resources and links to other subjects etc.
    The lesson should also be tailored to the age group provided by the teacher.
    Topic for lesson plan: {topic}
    Lesson Plan Duration: {lessonDuration}
    Age Group for lesson plan: {ageGroup}`;

    //Instantiate "PromptTemplate" passing the prompt template string initialized above
    const prompt = PromptTemplate.fromTemplate(template);

    //Instantiate LLMChain, which consists of a PromptTemplate, an LLM and memory.
    const chain = new LLMChain({ llm: model, prompt });

    console.log({ topic, lessonDuration, ageGroup });

    //Run the chain passing a value for the {input} variable. The result will be stored in {chat_history}
    const response = await chain.call({ topic, lessonDuration, ageGroup });
    console.log({ response });

    return {
        data: response.text,
    };
};

const test = async () => {
    return 'hello test';
};

module.exports = {
    test,
    generateLesson,
};
