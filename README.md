<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Game Core

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Proyect Objectives 

- Build an App using: React, Redux, Node & Sequelize.
- Solidify & connect all the concepts learned on the bootcamp.
- Absorb good practices for working.
- Learn and practica GIT workflow.
- Develop and utilize testing.

## BoilerPlate

The boilerplate counted with two folders: 'api' & 'client' to host the backend and frontend respectively.

The 'client' folder content was created by using 'Create React App'.

## Premise

The general idea was to build an app which allows an user to see the many videogames available with relevant information using an external API ([rawg] : https://rawg.io/apidocs)
and from there been able to do many different things such as:

  - Search videogames
  - Filter/Order them.
  - Add new videogames

### The only API's endpoints used:

  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games?search={game}
  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games/{id}

#### Technologies:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

It is an React/Redux web app with the following functionality:

__Landing page__:
- [ ] A representative main wallpaper.
- [ ] Enter button to the main route.

__Main route__:
- [ ] Search input for searching videogames by name.
- [ ] Videogames listing area. With the following information:
  - Image
  - Name
  - Genres
- [ ] Buttons/Options for filtering videogames by genres or game source api/original.
- [ ] Buttons/Options for filtering videogames by name or rating, ascendant or descendant.
- [ ] Pagination for displaying the videogames.

__IMPORTANT__: The API is so big that on the first load it only brings the first 100 videogames and all the DB's original games.

__Detailed videogame route__:
- [ ] The fields and information showed on the main route
- [ ] Description
- [ ] Release Date
- [ ] Rating
- [ ] Plataforms

__Creation videogames route__:
- [ ] A __controlled__ form with
  - Name
  - Description
  - Release date
  - Rating
- [ ] Posibility for adding multiple genres
- [ ] Posibility for adding multiple platforms
- [ ] Submit button for creating the new videogame

#### Database

The database models have the following properties (those with an asterisk are *unique*):

- [ ] Videogame with the following properties:
  - ID: *
  - Name *
  - Description *
  - Release date
  - Rating
  - Platforms *
- [ ] Genres with the following properties:
  - ID
  - Name

The relation among both entities it's from "many to many".

__IMPORTANT__: The ID's are generated by UUIDV4 to make sure they don't mix with rawg.api games ID's.

#### Backend

It's a server developed with Node/Express with the following routes:

__IMPORTANT__: The API has it's own consulting routes with filtering, pagination, etc, but they are not implemented so they are built from scratch in the app code.

- [ ] __GET /videogames__:
  - Obtains a list of the first 15 videogames.
  - Returns only the required data for the main route in the front-end.
- [ ] __GET /videogames?name="..."__:
  - Obtains the first 15 videogames associated with the query parameter word as a search.
  - Returns an appropiate message if no game it's found.
- [ ] __GET /videogame/{idVideogame}__:
  - Obtaines a videogame's particular detail.
  - It brings only the data required on detailed videogames route.
  - Includes associated genres.
- [ ] __GET /genres__:
  - Obtains all the existing genres.
  - They are bring from the API but stored into the DB and then managed from there.
- [ ] __POST /videogame__:
  - Receives all the data from the front-end form by body.
  - Creates a videogame into the DB by posting the data retrieved.
