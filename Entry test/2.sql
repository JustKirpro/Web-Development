SELECT first_name, patronymic, last_name, l.name, s.name, b.number, a.number
FROM "user"
    JOIN user_apartment USING (user_id)
    JOIN resident_type AS rt USING (resident_type_id)
    JOIN apartment AS a USING (apartment_id)
    JOIN building AS b USING (building_id)
    JOIN street AS s USING (street_id)
    JOIN locality AS l USING (locality_id)
WHERE
    rt.name IN ('член правления', 'председатель')