package models

type Module struct {
	ID              uint `gorm:"primaryKey"`
	Name            string
	GracePeriodDays int
}
