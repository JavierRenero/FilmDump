package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (a *API) RegisterRoutes(r *mux.Router) {

	//a.allPages = append(a.allPages, "/get")
	a.allPages = append(a.allPages, "/")
	a.allPages = append(a.allPages, "/add")
	//a.allPages = append(a.allPages, "/update")
	//a.allPages = append(a.allPages, "/delete")
	a.allPages = append(a.allPages, "/discover")

	//r.HandleFunc(a.allPages[0], a.quMovie).Methods(http.MethodPost)
	r.HandleFunc(a.allPages[0], a.handleIndex).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[1], a.addMovie).Methods(http.MethodPost)
	//r.HandleFunc(a.allPages[3], a.upMovie).Methods(http.MethodPost)
	//r.HandleFunc(a.allPages[4], a.deMovie).Methods(http.MethodDelete)
	r.HandleFunc(a.allPages[2], a.getDiscover).Methods(http.MethodGet)
}
