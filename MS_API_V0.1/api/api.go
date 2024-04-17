package api

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type API struct {
	allPages []string
}

type Movie struct {
	Title    string `json:"title"`
	Director string `json:"director"`
	Year     int    `json:"year"`
	Genre    string `json:"genre"`
	Rating   int    `json:"rating"`
}

var url = "http://127.0.0.1:8081/"

func (a *API) handleIndex(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Message ERROR: You need to specify a valid endpoint")
	w.WriteHeader(http.StatusBadRequest)
}

func (a *API) getDiscover(w http.ResponseWriter, r *http.Request) {

	response := struct {
		AvailableEndpoints []string `json:"AvailableEndpoints"`
	}{
		AvailableEndpoints: a.allPages,
	}

	// Set the response content type to JSON
	w.Header().Set("Content-Type", "application/json")
	// Encode the response struct as JSON and write it to the response writer
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func (a *API) addMovie(w http.ResponseWriter, r *http.Request) {
	// Create a new slice of Movies to store the JSON request body
	var newMovies *[]Movie
	// Decode the JSON request body into the newMovies slice
	err := json.NewDecoder(r.Body).Decode(&newMovies)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Verify that all movies have the Movie structure
	for _, movie := range *newMovies {
		if movie.Title == "" || movie.Director == "" || movie.Genre == "" || movie.Year == 0 || movie.Rating == 0 {
			http.Error(w, "Invalid movie data", http.StatusBadRequest)
			return
		}
	}
	// Create a new HTTP request to send to the micro-service
	reqBody, err := json.Marshal(newMovies)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a new HTTP request to send to the micro-service
	req, err := http.NewRequest(http.MethodPost, url+"addMovie", bytes.NewBuffer(reqBody))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the request content type to JSON
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Check if the response is satisfactory
	if resp.StatusCode == http.StatusOK {
		w.Write([]byte("Movie(s) added successfully"))
	} else {
		// Send an error message indicating that the movie(s) could not be added
		w.Write([]byte("Failed to add movie(s)"))
	}
}

/* func (a *API) upMovie(w http.ResponseWriter, r *http.Request) {
	params := &robotId{}

	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Set up the HTTP request to send to the ROS 2 micro-service
	url := "http://127.0.0.1:5001/odom"
	// Create the complete URL with the query parameter
	urlWithParams := fmt.Sprintf("%s?idRob=%s", url, params.IdRob)

	req, err := http.Get(urlWithParams)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer req.Body.Close()
	// Define a struct to extract the battery level from the JSON response
	type Linear struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
		Z float64 `json:"z"`
	}

}

func (a *API) deMovie(w http.ResponseWriter, r *http.Request) {
	// Implement the logic for the quMovie handler
}

func (a *API) quMovie(w http.ResponseWriter, r *http.Request) {
	// Implement the logic for the quMovie handler
}
*/
