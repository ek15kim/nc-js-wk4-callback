const request = require('../utils/server');

function checkServerStatus(callback) {
  request('/status', callback)
}

function fetchBannerContent(callback) {
  request('/banner', (err, obj) => {
    obj.copyrightYear = 2022

    callback(null, { ...obj })
  })
}

function fetchAllOwners(callback) {
  request('/owners', (err, arr) => {
    const newArr = arr.map((item) =>
      item.toLowerCase()
    )
    console.log(newArr)
    callback(null, newArr)
  })
}
function fetchCatsByOwner(owner, callback) {
  request(`/owners/${owner}/cats`, callback)
}

function fetchCatPics(catPicsArr, callback) {
  const newArr = []
  let callCount = 0;

  if (catPicsArr.length === 0) callback(null)

  catPicsArr.forEach((item) => {
    request(`/pics/${item}`, (err, data) => {

      err ? newArr.push("placeholder.jpg") : newArr.push(data)
      callCount++

      if (callCount === catPicsArr.length) {
        callback(err, newArr);
      }
    })
  })
}

function fetchAllCats(callback) {
  const allCats = [];
  let count = 0;

  fetchAllOwners((err, data) => {
    if (err) console.error(err)
    else {
      // data  [ 'pavlov', 'schrodinger', 'foucault', 'vel', 'calvin' ]
      data.forEach(owner => {
        fetchCatsByOwner(owner, (err, catData) => {
          if (err) console.error(err)
          else {
            allCats.push(...catData)
          }
          count++
          if (count === data.length && data.length) {
            callback(allCats.sort())
          }
        })

      })
    }

  })



}

function fetchOwnersWithCats() { }

function kickLegacyServerUntilItWorks() { }

function buySingleOutfit() { }

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
