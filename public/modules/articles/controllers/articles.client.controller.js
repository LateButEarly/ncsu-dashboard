'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function ($scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;

        $scope.comments = [
            {
                author: 'Dylan Ryan',
                authorImg: 'http://www.gravatar.com/avatar/3e1728ff7829320010142c68a5a4d2df?s=150',
                postedOn: '2/18/2015',
                body: 'Chambray fixie viral, mixtape Pinterest Shoreditch Neutra iPhone Vice disrupt literally Wes Anderson squid. Art party hoodie normcore cred Tumblr irony gastropub. American Apparel before they sold out sartorial, flannel 3 wolf moon keytar Banksy small batch kitsch mlkshk Thundercats banh mi cliche disrupt VHS. Echo Park biodiesel cardigan fingerstache keytar freegan artisan plaid synth. Tofu drinking vinegar semiotics photo booth, biodiesel locavore mustache VHS ugh freegan bicycle rights seitan put a bird on it. Chillwave chambray flannel, messenger bag hella Tumblr iPhone. Farm-to-table letterpress pug skateboard, gastropub vegan cardigan forage cold-pressed Odd Future chambray wayfarers normcore ugh fingerstache.'
            },
            {
                author: 'Daniel Marko',
                authorImg: 'http://s.gravatar.com/avatar/46902b4ccc44221b0e8c703fcd53fb03?s=150',
                postedOn: '2/20/2015',
                body: 'Jean shorts next level tilde artisan DIY. Banh mi kitsch Echo Park PBR&B lomo. Roof party selvage narwhal banjo, meditation Thundercats Wes Anderson stumptown food truck heirloom sriracha. Pug tousled four loko gluten-free synth. Carles Truffaut American Apparel keffiyeh sustainable, squid keytar meggings actually. Mumblecore meh Blue Bottle, sriracha Pitchfork normcore freegan Carles artisan four dollar toast kitsch XOXO post-ironic chambray cronut. Fashion axe direct trade Austin PBR&B health goth, retro small batch selvage fap cronut umami fingerstache.'
            }

        ];

        $scope.getGravatar = function() {
            var userEmail = $scope.user.email;
            return '//www.gravatar.com/avatar/' + md5(userEmail.trim()) + '?s=100';
        };

        $scope.create = function () {
            var article = new Articles({
                title: this.title,
                content: this.content,
                image: this.imageUrl
            });
            article.$save(function (response) {
                $location.path('articles/' + response._id);

                $scope.title = '';
                $scope.content = '';
                $scope.imageUrl = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.createComment = function () {
            $scope.comments.push({author: $scope.user.displayName, authorImg: $scope.getGravatar, postedOn: Date.now, body: $scope.body});
            //$scope.comments.save($scope.comments).then(function(data){});
        };

        $scope.remove = function (article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function () {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function () {
            var article = $scope.article;

            article.$update(function () {
                $location.path('articles/' + article._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.articles = Articles.query();
            console.log(Articles.query());
        };

        $scope.findOne = function () {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
            console.log($stateParams);
            console.log($scope.article);
        };
    }
]);
