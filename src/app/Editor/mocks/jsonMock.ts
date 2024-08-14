export const jsonMOCK =
  "{\n" +
  '  "mailling": {\n' +
  '    "id": 12345\n' +
  "  },\n" +
  '  "messages": [\n' +
  "    {\n" +
  '      "success": true,\n' +
  '      "reference": "5478"\n' +
  "    }\n" +
  "  ]\n" +
  "}";

  export const jsonMOCK2 = `
{
  "mailling": {
    "id": 12345,
    "name": "John Doe",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "12345"
    },
    "subscriptions": [
      {
        "type": "newsletter",
        "frequency": "weekly"
      },
      {
        "type": "promotions",
        "frequency": "monthly"
      }
    ]
  },
  "messages": [
    {
      "success": true,
      "reference": "5478",
      "details": {
        "sender": "Company A",
        "timestamp": "2024-08-05T14:48:00.000Z",
        "content": "Your subscription has been activated."
      }
    },
    {
      "success": false,
      "reference": "1234",
      "details": {
        "sender": "Company B",
        "timestamp": "2024-08-04T10:24:00.000Z",
        "content": "Your payment failed."
      }
    }
  ],
  "notifications": {
    "email": {
      "enabled": true,
      "frequency": "daily"
    },
    "sms": {
      "enabled": false,
      "frequency": "never"
    }
  },
  "preferences": {
    "language": "en",
    "timezone": "America/Los_Angeles"
  },
  "history": [
    {
      "date": "2024-07-01",
      "events": [
        {
          "type": "login",
          "location": "Anytown, CA",
          "device": "iPhone"
        },
        {
          "type": "purchase",
          "amount": 49.99,
          "currency": "USD"
        }
      ]
    },
    {
      "date": "2024-06-15",
      "events": [
        {
          "type": "login",
          "location": "Othertown, CA",
          "device": "MacBook"
        },
        {
          "type": "subscription",
          "service": "Premium",
          "status": "active"
        }
      ]
    }
  ]
}
`;
