package models

import "time"

type UsageRecord struct {
	ID             uint `gorm:"primaryKey"`
	SubscriptionID uint
	Metric         string
	Amount         int
	Timestamp      time.Time
}
