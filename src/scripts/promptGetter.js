import pinyin from "pinyin";
import { dummyChinesePrompt, dummyEnglishPrompt } from "../../assets/data/dummy_data";
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