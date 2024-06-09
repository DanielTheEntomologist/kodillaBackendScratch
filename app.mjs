import inquirer from "inquirer";
import Jimp from "jimp";

// wait for 100 ms so that punycode depreciation warning for jimp is show abouve the inquirer prompt
await new Promise((resolve) => setTimeout(resolve, 100)); // 100 ms delay

const IMAGES_PATH = "./img/";

const askToStart = async function () {
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "start",
      message:
        "\nWelcome to the image watermarking app!\nDo you want to start the app?",
    },
  ]);
  if (!answer.start) process.exit();
};

async function askForInputs() {
  const answers = await inquirer.prompt([
    // ask for the path to the input image file
    {
      type: "input",
      name: "imagePath",
      default: IMAGES_PATH + "example-image.jpg",
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
      default: IMAGES_PATH + "example-watermark.png",
      message: "Enter the path to the watermark image:",
      when: (answers) => answers.watermarkType === "Image",
    },
  ]);

  return answers;
}

const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const textData = {
    text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };
  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);
};

const addImageWatermarkToImage = async function (
  inputFile,
  outputFile,
  watermarkFile
) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);
  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;
  image.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
  });
  await image.quality(100).writeAsync(outputFile);
};

const addTextToFilename = function (filename, text) {
  const dir_root = filename.split(".").slice(0, -1).join(".");
  const ext = filename.split(".").pop();
  return `${dir_root}-${text}.${ext}`;
};

const startApp = async function () {
  await askToStart();
  const { imagePath, watermarkType, watermarkText, watermarkImagePath } =
    await askForInputs();

  const outputFilePath = addTextToFilename(imagePath, "with-watermark");

  if (watermarkType === "Text") {
    addTextWatermarkToImage(imagePath, outputFilePath, watermarkText);
  } else if (watermarkType === "Image") {
    addImageWatermarkToImage(imagePath, outputFilePath, watermarkImagePath);
  }
};

startApp();
