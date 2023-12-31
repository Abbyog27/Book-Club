# Project 2 Planning

## Part 1

Review the Project 2 requirements and check out some [examples](https://romebell.gitbook.io/sei-802/projects/past-projects/project2).

In this space below, list **THREE** ideas for your Project 2. For each idea, include [user stories](https://www.atlassian.com/agile/project-management/user-stories) for each idea and a link to the API(s) you want to use for it.

--------------------------------------------------------
1. Book Search 
2. Quote of the Day
3. Dog picture of the Day
---------------------------------------------------------

Make a PR when you're done!

---

## Part 2

In the space below:
* either embed or link a completed ERD for your approved P2 idea
* if there are any changes/additions to your user stories, place your full set of revised user stories here
* either embed or link wireframes for every page of your app

----------------------------------------------------------
### ERD
![Alt text](<Screen Shot 2023-11-18 at 4.48.56 PM.png>)

![Alt text](<Screen Shot 2023-11-18 at 4.50.08 PM.png>)
----------------------------------------------------------
### User Stories
User will be able to search for books by title, author, genre, ISBN.
1. 	User will be able to create an account.
2. 	User will be able to log into created account. 
3. 	User will have a search bar to enter search by title, author, genre, ISBN. As the app will be connected to the NY Times books API, the found book will be displayed on the page itself.
4. 	User will be able to click on the book, to display details of the book.
5. 	User will be able to add favorite books into favorite section.
6. 	User will be able to log out of the app.
7. Will be using Open Library API - https://openlibrary.org/developers/api

----------------------------------------------------------
### Wireframes
![Alt text](<Screen Shot 2023-11-18 at 5.45.05 PM.png>)
![Alt text](<Screen Shot 2023-11-18 at 6.33.45 PM.png>)

----------------------------------------------------------

Make a PR when you're done!


## Requirements Inside `Project Board`

`card` FUNDAMENTALS
```
### FUNDAMENTALS
- [ ] Deployed (e.g. Heroku)
- [X] Site has basic functionality related to its goal
- [X] At least 2 GET routes (other than auth)
- [X] At least 1 POST route
- [X] At least 1 DELETE route
- [ ] At least 1 PUT route
```

`card` SUFFICIENT DIFFICULTY
```
### SUFFICIENT DIFFICULTY: At least 1 of the following: 
- [X] Use of an API
- [ ] Advanced Database Relationships
- [ ] Sockets
- [ ] Scraping
- [ ] OAuth
- [ ] Other
```

`card` AUTH/SECURITY
```
### AUTH/SECURITY (Mostly From Template Boilerplate)
- [ ] Log in works (required: boilerplate or better)
- [ ] Sensible error messages for bad login info  (boilerplate or better)
- [ ] Passwords hashed in database
- [ ] Passwords in form are input type="password" (dots)
- [ ] Password verification is checked
- [ ] Can't sneak edit/delete data that I don't own by typing in random ids
```
`card` GITHUB USAGE
```
### GITHUB USAGE
- [ ] Appropriate Use of Github
- [ ] `README` is included and is descriptive
- [ ] `.gitignore` properly set up
- [ ] No API keys in Github code (used a .env file)
- [ ] Multiple commits per day
- [ ] Repo up on day 1 of project week or sooner
- [ ] `README` has *Installation Instructions*
```

`card` DATABASE USAGE
```
### DATABASE USAGE
- [X] At least 2 Models other than join tables (required)
- [X] Relationships were set up appropriately between models
- [ ] Avoided global variables, storing data in files, etc
- [ ] No raw file/image data stored in database, etc
```

`card` CODE STYLE
```
### CODE STYLE
- [ ] Generally DRY code / No enormous files
- [ ] Proper indentation (or mostly pretty good!)
- [ ] Naming conventions kept
- [ ] No glaring logic errors
```
`card` USER EXPERIENCE
```
### USER EXPERIENCE
- [ ] Effort was put into design
- [ ] No broken links (server errors or 404s)
- [ ] Typing a purposely bad link renders an error ejs page
- [ ] Content is responsive to screen size changes
- [ ] No glaring alignment or grid errors
```
