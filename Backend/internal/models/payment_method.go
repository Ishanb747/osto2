package models

import "time"

type PaymentMethod struct {
	ID        uint `gorm:"primaryKey"`
	CompanyID uint
	Type      string // card, bank
	Brand     string // Visa, Mastercard, etc
	Bank      string // For bank accounts
	Last4     string
	Expiry    string // MM/YY
	Primary   bool
	CreatedAt time.Time
}
