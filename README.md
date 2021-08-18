# Trivial Gauntlet #
Tackle a gauntlet of trivia questions and see how far you can get with limited strikes in this multiple choice quiz. This game uses the [Open Trivia Database](https://opentdb.com/) API to generate a gauntlet of questions to challenge the users' knowledge on various subjects. 

The game is set to an ancient Central American empire gauntlet style background inspired by more physical gauntlet challenges from TV such as Legends of the Hidden Temple and The Crystal Maze. There is also humour in treating the gauntlet as something serious and arduous while having the word trivial in the title.

** Responsive Image **

## Design Choices ##
### Concept ###
As mentioned above this game is designed around to style of older gauntlet type TV gameshows. This informed much of the decisions around font, color, imagery and also layout and game design in order to capture the tone of those shows.

### Layout ###
When designing the layout the primary goals were to stick to the aesthetic for consistency and a strong identity while also keeping it very clear and readable. As such there is very little in the way of filler text.

As the page loads the player is immediately given a concise rundown of the games basic rules and is presented the choice of difficulty which then launches the player straight into the game with no extra page loads.

On the game page the player is provided with only the information needed to complete the task required with no extra steps to keep the game simple and clear. They get the question and the multiple choice answers. The only other information needed is the number of strikes they have which allows them to see whether they can risk guessing without losing the game or not. The inclusion of a progress bar was inspired by the death screen of the video game [Cuphead](https://preview.redd.it/10d3dy3nj8801.png?width=640&crop=smart&auto=webp&s=6f2c6a7f461d41b401aaea2f5f860bf4353c9873). In this game when you die you see how far away from the end of the level you were, this acts as an incentive to try again while also making the level seem daunting and imposing if the player thinks they've gone very far but has only made it a fraction of the way.

### Wireframes ###
The following are the wireframes used to plan the layout for the games main pages. The mobile and desktop versions will remain largely the same with some elements stacking vertically rather than horizontally on smaller devices. This will be achieved using css flexbox and css grids.
- Mobile Title Page
![Mobile Title Page Wireframe](docs/wireframes/mobile-titlescreen-wireframe.png)

- Mobile Game Page
![Mobile Game Page Wireframe](docs/wireframes/mobile-gamescreen-wireframe.png)

- Desktop Title Page
![Desktop Title Page Wireframe](docs/wireframes/desktop-titlescreen-wireframe.png)

- Desktop Game Page
![Desktop Game Page Wireframe](docs/wireframes/desktop-gamescreen-wireframe.png)

### Fonts ###
All fonts used were found on [Google Fonts](https://fonts.google.com/).

The main hero font used for titles is [Bungee Shade](https://fonts.google.com/specimen/Bungee+Shade). This font is both clear and readable while also being decorative and fitting with the overall aesthetic of the game.

The font chosen for the body elements is [Montserrat](https://fonts.google.com/specimen/Montserrat). This sans-serif font is easy to read, clean yet distinct from default sans-serif fonts. Using a combination of light, medium and bold styles this font meets all needs for the bulk of the games' text.
### Colors ###

## Features ##
### Existing Features ###
- Three Difficulty Settings
    - The Player has the option of choosing from 3 difficulty settings which pull from a different pool with the Open Trivia Database. 
    - Upon reloading or restarting, the player can chose their desired difficulty once again.

- Session Tokens
    - This game uses OpenTDB's session tokens to cut down on the possibility of the player receiving repeat questions within a single session.

- No Page Loads 
    - All game elements and screens are contained within a single webpage. This means that the player is never required to load any additional pages or data after the initial load.

- Multiple Choice quiz
    - Game fetches 50 questions from the database, all are 4 option, multiple choice questions.
    - Quiz pulls from all possible topics for a wide variety in question content.

- Interaction Feedback
    - The game provides feedback to the player for every action they take.
    - Players are given an opportunity to see whether their answer was right or wrong before moving on the the next.
    - All buttons have hover effects to show that they are interactable items.

- Progress Bar
    - The game screen contains a progress bar which shows the player their progress through the gauntlet. This serves both as an incentive for the player to try to get as close to the end as they can while also showing just how long and difficult the gauntlet is.

- Three Strike Life System
    - The quiz has a failstate where every time they get and answer wrong they receive a strike and when the strike limit is reached the game is over and the player must restart from the beginning.

- Database API Question Pool
    - The game pulls from the [Open Trivia Database's](https://opentdb.com/) pool of user submitted and verified questions and answers. The game then parses the data and serves the questions and answers to the user.

### Potential Future Features
- Topic Selections

- High Scores List

## Testing ##


## Deployment ##


## Technologies ##


## Credits ##