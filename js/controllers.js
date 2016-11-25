angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Groups) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.groups = Groups.all();
  $scope.remove = function(group) {
    Groups.remove(group);
  };
})

.controller('GroupDetailCtrl', function($scope, $stateParams, $http, Groups) {
//  $scope.chat = Chats.get($stateParams.chatId);
//$scope.group = groups.all();
$scope.group = Groups.get($stateParams.groupId);



    $scope.amount = 1;
    $scope.currencyIndex= 'USD';
    $scope.change = function(){
        $http.get('http://api.fixer.io/latest?base='+$scope.currencyIndex).then(function(res){
            if($scope.currencyIndex == 'INR')
                $scope.amtInr = parseFloat($scope.amount);
            else
                $scope.amtInr = parseFloat($scope.amount) * res.data.rates.INR;

            if($scope.currencyIndex == 'USD')
                $scope.amtUsd = parseFloat($scope.amount);
            else
                $scope.amtUsd = parseFloat($scope.amount) * res.data.rates.USD;

            if($scope.currencyIndex == 'GBP')
                $scope.amtGbp = parseFloat($scope.amount);
            else
                $scope.amtGbp = parseFloat($scope.amount) * res.data.rates.GBP;

            //console.log(res);
        });
    }
    $scope.$watch('amount',function(){ $scope.change(); });
    $scope.$watch('currencyIndex',function(){ $scope.change(); });
})

//usd $ symbol for currency
.filter('USD',function(){
    return function(val){
    return ('$ '+val);
    };
})

.filter('INR',function(){
    return function(val){
    return ('₹ '+val);
    };
})

.filter('GBP',function(){
    return function(val){
    return ('£ '+val);
    };
})


.controller('BitcoinDesk', function($scope, $stateParams, Groups, $http, $interpolate, $timeout, $filter) {

  $scope.groups = Groups.all();

//controller interpolate
    $scope.resolveText = function(t) {
        return $interpolate(t)($scope);
      };


    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };


$scope.betDelay = false;

$scope.fetchcoindesk = function() {

  $scope.betDelay = true;
  $timeout(function() {
          $scope.betDelay=false;
      }, 10000);

     $http.get("http://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday")
     .then(function(response){

     $scope.coindeskyesterdayrate = response.data.bpi;
     $scope.coindeskyesterday = $scope.coindeskyesterdayrate[Object.keys($scope.coindeskyesterdayrate)[0]] ;
     var rateYesterday = parseFloat($scope.coindeskyesterdayrate[Object.keys($scope.coindeskyesterdayrate)[0]]);
      // console.log("coindesk yesterday");
      // console.log($scope.coindeskyesterdayrate[Object.keys($scope.coindeskyesterdayrate)[0]] + '$');


     $http.get("http://api.coindesk.com/v1/bpi/currentprice/USD.json")
    .then(function(response){
      $scope.coindeskrateTicker = response.data.bpi.USD.rate;
      $scope.coindeskrate = (response.data.bpi.USD.rate_float).toFixed(2);
      $scope.coindeskupdate = response.data.time.updateduk;
      var rateToday = parseFloat(response.data.bpi.USD.rate);
     // console.log("coindesk live");
     // console.log(response.data.bpi.USD.rate);
    //  console.log(response.data);
    //  console.log(rateToday);
    //  console.log(rateYesterday);
      $scope.coindeskavg = ((rateToday + rateYesterday)/2).toFixed(2);

      $scope.change = (((rateToday - rateYesterday)*100)/rateYesterday).toFixed(2) + ' %';
      //console.log('Change' + ' ' +$scope.change);

              if(rateToday > rateYesterday){
                 $scope.up=true;
               }
               else
               {
                 $scope.down=true;
               }
          });
    });

}

$scope.fetchlocalbitcoin = function(){

  $scope.betDelay = true;
  $timeout(function() {
          $scope.betDelay=false;
      }, 10000);

    $http.get("https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/")
    .then(function(response){
      $scope.localbitcoin = response.data;
      $scope.localbitcoinrate = response.data.USD.avg_1h;
    //  console.log("localbitcoin");
     // console.log($scope.localbitcoinrate);
      $scope.localbitcoindate = new Date();
      $scope.localbitcoinupdate = $scope.localbitcoindate.toUTCString();

      $scope.localbitcoinYesterday = response.data.USD.avg_24h;

      $scope.localbitcoinavg = ((parseFloat(response.data.USD.avg_1h) + parseFloat(response.data.USD.avg_24h))/2).toFixed(2);
      });
  }

//igot API Not working
$scope.fetchigot =  function(){
    $http.get("https://www.igot.com/api/v1/stats/buy")
    .then(function(response){
      $scope.igot = response.data;
    //  console.log("igot");
    //  console.log(response.data);
    });
  };

  //itBit
  $scope.fetchitBit =  function(){

    $scope.betDelay = true;
    $timeout(function() {
            $scope.betDelay=false;
        }, 10000);

      $http.get("https://api.itbit.com/v1/markets/XBTUSD/ticker")
      .then(function(response){
        $scope.itBit = response.data;
        $scope.itBitrate = response.data.ask;
        $scope.itBitupdate = response.data.serverTimeUTC;
        $scope.itBitupyesterday = parseFloat(response.data.openToday);
    //    console.log("itBit");
      //    console.log(response.data);
        $scope.itBitHighLowToday = parseFloat(response.data.highToday) + ' / ' + parseFloat(response.data.lowToday);

        $scope.itBitavg = ((parseFloat(response.data.high24h) + parseFloat(response.data.highToday) + parseFloat(response.data.low24h) + parseFloat(response.data.lowToday))/4).toFixed(2);
              console.log($scope.itBitrate);
        });
    };

    //btc-e
    $scope.fetchbtce =  function(){

      $scope.betDelay = true;
      $timeout(function() {
              $scope.betDelay=false;
          }, 10000);

        $http.get("https://btc-e.com/api/3/ticker/btc_usd?ignore_invalid=1")
        .then(function(response){
          $scope.btce = response.data;
          $scope.btcerate = (response.data.btc_usd.buy).toFixed(2);
          $scope.btceupdateUnix = response.data.btc_usd.updated;
          $scope.btceyesterday = parseFloat(response.data.openToday);
          console.log("Btc-e");
      //    console.log(response.data);
          $scope.milliseconds = Date('{{btceupdateUnix}}' * 1000);
          $scope.btceupdate = $filter('date')($scope.milliseconds, 'd MMMM yyyy');

          $scope.btceHighLowToday = (response.data.btc_usd.low).toFixed(2) + ' / ' + (response.data.btc_usd.high).toFixed(2);
          $scope.btceavg = (response.data.btc_usd.avg).toFixed(2);
          //console.log(  $scope.btcelowToday);
          });
      };

      //BitStamp
      $scope.fetchBitStamp =  function(){

        $scope.betDelay = true;
        $timeout(function() {
                $scope.betDelay=false;
            }, 10000);

          $http.get("https://www.bitstamp.net/api/v2/ticker/btcusd")
          .then(function(response){
            $scope.BitStamp = response.data;
            $scope.BitStamprate = parseFloat(response.data.bid).toFixed(2);
            $scope.BitStampupdateUnix = response.data.timestamp;
            $scope.BitStampyesterday = (parseFloat(response.data.open)).toFixed(2);
        //    console.log("BitStamp");
        //    console.log(response.data);
            $scope.milliseconds = Date('{{BitStampupdateUnix}}' * 1000);
            $scope.BitStampupdate = $filter('date')($scope.milliseconds, 'd MMMM yyyy');

            $scope.BitStampHighLowToday = (parseFloat(response.data.low)).toFixed(2) + ' / ' + (parseFloat(response.data.high)).toFixed(2);
            $scope.BitStampavg = (parseFloat(response.data.vwap)).toFixed(2) ;
        //    console.log($scope.BitStampupdate);
            });
        };


        //BitKonan
        $scope.fetchBitKonan =  function(){

          $scope.betDelay = true;
          $timeout(function() {
                  $scope.betDelay=false;
              }, 10000);

            $http.get("https://bitkonan.com/api/ticker")
            .then(function(response){
              $scope.BitKonan = response.data;
              $scope.BitKonanrate = parseFloat(response.data.last).toFixed(2);
              $scope.BitKonandate = new Date();
              $scope.BitKonanupdate = $scope.BitKonandate.toUTCString();
              $scope.BitKonanyesterday = (parseFloat(response.data.open)).toFixed(2);
         //     console.log("BitKonan");
            //  console.log(response.data);

              $scope.BitKonanHighLowToday = (parseFloat(response.data.low)).toFixed(2) + ' / ' + (parseFloat(response.data.high)).toFixed(2);
              $scope.BitKonanavg = ([parseFloat(response.data.open) + parseFloat(response.data.low) + parseFloat(response.data.high) + parseFloat(response.data.last)]/4).toFixed(2);
          //    console.log($scope.BitKonan);
              });
          };

          //Poloniex
          $scope.fetchPoloniex =  function(){

            $scope.betDelay = true;
            $timeout(function() {
                    $scope.betDelay=false;
                }, 10000);

              $http.get("https://poloniex.com/public?command=returnTicker")
              .then(function(response){
                $scope.Poloniex = response.data;
                $scope.Poloniexrate = parseFloat(response.data.USDT_BTC.last).toFixed(2);
                $scope.Poloniexdate = new Date();
                $scope.Poloniexupdate = $scope.Poloniexdate.toUTCString();
                $scope.Poloniexyesterday = (parseFloat(response.data.USDT_BTC.high24hr)).toFixed(2);
          //      console.log("Poloniex");
          //      console.log(response.data);

                $scope.PoloniexHighLowToday = (parseFloat(response.data.USDT_BTC.low24hr)).toFixed(2) + ' / ' + (parseFloat(response.data.USDT_BTC.high24hr)).toFixed(2);
                $scope.Poloniexavg = ([parseFloat(response.data.USDT_BTC.high24hr) + parseFloat(response.data.USDT_BTC.low24hr) + parseFloat(response.data.USDT_BTC.last)]/3).toFixed(2);
            //    console.log($scope.BitKonan);
                });
            };


            //Coinmarketcap
            $scope.fetchCoinmarketcap =  function(){

              $scope.betDelay = true;
              $timeout(function() {
                      $scope.betDelay=false;
                  }, 10000);

                $http.get("https://api.coinmarketcap.com/v1/ticker/bitcoin/")
                .then(function(response){
                  $scope.Coinmarketcap = response.data[Object.keys(response.data)[0]];
                  $scope.Coinmarketcaprate = parseFloat($scope.Coinmarketcap.price_usd).toFixed(2);
                  $scope.Coinmarketcapchange24h = $scope.Coinmarketcap.percent_change_24h;
                  $scope.CoinmarketcapupdateUnix = $scope.Coinmarketcap.last_updated;

                  $scope.CoinmarketcapLasthour = ((parseFloat($scope.Coinmarketcaprate) - (parseFloat($scope.Coinmarketcaprate) * parseFloat($scope.Coinmarketcap.percent_change_1h))/100)).toFixed(2);

                  $scope.Coinmarketcap24h = ((parseFloat($scope.Coinmarketcaprate) - (parseFloat($scope.Coinmarketcaprate) * parseFloat($scope.Coinmarketcapchange24h))/100)).toFixed(2);
                  $scope.Coinmarketcapyesterday = (parseFloat(response.data.open)).toFixed(2);

              //    console.log("Coinmarketcap");
                //  console.log($scope.Coinmarketcap);
                  $scope.millisecondsCoinmarketcap = Date('{{CoinmarketcapUnix}}' * 1000);
                  $scope.Coinmarketcapupdate = $filter('date')($scope.millisecondsCoinmarketcap, 'd MMMM yyyy');

                  //$scope.CoinmarketcapHighLowToday = (parseFloat($scope.Coinmarketcap.)).toFixed(2) + ' / ' + (parseFloat(response.data.high)).toFixed(2);
                  $scope.Coinmarketcapavg = ((parseFloat($scope.Coinmarketcaprate) + parseFloat($scope.CoinmarketcapLasthour) + parseFloat($scope.Coinmarketcap24h))/3).toFixed(2);
                //  console.log($scope.Coinmarketcapavg);
                  });
              };


              //Blockchain
              $scope.fetchBlockchain =  function(){

                $scope.betDelay = true;
                $timeout(function() {
                        $scope.betDelay=false;
                    }, 10000);

                  $http.get("https://blockchain.info/ticker")
                  .then(function(response){
                    $scope.Blockchain = response.data;
                    $scope.Blockchainrate = parseFloat(response.data.USD.last).toFixed(2);
                    $scope.Blockchaindate = new Date();
                    $scope.Blockchainupdate = $scope.Blockchaindate.toUTCString();
                    $scope.Blockchain15min = $scope.Blockchain.USD[Object.keys($scope.Blockchain.USD)[0]];
              //      console.log("Blockchain");
                  //  console.log($scope.Blockchain.USD[Object.keys($scope.Blockchain.USD)[0]]);
            //        console.log(response.data);

              //      $scope.PoloniexHighLowToday = (parseFloat(response.data.USDT_BTC.low24hr)).toFixed(2) + ' / ' + (parseFloat(response.data.USDT_BTC.high24hr)).toFixed(2);
              //      $scope.Blockchainavg = ([parseFloat(response.data.USDT_BTC.high24hr) + parseFloat(response.data.USDT_BTC.low24hr) + parseFloat(response.data.USDT_BTC.last)]/3).toFixed(2);
                //    console.log($scope.BitKonan);
                    });
                };


  //request api calls
//  fetchcoindesk();
//  fetchigot();
//  fetchlocalbitcoin();
$scope.fetchcoindesk();
$scope.fetchlocalbitcoin();
//$scope.fetchigot();
$scope.fetchitBit();
$scope.fetchbtce();
$scope.fetchBitStamp();
$scope.fetchBitKonan();
$scope.fetchPoloniex();
$scope.fetchCoinmarketcap();
$scope.fetchBlockchain();

$scope.doRefresh = function() {
   // here refresh data code
   $scope.fetchcoindesk();
   $scope.fetchitBit();
   $scope.fetchbtce();
   $scope.fetchlocalbitcoin();
   $scope.fetchBitStamp();
   $scope.fetchBitKonan();
   $scope.fetchPoloniex();
   $scope.fetchCoinmarketcap();
   $scope.fetchBlockchain();

   $scope.betDelay = true;
   $timeout(function() {
           $scope.betDelay=false;
       }, 10000);

   $scope.$broadcast('scroll.refreshComplete');
//   $scope.$apply()
};

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
