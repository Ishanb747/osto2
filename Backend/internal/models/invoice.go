package models

import "time"

type Invoice struct {
	ID        string `gorm:"primaryKey"`
	CompanyID uint
	Amount    float64
	Currency  string
	DueDate   time.Time
	Status    string
	PDFPath   string
	CreatedAt time.Time
	LineItems []InvoiceLineItem `gorm:"foreignKey:InvoiceID"`
	Payments  []Payment         `gorm:"foreignKey:InvoiceID"`
}

type InvoiceLineItem struct {
	ID          uint `gorm:"primaryKey"`
	InvoiceID   string
	Description string
	ModuleID    uint
	UnitPrice   float64
	Quantity    int
	Total       float64
}

type Payment struct {
	ID          string `gorm:"primaryKey"`
	InvoiceID   string
	ProviderID  string
	Status      string
	RawResponse string
	CreatedAt   time.Time
}
