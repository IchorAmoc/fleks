SELECT 
	subPeri.id as sub_peri_id,
	SUM(plans.price) as income
	
FROM  public."Subscriptions" as subs 

INNER JOIN public."SubscriptionPlans" as subPla
	ON subPla."subscriptionId" = subs.id
	
INNER JOIN public."Plans" as plans
	ON plans.id = subPla."planId"
	
INNER JOIN public."SubscriptionPeriods" as subPeri
	ON subPeri."subscriptionId" = subs.id
	
WHERE subPeri.paid = TRUE
AND subPla."startedAt" < '2022-06-01'
AND subPla."endedAt" > '2022-07-01'
	OR subPla."endedAt" IS NULL 
AND subperi."periodFrom" >= '2022-06-01'

GROUP BY sub_peri_id
