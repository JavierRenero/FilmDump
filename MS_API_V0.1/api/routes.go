package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (a *API) RegisterRoutes(r *mux.Router) {

	a.allPages = append(a.allPages, "/*")
	a.allPages = append(a.allPages, "/")
	a.allPages = append(a.allPages, "/discover")

	r.HandleFunc(a.allPages[0], a.callService).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[1], a.handleIndex).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[2], a.getDiscover).Methods(http.MethodGet)

	/* a.allPages = append(a.allPages, "/get")
	a.allPages = append(a.allPages, "/")
	a.allPages = append(a.allPages, "/add")
	a.allPages = append(a.allPages, "/update")
	a.allPages = append(a.allPages, "/delete")
	a.allPages = append(a.allPages, "/discover")

	r.HandleFunc(a.allPages[0], a.quMovie).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[1], a.handleIndex).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[2], a.addMovie).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[3], a.upMovie).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[4], a.deMovie).Methods(http.MethodGet)
	r.HandleFunc(a.allPages[5], a.getDiscover).Methods(http.MethodGet)
	*/
}
