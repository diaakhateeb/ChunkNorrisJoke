using ChunkNorrisJoke.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ChunkNorrisJoke.Controllers
{
    [RoutePrefix("api/Joke")]
    public class JokeController : ApiController
    {
        private readonly ChunkNorrisJokesEntities _dbContext;

        public JokeController()
        {
            _dbContext = new ChunkNorrisJokesEntities();
        }
        public IHttpActionResult GetStoredFavouriteJokes()
        {
            var favJokesList = new List<dynamic>();

            var jokes = _dbContext.Jokes.ToList();
            jokes.ForEach(j =>
            {
                favJokesList.Add(new
                {
                    id = j.JokeId,
                    joke = j.JokeValue,
                    categories = new[] { j.Category ?? string.Empty }
                });
            });
            return Ok(new { type = "success", value = favJokesList });
        }

        [Route("~/api/Joke/AddFavouriteJoke")]
        [HttpPost]
        public IHttpActionResult AddFavouriteJoke(JObject joke)
        {
            dynamic jokeObject = joke;
            JArray jokeNode = jokeObject.joke;
            var jokeValue = jokeNode[0].SelectToken("JokeValue").Value<string>();
            if (string.IsNullOrEmpty(jokeValue)) return Ok();
            _dbContext.Jokes.Add(new Joke
            {
                JokeId = jokeNode[0].SelectToken("JokeId").Value<int>(),
                JokeValue = jokeValue,
                Category = jokeNode[0].SelectToken("Category").Value<string>()
            });
            _dbContext.SaveChanges();
            return Ok();
        }

        [Route("~/api/Joke/DeleteFavouriteJoke")]
        [HttpGet]
        public IHttpActionResult DeleteFavouriteJoke(int id)
        {
            var joke = _dbContext.Jokes.FirstOrDefault(j => j.JokeId == id);
            if (joke != null)
            {
                _dbContext.Jokes.Remove(joke);
                _dbContext.SaveChanges();
            }
            return Ok(id);
        }

    }
}
