angular.module('starter.services', [])

.factory('Groups', function() {
  // Might use a resource here that returns a JSON array

  var groups = [
  {  id: 8, name: 'Blockchain',  face: 'img/logo-Blockchain.png', currentrate: '{{ Blockchainrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ Blockchainupdate | limitTo:28 }}' }, { subName: '15m ago', subId: '{{ Blockchain15min  | USD}}' }]},
  {  id: 0,  name: 'Coindesk',  face: 'img/logo-coindesk.png',  currentrate: '{{ coindeskrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ coindeskupdate }} ' }, { subName: 'Yesterday', subId: '{{ coindeskyesterday  | USD }}' }, { subName: '24-hours Average', subId: '{{ coindeskavg  | USD }} ' }]},
  {  id: 1, name: 'Localbitcoins', face: 'img/logo-localbitcoins.png', currentrate: '{{ localbitcoinrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ localbitcoinupdate }}' }, { subName: 'Yesterday', subId: '{{ localbitcoinYesterday  | USD }}' }, { subName: '24-hours Average', subId: '{{ localbitcoinavg  | USD }} ' }]},
  {  id: 2, name: 'itBit', face: 'img/logo-itbit.png', currentrate: '{{ itBitrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ itBitupdate | limitTo:19 }}' }, { subName: 'Low/High Today', subId: '{{ itBitHighLowToday | USD }}' }, { subName: 'Yesterday', subId: '{{ itBitupyesterday | USD }}' }, { subName: '24-hours Average', subId: '{{ itBitavg | USD }}' }]},
  {  id: 3, name: 'Btc-e',  face: 'img/logo-btce.png', currentrate: '{{ btcerate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ btceupdate | limitTo:28 }}' }, { subName: 'Low/High Today', subId: '{{ btceHighLowToday | USD }}' }, { subName: '24-hours Average', subId: '{{ btceavg | USD }}' }]},
  {  id: 4, name: 'BitStamp',  face: 'img/logo-bitstamp.png', currentrate: '{{ BitStamprate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ BitStampupdate | limitTo:28 }}' }, { subName: 'Low/High Today', subId: '{{ BitStampHighLowToday | USD }}' }, { subName: 'Yesterday', subId: '{{ BitStampyesterday | USD }}' } ,{ subName: '24-hours Average', subId: '{{ BitStampavg | USD }}' }]},
  {  id: 5, name: 'BitKonan',  face: 'img/logo-bitkonan.png', currentrate: '{{ BitKonanrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ BitKonanupdate | limitTo:28 }}' }, { subName: 'Low/High Today', subId: '{{ BitKonanHighLowToday  | USD}}' }, { subName: 'Yesterday', subId: '{{ BitKonanyesterday | USD }}' } ,{ subName: '24-hours Average', subId: '{{ BitKonanavg  | USD}}' }]},
  {  id: 6, name: 'Poloniex',  face: 'img/logo-poloniex.png', currentrate: '{{ Poloniexrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ Poloniexupdate | limitTo:28 }}' }, { subName: 'Low/High Today', subId: '{{ PoloniexHighLowToday  | USD}}' }, { subName: 'Yesterday', subId: '{{ Poloniexyesterday | USD }}' } ,{ subName: '24-hours Average', subId: '{{ Poloniexavg  | USD}}' }]},
  {  id: 7, name: 'Coinmarketcap',  face: 'img/logo-CoinMarketCap.png', currentrate: '{{ Coinmarketcaprate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ Coinmarketcapupdate | limitTo:28 }}' }, { subName: 'Yesterday', subId: '{{ Coinmarketcap24h | USD }}' }, { subName: 'Last Hour', subId: '{{ CoinmarketcapLasthour | USD }}' } ,{ subName: '24-hours Average', subId: '{{ Coinmarketcapavg | USD }}' }]}
//  {  id: 8, name: 'Blockchain',  face: 'img/logo-Blockchain.png', currentrate: '{{ Blockchainrate | USD }}', items: [{ subName: 'Last Updated', subId: '{{ Blockchainupdate | limitTo:28 }}' }, { subName: '15m ago', subId: '{{ Blockchain15min  | USD}}' }]}
];


  return {
    all: function() {
      return groups;
    },

  /* remove: function(group) {
      chats.splice(chats.indexOf(chat), 1);
    },*/
    get: function(groupId) {
        for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === parseInt(groupId)) {
          return groups[i];
          }
      }
      return null;
    }
  };
});
