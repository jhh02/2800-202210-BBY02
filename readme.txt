1.       Dongil Kwon, (A01267744), Aset
2.       Nischey Gupta, (A01311590), Aset
3.       Jun Ho Han,  (A01061045), Aset
4.       James Lum (A01182671), Bset


This assignment is 65% complete
4 Web design
4 Datastore code
4 Shopping cart/Transaction History
0/4 Profile editing
0/4 Admin dashboard
2/3 "Fit to finish," no dialog before deleting
2 Readme

16/25

POTENTIAL BONUSES
- Easter Egg in index page. Set screen width to mobile phone, click on the "o" in "DoughMe"

(not sure if this is a bonus)
- User can see entire transaction history and available items, and delete transactions = we are capable of displaying an admin dashboard, just no time to implement it

(not sure if this is a bonus)
- "Checking out" a shopping cart modifies values in items: (adds a buyer ID and changes availability status) = we are capable of adding an "edit user" feature, just no time to implement it again


=====================
DATABASE INSTRUCTIONS
=====================

Insert the SQL tables from data.sql into the COMP2800 database using XAMPP SQL Terminal. Two user accounts are also provided.

sometimes package.json needs to be deleted (only if you get an error for it)

doughme folder has heroku stuff

==============
WHAT'S WORKING
==============

"Post an item": works via filling a donation form.

"View all posted items": works by showing all the posted items with "0" status. Items with "1" status do not appear in the "catalogue"

"View item description": works by showing the item details.

"Add to cart": works by clicking "add to cart" in the item description page. Items already on your cart cannot be added again.

"Confirm cart": works by updating all your cart items to "1" status. Also deletes everything in your cart so it won't appear on your next checkout.

"Show history": works by showing you all your past transactions as either a "buyer" or a "seller." Buyers can also delete available transactions if they have not completed yet.

==================
WHAT'S NOT WORKING
==================
- No admin dashboard or admin editing
- No profile editing
- Buyer can not delete items in cart, although seller can delete available items from history
- no chat
- no multer or image uploading, current images uses placeholders

We spent the last week converting our entire MongoDB backend to mySQL. Every single function was rewritten. Three weeks of backend in three days.
We might've had time to implement an "edit user" function, but our "core" features and "minimum viable product" needed to come first


Backend-packages used:
1. bcryptjs (not used)
2. append (not used)
3. session
4. JSDOM
5. router
6. fs
8. express
9. mysql2
