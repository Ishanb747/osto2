package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"osto_hackathon2/Backend/internal/handlers"
	"osto_hackathon2/Backend/internal/models"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Migrate user and billing models
	db.AutoMigrate(&models.User{}, &models.Plan{}, &models.Module{}, &models.Subscription{}, &models.UsageRecord{}, &models.Invoice{}, &models.InvoiceLineItem{}, &models.Payment{}, &models.PaymentMethod{})

	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.POST("/register", handlers.RegisterHandler(db))
	r.POST("/login", handlers.LoginHandler(db))

	// Billing routes
	r.GET("/companies/:id/subscriptions", handlers.ListSubscriptionsHandler(db))
	r.GET("/companies/:id/payment_methods", handlers.ListPaymentMethodsHandler(db))
	r.POST("/companies/:id/payment_methods", handlers.AddPaymentMethodHandler(db))
	r.PUT("/payment_methods/:id", handlers.UpdatePaymentMethodHandler(db))
	r.DELETE("/payment_methods/:id", handlers.DeletePaymentMethodHandler(db))
	r.GET("/companies/:id/invoices", handlers.ListInvoicesHandler(db))
	r.GET("/subscriptions/:id", handlers.SubscriptionDetailHandler(db))
	r.POST("/subscriptions", handlers.CreateSubscriptionHandler(db))
	r.POST("/subscriptions/:id/upgrade", handlers.UpgradeSubscriptionHandler(db))
	r.POST("/subscriptions/:id/downgrade", handlers.DowngradeSubscriptionHandler(db))
	r.POST("/subscriptions/:id/pause", handlers.PauseSubscriptionHandler(db))
	r.POST("/subscriptions/:id/cancel", handlers.CancelSubscriptionHandler(db))
	r.DELETE("/subscriptions/:id", handlers.DeleteSubscriptionHandler(db))
	r.GET("/usage/:subscription_id", handlers.UsageHandler(db))

	r.Run() // listen and serve on 0.0.0.0:8080
}
