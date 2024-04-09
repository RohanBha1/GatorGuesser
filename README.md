# GatorGuesser

## Description
GatorGuesser is an interactive web-based game that drops players at a random location within a predefined set of coordinates using Google Street View. Players navigate the panoramic images to guess their location within a set time limit and a limited number of lives.

## How to Play
1. **Start the Game**: Load the game's webpage. The game will automatically place you at a random location within the game's geographical bounds.
2. **Explore**: Use the Street View controls to look around and move through the Street View imagery to gather clues about your location.
3. **Make Your Guess**: Type your guess into the search bar at the top of the page. The autocomplete feature will help you choose from possible locations.
4. **Winning and Losing**:
   - If your guess is within 50 feet (approximately 15 meters) of the actual location, you win the round!
   - If your guess is incorrect, you lose a life. The game gives you three lives to use for guessing. If all lives are lost, the game will reveal the closest place to the actual location and its distance from your last guess.
5. **Restart the Game**: Refresh the page to start a new game.

## Setup Instructions
1. **Clone the Repository**: Clone this repository to your local machine using `git clone https://github.com/RohanBha1/GatorGuesser.git`.
2. **Install Dependencies**: Navigate to the cloned directory and install any necessary dependencies. (List any project-specific dependencies and installation steps here.)
3. **Obtain a Google Maps API Key**: You need a Google Maps API key to use the Maps and Street View services. Follow the instructions at [Google Cloud](https://cloud.google.com/maps-platform/) to get your API key.
4. **Configure Your API Key**: Insert your API key into the relevant parts of the code. This is typically in the HTML file where the Google Maps API script is included.
5. **Launch the Game**: Open the `testindex.html` file in a web browser to start the game.

## Contributing
We welcome contributions and suggestions! If you have any ideas for improvements or have found a bug, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

