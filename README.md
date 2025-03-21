# 🤖 MySlackBot

Ovaj projekt omogućava korisnicima da u Slacku pitaju bota gdje se nalazi neka stvar, a bot koristi Google Sheets kako bi pronašao lokaciju i odgovorio.

## 📖 Upute za kreiranje Slack bota

Prati službeni vodič:  
👉 [Slack Bolt.js – Getting Started](https://tools.slack.dev/bolt-js/getting-started/)

## 📊 Google Sheets Integracija

1. Aktivacija Google Sheets API-ja
- Posjeti Google Cloud Console.
- Kreiraj projekt i aktiviraj Google Sheets API.

2. Kreiranje Service Accounta
- Idi na IAM & Admin > Service Accounts.
- Kreiraj novi Service Account.
- Generiraj JSON ključ i preuzmi datoteku (npr. service-account-key.json).
- Postavi ključ u root projekta i dodaj putanju u .env datoteku:

