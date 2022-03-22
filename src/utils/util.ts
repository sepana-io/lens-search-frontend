const filterDESO = (temp: any) => {
  if (temp.i_value_in_deso == 'delete_lowest_bid') {
    if (Array.isArray(temp.value_in_deso) && temp.value_in_deso.includes('accepted_bid')) {
      temp.value_in_deso = 'accepted_bid'
    } else {
      delete temp.value_in_deso
    }
    delete temp.i_value_in_deso
  }
  if (temp.s_value_in_deso == 'delete_accepted_bid') {
    if (Array.isArray(temp.value_in_deso) && temp.value_in_deso.includes('lowest_bid')) {
      temp.value_in_deso = 'lowest_bid'
    } else {
      delete temp.value_in_deso
    }
    delete temp.s_value_in_deso
  }

  if (Array.isArray(temp.value_in_deso)) {
    if (temp.value_in_deso.includes('lowest_bid')) {
      temp.i_value_in_deso = 'lowest_bid'
    }
    if (temp.value_in_deso.includes('accepted_bid')) {
      temp.s_value_in_deso = 'accepted_bid'
    }
    delete temp.value_in_deso
  }

  if (temp.value_in_deso === temp.i_value_in_deso || temp.value_in_deso === temp.s_value_in_deso) delete temp.value_in_deso
  return temp
}

export const queryObjToString = (query: any) => {
  let temp = filterDESO({ ...query })
  let querryStr = ''


  const arr = Object.keys(temp)
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      querryStr += `${arr[i]}=${temp[arr[i]]}`
    }
    else {
      querryStr += `&${arr[i]}=${temp[arr[i]]}`
    }
  }
  querryStr = querryStr.replace('i_value_in_deso', 'value_in_deso')
  querryStr = querryStr.replace('s_value_in_deso', 'value_in_deso')

  return querryStr
  // return new URLSearchParams(query).toString()
}

export const queryObjToString2 = (query: any) => new URLSearchParams(query).toString()


export const objIsEqual = (object1: any, object2: any) => {

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (object1[key] !== object2[key]) return false;
  }

  return true;
}