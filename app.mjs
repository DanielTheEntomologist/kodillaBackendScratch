import inquirer from "inquirer";

async function askForInputs() {
  const answers = await inquirer.prompt([
    // ask for the path to the input image file
    {
      type: "input",
      name: "imagePath",
      default: "./example-image.jpg",
      message: "Enter the path to the image file:",
    },
    // then ask for a type of watermark (text or image)
    {
      type: "list",
      name: "watermarkType",
      default: "Text",
      message: "Choose the type of watermark:",
      choices: ["Text", "Image"],
    },
    // then ask for the watermark text or image path depending on the type
    {
      type: "input",
      name: "watermarkText",
      default: "Test Watermark",
      message: "Enter the watermark text:",
      when: (answers) => answers.watermarkType === "Text",
    },
    {
      type: "input",
      name: "watermarkImagePath",
      default: "./example-watermark.png",
      message: "Enter the path to the watermark image:",
      when: (answers) => answers.watermarkType === "Image",
    },
  ]);

  return answers;
}
const answers = await askForInputs();
console.log(answers);

const { imagePath, watermarkType, watermarkText, watermarkImagePath } = answers;

// then create new image file with watermark and save it
// using JIMP library
