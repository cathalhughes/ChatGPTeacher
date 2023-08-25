console.log(process.env.CHATGPT_TOKEN, 'service');

// Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
const { OpenAIChat } = require('langchain/llms/openai');

// Import the BufferMemory module
const { BufferMemory } = require('langchain/memory');

// Import the Chains module
const { LLMChain } = require('langchain/chains');

// Import the PromptTemplate module
const { PromptTemplate } = require('langchain/prompts');

const generateLesson = async ({ message }) => {
    //Instantiate the BufferMemory passing the memory key for storing state
    const memory = new BufferMemory({ memoryKey: 'chat_history' });

    //Instantiante the OpenAI model
    //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAIChat({
        openAIApiKey: process.env.CHATGPT_TOKEN,
        temperature: 0.9,
        modelName: 'gpt-3.5-turbo',
    });

    //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input
    //Note the input variables {chat_history} and {input}
    const template = `The AI should act as a primary teacher who is an expert in lesson plans and produce lesson plans on the given topic. If the topic passed in is inexplicable just mention that it is not possible to generate a lesson plan.
    The lesson plan should cover a school term and not just be a once off. It should produce learning outcomes across multiple days and provide suggestions on how they can be completed, you can suggest things such as: materials, sample lesson ideas, discussion prompts, visual prompts, project work, art activities, external speakers, online resources and links to other subjects etc.
    Current conversation:
    {chat_history}
    Topic for lesson plan: {input}
    AI:`;

    //Instantiate "PromptTemplate" passing the prompt template string initialized above
    const prompt = PromptTemplate.fromTemplate(template);

    //Instantiate LLMChain, which consists of a PromptTemplate, an LLM and memory.
    const chain = new LLMChain({ llm: model, prompt, memory });

    console.log({ message });

    //Run the chain passing a value for the {input} variable. The result will be stored in {chat_history}
    const res1 = await chain.call({ input: message });
    console.log({ res1 });

    // //Run the chain again passing a value for the {input} variable. This time, the response from the last run ie. the  value in {chat_history} will alo be passed as part of the prompt
    // const res2 = await chain.call({ input: "What's my name?" });
    // console.log({ res2 });

    // //BONUS!!
    // const res3 = await chain.call({ input: 'Which epic movie was I in and who was my protege?' });
    // console.log({ res3 });
    return {
        data: res1.text,
    };
};

const test = async () => {
    return 'hello test';
};

module.exports = {
    test,
    generateLesson,
};
