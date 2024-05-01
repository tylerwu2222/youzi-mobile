import pinyin from "pinyin";

// data
import { dummyChinesePrompt, dummyEnglishPrompt } from "../../assets/data/dummy_data";
import data from '../../assets/data/test_set_829.json';
import { promptDataColumnNames } from "../../assets/data/prompt_meta_data";

export const getImage = (promptID) => {
  // get image based on prompt
  // promptID

  return "promptID";
};

// takes in single hanzi character -> returns pinyin
export const getPinYinText = (hanzi) => {
  const pinyinArray = pinyin(hanzi);
  // NEED TO REPLACE PUNCTUATION WITH BLANK...
  const pinyinString = pinyinArray.map(subArray => subArray.join(' ')).join(' ');
  // console.log('PINYINNNNNN A', pinyinArray);
  // console.log('PINYINNNNNN S', pinyinString);
  return pinyinString;
};

// get random prompt that matches parameters
export const getRandomPrompt = (
  vibeCode = 'chatting',
  subVibeCode = null,
  nsfw = 0
) => {

  // console.log('codes', vibeCode, subVibeCode);

  // filter data
  let filteredData;
  // first by vibe
  filteredData = data.filter(row => {
    return row['VIBE'] == vibeCode;
  })
  // console.log('fd1', filteredData.length);
  // then subvibe (if provided)
  if (subVibeCode) {
    filteredData = filteredData.filter(row => {
      return row['SUB_VIBE'] == subVibeCode;
    })
  }
  // console.log('fd2', filteredData.length);
  // select random row from filtered data
  const randIndex = Math.floor(Math.random() * filteredData.length)
  // console.log('randIndex', randIndex, filteredData.length);
  const randRow = filteredData[randIndex];
  // console.log('randRow', randRow);

  // filter and restructure relevant data
  const necessaryKeys = [promptDataColumnNames[0], promptDataColumnNames[2]].concat(promptDataColumnNames.slice(4));
  // console.log('necessary', necessaryKeys);
  const randRowReduced = necessaryKeys.reduce((acc, key) => {
    if (randRow.hasOwnProperty(key)) {
      acc[key] = randRow[key];
    }
    return acc;
  }, {});
  // console.log('randomly selected prompt', randRowReduced);
  // return randRow;
  return randRowReduced;
}

// takes in prompt ID => returns full chinese hanzi prompt
export const getHanZiText = (promptID) => {

  // get chinese text from prompt
  return dummyChinesePrompt;
  // return promptID
};

// takes in prompt ID => returns english translation
export const getEnglishText = (promptID) => {
  // get chinese text from prompt
  return dummyEnglishPrompt;
  // return promptID
};