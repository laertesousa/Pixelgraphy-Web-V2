/**
 * Created by Lae on 7/21/2014.
 */

pixelApp.factory('userService', function($rootScope, $timeout, dataAccessor, sessionStateService)
{
    var service = {};

    service.userID = null;
    service.userProfile = null;
    service.userImages = null;
    service.globalImages = null;

    service.setUserID = function(userID)
    {
        this.userID = userID;

        dataAccessor.getUser(this.userID,function(data)
        {
            if(!data['error'])
            {
                service.userProfile = data['result'];
                setDirectorySource(service.userProfile,"http://userhome.laertesousa.com/",'profile_picture');
            }

            service.notifyProfileUpdate();
        });

        dataAccessor.getUserImages(this.userID,function(data)
        {
            service.userImages = data;
            //setDirectorySource(service.userProfile,"http://userhome.laertesousa.com/",'profile_picture');

            service.notifyImagesUpdate();
        });

    };

    service.updateUserProfile = function()
    {
        if(service.userID == null)
        {
            service.userID = sessionStateService.getSessionField('userID', function(data)
            {
                if(!data['error'])
                {
                    service.userID = data['result'];

                    dataAccessor.getUser(service.userID,function(data)
                    {
                        if(!data['error'])
                        {
                            service.userProfile = data['result'];
                            setDirectorySource(service.userProfile,"http://userhome.laertesousa.com/",'profile_picture');
                        }

                        service.notifyProfileUpdate();
                    });
                }
                else
                {
                    window.location.href='/';
                }

            });
        }
        else
        {
            dataAccessor.getUser(this.userID,function(data)
            {
                if(!data['error'])
                {
                    service.userProfile = data['result'];
                }

                service.notifyProfileUpdate();
            });
        }


    };


    service.updateGlobalImages = function()
    {
        dataAccessor.getImages(function(data)
        {
            var images = data;
            setSource(data,"http://userhome.laertesousa.com/");
            service.globalImages = images;

            service.notifyGlobalImagesUpdate();
        });

    };


    service.broadcastUpdate = function()
    {
        $rootScope.$broadcast('userUpdate');
    };

    service.notifyProfileUpdate = function()
    {
      $rootScope.$broadcast('profileUpdate');
    };

    service.notifyImagesUpdate = function()
    {
        $rootScope.$broadcast('imagesUpdate');
    };

    service.notifyGlobalImagesUpdate = function()
    {
        $rootScope.$broadcast('globalImagesUpdate');
    }

    return service;
});