const request = require('../utils/server');


const checkServerStatus = (callback) => request('/status', callback)

const fetchBannerContent = (callback) => request('/banner', (err, response) => {
  err ?
    callback(err) :
    callback(null, { ...response, copyrightYear: 2023 })
})

const fetchAllOwners = (callback) => {
  request('/owners', (err, data) => {
    err ?
      callback(err) :
      callback(null, data.map((item) => item.toLowerCase()
      ))
  })
}

const fetchCatsByOwner = (owner, callback) => {
  request(`/owners/${owner}/cats`, callback)
}


function fetchCatPics(catPicsArr, callback) {
  const newArr = []
  let callCount = 0;

  if (catPicsArr.length === 0) callback(null)

  catPicsArr.forEach((item) => {
    request(`/pics/${item}`, (err, data) => {

      if (err) newArr.push("placeholder.jpg")
      else newArr.push(data)
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
    if (err) callback(err)
    else {
      data.forEach((owner, index) => {
        fetchCatsByOwner(owner, (err, catData) => {
          if (err) callback(err)
          else {
            allCats.push(...catData)
          }
          count++
          if (count === data.length && data.length) {
            callback(null, allCats.sort())
          }
        })
      })
    }
  })
}

function fetchOwnersWithCats(callback) {
  const ownersWithCats = [];
  let count = 0;

  fetchAllOwners((err, owners) => {
    if (err) callback(err)

    owners.forEach((owner, index) => {
      fetchCatsByOwner(owner, (err, ownersCats) => {
        if (err) callback(err)
        ownersWithCats[index] = ({ owner: owner, cats: ownersCats })
        count++
        if (count === owners.length) {
          callback(null, ownersWithCats)
        }
      })
    })

  })
}

const kickLegacyServerUntilItWorks = (callback) => request('/legacy-status',
  (err, data) => err ? kickLegacyServerUntilItWorks(callback) : callback(null, data)
)

const buySingleOutfit = (outfit, callback) => {
  let count = 0;
  request(`/outfits/${outfit}`, (err, data) => {
    if (err) {
      callback(err)
    }
    else if (count < 1) {
      callback(null, data)
    }
    count++;
  })
}


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



// function checkServerStatus(callback) {
//   request('/status', callback)
// }

// function fetchBannerContent(callback) {
//   request('/banner', (err, obj) => {
//     obj.copyrightYear = 2022

//     callback(null, { ...obj })
//   })
// }

// function fetchAllOwners(callback) {
//   request('/owners', (err, arr) => {
//     // error first
//     if (err) callback(err)
//     // const newArr = arr.map((item) =>
//     //   item.toLowerCase()
//     // )
//     callback(null, arr.map((item) =>
//       item.toLowerCase()
//     ))
//   })
// }

// function fetchCatsByOwner(owner, callback) {
//   request(`/owners/${owner}/cats`, callback)
// }

// function kickLegacyServerUntilItWorks(callback) {
//   request('/legacy-status', (err, data) => {
//     if (err) kickLegacyServerUntilItWorks(callback)
//     else callback(null, data)
//   })
// }

// function buySingleOutfit(outfit, callback) {
//   let count = 0;
//   request(`/outfits/${outfit}`, (err, data) => {
//     if (err) {
//       callback(err)
//     }
//     else if (count < 1) {
//       callback(null, data)
//     }
//     count++;
//   })
// }
