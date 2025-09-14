package handlers

import (
	"net/http"

	"osto_hackathon2/Backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// DeleteSubscriptionHandler handles DELETE /subscriptions/:id
func DeleteSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&models.Subscription{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete subscription"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Subscription deleted"})
	}
}

// CreateSubscriptionHandler handles POST /subscriptions
func CreateSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			CompanyID       uint   `json:"company_id"`
			PlanID          uint   `json:"plan_id"`
			ModuleID        uint   `json:"module_id"`
			Status          string `json:"status"`
			NextBillingDate string `json:"next_billing_date"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		sub := models.Subscription{
			CompanyID: req.CompanyID,
			PlanID:    req.PlanID,
			ModuleID:  req.ModuleID,
			Status:    req.Status,
		}
		if req.NextBillingDate != "" {
			// Parse date string
			sub.NextBillingDate = models.ParseDate(req.NextBillingDate)
		}
		if err := db.Create(&sub).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create subscription"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Subscription created", "id": sub.ID})
	}
}

func ListSubscriptionsHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")
		var subs []models.Subscription
		db.Preload("Plan").Preload("Module").Preload("UsageRecords").Where("company_id = ?", companyID).Find(&subs)
		resp := []gin.H{}
		for _, sub := range subs {
			usage := 0
			for _, u := range sub.UsageRecords {
				usage += u.Amount
			}
			resp = append(resp, gin.H{
				"id":                sub.ID,
				"module":            sub.Module.Name,
				"status":            sub.Status,
				"plan":              sub.Plan.Name,
				"price_currency":    sub.Plan.PriceCurrency,
				"limit":             sub.Plan.Limits,
				"usage":             usage,
				"next_billing_date": sub.NextBillingDate.Format("2006-01-02"),
			})
		}
		c.JSON(http.StatusOK, resp)
	}
}

func SubscriptionDetailHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var sub models.Subscription
		if err := db.Preload("Plan").Preload("Module").Preload("UsageRecords").First(&sub, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
			return
		}
		c.JSON(http.StatusOK, sub)
	}
}

func UpgradeSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Upgraded"})
	}
}

func DowngradeSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Downgraded"})
	}
}

func PauseSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Paused"})
	}
}

func CancelSubscriptionHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var sub models.Subscription
		if err := db.First(&sub, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Subscription not found"})
			return
		}
		sub.Status = "Canceled"
		if err := db.Save(&sub).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to cancel subscription"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Canceled"})
	}
}

func UsageHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		subID := c.Param("subscription_id")
		var usage []models.UsageRecord
		db.Where("subscription_id = ?", subID).Find(&usage)
		c.JSON(http.StatusOK, usage)
	}
}
