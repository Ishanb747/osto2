package models

import "time"

// ParseDate parses a date string in YYYY-MM-DD format
func ParseDate(dateStr string) time.Time {
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return time.Now()
	}
	return t
}

// Subscription status: Active, Grace, Suspended, Expired

type Subscription struct {
	ID              uint `gorm:"primaryKey"`
	CompanyID       uint
	PlanID          uint
	ModuleID        uint
	Status          string
	NextBillingDate time.Time
	Plan            Plan   `gorm:"foreignKey:PlanID"`
	Module          Module `gorm:"foreignKey:ModuleID"`
	UsageRecords    []UsageRecord
}
