import pinyin from "pinyin";

const dummyChinesePrompt = "我们要练习中文。先讲一讲你学中文的背景吧！"
const dummyEnglishPrompt = "We're going to practice Chinese. First, talk about your background in learning Chinese!"

export const getImage = (promptID) => {
  // get image based on prompt
  // promptID

  return "promptID";
};

export const getPinYinText = (hanzi) => {
  const pinyinArray = pinyin(dummyChinesePrompt);
  const pinyinString = pinyinArray.map(subArray => subArray.join(' ')).join(' ');
  console.log('PINYINNNNNN A', pinyinArray);
  console.log('PINYINNNNNN S', pinyinString);
  return pinyinString;
};

export const getHanZiText = (promptID) => {
  
  // get chinese text from prompt
  return dummyChinesePrompt;
  // return promptID
};
export const getEnglishText = (promptID) => {
  // get chinese text from prompt
  return dummyEnglishPrompt;
  // return promptID
};