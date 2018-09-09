
# Chunk Norris Joke

The application objective is to fetch 10 Random Chuck Norris jokes. These jokes can be fetched
from the following API http://api.icndb.com/jokes/random/10

## Description

When jokes are fetched they need to be displayed in a list. In this list we can mark
certain jokes as favorite. The favorite jokes will appear in a favorites list with a max of 10 unique items.

There should be an option to remove jokes from the favorite list as well.

On refresh the favorites lists should be stored so next time when application visited, favorites should be present.

In addition, we can also turn a timer on/off via a button (every 5 seconds). This will add one random joke to the favorites list http://api.icndb.com/jokes/random/1 until the list has 10 items.

## ِApplication Hierarchy:

The application consists of three tiers:

 ### 1. Frontend (FE):
It has one page in ASP.NET MVC that displays the jokes list along with the favorites. It has JavaScript library called [jokes.js](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Scripts/jokes/jokes.js) which exposes the functions that can be performed on a Joke such as **fetchSavedJokes**, **fetchJokes** and **fireJokesTimer**. Such functions are encapsulated into a joke class called **JokeHandler**, so you need to instantiate it to get access to them.

In addition, there is the [view MVC page](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Views/Home/Index.cshtml) which references the [jokes.js](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Scripts/jokes/jokes.js) class functions.

**2. Middleware (MW):**

It is the layer that responsible for parsing the jokes from the FE layer to the backend (BE) layer. This layer can be developed using many tools and technologies such as .NET, NodeJs, or PHP. This application uses .NET Entity Framework to communicate with the data container (here is SQL Server). Here, we use [Restful API services](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Controllers/JokeController.cs) to handle jokes.

**3. Backend (BE):**

It is the data layer where favorite jokes are placed and stored. It can be replaced by any other data containers such as memory storage, web storage or even flat files. We have here one table called [Joke](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Models/Joke.cs) which stores Joke Id, value and category. Database structure and table creation script can be found [here](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/App_Data/ChunkNorriesJokes_db.txt) as well.


## Technical Design Highlights
As a simple application, it uses a **multiselect.js** library which can be found [here](http://loudev.com/).

## ِApplication Screenshots:

 ![- Fetch Jokes.](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Images/Screenshots/fetch%20jokes.png)
 
![- Stored Favorite Jokes.](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Images/Screenshots/fav%20jokes.png)

![- Get Random Jokes.](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Images/Screenshots/randome%20jokes.png)

![- Done Random Jokes.](https://github.com/diaakhateeb/ChunkNorrisJoke/blob/master/ChunkNorrisJoke/Images/Screenshots/done%20randome%20jokes.png)
 

