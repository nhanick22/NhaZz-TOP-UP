# LUXE TOP UP — Starter System

## អ្វីដែលមាន
- White Luxury responsive storefront
- បង្កើត Order និងរក្សាទុកក្នុង Cloudflare D1
- Admin page មើល Order និងប្ដូរ status: PENDING / PAID / DELIVERED / REJECTED
- Telegram contact link

## អ្វីដែលមិនទាន់ភ្ជាប់
- KHQR dynamic generation និង automatic payment verification
- Supplier / automatic diamond delivery
- User login, refunds, inventory, audit log

**កុំដាក់ឱ្យប្រើប្រាស់ទទួលប្រាក់ពិត មុនពេលភ្ជាប់ KHQR verification និងសាកល្បងសុវត្ថិភាព។**
រូប `/khqr-placeholder.png` ជារូបបង្ហាញប៉ុណ្ណោះ។ ជំនួសវាដោយរូប KHQR ផ្លូវការរបស់គណនីហាង។ កុំប្រើ QR របស់អ្នកដទៃ។

## ដាក់លើ Cloudflare Pages + D1
1. បង្កើត GitHub repository ហើយ Upload folder នេះ។
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. ជ្រើស repository; Build command ទុកទទេ; Build output directory ដាក់ `public`.
4. បង្កើត D1 database ឈ្មោះ `luxe-topup-db`.
5. Run `schema.sql` ក្នុង D1 Console។
6. នៅ Pages project → Settings → Bindings បន្ថែម D1 binding ឈ្មោះ `DB` ហើយជ្រើស database នោះ។
7. Settings → Variables and Secrets បន្ថែម secret `ADMIN_TOKEN` ជា password សម្ងាត់វែង និងចៃដន្យ។
8. Deploy ឡើងវិញ។
9. បើក `/admin.html` ហើយបញ្ចូល ADMIN_TOKEN ដើម្បីមើល Order។

## ការកែតម្លៃ
កែ array `packs` ក្នុង `public/index.html`។ តម្លៃបច្ចុប្បន្នគ្រាន់តែជាគំរូ មិនមែនតម្លៃផ្លូវការរបស់ហ្គេមទេ។

## Telegram
ក្នុង `public/index.html` ស្វែងរក `Nhamick` ហើយប្ដូរទៅ Telegram username របស់ហាង ប្រសិនបើចង់ប្រើគណនីផ្សេង។

## KHQR production integration
ត្រូវចុះឈ្មោះ និងទទួល token តាមឯកសារផ្លូវការរបស់ NBC/Bakong។ Token ត្រូវរក្សាទុកជា secret នៅ backend មិនត្រូវដាក់ក្នុង HTML/JavaScript។ បន្ទាប់មកបង្កើត dynamic KHQR តាម SDK និងផ្ទៀងផ្ទាត់ transaction ជាមួយ Bakong Open API មុនប្ដូរ Order ទៅ PAID។ មិនត្រូវទទួល screenshot ជាភស្តុតាងតែមួយ។
ឯកសារ៖ https://api-bakong.nbc.gov.kh/document
