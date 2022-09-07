export default function useSearchResult(str, comparisonList) {
  if (!str) {
    return false;
  }
  const text = str.trim();
  return compareData(text, comparisonList);
}

function compareData(str, comparisonList) {
  if (!str) {
    console.log("пустая строка");
    return false;
  }
  const text = textNormalize(str);
  const result = comparisonList.find((item) => {
    const pattern = new RegExp(textNormalize(item));
    return pattern.test(text);
  });

  if (result) {
    return result;
  }
  return false;
}

function deleteDoubleConstant(str) {
  const text = [...str];
  let temp;
  const result = text.filter((s) => {
    if (s !== temp) {
      temp = s;
      return s;
    }
  });
  return result.join("");
}

function textNormalize(str) {
  const text = deleteDoubleConstant(str);
  return text.toLocaleLowerCase();
}
