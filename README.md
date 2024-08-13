## Task Create Table

task nya bikin table:

 - buat jadi responsive
 - ada search box filter nya -> input
 - checkbox filter by status :
   - WAITING APPROVE
 - WAITING PAYMENT
 - PAYMENT COMPLETE
 - SHIPPING PROGRESS
 - SHIPPING COMPLETE
 - WAITING CONFIRMATION
 - DELIVERY FINISH
 - EXPIRED
 - LATE DUE DATE
 - ON PAYMENT LATE FEE
 - CONFIRM LATE FEE
 - ON CLAIM
 - ARBITRASE
 - COMPLETE
 - INVALID

- search by created_at:
  - Yesterday
  - Last 30 Day

required table column:

- Xcrow ID
- contract name
- total amount
- status

Example data:

const data = [
  {
    "id": 1,
    "code": "XC-1723002147",
    "name": "Beans Geisha Panama",
    "type": 0,
    "start_date": "2024-08-06 17:00:00",
    "end_date": "2024-08-30 17:00:00",
    "applicant_email": "anrico@tennet.id",
    "beneficiary_email": "manricofadli@gmail.com",
    "buyer_email": "anrico@tennet.id",
    "buyer_as": "personal",
    "is_buyer_approved": 1,
    "seller_email": "manricofadli@gmail.com",
    "seller_as": "personal",
    "is_seller_approved": 1,
    "product_description": "Oke",
    "product_price": "10000.00",
    "shipping_method_type": 1,
    "shipping_fee": "1000.00",
    "escrow_fee": "350.00",
    "total": "11350.00",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 1,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 2,
    "created_at": "2024-08-07 10:42:27",
    "updated_at": "2024-08-12 16:17:00",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 10,
      "key": "shipping_methods",
      "type_id": 1,
      "name": "Cargo",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 25,
      "key": "contracts",
      "status_id": 2,
      "name": "WAITING PAYMENT",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 2,
    "code": "XC-1723002852",
    "name": "Coconut Indonesia",
    "type": 0,
    "start_date": "2024-08-06 17:00:00",
    "end_date": "2024-08-30 17:00:00",
    "applicant_email": "manricofadli@gmail.com",
    "beneficiary_email": "anrico@tennet.id",
    "buyer_email": "manricofadli@gmail.com",
    "buyer_as": "personal",
    "is_buyer_approved": 0,
    "seller_email": "anrico@tennet.id",
    "seller_as": "personal",
    "is_seller_approved": 0,
    "product_description": "10 Ton Coconut from Indonesia",
    "product_price": "1000.00",
    "shipping_method_type": 1,
    "shipping_fee": "1000.00",
    "escrow_fee": "171.50",
    "total": "2171.50",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 2,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 1,
    "created_at": "2024-08-07 10:54:12",
    "updated_at": "2024-08-07 10:54:16",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 10,
      "key": "shipping_methods",
      "type_id": 1,
      "name": "Cargo",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 24,
      "key": "contracts",
      "status_id": 1,
      "name": "WAITING APPROVE",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 3,
    "code": "XC-1723031078",
    "name": "test contract",
    "type": 0,
    "start_date": "2024-08-06 17:00:00",
    "end_date": "2024-08-30 17:00:00",
    "applicant_email": "takumi@tennet.id",
    "beneficiary_email": "anrico@tennet.id",
    "buyer_email": "anrico@tennet.id",
    "buyer_as": "personal",
    "is_buyer_approved": 0,
    "seller_email": "takumi@tennet.id",
    "seller_as": "personal",
    "is_seller_approved": 0,
    "product_description": "oke coba",
    "product_price": "500.00",
    "shipping_method_type": 0,
    "shipping_fee": "0.00",
    "escrow_fee": "160.75",
    "total": "660.75",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 3,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 1,
    "created_at": "2024-08-07 18:44:38",
    "updated_at": "2024-08-07 18:44:44",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 9,
      "key": "shipping_methods",
      "type_id": 0,
      "name": "No shipping needed",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 24,
      "key": "contracts",
      "status_id": 1,
      "name": "WAITING APPROVE",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 4,
    "code": "XC-1723106436",
    "name": "Beli Kopi dari Panama",
    "type": 0,
    "start_date": "2024-08-07 00:00:00",
    "end_date": "2024-08-30 00:00:00",
    "applicant_email": "anrico@tennet.id",
    "beneficiary_email": "manricofadli@gmail.com",
    "buyer_email": "anrico@tennet.id",
    "buyer_as": "personal",
    "is_buyer_approved": 1,
    "seller_email": "manricofadli@gmail.com",
    "seller_as": "personal",
    "is_seller_approved": 1,
    "product_description": "Beli 1 ton kopi dari panama",
    "product_price": "500.00",
    "shipping_method_type": 0,
    "shipping_fee": "1000.00",
    "escrow_fee": "160.75",
    "total": "1660.75",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 4,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 2,
    "created_at": "2024-08-08 15:40:36",
    "updated_at": "2024-08-12 18:42:32",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 9,
      "key": "shipping_methods",
      "type_id": 0,
      "name": "No shipping needed",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 25,
      "key": "contracts",
      "status_id": 2,
      "name": "WAITING PAYMENT",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 5,
    "code": "XC-1723207742",
    "name": "Testing Contract",
    "type": 0,
    "start_date": "2024-08-08 17:00:00",
    "end_date": "2024-08-16 17:00:00",
    "applicant_email": "anrico@tennet.id",
    "beneficiary_email": "manricofadli@tennet.id",
    "buyer_email": "manricofadli@tennet.id",
    "buyer_as": "personal",
    "is_buyer_approved": 0,
    "seller_email": "anrico@tennet.id",
    "seller_as": "personal",
    "is_seller_approved": 1,
    "product_description": "okedeh",
    "product_price": "100.00",
    "shipping_method_type": 0,
    "shipping_fee": "0.00",
    "escrow_fee": "152.15",
    "total": "252.15",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 5,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 1,
    "created_at": "2024-08-09 19:49:02",
    "updated_at": "2024-08-12 16:15:49",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 9,
      "key": "shipping_methods",
      "type_id": 0,
      "name": "No shipping needed",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 24,
      "key": "contracts",
      "status_id": 1,
      "name": "WAITING APPROVE",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 6,
    "code": "XC-1723371979",
    "name": "Tesla Smart Car",
    "type": 0,
    "start_date": "2024-08-10 17:00:00",
    "end_date": "2024-08-23 17:00:00",
    "applicant_email": "anrico@tennet.id",
    "beneficiary_email": "sentpyton@gmail.com",
    "buyer_email": "sentpyton@gmail.com",
    "buyer_as": "personal",
    "is_buyer_approved": 0,
    "seller_email": "anrico@tennet.id",
    "seller_as": "personal",
    "is_seller_approved": 0,
    "product_description": "1 unit Tesla smart car",
    "product_price": "500.00",
    "shipping_method_type": 1,
    "shipping_fee": "1000.00",
    "escrow_fee": "160.75",
    "total": "1660.75",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 6,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 1,
    "created_at": "2024-08-11 17:26:20",
    "updated_at": "2024-08-11 17:26:28",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 10,
      "key": "shipping_methods",
      "type_id": 1,
      "name": "Cargo",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 24,
      "key": "contracts",
      "status_id": 1,
      "name": "WAITING APPROVE",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  },
  {
    "id": 7,
    "code": "XC-1723372184",
    "name": "GDC Property",
    "type": 0,
    "start_date": "2024-08-10 17:00:00",
    "end_date": "2024-08-12 17:00:00",
    "applicant_email": "anrico@tennet.id",
    "beneficiary_email": "sentpython@gmail.com",
    "buyer_email": "sentpython@gmail.com",
    "buyer_as": "personal",
    "is_buyer_approved": 0,
    "seller_email": "anrico@tennet.id",
    "seller_as": "personal",
    "is_seller_approved": 0,
    "product_description": "GDC Home",
    "product_price": "200.00",
    "shipping_method_type": 0,
    "shipping_fee": "0.00",
    "escrow_fee": "154.30",
    "total": "354.30",
    "fiat_id": 1,
    "asset_network_id": 1,
    "client_document_id": 7,
    "buyer_fee_percentage": "100.00",
    "wallet_address_id": null,
    "status": 1,
    "created_at": "2024-08-11 17:29:45",
    "updated_at": "2024-08-11 17:29:52",
    "type_detail": {
      "id": 4,
      "key": "contracts",
      "type_id": 0,
      "name": "Personal - Personal",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "shipping_method_type_detail": {
      "id": 9,
      "key": "shipping_methods",
      "type_id": 0,
      "name": "No shipping needed",
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "fiat": {
      "id": 1,
      "unit": "Dollar",
      "country_name": "United State",
      "currency": "USD",
      "symbol": "$",
      "is_active": 1,
      "created_at": "2024-08-07 09:58:23",
      "updated_at": "2024-08-07 09:58:23"
    },
    "asset_network": {
      "id": 1,
      "asset_id": 1,
      "network_id": 1,
      "contract_address": "",
      "explorer_address_uri": "https://etherscan.io/address",
      "explorer_transaction_uri": "https://etherscan.io/tx",
      "created_at": "2024-08-07 10:41:05",
      "updated_at": "2024-08-07 10:41:05"
    },
    "status_detail": {
      "id": 24,
      "key": "contracts",
      "status_id": 1,
      "name": "WAITING APPROVE",
      "created_at": "2024-08-12 18:02:18",
      "updated_at": "2024-08-12 18:02:18"
    }
  }
]