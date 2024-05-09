import pinyin from "pinyin";

// takes in single hanzi character -> returns pinyin
export const getPinYinText = (hanzi) => {
    // return blank if punctuation
    if (hanzi.match(/[.,:!?]/)) {
        return '';
    }

    const pinyinArray = pinyin(hanzi);
    const pinyinString = pinyinArray.map(subArray => subArray.join(' ')).join(' ');
    return pinyinString;
};