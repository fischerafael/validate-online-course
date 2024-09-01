# company

- id
- owner userEmail
- users []
- transactions
  -- debit | credit
  -- cost
  -- currency
  -- product
  -- quantity
  -- status (confirmed | pending | cancelled)
  -- created at
  -- updated at

# create or find company

- ownerEmail userEmail

# make transaction

- debit | credit
- total
- currency
- quantity
- status

# update transaction

- transaction id
- status
