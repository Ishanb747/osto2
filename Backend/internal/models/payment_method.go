package models

import "time"

type PaymentMethod struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CompanyID uint      `json:"companyId"`
	Name      string    `json:"name"`
	Type      string    `json:"type"`
	Brand     string    `json:"brand"`
	Bank      string    `json:"bank"`
	Last4     string    `json:"last4"`
	Expiry    string    `json:"expiry"`
	Primary   bool      `json:"primary"`
	CreatedAt time.Time `json:"createdAt"`
}
