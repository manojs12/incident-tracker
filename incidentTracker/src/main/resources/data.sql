INSERT INTO incidents
(id, title, service, severity, status, owner, summary, created_at, updated_at)
SELECT
gen_random_uuid(),
'Service Issue #' || i,
CASE
 WHEN i % 5 = 0 THEN 'Billing'
 WHEN i % 5 = 1 THEN 'Authentication'
 WHEN i % 5 = 2 THEN 'Network'
 WHEN i % 5 = 3 THEN 'API Gateway'
 ELSE 'Database'
END,
CASE
 WHEN i % 4 = 0 THEN 'SEV1'
 WHEN i % 4 = 1 THEN 'SEV2'
 WHEN i % 4 = 2 THEN 'SEV3'
 ELSE 'SEV4'
END,
CASE
 WHEN i % 3 = 0 THEN 'OPEN'
 WHEN i % 3 = 1 THEN 'MITIGATED'
 ELSE 'RESOLVED'
END,
CASE
 WHEN i % 4 = 0 THEN 'team-network'
 WHEN i % 4 = 1 THEN 'team-backend'
 WHEN i % 4 = 2 THEN 'team-devops'
 ELSE 'team-db'
END,
'Auto generated incident record #' || i,
NOW() - (i || ' minutes')::interval,
NOW()
FROM generate_series(1,200) AS s(i);