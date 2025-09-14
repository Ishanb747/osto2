package handlers

import (
	"fmt"
	"net/http"
	"osto_hackathon2/Backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// List payment methods
func ListPaymentMethodsHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")
		var methods []models.PaymentMethod
		db.Where("company_id = ?", companyID).Find(&methods)
		c.JSON(http.StatusOK, methods)
	}
}

// Add payment method
func AddPaymentMethodHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")
		var req models.PaymentMethod
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		req.CompanyID = parseUint(companyID)
		if err := db.Create(&req).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add payment method"})
			return
		}
		c.JSON(http.StatusOK, req)
	}
}

// Update payment method (make primary, edit)
func UpdatePaymentMethodHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var req models.PaymentMethod
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		var method models.PaymentMethod
		if err := db.First(&method, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
			return
		}
		if req.Primary {
			// Unset other primaries for this company
			db.Model(&models.PaymentMethod{}).Where("company_id = ?", method.CompanyID).Update("primary", false)
		}
		if err := db.Model(&method).Updates(req).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update"})
			return
		}
		c.JSON(http.StatusOK, method)
	}
}

// Delete payment method
func DeletePaymentMethodHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&models.PaymentMethod{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
	}
}

func parseUint(s string) uint {
	var u uint
	fmt.Sscanf(s, "%d", &u)
	return u
}
