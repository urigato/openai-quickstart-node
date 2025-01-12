import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // const emailText = req.body.emailText || '';
  // if (emailText.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "이메일 내용을 입력하세요.",
  //     }
  //   });
  //   return;
  // }


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body),
      max_tokens: 3000,
      // temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(body) {
  const promptText = `Please make a standard email in high quality English based on the following information.
  My company name: ${body.myCompanyText},
  Sender Name: ${body.myNameText},
  Recepient Company: ${body.reCompanyText},
  Recepient Name: ${body.reNameText},
  purpose: ${body.purposeText},
  questions: ${body.questionText}`
  console.log(promptText);
  return promptText;

//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();

//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
}


