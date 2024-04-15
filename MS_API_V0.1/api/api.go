package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
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

type serviceCall struct {
	ServiceName string `json:"serviceName"`
	Movie       Movie  `json:"movie"`
}

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

func (a *API) callService(w http.ResponseWriter, r *http.Request) {
	params := &serviceCall{}

	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	print(params.ServiceName)
	print(params.Movie.Director)

	url := fmt.Sprintf("http://127.0.0.1:5000/%s", params.ServiceName)
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	println(url)

	jsonValue, _ := json.Marshal(params.Movie)
	req.Body = ioutil.NopCloser(strings.NewReader(string(jsonValue)))

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

/* func (a *API) addMovie(w http.ResponseWriter, r *http.Request) {
	params := &Movie{}

	err := json.NewDecoder(r.Body).Decode(params)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Set up the HTTP request to send to the ROS 2 micro-service
	url := "http://127.0.0.1:5000/battery"
	// Create the complete URL with the query parameter
	urlWithParams := fmt.Sprintf("%s?idRob=%s", url, params.IdRob)

	req, err := http.Get(urlWithParams)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer req.Body.Close()
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Define a struct to extract the battery level from the JSON response
	type BatteryResponse struct {
		Level string `json:"battery_level"`
	}

	// Unmarshal the JSON response into the struct
	var batteryResp BatteryResponse
	err = json.Unmarshal(body, &batteryResp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if strings.Compare(batteryResp.Level, "No data") == 0 {
		http.Error(w, "No data, So publiser Not Available", http.StatusNotFound)
		return
	}

	response := struct {
		ID           string `json:"id"`
		BatteryLevel string `json:"battery_level"`
	}{
		ID:           params.IdRob,
		BatteryLevel: batteryResp.Level,
	}

	// Set the response content type to JSON
	w.Header().Set("Content-Type", "application/json")
	// Encode the response struct as JSON and write it to the response writer
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (a *API) upMovie(w http.ResponseWriter, r *http.Request) {
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
