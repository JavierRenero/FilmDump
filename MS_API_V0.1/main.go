package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()

	// create the API object
	a := &api.API{}

	// register the routes
	a.RegisterRoutes(r)

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	log.Println("Server running on port 8080")
	srv.ListenAndServe()

}
