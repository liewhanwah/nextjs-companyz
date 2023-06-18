import { fetchList } from "./userAPI";

export async function fetchUserAll() {
  let pageNo: number = 1;
  let loopCont: boolean = true;
  let data = [];
  do {
    let result = await fetchList(pageNo);
    data = data.concat(result);
    if (Object.keys(result).length === 0) {
      loopCont = false;
    }
    pageNo++;
  } while (loopCont);
  data = filterByName(data);
  return sortByName(data);
}

function filterByName(data = []) {
  return data.filter((obj) => {
    return obj.first_name.startsWith("G") || obj.last_name.startsWith("W");
  });
}

function sortByName(data = []) {
  return data.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
}
