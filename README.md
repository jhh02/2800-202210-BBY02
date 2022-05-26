# 2800-202210-BBY36
### Team BBY36

## My Web Application (DoughMe)
 
* [General info](#general-info)
* [Team Members](#team-members)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application is a food donation platform that helps the authorized people and charity organizations by providing them with a platform to get bakery products which are donated by the bakeries.

Our app is different from the other apps because it only allows authorized individuals and charity organizations to reserve the products that are donated by the bakeries. 


## Developer's Details
Sr.No.  NAME                Student ID          Set
1.      Dongil Kwon         A01267744           set A
2.      Nischey Gupta       A01311590           set A
3.      Jun Ho Han          A01061045           set A
4.      James Lum           A01182671           set B

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript 
* MySQL

## Content
Content of the project folder:

```
 Top level of project folder: 
├── .env                    # 
├── .gitignore              # Git ignore files
├── .vscode                 # 
├── api                     # 
├── public                  # 
├── views                   # 
├── package-lock.json       # 
├── package.json            # 
├── Procfile                # 
├── readme.txt              # 
├── server.js               # 
├── users.json              # 
└── README.md               # Read me file for basic information about the project,folders etc.

It has the following subfolders and files:

├── .git                    # Folder for git repo

├── .vscode                 # 
    /settings.json

├── api                     #
    /config
        /db.js
    /controllers
        /adminController.js
        /donationController.js
        /userController.js
    /middleware
        /adminMiddleware.js
        /authMiddleware.js
        /errorMiddleware.js
    /models
        /donationModel.js
        /postModel.js
        /profilePictureModel.js
        /roleModel.js
        /userModel.js
    /routes
        /apiRoutes.js
        /donationRoutes.js
        /root.js
        /userRoutes.js

├── public                 #
    /css
        /addedtocart.css
        /admin.css
        /availabledonations.css
        /cart.css
        /dashboard 2.css
        /dashboard.css
        /deliveryacception 2.css
        /deliveryacception.css
        /deliverydescription 2.css
        /deliverydescription.css
        /donationdescription 2.css
        /donationdescription.css
        /donationform 2.css
        /donationform.css
        /footer 2.css
        /footer.css
        /index.css
        /indexpast 2.css
        /indexpast.css
        /login.css
        /pendingreservations 2.css
        /pendingreservations.css
        /profile.css
        /register.css
        /role.css
        /thanksdonor.css
        /thanksdriver 2.css
        /thanksdriver.css
        /thanksreceiver 2.css
        /thanksreceiver.css

    /fonts                  
        /Hind-Bold 2.ttf
        /Hind-Bold.ttf
        /Hind-Light 2.ttf
        /Hind-Light.ttf
        /Hind-Medium 2.ttf
        /Hind-Medium.ttf
        /Hind-Regular 2.ttf
        /Hind-Regular.ttf
        /Hind-SemiBold 2.ttf
        /Hind-SemiBold.ttf
        /hind-v16-latin-300 2.eot
        /hind-v16-latin-300 2.svg
        /hind-v16-latin-300 2.ttf
        /hind-v16-latin-300 2.woff
        /hind-v16-latin-300 2.woff2
        /hind-v16-latin-300.eot
        /hind-v16-latin-300.svg
        /hind-v16-latin-300.ttf
        /hind-v16-latin-300.woff
        /hind-v16-latin-300.woff2
        /hind-v16-latin-500 2.eot
        /hind-v16-latin-500 2.svg
        /hind-v16-latin-500 2.ttf
        /hind-v16-latin-500 2.woff
        /hind-v16-latin-500 2.woff2
        /hind-v16-latin-500.eot
        /hind-v16-latin-500.svg
        /hind-v16-latin-500.ttf
        /hind-v16-latin-500.woff
        /hind-v16-latin-500.woff2
        /hind-v16-latin-600 2.eot
        /hind-v16-latin-600 2.svg
        /hind-v16-latin-600 2.ttf
        /hind-v16-latin-600 2.woff
        /hind-v16-latin-600 2.woff2
        /hind-v16-latin-600.eot
        /hind-v16-latin-600.svg
        /hind-v16-latin-600.ttf
        /hind-v16-latin-600.woff
        /hind-v16-latin-600.woff2
        /hind-v16-latin-700 2.eot
        /hind-v16-latin-700 2.svg
        /hind-v16-latin-700 2.ttf
        /hind-v16-latin-700 2.woff
        /hind-v16-latin-700 2.woff2
        /hind-v16-latin-700.eot
        /hind-v16-latin-700.svg
        /hind-v16-latin-700.ttf
        /hind-v16-latin-700.woff
        /hind-v16-latin-700.woff2
        /hind-v16-latin-regular 2.eot
        /hind-v16-latin-regular 2.svg
        /hind-v16-latin-regular 2.ttf
        /hind-v16-latin-regular 2.woff
        /hind-v16-latin-regular 2.woff2
        /hind-v16-latin-regular.eot
        /hind-v16-latin-regular.svg
        /hind-v16-latin-regular.ttf
        /hind-v16-latin-regular.woff
        /hind-v16-latin-regular.woff2

    /html                   
        /templates
            /footer.html
            /nav.html

        /addedtocart 2.html
        /addedtocart.html
        /addUser 2.html
        /addUser.html
        /availabledonations 2.html
        /availabledonations.html
        /bakery 2.html
        /bakery.html
        /cart 2.html
        /cart.html
        /charity 2.html
        /charity.html
        /dashboard 2.html
        /dashboard.html
        /deliveryacception 2.html
        /deliveryacception.html
        /deliverydescription 2.html
        /deliverydescription.html
        /donationdescription 2.html
        /donationdescription.html
        /donationform 2.html
        /donationform.html
        /driver.html
        /edit.html
        /footer 2.html
        /footer.html
        /index 2.html
        /index.html
        /indexpast 2.html
        /indexpast.html
        /login 2.html
        /login.html
        /organization.html
        /pendingreservations 2.html
        /pendingreservations.html
        /profile 2.html
        /profile.html
        /register 2.html
        /register.html
        /role 2.html
        /role.html
        /thanksdonor 2.html
        /thanksdonor.html
        /thanksdriver 2.html
        /thanksdriver.html
        /thanksreceiver 2.html
        /thanksreceiver.html
        /updateUser 2.html
        /updateUser.html
        /user-details 2.html
        /user-details.html
        /user-edit 2.html
        /user-edit.html


    /img                    #Folder for (jpg,png,webp) images
        /addedtocart 2.png
        /addedtocart.png
        /apple-icon 2.png
        /apple-icon.png
        /buns 2.jpg
        /buns.jpg
        /croissant 2.jpg
        /croissant.jpg
        /deliveryacception 2.png
        /deliveryacception.png
        /drycake 2.jpg
        /drycake 2.webp
        /drycake.jpg
        /drycake.webp
        /facebook-icon 2.png
        /facebook-icon.png
        /google-icon 2.png
        /google-icon.png
        /google-icon2 2.jpg
        /google-icon2.jpg
        /logo 2.png
        /logo.png
        /signup-img 2.jpg
        /signup-img.jpg
        /strawberry_muffins 2.jpg
        /strawberry_muffins.jpg
        /team 2.jpg
        /team.jpg
        /thankyou 2.png
        /thankyou.png

    /js                     #Folder for js files
        /dashboard 2.js
        /dashboard.js
        /footer 2.js
        /footer.js
        /index 2.js
        /index.js
        /login 2.js
        /login.js
        /snowfall.jquery 2.js
        /snowfall.jquery.js

├── views                   #
    /addUser.ejs
    /bakery.ejs
    /charity.ejs
    /dashboard.ejs
    /driver.ejs
    /edot.ejs
    /edit.ejs
    /index.ejs
    /login.ejs
    /profile.ejs
    /register.ejs
    /role.ejs
    /updateUser.ejs
    /user-details.ejs
    /user-edit.ejs
