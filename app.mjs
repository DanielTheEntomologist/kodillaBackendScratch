import inquirer from "inquirer";
import Jimp from "jimp";

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

// then create new image file with watermark and save it
const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  image.print(font, 10, 10, text);
  await image.quality(100).writeAsync(outputFile);
};

const { imagePath, watermarkType, watermarkText, watermarkImagePath } =
  await askForInputs();
addTextWatermarkToImage(imagePath, "./test-with-watermark.jpg", watermarkText);
