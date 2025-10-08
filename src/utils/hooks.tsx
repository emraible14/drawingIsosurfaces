
export function buildIndex(data: Array<number>, c: number) {
  let newIndex = "";
  data.forEach(v => {
    if (v < c) {
      newIndex += "1";
    } else {
      newIndex += "0";
    }
  })
  console.log(newIndex)
  return newIndex;
}