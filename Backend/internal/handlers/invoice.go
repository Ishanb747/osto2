package handlers

import (
	"net/http"
	"osto_hackathon2/Backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// ListInvoicesHandler handles GET /companies/:id/invoices
func ListInvoicesHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")
		var invoices []models.Invoice
		db.Preload("LineItems").Where("company_id = ?", companyID).Find(&invoices)
		resp := []gin.H{}
		for _, inv := range invoices {
			modules := []string{}
			for _, li := range inv.LineItems {
				if li.Description != "" {
					modules = append(modules, li.Description)
				}
			}
			resp = append(resp, gin.H{
				"id":       inv.ID,
				"amount":   inv.Amount,
				"currency": inv.Currency,
				"due_date": inv.DueDate.Format("2006-01-02"),
				"status":   inv.Status,
				"modules":  modules,
			})
		}
		c.JSON(http.StatusOK, resp)
	}
}
