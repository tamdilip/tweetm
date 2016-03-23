var app=angular.module('tweet',['ui.bootstrap','luegg.directives','ngDialog']);


app.controller('tctrl',['$scope','$http','$window','$interval','ngDialog',function($scope,$http,$window,$interval,ngDialog) {

$scope.uname='';
$scope.pass='';

  $scope.redir=function(){
  $window.location.href='/index.html';	
  };
 $scope.copen = function () {
        ngDialog.open({ template: 'de.html', className: 'ngdialog-theme-default',scope: $scope });
    };

$scope.mid='+91';
 $scope.fg= function () {
console.log('deacc');        
ngDialog.open({ template: 'templateId', className: 'ngdialog-theme-default',scope: $scope });
    };


 $scope.tp = function (id) {
console.log(id);  
$http.post('/fg/'+id).success(function(res){

var json=res;
json.forEach(function(data)
{
  console.log(data.name); 
var no=data.name;
sessionStorage.setItem("chgname", no);
ngDialog.close({ template: 'templateId' });
ngDialog.open({ template: 'templateId1', className: 'ngdialog-theme-default',scope: $scope });
});

});
    };
$scope.chgSession = sessionStorage.getItem("chgname");


 $scope.tp1 = function (id) {
console.log(id);  
$http.post('/ffg/'+id).success(function(res){

var json=res;
json.forEach(function(data)
{
  console.log(data.name); 
var no=data.otp;
if(data.otp){
ngDialog.close({ template: 'templateId1' });
ngDialog.open({ template: 'templateId2', className: 'ngdialog-theme-default',scope: $scope });
}
});

});
    };

$scope.chg=function(id){
console.log(id);
var nn=sessionStorage.getItem("chgname");
console.log(nn);
$http.put('/pup/'+id,{name:nn}).success(function(response) {
sessionStorage.clear();
console.log(response);
ngDialog.close({ template: 'templateId2' });
	  });

};



$scope.d="+91";
$scope.deacc=function(id){
console.log(id);
console.log('deacc');
$http.put('/deacc/'+id,{name:$scope.userSession}).success(function(response) {
console.log(response);
sessionStorage.clear();
$window.location.href = '/index.html';

	  });

};



$scope.collapsed=false;
$scope.state="Open";
$scope.tog=function(){
$scope.collapsed=$scope.collapsed ? false : true;
$scope.state=$scope.state=="Open"? $scope.state="Close":$scope.state="Open";


};

$scope.userSession = sessionStorage.getItem("name");


$scope.fx='+91';
$scope.reg = function() {
	  $http.post('/data1',{name:$scope.uname,pass:$scope.pass,phno:$scope.fx+$scope.phno,following:[],createdAt:new Date(),dp:'',otp:Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4),status:''}).success(function(response) {
console.log(response);
if(response){
console.log(response);
alert('Successfully registered !!');
$window.location.href = '/index.html';

}
else
{
alert('Username Already Taken !!');
}

	  });
	};


$scope.aler=function(id) {
console.log(id);
$http.put('/dp',{name:$scope.userSession ,dp:id}).success(function(response) {
console.log(response);
$window.location.href = '/feeds.html';
	  });
};


$scope.back=function() {
$window.location.href = '/feeds.html';
};


$scope.check=function(id) {
console.log(id);
$http.post('/check/'+id).success(function(res){
$scope.validUser1=res;


});

};


$scope.log=function(id) {
console.log(id);
$http.post('/data1/'+id,{pass:$scope.pass}).success(function(res){
$scope.validUser=res;
console.log(res);

var json=res;
json.forEach(function(data)
{
  console.log(data.phno); 
var no=data.phno;
if(data.phno){
$http.post('/sms/'+id,{phno:no});
}
});

if($scope.validUser.length){
sessionStorage.setItem("name", id);
$window.location.href = '/feeds.html';

}
else
{
alert('INVALID CREDENTIALS');
}

});
};


var refresh=function(){
$http.get('/data2').success(function(response) {

$scope.f=response;
$scope.feed='';
	  });
};



$http.get('/data2').success(function(response) {

$scope.f=response;
	  });



$scope.feed='';

     $scope.$watch('feed', function() {
  $http.get('/data2').success(function(response) {
$scope.f=response;
$scope.markers=response.length;

	  });
   });



 $scope.$watch('markers', function(newValue, oldValue){
 
if(newValue && oldValue){
$scope.pop='new msg';
} }, true);

$scope.hide=function(){
$scope.pop='';
};



$scope.feedp = function() {
console.log($scope.feed);
	  $http.post('/data2', {feeds:$scope.feed,user:$scope.userSession,createdAt:new Date()}).success(function(response) {
console.log(response);
	  });
refresh();
	};



var refreshm=function(){
$http.get('/data3').success(function(response) {
console.log(response);
$scope.fm=response;
	  });
};

$http.get('/data3').success(function(response) {
console.log(response);
$scope.fm=response;
	  });

$scope.chatSession='';
$scope.chatUser = function(id) {
console.log(id);
$scope.chatSession=id;
	};

$scope.chatUser1 = function(id) {
console.log(id);
$scope.chatSession=id;
$http.put('/read/'+id, {user1:$scope.userSession}).success(function(response) {
console.log(response);
refreshm();
	  });
	};
$scope.msg='';

     $scope.$watch('msg', function() {
  $http.get('/data3').success(function(response) {
$scope.fm=response;
	  });
   });



$scope.msgp = function() {
console.log($scope.feed);
	  $http.post('/data3', {user1:$scope.userSession,user2:$scope.chatSession,message:$scope.msg,createdAt:new Date(),status:'unread'}).success(function(response) {
console.log(response);
	  });
$scope.msg='';
	};


    $scope.selected = '';
    $scope.userSession1 = sessionStorage.getItem("name1");
    $scope.setPcode = function(site) {
console.log(site);
  		$scope.selPcode = site.createdAt;
sessionStorage.setItem("name1",site.name);
$window.location.href = '/feeds1.html';
  	};

$http.get('/data1').success(function(response) {

$scope.f1=response; 
$scope.states=response;
});



var refresh1=function(){
$http.get('/data1').success(function(response) {

$scope.f1=response; 

});
};

$scope.follow=function(id){
console.log(id);
$scope.id=id;
$http.put('/data1',{name:$scope.userSession ,following:$scope.id}).success(function(response) {
refresh1();
	  });

};

$scope.unfollow=function(id){
console.log(id);
$scope.id=id;
$http.put('/data1/'+id,{name:$scope.userSession ,following:$scope.id}).success(function(response) {
refresh1();
	  });

};


$scope.edit=function(id){
console.log(id);
$http.get('/data2/'+id).success(function(response) {
console.log(response);
$scope.feed=response.feeds;
$scope.upid=response._id;
	  });

};




$scope.update=function(id){
console.log(id);
$http.post('/data2/'+id,{feeds:$scope.feed}).success(function(response) {
console.log(response);
refresh();
	  });

};



$scope.delete=function(id){
console.log(id);
$http.put('/data2/'+id).success(function(response) {
console.log(response);
refresh();
	  });

};

$scope.logout=function (){
$http.post('/out',{name:$scope.userSession}).success(function(response) {
console.log(response);
sessionStorage.clear();
$window.location.href = '/index.html';
});
};




$scope.fol=function(id){

for( var c in id)
{
console.log(id[c]);
$http.post('/follow/'+id[c]).success(function(response) {
console.log(response);
$scope.f2=response;
	  });
}


refresh();

};


}]);
