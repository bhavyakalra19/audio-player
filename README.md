Objective:
Develop an audio player application using Python Flask/Django for the backend and React.js for the frontend within a week's time frame. The application should allow users to authenticate both frontend and backend, retrieve audio file paths from an API, provide search functionality for audio files, and enable users to play selected audio files.

User Story:
As a user, I want to be able to access an audio player application where I can search for audio files and play them. Additionally, I want to ensure my identity is authenticated both on the frontend and backend for security.

Use Case Scenario:
1. User Authentication:
   - The user accesses the application and is prompted to authenticate.
   - User provides credentials (e.g., username/password) for authentication.
   - The frontend sends authentication requests to the backend.

2. Retrieve Audio Files from API:
   - Upon successful authentication, the frontend sends a request to the backend to fetch audio file paths from an API.
   - The backend communicates with the API to retrieve the audio file paths.
   - Upon receiving the paths, the backend forwards the data to the frontend.

3. Search Functionality:
   - The frontend presents the retrieved audio file paths in a dropdown menu or search bar.
   - Users can input keywords to search for specific audio files.
   - As the user types, the frontend sends requests to the backend to filter audio file paths based on the search query.

4. Play Audio Files:
   - Once the user selects an audio file from the dropdown/search results, the frontend sends a request to the backend to retrieve the audio file.
   - The backend fetches the requested audio file and sends it to the frontend.
   - The frontend utilizes a media player component (e.g., HTML5 audio element or a third-party library) to play the audio file. 
