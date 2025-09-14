package models

type Plan struct {
	ID            uint `gorm:"primaryKey"`
	Name          string
	PriceCurrency string
	Limits        int
}
