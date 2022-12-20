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

function fetchAllOwners() { }

function fetchCatsByOwner() { }

function fetchCatPics() { }

function fetchAllCats() { }

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
