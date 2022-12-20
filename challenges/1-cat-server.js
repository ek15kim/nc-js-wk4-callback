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

  catPicsArr.forEach((item) =>{
    request(`/pics/${item}`, (err, data) => {
     
    if (err) {
      newArr.push("placeholder.jpg") 
    callCount++
    }
  
    else {
      newArr.push(data)
      callCount++;
    } 
    if (callCount === catPicsArr.length) {
      console.log(newArr);
    callback(err, newArr);
    }  

    })
    
  })
  }
 

function fetchAllCats() { 
  
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
