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
const getCorrectValue = (key: string, val: any) => {
  if (key === 'value_in_clout') {
    if (val === 'accepted_bid') return 's_value_in_deso'
    if (val === 'lowest_bid') return 'i_value_in_deso'
  }
  return key
}
export const queryStringToObject = (urlPaths: string) => {
  let x = (urlPaths.includes("?") ? urlPaths.split("?")[1] : urlPaths).split('&')
  let querryObj: any = {}
  for (let i = 0; i < x.length; i++) {
    const param = x[i].split('=')
    let key = param[0]
    const val = param[1]
    if (val !== undefined) {
      querryObj[getCorrectValue(key, val)] = val;
    }
  }
  return querryObj
  // return Object.fromEntries(new URLSearchParams(urlPaths.includes("?") ? urlPaths.split("?")[1] : urlPaths))
}

export const parseSearchText = (text: any) => {
  if (!text) return {}

  const parsedObj: any = {}
  const textParts: any[] = []

  //extract brackets
  let brackets_match = text.match(/\((.*?)\)/g)
  if (brackets_match) {
    brackets_match.forEach((e: any) => {
      text = text.replace(e, "")
      let temp = e.slice(1, e.length - 1)
      if (temp.includes(":")) textParts.push(temp)
      else if (temp.startsWith("@")) textParts.push(`mention_users:${temp.replace('@', '')}`)
      else if (temp.startsWith("#")) textParts.push(`hashtags:${temp.replace('#', '')}`)
      else textParts.push(`any_words:${temp}`)
    })
  }

  //extract key:value pairs
  let key_value_pairs = text.match(/((?:[^:,\s])*):((?:[^,\s])*)/g);
  if (key_value_pairs) {
    key_value_pairs.forEach((e: any) => {
      text = text.replace(e, "")
      textParts.push(e)
    })
  }


  text = text.trim().replace(/\s\s+/g, ' ')
  if (text.startsWith('"')) {
    text = text.slice(1, text.length - 1)
    parsedObj["search_type"] = "exact_phrase"
  }

  if (text && text.length > 1) parsedObj['text'] = text

  textParts.forEach(e => {
    const parts = e.split(":")
    if (parts[0] && (parts[1] !== undefined)) {
      if (["hashtags", "any_words"].includes(parts[0])) {
        parsedObj["search_type"] = parts[0]
        parsedObj['text'] = parts[1]
      }
      else {
        parsedObj[getCorrectKey(parts[0])] = parts[1]
      }
    }
  })
  return parsedObj
}

const getCorrectKey = (string: string) => {
  switch (string) {
    case 'bio':
      return 'bio_search'
    case 'from':
      return 'from_users'
    case 'to':
      return 'to_users'
    case 'since':
      return 'from_date'
    case 'until':
      return 'to_date'
    default:
      return string
  }
}


export const queryObjToSearchText = (query: any) => {
  let queriesK = Object.keys(query)
  const parsed = []
  if (queriesK.includes("text")) parsed.push(formatContext(query["text"], query["search_type"]))
  if (queriesK.includes("bio_search")) parsed.push(`(bio:${query["bio_search"]})`)
  if (queriesK.includes("from_users")) parsed.push(`(from:${query["from_users"]})`)
  if (queriesK.includes("to_users")) parsed.push(`(to:${query["to_users"]})`)
  let m_users = query["mention_users"]
  if (queriesK.includes("mention_users")) parsed.push(`(@${m_users.startsWith("@") ? m_users.slice(1) : m_users})`)
  queriesK.forEach(e => {
    if (["text", "search_type", "bio_search", "from_users", "to_users", "mention_users", "from_date", "to_date", "i_value_in_deso", "s_value_in_deso"].includes(e)) {
      return
    }
    parsed.push(`(${e}:${query[e]})`)
  })
  if (queriesK.includes("from_date")) parsed.push(`(since:${query["from_date"]})`)
  if (queriesK.includes("to_date")) parsed.push(`(until:${query["to_date"]})`)

  if (queriesK.includes("i_value_in_deso")) parsed.push(`(value_in_deso:${query["i_value_in_deso"]})`)
  if (queriesK.includes("s_value_in_deso")) parsed.push(`(value_in_deso:${query["s_value_in_deso"]})`)
  return parsed.join(" ")
}

const formatContext = (text: string, search_type: string) => {
  if (search_type === 'exact_phrase')
    return `"${text}"`
  if (search_type === 'any_words')
    return `(${text})`
  if (search_type === 'hashtags')
    return `(${text && text.charAt(0) === '#' ? '' : '#'}${text})`
  return text
}